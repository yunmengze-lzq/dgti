import { toPng } from "html-to-image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  STORAGE_KEY,
  artStyles,
  axisMeta,
  bondCatalog,
  factorMeta,
  groupMeta,
  questionBank,
  relationOptions,
  roleProfiles,
  shopProducts
} from "../data/dgti.js";
import { clamp, getFactorLevel, getRoleRarityStats, getTopFactors, pickType, scoreAnswers } from "../lib/dgtiScoring.js";

const profileByCode = Object.fromEntries(roleProfiles.map((profile) => [profile.code, profile]));
const crowdSignals = ["6 / 38", "17 / 38", "29 / 38"];
const publicArtStyleKeys = ["mbti"];
const optionLetters = ["A", "B", "C", "D", "E"];

function renderMarkedText(text, className = "answer-emphasis") {
  if (text.includes("【")) {
    const parts = text.split(/(【[^】]+】)/g).filter(Boolean);
    return parts.map((part, index) => {
      if (part.startsWith("【") && part.endsWith("】")) {
        return <span className={className} key={`${part}-${index}`}>{part.slice(1, -1)}</span>;
      }
      return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
    });
  }

  const firstStop = ["，", "。", "：", "；"]
    .map((mark) => text.indexOf(mark))
    .filter((index) => index > 0)
    .sort((a, b) => a - b)[0];
  const emphasisEnd = firstStop ?? text.length;

  return (
    <>
      <span className={className}>{text.slice(0, emphasisEnd)}</span>
      {text.slice(emphasisEnd)}
    </>
  );
}

const roleDeepReadings = {
  CHOSEN: {
    why: "你的答案经常指向“先把混乱拆成下一步”。你不是单纯爱负责，而是看到空转时会本能补上结构。",
    stress: "压力越大越容易进入主线模式，但也容易把休息当成可延期事项。",
    advice: "你的本事要配合边界使用，别让“能干”自动变成“都你来”。"
  },
  COWHORSE: {
    why: "你对现实细节和交付稳定度比较敏感，嘴上可能骂，手上仍会把事情推进。",
    stress: "长期兜底会让你从可靠变成麻木，尤其容易把锅也当成本职工作。",
    advice: "把“我可以做”改成“我可以在这些条件下做”，牛马也要有版本说明。"
  },
  FISH: {
    why: "你更看重能量管理和低风险生存，遇到无效会议、模糊需求时会优先保护电量。",
    stress: "当压力超过阈值，你会倾向潜水、拖延或切小窗回血。",
    advice: "摸鱼不是问题，关键是给自己保留一个能交代的最小闭环。"
  },
  TRAITOR: {
    why: "你能迅速识别上层口径和场面话，在人群中更容易选择“向上对齐”的解法。",
    stress: "你的优势是会求生，风险是同事会觉得你像老板代打。",
    advice: "话术可以有，但最好保留一点同事侧的真实立场。"
  },
  POTMAN: {
    why: "你对风险和责任流向很敏感，很多答案都体现出“先兜住现场”的本能。",
    stress: "你会在锅飞来之前预判落点，久了容易默认自己该接住。",
    advice: "锅盖可以举，责任线也要写清楚。"
  },
  SHIFTER: {
    why: "你的答案常常指向“责任先拆清，再决定要不要接”。你不是单纯逃活，而是不接受模糊任务自动变成你的锅。",
    stress: "越是临时加塞、口头承诺和群里找人背锅，你越会启动截图、流程和责任反弹。",
    advice: "甩锅也要讲证据和分寸：把不该你的责任退回去，同时保留基本协作，不然容易变成工位天敌。"
  },
  FIREFIGHTER: {
    why: "你在高压场景下偏行动导向，倾向先止血、先救场、先让局面活下来。",
    stress: "你越能救火，越容易被系统当成常驻消防栓。",
    advice: "救完火要留复盘和边界，不然下一次火还是烧到你脚边。"
  },
  CRISPY: {
    why: "你的答案呈现出明显的低电量自保：你不是不想做，而是很知道自己会碎。",
    stress: "模糊需求、临时加码和情绪压力会快速消耗你的血条。",
    advice: "把“我撑一下”换成“我需要补信息/补时间/补资源”。"
  },
  BOUNDARY: {
    why: "你会优先确认范围、责任、验收和代价，典型表现是温柔但不随便开门。",
    stress: "别人越用“顺手”“基础”“很快”糊弄你，你越会启动门神姿势。",
    advice: "边界不是冷漠，是让合作别靠消耗活着。"
  },
  LEADERCARD: {
    why: "你更容易从混乱里抽出安排、节奏和权责，偶尔会先出现管理感。",
    stress: "压力下你可能用“对齐一下”盖过真正的问题。",
    advice: "领导味可以推进事情，但要确认别人不是被推进墙里。"
  },
  PPTGOD: {
    why: "你擅长把混乱包装成结构，把复杂问题讲成别人愿意看的页面。",
    stress: "当材料太散时，你会先找叙事线，再补证据。",
    advice: "PPT 飞剑很帅，但别让漂亮标题替代真实落地。"
  },
  MEETINGBOT: {
    why: "你偏向通过同步、讨论和正式确认来降低不确定性。",
    stress: "当问题没有结论，你容易再约一个会来证明事情还在动。",
    advice: "会议前先写清楚要产出什么，不然永动机会把大家日历吸干。"
  },
  WISHPOOL: {
    why: "你对可能性和愿景很敏感，常会先看到“还能不能更大一点”。",
    stress: "当资源边界不清，你的脑洞容易变成别人的加班。",
    advice: "许愿之前加一句优先级和预算，神灯会更像需求文档。"
  },
  STIRRER: {
    why: "你很能感知沉闷局面里的戏剧张力，答案里有明显的搅动、锐评和点火倾向。",
    stress: "越无聊越想让空气动起来，但别人未必都想活在连续剧里。",
    advice: "你的梗可以破冰，也可以破坏信任，点火前看一眼风向。"
  },
  SHITMOUNTAIN: {
    why: "你和历史遗留、旧系统、祖传问题的关联度很高，常在混乱地层里找活路。",
    stress: "你会把问题看成地质结构，越挖越发现前任留下的矿。",
    advice: "考古要留地图，不然你会成为下一任眼里的前任。"
  },
  TWOFACE: {
    why: "你擅长根据对象切换表达，能读懂职场温差，也会用不同话术自保。",
    stress: "当利益和关系冲突时，你容易把两个版本的自己同时上线。",
    advice: "会切换是能力，但别切到最后自己也忘了真实立场。"
  },
  ALIVE: {
    why: "你倾向用互动、玩笑和主动回应给关系续命，是灰色群聊里的活人感来源。",
    stress: "当大家都沉默时，你会忍不住证明人类还在。",
    advice: "你可以让场子活起来，也要允许自己偶尔不负责热场。"
  },
  EMOHEALER: {
    why: "你的判断会更多照顾人的状态和情绪成本，修复力很强。",
    stress: "别人一崩，你容易自动递纸巾、奶茶和人生解释权。",
    advice: "情绪价值不是无限续杯，照顾别人前先看自己杯里还有没有水。"
  },
  SILENTGOD: {
    why: "你更偏安静观察、事实确认和关键时刻输出，不靠存在感证明价值。",
    stress: "信息不全时你不会急着站队，宁愿先把证据和旧版本找出来。",
    advice: "沉默很强，但关键边界和功劳要适时说出来。"
  },
  AICOWORKER: {
    why: "你偏好标准化、模板化和稳定输出，能降低沟通误差，也容易显得太预制。",
    stress: "复杂情绪场景会让你更想切回礼貌默认回复。",
    advice: "稳定是优点，偶尔露一点真人反应会让同事更放心。"
  }
};

function createUserId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function normalizeArtStyle(artStyle) {
  return publicArtStyleKeys.includes(artStyle) ? artStyle : publicArtStyleKeys[0];
}

function getFallbackState() {
  return {
    phase: "home",
    artStyle: "mbti",
    identity: {
      alias: "",
      context: "",
      userId: createUserId(),
      allowBondBook: true
    },
    answers: {},
    currentIndex: 0,
    bonds: [],
    resultArchive: [],
    addresses: [],
    orders: [],
    crowdSignal: crowdSignals[Math.floor(Math.random() * crowdSignals.length)]
  };
}

