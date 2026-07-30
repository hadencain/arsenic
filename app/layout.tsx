import type { Metadata } from "next";
import { Geist, Geist_Mono, IM_Fell_English } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = IM_Fell_English({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://arsenic-pi.vercel.app"
  ),
  title: "Arsenic",
  description:
    "An audio instrument label. Spectral processors, terminal instruments, and sample tools.",
  openGraph: {
    title: "Arsenic",
    description:
      "An audio instrument label. Spectral processors, terminal instruments, and sample tools.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Arsenic" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}
    >
      <body className="antialiased">
        {children}
        <Footer />
        <div className="grain" aria-hidden />
        <Analytics />
      </body>
    </html>
  );
}
