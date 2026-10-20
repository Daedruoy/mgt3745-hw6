# EVALS.md

## Prediction Stake

Committed before either builder was opened. Do not edit these predictions after the commit; resolve them beneath.

### Tight (a count)

bolt.new will satisfy 5 of my 5 EARS rows; AI Studio will satisfy 5 of 5. A row counts as satisfied if it passes when I test it in the running build or in the shared test.

**Resolution (2026-10-20):** bolt.new satisfied 5 of 5 rows. AI Studio satisfied 4 of 5, because F2-2 was Partial: after clicking "6 (Small Sample)" the Frontend role showed "27 of 6 postings (450%)" (aistudio.gif). My prediction held for bolt.new and was wrong for AI Studio. bolt.new's F2-5 passed on screen for Data Analyst (bolt-small-sample.png).

### Loose (a direction with a reason)

AI Studio will create or change more files that the feature did not need than bolt.new will, because it rewrites whole projects and adds files.

**Resolution (2026-10-20):** True on the count. AI Studio had 6 files the feature did not need and bolt.new had 3, counting platform and template files, or 3 and 1 without them. The reason I gave could not be tested, because both builders started from nothing and neither rewrote an existing project. bolt.new put its extras inside App.tsx, so a file count undercounts it.

### Open (a question the builds can answer)

Will either builder invent posting data for the ranking, and if so, will it label that data as sample data or present it as real postings?

**Resolution (2026-10-20):** Both invented the posting data, and neither labeled it as sample data. bolt.new reads its postings from a Supabase database it created and calls them "job postings we have on file". AI Studio takes its counts and company names from src/data/rolesData.ts, and shows named companies under "real requirements from tech employers".

## Error Log

| Error | Builder | Frequency | EARS row | Evidence |
|---|---|---|---|---|
| Posting data invented and presented as real | both | 2 | F2-1 to F2-5 (data source unstated) | bolt: `src/lib/supabase.ts` queries tables it created, shown as "job postings we have on file". AI Studio: `src/data/rolesData.ts`, named companies under "real requirements from tech employers" (aistudio.gif) |
| Skill list saved in browser storage | both | 2 | none (X2 excludes saved records) | bolt: `App.tsx` lines 31 to 59 use `localStorage`. AI Studio: `App.tsx` lines 17 and 35 save `devon_skills` |
| Count shown larger than the total | AI Studio | 1 | F2-2 | "6 (Small Sample)" toggle showed "27 of 6 postings (450%)" on at least 6 rows, plus "8 of 6 Sampled" (aistudio.gif) |
| Build summary claims a verified spec that the evidence contradicts | AI Studio | 1 | F2-2 | Summary says "built and verified to specification"; the toggle bug above contradicts it |
| Pre-filled a six-skill profile the prompt never gave | AI Studio | 1 | F2-1 | Devon starts with HTML, CSS, JavaScript, React, Git, and Python, and the ranking is built from them (aistudio.gif) |
| Told the student whether to apply | AI Studio | 1 | none (F3-2 and X4 exclude it) | "Viable Candidate", a 55% fit score, "Submit application now", and "unlocks qualification for up to 84%" (aistudio.gif) |
| Added a hosted backend the spec excludes | bolt.new | 1 | none (X5 excludes it) | `@supabase/supabase-js` in `package.json`, `src/lib/supabase.ts`, a `supabase/migrations` file, and `project/.env` |
| Declared dependencies nothing uses | AI Studio | 1 | none | `@google/genai`, `express`, and `dotenv` in `package.json`; no import in `src` and no server file in the zip |

Frequency counts the builds, out of two, where the failure appeared. Ties are ordered by how much they undermine the EARS rows.