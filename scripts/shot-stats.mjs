import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 820 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5200));
await page.evaluate(() => document.querySelector("#stats").scrollIntoView());
await new Promise((r) => setTimeout(r, 1500)); // let an auto-highlight land
await page.mouse.move(300, 760);
await page.screenshot({ path: "_content/_shots/stats-final.jpg", type: "jpeg", quality: 86 });
await browser.close();
console.log("ok");
