// Prebuild drift check. Asserts bidirectionally:
//   - every tool slug has app/(tools)/<slug>/page.tsx
//   - every directory under app/(tools)/ has a registry entry
// Plus: required nonempty fields, tag === slug, unique slugs, unique ranks,
// referenced screenshots exist under public/.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(
  readFileSync(path.join(repo, "components/registry-data.json"), "utf8")
);

const errors = [];
const seen = new Set();
const ranks = new Set();
const REQUIRED = ["slug", "title", "pitch", "audience", "tag", "capturePrompt", "captureCta"];

for (const t of data.tools) {
  const id = t.slug ?? "(missing slug)";
  for (const f of REQUIRED) {
    if (typeof t[f] !== "string" || t[f].length === 0)
      errors.push(`${id}: missing or empty "${f}"`);
  }
  if (typeof t.rank !== "number") errors.push(`${id}: missing numeric "rank"`);
  if (ranks.has(t.rank)) errors.push(`${id}: duplicate rank ${t.rank}`);
  ranks.add(t.rank);
  if (t.tag !== t.slug) errors.push(`${id}: tag ("${t.tag}") must equal slug`);
  if (seen.has(t.slug)) errors.push(`duplicate slug "${t.slug}"`);
  seen.add(t.slug);
  if (!existsSync(path.join(repo, "app/(tools)", t.slug, "page.tsx")))
    errors.push(`${id}: app/(tools)/${t.slug}/page.tsx does not exist`);
  for (const p of [t.screenshot, t.ogImage]) {
    if (p && !existsSync(path.join(repo, "public", p)))
      errors.push(`${id}: referenced asset ${p} missing from public/`);
  }
}

const toolsDir = path.join(repo, "app/(tools)");
const dirs = existsSync(toolsDir)
  ? readdirSync(toolsDir, { withFileTypes: true }).filter((d) => d.isDirectory())
  : [];
for (const d of dirs) {
  if (!data.tools.find((x) => x.slug === d.name))
    errors.push(`app/(tools)/${d.name}/ exists but has no registry entry`);
}

if (errors.length > 0) {
  console.error("registry check FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`registry check OK — ${data.tools.length} tools, ${dirs.length} built pages`);
