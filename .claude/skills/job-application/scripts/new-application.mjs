#!/usr/bin/env node
/**
 * new-application.mjs — scaffold a workspace for one application.
 *
 *   npm run jobs:new -- "Anthropic" "Forward Deployed Engineer"
 *   → job-applications/anthropic-forward-deployed-engineer-2026-07/
 *
 * job-applications/ is gitignored: this is a public repo, and fit verdicts, gap analyses and
 * comp notes are not things to publish by accident.
 *
 * The numbered stubs exist to enforce the order the skill works in. Writing 03-cover-letter.md
 * before 01-analysis.md is the failure mode the whole workflow is designed to prevent.
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const REPO_ROOT = dirname(dirname(dirname(SKILL_DIR)));

const [company, role] = process.argv.slice(2);

if (!company || !role) {
  console.error('Usage: npm run jobs:new -- "Company Name" "Role Title"');
  process.exit(1);
}

const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-');

const now = new Date();
const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const today = now.toISOString().slice(0, 10);
const slug = `${slugify(company)}-${slugify(role)}-${stamp}`;
const dir = join(REPO_ROOT, 'job-applications', slug);

if (existsSync(dir)) {
  console.error(`✗ ${slug} already exists — open it rather than starting over.`);
  process.exit(1);
}

const files = {
  '00-job-ad.md': `# ${role} — ${company}

- **Source:** <url or "pasted">
- **Captured:** ${today}
- **Comp band stated:** <yes/no — figure>
- **Deadline / posted:** <date>

---

<!-- Paste the ad here VERBATIM. Do not summarise it.
     Later steps need to argue with the source, not with a paraphrase.
     If a URL fetch returned a JS shell, paste from the browser instead. -->
`,

  '01-analysis.md': `# Analysis — ${role} @ ${company}

## Requirements

| # | Requirement | Must / Nice | Stated or implied | What they're actually worried about |
|---|---|---|---|---|

## Why this role exists

<!-- Growth / Gap / Replacement / Transformation — see references/jd-analysis.md.
     Each one calls for a different cover-letter spine. -->

## Load-bearing repeated terms

<!-- Any phrase appearing 3+ times. Whatever tops the count belongs in paragraph one. -->

## Seniority read

<!-- From the verbs: support/assist = junior, execute/deliver = mid, own/lead/design = senior,
     shape/establish = staff+. Flag any mismatch between the title and the verbs. -->

## Evidence coverage

| # | Requirement | Coverage | Evidence (name the proof story or case study) |
|---|---|---|---|

## Red flags

<!-- Say these plainly. Check strategy.md for the comp floor and non-negotiables first. -->

## Verdict

- **Coverage:** _ strong, _ adjacent, _ thin, _ gaps
- **What actually decides this:**
- **Positioning line to use:** engineering-leaning / forward-deployed / developer-experience / learning-leaning
- **Recommendation:**
- **What a good outcome looks like here:**
`,

  '02-cv.md': `<!-- Tailored CV: a SUBTRACTION of assets/master-cv.md, not a rewrite.
     1. Pick the target role family from 01-analysis.md
     2. Keep bullets tagged for it, drop the rest
     3. Top three bullets of the lead role must hit the ad's top three must-haves
     4. Reword only those top bullets — outcome first, then method
     5. Strip the tags
     6. Resolve every [verify] marker before this is sendable
     Then: npm run jobs:pdf -- job-applications/${slug}/02-cv.md -->
`,

  '03-cover-letter.md': `<!-- Two variants, DIFFERENT STRATEGIC BETS, not two tones.
     Read references/cover-letter.md and references/voice.md first.
     250-350 words each. 200 if it's going into a portal text box. -->

## Variant A — bet: <what this one wagers on>

## Variant B — bet: <what this one wagers on>
`,

  '04-evidence.md': `# Portfolio evidence — ${company}

<!-- 2-3 pieces maximum, from assets/portfolio-index.md.
     CHECK THE \`Presentable\` FIELD. Most repos are private; for those the case study is the
     artefact. Publicly verifiable: AbletonMCP PR #106, qpiq.app, storipro.ai,
     docs.commercetools.com/docs/learning. -->

### 1.

- **Why this piece for this role:**
- **Requirement it answers:**
- **Linking one-liner:**
- **Needs fixing first:**
`,

  'notes.md': `# Notes — ${company}

## Contacts

<!-- Named person for the letter. "Dear Hiring Team" if genuinely unfindable, never
     "To Whom It May Concern". -->

## Interview prep

<!-- The follow-up questions the chosen proof stories invite — evidence-bank.md has the honest
     answer for each. Rehearse those, not the letter. -->

## Timeline

| Date | Event |
|---|---|
| ${today} | Workspace created |
`,
};

mkdirSync(dir, { recursive: true });
for (const [name, body] of Object.entries(files)) {
  writeFileSync(join(dir, name), body);
}

console.log(`✓ job-applications/${slug}/`);
for (const name of Object.keys(files)) console.log(`    ${name}`);
console.log(`\nNext: paste the ad verbatim into 00-job-ad.md, then work Steps 2-8 of the skill.`);
