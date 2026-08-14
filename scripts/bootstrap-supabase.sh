#!/usr/bin/env sh
set -eu

# Fetches only the officially maintained self-hosted Supabase Docker files.
# Pin a release tag when invoking this script so a deployment is reproducible.
ref="${1:?Usage: sh ./scripts/bootstrap-supabase.sh <supabase-release-tag>}"
target="supabase"

if [ -e "$target" ]; then
  echo "$target already exists; refusing to overwrite it." >&2
  exit 1
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git clone --depth 1 --filter=blob:none --branch "$ref" --no-checkout https://github.com/supabase/supabase.git "$tmp/repository"
git -C "$tmp/repository" sparse-checkout set docker
git -C "$tmp/repository" checkout "$ref"
cp -R "$tmp/repository/docker" "$target"
cp "$target/.env.example" "$target/.env"

echo "Installed official Supabase Compose files at $target."
echo "Edit $target/.env: generate unique secrets and set public URLs before starting containers."
