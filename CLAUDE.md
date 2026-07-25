# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Luke Panaccio's personal portfolio — a static **Astro 4** site (Tailwind + MDX), deployed to GitHub Pages on the custom domain `www.lukepanaccio.com`. The content is a set of project case studies positioning Luke as an applied-AI / systems builder.

## Commands

```bash
npm install          # install deps
npm run dev          # dev server at localhost:4321
npm run build        # static build → dist/
npm run preview      # serve the built dist/ locally
npm run deploy       # build + push dist/ to gh-pages branch (manual; CI also does this)
```

There is **no test suite and no linter** configured — `package.json` has only Astro scripts. Don't look for `npm test`/`npm run lint`; verify changes with `npm run build` (catches MDX/Astro errors) and visual inspection via `npm run dev`.

Deployment is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` via `peaceiris/actions-gh-pages`. `public/CNAME` pins the custom domain.

## Architecture

**Routing is file-based.** `src/pages/*.astro` and `src/pages/projects/*.mdx` each become a route. There is no router config and no content collection — projects are plain MDX files, not entries in `src/content/`.

**Each project case study is one `.mdx` file** in `src/pages/projects/`. It opts into the project chrome via `layout: '../../layouts/ProjectLayout.astro'` in its frontmatter. The frontmatter fields the layout renders (title, tagline, client, role, timeline, tools, `agenticStack`, audience, deliverables, heroImage, demoLink, githubLink, metrics) are defined by the `Props` interface in `src/layouts/ProjectLayout.astro` — that interface is the source of truth for what a project page can declare. The MDX body is rendered into the `.project-content` article column, which carries its own prose styling (also in `ProjectLayout.astro`).

**The homepage project list is hand-maintained and separate from the MDX files.** `src/pages/index.astro` holds two hardcoded data structures in its frontmatter script: `featuredProject` and the `projects` array. Creating a new `projects/<slug>.mdx` file does **not** make it appear on the homepage. To add a project you must do both: create the MDX file *and* add an object to the `projects` array in `index.astro`, with a `href` that matches the slug. Each card's `categories` array (`'ai-systems' | 'engineering' | 'learning'`) drives the client-side homepage filter.

**Layout nesting:** `Layout.astro` is the HTML shell (head, fonts, analytics, global theme CSS, grain overlay). `ProjectLayout.astro` wraps `Layout` and adds `Header`, `Footer`, the project hero/sidebar/metrics, and a right-rail `TableOfContents`. Page-level `.astro` files (`index`, `about`, `404`) use `Layout` directly and compose components themselves.

**MDX components are imported per-file as needed**, not globally registered:
- `MermaidDiagram.astro` — renders a Mermaid `flowchart`/diagram client-side from a CDN, themed dark/amber. Pass the diagram as a template-string `diagram={\`...\`}` prop.
- `ImageGallery.astro` — a click-to-enlarge lightbox grid; takes an `images` array of `{src, alt}`.
- `TableOfContents.astro` — auto-built from headings; used by `ProjectLayout`.

## Theming (important — there are stale guides)

The live theme is **"Neo-Editorial Dark"**: dark navy backgrounds, warm amber/gold (`#f59e0b`) accents, Crimson Pro display + Manrope body. The **source of truth is the CSS custom properties in the `<style is:global>` block of `src/layouts/Layout.astro`** (`--color-bg-*`, `--color-accent-*`, `--color-text-*`, `--font-*`). Change colors/fonts there.

Watch out:
- `tailwind.config.mjs` is largely **vestigial** — its `primary` color palette and `Inter`/`Crimson Pro` font config do not reflect the live theme (the site uses Manrope and amber accents). Don't trust it as the theme definition; it mainly exists so Tailwind's `content` scan and base utilities work.
- Many `bg-bg-elevated` / `text-text-primary` / `bg-gradient-accent` style classes are **hand-written CSS in the `<style>` blocks of `ProjectLayout.astro`**, mapping to the CSS variables — they are not standard Tailwind utilities. If a class like that "doesn't exist," check those `<style>` blocks.
- `DARK-THEME-GUIDE.md` is an older changelog referencing `*-enhanced.astro` files that no longer exist; treat it as background, not instructions.
- The `README.md` "Maintenance Guide" is accurate on workflow but uses stale `/portfolio/...` link prefixes. `astro.config.mjs` currently has `base` commented out, so the site serves from root and internal links are root-relative (`/projects/<slug>`, not `/portfolio/projects/<slug>`). Components build internal links from `import.meta.env.BASE_URL`.

## Images & the standalone design system

Hero images live in `public/images/` as hand-authored **SVGs** (`<slug>-hero.svg`), referenced by `heroImage` frontmatter and the homepage cards.

`scripts/` contains Node scripts (most using **Playwright/chromium** to rasterize HTML→PNG) for generating the OG card (`generate-og.mjs`), favicons, contact sheets, and the design-system hero previews (`build-ds-heroes.mjs`). These are run manually as needed, not part of `npm run build`.

`design-system/` is a **separate, standalone static HTML design system** ("Claude Design", annotated with `@dsCard` comments) documenting the site's foundations, components, and hero treatments. It is not part of the Astro app or the deployed site — it's a reference/preview surface.

## Content voice (read before writing or editing case-study copy)

Project copy follows a strict, documented standard — match it rather than writing generic portfolio prose:
- Each case study follows **Problem → Architecture & why → Evals/validation → Outcome**.
- Every architecture decision names the **alternative rejected** and why.
- Lead with the *decision/judgment*, not the demo. End on a **real number**. Claim nothing you couldn't defend in an interview.
- Vocabulary: production · ship · architecture · agentic · evals · pipeline · RAG · MCP · latency · cost · accuracy · single source of truth. Say **users / customers / developers**, never "learners."

The full rules live in `case-study-intake.md` (the repo's intake template for turning a source repo into a calibrated case study) and `portfolio-reframing-guide.md` (the positioning/voice layer). Consult them before substantive content work.

## The job-application system

`.claude/skills/job-application/` is a **project skill** that turns a job ad into a targeted application: analyse the ad → assess honest fit → tailor the CV → draft a cover letter → pick portfolio evidence. Invoke it by pasting or linking a job ad, or via `/apply <url or text>`.

It treats the case studies as the evidence base, which is why it lives here rather than in a separate repo.

**The three-layer data model matters — don't collapse it:**

| Layer | File | Who owns it |
|---|---|---|
| Mechanical facts | `assets/portfolio-index.md` | **Generated** from `src/pages/projects/*.mdx` frontmatter. Never hand-edit. |
| Judgement | `assets/portfolio-judgements.md` | Hand-maintained: what each project *proves*, which role families to use it for, the linking one-liner, whether the artefact is presentable. |
| Career inventory | `assets/evidence-bank.md`, `assets/master-cv.md` | Hand-maintained: proof stories, defensible numbers, voice samples, and the superset CV. |

`master-cv.md` is the superset — **every bullet is tagged by role family** (`applied-AI`, `platform`, `security`, `forward-deployed`, `devex`, `founding`, `learning`, `leadership`). Tailoring is subtraction and reordering against those tags, not rewriting, so thirty applications can't contradict each other.

**Adding a case study now has a third step.** Beyond creating the MDX file and adding it to the `projects` array in `index.astro`, add a `## <slug>` block to `portfolio-judgements.md` and run `npm run jobs:index`. The generator exits non-zero if any case study has no judgement block, so the omission surfaces rather than silently producing an index with holes in the two fields cover letters actually draw on.

```bash
npm run jobs:index                            # regenerate portfolio-index.md
npm run jobs:new -- "Company" "Role Title"    # scaffold job-applications/<slug>/
npm run jobs:pdf -- <file.md>                 # markdown → ATS-safe PDF (needs npm install)
npm run jobs:bundle                           # → dist-skill/job-application.skill for Claude chat
```

**Privacy — this repo is public.** `job-applications/` is gitignored and holds per-role work plus `_private/strategy.md` (comp floor, non-negotiables, honest gaps, references, application log). Nothing from `_private/` goes into the chat bundle. The committed assets contain only material already published on the site. Keep it that way: if a new asset would embarrass or undercut Luke in a negotiation, it belongs under `job-applications/_private/`, not in the skill folder.

`references/voice.md` is the voice layer for anything written *as* Luke, derived from the case-study prose. Read it before drafting a letter — including the note that his heavy em-dash use is authentic and should not be stripped to satisfy a generic anti-AI-slop rule.

The Claude chat copy of this skill is a **snapshot** built by `jobs:bundle`. It drifts silently once the repo copy changes; rerun the bundle and re-upload after editing anything in the skill folder.
