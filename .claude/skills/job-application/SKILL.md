---
name: job-application
description: Analyse a job description, assess honest fit, tailor a CV, draft a cover letter, and select portfolio evidence for a specific role. Use this whenever the user pastes or links a job ad, mentions applying for a role, asks for a cover letter, asks whether their CV matches a position, asks "should I apply for this", asks how to talk about a project in an application, or is preparing for a job search — even if they don't use the words "cover letter" or "CV". Also use when the user wants to update their evidence bank or reflect on what a role is really asking for.
---

# Job Application

Turns a job ad into a targeted application. The core idea: **evidence first, prose last.** Weak
applications are weak because the writing started before the mapping was done, so the letter
describes the candidate in adjectives instead of proving them with specifics.

This copy is configured for **Luke Panaccio** and lives in his portfolio repo, so the evidence is
already assembled. Do not interview him for things that are on disk.

## Step 0 — Load context

All paths relative to this skill folder. Read what the step needs, not everything up front.

| File | What it's for | Read at |
|---|---|---|
| `assets/evidence-bank.md` | 9 proof stories, ~40 defensible numbers, positioning, voice samples | Step 2 |
| `assets/portfolio-index.md` | 21 case studies: what each proves, best-for, linking one-liner, presentable? | Step 2, 6 |
| `assets/master-cv.md` | The superset CV, every bullet tagged by role family | Step 4 |
| `references/voice.md` | Luke's voice calibration — non-optional before drafting | Step 5 |
| `../../../job-applications/_private/strategy.md` | Comp floor, non-negotiables, gaps and bridges, application log | Step 1, 3 |

`portfolio-index.md` is **generated** — mechanical facts from `src/pages/projects/*.mdx` frontmatter,
judgement fields from `assets/portfolio-judgements.md`. If a case study looks missing, run
`npm run jobs:index` rather than reading the MDX files ad hoc. Read case-study bodies only when a
requirement needs a detail the index doesn't carry.

**If this copy is running in Claude chat rather than the repo**, the assets are bundled with it and
the repo isn't reachable — work from the assets, and note that the private strategy file is absent,
so comp and gap guidance will be missing.

## Step 1 — Intake the ad

If given a **URL**, fetch it. If the fetch fails or returns a JS shell (common on Workday, Greenhouse
and LinkedIn), ask for a paste rather than working from the URL slug — a guessed job ad produces a
confidently wrong application.

Scaffold the workspace, which also gives every output a home:

```bash
npm run jobs:new -- "Company Name" "Role Title"
```

That creates `job-applications/<company>-<role>-<yyyy-mm>/` (gitignored — this is a public repo)
with numbered stubs. Save the raw ad to `00-job-ad.md` verbatim before analysing it, so later steps
argue with the source rather than with a summary.

## Step 2 — Decompose the ad

Write the requirements table to `01-analysis.md`. Do not skip to writing.

| # | Requirement | Must / Nice | Stated or implied | What they're actually worried about |
|---|---|---|---|---|

Three things most people miss:

- **The pain behind the role.** Roles exist because something is broken or unbuilt. An ad that says
  "stakeholder alignment" three times describes an organisation where the last person couldn't get
  buy-in. Name the likely pain — it becomes the spine of the letter.
- **Implied requirements.** "Fast-paced scale-up" implies ambiguity tolerance and no support staff.
  "Partner with SMEs" implies influence without authority.
- **Seniority signals.** The verbs give it away: *execute* vs *own* vs *shape*. Match the register
  of the application to the register of the ad.

Then map evidence to every requirement and rate the coverage:

- **Strong** — specific, recent, with a measurable or concrete outcome
- **Adjacent** — real experience in a neighbouring context that transfers with explanation
- **Thin** — could be claimed but not evidenced
- **Gap** — nothing

Be honest about Thin and Gap. Inflating coverage here is how people end up in interviews defending
claims they can't back. Cite the specific proof story or case study for every Strong.

See `references/jd-analysis.md` for decoding ad language, the four reasons roles exist, and red
flags. Flag red flags plainly — comp band below current, two jobs in one ad, a title that's a scope
downgrade. Check `strategy.md` for the comp floor and the non-negotiables before pronouncing on fit.

## Step 3 — Fit verdict, before any prose

Stop and report:

- Coverage summary (e.g. 6 strong, 3 adjacent, 2 gaps)
- The one or two things that will actually decide this application
- Which of the four positioning lines in `master-cv.md` this role wants — engineering-leaning,
  forward-deployed, developer-experience, or learning-leaning. **This is the fork the whole
  application hangs off.** Luke's profile can point in genuinely different directions and a hedged
  application points in none.
- An honest recommendation: strong apply / apply with a specific angle / stretch, worth a shot
  because X / probably not worth the hours

Then ask: **what does a good outcome look like — an interview, a foot in the door at that company, or
a salary benchmark?** That changes how aggressive the positioning should be. Write nothing until it's
settled, unless he's already said "just write it."

## Step 4 — Tailor the CV

`master-cv.md` is the superset and every bullet carries role-family tags (`applied-AI`, `platform`,
`security`, `forward-deployed`, `devex`, `founding`, `learning`, `leadership`). Tailoring is
**subtraction and reordering**, not rewriting:

1. Pick the target family from Step 3.
2. Keep the bullets tagged for it; drop the rest.
3. Reorder so the **top three bullets under the most recent relevant role hit the ad's top three
   must-haves**. If they don't, reorder again.
4. Reword only those top bullets to lead with outcome then method, using the ad's exact terminology
   where it's truthful.
5. Drop the tags, write to `02-cv.md`.

Two things specific to this profile:

