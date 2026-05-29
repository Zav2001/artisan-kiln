import {
  calculateGrandTotal,
  calculateOrderTotals,
  calculateShipping,
  calculateSubtotal,
  formatCurrency,
} from "@/lib/calculations";

describe("calculateSubtotal", () => {
  it("returns 0 for empty cart", () => {
    expect(calculateSubtotal([])).toBe(0);
  });

  it("sums quantity * unit price for all items", () => {
    expect(
      calculateSubtotal([
        { quantity: 150, unitPrice: 28 },
        { quantity: 75, unitPrice: 30 },
        { quantity: 200, unitPrice: 26 },
        { quantity: 50, unitPrice: 29 },
      ]),
    ).toBe(150 * 28 + 75 * 30 + 200 * 26 + 50 * 29);
  });
});

describe("calculateShipping", () => {
  it("charges $25 when subtotal is $500 or less", () => {
    expect(calculateShipping(0)).toBe(25);
    expect(calculateShipping(500)).toBe(25);
  });

  it("is free when subtotal exceeds $500", () => {
    expect(calculateShipping(500.01)).toBe(0);
    expect(calculateShipping(1200)).toBe(0);
  });
});

describe("calculateGrandTotal", () => {
  it("adds subtotal and shipping", () => {
    expect(calculateGrandTotal(400, 25)).toBe(425);
    expect(calculateGrandTotal(600, 0)).toBe(600);
  });
});

describe("calculateOrderTotals", () => {
  it("returns combined totals for a cart", () => {
    const result = calculateOrderTotals([
      { quantity: 10, unitPrice: 28 },
      { quantity: 5, unitPrice: 30 },
    ]);

    expect(result.subtotal).toBe(430);
    expect(result.shipping).toBe(25);
    expect(result.grandTotal).toBe(455);
  });

  it("applies free shipping above threshold", () => {
    const result = calculateOrderTotals([{ quantity: 20, unitPrice: 28 }]);

    expect(result.subtotal).toBe(560);
    expect(result.shipping).toBe(0);
    expect(result.grandTotal).toBe(560);
  });
});

describe("formatCurrency", () => {
  it("formats values as USD", () => {
    expect(formatCurrency(28)).toBe("$28.00");
    expect(formatCurrency(0)).toBe("$0.00");
  });
});
