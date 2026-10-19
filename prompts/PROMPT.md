# PROMPT.md

The exact text both builders received, unchanged between them.

---

Build a single-page web app that implements this feature exactly as specified.

## Feature: Ranked Gaps

- F2-1. THE SYSTEM SHALL order the missing skills by the number of postings for the role that list each one, highest first.
- F2-2. THE SYSTEM SHALL show the posting count beside each skill and the total postings for the role.
- F2-3. WHEN results are shown, THE SYSTEM SHALL mark the top-ranked missing skill as the first gap to close.
- F2-4. IF two skills have the same count, THEN THE SYSTEM SHALL order them alphabetically, so the order does not change between page loads.
- F2-5. IF the role has fewer than 10 postings, THEN THE SYSTEM SHALL say the sample is small next to the ranking.

## User

Devon is a student applying for entry-level tech roles.

Job statement: When I search for a tech position, I want to know whether I should apply even if I do not meet every listed requirement, so I can improve my chances without assuming I have to be the employer's ideal candidate.

Success looks like: He applies with confidence about fit.

## Style

Tokens:

- color-primary: #0D0D0D
- color-accent: #A8842C
- color-background: #F7F1DE
- color-text: #0D0D0D
- font-body: Arial
- font-heading: Arial
- font-size-min: 14px
- space-unit: 8px
- radius: 4px

Rules:

- Use gold only for buttons, headings, and section dividers, never for body text, because gold fails contrast against a light background at small sizes.
- Use a cream background rather than pure white, because white next to gold reads flat.
- Use Arial for everything, one family, so the page renders reliably on any device.
- Make every gap in the layout a multiple of 8px.
- Never go below 14px text, because people check the page quickly on a phone.
- Never show a modal for something the user did not ask for.
- Make every interactive element at least a comfortable thumb target on a phone screen.

---

## Retries

None.