# 打工人 TI 资产命名管理

> 用途：管理角色图鉴、单角色精修图、商品图和羁绊图，避免多轮生成后混乱。
> 15 号角色已退役，编号暂不复用；16 号当前为 twoface。

## 1. 角色编号

固定使用 19 个活跃角色编号，15 号暂时退役，后续角色不前移：

| 序号 | code | 中文名 |
|---:|---|---|
| 01 | chosen | 天选打工人 |
| 02 | cowhorse | 牛马本马 |
| 03 | fish | 摸鱼圣体 |
| 04 | traitor | 工贼嫌疑人 |
| 05 | potman | 背锅侠 |
| 06 | firefighter | 职场消防员 |
| 07 | crispy | 脆皮牛马 |
| 08 | boundary | 边界门神 |
| 09 | leadercard | 领导体验卡 |
| 10 | pptgod | PPT 仙人 |
| 11 | meetingbot | 会议永动机 |
| 12 | wishpool | 需求许愿池 |
| 13 | stirrer | 搅 shit 棍 |
| 14 | shitmountain | 屎山继承人 |
| 15 | retired | 已退役 |
| 16 | twoface | 两面人 |
| 17 | alive | 活人感代表 |
| 18 | emohealer | 情绪价值供应商 |
| 19 | silentgod | 沉默大神 |
| 20 | aicoworker | 人机同事 |

## 2. 文件命名规则

| 类型 | 路径 | 命名 |
|---|---|---|
| 四人组图鉴 | `public/assets/dgti/sheets/` | `dgti-{group}-lineup-v{n}.png` |
| 单角色切图 | `public/assets/dgti/characters-v2/crops/` | `{序号}-{code}-crop-v2.png` |
| portrait 立绘精修图 | `public/assets/dgti/characters-v2/refined/` | `{序号}-{code}-hero-v{n}.png` |
| mbti 几何备用图 | `public/assets/dgti/characters-v2/mbti/` | `{序号}-{code}-mbti-v{n}.png` |
| 陶瓷商品图 | `public/assets/dgti/products/ceramic/` | `{序号}-{code}-ceramic-v{n}.png` |
| 羁绊图 | `public/assets/dgti/bonds/` | `bond-{bond_code}-v{n}.png` |

`portrait` 和 `mbti` 是两套并行美术风格，不互相覆盖。`v2` 是早期统一画风图鉴版本；后续 portrait 单角色精修从 `hero-v3` 开始，mbti 单角色备用图从 `mbti-v1` 开始。

## 3. 数据源

- 角色审核 manifest：`public/assets/dgti/characters-v2/manifest.json`
- 切图脚本：`scripts/split_dgti_characters.py`
- 审核板：`public/dgti-character-review.html`
- 形象母版：`docs/dagongren-ti-character-design-bible.md`

## 4. 工作流

1. 先在审核板确认角色编号和 code。
2. portrait 单角色返修只生成 `refined/{序号}-{code}-hero-v{n}.png`，mbti 单角色只生成 `mbti/{序号}-{code}-mbti-v{n}.png`，不覆盖 crop。
3. 用户确认后，再把 manifest 的 `styleVariants` 指向最新 confirmed/candidate 文件。
4. 商品图优先引用 portrait confirmed 主图；页面风格切换可引用 mbti confirmed/candidate 备用图。
5. 旧版本保留，只有确认废弃后再移入 archive。
