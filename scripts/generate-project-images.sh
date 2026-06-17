#!/usr/bin/env bash
# Generate themed hero SVGs for the new project cards.
# Each is dark-navy + amber (matching the site) with a motif that echoes the project's architecture.
set -u
cd "$(dirname "$0")/../public/images" || exit 1

emit () {
  local file="$1" eyebrow="$2" title="$3" motif="$4"
  cat > "$file" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" role="img" aria-label="$title">
  <defs>
    <radialGradient id="glow" cx="80%" cy="16%" r="72%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="#fbbf24" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#0a0e1a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="amber" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="#0a0e1a"/>
  <rect width="1600" height="900" fill="url(#glow)"/>
  <g stroke="#f59e0b" stroke-opacity="0.05" stroke-width="1">
    <path d="M0 225H1600M0 450H1600M0 675H1600M400 0V900M800 0V900M1200 0V900"/>
  </g>
  <rect width="1600" height="10" fill="url(#amber)"/>
  <g font-family="ui-sans-serif,system-ui,Segoe UI,Helvetica,Arial,sans-serif">
$motif
  </g>
  <text x="112" y="688" font-family="ui-sans-serif,system-ui,Segoe UI,Helvetica,Arial" font-size="30" letter-spacing="6" font-weight="700" fill="url(#amber)">$eyebrow</text>
  <text x="106" y="788" font-family="Georgia,Times New Roman,serif" font-size="76" font-weight="700" fill="#f8fafc">$title</text>
</svg>
SVG
  echo "wrote $file"
}

# ---- 1. AI authoring: orchestrator -> skills -> eval gate -> pass (0 false-passes) ----
read -r -d '' M <<'EOF'
<g fill="none" stroke="#3b4761" stroke-width="3">
  <path d="M800 222 V262 M560 308 V288 H1040 V308 M800 288 V308"/>
  <path d="M560 352 L770 428 M800 354 V428 M1040 352 L830 428"/>
</g>
<rect x="664" y="152" width="272" height="70" rx="14" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<text x="800" y="195" text-anchor="middle" font-size="28" fill="#f8fafc">orchestrator</text>
<g text-anchor="middle" font-size="22" fill="#cbd5e1">
  <circle cx="560" cy="330" r="24" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="800" cy="330" r="24" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="1040" cy="330" r="24" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <text x="800" y="392">isolated skills</text>
</g>
<rect x="686" y="430" width="228" height="78" rx="14" fill="#1a2234" stroke="#fbbf24" stroke-width="3"/>
<text x="800" y="478" text-anchor="middle" font-size="26" fill="#fbbf24">HARD GATE</text>
<polyline points="1120,476 1152,508 1216,432" fill="none" stroke="#f59e0b" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<text x="1168" y="556" text-anchor="middle" font-size="24" fill="#9ca3af">0 false-passes</text>
EOF
emit ai-authoring-hero.svg "APPLIED AI · EVAL-DRIVEN" "AI Authoring" "$M"

# ---- 2. Stripe billing: webhook -> resolver, self-healing loop around \$, shield ----
read -r -d '' M <<'EOF'
<circle cx="800" cy="360" r="150" fill="none" stroke="#1f2937" stroke-width="2"/>
<path d="M800 210 A150 150 0 1 1 690 252" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
<path d="M690 252 l-26 -2 l16 30 z" fill="#f59e0b"/>
<text x="800" y="392" text-anchor="middle" font-size="120" font-weight="800" fill="#f8fafc">$</text>
<g fill="none" stroke="#3b4761" stroke-width="3">
  <path d="M360 360 H600"/>
</g>
<path d="M360 360 l-22 -12 v24 z" fill="#3b4761"/>
<rect x="250" y="330" width="120" height="60" rx="12" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<text x="310" y="367" text-anchor="middle" font-size="22" fill="#cbd5e1">event</text>
<path d="M1190 300 l70 26 v44 c0 50 -36 78 -70 92 c-34 -14 -70 -42 -70 -92 v-44 z" fill="#1a2234" stroke="#fbbf24" stroke-width="3"/>
<text x="1190" y="392" text-anchor="middle" font-size="22" fill="#fbbf24">idempotent</text>
EOF
emit stripe-billing-hero.svg "PRODUCTION ENGINEERING" "Stripe Billing" "$M"

