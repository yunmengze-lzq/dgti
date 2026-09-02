#!/usr/bin/env bash
set -euo pipefail

echo "== host =="
date -u
hostname

echo
echo "== listeners =="
ss -tlnp | grep -E ':(22|80|443)\b' || true

echo
echo "== local /dgti response =="
curl -sS -D - http://127.0.0.1/dgti/ -o /tmp/dgti-local-response.html || true
sed -n '1,24p' /tmp/dgti-local-response.html 2>/dev/null || true

echo
echo "== nginx active config summary =="
nginx -T 2>/tmp/nginx-t.stderr | grep -nE 'server_name|listen|root |alias |location |proxy_pass|include .*(dgti|sites-enabled|conf.d|snippets)' || true
sed -n '1,80p' /tmp/nginx-t.stderr 2>/dev/null || true

echo
echo "== dgti files =="
ls -lah /var/www /var/www/dgti 2>/dev/null || true
find /var/www/dgti -maxdepth 2 -type f 2>/dev/null | sed -n '1,60p' || true

echo
echo "== node/pm2 processes =="
pgrep -af 'node|pm2|vite|poker|texas' || true

echo
echo "== recent ssh log for Codex egress =="
journalctl -u ssh --since "30 minutes ago" --no-pager 2>/dev/null | grep '142.249.36.140' || true
