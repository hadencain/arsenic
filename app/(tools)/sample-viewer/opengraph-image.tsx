import { toolOg, ogSize, ogContentType, ogAlt } from "@/components/og-card";

export const alt = ogAlt("sample-viewer");
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return toolOg("sample-viewer");
}