function readStoredState() {
  if (typeof window === "undefined") return getFallbackState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getFallbackState();
    const stored = { ...getFallbackState(), ...JSON.parse(raw) };
    return { ...stored, artStyle: normalizeArtStyle(stored.artStyle) };
  } catch {
    return getFallbackState();
  }
}

function makeBondCode(identity, profile) {
  return `DGTI-${profile.code}-${identity.userId}`;
}

function makeResultId(identity, profile) {
  return `DGTI-RESULT-${profile.code}-${identity.userId}`;
}

function buildResultShareText(identity, result) {
  const alias = identity.alias || `匿名工位-${identity.userId.slice(0, 3)}`;
  return `${alias} 的打工人 TI：${result.profile.name} / ${result.profile.code}\n${result.profile.tagline}\n羁绊码：${makeBondCode(identity, result.profile)}`;
}

function createResultArchiveEntry(identity, score, result, artStyle, answers) {
  return {
    id: `${makeResultId(identity, result.profile)}-${Date.now()}`,
    resultId: makeResultId(identity, result.profile),
    profileCode: result.profile.code,
    profileName: result.profile.name,
    match: result.match,
    artStyle,
    topFactors: getTopFactors(score.factors, 3).map((item) => ({ key: item.key, label: item.label, value: item.value })),
    answerKey: questionBank.map((_, index) => answers[index] ?? "_").join("-"),
    savedAt: new Date().toISOString()
  };
}

function parseBondCode(value) {
  const normalized = value.trim().toUpperCase();
  const match = normalized.match(/^DGTI-([A-Z0-9]+)-([A-Z0-9]{4,8})$/);
  if (!match) return null;
  const profile = profileByCode[match[1]];
  if (!profile) return null;
  return { code: normalized, profile, userId: match[2] };
}

function getBondImage(slug, artStyle) {
  const bond = bondCatalog.find((item) => item.slug === slug);
  if (!bond) return "";
  return bond.art?.[artStyle] || bond.art?.portrait || bond.image || "";
}

function calculateBond(selfProfile, friendProfile, relation) {
  const gap =
    factorMeta.reduce((sum, [key]) => sum + Math.abs(selfProfile.factors[key] - friendProfile.factors[key]), 0) /
    factorMeta.length;
  const score = Math.round(clamp(100 - gap, 42, 96));
  const pairKey = [selfProfile.code, friendProfile.code].sort().join("|");
  const pairSet = new Set([selfProfile.code, friendProfile.code]);
  const pairBond = bondCatalog.find((bond) =>
    bond.pairs.some((candidate) => candidate.slice().sort().join("|") === pairKey)
  );

  if (pairBond) {
    return {
      score: clamp(score + 6, 0, 99),
      name: pairBond.name,
      copy: pairBond.copy,
      slug: pairBond.slug
    };
  }

  if (selfProfile.code === friendProfile.code) {
    return { score: clamp(score + 5, 0, 99), name: "同类互害", copy: "你们像同一张工位切片，互懂很快，互相带偏也很快。", slug: "same-type" };
  }
  if (pairSet.has("CRISPY") && pairSet.has("EMOHEALER")) {
    const bond = bondCatalog.find((item) => item.slug === "mental-aid");
    return { score: clamp(score + 8, 0, 99), name: bond.name, copy: bond.copy, slug: bond.slug };
  }
  if (pairSet.has("WISHPOOL") && (pairSet.has("BOUNDARY") || pairSet.has("SILENTGOD"))) {
    const bond = bondCatalog.find((item) => item.slug === "cyber-client-vendor");
    return { score, name: bond.name, copy: bond.copy, slug: bond.slug };
  }
  if (pairSet.has("SHITMOUNTAIN") && (pairSet.has("FIREFIGHTER") || pairSet.has("POTMAN") || pairSet.has("SILENTGOD"))) {
    const bond = bondCatalog.find((item) => item.slug === "legacy-chain");
    return { score: clamp(score + 6, 0, 99), name: bond.name, copy: bond.copy, slug: bond.slug };
  }
  if (selfProfile.factors.bossy > 72 && friendProfile.factors.bossy > 72) {
    const bond = bondCatalog.find((item) => item.slug === "mutual-leaders");
    return { score, name: bond.name, copy: bond.copy, slug: bond.slug };
  }
  if (selfProfile.factors.fish > 70 && friendProfile.factors.fish > 60) {
    const bond = bondCatalog.find((item) => item.slug === "fish-partners");
    return { score: clamp(score + 6, 0, 99), name: bond.name, copy: bond.copy, slug: bond.slug };
  }
  if (selfProfile.factors.carry + friendProfile.factors.pot > 145 || friendProfile.factors.carry + selfProfile.factors.pot > 145) {
    const bond = bondCatalog.find((item) => item.slug === "war-comrades");
    return { score: clamp(score + 4, 0, 99), name: bond.name, copy: bond.copy, slug: bond.slug };
  }
  if (
    (selfProfile.factors.boundary > 80 && friendProfile.factors.bossy > 75) ||
    (friendProfile.factors.boundary > 80 && selfProfile.factors.bossy > 75)
  ) {
    const bond = bondCatalog.find((item) => item.slug === "desk-nemesis");
    return { score: clamp(score - 6, 0, 99), name: bond.name, copy: bond.copy, slug: bond.slug };
  }
  if (selfProfile.factors.repair > 74 && friendProfile.factors.repair > 60) {
    const bond = bondCatalog.find((item) => item.slug === "best-gay-friends");
    return { score: clamp(score + 5, 0, 99), name: bond.name, copy: bond.copy, slug: bond.slug };
  }
  const fallback = bondCatalog.find((item) => item.slug === "passing-coworkers");
  return score >= 66
    ? { score, name: "工位同盟", copy: "你们节奏不同，但能在同一坨项目里找到分工。", slug: "desk-alliance" }
    : { score, name: fallback.name, copy: fallback.copy, slug: fallback.slug };
}

function formatMoney(value) {
  return `¥${value.toFixed(0)}`;
}

