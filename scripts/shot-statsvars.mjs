import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 820 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5200));
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector("#stats").scrollIntoView());
await new Promise((r) => setTimeout(r, 800));
const btns = await page.$$("#stats .cqsw button");
for (let i = 0; i < btns.length; i++) {
  await btns[i].click();
  await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(() => document.querySelector("#stats").scrollIntoView());
  await page.mouse.move(700, 760);
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `_content/_shots/stats-v${i + 1}.jpg`, type: "jpeg", quality: 86 });
  console.log("stats-v" + (i + 1));
}
await browser.close();
console.log("done");
