import { toolOg, ogSize, ogContentType, ogAlt } from "@/components/og-card";

export const alt = ogAlt("gravity-well");
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return toolOg("gravity-well");
}
