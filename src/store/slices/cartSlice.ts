import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTileById } from "@/constants/tiles";
import { calculateOrderTotals } from "@/lib/calculations";
import { CartItem, OrderTotals, TilePatternId } from "@/types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

function createCartItemId(tileId: TilePatternId): string {
  return `${tileId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTileToCart: (state, action: PayloadAction<TilePatternId>) => {
      const existing = state.items.find((item) => item.tileId === action.payload);
      if (existing) {
        existing.quantity += 1;
        return;
      }
      state.items.push({
        id: createCartItemId(action.payload),
        tileId: action.payload,
        quantity: 1,
      });
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((entry) => entry.id === action.payload.id);
      if (!item) return;
      item.quantity = Math.max(0, action.payload.quantity);
      state.items = state.items.filter((entry) => entry.quantity > 0);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.quantity += 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addTileToCart,
  removeCartItem,
  updateQuantity,
  incrementQuantity,
  clearCart,
} = cartSlice.actions;

type CartRootState = { cart: CartState };

export const selectCartItems = (state: CartRootState) => state.cart.items;

export const selectCartCount = (state: CartRootState) => state.cart.items.length;

export const selectPricedCartItems = (state: CartRootState) =>
  state.cart.items.map((item) => {
    const tile = getTileById(item.tileId);
    return {
      ...item,
      unitPrice: tile?.unitPrice ?? 0,
      name: tile?.name ?? "Unknown",
      patternClass: tile?.patternClass ?? "",
      collectionIconClass: tile?.collectionIconClass ?? "",
    };
  });

export const selectOrderTotals = (state: CartRootState): OrderTotals => {
  const pricedItems = selectPricedCartItems(state).map((item) => ({
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  }));
  return calculateOrderTotals(pricedItems);
};

export default cartSlice.reducer;
