#!/usr/bin/env node
/**
 * bundle-skill.mjs — package this skill for upload to Claude chat.
 *
 *   npm run jobs:bundle
 *   → dist-skill/job-application.skill   (a zip; upload it in claude.ai → Settings → Capabilities)
 *
 * Why a bundle exists at all: in the repo, the skill reads the filesystem and can regenerate the
 * portfolio index from the case studies. In Claude chat there is no repo, so the assets have to
 * travel with it. The repo is the single source of truth; this is a snapshot of it.
 *
 * Consequence worth stating plainly: the chat copy drifts the moment the repo copy changes, and
 * nothing warns you. Rerun this and re-upload after editing anything in the skill folder.
 *
 * Excluded deliberately:
 *   - job-applications/    per-application work, gitignored, none of it belongs in a bundle
 *   - _private/            comp floor and gaps do not travel to a chat upload
 *   - *.mjs                the repo scripts can't run in chat; extract_portfolio.py can, so it stays
 */

import { readdirSync, statSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const SKILL_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const REPO_ROOT = dirname(dirname(dirname(SKILL_DIR)));
const OUT_DIR = join(REPO_ROOT, 'dist-skill');
const STAGE = join(OUT_DIR, 'job-application');
const OUT = join(OUT_DIR, 'job-application.skill');

const EXCLUDE_FILES = new Set([
  'index-case-studies.mjs',
  'new-application.mjs',
  'render-doc.mjs',
  'bundle-skill.mjs',
]);

function walk(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === '_private') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full, base));
    else if (!EXCLUDE_FILES.has(entry)) out.push(relative(base, full));
  }
  return out;
}

rmSync(STAGE, { recursive: true, force: true });
mkdirSync(STAGE, { recursive: true });

const files = walk(SKILL_DIR);
for (const rel of files) {
  mkdirSync(join(STAGE, dirname(rel)), { recursive: true });
  cpSync(join(SKILL_DIR, rel), join(STAGE, rel));
}

if (!files.includes('SKILL.md')) {
  console.error('✗ SKILL.md missing — a bundle without it will not load.');
  process.exit(1);
}

// .skill is a zip. Store it flat with the skill name as the root directory, matching the
// structure Claude chat expects.
rmSync(OUT, { force: true });
try {
  execFileSync('zip', ['-rq', OUT, 'job-application'], { cwd: OUT_DIR });
} catch {
  console.error(
    `✗ \`zip\` not available. Stage is at dist-skill/job-application/ — zip that directory\n` +
      `  yourself and rename the archive to job-application.skill.`,
  );
  process.exit(1);
}

rmSync(STAGE, { recursive: true, force: true });

const kb = (statSync(OUT).size / 1024).toFixed(0);
console.log(`✓ dist-skill/job-application.skill  (${kb} KB, ${files.length} files)`);
for (const f of files.sort()) console.log(`    ${f}`);
console.log(
  `\nUpload at claude.ai → Settings → Capabilities → Skills.\n` +
    `Replace the existing job-application skill rather than adding a second copy.`,
);

if (existsSync(join(SKILL_DIR, 'assets/portfolio-index.md'))) {
  const age = Date.now() - statSync(join(SKILL_DIR, 'assets/portfolio-index.md')).mtimeMs;
  const days = age / 86_400_000;
  if (days > 30) {
    console.error(
      `\n! portfolio-index.md is ${Math.round(days)} days old. Run \`npm run jobs:index\` if any\n` +
        `  case studies have changed since — the bundle carries whatever is on disk now.`,
    );
  }
}
