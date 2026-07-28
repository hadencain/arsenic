import type { Metadata } from "next";
import { toolBySlug } from "@/components/registry";
import { TcToolsLanding } from "@/components/pages/tc-tools";

const tool = toolBySlug("tc-tools")!;

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
  return <TcToolsLanding />;
}
