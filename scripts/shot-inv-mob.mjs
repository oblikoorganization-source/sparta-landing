import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
await page.evaluate(() => {
  const el = document.getElementById("inventory");
  if (el) el.scrollIntoView();
});
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: "_content/_tour/inv-mob.jpg", type: "jpeg", quality: 86 });
await browser.close();
console.log("ok");
