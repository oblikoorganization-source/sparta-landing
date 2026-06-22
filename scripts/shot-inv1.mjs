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
await new Promise((r) => setTimeout(r, 9000));
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector("#inventory").scrollIntoView());
await new Promise((r) => setTimeout(r, 1500));
// converge: nudge until the section top sits at viewport 0 (Lenis lags scrollIntoView)
for (let k = 0; k < 5; k++) {
  const top = await page.evaluate(() => document.querySelector("#inventory").getBoundingClientRect().top);
  if (Math.abs(top) < 3) break;
  await page.evaluate((t) => window.scrollBy(0, t), top);
  await new Promise((r) => setTimeout(r, 450));
}
await page.mouse.move(700, 40);
await page.screenshot({ path: "_content/_shots/inv-final.jpg", type: "jpeg", quality: 88 });
await browser.close();
console.log("ok");
