import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 860 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5200));
await page.evaluate(() => document.querySelector("#club").scrollIntoView());
await new Promise((r) => setTimeout(r, 1000));
await page.mouse.move(700, 30);
await page.screenshot({ path: "_content/_shots/club-default.jpg", type: "jpeg", quality: 86 });
// switch to font 1 (Big Shoulders)
const btns = await page.$$("#club .fontsw button");
if (btns[0]) { await btns[0].click(); await new Promise((r) => setTimeout(r, 700)); await page.mouse.move(700, 30); }
await page.screenshot({ path: "_content/_shots/club-font1.jpg", type: "jpeg", quality: 86 });
await browser.close();
console.log("ok");
