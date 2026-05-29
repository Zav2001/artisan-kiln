"use client";

import { OrderTotals } from "@/types";
import BracketField from "@/components/ui/FormFields";

interface CartTotalsProps {
  totals: OrderTotals;
  className?: string;
  compact?: boolean;
}

export default function CartTotals({
  totals,
  className = "",
}: CartTotalsProps) {
  const rows = [
    { label: "Subtotal", value: totals.subtotal, highlight: false },
    { label: "Shipping", value: totals.shipping, highlight: false },
    { label: "Grand Total", value: totals.grandTotal, highlight: true },
  ];

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {rows.map(({ label, value, highlight }) => (
        <div
          key={label}
          className={`flex items-center justify-end gap-2 sm:gap-3 ${
            highlight ? "mt-0.5" : ""
          }`}
        >
          <span className="label-caps">{label}</span>
          <BracketField
            value={value}
            readonly
            prefix="$"
            highlight={highlight}
          />
        </div>
      ))}
    </div>
  );
}
