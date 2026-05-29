import { SHIPPING_COST, SHIPPING_THRESHOLD } from "@/constants/tiles";
import { CartItem, OrderTotals } from "@/types";

export interface PricedCartItem {
  quantity: number;
  unitPrice: number;
}

export function calculateSubtotal(items: PricedCartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
}

export function calculateShipping(subtotal: number): number {
  return subtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function calculateGrandTotal(subtotal: number, shipping: number): number {
  return subtotal + shipping;
}

export function calculateOrderTotals(items: PricedCartItem[]): OrderTotals {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const grandTotal = calculateGrandTotal(subtotal, shipping);

  return { subtotal, shipping, grandTotal };
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function getCartItemCount(items: CartItem[]): number {
  return items.length;
}
