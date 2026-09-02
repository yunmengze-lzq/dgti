# 打工人 TI 羁绊图设计计划

> 目标：羁绊图不是两张角色图拼一起，而是关系本身有戏。每张图都要体现两个人之间的互相作用、共同处境和热梗锚点。

## 1. 产出原则

- 不做 19x19 全量关系图，先做 12 个核心羁绊大类。
- 所有角色组合都能通过规则匹配到一个羁绊名，但只有高频/高传播关系做专属美术。
- 每张羁绊图保留两版美术：`portrait` 日系 2D 低多边形立绘关系海报，`mbti` 几何扁平关系卡。
- 单张生成，不做多人批量大图再裁切。
- 羁绊图构图优先横向 16:9，也要能裁成 H5 结果卡封面。

## 2. 当前 11 个核心羁绊

| 编号 | 羁绊名 | 推荐角色组合 | 触发逻辑 | 画面锚点 |
|---|---|---|---|---|
| 01 | 废墟战友 | 职场消防员 + 背锅侠 / 天选打工人 + 牛马本马 | carry / pot 高 | 两人背靠背，一个灭火，一个举锅盖挡锅，脚下是项目废墟 |
| 02 | 精神急救站 | 脆皮牛马 + 情绪价值供应商 | crispy + emohealer 或 repair 高 | 一个快裂开，一个递奶茶和纸巾，工位变成急救站 |
| 03 | 好闺/gay蜜 | 两面人 + 情绪价值供应商 / 活人感代表 + 搅 shit 棍 | 嘴损但互护，repair + social/chaos | 两人一起锐评世界，外人攻击时同时护短 |
| 04 | 摸鱼搭子 | 摸鱼圣体 + 边界门神 / 摸鱼圣体 + 人机同事 | fish 高且 boundary 不低 | 电脑屏幕用表格伪装，明显游戏小窗、鱼元素和门神挂画并存 |
| 05 | 背锅盟友 | 背锅侠 + 牛马本马 / 天选打工人 | pot 双高或 pot + carry | 锅从天降，两人背靠背互递锅盖 |
| 06 | 孽缘上下游 | 需求许愿池 + PPT 仙人 / 屎山继承人 + 需求许愿池 | 上下游依赖强 | 神灯许愿、PPT 飞剑、红色循环箭头和工作流链条 |
| 07 | 工位天敌 | 领导体验卡 + 边界门神 / 会议永动机 + 摸鱼圣体 | bossy 高 vs boundary/fish 高 | 门神姿势守边界，对面领导武魂和激光笔压过来 |
| 08 | 互为领导 | 领导体验卡 + 会议永动机 / PPT 仙人 | bossy 双高 | 双激光笔互指，会议齿轮和领导工牌互相拉扯 |
| 09 | 赛博甲乙方 | 需求许愿池 + 边界门神 / 沉默大神 | wishpool 对 boundary / silentgod | 甲方从神灯许愿，乙方用预算/范围墙挡需求 |
| 10 | 屎山继承链 | 屎山继承人 + 职场消防员 / 沉默大神 | legacy 高 + repair/carry | 半身埋在旧系统、文件山、裂开 Excel 中，链条交接给下一任 |
| 11 | 路人同事 | 任意维度距离大、互动低 | 默认兜底关系 | 两人礼貌擦肩，工牌和便签偶然落到同一张桌上 |

## 3. 出图状态

已完成 `portrait` 立绘关系海报：

1. `bond-01-war-comrades-portrait-v1.png`：废墟战友。
2. `bond-02-mental-aid-portrait-v1.png`：精神急救站。
3. `bond-03-best-gay-friends-portrait-v1.png`：好闺/gay蜜。
4. `bond-04-fish-partners-portrait-v1.png`：摸鱼搭子。
5. `bond-05-pot-allies-portrait-v1.png`：背锅盟友。
6. `bond-06-upstream-downstream-karma-portrait-v1.png`：孽缘上下游。
7. `bond-07-desk-nemesis-portrait-v1.png`：工位天敌。
8. `bond-08-mutual-leaders-portrait-v1.png`：互为领导。
9. `bond-09-cyber-client-vendor-portrait-v1.png`：赛博甲乙方。
10. `bond-10-legacy-chain-portrait-v1.png`：屎山继承链。
11. `bond-11-passing-coworkers-portrait-v1.png`：路人同事。

下一轮按同一编号补 `mbti` 几何关系卡，文件名保持 `bond-{序号}-{slug}-mbti-v1.png`。

## 4. 图片命名

- 路径：`public/assets/dgti/bonds/`
- 命名：`bond-{序号}-{slug}-{style}-v{版本}.png`
- 示例：`bond-01-war-comrades-portrait-v1.png`
- 后续分享卡可另存：`bond-card-{bond_slug}-{role_a}-{role_b}-v1.png`
