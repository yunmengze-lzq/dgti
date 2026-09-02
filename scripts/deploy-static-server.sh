#!/usr/bin/env bash
set -euo pipefail

HOST="${HOST:-}"
SSH_PORT="${SSH_PORT:-22}"
SSH_KEY="${SSH_KEY:-}"
APP_DIR="${APP_DIR:-/var/www/dgti}"
SITE_NAME="${SITE_NAME:-dgti}"
SERVER_NAME="${SERVER_NAME:-}"
PUBLIC_PATH="${PUBLIC_PATH:-/dgti/}"
ARCHIVE="${ARCHIVE:-output/dgti-dist.tar.gz}"
TARGET_CONF="${TARGET_CONF:-}"

if [ -z "$HOST" ] || [ -z "$SERVER_NAME" ]; then
  echo "Set HOST and SERVER_NAME before deploying, for example:" >&2
  echo "  HOST=root@your-server SERVER_NAME=your-domain-or-ip bash scripts/deploy-static-server.sh" >&2
  exit 1
fi

if ! command -v ssh >/dev/null 2>&1 || ! command -v scp >/dev/null 2>&1; then
  echo "ssh and scp are required." >&2
  exit 1
fi

ssh_args=(-p "$SSH_PORT" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20 -o ConnectionAttempts=1)
scp_args=(-O -P "$SSH_PORT" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20)
if [ -n "$SSH_KEY" ]; then
  ssh_args+=(-i "$SSH_KEY" -o IdentitiesOnly=yes)
  scp_args+=(-i "$SSH_KEY" -o IdentitiesOnly=yes)
fi

echo "Deploying local project: $(pwd)"
echo "Target URL: http://$SERVER_NAME${PUBLIC_PATH}"
echo "Remote app directory: $APP_DIR"

VITE_BASE_PATH="$PUBLIC_PATH" npm run build
mkdir -p output
tar -czf "$ARCHIVE" -C dist .
echo "Built archive: $ARCHIVE"

remote_tmp="/tmp/${SITE_NAME}.tar.gz"
scp "${scp_args[@]}" "$ARCHIVE" "$HOST:$remote_tmp"

printf -v remote_env "APP_DIR=%q SITE_NAME=%q SERVER_NAME=%q REMOTE_TMP=%q TARGET_CONF=%q PUBLIC_PATH=%q" \
  "$APP_DIR" "$SITE_NAME" "$SERVER_NAME" "$remote_tmp" "$TARGET_CONF" "$PUBLIC_PATH"

ssh "${ssh_args[@]}" "$HOST" "$remote_env bash -s" <<'REMOTE'
set -euo pipefail

if ! command -v nginx >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update
    apt-get install -y nginx
  else
    echo "nginx is not installed and apt-get is unavailable. Install nginx first." >&2
    exit 1
  fi
fi

parent_dir="$(dirname "$APP_DIR")"
stage_dir="${parent_dir}/.${SITE_NAME}-stage-$(date +%Y%m%d%H%M%S)"
backup_dir="${APP_DIR}.backup-$(date +%Y%m%d%H%M%S)"

mkdir -p "$parent_dir" "$stage_dir"
tar -xzf "$REMOTE_TMP" -C "$stage_dir"
rm -f "$REMOTE_TMP"

if [ -e "$APP_DIR" ]; then
  mv "$APP_DIR" "$backup_dir"
fi
mv "$stage_dir" "$APP_DIR"
ROOT_DIR="$(dirname "$APP_DIR")"
SNIPPET="/etc/nginx/snippets/${SITE_NAME}-location.conf"
PUBLIC_PATH_NOSLASH="${PUBLIC_PATH%/}"

mkdir -p /etc/nginx/snippets
cat >"$SNIPPET" <<NGINX
location = ${PUBLIC_PATH_NOSLASH} {
    return 301 ${PUBLIC_PATH};
}

location ^~ ${PUBLIC_PATH}assets/ {
    root $ROOT_DIR;
    try_files \$uri =404;
    expires 30d;
    add_header Cache-Control "public, immutable";
}

location ^~ ${PUBLIC_PATH} {
    root $ROOT_DIR;
    index index.html;
    try_files \$uri \$uri/ ${PUBLIC_PATH}index.html;
}
NGINX

if [ -z "$TARGET_CONF" ]; then
  if [ -e /etc/nginx/sites-enabled/default ]; then
    TARGET_CONF="/etc/nginx/sites-enabled/default"
  else
    TARGET_CONF="$(find /etc/nginx/sites-enabled /etc/nginx/conf.d -maxdepth 1 -type f -name '*.conf' 2>/dev/null | head -n 1 || true)"
  fi
fi

if [ -z "$TARGET_CONF" ] || [ ! -f "$TARGET_CONF" ]; then
  echo "No existing nginx server config found. Set TARGET_CONF to the active server config that serves this IP." >&2
  exit 1
fi

backup="${TARGET_CONF}.bak-$(date +%Y%m%d%H%M%S)"
cp "$TARGET_CONF" "$backup"

if ! grep -Fq "include $SNIPPET;" "$TARGET_CONF"; then
  TARGET_CONF="$TARGET_CONF" SNIPPET="$SNIPPET" python3 - <<'PY'
import os
from pathlib import Path

path = Path(os.environ["TARGET_CONF"])
snippet = os.environ["SNIPPET"]
text = path.read_text()
start = text.find("server")
brace = text.find("{", start)
if start == -1 or brace == -1:
    raise SystemExit("No server block found in target nginx config.")

depth = 0
insert_at = -1
for index in range(brace, len(text)):
    char = text[index]
    if char == "{":
        depth += 1
    elif char == "}":
        depth -= 1
        if depth == 0:
            insert_at = index
            break

if insert_at == -1:
    raise SystemExit("Could not find the end of the first server block.")

include_line = f"    include {snippet};\n"
path.write_text(text[:insert_at] + include_line + text[insert_at:])
PY
fi

if ! nginx -t; then
  cp "$backup" "$TARGET_CONF"
  nginx -t
  echo "nginx test failed; restored $TARGET_CONF from $backup." >&2
  failed_dir="${APP_DIR}.failed-$(date +%Y%m%d%H%M%S)"
  if [ -e "$APP_DIR" ]; then
    mv "$APP_DIR" "$failed_dir"
  fi
  if [ -e "$backup_dir" ]; then
    mv "$backup_dir" "$APP_DIR"
  fi
  exit 1
fi

systemctl reload nginx || service nginx reload
echo "Nginx config: $TARGET_CONF"
echo "Static files: $APP_DIR"
REMOTE

echo "Deployed to http://$SERVER_NAME${PUBLIC_PATH}"
