export default function TitleSection() {
  return (
    <section className="relative px-2 py-5 text-center sm:px-4 md:py-7 lg:py-8">
      <div className="pointer-events-none absolute left-2 top-1 opacity-80 sm:left-4 md:top-2">
        <DecorativeCorner />
      </div>
      <div className="pointer-events-none absolute right-2 top-1 rotate-90 opacity-80 sm:right-4 md:top-2">
        <DecorativeCorner />
      </div>

      <div className="mb-2 flex items-center justify-center gap-2 lg:mb-3">
        <BuildingIcon className="hidden h-8 w-8 lg:block" />
        <div className="flex items-center gap-1.5 lg:hidden">
          {["ocean-wave-sm", "forest-fern-sm", "terracotta-dot-sm", "yellow-star-sm"].map(
            (cls) => (
              <span key={cls} className={`tile-swatch tile-${cls} h-4 w-4`} />
            ),
          )}
        </div>
      </div>

      <h1 className="font-display text-[clamp(1.35rem,4.5vw,2.75rem)] font-black uppercase leading-[1.05] tracking-[0.04em] text-ink">
        Ceramic Tile Order Form
      </h1>

      <div className="mt-2 flex items-center justify-center gap-2 md:mt-3 md:gap-3">
        <BuildingIcon className="h-6 w-6 lg:hidden" />
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="tile-swatch tile-ocean-wave-sm hidden h-3.5 w-3.5 sm:inline-block" />
          <span className="tile-swatch tile-forest-fern-sm hidden h-3.5 w-3.5 sm:inline-block" />
          <p className="font-condensed text-[0.62rem] font-bold uppercase tracking-[0.28em] md:text-[0.7rem]">
            The Artisan Kiln
          </p>
          <span className="tile-swatch tile-terracotta-dot-sm hidden h-3.5 w-3.5 sm:inline-block" />
          <span className="tile-swatch tile-yellow-star-sm hidden h-3.5 w-3.5 sm:inline-block" />
        </div>
        <KilnIcon className="h-6 w-6" />
      </div>

      <div className="mt-3 hidden justify-center gap-1 lg:flex">
        {[
          "ocean-wave-sm",
          "forest-fern-sm",
          "terracotta-dot-sm",
          "yellow-star-sm",
          "ocean-wave-sm",
          "forest-fern-sm",
        ].map((cls, i) => (
          <span key={`${cls}-${i}`} className={`tile-swatch tile-${cls} h-3 w-3`} />
        ))}
      </div>
    </section>
  );
}

function DecorativeCorner() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="4" y="4" width="14" height="14" stroke="#1A1A1A" strokeWidth="1.5" fill="#7EB8DA" />
      <rect x="22" y="4" width="14" height="14" stroke="#1A1A1A" strokeWidth="1.5" fill="#8FB896" />
      <rect x="4" y="22" width="14" height="14" stroke="#1A1A1A" strokeWidth="1.5" fill="#D4956A" />
      <rect x="22" y="22" width="14" height="14" stroke="#1A1A1A" strokeWidth="1.5" fill="#E8C86A" />
    </svg>
  );
}

function BuildingIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path d="M4 28V12l12-8 12 8v16H4z" stroke="#1A1A1A" strokeWidth="1.2" fill="#E5D3B3" />
      <rect x="13" y="18" width="6" height="10" fill="#3B4D71" stroke="#1A1A1A" strokeWidth="0.8" />
      <rect x="8" y="16" width="3" height="3" fill="#638C6D" stroke="#1A1A1A" strokeWidth="0.6" />
      <rect x="21" y="16" width="3" height="3" fill="#638C6D" stroke="#1A1A1A" strokeWidth="0.6" />
    </svg>
  );
}

function KilnIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <rect x="6" y="14" width="20" height="14" rx="1" fill="#C06C4D" stroke="#1A1A1A" strokeWidth="1.2" />
      <path d="M10 14V10c0-2 2.5-4 6-4s6 2 6 4v4" stroke="#1A1A1A" strokeWidth="1.2" fill="#B36A5E" />
      <ellipse cx="16" cy="8" rx="3" ry="4" fill="#D9A04B" opacity="0.8" />
      <rect x="12" y="20" width="8" height="5" fill="#3B4D71" stroke="#1A1A1A" strokeWidth="0.8" />
    </svg>
  );
}
