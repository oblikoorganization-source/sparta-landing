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

for (let i = 0; i < 5; i++) {
  await page.evaluate((n) => {
    document.querySelectorAll("#inventory .invhsw button")[n]?.click();
  }, i);
  await new Promise((r) => setTimeout(r, 500));
  await page.evaluate(() => document.querySelector("#inventory").scrollIntoView());
  await new Promise((r) => setTimeout(r, 400));
  await page.mouse.move(700, 40);
  await page.screenshot({ path: `_content/_shots/ivhead-${i + 1}.jpg`, type: "jpeg", quality: 86 });
  console.log("ivhead-" + (i + 1));
}
await browser.close();
console.log("done");
