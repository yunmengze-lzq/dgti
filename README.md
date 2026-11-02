# 打工人 TI · 2.0

25 道日常职场情境题、20 个原创角色、详细解读、好友羁绊与结果长图。手机和桌面都可使用，默认保留几何风立绘。

本产品用于娱乐与自我观察。参考人格与工作环境研究的概念，题目、角色分类和计分为自编，尚未进行信效度验证，不用于心理诊断、招聘或能力评定。详见 [题库参考与方法](docs/QUESTIONNAIRE.md)。

## 本版变化

- 隐藏商品、地址和模拟下单入口，独立保留自愿打赏。现有本机商品数据不删除。
- 25 道题改为通用职场场景，保留 5 种做法和选后吐槽；调整发生语义变化的选项权重。
- 新增整体使用统计、角色分布、反馈分类和体验评分。
- 内置 100 份明确标注的虚拟案例，单独切换，永不写入真实样本库。
- 匿名结果和意见存入 SQLite，支持多设备汇总、重复提交去重、撤回。
- 移除结果页和图鉴的模拟稀有度；角色倾向分不再强行设置 68 分下限，也不再包装成准确率。

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

**只上传 dist 或使用旧静态部署脚本，不会启动统计服务。** 纯静态预览仍能测试、打赏、查看演示分布，但真实统计和意见提交会明确提示不可用。`npm run package:html` 仍用于这种预览。

## 数据口径

- 不自动上传作答。用户完成后勾选同意并提交，服务端重新计分。
- 持久保存匿名凭证摘要、题库版本、角色、四维分数、答卷摘要、提交次数和时间；原始选项不落库。昵称、联系方式、地址、羁绊不上传。
- “参与设备”按匿名浏览器凭证与题库版本去重，保留最新结果；不等于实名人数。相同答案重复提交不累计，不同答案重测计入有效提交次数。
- 意见正文只供运营者在服务器导出，公开页只有分类和体验评分汇总，评分不是准确率。
- 用户可在统计页撤回本浏览器的结果与意见。清空浏览器数据后无法用原凭证撤回。
- 100 份虚拟案例来自固定种子的程序模拟，只演示界面；不计入真实人数、反馈或收入。
- SQLite 位于持久目录，重启后保留数据。备份和恢复方式见部署说明。

查看运营反馈（在服务器项目目录执行，输出包含私有意见正文）：

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
