# Master CV — Luke Panaccio

> **This is the superset, not a document to send.** Every tailored CV is a *subtraction and
> reordering* of this file, plus targeted rewording of the top bullets. Maintaining one master and
> subtracting per application is what stops thirty applications from contradicting each other in
> interviews.
>
> **How the tags work.** Every bullet carries a role-family tag. Tailoring is then mechanical rather
> than intuitive: pick the target family, keep the bullets tagged for it, drop the rest, reorder so
> the top three under the most recent role hit the ad's top three must-haves.
>
> Families: `applied-AI` · `platform` · `security` · `forward-deployed` · `devex` · `founding` ·
> `learning` · `leadership`
>
> Items marked **[verify]** are inferred from the portfolio or tech profile and need Luke's
> confirmation before they go in a sent document. Nothing here should be claimed that can't be
> defended for five minutes under questioning.

---

## Contact

- **Name:** Luke Panaccio
- **Email:** lukepanaccio@gmail.com
- **Portfolio:** https://www.lukepanaccio.com
- **GitHub:** https://github.com/lukepanaccio
- **LinkedIn:** https://www.linkedin.com/in/luke-p-b444b124b/
- **Location:** Melbourne, Australia
- **Work rights:** Australian and Italian citizen (dual passports) — full work rights across
  Australia, and the EU/EEA via Italian (EU) citizenship. No sponsorship required for AU or EU roles.
- **Phone:** kept out of this public file — see `job-applications/_private/strategy.md` and pull it
  from there (or ask Luke directly) when generating a sendable CV. Never hardcode it here; this file
  is committed to a public repo and the number is not published anywhere on the live site.

---

## Positioning lines

Pick one per application. Do not blend them — a hedged positioning line reads as no positioning
at all.

- **Engineering-leaning:** Applied-AI engineer who ships secure, agentic systems end to end —
  multi-tenant authorisation, real-money billing, and agent pipelines running in production CI.
- **Forward-deployed / solutions:** Engineer who deploys systems into other people's workflows and
  makes them stick — fast custom builds, stakeholder-facing, AI-native delivery.
- **Developer-experience:** Engineer and developer-educator who industrialises technical content the
  way you'd industrialise code — docs-as-code, agentic maintenance pipelines, eval-gated quality.
- **Learning-leaning (current-field roles):** Learning systems architect who builds the platform as
  well as the curriculum — 9 learning paths, 40+ modules, and the AI pipelines that keep them
  current.

---

## Experience

### Customer Enablement Systems Architect — commercetools
**2022 – present** · B2B composable-commerce platform

Full bullet inventory. 12-month git history: 82 commits, ~+36,100 / −16,000 lines across
docs-as-code, frontend, and AI automation.

- `applied-AI` `devex` Rebuilt an 18-prompt authoring system into a coordinator agent with one skill
  per stage, a separate judge and fixer, and a deterministic pass/fail gate calibrated against a
  10-item gold set including two adversarial cases — zero false-passes at threshold.
- `applied-AI` `platform` Built a three-agent Copilot Skills pipeline (analyzer → mapper →
  generator, 46 files, +3,688 lines) that detects when any of 250+ API releases a year has left
  documentation stale, and drafts the fix — human-in-the-loop, feeding a RAG assistant.
- `applied-AI` Built Python automation and Claude API integrations delivering 60% efficiency gains,
  reclaiming 400+ hours annually while doubling team output.
- `applied-AI` `devex` Designed the LLM-judge calibration and score-validation tooling that makes
  the quality gate trustworthy — an LLM that grades its own work can't be, so the judge and the
  author are separate agents.
- `devex` `learning` Owned the B2B Commerce learning path end to end — SME interviews → proposal →
  claims validation → shipped modules covering buyer orgs, associate access, catalogs, pricing,
  purchasing and quotes, approval workflows. Every API example checked against the RAML source
  rather than written from memory. Module-2 critique score 88/100.
- `learning` `devex` Architected enablement from 0→9 learning paths and 40+ modules (~60 hours,
  600+ content pages, 31+ assessments), deliberately cross-linked so the paths teach how the
  platform fits together.
