// Single source of truth for the catalog. Data lives in registry-data.json so
// the prebuild drift check (scripts/check-registry.mjs) can read it without a
// TS loader. This module is data-only: it must never import components.

import data from "./registry-data.json";

export type ToolState = "shipping" | "trial" | "theory" | "delisted";

export interface SpecRow {
  label: string;
  value: string;
}

export interface Tool {
  slug: string;
  title: string;
  rank: number;       // shelf order — a label curates, it doesn't taxonomize
  state: ToolState;   // shelf section — the split is by dev reality, not rank
  price?: string;     // present only on the shipping tool; rendered verbatim
  specs: SpecRow[];   // dose-panel rows, rendered verbatim in order
  pitch: string;      // one sentence; catalog row + OG description
  audience: string;   // "who it's for" line, in the audience's vocabulary
  tag: string;        // Buttondown tag; always === slug (unchanged from the portfolio era)
  screenshot?: string;
  screenshotSize?: { w: number; h: number };
  ogImage?: string;
  capturePrompt: string;
  captureCta: string;
}

export const BUTTONDOWN_USERNAME = "hadencain";
export const SUPPORT_EMAIL = "haden.cain@gmail.com";

export const TOOLS = [...(data.tools as unknown as Tool[])].sort((a, b) => a.rank - b.rank);

export function toolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function toolsByState(state: ToolState): Tool[] {
  return TOOLS.filter((t) => t.state === state);
}
