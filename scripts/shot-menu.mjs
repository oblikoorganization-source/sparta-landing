import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"], defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
await p.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 500));
await p.screenshot({ path: "_content/_shots/mob-hero2.jpg", type: "jpeg", quality: 82 });
// open menu
await p.evaluate(() => document.querySelector(".burger")?.click());
await new Promise((r) => setTimeout(r, 800));
await p.screenshot({ path: "_content/_shots/mob-menu.jpg", type: "jpeg", quality: 82 });
await b.close();
console.log("done");
