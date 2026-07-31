"use client";

import { motion } from "framer-motion";
import { BUNDLE, type Tool } from "./registry";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Buy block for shipping tools. Renders nothing for the rest of the shelf,
// so putting a product on sale is a registry edit: state + price (+ buyUrl
// when the storefront listing exists — until then the button hands off to
// the capture form in the page's #notify wrapper).
export function AcquireBlock({ tool }: { tool: Tool }) {
  if (tool.state !== "shipping" || !tool.price) return null;
  return (
    <motion.div
      id="acquire"
      className="mb-16 max-w-md scroll-mt-28"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[16px] text-arsenic-bright">{tool.price}</span>
        <span className="text-[12px] text-[#868376] font-light">Windows VST3 installer</span>
      </div>
      {tool.buyUrl ? (
        <>
          <a
            href={tool.buyUrl}
            className="mt-4 inline-block border border-arsenic px-5 py-2.5 font-mono text-[11px] tracking-[0.22em] text-arsenic-bright hover:bg-arsenic/20 transition-colors duration-300"
          >
            BUY — {tool.price}
          </a>
          <p className="mt-3 text-[11px] text-[#7c7a6d] font-light leading-relaxed">
            Or all four instruments —{" "}
            <a
              href={BUNDLE.url}
              className="text-arsenic-bright hover:text-paper transition-colors duration-300"
            >
              the complete line, {BUNDLE.price}
            </a>
            .
          </p>
        </>
      ) : (
        <>
          <a
            href="#notify"
            className="mt-4 inline-block border border-arsenic px-5 py-2.5 font-mono text-[11px] tracking-[0.22em] text-arsenic-bright hover:bg-arsenic/20 transition-colors duration-300"
          >
            GET NOTIFIED
          </a>
          <p className="mt-3 text-[11px] text-[#7c7a6d] font-light leading-relaxed">
            Checkout opens soon — the release email carries the buy link first.
          </p>
        </>
      )}
    </motion.div>
  );
}
