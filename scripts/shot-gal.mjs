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

for (let i = 0; i < 4; i++) {
  await page.evaluate((n) => {
    document.querySelectorAll("#gallery .invlsw button")[n]?.click();
  }, i);
  await new Promise((r) => setTimeout(r, 500));
  await page.evaluate(() => document.querySelector("#gallery").scrollIntoView());
  await new Promise((r) => setTimeout(r, 900));
  await page.mouse.move(700, 40);
  await page.screenshot({ path: `_content/_shots/gal-${i + 1}.jpg`, type: "jpeg", quality: 84 });
  console.log("gal-" + (i + 1));
}

// open the lightbox on a photo
await page.evaluate(() => {
  const item = document.querySelectorAll("#gallery .galx__item")[4];
  item?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
});
await new Promise((r) => setTimeout(r, 1600));
await page.screenshot({ path: "_content/_shots/gal-lightbox.jpg", type: "jpeg", quality: 84 });
console.log("gal-lightbox");

await browser.close();
console.log("done");
