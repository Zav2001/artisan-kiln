export type TilePatternId =
  | "ocean-wave"
  | "forest-fern"
  | "terracotta-dot"
  | "yellow-star"
  | "geometric-blue"
  | "floral-pink"
  | "bird-sage"
  | "wave-navy"
  | "dot-cream"
  | "star-mustard";

export interface TileProduct {
  id: TilePatternId;
  name: string;
  unitPrice: number;
  patternClass: string;
  collectionIconClass: string;
}

export interface CartItem {
  id: string;
  tileId: TilePatternId;
  quantity: number;
}

export type PaymentMethod =
  | "credit-card"
  | "paypal"
  | "apple-pay"
  | "bank-transfer";

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  shippingAddress: string;
  projectNotes: string;
}

export interface CardDetails {
  cardNumber: string;
  expiration: string;
  cvv: string;
}

export interface CheckoutFormState {
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  cardDetails: CardDetails;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  shippingAddress?: string;
  cardNumber?: string;
  expiration?: string;
  cvv?: string;
}

export type GridCell = TilePatternId | null;

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  grandTotal: number;
}
