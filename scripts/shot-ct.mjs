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

for (let i = 0; i < 5; i++) {
  await page.evaluate((n) => {
    document.querySelectorAll("#contacts .invlsw button")[n]?.click();
  }, i);
  await new Promise((r) => setTimeout(r, 400));
  for (let k = 0; k < 7; k++) {
    await page.evaluate(() => document.querySelector("#contacts").scrollIntoView());
    await new Promise((r) => setTimeout(r, 320));
    const top = await page.evaluate(() => document.querySelector("#contacts").getBoundingClientRect().top);
    if (Math.abs(top) < 4) break;
  }
  await new Promise((r) => setTimeout(r, 700));
  await page.mouse.move(700, 30);
  await page.screenshot({ path: `_content/_shots/ct-${i + 1}.jpg`, type: "jpeg", quality: 88 });
  console.log("ct-" + (i + 1));
}
await browser.close();
console.log("done");
