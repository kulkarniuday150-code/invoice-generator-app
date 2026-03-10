import type { LineItem } from "../backend";

export interface InvoiceTotals {
  subtotal: number;
  totalDiscount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTax: number;
  grandTotal: number;
}

export interface LineItemForm {
  itemName: string;
  quantity: number;
  rate: number;
  discount: number; // percentage
  taxType: string; // 'none', 'CGST+SGST', 'IGST'
  taxRate: number; // percentage
}

export function calculateLineTotal(item: LineItemForm): number {
  const gross = item.quantity * item.rate;
  const discountAmt = (gross * item.discount) / 100;
  return gross - discountAmt;
}

export function calculateLineTax(item: LineItemForm): {
  cgst: number;
  sgst: number;
  igst: number;
} {
  const lineTotal = calculateLineTotal(item);
  if (item.taxType === "CGST+SGST") {
    const halfRate = item.taxRate / 2;
    const cgst = (lineTotal * halfRate) / 100;
    return { cgst, sgst: cgst, igst: 0 };
  }
  if (item.taxType === "IGST") {
    const igst = (lineTotal * item.taxRate) / 100;
    return { cgst: 0, sgst: 0, igst };
  }
  return { cgst: 0, sgst: 0, igst: 0 };
}

export function calculateTotals(items: LineItemForm[]): InvoiceTotals {
  let subtotal = 0;
  let totalDiscount = 0;
  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;

  for (const item of items) {
    const gross = item.quantity * item.rate;
    const discountAmt = (gross * item.discount) / 100;
    subtotal += gross;
    totalDiscount += discountAmt;
    const tax = calculateLineTax(item);
    cgstAmount += tax.cgst;
    sgstAmount += tax.sgst;
    igstAmount += tax.igst;
  }

  const totalTax = cgstAmount + sgstAmount + igstAmount;
  const grandTotal = subtotal - totalDiscount + totalTax;

  return {
    subtotal,
    totalDiscount,
    cgstAmount,
    sgstAmount,
    igstAmount,
    totalTax,
    grandTotal,
  };
}

export function lineItemFormToBackend(item: LineItemForm): LineItem {
  return {
    itemName: item.itemName,
    quantity: BigInt(Math.round(item.quantity)),
    rate: BigInt(Math.round(item.rate * 100)), // store as paise
    discount: BigInt(Math.round(item.discount)),
    taxType: item.taxType,
    taxRate: BigInt(Math.round(item.taxRate)),
  };
}

export function lineItemBackendToForm(item: LineItem): LineItemForm {
  return {
    itemName: item.itemName,
    quantity: Number(item.quantity),
    rate: Number(item.rate) / 100, // convert from paise
    discount: Number(item.discount),
    taxType: item.taxType,
    taxRate: Number(item.taxRate),
  };
}
