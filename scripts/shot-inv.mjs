import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 1580 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5200));
await page.evaluate(() => document.fonts.ready);

for (let i = 1; i <= 6; i++) {
  await page.evaluate((n) => {
    document.querySelectorAll("#inventory .invsw button")[n - 1]?.click();
  }, i);
  await new Promise((r) => setTimeout(r, 500));
  await page.evaluate(() => document.querySelector("#inventory").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1500));
  await page.mouse.move(700, 40);
  await page.screenshot({ path: `_content/_shots/inv-v${i}.jpg`, type: "jpeg", quality: 84 });
  console.log("inv-v" + i);
}
await browser.close();
console.log("done");
