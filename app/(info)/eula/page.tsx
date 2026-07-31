import type { Metadata } from "next";
import { SUPPORT_EMAIL } from "@/components/registry";

export const metadata: Metadata = {
  title: "License — Arsenic",
  description: "End-user license agreement for Arsenic audio tools.",
  openGraph: { title: "License — Arsenic", description: "End-user license agreement for Arsenic audio tools." },
};

const TERMS = [
  { name: "Grant", text: "One license, one human. Install on any machines you personally use and move it freely between them. Studios and teams buy one seat per person." },
  { name: "Delivery", text: "Tools are delivered as Windows installers by download link. Keep your own backup; links may expire, licenses do not." },
  { name: "Restrictions", text: "Don't redistribute or resell installers or license keys, and don't present the tools as your own work. Audio you make with them is entirely yours, commercial or not." },
  { name: "Source", text: "Some tools also publish their source on GitHub under their own licenses. This agreement covers the built installers and paid licenses; the public source keeps its own terms." },
  { name: "Updates", text: "Point releases within a major version are free for license holders. Major versions may be paid upgrades." },
  { name: "No warranty", text: "Provided as-is. These are creative tools that push audio hard — test in your host before session-critical work." },
  { name: "Liability", text: "Total liability is capped at the price you paid." },
  { name: "Termination", text: "Breaking these terms ends the license. Deleting your copies cures the breach." },
  { name: "Contact", text: `Questions: ${SUPPORT_EMAIL}.` },
];

export default function EulaPage() {
  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-24 px-8 md:px-16 lg:px-24">
      <h1 className="display text-4xl md:text-5xl text-paper mb-4 select-none">License</h1>
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-paper-mute mb-14">
        end-user license agreement · july 2026
      </p>
      <div className="max-w-2xl flex flex-col gap-8">
        {TERMS.map((t) => (
          <section key={t.name}>
            <h2 className="text-[10px] font-mono tracking-[0.3em] uppercase text-paper-mute mb-2">
              {t.name}
            </h2>
            <p className="text-[13px] font-light text-paper-dim leading-relaxed">{t.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