- `learning` `devex` Built the Developer Essentials path: 20 hours taking enterprise commerce
  developers from environment setup to advanced API patterns, dual-language (TypeScript and Java),
  ending in a challenge that proves production readiness. 30+ hands-on tasks.
- `devex` `platform` Implemented docs-as-code infrastructure (MDX/TypeScript) for version-controlled
  technical education delivery.
- `devex` Contributed to a 5-person single-source-of-truth programme that removed ~2,660 duplicated
  lines across 8 API domains and sunset a redundant microsite — duplicates were competing in search
  and degrading RAG retrieval. Captured the classification call as a reusable 0–4 classifier skill.
- `applied-AI` `learning` Built a synthetic senior-developer persona that supplies SME-grade
  documentation feedback in under five seconds, removing SME availability as the review bottleneck.
- `platform` Shipped tested React/TypeScript components in the Next.js learning frontend
  (`CourseCompletedModal` with Jest, `LearningHomepage`, `LearningHero`), Mermaid rendering, Vercel
  deploy config and redirects.
- `devex` Expanded RAML API reference coverage — null-field omission, unknown-query-param handling.
- `leadership` Embedded alongside Product and Engineering during development of commercetools'
  agentic commerce offering; learning research conducted during module development informed product
  and engineering decisions pre-launch.
- `learning` `leadership` Designed curriculum using Zone of Proximal Development, scenario-based
  learning and cognitive load theory, reducing time-to-competency for developers.
- `leadership` Established frameworks connecting learning effectiveness to product adoption and
  support-deflection metrics.
- `learning` `leadership` Led end-to-end design and rollout of the public-facing digital learning
  platform for SaaS customers and partners.

### Technical Co-Founder — qpIQ
**Feb 2026 – present** (primary focus from Jul 2026) · B2B SaaS for Australian real-estate agents · https://qpiq.app

Solo-built: 146 commits, ~18k LOC TypeScript, ~22 test files plus an end-to-end isolation suite.
Next.js App Router · TypeScript · Firestore · Firebase Auth · Vercel · Resend.

- `security` `platform` Built the three-layer authorisation chain isolating each tenant's data on a
  deny-all datastore, where Firestore rules deny every client read and write so authz lives entirely
  in application code — plus an end-to-end suite that forges nothing, minting real session cookies
  through the app's own sign-in route and proving all 16 campaign-scoped mutating actions are denied
  and write zero bytes.
- `security` Hardened the web surface: per-request CSP nonce, CSRF and same-origin checks, referrer
  scoping on token URLs, fail-closed authz throughout (unset config denies), revocation-aware
  cookies, and 404-never-403 so responses don't disclose which resources exist.
- `applied-AI` `platform` Built a spec-driven system where WHEN/THEN requirements are canonical and
  coding agents work as deltas against them — 24 capability specs, 13 changes shipped spec-first,
  per-PR preview environments structurally unable to touch production, and two archive bugs caught
  that would have silently deleted live requirements. Reviewing a 60-line spec delta beats reviewing
  the 2,000-line diff it produced.
- `forward-deployed` `founding` Ran a field pilot inside a real agent's Saturday open home — 7
  questions on a buyer's phone in under 90 seconds, no login, producing a ranked call list and a
  vendor-ready report. Refused the features that would have made the data untrustworthy and
  pre-registered a counterfactual so the pilot could return a real answer. 3 defects found in real
  field use, all fixed and spec'd.
- `security` `platform` Designed per-customer PII silos where a single ownership check transitively
  protects all nested data, under the Australian Privacy Principles.
- `platform` `founding` Ran the whole delivery loop solo: design docs, a living task ledger, a
  backlog loop, a CI gate, and ops monitoring — orchestrating AI agents against a
  PR-and-merge workflow.

### Technical Co-Founder — storipro (Stori Ventures)
**Feb 2026 – present**

