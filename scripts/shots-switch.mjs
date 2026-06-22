import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/heroes", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: "_content/_shots/switch-default.jpg", type: "jpeg", quality: 82 });
// click variant 3
const btns = await page.$$(".hswitch button");
await btns[2].click();
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: "_content/_shots/switch-v3.jpg", type: "jpeg", quality: 82 });
await browser.close();
console.log("ok");
