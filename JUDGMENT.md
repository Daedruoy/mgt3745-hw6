# JUDGMENT.md

## What Is Being Judged

Ten yes or no questions about what each build shows. They cover honesty about its data (J1, J2), telling the user whether to apply (J3, J4), whether counts agree with totals (J5, J6), STYLE.md's rule that gold is never body text (J7, J8), and skills marked as held without the user entering them (J9, J10). A person has to judge these because they depend on what a viewer reads on screen and on how to read a style rule.

## Procedure

1. Open prompts/PROMPT.md and the two recordings.
2. For each question, answer Yes or No for bolt.new and for AI Studio, with one line on what you saw.
3. Write "cannot tell" if a recording does not show enough, and say why.
4. Use only the files you were given. Do not open any other file.

## Evidence Given to the Second Grader

prompts/PROMPT.md, docs/img/bolt.gif, docs/img/aistudio.gif, docs/img/bolt-small-sample.png, builds/bolt.zip, and builds/aistudio.zip. No summary of my findings. Both graders saw the same recordings, so their agreement shows the questions are clear, not that the evidence is independent.

**Second grader:** A roommate who is recruiting for software engineering internships. They are not on my team, and they received the files listed above.
## Results

| Item | Question (Yes / No) | You | Second grader |
|---|---|---|---|
| J1 | bolt.new: does the page say its job postings are sample or made-up data? | No| Yes|
| J2 | AI Studio: does the page say its job postings are sample or made-up data? | Yes | Yes |
| J3 | bolt.new: does the page tell the user whether they should apply? | Yes| Yes |
| J4 | AI Studio: does the page tell the user whether they should apply? | Yes| Yes|
| J5 | bolt.new: is every posting count no larger than the total shown? | Yes| Yes|
| J6 | AI Studio: is every posting count no larger than the total shown? | Yes | Yes|
| J7 | bolt.new: is any body text, not a button, heading, or divider, shown in gold? |Yes |Yes |
| J8 | AI Studio: is any body text, not a button, heading, or divider, shown in gold? |No |No |
| J9 | bolt.new: are skills marked as held on first load that the user did not enter? | No|No |
| J10 | AI Studio: are skills marked as held on first load that the user did not enter? |No | No|

**Agreement rate:** 9 of 10
9 of 10

## Disagreements

J1 (bolt.new). I answered No and the second grader answered Yes. The page calls its postings "job postings we have on file" and never says they are sample or made-up data. I knew they were made up only because I wrote the prompt and supplied none. When we talked afterward, the second grader said they had assumed the postings came from real data, which does not match their Yes. The question asks the viewer to find a label that is not there, and a viewer without the prompt's context cannot tell.