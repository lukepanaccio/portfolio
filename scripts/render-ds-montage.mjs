import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import path from 'path';

const files = [
  'design-system/index.html',
  'design-system/foundations/color.html',
  'design-system/foundations/type.html',
  'design-system/foundations/atmosphere.html',
  'design-system/foundations/spacing.html',
  'design-system/components/buttons.html',
  'design-system/components/badges.html',
  'design-system/components/metrics.html',
  'design-system/components/header.html',
  'design-system/components/footer.html',
  'design-system/components/project-card.html',
  'design-system/heroes/00-recipe.html',
];

const W = 860, H = 600, cols = 2;
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1.25 });
const page = await ctx.newPage();
await page.setViewportSize({ width: (W + 24) * cols + 48, height: (H + 32) * Math.ceil(files.length / cols) + 48 });
await page.setContent(`<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:#02040a;padding:24px;font:12px ui-monospace,monospace;color:#f59e0b}
  .grid{display:grid;grid-template-columns:repeat(${cols},${W}px);gap:24px}
  figure{margin:0}figcaption{padding:6px 2px}
  iframe{width:${W}px;height:${H}px;border:1px solid #222;border-radius:12px;background:#0a0e1a}
</style><div class="grid" id="g"></div>`);

for (const file of files) {
  const html = readFileSync(path.resolve(file), 'utf8');
  const cap = file.replace('design-system/', '');
  await page.evaluate(({ html, cap }) => {
    const fig = document.createElement('figure');
    const c = document.createElement('figcaption'); c.textContent = cap;
    const f = document.createElement('iframe'); f.srcdoc = html;
    fig.appendChild(c); fig.appendChild(f); document.getElementById('g').appendChild(fig);
  }, { html, cap });
}
await page.waitForTimeout(1500);
const out = path.join(process.env.TMPDIR || '/tmp', 'ds-montage.png');
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);
