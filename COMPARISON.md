# COMPARISON.md

## Row-by-Row Evidence

| EARS row | bolt.new | Evidence | AI Studio | Evidence |
|---|---|---|---|---|
| F2-1 | Pass | `App.tsx` lines 152 to 156 sort by count, highest first; Backend counts fall from 11 to 3 (bolt.gif); shared.test.js passes | Pass | `gapRanking.ts` sorts by `postingCount`, highest first; Frontend shows 27, 20, 18, 15 (aistudio.gif); shared.test.js passes |
| F2-2 | Pass | Each row shows "N of 11 postings" and the header shows the total (bolt.gif) | Partial | Right on default roles, but the "6 (Small Sample)" toggle showed "27 of 6 postings (450%)" (aistudio.gif) |
| F2-3 | Pass | A "First gap to close" panel names Agile (bolt.gif) | Pass | `gapRanking.ts` sets `isFirstGap` on `missing[0]`; badge on TypeScript (aistudio.gif) |
| F2-4 | Pass | `App.tsx` lines 152 to 156 break ties with `localeCompare`; seven skills tied at 11 in A to Z order (bolt.gif); shared.test.js passes | Pass | `gapRanking.ts` breaks ties with `localeCompare`; GraphQL before Jest at 15 (aistudio.gif); shared.test.js passes |
| F2-5 | Pass | Data Analyst and QA Engineer have fewer than 10 postings and show "Small sample" next to the ranking (bolt-small-sample.png); `App.tsx` line 27 sets the threshold at 10 | Pass | The 6-posting Embedded Firmware role shows "The sample is small (6 postings)" (aistudio.gif) |

## Scope Creep

| | bolt.new | AI Studio |
|---|---|---|
| Files created or changed that the feature did not need | 3 | 6 |
| Additions the spec excludes (list them) | Supabase backend and `@supabase/supabase-js` (X5). React, Vite, TypeScript, and Tailwind (X6). Skill list saved in browser storage (X2). | React, Vite, TypeScript, and Tailwind (X6). An apply recommendation with a 55% fit score and "Submit application now" (F3-2, X4). Skill list saved in browser storage (X2). `@google/genai` declared with no import in `src`. `express` and `dotenv` declared with no server file in the zip. |

Counting rule, written before I counted. A file is needed if it implements ranking, shows the ranked list, takes the role input, holds the posting data, or is the app's entry point. Lockfiles, build and lint config, TypeScript config, `.gitignore`, and `index.html` are scaffolding and not counted. Any other file is creep.

Files counted. bolt.new: `.env`, `.bolt/config.json`, and `.bolt/prompt`. AI Studio: `README.md`, `metadata.json`, `.env.example`, `ConfidenceAdvice.tsx`, `DevonSkillsManager.tsx`, and `JobPostingsExplorer.tsx`. I decided after seeing the file lists that platform and template files count, and I applied that to both builders. Without them the counts are 1 and 3. `Header.tsx` and `TopGapCallout.tsx` in the AI Studio build were judgment calls. I counted them as needed. Counting them as creep makes the AI Studio count 8, or 5 without platform files.

Extras inside needed files do not show in a file count. bolt put its skill chips, "I have this" buttons, and role dropdown inside `App.tsx`.

## Judgment Eval

Agreement rate with the second grader: 9 of 10 (90%). Details in [JUDGMENT.md](JUDGMENT.md).

## Findings

**1. Both builders invented the posting data and presented it as real.** The prompt supplied none. bolt reads its postings from a Supabase database it created (`src/lib/supabase.ts`) and describes them as "job postings we have on file." AI Studio takes its counts and company names from `src/data/rolesData.ts` and shows named companies with quoted job text under a heading that promises "real requirements from tech employers." Neither build says the data is made up.

**2. Neither builder knew what "missing" means.** F2 ranks missing skills but never says missing from what. bolt starts with no skills marked and lists all 16 Backend skills. AI Studio pre-filled a six-skill profile for Devon that the prompt never gave (`App.tsx` saves it as `devon_skills`) and ranked against it. The same prompt produced two different first screens.

**3. AI Studio broke F2-2 and reported success.** After clicking "6 (Small Sample)" the Frontend role showed "27 of 6 postings (450%)". `gapRanking.ts` takes its counts from a separate table (`ROLE_SKILL_COUNTS`) and divides them by whatever total it receives, so the counts and the total are not tied together in the code. Its build summary said the app was "built and verified to specification."

