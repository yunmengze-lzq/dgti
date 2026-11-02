# 打工人 TI · 2.1

25 道日常职场情境题、20 个原创角色、详细解读、好友羁绊与结果长图。手机和桌面都可使用，默认保留几何风立绘。

本产品用于娱乐与自我观察。参考人格与工作环境研究的概念，题目、角色分类和计分为自编，尚未进行信效度验证，不用于心理诊断、招聘或能力评定。详见 [题库参考与方法](docs/QUESTIONNAIRE.md)。

## 本版变化

- 隐藏商品、地址和模拟下单入口，独立保留自愿打赏。现有本机商品数据不删除。
- 25 道题重新打磨：每个选项先说具体做法，再接吐槽，保留 5 种不同反应。
- 答题前告知保存范围，完成后自动同步摘要到服务器，也可关闭和撤回。
- 角色分布改为带坐标轴的柱状图，手机可横向查看；每 15 秒刷新实际样本。
- 结果页显示匹配度、同类占比和稀有排名；无样本不虚构排名。
- 新增管理密钥保护的意见收件箱，可筛选、翻页和标记已读。
- 100 份模拟案例仅保留为内部测试，不出现在公开统计中。

## 本地运行

要求 Node.js 24+，使用其内置 SQLite，无需另装数据库。

```bash
npm ci
npm run dev
```

打开 Vite 输出的地址（默认 http://localhost:5173/）。开发服务器内置同源 API，默认数据库为 `var/dgti.sqlite`，已从 Git 排除。

## 构建与验证

```bash
npm run build
npm run test:api
npm run validate:dgti
npm run validate:dgti:bonds
```

角色可达性测试仅说明计分能得到每个结果，不代表科学效度或人群真实比例。

## 生产运行

```bash
VITE_BASE_PATH=/dgti/ npm run build
DGTI_DB_PATH=/var/lib/dgti/dgti.sqlite DGTI_PUBLIC_ORIGIN=https://your-domain.example npm start
```

启动前确保运行用户对数据库目录有写入权限。服务默认只监听 `127.0.0.1:8787`，页面与 API 都在 `/dgti/` 下。Nginx 仅代理 `/dgti/`，不要覆盖其他应用。具体步骤见 [运营部署说明](docs/OPERATIONS.md)。

**只上传 dist 或使用旧静态部署脚本，不会启动统计服务。** 纯静态预览仍能测试、打赏，但真实统计和意见提交会明确提示不可用。`npm run package:html` 仍用于这种预览。

## 数据口径

- 首题告知保存范围，继续作答后完成时自动上传，服务端重新计分；用户可在统计页关闭自动上传。
- 持久保存匿名凭证摘要、题库版本、角色、四维分数、答卷摘要、提交次数和时间；原始选项不落库。昵称、联系方式、地址、羁绊不上传。
- “参与设备”按匿名浏览器凭证与题库版本去重，保留最新结果；不等于实名人数。相同答案重复提交不累计，不同答案重测计入有效提交次数。
- 意见正文只供持管理密钥的作者查看或在服务器导出，公开页只有分类和体验评分汇总，评分不是准确率。
- 用户可在统计页撤回本浏览器的结果与意见。清空浏览器数据后无法用原凭证撤回。
- 100 份虚拟案例来自固定种子的程序模拟，只用于内部测试；不计入真实人数、反馈或收入。
- SQLite 位于持久目录，重启后保留数据。备份和恢复方式见部署说明。

查看运营反馈（在服务器项目目录执行，输出包含私有意见正文）：

网页后台：运行 `npm run setup:admin` 生成管理密钥，再从统计页底部进入「作者入口」。生产设置与 HTTPS 要求见 [运营部署说明](docs/OPERATIONS.md)。

```bash
DGTI_DB_PATH=/var/lib/dgti/dgti.sqlite npm run --silent export:feedback
```

## 打赏与售卖边界

目前保留个人支付宝收款码，金额由用户在支付宝填写。网页只允许登记最近 50 笔本机自报金额，无法确认到账。打赏不解锁任何内容，也不是购买凭证。

本版没有新增付费解锁或兑换码。需要自动售卖测试时，还需商户支付、订单校验与访问权限逻辑；不能把静态收款码或“已登记”按钮当成真实付款验证。

## 主要文件

```text
src/views/WctiExperience.jsx      测试、结果、羁绊与打赏
src/components/DgtiCommunity.jsx 统计、意见、参考来源
src/data/dgti.js                  题库与角色
src/data/dgtiResearch.js          版本与逐题概念参考
src/lib/dgtiScoring.js            自定义计分
src/lib/dgtiStatistics.js         汇总和独立演示案例
server/api.js                    校验与匿名数据接口
server/store.js                  SQLite 持久化
server/index.js                  生产静态页面和 API 服务
```
