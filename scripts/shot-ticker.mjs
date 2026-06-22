import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 600 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5200));
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector(".tkblock").scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 700));
const btns = await page.$$(".tksw-bar button");
for (let i = 0; i < btns.length; i++) {
  await btns[i].click();
  await new Promise((r) => setTimeout(r, 500));
  await page.mouse.move(1300, 60);
  await page.screenshot({ path: `_content/_shots/tk-v${i + 1}.jpg`, type: "jpeg", quality: 88 });
  console.log("tk-v" + (i + 1));
}
await browser.close();
console.log("done");
