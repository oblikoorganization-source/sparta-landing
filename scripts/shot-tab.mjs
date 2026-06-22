import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"], defaultViewport: { width: 820, height: 1180, deviceScaleFactor: 1 } });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
await p.evaluate(() => document.fonts.ready);
const ids = ["club", "stats", "locations", "inventory", "media", "partners", "contacts"];
for (const id of ids) {
  for (let k = 0; k < 8; k++) {
    await p.evaluate((i) => document.getElementById(i)?.scrollIntoView({ block: "start" }), id);
    await new Promise((r) => setTimeout(r, 280));
    const top = await p.evaluate((i) => document.getElementById(i)?.getBoundingClientRect().top ?? 0, id);
    if (Math.abs(top) < 8) break;
  }
  await new Promise((r) => setTimeout(r, 500));
  await p.screenshot({ path: `_content/_shots/tab-${id}.jpg`, type: "jpeg", quality: 78 });
  console.log("tab-" + id);
}
await b.close();
console.log("done");
