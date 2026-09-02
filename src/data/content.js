export const navItems = [
  { id: "portal", label: "赛事概览", meta: "Overview" },
  { id: "register", label: "报名入口", meta: "Apply" },
  { id: "workbench", label: "查询进度", meta: "Status" },
  { id: "admin", label: "管理后台", meta: "Admin" },
  { id: "h5", label: "H5通道", meta: "Mobile" }
];

export const tracks = [
  { code: "01", name: "AI+产品设计", summary: "陶瓷器型、文创产品、智能辅助设计与打样" },
  { code: "02", name: "AI+文旅演艺", summary: "剧情互动、数字舞台、城市文化内容再表达" },
  { code: "03", name: "AI+新媒体", summary: "短视频矩阵、个人IP、AI内容生产与增长" },
  { code: "04", name: "AI+新零售", summary: "直播电商、私域运营、供应链智能匹配" },
  { code: "05", name: "AI+文旅体验", summary: "城市导览、沉浸体验、研学路线与服务" },
  { code: "06", name: "数字科技", summary: "智能工具、数据平台、产业效率提升方案" }
];

export const schedule = [
  { phase: "报名开启", date: "2026.05.20", detail: "统一入口开放，生成草稿编号" },
  { phase: "报名截止", date: "2026.08.15", detail: "材料锁定，进入资格审核" },
  { phase: "资格审核", date: "2026.08.16 - 08.23", detail: "7个工作日内反馈结果" },
  { phase: "入围通知", date: "2026.08 下旬", detail: "短信、邮件与站内通知同步" }
];

export const materials = [
  { id: "plan", name: "项目方案 PDF", required: true, state: "已上传", note: "5-10页，含AI亮点与落地计划" },
  { id: "works", name: "代表作品 PDF", required: true, state: "已上传", note: "案例、原型、作品集均可" },
  { id: "video", name: "1分钟介绍视频", required: true, state: "待补充", note: "MP4，建议横版或竖版各备一份" },
  { id: "commitment", name: "参赛承诺书", required: true, state: "待补充", note: "签字或盖章扫描件" },
  { id: "auth", name: "负责人授权书", required: false, state: "按需提交", note: "团队参赛时提交" }
];

export const applications = [
  {
    id: "OPC2026001286",
    project: "青白釉智能制样台",
    owner: "林照予",
    track: "AI+产品设计",
    status: "材料审核中",
    completeness: 72,
    submittedAt: "2026-06-11 14:32"
  },
  {
    id: "OPC2026001279",
    project: "窑火短剧生成工坊",
    owner: "许竞川",
    track: "AI+新媒体",
    status: "待提交",
    completeness: 44,
    submittedAt: "2026-06-11 13:18"
  },
  {
    id: "OPC2026001264",
    project: "御窑夜游交互剧场",
    owner: "陈景澄",
    track: "AI+文旅体验",
    status: "初审通过",
    completeness: 93,
    submittedAt: "2026-06-11 11:07"
  },
  {
    id: "OPC2026001218",
    project: "器物上新直播助手",
    owner: "罗晚晴",
    track: "AI+新零售",
    status: "已退回",
    completeness: 58,
    submittedAt: "2026-06-10 18:49"
  }
];

export const adminStats = [
  { label: "报名总数", value: "1,286", delta: "+74" },
  { label: "待审核", value: "318", delta: "+21" },
  { label: "初审通过", value: "604", delta: "+38" },
  { label: "材料退回", value: "147", delta: "+12" }
];
