# Cover Letters

## The premise

A hiring manager reads the letter for about twenty seconds before deciding whether to read the CV properly. The letter's only job is to make the CV worth reading. It is not a summary of the CV, and it is not a personality showcase.

Target: 250–350 words. Four paragraphs. Anything longer is competing with the CV for attention and losing.

## Structure

**Paragraph 1 — the hook (2–3 sentences).**
Open with the specific thing you can do about the specific problem the role exists to solve. Not who you are. Not that you're excited. The claim goes first and it must be concrete enough that a competitor couldn't copy-paste it.

Weak: "I am writing to express my strong interest in the Senior Instructional Designer position."
Strong: "You're hiring someone to make learning content keep pace with a product that ships weekly. I've spent two years solving exactly that at a B2B platform company — the authoring pipeline I built cut turnaround from three weeks to four days."

**Paragraph 2 — the primary evidence (4–5 sentences).**
Take the single most important requirement and prove it with one story. Situation, what you did, what changed. Numbers if you have them, concrete outcomes if you don't. One story told properly beats four mentioned in passing.

**Paragraph 3 — the second axis (3–4 sentences).**
The differentiator. Usually this is the unusual combination in the background — the thing that makes the candidate not interchangeable with the other applicants. Frame it as an advantage for *this* role, not as biography. If there's a gap worth pre-empting, this is where it goes, addressed in one sentence and immediately bridged, never apologised for.

**Paragraph 4 — the close (2 sentences).**
What you'd want to talk about with them. Naming a specific thing you'd dig into on day one signals you've thought about the job rather than the offer. Then a plain sign-off. No "I look forward to hearing from you at your earliest convenience."

## Anti-patterns

These are the failure modes that make a letter read as generated or generic. Check the draft against every one:

- **The interest opener.** "I am writing to express my interest in..." Everyone who applies is interested. It's zero information in the highest-value sentence of the document.
- **JD echo.** Restating their requirements back at them as your qualities. "As someone who is highly collaborative and detail-oriented..." — they wrote those words; hearing them repeated proves nothing.
- **Adjective stacking.** Passionate, dynamic, results-driven, innovative. Adjectives are the candidate's opinion of themselves. Replace every one with the evidence that would have justified it, or cut it.
- **The CV in prose.** If a paragraph could be reconstructed by reading the CV, delete it.
- **Flattery of the company.** "I have long admired your commitment to excellence." Nobody is moved by this and it burns words. One specific, accurate observation about their product or problem is worth ten sentences of praise.
- **Apologising for gaps.** "Although I lack direct experience in X..." Bridge instead: "X is adjacent to Y, which I've done at scale — here's the transfer."
- **Overclaiming.** Anything in the letter is fair game in the interview. Never write a claim the user can't defend for five minutes under questioning.
- **Em-dash-and-triad rhythm.** Long sentences that stack three parallel clauses, chained with dashes, in a rhythm that reads as machine-smooth. Vary sentence length aggressively. Let some sentences be short.

## AI-detection — the gate you can actually lose on

Most employers now run cover letters past an AI-slop detector (Originality.ai, GPTZero, Copyleaks and similar), and a 2026 TopResume survey found ~67% of hiring managers believe they can spot an AI letter and ~54% view it negatively. These tools are triage flags, not verdicts — but a flag gets the letter deprioritised or skimmed, and that's a rejection you never see. The important distinction in the current market: **AI-as-editor is accepted** (cleaning up phrasing of real accomplishments, like using a resume coach); **AI-as-ghostwriter is penalised** (generic prose with no specific, defensible content). This whole workflow is built to stay on the right side of that line, so the letter must read as Luke-with-an-editor, never as a generated draft. Concretely:

- **Kill the em-dash reflex.** Heavy em-dash use is the single most-cited AI tell. Luke's real writing uses none (see `voice.md`); use his semicolons and full stops. The renderer converts any stray dash to a hyphen, but the prose should not lean on them in the first place.
- **Specificity is the strongest signal of a human.** A real number, a named system, a decision only Luke could describe defeats a detector far more reliably than any phrasing trick, because generated prose is generic by nature.
- **Vary sentence length and opening.** Uniform medium-length sentences all opening with the subject read as machine output. His accreting, semicolon-joined rhythm with the occasional four-word line is the antidote.
- **No boilerplate enthusiasm, no tricolons, no "moreover/furthermore".** These are register markers detectors and humans both key on.
- **Do not run the final letter through an AI paraphraser to "beat" a detector.** It strips the voice and the specificity, which is exactly backwards. Fix the prose, don't launder it.

## Voice

The letter must sound like the user. Draw on:
- Their evidence bank's own phrasing
- Any prior writing available — blog posts, README files, past letters, Slack messages if offered
- How they talk in the conversation itself

Concretely: match their sentence length distribution, their level of formality, whether they use contractions, and whether they hedge or assert. If no voice sample is available, ask for one. A letter in a plausible-but-wrong voice fails at the interview stage when the person doesn't match the page.

## Two variants, two bets

Always produce two drafts that make **different strategic wagers**, and label the wager:

- "Bets on the depth of the systems-building evidence — best if the hiring manager is technical."
- "Bets on the career-transition story as the differentiator — best if they're screening for range."

Two versions of the same argument in different tones is not a choice; it's a formatting question. Make them choose a strategy.

## Format notes

- Address a named person if findable; "Dear Hiring Team" if not. Never "To Whom It May Concern."
- No headers, no bullet points, unless the application portal is clearly parsing plain text.
- Match file naming to the CV (`Lastname-Firstname-CoverLetter-Company.pdf`).
- **Open the sendable letter with the same letterhead as the CV** - an `# Luke Panaccio` heading and
  a short contact list - then the date, the `Re:` line and the salutation. `render-doc.mjs` styles
  that block identically in both documents, so the CV and the letter arrive looking like one set
  rather than two unrelated files. The renderer also detects `cover-letter` in the filename and
  switches to letter geometry (wider side margins, slightly larger and more open type), because
  prose at a CV's measure is tiring to read.
- If there's a portal text box rather than an upload, tighten to 200 words — nobody scrolls a text box.
