import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Arsenic",
  description: "Release notes across the Arsenic catalog.",
};

const ENTRIES = [
  { date: "2026-07", tool: "Spectral Shuffler", version: "1.0.0 · unreleased",
    notes: [
      "Engine and UI complete — band capture, shuffle rate, chaos selection.",
      "In internal testing; not yet released.",
    ] },
  { date: "2026-07", tool: "White Hole", version: "1.0.0",
    notes: [
      "Unclamped lift/thin law — rails widened to +60 / −100 dB.",
      "Dead-zone annulus added to the display.",
    ] },
  { date: "2026-07", tool: "Gravity Well", version: "1.0.0",
    notes: [
      "Causal-orbits display — ghost ring, tether, and output dot per bin.",
      "Hop-boundary click fixed with a synthesis window and renormalization.",
    ] },
  { date: "2026-07", tool: "Fracture", version: "1.0.0",
    notes: [
      "Three-mode visualizer — FIELD, SCOPE, SHARDS.",
      "Room-size changes no longer wipe the tail — crossfaded delay lines.",
    ] },
  { date: "2026-07", tool: "Smear", version: "1.0.0",
    notes: [
      "Two-layer cause-and-effect display — input ghost under processed spokes.",
      "Hop-boundary click fixed with a synthesis window and renormalization.",
    ] },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-24 px-8 md:px-16 lg:px-24">
      <h1 className="display text-4xl md:text-5xl text-paper mb-14 select-none">Changelog</h1>
      <div className="max-w-2xl flex flex-col gap-10">
        {ENTRIES.map((e) => (
          <section key={`${e.tool}-${e.version}`}>
            <div className="flex items-baseline gap-4 mb-2">
              <h2 className="text-[14px] font-light text-paper">{e.tool}</h2>
              <span className="font-mono text-[11px] tracking-[0.08em] text-arsenic-bright">
                {e.version}
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-paper-mute">
                {e.date}
              </span>
            </div>
            <ul className="flex flex-col gap-1">
              {e.notes.map((n) => (
                <li key={n} className="text-[12px] font-light text-paper-mute leading-relaxed">
                  {n}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
