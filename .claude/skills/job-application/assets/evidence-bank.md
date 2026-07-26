# Evidence Bank — Luke Panaccio

The highest-value input to any application. Proof stories, defensible numbers, and voice samples,
decided once and reused.

> **This file is committed to a public repo.** Comp floor, non-negotiables, honest gaps, reference
> status and the application log live in `job-applications/_private/strategy.md`, which is
> gitignored. Nothing in this file should be anything Luke wouldn't say on a stage — most of it is
> already published at lukepanaccio.com.

---

## Positioning

**What I'm targeting**

In rough order of fit:

1. **Forward-deployed / solutions engineer** at an AI or B2B SaaS company — the sharpest fit: fast
   custom builds, customer-facing, AI-native.
2. **Applied-AI / AI engineer** — agentic systems, MCP, LLM pipelines, evals.
3. **Founding / early engineer** at a startup.
4. **Developer-experience / developer-education engineering** — docs-as-code platform work,
   DevRel-adjacent.
5. **Product / full-stack engineer**, mid-level, strongest at AI or dev-tooling companies.

Level: reads **mid-level**, above entry on systems thinking, security judgment and AI-workflow
design. Role breadth — platform team, co-founder seat, client delivery, deep independent portfolio —
strengthens the case beyond a pure-solo profile.

**One-line pitch**

> Applied-AI engineer and learning-solutions architect who ships secure, agentic systems end to end
> — across a platform team, a co-founder seat, client delivery, and a deep independent portfolio.

**The unusual combination** (this is the differentiator, use it deliberately)

Three profiles in one: a real software engineer (multi-tenant authorisation, real-money billing,
tested full-stack code), a learning-solutions architect and developer-educator (instructional
design, API docs, content programmes at scale), and an applied-AI builder (MCP tools, voice AI, RAG
alternatives, agents in CI). Very few candidates can do the second and third credibly at once, and
that is exactly what developer-facing AI companies need.

---

## Proof stories

Nine stories. Each survives fifteen minutes of questioning. Pick one primary per letter — one story
told properly beats four mentioned in passing.

### Story: the $138 silent charge

- **Context:** A founder's Stripe billing prototype had to start taking real money. A stale
  test-mode customer ID silently charged a customer's card $138 with no record created anywhere in
  the system.
- **My action:** Root-caused the incident, locked the data layer so zero billing fields are
  client-tamperable, built a self-healing webhook recovery path, and wrote 142 test cases from zero
  (Vitest + Playwright).
- **Outcome:** $138 → $0 unrecorded. 142 tests where there had been none.
- **Proves:** taking someone else's prototype to production; incident response; the instinct to fix
  the class of bug rather than the instance.
- **Follow-up I'd get:** *"Why did it fail silently?"* — the write path and the charge path weren't
  the same transaction, so a successful charge against a customer ID that no longer resolved in live
  mode left nothing behind. Honest answer: the prototype had no reconciliation step at all, which is
  normal for a prototype and unacceptable the moment real cards are involved.

### Story: authorisation with nothing underneath it

- **Context:** On qpIQ, Firestore rules deny every client read and write, so the Admin SDK bypasses
  them entirely and authorisation lives 100% in application code — with live buyer PII behind it.
- **My action:** Built a three-layer auth chain (edge cookie check → session verification with a
  per-request allowlist re-check → per-tenant ownership boundary), fail-closed throughout so unset
  config denies, and an end-to-end suite that forges nothing: it mints real session cookies through
  the app's own sign-in route, then drives all 16 campaign-scoped mutating actions across the tenant
  boundary.
- **Outcome:** 16 mutating actions proven denied and writing zero bytes. 3 auth layers, none a
  substitute for another. 0 forged sessions anywhere in the suite.
- **Proves:** security judgment; that "prove it stays fixed" is a habit, not a slogan.
- **Follow-up I'd get:** *"Why not just use security rules?"* — the app needs server-side reads that
  a client token can't authorise, so once the Admin SDK is in play the rules are decoration. Better
  to be honest that authz is application code and make the surface small, ordered and testable than
  to keep rules around as a comfort blanket.

### Story: moving the review upstream of the diff

- **Context:** In 12 days one repo took 146 commits, roughly a fifth authored by a coding agent, in
  a product with live PII and authorisation entirely in application code. An agent can produce a
  plausible thousand-line PR in minutes; one person cannot review a thousand plausible lines in
  minutes, and *plausible* is the failure mode.
