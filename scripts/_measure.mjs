import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"], defaultViewport: { width: 1440, height: 900 } });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
const m = await p.evaluate(() => {
  const sec = document.querySelector("#inventory");
  const wrap = document.querySelector("#inventory .iv-wrap");
  const cs = getComputedStyle(sec);
  return {
    secH: sec.offsetHeight,
    wrapH: wrap.offsetHeight,
    contentNeeded: parseFloat(cs.paddingTop) + wrap.offsetHeight + parseFloat(cs.paddingBottom),
    padTop: cs.paddingTop,
    padBot: cs.paddingBottom,
    vh: window.innerHeight,
  };
});
console.log(JSON.stringify(m, null, 1));
await b.close();
