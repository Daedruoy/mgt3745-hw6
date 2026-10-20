// Copied from bolt.new: src/App.tsx, the rankedMissing sort (lines 148 to 157).
// Changes are recorded in docs/DDR-001.md: wrapped in a function, and
// summary.skills and haveSkills replaced with local stand-ins.
export function featureUnderTest(counts) {
  const skills = counts.map(([name, count], index) => ({
    skill_id: String(index),
    skill_name: name,
    postings_listing: count,
  }));
  const haveSkills = {};
  return skills
    .filter((s) => !haveSkills[s.skill_id])
    .sort((a, b) =>
      b.postings_listing !== a.postings_listing
        ? b.postings_listing - a.postings_listing
        : a.skill_name.localeCompare(b.skill_name)
    )
    .map((s) => s.skill_name);
}