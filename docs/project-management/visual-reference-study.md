# OPC报名通道视觉参考研究

更新日期：2026-06-12

## 参考来源

- Vercel Ship 26：https://vercel.com/ship
- Stripe Sessions 2026：https://stripe.com/sessions
- Apple Developer WWDC26：https://developer.apple.com/wwdc26/
- Apple Events：https://www.apple.com/apple-events/
- GitHub Universe 2026：https://githubuniverse.com/
- Awwwards Event Websites：https://www.awwwards.com/websites/events/
- Webby Events Winners：https://winners.webbyawards.com/winners/websites-and-mobile-sites/general-desktop-mobile-sites/events
- Webflow Event Website Examples：https://webflow.com/blog/event-websites
- 江西省第二届高层次人才创新创业大赛：https://cxcy.jxciit.gov.cn/

## 学到的成熟规则

1. 首屏只保留一个主焦点：品牌、标题、行动按钮、报名时间和一个可信视觉资产。
2. 视觉资产必须完整成体系，不能由大量不相关漂浮卡片堆出“科技感”。
3. 导航应克制、稳定、像真实官网，而不是样机式按钮组。
4. 字体层级要少而准：H1 足够强，副标题和说明文字为行动服务，不用概念词堆叠。
5. 长页节奏应从“建立信任”进入“理解流程”，再到“选择赛道、下载材料、联系咨询”。
6. 动效只承担状态流动、路径引导、轻微层级变化，避免装饰性炫技。

## 本轮设计取舍

- 最新方向改为摄影主导的商业活动页：景德镇实景首屏建立城市信任，页面下半部分用赛事公告、大赛展示、赛程安排、赛道设置、赛事新闻、联系我们和正式页脚承接信息。
- 采用瓷白、浅青灰、青花蓝、少量朱砂红和金线点缀，弱化高饱和蓝和大面积深色。
- 替换旧 3D/陶瓷/漂浮元素，改成真实图片、明确标题、强赛程节点和正式地图组件。
- 首页结构重排为：首屏、赛事公告/大赛展示双栏、赛程安排、赛道设置、赛事新闻/联系我们双栏、组织单位页脚。
- 最新细节修正：移除首屏下方快捷入口；报名/查询按钮进入报名开放卡；公告/展示/新闻改为主图联动列表；赛程改为可点击节点加详情面板；赛道图片铺满并用底部蒙版显示文字；联系我们改为服务窗口、联系方法和地图缩略图组合卡。
- 最新细节修正：公告保留单条公告式大图文章；展示/新闻保留列表能力，改为“大图主内容 + 精致列表切换”；删除联系我们，替换为常见问题 FAQ 列表/折叠板块；赛程和赛道标题同步改成“中文标题 + 淡英文”的一致体系。
- 最新细节修正：展示/新闻列表进一步融合到主图模块内，形成主图、当前内容、列表索引同一容器的编辑部式信息面板，避免简单拼接。
- 最新细节修正：赛程恢复为横向阶段卡并增加下方时间轴；展示模块与新闻模块统一为封面图 + 列表切换；FAQ 删除联系我们字段，回归纯问答信息。
- 最新细节修正：H5 入口保留为导航项；Web 首页固定为桌面官网布局，浏览器缩窄时不响应成 H5/手机结构，而是保持 1180px Web 画布横向滚动。
- 最新细节修正：公告、展示、新闻、FAQ 的标题间距、卡片边界、阴影和悬停反馈继续统一，减少模块拼接感。
- 最新细节修正：展示与新闻合并为“大赛动态”tab，借鉴成熟活动官网常见的“一个媒体窗口承载多个内容类别”方式，降低页面重复感。
- 最新细节修正：恢复更明显但克制的 hover 反馈，使用上浮、横向滑入、图片缓慢放大和浅阴影变化强化可点击性。
- 最新细节修正：FAQ 改为宽版独立模块，承接赛道之后的信息收束，不再与新闻模块并列竞争注意力。
- 最新细节修正：大赛动态改成“大标题即 tab”的切换方式，当前标题变大、非当前标题变小，比药丸 tab 更适合赛事展示页的编辑部气质。
- 最新细节修正：FAQ 使用受控 accordion，解决原生 details 打开后不易收回的问题，并加入加减号旋转与内容滑入。
- 最新细节修正：增强高级动效但控制强度，包括媒体扫光、主图 reveal、标题上浮、按钮微压缩和 reduced-motion 降级。
- 前台、管理后台、H5 保留同一项目结构，公共首页先完成高质量展示页。
- 下半部分参考省级赛事官网的信息完整度，补齐景德镇位置、组织单位、支持合作和二维码关注区。

## 验证产物

- 桌面首屏：`output/playwright/opc-mature-home-v2.png`
- 桌面长图：`output/playwright/opc-mature-full-v2.png`
- 移动长图：`output/playwright/opc-mature-mobile.png`
- 管理后台：`output/playwright/opc-mature-admin.png`
- H5入口：`output/playwright/opc-mature-h5.png`
- 最新桌面长图：`output/playwright/opc-final-full-v3.png`
- 最新滚动导航：`output/playwright/opc-final-navbar-scrolled.png`
- 商业重设计桌面长图：`output/playwright/opc-commercial-redesign-full-v2.png`
- 商业重设计移动长图：`output/playwright/opc-commercial-redesign-mobile-v2.png`
- 最终桌面首屏：`output/playwright/opc-redesign-home-final.png`
- 最终桌面长图：`output/playwright/opc-redesign-full-final.png`
- 最终移动长图：`output/playwright/opc-redesign-mobile-final.png`
- 标题/赛道/地图修正版桌面长图：`output/playwright/opc-redesign-title-track-map-final.png`
- 标题/赛道/地图修正版移动长图：`output/playwright/opc-redesign-title-track-map-mobile-final.png`
- 浅色舒适版桌面长图：`output/playwright/opc-calm-redesign-full-final.png`
- 浅色舒适版移动长图：`output/playwright/opc-calm-redesign-mobile-final.png`
- 商业交互版桌面长图：`output/playwright/opc-commercial-interaction-full-final.png`
- 商业交互版移动长图：`output/playwright/opc-commercial-interaction-mobile-final.png`
- 文章模块 + FAQ 桌面长图：`output/playwright/opc-editorial-modules-faq-full-final.png`
- 文章模块 + FAQ 移动长图：`output/playwright/opc-editorial-modules-faq-mobile-final.png`
- 列表修正版桌面长图：`output/playwright/opc-editorial-list-modules-full.png`
- 列表修正版移动长图：`output/playwright/opc-editorial-list-modules-mobile.png`
- 融合列表版桌面长图：`output/playwright/opc-integrated-list-modules-full.png`
- 融合列表版移动长图：`output/playwright/opc-integrated-list-modules-mobile.png`
- 本轮无截图验证：按要求未新增截图，仅执行 `npm run build` 与内置浏览器 DOM/交互检查；标题 tab 字号切换、FAQ 收回/展开、媒体 reveal、固定 Web 画布均通过。

## 后续预留

- 若继续提升视觉资产质量，可将当前 SVG 通道替换为一张专业 3D 渲染资产，但信息结构不变。
- 后续后端接入时，首页公告、赛程、赛道、材料模板、报名数据应改为接口驱动。
- 管理后台后续需要补充详情抽屉、批量审核、材料预览、导出任务状态。
