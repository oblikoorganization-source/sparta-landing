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
await new Promise((r) => setTimeout(r, 5500)); // wait out preloader
const btn = await page.$(".hero__actions .btn--line");
if (btn) {
  await btn.hover();
  await new Promise((r) => setTimeout(r, 600));
}
await page.screenshot({ path: "_content/_shots/hover-line.jpg", type: "jpeg", quality: 84 });
await browser.close();
console.log("ok");
