import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"], defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
await p.evaluate(() => document.fonts.ready);
// scroll to mid-page (contacts) so .scrolled is active
for (let k = 0; k < 8; k++) {
  await p.evaluate(() => document.getElementById("media")?.scrollIntoView({ block: "start" }));
  await new Promise((r) => setTimeout(r, 300));
  const top = await p.evaluate(() => document.getElementById("media")?.getBoundingClientRect().top ?? 0);
  if (Math.abs(top) < 8) break;
}
await new Promise((r) => setTimeout(r, 500));
// open menu while scrolled
await p.evaluate(() => document.querySelector(".burger")?.click());
await new Promise((r) => setTimeout(r, 800));
await p.screenshot({ path: "_content/_shots/mob-menu2.jpg", type: "jpeg", quality: 82 });
await b.close();
console.log("done");
