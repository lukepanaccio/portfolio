import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const read = (name) => readFileSync(path.join(dir, name), 'utf8');

// The newly themed kept-page heroes (16:9)
const slugs = ['content-drift','paper-grader','alex-chen','modular-paths','dev-essentials','marcus','3-steps'];
const cards = slugs.map(s =>
  `<div class="cell"><div class="thumb">${read(`${s}-hero.svg`)}</div><div class="cap">${s}-hero.svg</div></div>`
).join('');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  body { margin:0; background:#05070d; padding:24px; font:13px ui-monospace,monospace; color:#9ca3af; }
  h2 { color:#f59e0b; font:600 15px ui-monospace,monospace; margin:6px 0 14px; }
  .feat { width:540px; height:648px; border-radius:12px; overflow:hidden; border:1px solid #333; margin-bottom:30px; }
  .feat svg { width:540px; height:648px; display:block; }
  .grid { display:grid; grid-template-columns:repeat(3, 400px); gap:20px; }
  .thumb { width:400px; height:225px; border-radius:10px; overflow:hidden; border:1px solid #222; }
  .thumb svg { width:400px; height:225px; display:block; }
  .cap { padding:6px 2px; }
</style></head><body>
  <h2>FEATURED (portrait, fills the hero column)</h2>
  <div class="feat">${read('featured-hero.svg')}</div>
  <h2>NEWLY THEMED KEPT-PAGE HEROES</h2>
  <div class="grid">${cards}</div>
</body></html>`;

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 1 });
const page = await context.newPage();
await page.setViewportSize({ width: 1340, height: 1400 });
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(200);
const outPath = path.join(process.env.TMPDIR || '/tmp', 'contact2.png');
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log(outPath);
