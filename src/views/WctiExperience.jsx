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
import { calculateBond, getBondImage, parseBondCode } from "../lib/dgtiBonds.js";
import { clamp, getFactorLevel, getRoleRarityStats, getTopFactors, pickType, scoreAnswers } from "../lib/dgtiScoring.js";

const profileByCode = Object.fromEntries(roleProfiles.map((profile) => [profile.code, profile]));
const crowdSignals = ["6 / 38", "17 / 38", "29 / 38"];
const publicArtStyleKeys = ["mbti"];
const optionLetters = ["A", "B", "C", "D", "E"];
const tipQrImage = "assets/dgti/shop/alipay-tip-qr.jpg";
const tipPresets = [2.33, 6.66, 8.88, 18.88, 66.66];

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

const rolePlaybooks = {
  CHOSEN: {
    shine: "最适合出现在项目没人认领、需求一团乱、老板只会说“你看着办”的现场。你会先把事情拆成能动的几步，让空气重新有方向。",
    trap: "最大风险是被默认成“万能补位”。你越靠谱，别人越容易少想一步，最后全组都在等你兜底。",
    cooperate: "给你明确目标、截止时间、拍板人和优先级，你能跑很快；只给一句“辛苦一下”，你会越干越像被献祭。"
  },
  COWHORSE: {
    shine: "你胜在稳定，适合处理那些没人想做但必须有人做的脏活累活。嘴上可以骂，交付基本不会掉地上。",
    trap: "你容易把“能忍”误会成“应该忍”。长期这样会从可靠变成麻木，最后连自己被消耗都懒得解释。",
    cooperate: "别只夸你“靠谱”，要给资源、排期和明确分工。牛马不是永动机，饲料和休息都要算进项目成本。"
  },
  FISH: {
    shine: "你擅长在无效信息里保护电量，能避开很多假紧急、假同步、假奋斗。真要动的时候，你通常会找最省力的路径。",
    trap: "如果低功耗变成长期隐身，别人会把你当不在线。摸鱼没问题，问题是连最小交代都不留。",
    cooperate: "给你清楚边界和交付口径，你会安静完成；频繁拉会、反复改口、制造表演型忙碌，会直接把你逼进小窗。"
  },
  TRAITOR: {
    shine: "你很会读场面，知道什么时候该向上同步、什么时候该把话说得像能进周报。混乱场里，你能快速找到权力口径。",
    trap: "你一旦过度向上，身边人会觉得你像老板插件。不是每句“格局打开”都需要被说出口。",
    cooperate: "让你做对外沟通或向上包装很合适，但要提醒你保留同事侧事实，别把求生话术讲成价值观。"
  },
  POTMAN: {
    shine: "事故现场你反应快，能先把锅盖举起来，不让问题继续乱飞。你适合做风险缓冲和临时止损。",
    trap: "你太容易先接住，导致责任线没画清。锅接多了，别人会以为锅本来就是你的。",
    cooperate: "请你救场时，要同步写清责任归属和后续复盘。你可以帮忙接一下，但不能永远背着走。"
  },
  SHIFTER: {
    shine: "你擅长把模糊责任拆清楚：谁提的、谁拍的、谁验收、谁该接。很多糊涂账到你这里会被迫见光。",
    trap: "如果只顾甩干净，容易显得阴险和不协作。责任不该你背，但关系也不一定要被你一脚踢翻。",
    cooperate: "和你合作最好全程留痕、口径清楚。别拿“顺手”试探你，你会把顺手拆成流程单。"
  },
  FIREFIGHTER: {
    shine: "系统报警、群里开席、客户催命时，你会先冲进去止血。你不是不怕，是知道再不动就真炸了。",
    trap: "救火救多了，公司会把你当消防设施。每次都靠你临时补洞，说明机制已经烂了。",
    cooperate: "让你救火可以，但救完必须复盘、补责任人、补预防机制。不然下一次还是同一个坑换个皮。"
  },
  CRISPY: {
    shine: "你对消耗很敏感，能提前感知“这个活会把人干碎”。你的谨慎不是矫情，是血条雷达。",
    trap: "你容易一边快碎了，一边还不好意思说。最后别人以为你还能撑，你自己已经掉线。",
    cooperate: "给你稳定节奏、明确预期和缓冲时间，你会好很多。临时加塞、情绪施压、连环拉群最容易把你打碎。"
  },
  BOUNDARY: {
    shine: "你很适合守范围、守下班、守验收标准。别人一句“很快的”，你会本能检查它是不是会快到下周。",
    trap: "边界太硬时，别人可能只感受到拒绝，没听懂你的真实意思是“别靠消耗维持合作”。",
    cooperate: "找你帮忙要说清范围和交换条件。你不是不能帮，是讨厌被“顺手文学”偷走人生。"
  },
  LEADERCARD: {
    shine: "你能快速把散乱信息变成安排，适合推进、拍节奏、抓下一步。现场没主心骨时，你会自动上线。",
    trap: "最大问题是压迫感可能比权力先到。你以为在推进，别人可能觉得被你管理了。",
    cooperate: "让你负责推进可以，但要给真实授权和反馈入口。否则你容易拿着体验卡演成正式领导。"
  },
  PPTGOD: {
    shine: "你擅长把混乱包装成清楚的叙事，尤其适合汇报、方案、复盘和对外讲故事。空气到你手里都能有页码。",
    trap: "漂亮结构会让问题显得已经解决，但落地还在原地。PPT 飞剑很帅，别拿它替代行动。",
    cooperate: "给你材料、目标听众和决策问题，你能做出好东西。只给一句“先出一版”，你会被迫炼空气。"
  },
  MEETINGBOT: {
    shine: "你能把分歧拉到桌面上，适合处理多人协作和口径不一致。没人说话时，你会试图让事情流动起来。",
    trap: "你容易把“开过会”误会成“推进了”。会越多，真正该拍板的人越可能躲在日历后面。",
    cooperate: "会前给议题，会中定结论，会后写 owner。否则你只是给大家的日历增加工伤。"
  },
  WISHPOOL: {
    shine: "你有想象力，能看到别人没想到的可能性，适合早期脑暴、产品方向和体验升级。",
    trap: "你口中的“顺便”，常常是别人下周的加班。愿望如果没有优先级，就是需求污染。",
    cooperate: "让你提想法很好，但每个愿望后面要跟预算、优先级和砍掉什么。神灯也要看排期。"
  },
  STIRRER: {
    shine: "你能让死气沉沉的局面突然有反应，适合破冰、锐评、指出大家不敢说的问题。",
    trap: "你点火很快，但火不一定烧在该烧的地方。场面活了，不代表事情变好了。",
    cooperate: "需要你说真话时很好用，但要先约定边界。别把会议搅成连续剧，大家第二天还要上班。"
  },
  SHITMOUNTAIN: {
    shine: "你适合处理历史遗留、旧系统、前任留下的坑。别人看到报错想跑，你会开始考古。",
    trap: "你越会修旧坑，越容易被扔进更深的坑。修到最后，你可能也变成下一代口中的前任。",
    cooperate: "给你时间、权限和旧资料，别只说“你研究一下”。屎山不是靠热爱移平的，是靠范围和记录。"
  },
  TWOFACE: {
    shine: "你很懂场合和对象，能根据领导、同事、甲方切换表达。复杂关系里，你的生存能力很强。",
    trap: "切换太丝滑时，别人会怀疑哪个版本才是真的你。话术救命，也可能透支信任。",
    cooperate: "适合让你做沟通缓冲，但关键立场要提前说清楚。别让你一个人同时扮演两边的人。"
  },
  ALIVE: {
    shine: "你能让群聊、会议和项目现场重新像有人类存在。适合热场、协调氛围、把冷掉的关系捞回来。",
    trap: "你容易被默认负责气氛，最后别人都沉默，只有你在供电。活人感也会耗电。",
    cooperate: "别只让你暖场，也要让你参与决策。你不是气氛挂件，你也有自己的判断。"
  },
  EMOHEALER: {
    shine: "你能接住别人的情绪，适合团队低气压、同事崩溃、冲突后的修复。你会让人觉得还能撑一下。",
    trap: "你容易把别人的崩溃都接到自己身上。情绪价值供应太久，会变成无薪客服。",
    cooperate: "向你倾诉可以，但别把你当垃圾桶。真正的问题要回到流程、资源和责任上。"
  },
  SILENTGOD: {
    shine: "你话少但信息密度高，适合查证据、找旧版本、处理需要安静判断的事。关键时刻你常有救命文件。",
    trap: "你太安静时，功劳和边界都会被别人顺手拿走。沉默很强，但不能替你自动留名。",
    cooperate: "给你明确问题和安静空间，你能产出硬东西。不要逼你在没证据时表态，你会直接静音。"
  },
  AICOWORKER: {
    shine: "你稳定、礼貌、可预测，适合标准流程、重复沟通和需要低波动的协作。你很少制造额外情绪成本。",
    trap: "太预制会让人觉得你没真实反应。稳定是优点，但过度模板会显得像自动回复。",
    cooperate: "给你清晰模板和规则，你会很稳；需要创意或情绪判断时，要允许你跳出默认话术。"
  }
};