# ---- 3. Voice-to-Prototype: issue -> trust gate -> agent -> PR (L->R) ----
read -r -d '' M <<'EOF'
<g fill="none" stroke="#3b4761" stroke-width="3">
  <path d="M392 360 H470 M712 360 H760 M1002 360 H1050"/>
</g>
<g fill="#3b4761"><path d="M470 360 l-20 -11 v22 z"/><path d="M760 360 l-20 -11 v22 z"/><path d="M1050 360 l-20 -11 v22 z"/></g>
<rect x="210" y="312" width="182" height="96" rx="14" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<text x="301" y="352" text-anchor="middle" font-size="24" fill="#f8fafc">labelled</text>
<text x="301" y="382" text-anchor="middle" font-size="24" fill="#cbd5e1">issue</text>
<path d="M590 300 l60 22 v40 c0 44 -30 68 -60 80 c-30 -12 -60 -36 -60 -80 v-40 z" fill="#1a2234" stroke="#fbbf24" stroke-width="3"/>
<text x="590" y="372" text-anchor="middle" font-size="22" fill="#fbbf24">trust</text>
<rect x="762" y="312" width="240" height="96" rx="14" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<text x="882" y="352" text-anchor="middle" font-size="24" fill="#f8fafc">agent authors</text>
<text x="882" y="382" text-anchor="middle" font-size="22" fill="#9ca3af">files only</text>
<circle cx="1130" cy="360" r="48" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
<circle cx="1130" cy="318" r="12" fill="#f59e0b"/><circle cx="1130" cy="402" r="12" fill="#f59e0b"/>
<path d="M1130 330 V390" stroke="#f59e0b" stroke-width="4"/>
<text x="1130" y="470" text-anchor="middle" font-size="24" fill="#cbd5e1">draft PR</text>
EOF
emit voice-to-prototype-hero.svg "AGENTIC CI" "Voice to Prototype" "$M"

# ---- 4. Second Brain: interconnected knowledge graph ----
read -r -d '' M <<'EOF'
<g stroke="#3b4761" stroke-width="2.5" fill="none">
  <path d="M800 360 L620 250 M800 360 L980 250 M800 360 L600 470 M800 360 L1010 460 M800 360 L800 210"/>
  <path d="M620 250 L600 470 M980 250 L1010 460 M620 250 L800 210 M980 250 L800 210 M600 470 L800 540 M1010 460 L800 540"/>
  <path d="M620 250 L460 360 M980 250 L1150 350 M600 470 L470 540"/>
</g>
<g fill="#0a0e1a" stroke="#f59e0b" stroke-width="3">
  <circle cx="800" cy="360" r="30"/>
  <circle cx="620" cy="250" r="20"/><circle cx="980" cy="250" r="20"/>
  <circle cx="600" cy="470" r="20"/><circle cx="1010" cy="460" r="20"/>
  <circle cx="800" cy="210" r="16"/><circle cx="800" cy="540" r="16"/>
  <circle cx="460" cy="360" r="14"/><circle cx="1150" cy="350" r="14"/><circle cx="470" cy="540" r="14"/>
</g>
<circle cx="800" cy="360" r="13" fill="#f59e0b"/>
<circle cx="620" cy="250" r="9" fill="#fbbf24"/>
<circle cx="1010" cy="460" r="9" fill="#fbbf24"/>
EOF
emit second-brain-hero.svg "KNOWLEDGE ENGINEERING" "Second Brain" "$M"

# ---- 5. Firestore security: document with locked monetization fields ----
read -r -d '' M <<'EOF'
<rect x="610" y="170" width="380" height="380" rx="18" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<g font-size="24" fill="#cbd5e1">
  <rect x="642" y="210" width="316" height="52" rx="9" fill="#0a0e1a" stroke="#3b4761" stroke-width="2"/>
  <text x="664" y="244">displayName</text>
  <polyline points="906,238 920,252 944,222" fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="642" y="278" width="316" height="52" rx="9" fill="#0a0e1a" stroke="#3b4761" stroke-width="2"/>
  <text x="664" y="312">subscriptionTier</text>
  <rect x="642" y="346" width="316" height="52" rx="9" fill="#0a0e1a" stroke="#3b4761" stroke-width="2"/>
  <text x="664" y="380">creditBalance</text>
  <rect x="642" y="414" width="316" height="52" rx="9" fill="#0a0e1a" stroke="#3b4761" stroke-width="2"/>
  <text x="664" y="448">stripeCustomerId</text>
