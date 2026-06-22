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
await new Promise((r) => setTimeout(r, 9000));
await page.evaluate(() => document.fonts.ready);

for (let i = 0; i < 5; i++) {
  await page.evaluate((n) => {
    document.querySelectorAll("#media .invlsw button")[n]?.click();
  }, i);
  await new Promise((r) => setTimeout(r, 500));
  await page.evaluate(() => document.querySelector("#media").scrollIntoView());
  await new Promise((r) => setTimeout(r, 1000));
  for (let k = 0; k < 5; k++) {
    const top = await page.evaluate(() => document.querySelector("#media").getBoundingClientRect().top);
    if (Math.abs(top) < 4) break;
    await page.evaluate((t) => window.scrollBy(0, t), top);
    await new Promise((r) => setTimeout(r, 400));
  }
  await new Promise((r) => setTimeout(r, 1800));
  await page.mouse.move(700, 40);
  await page.screenshot({ path: `_content/_shots/mstat-${i + 1}.jpg`, type: "jpeg", quality: 85 });
  console.log("mstat-" + (i + 1));
}
await browser.close();
console.log("done");
