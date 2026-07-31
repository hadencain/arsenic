"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { toolsByState, type Tool } from "./registry";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-paper-mute mb-3">
      {children}
    </p>
  );
}

function Reveal({ children, i = 0 }: { children: React.ReactNode; i?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.25), ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ToolRow({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex flex-col gap-1.5 py-5 border-b border-ink-3 hover:border-arsenic-bright/40 transition-colors duration-500"
    >
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="text-[15px] font-light text-paper group-hover:text-arsenic-bright transition-colors duration-300 shrink-0">
          {tool.title}
        </h2>
        <span className="font-mono text-[10px] tracking-[0.22em] text-paper-mute shrink-0">
          →
        </span>
      </div>
      <p className="text-[12px] text-paper-mute font-light leading-relaxed max-w-[70ch]">
        {tool.pitch}
      </p>
    </Link>
  );
}

export function Catalog() {
  const shipping = toolsByState("shipping");
  const trial = toolsByState("trial");
  const theory = toolsByState("theory");

  return (
    <section className="relative min-h-screen pt-28 md:pt-36 pb-16 px-8 md:px-16 lg:px-24">
      <motion.h1
        className="display text-6xl md:text-7xl text-paper leading-[0.95] mb-16 select-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        Arsenic
      </motion.h1>

      <div className="flex flex-col max-w-3xl">
        <Reveal>
          <SectionLabel>Shipping</SectionLabel>
          {shipping.map((t) => (
            <div key={t.slug} className="flex flex-col gap-1.5 pb-8">
              <div className="flex items-baseline justify-between gap-6">
                <Link href={`/${t.slug}`} className="group shrink-0">
                  <h2 className="text-[17px] font-light text-paper group-hover:text-arsenic-bright transition-colors duration-300">
                    {t.title}
                  </h2>
                </Link>
                <Link
                  href={`/${t.slug}#acquire`}
                  className="font-mono text-[11px] tracking-[0.22em] text-arsenic-bright hover:text-paper transition-colors duration-300 shrink-0"
                >
                  {t.price} — BUY →
                </Link>
              </div>
              <p className="text-[12px] text-paper-mute font-light leading-relaxed max-w-[70ch]">
                {t.pitch}
              </p>
            </div>
          ))}
        </Reveal>

        {trial.length > 0 && (
          <div className="border-t border-ink-3 pt-12 mt-4">
            <Reveal>
              <SectionLabel>Coming soon</SectionLabel>
            </Reveal>
            {trial.map((t, i) => (
              <Reveal key={t.slug} i={i}>
                <ToolRow tool={t} />
              </Reveal>
            ))}
          </div>
        )}

        {theory.length > 0 && (
          <div className="pt-12">
            <Reveal>
              <SectionLabel>In development</SectionLabel>
            </Reveal>
            {theory.map((t, i) => (
              <Reveal key={t.slug} i={i}>
                <ToolRow tool={t} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
