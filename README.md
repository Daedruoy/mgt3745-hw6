# HW6: Two Builders, One Specification

## Feature

**Team repository:** https://github.com/aaronsarasota04/mgt3745-team-gamma
**Spec provenance:** copied from commit `5abbc1c5509800ce9898e9935eafdf94cf694cc0` on 2026-10-19

**Feature:** F2. Ranked Gaps

- F2-1. THE SYSTEM SHALL order the missing skills by the number of postings for the role that list each one, highest first.
- F2-2. THE SYSTEM SHALL show the posting count beside each skill and the total postings for the role.
- F2-3. WHEN results are shown, THE SYSTEM SHALL mark the top-ranked missing skill as the first gap to close.
- F2-4. IF two skills have the same count, THEN THE SYSTEM SHALL order them alphabetically, so the order does not change between page loads.
- F2-5. IF the role has fewer than 10 postings, THEN THE SYSTEM SHALL say the sample is small next to the ranking.

## See It Work

| bolt.new | AI Studio |
|---|---|
| ![bolt build](docs/img/bolt.png) | ![AI Studio build](docs/img/aistudio.png) |

<Replace the two images above with your own screenshots, or one side-by-side GIF.>

## Status

<One or two sentences: how many EARS rows each builder satisfied, and your recommendation in one line.>

## How to Run the Evals

```bash
npm test
```

<Say what the test checks and what output to expect.>

## Links

- [EVALS.md](EVALS.md): Prediction Stake and error log
- [COMPARISON.md](COMPARISON.md): evidence, spec gaps, and recommendation
- [JUDGMENT.md](JUDGMENT.md): judgment eval and agreement rate
- [prompts/PROMPT.md](prompts/PROMPT.md): the exact input both builders received
- [builds/](builds/): bolt.zip and aistudio.zip
- [docs/DDR-001.md](docs/DDR-001.md) (bolt.new), [docs/DDR-002.md](docs/DDR-002.md) (AI Studio)
- Team pull request or issue: <URL>
- Deployed Worker (only if you completed the proxy step): <URL>

## Hours

<Total hours spent, with a one-line breakdown.>

## AI Use

<Every tool that wrote more than a line or two, each with a link to its DDR.>