// Single source of truth for the catalog. Data lives in registry-data.json so
// the prebuild drift check (scripts/check-registry.mjs) can read it without a
// TS loader. This module is data-only: it must never import components.

import data from "./registry-data.json";

export interface Tool {
  slug: string;
  title: string;
  rank: number;       // shelf order — a label curates, it doesn't taxonomize
  pitch: string;      // one sentence; catalog row + OG description
  audience: string;   // "who it's for" line, in the audience's vocabulary
  tag: string;        // Buttondown tag; always === slug (unchanged from the portfolio era)
  screenshot?: string;
  ogImage?: string;
  capturePrompt: string;
  captureCta: string;
}

export const BUTTONDOWN_USERNAME = "hadencain";

export const TOOLS = [...(data.tools as Tool[])].sort((a, b) => a.rank - b.rank);

export function toolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
