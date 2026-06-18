import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import path from 'path';

// Usage: node scripts/render-preview.mjs label1=path1.svg label2=path2.svg ...
const args = process.argv.slice(2);
const items = args.map((a) => {
  const i = a.indexOf('=');
  return i === -1 ? { label: path.basename(a), file: a } : { label: a.slice(0, i), file: a.slice(i + 1) };
});

const CW = 800, CH = 450; // css size per card (rendered at 2x => 1600x900)
const cells = items.map(({ label, file }) =>
  `<div class="cell"><div class="lab">${label}</div><div class="thumb">${readFileSync(file, 'utf8')}</div></div>`
).join('');

const html = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:#05070d;padding:24px;font:14px ui-monospace,monospace;color:#9ca3af}
  .cell{margin-bottom:26px}
  .lab{margin:0 0 8px;color:#f59e0b;font-weight:600;letter-spacing:1px}
  .thumb{width:${CW}px;height:${CH}px;border:1px solid #222;border-radius:12px;overflow:hidden}
  .thumb svg{width:${CW}px;height:${CH}px;display:block}
</style><body>${cells}</body>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.setViewportSize({ width: CW + 48, height: (CH + 42) * items.length + 48 });
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(200);
const out = path.join(process.env.TMPDIR || '/tmp', 'hero-preview.png');
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);
