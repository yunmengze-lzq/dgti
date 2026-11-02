export const STORAGE_KEY = "dgti-light-binding-v1";

export const artStyles = {
  mbti: "DGTI 立绘",
  portrait: "精修立绘"
};

export const groupMeta = {
  core: {
    name: "牛马承重系",
    short: "承重",
    color: "#1f8f8a",
    bg: "#e8fbf7",
    copy: "嘴上骂得很凶，手上真的把事往前推。"
  },
  support: {
    name: "低功耗回血系",
    short: "回血",
    color: "#2f70c8",
    bg: "#ebf4ff",
    copy: "在炸裂世界里保护血条，也帮别人不要碎太快。"
  },
  bossy: {
    name: "领导味污染系",
    short: "领导味",
    color: "#b86b08",
    bg: "#fff4d8",
    copy: "权力不一定很多，但对齐、安排、画饼都很熟。"
  },
  chaos: {
    name: "混乱屎山系",
    short: "混乱",
    color: "#c6465b",
    bg: "#fff0f2",
    copy: "问题不一定解决，但局面一定更有层次。"
  },
  social: {
    name: "社交修复系",
    short: "社交",
    color: "#8b5cc7",
    bg: "#f5efff",
    copy: "给死寂群聊续命，给工位关系留一点人味。"
  }
};

export const factorMeta = [
  ["carry", "扛活度", "活会落到你身上，你也真的会往前推"],
  ["fish", "摸鱼功力", "低功耗生存，擅长保护能量"],
  ["boundary", "边界感", "知道什么不该接，敢说不基础"],
  ["chaos", "搅动度", "让局面更复杂，或能在混乱中获利"],
  ["bossy", "领导味", "没有权也会对齐、推进、画饼、安排"],
  ["pot", "背锅体质", "锅容易飞到你身上，或你习惯先兜住"],
  ["repair", "修复力", "会补台、安抚、降噪、整理残局"],
  ["legacy", "屎山关联", "容易制造、继承、修理历史遗留问题"]
];

export const axisMeta = [
  ["energy", "苟", "冲", "省电续命", "开麦上场", "你面对新任务时，是先观察风向、保护血条，还是主动开麦、把局面推起来。", "能量管理", "工位省电", "当场开麦"],
  ["information", "查", "编", "先查旧账", "先搭故事", "你处理模糊问题时，是先找事实、旧文档和证据，还是先搭框架、讲愿景、开脑洞。", "问题入口", "考古挖坟", "神灯出片"],
  ["decision", "接", "切", "先接住人", "先切清锅", "你做判断时，是先稳住人的状态和现场关系，还是先切清责任、范围、代价和验收标准。", "责任边界", "情绪兜底", "锅盖画线"],
  ["structure", "游", "钉", "边跑边补", "钉死闭环", "你推进事情时，是边跑边补、见招拆招，还是先钉住计划、节点、负责人和交付闭环。", "推进方式", "游击续命", "闭环上锁"]
];

const art = (order, code, portraitVersion, mbtiVersion = "v1") => ({
  portrait: `assets/dgti/characters-v2/refined/${String(order).padStart(2, "0")}-${code}-hero-${portraitVersion}.png`,
  mbti: `assets/dgti/characters-v2/mbti/${String(order).padStart(2, "0")}-${code}-mbti-${mbtiVersion}.png`
});

