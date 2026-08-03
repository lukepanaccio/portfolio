# Portfolio Index

> **Generated file — do not hand-edit.**
> Mechanical facts come from `src/pages/projects/*.mdx` frontmatter.
> Judgement fields (Proves / Best for / One-liner / Presentable) come from
> `assets/portfolio-judgements.md` — edit that file, then rerun `npm run jobs:index`.

22 case studies. Live at https://www.lukepanaccio.com

## At a glance

| Project | Client | Proves | Best for |
|---|---|---|---|
| [3 Steps Away: A social justice education platform](#3-steps-away-a-social-justice-education-platform) | 3 Steps Away (Co-founded startup) | co-founding and commercialising, with stakeholder work across sectors | founding · learning |
| [Closing the read–modify–write loop in an Ableton MCP server](#closing-the-read-modify-write-loop-in-an-ableton-mcp-server) | Open-source contribution · AbletonMCP | shipping into an unfamiliar open-source codebase, with tests, upstream | applied-AI · devex · platform |
| [Eval-driven AI authoring system](#eval-driven-ai-authoring-system) | commercetools | eval design, specifically not letting a model grade its own work | applied-AI · learning · devex |
| [Alex Chen: synthetic eval persona](#alex-chen-synthetic-eval-persona) | commercetools | prompt engineering as a substitute for a scarce human review loop | applied-AI · learning · devex |
| [B2B Commerce learning path](#b2b-commerce-learning-path) | commercetools | owning a dense technical domain end to end, with claims checked against source | devex · learning · forward-deployed |
| [In-app bug-reporting pipeline](#in-app-bug-reporting-pipeline) | storipro | shipping a multi-stage pipeline with distributed-systems care, to 100% of users | platform · founding · devex |
| [Content Drift Detection System](#content-drift-detection-system) | commercetools | agentic systems that maintain other artefacts, running in CI with a human in the loop | applied-AI · devex · learning |
| [An autonomous delivery pipeline that ships its own code](#an-autonomous-delivery-pipeline-that-ships-its-own-code) | qpIQ | running a multi-agent system unattended in production, safe by structural design rather than by trusting agent behaviour | applied-AI · platform · security · founding |
| [Developer Essentials learning path](#developer-essentials-learning-path) | commercetools | technical curriculum for developers, in two languages, ending in a real challenge | learning · devex |
| [Firestore security rules + emulator suite](#firestore-security-rules-emulator-suite) | storipro | closing a live privilege-escalation path and proving it stays closed | security · platform |
| [Geocoding accuracy campaign](#geocoding-accuracy-campaign) | storipro | diagnosing a metric that lies, then actually moving the number | platform · applied-AI · founding |
| [Marcus Aurelius: AI-powered Stoic mentor](#marcus-aurelius-ai-powered-stoic-mentor) | Personal Project | real-time voice AI, latency-constrained, shipped and running | applied-AI · forward-deployed |
| [Modular learning path ecosystem](#modular-learning-path-ecosystem) | commercetools | architecting a content system that scales across roles over three years | learning · devex |
| [Per-agent isolation on a deny-all datastore](#per-agent-isolation-on-a-deny-all-datastore) | qpIQ | authorisation design when the datastore enforces nothing and every decision is application code | security · platform · founding |
| [AI grading & evaluation system](#ai-grading-evaluation-system) | An Australian University (Internal Tool) | shipping a real LLM tool to a real client with privacy and honesty constraints | applied-AI · forward-deployed |
| [Field-deployed buyer survey pilot](#field-deployed-buyer-survey-pilot) | qpIQ | deploying into someone else's workflow, where adoption is the hard part | forward-deployed · founding |
| [Distributed scraper CI orchestration](#distributed-scraper-ci-orchestration) | storipro | keeping a fragile third-party-dependent pipeline reliable in CI | platform · founding |
| [The Second Brain: LLM-maintained wiki](#the-second-brain-llm-maintained-wiki) | Personal project | having a considered position on RAG, backed by a built alternative | applied-AI · devex |
| [Single-source-of-truth docs program](#single-source-of-truth-docs-program) | commercetools | working inside a cross-functional programme, not just solo | devex · learning · applied-AI |
| [Spec-driven development with coding agents](#spec-driven-development-with-coding-agents) | qpIQ | designing a review process that scales when agents write more code than a human can read | applied-AI · founding · platform |
| [Productionizing & securing a Stripe billing system](#productionizing-securing-a-stripe-billing-system) | storipro (storiventures) | taking someone else's prototype to real-money production, including the incident work | platform · founding · security |
| [Voice-to-Prototype agentic pipeline](#voice-to-prototype-agentic-pipeline) | storipro | running autonomous coding agents inside a real repository without handing them the keys | applied-AI · platform · founding |

---

## Detail

### 3 Steps Away: A social justice education platform

- **Slug:** `3-steps-away`
- **Title:** 3 Steps Away: A social justice education platform
- **Client:** 3 Steps Away (Co-founded startup)
- **Role:** Co-founder, Learning Designer, Visual Design Director
- **Timeline:** 2019-2022 (3 years)
- **Stack:** Adobe Creative Suite · Canva · Zoom · Mighty Networks · Squarespace · Miro · Ableton Live
- **Numbers:** **150** Students Enrolled · **97%** Completion Rate · **3** Partner Schools
- **Links:** [case study](https://www.lukepanaccio.com/projects/3-steps-away)
- **Proves:** co-founding and commercialising, with stakeholder work across sectors
- **Best for:** founding · learning
- **One-liner:** I co-founded a social-justice education startup and designed the blended programme it sold — 150 students across 3 partner schools at a 97% completion rate.
- **Presentable:** yes — case study only, company wound down

> Teaching high schoolers to respond to complex social issues through visual storytelling and experiential learning

### Closing the read–modify–write loop in an Ableton MCP server

- **Slug:** `ableton-mcp-control-layer`
- **Title:** Closing the read–modify–write loop in an Ableton MCP server
- **Client:** Open-source contribution · AbletonMCP
- **Role:** Open-source contributor — design, implementation, tests & upstream PR
- **Timeline:** Q2 2026
- **Stack:** Python · MCP / Model Context Protocol · Ableton Live Object Model · Remote Script (ControlSurface API) · socket IPC · pytest · uv · Ableton Live 12 · macOS
- **Agentic stack:** MCP server development · Plan mode · Headless / CLI (Claude Code) · Agentic pair-authoring
- **Numbers:** **13 / 13** Unit tests passing · **+612 / −0** Net change · purely additive · **5 / 5** Integration steps · Live 12.4.2
- **Links:** [repo](https://github.com/lukepanaccio/ableton-mcp) · [case study](https://www.lukepanaccio.com/projects/ableton-mcp-control-layer)
- **Proves:** shipping into an unfamiliar open-source codebase, with tests, upstream
- **Best for:** applied-AI · devex · platform
- **One-liner:** The upstream MCP bridge could write MIDI but never read it back, so an agent had to regenerate every clip blind — I added a read-only note reader and a main-thread-scheduled clear to close the read → modify → write loop, backed by a 13-test hermetic suite and submitted as PR #106, +612 / −0.
- **Presentable:** yes — public repo and upstream PR, the strongest independently verifiable artefact in the portfolio

> The open-source bridge could write MIDI but never read it back — so an AI agent had to regenerate every clip from memory, blind to manual edits. I designed and shipped two MCP tools, submitted upstream as PR #106, that close the read → modify → write loop.

### Eval-driven AI authoring system

- **Slug:** `ai-authoring-system`
- **Title:** Eval-driven AI authoring system
- **Client:** commercetools
- **Role:** Architect & primary author
- **Timeline:** 2026
- **Stack:** Node.js (zero-dep validator) · JSON config · Markdown/MDX · Claude Code · GitHub Copilot
- **Agentic stack:** Coordinator + isolated per-stage skills · Subagents · Agentic loops (critique → refine → re-critique) · Evals (LLM-judge + deterministic gate) · Gold-set calibration · CLAUDE.md + instruction files
- **Numbers:** **0** False-passes at threshold · **10** Gold-set items (2 adversarial) · **18** Prompts → agents & skills
- **Links:** [case study](https://www.lukepanaccio.com/projects/ai-authoring-system)
- **Proves:** eval design, specifically not letting a model grade its own work
- **Best for:** applied-AI · learning · devex
- **One-liner:** I replaced 18 tangled prompts with a coordinator agent, one skill per stage, and a separate judge and fixer — with a deterministic pass/fail gate calibrated against a 10-item gold set including two adversarial cases, giving zero false-passes at threshold.
- **Presentable:** link case study only — commercetools internal

> Give each authoring job the right tool, and never let an LLM grade its own work

### Alex Chen: synthetic eval persona

- **Slug:** `alex-chen-learner-persona`
- **Title:** Alex Chen: synthetic eval persona
- **Client:** commercetools
- **Role:** Prompt engineer & researcher
- **Timeline:** 2 days
- **Stack:** LLM Prompt Engineering · Deep Research Tools · User Research Synthesis
- **Numbers:** **24/7** SME Availability · **< 5 Secs** Feedback Latency
- **Links:** [case study](https://www.lukepanaccio.com/projects/alex-chen-learner-persona)
- **Proves:** prompt engineering as a substitute for a scarce human review loop
- **Best for:** applied-AI · learning · devex
- **One-liner:** SME review was the bottleneck on documentation quality, so I built a psychologically grounded synthetic senior developer that gives the same class of feedback in under five seconds, any time.
- **Presentable:** link case study only — commercetools internal

> A synthetic user that validates documentation by simulating a senior developer’s feedback

### B2B Commerce learning path

- **Slug:** `b2b-learning-path`
- **Title:** B2B Commerce learning path
- **Client:** commercetools
- **Role:** Owner (research → design → build)
- **Timeline:** 2026
- **Stack:** MDX · YAML navigation · Mermaid · RAML / GraphQL references
- **Agentic stack:** learning-content-creation coordinator agent · learning-qa-loop (critique gate) · content-deduplication skill · Instruction files
- **Numbers:** **2** Modules shipped · **88/100** Module-2 critique score · **+2,318** New content (Module 2, 8 pages)
- **Links:** [demo](https://lp-b2b-module-2.preview-docs.commercetools.com/learning-model-b2b-commerce) · [case study](https://www.lukepanaccio.com/projects/b2b-learning-path)
- **Proves:** owning a dense technical domain end to end, with claims checked against source
- **Best for:** devex · learning · forward-deployed
- **One-liner:** commercetools had no structured path for B2B modelling, so I owned it from SME interviews through to shipped modules — and checked every API example against the RAML source instead of writing it from memory, scoring 88/100 on the critique gate.
- **Presentable:** yes — public preview link in the case study

> Research, design, and build for a dense domain — with every API example checked against the source

### In-app bug-reporting pipeline

- **Slug:** `bug-reporting-pipeline`
- **Title:** In-app bug-reporting pipeline
- **Client:** storipro
- **Role:** Technical Co-Founder
- **Timeline:** 2026
- **Stack:** TypeScript · Next.js · Vercel Functions + Cron · Vercel Blob · GitHub Issues API · Resend · Vitest
- **Agentic stack:** OpenSpec spec-driven workflow · CLAUDE.md project memory · Authored .claude skills + commands alongside · Git worktrees · Agent-assisted test authoring
- **Numbers:** **100%** Rolled out to all users (GA) · **~1,900** Lines of dedicated tests (~1.3:1) · **5** Hardened pipeline stages
- **Links:** [case study](https://www.lukepanaccio.com/projects/bug-reporting-pipeline)
- **Proves:** shipping a multi-stage pipeline with distributed-systems care, to 100% of users
- **Best for:** platform · founding · devex
- **One-liner:** Five stages from in-app report to private GitHub issue to resolution email, with server-issued upload tokens, signature-verified webhooks, duplicate-event protection and a two-pass screenshot cleanup — roughly 1,900 lines of dedicated tests against it.
- **Presentable:** link case study only — storipro repo is private

> In-app report → private GitHub issue → resolution email, shipped to all users and built with distributed-systems care

### Content Drift Detection System

- **Slug:** `content-drift-detection-system`
- **Title:** Content Drift Detection System
- **Client:** commercetools
- **Role:** Learning Systems Architect
- **Timeline:** 2026
- **Stack:** GitHub Copilot · VS Code · Node.js · MDX · Algolia Search
- **Agentic stack:** Skills: release-analyzer → content-mapper → change-generator · Progressive disclosure (lazy-loaded refs) · Portable across VS Code / Copilot CLI · Human-in-the-loop · Instruction files
- **Numbers:** **3** Pipeline skills (analyzer·mapper·generator) · **+3,688** System size (46 files) · **2** Real release-note test runs (5 updates)
- **Links:** [case study](https://www.lukepanaccio.com/projects/content-drift-detection-system)
- **Proves:** agentic systems that maintain other artefacts, running in CI with a human in the loop
- **Best for:** applied-AI · devex · learning
- **One-liner:** 250+ API releases a year silently rot documentation, so I built a three-agent pipeline — analyzer → mapper → generator — that detects the drift and drafts the fix before a developer hits a stale page.
- **Presentable:** link case study only — commercetools internal

> An agentic system that keeps documentation in step with fast-moving API changes, running in CI

### An autonomous delivery pipeline that ships its own code

- **Slug:** `dev-delivery-pipeline`
- **Title:** An autonomous delivery pipeline that ships its own code
- **Client:** qpIQ
- **Role:** Technical Co-Founder
- **Timeline:** Jul-Aug 2026
- **Stack:** TypeScript · Next.js App Router · Vercel · Firebase Auth · Firestore · Resend · GitHub Actions · GitHub CLI/API · OpenSpec
- **Agentic stack:** Claude Code cloud scheduled sessions — 9 independently-scheduled loops · Event-driven claude-code-action GitHub Actions workflows · CLAUDE.md as the single guardrail every loop and entry point reads first · OpenSpec propose/apply/archive skills driving spec-then-code · Headless/CLI execution inside GitHub Actions runners
- **Numbers:** **115** PRs merged through the two-gate pipeline, zero gate breaches · **9** Autonomous loops running unattended in production · **6 → 1** Conflicting PRs from one flaw, fixed by one same-day change
- **Links:** [demo](https://qpiq.app) · [case study](https://www.lukepanaccio.com/projects/dev-delivery-pipeline)
- **Proves:** running a multi-agent system unattended in production, safe by structural design rather than by trusting agent behaviour
- **Best for:** applied-AI · platform · security · founding
- **One-liner:** Nine Claude Code loops write, review and ship qpIQ's own code on a schedule, gated by two structural GitHub mechanisms rather than agent good behaviour — 115 PRs merged with zero gate breaches, and two real governance bugs caught and fixed by the system itself.
- **Presentable:** link case study only — qpIQ repo is private; qpiq.app is the live product

> Nine loops write, review and ship the code. Two structural GitHub gates decide what goes live — never the agents’ good behaviour.

### Developer Essentials learning path

- **Slug:** `developer-essentials-learning-path`
- **Title:** Developer Essentials learning path
- **Client:** commercetools
- **Role:** Instructional Designer & Curriculum Developer
- **Timeline:** 6 months (2024)
- **Stack:** TypeScript SDK · Java SDK · MDX · GraphQL · OAuth 2.0 · OpenTelemetry
- **Numbers:** **20h** Total Curriculum · **8** Modules · **2** Languages Supported
- **Links:** [case study](https://www.lukepanaccio.com/projects/developer-essentials-learning-path)
- **Proves:** technical curriculum for developers, in two languages, ending in a real challenge
- **Best for:** learning · devex
- **One-liner:** Takes enterprise commerce developers from environment setup to advanced API patterns in 20 hours, ending in a challenge that proves they can build in production — dual-language, TypeScript and Java.
- **Presentable:** yes — live at docs.commercetools.com/docs/learning

> Takes enterprise commerce developers from zero to production-ready in 20 hours of hands-on work

### Firestore security rules + emulator suite

- **Slug:** `firestore-security-rules`
- **Title:** Firestore security rules + emulator suite
- **Client:** storipro
- **Role:** Technical Co-Founder
- **Timeline:** 2026
- **Stack:** Firestore · Security Rules · Firebase Emulator · TypeScript · Vitest
- **Agentic stack:** CLAUDE.md project memory (emulator-port discipline) · Git worktrees (multi-instance) · Emulator-backed regression tests · Agent-assisted attribution audit
- **Numbers:** **59** Rules tests authored (61 assertions) · **~19** Server fields locked (create + update) · **0** Privilege-escalation paths left open
- **Links:** [case study](https://www.lukepanaccio.com/projects/firestore-security-rules)
- **Proves:** closing a live privilege-escalation path and proving it stays closed
- **Best for:** security · platform
- **One-liner:** The shipped rule let any logged-in user grant themselves the top paid tier from the browser — I locked ~19 server-owned fields and wrote 59 tests that run against the real rules in the emulator, so the fix can't silently regress.
- **Presentable:** link case study only — storipro repo is private

> Stopping users from granting themselves paid access in the browser, and proving it stays stopped

### Geocoding accuracy campaign

- **Slug:** `geocoding-accuracy-campaign`
- **Title:** Geocoding accuracy campaign
- **Client:** storipro
- **Role:** Technical Co-Founder
- **Timeline:** 2026
- **Stack:** TypeScript · OpenStreetMap Nominatim · SQLite · GitHub Actions · Git LFS
- **Agentic stack:** CLAUDE.md project memory + worktree-per-change · Subagent offloading for research/attribution · Git-based stale-DB pre-flight guard
- **Numbers:** **5.8%→47%** Backlog recovery (1,625 rows) · **98.3%** Whole-DB coverage, from 96.7% (~110K records) · **1,532** Rows protected by stale-DB guard
- **Links:** [case study](https://www.lukepanaccio.com/projects/geocoding-accuracy-campaign)
- **Proves:** diagnosing a metric that lies, then actually moving the number
- **Best for:** platform · applied-AI · founding
- **One-liner:** A 5.8% per-run success rate read as a broken geocoder; it was the shape of the addresses — a cleaner recovered 47% of the failing backlog and took whole-dataset coverage to 98.3%.
- **Presentable:** link case study only — storipro repo is private

> A 5.8% per-run success rate looked like a broken geocoder. It was a data problem, and I moved the number

### Marcus Aurelius: AI-powered Stoic mentor

- **Slug:** `marcus-aurelius`
- **Title:** Marcus Aurelius: AI-powered Stoic mentor
- **Client:** Personal Project
- **Role:** Learning solution architect & full-stack dev
- **Timeline:** 3-4 weeks (November 2025)
- **Stack:** OpenAI Realtime API · HeyGen Interactive Avatar · Pipecat Framework · Python/FastAPI
- **Numbers:** **<1s** Response Latency · **4-6 min** Average Session
- **Links:** [demo](https://marcus-aurelius-bot.fly.dev) · [case study](https://www.lukepanaccio.com/projects/marcus-aurelius)
- **Proves:** real-time voice AI, latency-constrained, shipped and running
- **Best for:** applied-AI · forward-deployed
- **One-liner:** A Stoic mentor that teaches by Socratic questioning over real-time voice with a photorealistic avatar, holding sub-second response latency with explicit cognitive-load management.
- **Presentable:** yes — live demo at marcus-aurelius-bot.fly.dev; repo private

> Making ancient philosophy accessible through real-time conversational AI with a photorealistic avatar

### Modular learning path ecosystem

- **Slug:** `modular-learning-paths`
- **Title:** Modular learning path ecosystem
- **Client:** commercetools
- **Role:** Lead Instructional Designer & Learning Architect
- **Timeline:** 3 years (2022-2025, ongoing)
- **Stack:** Next.js · MDX · TypeScript · React · Moodle Integration · Learning API
- **Numbers:** **9** Learning Paths · **~60h** Total Content · **2** Personas Served
- **Links:** [demo](https://docs.commercetools.com/docs/learning) · [case study](https://www.lukepanaccio.com/projects/modular-learning-paths)
- **Proves:** architecting a content system that scales across roles over three years
- **Best for:** learning · devex
- **One-liner:** 9 connected learning paths, 40+ modules and ~60 hours of content, deliberately cross-linked so the paths teach how the platform fits together rather than sitting as nine unrelated courses.
- **Presentable:** yes — live at docs.commercetools.com/docs/learning

> A learning system that scales across roles, with the paths linked so they teach how the platform fits together

### Per-agent isolation on a deny-all datastore

- **Slug:** `multi-tenant-isolation`
- **Title:** Per-agent isolation on a deny-all datastore
- **Client:** qpIQ
- **Role:** Technical Co-Founder
- **Timeline:** 2026
- **Stack:** Firestore · Firebase Admin SDK · Next.js App Router · TypeScript · Firebase Emulator Suite · Server Actions
- **Agentic stack:** OpenSpec requirement/scenario specs · CLAUDE.md invariants as project memory · Agent-assisted security review pass · Emulator-backed isolation harness
- **Numbers:** **16** Mutating actions proven denied, writing zero bytes · **3** Auth layers — none a substitute for another · **0** Forged sessions anywhere in the test suite
- **Links:** [case study](https://www.lukepanaccio.com/projects/multi-tenant-isolation)
- **Proves:** authorisation design when the datastore enforces nothing and every decision is application code
- **Best for:** security · platform · founding
- **One-liner:** With Firestore rules denying all client access, authz lived entirely in server code, so I built a three-layer chain and an end-to-end suite that mints real session cookies rather than forging them — 16 mutating actions proven denied, writing zero bytes.
- **Presentable:** link case study only — qpIQ repo is private

> When the database enforces nothing, every authorisation decision is application code — so the surface has to be small, ordered, and provable

### AI grading & evaluation system

- **Slug:** `paper-grader`
- **Title:** AI grading & evaluation system
- **Client:** An Australian University (Internal Tool)
- **Role:** Full-stack developer
- **Timeline:** 1 month (October 2025)
- **Stack:** Python · Claude API (Sonnet 4.5) · pdfplumber · mammoth · python-docx
- **Numbers:** **125+** Papers Graded · **60-80 hrs** Time Saved · **$0.14-0.18** Cost Per Paper
- **Links:** [case study](https://www.lukepanaccio.com/projects/paper-grader)
- **Proves:** shipping a real LLM tool to a real client with privacy and honesty constraints
- **Best for:** applied-AI · forward-deployed
- **One-liner:** A CLI that grades reflective writing against a rubric for an Australian university — anonymised before it leaves the machine, and it flags any judgment it can't back up against the paper rather than asserting it. 125+ papers, 60–80 hours saved a semester, $0.14–0.18 each.
- **Presentable:** link case study only — client tool, repo private

> A tool that uses an LLM to grade student writing against a rubric, keeps student data private, and flags judgments it can't back up

### Field-deployed buyer survey pilot

- **Slug:** `qpiq-field-deployment`
- **Title:** Field-deployed buyer survey pilot
- **Client:** qpIQ
- **Role:** Technical Co-Founder
- **Timeline:** 2026
- **Stack:** Next.js App Router · TypeScript · Firestore · Firebase Auth · Vercel · Resend · Australian Privacy Principles
- **Agentic stack:** OpenSpec spec-driven change process · CLAUDE.md project memory · Path-scoped rules · Claude Code GitHub Action · Per-PR preview environments
- **Numbers:** **7** Buyer questions — no login, under 90 seconds · **3** Defects found by real field use, all fixed and spec’d · **0** Cross-campaign buyer identity keys
- **Links:** [demo](https://qpiq.app) · [case study](https://www.lukepanaccio.com/projects/qpiq-field-deployment)
- **Proves:** deploying into someone else's workflow, where adoption is the hard part
- **Best for:** forward-deployed · founding
- **One-liner:** Buyers answer 7 questions on their phone in under 90 seconds and the agent gets a ranked call list — the engineering that mattered was refusing the features that would have made the data untrustworthy and pre-registering a counterfactual so the pilot could return a real answer.
- **Presentable:** yes — live at qpiq.app; repo private

> Shipping into a real-estate agent’s Saturday — and designing the pilot so it was allowed to fail

### Distributed scraper CI orchestration

- **Slug:** `scraper-ci-orchestration`
- **Title:** Distributed scraper CI orchestration
- **Client:** storipro
- **Role:** Technical Co-Founder
- **Timeline:** 2026
- **Stack:** GitHub Actions · Git LFS · TypeScript · Node.js · SQLite
- **Agentic stack:** CLAUDE.md project memory + multi-instance worktree workflow · Git worktrees (LFS objects deduped across instances) · Subagent-per-task research strategy
- **Numbers:** **~40** Brittle scrapers orchestrated · **0** Sources that can block the rest · **~27×** Slowest source run, sped up
- **Links:** [case study](https://www.lukepanaccio.com/projects/scraper-ci-orchestration)
- **Proves:** keeping a fragile third-party-dependent pipeline reliable in CI
- **Best for:** platform · founding
- **One-liner:** ~40 brittle browser-automation jobs against sites with no API — I isolated failures so no single source can sink the run, made the Git-LFS commit loop safe while main moves underneath it, and separated infrastructure crashes from real bugs so only recoverable failures retry.
- **Presentable:** link case study only — storipro repo is private

> Keeping a fragile fleet of scrapers reliable, and committing a large versioned file safely even as main keeps changing underneath it

### The Second Brain: LLM-maintained wiki

- **Slug:** `second-brain-knowledge-base`
- **Title:** The Second Brain: LLM-maintained wiki
- **Client:** Personal project
- **Role:** Knowledge architect & curator (the LLM authors the wiki layer)
- **Timeline:** 2026 (~2 months)
- **Stack:** Markdown · Git · Obsidian · Claude Code
- **Agentic stack:** CLAUDE.md + SCHEMA.md (schema-as-harness) · Claude Code CLI: read raw → write wiki → fix cross-refs in one pass · One scheduled routine (transcript retry, since disabled)
- **Numbers:** **100** Pages compiled (0 hand-written) · **66** Sources ingested & cross-linked · **7** Domain clusters maintained
- **Links:** [case study](https://www.lukepanaccio.com/projects/second-brain-knowledge-base)
- **Proves:** having a considered position on RAG, backed by a built alternative
- **Best for:** applied-AI · devex
- **One-liner:** RAG rebuilds the answer from chunks every time you ask and nothing accumulates, so I built the opposite — a wiki an LLM maintains, schema-as-harness in a checked-in config, 100 compiled pages with none hand-written and 66 sources cross-linked.
- **Presentable:** link case study only — repo private and personal

> Write the knowledge up once and keep it current — a deliberate alternative to RAG that rebuilds the answer every time you ask

### Single-source-of-truth docs program

- **Slug:** `single-source-of-truth-docs-program`
- **Title:** Single-source-of-truth docs program
- **Client:** commercetools
- **Role:** Engineer / program contributor (5-person initiative)
- **Timeline:** 2026
- **Stack:** MDX · RAML · YAML · GitHub Actions
- **Agentic stack:** content-deduplication skill (0–4 classifier) · CLAUDE.md / AGENTS.md · Instruction files · CLI in VS Code
- **Numbers:** **~2,660** Lines removed / consolidated · **8** API domains consolidated · **1** Redundant microsite sunset
- **Links:** [demo](https://docs.commercetools.com) · [case study](https://www.lukepanaccio.com/projects/single-source-of-truth-docs-program)
- **Proves:** working inside a cross-functional programme, not just solo
- **Best for:** devex · learning · applied-AI
- **One-liner:** The same API concepts were duplicated word-for-word across three sites, competing with each other in search and degrading RAG retrieval — a 5-person programme set one canonical source per concept, and I captured the call as a reusable 0–4 classifier skill so it outlived the project.
- **Presentable:** link case study only — commercetools internal; public outcome at docs.commercetools.com

> Cutting duplicate docs across three sites that were hurting search and AI retrieval

### Spec-driven development with coding agents

- **Slug:** `spec-driven-agentic-development`
- **Title:** Spec-driven development with coding agents
- **Client:** qpIQ
- **Role:** Technical Co-Founder
- **Timeline:** 2026
- **Stack:** OpenSpec · Claude Code · GitHub Actions · Vercel preview deployments · Firebase · TypeScript
- **Agentic stack:** OpenSpec propose/apply/archive skills · Path-scoped rules (auto-loading on file match) · CLAUDE.md project memory · Claude Code GitHub Action (@claude) · Automated PR review workflow · Per-PR preview environments · Scheduled maintenance loops · Three fixed human approval gates
- **Numbers:** **24** Canonical capability specs kept as the source of truth · **13** Changes shipped spec-first and archived · **2** Silent-drop archive bugs caught before shipping
- **Links:** [case study](https://www.lukepanaccio.com/projects/spec-driven-agentic-development)
- **Proves:** designing a review process that scales when agents write more code than a human can read
- **Best for:** applied-AI · founding · platform
- **One-liner:** I made requirements the reviewable artefact rather than the diff — 24 canonical specs, 13 changes shipped spec-first, and two archive bugs caught that would have silently deleted live requirements.
- **Presentable:** link case study only — qpIQ repo is private

> Reviewing a 2,000-line agent diff is theatre. Reviewing the 60-line spec delta that produced it is real.

### Productionizing & securing a Stripe billing system

- **Slug:** `stori-stripe-billing-reliability`
- **Title:** Productionizing & securing a Stripe billing system
- **Client:** storipro (storiventures)
- **Role:** Technical Co-Founder
- **Timeline:** Mar–May 2026
- **Stack:** TypeScript · Next.js 15 · React 19 · Stripe · Firebase / Firestore · Resend · Vitest · Playwright · Vercel
- **Agentic stack:** OpenSpec change workflow · Stripe MCP (programmatic provisioning) · Custom subagents (.claude/agents) · CLAUDE.md project instructions · Git worktrees (multi-instance)
- **Numbers:** **$138 → $0** Silent double-billing — found, root-caused, recovered · **142** Billing test cases authored (Vitest + Playwright) · **0** Client-tamperable billing fields after lockdown
- **Links:** [case study](https://www.lukepanaccio.com/projects/stori-stripe-billing-reliability)
- **Proves:** taking someone else's prototype to real-money production, including the incident work
- **Best for:** platform · founding · security
- **One-liner:** A stale test-mode customer ID silently charged a card $138 with nothing recorded — I root-caused it, locked the data layer so no billing field is client-tamperable, made the webhooks self-heal, and wrote 142 tests from zero.
- **Presentable:** link case study only — storipro repo is private

> A founder's billing prototype had to start taking real money. After a stale ID silently charged a customer $138 with nothing recorded, I locked down the data layer, made the webhooks heal themselves, and wrote 142 tests from zero.

### Voice-to-Prototype agentic pipeline

- **Slug:** `voice-to-prototype-pipeline`
- **Title:** Voice-to-Prototype agentic pipeline
- **Client:** storipro
- **Role:** Technical Co-Founder
- **Timeline:** 2026
- **Stack:** GitHub Actions · Claude Code · Vercel · Next.js · TypeScript
- **Agentic stack:** Headless Claude Code in CI (constrained mode) · Model pinned, tool-allowlisted, turn-capped · Workflow-owns-git separation · Prompt-injection-as-data hygiene · Isolated spend key · Checked-in guardrail prompt
- **Numbers:** **3** Dry-run failure modes fixed · **0** Engineers needed to start · **~75 min** Live debugging arc (4 PRs)
- **Links:** [case study](https://www.lukepanaccio.com/projects/voice-to-prototype-pipeline)
- **Proves:** running autonomous coding agents inside a real repository without handing them the keys
- **Best for:** applied-AI · platform · founding
- **One-liner:** A labelled issue triggers a constrained headless Claude Code run that writes files, then deterministic CI owns every git operation — gated on real repo permission level rather than author_association, with issue text treated as data, not instructions.
- **Presentable:** link case study only — storipro repo is private

> An agentic CI pipeline where the automated workflow handles git, not the AI model, debugged from a flawed design into a clean split