- **My action:** Made specs canonical and code downstream — RFC-2119 SHALL prose with WHEN/THEN
  scenarios, in-flight work existing only as delta files, three fixed human gates (backlog
  promotion, spec approval, merge), agents never pushing to `main`, and per-PR previews that refuse
  to initialise the Admin SDK if their project ID equals production's.
- **Outcome:** 24 canonical capability specs, 13 changes shipped spec-first and archived, and two
  archive bugs caught that would have silently deleted live requirements.
- **Proves:** that I design the process, not just the code; judgment about where review is real and
  where it's theatre.
- **Follow-up I'd get:** *"Doesn't this slow you down?"* — it moves the cost. Writing a 60-line spec
  delta is slower than starting to code and faster than reviewing the 2,000-line diff properly, and
  the second option is the one people skip.

### Story: never let the model grade its own work

- **Context:** The commercetools authoring system was 18 numbered prompts that conflated three
  different jobs — pipeline stages, always-on style rules, and one-off tasks — and the same model
  both wrote and scored the output.
- **My action:** Rebuilt it as a coordinator agent with one isolated skill per stage, a separate
  judge and a separate fixer, and a three-part pass/fail gate enforced by a zero-dependency
  validator, calibrated against a gold set of human-graded examples including two adversarial cases.
- **Outcome:** 0 false-passes at threshold across a 10-item gold set. 18 prompts became a structured
  set of agents and skills.
- **Proves:** eval design; understanding that a quality gate a model can flatter is not a gate.
- **Follow-up I'd get:** *"Ten items is a small gold set."* — agreed, and it's the honest number.
  It's enough to catch threshold miscalibration, which was the actual failure, and the two
  adversarial items do most of the work. Scaling it is the obvious next step.

### Story: documentation that maintains itself

- **Context:** commercetools ships 250+ API releases a year into a growing content library.
  Documentation goes stale silently, and a developer hitting a stale page is how you find out.
- **My action:** Built a three-agent pipeline on Copilot Skills — release-analyzer → content-mapper
  → change-generator — with progressive disclosure of references, portability across VS Code and
  Copilot CLI, and a human in the loop before anything ships. Feeds a RAG assistant.
- **Outcome:** 46 files, +3,688 lines. 3 chained skills. Validated against real release-note runs.
  Replaced manual content audits.
- **Proves:** agentic systems that maintain other systems; content treated as infrastructure.
- **Follow-up I'd get:** *"How do you know it's catching real drift?"* — validation schemas plus
  runs against actual release notes with known-stale targets. It's a detector with a human gate, not
  an autonomous editor, and that's deliberate: false positives cost a review, false negatives cost
  a developer.

### Story: the grader that admits what it can't prove

- **Context:** An Australian university needed reflective-writing submissions graded against a
  rubric. Faculty were spending 60–80 hours a semester on it, and student data couldn't leave in the
  clear.
- **My action:** Built a Python CLI on the Claude API with privacy-preserving anonymisation before
  anything leaves the machine, consistency controls across submissions, and — the design decision
  that matters — a mechanism that flags any judgment it cannot substantiate against the text of the
  paper rather than asserting it.
- **Outcome:** 125+ papers graded, 60–80 hours saved per semester, $0.14–0.18 per paper.
- **Proves:** shipping an LLM tool to a real client under real constraints; designing for calibrated
  uncertainty instead of confident output.
- **Follow-up I'd get:** *"Would you let it grade unsupervised?"* — no, and it isn't built to.
  It produces a defensible first pass with its uncertain judgments marked, which is what the faculty
  member actually needed.

### Story: closing the loop in someone else's codebase

- **Context:** AbletonMCP, an open-source MCP bridge, could author MIDI clips but never read them
  back. An agent had to regenerate every clip from memory, blind to any manual edit.
- **My action:** Worked out the Live Object Model and Remote Script threading constraints in an
  unfamiliar codebase, added a read-only note reader and a main-thread-scheduled clear — the
  mutating command has to be main-thread-registered or it's a race — and backed both with a 13-test
  hermetic pytest suite: socket mocked, no DAW, no network.
- **Outcome:** PR #106 upstream, +612 / −0, purely additive. 13/13 tests. 5/5 integration steps on
  Live 12.4.2.
- **Proves:** working inside code I didn't write; thread-safety reasoning; disciplined small-and-
  finished scoping. The most independently verifiable artefact in the portfolio.