- `platform` `security` Took a founder's billing prototype to real-money production after a stale
  test-mode customer ID silently charged a card $138 with nothing recorded in the system: root-caused
  the incident, locked the data layer so zero billing fields are client-tamperable, built a
  self-healing webhook recovery path, and wrote 142 test cases from zero (Vitest + Playwright).
- `security` Closed a live privilege-escalation path where any logged-in user could grant themselves
  the top paid tier or pad their credit balance from the browser before any Stripe webhook ran —
  locked ~19 server-owned fields and wrote 59 rules tests (61 assertions) running against the
  shipped rules in the Firebase emulator.
- `applied-AI` `platform` Built a GitHub-native agentic pipeline where a labelled issue triggers a
  constrained headless Claude Code run that writes files and deterministic CI owns every git
  operation, opening a draft PR with a live preview. Gated on real repo permission level rather than
  `author_association` (which reads `NONE` in private orgs), issue text treated as data not
  instructions for prompt-injection hygiene, isolated spend key, model pinned, tools allowlisted,
  turns capped. Debugged from a flawed design into a clean workflow-owns-git split across a live
  4-PR arc.
- `platform` Shipped an in-app bug-reporting pipeline to 100% of users: five stages from report to
  private GitHub issue to resolution email, with server-issued upload tokens under tight limits,
  signature-verified webhooks, duplicate-event protection and a two-pass screenshot cleanup job.
  ~1,900 lines of dedicated tests, roughly 1.3:1 against implementation.
- `platform` Built the CI orchestration keeping ~40 brittle browser-automation jobs reliable against
  third-party sites with no API — failure isolation so no single source can sink the run, a
  Git-LFS-safe commit loop that survives `main` moving mid-run, and infrastructure-crash vs real-bug
  classification so only recoverable failures retry. Slowest source sped up ~27×.
- `platform` Diagnosed a 5.8% per-run geocoding success rate that read as a broken geocoder and was
  actually the shape of the addresses — a cleaner recovered 47% of the failing backlog and lifted
  whole-dataset coverage from 96.7% to 98.3% across ~110K records.

### Full-stack Developer (client engagement) — Australian University
**October 2025** · 1 month

- `applied-AI` `forward-deployed` Built a CLI tool using the Claude API to grade reflective-writing
  submissions against a rubric, with privacy-preserving anonymisation, consistency controls, and —
  the design decision that mattered — a mechanism that flags any judgment it can't substantiate
  against the paper rather than asserting it. 125+ papers graded, 60–80 hours saved per semester,
  $0.14–0.18 per paper. Python · pdfplumber · mammoth · python-docx.

### Open-Source Contributor — AbletonMCP
**Q2 2026**

- `applied-AI` `devex` Closed the read → modify → write loop in an open-source MCP bridge that could
  author MIDI but never read it back, forcing agents to regenerate every clip blind to manual edits.
  Added a read-only note reader and a main-thread-scheduled clear — the mutating command has to be
  main-thread-registered for thread safety — backed by a 13-test hermetic pytest suite with the
  socket mocked and no DAW or network required. Submitted upstream as PR #106, +612 / −0.
  Framework by Siddharth Ahuja (MIT); the contribution is the two tools and the suite.

### Co-Founder & Lead Learning Designer — 3 Steps Away
**2019 – 2022**

- `founding` `leadership` Co-founded a purpose-driven education enterprise, leading strategic vision
  and commercialisation of social-justice education programmes. 150 students across 3 partner
  schools, 97% completion rate.
- `learning` Designed multimodal blended experiences integrating asynchronous digital content
  (video, podcasts) with synchronous facilitation, plus a three-step critical-thinking framework and
  full brand identity.
- `leadership` Navigated stakeholder relationships across legal professionals, investors and
  corporate executives.
- `founding` Applied an ROI mindset to build sustainable learning products in a resource-constrained
  startup.

### Educational Leadership & Curriculum Design
**2011 – 2021**

*Humanities Learning Area Leader · House Leader, Emmaus College (2019–2021)*

- `leadership` Managed a team of 30+ educators; oversaw design and evaluation of 15 subject
  programmes.
