# 题库参考与方法 · 2026-11-02.2

25 道原创情境题，每题 5 个选项。按最近一个月通常的做法选择，没有遇到过就选最接近的反应。尽量区分查证、行动、关系照顾、拒绝协商或延后等做法；题库不是 MBTI，不输出 E/I、S/N、T/F、J/P。

20 类角色、行为因子与四维均为娱乐性解释框架。没有实证支持把工作表现稳定分为这 20 类；环境、权限、资源和疲劳也影响答案，不能由此断定同事是否可靠。

## 参考

1. [IPIP Big-Five Factor Markers](https://ipip.ori.org/newBigFive5broadKey.htm)：参考主动表达、合作、条理和情绪反应等行为概念。[官方许可](https://ipip.ori.org/newPermission.htm)允许商业和非商业使用。本项目不照搬原量表的题型、计分或常模，不能继承其信度指标。
2. [Burr et al. (2019), COPSOQ III](https://www.copsoq-network.org/assets/Uploads/The-Third-Version-of-the-Copenhagen-Psychosocial-Questionnaire.pdf)：参考工作要求、自主性、角色清晰度、社会支持、认可和工作生活冲突等研究主题，只借鉴概念而非复刻问卷。它测工作环境，不能作为本项目人格分类的证据。

逐题概念映射见 `src/data/dgtiResearch.js` 的 `questionReferences`，并向用户展示。映射不是题项的验证结论。BFI-2 商业用途有单独许可要求，因此未复制其题目，也不宣传为正式 BFI-2 测试。[Berkeley Personality Lab](https://www.ocf.berkeley.edu/~johnlab/bfi)

## 计分

选项提供角色权重、行为因子和四维增量。按题库可得分范围归一化后，与预设角色特征比较选择最高者。20 类均有可达作答，但这只检验程序逻辑。倾向分是项目规则分，不是准确率、概率或能力分；本版取消至少 68 分的人为下限。

本轮修订全题库文字，将技术专属情境换为大众工作场景；“照常休息”“不继续追问”等选项语义改变后同步调整权重。其余保留主计分框架，未做实证校准。没有职业分组、重测稳定性或社会赞许偏差的验证，不能声称改写后已获得科学效度。

## 样本与后续验证

本次将选项统一为完整动作句加粗、吐槽普通字，并把“需求许愿池”改为“职场神灯”：帮助别人实现愿望，而非不断提出需求。相应调整第 7、15、16 题的角色信号与该角色的行为目标；第 23 题区分实际帮助、倾听、陪伴转移和不追问，重新划分对应权重。题库版本已递增，旧版结果不混入本版统计，仍未经过实证效度验证。

100 份案例以固定种子模拟：先覆盖 20 类目标作答，再加入随机偏离。它们仅用于内部测试，不公开，不是人口抽样、真实使用量或常模。真实统计按每个浏览器的最新结果汇总；体验评分是主观反馈，不等于准确性。

上线可先整理“看不懂”“无合适选项”“结果不像我”等意见。正式验证还需单独设计知情同意、招募、认知访谈、重测与外部标准比较。当前仅保存角色与四维摘要，不足以进行题项级心理测量研究。

## 界面参考

[GOV.UK Question pages](https://design-system.service.gov.uk/patterns/question-pages/)：单题聚焦、允许回看。[ONS Feedback pattern](https://service-manual.ons.gov.uk/design-system/patterns/feedback)：短反馈表和明确提交状态。保留项目现有角色美术和移动端四个主入口。

本次文案参考 [GOV.UK Designing good questions](https://www.gov.uk/service-manual/design/designing-good-questions) 的直接、易懂原则；分布图参考 [Datawrapper 图表颜色与高亮设置](https://www.datawrapper.de/academy/how-to-create-a-grouped-column-chart)，用原色加金色标记当前人格，保留同一数量尺度，不将双色画成两组样本。
