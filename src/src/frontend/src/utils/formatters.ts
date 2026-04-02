export function formatCurrency(amount: number | bigint): string {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(num);
}

export function formatInvoiceNumber(invoiceNumber: number | bigint): string {
  const num =
    typeof invoiceNumber === "bigint" ? Number(invoiceNumber) : invoiceNumber;
  return `INV-${String(num).padStart(4, "0")}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
