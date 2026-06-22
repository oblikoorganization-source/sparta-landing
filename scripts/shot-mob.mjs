import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"], defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
await p.evaluate(() => document.fonts.ready);

const ids = ["top", "club", "stats", "palmares", "locations", "inventory", "media", "gallery", "camp", "partners", "contacts"];
for (const id of ids) {
  for (let k = 0; k < 8; k++) {
    await p.evaluate((i) => document.getElementById(i)?.scrollIntoView({ block: "start" }), id);
    await new Promise((r) => setTimeout(r, 280));
    const top = await p.evaluate((i) => document.getElementById(i)?.getBoundingClientRect().top ?? 0, id);
    if (Math.abs(top) < 8) break;
  }
  await new Promise((r) => setTimeout(r, 500));
  await p.screenshot({ path: `_content/_shots/mob-${id}.jpg`, type: "jpeg", quality: 80 });
  console.log("mob-" + id);
}
// footer
await p.evaluate(() => document.querySelector(".foot")?.scrollIntoView({ block: "start" }));
await new Promise((r) => setTimeout(r, 800));
await p.screenshot({ path: "_content/_shots/mob-footer.jpg", type: "jpeg", quality: 80 });
await b.close();
console.log("done");
