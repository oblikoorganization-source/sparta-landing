// Conservative dead-CSS pruner.
// Drops a top-level rule iff EVERY comma-selector in it consists solely of
// dead classes (and has no element/attribute/id target). In a mixed rule it
// prunes only the dead comma-selectors and keeps the rule. Recurses into
// @media/@supports. Leaves @keyframes/@font-face and comment banners intact.
//
//   node scripts/prune-css.mjs          # dry run: prints what it would drop
//   node scripts/prune-css.mjs --write  # rewrites app/globals.css
import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd());
const CSSPATH = path.join(ROOT, "app", "globals.css");
const WRITE = process.argv.includes("--write");

// ---- 1) used class tokens from source ----
const used = new Set();
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx|ts|jsx|js)$/.test(e.name)) {
      const txt = fs.readFileSync(p, "utf8");
      for (const m of txt.matchAll(/[A-Za-z_][A-Za-z0-9_-]+/g)) used.add(m[0]);
    }
  }
})(path.join(ROOT, "components"));
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx|ts|jsx|js)$/.test(e.name)) {
      const txt = fs.readFileSync(p, "utf8");
      for (const m of txt.matchAll(/[A-Za-z_][A-Za-z0-9_-]+/g)) used.add(m[0]);
    }
  }
})(path.join(ROOT, "app"));

// ---- never-drop allowlist (runtime/library/state classes) ----
const keep = (cls) =>
  used.has(cls) ||
  cls.startsWith("yarl") ||            // yet-another-react-lightbox runtime
  cls.startsWith("lenis") ||           // lenis runtime
  cls.startsWith("is-") ||             // state toggles
  cls.startsWith("has-") ||
  /^(active|on|open|scrolled|leaving|gone|hidden|hover|dark|visible|in|out|show|sticky|pinned|loading|sent|sending|error)$/.test(cls);

const isDeadClass = (cls) => !keep(cls);

// A complex selector (e.g. ".a .b:hover") is "dead" iff it has ≥1 class and
// every class in it is dead. Selectors with NO class (element/attr/pseudo only,
// like "[data-reveal]", "body", "*", "::selection") are NEVER considered dead.
function selectorDead(sel) {
  const classes = [...sel.matchAll(/\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g)].map((m) => m[1]);
  if (classes.length === 0) return false;
  return classes.every(isDeadClass);
}

const css = fs.readFileSync(CSSPATH, "utf8");
let i = 0;
const N = css.length;
const dropped = [];

// emit helper writes kept text into out
function parseBlockBody(end) {
  // parse a sequence of constructs until index reaches `end` (exclusive) or EOF
  let out = "";
  while (i < end) {
    // copy whitespace
    const wsStart = i;
    while (i < end && /\s/.test(css[i])) i++;
    out += css.slice(wsStart, i);
    if (i >= end) break;

    // comment
    if (css[i] === "/" && css[i + 1] === "*") {
      const close = css.indexOf("*/", i + 2);
      const c = close === -1 ? end : close + 2;
      out += css.slice(i, c);
      i = c;
      continue;
    }

    // at-rule
    if (css[i] === "@") {
      const preludeStart = i;
      while (i < end && css[i] !== "{" && css[i] !== ";") i++;
      const prelude = css.slice(preludeStart, i);
      if (css[i] === ";") {
        i++; // @import etc.
        out += prelude + ";";
        continue;
      }
      // block at-rule
      const isNestable = /^@(media|supports|container|layer)\b/.test(prelude.trim());
      const bodyStart = i + 1;
      const bodyEnd = matchBrace(bodyStart);
      if (isNestable) {
        const saved = i;
        i = bodyStart;
        const inner = parseBlockBody(bodyEnd);
        i = bodyEnd + 1;
        out += prelude + "{" + inner + "}";
      } else {
        // keyframes / font-face / etc — copy verbatim
        out += prelude + "{" + css.slice(bodyStart, bodyEnd) + "}";
        i = bodyEnd + 1;
      }
      continue;
    }

    // ordinary rule: selector { body }
    const selStart = i;
    while (i < end && css[i] !== "{" && css[i] !== "}") i++;
    if (css[i] !== "{") {
      // stray; copy and bail
      out += css.slice(selStart, i);
      continue;
    }
    const selector = css.slice(selStart, i);
    const bodyStart = i + 1;
    const bodyEnd = matchBrace(bodyStart);
    const body = css.slice(bodyStart, bodyEnd);
    i = bodyEnd + 1;

    // decide on the comma-selector list
    const parts = selector.split(",").map((s) => s);
    const alive = parts.filter((p) => !selectorDead(p.trim()));
    if (alive.length === 0) {
      dropped.push(selector.trim().replace(/\s+/g, " ").slice(0, 90));
      // drop entirely (and swallow following ws already emitted is fine)
    } else {
      const newSel = alive.join(",");
      if (alive.length !== parts.length) {
        for (const p of parts)
          if (selectorDead(p.trim()))
            dropped.push("(partial) " + p.trim().replace(/\s+/g, " ").slice(0, 80));
      }
      out += newSel + "{" + body + "}";
    }
  }
  return out;
}

function matchBrace(start) {
  let depth = 1;
  let j = start;
  while (j < N && depth > 0) {
    const ch = css[j];
    if (ch === "/" && css[j + 1] === "*") {
      const c = css.indexOf("*/", j + 2);
      j = c === -1 ? N : c + 2;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    if (depth === 0) return j;
    j++;
  }
  return j;
}

const result = parseBlockBody(N);

console.log(`dead classes in source-scan: ${[...new Set()].length}`);
console.log(`rules/selectors dropped: ${dropped.length}`);
console.log("--- sample of dropped selectors ---");
console.log(dropped.slice(0, 80).join("\n"));
console.log(`\noriginal length: ${css.length}  ->  new length: ${result.length}  (−${css.length - result.length} chars)`);

if (WRITE) {
  fs.writeFileSync(CSSPATH, result);
  console.log("\n✍  app/globals.css rewritten.");
} else {
  console.log("\n(dry run — pass --write to apply)");
}
