import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 820 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/club-title", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 4200)); // wait out preloader
const secs = await page.$$("section");
for (let i = 0; i < secs.length; i++) {
  await secs[i].scrollIntoView();
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `_content/_shots/ct-v${i + 1}.jpg`, type: "jpeg", quality: 86 });
  console.log("ct-v" + (i + 1));
}
await browser.close();
console.log("done");
