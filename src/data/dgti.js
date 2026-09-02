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
  ["energy", "蓄", "燃", "蓄能型", "外放型", "你面对新任务时，是先观察、保留电量和安全距离，还是主动开麦、推动局面先动起来。", "工作能量", "小窗回血", "开麦推进"],
  ["information", "证", "愿", "证据型", "愿景型", "你处理模糊问题时，是先找历史资料、事实证据和已发生信息，还是先看可能性、想象空间和下一版故事。", "信息取向", "挖坟考古", "神灯许愿"],
  ["decision", "人", "界", "关系型", "边界型", "你做判断时，是先接住人的状态和现场压力，还是先切清责任、范围、代价和验收标准。", "协作边界", "先稳住人", "先切清锅"],
  ["structure", "变", "闭", "机动型", "闭环型", "你推进事情时，是先边跑边补、见招拆招，还是先钉住计划、节点、负责人和交付闭环。", "执行节奏", "边爬边补", "钉死闭环"]
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
  q("开局拉群", "你突然被拉进一个 38 人新群，群名叫“紧急项目推进对齐”。你会：", [
    a("先潜水看 10 分钟，分清谁是真负责人、谁是气氛组复读机。", "装死不是逃避，是情报工作。", ["SILENTGOD", "TWOFACE"], { repair: 2, boundary: 2 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("直接问三件套：目标呢？截止呢？最后谁拍板？", "先把这锅编号。", ["CHOSEN", "BOUNDARY"], { carry: 3, boundary: 3 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("先发一句活人话，不然这个群像全员预制。", "给已读不回的空气通个电。", ["ALIVE", "EMOHEALER"], { repair: 3, carry: 1 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("提议拉个会，毕竟群不够乱，日历还可以更乱。", "会议永动机轻轻预热。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 1, decision: 1, structure: 2 }),
    a("先静音，等有人 @ 我全名再复活。", "低功耗待机，魂还在。", ["FISH", "CRISPY"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("空气方案", "领导说“你先做个能看的方案”，但没有背景、没有目标、没有人性。你脑内弹出：", [
    a("“能看”属于玄学，我先把范围、输入、交付物钉出来。", "把领导文学翻译成人类语言。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("我已经想好封面标题、副标题和一张战略大图了。", "空气开始自动分页。", ["PPTGOD", "WISHPOOL"], { bossy: 2, carry: 2 }, { energy: 1, information: 2, decision: 1, structure: 1 }),
    a("先糊个 MVP，能跑就行，别让项目死在出生证明上。", "先活下来，再谈精致。", ["FIREFIGHTER", "CHOSEN"], { carry: 4, repair: 2 }, { energy: 1, information: -1, decision: 2, structure: 0 }),
    a("这句话背后肯定还有领导没说出口的隐藏副本。", "需求雷达开始滴滴滴。", ["TWOFACE", "TRAITOR"], { chaos: 2, bossy: 2 }, { energy: 0, information: 2, decision: 1, structure: 0 }),
    a("先搜旧模板，别让生命从空白页开始燃烧。", "复用不是摆，是工位祖传医学。", ["AICOWORKER", "FISH"], { fish: 2, repair: 1 }, { energy: -1, information: -2, decision: 1, structure: 1 })
  ]),
  q("方案二选一", "两个方案都能交：一个稳得像砖头，一个温柔得像奶茶。你会：", [
    a("选砖头。奶茶可以补，事故不能复活。", "不是无情，是怕全员返工。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 2 }, { energy: -1, information: -1, decision: 2, structure: 2 }),
    a("先看谁会被压垮，方案不能靠献祭同事发光。", "人不是一次性耗材。", ["EMOHEALER", "CRISPY"], { repair: 4, boundary: 1 }, { energy: 1, information: 0, decision: -2, structure: 1 }),
    a("先选能止血的，价值观等系统不冒烟再开会。", "救火现场没有诗和远方。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3 }, { energy: 1, information: -1, decision: 1, structure: 0 }),
    a("包装成两阶段：第一阶段稳住，第二阶段说人话。", "成年人选择写进路线图。", ["PPTGOD", "CHOSEN"], { carry: 2, repair: 2, bossy: 1 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("先看会上谁嗓门最大，风往哪边吹我就往哪边长。", "职场变色龙开始热身。", ["TWOFACE", "TRAITOR"], { chaos: 3, bossy: 2 }, { energy: 1, information: 1, decision: -1, structure: -1 })
  ]),
  q("版本裸奔", "需求没落户、截止没上牌，但群里已经开始催“进展如何”。你更像：", [
    a("先锁一条生命线：今天做什么、不做什么、谁点头。", "先给项目穿条裤子。", ["BOUNDARY", "CHOSEN"], { boundary: 4, carry: 2 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("先冲一版能站起来的，别让群里继续空气拳击。", "先出生，再谈精装修。", ["FIREFIGHTER", "COWHORSE"], { carry: 4, pot: 1 }, { energy: 1, information: -1, decision: 1, structure: 0 }),
    a("我等关键人补信息，没信息不做电子法事。", "沉默但不盲冲。", ["SILENTGOD", "FISH"], { fish: 2, boundary: 2 }, { energy: -2, information: -2, decision: 1, structure: 1 }),
    a("先摊开各种可能性，万一能把烂活变成新副本呢。", "脑洞先上班。", ["WISHPOOL", "STIRRER"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("开个会，把“还没定”这件事正式定为“还没定”。", "日历：我又做错了什么。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 0, decision: 1, structure: 2 })
  ]),
  q("顺手文学", "同事说“你顺手帮我看一下，很快的”，但你知道这个“顺手”能顺到下周。", [
    a("我会问：你说的很快，是 5 分钟，还是半条命？", "让玄学落地。", ["BOUNDARY", "SILENTGOD"], { boundary: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("我嘴上说行，心里已经开始热锅。", "背锅肌肉记忆。", ["POTMAN", "COWHORSE"], { pot: 4, carry: 2 }, { energy: 0, information: -1, decision: -1, structure: 0 }),
    a("我会帮他拆一下，但不会替他做完。", "温柔但不代考。", ["EMOHEALER", "BOUNDARY"], { repair: 3, boundary: 3 }, { energy: 1, information: -1, decision: -1, structure: 1 }),
    a("我说可以，不过建议拉个小群同步。", "安排感微微发光。", ["LEADERCARD", "MEETINGBOT"], { bossy: 3, carry: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("我假装没看到，等它自然沉底，主打一个消息考古。", "工位潜水术。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("线上开席", "系统突然冒烟，报警群、客户群、老板群同时开席。你第一秒会：", [
    a("先看日志和影响范围，别被满屏尖叫带节奏。", "事实先上桌。", ["SILENTGOD", "SHITMOUNTAIN"], { legacy: 3, repair: 3 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("我先冲进去止血，复盘等活下来再上香。", "救火人已经拔栓。", ["FIREFIGHTER", "CHOSEN"], { carry: 4, repair: 3 }, { energy: 2, information: -1, decision: 1, structure: 0 }),
    a("我先接住用户和同事情绪，别让系统炸完人也炸。", "人类保全计划。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("我先问：这锅现在在谁头顶盘旋？", "锅流监控启动。", ["POTMAN", "TWOFACE"], { pot: 4, chaos: 2 }, { energy: 1, information: 0, decision: 1, structure: -1 }),
    a("我已经闻到前任代码复活的味道。", "旧系统诈尸，不是第一次。", ["SHITMOUNTAIN", "STIRRER"], { legacy: 4, chaos: 3 }, { energy: 0, information: 2, decision: 1, structure: -1 })
  ]),
  q("会议打转", "一个问题卡了 20 分钟，大家已经从讨论问题进化到讨论怎么讨论问题。", [
    a("我直接总结分歧、结论、待确认项。", "散装空气装盒。", ["CHOSEN", "PPTGOD"], { carry: 3, repair: 2 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("我建议再约 30 分钟，专门对齐为什么没对齐。", "会议永动机启动。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("我不开口，但会把关键点写到文档里。", "沉默输出。", ["SILENTGOD", "AICOWORKER"], { repair: 2, boundary: 1 }, { energy: -2, information: -2, decision: 1, structure: 2 }),
    a("我已经在小窗里处理别的事了。", "会议不产出，我产出自己。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: 0, structure: -2 }),
    a("我补一句灵魂提问，让场面更有剧情。", "气氛不能白尴尬。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 })
  ]),
  q("顺便变异", "需求已经改了三次，对方又说“能不能顺便加个小功能”。这个小功能长得像一栋楼。", [
    a("我会让他写清新增范围和优先级，顺便也要上户口。", "顺便也要有身份证。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("我先做当前最像样的一版，别问，问就是敏捷。", "先保命，再优雅。", ["FIREFIGHTER", "PPTGOD"], { carry: 3, repair: 2 }, { energy: 1, information: -1, decision: 1, structure: 0 }),
    a("我觉得这个顺便可以再顺便一下。", "宇宙下单上头。", ["WISHPOOL", "STIRRER"], { chaos: 4, bossy: 1 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("我开始准备对上解释为什么这是战略升级。", "格局打开。", ["TRAITOR", "LEADERCARD"], { bossy: 4, chaos: 1 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("我躲到角落，希望这次别点我名。", "脆皮避雷。", ["CRISPY", "FISH"], { fish: 3, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -1 })
  ]),
  q("屎山考古", "你接手一个没人敢碰的旧系统，文档最后更新时间像上个文明。", [
    a("先画结构图，标出哪里是雷、哪里是前任的墓碑。", "考古之前先画地图。", ["SHITMOUNTAIN", "SILENTGOD"], { legacy: 4, repair: 3 }, { energy: -2, information: -2, decision: 2, structure: 2 }),
    a("先救最痛的点，让今天别炸。", "临时续命也是命。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3 }, { energy: 1, information: -1, decision: 1, structure: 0 }),
    a("我会把它包装成技术债治理专项。", "屎山也可以有标题页。", ["PPTGOD", "LEADERCARD"], { bossy: 3, legacy: 2 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("我宣布这是祖传文化遗产，建议供起来。", "稳定地发疯。", ["STIRRER", "SHITMOUNTAIN"], { chaos: 4, legacy: 3 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("我先查有没有模板回复可以糊过去。", "人机自救。", ["AICOWORKER", "FISH"], { fish: 2, legacy: 1 }, { energy: -1, information: -1, decision: 1, structure: 0 })
  ]),
  q("新人十万个为什么", "新人连续问了 8 个基础问题，你的工位慈悲值开始闪烁。你更像：", [
    a("我整理一份新手文档，之后统一发，禁止无限复读。", "一次痛苦，长期止痛。", ["CHOSEN", "SILENTGOD"], { carry: 2, repair: 3 }, { energy: 0, information: -2, decision: 1, structure: 2 }),
    a("我先安抚他，刚来谁不是脆皮。", "每个新人都值得创可贴。", ["EMOHEALER", "CRISPY"], { repair: 4 }, { energy: 1, information: 0, decision: -2, structure: 0 }),
    a("我给入口，但不代做。", "善良有边界。", ["BOUNDARY", "AICOWORKER"], { boundary: 4 }, { energy: 0, information: -1, decision: 2, structure: 1 }),
    a("我让他去问另一个人，生态链要循环。", "自然界有自己的流转。", ["TWOFACE", "FISH"], { fish: 2, chaos: 2 }, { energy: 1, information: 1, decision: -1, structure: -1 }),
    a("我直接拉个新人答疑会。", "会议解决一切。", ["MEETINGBOT", "ALIVE"], { bossy: 2, repair: 2 }, { energy: 2, information: 0, decision: -1, structure: 2 })
  ]),
  q("跨部门翻译", "你要把一个复杂问题讲给完全不同频道的人听，最自然的起手式是：", [
    a("画流程图和边界表，少讲形容词，多画责任线。", "把锅画成可视化。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("做一套 PPT，把混乱压成三页：背景、问题、下一步。", "空气拥有页码。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 2 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("先讲一个所有人都听得懂的离谱比喻。", "把冰冷问题翻成人话。", ["ALIVE", "EMOHEALER"], { repair: 3 }, { energy: 2, information: 2, decision: -2, structure: 0 }),
    a("按模板发一版标准说明，礼貌、完整、像客服但有效。", "人机同事稳定营业。", ["AICOWORKER", "COWHORSE"], { carry: 2, repair: 1 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("我会先抛一个没人敢问的尖锐点，让场子别装没事。", "搅一下，水才知道多深。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: 1, structure: -1 })
  ]),
  q("功劳蒸发术", "汇报时，你肝出来的部分被一句“大家都辛苦了”轻轻火化。", [
    a("我补事实和数据，不吵，但劳动不能被无痕浏览。", "劳动不能自动蒸发。", ["BOUNDARY", "SILENTGOD"], { boundary: 3, repair: 2 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("算了，项目活了就行。", "牛马式自我安慰。", ["COWHORSE", "POTMAN"], { pot: 3, carry: 2 }, { energy: -1, information: -1, decision: -1, structure: 0 }),
    a("我私下同步关键人，下次别再透明。", "暗线对账。", ["TWOFACE", "TRAITOR"], { chaos: 2, bossy: 2 }, { energy: 1, information: 1, decision: 1, structure: 1 }),
    a("我下一版 PPT 把自己写进主标题。", "可视化劳动保护。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 1 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("我开玩笑吐槽一下，别让气氛死掉。", "活人感救场。", ["ALIVE", "EMOHEALER"], { repair: 2, chaos: 1 }, { energy: 2, information: 0, decision: -2, structure: -1 })
  ]),
  q("三点电量危机", "下午三点，你的灵魂显示“电量低于 5%，是否进入工位省电模式”。", [
    a("打开表格伪装，旁边小窗回血，手指随时准备切屏。", "系统散热中。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("休息 15 分钟，然后把最关键的活做完。", "摸鱼也要有闭环。", ["BOUNDARY", "CHOSEN"], { fish: 2, boundary: 2, carry: 1 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("我去找同事聊两句，充点人味。", "靠互动回血。", ["ALIVE", "EMOHEALER"], { repair: 2, fish: 1 }, { energy: 2, information: 0, decision: -2, structure: -1 }),
    a("我继续干，骂归骂，活还得走。", "牛马电量不科学。", ["COWHORSE", "FIREFIGHTER"], { carry: 4, pot: 1 }, { energy: 0, information: -1, decision: 1, structure: 1 }),
    a("我写个自动化/模板，让人看起来还在推进。", "人机省电模式。", ["AICOWORKER", "SILENTGOD"], { fish: 2, repair: 2 }, { energy: -2, information: -1, decision: 2, structure: 2 })
  ]),
  q("阴阳怪气预警", "群里有人开始阴阳怪气，空气脆得像薯片。你会：", [
    a("我把问题拉回事实和下一步。", "灭火不靠吼。", ["CHOSEN", "FIREFIGHTER"], { carry: 3, repair: 3 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("我先照顾情绪，别让人直接碎掉。", "工位急救包上线。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("我沉默观察，等关键证据出现。", "不急着站队。", ["SILENTGOD", "TWOFACE"], { repair: 2, boundary: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("我补一句更绝的，场面不能只尴尬，不精彩。", "剧情升级。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("我说大家先对齐目标，不要情绪化。", "领导味控场。", ["LEADERCARD", "TRAITOR"], { bossy: 4 }, { energy: 2, information: 0, decision: 1, structure: 2 })
  ]),
  q("上下游孽缘", "上游轻轻改了一个字段，下游直接原地开席。你会：", [
    a("先确认影响面和回滚方案。", "事故要先有地图。", ["SILENTGOD", "SHITMOUNTAIN"], { legacy: 4, repair: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("我先救下游，今天别一起沉。", "救火链路启动。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("我会把变更流程写出来，别再裸奔。", "边界和流程救命。", ["BOUNDARY", "CHOSEN"], { boundary: 4, carry: 1 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("我觉得可以顺便借机升级整个方案。", "需求神灯冒烟。", ["WISHPOOL", "PPTGOD"], { chaos: 3, bossy: 2 }, { energy: 2, information: 2, decision: -1, structure: -1 }),
    a("我先看热闹，再决定要不要锐评。", "搅局雷达响了。", ["STIRRER", "FISH"], { chaos: 3, fish: 2 }, { energy: 1, information: 1, decision: -1, structure: -2 })
  ]),
  q("领导味识别", "你最怕哪种“领导体验卡”行为？", [
    a("没有权限但疯狂安排别人。", "压迫感先行。", ["LEADERCARD", "BOUNDARY"], { bossy: 3, boundary: 1 }, { energy: 1, information: 0, decision: 2, structure: 1 }),
    a("复读老板话术，还说大家格局打开。", "工贼味飘出屏幕。", ["TRAITOR", "TWOFACE"], { bossy: 3, chaos: 2 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("无限开会，但不产结论。", "日历受难。", ["MEETINGBOT", "FISH"], { bossy: 4, fish: 1 }, { energy: 2, information: 0, decision: -1, structure: 2 }),
    a("需求天天顺便，别人天天加班。", "顺便文学重灾区。", ["WISHPOOL", "CRISPY"], { chaos: 3, pot: 1 }, { energy: 1, information: 2, decision: -1, structure: -1 }),
    a("画饼很美，落地时自动失踪。", "PPT 飞得比活快。", ["PPTGOD", "POTMAN"], { bossy: 2, pot: 2 }, { energy: 1, information: 1, decision: 0, structure: 1 })
  ]),
  q("工贼雷达", "朋友测出“工贼嫌疑人”，你会怎么反应？", [
    a("先截图发他：解释一下，老板什么时候买你号了？", "友情审判开庭。", ["TWOFACE", "STIRRER"], { chaos: 4 }, { energy: 2, information: 1, decision: -1, structure: -1 }),
    a("先看他是不是只是求生话术，不急着判刑。", "给人留余地。", ["EMOHEALER", "ALIVE"], { repair: 3 }, { energy: 1, information: 0, decision: -2, structure: 0 }),
    a("和他约法三章：别在我面前格局打开。", "边界贴脸。", ["BOUNDARY", "COWHORSE"], { boundary: 4 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("让他帮我去跟领导对齐，废物利用一下。", "你也很会安排。", ["LEADERCARD", "TRAITOR"], { bossy: 4 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("我默默记下，以后重要事不交给他。", "沉默拉黑。", ["SILENTGOD", "AICOWORKER"], { boundary: 2, repair: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 })
  ]),
  q("汇报前夜", "明天要汇报，材料还散成一地，PPT 像刚从废纸篓里复活。你会：", [
    a("我搭结构、压标题、统一口径，先把它变成能上桌的东西。", "PPT 仙术启动。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 2 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("我补数据和证据，漂亮话不能单独上场。", "事实是骨架，不然全是滤镜。", ["SILENTGOD", "BOUNDARY"], { repair: 2, boundary: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("我先把能看的拼出来，明天别让项目裸奔进会议室。", "先保命，再精修。", ["FIREFIGHTER", "COWHORSE"], { carry: 4, pot: 1 }, { energy: 0, information: -1, decision: 1, structure: 1 }),
    a("我负责把大家安抚到还能继续改，不然材料没死，人先没了。", "情绪续杯到凌晨。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("我建议先讲愿景，细节后面再补，气势先赢。", "愿望池开始冒泡。", ["WISHPOOL", "TRAITOR"], { bossy: 2, chaos: 2 }, { energy: 2, information: 2, decision: -1, structure: -1 })
  ]),
  q("预制回复", "客户问了一个你暂时不想深聊的问题，你的脑内弹出 12 条预制话术。", [
    a("我按模板回复，礼貌、稳定、不露情绪，像刚出厂。", "人机同事上线。", ["AICOWORKER", "SILENTGOD"], { repair: 2, boundary: 1 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("我先确认他真正想解决什么。", "别被表面问题骗了。", ["CHOSEN", "EMOHEALER"], { repair: 3, carry: 1 }, { energy: 1, information: 1, decision: -1, structure: 1 }),
    a("我让他写清楚场景和验收标准。", "需求没有免检通道。", ["BOUNDARY", "PPTGOD"], { boundary: 3, bossy: 1 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("我转给更适合背锅的人。", "锅开始流转。", ["TWOFACE", "POTMAN"], { pot: 3, chaos: 2 }, { energy: 1, information: 0, decision: -1, structure: -1 }),
    a("我先已读，等对方自己补充。", "低功耗等待。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("活人感巡检", "群聊又陷入“收到”“辛苦了”“好的”三件套，你会：", [
    a("我发一句真的有信息量的问题。", "给群聊上氧。", ["ALIVE", "CHOSEN"], { carry: 2, repair: 2 }, { energy: 2, information: -1, decision: 1, structure: 1 }),
    a("我发个轻松回应，别让大家像机器。", "活人感补丁。", ["ALIVE", "EMOHEALER"], { repair: 3 }, { energy: 2, information: 0, decision: -2, structure: -1 }),
    a("我不发，重要信息我私下说。", "安静但有效。", ["SILENTGOD", "TWOFACE"], { repair: 2 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("我按标准话术回复，安全不出错。", "礼貌出厂设置。", ["AICOWORKER", "TRAITOR"], { bossy: 1, repair: 1 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("我发一句锐评，看看谁先笑出声。", "空气动起来了。", ["STIRRER", "FISH"], { chaos: 3, fish: 1 }, { energy: 2, information: 1, decision: -1, structure: -2 })
  ]),
  q("同事升温信号", "你和同事关系变好的标志不是加微信，而是：", [
    a("能一起骂项目，但骂完会互相补台。", "真正的战友情。", ["COWHORSE", "EMOHEALER"], { repair: 3, pot: 1 }, { energy: 1, information: 0, decision: -1, structure: 0 }),
    a("能互相打掩护：你摸鱼我不问，我离线你别喊。", "低功耗契约。", ["FISH", "BOUNDARY"], { fish: 4, boundary: 2 }, { energy: -1, information: 0, decision: -1, structure: -1 }),
    a("他听得懂我一句“这不基础”的含金量。", "懂边界的人很珍贵。", ["BOUNDARY", "SILENTGOD"], { boundary: 4 }, { energy: -1, information: -1, decision: 2, structure: 2 }),
    a("我能当面吐槽他，他还能接梗。", "好闺/gay 蜜雷达响。", ["TWOFACE", "ALIVE"], { chaos: 2, repair: 2 }, { energy: 2, information: 1, decision: -2, structure: -1 }),
    a("我一说对齐，他没有立刻拉黑我。", "罕见宽容。", ["MEETINGBOT", "LEADERCARD"], { bossy: 3 }, { energy: 2, information: 0, decision: 1, structure: 2 })
  ]),
  q("角色自认", "下面哪句话最像你的上班底层系统？", [
    a("活可以干，但话要先说明白。", "边界是第一生产力。", ["BOUNDARY", "SILENTGOD"], { boundary: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("人可以累，但项目不能炸在我手里。", "被迫可靠。", ["CHOSEN", "FIREFIGHTER"], { carry: 4, repair: 1 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("我不是摆烂，我是在有限生命里调度电量。", "低功耗哲学。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("既然都这么乱了，不如让我来锐评一下。", "混乱中寻找舞台。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("我像公司默认插件，稳定回复，稳定交付。", "人机但靠谱。", ["AICOWORKER", "COWHORSE"], { carry: 2, repair: 1 }, { energy: -1, information: -2, decision: 1, structure: 2 })
  ]),
  q("理想搭子", "你最想和哪种同事绑定一个项目？", [
    a("能救火，也能记得我快没电了。", "一边灭火一边回血。", ["FIREFIGHTER", "EMOHEALER"], { repair: 3, carry: 1 }, { energy: 1, information: 0, decision: -1, structure: 1 }),
    a("能把复杂问题安静搞定。", "沉默但可靠。", ["SILENTGOD", "CHOSEN"], { repair: 2, carry: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("能一起骂，但骂完还能干。", "牛马战友情。", ["COWHORSE", "POTMAN"], { carry: 2, pot: 2 }, { energy: 0, information: -1, decision: -1, structure: 0 }),
    a("能把需求讲成故事，把人讲到愿意买单。", "表达型搭子。", ["PPTGOD", "TRAITOR"], { bossy: 3, chaos: 1 }, { energy: 2, information: 2, decision: -1, structure: 1 }),
    a("能跟我一起看热闹，不拆穿我的小窗。", "摸鱼搭子成立。", ["FISH", "STIRRER"], { fish: 3, chaos: 2 }, { energy: 1, information: 1, decision: -1, structure: -2 })
  ]),
  q("绑定恐惧", "你最怕和哪种人长期绑定？", [
    a("什么都顺便的需求许愿池。", "顺便两个字让人报警。", ["WISHPOOL", "BOUNDARY"], { chaos: 3, boundary: 1 }, { energy: 1, information: 2, decision: -1, structure: -1 }),
    a("会开会但不产结论的会议永动机。", "日历持续受难。", ["MEETINGBOT", "FISH"], { bossy: 3, fish: 1 }, { energy: 2, information: 0, decision: -1, structure: 2 }),
    a("锅来了失忆，功劳来了上线。", "背锅体质被动触发。", ["POTMAN", "TWOFACE"], { pot: 3, chaos: 1 }, { energy: 1, information: 0, decision: 1, structure: -1 }),
    a("把所有问题搅成连续剧的人。", "剧情太多也会工伤。", ["STIRRER", "SHITMOUNTAIN"], { chaos: 4, legacy: 2 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("标准得像模板，但关键时刻没人味。", "人机恐惧。", ["AICOWORKER", "EMOHEALER"], { repair: 1, boundary: 1 }, { energy: -1, information: -1, decision: 1, structure: 2 })
  ]),
  q("反向检查", "下面哪句话最不像真实的你？", [
    a("我从不摸鱼，从不崩溃，从不阴阳怪气。", "过于出厂设置。", ["AICOWORKER", "CRISPY"], { fish: 1 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("我永远愿意无条件接住所有临时需求。", "边界门神听了想关门。", ["BOUNDARY", "POTMAN"], { boundary: 3, pot: 1 }, { energy: -1, information: -1, decision: 2, structure: 2 }),
    a("我开会永远都有结论，且从不废话。", "会议永动机表示不服。", ["MEETINGBOT", "LEADERCARD"], { bossy: 2 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("我对领导话术没有任何免疫反应。", "工贼嫌疑度微妙上升。", ["TRAITOR", "TWOFACE"], { bossy: 2, chaos: 1 }, { energy: 1, information: 1, decision: 1, structure: 1 }),
    a("我从不幻想重构世界，也不许愿。", "需求神灯被按灭。", ["WISHPOOL", "PPTGOD"], { chaos: 2, bossy: 1 }, { energy: 1, information: 2, decision: -1, structure: -1 })
  ]),
  q("结果气质", "最后一题：你希望这个结果给你的感觉是：", [
    a("像监控看过我上班，准到想关页面。", "精准比热闹重要。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("够好笑，能发群里让大家认领。", "分享即开庭。", ["ALIVE", "STIRRER"], { chaos: 3, repair: 1 }, { energy: 2, information: 1, decision: -2, structure: -1 }),
    a("嘴损但暖，像好朋友骂醒我。", "扎心也要抱一下。", ["EMOHEALER", "TWOFACE"], { repair: 3, chaos: 1 }, { energy: 1, information: 1, decision: -2, structure: 0 }),
    a("最好能变成头像、贴纸、陶瓷小人。", "人格必须实体化。", ["CHOSEN", "PPTGOD"], { carry: 1, bossy: 1 }, { energy: 1, information: 2, decision: -1, structure: 1 }),
    a("别太严肃，我就是想知道今天像哪种打工人。", "轻轻认领，别上纲上线。", ["FISH", "CRISPY"], { fish: 3 }, { energy: -1, information: 0, decision: -1, structure: -2 })
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
