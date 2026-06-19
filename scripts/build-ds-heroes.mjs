// Generates one Claude Design preview card per polished hero SVG.
// Each card is its own HTML page (so the SVGs' shared element ids never collide).
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';

const src = path.resolve('public/images');
const out = path.resolve('design-system/heroes');
mkdirSync(out, { recursive: true });

const files = readdirSync(src).filter((f) => f.endsWith('-hero.svg')).sort();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

for (const f of files) {
  const svg = readFileSync(path.join(src, f), 'utf8');
  const name = (svg.match(/aria-label="([^"]+)"/) || [, f])[1];
  const vb = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  const portrait = vb && Number(vb[2]) > Number(vb[1]);
  const html = `<!-- @dsCard group="Hero Images" name="${esc(name)}" subtitle="${f}" -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(name)} — hero</title>
<style>
  html,body{margin:0;min-height:100%;background:#05070d}
  .stage{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
  .frame{width:100%;max-width:${portrait ? '600px' : '1120px'};border-radius:16px;overflow:hidden;
    border:1px solid rgba(255,255,255,.08);box-shadow:0 30px 90px rgba(0,0,0,.55)}
  .frame svg{display:block;width:100%;height:auto}
</style>
</head>
<body><div class="stage"><div class="frame">${svg}</div></div></body>
</html>
`;
  writeFileSync(path.join(out, f.replace('-hero.svg', '.html')), html);
}
console.log(`wrote ${files.length} hero cards to design-system/heroes/`);
