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
  await page.evaluate(() => document.querySelector("#contacts").scrollIntoView());
  await new Promise((r) => setTimeout(r, 320));
  const top = await page.evaluate(() => document.querySelector("#contacts").getBoundingClientRect().top);
  if (Math.abs(top) < 4) break;
}
await new Promise((r) => setTimeout(r, 800));
await page.mouse.move(700, 30);
await page.screenshot({ path: "_content/_shots/ct-wow.jpg", type: "jpeg", quality: 90 });
// focus a field to show floating label
await page.focus("#cf-name");
await page.type("#cf-name", "Данило");
await page.focus("#cf-phone");
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: "_content/_shots/ct-wow-focus.jpg", type: "jpeg", quality: 90 });
await browser.close();
console.log("done");
