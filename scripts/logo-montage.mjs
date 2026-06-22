import sharp from "sharp";
import { promises as fs } from "node:fs";

const DIR = "_content/_logo";
const files = (await fs.readdir(DIR))
  .filter((f) => /^render-\d+\.png$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

const CW = 340, CH = 320, LBL = 26, COLS = 3;
const cells = await Promise.all(
  files.map(async (f) => {
    const n = f.match(/\d+/)[0];
    const img = await sharp(`${DIR}/${f}`)
      .resize(CW, CH, { fit: "contain", background: "#9a9a9a" })
      .toBuffer();
    const svg = Buffer.from(
      `<svg width="${CW}" height="${LBL}"><rect width="100%" height="100%" fill="#df1f26"/><text x="6" y="19" font-family="monospace" font-size="15" fill="#fff">page ${n}</text></svg>`
    );
    return sharp({ create: { width: CW, height: CH + LBL, channels: 3, background: "#000" } })
      .composite([{ input: img, top: 0, left: 0 }, { input: svg, top: CH, left: 0 }])
      .jpeg()
      .toBuffer();
  })
);
const rows = Math.ceil(cells.length / COLS);
await sharp({ create: { width: COLS * CW, height: rows * (CH + LBL), channels: 3, background: "#000" } })
  .composite(cells.map((b, i) => ({ input: b, top: Math.floor(i / COLS) * (CH + LBL), left: (i % COLS) * CW })))
  .jpeg({ quality: 82 })
  .toFile(`${DIR}/_montage.jpg`);
console.log("montage done", files.length);