- `leadership` Led high-stakes VCE programme delivery across a cohort of 150 students.

*Social Justice Coordinator, St Monica's College (2011–2018)*

- `leadership` Led an extracurricular programme for 150+ students and managed community
  partnerships.
- `learning` Designed specialised learning units focused on real-world application.

### Online Interfaith Dialogue Facilitator — Tony Blair Institute
**2014 – 2018**

- `leadership` Facilitated 200+ international dialogue sessions for the Generation Global programme,
  navigating high-stakes conversations across cultural and religious divides with student cohorts
  worldwide. Complemented by in-person facilitation to audiences of up to 2,000.

### Higher Education Instruction
**2006 – 2009**

- `learning` English Language Teacher, La Trobe University (2009) — developed specialised programmes
  for postgraduate international students.
- `learning` University Tutor, Universiteit Maastricht (2006–2007) — Contemporary World History,
  Political Philosophy, International Development Policy.

---

## Selected projects

Pull 2–3 per application from `portfolio-index.md`, which carries the per-project one-liner and
whether the artefact is actually linkable. Do not list projects here that the letter doesn't use.

Independently verifiable (public repo or live product): AbletonMCP PR #106 · qpiq.app ·
marcus-aurelius-bot.fly.dev · docs.commercetools.com/docs/learning · this portfolio (86 commits).

---

## Skills

Grouped by honest depth. The distinction is load-bearing — overclaiming here is caught in the first
technical conversation.

**Built production systems with**
TypeScript · Python · Next.js (App Router) · React · Node.js · Astro · MDX · Firestore ·
Firebase Auth & Admin SDK · Vercel · GitHub Actions · Claude API · MCP (server & tool development) ·
Vitest · Jest · pytest · Playwright · Stripe · Resend · Git/GitHub

**Working knowledge**
FastAPI · Fly.io · SQLite · Git LFS · GraphQL · RAML · OAuth 2.0 · Tailwind · Firebase Emulator
Suite · OpenTelemetry · Algolia · OpenAI Realtime API · Pipecat · HeyGen

**AI / LLM engineering**
Agentic pipelines · MCP server development · prompt engineering · prompt-injection hygiene ·
eval-driven QA and LLM-judge calibration · gold-set calibration · RAG (and a built alternative to
it) · real-time voice AI · headless coding agents in CI · spec-driven agentic development ·
subagents · agentic loops · Claude Code · GitHub Copilot Skills

**Security engineering**
Multi-tenant isolation · fail-closed authorisation · session and cookie security · CSP and CSRF
hardening · resource-disclosure avoidance · permission-level gating · isolated spend keys ·
security-rules testing against shipped rules

**Docs-as-code & developer experience**
MDX · RAML API specs · YAML navigation · single-source-of-truth consolidation · API reference
authoring · agentic content-maintenance pipelines

**Instructional design**
Learning objectives · Socratic method · Zone of Proximal Development · cognitive load theory ·
scenario-based assessment · persona-aware content · Moodle · Articulate 360 · H5P · Canvas

**Practice**
Spec-driven development · test-backed delivery · PR-and-merge workflow · AI-orchestrated pipelines ·
Agile/Scrum · Jira · Confluence

**Domain**
commercetools composable commerce — B2B modelling, carts and checkout, pricing, catalog, auth

---

## Education

- **Google Project Management: Professional Certificate** — Google / Coursera, 2024
- **Graduate Certificate of Educational Design** — Monash University, 2022
- **The Velocity Program** — University of Melbourne, 2021
- **Graduate Diploma of Education (Secondary)** — RMIT, 2010
- **Master of Arts (Arts and Sciences)** — University of Maastricht, Netherlands, 2007
- **Bachelor of Arts (Humanities / Social Sciences)** — University of Maastricht, Netherlands, 2006

---

## References

Available on request. Named contacts, the relationship, and what each would vouch for are kept in
`job-applications/_private/strategy.md`, not in this public file — naming a colleague here, in a
public repo, in a job-application context is a real exposure for that person and for Luke's
visibility with his current employer.
