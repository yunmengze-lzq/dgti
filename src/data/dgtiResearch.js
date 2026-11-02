export const QUESTIONNAIRE_VERSION = "2026-11-02.2";

export const researchSources = [
  { id: "ipip", title: "IPIP · 大五人格研究", url: "https://ipip.ori.org/newBigFive5broadKey.htm", note: "参考主动表达、合作、计划与情绪反应等行为概念。IPIP 材料允许商业使用；本测试不是 IPIP 原量表，也不输出大五人格分数。" },
  { id: "copsoq", title: "Burr 等（2019）· COPSOQ III", url: "https://www.copsoq-network.org/assets/Uploads/The-Third-Version-of-the-Copenhagen-Psychosocial-Questionnaire.pdf", note: "参考工作要求、角色清晰度、同事支持、认可与工作生活冲突等研究主题。仅借鉴观察角度，没有复制或宣称使用其标准问卷。" }
];

// These are conceptual links, not claims of item-level psychometric validation.
export const questionReferences = [
  ["角色清晰度、主动沟通", "copsoq", "ipip"],
  ["任务清晰度、解决问题的习惯", "copsoq", "ipip"],
  ["工作要求、帮助他人与职责范围", "copsoq", "ipip"],
  ["工作自主性、休息时的紧张反应", "copsoq", "ipip"],
  ["压力下的行动、沟通和责任处理", "copsoq", "ipip"],
  ["计划性、表达与组织讨论", "ipip"],
  ["工作要求、可控性与新想法", "copsoq", "ipip"],
  ["交接可预期性、条理与信息核查", "copsoq", "ipip"],
  ["同事支持、帮助方式与时间安排", "copsoq", "ipip"],
  ["社交参与、工作与私人时间", "ipip", "copsoq"],
  ["工作认可、表达个人需要", "copsoq", "ipip"],
  ["工作节奏、精力恢复与自我安排", "copsoq"],
  ["工作生活冲突、可控性", "copsoq"],
  ["协作冲突、表达与人际关怀", "copsoq", "ipip"],
  ["角色冲突、变化可预期性", "copsoq"],
  ["不确定情境下的沟通与计划", "ipip", "copsoq"],
  ["工作认可、回报与影响力", "copsoq"],
  ["表达、关系维护与意见一致性", "ipip"],
  ["工作要求、支持与疲劳情境", "copsoq"],
  ["工作满意度、选择与计划性", "copsoq", "ipip"],
  ["责任清晰度、公平与冲突处理", "copsoq"],
  ["社交主动性、合作与条理", "ipip"],
  ["同事支持、共情与人际距离", "copsoq", "ipip"],
  ["工作生活冲突、工作量与协商", "copsoq"],
  ["反馈清晰度、认可与行动计划", "copsoq", "ipip"]
];

export const feedbackCategories = [
  ["question", "题目或选项看不懂"],
  ["result", "结果不像我"],
  ["experience", "页面或操作不顺手"],
  ["idea", "想提个建议"]
];
