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
    document.querySelectorAll("#camp .invlsw button")[n]?.click();
  }, i);
  await new Promise((r) => setTimeout(r, 500));
  // scroll-convergence so #camp top sits at ~0
  for (let k = 0; k < 6; k++) {
    await page.evaluate(() => document.querySelector("#camp").scrollIntoView());
    await new Promise((r) => setTimeout(r, 350));
    const top = await page.evaluate(() => document.querySelector("#camp").getBoundingClientRect().top);
    if (Math.abs(top) < 4) break;
  }
  await new Promise((r) => setTimeout(r, 700));
  await page.mouse.move(700, 40);
  await page.screenshot({ path: `_content/_shots/camp-${i + 1}.jpg`, type: "jpeg", quality: 84 });
  console.log("camp-" + (i + 1));
}

await browser.close();
console.log("done");
