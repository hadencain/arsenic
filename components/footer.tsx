import { SUPPORT_EMAIL } from "./registry";

// Site-wide footer: the product-site plumbing row plus the single
// colophon-level backlink — the only cross-brand edge on the site.
const LINKS = [
  { href: "/eula", label: "EULA" },
  { href: "/refunds", label: "REFUNDS" },
  { href: `mailto:${SUPPORT_EMAIL}?subject=arsenic%20support`, label: "SUPPORT" },
  { href: "/changelog", label: "CHANGELOG" },
];

export function Footer() {
  return (
    <footer className="px-8 md:px-16 lg:px-24 pt-8 pb-10 border-t border-ink-3">
      <nav className="flex flex-wrap gap-x-8 gap-y-2 mb-6">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="font-mono text-[10px] tracking-[0.3em] text-paper-mute hover:text-arsenic-bright transition-colors duration-300"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="https://hadencain.com"
        className="text-[11px] font-light text-paper-mute hover:text-paper transition-colors duration-300"
      >
        an instrument label by Haden Cain
      </a>
    </footer>
  );
}
