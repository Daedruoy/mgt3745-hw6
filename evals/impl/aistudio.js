// Copied from AI Studio: src/utils/gapRanking.ts, computeGapAnalysis and its two helpers.
// Changes are recorded in docs/DDR-002.md: TypeScript types and the two imports removed,
// doc comments dropped, ROLE_SKILL_COUNTS stubbed as an empty object, and the
// featureUnderTest wrapper added.
const ROLE_SKILL_COUNTS = {};

function normalizeSkill(skill) {
  return skill.trim().toLowerCase();
}

function userHasSkill(userSkills, skillName) {
  const normalizedTarget = normalizeSkill(skillName);
  return userSkills.some((s) => normalizeSkill(s) === normalizedTarget);
}

function computeGapAnalysis(role, userSkills, customSkillCounts, customTotalPostings) {
  const totalPostings = customTotalPostings ?? role.totalPostings;
  const isSmallSample = totalPostings < 10;

  const rawCounts = customSkillCounts ?? ROLE_SKILL_COUNTS[role.id] ?? {};

  const allDemands = Object.entries(rawCounts).map(([name, count]) => {
    const isAcquired = userHasSkill(userSkills, name);
    const percentage = totalPostings > 0 ? Math.round((count / totalPostings) * 100) : 0;

    const matchedPostings = role.postings
      .filter((p) => p.requiredSkills.some((req) => normalizeSkill(req) === normalizeSkill(name)))
      .map((p) => `${p.company} (${p.title})`);

    return {
      name,
      postingCount: count,
      totalPostings,
      percentage,
      isFirstGap: false,
      status: isAcquired ? 'acquired' : 'missing',
      postingsWithSkill: matchedPostings,
    };
  });

  const missing = allDemands.filter((d) => d.status === 'missing');
  const acquired = allDemands.filter((d) => d.status === 'acquired');

  missing.sort((a, b) => {
    if (b.postingCount !== a.postingCount) {
      return b.postingCount - a.postingCount;
    }
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
  });

  acquired.sort((a, b) => {
    if (b.postingCount !== a.postingCount) {
      return b.postingCount - a.postingCount;
    }
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
  });

  if (missing.length > 0) {
    missing[0].isFirstGap = true;
  }

  const firstGapToClose = missing.length > 0 ? missing[0] : null;

  const totalSkillDemandsCount = allDemands.length;
  const directSkillMatchRate = totalSkillDemandsCount > 0
    ? Math.round((acquired.length / totalSkillDemandsCount) * 100)
    : 0;

  const totalPostingMentions = allDemands.reduce((sum, d) => sum + d.postingCount, 0);
  const acquiredPostingMentions = acquired.reduce((sum, d) => sum + d.postingCount, 0);
  const overallMatchRate = totalPostingMentions > 0
    ? Math.round((acquiredPostingMentions / totalPostingMentions) * 100)
    : 0;

  return {
    roleId: role.id,
    roleTitle: role.title,
    totalPostings,
    isSmallSample,
    rankedMissingSkills: missing,
    acquiredSkills: acquired,
    firstGapToClose,
    overallMatchRate,
    directSkillMatchRate,
  };
}

export function featureUnderTest(counts) {
  const role = { id: "test", title: "Test Role", totalPostings: 20, postings: [] };
  const result = computeGapAnalysis(role, [], Object.fromEntries(counts));
  return result.rankedMissingSkills.map((d) => d.name);
}