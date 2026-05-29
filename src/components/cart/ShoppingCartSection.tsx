"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TILE_CATALOG } from "@/constants/tiles";
import { formatCurrency } from "@/lib/calculations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addTileToCart,
  incrementQuantity,
  removeCartItem,
  selectOrderTotals,
  selectPricedCartItems,
  updateQuantity,
} from "@/store/slices/cartSlice";
import BracketField from "@/components/ui/FormFields";
import TileSwatch from "@/components/ui/TileSwatch";
import { TrashIcon } from "@/components/ui/PaymentIcons";
import CartTotals from "./CartTotals";

export default function ShoppingCartSection() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectPricedCartItems);
  const totals = useAppSelector(selectOrderTotals);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <section className="section-panel layout-transition">
      <h2 className="label-caps mb-2.5 text-[0.62rem] md:mb-3 md:text-[0.68rem]">
        Shopping Cart & Design Tool
      </h2>

      <div className="overflow-x-auto -mx-0.5 px-0.5">
        <table className="cart-table min-w-[520px]">
          <thead>
            <tr>
              {[
                "Tile Collection",
                "Item",
                "Quantity (sq. ft.)",
                "Unit Price ($)",
                "Actions",
              ].map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {items.length === 0 ? (
                <motion.tr
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={5} className="py-7 text-center text-[0.68rem] italic text-ink/55">
                    Your cart is empty. Add tiles to begin your order.
                  </td>
                </motion.tr>
              ) : (
                items.map((item) => (
                  <motion.tr
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                  >
                    <td className="min-w-[5.5rem]">
                      <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-1.5">
                        <TileSwatch
                          patternClass={item.collectionIconClass}
                          size="sm"
                        />
                        <span className="label-caps max-w-[4.5rem] text-center text-[0.48rem] leading-tight sm:text-left sm:text-[0.52rem]">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <TileSwatch patternClass={item.patternClass} size="md" />
                    </td>
                    <td>
                      <BracketField
                        value={item.quantity}
                        onChange={(value) =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Number(value) || 0,
                            }),
                          )
                        }
                      />
                    </td>
                    <td>
                      <BracketField
                        value={item.unitPrice}
                        readonly
                        prefix="$"
                      />
                    </td>
                    <td>
                      <div className="flex flex-col items-center gap-0.5">
                        <ActionButton
                          label="Add"
                          variant="add"
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        />
                        <ActionButton
                          label="Remove"
                          variant="remove"
                          onClick={() => dispatch(removeCartItem(item.id))}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:mt-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPicker((prev) => !prev)}
            className="flex w-full items-center justify-center gap-1.5 border-[1.5px] border-ink bg-white/25 px-3 py-1.5 font-condensed text-[0.58rem] font-bold uppercase tracking-[0.12em] transition hover:bg-white/45 sm:w-auto sm:px-4 sm:py-2 sm:text-[0.62rem]"
          >
            <span className="text-base leading-none">+</span>
            Add New Tile to Cart
          </button>
          <HandTileIllustration className="absolute -left-1 -top-7 hidden sm:block" />

          <AnimatePresence>
            {showPicker && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute left-0 top-full z-20 mt-1.5 w-full min-w-[260px] sketch-border bg-parchment p-2.5 shadow-sketch sm:w-72"
              >
                <p className="label-caps mb-2">Select a tile</p>
                <div className="grid max-h-44 grid-cols-2 gap-1.5 overflow-y-auto scrollbar-artisan">
                  {TILE_CATALOG.map((tile) => (
                    <button
                      key={tile.id}
                      type="button"
                      onClick={() => {
                        dispatch(addTileToCart(tile.id));
                        setShowPicker(false);
                      }}
                      className="flex items-center gap-1.5 border border-ink/20 bg-white/40 p-1.5 text-left transition hover:border-navy hover:bg-white/70"
                    >
                      <TileSwatch
                        patternClass={tile.collectionIconClass}
                        size="sm"
                      />
                      <span className="label-caps text-[0.48rem]">{tile.name}</span>
                      <span className="ml-auto text-[0.5rem]">
                        {formatCurrency(tile.unitPrice)}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CartTotals totals={totals} className="mobile-only" />
        <CartTotals totals={totals} className="desktop-only lg:ml-auto" />
      </div>
    </section>
  );
}

function ActionButton({
  label,
  variant,
  onClick,
}: {
  label: string;
  variant: "add" | "remove";
  onClick: () => void;
}) {
  const isAdd = variant === "add";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`flex w-[2.15rem] flex-col items-center justify-center border border-ink/35 py-0.5 font-condensed text-[0.42rem] font-bold uppercase leading-tight text-white ${
        isAdd ? "bg-sage-light" : "bg-terracotta-dark"
      }`}
      aria-label={label}
    >
      <span className="mb-0.5 text-xs leading-none">{isAdd ? "+" : <TrashIcon />}</span>
      {label}
    </motion.button>
  );
}

function HandTileIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`h-10 w-10 ${className}`} aria-hidden>
      <rect x="18" y="8" width="16" height="16" fill="#D4956A" stroke="#1A1A1A" strokeWidth="1" />
      <circle cx="26" cy="16" r="2" fill="#A05838" />
      <path
        d="M10 32c4-6 10-8 16-6 4 1.5 8 0 12-4"
        stroke="#C06C4D"
        strokeWidth="2"
        fill="#E5D3B3"
        strokeLinecap="round"
      />
    </svg>
  );
}
