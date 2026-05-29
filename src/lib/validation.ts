import { CardDetails, CustomerInfo, FormErrors, PaymentMethod } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-+().]{7,}$/;
const CARD_NUMBER_REGEX = /^\d{13,19}$/;
const EXPIRATION_REGEX = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const CVV_REGEX = /^\d{3,4}$/;

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Email is required";
  if (!EMAIL_REGEX.test(email.trim())) return "Enter a valid email address";
  return undefined;
}

export function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required`;
  return undefined;
}

export function validatePhone(phone: string): string | undefined {
  if (!phone.trim()) return "Phone is required";
  if (!PHONE_REGEX.test(phone.trim())) return "Enter a valid phone number";
  return undefined;
}

export function validateCardNumber(cardNumber: string): string | undefined {
  const digits = cardNumber.replace(/\s/g, "");
  if (!digits) return "Card number is required";
  if (!CARD_NUMBER_REGEX.test(digits)) return "Enter a valid card number";
  return undefined;
}

export function validateExpiration(expiration: string): string | undefined {
  if (!expiration.trim()) return "Expiration is required";
  if (!EXPIRATION_REGEX.test(expiration.trim())) return "Use MM/YY format";
  return undefined;
}

export function validateCvv(cvv: string): string | undefined {
  if (!cvv.trim()) return "CVV is required";
  if (!CVV_REGEX.test(cvv.trim())) return "Enter a valid CVV";
  return undefined;
}

export function validateCheckoutForm(
  customer: CustomerInfo,
  paymentMethod: PaymentMethod,
  cardDetails: CardDetails,
): FormErrors {
  const errors: FormErrors = {};

  errors.name = validateRequired(customer.name, "Name");
  errors.phone = validatePhone(customer.phone);
  errors.email = validateEmail(customer.email);
  errors.shippingAddress = validateRequired(
    customer.shippingAddress,
    "Shipping address",
  );

  if (paymentMethod === "credit-card") {
    errors.cardNumber = validateCardNumber(cardDetails.cardNumber);
    errors.expiration = validateExpiration(cardDetails.expiration);
    errors.cvv = validateCvv(cardDetails.cvv);
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, value]) => value !== undefined),
  ) as FormErrors;
}

export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