const roleMisreads = {
  CHOSEN: "别人容易把你的能干看成理所当然，忘了你也是被推上主线的人。",
  COWHORSE: "别人会以为你骂归骂但总会做，于是默认你没边界。",
  FISH: "别人会把你的省电看成摆烂，但你很多时候是在过滤无效消耗。",
  TRAITOR: "别人会怀疑你站老板那边，其实你有时只是更早看懂了风向。",
  POTMAN: "别人会以为锅到你身上最稳，久了连你自己都忘了锅从哪飞来的。",
  SHIFTER: "别人会说你滑，其实你最讨厌的是不清不楚地被人写进责任链。",
  FIREFIGHTER: "别人会以为你天生爱救火，但你只是受不了现场继续烂下去。",
  CRISPY: "别人会以为你脆弱，其实你只是比别人更早听见身体和情绪报警。",
  BOUNDARY: "别人会以为你冷，其实你是在保护合作不要靠透支维持。",
  LEADERCARD: "别人会以为你想管人，其实你经常只是看不下去事情没人推进。",
  PPTGOD: "别人会以为你只会包装，其实你是在给混乱找一个能被理解的入口。",
  MEETINGBOT: "别人会以为你爱开会，其实你害怕的是没人拍板还假装推进。",
  WISHPOOL: "别人会以为你只会许愿，其实你看见的是体验还能再往上走一点。",
  STIRRER: "别人会以为你故意搅局，其实你常常先看见了桌面下的矛盾。",
  SHITMOUNTAIN: "别人会以为你和烂摊子绑定，其实你只是太会从废墟里找线头。",
  TWOFACE: "别人会以为你不真诚，其实你是在不同权力温度里保护自己。",
  ALIVE: "别人会以为你永远有电，其实你只是先把场子救活了。",
  EMOHEALER: "别人会以为你很好倾倒，其实你的耐心也有库存。",
  SILENTGOD: "别人会以为你没意见，其实你只是不想在信息不全时乱开麦。",
  AICOWORKER: "别人会以为你没灵魂，其实你是在用稳定降低协作摩擦。"
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
    donations: [],
    crowdSignal: crowdSignals[Math.floor(Math.random() * crowdSignals.length)]
  };
}

