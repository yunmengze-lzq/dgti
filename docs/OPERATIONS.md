# 2.1 运营部署

推送 GitHub 与服务器部署是两步。新版本需要 Node.js 服务；旧的静态部署脚本不能提供真实统计。

## 目录与服务

建议代码位于 `/opt/dgti`，数据库在独立的 `/var/lib/dgti/dgti.sqlite`。要求 Node.js 24+。准备运行用户 `dgti`，授予代码读取和数据库目录写入权限；数据库不要放到 `dist`、`public` 或会被新版本覆盖的目录。

项目目录运行 `npm ci`，再运行 `VITE_BASE_PATH=/dgti/ npm run build`。以下为 `/etc/systemd/system/dgti.service` 配置示例，先用 `command -v node` 确认路径，并替换公共域名。

```ini
[Unit]
Description=DGTI web and anonymous statistics
After=network.target

[Service]
User=dgti
Group=dgti
WorkingDirectory=/opt/dgti
ExecStart=/usr/bin/node server/index.js
Environment=NODE_ENV=production
Environment=HOST=127.0.0.1
Environment=PORT=8787
Environment=DGTI_BASE_PATH=/dgti/
Environment=DGTI_DB_PATH=/var/lib/dgti/dgti.sqlite
Environment=DGTI_PUBLIC_ORIGIN=https://your-domain.example
Environment=DGTI_TRUST_PROXY=1
Restart=on-failure
UMask=0077
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/dgti
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

配置后执行 `systemctl daemon-reload` 和 `systemctl enable --now dgti`。使用 IP 时，`DGTI_PUBLIC_ORIGIN` 填实际的 `http://IP`，不带末尾斜杠或 `/dgti/`，用于请求来源校验。

## Nginx

先检查 `nginx -T`，备份当前配置。仅在承载目标域名的现有 server 块中替换 DGTI location，不增加重复 location，不覆盖其他应用根路径。旧 `/dgti/assets/` 静态规则也需移除，避免引用旧构建文件。

```nginx
location = /dgti { return 301 /dgti/; }
location ^~ /dgti/ {
    proxy_pass http://127.0.0.1:8787;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 8k;
}
```

`proxy_pass` 保留路径，末尾不要加 `/`。`nginx -t` 成功后再 reload。API 默认每 IP 每分钟最多 120 次请求；同一浏览器每天最多 5 条意见。只在服务绑定 loopback、前方为受控 Nginx 时开启 `DGTI_TRUST_PROXY=1`。

部署后检查：`GET /dgti/api/stats` 返回 JSON；两浏览器提交后设备数增加；相同答卷重复提交不增加；反馈能导出；重启后数据仍在。演示案例不得出现在真实计数。

## 查看反馈与备份

统计页底部的「作者入口 · 意见管理」可以筛选、翻页、标记已读。先在服务器项目目录生成独立管理密钥：

```bash
sudo -u dgti env DGTI_DB_PATH=/var/lib/dgti/dgti.sqlite npm run setup:admin
```

密钥位于 `/var/lib/dgti/admin-key.txt`，权限为 600。用 SSH 查看并在后台输入，不要提交到 Git 或发送给用户。后台仅在页面内存保留密钥，刷新需重新登录；生产环境必须使用 HTTPS 或 SSH 隧道访问后台，不要在明文公网 HTTP 中输入密钥。也可通过 `DGTI_ADMIN_KEY` 环境变量配置至少 32 字符的随机密钥。公开统计不返回意见正文。

运营者也可以通过 SSH 导出：

```bash
DGTI_DB_PATH=/var/lib/dgti/dgti.sqlite npm run --silent export:feedback
```

定期使用 SQLite 原生备份，避免运行中仅复制主文件而遗漏 WAL。安装了 sqlite3 的服务器可执行：

```bash
sqlite3 /var/lib/dgti/dgti.sqlite ".backup '/safe-backups/dgti-backup.sqlite'"
```

备份目录仅允许运营者访问。恢复前停止服务，恢复后检查数据库所属用户再启动。撤回会删除当前库记录；旧备份可能包含历史内容，应制定保留期限，避免恢复后重新公开已撤回数据。

## 数据限制与售卖

匿名统计没有实名验证，不能当成独立付费人数、实际销量或准确率；清缓存、多浏览器会产生新凭证。公开服务仍可能收到伪造或刷量提交，限流不能完全防止。

统计仅汇总当前题库版本。改题意、顺序、计分后需更新版本并验证。旧本机答卷在 `legacyAssessment` 备份，当前题库重新作答。

答题页在开始时说明自动上传范围，完成后保存角色、四维摘要及答案哈希，不保存原始逐题答案、昵称或羁绊。用户可在统计页关闭上传、撤回当前浏览器的结果和意见。网络失败保留本机结果，可重试。

统计页每 15 秒刷新；同浏览器同版只计最新角色，相同答案重试不会重复计数。稀有排名按已出现角色的人数升序并列排名，零样本角色不排名；占比不是总体人口比例，匹配度是固定计分规则的分数，不随人气提高。100 份模拟答卷只用于内部测试，不公开、不写入生产库。

个人支付宝码无法返回已验真的支付金额。本版为自愿打赏；付费开放测试、兑换码、退款与订单后台需要另行实现。
