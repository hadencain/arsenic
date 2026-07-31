import type { Metadata } from "next";
import { toolBySlug } from "@/components/registry";
import { SampleViewerLanding } from "@/components/pages/sample-viewer";

const tool = toolBySlug("sample-viewer")!;

export const metadata: Metadata = {
  title: `${tool.title} — Arsenic`,
  description: tool.pitch,
  openGraph: {
    title: `${tool.title} — Arsenic`,
    description: tool.pitch,
  },
};

export default function Page() {
  return <SampleViewerLanding />;
}