</g>
<g fill="#fbbf24">
  <g transform="translate(912,290)"><rect x="0" y="14" width="30" height="24" rx="4"/><path d="M6 14 v-8 a9 9 0 0 1 18 0 v8" fill="none" stroke="#fbbf24" stroke-width="4"/></g>
  <g transform="translate(912,358)"><rect x="0" y="14" width="30" height="24" rx="4"/><path d="M6 14 v-8 a9 9 0 0 1 18 0 v8" fill="none" stroke="#fbbf24" stroke-width="4"/></g>
  <g transform="translate(912,426)"><rect x="0" y="14" width="30" height="24" rx="4"/><path d="M6 14 v-8 a9 9 0 0 1 18 0 v8" fill="none" stroke="#fbbf24" stroke-width="4"/></g>
</g>
EOF
emit firestore-security-hero.svg "SECURITY + EVALS" "Firestore Security" "$M"

# ---- 6. Ableton MCP: session-view clip grid + waveform ----
read -r -d '' M <<'EOF'
<g>
  <rect x="520" y="180" width="560" height="300" rx="12" fill="#0d1320" stroke="#1f2937" stroke-width="2"/>
EOF
# build clip grid programmatically
GRID=""
colcolors=("#f59e0b" "#3b4761" "#fbbf24" "#3b4761" "#d97706")
for c in 0 1 2 3 4; do
  x=$((540 + c*108))
  for r in 0 1 2 3; do
    y=$((200 + r*70))
    # amber-ish clips in a diagonal-ish pattern, others muted
    if [ $(( (c + r) % 3 )) -eq 0 ]; then fill="#f59e0b"; else fill="#222d42"; fi
    GRID+="  <rect x=\"$x\" y=\"$y\" width=\"88\" height=\"52\" rx=\"7\" fill=\"$fill\" stroke=\"#0a0e1a\" stroke-width=\"2\"/>"$'\n'
  done
done
read -r -d '' M2 <<'EOF'
  <path d="M520 528 q40 -60 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="#fbbf24" stroke-width="4" opacity="0.9"/>
</g>
EOF
emit ableton-mcp-hero.svg "MCP INTEGRATION" "Ableton MCP" "${M}
${GRID}${M2}"

# ---- 7. Geocoding: map grid with pins + a target ----
read -r -d '' M <<'EOF'
<rect x="560" y="180" width="480" height="330" rx="14" fill="#0d1320" stroke="#1f2937" stroke-width="2"/>
<g stroke="#1f2937" stroke-width="1.5">
  <path d="M560 260 H1040 M560 340 H1040 M560 420 H1040 M660 180 V510 M760 180 V510 M860 180 V510 M960 180 V510"/>
</g>
<g stroke="#3b4761" stroke-width="3" fill="none" opacity="0.7">
  <path d="M600 300 q60 -40 120 10 t140 -20"/>
</g>
<g>
  <path d="M700 300 c0 -28 -44 -28 -44 0 c0 22 44 52 22 52 c-22 0 22 -30 22 -52z" fill="#3b4761"/>
  <path d="M880 380 c0 -28 -44 -28 -44 0 c0 22 44 52 22 52 c-22 0 22 -30 22 -52z" fill="#3b4761"/>
  <path d="M820 270 c0 -34 -52 -34 -52 0 c0 26 52 60 26 60 c-26 0 26 -34 26 -60z" fill="#f59e0b"/>
  <circle cx="794" cy="270" r="11" fill="#0a0e1a"/>
</g>
<g fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.8">
  <circle cx="794" cy="270" r="44"/><path d="M794 214 V236 M794 304 V326 M738 270 H760 M828 270 H850"/>
</g>
EOF
emit geocoding-hero.svg "DATA QUALITY" "Geocoding Campaign" "$M"

# ---- 8. Single source of truth: duplicate docs -> one canonical ----
read -r -d '' M <<'EOF'
<g fill="#111827" stroke="#3b4761" stroke-width="3">
  <rect x="250" y="210" width="150" height="190" rx="12"/>
  <rect x="250" y="320" width="150" height="190" rx="12" fill="#0d1320"/>
  <rect x="250" y="430" width="150" height="190" rx="12" fill="#0a0e1a"/>
</g>
<g stroke="#3b4761" stroke-width="2" opacity="0.8">
  <path d="M286 250 H364 M286 280 H364 M286 360 H364 M286 390 H344"/>
