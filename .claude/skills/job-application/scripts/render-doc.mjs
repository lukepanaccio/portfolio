#!/usr/bin/env node
/**
 * render-doc.mjs — markdown → ATS-safe PDF.
 *
 *   npm run jobs:pdf -- job-applications/<slug>/02-cv.md
 *   npm run jobs:pdf -- job-applications/<slug>/02-cv.md --name "Panaccio-Luke-CV-Anthropic"
 *
 * Deliberately plain output, because the reader is often a parser rather than a person.
 * Applicant tracking systems flatten or drop multi-column layouts, text boxes, header/footer
 * content, content tables and anything carrying information in an image. So: single column,
 * standard headings, real text, no graphics. The PDF is generated from HTML text rather than a
 * design tool, so the font stays selectable and the strings stay matchable.
 *
 * The markdown subset is intentional — headings, bold, italic, links, bullets, rules, paragraphs.
 * If a CV needs more than that, the CV is the problem.
 *
 * Requires Playwright: `npm install` (it's already in devDependencies).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';

const args = process.argv.slice(2);
const src = args.find((a) => !a.startsWith('--'));
const nameFlag = args.indexOf('--name');
const outName = nameFlag !== -1 ? args[nameFlag + 1] : null;

if (!src) {
  console.error('Usage: npm run jobs:pdf -- <file.md> [--name "Panaccio-Luke-CV-Company"]');
  process.exit(1);
}

const srcPath = resolve(src);
if (!existsSync(srcPath)) {
  console.error(`✗ not found: ${src}`);
  process.exit(1);
}

const rawFlag = args.includes('--raw'); // opt out of ATS sanitisation (rarely wanted)

let raw = readFileSync(srcPath, 'utf8');

/* ── ATS sanitisation ─────────────────────────────────────────────────────────
 * Applicant tracking systems extract plain text and match it against the
 * requisition. Non-ASCII "typographic" characters are where that quietly breaks:
 * strict parsers (Workday is the usual culprit) strip them, replace them with a
 * question mark, or skip the whole line — and a skipped skills line is a lost
 * keyword set, which is the difference between a screen-in and a silent reject.
 *
 * So the SENT document is normalised to ASCII. This is not cosmetic — it's the
 * one transform standing between a nicely-typeset markdown file and a resume that
 * parses everywhere. The map covers the characters this system actually emits
 * (middot separators, arrows, math signs, smart quotes, the U+2212 minus, en/em
 * dashes). Dashes collapse to hyphens too: it removes a mild parse risk AND the
 * single most-cited "this was written by AI" tell, at no cost to meaning.
 *
 * `--raw` opts out, for the rare case the output isn't going through an ATS.
 */
const ATS_MAP = [
  [/[\u00A0\u2007\u202F\u2009\u2002\u2003]/g, " "], // no-break / figure / narrow / thin / en / em spaces
  [/[\u2018\u2019\u201A\u201B]/g, "'"],           // smart single quotes
  [/[\u201C\u201D\u201E\u201F]/g, '"'],           // smart double quotes
  [/\u2026/g, "..."],                             // ellipsis
  [/\s*[\u2192\u21D2\u279C\u2794\u276F\u27A4\u2799]\s*/g, " to "], // arrows -> "to"
  [/\u00D7/g, "x"],                               // multiplication sign
  [/\u2212/g, "-"],                               // minus sign
  [/[\u2013\u2014\u2015]/g, "-"],               // en / em / horizontal dash -> hyphen
  [/\s*[\u00B7\u2022\u2023\u2043\u25AA\u25CF\u2027]\s*/g, ", "], // middot / bullet separators -> comma
  [/\u2011/g, "-"],                               // non-breaking hyphen
  [/[\u200B\uFEFF]/g, ""],                       // zero-width space / BOM
];

function sanitizeForATS(s) {
  let out = s;
  let changes = 0;
  for (const [re, sub] of ATS_MAP) {
    out = out.replace(re, (m) => { changes += 1; return sub; });
  }
  out = out.replace(/ {2,}/g, ' ').replace(/ +$/gm, ''); // tidy the doubled spaces the map can leave
  return { text: out, changes };
}

/* ── guards: things that must never reach a sent document ─────────────────── */

const warnings = [];
if (/\[verify\]/i.test(raw)) {
  warnings.push('contains [verify] markers — unconfirmed facts. Resolve these before sending.');
}
if (/`(applied-AI|platform|security|forward-deployed|devex|founding|learning|leadership)`/.test(raw)) {
  warnings.push('contains role-family tags from master-cv.md — strip them.');
}
if (/<!--/.test(raw)) {
  warnings.push('contains HTML comments (scaffold instructions) — they are stripped from the PDF, but check nothing was left unwritten.');
}
if (/^\s*\|.*\|\s*$/m.test(raw)) {
  warnings.push('contains a markdown table — tables are ATS-hostile (strict parsers scramble or drop them) and this renderer does not lay them out. Rewrite the rows as plain lines or bullets.');
}

