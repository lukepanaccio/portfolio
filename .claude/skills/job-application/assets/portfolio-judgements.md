# Portfolio Judgements

The judgement layer over the case studies. `index-case-studies.mjs` pulls the mechanical facts
(stack, role, timeline, numbers, links) straight from each MDX frontmatter and merges these four
fields in. **This is the hand-maintained file — edit here, then `npm run jobs:index`.**

Why these fields and not others: what a project *proves* is a decision, not a fact a script can
infer from file extensions. Deciding it once and reusing it is what keeps the story consistent
across thirty applications. Re-improvising it per job ad is how candidates end up contradicting
themselves between the letter and the interview.

Field contract, per `## <slug>` (slug = the MDX filename):

- **proves** — the capability a sceptical interviewer would accept this as evidence for. One clause.
- **best-for** — which role families to reach for it in. Keep to the vocabulary below.
- **one-liner** — the sentence to use *when linking it in a letter*. Not the tagline; the tagline
  sells the page, this sells the relevance. Must survive "tell me more about that" for 15 minutes.
- **presentable** — `yes` / `link case study only` / `no — <what needs fixing>`. Never recommend
  linking something marked `no`.

Role-family vocabulary for `best-for`: `forward-deployed` · `applied-AI` · `platform` ·
`security` · `devex` · `founding` · `learning`

---

## spec-driven-agentic-development

- proves: designing a review process that scales when agents write more code than a human can read
- best-for: applied-AI · founding · platform
- one-liner: I made requirements the reviewable artefact rather than the diff — 24 canonical specs, 13 changes shipped spec-first, and two archive bugs caught that would have silently deleted live requirements.
- presentable: link case study only — qpIQ repo is private

## multi-tenant-isolation

- proves: authorisation design when the datastore enforces nothing and every decision is application code
- best-for: security · platform · founding
- one-liner: With Firestore rules denying all client access, authz lived entirely in server code, so I built a three-layer chain and an end-to-end suite that mints real session cookies rather than forging them — 16 mutating actions proven denied, writing zero bytes.
- presentable: link case study only — qpIQ repo is private

## stori-stripe-billing-reliability

- proves: taking someone else's prototype to real-money production, including the incident work
- best-for: platform · founding · security
- one-liner: A stale test-mode customer ID silently charged a card $138 with nothing recorded — I root-caused it, locked the data layer so no billing field is client-tamperable, made the webhooks self-heal, and wrote 142 tests from zero.
- presentable: link case study only — storipro repo is private

## voice-to-prototype-pipeline

- proves: running autonomous coding agents inside a real repository without handing them the keys
- best-for: applied-AI · platform · founding
- one-liner: A labelled issue triggers a constrained headless Claude Code run that writes files, then deterministic CI owns every git operation — gated on real repo permission level rather than author_association, with issue text treated as data, not instructions.
- presentable: link case study only — storipro repo is private

## firestore-security-rules

- proves: closing a live privilege-escalation path and proving it stays closed
- best-for: security · platform
- one-liner: The shipped rule let any logged-in user grant themselves the top paid tier from the browser — I locked ~19 server-owned fields and wrote 59 tests that run against the real rules in the emulator, so the fix can't silently regress.
- presentable: link case study only — storipro repo is private

## bug-reporting-pipeline

- proves: shipping a multi-stage pipeline with distributed-systems care, to 100% of users
- best-for: platform · founding · devex
- one-liner: Five stages from in-app report to private GitHub issue to resolution email, with server-issued upload tokens, signature-verified webhooks, duplicate-event protection and a two-pass screenshot cleanup — roughly 1,900 lines of dedicated tests against it.
- presentable: link case study only — storipro repo is private

## scraper-ci-orchestration

- proves: keeping a fragile third-party-dependent pipeline reliable in CI
- best-for: platform · founding
- one-liner: ~40 brittle browser-automation jobs against sites with no API — I isolated failures so no single source can sink the run, made the Git-LFS commit loop safe while main moves underneath it, and separated infrastructure crashes from real bugs so only recoverable failures retry.
- presentable: link case study only — storipro repo is private

## geocoding-accuracy-campaign

- proves: diagnosing a metric that lies, then actually moving the number
- best-for: platform · applied-AI · founding
- one-liner: A 5.8% per-run success rate read as a broken geocoder; it was the shape of the addresses — a cleaner recovered 47% of the failing backlog and took whole-dataset coverage to 98.3%.
- presentable: link case study only — storipro repo is private

## qpiq-field-deployment

- proves: deploying into someone else's workflow, where adoption is the hard part
- best-for: forward-deployed · founding
- one-liner: Buyers answer 7 questions on their phone in under 90 seconds and the agent gets a ranked call list — the engineering that mattered was refusing the features that would have made the data untrustworthy and pre-registering a counterfactual so the pilot could return a real answer.
- presentable: yes — live at qpiq.app; repo private