</g>
<g fill="none" stroke="#f59e0b" stroke-width="3">
  <path d="M410 300 C560 300 620 360 720 360 M410 410 C560 410 620 372 720 366"/>
</g>
<g fill="#3b4761"><path d="M720 360 l-22 -11 v22 z"/></g>
<rect x="740" y="250" width="230" height="230" rx="16" fill="#1a2234" stroke="#fbbf24" stroke-width="4"/>
<g stroke="#fbbf24" stroke-width="3" opacity="0.95"><path d="M786 300 H924 M786 336 H924 M786 372 H924 M786 408 H880"/></g>
<text x="855" y="520" text-anchor="middle" font-size="24" fill="#fbbf24">canonical</text>
<g fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.7">
  <path d="M970 300 C1120 300 1120 250 1240 250 M970 380 C1120 380 1120 430 1240 430"/>
</g>
<g fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"><circle cx="1260" cy="250" r="16"/><circle cx="1260" cy="430" r="16"/></g>
EOF
emit dedup-hero.svg "INFORMATION ARCHITECTURE" "Single Source of Truth" "$M"

# ---- 9. Bug pipeline: 5 stages L->R + HMAC lock ----
read -r -d '' M <<'EOF'
<g fill="none" stroke="#3b4761" stroke-width="3">
  <path d="M362 360 H440 M602 360 H680 M842 360 H920 M1082 360 H1160"/>
</g>
<g fill="#3b4761"><path d="M440 360 l-20 -11 v22z"/><path d="M680 360 l-20 -11 v22z"/><path d="M920 360 l-20 -11 v22z"/><path d="M1160 360 l-20 -11 v22z"/></g>
<g text-anchor="middle" font-size="22" fill="#cbd5e1">
  <circle cx="300" cy="360" r="42" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/><text x="300" y="430">trigger</text>
  <circle cx="540" cy="360" r="42" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/><text x="540" y="430">upload</text>
  <circle cx="780" cy="360" r="42" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/><text x="780" y="430">issue</text>
  <circle cx="1020" cy="360" r="42" fill="#0a0e1a" stroke="#fbbf24" stroke-width="3"/><text x="1020" y="430">webhook</text>
  <circle cx="1260" cy="360" r="42" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/><text x="1260" y="430">GC</text>
</g>
<g transform="translate(1004,338)" fill="#fbbf24"><rect x="0" y="12" width="32" height="26" rx="4"/><path d="M6 12 v-7 a10 10 0 0 1 20 0 v7" fill="none" stroke="#fbbf24" stroke-width="4"/></g>
EOF
emit bug-pipeline-hero.svg "DISTRIBUTED SYSTEMS" "Bug-Reporting Pipeline" "$M"

# ---- 10. Scraper CI: fan-out / fan-in matrix + retry loop ----
read -r -d '' M <<'EOF'
<g fill="none" stroke="#3b4761" stroke-width="3">
  <path d="M392 360 H470"/>
  <path d="M620 360 C700 360 700 220 800 220 M620 360 C700 360 700 300 800 300 M620 360 H800 M620 360 C700 360 700 420 800 420 M620 360 C700 360 700 500 800 500"/>
  <path d="M980 220 C1080 220 1080 360 1160 360 M980 300 C1080 300 1080 360 1160 360 M980 360 H1160 M980 420 C1080 420 1080 360 1160 360 M980 500 C1080 500 1080 360 1160 360"/>
</g>
<rect x="250" y="324" width="170" height="72" rx="14" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<text x="335" y="368" text-anchor="middle" font-size="24" fill="#f8fafc">list</text>
<g text-anchor="middle" font-size="20" fill="#cbd5e1">
  <rect x="800" y="196" width="180" height="48" rx="9" fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5"/><text x="890" y="226">runner</text>
  <rect x="800" y="276" width="180" height="48" rx="9" fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5"/><text x="890" y="306">runner</text>
  <rect x="800" y="336" width="180" height="48" rx="9" fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5"/><text x="890" y="366">runner</text>
  <rect x="800" y="396" width="180" height="48" rx="9" fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5"/><text x="890" y="426">runner</text>
  <rect x="800" y="476" width="180" height="48" rx="9" fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5"/><text x="890" y="506">runner</text>
