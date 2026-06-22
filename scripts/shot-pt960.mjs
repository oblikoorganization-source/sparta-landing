import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"], defaultViewport: { width: 980, height: 1100 } });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
await p.evaluate(() => document.fonts.ready);
for (let k = 0; k < 8; k++) {
  await p.evaluate(() => document.getElementById("partners")?.scrollIntoView({ block: "start" }));
  await new Promise((r) => setTimeout(r, 280));
  const top = await p.evaluate(() => document.getElementById("partners")?.getBoundingClientRect().top ?? 0);
  if (Math.abs(top) < 8) break;
}
await new Promise((r) => setTimeout(r, 600));
await p.screenshot({ path: "_content/_shots/pt-960.jpg", type: "jpeg", quality: 84 });
await b.close();
console.log("done");