## ableton-mcp-control-layer

- proves: shipping into an unfamiliar open-source codebase, with tests, upstream
- best-for: applied-AI · devex · platform
- one-liner: The upstream MCP bridge could write MIDI but never read it back, so an agent had to regenerate every clip blind — I added a read-only note reader and a main-thread-scheduled clear to close the read → modify → write loop, backed by a 13-test hermetic suite and submitted as PR #106, +612 / −0.
- presentable: yes — public repo and upstream PR, the strongest independently verifiable artefact in the portfolio

## paper-grader

- proves: shipping a real LLM tool to a real client with privacy and honesty constraints
- best-for: applied-AI · forward-deployed
- one-liner: A CLI that grades reflective writing against a rubric for an Australian university — anonymised before it leaves the machine, and it flags any judgment it can't back up against the paper rather than asserting it. 125+ papers, 60–80 hours saved a semester, $0.14–0.18 each.
- presentable: link case study only — client tool, repo private

## ai-authoring-system

- proves: eval design, specifically not letting a model grade its own work
- best-for: applied-AI · learning · devex
- one-liner: I replaced 18 tangled prompts with a coordinator agent, one skill per stage, and a separate judge and fixer — with a deterministic pass/fail gate calibrated against a 10-item gold set including two adversarial cases, giving zero false-passes at threshold.
- presentable: link case study only — commercetools internal

## content-drift-detection-system

- proves: agentic systems that maintain other artefacts, running in CI with a human in the loop
- best-for: applied-AI · devex · learning
- one-liner: 250+ API releases a year silently rot documentation, so I built a three-agent pipeline — analyzer → mapper → generator — that detects the drift and drafts the fix before a developer hits a stale page.
- presentable: link case study only — commercetools internal

## single-source-of-truth-docs-program

- proves: working inside a cross-functional programme, not just solo
- best-for: devex · learning · applied-AI
- one-liner: The same API concepts were duplicated word-for-word across three sites, competing with each other in search and degrading RAG retrieval — a 5-person programme set one canonical source per concept, and I captured the call as a reusable 0–4 classifier skill so it outlived the project.
- presentable: link case study only — commercetools internal; public outcome at docs.commercetools.com

## b2b-learning-path

- proves: owning a dense technical domain end to end, with claims checked against source
- best-for: devex · learning · forward-deployed
- one-liner: commercetools had no structured path for B2B modelling, so I owned it from SME interviews through to shipped modules — and checked every API example against the RAML source instead of writing it from memory, scoring 88/100 on the critique gate.
- presentable: yes — public preview link in the case study

## alex-chen-learner-persona

- proves: prompt engineering as a substitute for a scarce human review loop
- best-for: applied-AI · learning · devex
- one-liner: SME review was the bottleneck on documentation quality, so I built a psychologically grounded synthetic senior developer that gives the same class of feedback in under five seconds, any time.
- presentable: link case study only — commercetools internal

## modular-learning-paths

- proves: architecting a content system that scales across roles over three years
- best-for: learning · devex
- one-liner: 9 connected learning paths, 40+ modules and ~60 hours of content, deliberately cross-linked so the paths teach how the platform fits together rather than sitting as nine unrelated courses.
- presentable: yes — live at docs.commercetools.com/docs/learning

## developer-essentials-learning-path

- proves: technical curriculum for developers, in two languages, ending in a real challenge
- best-for: learning · devex
- one-liner: Takes enterprise commerce developers from environment setup to advanced API patterns in 20 hours, ending in a challenge that proves they can build in production — dual-language, TypeScript and Java.
- presentable: yes — live at docs.commercetools.com/docs/learning

## marcus-aurelius

- proves: real-time voice AI, latency-constrained, shipped and running
- best-for: applied-AI · forward-deployed
- one-liner: A Stoic mentor that teaches by Socratic questioning over real-time voice with a photorealistic avatar, holding sub-second response latency with explicit cognitive-load management.
- presentable: yes — live demo at marcus-aurelius-bot.fly.dev; repo private

## second-brain-knowledge-base

- proves: having a considered position on RAG, backed by a built alternative
- best-for: applied-AI · devex
- one-liner: RAG rebuilds the answer from chunks every time you ask and nothing accumulates, so I built the opposite — a wiki an LLM maintains, schema-as-harness in a checked-in config, 100 compiled pages with none hand-written and 66 sources cross-linked.
- presentable: link case study only — repo private and personal

## 3-steps-away

- proves: co-founding and commercialising, with stakeholder work across sectors
- best-for: founding · learning
- one-liner: I co-founded a social-justice education startup and designed the blended programme it sold — 150 students across 3 partner schools at a 97% completion rate.
- presentable: yes — case study only, company wound down