</g>
<rect x="1160" y="320" width="190" height="80" rx="14" fill="#1a2234" stroke="#fbbf24" stroke-width="3"/>
<text x="1255" y="356" text-anchor="middle" font-size="22" fill="#fbbf24">consolidate</text>
<text x="1255" y="384" text-anchor="middle" font-size="18" fill="#9ca3af">+ LFS commit</text>
EOF
emit scraper-ci-hero.svg "RELIABILITY ENGINEERING" "Scraper CI Orchestration" "$M"

# ---- 11. B2B: business-unit -> associates -> permissions hierarchy ----
read -r -d '' M <<'EOF'
<g fill="none" stroke="#3b4761" stroke-width="3">
  <path d="M800 232 V286 M800 286 H560 V330 M800 286 H1040 V330 M800 286 V330"/>
  <path d="M560 376 V420 H470 V452 M560 420 H650 V452 M560 420 V452"/>
  <path d="M1040 376 V420 H950 V452 M1040 420 H1130 V452 M1040 420 V452"/>
</g>
<rect x="690" y="162" width="220" height="70" rx="14" fill="#1a2234" stroke="#fbbf24" stroke-width="3"/>
<text x="800" y="205" text-anchor="middle" font-size="26" fill="#fbbf24">business unit</text>
<g text-anchor="middle" font-size="22" fill="#cbd5e1">
  <rect x="470" y="330" width="180" height="48" rx="10" fill="#111827" stroke="#f59e0b" stroke-width="3"/><text x="560" y="360">division</text>
  <rect x="950" y="330" width="180" height="48" rx="10" fill="#111827" stroke="#f59e0b" stroke-width="3"/><text x="1040" y="360">division</text>
  <circle cx="470" cy="476" r="22" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="650" cy="476" r="22" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="950" cy="476" r="22" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="1130" cy="476" r="22" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <text x="800" y="540">associates and permissions</text>
</g>
EOF
emit b2b-learning-hero.svg "LEARNING SYSTEMS" "B2B Commerce" "$M"

# ---- 12. Content drift: release note -> 3 skills -> flagged content -> review ----
read -r -d '' M <<'EOF'
<g fill="none" stroke="#3b4761" stroke-width="3"><path d="M404 320 H466 M740 320 H804"/></g>
<g fill="#3b4761"><path d="M466 320 l-20 -11 v22z"/><path d="M804 320 l-20 -11 v22z"/></g>
<rect x="240" y="232" width="164" height="200" rx="12" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<g stroke="#3b4761" stroke-width="2"><path d="M272 274 H372 M272 302 H372 M272 330 H352"/></g>
<text x="322" y="466" text-anchor="middle" font-size="22" fill="#cbd5e1">release note</text>
<g text-anchor="middle" font-size="20" fill="#cbd5e1">
  <rect x="494" y="248" width="246" height="42" rx="9" fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5"/><text x="617" y="276">analyze impact</text>
  <rect x="494" y="298" width="246" height="42" rx="9" fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5"/><text x="617" y="326">map to sections</text>
  <rect x="494" y="348" width="246" height="42" rx="9" fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5"/><text x="617" y="376">generate update</text>
</g>
<rect x="806" y="222" width="206" height="220" rx="12" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<g stroke="#3b4761" stroke-width="2"><path d="M838 264 H980 M838 292 H980"/></g>
<rect x="838" y="312" width="140" height="32" rx="6" fill="#3a2a08" stroke="#fbbf24" stroke-width="2"/>
<text x="908" y="335" text-anchor="middle" font-size="18" fill="#fbbf24">drift flagged</text>
<g stroke="#3b4761" stroke-width="2"><path d="M838 372 H980 M838 400 H950"/></g>
<polyline points="1058,318 1086,346 1140,288" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<text x="1098" y="392" text-anchor="middle" font-size="22" fill="#9ca3af">review</text>
EOF
emit content-drift-hero.svg "AGENTIC CI" "Content Drift" "$M"

