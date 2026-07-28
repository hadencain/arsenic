// The one cross-brand edge. Site-wide footer of exactly one line.
export function Colophon() {
  return (
    <footer className="px-8 md:px-16 lg:px-24 pb-10">
      <a
        href="https://www.hadencain.com"
        className="text-[10px] font-mono tracking-[0.22em] text-paper-mute hover:text-paper-dim transition-colors duration-300"
      >
        AN INSTRUMENT LABEL BY HADEN CAIN
      </a>
    </footer>
  );
}
