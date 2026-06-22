import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5200));
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector("#locations").scrollIntoView());
await new Promise((r) => setTimeout(r, 700));
await page.mouse.move(700, 60);
await page.screenshot({ path: "_content/_shots/loc-final.jpg", type: "jpeg", quality: 86 });
await browser.close();
console.log("ok");
