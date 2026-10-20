# EVALS.md

## Prediction Stake

Committed before either builder was opened. Do not edit these predictions after the commit; resolve them beneath.

### Tight (a count)

bolt.new will satisfy 5 of my 5 EARS rows; AI Studio will satisfy 5 of 5. A row counts as satisfied if it passes when I test it in the running build or in the shared test.

**Resolution (YYYY-MM-DD):** <the actual counts>

### Loose (a direction with a reason)

AI Studio will create or change more files that the feature did not need than bolt.new will, because it rewrites whole projects and adds files.

**Resolution (YYYY-MM-DD):** <what happened>

### Open (a question the builds can answer)

Will either builder invent posting data for the ranking, and if so, will it label that data as sample data or present it as real postings?

**Resolution (YYYY-MM-DD):** <the answer, with evidence>

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