export const roleProfiles = [
  {
    order: 1,
    code: "CHOSEN",
    slug: "chosen",
    name: "天选打工人",
    gender: "男",
    group: "core",
    meme: "活该你能干",
    tagline: "你不是自愿发光，是所有灯都坏了只剩你亮。",
    copy: "你总能在一片混乱里先看见下一步。问题是别人也看见了你能干，于是默认你会继续能干。",
    artifact: "破光环、工牌剑、待办卷轴",
    traits: ["被迫英雄", "高扛活", "主线任务体质"],
    factors: { carry: 94, fish: 18, boundary: 56, chaos: 22, bossy: 44, pot: 62, repair: 70, legacy: 36 },
    art: art(1, "chosen", "v3")
  },
  {
    order: 2,
    code: "COWHORSE",
    slug: "cowhorse",
    name: "牛马本马",
    gender: "男",
    group: "core",
    meme: "牛马",
    tagline: "嘴上骂公司，手上把活干完。",
    copy: "你不是没有怨气，你是怨气和生产力同时在线。别人还在锐评，你已经把文件命名成最终版了。",
    artifact: "牛角、牛轭背包、蹄形工鞋",
    traits: ["嘴硬手勤", "稳定输出", "被生活驯服但没投降"],
    factors: { carry: 86, fish: 26, boundary: 35, chaos: 18, bossy: 32, pot: 80, repair: 58, legacy: 42 },
    art: art(2, "cowhorse", "v3")
  },
  {
    order: 3,
    code: "FISH",
    slug: "fish",
    name: "摸鱼圣体",
    gender: "男",
    group: "core",
    meme: "摸鱼 / 低功耗",
    tagline: "你不是偷懒，你是在做系统散热。",
    copy: "你很懂能量管理。表格是你的保护色，游戏小窗是你的氧气瓶，关键时刻你也不是完全不能动。",
    artifact: "游戏小窗、鱼尾呆毛、低电量屏幕",
    traits: ["低功耗", "伪装在线", "能躲就躲"],
    factors: { carry: 34, fish: 96, boundary: 66, chaos: 36, bossy: 18, pot: 28, repair: 38, legacy: 20 },
    art: art(3, "fish", "v5")
  },
  {
    order: 4,
    code: "TRAITOR",
    slug: "traitor",
    name: "工贼嫌疑人",
    gender: "男",
    group: "core",
    meme: "格局打开",
    tagline: "你一开口，大家怀疑老板在你号上登录了。",
    copy: "你太会说场面话，也太懂向上管理。偶尔只是求生，偶尔确实让同事想截图送审。",
    artifact: "遮头外套、KPI 小纸条、金色工牌",
    traits: ["偷感", "向上对齐", "危险发言"],
    factors: { carry: 48, fish: 24, boundary: 24, chaos: 58, bossy: 84, pot: 18, repair: 28, legacy: 30 },
    art: art(4, "traitor", "v6")
  },
  {
    order: 5,
    code: "POTMAN",
    slug: "potman",
    name: "背锅侠",
    gender: "男",
    group: "support",
    meme: "锅从天降",
    tagline: "锅还在空中，你的背已经开始发烫。",
    copy: "你不一定想兜底，但你常常是现场最像能兜底的人。你的人生建议是：锅盖可以举，责任线也要画。",
    artifact: "锅盖盾牌、飞锅、事故便签",
    traits: ["兜底", "救急", "锅感雷达"],
    factors: { carry: 72, fish: 22, boundary: 28, chaos: 18, bossy: 30, pot: 96, repair: 64, legacy: 45 },
    art: art(5, "potman", "v3")
  },
  {
    order: 15,
    code: "SHIFTER",
    slug: "shifter",
    name: "甩锅侠",
    gender: "女",
    group: "chaos",
    meme: "锅不粘身",
    tagline: "锅刚飞过来，你已经把流程、截图和接收人摆好了。",
    copy: "你不是不干活，你是拒绝不明不白替别人收尾。你擅长把模糊责任拆成事实、流程和下一位接锅人。",
    artifact: "反弹锅盖、转交流程单、已读截图",
    traits: ["留痕反弹", "责任转移", "锅不粘身"],
    factors: { carry: 24, fish: 64, boundary: 74, chaos: 86, bossy: 62, pot: 4, repair: 20, legacy: 32 },
    art: art(15, "shifter", "v1")
  },
  {
    order: 6,
    code: "FIREFIGHTER",
    slug: "firefighter",
    name: "职场消防员",
    gender: "女",
    group: "support",
    meme: "救火",
    tagline: "哪里炸了，哪里就出现你的身影。",
    copy: "你对故障现场有一种命运般的吸引力。别人问谁来处理，你已经抱着灭火器冲进去了。",
    artifact: "灭火器、燃烧工单、警报条",
    traits: ["救场", "高压行动", "临危上线"],
    factors: { carry: 88, fish: 12, boundary: 36, chaos: 22, bossy: 40, pot: 70, repair: 82, legacy: 34 },
    art: art(6, "firefighter", "v3")
  },
  {
    order: 7,
    code: "CRISPY",
    slug: "crispy",
    name: "脆皮牛马",
    gender: "男",
    group: "support",
    meme: "脆皮打工人",
    tagline: "不是不努力，是血条真的不长。",
    copy: "你不是摆烂，只是身体和精神都在提示低电量。你的边界不是矫情，是续命策略。",
    artifact: "裂壳、低血量 UI、气泡膜围巾",
    traits: ["易碎", "可爱硬撑", "回血优先"],
    factors: { carry: 42, fish: 78, boundary: 72, chaos: 16, bossy: 12, pot: 58, repair: 48, legacy: 26 },
    art: art(7, "crispy", "v6")
  },
  {
    order: 8,
    code: "BOUNDARY",
    slug: "boundary",
    name: "边界门神",
    gender: "女",
    group: "support",
    meme: "基础不基础",
    tagline: "你守住的不是下班，是人类最后的尊严。",
    copy: "你很清楚什么能做、什么要谈条件。别人说基础，你会问：基础到谁的寿命里？",
    artifact: "传统门神挂画、美少女复刻姿势、绝对领域",
    traits: ["边界清晰", "温柔不让步", "下班守门"],
    factors: { carry: 52, fish: 44, boundary: 98, chaos: 24, bossy: 20, pot: 18, repair: 62, legacy: 40 },
    art: art(8, "boundary", "v6")
  },
  {
    order: 9,
    code: "LEADERCARD",
    slug: "leadercard",
    name: "领导体验卡",
    gender: "男",
    group: "bossy",
    meme: "对齐一下",
    tagline: "权力没有多少，压迫感先拉满。",
    copy: "你很擅长把空气变成安排。只是偶尔需要确认：你拿的是领导体验卡，不是永久皮肤。",
    artifact: "领导工牌、激光笔、秃头领导武魂",
    traits: ["强安排", "对齐大师", "临时压迫感"],
    factors: { carry: 66, fish: 10, boundary: 26, chaos: 34, bossy: 96, pot: 22, repair: 42, legacy: 28 },
    art: art(9, "leadercard", "v3")
  },
  {
    order: 10,
    code: "PPTGOD",
    slug: "pptgod",
    name: "PPT 仙人",
    gender: "女",
    group: "bossy",
    meme: "先出一版",
    tagline: "你能把空气做成 18 页 deck。",
    copy: "别人还在说不清楚，你已经把标题、图标和三阶段路径排好了。你不一定解决世界，但你能让世界看起来有页码。",
    artifact: "PPT 飞剑、幻灯片剑阵、汇报光环",
    traits: ["表达强迫", "美化现实", "空气成片"],
    factors: { carry: 72, fish: 18, boundary: 36, chaos: 44, bossy: 76, pot: 28, repair: 68, legacy: 52 },
    art: art(10, "pptgod", "v4")
  },
  {
    order: 11,
    code: "MEETINGBOT",
    slug: "meetingbot",
    name: "会议永动机",
    gender: "男",
    group: "bossy",
    meme: "拉会对齐",
    tagline: "只要还有人没死心，你就能再约 30 分钟。",
    copy: "你相信问题需要同步，分歧需要对齐，结论需要会议。你不是坏，你只是让日历很累。",
    artifact: "会议桌齿轮、日历转盘、视频小窗",
    traits: ["无限同步", "结论待定", "日历支配"],
    factors: { carry: 52, fish: 12, boundary: 20, chaos: 48, bossy: 92, pot: 20, repair: 54, legacy: 36 },
    art: art(11, "meetingbot", "v3")
  },
  {
    order: 12,
    code: "WISHPOOL",
    slug: "wishpool",
    name: "需求许愿池",
    gender: "女",
    group: "bossy",
    meme: "这个能不能顺便",
    tagline: "你不是提需求，你是在向宇宙下单。",
    copy: "你的想象力很丰富，边界意识偶尔很玄学。你说顺手，别人听见的是项目重开。",
    artifact: "需求神灯、愿望贴、许愿人",
    traits: ["顺便文学", "宇宙下单", "需求扩散"],
    factors: { carry: 34, fish: 18, boundary: 12, chaos: 86, bossy: 74, pot: 16, repair: 28, legacy: 58 },
    art: art(12, "wishpool", "v3")
  },
  {
    order: 13,
    code: "STIRRER",
    slug: "stirrer",
    name: "搅 shit 棍",
    gender: "男",
    group: "chaos",
    meme: "搅局",
    tagline: "你不一定解决问题，但问题一定因你更有层次。",
    copy: "你很会让沉闷现场突然有剧情。优点是有活人感，缺点是别人不一定想活在连续剧里。",
    artifact: "长搅拌棒、混乱旋涡、飞散便签",
    traits: ["坏笑", "点火", "场面升级"],
    factors: { carry: 30, fish: 38, boundary: 20, chaos: 98, bossy: 38, pot: 14, repair: 18, legacy: 44 },
    art: art(13, "stirrer", "v4")
  },
  {
    order: 14,
    code: "SHITMOUNTAIN",
    slug: "shitmountain",
    name: "屎山继承人",
    gender: "男",
    group: "chaos",
    meme: "历史遗留",
    tagline: "你不是一个 bug，你是一个被迫继承的地质层。",
    copy: "你打开的不是文件夹，是前任留下的考古现场。你的人生常常在修坟和续命之间切换。",
    artifact: "文件山、旧系统、裂开的 Excel",
    traits: ["技术债", "祖传问题", "被迫考古"],
    factors: { carry: 58, fish: 28, boundary: 46, chaos: 64, bossy: 20, pot: 64, repair: 76, legacy: 98 },
    art: art(14, "shitmountain", "v3")
  },
  {
    order: 16,
    code: "TWOFACE",
    slug: "twoface",
    name: "两面人",
    gender: "女",
    group: "chaos",
    meme: "对上对下两副面孔",
    tagline: "你对领导春风满面，对同事冷若冰霜。",
    copy: "你很懂职场温差。你的风险不是不会说话，而是不同人听到的你像两个版本。",
    artifact: "双面表情、递方案、藏甩锅便签",
    traits: ["话术切换", "表情管理", "温差很大"],
    factors: { carry: 44, fish: 44, boundary: 52, chaos: 82, bossy: 62, pot: 20, repair: 46, legacy: 38 },
    art: art(16, "twoface", "v3")
  },
  {
    order: 17,
    code: "ALIVE",
    slug: "alive",
    name: "活人感代表",
    gender: "女",
    group: "social",
    meme: "活人感",
    tagline: "群聊一片死寂时，你负责证明人类还在。",
    copy: "你像给灰色群聊接上电。你不是永远快乐，只是不愿意让所有人都装成已读不回的背景板。",
    artifact: "举手发言、心跳工牌、发光气泡",
    traits: ["主动开口", "群聊复活", "暖色能量"],
    factors: { carry: 74, fish: 18, boundary: 46, chaos: 40, bossy: 28, pot: 34, repair: 86, legacy: 16 },
    art: { portrait: "assets/dgti/characters-v2/refined/17-alive-hero-v3.png", mbti: "assets/dgti/characters-v2/mbti/17-alive-mbti-v1.png" }
  },
  {
    order: 18,
    code: "EMOHEALER",
    slug: "emohealer",
    name: "情绪价值供应商",
    gender: "女",
    group: "social",
    meme: "情绪价值",
    tagline: "你像工位急救包，别人崩了先找你。",
    copy: "你会递奶茶、递纸巾、递一个还能活的理由。记得你的情绪价值不是无限续杯。",
    artifact: "毛绒急救包、奶茶、纸巾创可贴",
    traits: ["软妹治愈", "会哄人", "也会累"],
    factors: { carry: 48, fish: 34, boundary: 58, chaos: 12, bossy: 10, pot: 46, repair: 98, legacy: 18 },
    art: { portrait: "assets/dgti/characters-v2/refined/18-emohealer-hero-v3.png", mbti: "assets/dgti/characters-v2/mbti/18-emohealer-mbti-v1.png" }
  },
  {
    order: 19,
    code: "SILENTGOD",
    slug: "silentgod",
    name: "沉默大神",
    gender: "男",
    group: "social",
    meme: "少说多做",
    tagline: "你话不多，但关键文件夹通常在你手里。",
    copy: "你不爱解释，但手里有权限、有记录、有能救命的旧版本。你的沉默不是空白，是压缩包。",
    artifact: "嘴部拉链、隐藏文件夹、静音屏幕",
    traits: ["闭嘴干活", "关键权限", "安静可靠"],
    factors: { carry: 68, fish: 42, boundary: 78, chaos: 18, bossy: 18, pot: 44, repair: 86, legacy: 72 },
    art: { portrait: "assets/dgti/characters-v2/refined/19-silentgod-hero-v3.png", mbti: "assets/dgti/characters-v2/mbti/19-silentgod-mbti-v1.png" }
  },
  {
    order: 20,
    code: "AICOWORKER",
    slug: "aicoworker",
    name: "人机同事",
    gender: "女",
    group: "social",
    meme: "预制 / 人机感",
    tagline: "你像公司默认回复插件，稳定、礼貌、偶尔没有灵魂。",
    copy: "你的表达很标准，情绪很可控，像刚从出厂膜里拆出来。大家喜欢你的稳定，也偶尔想确认你是不是在线真人。",
    artifact: "出厂包装、加载条、模板回复卡",
    traits: ["模板回复", "礼貌稳定", "微没灵魂"],
    factors: { carry: 54, fish: 52, boundary: 48, chaos: 18, bossy: 42, pot: 24, repair: 54, legacy: 12 },
    art: { portrait: "assets/dgti/characters-v2/refined/20-aicoworker-hero-v3.png", mbti: "assets/dgti/characters-v2/mbti/20-aicoworker-mbti-v1.png" }
  }
];

