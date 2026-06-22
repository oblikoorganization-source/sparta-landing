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
for (let k = 0; k < 7; k++) {
  await page.evaluate(() => document.querySelector("#contacts").scrollIntoView());
  await new Promise((r) => setTimeout(r, 320));
  const top = await page.evaluate(() => document.querySelector("#contacts").getBoundingClientRect().top);
  if (Math.abs(top) < 4) break;
}
await new Promise((r) => setTimeout(r, 700));

// 1) validation — submit empty
await page.evaluate(() => document.querySelector(".formx__submit")?.click());
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: "_content/_shots/ctform-valid.jpg", type: "jpeg", quality: 90 });
console.log("validation shot");

// 2) success — fill + submit
await page.type("#cf-name", "Данило");
await page.type("#cf-phone", "@danik");
await page.evaluate(() => document.querySelector(".formx__submit")?.click());
await new Promise((r) => setTimeout(r, 2800));
await page.screenshot({ path: "_content/_shots/ctform-sent.jpg", type: "jpeg", quality: 90 });
console.log("success shot");

await browser.close();
console.log("done");
