"use client";

import { motion } from "framer-motion";
import type { SpecRow } from "./registry";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Dose panel — the back of the poison bottle. Labels stay muted; the value
// column is the one place the green carries data instead of status.
export function SpecPanel({ specs }: { specs: SpecRow[] }) {
  if (specs.length === 0) return null;
  return (
    <motion.dl
      className="mb-20 max-w-md border-t border-ink-3 pt-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {specs.map((s) => (
        <div key={s.label} className="flex items-baseline gap-6 py-1.5">
          <dt className="text-[10px] font-mono tracking-[0.3em] uppercase text-paper-mute w-28 md:w-36 shrink-0">
            {s.label}
          </dt>
          <dd className="text-[11px] font-mono tracking-[0.08em] text-arsenic-bright">
            {s.value}
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}
