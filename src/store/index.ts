import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import designReducer from "./slices/designSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      design: designReducer,
      checkout: checkoutReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
