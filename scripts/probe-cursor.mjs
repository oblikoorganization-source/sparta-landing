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
await page.evaluate(() => document.querySelector("#stats").scrollIntoView());
await new Promise((r) => setTimeout(r, 900));

const report = await page.evaluate(() => {
  // replicate Cursor.tsx detection exactly
  function detect(el) {
    let red = !!el.closest(
      ".btn--solid, .inv__cta, .hswitch button.on, .red, .l1, .hv1 .hv__title .b"
    );
    let bgFound = null;
    if (!red) {
      let node = el;
      while (node && node !== document.body) {
        const bg = getComputedStyle(node).backgroundColor;
        const m = bg.match(/rgba?\(([^)]+)\)/);
        if (m) {
          const [r, g, b, a = 1] = m[1].split(",").map((s) => parseFloat(s));
          if (a > 0.5) {
            bgFound = bg;
            if (r > 120 && r > g * 1.7 && r > b * 1.7) red = true;
            break;
          }
        }
        node = node.parentElement;
      }
    }
    return { red, bgFound };
  }
  const sec = document.querySelector("#stats");
  const r = sec.getBoundingClientRect();
  const out = [];
  for (let yy = 0.15; yy < 1; yy += 0.18) {
    for (let xx = 0.1; xx < 1; xx += 0.18) {
      const px = Math.round(r.left + r.width * xx);
      const py = Math.round(r.top + r.height * yy);
      const el = document.elementFromPoint(px, py);
      if (!el) continue;
      const d = detect(el);
      out.push({
        x: xx.toFixed(2),
        y: yy.toFixed(2),
        tag: el.className || el.tagName,
        red: d.red,
        bg: d.bgFound,
      });
    }
  }
  return out;
});
console.log(JSON.stringify(report, null, 1));
await browser.close();
