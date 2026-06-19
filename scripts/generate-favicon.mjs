import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = readFileSync(path.join(pub, 'favicon.svg'), 'utf8');
const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:transparent}svg{width:256px;height:256px;display:block}</style>${svg}`;

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 256, height: 256 }, deviceScaleFactor: 1 });
const page = await context.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: path.join(pub, 'favicon.png'), omitBackground: true, clip: { x: 0, y: 0, width: 256, height: 256 } });
await browser.close();
console.log('wrote public/favicon.png (256x256, transparent)');