**4. Both builders added more than F2.** AI Studio added an apply recommendation, which the team spec forbids in F3-2 and X4. My prompt carried Devon's job statement but not those rows, so the gap is in my prompt as much as in the builder. bolt added a Supabase backend. The template file `.bolt/prompt` asks for "fully featured" pages worthy of production.

**5. Rows with a stated rule came through in both builds.** F2-1, F2-3, and F2-4 passed in both, and both break ties with `localeCompare`.

The shared test covers F2-1 and F2-4 only, and both builds pass all six checks, so it does not separate them. It runs the sorting logic copied from each build, not the rendered page, so it cannot see the F2-2 count bug in AI Studio. The adapters and the test were drafted with Claude (DDR-003).

## Spec Gaps

| Gap | What each builder assumed | EARS change or exclusion that closes it |
|---|---|---|
| Where the posting data comes from and whether it is real | bolt: a Supabase database it created. AI Studio: counts and company names from `rolesData.ts`. Both presented the data as real. | F1-10 already requires team-supplied postings. Add F2-6: THE SYSTEM SHALL compute each skill's count from the postings in the posting set. |
| What "missing" means | bolt: nothing held, so every skill is missing. AI Studio: a pre-filled six-skill profile. | F2-7: THE SYSTEM SHALL NOT treat a skill as held unless the student entered it. |
| Count against total | AI Studio showed a count larger than its total. bolt stayed consistent. | F2-8: THE SYSTEM SHALL NOT show a count larger than the total postings shown beside it. |
| Whether to advise the student to apply | bolt: no advice. AI Studio: "Submit application now" with a fit score. | No new row. F3-2 and X4 already exclude it, and the prompt left them out. Carry X4 into any F2 prompt. |
| Stack and backend | bolt: Supabase, React, Vite, TypeScript, Tailwind. AI Studio: React, Vite, TypeScript, Tailwind, plus unused server and AI dependencies. | No new row. X5 and X6 already exclude these, and I left them out of the prompt on purpose. A Phase 2 prompt must carry them. |

## Recommendation

### Criteria and Weights (commit before scoring)

| Criterion | Weight (1 to 5) | Why |
|---|---|---|
| Passes the F2 rows as written | 5 | The rows are the spec, so a builder that misses them costs us review time in Phase 2. |
| Fits the ADR-001 stack | 4 | ADR-001 puts data in a Worker and D1, and X5 and X6 exclude a hosted backend and a framework. |
| Stays inside the feature | 3 | Extra features need review and may break exclusions, but they can be deleted. |
| Reports its data and its own results honestly | 4 | The product's whole point is showing evidence a student can trust, and a builder that overstates its work hides defects from reviewers. |
| A teammate can review it in one sitting | 4 | Every change needs a reviewer other than its author, and review time is short. |
| Avoids live services and credentials | 4 | The repo is public, and TOOLS.md needs a row and a crossing statement for every service. |

### Scores (commit after the weights)

| Criterion | Weight | bolt.new | AI Studio |
|---|---|---|---|
| Passes the F2 rows as written | 5 | 5 | 4 |
| Fits the ADR-001 stack | 4 | 1 | 2 |
| Stays inside the feature | 3 | 4 | 2 |
| Reports its data and its own results honestly | 4 | 2 | 1 |
| A teammate can review it in one sitting | 4 | 2 | 4 |
| Avoids live services and credentials | 4 | 1 | 5 |
| **Weighted total** | | 61 | 74 |


### Decision

Use AI Studio for F2 in Phase 2, with a prompt that carries X4, X5, and X6. It scored 74 to bolt.new's 61. It leads on the stack, review, and credentials criteria, and trails on passing the rows, staying inside the feature, and honesty.

The result depends on one criterion. Without "Avoids live services and credentials," bolt.new leads 57 to 54. bolt.new created a Supabase database and shipped a .env. AI Studio made no network calls, and its ranking is one function in gapRanking.ts that can move into a Worker endpoint, which fits ADR-001.

What gets harder: AI Studio broke F2-2 and then reported the app as verified, so a reviewer has to check every claim in its output against the EARS rows. It also built three components F2 did not ask for, and we have to delete them. Neither build fits ADR-001 as delivered. Both use React, Vite, TypeScript, and Tailwind, which X6 excludes, so the ranking function gets ported to plain JavaScript in a Worker either way.

## Handoff to the Team

Pull request or issue proposing a FEATURES.md change: https://github.com/aaronsarasota04/mgt3745-team-gamma/issues/15