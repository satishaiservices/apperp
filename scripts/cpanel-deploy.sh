#!/bin/bash
# Installs runtime dependencies (only when package-lock.json changed) and
# restarts both Passenger apps. No building happens on the server: the
# `production` branch already contains apps/api/dist and apps/web/.next.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
LOG="$HOME/apperp-deploy.log"
exec >>"$LOG" 2>&1
echo "=== $(date) deploy $(git -C "$REPO" log --oneline -1)"

for app in api web; do
  dir="$REPO/apps/$app"
  venv=$(ls -d "$HOME"/nodevenv/repositories/apperp/apps/$app/*/ 2>/dev/null | sort -V | tail -1)
  if [ -z "$venv" ]; then
    echo "!! No Node.js app found for apps/$app - create it in Setup Node.js App"; exit 1
  fi
  if [ ! -f "$dir/dist/main.js" ] && [ ! -f "$dir/.next/BUILD_ID" ]; then
    echo "!! apps/$app has no build output - is the 'production' branch checked out?"; exit 1
  fi
  stamp="$dir/tmp/.lock-hash"
  hash=$(md5sum "$dir/package-lock.json" | cut -d' ' -f1)
  mkdir -p "$dir/tmp"
  if [ "$(cat "$stamp" 2>/dev/null)" != "$hash" ]; then
    echo "-- installing dependencies for $app"
    ( source "$venv/bin/activate" && cd "$dir" && npm install --omit=dev --ignore-scripts --no-audit --no-fund )
    echo "$hash" > "$stamp"
  fi
  touch "$dir/tmp/restart.txt"
  echo "-- restarted $app"
done
echo "=== done"
