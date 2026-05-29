"use client";

import DecorativeFrame from "@/components/layout/DecorativeFrame";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TitleSection from "@/components/layout/TitleSection";
import ShoppingCartSection from "@/components/cart/ShoppingCartSection";
import DesignTool from "@/components/design/DesignTool";
import CheckoutSection from "@/components/checkout/CheckoutSection";
import CustomerFields from "@/components/checkout/CustomerFields";

export default function OrderFormPage() {
  return (
    <DecorativeFrame>
      <Header />
      <TitleSection />

      <main className="layout-transition flex flex-col gap-[clamp(0.75rem,2vw,1.25rem)] pb-2 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.88fr)] lg:items-start lg:gap-5">
        <div className="order-1 lg:hidden">
          <CustomerFields />
        </div>

        <div className="order-2 min-w-0">
          <ShoppingCartSection />
        </div>

        <div className="order-4 min-w-0 lg:order-2">
          <DesignTool />
        </div>

        <div className="order-3 min-w-0 lg:order-3">
          <CheckoutSection />
        </div>
      </main>

      <Footer />
    </DecorativeFrame>
  );
}
