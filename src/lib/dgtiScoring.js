import { axisMeta, factorMeta, questionBank, roleProfiles } from "../data/dgti.js";

const PRIMARY_ROLE_WEIGHT = 14;
const SECONDARY_ROLE_WEIGHT = 9;

export const profileAxisTargets = {
  CHOSEN: { energy: 58, information: 48, decision: 68, structure: 78 },
  COWHORSE: { energy: 45, information: 35, decision: 62, structure: 64 },
  FISH: { energy: 24, information: 52, decision: 42, structure: 22 },
  TRAITOR: { energy: 70, information: 62, decision: 62, structure: 58 },
  POTMAN: { energy: 45, information: 38, decision: 48, structure: 58 },
  FIREFIGHTER: { energy: 72, information: 36, decision: 64, structure: 60 },
  CRISPY: { energy: 25, information: 42, decision: 35, structure: 28 },
  BOUNDARY: { energy: 38, information: 32, decision: 74, structure: 82 },
  LEADERCARD: { energy: 76, information: 60, decision: 70, structure: 78 },
  PPTGOD: { energy: 62, information: 72, decision: 64, structure: 76 },
  MEETINGBOT: { energy: 78, information: 50, decision: 52, structure: 84 },
  WISHPOOL: { energy: 68, information: 84, decision: 36, structure: 24 },
  STIRRER: { energy: 78, information: 74, decision: 34, structure: 22 },
  SHITMOUNTAIN: { energy: 34, information: 42, decision: 66, structure: 58 },
  TWOFACE: { energy: 64, information: 68, decision: 44, structure: 46 },
  ALIVE: { energy: 86, information: 58, decision: 28, structure: 38 },
  EMOHEALER: { energy: 58, information: 46, decision: 20, structure: 48 },
  SILENTGOD: { energy: 18, information: 28, decision: 72, structure: 76 },
  AICOWORKER: { energy: 30, information: 24, decision: 66, structure: 82 }
};

export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function createRoleMap(value = 0) {
  return Object.fromEntries(roleProfiles.map((profile) => [profile.code, value]));
}

function createFactorMap(value = 0) {
  return Object.fromEntries(factorMeta.map(([key]) => [key, value]));
}

function createAxisMap(value = 0) {
  return Object.fromEntries(axisMeta.map(([key]) => [key, value]));
}

function getRoleWeight(answer, code) {
  if (answer.roles[0] === code) return PRIMARY_ROLE_WEIGHT;
  return answer.roles.includes(code) ? SECONDARY_ROLE_WEIGHT : 0;
}

export function getFactorBounds() {
  const bounds = Object.fromEntries(factorMeta.map(([key]) => [key, { min: 0, max: 0 }]));

  questionBank.forEach((question) => {
    factorMeta.forEach(([key]) => {
      const values = question.answers.map((answer) => answer.factors[key] || 0);
      bounds[key].max += Math.max(...values, 0);
      bounds[key].min += Math.min(...values, 0);
    });
  });

  return bounds;
}

export function getAxisBounds() {
  const bounds = Object.fromEntries(axisMeta.map(([key]) => [key, { min: 0, max: 0 }]));

  questionBank.forEach((question) => {
    axisMeta.forEach(([key]) => {
      const values = question.answers.map((answer) => answer.axes?.[key] || 0);
      bounds[key].max += Math.max(...values, 0);
      bounds[key].min += Math.min(...values, 0);
    });
  });

  return bounds;
}

export function getRoleCeilings() {
  const primary = createRoleMap(0);
  const total = createRoleMap(0);

  questionBank.forEach((question) => {
    roleProfiles.forEach((profile) => {
      primary[profile.code] += Math.max(...question.answers.map((answer) => (answer.roles[0] === profile.code ? PRIMARY_ROLE_WEIGHT : 0)), 0);
      total[profile.code] += Math.max(...question.answers.map((answer) => getRoleWeight(answer, profile.code)), 0);
    });
  });

  return { primary, total };
}

function normalizeFactor(rawValue, bounds) {
  const span = Math.max(1, bounds.max - bounds.min);
  const ratio = clamp((rawValue - bounds.min) / span, 0, 1);
  return Math.round(16 + Math.pow(ratio, 0.86) * 80);
}

function normalizeAxis(rawValue, bounds) {
  const limit = Math.max(1, Math.abs(bounds.min), Math.abs(bounds.max));
  return Math.round(clamp(50 + (rawValue / limit) * 46, 4, 96));
}

