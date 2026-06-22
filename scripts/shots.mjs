import puppeteer from "puppeteer-core";
import { promises as fs } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "_content/_shots";
await fs.mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);

// scroll through to trigger GSAP ScrollTrigger reveals
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 130));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
});

// hero viewport
await page.screenshot({ path: `${OUT}/01-hero.jpg`, type: "jpeg", quality: 80 });

// full page
await page.screenshot({ path: `${OUT}/full.jpg`, type: "jpeg", quality: 70, fullPage: true });

// section viewports by id
const ids = ["club", "palmares", "locations", "inventory", "media", "gallery", "camp", "contacts"];
let n = 2;
for (const id of ids) {
  const el = await page.$(`#${id}`);
  if (!el) continue;
  await el.scrollIntoView();
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `${OUT}/${String(n).padStart(2, "0")}-${id}.jpg`, type: "jpeg", quality: 80 });
  n++;
}

await browser.close();
console.log("shots done");
