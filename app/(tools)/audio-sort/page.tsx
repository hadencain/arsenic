import type { Metadata } from "next";
import { toolBySlug } from "@/components/registry";
import { AudioSortLanding } from "@/components/pages/audio-sort";

const tool = toolBySlug("audio-sort")!;

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
  return <AudioSortLanding />;
}
