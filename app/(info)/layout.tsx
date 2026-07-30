import Link from "next/link";

// Paperwork pages get the same quiet way back to the shelf as tool pages.
// They live outside (tools) because the registry check treats every (tools)
// directory as a product.
export default function InfoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-6">
        <Link
          href="/"
          className="text-[11px] font-mono tracking-[0.3em] text-paper-mute hover:text-arsenic-bright transition-colors duration-300"
        >
          ARSENIC
        </Link>
      </nav>
      {children}
    </>
  );
}
