import { chromium } from 'playwright';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';

const dir = path.resolve('public/images');
const files = readdirSync(dir).filter((f) => f.endsWith('-hero.svg')).sort();

const CW = 426, CH = 240; // 16:9 thumbs, rendered at 2x
const cells = files.map((f) =>
  `<figure><div class="thumb">${readFileSync(path.join(dir, f), 'utf8')}</div><figcaption>${f}</figcaption></figure>`
).join('');

const html = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:#05070d;padding:24px;font:13px ui-monospace,monospace;color:#9ca3af}
  .grid{display:grid;grid-template-columns:repeat(3,${CW}px);gap:22px}
  figure{margin:0}
  .thumb{width:${CW}px;height:${CH}px;border:1px solid #222;border-radius:12px;overflow:hidden}
  .thumb svg{width:${CW}px;height:${CH}px;display:block}
  figcaption{padding:7px 2px;color:#f59e0b}
</style><body><div class="grid">${cells}</div></body>`;

const cols = 3, rows = Math.ceil(files.length / cols);
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.setViewportSize({ width: CW * cols + 22 * (cols - 1) + 48, height: (CH + 34) * rows + 48 });
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(250);
const out = path.join(process.env.TMPDIR || '/tmp', 'contact-sheet.png');
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);
