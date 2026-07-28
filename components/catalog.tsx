"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TOOLS } from "./registry";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Catalog() {
  return (
    <section className="relative min-h-screen pt-28 md:pt-36 pb-16 px-8 md:px-16 lg:px-24">
      <motion.h1
        className="display text-6xl md:text-7xl text-paper leading-[0.95] mb-4 select-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        Arsenic
      </motion.h1>
      <motion.p
        className="text-[13px] text-paper-dim font-light max-w-md mb-16 leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
      >
        An audio instrument label. Spectral processors, terminal instruments,
        and sample tools — small, sharp, and built to be played.
      </motion.p>

      <div className="flex flex-col max-w-3xl">
        {TOOLS.map((t, i) => (
          <motion.div
            key={t.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.25), ease: EASE }}
          >
            <Link
              href={`/${t.slug}`}
              className="group flex flex-col gap-1.5 py-5 border-b border-ink-3 hover:border-arsenic-bright/40 transition-colors duration-500"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="text-[15px] font-light text-paper group-hover:text-arsenic-bright transition-colors duration-300 shrink-0">
                  {t.title}
                </h2>
                <span className="font-mono text-[10px] tracking-[0.22em] text-paper-mute shrink-0">
                  →
                </span>
              </div>
              <p className="text-[12px] text-paper-mute font-light leading-relaxed max-w-[70ch]">
                {t.pitch}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
