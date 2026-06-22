import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: "_content/_shots/preloader.jpg", type: "jpeg", quality: 84 });
await new Promise((r) => setTimeout(r, 5200));
await page.screenshot({ path: "_content/_shots/hero-final.jpg", type: "jpeg", quality: 84 });
// stats strip (just below hero)
await page.evaluate(() => window.scrollTo(0, window.innerHeight - 120));
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: "_content/_shots/stats.jpg", type: "jpeg", quality: 84 });
await browser.close();
console.log("ok");
