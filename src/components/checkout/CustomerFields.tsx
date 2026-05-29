"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCheckout, selectFormErrors, updateCustomerField } from "@/store/slices/checkoutSlice";
import { UnderlineField } from "@/components/ui/FormFields";

export default function CustomerFields() {
  const dispatch = useAppDispatch();
  const checkout = useAppSelector(selectCheckout);
  const errors = useAppSelector(selectFormErrors);

  return (
    <section className="layout-transition space-y-3 px-0.5 py-1">
      <UnderlineField
        label="Customer Name"
        value={checkout.customer.name}
        onChange={(value) =>
          dispatch(updateCustomerField({ field: "name", value }))
        }
        error={errors.name}
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
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
      </div>
      <UnderlineField
        label="Shipping Address"
        value={checkout.customer.shippingAddress}
        onChange={(value) =>
          dispatch(updateCustomerField({ field: "shippingAddress", value }))
        }
        error={errors.shippingAddress}
      />
    </section>
  );
}
