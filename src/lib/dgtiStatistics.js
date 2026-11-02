import { axisMeta, roleProfiles, questionBank } from "../data/dgti.js";
import { QUESTIONNAIRE_VERSION } from "../data/dgtiResearch.js";
import { buildTargetAnswers, pickType, scoreAnswers } from "./dgtiScoring.js";

export function summarizeResults(rows) {
  const count = rows.length;
  const counts = roleProfiles.map((profile) => rows.filter((row) => row.role === profile.code).length);
  const observedTypes = counts.filter((n) => n > 0).length;
  return {
    count,
    attempts: rows.reduce((sum, row) => sum + (row.attempts || 1), 0),
    observedTypes,
    roles: roleProfiles.map((profile, i) => {
      const total = counts[i];
      return { code: profile.code, count: total, percent: count ? Math.round(total / count * 1000) / 10 : 0,
        rarityRank: total ? 1 + counts.filter((n) => n > 0 && n < total).length : null,
        tied: total > 0 && counts.filter((n) => n === total).length > 1 };
    }).sort((a, b) => b.count - a.count),
    axes: Object.fromEntries(axisMeta.map(([key]) => [key, count ? Math.round(rows.reduce((sum, row) => sum + row.axes[key], 0) / count) : null]))
  };
}

let demo;
export function getDemoStatistics() {
  if (demo) return demo;
  let seed = 20261102;
  const random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  const rows = Array.from({ length: 100 }, (_, i) => {
    const target = buildTargetAnswers(roleProfiles[i % roleProfiles.length]);
    const answers = Object.fromEntries(questionBank.map((q, j) => [j, i < 20 || random() < .65 ? target[j] : Math.floor(random() * q.answers.length)]));
    const score = scoreAnswers(answers);
    return { role: pickType(score).profile.code, axes: score.axes };
  });
  demo = { ...summarizeResults(rows), version: QUESTIONNAIRE_VERSION, kind: "demo", feedback: { count: 0, averageRating: null, categories: [] } };
  return demo;
}
