interface IconProps {
  className?: string;
}

export function PayPalIcon({ className = "h-5 w-auto" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icons/paypal.svg" alt="PayPal" className={className} />
  );
}

export function ApplePayIcon({ className = "h-6 w-auto" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icons/applepay.svg" alt="Apple Pay" className={className} />
  );
}

export function VisaIcon({ className = "h-4 w-auto" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icons/visa.svg" alt="Visa" className={`${className} opacity-90`} />
  );
}

export function MastercardIcon({ className = "h-5 w-auto" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icons/mastercard.svg" alt="Mastercard" className={className} />
  );
}

export function CreditCardIcon({ className = "h-6 w-8" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="22"
        rx="2"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        fill="#E5D3B3"
      />
      <rect x="1" y="6" width="30" height="5" fill="#3B4D71" />
      <rect x="4" y="14" width="10" height="2" rx="0.5" fill="#1A1A1A" opacity="0.4" />
      <rect x="4" y="18" width="6" height="2" rx="0.5" fill="#1A1A1A" opacity="0.4" />
    </svg>
  );
}

export function BankTransferIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M24 4L4 14v2h40v-2L24 4z"
        fill="#3B4D71"
        stroke="#1A1A1A"
        strokeWidth="1.2"
      />
      <rect x="8" y="18" width="4" height="14" fill="#638C6D" stroke="#1A1A1A" strokeWidth="1" />
      <rect x="16" y="18" width="4" height="14" fill="#638C6D" stroke="#1A1A1A" strokeWidth="1" />
      <rect x="28" y="18" width="4" height="14" fill="#638C6D" stroke="#1A1A1A" strokeWidth="1" />
      <rect x="36" y="18" width="4" height="14" fill="#638C6D" stroke="#1A1A1A" strokeWidth="1" />
      <rect x="4" y="32" width="40" height="3" fill="#C06C4D" stroke="#1A1A1A" strokeWidth="1" />
      <rect x="2" y="35" width="44" height="4" rx="1" fill="#E5D3B3" stroke="#1A1A1A" strokeWidth="1.2" />
    </svg>
  );
}

export function CartIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12L6 6z"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        fill="#D9A04B"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19" r="1.5" fill="#1A1A1A" />
      <circle cx="17" cy="19" r="1.5" fill="#1A1A1A" />
      <path d="M6 6L4 2H2" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ProfileIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="#1A1A1A" strokeWidth="1.5" fill="#E5D3B3" />
      <circle cx="12" cy="9" r="3" fill="#3B4D71" />
      <path
        d="M6 19c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="#3B4D71"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function TrashIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M3 4h10M6 4V2.5h4V4M5 4v8.5h6V4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 6.5v5M9 6.5v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
