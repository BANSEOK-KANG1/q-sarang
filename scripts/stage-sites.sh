#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$root/.open-next"
dist_dir="$root/dist"

test -f "$source_dir/worker.js"
test -d "$source_dir/assets"

case "$dist_dir" in
  "$root"/dist) ;;
  *) echo "Unexpected output directory" >&2; exit 2 ;;
esac

rm -rf "$dist_dir"
mkdir -p "$dist_dir/server" "$dist_dir/client"
cp -R "$source_dir"/. "$dist_dir/server"/
rm -rf "$dist_dir/server/assets"
cp -R "$source_dir/assets"/. "$dist_dir/client"/
cp "$source_dir/worker.js" "$dist_dir/server/index.js"
