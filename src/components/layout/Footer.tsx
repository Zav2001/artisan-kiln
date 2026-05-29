export default function Footer() {
  return (
    <footer className="layout-transition relative mt-6 px-1 pb-4 pt-6 md:mt-8 md:pb-6">
      <div className="mobile-only mb-5 flex justify-center gap-8 font-condensed text-[0.58rem] font-bold tracking-[0.14em]">
        <a href="#" className="hover:text-navy">
          Terms
        </a>
        <a href="#" className="hover:text-navy">
          Contact
        </a>
      </div>

      <div className="desktop-only mb-3 flex flex-wrap justify-center gap-x-3 gap-y-1 font-condensed text-[0.58rem] font-bold tracking-[0.12em]">
        {[
          "Terms of Service",
          "Privacy Policy",
          "Shipping Info",
          "Contact Us",
        ].map((link, index, arr) => (
          <span key={link} className="flex items-center gap-3">
            <a href="#" className="hover:text-navy">
              {link}
            </a>
            {index < arr.length - 1 && <span className="text-ink/25">|</span>}
          </span>
        ))}
      </div>

      <p className="desktop-only mb-5 text-center text-[0.52rem] tracking-wide text-ink/60">
        © 2026 The Artisan Kiln. All rights reserved.
      </p>

      <div className="pointer-events-none flex items-end justify-between px-1 opacity-85">
        <BotanicalDecor />
        <PaletteIllustration className="hidden lg:block" />
        <HandTileIllustration />
      </div>
    </footer>
  );
}

function BotanicalDecor() {
  return (
    <svg
      className="h-12 w-24 sm:h-14 sm:w-28"
      viewBox="0 0 128 64"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 50 Q20 20 40 45 T72 35 T104 48"
        stroke="#638C6D"
        strokeWidth="2"
        fill="none"
      />
      <ellipse cx="24" cy="38" rx="8" ry="12" fill="#7A9E7E" opacity="0.55" />
      <ellipse cx="56" cy="32" rx="10" ry="14" fill="#638C6D" opacity="0.45" />
      <ellipse cx="88" cy="42" rx="7" ry="11" fill="#7A9E7E" opacity="0.55" />
      <circle cx="48" cy="22" r="4" fill="#C06C4D" />
      <circle cx="76" cy="18" r="3" fill="#D9A04B" />
    </svg>
  );
}

function HandTileIllustration() {
  return (
    <svg viewBox="0 0 56 56" className="h-12 w-12 sm:h-14 sm:w-14" aria-hidden>
      <rect x="20" y="10" width="18" height="18" fill="#D4956A" stroke="#1A1A1A" strokeWidth="1.2" />
      <circle cx="29" cy="19" r="2.5" fill="#A05838" />
      <path
        d="M12 38c5-7 12-9 19-7 5 1.5 10 0 15-5"
        stroke="#C06C4D"
        strokeWidth="2"
        fill="#E5D3B3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaletteIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`h-12 w-12 ${className}`} aria-hidden>
      <ellipse cx="24" cy="28" rx="16" ry="12" fill="#E5D3B3" stroke="#1A1A1A" strokeWidth="1.2" />
      <circle cx="18" cy="24" r="3" fill="#7EB8DA" stroke="#1A1A1A" strokeWidth="0.6" />
      <circle cx="26" cy="22" r="3" fill="#8FB896" stroke="#1A1A1A" strokeWidth="0.6" />
      <circle cx="30" cy="28" r="3" fill="#D4956A" stroke="#1A1A1A" strokeWidth="0.6" />
      <circle cx="22" cy="30" r="3" fill="#E8C86A" stroke="#1A1A1A" strokeWidth="0.6" />
    </svg>
  );
}
