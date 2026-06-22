// Heuristic dead-CSS finder. Collects every class-like token that appears
// ANYWHERE in the tsx/ts sources (classNames, querySelector strings, JS
// template fragments), then reports CSS class selectors whose class is never
// referenced. Review before deleting — dynamic/compound classes can be missed.
import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd());
const SRC_DIRS = ["components", "app"];
const CSS = path.join(ROOT, "app", "globals.css");

// 1) gather used class tokens from source
const used = new Set();
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx|ts|jsx|js)$/.test(e.name) && !p.includes("node_modules")) {
      const txt = fs.readFileSync(p, "utf8");
      // any identifier-ish token (covers className lists, querySelector args,
      // template `${x ? "a" : "b"}` fragments, getElementsByClassName, etc.)
      for (const m of txt.matchAll(/[A-Za-z_][A-Za-z0-9_-]+/g)) used.add(m[0]);
    }
  }
}
SRC_DIRS.forEach((d) => walk(path.join(ROOT, d)));

// 2) extract class selectors from CSS
const css = fs.readFileSync(CSS, "utf8");
const classes = new Set();
for (const m of css.matchAll(/\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g)) classes.add(m[1]);

// 3) classes defined in CSS but never seen in source
const dead = [...classes].filter((c) => !used.has(c)).sort();
console.log(`source class tokens: ${used.size}`);
console.log(`css classes: ${classes.size}`);
console.log(`\n=== ${dead.length} CSS classes never referenced in source ===`);
console.log(dead.join("\n"));
