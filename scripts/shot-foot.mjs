import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"], defaultViewport: { width: 1440, height: 620 } });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
await p.evaluate(() => document.fonts.ready);
for (let k = 0; k < 10; k++) {
  await p.evaluate(() => document.querySelector(".foot").scrollIntoView({ block: "start" }));
  await new Promise((r) => setTimeout(r, 350));
  const top = await p.evaluate(() => document.querySelector(".foot").getBoundingClientRect().top);
  if (Math.abs(top) < 6) break;
}
await new Promise((r) => setTimeout(r, 800));
await p.screenshot({ path: "_content/_shots/footer.jpg", type: "jpeg", quality: 90 });
await b.close();
console.log("done");
