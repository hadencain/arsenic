import { toolOg, ogSize, ogContentType, ogAlt } from "@/components/og-card";

export const alt = ogAlt("tc-tools");
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return toolOg("tc-tools");
}
