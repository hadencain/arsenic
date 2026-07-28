import type { Metadata } from "next";
import { toolBySlug } from "@/components/registry";
import { GravityWellLanding } from "@/components/pages/gravity-well";

const tool = toolBySlug("gravity-well")!;

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
  return <GravityWellLanding />;
}
