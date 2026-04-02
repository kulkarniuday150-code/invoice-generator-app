function formatCurrency(amount) {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
  }).format(num);
}
function formatInvoiceNumber(invoiceNumber) {
  const num = typeof invoiceNumber === "bigint" ? Number(invoiceNumber) : invoiceNumber;
  return `INV-${String(num).padStart(4, "0")}`;
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
}
export {
  formatDate as a,
  formatCurrency as b,
  formatInvoiceNumber as f
};