function createOrderNo() {
  return `DGTI${Date.now().toString().slice(-8)}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

function StyleToggle({ artStyle, onChange }) {
  const options = Object.entries(artStyles).filter(([key]) => publicArtStyleKeys.includes(key));
  if (options.length <= 1) return null;

  return (
    <div className="style-toggle" aria-label="美术风格切换">
      {options.map(([key, label]) => (
        <button key={key} type="button" className={artStyle === key ? "active" : ""} onClick={() => onChange(key)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function CharacterArtwork({ profile, artStyle, size = "large" }) {
  const safeArtStyle = normalizeArtStyle(artStyle);

  return (
    <img
      className={`dgti-art ${size}`}
      src={profile.art[safeArtStyle] || profile.art.mbti || profile.art.portrait}
      alt={`${profile.name} ${artStyles[safeArtStyle]}角色图，梗锚点：${profile.meme}`}
      loading={size === "large" ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function FactorBar({ item }) {
  const level = getFactorLevel(item.value);

  return (
    <div className={`factor-row factor-${level.key}`}>
      <div>
        <strong>{item.label}</strong>
        <span>{level.label}</span>
      </div>
      <p>{item.desc}</p>
      <div className="factor-track" aria-hidden="true">
        <i style={{ width: `${item.value}%` }} />
      </div>
      <strong className="factor-score">{item.value}</strong>
    </div>
  );
}

function getAxisReading(item, value) {
  const [, left, right, leftLabel, rightLabel, desc, axisName, leftAnchor, rightAnchor] = item;
  const isRight = value >= 50;
  const letter = isRight ? right : left;
  const label = isRight ? rightLabel : leftLabel;
  const anchor = isRight ? rightAnchor : leftAnchor;
  const strength = Math.abs(value - 50);
  const tone = strength >= 30 ? "强倾向" : strength >= 18 ? "明显倾向" : strength >= 8 ? "轻微倾向" : "弹性区间";

  return { letter, label, anchor, tone, desc, axisName, leftLabel, rightLabel, leftAnchor, rightAnchor, value, offset: clamp(value, 4, 96) };
}

function AxisPreferenceBar({ item, value, index }) {
  const reading = getAxisReading(item, value);

  return (
    <article className="axis-row">
      <div className="axis-row-head">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div>
          <p>{reading.axisName}</p>
          <strong>{reading.label}</strong>
        </div>
        <em>{Math.round(reading.value)}</em>
      </div>
      <div className="axis-current">
        <span>当前倾向</span>
        <strong>{reading.label}</strong>
        <i>{reading.anchor} · {reading.tone}</i>
      </div>
      <div className="axis-track" aria-label={`${reading.axisName} ${reading.label} ${Math.round(reading.value)} 分`}>
        <i style={{ left: `${reading.offset}%` }} />
      </div>
      <div className="axis-poles">
        <span>
          <b>{reading.leftLabel}</b>
          <small>{reading.leftAnchor}</small>
        </span>
        <span>
          <b>{reading.rightLabel}</b>
          <small>{reading.rightAnchor}</small>
        </span>
      </div>
      <p>{reading.desc}</p>
    </article>
  );
}

function getFactorExtremes(factors) {
  const ranked = getTopFactors(factors, factorMeta.length);
  return {
    top: ranked.slice(0, 3),
    low: ranked.slice(-2).reverse()
  };
}

function getAxisSummary(axisReadings) {
  return axisReadings
    .map(({ item, value }) => getAxisReading(item, value))
    .map((reading) => `「${reading.axisName}：${reading.label}」`)
    .join("、");
}

function buildAdvicePoints(profile, score, topFactors, axisReadings) {
  const points = [
    `把你的“${profile.meme}”当成识别信号，不要当成固定人设。它说明你在某些场景里会自然滑向这个模式，但不是说你只能这样工作。`,
    `你当前最强的信号是${topFactors.slice(0, 3).map((item) => `「${item.label}」`).join("、")}，适合用来判断你在团队里最容易被看见、被需要、也最容易被消耗的地方。`
  ];

  if ((score.factors.boundary || 0) < 45) {
    points.push("边界感偏弱时，建议把“我可以”后面补上范围、时间和交付标准，不然很容易从帮忙变成默认归你。");
  } else if ((score.factors.boundary || 0) >= 70) {
    points.push("边界感较强时，你适合做规则和范围的守门人，但表达上可以多给一个替代方案，减少别人觉得你只是在拒绝。");
  }

  if ((score.factors.fish || 0) >= 64) {
    points.push("摸鱼功力偏高不是坏事，说明你会保护电量；但最好保留一个可见的小闭环，让别人知道你不是消失，而是在低功耗推进。");
  }

  if ((score.factors.bossy || 0) >= 64) {
    points.push("领导味偏高时，你很适合做推进和对齐；注意少用空泛大词，多给责任人、截止时间和下一步。");
  }

  if ((score.factors.repair || 0) >= 64) {
    points.push("修复力高的人容易成为团队情绪缓冲垫，建议学会区分“我愿意听”和“这件事需要机制解决”。");
  }

  const structure = axisReadings.find(({ item }) => item[0] === "structure")?.value ?? 50;
  if (structure < 42) {
    points.push("你的节奏更偏连滚带爬补，创意和应变会更自然；遇到多人协作时，可以提前写一个最低限度的钉单线。");
  } else if (structure > 58) {
    points.push("你的节奏更偏钉死闭环，适合管理复杂事项；要给别人留一点变化空间，不然协作会显得太紧。");
  }

  return points.slice(0, 5);
}

function Header({ phase, setPhase, isComplete, artStyle, setArtStyle }) {
  const nav = [
    ["home", "首页"],
    ["quiz", "开测"],
    ["result", "结果"],
    ["atlas", "图鉴"],
    ["bonds", "羁绊"],
    ["shop", "小店"]
  ];

  return (
    <header className="dgti-header">
      <button className="dgti-brand" type="button" onClick={() => setPhase("home")}>
        <span className="brand-mark">D</span>
        <span>
          <strong>打工人 TI</strong>
          <small>Dagongren Type Indicator</small>
        </span>
      </button>
      <nav className="dgti-nav" aria-label="打工人 TI 主导航">
        {nav.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={phase === key ? "active" : ""}
            disabled={(key === "result" || key === "bonds") && !isComplete}
            onClick={() => setPhase(key)}
          >
            {label}
          </button>
        ))}
      </nav>
      <StyleToggle artStyle={artStyle} onChange={setArtStyle} />
    </header>
  );
}

function HomeView({ identity, onIdentityChange, onStart, setPhase, hasAnswers, artStyle, setArtStyle }) {
  const heroProfiles = [profileByCode.FISH, profileByCode.BOUNDARY, profileByCode.LEADERCARD, profileByCode.EMOHEALER];

  return (
    <main className="dgti-home page-enter">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">测测你是哪种工位生态位</p>
          <h1>不是测你是什么人，是测你在这坨职场生态里通常扮演什么角色。</h1>
          <p className="hero-lede">
            {questionBank.length} 道职场情境题，匹配 {roleProfiles.length} 个打工人人格。能自嘲、能互测、能收集羁绊，也能把本命角色做成陶瓷小人。
          </p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={onStart}>
              {hasAnswers ? "继续开测" : "开始测试"}
            </button>
            <button className="secondary-action" type="button" onClick={() => setPhase("atlas")}>
              先看角色图鉴
            </button>
            <button className="secondary-action" type="button" onClick={() => setPhase("shop")}>
              逛陶瓷小店
            </button>
          </div>
          <div className="pill-row">
            <span>仅供娱乐</span>
            <span>不做心理诊断</span>
            <span>本地轻绑定</span>
            <span>H5 友好</span>
          </div>
        </div>
        <div className="hero-stage" aria-label="打工人人格角色预览">
          {heroProfiles.map((profile, index) => (
            <button
              key={profile.code}
              type="button"
              className={`hero-card hero-card-${index + 1}`}
              onClick={() => setPhase("atlas")}
            >
              <CharacterArtwork profile={profile} artStyle={artStyle} size="medium" />
              <strong>{profile.name}</strong>
              <span>{profile.meme}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="dgti-section identity-section">
        <div className="section-heading">
          <p className="eyebrow">轻量绑定</p>
          <h2>先给你的工位命格留一个本地代号</h2>
          <p>不要求登录，不收手机号。当前原型只把代号、答题草稿和你主动录入的羁绊保存在本机浏览器。</p>
        </div>
        <div className="identity-grid">
          <label className="field-control">
            <span>你的代号</span>
            <input
              value={identity.alias}
              onChange={(event) => onIdentityChange({ alias: event.target.value })}
              placeholder={`匿名工位-${identity.userId.slice(0, 3)}`}
              maxLength={16}
            />
          </label>
          <label className="field-control">
            <span>共同语境，可选</span>
            <input
              value={identity.context}
              onChange={(event) => onIdentityChange({ context: event.target.value })}
              placeholder="比如：同组、甲方群、前同事"
              maxLength={18}
            />
          </label>
          <label className="checkbox-control">
            <input
              type="checkbox"
              checked={identity.allowBondBook}
              onChange={(event) => onIdentityChange({ allowBondBook: event.target.checked })}
            />
            <span>允许把我主动输入的羁绊记录保存在本机账本</span>
          </label>
        </div>
      </section>

      <section className="dgti-section method-section">
        <div className="section-heading">
          <p className="eyebrow">怎么判</p>
          <h2>不是抽签，是四层打工人信号一起算</h2>
          <p>题目都落在真实职场场景里，答案不会只对应一个结果，而是同时改变角色、因子、行为雷达和羁绊倾向。</p>
        </div>
        <div className="method-grid">
          <article>
            <span>01</span>
            <h3>角色命中</h3>
            <p>每个选项会给 1-2 个角色加权，区分“第一反应像谁”和“次级气质像谁”。</p>
          </article>
          <article>
            <span>02</span>
            <h3>副标签分层</h3>
            <p>扛活、摸鱼、边界、搅动、领导味、背锅、修复、屎山八个信号会拉开强弱。</p>
          </article>
          <article>
            <span>03</span>
            <h3>职场行为雷达</h3>
            <p>工作能量、信息取向、协作边界、执行节奏，先用通用维度定骨架，再用打工人梗锚点增强记忆。</p>
          </article>
          <article>
            <span>04</span>
            <h3>羁绊匹配</h3>
            <p>结果会生成羁绊码，和朋友互填后看你们是战友、搭子、天敌还是上下游孽缘。</p>
          </article>
        </div>
      </section>

      <section className="dgti-section split-section">
        <div className="section-heading">
          <p className="eyebrow">当前视觉</p>
          <h2>DGTI 立绘先作为默认人格形象</h2>
          <p>角色图鉴、结果页、分享卡和商品预览先统一使用这一套形象，避免测试期风格来回跳。</p>
        </div>
      </section>

      <section className="dgti-section group-strip" aria-label="五个打工人阵营">
        {Object.entries(groupMeta).map(([key, group]) => (
          <article key={key} style={{ "--group-color": group.color, "--group-bg": group.bg }}>
            <span>{group.short}</span>
            <h3>{group.name}</h3>
            <p>{group.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function QuizView({ answers, currentIndex, onSelectAnswer, crowdSignal, onNext, onPrevious, onReset, setPhase }) {
  const activeIndex = Math.min(currentIndex, questionBank.length - 1);
  const question = questionBank[activeIndex];
  const isCurrentAnswered = answers[activeIndex] !== undefined;
  const selectedAnswer = isCurrentAnswered ? question.answers[answers[activeIndex]] : null;
  const progress = Math.round(((activeIndex + (isCurrentAnswered ? 1 : 0)) / questionBank.length) * 100);
  const title = question.title.replace("{crowdSignal}", crowdSignal);
  const meterToast = selectedAnswer?.note ?? (activeIndex === 0 ? "第一反应最有班味，别替自己美化。" : "继续选，我在旁边偷偷记账。");
  const [isAdvancing, setIsAdvancing] = useState(false);

  useEffect(() => {
    setIsAdvancing(false);
  }, [activeIndex]);

  const chooseAnswer = (index) => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    onSelectAnswer(activeIndex, index);
  };

  return (
    <main className="quiz-view page-enter">
      <section className="quiz-shell">
        <div className="quiz-topline">
          <div className="quiz-top-actions">
            <button className="text-action" type="button" onClick={() => setPhase("home")}>
              返回首页
            </button>
            {Object.keys(answers).length > 0 && (
              <button className="text-action danger-action" type="button" onClick={onReset}>
                重新测
              </button>
            )}
          </div>
          <span>第 {activeIndex + 1} / {questionBank.length} 题</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <i style={{ width: `${Math.max(progress, 4)}%` }} />
        </div>
        <div className="quiz-layout">
          <aside className="office-meter">
            <div className="meter-dial">
              <strong>{progress}%</strong>
              <span>已完成</span>
            </div>
            <div className="meter-copy">
              <strong>班味识别中</strong>
              <span>第 {activeIndex + 1} / {questionBank.length} 题 · 选完自动跳转</span>
            </div>
            <div className={["meter-feedback", selectedAnswer ? "is-hot" : ""].filter(Boolean).join(" ")} aria-live="polite" key={`${activeIndex}-${answers[activeIndex] ?? "wait"}`}>
              {meterToast}
            </div>
          </aside>
          <section className="question-card">
            <p className="eyebrow">{question.chapter}</p>
            <h1>{renderMarkedText(title, "question-emphasis")}</h1>
            <div className="answer-grid">
              {question.answers.map((answer, index) => (
                <button
                  key={answer.text}
                  type="button"
                  className={[
                    "answer-option",
                    answers[activeIndex] === index ? "selected" : "",
                    isAdvancing ? "advancing" : ""
                  ].filter(Boolean).join(" ")}
                  disabled={isAdvancing}
                  onClick={() => chooseAnswer(index)}
                >
                  <span className="answer-index" aria-hidden="true">{optionLetters[index]}</span>
                  <span className="answer-main">{renderMarkedText(answer.text)}</span>
                </button>
              ))}
            </div>
            <div className="quiz-controls">
              <button className="secondary-action" type="button" disabled={activeIndex === 0} onClick={onPrevious}>
                上一题
              </button>
              <button className="primary-action" type="button" disabled={!isCurrentAnswered} onClick={onNext}>
                {activeIndex >= questionBank.length - 1 ? "揭晓结果" : isAdvancing ? "正在跳转" : "马上下一题"}
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function ResultView({ identity, score, result, answers, setPhase, artStyle, setArtStyle, resultArchive, onSaveResult }) {
  const { profile, match, topRoles } = result;
  const group = groupMeta[profile.group];
  const rarityStats = getRoleRarityStats();
  const currentRarity = rarityStats.byCode[profile.code];
  const alias = identity.alias || `匿名工位-${identity.userId.slice(0, 3)}`;
  const topFactors = getTopFactors(score.factors, factorMeta.length);
  const bondCode = makeBondCode(identity, profile);
  const resultId = makeResultId(identity, profile);
  const deepReading = roleDeepReadings[profile.code];
  const axisReadings = axisMeta.map((item) => ({ item, value: score.axes?.[item[0]] ?? 50 }));
  const factorExtremes = getFactorExtremes(score.factors);
  const axisSummary = getAxisSummary(axisReadings);
  const advicePoints = buildAdvicePoints(profile, score, topFactors, axisReadings);
  const captureRef = useRef(null);
  const [shareFeedback, setShareFeedback] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  const announce = (message) => {
    setShareFeedback(message);
    window.setTimeout(() => setShareFeedback(""), 1800);
  };

  const copyText = async (text, successMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      announce(successMessage);
    } catch {
      announce("复制失败，可以手动选中这串内容。");
    }
  };

  const saveResult = () => {
    onSaveResult();
    announce("当前结果已保存到本机档案。");
  };

  const shareResult = async () => {
    const text = buildResultShareText(identity, result);
    if (navigator.share) {
      try {
        await navigator.share({ title: "我的打工人 TI", text });
        announce("分享面板已打开。");
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    await copyText(text, "设备不支持系统分享，已复制文案。");
  };

  const captureLongShot = async () => {
    if (!captureRef.current) return;
    setIsCapturing(true);
    try {
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        backgroundColor: "#fff8ea",
        filter: (node) => !node.classList?.contains("capture-skip")
      });
      const link = document.createElement("a");
      link.download = `dgti-${profile.code.toLowerCase()}-${identity.userId}.png`;
      link.href = dataUrl;
      link.click();
      announce("长截图已生成下载。");
    } catch {
      announce("长截图生成失败，可以先复制文案或用系统截图。");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <main className="result-view page-enter" ref={captureRef}>
      <section className="result-hero" style={{ "--result-color": group.color, "--result-bg": group.bg }}>
        <div className="result-art-wrap">
          <CharacterArtwork profile={profile} artStyle={artStyle} />
          <StyleToggle artStyle={artStyle} onChange={setArtStyle} />
        </div>
        <div className="result-copy">
          <p className="eyebrow">{group.name}</p>
          <h1>{profile.name}</h1>
          <p className="result-code">{profile.code} · 匹配度 {match}% · 模拟稀有度 {currentRarity?.percent ?? "-"}%</p>
          {currentRarity && <p className="rarity-badge">{currentRarity.label} · {roleProfiles.length} 型里第 {currentRarity.rank} 稀有</p>}
          <p className="result-sentence">{profile.tagline}</p>
          <p>{profile.copy}</p>
          <div className="tag-cloud">
            {profile.traits.map((trait) => (
              <span key={trait}>{trait}</span>
            ))}
          </div>
          <div className="result-actions capture-skip">
            <button className="primary-action" type="button" onClick={() => setPhase("bonds")}>
              生成羁绊卡
            </button>
            <button className="secondary-action" type="button" onClick={() => copyText(bondCode, "羁绊码已复制。")}>
              复制羁绊码
            </button>
            <button className="secondary-action" type="button" onClick={shareResult}>
              分享结果
            </button>
            <button className="secondary-action" type="button" onClick={captureLongShot} disabled={isCapturing}>
              {isCapturing ? "生成中" : "保存长截图"}
            </button>
            <button className="primary-action shop-action" type="button" onClick={() => setPhase("shop")}>
              买同款小人
            </button>
            <button className="secondary-action" type="button" onClick={() => setPhase("atlas")}>
              查看图鉴
            </button>
          </div>
        </div>
      </section>

      <section className="dgti-section result-vault-section">
        <article className="result-pass" style={{ "--result-color": group.color, "--result-bg": group.bg }}>
          <div>
            <p className="eyebrow">工位档案卡</p>
            <h2>{alias} 的本机结果凭证</h2>
            <p>测试结果会随答题记录保存在本机。想和别人获得羁绊，只需要把羁绊码发给对方，不需要实名或手机号。</p>
          </div>
          <div className="pass-code-grid">
            <div>
              <span>结果 ID</span>
              <strong>{resultId}</strong>
            </div>
            <div>
              <span>羁绊码</span>
              <strong>{bondCode}</strong>
            </div>
          </div>
          <div className="result-actions compact capture-skip">
            <button className="primary-action" type="button" onClick={saveResult}>
              保存当前结果
            </button>
            <button className="secondary-action" type="button" onClick={() => copyText(buildResultShareText(identity, result), "结果文案已复制。")}>
              复制分享文案
            </button>
            <button className="secondary-action" type="button" onClick={shareResult}>
              系统分享
            </button>
            <button className="secondary-action" type="button" onClick={captureLongShot} disabled={isCapturing}>
              {isCapturing ? "截图生成中" : "下载长截图"}
            </button>
            <button className="secondary-action" type="button" onClick={() => setPhase("bonds")}>
              去收集羁绊
            </button>
          </div>
          {shareFeedback && <p className="form-feedback" role="status">{shareFeedback}</p>}
        </article>
        <aside className="archive-panel">
          <p className="eyebrow">本机存档</p>
          <h2>已保存 {resultArchive.length} 次结果</h2>
          <div className="archive-list">
            {resultArchive.length === 0 ? (
              <p className="empty-state">还没有手动保存的档案。保存后可以对比自己哪次最像牛马，哪次最像领导体验卡。</p>
            ) : (
              resultArchive.slice(0, 5).map((entry) => (
                <article key={entry.id}>
                  <span>{entry.profileCode} · {entry.match}%</span>
                  <strong>{entry.profileName}</strong>
                  <small>{new Date(entry.savedAt).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</small>
                </article>
              ))
            )}
          </div>
        </aside>
      </section>

      <section className="dgti-section result-grid">
        <div className="result-panel">
          <p className="eyebrow">副标签</p>
          <h2>{alias} 的隐藏属性</h2>
          {topFactors.map((item) => (
            <FactorBar key={item.key} item={item} />
          ))}
        </div>
        <div className="result-panel">
          <p className="eyebrow">候选人格</p>
          <h2>不是单题定命，是 {questionBank.length} 题综合匹配</h2>
          <div className="rank-list">
            {topRoles.map(({ profile: ranked, score: rankedScore }, index) => {
              const rarity = rarityStats.byCode[ranked.code];
              return (
              <button key={ranked.code} type="button" onClick={() => setPhase("atlas")}>
                <span>{index + 1}</span>
                <strong>{ranked.name}</strong>
                <i>{rankedScore} 分 · {rarity?.label ?? "模拟中"} {rarity?.percent ?? "-"}%</i>
              </button>
              );
            })}
          </div>
        </div>
        <div className="result-panel product-callout">
          <p className="eyebrow">实体化锚点</p>
          <h2>{profile.artifact}</h2>
          <p>下单时会把人格名、角色代码、梗锚点和当前画风写入订单备注。地址与答卷仍然分开保存。</p>
          <button className="secondary-action" type="button" onClick={() => setPhase("shop")}>
            做成陶瓷小人
          </button>
        </div>
      </section>

      <section className="dgti-section result-depth">
        <div className="result-panel axis-panel">
          <p className="eyebrow">职场行为雷达</p>
          <h2>你的工位行为模型</h2>
          <p className="panel-note">这不是把 MBTI 字母硬套进职场，而是把答案归纳成四个更通用的工作行为维度；每个维度再给一个打工人梗锚点，方便你截图时一眼记住。</p>
          <div className="axis-stack">
            {axisReadings.map(({ item, value }, index) => (
              <AxisPreferenceBar key={item[0]} item={item} value={value} index={index} />
            ))}
          </div>
        </div>
        <div className="result-panel diagnosis-panel">
          <p className="eyebrow">结果拆解</p>
          <h2>为什么你会测成 {profile.name}</h2>
          <div className="analysis-grid">
            <article>
              <span>命中逻辑</span>
              <p>{deepReading?.why}</p>
            </article>
            <article>
              <span>压力模式</span>
              <p>{deepReading?.stress}</p>
            </article>
            <article>
              <span>自救建议</span>
              <p>{deepReading?.advice}</p>
            </article>
            <article>
              <span>定位说明</span>
              <p>这是有结构参考的娱乐型职场测评，用来描述稳定倾向、社交认同和羁绊互动，不等同心理诊断或职业能力评估。</p>
            </article>
          </div>
        </div>
      </section>

      <section className="dgti-section personality-manual" style={{ "--result-color": group.color, "--result-bg": group.bg }}>
        <div className="section-heading">
          <p className="eyebrow">人格详解</p>
          <h2>{profile.name} 的工位说明书</h2>
          <p>这一段专门解释结果，不只负责好笑，也负责让你知道自己为什么会这样、适合怎么合作、哪里需要保护自己。</p>
        </div>
        <div className="manual-tabs" aria-label="人格详解阅读标签">
          <span className="active">人格详解</span>
          <span>工作方式</span>
          <span>协作建议</span>
          <span>自救指南</span>
        </div>
        <div className="manual-layout">
          <article className="manual-main">
            <span>{profile.code} · {group.name}</span>
            <h3>核心画像</h3>
            <p>
              {alias} 的主模式是「{profile.name}」：{profile.copy}
              这不是给你判刑，而是在说你遇到项目、关系、压力和边界时，最容易自动启动的那套工位反应。
            </p>
            <p>
              从这次答案看，你的职场行为雷达更接近 {axisSummary}。再叠加
              {factorExtremes.top.map((item) => `「${item.label}${item.value}」`).join("、")} 这些高频信号，
              所以系统会把你推向这个角色，而不是只按某一道题定命。
            </p>
          </article>
          <aside className="manual-side">
            <h3>本命信号</h3>
            <div>
              {factorExtremes.top.map((item) => (
                <span key={item.key}>{item.label} {item.value}</span>
              ))}
            </div>
            <h3>低频信号</h3>
            <div>
              {factorExtremes.low.map((item) => (
                <span key={item.key}>{item.label} {item.value}</span>
              ))}
            </div>
          </aside>
        </div>
        <div className="manual-grid">
          <article>
            <h3>职场优势</h3>
            <p>{deepReading?.why}</p>
          <p>你的优势通常会从「{profile.traits.join(" / ")}」里冒出来：别人还在辨认局面时，你已经用自己的方式开始处理眼前的问题。</p>
          </article>
          <article>
            <h3>容易踩的坑</h3>
            <p>{deepReading?.stress}</p>
            <p>当你一直用同一种模式扛事，角色优势就会反过来消耗你。越熟练的生存方式，越需要定期检查是不是已经变成惯性。</p>
          </article>
          <article>
            <h3>协作说明书</h3>
            <p>
              和你合作时，最好把目标、边界、优先级和情绪成本都说清楚。你不怕复杂，但你讨厌无意义的消耗；
              你可以进入状态，但不应该被默认无限续航。
            </p>
            <p>适合你的羁绊入口是先交换羁绊码，再看双方是互补、同频，还是会变成工位天敌。</p>
          </article>
          <article>
            <h3>行动建议</h3>
            <ul>
              {advicePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="dgti-section answer-recap">
        <div className="section-heading">
          <p className="eyebrow">答题轨迹</p>
          <h2>你的工位反应切片</h2>
        </div>
        <div className="timeline-list">
          {questionBank.map((question, index) => {
            const answer = question.answers[answers[index]];
            return (
              <article key={`${question.chapter}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")} · {question.chapter}</span>
                <strong>{answer?.text || "未作答"}</strong>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function AtlasView({ setPhase, artStyle, setArtStyle }) {
  const rarityStats = getRoleRarityStats();

  return (
    <main className="atlas-view page-enter">
      <section className="atlas-hero">
        <div className="section-heading">
          <p className="eyebrow">{roleProfiles.length} 个打工人生态位</p>
          <h1>角色不是为了判刑，是为了让大家认领自己的班味姿势。</h1>
          <p>每个角色都有梗锚点、动作、道具和商品化方向。先统一使用 DGTI 立绘，方便测试期集中看角色识别度。</p>
        </div>
        <div className="atlas-actions">
          <StyleToggle artStyle={artStyle} onChange={setArtStyle} />
          <button className="primary-action" type="button" onClick={() => setPhase("quiz")}>
            去测试
          </button>
        </div>
      </section>
      {Object.entries(groupMeta).map(([groupKey, group]) => (
        <section className="atlas-group" key={groupKey} style={{ "--group-color": group.color, "--group-bg": group.bg }}>
          <div className="group-title">
            <span>{group.short}</span>
            <h2>{group.name}</h2>
            <p>{group.copy}</p>
          </div>
          <div className="atlas-grid">
            {roleProfiles
              .filter((profile) => profile.group === groupKey)
              .map((profile) => {
                const rarity = rarityStats.byCode[profile.code];
                return (
                <article className="type-card" key={profile.code}>
                  <CharacterArtwork profile={profile} artStyle={artStyle} size="small" />
                  <div>
                    <span>{profile.code}</span>
                    <h3>{profile.name}</h3>
                    <strong>{profile.meme}</strong>
                    {rarity && <small className="type-rarity">{rarity.label} · 模拟 {rarity.percent}%</small>}
                    <p>{profile.tagline}</p>
                  </div>
                </article>
                );
              })}
          </div>
        </section>
      ))}
    </main>
  );
}

function BondsView({ identity, result, bonds, onAddBond, onClearBonds, artStyle }) {
  const [friendCode, setFriendCode] = useState("");
  const [friendAlias, setFriendAlias] = useState("");
  const [relation, setRelation] = useState(relationOptions[0]);
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  const selfCode = makeBondCode(identity, result.profile);
  const parsedFriend = parseBondCode(friendCode);
  const preview = parsedFriend ? calculateBond(result.profile, parsedFriend.profile, relation) : null;
  const suggestions = useMemo(() => {
    const selfProfileCode = result.profile.code;
    const directMatches = bondCatalog.flatMap((bond) =>
      bond.pairs
        .filter((pair) => pair.includes(selfProfileCode))
        .map((pair) => {
          const otherCode = pair.find((code) => code !== selfProfileCode) || selfProfileCode;
          return { bond, profile: profileByCode[otherCode] };
        })
    );
    const fallbackMatches = [
      { bond: bondCatalog.find((item) => item.slug === "fish-partners"), profile: profileByCode.FISH },
      { bond: bondCatalog.find((item) => item.slug === "best-gay-friends"), profile: profileByCode.EMOHEALER },
      { bond: bondCatalog.find((item) => item.slug === "pot-allies"), profile: profileByCode.POTMAN },
      { bond: bondCatalog.find((item) => item.slug === "passing-coworkers"), profile: profileByCode.AICOWORKER }
    ];
    const seen = new Set();
    return [...directMatches, ...fallbackMatches]
      .filter((item) => item.bond && item.profile && item.profile.code !== selfProfileCode)
      .filter((item) => {
        const key = `${item.bond.slug}-${item.profile.code}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 4);
  }, [result.profile.code]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(selfCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setFeedback("复制失败，可以手动选中这串羁绊码。");
    }
  };

  const addBond = () => {
    if (!identity.allowBondBook) {
      setFeedback("你关闭了本机羁绊账本，可以回首页重新打开。");
      return;
    }
    if (!parsedFriend) {
      setFeedback("羁绊码格式不对。示例：DGTI-FISH-ABC123");
      return;
    }

    const bond = calculateBond(result.profile, parsedFriend.profile, relation);
    onAddBond({
      id: `${parsedFriend.code}-${Date.now()}`,
      relation,
      friendAlias: friendAlias.trim() || "未命名工位",
      friendCode: parsedFriend.code,
      friendType: parsedFriend.profile.name,
      score: bond.score,
      name: bond.name,
      copy: bond.copy,
      slug: bond.slug,
      createdAt: new Date().toISOString()
    });
    setFriendCode("");
    setFriendAlias("");
    setFeedback("已收入本机羁绊账本。");
  };

  const applySuggestion = (item, index) => {
    setFriendAlias(item.profile.name);
    setFriendCode(`DGTI-${item.profile.code}-DEMO${index + 1}`);
    setRelation(item.bond.slug === "cyber-client-vendor" ? "甲乙方" : "同事");
    setFeedback(`已填入 ${item.bond.name} 试算对象。`);
  };

  return (
    <main className="bonds-view page-enter">
      <section className="bond-hero">
        <div>
          <p className="eyebrow">轻量绑定用户之间的羁绊</p>
          <h1>用羁绊码连接，不用实名、手机号或公司名。</h1>
          <p>当前原型把关系记录存在本机。正式上线时再做双向确认、群体地图和隐私分层。</p>
        </div>
        <div className="self-code-panel">
          <span>你的羁绊码</span>
          <strong>{selfCode}</strong>
          <button className="secondary-action" type="button" onClick={copyCode}>
            {copied ? "已复制" : "复制羁绊码"}
          </button>
        </div>
      </section>

      <section className="dgti-section bond-flow" aria-label="获得羁绊流程">
        {[
          ["01", "先保存自己的结果", "测完会在本机留下结果档案，核心凭证是角色代码和羁绊码。"],
          ["02", "把羁绊码发给对方", "对方也测完后，把 TA 的 DGTI 码发回来，不需要任何实名绑定。"],
          ["03", "双方各自收入账本", "输入对方码后生成关系图，保存到本机羁绊账本，后续可做群体关系地图。"]
        ].map(([step, title, copy]) => (
          <article key={step}>
            <span>{step}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="dgti-section bond-lab">
        <div className="section-heading">
          <p className="eyebrow">收集一段关系</p>
          <h2>输入对方的 DGTI 羁绊码</h2>
          <p>这是用户主动输入的关系，不自动读取通讯录、不抓取社交账号，也不推测真实身份。</p>
        </div>
        <div className="bond-form">
          <label className="field-control">
            <span>对方代号，可选</span>
            <input value={friendAlias} onChange={(event) => setFriendAlias(event.target.value)} placeholder="比如：隔壁工位、项目甲方" />
          </label>
          <label className="field-control">
            <span>对方羁绊码</span>
            <input value={friendCode} onChange={(event) => setFriendCode(event.target.value)} placeholder="DGTI-FISH-ABC123" />
          </label>
          <label className="field-control">
            <span>现实关系</span>
            <select value={relation} onChange={(event) => setRelation(event.target.value)}>
              {relationOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <button className="primary-action" type="button" onClick={addBond}>
            收入羁绊账本
          </button>
        </div>
        <div className="bond-suggestions" aria-label="快捷试算羁绊">
          {suggestions.map((item, index) => (
            <button key={`${item.bond.slug}-${item.profile.code}`} type="button" onClick={() => applySuggestion(item, index)}>
              <span>{item.bond.name}</span>
              <strong>{item.profile.name}</strong>
            </button>
          ))}
        </div>
        {preview && (
          <article className="bond-preview">
            {getBondImage(preview.slug, artStyle) && (
              <img
                src={getBondImage(preview.slug, artStyle)}
                alt={`${preview.name} 羁绊关系图`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.hidden = true;
                }}
              />
            )}
            <span>{parsedFriend.profile.name}</span>
            <h3>{preview.name} · {preview.score}%</h3>
            <p>{preview.copy}</p>
          </article>
        )}
        {feedback && <p className="form-feedback" role="status">{feedback}</p>}
      </section>

      <section className="dgti-section bond-book">
        <div className="section-heading">
          <p className="eyebrow">本机羁绊账本</p>
          <h2>已收集 {bonds.length} 段关系</h2>
        </div>
        {bonds.length > 0 && (
          <button className="text-action danger" type="button" onClick={onClearBonds}>
            清空本机羁绊
          </button>
        )}
        <div className="bond-list">
          {bonds.length === 0 ? (
            <p className="empty-state">还没有羁绊。复制自己的码，发给朋友或同事，等对方测完再互相审判。</p>
          ) : (
            bonds.map((bond) => (
              <article className="bond-item" key={bond.id}>
                {getBondImage(bond.slug, artStyle) && (
                  <img
                    src={getBondImage(bond.slug, artStyle)}
                    alt={`${bond.name} 羁绊关系图`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                    }}
                  />
                )}
                <span>{bond.relation}</span>
                <h3>{bond.friendAlias} · {bond.friendType}</h3>
                <strong>{bond.name} / {bond.score}%</strong>
                <p>{bond.copy}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function ShopView({ identity, result, isComplete, addresses, orders, onSaveAddress, onPlaceOrder, setPhase, artStyle }) {
  const [selectedSku, setSelectedSku] = useState("ceramic-figure");
  const [checkoutStep, setCheckoutStep] = useState("product");
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || "");
  const [paymentMethod, setPaymentMethod] = useState("wechat");
  const [feedback, setFeedback] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [addressDraft, setAddressDraft] = useState({ name: "", phone: "", province: "", city: "", detail: "" });

  useEffect(() => {
    if (!selectedAddressId && addresses[0]?.id) setSelectedAddressId(addresses[0].id);
  }, [addresses, selectedAddressId]);

  const profile = result.profile;
  const product = shopProducts.find((item) => item.sku === selectedSku) || shopProducts[0];
  const shippingFee = product.price >= 129 ? 0 : 12;
  const total = product.price + shippingFee;
  const selectedAddress = addresses.find((item) => item.id === selectedAddressId);
  const alias = identity.alias || `匿名工位-${identity.userId.slice(0, 3)}`;

  const saveAddress = () => {
    if (!addressDraft.name.trim() || !addressDraft.phone.trim() || !addressDraft.detail.trim()) {
      setFeedback("收件人、联系电话和详细地址要填，不然小人会在快递站精神离职。");
      return;
    }
    const nextAddress = {
      id: `addr-${Date.now()}`,
      name: addressDraft.name.trim(),
      phone: addressDraft.phone.trim(),
      province: addressDraft.province.trim() || "未填写省份",
      city: addressDraft.city.trim() || "未填写城市",
      detail: addressDraft.detail.trim()
    };
    onSaveAddress(nextAddress);
    setSelectedAddressId(nextAddress.id);
    setAddressDraft({ name: "", phone: "", province: "", city: "", detail: "" });
    setFeedback("地址已保存到本机地址簿。");
  };

  const placeOrder = () => {
    if (!isComplete) {
      setFeedback("先测出自己是哪位角色，再下单本命款。");
      setPhase("quiz");
      return;
    }
    if (!selectedAddress) {
      setFeedback("先选择或新增一个收货地址。");
      setCheckoutStep("address");
      return;
    }
    const order = {
      id: `order-${Date.now()}`,
      orderNo: createOrderNo(),
      productName: product.name,
      sku: product.sku,
      profileName: profile.name,
      profileCode: profile.code,
      artStyle,
      alias,
      paymentMethod,
      itemPrice: product.price,
      shippingFee,
      total,
      status: "paid-mock",
      address: selectedAddress,
      createdAt: new Date().toISOString()
    };
    onPlaceOrder(order);
    setLastOrder(order);
    setCheckoutStep("done");
    setFeedback("模拟支付成功，真实世界还没扣你一分钱。");
  };

  return (
    <main className="shop-view page-enter">
      <section className="shop-hero">
        <div className="shop-copy">
          <p className="eyebrow">打工人 TI 陶瓷小店</p>
          <h1>把你的班味人格，烧成一尊能镇住工位的小人。</h1>
          <p>选款、地址、付款方式和订单确认都可以完整走完。当前是原型模拟支付，真实上线再接托管支付。</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => setCheckoutStep("product")}>
              选我的小人
            </button>
            <button className="secondary-action" type="button" onClick={() => setCheckoutStep("address")}>
              管理地址
            </button>
          </div>
        </div>
        <div className="shop-stage">
          <CharacterArtwork profile={profile} artStyle={artStyle} />
          <div>
            <span>{isComplete ? "你的本命款" : "示例款"}</span>
            <strong>{profile.name}</strong>
            <p>{isComplete ? profile.tagline : "先完成测试，再把这里换成你的真实结果。"}</p>
          </div>
        </div>
      </section>

      <section className="shop-steps" aria-label="购买流程">
        {[
          ["product", "商品"],
          ["address", "地址"],
          ["payment", "付款"],
          ["done", "完成"]
        ].map(([key, label], index) => (
          <button key={key} type="button" className={checkoutStep === key ? "active" : ""} onClick={() => setCheckoutStep(key)}>
            <span>{index + 1}</span>{label}
          </button>
        ))}
      </section>

      {checkoutStep === "product" && (
        <section className="dgti-section shop-section">
          <div className="section-heading">
            <p className="eyebrow">商品陈列</p>
            <h2>每一款都嵌入角色锚点，不是硬塞广告</h2>
            <p>你的结果会自然进入商品预览：角色名、代码、梗锚点、当前画风和实体道具。</p>
          </div>
          <div className="product-grid">
            {shopProducts.map((item) => (
              <article className={selectedSku === item.sku ? "shop-card selected" : "shop-card"} key={item.sku}>
                <span>{item.badge}</span>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <strong>{formatMoney(item.price)}</strong>
                <small>{item.shipping}</small>
                <button className="secondary-action" type="button" onClick={() => setSelectedSku(item.sku)}>
                  {selectedSku === item.sku ? "已选中" : "选择这款"}
                </button>
              </article>
            ))}
          </div>
          <CheckoutSummary product={product} profile={profile} shippingFee={shippingFee} total={total} onNext={() => setCheckoutStep("address")} />
        </section>
      )}

      {checkoutStep === "address" && (
        <section className="dgti-section shop-section">
          <div className="section-heading">
            <p className="eyebrow">地址管理</p>
            <h2>小人可以发货，答卷不和地址绑定</h2>
            <p>正式上线时地址进入订单系统，不和研究样本、羁绊账本混存。当前只存在本机。</p>
          </div>
          <div className="address-layout">
            <div className="address-form">
              {[
                ["name", "收件人", "name"],
                ["phone", "联系电话", "tel"],
                ["province", "省份", "address-level1"],
                ["city", "城市", "address-level2"],
                ["detail", "详细地址", "street-address"]
              ].map(([key, label, autoComplete]) => (
                <label className={`field-control ${key === "detail" ? "full-field" : ""}`} key={key}>
                  <span>{label}</span>
                  <input
                    value={addressDraft[key]}
                    onChange={(event) => setAddressDraft((current) => ({ ...current, [key]: event.target.value }))}
                    autoComplete={autoComplete}
                    inputMode={key === "phone" ? "tel" : "text"}
                  />
                </label>
              ))}
              <button className="primary-action" type="button" onClick={saveAddress}>
                保存地址
              </button>
            </div>
            <div className="address-book">
              {addresses.length === 0 ? (
                <p className="empty-state">还没有地址。小人正在窑口等待，不知道该往哪儿连滚带爬。</p>
              ) : (
                addresses.map((address) => (
                  <button
                    key={address.id}
                    type="button"
                    className={selectedAddressId === address.id ? "address-card selected" : "address-card"}
                    onClick={() => setSelectedAddressId(address.id)}
                  >
                    <strong>{address.name} · {address.phone}</strong>
                    <span>{address.province} {address.city} {address.detail}</span>
                  </button>
                ))
              )}
            </div>
          </div>
          <CheckoutSummary product={product} profile={profile} shippingFee={shippingFee} total={total} onNext={() => setCheckoutStep("payment")} />
        </section>
      )}

      {checkoutStep === "payment" && (
        <section className="dgti-section shop-section">
          <div className="section-heading">
            <p className="eyebrow">模拟付款</p>
            <h2>这里是付款流程，不是真实收款口</h2>
            <p>真实上线时支付敏感信息应交给托管支付页或支付组件处理，页面只接收支付状态。</p>
          </div>
          <div className="payment-layout">
            <div className="payment-methods" role="radiogroup" aria-label="支付方式">
              {[
                ["wechat", "微信支付", "适合 H5 承接或小程序跳转"],
                ["alipay", "支付宝", "适合网页跳转或移动端唤起"],
                ["card-sandbox", "银行卡沙盒", "真实上线时交给支付组件处理"]
              ].map(([key, label, note]) => (
                <button key={key} type="button" className={paymentMethod === key ? "payment-card selected" : "payment-card"} onClick={() => setPaymentMethod(key)}>
                  <strong>{label}</strong>
                  <span>{note}</span>
                </button>
              ))}
            </div>
            <aside className="order-review">
              <h3>订单确认</h3>
              <p>{product.name} · {profile.name} · {artStyles[artStyle]}</p>
              <p>角色锚点：{profile.meme} / {profile.artifact}</p>
              <dl>
                <div><dt>商品</dt><dd>{formatMoney(product.price)}</dd></div>
                <div><dt>运费</dt><dd>{shippingFee === 0 ? "包邮" : formatMoney(shippingFee)}</dd></div>
                <div><dt>合计</dt><dd>{formatMoney(total)}</dd></div>
              </dl>
              <p>{selectedAddress ? `${selectedAddress.name} · ${selectedAddress.province}${selectedAddress.city}${selectedAddress.detail}` : "尚未选择地址"}</p>
              <button className="primary-action" type="button" onClick={placeOrder}>
                提交模拟支付
              </button>
            </aside>
          </div>
        </section>
      )}

      {checkoutStep === "done" && (
        <section className="dgti-section order-done">
          <div className="section-heading">
            <p className="eyebrow">订单完成</p>
            <h2>你的陶瓷小人已进入赛博窑口</h2>
            <p>这是一笔模拟订单。正式接入后这里会展示支付结果、物流状态和售后入口。</p>
          </div>
          {lastOrder && (
            <article className="done-card">
              <CharacterArtwork profile={profile} artStyle={artStyle} size="tiny" />
              <div>
                <span>订单号</span>
                <strong>{lastOrder.orderNo}</strong>
                <p>{lastOrder.productName} · {lastOrder.profileName} · 合计 {formatMoney(lastOrder.total)}</p>
              </div>
            </article>
          )}
          <button className="secondary-action" type="button" onClick={() => setCheckoutStep("product")}>
            继续逛商品
          </button>
        </section>
      )}

      {feedback && <p className="shop-feedback" role="status">{feedback}</p>}

      <section className="dgti-section order-history">
        <div className="section-heading">
          <p className="eyebrow">本机订单</p>
          <h2>已生成 {orders.length} 笔模拟订单</h2>
        </div>
        <div className="order-list">
          {orders.length === 0 ? (
            <p className="empty-state">还没有订单。先把一尊小人从结果页拎进购物车。</p>
          ) : (
            orders.map((order) => (
              <article key={order.id} className="order-item">
                <span>{order.status === "paid-mock" ? "模拟已支付" : "待处理"}</span>
                <h3>{order.productName} · {order.profileName}</h3>
                <p>{order.orderNo}</p>
                <strong>{formatMoney(order.total)}</strong>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function CheckoutSummary({ product, profile, shippingFee, total, onNext }) {
  return (
    <div className="checkout-summary">
      <div>
        <span>当前小计</span>
        <strong>{formatMoney(total)}</strong>
        <p>{product.name} · {profile.name} · {profile.code}</p>
        <p>运费：{shippingFee === 0 ? "包邮" : formatMoney(shippingFee)}</p>
      </div>
      <button className="primary-action" type="button" onClick={onNext}>
        下一步
      </button>
    </div>
  );
}

export function WctiExperience() {
  const [state, setState] = useState(readStoredState);
  const quizAdvanceTimer = useRef(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => () => window.clearTimeout(quizAdvanceTimer.current), []);

  const score = useMemo(() => scoreAnswers(state.answers), [state.answers]);
  const result = useMemo(() => pickType(score), [score]);
  const isComplete = Object.keys(state.answers).length >= questionBank.length;

  const setPhase = (phase) => {
    window.clearTimeout(quizAdvanceTimer.current);
    setState((current) => ({ ...current, phase }));
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const setArtStyle = (artStyle) => {
    setState((current) => ({ ...current, artStyle: normalizeArtStyle(artStyle) }));
  };

  const updateIdentity = (patch) => {
    setState((current) => ({ ...current, identity: { ...current.identity, ...patch } }));
  };

  const startQuiz = () => {
    setState((current) => ({
      ...current,
      phase: "quiz",
      identity: { ...current.identity, alias: current.identity.alias.trim() }
    }));
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const setAnswer = (questionIndex, answerIndex) => {
    setState((current) => ({ ...current, answers: { ...current.answers, [questionIndex]: answerIndex } }));
  };

  const selectAnswerAndAdvance = (questionIndex, answerIndex) => {
    window.clearTimeout(quizAdvanceTimer.current);
    setAnswer(questionIndex, answerIndex);
    quizAdvanceTimer.current = window.setTimeout(() => {
      setState((current) => {
        const answers = { ...current.answers, [questionIndex]: answerIndex };
        if (questionIndex >= questionBank.length - 1) {
          return { ...current, answers, currentIndex: questionIndex, phase: "result" };
        }
        return {
          ...current,
          answers,
          currentIndex: Math.min(questionIndex + 1, questionBank.length - 1)
        };
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 680);
  };

  const advanceQuiz = () => {
    window.clearTimeout(quizAdvanceTimer.current);
    if (state.answers[state.currentIndex] === undefined) return;
    if (state.currentIndex >= questionBank.length - 1) {
      setPhase("result");
      return;
    }
    setState((current) => ({ ...current, currentIndex: Math.min(current.currentIndex + 1, questionBank.length - 1) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousQuestion = () => {
    window.clearTimeout(quizAdvanceTimer.current);
    setState((current) => ({ ...current, currentIndex: Math.max(current.currentIndex - 1, 0) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetQuiz = () => {
    window.clearTimeout(quizAdvanceTimer.current);
    if (Object.keys(state.answers).length > 0 && !window.confirm("确定重新测吗？当前答题进度会清空。")) return;
    setState((current) => ({ ...current, answers: {}, currentIndex: 0, phase: "quiz" }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveCurrentResult = () => {
    const entry = createResultArchiveEntry(state.identity, score, result, state.artStyle, state.answers);
    setState((current) => {
      const archive = current.resultArchive || [];
      const deduped = archive.filter((item) => item.answerKey !== entry.answerKey || item.profileCode !== entry.profileCode);
      return { ...current, resultArchive: [entry, ...deduped].slice(0, 5) };
    });
  };

  return (
    <div className={`dgti-page phase-${state.phase}`}>
      <Header
        phase={state.phase}
        setPhase={setPhase}
        isComplete={isComplete}
        artStyle={state.artStyle}
        setArtStyle={setArtStyle}
      />
      {state.phase === "home" && (
        <HomeView
          identity={state.identity}
          onIdentityChange={updateIdentity}
          onStart={startQuiz}
          setPhase={setPhase}
          hasAnswers={Object.keys(state.answers).length > 0}
          artStyle={state.artStyle}
          setArtStyle={setArtStyle}
        />
      )}
      {state.phase === "quiz" && (
        <QuizView
          answers={state.answers}
          currentIndex={state.currentIndex || 0}
          onSelectAnswer={selectAnswerAndAdvance}
          crowdSignal={state.crowdSignal}
          onNext={advanceQuiz}
          onPrevious={previousQuestion}
          onReset={resetQuiz}
          setPhase={setPhase}
        />
      )}
      {state.phase === "result" && isComplete && (
        <ResultView
          identity={state.identity}
          score={score}
          result={result}
          answers={state.answers}
          setPhase={setPhase}
          artStyle={state.artStyle}
          setArtStyle={setArtStyle}
          resultArchive={state.resultArchive || []}
          onSaveResult={saveCurrentResult}
        />
      )}
      {state.phase === "result" && !isComplete && (
        <HomeView
          identity={state.identity}
          onIdentityChange={updateIdentity}
          onStart={startQuiz}
          setPhase={setPhase}
          hasAnswers={Object.keys(state.answers).length > 0}
          artStyle={state.artStyle}
          setArtStyle={setArtStyle}
        />
      )}
      {state.phase === "atlas" && <AtlasView setPhase={setPhase} artStyle={state.artStyle} setArtStyle={setArtStyle} />}
      {state.phase === "bonds" && isComplete && (
        <BondsView
          identity={state.identity}
          result={result}
          bonds={state.bonds || []}
          onAddBond={(bond) => setState((current) => ({ ...current, bonds: [bond, ...(current.bonds || [])].slice(0, 24) }))}
          onClearBonds={() => setState((current) => ({ ...current, bonds: [] }))}
          artStyle={state.artStyle}
        />
      )}
      {state.phase === "bonds" && !isComplete && (
        <HomeView
          identity={state.identity}
          onIdentityChange={updateIdentity}
          onStart={startQuiz}
          setPhase={setPhase}
          hasAnswers={Object.keys(state.answers).length > 0}
          artStyle={state.artStyle}
          setArtStyle={setArtStyle}
        />
      )}
      {state.phase === "shop" && (
        <ShopView
          identity={state.identity}
          result={result}
          isComplete={isComplete}
          addresses={state.addresses || []}
          orders={state.orders || []}
          onSaveAddress={(address) => setState((current) => ({ ...current, addresses: [address, ...(current.addresses || [])].slice(0, 8) }))}
          onPlaceOrder={(order) => setState((current) => ({ ...current, orders: [order, ...(current.orders || [])].slice(0, 12) }))}
          setPhase={setPhase}
          artStyle={state.artStyle}
        />
      )}
    </div>
  );
}