const q = (chapter, title, answers) => ({ chapter, title, answers });
const a = (text, note, roles, factors = {}, axes = {}) => ({ text, note, roles, factors, axes });

export const questionBank = [
  q("工作群消息", "刚上班就被拉进一个【临时工作群】，消息已经【99+】，还没人告诉你要做什么。你会先：", [
    a("先【翻聊天记录和文件】，弄明白前因后果再开口。", "群聊考古，先找说明书。", ["SILENTGOD", "SHITMOUNTAIN"], { repair: 2, legacy: 2, boundary: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 }),
    a("直接问：【要做什么、几点要、谁负责】？问清楚才开工。", "接活可以，盲盒不拆。", ["BOUNDARY", "CHOSEN"], { carry: 2, boundary: 4 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("先回一句【我在，有需要叫我】，别让群里一直冷场。", "全员已读里终于有个活人。", ["ALIVE", "EMOHEALER"], { repair: 4, carry: 1 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("把相关的人【叫到一起聊十分钟】，当场把任务分好。", "群还没捂热，会先约上了。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("先【静音做自己的事】，明确叫到我再看。", "不点名，就当我没刷新。", ["FISH", "CRISPY"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("任务说不清", "领导让你明天交一份方案，只说【“有点新意”】，没有更多要求。你会先：", [
    a("问清【给谁看、解决什么问题】，不想做完再猜错。", "拒绝参加领导心思猜猜乐。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先写【三个思路和各自的好处】，让领导选方向。", "先给菜单，再决定炒哪盘菜。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 1 }, { energy: 1, information: 1, decision: 0, structure: 2 }),
    a("先做一个【能用的小样】，让对方看着实物提意见。", "空聊不如先摆一版。", ["FIREFIGHTER", "CHOSEN"], { carry: 4, repair: 2 }, { energy: 2, information: -1, decision: 1, structure: 0 }),
    a("找领导以前【夸过的例子】，照他喜欢的风格做。", "领导的喜好也是参考答案。", ["TRAITOR", "TWOFACE"], { bossy: 4, chaos: 2 }, { energy: 1, information: 2, decision: 1, structure: 0 }),
    a("找一份【旧模板改一改】，先过明天这关。", "模板在手，今晚少愁。", ["AICOWORKER", "FISH"], { fish: 2, repair: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 })
  ]),
  q("顺手帮忙", "你自己的事还没做完，同事又请你【“顺手帮个忙”】，估计要花一下午。你会：", [
    a("【直接拒绝】，请他找别人，我的事也没人替我做。", "顺手不等于接盘。", ["SHIFTER", "BOUNDARY"], { boundary: 3, chaos: 2, fish: 1, pot: -1 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("说我【只能帮十分钟】，超过的部分让他自己来。", "友情有，无限续杯没有。", ["BOUNDARY", "SILENTGOD"], { boundary: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("教他【怎么做、去哪找资料】，让他自己完成。", "送你攻略，副本自己打。", ["EMOHEALER", "BOUNDARY"], { repair: 4, boundary: 2 }, { energy: 1, information: -1, decision: -1, structure: 1 }),
    a("把两人的事【按轻重缓急排一下】，紧急的那件一起做。", "先排队，别让热心变超载。", ["CHOSEN", "AICOWORKER"], { carry: 2, boundary: 2, repair: 1 }, { energy: 0, information: -2, decision: 1, structure: 2 }),
    a("先说【等我忙完看看】，暂时不打开他发来的文件。", "这个看看，暂时没有日期。", ["FISH", "CRISPY"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("休息被看见", "忙完一阵，你正【歇几分钟】，领导从旁边走过。你最可能：", [
    a("立刻【切回工作画面】，休息可以，被看到不行。", "切屏速度就是求生欲。", ["FISH", "AICOWORKER"], { fish: 4, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("继续【检查刚做完的工作】，顺手把遗漏补上。", "休息键没按稳，又上班了。", ["CHOSEN", "SILENTGOD"], { carry: 2, repair: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("顺势【问一个等他决定的问题】，刚好省得去找他。", "领导路过，待办递上。", ["LEADERCARD", "PPTGOD"], { bossy: 3, carry: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("【照常休息】，该做的做完了，没必要演忙。", "工作做完，休息有理。", ["BOUNDARY", "FISH"], { fish: 2, boundary: 4 }, { energy: -1, information: 0, decision: 2, structure: 1 }),
    a("明明没耽误事，还是【紧张得坐直】，等他走了才放松。", "人没犯错，心先罚站。", ["CRISPY", "EMOHEALER"], { fish: 3, repair: 2 }, { energy: -1, information: 0, decision: -2, structure: -1 })
  ]),
  q("交付出错", "今天要交的东西【出了差错】，客户催、领导问。你最可能先：", [
    a("【检查哪里错了】，确认影响多大，再决定怎么改。", "先查现场，别靠嗓门破案。", ["SILENTGOD", "SHITMOUNTAIN"], { repair: 3, legacy: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先找【能顶上的替代办法】，让对方今天有东西可用。", "先救今天，明天再复盘。", ["FIREFIGHTER", "CHOSEN"], { carry: 4, repair: 4 }, { energy: 2, information: -1, decision: 1, structure: 0 }),
    a("先【解释情况和处理时间】，别让对方一直干等。", "东西出了错，消息别失踪。", ["EMOHEALER", "ALIVE"], { repair: 4, pot: 1 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("先说明【不是我负责的部分】，请原负责人来处理。", "先分清锅，再决定谁开火。", ["SHIFTER", "TWOFACE"], { boundary: 3, chaos: 3, bossy: 1, pot: -1 }, { energy: 1, information: 0, decision: 2, structure: 0 }),
    a("先查【以前有没有同样的问题】，看看旧办法还能不能用。", "熟悉的坑，熟悉的配方。", ["SHITMOUNTAIN", "STIRRER"], { legacy: 4, chaos: 3 }, { energy: 0, information: 2, decision: 1, structure: -1 })
  ]),
  q("开会没结论", "一件事讨论了【40 分钟还没结论】，眼看又要超时。你会：", [
    a("把分歧列出来，请大家【现在定下一步和负责人】。", "今天这个会总得有个下班点。", ["CHOSEN", "PPTGOD"], { carry: 3, repair: 2 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("觉得人没到齐，提议【再约一次会】把问题说透。", "此会未完，下会待续。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("不抢话，先【记好问题和各方意见】，会后发给大家。", "嘴没上线，笔记已交付。", ["SILENTGOD", "AICOWORKER"], { repair: 2, boundary: 2 }, { energy: -2, information: -2, decision: 1, structure: 2 }),
    a("【边听边做别的事】，提到自己再回答。", "身体参会，手上另有安排。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("直接问【“这件事一定要做吗？”】，先挑战一下前提。", "大家在修车，你问为什么开车。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 })
  ]),
  q("临时加要求", "事情已经改了三遍，对方又说【“再加一点”】，但【交付时间不变】。你会：", [
    a("说明【加内容就要延期或减别的】，这次先谈条件。", "可以加单，不能白加班。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先把【原定的部分交好】，新增的后面再处理。", "先保饭碗里的，别再往锅里倒。", ["FIREFIGHTER", "COWHORSE"], { carry: 4, pot: 1 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("听着来了灵感，忍不住【再提几个新点子】。", "愿望清单正在自我繁殖。", ["WISHPOOL", "PPTGOD"], { chaos: 4, bossy: 2 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("向领导建议【分两次交付】，把新增部分单独安排。", "给新增找个名分和日期。", ["TRAITOR", "LEADERCARD"], { bossy: 4, chaos: 2 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("【先答应再想办法】，不好意思当场让对方失望。", "嘴说没问题，心说大问题。", ["CRISPY", "POTMAN"], { fish: 2, pot: 3 }, { energy: -2, information: 0, decision: -1, structure: -1 })
  ]),
  q("前任交接", "你接手前同事的工作，文件里有【四个“最终版”】，也没留下清楚说明。你会：", [
    a("逐一核对，整理出【最新版和注意事项】再接着做。", "屎山继承人，先清点遗产。", ["SHITMOUNTAIN", "SILENTGOD"], { legacy: 4, repair: 3, boundary: 1 }, { energy: -2, information: -2, decision: 2, structure: 2 }),
    a("只先解决【今天必须用的部分】，其他慢慢补。", "先修能走的路，别急着修全城。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3, repair: 2 }, { energy: 1, information: -1, decision: 1, structure: 0 }),
    a("列出缺了什么，找领导【申请人手或整理时间】。", "历史遗留，也得有人给预算。", ["PPTGOD", "LEADERCARD"], { bossy: 3, legacy: 3 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("把混乱的地方【发到群里吐槽】，让大家知道这活有多坑。", "前任留下文件，我留下考古文学。", ["STIRRER", "SHITMOUNTAIN"], { chaos: 4, legacy: 3 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("先【找前同事问清楚】，能问本人就不自己猜。", "说明书没有，试试联系原作者。", ["AICOWORKER", "FISH"], { fish: 2, legacy: 2, repair: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 })
  ]),
  q("新人提问", "新人一天来问了你好几次，你自己的工作已经【被打断多次】。你会：", [
    a("整理一份【常见问题清单】，一次说明白。", "今天多写一页，明天少答十遍。", ["CHOSEN", "SILENTGOD"], { carry: 2, repair: 3 }, { energy: 0, information: -2, decision: 1, structure: 2 }),
    a("还是【逐个耐心讲】，他刚来，怕问错也正常。", "新人保护期，耐心续费中。", ["EMOHEALER", "CRISPY"], { repair: 4 }, { energy: 1, information: 0, decision: -2, structure: 0 }),
    a("给他示例，让他【先试一次，卡住再问】。", "可以带路，不全程代走。", ["BOUNDARY", "AICOWORKER"], { boundary: 3, repair: 2 }, { energy: 0, information: -1, decision: 2, structure: 1 }),
    a("约个【固定答疑时间】，把大家的问题一起讲。", "问题集中开会，工作集中续命。", ["MEETINGBOT", "ALIVE"], { bossy: 2, repair: 2 }, { energy: 2, information: 0, decision: -1, structure: 2 }),
    a("告诉他【我现在没空】，请他先问其他同事。", "热心有额度，今天已用完。", ["TWOFACE", "FISH"], { fish: 3, chaos: 2 }, { energy: 0, information: 1, decision: -1, structure: -1 })
  ]),
  q("自愿团建", "群里通知【周五下班后聚餐】，写着【“自愿参加”】。你真实的做法是：", [
    a("【不参加】，晚上有自己的安排，不另找理由。", "自愿这两个字，我先当真了。", ["BOUNDARY", "CRISPY"], { boundary: 4, fish: 3 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("【主动报名】，还能和同事聊点工作以外的事。", "终于有个不用看表格的群活动。", ["ALIVE", "EMOHEALER"], { repair: 3, carry: 1 }, { energy: 2, information: 0, decision: -2, structure: 1 }),
    a("其实不想去，但【大家都去我也去】，省得显得不合群。", "人在饭桌，心在被窝。", ["COWHORSE", "POTMAN"], { carry: 2, pot: 2 }, { energy: 0, information: -1, decision: -1, structure: 0 }),
    a("去，而且会【帮忙订位、安排时间】，免得现场乱。", "连吃顿饭都自带负责人气质。", ["MEETINGBOT", "LEADERCARD"], { bossy: 3, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("先看【领导和熟人去不去】，再决定怎么回复。", "聚餐报名，先做人员调研。", ["TWOFACE", "TRAITOR"], { chaos: 2, bossy: 2 }, { energy: 1, information: 1, decision: 0, structure: -1 })
  ]),
  q("功劳没被提", "工作汇报时，你花了很多时间做的部分【没提到你的贡献】。你会：", [
    a("当场补一句【我负责了哪些部分】，客气但说清楚。", "活不能白干，名字不能蒸发。", ["BOUNDARY", "SILENTGOD"], { boundary: 3, repair: 2 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("【先不说】，事情做成就行，不想现场争。", "嘴上算了，心里记着。", ["COWHORSE", "POTMAN"], { carry: 2, pot: 4 }, { energy: -1, information: -1, decision: -1, structure: 0 }),
    a("会后【私下找负责人谈】，下次要把贡献讲清楚。", "不抢话筒，单独把账对上。", ["SHIFTER", "TWOFACE"], { boundary: 2, chaos: 2, bossy: 1, pot: -1 }, { energy: 1, information: -1, decision: 2, structure: 1 }),
    a("下次提前把贡献【写进汇报材料】，让事实自己出现。", "让我的名字住进材料里。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 2 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("半开玩笑地说【“我的名字是被折叠了吗？”】，提醒一下。", "笑着开麦，功劳归位。", ["ALIVE", "STIRRER"], { chaos: 2, repair: 2 }, { energy: 2, information: 1, decision: -1, structure: -1 })
  ]),
  q("下午犯困", "下午你明显【犯困、效率下降】，手头还有一些事没做完。你会：", [
    a("偷偷【刷一会儿手机】，缓过来再干。", "工位省电模式已开启。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("【休息十分钟并设提醒】，再做最重要的事。", "休息有闹钟，摸鱼有归期。", ["BOUNDARY", "CHOSEN"], { fish: 2, boundary: 2, carry: 1 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("找同事【聊两句或走一圈】，有人说话就精神点。", "电量不足，补点人味。", ["ALIVE", "EMOHEALER"], { repair: 2, fish: 1 }, { energy: 2, information: 0, decision: -2, structure: -1 }),
    a("【继续硬撑着做】，做完才安心。", "电量红了，工作灯还亮着。", ["COWHORSE", "FIREFIGHTER"], { carry: 4, pot: 1 }, { energy: 0, information: -1, decision: 1, structure: 1 }),
    a("先做【不用太动脑的重复活】，复杂的晚点再说。", "大脑歇班，流程继续上班。", ["AICOWORKER", "SILENTGOD"], { fish: 2, repair: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 })
  ]),
  q("下班后消息", "晚上八点，领导发来【“在吗，帮忙看一下”】，没说是不是急事。你会：", [
    a("【明天上班再回】，非工作时间先过自己的生活。", "下班了，客服不在线。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, fish: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 }),
    a("先问【是不是今天非处理不可】，真紧急再做。", "紧急通道有，随叫随到没有。", ["FIREFIGHTER", "CHOSEN"], { carry: 3, boundary: 2 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("【马上打开处理】，早点做完就不用一直惦记。", "手机一响，工牌自动戴上。", ["AICOWORKER", "CRISPY"], { fish: 2, boundary: 2 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("先回【“收到，马上看”】，给领导留下积极印象。", "人还在沙发，态度已到公司。", ["MEETINGBOT", "TRAITOR"], { bossy: 4, carry: 1 }, { energy: 2, information: 1, decision: 1, structure: 2 }),
    a("先【放着不看】，等自己缓过来再决定。", "这条消息需要一点心理准备。", ["CRISPY", "FISH"], { fish: 4, boundary: 2 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("群里争执", "两个同事在工作群里【互相指责】，你也参与了这件事。你会：", [
    a("把已知事实发出来，建议【先解决眼前问题】。", "先干正事，吵架暂停。", ["CHOSEN", "FIREFIGHTER"], { carry: 3, repair: 3 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("先【私下劝一劝双方】，别把关系吵坏。", "群里冒火，私聊降温。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("先【不表态】，等情况更清楚再说。", "证据没到齐，麦克风先关着。", ["SILENTGOD", "TWOFACE"], { boundary: 2, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("忍不住【补一句尖锐的话】，谁的问题就说谁。", "气氛已经到这儿了，再添一句。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("直接提议【请负责人定办法】，大家按决定办。", "请能拍板的人结束这集。", ["LEADERCARD", "TRAITOR"], { bossy: 4, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 })
  ]),
  q("别人改了安排", "另一组临时改了安排，导致你这边【做好的工作要重来】，双方都说没收到通知。你会：", [
    a("先【核对旧约定和新要求】，找出到底改了什么。", "先查版本，别先查情绪。", ["SILENTGOD", "SHITMOUNTAIN"], { legacy: 3, repair: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先【补救眼前的交付】，别让两组一起耽误。", "谁改的以后说，今天先救。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("把变更记录发回去，请【改安排的人承担返工】。", "谁点的加餐，谁认这笔账。", ["SHIFTER", "BOUNDARY"], { boundary: 3, chaos: 3, pot: -1 }, { energy: 0, information: -2, decision: 2, structure: 1 }),
    a("先【等两边吵出结论】，我不急着进场。", "双方还在辩论，我先退出会场。", ["STIRRER", "FISH"], { chaos: 3, fish: 2 }, { energy: 1, information: 1, decision: -1, structure: -2 }),
    a("提出【换一种合作办法】，顺便把老问题一起改掉。", "来都来了，不如重新设计。", ["WISHPOOL", "PPTGOD"], { chaos: 3, bossy: 2 }, { energy: 2, information: 2, decision: -1, structure: -1 })
  ]),
  q("不能立刻回答", "客户或合作方追问一个【你暂时不确定的问题】，坚持要你现在给答复。你会：", [
    a("明确说【还需核实，几点前回复】，不编一个答案。", "暂时不知道，也是一种诚实交付。", ["AICOWORKER", "SILENTGOD"], { repair: 2, boundary: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("先问【他具体需要决定什么】，避免答非所问。", "先问需求，别急着考试。", ["BOUNDARY", "CHOSEN"], { boundary: 3, carry: 1 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("先【安抚对方的着急】，让他知道有人跟进。", "答案还在路上，态度先到。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("请【有权限的领导回复】，我不替别人做承诺。", "这题超纲，请有签字权的人答。", ["TRAITOR", "LEADERCARD"], { bossy: 4, chaos: 1 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("给一个【可先执行的临时办法】，同时说明限制。", "最终答案没到，临时办法先顶上。", ["CHOSEN", "FIREFIGHTER"], { carry: 3, repair: 2 }, { energy: 1, information: -1, decision: 1, structure: 1 })
  ]),
  q("忙了没回报", "最近经常多做事，却没有额外回报，领导还说【“年轻人多锻炼”】。你更可能：", [
    a("当场反问【“那回报什么时候安排？”】，不想再听空话。", "锻炼肌肉行，锻炼工资也行吧。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 1, decision: -1, structure: -1 }),
    a("先找信任的同事【聊聊是不是大家都这样】，缓解心里不平衡。", "先找个懂的人，一起把气喘匀。", ["EMOHEALER", "ALIVE"], { repair: 3 }, { energy: 1, information: 0, decision: -2, structure: 0 }),
    a("提出【工作量和回报一起谈】，条件不变就不再额外接。", "成长可以，长期白送不行。", ["BOUNDARY", "COWHORSE"], { boundary: 4 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("把多做的事整理成成果，【争取升职或更多资源】。", "既然做了，就得拿去谈条件。", ["LEADERCARD", "TRAITOR"], { bossy: 4 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("不再争论，之后【只做约定范围内的工作】。", "期待下调，职责照办。", ["SILENTGOD", "AICOWORKER"], { boundary: 2, repair: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 })
  ]),
  q("不同的人在场", "同事私下问你【真实想法】，领导刚才却明确表达了【相反意见】。你一般会：", [
    a("按事实说明【我为什么有不同看法】，对谁都差不多。", "我的意见没有领导特供版。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 }),
    a("在同事面前【直接吐槽领导的想法】，憋着太难受。", "刚才没开的麦，现在补上。", ["STIRRER", "ALIVE"], { chaos: 4 }, { energy: 2, information: 1, decision: -1, structure: -2 }),
    a("先听同事怎么想，【帮他把问题说清楚】，不急着站队。", "先接住人，再接这个话题。", ["EMOHEALER", "POTMAN"], { repair: 4, pot: 1 }, { energy: 1, information: 0, decision: -2, structure: 1 }),
    a("对领导表示支持，私下【顺着同事说两句】，谁也不得罪。", "场合切换，话术跟着换。", ["TWOFACE", "TRAITOR"], { chaos: 3, bossy: 3 }, { energy: 1, information: 2, decision: 0, structure: 0 }),
    a("请大家【把不同意见当面说清】，最后定一个共同做法。", "别分两个频道了，一起对话。", ["BOUNDARY", "LEADERCARD"], { boundary: 3, bossy: 2 }, { energy: 1, information: -1, decision: 2, structure: 2 })
  ]),
  q("连续忙碌", "连续忙了好几天，你已经【很累、难以集中注意力】，工作还没结束。你会：", [
    a("说明情况，【休息或请假】，不能一直硬撑。", "人不是充电五分钟就能继续转。", ["CRISPY", "BOUNDARY"], { fish: 3, boundary: 4 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("【撑到这一轮结束】，不想现在把事丢下。", "再撑一轮，是我最熟的台词。", ["COWHORSE", "POTMAN"], { carry: 4, pot: 3 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("请同事【分担一部分】，也和负责人调整安排。", "这次不单刷，发起组队。", ["CHOSEN", "EMOHEALER"], { carry: 2, repair: 3 }, { energy: 1, information: -1, decision: -1, structure: 2 }),
    a("把重复步骤【合并或用工具处理】，少做一点机械劳动。", "给重复劳动装个省力开关。", ["AICOWORKER", "FISH"], { fish: 3, repair: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 }),
    a("只做完【最不能耽误的部分】，其他交接后休息。", "先守住底线，再守住体力。", ["FIREFIGHTER", "BOUNDARY"], { carry: 3, boundary: 3, repair: 2 }, { energy: 1, information: -1, decision: 2, structure: 1 })
  ]),
  q("想换工作", "最近工作让你反复想【“世界那么大，我想去看看”】。你通常会：", [
    a("【更新简历、看看机会】，先为离开做准备。", "世界那么大，先看看招聘价。", ["BOUNDARY", "CRISPY"], { boundary: 3, fish: 3 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("【写点吐槽发给朋友】，情绪过去了再说。", "辞职信写了，发送键还没按。", ["CRISPY", "FISH"], { fish: 4, boundary: 2 }, { energy: -2, information: 1, decision: -1, structure: -2 }),
    a("【抱怨完继续做】，暂时没有真的离开的打算。", "嘴上已离职，明早照常打卡。", ["COWHORSE", "POTMAN"], { carry: 4, pot: 3 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("认真【算存款、查合同、列交接】，条件合适就走。", "跑路也要带上计划表。", ["SHIFTER", "SILENTGOD"], { boundary: 3, chaos: 2, pot: -1, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("【找领导谈条件】，看看工作量或发展机会能否调整。", "先谈一轮，谈不拢再看世界。", ["LEADERCARD", "TRAITOR"], { bossy: 4, boundary: 1 }, { energy: 2, information: 1, decision: 1, structure: 2 })
  ]),
  q("谁的责任", "一件事出了问题，大家在找【“当时谁确认的”】，其中也有你经手的部分。你会：", [
    a("【完整核对记录】，包括自己做过什么，再说明责任。", "我的记录也上桌，不能只查别人。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先说【我来处理】，自己能扛的先扛下来。", "锅还没落地，手已经伸出去了。", ["POTMAN", "FIREFIGHTER"], { pot: 4, carry: 3 }, { energy: 1, information: -1, decision: -1, structure: 0 }),
    a("找参与的同事【一起说明经过】，不想一个人面对。", "背锅盟友，申请集合。", ["COWHORSE", "EMOHEALER"], { pot: 3, repair: 3 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("强调【别人确认过的部分】，尽量把自己摘出去。", "锅可以转，人不能粘。", ["SHIFTER", "BOUNDARY"], { boundary: 3, chaos: 4, bossy: 1, pot: -2 }, { energy: 1, information: -1, decision: 2, structure: 1 }),
    a("追问【“为什么当时没人复核？”】，把流程问题也摊开。", "不只问谁背锅，也问锅怎么来的。", ["STIRRER", "BOUNDARY"], { chaos: 3, boundary: 2 }, { energy: 2, information: 1, decision: 1, structure: -1 })
  ]),
  q("摸鱼碰面", "你和同事都忙完了手头的事，他发现你在【刷手机】，你也发现他在休息。你会：", [
    a("【对视一眼不拆穿】，各自安静待一会儿。", "摸鱼搭子达成。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("小声提醒【别耽误下一件事】，也不去告状。", "提醒一下，友军别误伤。", ["EMOHEALER", "BOUNDARY"], { repair: 3, boundary: 2 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("主动问【“看什么呢？”】，顺势一起聊起来。", "摸鱼现场，社交上线。", ["ALIVE", "STIRRER"], { chaos: 2, repair: 2 }, { energy: 2, information: 1, decision: -2, structure: -1 }),
    a("【装没看见】，别人的休息和我无关。", "人机同事不会告密。", ["AICOWORKER", "SILENTGOD"], { fish: 2, boundary: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 }),
    a("先【看还有没有该收尾的事】，做完再安心歇。", "心里那张待办，还没肯下班。", ["CHOSEN", "COWHORSE"], { carry: 2, fish: 1 }, { energy: 0, information: -1, decision: 1, structure: 1 })
  ]),
  q("同事情绪低落", "同事看起来【很沮丧】，你问他，他说【“没事”】。你会：", [
    a("问是不是任务太多，愿意【一起理理眼前的困难】。", "先看看能不能卸掉两件事。", ["EMOHEALER", "CHOSEN"], { repair: 4, carry: 1 }, { energy: 1, information: -1, decision: -2, structure: 2 }),
    a("请他喝点东西，【听他讲讲】，不急着给建议。", "情绪价值供应商今日营业。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("说【想聊随时找我】，现在先给他一点空间。", "关心到了，追问暂停。", ["BOUNDARY", "CRISPY"], { boundary: 3, repair: 2, fish: 1 }, { energy: -1, information: -1, decision: 2, structure: 1 }),
    a("不追问，默默【帮一点实际的忙】。", "话不多，支援已送达。", ["SILENTGOD", "AICOWORKER"], { repair: 3, legacy: 1 }, { energy: -2, information: -2, decision: 1, structure: 2 }),
    a("【不继续问】，按平时的方式相处，免得他更尴尬。", "不强行安慰，也是一种陪着。", ["AICOWORKER", "BOUNDARY"], { boundary: 3, repair: 1 }, { energy: -2, information: 0, decision: 1, structure: 0 })
  ]),
  q("下班前加活", "快下班了，领导说一件新任务【“今晚就要”】，但你已经有安排。你会：", [
    a("明确【今晚不方便】，请他另找人或调整时间。", "我的安排也算安排。", ["SHIFTER", "BOUNDARY"], { boundary: 3, chaos: 2, fish: 1, pot: -1 }, { energy: -1, information: -2, decision: 2, structure: 1 }),
    a("【取消自己的安排】，先把工作做完。", "对不起了，我的私人日程。", ["COWHORSE", "CHOSEN"], { carry: 4, pot: 2 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("请大家【分工一起做】，争取尽快结束。", "加急可以，别只有一个人急。", ["FIREFIGHTER", "EMOHEALER"], { carry: 3, repair: 3 }, { energy: 2, information: 0, decision: -1, structure: 1 }),
    a("用现成材料【先交一个够用的版本】，尽量准点走。", "先交基础款，豪华版明天见。", ["AICOWORKER", "FISH"], { fish: 3, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("和领导商量【明早先交重点】，把时间重新定清。", "今晚有约，明早有交付。", ["MEETINGBOT", "PPTGOD"], { bossy: 3, boundary: 1 }, { energy: 1, information: 1, decision: 1, structure: 2 })
  ]),
  q("评价太笼统", "领导说你要【“更主动一点”】，却没说哪里需要改变。你会：", [
    a("请他举【具体例子和期望做法】，下次才知道怎么改。", "改进可以，猜谜不行。", ["BOUNDARY", "CHOSEN"], { boundary: 4, carry: 1 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("以后【更频繁汇报进度】，让他多看到自己在做事。", "工作要做，存在感也要交。", ["TRAITOR", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 1, decision: 1, structure: 2 }),
    a("口头答应，但【暂时不改变做法】，这种评价太空了。", "建议收到了，执行方法没收到。", ["CRISPY", "FISH"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("整理自己的成果，【下次拿事实一起讨论】。", "下次谈评价，带上作业本。", ["SILENTGOD", "PPTGOD"], { repair: 2, boundary: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("当面说好，转头【和同事吐槽一下】，先把气顺了。", "会议室里收到，茶水间里复盘。", ["TWOFACE", "ALIVE"], { chaos: 2, repair: 1 }, { energy: 1, information: 1, decision: -1, structure: 0 })
  ])
];

export const relationOptions = ["同事", "同组", "朋友", "前同事", "甲乙方", "互相审判"];

export const bondCatalog = [
  {
    slug: "war-comrades",
    name: "废墟战友",
    image: "assets/dgti/bonds/bond-01-war-comrades-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-01-war-comrades-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-01-war-comrades-mbti-v3.png"
    },
    trigger: "carry / pot 高",
    copy: "你们不是普通同事，是一起从项目废墟里爬出来的人。",
    pairs: [["FIREFIGHTER", "POTMAN"], ["CHOSEN", "COWHORSE"], ["CHOSEN", "FIREFIGHTER"]]
  },
  {
    slug: "mental-aid",
    name: "精神急救站",
    image: "assets/dgti/bonds/bond-02-mental-aid-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-02-mental-aid-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-02-mental-aid-mbti-v3.png"
    },
    trigger: "CRISPY + EMOHEALER 或 repair 高",
    copy: "一个快碎了，一个递纸巾，这段关系主打工位互救。",
    pairs: [["CRISPY", "EMOHEALER"], ["CRISPY", "ALIVE"]]
  },
  {
    slug: "best-gay-friends",
    name: "好闺/gay蜜",
    image: "assets/dgti/bonds/bond-03-best-gay-friends-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-03-best-gay-friends-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-03-best-gay-friends-mbti-v3.png"
    },
    trigger: "嘴损但互护，repair + chaos 或 social 高",
    copy: "你们可以互相吐槽全世界，但别人吐槽你们不行。",
    pairs: [["TWOFACE", "EMOHEALER"], ["ALIVE", "STIRRER"], ["ALIVE", "EMOHEALER"], ["STIRRER", "TWOFACE"]]
  },
  {
    slug: "fish-partners",
    name: "摸鱼搭子",
    image: "assets/dgti/bonds/bond-04-fish-partners-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-04-fish-partners-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-04-fish-partners-mbti-v1.png"
    },
    trigger: "fish 高且边界不低",
    copy: "你们共享低功耗默契：别问，问就是在处理。",
    pairs: [["FISH", "BOUNDARY"], ["FISH", "AICOWORKER"], ["FISH", "CRISPY"]]
  },
  {
    slug: "pot-allies",
    name: "背锅盟友",
    image: "assets/dgti/bonds/bond-05-pot-allies-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-05-pot-allies-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-05-pot-allies-mbti-v1.png"
    },
    trigger: "pot 双高或 pot + repair",
    copy: "锅飞过来的时候，你们已经开始互相递锅盖。",
    pairs: [["POTMAN", "COWHORSE"], ["POTMAN", "CHOSEN"], ["POTMAN", "CRISPY"]]
  },
  {
    slug: "cyber-client-vendor",
    name: "赛博甲乙方",
    image: "assets/dgti/bonds/bond-09-cyber-client-vendor-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-09-cyber-client-vendor-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-09-cyber-client-vendor-mbti-v1.png"
    },
    trigger: "需求许愿池 vs 边界/沉默",
    copy: "一个向宇宙许愿，一个负责告诉宇宙预算不够。",
    pairs: [["WISHPOOL", "BOUNDARY"], ["WISHPOOL", "SILENTGOD"]]
  },
  {
    slug: "desk-nemesis",
    name: "工位天敌",
    image: "assets/dgti/bonds/bond-07-desk-nemesis-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-07-desk-nemesis-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-07-desk-nemesis-mbti-v1.png"
    },
    trigger: "bossy 高 vs boundary / fish 高",
    copy: "你一句对齐一下，他一句不基础，空气开始冒烟。",
    pairs: [["LEADERCARD", "BOUNDARY"], ["MEETINGBOT", "FISH"], ["TRAITOR", "BOUNDARY"]]
  },
  {
    slug: "mutual-leaders",
    name: "互为领导",
    image: "assets/dgti/bonds/bond-08-mutual-leaders-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-08-mutual-leaders-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-08-mutual-leaders-mbti-v1.png"
    },
    trigger: "bossy 双高",
    copy: "谁都没权，但谁都想安排对方，适合先对齐一下谁闭嘴。",
    pairs: [["LEADERCARD", "MEETINGBOT"], ["LEADERCARD", "PPTGOD"]]
  },
  {
    slug: "upstream-downstream-karma",
    name: "孽缘上下游",
    image: "assets/dgti/bonds/bond-06-upstream-downstream-karma-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-06-upstream-downstream-karma-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-06-upstream-downstream-karma-mbti-v1.png"
    },
    trigger: "上下游依赖强，legacy + boundary / chaos",
    copy: "你改的字段，刚好卡住他的流程；他许的愿，刚好落到你的工位。",
    pairs: [["WISHPOOL", "PPTGOD"], ["STIRRER", "BOUNDARY"], ["SHITMOUNTAIN", "WISHPOOL"]]
  },
  {
    slug: "legacy-chain",
    name: "屎山继承链",
    image: "assets/dgti/bonds/bond-10-legacy-chain-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-10-legacy-chain-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-10-legacy-chain-mbti-v1.png"
    },
    trigger: "legacy 高 + repair/carry",
    copy: "前人种树，后人修坟，你们是版本管理里的缘分。",
    pairs: [["SHITMOUNTAIN", "FIREFIGHTER"], ["SHITMOUNTAIN", "SILENTGOD"], ["SHITMOUNTAIN", "POTMAN"]]
  },
  {
    slug: "passing-coworkers",
    name: "路人同事",
    image: "assets/dgti/bonds/bond-11-passing-coworkers-portrait-v1.png",
    art: {
      portrait: "assets/dgti/bonds/bond-11-passing-coworkers-portrait-v1.png",
      mbti: "assets/dgti/bonds/bond-11-passing-coworkers-mbti-v1.png"
    },
    trigger: "默认兜底关系",
    copy: "你们像两张不同工位的便签，偶尔被风吹到一起。",
    pairs: []
  }
];

export const shopProducts = [
  {
    sku: "ceramic-figure",
    name: "本命陶瓷小人",
    price: 129,
    badge: "按结果定制",
    desc: "约 6cm 陶瓷小人，含人格底座、角色道具和类型代码。",
    shipping: "预计 15-20 天出窑"
  },
  {
    sku: "bond-duo",
    name: "双人羁绊套装",
    price: 188,
    badge: "适合互相审判",
    desc: "两尊人格小人 + 一张羁绊说明卡，适合同事、朋友、前同事赛博对账。",
    shipping: "预计 18-25 天出窑"
  },
  {
    sku: "mbti-card",
    name: "DGTI 人格收藏卡",
    price: 39,
    badge: "轻量分享",
    desc: "使用几何人格插画输出头像卡、桌面卡和社交分享图。",
    shipping: "预计 3-5 天发出"
  },
  {
    sku: "desk-blindbox",
    name: "工位命格盲盒",
    price: 69,
    badge: "随机副人格",
    desc: "随机抽一个副人格陶瓷小摆件，适合放在工位镇住班味。",
    shipping: "预计 10-14 天发出"
  }
];
