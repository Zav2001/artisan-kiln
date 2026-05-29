"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/slices/cartSlice";
import { CartIcon, ProfileIcon } from "@/components/ui/PaymentIcons";

const desktopNav = [
  "HOME",
  "SHOP",
  "COLLECTIONS",
  "ABOUT US",
  "FAQ",
  "GALLERY",
  "BLOG",
];

const mobileNav = ["SHOP", "COLLECTIONS", "ABOUT US"];

export default function Header() {
  const cartCount = useAppSelector(selectCartCount);

  return (
    <header className="relative z-10 layout-transition">
      {/* Mobile */}
      <div className="mobile-only border-b border-ink/15 pb-2 pt-1">
        <div className="mb-2 flex items-center gap-1.5 px-1">
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        </div>
        <div className="relative flex min-h-[1.75rem] items-center justify-center px-16">
          <nav className="font-condensed flex justify-center gap-4 text-[0.58rem] font-bold tracking-[0.16em]">
            {mobileNav.map((item) => (
              <a key={item} href="#" className="hover:text-navy">
                {item}
              </a>
            ))}
          </nav>
          <div className="absolute right-0 flex items-center gap-1.5 pr-0.5">
            <CartBadge count={cartCount} />
            <button type="button" aria-label="Profile" className="shrink-0">
              <ProfileIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="shrink-0 rounded-sm bg-navy px-2 py-0.5 font-condensed text-[0.55rem] font-bold tracking-wide text-white"
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="desktop-only relative pb-3 pt-4">
        <nav className="font-condensed flex flex-wrap items-center justify-center gap-x-[1.35rem] gap-y-1 text-[0.62rem] font-bold tracking-[0.15em]">
          {desktopNav.map((item) => (
            <a key={item} href="#" className="hover:text-navy">
              {item}
            </a>
          ))}
        </nav>
        <div className="absolute right-0 top-4 flex items-center gap-2.5">
          <CartBadge count={cartCount} />
          <div className="flex items-center gap-1.5 rounded-full border border-ink/20 bg-white/45 px-2.5 py-0.5 text-[0.62rem] font-semibold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tan font-condensed text-[0.55rem] font-bold">
              A
            </span>
            A. Smith
          </div>
        </div>
      </div>
    </header>
  );
}

function CartBadge({ count }: { count: number }) {
  return (
    <div className="relative shrink-0">
      <CartIcon className="h-[1.15rem] w-[1.15rem]" />
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-mustard px-0.5 text-[0.5rem] font-bold leading-none text-ink">
          {count}
        </span>
      )}
    </div>
  );
}