export function scoreAnswers(answers) {
  const roles = createRoleMap(0);
  const primaryRoles = createRoleMap(0);
  const rawFactors = createFactorMap(0);
  const rawAxes = createAxisMap(0);
  const factorBounds = getFactorBounds();
  const axisBounds = getAxisBounds();

  Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
    const answer = questionBank[Number(questionIndex)]?.answers?.[answerIndex];
    if (!answer) return;

    answer.roles.forEach((code, index) => {
      const weight = index === 0 ? PRIMARY_ROLE_WEIGHT : SECONDARY_ROLE_WEIGHT;
      roles[code] = (roles[code] || 0) + weight;
      if (index === 0) {
        primaryRoles[code] = (primaryRoles[code] || 0) + weight;
      }
    });

    Object.entries(answer.factors).forEach(([key, value]) => {
      rawFactors[key] = (rawFactors[key] || 0) + value;
    });

    Object.entries(answer.axes || {}).forEach(([key, value]) => {
      rawAxes[key] = (rawAxes[key] || 0) + value;
    });
  });

  const factors = Object.fromEntries(
    factorMeta.map(([key]) => [key, normalizeFactor(rawFactors[key] || 0, factorBounds[key])])
  );
  const axes = Object.fromEntries(axisMeta.map(([key]) => [key, normalizeAxis(rawAxes[key] || 0, axisBounds[key])]));

  return { roles, primaryRoles, rawFactors, rawAxes, factors, axes };
}

export function pickType(score) {
  const ceilings = getRoleCeilings();
  const sortedRoles = roleProfiles
    .map((profile) => {
      const primaryFit = ceilings.primary[profile.code]
        ? ((score.primaryRoles?.[profile.code] || 0) / ceilings.primary[profile.code]) * 100
        : 0;
      const roleFit = ceilings.total[profile.code]
        ? ((score.roles[profile.code] || 0) / ceilings.total[profile.code]) * 100
        : 0;
      const factorFit =
        factorMeta.reduce((sum, [key]) => sum + (100 - Math.abs((score.factors[key] || 50) - profile.factors[key])), 0) /
        factorMeta.length;
      const axisTarget = profileAxisTargets[profile.code] || {};
      const axisFit =
        axisMeta.reduce((sum, [key]) => sum + (100 - Math.abs((score.axes?.[key] || 50) - (axisTarget[key] || 50))), 0) /
        axisMeta.length;
      const primaryVolume = ((score.primaryRoles?.[profile.code] || 0) / (questionBank.length * PRIMARY_ROLE_WEIGHT)) * 100;
      const roleVolume = ((score.roles[profile.code] || 0) / (questionBank.length * PRIMARY_ROLE_WEIGHT)) * 100;
      const value =
        primaryFit * 0.3 + roleFit * 0.2 + factorFit * 0.32 + axisFit * 0.12 + primaryVolume * 0.04 + roleVolume * 0.02;

      return {
        profile,
        value,
        score: Math.round(value),
        primaryFit,
        roleFit,
        factorFit,
        axisFit,
        primaryVolume,
        roleVolume
      };
    })
    .sort((left, right) => right.value - left.value);

  const best = sortedRoles[0];
  const match = clamp(Math.round(best.value), 68, 96);

  return { profile: best.profile, match, topRoles: sortedRoles.slice(0, 4) };
}

export function getTopFactors(factors, count = 3) {
  return factorMeta
    .map(([key, label, desc]) => ({ key, label, desc, value: factors[key] }))
    .sort((left, right) => right.value - left.value)
    .slice(0, count);
}

export function getFactorLevel(value) {
  if (value >= 84) return { key: "peak", label: "爆表" };
  if (value >= 70) return { key: "strong", label: "明显" };
  if (value >= 54) return { key: "mid", label: "中等" };
  if (value >= 38) return { key: "low", label: "偏低" };
  return { key: "quiet", label: "缺席" };
}

export function buildTargetAnswers(profile) {
  const axisTarget = profileAxisTargets[profile.code] || {};

  return Object.fromEntries(
    questionBank.map((question, questionIndex) => {
      let bestAnswerIndex = 0;
      let bestValue = -Infinity;

      question.answers.forEach((answer, answerIndex) => {
        const roleValue = answer.roles[0] === profile.code ? 80 : answer.roles.includes(profile.code) ? 56 : 0;
        const factorValue = factorMeta.reduce(
          (sum, [key]) => sum + (answer.factors[key] || 0) * ((profile.factors[key] - 50) / 50),
          0
        );
        const axisValue = axisMeta.reduce(
          (sum, [key]) => sum + (answer.axes?.[key] || 0) * (((axisTarget[key] || 50) - 50) / 25),
          0
        );
        const value = roleValue + factorValue + axisValue;
        if (value > bestValue) {
          bestValue = value;
          bestAnswerIndex = answerIndex;
        }
      });

      return [questionIndex, bestAnswerIndex];
    })
  );
}

export function validateRoleReachability() {
  return roleProfiles.map((profile) => {
    const answers = buildTargetAnswers(profile);
    const score = scoreAnswers(answers);
    const result = pickType(score);

    return {
      code: profile.code,
      name: profile.name,
      reachable: result.profile.code === profile.code,
      pickedCode: result.profile.code,
      pickedName: result.profile.name,
      match: result.match
    };
  });
}