- **Follow-up I'd get:** *"How much of this was the framework?"* — the framework is Siddharth
  Ahuja's, MIT-licensed, and I say so unprompted. Mine is the two tools, the threading fix and the
  suite.

### Story: designing a pilot that was allowed to fail

- **Context:** qpIQ had to work inside a real estate agent's Saturday. Every incumbent attempt fails
  the same way — it asks the agent to type their impression of each buyer, which is gut feel
  relabelled, and nobody does it at 4pm on a Saturday.
- **My action:** Made the buyer the data source: 7 questions on their phone, no login, under 90
  seconds. Then refused the features that would have made the data untrustworthy — no global buyer
  identity across properties, invites sent from the agent's own phone rather than a shortcode, zero
  third-party requests on public pages, compute pinned to Sydney. Pre-registered a counterfactual so
  the pilot could return a real negative.
- **Outcome:** 0 cross-campaign identity keys. 3 defects found by real field use, all fixed and
  spec'd. A pilot with a falsifiable result.
- **Proves:** forward-deployed instinct — that adoption, not the build, is the hard part; and the
  willingness to refuse the feature that makes the dataset valuable when it breaks the promise to
  the user.
- **Follow-up I'd get:** *"You gave up the flywheel."* — yes, deliberately. Correlating a buyer
  across properties engages the trading-in-personal-information carve-out in Australian privacy law,
  and it breaks what the survey promises someone disclosing to the counterparty's agent. Break that
  once and the model is dead.

### Story: 0 → 9 learning paths

- **Context:** commercetools had no structured enablement. Developers, architects and business
  administrators all needed different routes into a composable-commerce platform.
- **My action:** Architected the whole system: 9 connected learning paths, 40+ modules, 600+ content
  pages, 31+ assessments, cross-linked so the paths teach how the platform fits together rather than
  sitting as nine unrelated courses. Owned the B2B path end to end from SME interviews to shipped
  modules, checking every API example against the RAML source.
- **Outcome:** ~60 hours of curriculum serving thousands of developers globally. Module-2 critique
  score 88/100. Plus 60% efficiency gains from the automation layer, reclaiming 400+ hours annually.
- **Proves:** architecting a content system that scales across roles and survives three years;
  owning a dense technical domain.
- **Follow-up I'd get:** *"How do you know it worked?"* — adoption and support-deflection
  frameworks, which I established. Honest caveat: those are programme-level metrics, not a
  controlled study, and I'd present them that way.

---

## Numbers I can defend

Every figure here appears in a published case study. Estimates are marked as estimates — being
caught inflating is worse than not having the number.

| Metric | Value | Context | How I know |
|---|---|---|---|
| Efficiency gain from AI automation | 60% | commercetools content pipeline | Team output measurement; ~400+ hrs/yr reclaimed |
| Hours reclaimed annually | 400+ | commercetools | Derived from the 60% figure — present as an estimate |
| Learning paths built | 9 (from 0) | commercetools, 2022–2025 | Shipped and live at docs.commercetools.com |
| Modules / pages / assessments | 40+ / 600+ / 31+ | commercetools | Repo counts |
| Curriculum hours | ~60h | commercetools | Published |
| Module-2 critique score | 88/100 | B2B path | Critique gate output |
| API releases handled per year | 250+ | Content drift system | commercetools release cadence |
| Drift-system size | 46 files, +3,688 | Content drift system | Git diff |
| Gold-set false-passes at threshold | 0 of 10 (2 adversarial) | Authoring system evals | Calibration run |
| Prompts consolidated | 18 → agents + skills | Authoring system | Before/after |
| Duplicated lines removed | ~2,660 across 8 API domains | SSOT programme (5-person) | Git diff; 1 microsite sunset |
| Papers graded | 125+ | Paper Grader, university client | Run logs |
| Time saved per semester | 60–80 hrs | Paper Grader | Faculty estimate — present as an estimate |
| Cost per paper | $0.14–0.18 | Paper Grader | API billing |
| Billing tests authored from zero | 142 | storipro Stripe | Vitest + Playwright suites |
| Silent double-billing recovered | $138 → $0 | storipro Stripe | Incident root-cause |
| Client-tamperable billing fields after lockdown | 0 | storipro | Rules + tests |
| Firestore rules tests | 59 (61 assertions) | storipro | Emulator suite vs shipped rules |
| Server fields locked | ~19 | storipro | Rules diff |
| Privilege-escalation paths left open | 0 | storipro | Emulator suite |
| Mutating actions proven denied | 16, writing 0 bytes | qpIQ isolation suite | E2E suite, real session cookies |
| Auth layers | 3 | qpIQ | Architecture |
| Canonical capability specs | 24 | qpIQ spec-driven system | OpenSpec repo |
| Changes shipped spec-first | 13 | qpIQ | Archived changes |
| Silent-drop archive bugs caught | 2 | qpIQ | Rule file "known gaps" |
| Bug-pipeline test lines (~1.3:1) | ~1,900 | storipro | Repo count |
| Bug pipeline rollout | 100% of users | storipro | GA |
| Scrapers orchestrated | ~40 | storipro CI | Workflow count |
| Slowest source speed-up | ~27× | storipro CI | Before/after run times |
| Geocoding backlog recovered | 5.8% → 47% (1,625 rows) | storipro | Run comparison |
| Whole-dataset geocoding coverage | 96.7% → 98.3% (~110K records) | storipro | DB query |
| AbletonMCP contribution | +612 / −0, 13/13 tests, PR #106 | Open source | Public PR |
| Voice AI response latency | <1s | Marcus Aurelius | Measured; live demo |
| Second Brain pages / sources / clusters | 100 (0 hand-written) / 66 / 7 | Personal | Repo counts |
| qpIQ codebase | 146 commits, ~18k LOC TS, ~22 test files | Solo-built | Git history |
| commercetools 12-month git history | 82 commits, ~+36,100 / −16,000 | Verified from git | Git log |
| Buyer survey completion time | 7 questions, <90s, no login | qpIQ field pilot | Field use |
| 3 Steps Away | 150 students, 3 schools, 97% completion | 2019–2022 | Programme records |
| Educators managed | 30+ | Emmaus College | Role scope |
| Dialogue sessions facilitated | 200+ | Tony Blair Institute | Programme records |

