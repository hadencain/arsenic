import type { Metadata } from "next";
import { toolBySlug } from "@/components/registry";
import { SpectralShufflerLanding } from "@/components/pages/spectral-shuffler";

const tool = toolBySlug("spectral-shuffler")!;

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
  return <SpectralShufflerLanding />;
}