# ---- 13. AI grading: submission -> rubric scorecard -> score + gate ----
read -r -d '' M <<'EOF'
<rect x="250" y="222" width="170" height="226" rx="12" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<g stroke="#3b4761" stroke-width="2"><path d="M284 264 H386 M284 294 H386 M284 324 H386 M284 354 H366"/></g>
<text x="335" y="482" text-anchor="middle" font-size="22" fill="#cbd5e1">submission</text>
<path d="M420 335 H494" stroke="#3b4761" stroke-width="3"/><path d="M494 335 l-20 -11 v22z" fill="#3b4761"/>
<rect x="500" y="222" width="360" height="226" rx="12" fill="#0d1320" stroke="#f59e0b" stroke-width="3"/>
<g font-size="20" fill="#cbd5e1">
  <text x="524" y="266">structure</text><rect x="694" y="250" width="140" height="16" rx="8" fill="#222d42"/><rect x="694" y="250" width="120" height="16" rx="8" fill="#f59e0b"/>
  <text x="524" y="308">accuracy</text><rect x="694" y="292" width="140" height="16" rx="8" fill="#222d42"/><rect x="694" y="292" width="128" height="16" rx="8" fill="#f59e0b"/>
  <text x="524" y="350">grounding</text><rect x="694" y="334" width="140" height="16" rx="8" fill="#222d42"/><rect x="694" y="334" width="74" height="16" rx="8" fill="#fbbf24"/>
  <text x="524" y="392">persona</text><rect x="694" y="376" width="140" height="16" rx="8" fill="#222d42"/><rect x="694" y="376" width="126" height="16" rx="8" fill="#f59e0b"/>
</g>
<circle cx="1010" cy="335" r="66" fill="#1a2234" stroke="#fbbf24" stroke-width="4"/>
<text x="1010" y="326" text-anchor="middle" font-size="46" font-weight="800" fill="#f8fafc">87</text>
<text x="1010" y="360" text-anchor="middle" font-size="18" fill="#9ca3af">/ 100</text>
<text x="1010" y="442" text-anchor="middle" font-size="20" fill="#9ca3af">quality gate</text>
EOF
emit paper-grader-hero.svg "LLM EVALUATION" "AI Grading" "$M"

# ---- 14. Alex Chen: synthetic persona reviewing a doc ----
read -r -d '' M <<'EOF'
<circle cx="420" cy="340" r="94" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<circle cx="420" cy="312" r="30" fill="none" stroke="#fbbf24" stroke-width="3"/>
<path d="M368 396 a52 42 0 0 1 104 0" fill="none" stroke="#fbbf24" stroke-width="3"/>
<text x="420" y="474" text-anchor="middle" font-size="22" fill="#cbd5e1">synthetic user</text>
<g fill="none" stroke="#3b4761" stroke-width="3"><path d="M530 320 H648"/></g>
<path d="M648 320 l-20 -11 v22z" fill="#3b4761"/>
<rect x="700" y="226" width="216" height="228" rx="12" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<g stroke="#3b4761" stroke-width="2"><path d="M732 268 H884 M732 296 H884 M732 352 H884 M732 380 H846"/></g>
<rect x="732" y="314" width="120" height="26" rx="6" fill="#3a2a08" stroke="#fbbf24" stroke-width="2"/>
<g fill="#1a2234" stroke="#fbbf24" stroke-width="2"><rect x="900" y="250" width="128" height="52" rx="10"/><rect x="934" y="372" width="128" height="52" rx="10"/></g>
<g fill="#fbbf24"><circle cx="934" cy="276" r="5"/><circle cx="956" cy="276" r="5"/><circle cx="978" cy="276" r="5"/><circle cx="968" cy="398" r="5"/><circle cx="990" cy="398" r="5"/><circle cx="1012" cy="398" r="5"/></g>
EOF
emit alex-chen-hero.svg "SYNTHETIC USER" "Alex Chen" "$M"

# ---- 15. Modular paths: academy -> paths -> modules ----
read -r -d '' M <<'EOF'
<rect x="244" y="320" width="156" height="64" rx="12" fill="#1a2234" stroke="#fbbf24" stroke-width="3"/>
<text x="322" y="358" text-anchor="middle" font-size="22" fill="#fbbf24">academy</text>
<g fill="none" stroke="#3b4761" stroke-width="3"><path d="M400 352 H452 V220 H540 M452 352 H540 M452 352 V484 H540"/></g>
<g>
  <rect x="540" y="196" width="150" height="48" rx="9" fill="#111827" stroke="#f59e0b" stroke-width="2.5"/>
  <rect x="540" y="328" width="150" height="48" rx="9" fill="#111827" stroke="#f59e0b" stroke-width="2.5"/>
  <rect x="540" y="460" width="150" height="48" rx="9" fill="#111827" stroke="#f59e0b" stroke-width="2.5"/>
