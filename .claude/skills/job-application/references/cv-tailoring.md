# CV Tailoring

## Principle

Tailoring is reweighting, not rewriting. The same career, re-pointed. Wholesale rewrites per application are unsustainable across thirty applications and produce inconsistencies that surface in interviews.

Maintain one master CV containing everything. Each application is a **subtraction and reordering** of the master, plus targeted rewording of the top bullets.

## The bullet formula

Lead with the outcome. Follow with the method. Cut the rest.

```
[Outcome, quantified if possible] by [method], [scale or context if it adds weight]
```

**Weak:** Responsible for designing and delivering learning content for enterprise customers.
**Strong:** Cut content turnaround from 3 weeks to 4 days by building an agentic authoring pipeline, across a 40-module enterprise curriculum.

**Weak:** Worked on evaluation processes for AI-generated material.
**Strong:** Raised first-pass acceptance of generated drafts from 45% to 80% by designing an LLM-as-judge rubric evaluated against 200 human-scored samples.

If there's genuinely no number, use a concrete artefact or scope marker instead: the thing that exists now that didn't before, the number of people or systems affected, the decision it changed. "Improved quality" with no anchor is filler.

## Ordering rules

- Top three bullets under the most recent role should hit the top three must-haves from the job ad. If they don't, reorder.
- Reverse-chronological unless there's a strong reason otherwise.
- Roles older than ~10 years compress to one line each, or a single "Earlier career" block, unless directly relevant to this application.
- The most relevant role goes first even if it's not the most recent — but only if the CV format makes the timeline still legible.

## ATS mechanics

Applicant tracking systems parse text and match against the requisition. What matters:

- **Use their exact terminology where it's truthful.** If the ad says "learning experience design" and the CV says "instructional design," add the ad's phrasing somewhere it belongs honestly. Don't substitute — augment.
- **Spell out and abbreviate on first use:** "large language model (LLM)". Systems match on literal strings.
- **Single column, standard headings** (Experience, Education, Skills). Multi-column layouts, text boxes, and header/footer content parse unreliably.
- **No tables for content.** Some parsers flatten them into unreadable order.
- **No images, icons, or graphics** carrying information. A logo is fine; a skills chart is a black hole.
- **Check the rendered PDF, not just the markdown.** ASCII-clean source is necessary and not
  sufficient: the display font's own ligatures get baked into the PDF's text layer, so "certification"
  can extract as "certiﬁcation" (U+FB01) and miss the requisition's keyword. `render-doc.mjs` now
  disables ligatures at render time for exactly this reason. If you change the fonts, extract the text
  from the finished PDF and confirm it is still ASCII before trusting it.
- **ASCII characters only.** Strict parsers (Workday especially) strip, question-mark, or skip lines containing typographic glyphs — and a skipped skills line is a lost keyword set. Separate skills and tools with **commas, not middots (`·`)**; write ranges and diffs with hyphens (`0 to 9`, `60-80 hours`, not `0→9`, `60–80`); avoid arrows (`→`), math signs (`×`, `−`, `≥`) and smart quotes. `render-doc.mjs` normalises these to ASCII automatically and reports what it changed, but write ASCII in `02-cv.md` so the source is clean and you can see exactly what ships.
- **PDF unless the portal specifies .docx.** Generate the PDF from text, not from a design tool that outlines fonts.
- **Skills section is real estate, not decoration.** List the tools and methods the ad names, if true. Skip proficiency bars — they parse as nothing and mean nothing.

Keyword stuffing is transparent to any human reader and increasingly filtered. The goal is to not get screened out by string matching, not to game a ranking.

## Length

- Under 10 years experience: one page
- Over 10 years, or a technical/portfolio role: two pages
- Never three, outside academia

If it's running long, the cut is almost always in older roles and in bullets that describe duties rather than outcomes.

## Per-application checklist

Before sending, verify:

- [ ] Top three bullets of the most recent role map to the ad's top three must-haves
- [ ] The ad's core terminology appears at least once, truthfully
- [ ] Nothing on the page is irrelevant to this specific role
- [ ] Every claim can be defended for five minutes in an interview
- [ ] Company name and role title are correct throughout (the single most common fatal error in a tailored application)
- [ ] Filename follows `Lastname-Firstname-CV-Company.pdf`
- [ ] Portfolio links resolve and the linked repos are presentable
