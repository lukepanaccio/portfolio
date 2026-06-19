import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import path from 'path';

const file = process.argv[2];
const targetW = Number(process.argv[3] || 560);
const svg = readFileSync(file, 'utf8');
const vb = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
const [w, h] = vb ? [Number(vb[1]), Number(vb[2])] : [1600, 900];
const dw = targetW, dh = Math.round((targetW * h) / w);

const html = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:#05070d;padding:24px}
  .thumb{width:${dw}px;height:${dh}px;border:1px solid #222;border-radius:12px;overflow:hidden}
  .thumb svg{width:${dw}px;height:${dh}px;display:block}
</style><body><div class="thumb">${svg}</div></body>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.setViewportSize({ width: dw + 48, height: dh + 48 });
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(200);
const out = path.join(process.env.TMPDIR || '/tmp', 'render-one.png');
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);
