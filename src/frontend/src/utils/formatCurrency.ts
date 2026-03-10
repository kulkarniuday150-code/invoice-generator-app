export function formatCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return formatted;
}

export function formatCurrencyFromPaise(paise: bigint): string {
  const amount = Number(paise) / 100;
  return formatCurrency(amount);
}

export function formatInvoiceNumber(num: bigint | number): string {
  const n = typeof num === "bigint" ? Number(num) : num;
  return `INV-${String(n).padStart(3, "0")}`;
}
