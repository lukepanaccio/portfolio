import { chromium } from 'playwright';

// On-brand OpenGraph card: 1200x630, dark navy + amber, matching the site theme.
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; }
  .card {
    width:1200px; height:630px; position:relative; overflow:hidden; background:#0a0e1a;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#f9fafb;
  }
  .bar { position:absolute; top:0; left:0; right:0; height:8px; background:linear-gradient(90deg,#f59e0b,#fbbf24); }
  .glow1 { position:absolute; top:-200px; right:-140px; width:720px; height:720px;
    background:radial-gradient(circle, rgba(245,158,11,0.30), rgba(245,158,11,0) 70%); }
  .glow2 { position:absolute; bottom:-240px; left:-180px; width:600px; height:600px;
    background:radial-gradient(circle, rgba(251,191,36,0.10), rgba(0,0,0,0) 70%); }
  .grid { position:absolute; inset:0; opacity:0.05;
    background-image:linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg,#f59e0b 1px, transparent 1px);
    background-size:64px 64px; }
  .content { position:absolute; inset:0; padding:78px 90px; display:flex; flex-direction:column; justify-content:center; }
  .eyebrow { font-size:22px; letter-spacing:7px; font-weight:700; text-transform:uppercase;
    background:linear-gradient(90deg,#f59e0b,#fbbf24); -webkit-background-clip:text; background-clip:text; color:transparent; margin-bottom:24px; }
  .name { font-family:Georgia,'Times New Roman',serif; font-size:108px; font-weight:700; line-height:1.0; letter-spacing:-2px; margin-bottom:20px; }
  .role { font-size:42px; font-weight:800; color:#f59e0b; margin-bottom:28px; }
  .tagline { font-size:28px; line-height:1.45; color:#d1d5db; max-width:920px; margin-bottom:36px; }
  .chips { display:flex; gap:14px; }
  .chip { font-size:21px; font-weight:600; color:#9ca3af; border:1px solid rgba(255,255,255,0.13); border-radius:10px; padding:11px 20px; }
</style></head>
<body><div class="card">
  <div class="bar"></div><div class="glow1"></div><div class="glow2"></div><div class="grid"></div>
  <div class="content">
    <div class="eyebrow">Portfolio</div>
    <div class="name">Luke Panaccio</div>
    <div class="role">Applied AI &amp; Systems Builder</div>
    <div class="tagline">I design, ship and validate production AI systems&nbsp;&mdash; and prove they work.</div>
    <div class="chips">
      <div class="chip">Agentic pipelines</div>
      <div class="chip">Payment integrity</div>
      <div class="chip">AI authoring</div>
    </div>
  </div>
</div></body></html>`;

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const page = await context.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: 'public/og-image.png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log('wrote public/og-image.png (1200x630)');
