import puppeteer from "puppeteer-core";
import fs from "fs";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "_content/_tour";
fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
// wait for first compile + preloader
await new Promise((r) => setTimeout(r, 9000));

const H = await page.evaluate(() => document.body.scrollHeight);
const vh = 900;
const steps = Math.ceil(H / vh);
console.log("pageHeight", H, "steps", steps);

let i = 0;
for (let y = 0; y < H; y += vh) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 1400));
  const n = String(i).padStart(2, "0");
  await page.screenshot({ path: `${OUT}/sec-${n}.jpg`, type: "jpeg", quality: 82 });
  console.log("shot", n, "@", y);
  i++;
}
await browser.close();
console.log("done");
