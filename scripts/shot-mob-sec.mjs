import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SEL = process.argv[2] || "#media";
const OUT = process.argv[3] || "_content/_tour/mob-sec.jpg";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView(), SEL);
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: OUT, type: "jpeg", quality: 86 });
await browser.close();
console.log("ok", OUT);
