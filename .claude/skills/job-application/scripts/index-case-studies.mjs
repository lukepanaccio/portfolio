#!/usr/bin/env node
/**
 * index-case-studies.mjs — build assets/portfolio-index.md from the portfolio's own case studies.
 *
 * The MDX files in src/pages/projects/ are already the calibrated write-up of every project:
 * problem, architecture, validation, outcome, real numbers. That makes them a far better index
 * source than crawling repos — so this script reads frontmatter rather than source trees.
 *
 * Separation of concerns, deliberately:
 *   - MECHANICAL facts (title, client, role, timeline, stack, agentic stack, metrics, links)
 *     come from the MDX frontmatter. Regenerated every run. Never hand-edited here.
 *   - JUDGEMENT calls (what it proves, which roles it's for, the one-liner, whether the repo is
 *     presentable) live in assets/portfolio-judgements.md. Decided once, reused across every
 *     application, never re-improvised per job ad.
 *
 * A consistent story across thirty applications beats a marginally better one each time.
 *
 * Usage:
 *   node .claude/skills/job-application/scripts/index-case-studies.mjs
 *   npm run jobs:index
 *
 * Exits non-zero if any case study has no judgement block, so the gap is visible rather than
 * silently producing an index with holes in the fields the cover letter actually draws on.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const REPO_ROOT = dirname(dirname(dirname(SKILL_DIR)));
const PROJECTS_DIR = join(REPO_ROOT, 'src/pages/projects');
const JUDGEMENTS = join(SKILL_DIR, 'assets/portfolio-judgements.md');
const OUT = join(SKILL_DIR, 'assets/portfolio-index.md');

/* ── frontmatter ─────────────────────────────────────────────────────────────
 * A purpose-built parser for the shapes ProjectLayout's frontmatter actually uses:
 * quoted scalars, inline arrays, and the metrics list-of-maps. No YAML dependency,
 * because this repo has none and these scripts should run on a clean checkout.
 */

function splitFrontmatter(raw) {
  const lines = raw.split(/\r?\n/);
  if (lines[0].trim() !== '---') return null;
  const end = lines.indexOf('---', 1);
  if (end === -1) return null;
  return lines.slice(1, end);
}

/** Unquote a scalar, honouring YAML's doubled-quote escape ('' inside '...'). */
function scalar(v) {
  const s = v.trim();
  if (s.startsWith("'") && s.endsWith("'") && s.length > 1) {
    return s.slice(1, -1).replace(/''/g, "'");
  }
  if (s.startsWith('"') && s.endsWith('"') && s.length > 1) {
    return s.slice(1, -1).replace(/\\"/g, '"');
  }
  return s;
}

/** Split an inline array body on commas that sit outside quotes. */
function inlineArray(body) {
  const items = [];
  let cur = '';
  let quote = null;
  for (const ch of body) {
    if (quote) {
      cur += ch;
      if (ch === quote) quote = null;
    } else if (ch === "'" || ch === '"') {
      quote = ch;
      cur += ch;
    } else if (ch === ',') {
      items.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) items.push(cur);
  return items.map(scalar).filter(Boolean);
}

function parseFrontmatter(lines) {
  const out = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) { i++; continue; }

    const m = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (!m) { i++; continue; }
    const [, key, rest] = m;

    if (rest.trim() === '') {
      // Block value: consume the indented lines that follow.
      const block = [];
      i++;
      while (i < lines.length && (lines[i].startsWith(' ') || lines[i].startsWith('\t')) ) {
        block.push(lines[i]);
        i++;
      }
      out[key] = parseBlock(block);
      continue;
    }

    const v = rest.trim();
    if (v.startsWith('[')) {
      out[key] = inlineArray(v.replace(/^\[/, '').replace(/\]$/, ''));
    } else {
      out[key] = scalar(v);
    }
    i++;
  }
  return out;
}

/** Indented block: either a list of scalars, or a list of maps (`- label:` / `value:`). */
function parseBlock(block) {
  const items = [];
  let cur = null;
  for (const raw of block) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('- ')) {
      const body = line.slice(2);
      const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(body);
      if (kv) {
        cur = { [kv[1]]: scalar(kv[2]) };
        items.push(cur);
      } else {
        cur = null;
        items.push(scalar(body));
      }
    } else if (cur && typeof cur === 'object') {
      const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
      if (kv) cur[kv[1]] = scalar(kv[2]);
    }
  }
  return items;
}

/* ── judgements ──────────────────────────────────────────────────────────── */

