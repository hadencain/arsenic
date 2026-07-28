import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-start justify-center px-8 md:px-16 lg:px-24">
      <p className="display text-4xl text-paper mb-4">Not in the catalog.</p>
      <Link
        href="/"
        className="text-[11px] font-mono tracking-[0.22em] text-arsenic-bright hover:text-paper transition-colors duration-300"
      >
        ← EVERYTHING WE MAKE
      </Link>
    </main>
  );
}