function readStoredState() {
  if (typeof window === "undefined") return getFallbackState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getFallbackState();
    const stored = { ...getFallbackState(), ...JSON.parse(raw) };
    return { ...stored, phase: stored.phase === "atlas" ? "home" : stored.phase, artStyle: normalizeArtStyle(stored.artStyle) };
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

function formatMoney(value) {
  return `¥${value.toFixed(0)}`;
}

function formatTipMoney(value) {
  const amount = Number(value) || 0;
  return `¥${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}

function createOrderNo() {
  return `DGTI${Date.now().toString().slice(-8)}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

function createTipNo() {
  return `TIP${Date.now().toString().slice(-7)}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;
}

function getDonationStats(donations = []) {
  return donations.reduce(
    (stats, donation) => {
      const amount = Number(donation.amount) || 0;
      return {
        count: stats.count + 1,
        total: stats.total + amount,
        max: Math.max(stats.max, amount)
      };
    },
    { count: 0, total: 0, max: 0 }
  );
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

function CompactAxisBar({ item, value, index }) {
  const reading = getAxisReading(item, value);
  const rightScore = Math.round(clamp(value, 0, 100));
  const leftScore = 100 - rightScore;
  const isRight = rightScore >= leftScore;
  return (
    <div className="compact-axis-row">
      <div>
        <span>{String(index + 1).padStart(2, "0")} · {reading.axisName}</span>
        <strong>{reading.label}</strong>
      </div>
      <div className="compact-axis-balance" aria-label={`${reading.axisName} ${reading.leftLabel} ${leftScore} 分，${reading.rightLabel} ${rightScore} 分`}>
        <div className="compact-axis-labels">
          <span className={!isRight ? "is-active" : ""}>{reading.leftLabel} {leftScore}</span>
          <span className={isRight ? "is-active" : ""}>{rightScore} {reading.rightLabel}</span>
        </div>
        <div className="compact-axis-track">
          <i className={!isRight ? "axis-left is-active" : "axis-left"} style={{ width: `${leftScore}%` }} />
          <i className={isRight ? "axis-right is-active" : "axis-right"} style={{ width: `${rightScore}%` }} />
        </div>
      </div>
      <em>{reading.letter}</em>
    </div>
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

function getDominantAxisDetails(axisReadings) {
  return axisReadings
    .map(({ item, value }) => {
      const reading = getAxisReading(item, value);
      const rightScore = Math.round(clamp(value, 0, 100));
      return {
        ...reading,
        leftScore: 100 - rightScore,
        rightScore,
        strength: Math.abs(value - 50)
      };
    })
    .sort((left, right) => right.strength - left.strength);
}

function buildAdvicePoints(profile, score, topFactors, axisReadings) {
  const points = [
    `别把“${profile.meme}”当人设锁死，它只是你最容易露馅的工位反应。`,
    `你最突出的信号是${topFactors.slice(0, 3).map((item) => `「${item.label}」`).join("、")}，也是最容易被同事和老板盯上的地方。`
  ];

  if ((score.factors.boundary || 0) < 45) {
    points.push("少裸奔式答应。说“我可以”之前，先补范围、时间和交付标准。");
  } else if ((score.factors.boundary || 0) >= 70) {
    points.push("你很会守门，但拒绝时丢一个替代方案，会少很多无效拉扯。");
  }

  if ((score.factors.fish || 0) >= 64) {
    points.push("摸鱼可以，消失不行。留一个可见小闭环，低功耗也算推进。");
  }

  if ((score.factors.bossy || 0) >= 64) {
    points.push("领导味上来时少讲大词，多给谁来做、何时交、下一步。");
  }

  if ((score.factors.repair || 0) >= 64) {
    points.push("别把自己做成情绪客服。能听是一回事，该走机制还是要走机制。");
  }

  const structure = axisReadings.find(({ item }) => item[0] === "structure")?.value ?? 50;
  if (structure < 42) {
    points.push("你能边跑边补，但多人协作时至少留一条钉单线，别让大家靠心电感应。");
  } else if (structure > 58) {
    points.push("你适合钉闭环，但别把每个变化都当事故，留一点转弯空间。");
  }

  return points.slice(0, 5);
}

function Header({ phase, setPhase, isComplete, artStyle, setArtStyle }) {
  const nav = [
    ["home", "首页"],
    ["quiz", "开测"],
    ["result", "结果"],
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

function HomeView({ identity, onIdentityChange, onStart, setPhase, hasAnswers, artStyle }) {
  const heroProfiles = [profileByCode.FISH, profileByCode.BOUNDARY, profileByCode.LEADERCARD, profileByCode.EMOHEALER];
  const scrollToRoleAtlas = () => document.getElementById("home-role-atlas")?.scrollIntoView({ behavior: "smooth", block: "start" });

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
            <button className="secondary-action" type="button" onClick={scrollToRoleAtlas}>
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
              onClick={scrollToRoleAtlas}
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

      <RoleAtlasSection
        artStyle={artStyle}
        setPhase={setPhase}
      />
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

function ResultView({ identity, score, result, setPhase, artStyle, setArtStyle, resultArchive, onSaveResult }) {
  const { profile, match, topRoles } = result;
  const group = groupMeta[profile.group];
  const rarityStats = getRoleRarityStats();
  const currentRarity = rarityStats.byCode[profile.code];
  const alias = identity.alias || `匿名工位-${identity.userId.slice(0, 3)}`;
  const topFactors = getTopFactors(score.factors, factorMeta.length);
  const bondCode = makeBondCode(identity, profile);
  const deepReading = roleDeepReadings[profile.code];
  const playbook = rolePlaybooks[profile.code];
  const axisReadings = axisMeta.map((item) => ({ item, value: score.axes?.[item[0]] ?? 50 }));
  const factorExtremes = getFactorExtremes(score.factors);
  const axisSummary = getAxisSummary(axisReadings);
  const dominantAxes = getDominantAxisDetails(axisReadings).slice(0, 2);
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

  const openRoleAtlas = () => {
    setPhase("home");
    window.setTimeout(() => document.getElementById("home-role-atlas")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
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
          <p className="result-code">{profile.code} · 匹配度 {match}% · 稀有度参考 {currentRarity?.percent ?? "-"}%</p>
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
            <button className="secondary-action" type="button" onClick={openRoleAtlas}>
              查看图鉴
            </button>
          </div>
        </div>
      </section>

      <section className="dgti-section result-vault-section">
        <article className="result-pass" style={{ "--result-color": group.color, "--result-bg": group.bg }}>
          <div>
            <p className="eyebrow">羁绊凭证</p>
            <h2>把这串码甩给同事，看看你们是什么关系。</h2>
            <p>不实名，不绑公司。对方测完后互填羁绊码，就能开出战友、搭子、天敌或上下游孽缘。</p>
          </div>
          <div className="pass-code-grid">
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
            <button className="secondary-action" type="button" onClick={() => setPhase("bonds")}>
              去收集羁绊
            </button>
          </div>
          {shareFeedback && <p className="form-feedback" role="status">{shareFeedback}</p>}
        </article>
        <aside className="archive-panel">
          <p className="eyebrow">本机存档</p>
          <h2>保存这次班味</h2>
          <div className="archive-list">
            {resultArchive.length === 0 ? (
              <p className="empty-state">还没存档。今天像牛马，明天像领导体验卡，都可以留下案底。</p>
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
        <div className="result-panel compact-axis-panel">
          <p className="eyebrow">四维评估</p>
          <h2>工位雷达</h2>
          <div className="compact-axis-stack">
            {axisReadings.map(({ item, value }, index) => (
              <CompactAxisBar key={item[0]} item={item} value={value} index={index} />
            ))}
          </div>
        </div>
        <div className="result-panel">
          <p className="eyebrow">最明显的班味</p>
          <h2>别全看，先看前三个</h2>
          {topFactors.slice(0, 3).map((item) => (
            <FactorBar key={item.key} item={item} />
          ))}
        </div>
        <div className="result-panel">
          <p className="eyebrow">差点成为</p>
          <h2>你的备选工位皮肤</h2>
          <div className="rank-list">
            {topRoles.slice(1, 4).map(({ profile: ranked, score: rankedScore }, index) => {
              const rarity = rarityStats.byCode[ranked.code];
              return (
              <button key={ranked.code} type="button" onClick={openRoleAtlas}>
                <span>{index + 2}</span>
                <strong>{ranked.name}</strong>
                <i>{rankedScore} 分 · {rarity?.label ?? "模拟中"} {rarity?.percent ?? "-"}%</i>
              </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dgti-section personality-manual" style={{ "--result-color": group.color, "--result-bg": group.bg }}>
        <div className="section-heading">
          <p className="eyebrow">人格详解</p>
          <h2>{profile.name} 的工位说明书</h2>
          <p>不是一句“你很牛马”就结束。这里拆你的启动方式、消耗来源、协作雷区和自救动作。</p>
        </div>
        <div className="manual-layout">
          <article className="manual-main">
            <span>{profile.code} · {group.name}</span>
            <h3>核心画像</h3>
            <p>
              {alias} 这次测出来是「{profile.name}」：{profile.copy}
            </p>
            <p>
              关键证据是 {factorExtremes.top.map((item) => `「${item.label}${item.value}」`).join("、")}。
              你的选择更偏 {axisSummary}，所以不像随机抽签，更像工位本能露馅。
            </p>
            <p>
              这类人最典型的状态不是一直这样，而是在特定压力下会自动切到这套模式：有人甩锅、需求失控、会议空转、同事崩溃，或者任务突然没人认领。
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
            <span>01</span>
            <h3>触发场景</h3>
            <p>{playbook?.shine}</p>
            <p>只要现场出现“没人认领、边界模糊、情绪快炸、需求开始漂移”这类情况，你就容易从普通同事切到这个人格模式。</p>
          </article>
          <article>
            <span>02</span>
            <h3>默认动作</h3>
            <p>{deepReading?.why}</p>
            <p>
              你最容易露出来的动作是 {factorExtremes.top.map((item) => `「${item.label} ${item.value}」`).join("、")}。
              这几个分数高，说明你不是只在某一题装了一下，而是多种场景里都反复选到了同一种反应。
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>四维解释</h3>
            <p>
              你最明显的两条轴是 {dominantAxes.map((axis) => `「${axis.axisName}：${axis.label} ${Math.round(axis.value)}」`).join("、")}。
              它们解释的是你的做事入口：先保护血条，还是先冲上场；先查证据，还是先搭故事；先接住现场，还是先切清责任。
            </p>
            <p>所以最终人格不是靠一句梗硬贴，而是由角色命中、副标签和四维倾向一起推出来。</p>
          </article>
          <article>
            <span>04</span>
            <h3>别人容易误会</h3>
            <p>{roleMisreads[profile.code]}</p>
            <p>这就是这个人格最容易被贴错标签的地方：别人只看到你的外显动作，看不到你为什么这么反应。</p>
          </article>
          <article>
            <span>05</span>
            <h3>消耗来源</h3>
            <p>{deepReading?.stress}</p>
            <p>{playbook?.trap}</p>
            <p>一旦这种模式被团队当成默认配置，你会开始从“发挥优势”变成“被优势反噬”。</p>
          </article>
          <article>
            <span>06</span>
            <h3>协作方式</h3>
            <p>{playbook?.cooperate}</p>
            <p>和你合作，目标、边界、优先级要说人话。你能配合，但不适合被一句“辛苦一下”无限续杯。</p>
            <p>想看你和别人是搭子还是天敌，就去互换羁绊码。</p>
          </article>
          <article>
            <span>07</span>
            <h3>自救建议</h3>
            <ul>
              {advicePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

function RoleAtlasSection({ setPhase, artStyle }) {
  const rarityStats = getRoleRarityStats();

  return (
    <section className="dgti-section home-role-atlas" id="home-role-atlas">
      <div className="atlas-hero">
        <div className="section-heading">
          <p className="eyebrow">{roleProfiles.length} 个打工人生态位</p>
          <h1>打工人角色图鉴</h1>
          <p>每个角色都有自己的梗锚点、动作道具和工位气质。先看谁最像你，再去测试看系统怎么判。</p>
        </div>
        <div className="atlas-actions">
          <button className="primary-action" type="button" onClick={() => setPhase("quiz")}>
            去测试
          </button>
        </div>
      </div>
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
    </section>
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
  const collectedSlugs = useMemo(() => new Set(bonds.map((bond) => bond.slug)), [bonds]);
  const previewImage = preview ? getBondImage(preview.slug, artStyle) : "";
  const unlockedCount = bondCatalog.filter((bond) => collectedSlugs.has(bond.slug)).length;

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
      selfType: result.profile.name,
      friendType: parsedFriend.profile.name,
      friendTypeCode: parsedFriend.profile.code,
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

  return (
    <main className="bonds-view page-enter">
      <section className="bond-hero">
        <div>
          <p className="eyebrow">轻量绑定用户之间的羁绊</p>
          <h1>用羁绊码连接，不用实名、手机号或公司名。</h1>
          <p>把你的羁绊码发给对方，对方测完把 TA 的码发回来，输入后就能生成一张可保存的关系卡。</p>
        </div>
        <div className="self-code-panel">
          <div className="self-pass-card">
            <div className="self-pass-art">
              <CharacterArtwork profile={result.profile} artStyle={artStyle} size="small" />
            </div>
            <div>
              <span>我的打工人人格</span>
              <strong>{result.profile.name}</strong>
              <p>{result.profile.meme}</p>
            </div>
          </div>
          <div className="self-code-block">
            <span>我的羁绊码</span>
            <strong>{selfCode}</strong>
          </div>
          <button className="secondary-action" type="button" onClick={copyCode}>
            {copied ? "已复制" : "复制羁绊码"}
          </button>
          <div className="bond-progress">
            <span>图鉴进度</span>
            <strong>{unlockedCount} / {bondCatalog.length}</strong>
            <i style={{ width: `${(unlockedCount / bondCatalog.length) * 100}%` }} />
          </div>
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
          <h2>交换羁绊卡</h2>
          <p>填入对方发来的羁绊码，右侧会先开出关系卡；确认是这位同事，再收入本机账本。</p>
        </div>
        <div className="bond-lab-grid">
          <div className="bond-form-panel">
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
            <div className="bond-form-note">
              {preview ? (
                <span>已识别：{parsedFriend.profile.name}，这张关系卡可以保存了。</span>
              ) : (
                <span>格式示例：DGTI-FISH-ABC123。只存在本机，不读取通讯录。</span>
              )}
            </div>
            {feedback && <p className="form-feedback" role="status">{feedback}</p>}
          </div>
          <article className={preview ? "bond-preview" : "bond-preview bond-preview-empty"} data-unlocked={preview && collectedSlugs.has(preview.slug) ? "true" : "false"}>
            {preview && previewImage && (
              <img
                src={previewImage}
                alt={`${preview.name} 羁绊关系图`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.hidden = true;
                }}
              />
            )}
            <div>
              <span>{preview ? `${result.profile.name} × ${parsedFriend.profile.name}` : "等待对方羁绊码"}</span>
              <h3>{preview ? `${preview.name} · ${preview.score}%` : "输入后开卡"}</h3>
              <p>{preview ? preview.copy : "这里会展示关系图、匹配度和一句能发给对方看的吐槽，确认后再保存。"}</p>
              {preview && <small>{collectedSlugs.has(preview.slug) ? "图鉴已解锁，再收一位也算新关系。" : "收入账本后会点亮这张羁绊图。"}</small>}
            </div>
          </article>
        </div>
      </section>

      <section className="dgti-section bond-book">
        <div className="section-heading">
          <p className="eyebrow">本机羁绊账本</p>
          <h2>已保存 {bonds.length} 段关系</h2>
        </div>
        {bonds.length > 0 && (
          <button className="text-action danger" type="button" onClick={onClearBonds}>
            清空本机羁绊
          </button>
        )}
        <div className="bond-list">
          {bonds.length === 0 ? (
            <p className="empty-state">还没有保存的羁绊。输入对方羁绊码，先生成卡片，再收入账本。</p>
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
                <h3>{bond.name} · {bond.score}%</h3>
                <strong>{bond.selfType || result.profile.name} × {bond.friendAlias}（{bond.friendType}）</strong>
                <p>{bond.copy}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="dgti-section bond-gallery">
        <div className="section-heading">
          <p className="eyebrow">羁绊图鉴</p>
          <h2>已解锁 {unlockedCount} / {bondCatalog.length} 种羁绊</h2>
          <p>每保存一段新的关系，就会点亮对应羁绊图。未解锁的先保持神秘，等同事发码来开。</p>
        </div>
        <div className="bond-gallery-grid">
          {bondCatalog.map((bond) => {
            const unlocked = collectedSlugs.has(bond.slug);
            const image = getBondImage(bond.slug, artStyle);
            return (
              <article className={unlocked ? "bond-gallery-card is-unlocked" : "bond-gallery-card"} key={bond.slug}>
                {image && <img src={image} alt={`${bond.name} 羁绊图`} loading="lazy" />}
                <div>
                  <span>{unlocked ? "已解锁" : "待收集"}</span>
                  <h3>{bond.name}</h3>
                  <p>{unlocked ? bond.copy : "交换羁绊码后点亮。"}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function TipJar({ identity, profile, donations, onAddDonation }) {
  const [amount, setAmount] = useState("8.88");
  const [message, setMessage] = useState("");
  const [thanks, setThanks] = useState("");
  const stats = getDonationStats(donations);
  const alias = identity.alias || `匿名工位-${identity.userId.slice(0, 3)}`;
  const lastDonation = donations[0];

  const recordDonation = () => {
    const value = Number.parseFloat(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setThanks("先填一个有效金额，不然系统只能识别到一阵心意。");
      return;
    }
    const normalizedAmount = Math.round(value * 100) / 100;
    const donation = {
      id: `tip-${Date.now()}`,
      tipNo: createTipNo(),
      amount: normalizedAmount,
      message: message.trim(),
      alias,
      profileName: profile.name,
      profileCode: profile.code,
      createdAt: new Date().toISOString()
    };
    onAddDonation(donation);
    setMessage("");
    setThanks(`收到 ${formatTipMoney(normalizedAmount)} 的蚂蚁森林能量，感谢 ${alias} 给打工人 TI 续命。`);
  };

  return (
    <section className="dgti-section tip-jar-section" id="dgti-tip-jar">
      <div className="tip-jar-card">
        <div className="tip-copy">
          <p className="eyebrow">打赏回血站</p>
          <h2>觉得测得有点准，就给项目投喂一口能量。</h2>
          <p>扫码后网页无法自动验账。你可以把金额登记进本机账本，页面会统计支持次数和金额，并回一句像样的感谢。</p>
          <div className="tip-stats" aria-label="本机打赏统计">
            <span><strong>{stats.count}</strong> 次支持</span>
            <span><strong>{formatTipMoney(stats.total)}</strong> 本机累计</span>
            <span><strong>{stats.max ? formatTipMoney(stats.max) : "待点亮"}</strong> 单次最高</span>
          </div>
        </div>

        <div className="tip-qr-panel">
          <img src={tipQrImage} alt="支付宝打赏收款码" loading="lazy" />
          <span>打开支付宝扫一扫</span>
        </div>

        <div className="tip-form">
          <div className="tip-presets" aria-label="选择打赏金额">
            {tipPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                className={Number(amount) === preset ? "active" : ""}
                onClick={() => setAmount(String(preset))}
              >
                {formatTipMoney(preset)}
              </button>
            ))}
          </div>
          <label className="field-control">
            <span>实际打赏金额</span>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              aria-label="实际打赏金额"
            />
          </label>
          <label className="field-control">
            <span>感谢回执备注</span>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={36}
              placeholder="比如：摸鱼圣体前来续命"
            />
          </label>
          <button className="primary-action" type="button" onClick={recordDonation}>
            我已打赏，登记回血
          </button>
          {(thanks || lastDonation) && (
            <p className="tip-thanks" role="status">
              {thanks || `${lastDonation.alias} 刚刚支持了 ${formatTipMoney(lastDonation.amount)}，项目血条 +1。`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ShopView({ identity, result, isComplete, addresses, orders, donations, onSaveAddress, onPlaceOrder, onAddDonation, setPhase, artStyle }) {
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
            <button className="secondary-action" type="button" onClick={() => document.getElementById("dgti-tip-jar")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              支持一下
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

      <TipJar identity={identity} profile={profile} donations={donations} onAddDonation={onAddDonation} />

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
      if (questionIndex >= questionBank.length - 1) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
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
  };

  const previousQuestion = () => {
    window.clearTimeout(quizAdvanceTimer.current);
    setState((current) => ({ ...current, currentIndex: Math.max(current.currentIndex - 1, 0) }));
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
        />
      )}
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
        />
      )}
      {state.phase === "shop" && (
        <ShopView
          identity={state.identity}
          result={result}
          isComplete={isComplete}
          addresses={state.addresses || []}
          orders={state.orders || []}
          donations={state.donations || []}
          onSaveAddress={(address) => setState((current) => ({ ...current, addresses: [address, ...(current.addresses || [])].slice(0, 8) }))}
          onPlaceOrder={(order) => setState((current) => ({ ...current, orders: [order, ...(current.orders || [])].slice(0, 12) }))}
          onAddDonation={(donation) => setState((current) => ({ ...current, donations: [donation, ...(current.donations || [])].slice(0, 50) }))}
          setPhase={setPhase}
          artStyle={state.artStyle}
        />
      )}
    </div>
  );
}
