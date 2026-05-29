"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { formatCurrency } from "@/lib/calculations";
import { hasFormErrors, validateCheckoutForm } from "@/lib/validation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectOrderTotals } from "@/store/slices/cartSlice";
import {
  selectCheckout,
  selectFormErrors,
  setFormErrors,
  setPaymentMethod,
  setSubmitted,
  updateCardField,
  updateCustomerField,
} from "@/store/slices/checkoutSlice";
import { PaymentMethod } from "@/types";
import CartTotals from "@/components/cart/CartTotals";
import { UnderlineField } from "@/components/ui/FormFields";
import {
  ApplePayIcon,
  BankTransferIcon,
  CreditCardIcon,
  MastercardIcon,
  PayPalIcon,
  VisaIcon,
} from "@/components/ui/PaymentIcons";

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-ink ${
        selected ? "bg-navy" : "bg-transparent"
      }`}
    />
  );
}

export default function CheckoutSection() {
  const dispatch = useAppDispatch();
  const checkout = useAppSelector(selectCheckout);
  const errors = useAppSelector(selectFormErrors);
  const totals = useAppSelector(selectOrderTotals);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    const validationErrors = validateCheckoutForm(
      checkout.customer,
      checkout.paymentMethod,
      checkout.cardDetails,
    );

    if (hasFormErrors(validationErrors)) {
      dispatch(setFormErrors(validationErrors));
      setOrderMessage(null);
      return;
    }

    dispatch(setFormErrors({}));
    dispatch(setSubmitted(true));
    setOrderMessage(
      `Order placed successfully! Total: ${formatCurrency(totals.grandTotal)}`,
    );
  };

  const selectMethod = (method: PaymentMethod) => {
    dispatch(setPaymentMethod(method));
  };

  return (
    <section className="section-panel layout-transition">
      <div className="desktop-only mb-3 bg-tan px-3 py-1.5 text-center font-condensed text-[0.65rem] font-bold uppercase tracking-[0.2em]">
        Order Summary
      </div>

      {/* Desktop customer fields — single column like mockup */}
      <div className="desktop-only mb-4 space-y-3">
        <UnderlineField
          label="Customer Name"
          value={checkout.customer.name}
          onChange={(value) =>
            dispatch(updateCustomerField({ field: "name", value }))
          }
          error={errors.name}
        />
        <UnderlineField
          label="Phone"
          value={checkout.customer.phone}
          onChange={(value) =>
            dispatch(updateCustomerField({ field: "phone", value }))
          }
          error={errors.phone}
        />
        <UnderlineField
          label="Email"
          value={checkout.customer.email}
          onChange={(value) =>
            dispatch(updateCustomerField({ field: "email", value }))
          }
          error={errors.email}
        />
        <UnderlineField
          label="Shipping Address"
          value={checkout.customer.shippingAddress}
          onChange={(value) =>
            dispatch(updateCustomerField({ field: "shippingAddress", value }))
          }
          error={errors.shippingAddress}
        />
        <UnderlineField
          label="Project Notes"
          value={checkout.customer.projectNotes}
          onChange={(value) =>
            dispatch(updateCustomerField({ field: "projectNotes", value }))
          }
          multiline
        />
      </div>

      <div className="desktop-only mb-4">
        <CartTotals totals={totals} />
      </div>

      {/* Payment section */}
      <div className="mb-3 sketch-border bg-white/15 p-2.5 sm:p-3">
        <p className="label-caps mb-2.5 border-b border-ink/12 pb-1.5">
          Select Payment Method
        </p>

        {/* Mobile: 4 horizontal options */}
        <div className="mobile-only grid grid-cols-4 gap-1.5">
          <MobilePaymentOption
            selected={checkout.paymentMethod === "credit-card"}
            onClick={() => selectMethod("credit-card")}
            label="Credit/Debit Card"
          >
            <CreditCardIcon className="h-7 w-9" />
          </MobilePaymentOption>
          <MobilePaymentOption
            selected={checkout.paymentMethod === "paypal"}
            onClick={() => selectMethod("paypal")}
            label="PayPal"
          >
            <PayPalIcon className="h-4 w-14" />
          </MobilePaymentOption>
          <MobilePaymentOption
            selected={checkout.paymentMethod === "apple-pay"}
            onClick={() => selectMethod("apple-pay")}
            label="Apple Pay"
          >
            <ApplePayIcon className="h-5 w-12" />
          </MobilePaymentOption>
          <MobilePaymentOption
            selected={checkout.paymentMethod === "bank-transfer"}
            onClick={() => selectMethod("bank-transfer")}
            label="Bank Transfer"
          >
            <BankTransferIcon className="h-8 w-8" />
          </MobilePaymentOption>
        </div>

        {/* Desktop: vertical radio list + large alt options */}
        <div className="desktop-only space-y-2">
          <DesktopPaymentRow
            selected={checkout.paymentMethod === "credit-card"}
            onClick={() => selectMethod("credit-card")}
            label="Credit/Debit Card"
          >
            <CreditCardIcon className="h-5 w-7" />
          </DesktopPaymentRow>

          {checkout.paymentMethod === "credit-card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="ml-6 space-y-3 border-l-2 border-ink/10 pl-4"
            >
              <div className="flex items-center gap-3 pt-1">
                <VisaIcon className="h-3.5 w-10" />
                <MastercardIcon className="h-5 w-8" />
              </div>
              <UnderlineField
                label="Card Number"
                placeholder="1234 4556 7723 8990"
                value={checkout.cardDetails.cardNumber}
                onChange={(value) =>
                  dispatch(updateCardField({ field: "cardNumber", value }))
                }
                error={errors.cardNumber}
              />
              <div className="grid grid-cols-2 gap-3">
                <UnderlineField
                  label="Expiration /"
                  value={checkout.cardDetails.expiration}
                  onChange={(value) =>
                    dispatch(updateCardField({ field: "expiration", value }))
                  }
                  error={errors.expiration}
                />
                <UnderlineField
                  label="CVV"
                  value={checkout.cardDetails.cvv}
                  onChange={(value) =>
                    dispatch(updateCardField({ field: "cvv", value }))
                  }
                  error={errors.cvv}
                />
              </div>
            </motion.div>
          )}

          <DesktopPaymentRow
            selected={checkout.paymentMethod === "paypal"}
            onClick={() => selectMethod("paypal")}
            label="PayPal"
          >
            <PayPalIcon className="h-4 w-16" />
          </DesktopPaymentRow>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <LargePaymentOption
              selected={checkout.paymentMethod === "apple-pay"}
              onClick={() => selectMethod("apple-pay")}
              label="Apple Pay"
            >
              <ApplePayIcon className="h-7 w-20" />
            </LargePaymentOption>
            <LargePaymentOption
              selected={checkout.paymentMethod === "bank-transfer"}
              onClick={() => selectMethod("bank-transfer")}
              label="Bank Transfer"
            >
              <BankTransferIcon className="h-12 w-12" />
            </LargePaymentOption>
          </div>
        </div>
      </div>

      {/* Mobile credit card details */}
      {checkout.paymentMethod === "credit-card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mobile-only mb-4 space-y-3 sketch-border bg-white/20 p-3"
        >
          <div className="flex items-center gap-3">
            <VisaIcon className="h-3.5 w-10" />
            <MastercardIcon className="h-5 w-8" />
          </div>
          <UnderlineField
            label="Card Number"
            placeholder="1234 4556 7723 8990"
            value={checkout.cardDetails.cardNumber}
            onChange={(value) =>
              dispatch(updateCardField({ field: "cardNumber", value }))
            }
            error={errors.cardNumber}
          />
          <div className="grid grid-cols-2 gap-3">
            <UnderlineField
              label="Expiration /"
              value={checkout.cardDetails.expiration}
              onChange={(value) =>
                dispatch(updateCardField({ field: "expiration", value }))
              }
              error={errors.expiration}
            />
            <UnderlineField
              label="CVV"
              value={checkout.cardDetails.cvv}
              onChange={(value) =>
                dispatch(updateCardField({ field: "cvv", value }))
              }
              error={errors.cvv}
            />
          </div>
        </motion.div>
      )}

      {checkout.paymentMethod === "paypal" && (
        <div className="desktop-only mb-4 flex items-center justify-center border border-ink/20 bg-white/30 p-5">
          <PayPalIcon className="h-6 w-24" />
        </div>
      )}

      {checkout.paymentMethod === "apple-pay" && (
        <div className="mobile-only mb-4 flex items-center justify-center border border-ink/20 bg-black p-5">
          <ApplePayIcon className="h-7 w-24 invert" />
        </div>
      )}

      {checkout.paymentMethod === "bank-transfer" && (
        <div className="mobile-only mb-4 flex flex-col items-center border border-ink/20 bg-white/30 p-4">
          <BankTransferIcon className="h-14 w-14" />
          <p className="mt-2 text-center text-[0.65rem]">
            Bank details will be sent to your email after order confirmation.
          </p>
        </div>
      )}

      <div className="mobile-only mb-4">
        <UnderlineField
          label="Project Name / Notes"
          value={checkout.customer.projectNotes}
          onChange={(value) =>
            dispatch(updateCustomerField({ field: "projectNotes", value }))
          }
          multiline
        />
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full bg-navy py-3 font-condensed text-[0.62rem] font-bold uppercase tracking-[0.24em] text-white transition hover:bg-navy-dark sm:py-3.5 sm:text-[0.68rem]"
      >
        Place Secure Order
      </motion.button>

      {orderMessage && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-[0.7rem] font-semibold text-sage"
        >
          {orderMessage}
        </motion.p>
      )}
    </section>
  );
}

function MobilePaymentOption({
  selected,
  onClick,
  label,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 border border-ink/30 p-1.5 text-[0.45rem] font-bold uppercase leading-tight tracking-wide transition ${
        selected ? "bg-tan shadow-sketch" : "bg-white/40 hover:bg-white/60"
      }`}
    >
      <RadioDot selected={selected} />
      <div className="flex h-8 items-center justify-center">{children}</div>
      <span className="text-center">{label}</span>
    </motion.button>
  );
}

function DesktopPaymentRow({
  selected,
  onClick,
  label,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 border border-ink/20 px-3 py-2 text-left transition ${
        selected ? "bg-tan/60" : "bg-white/30 hover:bg-white/50"
      }`}
    >
      <RadioDot selected={selected} />
      <span className="text-[0.65rem] font-bold uppercase tracking-wide">
        {label}
      </span>
      <span className="ml-auto">{children}</span>
    </button>
  );
}

function LargePaymentOption({
  selected,
  onClick,
  label,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 border border-ink/25 px-2 py-4 transition ${
        selected ? "bg-tan/70 ring-1 ring-navy/30" : "bg-white/30 hover:bg-white/50"
      }`}
    >
      {children}
      <span className="text-[0.6rem] font-bold uppercase tracking-wide">
        {label}
      </span>
    </button>
  );
}
