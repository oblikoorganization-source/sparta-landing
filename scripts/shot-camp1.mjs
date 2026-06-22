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

for (let k = 0; k < 7; k++) {
  await page.evaluate(() => document.querySelector("#camp").scrollIntoView());
  await new Promise((r) => setTimeout(r, 350));
  const top = await page.evaluate(() => document.querySelector("#camp").getBoundingClientRect().top);
  if (Math.abs(top) < 4) break;
}
await new Promise((r) => setTimeout(r, 800));
await page.mouse.move(700, 40);
await page.screenshot({ path: "_content/_shots/camp-final.jpg", type: "jpeg", quality: 86 });
// hover one card
await page.mouse.move(340, 645);
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: "_content/_shots/camp-hover.jpg", type: "jpeg", quality: 86 });
await browser.close();
console.log("done");
