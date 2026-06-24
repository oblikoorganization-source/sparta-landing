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
await new Promise((r) => setTimeout(r, 9000));
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector("#partners").scrollIntoView());
await new Promise((r) => setTimeout(r, 900));
await page.mouse.move(720, 60);
await page.screenshot({ path: "_content/_shots/promo-badge.jpg", type: "jpeg", quality: 88 });
// open the modal
await page.click(".promo-badge");
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: "_content/_shots/promo-modal.jpg", type: "jpeg", quality: 88 });
await browser.close();
console.log("ok");
