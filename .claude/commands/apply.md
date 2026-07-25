---
description: Run the job-application workflow on a job ad (URL or pasted text)
argument-hint: <job ad URL, or paste the ad text>
---

Run the `job-application` skill on the job ad below.

Job ad: $ARGUMENTS

Work the steps in order and do not skip ahead to prose:

1. If that's a URL, fetch it. If the fetch returns a JS shell or fails, stop and ask for a paste —
   do not infer the role from the URL slug.
2. Scaffold the workspace with `npm run jobs:new -- "<Company>" "<Role>"` and save the ad verbatim
   to `00-job-ad.md`.
3. Decompose the ad and map evidence, writing `01-analysis.md`.
4. **Stop at the fit verdict.** Report coverage, name which positioning line the role wants, give an
   honest recommendation, and ask what a good outcome looks like here — before writing any CV or
   letter.
