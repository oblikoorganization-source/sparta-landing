import puppeteer from "puppeteer-core";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "_content/_reelframes";
await fs.mkdir(OUT, { recursive: true });

const IDS = [
  "B2H01_sofC8", "DT_VThmjEm9", "DXKuntNDHVE", "DXmdIfcDOwl", "DXmdJxdDF7B",
  "DXmdM2WjILT", "DXz52EyMsjM", "DXz5QLvsxgs", "DYdA2LPmp_1", "DYNec_yM9x2",
  "DYNej2iMn96", "DYNeZL1sYvn", "DYUkAJnDSfo", "DZHZ0zSMr1k", "DZHZo0JMPGk",
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

const cells = [];
for (const id of IDS) {
  const dataUrl = await page.evaluate(async (src) => {
    const v = document.createElement("video");
    v.src = src;
    v.muted = true;
    await new Promise((res, rej) => {
      v.onloadeddata = res;
      v.onerror = () => rej(new Error("load"));
      setTimeout(res, 6000);
    });
    const dur = v.duration && isFinite(v.duration) ? v.duration : 3;
    await new Promise((res) => {
      v.onseeked = res;
      v.currentTime = Math.min(dur * 0.45, 2.5);
      setTimeout(res, 3000);
    });
    const c = document.createElement("canvas");
    c.width = v.videoWidth || 360;
    c.height = v.videoHeight || 640;
    c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.82);
  }, `/video/reel-${id}.mp4`);

  const b64 = dataUrl.split(",")[1];
  const buf = Buffer.from(b64, "base64");
  await fs.writeFile(path.join(OUT, `${id}.jpg`), buf);
  cells.push({ id, buf });
  console.log("frame", id, `${(buf.length / 1024).toFixed(0)}kb`);
}
await browser.close();

// labeled contact sheet (5 cols x 3 rows), vertical cells
const CW = 270, CH = 420, LBL = 28, COLS = 5;
const made = await Promise.all(
  cells.map(async ({ id, buf }) => {
    const img = await sharp(buf).resize(CW, CH, { fit: "cover" }).toBuffer();
    const svg = Buffer.from(
      `<svg width="${CW}" height="${LBL}"><rect width="100%" height="100%" fill="#df1f26"/><text x="6" y="20" font-family="monospace" font-size="15" fill="#fff">${id}</text></svg>`
    );
    return sharp({ create: { width: CW, height: CH + LBL, channels: 3, background: "#000" } })
      .composite([{ input: img, top: 0, left: 0 }, { input: svg, top: CH, left: 0 }])
      .jpeg()
      .toBuffer();
  })
);
const rows = Math.ceil(made.length / COLS);
await sharp({ create: { width: COLS * CW, height: rows * (CH + LBL), channels: 3, background: "#000" } })
  .composite(made.map((b, i) => ({ input: b, top: Math.floor(i / COLS) * (CH + LBL), left: (i % COLS) * CW })))
  .jpeg({ quality: 80 })
  .toFile(path.join(OUT, "_sheet.jpg"));
console.log("sheet done");
