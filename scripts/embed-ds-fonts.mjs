// Produce font-embedded copies of the authored design-system cards for Claude Design.
// The preview sandbox blocks fonts.googleapis.com, so we inline the brand fonts as
// base64 @font-face. Source cards keep their clean Google-Fonts <link>s; this writes
// upload-ready copies into $TMPDIR/ds-embed/ (set DS_EMBED_OUT to override).
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import path from 'path';
import os from 'os';

const root = path.resolve('design-system');
const fontDir = path.join(root, 'fonts');
const out = process.env.DS_EMBED_OUT || path.join(os.tmpdir(), 'ds-embed');

const FAMILY = { 'crimson-pro': 'Crimson Pro', 'manrope': 'Manrope', 'jetbrains-mono': 'JetBrains Mono' };

// build @font-face block from design-system/fonts/<family>-latin-<weight>-normal.woff2
const faces = readdirSync(fontDir).filter((f) => f.endsWith('.woff2')).sort().map((f) => {
  const m = f.match(/^(.*)-latin-(\d+)-normal\.woff2$/);
  if (!m) return '';
  const fam = FAMILY[m[1]]; const wght = m[2];
  const b64 = readFileSync(path.join(fontDir, f)).toString('base64');
  return `@font-face{font-family:'${fam}';font-style:normal;font-weight:${wght};font-display:swap;src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
}).filter(Boolean).join('\n');
const styleBlock = `<style>\n${faces}\n</style>`;

const CARDS = [
  'index.html',
  'foundations/color.html', 'foundations/type.html', 'foundations/atmosphere.html', 'foundations/spacing.html',
  'components/buttons.html', 'components/badges.html', 'components/metrics.html',
  'components/header.html', 'components/footer.html', 'components/project-card.html',
  'heroes/00-recipe.html',
];

for (const rel of CARDS) {
  let html = readFileSync(path.join(root, rel), 'utf8');
  // strip the Google Fonts preconnect + stylesheet links, inject embedded faces before </head>
  html = html.replace(/[ \t]*<link[^>]*fonts\.g[^>]*>\n?/gi, '');
  html = html.replace('</head>', `${styleBlock}\n</head>`);
  const dest = path.join(out, rel);
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, html);
}
console.log(`embedded fonts into ${CARDS.length} cards → ${out}`);
console.log(`@font-face block: ${(Buffer.byteLength(styleBlock) / 1024).toFixed(0)} KB`);
