# 打工人 TI

一个面向职场场景的轻娱乐人格测试 H5/网页应用。项目把 MBTI/SBTI 的轻测评体验改造成「打工人生态位」：通过较短题库识别用户的职场行为模式，生成角色结果、详细分析、副标签、羁绊关系、分享长图，并预留打工人周边/陶瓷小人商品页。

> 定位说明：打工人 TI 是娱乐型职场人格测试，不是临床、招聘或心理诊断工具。题目设计参考行为偏好、情境选择和职场互动模式，用来提供认同感、传播梗点和自我观察线索。

## 当前能力

- 25 道职场场景题，选择后自动进入下一题。
- 20 个打工人角色结果，包含主角色、副标签、行为分数和详细解读。
- 支持结果保存、分享链接、结果截图/长图导出。
- 支持羁绊匹配，包括好闺蜜/好 gay 蜜、摸鱼搭子、背锅盟友、路人同事、孽缘上下游、工位天敌、互为领导、赛博甲乙方、屎山继承链。
- 默认展示 MBTI 几何风格立绘，精修立绘暂时隐藏备用。
- 响应式 H5 和桌面网页布局。
- 商品展示、地址管理、模拟下单和小额打赏入口，用于后续接入陶瓷小人周边和真实支付。
- 打赏入口支持支付宝二维码、自填金额、本机累计统计和感谢回执。

## 支付说明

当前版本是前端静态原型：小店订单为模拟支付，打赏金额以用户提交的登记金额做本机统计。个人支付宝收款码无法让网页自动识别真实到账金额；如果要自动确认付款、统计真实金额，需要接入支付宝商家支付能力，由服务端创建订单并通过支付查询或异步通知同步结果。

## 技术栈

- React 19
- Vite 7
- CSS 手写响应式界面
- `html-to-image` 用于结果图导出

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址通常是：

```text
http://localhost:5173/
```

## 校验和构建

校验打工人 TI 题库和角色可达性：

```bash
npm run validate:dgti
```

构建生产包：

```bash
npm run build
```

打包一个可分发的静态 HTML 预览包：

```bash
npm run package:html
```

产物会生成到：

```text
dist/
output/dgti-html-preview.zip
```

## 部署到服务器 `/dgti/`

项目内置了静态部署脚本，会把 Vite 生产包构建为 `/dgti/` 子路径可访问的版本，并上传到服务器的 Nginx 静态目录。

```bash
HOST=root@159.89.211.104 \
SERVER_NAME=159.89.211.104 \
PUBLIC_PATH=/dgti/ \
bash scripts/deploy-static-server.sh
```

脚本默认行为：

- 本地执行 `VITE_BASE_PATH=/dgti/ npm run build`
- 打包 `dist/`
- 上传到服务器 `/tmp/dgti.tar.gz`
- 解压到 `/var/www/dgti`
- 为 Nginx 写入 `/etc/nginx/snippets/dgti-location.conf`
- 在当前启用的 Nginx server 配置中 include 该 location
- reload Nginx

部署完成后访问：

```text
http://159.89.211.104/dgti/
```

## 服务器当前注意点

之前访问 `/dgti/` 出现过旧的「德州扑克」页面，说明服务器上已有别的服务占用了同一路径或 Nginx location 代理规则残留。后续部署时需要确认：

- SSH 能从本机正常连上服务器。
- `/dgti/` 的 Nginx location 已经从旧 Express 服务切到 `/var/www/dgti` 静态目录。
- 如果仍然显示旧项目，需要检查 `nginx -T` 输出里所有 `location /dgti`、`location ^~ /dgti/`、`proxy_pass` 规则的优先级。

## 代码结构

```text
src/App.jsx                         应用入口
src/views/WctiExperience.jsx         打工人 TI 主体验
src/data/dgti.js                     题库、角色、羁绊和展示文案
src/lib/dgtiScoring.js               计分与结果匹配逻辑
src/wcti.css                         主界面样式
public/assets/dgti/                  角色、羁绊和风格参考图
scripts/validate-dgti-scoring.mjs    题库与角色可达性校验
scripts/deploy-static-server.sh      静态服务器部署脚本
```

## 后续可优化

- 给每个角色继续补齐统一的 MBTI 几何风格立绘。
- 完善商品页的真实支付、订单、地址后端和打赏到账回调。
- 给羁绊结果做第二版美术风格。
- 上线前接入 HTTPS、域名和基础访问统计。
