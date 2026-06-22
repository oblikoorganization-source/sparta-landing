import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 2000));
await page.screenshot({ path: "_content/_shots/main-hero-default.jpg", type: "jpeg", quality: 84 });

const btns = await page.$$(".hswitch button");
for (let i = 0; i < btns.length; i++) {
  await btns[i].click();
  await new Promise((r) => setTimeout(r, 1500));
  // move mouse away so cursor blob doesn't tint the active button
  await page.mouse.move(720, 20);
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `_content/_shots/main-hero-v${i + 1}.jpg`, type: "jpeg", quality: 84 });
  console.log("v" + (i + 1));
}
await browser.close();
console.log("done");
