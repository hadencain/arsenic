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
    ...(tool.ogImage ? { images: [tool.ogImage] } : {}),
  },
};

export default function Page() {
  return <WhiteHoleLanding />;
}
