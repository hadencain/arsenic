import type { Metadata } from "next";
import { toolBySlug } from "@/components/registry";
import { SmearLanding } from "@/components/pages/smear";

const tool = toolBySlug("smear")!;

export const metadata: Metadata = {
  title: `${tool.title} — Arsenic`,
  description: tool.pitch,
  openGraph: {
    title: `${tool.title} — Arsenic`,
    description: tool.pitch,
  },
};

export default function Page() {
  return <SmearLanding />;
}
