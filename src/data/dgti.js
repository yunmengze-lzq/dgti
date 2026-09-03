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
  q("紧急拉群", "周一刚坐下，你被拉进“紧急项目推进对齐群”，消息已经 99+。你第一步更像：", [
    a("先翻置顶、文件和聊天记录，弄清楚谁负责、卡在哪里。", "翻群考古，不急下场。", ["SILENTGOD", "SHITMOUNTAIN"], { repair: 2, legacy: 2, boundary: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 }),
    a("直接问目标、截止时间、负责人、验收标准。", "四件套开问。", ["BOUNDARY", "CHOSEN"], { carry: 2, boundary: 4 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("先发一句“我在”，不然这个群像全员掉线。", "群里终于有活人。", ["ALIVE", "EMOHEALER"], { repair: 4, carry: 1 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("提议开 15 分钟短会，把分工和下一步过一遍。", "小会救命，也可能续命。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("先静音，等有人明确 @ 我再复活。", "静音保命，点名再醒。", ["FISH", "CRISPY"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("领导一句话", "领导说：“明天给我一个方向感，不用太细，但要能讲。”你会先：", [
    a("问清楚给谁看、要拍什么板、哪些话不能说错。", "领导语翻译器。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("直接搭三页：背景、判断、下一步。", "空气变成 PPT。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 1 }, { energy: 1, information: 1, decision: 0, structure: 2 }),
    a("先做一个能演示的粗版，明天至少有东西可看。", "先糊一版保命。", ["FIREFIGHTER", "CHOSEN"], { carry: 4, repair: 2 }, { energy: 2, information: -1, decision: 1, structure: 0 }),
    a("先猜老板真正想听哪种故事，再顺着那个方向写。", "揣摩圣意中。", ["TRAITOR", "TWOFACE"], { bossy: 4, chaos: 2 }, { energy: 1, information: 2, decision: 1, structure: 0 }),
    a("找旧模板改一改，别让生命从零开始燃烧。", "模板续命，拒绝白板。", ["AICOWORKER", "FISH"], { fish: 2, repair: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 })
  ]),
  q("顺手帮忙", "同事说“你顺手帮我看一下，很快的”，但你闻到这个活可能会顺到下周。你会：", [
    a("问清楚看哪里、看多久、要建议还是要我改。", "顺手也要上户口。", ["BOUNDARY", "SILENTGOD"], { boundary: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("嘴上说行，心里已经把锅盖举起来了。", "锅盖已经热了。", ["POTMAN", "COWHORSE"], { carry: 2, pot: 4 }, { energy: 0, information: -1, decision: -1, structure: 0 }),
    a("帮他拆问题和下一步，但不替他把作业写完。", "帮拆题，不代考。", ["EMOHEALER", "BOUNDARY"], { repair: 4, boundary: 2 }, { energy: 1, information: -1, decision: -1, structure: 1 }),
    a("让他把背景、文件、截止时间先发全。", "资料先交出来。", ["CHOSEN", "AICOWORKER"], { carry: 2, boundary: 2, repair: 1 }, { energy: 0, information: -2, decision: 1, structure: 2 }),
    a("先已读不回，看看这个需求会不会自然沉底。", "已读观察沉底。", ["FISH", "CRISPY"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("老板路过", "你正在低功耗回血，老板突然从工位旁边路过。你的身体反应是：", [
    a("秒切表格，表情稳定得像系统默认头像。", "切屏大师上线。", ["FISH", "AICOWORKER"], { fish: 4, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("顺势打开待办，把下一步补清楚。", "假装真忙，也算忙。", ["CHOSEN", "SILENTGOD"], { carry: 2, repair: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("直接问老板刚好有个问题想确认。", "路过领导，反客为主。", ["LEADERCARD", "PPTGOD"], { bossy: 3, carry: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("和旁边同事对视，互相假装没事。", "摸鱼暗号对上了。", ["FISH", "CRISPY"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("内心碎成二维码，脸上还在微笑。", "微笑着裂开。", ["CRISPY", "EMOHEALER"], { fish: 3, repair: 2 }, { energy: -1, information: 0, decision: -2, structure: -1 })
  ]),
  q("线上开席", "系统报警，客户群、老板群、项目群同时开席。你最可能先做什么？", [
    a("看日志、影响范围和最近变更，先别被群里尖叫带节奏。", "日志先开庭。", ["SILENTGOD", "SHITMOUNTAIN"], { repair: 3, legacy: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先止血、回滚或临时兜住，别让问题继续扩大。", "先把火灭了。", ["FIREFIGHTER", "CHOSEN"], { carry: 4, repair: 4 }, { energy: 2, information: -1, decision: 1, structure: 0 }),
    a("同步进展并安抚情绪，别让系统炸完人也炸了。", "系统炸，人别炸。", ["EMOHEALER", "ALIVE"], { repair: 4, pot: 1 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("先判断这锅现在会落谁身上，别莫名背全责。", "锅别乱飞。", ["POTMAN", "TWOFACE"], { pot: 4, chaos: 2 }, { energy: 1, information: 0, decision: 1, structure: -1 }),
    a("一闻就知道是旧系统的祖传坑又醒了。", "祖传坑又醒了。", ["SHITMOUNTAIN", "STIRRER"], { legacy: 4, chaos: 3 }, { energy: 0, information: 2, decision: 1, structure: -1 })
  ]),
  q("会议原地转圈", "一个会开了 40 分钟，大家从“讨论问题”进化成“讨论怎么讨论问题”。你会：", [
    a("直接总结：结论、分歧、下一步、负责人。", "给会议收尸。", ["CHOSEN", "PPTGOD"], { carry: 3, repair: 2 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("建议会后再开一个短会，专门把没对齐的地方对齐。", "会后还有会。", ["MEETINGBOT", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("不开口，但把关键点默默写进文档。", "文档替我发言。", ["SILENTGOD", "AICOWORKER"], { repair: 2, boundary: 2 }, { energy: -2, information: -2, decision: 1, structure: 2 }),
    a("小窗处理别的活，会后假装刚才都在。", "会里开溜。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("补一句没人敢问的话，让场面终于有点反应。", "灵魂一问，全场安静。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 })
  ]),
  q("顺便加楼", "需求改了三次后，对方说“顺便加个小功能”，但这个小功能长得像一栋楼。你会：", [
    a("要求写清新增范围、优先级和延期影响。", "顺便也要上户口。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, repair: 1 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先保当前版本能交，再处理新增。", "先保老命。", ["FIREFIGHTER", "COWHORSE"], { carry: 4, pot: 1 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("脑子里已经冒出三个更大的玩法。", "愿望越许越大。", ["WISHPOOL", "PPTGOD"], { chaos: 4, bossy: 2 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("帮对方包装成“阶段二能力升级”，方便往上说。", "格局包装大师。", ["TRAITOR", "LEADERCARD"], { bossy: 4, chaos: 2 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("内心开始碎，但表面还在说“我看一下”。", "人已裂开。", ["CRISPY", "POTMAN"], { fish: 2, pot: 3 }, { energy: -2, information: 0, decision: -1, structure: -1 })
  ]),
  q("祖传系统", "你接手一个旧系统，文档最后更新时间像上个文明，前任留下四个“最终版”。你会：", [
    a("先画结构图，标雷区，能不动的先别动。", "屎山先测绘。", ["SHITMOUNTAIN", "SILENTGOD"], { legacy: 4, repair: 3, boundary: 1 }, { energy: -2, information: -2, decision: 2, structure: 2 }),
    a("先修最痛的点，今天别再炸就算赢。", "给旧系统续一口。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3, repair: 2 }, { energy: 1, information: -1, decision: 1, structure: 0 }),
    a("把它包装成“技术债治理专项”，先争资源。", "屎山也能立项。", ["PPTGOD", "LEADERCARD"], { bossy: 3, legacy: 3 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("锐评一句：这不是系统，是遗产继承。", "考古文学。", ["STIRRER", "SHITMOUNTAIN"], { chaos: 4, legacy: 3 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("先找旧模板、旧脚本、旧人还在不在。", "寻找前任遗迹。", ["AICOWORKER", "FISH"], { fish: 2, legacy: 2, repair: 1 }, { energy: -2, information: -2, decision: 1, structure: 1 })
  ]),
  q("新人求救", "新人连续问了 8 个基础问题，你的耐心条开始闪。你更可能：", [
    a("整理一份新人文档，以后统一发，禁止无限复读。", "文档治新人。", ["CHOSEN", "SILENTGOD"], { carry: 2, repair: 3 }, { energy: 0, information: -2, decision: 1, structure: 2 }),
    a("先安抚他，谁刚来不是脆皮。", "新人也是脆皮。", ["EMOHEALER", "CRISPY"], { repair: 4 }, { energy: 1, information: 0, decision: -2, structure: 0 }),
    a("给入口和示例，但不替他做完。", "教，但不代做。", ["BOUNDARY", "AICOWORKER"], { boundary: 3, repair: 2 }, { energy: 0, information: -1, decision: 2, structure: 1 }),
    a("拉个新人答疑会，大家一起听一遍。", "新人也要开大会。", ["MEETINGBOT", "ALIVE"], { bossy: 2, repair: 2 }, { energy: 2, information: 0, decision: -1, structure: 2 }),
    a("把他转给最热心的人，自己先保命。", "热心人接力。", ["TWOFACE", "FISH"], { fish: 3, chaos: 2 }, { energy: 0, information: 1, decision: -1, structure: -1 })
  ]),
  q("自愿团建", "群里通知周五下班后团建，还写着“自愿参加”。你真实反应是：", [
    a("问清楚能不能不去、几点结束、算不算加班。", "鉴定一下自愿。", ["BOUNDARY", "CRISPY"], { boundary: 4, fish: 2 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("先报名，顺便帮大家统计人数和口味。", "饭局活人上线。", ["ALIVE", "EMOHEALER"], { repair: 3, carry: 1 }, { energy: 2, information: 0, decision: -2, structure: 1 }),
    a("说都行，反正公司安排就配合一下。", "牛马随缘被安排。", ["COWHORSE", "POTMAN"], { carry: 2, pot: 2 }, { energy: 0, information: -1, decision: -1, structure: 0 }),
    a("建议团建前先明确预算、路线和负责人。", "快乐也要走流程。", ["MEETINGBOT", "LEADERCARD"], { bossy: 3, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 }),
    a("私下问一圈谁不想去，再看风向怎么回复。", "先探风向再报名。", ["TWOFACE", "TRAITOR"], { chaos: 2, bossy: 2 }, { energy: 1, information: 1, decision: 0, structure: -1 })
  ]),
  q("功劳稀释", "汇报时，你肝出来的部分被一句“大家都辛苦了”轻轻带过。你会：", [
    a("补事实和数据：这部分我做了哪些、结果是什么。", "功劳必须留痕。", ["BOUNDARY", "SILENTGOD"], { boundary: 3, repair: 2 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("先咽下去，项目活了就行。", "牛马默默咽了。", ["COWHORSE", "POTMAN"], { carry: 2, pot: 4 }, { energy: -1, information: -1, decision: -1, structure: 0 }),
    a("私下同步关键人，下次让贡献留痕。", "私下对账。", ["TWOFACE", "TRAITOR"], { chaos: 2, bossy: 2 }, { energy: 1, information: 1, decision: 1, structure: 1 }),
    a("下一版材料把贡献写进结构，谁也别想自动蒸发。", "PPT 防蒸发。", ["PPTGOD", "LEADERCARD"], { bossy: 3, carry: 2 }, { energy: 1, information: 1, decision: 1, structure: 2 }),
    a("开玩笑吐槽一下，让大家知道这事有点离谱。", "笑着点破离谱。", ["ALIVE", "STIRRER"], { chaos: 2, repair: 2 }, { energy: 2, information: 1, decision: -1, structure: -1 })
  ]),
  q("下午低电量", "下午三点，你的灵魂弹窗：电量低于 5%，是否进入工位省电模式？", [
    a("表格开大，小窗开小，回血但保持可切屏。", "工位保护色。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("休息 15 分钟，然后把最关键的活做完。", "摸完也有闭环。", ["BOUNDARY", "CHOSEN"], { fish: 2, boundary: 2, carry: 1 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("找同事聊两句，补一点人味再回来。", "聊两句回血。", ["ALIVE", "EMOHEALER"], { repair: 2, fish: 1 }, { energy: 2, information: 0, decision: -2, structure: -1 }),
    a("继续干，骂归骂，活还得往前走。", "牛马没电也跑。", ["COWHORSE", "FIREFIGHTER"], { carry: 4, pot: 1 }, { energy: 0, information: -1, decision: 1, structure: 1 }),
    a("写模板、套流程，让自己看起来还在稳定推进。", "模板装忙中。", ["AICOWORKER", "SILENTGOD"], { fish: 2, repair: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 })
  ]),
  q("晚上在吗", "晚上 8 点，领导发来“在吗，简单看一下”。你会：", [
    a("明天上班看，非紧急不占用下班时间。", "下班门已关。", ["BOUNDARY", "SILENTGOD"], { boundary: 4, fish: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 }),
    a("先看是不是会炸，真炸了再救，不炸明天说。", "只救真火。", ["FIREFIGHTER", "CHOSEN"], { carry: 3, boundary: 2 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("回一句：收到，明早优先处理。", "体面下线。", ["AICOWORKER", "CRISPY"], { fish: 2, boundary: 2 }, { energy: -1, information: -1, decision: 1, structure: 2 }),
    a("秒回，顺便问还有没有其他要对齐。", "夜间打工魂觉醒。", ["MEETINGBOT", "TRAITOR"], { bossy: 4, carry: 1 }, { energy: 2, information: 1, decision: 1, structure: 2 }),
    a("先不回，等洗完澡再判断自己还想不想上班。", "洗完澡再审判。", ["CRISPY", "FISH"], { fish: 4, boundary: 2 }, { energy: -2, information: 0, decision: -1, structure: -2 })
  ]),
  q("群里阴阳", "群里有人开始阴阳怪气，空气脆得像薯片。你会：", [
    a("把话题拉回事实、影响和下一步。", "别吵，先救场。", ["CHOSEN", "FIREFIGHTER"], { carry: 3, repair: 3 }, { energy: 1, information: -1, decision: 2, structure: 2 }),
    a("先照顾情绪，别让人直接碎掉。", "情绪先止血。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("沉默观察，等关键证据出现。", "暗中观察证据。", ["SILENTGOD", "TWOFACE"], { boundary: 2, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("补一句更绝的，让场面别只尴尬，要精彩。", "补刀开麦。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 2, decision: -1, structure: -2 }),
    a("说“大家先对齐目标”，把情绪压回流程里。", "领导味压场。", ["LEADERCARD", "TRAITOR"], { bossy: 4, repair: 1 }, { energy: 2, information: 0, decision: 1, structure: 2 })
  ]),
  q("上下游孽缘", "上游轻轻改了一个字段，下游直接原地开席。你最像：", [
    a("先确认影响面、回滚方案和谁通知谁。", "事故先开图。", ["SILENTGOD", "SHITMOUNTAIN"], { legacy: 3, repair: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先救下游，今天别一起沉。", "背锅盟友集合。", ["FIREFIGHTER", "POTMAN"], { carry: 3, pot: 3 }, { energy: 1, information: -1, decision: 1, structure: 1 }),
    a("把变更流程写出来，下次别再裸奔。", "流程救命。", ["BOUNDARY", "CHOSEN"], { boundary: 4, carry: 1 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("看热闹，锐评两句，再决定要不要下场。", "孽缘围观中。", ["STIRRER", "FISH"], { chaos: 3, fish: 2 }, { energy: 1, information: 1, decision: -1, structure: -2 }),
    a("想借这个机会把整条链路升级掉。", "顺便升级警报。", ["WISHPOOL", "PPTGOD"], { chaos: 3, bossy: 2 }, { energy: 2, information: 2, decision: -1, structure: -1 })
  ]),
  q("客户追问", "客户问了一个暂时回答不了的问题，还追着要“现在就给结论”。你会：", [
    a("给标准回复：已收到，确认后给明确时间点。", "标准话术营业。", ["AICOWORKER", "SILENTGOD"], { repair: 2, boundary: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("先反问真实场景和验收标准，别被表面问题带偏。", "先问真实场景。", ["BOUNDARY", "CHOSEN"], { boundary: 3, carry: 1 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("先稳住对方情绪，让他知道不是没人管。", "关系先保温。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("把问题升级给领导，并附上我建议的口径。", "向上管理启动。", ["TRAITOR", "LEADERCARD"], { bossy: 4, chaos: 1 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("先给一个能交代的临时方案，别让对方一直追。", "先顶一版。", ["CHOSEN", "FIREFIGHTER"], { carry: 3, repair: 2 }, { energy: 1, information: -1, decision: 1, structure: 1 })
  ]),
  q("工贼发言", "朋友说：“公司也是为你好，大家别老提钱，要格局打开。”你会：", [
    a("截图留证：解释一下，老板什么时候买你号了？", "友情审判开庭。", ["STIRRER", "TWOFACE"], { chaos: 4 }, { energy: 2, information: 1, decision: -1, structure: -1 }),
    a("先判断他是不是求生话术，不急着判刑。", "先别急着判刑。", ["EMOHEALER", "ALIVE"], { repair: 3 }, { energy: 1, information: 0, decision: -2, structure: 0 }),
    a("约法三章：别在我面前格局打开。", "边界贴脸。", ["BOUNDARY", "COWHORSE"], { boundary: 4 }, { energy: 0, information: -1, decision: 2, structure: 2 }),
    a("让他去跟领导沟通，既然这么会对齐。", "派去和领导对齐。", ["LEADERCARD", "TRAITOR"], { bossy: 4 }, { energy: 2, information: 1, decision: 1, structure: 1 }),
    a("默默记下，以后重要事不交给他。", "安静拉黑名单。", ["SILENTGOD", "AICOWORKER"], { boundary: 2, repair: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 })
  ]),
  q("两面协作", "同一个人，对领导“收到马上推进”，对同事“你自己想办法”。你最可能：", [
    a("记下来，之后重要协作都留痕。", "沉默布防。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 1 }, { energy: -2, information: -1, decision: 2, structure: 2 }),
    a("当场坏笑：这变脸速度可以申遗。", "变脸速度申遗。", ["STIRRER", "ALIVE"], { chaos: 4 }, { energy: 2, information: 1, decision: -1, structure: -2 }),
    a("私下提醒被坑的人，别再裸奔接活。", "软保护一下。", ["EMOHEALER", "POTMAN"], { repair: 4, pot: 1 }, { energy: 1, information: 0, decision: -2, structure: 1 }),
    a("我理解，职场嘛，对上对下话术确实不同。", "双面切换中。", ["TWOFACE", "TRAITOR"], { chaos: 3, bossy: 3 }, { energy: 1, information: 2, decision: 0, structure: 0 }),
    a("直接把责任拆清楚，少来这套温差表演。", "少来这套。", ["BOUNDARY", "LEADERCARD"], { boundary: 3, bossy: 2 }, { energy: 1, information: -1, decision: 2, structure: 2 })
  ]),
  q("身体报警", "连续加班后，你开始头痛、胃痛、眼睛痛，但项目还在催。你会：", [
    a("先请假或休息，命比版本号重要。", "脆皮先自救。", ["CRISPY", "BOUNDARY"], { fish: 3, boundary: 4 }, { energy: -2, information: -1, decision: 2, structure: 1 }),
    a("撑完这个节点再说，毕竟炸了更麻烦。", "牛马上线硬扛。", ["COWHORSE", "POTMAN"], { carry: 4, pot: 3 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("找人一起拆任务，别靠献祭单人血条交付。", "组队自救。", ["CHOSEN", "EMOHEALER"], { carry: 2, repair: 3 }, { energy: 1, information: -1, decision: -1, structure: 2 }),
    a("写模板、做自动化，尽量让自己少消耗。", "自动省电模式。", ["AICOWORKER", "FISH"], { fish: 3, repair: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 }),
    a("先把最危险的问题处理掉，再明确告诉大家我需要下线。", "救完就下线。", ["FIREFIGHTER", "BOUNDARY"], { carry: 3, boundary: 3, repair: 2 }, { energy: 1, information: -1, decision: 2, structure: 1 })
  ]),
  q("背锅预警", "项目出问题，群里开始找“当时谁确认的”。你的身体记忆是：", [
    a("翻记录、截图、版本号，先把事实摆出来。", "锅要配证据。", ["SILENTGOD", "BOUNDARY"], { boundary: 3, repair: 2 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先站出来兜住影响，后面再慢慢分锅。", "先顶锅盖。", ["POTMAN", "FIREFIGHTER"], { pot: 4, carry: 3 }, { energy: 1, information: -1, decision: -1, structure: 0 }),
    a("赶紧私下确认谁能帮忙补台。", "召唤背锅盟友。", ["COWHORSE", "EMOHEALER"], { pot: 3, repair: 3 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("先看谁想甩锅，再决定怎么说话。", "看谁先甩锅。", ["TWOFACE", "TRAITOR"], { chaos: 3, bossy: 2 }, { energy: 1, information: 1, decision: 1, structure: -1 }),
    a("抛出一个关键问题，让想糊弄的人糊不下去。", "有用的搅局。", ["STIRRER", "BOUNDARY"], { chaos: 3, boundary: 2 }, { energy: 2, information: 1, decision: 1, structure: -1 })
  ]),
  q("摸鱼搭子", "你发现同事屏幕角落开着游戏小窗，他也发现你在摸鱼。你们会：", [
    a("对视一眼，互不拆穿，从此结成低功耗同盟。", "摸鱼搭子达成。", ["FISH", "CRISPY"], { fish: 4 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("提醒他注意切屏，别被老板现场抓包。", "温柔提醒切屏。", ["EMOHEALER", "BOUNDARY"], { repair: 3, boundary: 2 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("顺手问一句：你这个游戏能联机吗？", "活人感发光。", ["ALIVE", "STIRRER"], { chaos: 2, repair: 2 }, { energy: 2, information: 1, decision: -2, structure: -1 }),
    a("装没看见，继续保持职业预制表情。", "人机同事不会告密。", ["AICOWORKER", "SILENTGOD"], { fish: 2, boundary: 2 }, { energy: -2, information: -1, decision: 1, structure: 2 }),
    a("心里想：摸鱼可以，但别影响我交付。", "交付底线还在。", ["CHOSEN", "COWHORSE"], { carry: 2, fish: 1 }, { energy: 0, information: -1, decision: 1, structure: 1 })
  ]),
  q("同事快碎了", "同事在工位上明显快崩了，嘴上还说“我没事”。你会：", [
    a("先把他手上的活拆一下，看看哪些可以缓。", "先卸点活。", ["EMOHEALER", "CHOSEN"], { repair: 4, carry: 1 }, { energy: 1, information: -1, decision: -2, structure: 2 }),
    a("递点吃的喝的，陪他骂两句再说正事。", "情绪价值续杯。", ["EMOHEALER", "ALIVE"], { repair: 4 }, { energy: 2, information: 0, decision: -2, structure: 0 }),
    a("帮他挡掉不必要的打扰，让他先回血。", "边界也能救命。", ["BOUNDARY", "CRISPY"], { boundary: 3, repair: 2, fish: 1 }, { energy: -1, information: -1, decision: 2, structure: 1 }),
    a("默默把关键文件补上，不制造新的情绪场。", "静默支援。", ["SILENTGOD", "AICOWORKER"], { repair: 3, legacy: 1 }, { energy: -2, information: -2, decision: 1, structure: 2 }),
    a("开个玩笑把他从崩溃边缘拽回来。", "活人急救中。", ["ALIVE", "STIRRER"], { repair: 2, chaos: 2 }, { energy: 2, information: 1, decision: -1, structure: -1 })
  ]),
  q("临时加活", "快下班了，突然来一个“今天必须搞定”的活。你会：", [
    a("先问为什么今天必须、谁拍板、明天交会怎样。", "鉴定真急假急。", ["BOUNDARY", "SILENTGOD"], { boundary: 4 }, { energy: -1, information: -2, decision: 2, structure: 2 }),
    a("先干，骂归骂，干完再说。", "牛马不语，只干。", ["COWHORSE", "CHOSEN"], { carry: 4, pot: 2 }, { energy: 0, information: -1, decision: -1, structure: 1 }),
    a("召集人一起拆，不能全靠一个人献祭。", "救火不能单刷。", ["FIREFIGHTER", "EMOHEALER"], { carry: 3, repair: 3 }, { energy: 2, information: 0, decision: -1, structure: 1 }),
    a("先看看能不能用模板糊住 80%。", "模板先糊住。", ["AICOWORKER", "FISH"], { fish: 3, repair: 1 }, { energy: -2, information: -1, decision: 1, structure: 1 }),
    a("建议改成明早会前交，听起来更像计划。", "突袭改成排期。", ["MEETINGBOT", "PPTGOD"], { bossy: 3, boundary: 1 }, { energy: 1, information: 1, decision: 1, structure: 2 })
  ]),
  q("绩效谈话", "绩效沟通时，老板说“你要更主动一点”，但没说具体主动什么。你会：", [
    a("让老板举例：希望我在哪类事上提前做判断。", "拒绝猜心术。", ["BOUNDARY", "CHOSEN"], { boundary: 4, carry: 1 }, { energy: 0, information: -2, decision: 2, structure: 2 }),
    a("当场答应，后面多发进度、多同步、多对齐。", "努力对齐中。", ["TRAITOR", "LEADERCARD"], { bossy: 4 }, { energy: 2, information: 1, decision: 1, structure: 2 }),
    a("心里想：我已经很主动了，主动活着。", "主动活着已很累。", ["CRISPY", "FISH"], { fish: 4, boundary: 1 }, { energy: -2, information: 0, decision: -1, structure: -2 }),
    a("回去补一份数据，列出自己实际推进过的事情。", "沉默也要留痕。", ["SILENTGOD", "PPTGOD"], { repair: 2, boundary: 2 }, { energy: -1, information: -2, decision: 1, structure: 2 }),
    a("先笑着点头，出门再和同事吐槽到缺氧。", "笑着吐槽到缺氧。", ["TWOFACE", "ALIVE"], { chaos: 2, repair: 1 }, { energy: 1, information: 1, decision: -1, structure: 0 })
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
