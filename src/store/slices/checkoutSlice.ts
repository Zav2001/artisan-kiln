import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CardDetails,
  CheckoutFormState,
  CustomerInfo,
  FormErrors,
  PaymentMethod,
} from "@/types";

interface CheckoutState extends CheckoutFormState {
  errors: FormErrors;
  isSubmitted: boolean;
}

const initialCustomer: CustomerInfo = {
  name: "",
  phone: "",
  email: "",
  shippingAddress: "",
  projectNotes: "",
};

const initialCardDetails: CardDetails = {
  cardNumber: "",
  expiration: "",
  cvv: "",
};

const initialState: CheckoutState = {
  customer: initialCustomer,
  paymentMethod: "credit-card",
  cardDetails: initialCardDetails,
  errors: {},
  isSubmitted: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateCustomerField: (
      state,
      action: PayloadAction<{ field: keyof CustomerInfo; value: string }>,
    ) => {
      state.customer[action.payload.field] = action.payload.value;
      delete state.errors[action.payload.field as keyof FormErrors];
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
      if (action.payload !== "credit-card") {
        state.errors = Object.fromEntries(
          Object.entries(state.errors).filter(
            ([key]) => !["cardNumber", "expiration", "cvv"].includes(key),
          ),
        ) as FormErrors;
      }
    },
    updateCardField: (
      state,
      action: PayloadAction<{ field: keyof CardDetails; value: string }>,
    ) => {
      state.cardDetails[action.payload.field] = action.payload.value;
      delete state.errors[action.payload.field];
    },
    setFormErrors: (state, action: PayloadAction<FormErrors>) => {
      state.errors = action.payload;
    },
    setSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  updateCustomerField,
  setPaymentMethod,
  updateCardField,
  setFormErrors,
  setSubmitted,
  resetCheckout,
} = checkoutSlice.actions;

type CheckoutRootState = { checkout: CheckoutState };

export const selectCheckout = (state: CheckoutRootState) => state.checkout;
export const selectFormErrors = (state: CheckoutRootState) => state.checkout.errors;

export default checkoutSlice.reducer;
