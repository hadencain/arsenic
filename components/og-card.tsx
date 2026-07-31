import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { toolBySlug } from "./registry";

// Per-tool share card factory. Each app/(tools)/<slug>/opengraph-image.tsx is
// a thin wrapper around this so every card stays one design. Satori can't use
// next/font, so the display face is embedded from a local TTF; mono falls
// back to a system stack. Satori rule: every div carries explicit display:flex.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function ogAlt(slug: string): string {
  const tool = toolBySlug(slug)!;
  return `${tool.title} — Arsenic`;
}

const displayFont = readFile(
  path.join(process.cwd(), "assets/fonts/im-fell-english.ttf")
);

export async function toolOg(slug: string) {
  const tool = toolBySlug(slug)!;
  const shipping = tool.state === "shipping" && tool.price;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f120e",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontFamily: '"Courier New", monospace',
            letterSpacing: "0.3em",
            color: "#868376",
          }}
        >
          ARSENIC
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontFamily: '"IM Fell English", Georgia, serif',
              color: "#dfdbcc",
              letterSpacing: "0.01em",
              lineHeight: 1,
            }}
          >
            {tool.title}.
          </div>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 4,
              marginTop: 30,
              background: "#55c06a",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 24,
              fontFamily: '"Courier New", monospace',
              letterSpacing: "0.02em",
              lineHeight: 1.45,
              color: "#868376",
              maxWidth: 980,
            }}
          >
            {tool.pitch}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontFamily: '"Courier New", monospace',
            letterSpacing: "0.22em",
            color: shipping ? "#55c06a" : "#868376",
          }}
        >
          {shipping ? `${tool.price} — WINDOWS VST3` : "AN AUDIO INSTRUMENT"}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "IM Fell English",
          data: await displayFont,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
