import { chromium } from 'playwright';
import path from 'path';

const file = path.resolve(process.argv[2]);
const W = Number(process.argv[3] || 1100);
const H = Number(process.argv[4] || 1000);
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1.5 });
const page = await ctx.newPage();
await page.setViewportSize({ width: W, height: H });
await page.goto('file://' + file, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const out = path.join(process.env.TMPDIR || '/tmp', 'render-html.png');
await page.screenshot({ path: out });
await browser.close();
console.log(out);