</g>
<g fill="none" stroke="#3b4761" stroke-width="2"><path d="M690 220 H726 M690 352 H726 M690 484 H726"/></g>
<g fill="#0a0e1a" stroke="#f59e0b" stroke-width="2.5">
  <rect x="728" y="200" width="40" height="40" rx="7"/><rect x="778" y="200" width="40" height="40" rx="7"/><rect x="828" y="200" width="40" height="40" rx="7"/>
  <rect x="728" y="332" width="40" height="40" rx="7"/><rect x="778" y="332" width="40" height="40" rx="7"/><rect x="828" y="332" width="40" height="40" rx="7"/><rect x="878" y="332" width="40" height="40" rx="7"/>
  <rect x="728" y="464" width="40" height="40" rx="7"/><rect x="778" y="464" width="40" height="40" rx="7"/>
</g>
<text x="1010" y="360" text-anchor="middle" font-size="22" fill="#9ca3af">9 paths · 30+ modules</text>
EOF
emit modular-paths-hero.svg "INFORMATION ARCHITECTURE" "Modular Paths" "$M"

# ---- 16. Dev Essentials: 0 -> production progression ----
read -r -d '' M <<'EOF'
<g fill="none" stroke="#3b4761" stroke-width="4"><path d="M300 480 L480 480 L480 386 L660 386 L660 292 L840 292 L840 200 L1010 200"/></g>
<g text-anchor="middle" font-size="22" fill="#cbd5e1">
  <circle cx="300" cy="480" r="32" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/><text x="300" y="488">0</text>
  <circle cx="480" cy="386" r="26" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="660" cy="292" r="26" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="840" cy="200" r="26" fill="#0a0e1a" stroke="#f59e0b" stroke-width="3"/>
</g>
<path d="M1010 150 V250" stroke="#fbbf24" stroke-width="4"/>
<path d="M1010 156 H1098 L1080 178 L1098 200 H1010 z" fill="#fbbf24"/>
<text x="1054" y="244" text-anchor="middle" font-size="20" fill="#9ca3af">production</text>
EOF
emit dev-essentials-hero.svg "CURRICULUM" "Dev Essentials" "$M"

# ---- 17. Marcus: conversational dialogue + classical column ----
read -r -d '' M <<'EOF'
<rect x="300" y="206" width="330" height="82" rx="18" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<path d="M340 288 v34 l34 -34 z" fill="#111827"/>
<g stroke="#3b4761" stroke-width="3"><path d="M332 238 H600 M332 262 H540"/></g>
<rect x="600" y="322" width="360" height="82" rx="18" fill="#1a2234" stroke="#fbbf24" stroke-width="3"/>
<path d="M920 404 v34 l34 -34 z" fill="#1a2234"/>
<g stroke="#fbbf24" stroke-width="3" opacity="0.85"><path d="M632 354 H928 M632 378 H860"/></g>
<rect x="300" y="436" width="300" height="72" rx="18" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
<g stroke="#3b4761" stroke-width="3"><path d="M332 466 H560 M332 488 H500"/></g>
<g stroke="#cbd5e1" stroke-width="3" fill="none" opacity="0.45">
  <path d="M1066 222 H1170 M1058 232 H1178 M1078 232 V430 M1108 232 V430 M1138 232 V430 M1066 430 H1170 M1058 442 H1178"/>
</g>
EOF
emit marcus-hero.svg "CONVERSATIONAL AI" "Marcus Aurelius" "$M"

# ---- 18. 3 Steps Away: three rising numbered steps ----
read -r -d '' M <<'EOF'
<g fill="none" stroke="#3b4761" stroke-width="5"><path d="M360 472 L650 360 L940 248"/></g>
<g text-anchor="middle" font-size="44" font-weight="800">
  <circle cx="360" cy="472" r="58" fill="#111827" stroke="#f59e0b" stroke-width="4"/><text x="360" y="488" fill="#f59e0b">1</text>
  <circle cx="650" cy="360" r="58" fill="#111827" stroke="#f59e0b" stroke-width="4"/><text x="650" y="376" fill="#f59e0b">2</text>
  <circle cx="940" cy="248" r="58" fill="#1a2234" stroke="#fbbf24" stroke-width="4"/><text x="940" y="264" fill="#fbbf24">3</text>
</g>
EOF
emit 3-steps-hero.svg "FOUNDER · EXPERIENTIAL" "3 Steps Away" "$M"

echo "--- done ---"
ls -1 *-hero.svg
