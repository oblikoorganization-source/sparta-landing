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
await new Promise((r) => setTimeout(r, 800));

async function probe(name, selector) {
  const box = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, selector);
  if (!box) return console.log(name, "-> NOT FOUND");
  // real mouse move -> fires window 'mouseover' -> Cursor.over()
  await page.mouse.move(box.x, box.y, { steps: 4 });
  await new Promise((r) => setTimeout(r, 120));
  const info = await page.evaluate((b) => {
    const el = document.elementFromPoint(b.x, b.y);
    return {
      cls: document.querySelector(".cursor")?.className,
      el: el ? el.tagName + "." + (el.className || "") : "none",
      matchChip: !!el?.closest(".loc-chips span"),
      bg: el ? getComputedStyle(el).backgroundColor : "",
    };
  }, box);
  const dark = info.cls?.includes("dark");
  console.log(
    `${name.padEnd(26)} dark=${dark ? "YES OK" : "no "}  el=${info.el}  closest(.loc-chips span)=${info.matchChip}  bg=${info.bg}`
  );
}

await probe("RED text «цифрах»", "#stats .red");
await probe("stats card (hover->red)", "#stats .stx2--0 .st");
await probe("section bg", "#stats .stats2__lead");
// hover a red-on-hover chip in locations
await page.evaluate(() => document.querySelector("#locations").scrollIntoView());
await new Promise((r) => setTimeout(r, 1800)); // let Lenis smooth-scroll settle
await probe("loc chip (hover->red)", "#locations .loc-chips span");
await probe("solid red button", "#locations .btn--solid");

await browser.close();
