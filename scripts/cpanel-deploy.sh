#!/bin/bash
# Installs runtime dependencies (only when package-lock.json changed) and
# restarts both Passenger apps. No building happens on the server: the
# `production` branch already contains apps/api/dist and apps/web/.next.
set -eEo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
LOG="$HOME/apperp-deploy.log"
trap 'echo "!! FAILED at line $LINENO: $BASH_COMMAND"' ERR
main() {
echo "=== $(date) deploy $(git -C "$REPO" log --oneline -1)"

for app in api web; do
  dir="$REPO/apps/$app"
  venv=""
  for v in "$HOME"/nodevenv/repositories/apperp/apps/$app/*/; do if [ -f "$v/bin/activate" ]; then venv="$v"; fi; done
  if [ -z "$venv" ]; then
    echo "!! No Node.js virtualenv under $HOME/nodevenv/repositories/apperp/apps/$app - create it in Setup Node.js App"; ls -la "$HOME/nodevenv" "$HOME/nodevenv/repositories/apperp/apps" 2>&1 || true; exit 1
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
    # npm may rewrite the lockfile; restore it so cPanel sees a clean tree
    git -C "$REPO" checkout -- "apps/$app/package-lock.json" "apps/$app/package.json" || true
    echo "$hash" > "$stamp"
  fi
  touch "$dir/tmp/restart.txt"
  echo "-- restarted $app"
done
echo "=== done"
}

# Plain pipe (no process substitution: CageFS has no /dev/fd)
main 2>&1 | tee -a "$LOG"
