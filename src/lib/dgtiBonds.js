import { bondCatalog, factorMeta, relationOptions, roleProfiles } from "../data/dgti.js";
import { clamp } from "./dgtiScoring.js";

const profileByCode = Object.fromEntries(roleProfiles.map((profile) => [profile.code, profile]));

export function parseBondCode(value) {
  const normalized = value.trim().toUpperCase();
  const match = normalized.match(/^DGTI-([A-Z0-9]+)-([A-Z0-9]{4,8})$/);
  if (!match) return null;
  const profile = profileByCode[match[1]];
  if (!profile) return null;
  return { code: normalized, profile, userId: match[2] };
}

export function getBondBySlug(slug) {
  return bondCatalog.find((item) => item.slug === slug) || bondCatalog.find((item) => item.slug === "passing-coworkers");
}

export function getBondImage(slug, artStyle) {
  const bond = getBondBySlug(slug);
  if (!bond) return "";
  return bond.art?.[artStyle] || bond.art?.portrait || bond.image || "";
}

function makeBondResult(slug, score, override = {}) {
  const bond = getBondBySlug(slug);
  return {
    score: clamp(score + (override.delta || 0), 0, 99),
    name: override.name || bond.name,
    copy: override.copy || bond.copy,
    slug: bond.slug
  };
}

function getRelationScoreDelta(relation) {
  if (relation === "朋友" || relation === "互相审判") return 4;
  if (relation === "同组") return 3;
  if (relation === "前同事") return 1;
  if (relation === "甲乙方") return -2;
  return 0;
}

