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
    name: "职场神灯",
    gender: "女",
    group: "support",
    meme: "你的愿望我来想办法",
    tagline: "别人随口许个愿，你真的回去搓方案。",
    copy: "你不是不断加需求的甲方，而是工位上的神灯精灵。别人说想要什么，你会主动找办法、找资源，把愿望做成能用的东西。问题是神灯能量有限，你却常常忘了说不。",
    artifact: "阿拉丁神灯、从灯口出现的精灵、已实现的愿望清单",
    traits: ["主动圆梦", "灵活变通", "承诺过量"],
    factors: { carry: 72, fish: 18, boundary: 24, chaos: 28, bossy: 26, pot: 52, repair: 90, legacy: 30 },
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
  q("临时拉群", "周一刚坐下，你被拉进一个【工作群】，消息已经【99+】，没人说你要干什么。你先：", [
    a("【翻完聊天记录和文件，弄清前因后果再开口。】群聊考古，先找说明书。", "群聊考古，先找说明书。", ["SILENTGOD", "SHITMOUNTAIN"], { repair: 2, legacy: 2, boundary: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 }),
    a("【直接问清任务、截止时间和负责人。】接活可以，盲盒不拆。", "接活可以，盲盒不拆。", ["BOUNDARY", "CHOSEN"], { carry: 2, boundary: 4 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("【先回一句“我在，需要帮忙叫我”。】全员已读里终于有个活人。", "全员已读里终于有个活人。", ["ALIVE", "EMOHEALER"], { repair: 4, carry: 1 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("【把相关的人叫来开个短会，当场分工。】群还没捂热，会先约上了。", "群还没捂热，会先约上了。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("【群先静音，明确叫到我再看。】不点名，就当我没刷新。", "不点名，就当我没刷新。", ["FISH", "CRISPY"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("需求没说清", "领导让你【明天交活动方案】，却【没告诉你活动目标、预算和具体要求】。你会先：", [
    a("【先问清活动目标、预算和参加人数。】领导语先翻译成人话。", "领导语先翻译成人话。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("【列出三个活动方向，让领导先选一个。】先给菜单，别让我盲炒。", "先给菜单，别让我盲炒。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 1 }, { energy: 1, information: 1, decision: 0, structure: 2 }),
    a("【先做一版草案，拿给领导看着改。】审稿可以，读心不行。", "审稿可以，读心不行。", ["FIREFIGHTER", "CHOSEN"], { carry: 4, repair: 2 }, { energy: 2, information: -1, decision: 1, structure: 0 }),
    a("【找领导以前夸过的方案，照那个风格做。】领导的喜好也是参考答案。", "领导的喜好也是参考答案。", ["TRAITOR", "TWOFACE"], { bossy: 4, chaos: 2 }, { energy: 1, information: 2, decision: 1, structure: 0 }),
    a("【拿旧模板改一改，明天先交上去。】模板续命，今晚不从零开始。", "模板续命，今晚不从零开始。", ["AICOWORKER", "FISH"], { fish: 2, repair: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 })
  ]),
  q("顺手半天", "同事说【“帮我弄一下，很快的”】，你一看，至少要忙半天，自己的活也没完。你会：", [
    a("【直接拒绝，让他另找人。】顺手不等于接盘。", "顺手不等于接盘。", ["SHIFTER", "BOUNDARY"], { boundary: 3, chaos: 2, fish: 1, pot: -1 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("【只帮十分钟，剩下的让他自己做。】友情有，无限续杯没有。", "友情有，无限续杯没有。", ["BOUNDARY", "SILENTGOD"], { boundary: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("【教他方法和资料在哪，不替他做完。】送你攻略，副本自己打。", "送你攻略，副本自己打。", ["EMOHEALER", "BOUNDARY"], { repair: 4, boundary: 2 }, { energy: 1, information: -1, decision: -1, structure: 1 }),
    a("【把两人的工作排个先后，先一起做最急的。】先排队，别让热心变超载。", "先排队，别让热心变超载。", ["CHOSEN", "AICOWORKER"], { carry: 2, boundary: 2, repair: 1 }, { energy: 0, information: -2, decision: 1, structure: 2 }),
    a("【先说忙完再看，暂时不接他的活。】等会儿是多久？我也还没定。", "等会儿是多久？我也还没定。", ["FISH", "CRISPY"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("休息被撞见", "刚忙完，你歇着刷了会儿手机，【领导突然从旁边走过】。你会：", [
    a("【立刻切回工作画面，装作一直在忙。】切屏速度就是求生欲。", "切屏速度就是求生欲。", ["FISH", "AICOWORKER"], { fish: 4, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("【继续检查刚做完的工作，顺手补遗漏。】休息键没按稳，又上班了。", "休息键没按稳，又上班了。", ["CHOSEN", "SILENTGOD"], { carry: 2, repair: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("【主动叫住领导，问一件等他决定的事。】领导路过，待办递上。", "领导路过，待办递上。", ["LEADERCARD", "PPTGOD"], { bossy: 3, carry: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("【照常休息，不演忙。】工作做完，休息有理。", "工作做完，休息有理。", ["BOUNDARY", "FISH"], { fish: 2, boundary: 4 }, { energy: -1, information: 0, decision: 2, structure: 1 }),
    a("【紧张地放下手机，等领导走了再歇。】人没犯错，心先罚站。", "人没犯错，心先罚站。", ["CRISPY", "EMOHEALER"], { fish: 3, repair: 2 }, { energy: -1, information: 0, decision: -2, structure: -1 })
  ]),
  q("交付翻车", "你们今天要交给客户的东西【出了错】，客户催、领导问，你也在群里。你先：", [
    a("【先查错在哪里，再决定怎么修。】先查现场，别靠嗓门破案。", "先查现场，别靠嗓门破案。", ["SILENTGOD", "SHITMOUNTAIN"], { repair: 3, legacy: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("【先找替代办法，让客户今天有东西可用。】先救今天，明天再复盘。", "先救今天，明天再复盘。", ["FIREFIGHTER", "CHOSEN"], { carry: 4, repair: 4 }, { energy: 2, information: -1, decision: 1, structure: 0 }),
    a("【先回复客户，说明情况和处理时间。】东西出了错，消息别失踪。", "东西出了错，消息别失踪。", ["EMOHEALER", "ALIVE"], { repair: 4, pot: 1 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("【叫原负责人处理，说明哪些不是我负责的。】先分清锅，再决定谁开火。", "先分清锅，再决定谁开火。", ["SHIFTER", "TWOFACE"], { boundary: 3, chaos: 3, bossy: 1, pot: -1 }, { energy: 1, information: 0, decision: 2, structure: 0 }),
    a("【先翻旧记录，照以前的办法处理。】熟悉的坑，熟悉的配方。", "熟悉的坑，熟悉的配方。", ["SHITMOUNTAIN", "STIRRER"], { legacy: 4, chaos: 3 }, { energy: 0, information: 2, decision: 1, structure: -1 })
  ]),
  q("会生会", "会开了【40 分钟还没结论】，大家又把刚才的话说了一遍。你会：", [
    a("【总结分歧，请负责人当场定下一步。】今天这个会总得有个下班点。", "今天这个会总得有个下班点。", ["CHOSEN", "PPTGOD"], { carry: 3, repair: 2 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("【再约一场会，把没来的人也叫齐。】此会未完，下会待续。", "此会未完，下会待续。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("【不参与争论，记好要点会后发出来。】嘴没上线，笔记已交付。", "嘴没上线，笔记已交付。", ["SILENTGOD", "AICOWORKER"], { repair: 2, boundary: 2 }, { energy: -2, information: -2, decision: 1, structure: 2 }),
    a("【边听边做自己的事，叫到我再说。】身体参会，手上另有安排。", "身体参会，手上另有安排。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("【直接问这件事还有没有必要继续做。】大家在修车，你问为什么开车。", "大家在修车，你问为什么开车。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 })
  ]),
  q("再加一点点", "已经改了三遍，对方又说【“顺便再加一点”】，但【交的时间不能晚】。你会：", [
    a("【要么延期，要么删内容，先谈好再做。】可以加单，不能白加班。", "可以加单，不能白加班。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("【只交原先约好的内容，新增暂时不接。】先保饭碗里的，别再往锅里倒。", "先保饭碗里的，别再往锅里倒。", ["FIREFIGHTER", "COWHORSE"], { carry: 4, pot: 1 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("【问清对方最想实现的效果，另想个省时的办法帮他做到。】别人说想要，我已经开始搓神灯。", "别人说想要，我已经开始搓神灯。", ["WISHPOOL", "PPTGOD"], { carry: 2, repair: 4, boundary: 1 }, { energy: 2, information: 2, decision: -2, structure: -1 }),
    a("【把新要求列进下一轮，约定另一次交付。】给新增找个名分和日期。", "给新增找个名分和日期。", ["TRAITOR", "LEADERCARD"], { bossy: 4, chaos: 2 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("【先全部答应，加班也自己做完。】嘴说没问题，心说大问题。", "嘴说没问题，心说大问题。", ["CRISPY", "POTMAN"], { fish: 2, pot: 3 }, { energy: -2, information: 0, decision: -1, structure: -1 })
  ]),
  q("接班还是接盘", "前同事离职，你来接他的活。文件夹里全是【“最终版”“最终版2”“真最终版”】，没人知道【该用哪个】。你会：", [
    a("【逐个核对文件，整理出能用的版本。】屎山继承人，先清点遗产。", "屎山继承人，先清点遗产。", ["SHITMOUNTAIN", "SILENTGOD"], { legacy: 4, repair: 3, boundary: 1 }, { energy: -2, information: -2, decision: 2, structure: 2 }),
    a("【只找今天要用的文件，其他先不管。】今天先活着，考古明天继续。", "今天先活着，考古明天继续。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3, repair: 2 }, { energy: 1, information: -1, decision: 1, structure: 0 }),
    a("【向领导要整理时间或帮手，不独自接盘。】历史遗留，不能全靠我遗传。", "历史遗留，不能全靠我遗传。", ["PPTGOD", "LEADERCARD"], { bossy: 3, legacy: 3 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("【把乱文件发群里吐槽，让大家看看这堆遗产。】考古文学，素材自己送上门。", "考古文学，素材自己送上门。", ["STIRRER", "SHITMOUNTAIN"], { chaos: 4, legacy: 3 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("【直接联系前同事，请他指出该用哪个。】文件没说明书，试着联系原作者。", "文件没说明书，试着联系原作者。", ["AICOWORKER", "FISH"], { fish: 2, legacy: 2, repair: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 })
  ]),
  q("新人十万个为什么", "新人一天问了你好几次，你自己的工作【被打断得七零八落】。你会：", [
    a("【写一份常见问题清单，以后统一发给他。】今天多写一页，明天少答十遍。", "今天多写一页，明天少答十遍。", ["CHOSEN", "SILENTGOD"], { carry: 2, repair: 3 }, { energy: 0, information: -2, decision: 1, structure: 2 }),
    a("【继续逐个解答，先把新人带会。】新人保护期，耐心续费中。", "新人保护期，耐心续费中。", ["EMOHEALER", "CRISPY"], { repair: 4 }, { energy: 1, information: 0, decision: -2, structure: 0 }),
    a("【给他一个例子，让他自己照着试。】可以带路，不全程代走。", "可以带路，不全程代走。", ["BOUNDARY", "AICOWORKER"], { boundary: 3, repair: 2 }, { energy: 0, information: -1, decision: 2, structure: 1 }),
    a("【约一个固定答疑时间，其他时候先不打断我。】问题集中开会，工作集中续命。", "问题集中开会，工作集中续命。", ["MEETINGBOT", "ALIVE"], { bossy: 2, repair: 2 }, { energy: 2, information: 0, decision: -1, structure: 2 }),
    a("【直接说没空，让他找别人问。】热心有额度，今天已用完。", "热心有额度，今天已用完。", ["TWOFACE", "FISH"], { fish: 3, chaos: 2 }, { energy: 0, information: 1, decision: -1, structure: -1 })
  ]),
  q("自愿团建", "公司通知【周五下班后聚餐】，还特意写了【“自愿参加”】。你会：", [
    a("【不去，下班后有自己的安排。】自愿这两个字，我先当真了。", "自愿这两个字，我先当真了。", ["BOUNDARY", "CRISPY"], { boundary: 4, fish: 3 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("【主动报名，想和同事聚一聚。】终于有个不用看表格的群活动。", "终于有个不用看表格的群活动。", ["ALIVE", "EMOHEALER"], { repair: 3, carry: 1 }, { energy: 2, information: 0, decision: -2, structure: 1 }),
    a("【不想去，但大家都去我就跟着去。】人在饭桌，心在被窝。", "人在饭桌，心在被窝。", ["COWHORSE", "POTMAN"], { carry: 2, pot: 2 }, { energy: 0, information: -1, decision: -1, structure: 0 }),
    a("【主动负责订位和安排，张罗这顿饭。】连吃顿饭都自带负责人气质。", "连吃顿饭都自带负责人气质。", ["MEETINGBOT", "LEADERCARD"], { bossy: 3, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("【先看领导和熟人去不去，再决定。】聚餐报名，先做人员调研。", "聚餐报名，先做人员调研。", ["TWOFACE", "TRAITOR"], { chaos: 2, bossy: 2 }, { energy: 1, information: 1, decision: 0, structure: -1 })
  ]),
  q("我的名字呢", "汇报时，你忙了好几天做的部分被带过了，【没提到你】。你会：", [
    a("【当场补充自己的贡献，让大家知道我做了什么。】活不能白干，名字不能蒸发。", "活不能白干，名字不能蒸发。", ["BOUNDARY", "SILENTGOD"], { boundary: 3, repair: 2 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("【当场不说，功劳这次就不争了。】嘴上算了，心里记着。", "嘴上算了，心里记着。", ["COWHORSE", "POTMAN"], { carry: 2, pot: 4 }, { energy: -1, information: -1, decision: -1, structure: 0 }),
    a("【会后单独找负责人，要求下次别漏掉我。】不抢话筒，单独把账对上。", "不抢话筒，单独把账对上。", ["SHIFTER", "TWOFACE"], { boundary: 2, chaos: 2, bossy: 1, pot: -1 }, { energy: 1, information: -1, decision: 2, structure: 1 }),
    a("【下次提前把自己的贡献写进汇报材料。】让我的名字住进材料里。", "让我的名字住进材料里。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 2 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("【半开玩笑地提醒：“我的名字怎么没上榜？”】笑着开麦，功劳归位。", "笑着开麦，功劳归位。", ["ALIVE", "STIRRER"], { chaos: 2, repair: 2 }, { energy: 2, information: 1, decision: -1, structure: -1 })
  ]),
  q("下午三点已关机", "下午三点，你【困得看字都重影】，手头还有活。你会：", [
    a("【偷偷刷手机，想干了再继续。】工位省电模式已开启。", "工位省电模式已开启。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("【定个十分钟闹钟，休息完回来做。】休息有闹钟，摸鱼有归期。", "休息有闹钟，摸鱼有归期。", ["BOUNDARY", "CHOSEN"], { fish: 2, boundary: 2, carry: 1 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("【找同事聊会儿天，给自己提提神。】电量不足，补点人味。", "电量不足，补点人味。", ["ALIVE", "EMOHEALER"], { repair: 2, fish: 1 }, { energy: 2, information: 0, decision: -2, structure: -1 }),
    a("【硬撑着继续做，不做完不安心。】电量红了，工作灯还亮着。", "电量红了，工作灯还亮着。", ["COWHORSE", "FIREFIGHTER"], { carry: 4, pot: 1 }, { energy: 0, information: -1, decision: 1, structure: 1 }),
    a("【先做重复的小事，费脑子的晚点再做。】大脑歇班，流程继续上班。", "大脑歇班，流程继续上班。", ["AICOWORKER", "SILENTGOD"], { fish: 2, repair: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 })
  ]),
  q("在吗的含金量", "晚上八点，领导发来【“在吗，简单看一下”】，没说是不是急事。你会：", [
    a("【明天上班再回，今晚不处理。】下班了，客服不在线。", "下班了，客服不在线。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, fish: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 }),
    a("【先问清是否紧急，真急才接。】紧急通道有，随叫随到没有。", "紧急通道有，随叫随到没有。", ["FIREFIGHTER", "CHOSEN"], { carry: 3, boundary: 2 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("【立刻打开处理，做完再休息。】手机一响，工牌自动戴上。", "手机一响，工牌自动戴上。", ["AICOWORKER", "CRISPY"], { fish: 2, boundary: 2 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("【先回复“收到，马上看”，但不一定现在做。】人还在沙发，态度已到公司。", "人还在沙发，态度已到公司。", ["MEETINGBOT", "TRAITOR"], { bossy: 4, carry: 1 }, { energy: 2, information: 1, decision: 1, structure: 2 }),
    a("【暂时不点开，想回的时候再回。】这条消息需要一点心理准备。", "这条消息需要一点心理准备。", ["CRISPY", "FISH"], { fish: 4, boundary: 2 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("群聊变辩论赛", "工作出了问题，两个同事在群里【互相指责】，你也参与过这件事。你会：", [
    a("【把事实和解决办法发出来，先停止争吵。】先干正事，吵架暂停。", "先干正事，吵架暂停。", ["CHOSEN", "FIREFIGHTER"], { carry: 3, repair: 3 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("【分别私聊劝和，不在群里站队。】群里冒火，私聊降温。", "群里冒火，私聊降温。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("【先旁观，情况不清楚就不开口。】证据没到齐，麦克风先关着。", "证据没到齐，麦克风先关着。", ["SILENTGOD", "TWOFACE"], { boundary: 2, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("【直接点出谁的问题，不怕当场得罪人。】气氛已经到这儿了，再添一句。", "气氛已经到这儿了，再添一句。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("【请负责人出面拍板，不陪着继续吵。】请能拍板的人结束这集。", "请能拍板的人结束这集。", ["LEADERCARD", "TRAITOR"], { bossy: 4, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 })
  ]),
  q("你改我重做", "另一组改了安排，害你【做好的东西全部重来】，他们还说【“以为你知道”】。你会：", [
    a("【先核对哪里变了，弄清要重做多少。】先查版本，别先查情绪。", "先查版本，别先查情绪。", ["SILENTGOD", "SHITMOUNTAIN"], { legacy: 3, repair: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("【先补救眼前要交的东西，责任之后再说。】谁改的以后说，今天先救。", "谁改的以后说，今天先救。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("【让改安排的人承担返工，不默认我兜底。】谁点的加餐，谁认这笔账。", "谁点的加餐，谁认这笔账。", ["SHIFTER", "BOUNDARY"], { boundary: 3, chaos: 3, pot: -1 }, { energy: 0, information: -2, decision: 2, structure: 1 }),
    a("【等两边统一意见后再动手，免得又白做。】双方还在辩论，我先退出会场。", "双方还在辩论，我先退出会场。", ["STIRRER", "FISH"], { chaos: 3, fish: 2 }, { energy: 1, information: 1, decision: -1, structure: -2 }),
    a("【自己补做新要求，把双方想要的效果一起实现。】别人改需求，我给愿望加班。", "别人改需求，我给愿望加班。", ["WISHPOOL", "CHOSEN"], { carry: 3, repair: 4, pot: 2 }, { energy: 2, information: 2, decision: -1, structure: -1 })
  ]),
  q("现在就要答案", "客户问【这周能不能完成】，你还没核实进度，他就催你【“现在给个准话”】。你会：", [
    a("【说清还没核实，约好几点给准话。】暂时不知道，也是一种诚实交付。", "暂时不知道，也是一种诚实交付。", ["AICOWORKER", "SILENTGOD"], { repair: 2, boundary: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("【先问客户为什么急，弄清他真正需要什么。】先问需求，别急着考试。", "先问需求，别急着考试。", ["BOUNDARY", "CHOSEN"], { boundary: 3, carry: 1 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("【先安抚客户，但不承诺能不能按时完成。】答案还在路上，态度先到。", "答案还在路上，态度先到。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("【把问题交给领导决定，不代替他承诺。】这题超纲，请有签字权的人答。", "这题超纲，请有签字权的人答。", ["TRAITOR", "LEADERCARD"], { bossy: 4, chaos: 1 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("【另提一个能先交的版本，并主动想办法做出来。】愿望太大？神灯先给你变个能用的。", "愿望太大？神灯先给你变个能用的。", ["WISHPOOL", "FIREFIGHTER"], { carry: 3, repair: 4 }, { energy: 1, information: 2, decision: -2, structure: 0 })
  ]),
  q("多干点是福报", "最近总让你多干活，钱没多一分，领导还说【“年轻人多锻炼”】。你会：", [
    a("【当面反问：只加活不加钱，锻炼的到底是谁？】锻炼肌肉行，锻炼工资也行吧。", "锻炼肌肉行，锻炼工资也行吧。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 1, decision: -1, structure: -1 }),
    a("【找同事吐槽，看看是不是大家都这样。】先找个懂的人，一起把气喘匀。", "先找个懂的人，一起把气喘匀。", ["EMOHEALER", "ALIVE"], { repair: 3 }, { energy: 1, information: 0, decision: -2, structure: 0 }),
    a("【谈清工作量和回报，谈不拢就不额外接。】成长可以，长期白送不行。", "成长可以，长期白送不行。", ["BOUNDARY", "COWHORSE"], { boundary: 4 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("【整理自己的成果，主动争取升职加薪。】既然做了，就得拿去谈条件。", "既然做了，就得拿去谈条件。", ["LEADERCARD", "TRAITOR"], { bossy: 4 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("【以后只做份内的事，不争也不多干。】期待下调，职责照办。", "期待下调，职责照办。", ["SILENTGOD", "AICOWORKER"], { boundary: 2, repair: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 })
  ]),
  q("两套发言稿", "领导定了个你不看好的做法。散会后，同事问：【“你也觉得这主意不行吧？”】你会：", [
    a("【说出真实想法，对领导和同事都一个说法。】我的意见没有领导特供版。", "我的意见没有领导特供版。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 }),
    a("【放开吐槽，刚才没敢说的现在全说。】会议室闭麦，茶水间全开。", "会议室闭麦，茶水间全开。", ["STIRRER", "ALIVE"], { chaos: 4 }, { energy: 2, information: 1, decision: -1, structure: -2 }),
    a("【先听同事在担心什么，不急着评价领导。】先接住情绪，再接这个话题。", "先接住情绪，再接这个话题。", ["EMOHEALER", "POTMAN"], { repair: 4, pot: 1 }, { energy: 1, information: 0, decision: -2, structure: 1 }),
    a("【对领导说好，对同事说对，两边都顺着。】上班两副面孔，主打一个丝滑切换。", "上班两副面孔，主打一个丝滑切换。", ["TWOFACE", "TRAITOR"], { chaos: 3, bossy: 3 }, { energy: 1, information: 2, decision: 0, structure: 0 }),
    a("【建议一起向领导提意见，不只在私下说。】两套话不如开一桌讲。", "两套话不如开一桌讲。", ["BOUNDARY", "LEADERCARD"], { boundary: 3, bossy: 2 }, { energy: 1, information: -1, decision: 2, structure: 2 })
  ]),
  q("低电量硬撑", "连续忙了好几天，你已经【累得很难集中注意力】，事情还没结束。你会：", [
    a("【直接休息或请假，身体撑不住就停。】人不是充电五分钟就能继续转。", "人不是充电五分钟就能继续转。", ["CRISPY", "BOUNDARY"], { fish: 3, boundary: 4 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("【继续撑到这轮结束，现在还不能停。】再撑一轮，是我最熟的台词。", "再撑一轮，是我最熟的台词。", ["COWHORSE", "POTMAN"], { carry: 4, pot: 3 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("【请别人分担，重新安排工作量。】这次不单刷，发起组队。", "这次不单刷，发起组队。", ["CHOSEN", "EMOHEALER"], { carry: 2, repair: 3 }, { energy: 1, information: -1, decision: -1, structure: 2 }),
    a("【简化重复步骤，让剩下的活省点力。】给重复劳动装个省力开关。", "给重复劳动装个省力开关。", ["AICOWORKER", "FISH"], { fish: 3, repair: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 }),
    a("【只处理最紧急的事，交接完就休息。】先守住底线，再守住体力。", "先守住底线，再守住体力。", ["FIREFIGHTER", "BOUNDARY"], { carry: 3, boundary: 3, repair: 2 }, { energy: 1, information: -1, decision: 2, structure: 1 })
  ]),
  q("辞职一万次", "破事一件接一件，你又想起【“世界那么大，我想去看看”】。你会：", [
    a("【开始投简历，认真找下一份工作。】世界那么大，先看看招聘价。", "世界那么大，先看看招聘价。", ["BOUNDARY", "CRISPY"], { boundary: 3, fish: 3 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("【跟朋友吐槽一通，先不做离职决定。】辞职信写了，发送键还没按。", "辞职信写了，发送键还没按。", ["CRISPY", "FISH"], { fish: 4, boundary: 2 }, { energy: -2, information: 1, decision: -1, structure: -2 }),
    a("【骂完继续干，暂时还不打算走。】嘴上已离职，明早照常打卡。", "嘴上已离职，明早照常打卡。", ["COWHORSE", "POTMAN"], { carry: 4, pot: 3 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("【算好存款、查好合同，准备辞职和交接。】跑路也要带上计划表。", "跑路也要带上计划表。", ["SHIFTER", "SILENTGOD"], { boundary: 3, chaos: 2, pot: -1, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("【先找领导谈调整，谈不拢再离开。】先谈一轮，谈不拢再看世界。", "先谈一轮，谈不拢再看世界。", ["LEADERCARD", "TRAITOR"], { bossy: 4, boundary: 1 }, { energy: 2, information: 1, decision: 1, structure: 2 })
  ]),
  q("锅开始飞了", "事情出了错，群里开始问【“当时谁确认的？”】，其中也有你经手的部分。你会：", [
    a("【完整拿出记录，自己有错也照实认。】我的记录也上桌，不能只查别人。", "我的记录也上桌，不能只查别人。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("【先接手解决问题，责任之后再分。】锅还没落地，手已经伸出去了。", "锅还没落地，手已经伸出去了。", ["POTMAN", "FIREFIGHTER"], { pot: 4, carry: 3 }, { energy: 1, information: -1, decision: -1, structure: 0 }),
    a("【叫上相关同事一起说明，不独自面对追问。】背锅盟友，申请集合。", "背锅盟友，申请集合。", ["COWHORSE", "EMOHEALER"], { pot: 3, repair: 3 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("【强调别人确认过，把自己的责任摘出去。】锅可以转，人不能粘。", "锅可以转，人不能粘。", ["SHIFTER", "BOUNDARY"], { boundary: 3, chaos: 4, bossy: 1, pot: -2 }, { energy: 1, information: -1, decision: 2, structure: 1 }),
    a("【追问为什么没人复核，要求把流程漏洞查清。】不只问谁背锅，也问锅怎么来的。", "不只问谁背锅，也问锅怎么来的。", ["STIRRER", "BOUNDARY"], { chaos: 3, boundary: 2 }, { energy: 2, information: 1, decision: 1, structure: -1 })
  ]),
  q("摸鱼碰头会", "手头的活忙完了，你和同事互相发现对方都在【刷手机】。你会：", [
    a("【对视一眼不拆穿，各摸各的。】摸鱼搭子达成。", "摸鱼搭子达成。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("【提醒他别耽误正事，但不去告状。】提醒一下，友军别误伤。", "提醒一下，友军别误伤。", ["EMOHEALER", "BOUNDARY"], { repair: 3, boundary: 2 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("【凑过去一起看，顺便聊起来。】摸鱼现场，社交上线。", "摸鱼现场，社交上线。", ["ALIVE", "STIRRER"], { chaos: 2, repair: 2 }, { energy: 2, information: 1, decision: -2, structure: -1 }),
    a("【当作没看见，不参与也不评价。】人机同事不会告密。", "人机同事不会告密。", ["AICOWORKER", "SILENTGOD"], { fish: 2, boundary: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 }),
    a("【先检查自己有没有漏活，确认完再歇。】心里那张待办，还没肯下班。", "心里那张待办，还没肯下班。", ["CHOSEN", "COWHORSE"], { carry: 2, fish: 1 }, { energy: 0, information: -1, decision: 1, structure: 1 })
  ]),
  q("嘴上说没事", "同事看起来【情绪很低落】，你问他，他只回了句【“没事”】。你会：", [
    a("【陪他梳理烦心事，一起想解决办法。】先看看能不能卸掉两件事。", "先看看能不能卸掉两件事。", ["EMOHEALER", "CHOSEN"], { repair: 4, carry: 1 }, { energy: 1, information: -1, decision: -2, structure: 2 }),
    a("【陪他聊、听他吐槽，先不给建议。】情绪价值供应商今日营业。", "情绪价值供应商今日营业。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("【约他出去走走或买杯喝的，先换个心情。】先离开工位，给心情放个风。", "先离开工位，给心情放个风。", ["CRISPY", "EMOHEALER"], { repair: 3, fish: 1 }, { energy: 0, information: 0, decision: -1, structure: 0 }),
    a("【不多问，默默替他做一件小事。】话不多，支援已送达。", "话不多，支援已送达。", ["SILENTGOD", "AICOWORKER"], { repair: 3, legacy: 1 }, { energy: -2, information: -2, decision: 1, structure: 2 }),
    a("【不再追问，照常相处。】不强行安慰，也是一种陪着。", "不强行安慰，也是一种陪着。", ["AICOWORKER", "BOUNDARY"], { boundary: 3, repair: 1 }, { energy: -2, information: 0, decision: 1, structure: 0 })
  ]),
  q("下班前五分钟", "你已经约好下班后的事，领导突然塞来一项任务，说【“今晚必须弄完”】。你会：", [
    a("【拒绝今晚接活，请领导另找人。】我的安排也算安排。", "我的安排也算安排。", ["SHIFTER", "BOUNDARY"], { boundary: 3, chaos: 2, fish: 1, pot: -1 }, { energy: -1, information: -2, decision: 2, structure: 1 }),
    a("【取消自己的安排，把任务做完。】对不起了，我的私人日程。", "对不起了，我的私人日程。", ["COWHORSE", "CHOSEN"], { carry: 4, pot: 2 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("【找同事一起分工，尽快把活做掉。】加急可以，别只有一个人急。", "加急可以，别只有一个人急。", ["FIREFIGHTER", "EMOHEALER"], { carry: 3, repair: 3 }, { energy: 2, information: 0, decision: -1, structure: 1 }),
    a("【用现成材料做个够用的版本，尽量准点走。】先交基础款，豪华版明天见。", "先交基础款，豪华版明天见。", ["AICOWORKER", "FISH"], { fish: 3, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("【提出明早交重点，和领导重新约时间。】今晚有约，明早有交付。", "今晚有约，明早有交付。", ["MEETINGBOT", "PPTGOD"], { bossy: 3, boundary: 1 }, { energy: 1, information: 1, decision: 1, structure: 2 })
  ]),
  q("你要更主动", "绩效谈话，领导说【“你要更主动一点”】，却没说你哪里做得不够。你会：", [
    a("【请他举具体例子，说清希望我怎么改。】改进可以，猜谜不行。", "改进可以，猜谜不行。", ["BOUNDARY", "CHOSEN"], { boundary: 4, carry: 1 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("【以后多汇报、多露脸，让他看见我。】工作要做，存在感也要交。", "工作要做，存在感也要交。", ["TRAITOR", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 1, decision: 1, structure: 2 }),
    a("【嘴上答应，工作方式暂时不变。】建议收到了，执行方法没收到。", "建议收到了，执行方法没收到。", ["CRISPY", "FISH"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("【带着已有成果再谈，核对评价是否合理。】下次谈评价，带上作业本。", "下次谈评价，带上作业本。", ["SILENTGOD", "PPTGOD"], { repair: 2, boundary: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("【当面点头，转头找同事吐槽。】会议室里收到，茶水间里复盘。", "会议室里收到，茶水间里复盘。", ["TWOFACE", "ALIVE"], { chaos: 2, repair: 1 }, { energy: 1, information: 1, decision: -1, structure: 0 })
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
    trigger: "职场神灯 vs 边界/沉默",
    copy: "一个想把愿望都实现，一个帮忙确认预算和边界。神灯也得有使用说明。",
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
