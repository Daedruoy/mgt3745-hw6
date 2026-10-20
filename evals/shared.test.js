// Same tests, run against both builds, so they face an identical check.
// Rows covered: F2-1 (order by posting count) and F2-4 (alphabetical order for ties).
import { test } from "node:test";
import assert from "node:assert/strict";
import * as bolt from "./impl/bolt.js";
import * as aistudio from "./impl/aistudio.js";

const builds = { bolt, aistudio };

// Each input is a list of [skill name, number of postings that list it].
const mixed = [["Docker", 3], ["Agile", 11], ["SQL", 7], ["Git", 5]];
const tied = [["Zeta", 5], ["Alpha", 5], ["Mid", 5]];
const tiedAcrossCounts = [
  ["Git", 10],
  ["Agile", 11],
  ["SQL", 11],
  ["Node.js", 10],
  ["REST APIs", 11],
];

for (const [name, impl] of Object.entries(builds)) {
  test(`${name}: F2-1 orders skills by posting count, highest first`, () => {
    assert.deepEqual(impl.featureUnderTest(mixed), ["Agile", "SQL", "Git", "Docker"]);
  });

  test(`${name}: F2-4 orders equal counts alphabetically`, () => {
    assert.deepEqual(impl.featureUnderTest(tied), ["Alpha", "Mid", "Zeta"]);
  });

  test(`${name}: F2-4 gives the same order whatever order the input arrives in`, () => {
    const expected = ["Agile", "REST APIs", "SQL", "Git", "Node.js"];
    assert.deepEqual(impl.featureUnderTest(tiedAcrossCounts), expected);
    assert.deepEqual(impl.featureUnderTest([...tiedAcrossCounts].reverse()), expected);
  });
}