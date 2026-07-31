import type { Metadata } from "next";
import { SUPPORT_EMAIL } from "@/components/registry";

export const metadata: Metadata = {
  title: "Refunds — Arsenic",
  description: "Refund policy for Arsenic audio tools.",
};

const POLICY = [
  { name: "Window", text: "Thirty days from purchase, no questions asked." },
  { name: "How", text: `Email ${SUPPORT_EMAIL} from your purchase address with the order reference. Refunds return to the original payment method; the license is revoked on refund.` },
  { name: "Status", text: "Purchases run through Gumroad; refunds are honored there and by email alike." },
];

export default function RefundsPage() {
  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-24 px-8 md:px-16 lg:px-24">
      <h1 className="display text-4xl md:text-5xl text-paper mb-4 select-none">Refunds</h1>
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-paper-mute mb-14">
        refund policy · july 2026
      </p>
      <div className="max-w-2xl flex flex-col gap-8">
        {POLICY.map((p) => (
          <section key={p.name}>
            <h2 className="text-[10px] font-mono tracking-[0.3em] uppercase text-paper-mute mb-2">
              {p.name}
            </h2>
            <p className="text-[13px] font-light text-paper-dim leading-relaxed">{p.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
