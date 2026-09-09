#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$root/.open-next"
bundle_dir="$root/.wrangler/sites-bundle"
dist_dir="$root/dist"

test -f "$source_dir/worker.js"
test -d "$source_dir/assets"

case "$bundle_dir" in
  "$root"/.wrangler/sites-bundle) ;;
  *) echo "Unexpected bundle directory" >&2; exit 2 ;;
esac

case "$dist_dir" in
  "$root"/dist) ;;
  *) echo "Unexpected output directory" >&2; exit 2 ;;
esac

rm -rf "$bundle_dir"
(
  cd "$root"
  npx wrangler deploy --dry-run --outdir "$bundle_dir"
)
test -f "$bundle_dir/worker.js"

rm -rf "$dist_dir"
mkdir -p "$dist_dir/server" "$dist_dir/client"
cp -R "$source_dir/assets"/. "$dist_dir/client"/

# Keep previously shared asset URLs working without exposing the retired O-LOVE artwork.
cp "$root/public/q-love-logo-transparent-v2.png" "$dist_dir/client/olove-logo-transparent.png"
cp "$root/public/q-love-logo-transparent-v2.png" "$dist_dir/client/olove-logo.png"
cp "$root/public/og-q-love.png" "$dist_dir/client/og.png"
cmp "$root/public/q-love-logo-transparent-v2.png" "$dist_dir/client/olove-logo-transparent.png"
cmp "$root/public/q-love-logo-transparent-v2.png" "$dist_dir/client/olove-logo.png"
cmp "$root/public/og-q-love.png" "$dist_dir/client/og.png"

cp "$bundle_dir/worker.js" "$dist_dir/server/index.js"