export function calculateBond(selfProfile, friendProfile, relation) {
  const gap =
    factorMeta.reduce((sum, [key]) => sum + Math.abs(selfProfile.factors[key] - friendProfile.factors[key]), 0) /
    factorMeta.length;
  const score = Math.round(clamp(100 - gap + getRelationScoreDelta(relation), 42, 96));
  const pairKey = [selfProfile.code, friendProfile.code].sort().join("|");
  const pairSet = new Set([selfProfile.code, friendProfile.code]);
  const pairBond = bondCatalog.find((bond) =>
    bond.pairs.some((candidate) => candidate.slice().sort().join("|") === pairKey)
  );

  if (relation === "甲乙方") {
    return makeBondResult("cyber-client-vendor", score, {
      name: "赛博甲乙方",
      copy: "一个负责提要求，一个负责解释预算和排期，空气里全是合同味。"
    });
  }
  if (relation === "前同事" && pairSet.has("SHITMOUNTAIN")) {
    return makeBondResult("legacy-chain", score, {
      delta: 6,
      name: "前任留下你来修",
      copy: "这段关系像交接文档的阴影：人走了，坑还在，缘分全写在报错里。"
    });
  }
  if (relation === "前同事" && pairSet.has("EMOHEALER")) {
    return makeBondResult("mental-aid", score, {
      delta: 4,
      name: "离职后精神急救站",
      copy: "已经不在一个工位了，但还能互相听对方骂两句，这也算打工人的售后。"
    });
  }
  if (relation === "同组" && pairSet.has("POTMAN")) {
    return makeBondResult("pot-allies", score, { delta: 4 });
  }
  if (relation === "同组" && (pairSet.has("COWHORSE") || pairSet.has("CHOSEN") || pairSet.has("FIREFIGHTER"))) {
    return makeBondResult("war-comrades", score, {
      delta: 4,
      name: "同组战友",
      copy: "你们可能互相吐槽，但真炸起来还是会一起把项目从地上捡起来。"
    });
  }
  if (relation === "朋友" && pairSet.has("FISH")) {
    return makeBondResult("fish-partners", score, { delta: 5 });
  }
  if (relation === "朋友" && (pairSet.has("CRISPY") || pairSet.has("EMOHEALER"))) {
    return makeBondResult("mental-aid", score, {
      delta: 5,
      name: "工位精神急救站",
      copy: "一个快碎了，一个递情绪价值，主打互相把对方从下班边缘捞回来。"
    });
  }
  if (relation === "同事" && pairSet.has("WISHPOOL")) {
    return makeBondResult("upstream-downstream-karma", score, {
      name: "许愿进下游",
      copy: "一个顺便许愿，一个负责把顺便变成排期，你们的缘分常常从字段变更开始。"
    });
  }
  if (relation === "互相审判" && pairSet.has("LEADERCARD")) {
    return makeBondResult("mutual-leaders", score, {
      name: "互为领导",
      copy: "谁都没正式任命，但谁都想给对方排一下优先级。"
    });
  }
  if (relation === "互相审判" && (pairSet.has("BOUNDARY") || pairSet.has("STIRRER"))) {
    return makeBondResult("desk-nemesis", score, {
      delta: -4,
      name: "工位天敌",
      copy: "你们一开口就像两套职场操作系统撞在一起，适合互相审判，不适合临时同桌。"
    });
  }

  if (pairBond) {
    return makeBondResult(pairBond.slug, score, { delta: 6 });
  }

  if (selfProfile.code === friendProfile.code) {
    return makeBondResult("best-gay-friends", score, {
      delta: 5,
      name: "同类互害",
      copy: "你们像同一张工位切片，互懂很快，互相带偏也很快。"
    });
  }
  if (pairSet.has("SHIFTER") && pairSet.has("POTMAN")) {
    return makeBondResult("pot-allies", score, {
      delta: 4,
      name: "锅权转移现场",
      copy: "一个擅长把锅甩出去，一个习惯先把锅顶住，这段关系建议全程留痕。"
    });
  }
  if (pairSet.has("SHIFTER") && (pairSet.has("COWHORSE") || pairSet.has("CHOSEN") || pairSet.has("FIREFIGHTER"))) {
    return makeBondResult("war-comrades", score, {
      name: "你甩我接孽缘",
      copy: "你们能把项目推下去，但责任流向最好写清楚，不然迟早有人心态爆炸。"
    });
  }
  if (pairSet.has("SHIFTER") && (pairSet.has("BOUNDARY") || pairSet.has("SILENTGOD") || pairSet.has("AICOWORKER"))) {
    return makeBondResult("desk-nemesis", score, {
      name: "责任隔离带",
      copy: "你们都不爱接模糊锅，一个靠边界，一个靠证据，合作起来很清醒也很硬。"
    });
  }
  if (pairSet.has("SHIFTER") && relation === "前同事") {
    return makeBondResult("passing-coworkers", score, {
      name: "安全距离同事",
      copy: "离开同一个项目以后，锅终于飞不过来了，你们只剩点头和回忆。"
    });
  }
  if (pairSet.has("SHIFTER")) {
    return makeBondResult("best-gay-friends", score, {
      name: "互相甩锅搭子",
      copy: "你们懂彼此的小算盘，笑着聊天，顺手把责任推回该去的地方。"
    });
  }
  if (pairSet.has("CRISPY") && pairSet.has("EMOHEALER")) {
    return makeBondResult("mental-aid", score, { delta: 8 });
  }
  if (pairSet.has("WISHPOOL") && (pairSet.has("BOUNDARY") || pairSet.has("SILENTGOD"))) {
    return makeBondResult("cyber-client-vendor", score);
  }
  if (pairSet.has("SHITMOUNTAIN") && (pairSet.has("FIREFIGHTER") || pairSet.has("POTMAN") || pairSet.has("SILENTGOD"))) {
    return makeBondResult("legacy-chain", score, { delta: 6 });
  }
  if (selfProfile.factors.bossy > 72 && friendProfile.factors.bossy > 72) {
    return makeBondResult("mutual-leaders", score);
  }
  if (selfProfile.factors.fish > 70 && friendProfile.factors.fish > 60) {
    return makeBondResult("fish-partners", score, { delta: 6 });
  }
  if (selfProfile.factors.carry + friendProfile.factors.pot > 145 || friendProfile.factors.carry + selfProfile.factors.pot > 145) {
    return makeBondResult("war-comrades", score, { delta: 4 });
  }
  if (
    (selfProfile.factors.boundary > 80 && friendProfile.factors.bossy > 75) ||
    (friendProfile.factors.boundary > 80 && selfProfile.factors.bossy > 75)
  ) {
    return makeBondResult("desk-nemesis", score, { delta: -6 });
  }
  if (selfProfile.factors.repair > 74 && friendProfile.factors.repair > 60) {
    return makeBondResult("best-gay-friends", score, { delta: 5 });
  }
  if (relation === "朋友" || relation === "互相审判") {
    return makeBondResult("best-gay-friends", score, {
      name: relation === "互相审判" ? "互相审判席" : "好闺/gay蜜",
      copy: relation === "互相审判" ? "你们不一定同频，但很适合互相看结果然后当场开麦。" : undefined
    });
  }
  if (relation === "同组" && score >= 62) {
    return makeBondResult("war-comrades", score, {
      name: "工位同盟",
      copy: "你们节奏不同，但能在同一坨项目里找到分工。"
    });
  }
  return makeBondResult("passing-coworkers", score);
}

export function findBondUnlockHint(selfProfile, slug) {
  const candidates = [];

  relationOptions.forEach((relation) => {
    roleProfiles.forEach((profile) => {
      const bond = calculateBond(selfProfile, profile, relation);
      if (bond.slug === slug) {
        candidates.push({ profile, relation, score: bond.score, bond });
      }
    });
  });

  return candidates.sort((left, right) => right.score - left.score)[0] || null;
}

export function getBondCollectionCoverage(selfProfile) {
  const hints = Object.fromEntries(
    bondCatalog.map((bond) => [bond.slug, findBondUnlockHint(selfProfile, bond.slug)])
  );
  const missing = bondCatalog.filter((bond) => !hints[bond.slug]);
  return { hints, missing, isComplete: missing.length === 0 };
}
