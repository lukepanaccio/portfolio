import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const defs = `<defs>
  <linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#fbbf24"/></linearGradient>
  <radialGradient id="g" cx="74%" cy="22%" r="85%"><stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/><stop offset="70%" stop-color="#fbbf24" stop-opacity="0"/></radialGradient>
</defs>`;
const tile = (inner, border = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${defs}
  <rect x="2" y="2" width="60" height="60" rx="15" fill="#0a0e1a"/>
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#g)"/>
  ${border ? '<rect x="3.25" y="3.25" width="57.5" height="57.5" rx="13.5" fill="none" stroke="url(#a)" stroke-width="2"/>' : ''}
  ${inner}</svg>`;

const candidates = {
  'A · terminal prompt': tile(`
    <polyline points="20,22 33,32 20,42" fill="none" stroke="url(#a)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="36" y="39" width="16" height="6" rx="3" fill="url(#a)"/>`),
  'B · node graph': tile(`
    <g stroke="url(#a)" stroke-width="3.5"><path d="M32 32 L20 21 M32 32 L45 23 M32 32 L29 46"/></g>
    <g fill="#0a0e1a" stroke="url(#a)" stroke-width="3.5"><circle cx="20" cy="21" r="5"/><circle cx="45" cy="23" r="5"/><circle cx="29" cy="46" r="5"/></g>
    <circle cx="32" cy="32" r="7.5" fill="url(#a)"/>`),
  'C · agent hub': tile(`
    <g stroke="url(#a)" stroke-width="3.5"><path d="M32 32 V18 M32 32 L46 41 M32 32 L18 41"/></g>
    <g fill="url(#a)"><circle cx="32" cy="16" r="4.5"/><circle cx="47" cy="42" r="4.5"/><circle cx="17" cy="42" r="4.5"/></g>
    <circle cx="32" cy="32" r="9" fill="#0a0e1a" stroke="url(#a)" stroke-width="4"/><circle cx="32" cy="32" r="3.5" fill="url(#a)"/>`),
  'D · hexagon gate': tile(`
    <polygon points="32,15 49,24 49,42 32,51 15,42 15,24" fill="none" stroke="url(#a)" stroke-width="4.5" stroke-linejoin="round"/>
    <circle cx="32" cy="33" r="5.5" fill="url(#a)"/>`),
  'E · pipeline arrow': tile(`
    <g fill="url(#a)"><circle cx="18" cy="32" r="5"/></g>
    <path d="M25 32 H40" stroke="url(#a)" stroke-width="5" stroke-linecap="round"/>
    <path d="M38 24 L50 32 L38 40 Z" fill="url(#a)"/>`),
};

const sizes = [96, 48, 32, 24, 16];
const rows = Object.entries(candidates).map(([label, svg]) => {
  const cells = sizes.map(s => `<div class="ic" style="width:${s}px;height:${s}px">${svg}</div><span class="sz">${s}</span>`).join('');
  return `<div class="row"><div class="lbl">${label}</div><div class="icons">${cells}</div></div>`;
}).join('');

const html = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:#11151c;padding:26px;font:13px ui-monospace,monospace;color:#cbd5e1}
  .row{display:flex;align-items:center;gap:22px;padding:14px 0;border-bottom:1px solid #222}
  .lbl{width:170px;color:#f59e0b;font-weight:600}
  .icons{display:flex;align-items:center;gap:18px}
  .ic svg{width:100%;height:100%;display:block}
  .sz{color:#6b7280;margin-right:8px}
  .icons .ic + .sz{margin-left:-12px}
</style><body>${rows}</body>`;

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 2 });
const page = await context.newPage();
await page.setViewportSize({ width: 760, height: 560 });
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(150);
const out = path.join(process.env.TMPDIR || '/tmp', 'favicons.png');
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);
