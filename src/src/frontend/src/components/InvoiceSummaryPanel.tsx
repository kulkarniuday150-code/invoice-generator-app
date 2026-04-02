import React, { useMemo } from "react";

interface FormLineItem {
  itemName: string;
  quantity: number;
  rate: number;
  discount: number;
  taxType: string;
  taxRate: number;
}

interface InvoiceSummaryPanelProps {
  lineItems: FormLineItem[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function InvoiceSummaryPanel({
  lineItems,
}: InvoiceSummaryPanelProps) {
  const totals = useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    let cgstTotal = 0;
    let sgstTotal = 0;
    let igstTotal = 0;

    for (const item of lineItems) {
      const lineTotal = item.quantity * item.rate;
      const discountAmt = (lineTotal * item.discount) / 100;
      const taxableAmt = lineTotal - discountAmt;
      const taxAmt = (taxableAmt * item.taxRate) / 100;

      subtotal += lineTotal;
      totalDiscount += discountAmt;

      if (item.taxType === "CGST/SGST") {
        cgstTotal += taxAmt / 2;
        sgstTotal += taxAmt / 2;
      } else if (item.taxType === "IGST") {
        igstTotal += taxAmt;
      }
    }

    const grandTotal =
      subtotal - totalDiscount + cgstTotal + sgstTotal + igstTotal;

    return {
      subtotal,
      totalDiscount,
      cgstTotal,
      sgstTotal,
      igstTotal,
      grandTotal,
    };
  }, [lineItems]);

  const rows = [
    { label: "Subtotal", value: totals.subtotal },
    ...(totals.totalDiscount > 0
      ? [{ label: "Total Discount", value: -totals.totalDiscount }]
      : []),
    ...(totals.cgstTotal > 0
      ? [{ label: "CGST", value: totals.cgstTotal }]
      : []),
    ...(totals.sgstTotal > 0
      ? [{ label: "SGST", value: totals.sgstTotal }]
      : []),
    ...(totals.igstTotal > 0
      ? [{ label: "IGST", value: totals.igstTotal }]
      : []),
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-sm text-foreground mb-3">
        Invoice Summary
      </h3>
      {rows.map(({ label, value }) => (
        <div key={label} className="flex justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className={value < 0 ? "text-destructive" : "text-foreground"}>
            {value < 0
              ? `-${formatCurrency(Math.abs(value))}`
              : formatCurrency(value)}
          </span>
        </div>
      ))}
      <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
        <span className="text-foreground">Grand Total</span>
        <span className="text-primary text-lg">
          {formatCurrency(totals.grandTotal)}
        </span>
      </div>
    </div>
  );
}
