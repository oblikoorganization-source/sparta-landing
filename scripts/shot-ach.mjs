import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5200));
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector("#palmares").scrollIntoView());
await new Promise((r) => setTimeout(r, 800));
const btns = await page.$$("#palmares .palsw .fontsw:first-child button");
for (let i = 0; i < btns.length; i++) {
  await btns[i].click();
  await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(() => document.querySelector("#palmares").scrollIntoView());
  await page.mouse.move(720, 60);
  await new Promise((r) => setTimeout(r, 250));
  await page.screenshot({ path: `_content/_shots/ach-v${i + 1}.jpg`, type: "jpeg", quality: 85 });
  console.log("ach-v" + (i + 1));
}
await browser.close();
console.log("done");