---

## Portfolio inventory

Maintained as a generated file: **`portfolio-index.md`** in this folder — 21 case studies with what
each proves, which role families to use it for, the linking one-liner, and whether the artefact is
actually presentable.

Regenerate with `npm run jobs:index` after editing `portfolio-judgements.md` or adding a case study.

**Independently verifiable right now** (a stranger can go and look):

| Artefact | Link |
|---|---|
| AbletonMCP PR #106 — public repo, upstream PR, 13 tests | https://github.com/lukepanaccio/ableton-mcp |
| qpIQ — live product | https://qpiq.app |
| Marcus Aurelius — live voice demo | https://marcus-aurelius-bot.fly.dev |
| commercetools learning platform — shipped work | https://docs.commercetools.com/docs/learning |
| This portfolio — 21 case studies | https://www.lukepanaccio.com |

**Not linkable** — qpIQ, storipro, Marcus and Second Brain repos are private; commercetools work is
internal. For those, link the case study, which is written to carry the architecture and the
reasoning without the source. If a role probes deeply, the `marcus` and `brain` repos are the two
worth making reviewable.

---

## Voice samples

Short excerpts from Luke's **own** writing — the 3 Steps Away platform copy, written for an audience
of educated teenagers. **This is the voice source, not the portfolio case studies** — those were
drafted by Claude and must not be used to calibrate his voice. The register here is informal and
applications aren't; `references/voice.md` explains which parts carry over and which to dial up. The
full corpus is in `references/Copywriting Samples.md`.

**Plain opener, then a personal stake:**

> Big things are always made up of many small things. Whenever I'm feeling overwhelmed by a
> particular project, I settle my anxiety down by breaking down the project into smaller chunks and
> turning them into a list of some sort.

**The italic pivot — the turn of the argument, on its own short line:**

> It can feel like none of us have any power to change even a small bit of it; it's all just so big.
> *But we can affect change.*

**Defining by grounding, not abstracting:**

> Justice is one of those words that is super tricky to have a simple and clear cut definition […]
> *Justice is fairness.* It's doing what is right.

**Personal reaction as the way in:**

> The war in Ukraine has been dominating headlines the past week. Personally, it has felt like I'm
> watching a history textbook play out in real time.

**Conviction, stated plainly:**

> At 3 Steps Away, we don't wonder; we know it is worthwhile.

---

## Where the rest lives

- **Comp floor, non-negotiables, honest gaps and bridges, reference status, application log** →
  `job-applications/_private/strategy.md` (gitignored)
- **Full CV inventory** → `master-cv.md` in this folder
- **Per-project evidence** → `portfolio-index.md` in this folder