- **The most recent role is not always the lead.** For an engineering role, the qpIQ and storipro
  work is the evidence and commercetools is context. Reordering roles is legitimate as long as the
  timeline stays legible.
- **Resolve every `[verify]` marker** in `master-cv.md` before generating a sendable document —
  contact details, work rights, and the storipro/qpIQ dates. Ask him; don't guess. Work
  authorisation in particular is a hard gate on a lot of ads.

Show the changes as before/after pairs so he can approve each one. See `references/cv-tailoring.md`
for ATS mechanics, bullet patterns and the pre-send checklist.

## Step 5 — Draft the cover letter

Read `references/cover-letter.md` **and** `references/voice.md` before drafting. Write to
`03-cover-letter.md`.

Non-negotiables:

- Never open with "I am writing to express my interest in..."
- Never restate the ad back at them
- Every claim carries its evidence in the same sentence or the next one
- Australian spelling, his vocabulary, his sentence-length variation. Name the alternative rejected
  at least once — it's the signature move and the fastest proof of judgment.
- The career transition is framed as an advantage in one sentence, never apologised for and never
  hidden. `references/voice.md` has the exact framing.

Produce **two variants with different strategic bets**, not two tones, and label the bet. Example:
"Bets on the security and production-systems evidence — best if the hiring manager is technical" vs
"Bets on engineer-who-can-also-teach as the differentiator — best if they're hiring developer-facing."
He picks the bet.

## Step 6 — Select portfolio evidence

2–3 pieces maximum, to `04-evidence.md`. For each: why this piece for this requirement, the linking
one-liner from `portfolio-index.md`, and anything that needs fixing first.

**Check the `Presentable` field before recommending anything.** Most repos are private — qpIQ,
storipro, Marcus, Second Brain — and for those the case study is the artefact, not the source. The
publicly verifiable set is small and worth spending deliberately: AbletonMCP PR #106, qpiq.app,
marcus-aurelius-bot.fly.dev, docs.commercetools.com/docs/learning.

## Step 7 — Produce the sendable files

```bash
npm run jobs:pdf -- job-applications/<slug>/02-cv.md --name "Panaccio-Luke-CV-<Company>"
npm run jobs:pdf -- job-applications/<slug>/03-cover-letter.md --name "Panaccio-Luke-CoverLetter-<Company>"
```

The renderer produces ATS-safe output on purpose — single column, standard headings, real selectable
text, no graphics — and **normalises every non-ASCII character to ASCII** (middots to commas, arrows
to "to", en/em dashes to hyphens, smart quotes to straight), because strict parsers drop lines that
contain them. It prints how many it changed and refuses to pass clean while `[verify]` markers,
role-family tags, or a markdown table remain. Read that output; a non-zero exit means something still
needs fixing before the file is sendable.

Naming, per `references/cv-tailoring.md`: `Panaccio-Luke-CV-<Company>.pdf` and
`Panaccio-Luke-CoverLetter-<Company>.pdf`. Before declaring done, run the pre-send checklist in
`references/cv-tailoring.md` — the company-name-wrong-throughout error is the most common fatal one
and it is entirely mechanical to catch.

## Step 8 — Close the loop

Two updates, both cheap and both usually skipped:

1. Append to the application log in `job-applications/_private/strategy.md`: date, company, role,
   **the angle taken**, status. Patterns in what gets responses are worth more than the response
   rate.
2. If the application surfaced a story, number, or gap-bridge that isn't in `evidence-bank.md`, add
   it. If it surfaced a new project, write the case study, add a judgement block, and rerun
   `npm run jobs:index`. The bank compounds; that's the whole point of it being a repo and not a
   folder of Word documents.

## Maintenance

| Command | When |
|---|---|
| `npm run jobs:index` | After adding a case study or editing `assets/portfolio-judgements.md` |
| `npm run jobs:new -- "Co" "Role"` | Starting an application |
| `npm run jobs:pdf -- <file.md>` | Producing sendables (needs `npm install` for Playwright) |
| `npm run jobs:bundle` | Rebuild `dist-skill/job-application.skill` to re-upload to Claude chat |

The chat bundle is a **snapshot**. After changing anything in this folder, rerun `jobs:bundle` and
re-upload, or the chat copy silently drifts from the repo copy.

## Tech profile document

A separate deliverable from the CV: one to two pages establishing technical credibility, for when the
title doesn't signal it. The current version is the tech profile Luke already maintains; regenerate
it from `evidence-bank.md` and `portfolio-index.md` rather than editing it blind.

Ask who reads it first — an engineering hiring manager, a non-technical recruiter, and a prospective
client each need a different document. Then: positioning line · 3–4 capability areas each tied to a
specific project · 3–4 selected projects (problem, what he built, outcome, stack — four lines each) ·
stack grouped by honest depth, distinguishing "built production systems with" from "have used" ·
optionally "how I work" if there's a genuine methodological point.

**The failure mode:** a list of technologies. That's a skills section and it's already on the CV. The
document earns its existence by connecting capability to evidence — every claim traceable to
something a reader could go and look at.

## References

- `references/jd-analysis.md` — decoding ad language, seniority signals, red flags
- `references/cover-letter.md` — structure and the anti-pattern list
- `references/cv-tailoring.md` — ATS mechanics, bullet patterns, pre-send checklist
- `references/voice.md` — Luke's voice, and the transition framing
- `references/Copywriting Samples.md` — Luke's own writing; the voice source `voice.md` is built from
- `assets/evidence-bank-template.md` — the blank template, kept for reuse
- `scripts/extract_portfolio.py` — indexes *other* repos; the portfolio's own case studies come from
  `index-case-studies.mjs` instead