/* Sanitise, then report. Silent normalisation would hide a real change to the
 * document from the person about to send it, so the count is surfaced. */
let sanitisedNote = null;
if (!rawFlag) {
  const { text, changes } = sanitizeForATS(raw);
  raw = text;
  if (changes) sanitisedNote = `normalised ${changes} non-ASCII character(s) to ATS-safe ASCII (use --raw to keep the originals)`;
}

/* Anything non-ASCII left after sanitising is unexpected — an accented name is
 * fine, an exotic glyph the map missed is worth a look before it ships. */
const residual = [...new Set((raw.match(/[^\x00-\x7F]/g) || []))];
if (residual.length) {
  warnings.push(`still contains non-ASCII after sanitising: ${residual.map((c) => JSON.stringify(c)).join(' ')} — confirm these parse, or replace them.`);
}

/* ── markdown → html (deliberately small subset) ──────────────────────────── */

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const inline = (s) =>
  esc(s)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `<a href="${h}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

function toHtml(md) {
  md = md.replace(/<!--[\s\S]*?-->/g, '');
  const out = [];
  let inList = false;
  const closeList = () => {
    if (inList) { out.push('</ul>'); inList = false; }
  };

  for (const line of md.split(/\r?\n/)) {
    const t = line.trim();

    if (!t) { closeList(); continue; }

    if (/^(---|___|\*\*\*)$/.test(t)) { closeList(); out.push('<hr>'); continue; }

    const h = /^(#{1,4})\s+(.*)$/.exec(t);
    if (h) {
      closeList();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }

    const li = /^[-*+]\s+(.*)$/.exec(t);
    if (li) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inline(li[1])}</li>`);
      continue;
    }

    closeList();
    out.push(`<p>${inline(t)}</p>`);
  }
  closeList();
  return out.join('\n');
}

/* ── print stylesheet ────────────────────────────────────────────────────────
 * One column. Standard headings. Real text. Nothing decorative that a parser
 * could mistake for content or drop on the floor.
 */
const CSS = `
  @page { size: A4; margin: 16mm 16mm 18mm; }
  * { box-sizing: border-box; }
  body {
    font: 10.5pt/1.45 Georgia, "Times New Roman", serif;
    color: #111; margin: 0; max-width: 100%;
  }
  h1 {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 19pt; margin: 0 0 2pt; letter-spacing: -0.01em;
  }
  h2 {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 11.5pt; text-transform: uppercase; letter-spacing: 0.08em;
    margin: 16pt 0 5pt; padding-bottom: 3pt; border-bottom: 0.6pt solid #999;
    break-after: avoid;
  }
  h3 {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 11pt; margin: 11pt 0 1pt; break-after: avoid;
  }
  h4 { font-size: 10.5pt; margin: 8pt 0 1pt; font-weight: normal; font-style: italic; }
  p { margin: 0 0 6pt; orphans: 2; widows: 2; }
  ul { margin: 3pt 0 8pt; padding-left: 15pt; }
  li { margin-bottom: 3.5pt; orphans: 2; widows: 2; }
  a { color: #111; text-decoration: none; border-bottom: 0.4pt solid #bbb; }
  code { font-family: "SF Mono", Menlo, monospace; font-size: 9.5pt; }
  hr { border: 0; border-top: 0.5pt solid #ccc; margin: 12pt 0; }
  strong { font-weight: 700; }
  h1 + ul { margin-top: 6pt; }
  h1 + ul li { margin-bottom: 1.5pt; }
`;

// PDF title metadata: prefer the document's own H1 (e.g. "Luke Panaccio") over the
// filename, so the PDF identifies itself sensibly in a viewer's title bar.
const h1 = /^#\s+(.*)$/m.exec(raw);
const docTitle = (h1 ? h1[1] : outName || basename(srcPath, '.md')).replace(/[*_`]/g, '').trim();

const html = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8">
<title>${esc(docTitle)}</title><style>${CSS}</style></head>
<body>${toHtml(raw)}</body></html>`;

/* ── render ──────────────────────────────────────────────────────────────── */

const outPath = join(dirname(srcPath), `${outName || basename(srcPath, '.md')}.pdf`);
const debugHtml = outPath.replace(/\.pdf$/, '.html');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  writeFileSync(debugHtml, html);
  console.error(
    `✗ Playwright not installed. Run \`npm install\` first.\n` +
      `  Wrote ${basename(debugHtml)} — you can print that to PDF from a browser in the meantime.`,
  );
  process.exit(1);
}

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {},
);
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.pdf({ path: outPath, format: 'A4', printBackground: false, preferCSSPageSize: true });
await browser.close();

console.log(`✓ ${outPath.replace(process.cwd() + '/', '')}`);
if (sanitisedNote) console.log(`  ${sanitisedNote}`);

if (warnings.length) {
  console.error('\n! Before sending:');
  for (const w of warnings) console.error(`    - ${w}`);
  process.exitCode = 1;
}
