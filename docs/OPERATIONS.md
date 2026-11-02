# 2.0 运营部署

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

运营者通过 SSH 在项目目录执行以下命令；没有公开反馈明细接口或默认管理密码。

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

个人支付宝码无法返回已验真的支付金额。本版为自愿打赏；付费开放测试、兑换码、退款与订单后台需要另行实现。