/**
 * Parse assets/portfolio-judgements.md. Format, per project:
 *
 *   ## <slug>
 *   - proves: ...
 *   - best-for: ...
 *   - one-liner: ...
 *   - presentable: yes | no — reason
 *   - links: private | public
 */
function parseJudgements() {
  let raw;
  try {
    raw = readFileSync(JUDGEMENTS, 'utf8');
  } catch {
    return {};
  }
  const out = {};
  let slug = null;
  for (const line of raw.split(/\r?\n/)) {
    const h = /^##\s+(\S+)\s*$/.exec(line);
    if (h) { slug = h[1]; out[slug] = {}; continue; }
    if (!slug) continue;
    const kv = /^[-*]\s*([\w-]+):\s*(.*)$/.exec(line.trim());
    if (kv) out[slug][kv[1]] = kv[2].trim();
  }
  return out;
}

/* ── render ──────────────────────────────────────────────────────────────── */

const list = (v) => (Array.isArray(v) ? v.join(' · ') : v || '');

function renderProject(slug, fm, j) {
  const metrics = Array.isArray(fm.metrics)
    ? fm.metrics.filter((m) => m && m.value).map((m) => `**${m.value}** ${m.label}`)
    : [];
  const links = [
    fm.demoLink ? `[demo](${fm.demoLink})` : null,
    fm.githubLink ? `[repo](${fm.githubLink})` : null,
    `[case study](https://www.lukepanaccio.com/projects/${slug})`,
  ].filter(Boolean);

  const rows = [
    ['Slug', `\`${slug}\``],
    ['Title', fm.title],
    ['Client', fm.client],
    ['Role', fm.role],
    ['Timeline', fm.timeline],
    ['Stack', list(fm.tools)],
    ['Agentic stack', list(fm.agenticStack)],
    ['Numbers', metrics.join(' · ')],
    ['Links', links.join(' · ')],
    ['Proves', j.proves],
    ['Best for', j['best-for']],
    ['One-liner', j['one-liner']],
    ['Presentable', j.presentable],
  ].filter(([, v]) => v);

  return [
    `### ${fm.title || slug}`,
    '',
    ...rows.map(([k, v]) => `- **${k}:** ${v}`),
    '',
    fm.tagline ? `> ${fm.tagline}` : '',
    '',
  ].filter((l) => l !== undefined).join('\n');
}

function main() {
  const files = readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx')).sort();
  const judgements = parseJudgements();

  const projects = [];
  const unjudged = [];

  for (const file of files) {
    const slug = basename(file, '.mdx');
    const lines = splitFrontmatter(readFileSync(join(PROJECTS_DIR, file), 'utf8'));
    if (!lines) {
      console.warn(`  ! ${file}: no frontmatter, skipped`);
      continue;
    }
    const fm = parseFrontmatter(lines);
    const j = judgements[slug] || {};
    if (!j.proves || !j['one-liner']) unjudged.push(slug);
    projects.push({ slug, fm, j });
  }

  // Summary table first: this is what gets scanned when picking evidence for a role.
  const table = [
    '| Project | Client | Proves | Best for |',
    '|---|---|---|---|',
    ...projects.map(({ slug, fm, j }) =>
      `| [${fm.title || slug}](#${(fm.title || slug).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}) | ${fm.client || ''} | ${j.proves || '—'} | ${j['best-for'] || '—'} |`,
    ),
  ].join('\n');

  const body = [
    '# Portfolio Index',
    '',
    '> **Generated file — do not hand-edit.**',
    `> Mechanical facts come from \`src/pages/projects/*.mdx\` frontmatter.`,
    '> Judgement fields (Proves / Best for / One-liner / Presentable) come from',
    '> `assets/portfolio-judgements.md` — edit that file, then rerun `npm run jobs:index`.',
    '',
    `${projects.length} case studies. Live at https://www.lukepanaccio.com`,
    '',
    '## At a glance',
    '',
    table,
    '',
    '---',
    '',
    '## Detail',
    '',
    ...projects.map(({ slug, fm, j }) => renderProject(slug, fm, j)),
  ].join('\n');

  writeFileSync(OUT, body.replace(/\n{3,}/g, '\n\n'));
  console.log(`✓ ${projects.length} case studies → ${OUT.replace(REPO_ROOT + '/', '')}`);

  if (unjudged.length) {
    console.error(
      `\n! ${unjudged.length} case study/studies have no judgement block in portfolio-judgements.md:\n` +
        unjudged.map((s) => `    ${s}`).join('\n') +
        `\n  These will appear in the index with empty Proves / One-liner — the two fields every\n` +
        `  cover letter draws on. Add them before relying on the index.\n`,
    );
    process.exit(1);
  }
}

main();
