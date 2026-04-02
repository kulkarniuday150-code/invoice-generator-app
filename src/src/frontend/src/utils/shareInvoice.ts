import type { BusinessProfile, Invoice } from "../backend";
import { formatCurrency, formatInvoiceNumber } from "./formatters";

// ── Full object variants (used by InvoiceDetailPage / InvoicePreviewPage old API) ──

export function shareInvoiceViaWhatsApp(
  invoice: Invoice,
  businessProfile: BusinessProfile,
): void {
  const url = generateWhatsAppShareUrl(invoice, businessProfile.businessName);
  window.open(url, "_blank");
}

export function shareInvoiceViaEmail(
  invoice: Invoice,
  businessProfile: BusinessProfile,
): void {
  const url = generateEmailShareUrl(invoice, businessProfile.businessName);
  window.location.href = url;
}

export function shareInvoicePDFViaWhatsApp(
  invoice: Invoice,
  businessProfile: BusinessProfile,
): void {
  const url = generateWhatsAppPDFShareUrl(
    invoice,
    businessProfile.businessName,
  );
  window.open(url, "_blank");
}

export function shareInvoicePDFViaEmail(
  invoice: Invoice,
  businessProfile: BusinessProfile,
): void {
  const url = generateEmailPDFShareUrl(invoice, businessProfile.businessName);
  window.location.href = url;
}

// ── URL generator variants (used by new InvoiceDetailPage / InvoicePreviewPage) ──

export function generateWhatsAppShareUrl(
  invoice: Invoice,
  businessName?: string,
): string {
  const invoiceNum = formatInvoiceNumber(invoice.invoiceNumber);
  const total = formatCurrency(invoice.grandTotal);
  const message = `Invoice ${invoiceNum}\nFrom: ${businessName ?? ""}\nTo: ${invoice.client.name}\nAmount: ${total}\nDue: ${invoice.dueDate}\nStatus: ${invoice.paymentStatus}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function generateEmailShareUrl(
  invoice: Invoice,
  businessName?: string,
): string {
  const invoiceNum = formatInvoiceNumber(invoice.invoiceNumber);
  const total = formatCurrency(invoice.grandTotal);
  const subject = `Invoice ${invoiceNum} from ${businessName ?? ""}`;
  const body = `Dear ${invoice.client.name},\n\nPlease find your invoice details below:\n\nInvoice Number: ${invoiceNum}\nAmount: ${total}\nDue Date: ${invoice.dueDate}\nStatus: ${invoice.paymentStatus}\n\nThank you for your business.\n\n${businessName ?? ""}`;
  return `mailto:${invoice.client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function generateWhatsAppPDFShareUrl(
  invoice: Invoice,
  businessName?: string,
): string {
  const invoiceNum = formatInvoiceNumber(invoice.invoiceNumber);
  const message = `Invoice ${invoiceNum} from ${businessName ?? ""} - Please use the print/save as PDF option to get the PDF, then share it. Amount: ${formatCurrency(invoice.grandTotal)}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function generateEmailPDFShareUrl(
  invoice: Invoice,
  businessName?: string,
): string {
  const invoiceNum = formatInvoiceNumber(invoice.invoiceNumber);
  const subject = `Invoice ${invoiceNum} PDF from ${businessName ?? ""}`;
  const body = `Dear ${invoice.client.name},\n\nPlease find attached the PDF invoice ${invoiceNum}.\n\nAmount: ${formatCurrency(invoice.grandTotal)}\nDue Date: ${invoice.dueDate}\n\nThank you,\n${businessName ?? ""}`;
  return `mailto:${invoice.client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
