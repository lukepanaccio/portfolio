# Project Intake Framework

A reusable kit for turning a source repo into a portfolio-ready case study **efficiently and
without inventing anything**. Copy this file into any repo you want written up, then either fill
Part 1 by hand or paste Part 2 into Claude Code (run inside that repo) to auto-fill it from evidence.

The template mirrors the portfolio's per-piece standard (Problem → Architecture & why → Evals →
Outcome) and the `ProjectLayout` frontmatter, so a completed brief drops straight into a case study:
**brief in → calibrated page out.**

**Voice rules the page must hit** (so collect the raw material for them):
- Lead with the *decision*, not the demo. The judgment is the product.
- Every architecture decision names the **alternative rejected** and why.
- Show **how it was validated** (tests, quality gates, eval harness, failure handling).
- End on a **real number**.
- Vocabulary: production · ship · architecture · agentic · evals · pipeline · RAG · MCP · latency ·
  cost · accuracy · single source of truth. Say **users / customers / developers**, never "learners."
- Claim nothing you can't defend in an interview. Receipts carry the positioning.

---

## Part 1 — The fill-in brief (one per project)

```markdown
# Case-study intake: <project name>
slug: <kebab-case>                                   # → src/pages/projects/<slug>.mdx
categories: [ai-systems | engineering | learning]    # 1–2
client: <storipro | commercetools | personal | …>
role: <e.g. Engineer & Equity Partner>
timeline: <e.g. Q1 2026>
stack: [<langs, frameworks, services>]
agentic_stack: [<Claude Code primitives actually used: subagents, dynamic workflows, routines,
                 loops, evals, plan mode, agentic loops, worktrees, headless/CLI, MCP-building,
                 skills, CLAUDE.md, CLI-in-VS-Code>]
links: { demo: <url|private>, repo: <url|private> }

## Confidentiality
nameable: <yes/no per company>
must_soften: [<exact figures, security-rule source, internal PR #s, customer data>]

## 1. Problem / stakes (2 lines)
<the real business/technical problem; what was at risk or costly>

## 2. Architecture & why  (the judgment signal — REQUIRED)
- Decision: <what was built>  | Alternative rejected: <…> | Why: <…>
- Decision: …                 | Alternative rejected: …   | Why: …
  (2–4 decisions. Each MUST name the path not taken.)

## 3. Evals / validation
<how you knew it worked: tests, quality gates, eval framework, failure handling,
 edge cases caught — with counts/names, e.g. "46 emulator allow/deny cases">

## 4. Outcome (quantified — REQUIRED)
<before → after numbers: cost, hours, accuracy, scale, throughput, coverage>

## Hero metrics (exactly 3, for the card + metrics block)
- { label: <…>, value: <…> }
- { label: <…>, value: <…> }
- { label: <…>, value: <…> }

## Diagram
needed: <yes/no> | type: <flow|architecture|layers> | nodes/flow: <sketch or path to existing diagram>

## Tags (free tech tags for the card): [<…>]

## Evidence pointers (so claims are verifiable)
- <file paths / PRs / specs / RETROSPECTIVE / ADR / commit ranges / test files>

## Ownership & caveats (honesty guardrail)
<what you personally authored vs others; anything to frame carefully>
```

---

## Part 2 — Auto-fill prompt (paste into Claude Code, run in the source repo)

> Prepare a portfolio case-study intake brief for THIS repository, filling the template in
> `case-study-intake.md` (Part 1). Ground every claim in evidence: scan `git log` for the relevant
> work, read READMEs, any OpenSpec/specs, RETROSPECTIVE/ADR/design docs, the key source files +
> tests, CI workflows, `.claude/` (agents, skills, commands, settings, CLAUDE.md), and PR
> descriptions via `gh pr view`. Rules:
> 1. Every factual claim cites a file path, PR, or commit.
> 2. Use `git blame`/authorship to distinguish what *I* wrote from others' work, and flag mixed
>    ownership honestly.
> 3. For each architecture decision, state the alternative rejected and why.
> 4. Extract real outcome numbers — if a number isn't in the repo, write `[TODO: confirm]`, never invent.
> 5. List anything sensitive (customer data, security-rule source, exact billing figures, internal
>    PR numbers) under Confidentiality so it can be softened.
> 6. Populate `agentic_stack` from evidence — which Claude Code primitives were actually used
>    (subagents, dynamic workflows, routines, loops, evals, plan mode, worktrees, headless/CLI,
>    MCP-building, skills, CLAUDE.md, CLI-in-VS-Code), citing where.
>
> Output only the filled template as markdown.

---

## How it feeds the portfolio

`categories` → the filterable grid (`ai-systems` · `engineering` · `learning`).
`stack` → `tools[]`; `agentic_stack` → the new `agenticStack` "Agentic toolchain" sidebar block.
Sections 1–4 → the page body. `Hero metrics` → `metrics[]` + the card. `Diagram` → a `MermaidDiagram`.
`Confidentiality` → what gets softened before publishing. `Ownership & caveats` → honest framing.
