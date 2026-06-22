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
await new Promise((r) => setTimeout(r, 5200));
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector("#locations").scrollIntoView());
await new Promise((r) => setTimeout(r, 1800));

const VARIANTS = ["tlbr"];
for (const v of VARIANTS) {
  await page.evaluate((cls) => {
    const sec = document.querySelector("#locations");
    sec.classList.remove("glow--tr", "glow--tl", "glow--br", "glow--bl", "glow--r", "glow--off");
    sec.classList.add("glow--" + cls);
  }, v);
  await new Promise((r) => setTimeout(r, 350));
  await page.mouse.move(700, 60);
  await page.screenshot({ path: `_content/_shots/glow-${v}.jpg`, type: "jpeg", quality: 86 });
  console.log("glow-" + v);
}
await browser.close();
console.log("done");
