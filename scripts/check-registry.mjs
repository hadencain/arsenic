// Prebuild drift check. Asserts bidirectionally:
//   - every tool slug has app/(tools)/<slug>/page.tsx
//   - every directory under app/(tools)/ has a registry entry
// Plus: required nonempty fields, tag === slug, unique slugs, unique ranks,
// referenced screenshots exist under public/, state is a known enum, specs
// shape + unique labels per tool, price present iff state is shipping,
// at least one shipping tool, buyUrl only on shipping tools, screenshot/
// screenshotSize pair together, and the portfolio's pinned 301-redirect
// targets stay in the registry.

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
const STATES = ["shipping", "trial", "theory", "delisted"];

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
  if (!STATES.includes(t.state))
    errors.push(`${id}: "state" must be one of ${STATES.join(" | ")}`);
  if (!Array.isArray(t.specs) || t.specs.length === 0)
    errors.push(`${id}: missing nonempty "specs" array`);
  else {
    const specLabels = new Set();
    for (const row of t.specs) {
      if (
        typeof row.label !== "string" || row.label.length === 0 ||
        typeof row.value !== "string" || row.value.length === 0
      )
        errors.push(`${id}: every specs row needs nonempty "label" and "value"`);
      if (specLabels.has(row.label))
        errors.push(`${id}: duplicate specs label "${row.label}"`);
      specLabels.add(row.label);
    }
  }
  if (t.state === "shipping" && (typeof t.price !== "string" || t.price.length === 0))
    errors.push(`${id}: shipping tool needs a nonempty "price"`);
  if (t.state !== "shipping" && t.price !== undefined)
    errors.push(`${id}: only shipping tools carry a "price"`);
  if (t.buyUrl !== undefined) {
    if (typeof t.buyUrl !== "string" || t.buyUrl.length === 0)
      errors.push(`${id}: "buyUrl" must be a nonempty string`);
    if (t.state !== "shipping")
      errors.push(`${id}: "buyUrl" is only valid on shipping tools`);
  }
  if (seen.has(t.slug)) errors.push(`duplicate slug "${t.slug}"`);
  seen.add(t.slug);
  if (!existsSync(path.join(repo, "app/(tools)", t.slug, "page.tsx")))
    errors.push(`${id}: app/(tools)/${t.slug}/page.tsx does not exist`);
  for (const p of [t.screenshot, t.ogImage]) {
    if (p && !existsSync(path.join(repo, "public", p)))
      errors.push(`${id}: referenced asset ${p} missing from public/`);
  }
  if (t.screenshot) {
    const s = t.screenshotSize;
    if (
      typeof s !== "object" || s === null ||
      typeof s.w !== "number" || s.w <= 0 ||
      typeof s.h !== "number" || s.h <= 0
    )
      errors.push(`${id}: "screenshot" requires a "screenshotSize" with positive numeric w and h`);
  } else if (t.screenshotSize !== undefined) {
    errors.push(`${id}: "screenshotSize" present without "screenshot"`);
  }
}

const shippingCount = data.tools.filter((t) => t.state === "shipping").length;
if (shippingCount < 1)
  errors.push(`at least one tool must have state "shipping" (found ${shippingCount})`);

if (data.bundle !== undefined) {
  for (const f of ["title", "price", "url"])
    if (typeof data.bundle[f] !== "string" || data.bundle[f].length === 0)
      errors.push(`bundle: missing or empty "${f}"`);
}

const PINNED = ["tc-tools", "sample-viewer", "audio-sort"]; // portfolio 301 targets — never delete
for (const s of PINNED)
  if (!data.tools.find((t) => t.slug === s))
    errors.push(`301 target "${s}" removed from registry`);

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
