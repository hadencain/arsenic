import type { Metadata } from "next";
import { toolBySlug } from "@/components/registry";
import { FractureLanding } from "@/components/pages/fracture";

const tool = toolBySlug("fracture")!;

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
  return <FractureLanding />;
}
