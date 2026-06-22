import puppeteer from "puppeteer-core";
import { promises as fs } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "_content/_shots";
await fs.mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/heroes", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1500));

for (let i = 0; i < 5; i++) {
  await page.evaluate((n) => window.scrollTo(0, n * window.innerHeight), i);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/hero-v${i + 1}.jpg`, type: "jpeg", quality: 82 });
  console.log("hero-v" + (i + 1));
}

await browser.close();
console.log("done");
