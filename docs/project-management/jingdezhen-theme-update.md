# 景德镇主题首页改版记录

更新日期：2026-06-12

## 改版目标

- 首页首屏使用江西景德镇特色实景图作为背景。
- 整体风格从通用蓝白科技风转为“千年瓷都 + 当代 AI 创业赛事”。
- 保留报名、进度查询、后台、H5 等项目结构，但首页宣传语境重做。

## 视觉方向

- 主背景：景德镇御窑博物馆建筑实景。
- 主色：瓷白、浅青灰、青花蓝、少量朱砂红与金线点缀。
- 排版：大标题宣传型首屏，后续内容使用城市官网式长页节奏。
- 模块：城市底色、赛事公告、大赛展示、赛程安排、赛事新闻、赛道设置、赛事数据、FAQ、联系信息、正式页脚。

## 本轮补充

- 顶部导航改为首屏透明，滚动后切换为半透明毛玻璃状态。
- 2026-06-12 最终修正：首屏透明导航去除所有边线、阴影和渐变边界，下滑后才切换为白色导航。
- 首页标题改为更克制的中文宋体系展示字，不再用单纯放大制造冲击。
- 参考 `https://cxcy.jxciit.gov.cn/` 的下半部分信息秩序，补齐常见问题、联系我们、主办单位、承办单位、支持我们、关注我们。
- 下半部分重新改为商业活动页结构：赛事公告与大赛展示左右组合、赛程安排、赛道设置、赛事新闻与联系我们左右组合。
- 首页下方快捷入口已删除；立即报名、查询进度移动到“报名开放中”卡片内部。
- 赛事公告、大赛展示、赛事新闻改为交互式图文组件：默认展示第一条图片与文字，鼠标悬停或点击条目时切换主图与详情。
- 区块标题改为桌面左右布局：左侧为英文小标题与中文宋体主标题，右侧为说明文字与金色短线；移动端自动回到上下布局。
- 赛事公告改为一张主公告加两张次公告的商业页面排版。
- 赛程安排由深色大区块改为可点击的浅色横向节点卡，右侧详情面板随点击切换。
- 赛道设置加入六张主题图片，图片铺满卡片，底部蒙版承载赛道文字。
- 独立大地图删除，联系区重新设计为商业化联系卡：服务窗口、电话、技术支持、邮箱、地图缩略图分区展示。
- 最新修正：赛事公告保留单条公告式大图文章；大赛展示与赛事新闻改为“大图主内容 + 精致列表切换”，避免完全同款但保持统一语言。
- 最新修正：大赛展示与赛事新闻列表从“外接列表”调整为融合式面板，主图、当前内容和列表索引处在同一信息容器内，避免拼接感。
- 最新修正：删除“联系我们”模块，替换为常见问题 FAQ 列表/折叠板块，保留正式页脚中的组织单位、支持我们和关注我们。
- 最新修正：移动端首屏改为标题和报名卡上下栈式布局，避免卡片遮挡主标题。
- 字体系统增强中国风：首屏和栏目主标题使用宋体系，城市标签使用楷体风格，正文继续保留易读无衬线。
- 文案改为正式赛事站语气，减少概念化和设计说明式表达。
- 移动端首屏菜单按钮改为透明玻璃态，减少突兀的控件感。
- 最新修正：赛程安排恢复为横向阶段卡 + 右侧详情卡，并在下方新增简洁时间轴；点击节点时详情和时间轴同步。
- 最新修正：大赛展示改为与赛事新闻一致的“大图主内容 + 列表切换”结构，保留展示列表但统一信息语言。
- 最新修正：FAQ 下方联系我们字段已删除，FAQ 回到纯问答模块，避免尾部信息再次变重。
- 最新修正：H5 入口保留为普通导航项；公共 Web 首页增加固定桌面布局模式，浏览器缩窄时只横向滚动，不再响应成 H5/手机版结构。
- 最新修正：统一公告、展示、新闻、FAQ 的标题间距、卡片圆角、阴影和悬停节奏，让下半部分模块更协调。
- 最新修正：大赛展示与赛事新闻合并为“大赛动态”tab 模块，使用同一套大图主内容 + 列表联动，不再上下重复出现两个相似模块。
- 最新修正：恢复并增强 hover 动效：主图轻微放大、列表行横向滑入、赛程卡上浮、赛道卡上浮、FAQ 行轻微侧移，动效只用于状态反馈。
- 最新修正：FAQ 调整为宽版独立模块，左侧标题、右侧问答，避免底部两个列表模块并排造成信息拥挤。
- 最新修正：大赛动态取消药丸式 tab，改为“大标题即 tab”的切换方式，当前标题放大、另一标题缩小，切换时主图和标题内容重新入场。
- 最新修正：FAQ 从原生 details 改为受控 accordion，可再次点击收回；增加加减号旋转、内容滑入和收起动画。
- 最新修正：新增更细的高级动效：动态模块悬停扫光、主图 blur/reveal 入场、标题内容延迟上浮、按钮点击微压缩，并保留 reduced-motion 降级。

## 素材来源

- 图片：`public/assets/jingdezhen-imperial-kiln.jpg`
- 来源页面：https://commons.wikimedia.org/wiki/File:01-Jingdezhen_Imperial_Kiln_Museum.jpg
- 公告图片：`public/assets/jingdezhen-porcelain-dishes.jpg`
- 来源页面：https://commons.wikimedia.org/wiki/File:Set_of_dishes_with_the_arms_of_Johannes_Camphuys,_China,_Jingdezhen,_1671-1690_AD,_porcelain_-_Peabody_Essex_Museum_-_DSC07690.jpg
- 新闻小图：`public/assets/jingdezhen-porcelain-workshop.jpg`
- 来源页面：https://commons.wikimedia.org/wiki/File:Porcelain_Workshop,_Jingdezhen,_Jiangxi,_China.jpg
- 江西 GeoJSON：`src/data/jiangxi-cities.json`
- 来源页面：https://geo.datav.aliyun.com/areas_v3/bound/360000_full.json
- 赛道图片目录：`public/assets/tracks/`
- 赛道图片来源：Wikimedia Commons 公开图片，详见文件名对应下载记录。

## 验证截图

- 桌面首屏：`output/playwright/opc-calm-redesign-home.png`
- 桌面长图：`output/playwright/opc-commercial-interaction-full-final.png`
- 移动长图：`output/playwright/opc-commercial-interaction-mobile-final.png`
- 最新桌面长图：`output/playwright/opc-editorial-modules-faq-full-final.png`
- 最新移动长图：`output/playwright/opc-editorial-modules-faq-mobile-final.png`
- 列表修正版桌面长图：`output/playwright/opc-editorial-list-modules-full.png`
- 列表修正版移动长图：`output/playwright/opc-editorial-list-modules-mobile.png`
- 融合列表版桌面长图：`output/playwright/opc-integrated-list-modules-full.png`
- 融合列表版移动长图：`output/playwright/opc-integrated-list-modules-mobile.png`
- 业务评审桌面长图：`output/playwright/opc-business-review-fullpage.png`
- 最新验证：本轮按要求不新增截图；`npm run build` 通过；内置浏览器无截图 DOM 检查确认标题 tab 当前字号 42px、非当前 24px，切换后字号互换并更新主图；FAQ 首项可收回、第二项可打开且 aria 状态正确；390px 窄视口仍保持固定 Web 画布；控制台无错误。
