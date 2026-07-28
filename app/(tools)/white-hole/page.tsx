import type { Metadata } from "next";
import { toolBySlug } from "@/components/registry";
import { WhiteHoleLanding } from "@/components/pages/white-hole";

const tool = toolBySlug("white-hole")!;

export const metadata: Metadata = {
  title: `${tool.title} — Arsenic`,
  description: tool.pitch,
  openGraph: {
    title: `${tool.title} — Arsenic`,
    description: tool.pitch,
    images: [tool.ogImage ?? "/opengraph-image"],
  },
};

export default function Page() {
  return <WhiteHoleLanding />;
}
