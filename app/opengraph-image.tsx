import { ImageResponse } from "next/og";

// Default share card — ported from the portfolio's opengraph-image.tsx.
// Satori can't load next/font (the site's woff2 faces), so type falls back
// to system serif/mono stacks set directly in the JSX style.
// Satori rule: every div carries explicit display:flex.

export const alt = "Arsenic — an audio instrument label";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0f120e",
          padding: 96,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: "#dfdbcc",
            letterSpacing: "0.01em",
            lineHeight: 1,
          }}
        >
          Arsenic
        </div>

        <div
          style={{
            display: "flex",
            width: 120,
            height: 4,
            marginTop: 32,
            background: "#55c06a",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 26,
            fontFamily: '"Courier New", monospace',
            letterSpacing: "0.02em",
            color: "#868376",
          }}
        >
          An audio instrument label. Spectral processors, terminal
          instruments, and sample tools.
        </div>
      </div>
    ),
    { ...size }
  );
}
