// Verify the Android perf fallback vs desktop video behaviour.
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3000";

const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36";

async function run(label, { mobile }) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
  const page = await browser.newPage();
  if (mobile) {
    await page.setUserAgent(ANDROID_UA);
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  } else {
    await page.setViewport({ width: 1440, height: 900 });
  }
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  // scroll through to trigger IntersectionObservers
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  const res = await page.evaluate(() => {
    const vids = Array.from(document.querySelectorAll("video"));
    return {
      isAndroidClass: document.documentElement.classList.contains("is-android"),
      totalVideos: vids.length,
      withSrc: vids.filter((v) => v.currentSrc || v.src).length,
      withPoster: vids.filter((v) => v.poster).length,
      playing: vids.filter((v) => !v.paused && !v.ended && v.readyState > 2).length,
    };
  });
  console.log(`\n[${label}]`, JSON.stringify(res, null, 2));
  await browser.close();
}

await run("DESKTOP", { mobile: false });
await run("ANDROID", { mobile: true });
console.log("\ndone");
