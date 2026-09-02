import { axisMeta, factorMeta, questionBank, roleProfiles } from "../src/data/dgti.js";
import {
  buildTargetAnswers,
  getAxisBounds,
  getFactorBounds,
  scoreAnswers,
  validateRoleReachability
} from "../src/lib/dgtiScoring.js";

const axisBounds = getAxisBounds();
const factorBounds = getFactorBounds();
const reachability = validateRoleReachability();
const failed = reachability.filter((item) => !item.reachable);

console.log(`DGTI scoring check: ${questionBank.length} questions, ${roleProfiles.length} roles`);

console.table(
  factorMeta.map(([key, label]) => ({
    key,
    label,
    min: factorBounds[key].min,
    max: factorBounds[key].max
  }))
);

console.table(
  axisMeta.map(([key, left, right, leftLabel, rightLabel, , axisName]) => ({
    key,
    axisName,
    poles: `${left}/${right}`,
    labels: `${leftLabel} / ${rightLabel}`,
    min: axisBounds[key].min,
    max: axisBounds[key].max
  }))
);

console.table(reachability);

const demoAnswers = Object.fromEntries(questionBank.map((_, index) => [index, index % 4]));
const demoScore = scoreAnswers(demoAnswers);
console.log("Demo factor spread:");
console.table(
  factorMeta.map(([key, label]) => ({
    key,
    label,
    score: demoScore.factors[key],
    raw: demoScore.rawFactors[key] || 0
  }))
);

console.log("Demo DGTI axis spread:");
console.table(
  axisMeta.map(([key, left, right, leftLabel, rightLabel, , axisName]) => ({
    key,
    axisName,
    poles: `${left}/${right}`,
    labels: `${leftLabel} / ${rightLabel}`,
    score: demoScore.axes[key],
    raw: demoScore.rawAxes[key] || 0
  }))
);

roleProfiles.forEach((profile) => {
  const answers = buildTargetAnswers(profile);
  if (Object.keys(answers).length !== questionBank.length) {
    failed.push({ code: profile.code, name: profile.name, pickedCode: "INCOMPLETE_ANSWERS" });
  }
});

if (failed.length > 0) {
  console.error("Unreachable DGTI roles:");
  console.table(failed);
  process.exit(1);
}

console.log("All DGTI roles are reachable with deterministic scoring.");
