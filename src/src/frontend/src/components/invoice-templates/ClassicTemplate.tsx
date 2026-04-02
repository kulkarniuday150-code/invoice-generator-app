import type { BusinessProfile, Client, InvoiceWithExtras } from "@/backend";
import type React from "react";

interface ClassicTemplateProps {
  invoice: InvoiceWithExtras;
  businessProfile?: BusinessProfile;
}

const amber700 = "#b45309";
const amber800 = "#92400e";
const amber100 = "#fef3c7";
const amber50 = "#fffbeb";
const cream = "#fefce8";
const brown900 = "#1c1917";
const brown700 = "#44403c";
const brown500 = "#78716c";
const brown200 = "#d6d3d1";
const brown100 = "#f5f5f4";
const white = "#ffffff";
const red600 = "#dc2626";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function getStatusStyle(status: string): {
  bg: string;
  color: string;
  border: string;
} {
  switch (status) {
    case "paid":
      return { bg: "#dcfce7", color: "#166534", border: "#86efac" };
    case "partial":
      return { bg: "#fef9c3", color: "#854d0e", border: "#fde047" };
    default:
      return { bg: "#fee2e2", color: "#991b1b", border: "#fca5a5" };
  }
}

export default function ClassicTemplate({
  invoice,
  businessProfile,
}: ClassicTemplateProps) {
  const statusStyle = getStatusStyle(String(invoice.paymentStatus));
  const client: Client = invoice.client;

  const hasCGST = invoice.lineItems.some((item) => item.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((item) => item.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((item) => item.taxType === "IGST");

  const cgstTotal = invoice.lineItems
    .filter((item) => item.taxType === "CGST")
    .reduce((sum, item) => {
      const lineTotal = Number(item.quantity) * Number(item.rate);
      const discounted = lineTotal - (lineTotal * Number(item.discount)) / 100;
      return sum + (discounted * Number(item.taxRate)) / 100;
    }, 0);

  const sgstTotal = invoice.lineItems
    .filter((item) => item.taxType === "SGST")
    .reduce((sum, item) => {
      const lineTotal = Number(item.quantity) * Number(item.rate);
      const discounted = lineTotal - (lineTotal * Number(item.discount)) / 100;
      return sum + (discounted * Number(item.taxRate)) / 100;
    }, 0);

  const igstTotal = invoice.lineItems
    .filter((item) => item.taxType === "IGST")
    .reduce((sum, item) => {
      const lineTotal = Number(item.quantity) * Number(item.rate);
      const discounted = lineTotal - (lineTotal * Number(item.discount)) / 100;
      return sum + (discounted * Number(item.taxRate)) / 100;
    }, 0);

  return (
    <div
      id="invoice-preview"
      style={
        {
          fontFamily: "Georgia, 'Times New Roman', serif",
          background: white,
          color: brown900,
          maxWidth: "800px",
          margin: "0 auto",
          border: `2px solid ${amber700}`,
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div
        style={
          {
            background: amber50,
            borderBottom: `3px double ${amber700}`,
            padding: "32px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        <div>
          {businessProfile?.logo && (
            <img
              src={businessProfile.logo.getDirectURL()}
              alt="Logo"
              style={{
                height: "48px",
                marginBottom: "10px",
                objectFit: "contain",
              }}
            />
          )}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: amber800,
              letterSpacing: "-0.5px",
            }}
          >
            {businessProfile?.businessName || "Your Business"}
          </div>
          {businessProfile?.gstNumber && (
            <div
              style={{ fontSize: "12px", color: brown500, marginTop: "3px" }}
            >
              GST: {businessProfile.gstNumber}
            </div>
          )}
          {businessProfile?.address && (
            <div
              style={{
                fontSize: "12px",
                color: brown500,
                marginTop: "2px",
                maxWidth: "220px",
              }}
            >
              {businessProfile.address}
            </div>
          )}
          {businessProfile?.phone && (
            <div
              style={{ fontSize: "12px", color: brown500, marginTop: "2px" }}
            >
              {businessProfile.phone}
            </div>
          )}
          {businessProfile?.email && (
            <div
              style={{ fontSize: "12px", color: brown500, marginTop: "2px" }}
            >
              {businessProfile.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: amber700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Invoice
          </div>
          <div style={{ fontSize: "14px", color: brown700, marginTop: "4px" }}>
            No. #{String(invoice.invoiceNumber).padStart(4, "0")}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "4px 14px",
              border: `1px solid ${statusStyle.border}`,
              borderRadius: "3px",
              background: statusStyle.bg,
              color: statusStyle.color,
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {String(invoice.paymentStatus)}
          </div>
        </div>
      </div>

      {/* Dates + Client */}
      <div
        style={
          {
            display: "flex",
            justifyContent: "space-between",
            padding: "24px 40px",
            background: cream,
            borderBottom: `1px solid ${amber100}`,
            gap: "24px",
            flexWrap: "wrap",
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: amber700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "6px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: brown900 }}>
            {client.name}
          </div>
          {client.companyName && (
            <div
              style={{ fontSize: "13px", color: brown700, marginTop: "2px" }}
            >
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div
              style={{ fontSize: "12px", color: brown500, marginTop: "2px" }}
            >
              GST: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div
              style={{
                fontSize: "12px",
                color: brown500,
                marginTop: "2px",
                maxWidth: "200px",
              }}
            >
              {client.address}
            </div>
          )}
          {client.phone && (
            <div
              style={{ fontSize: "12px", color: brown500, marginTop: "2px" }}
            >
              {client.phone}
            </div>
          )}
          {client.email && (
            <div
              style={{ fontSize: "12px", color: brown500, marginTop: "2px" }}
            >
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: amber700,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Invoice Date
            </div>
            <div style={{ fontSize: "14px", color: brown700 }}>
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: amber700,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Due Date
            </div>
            <div style={{ fontSize: "14px", color: brown700 }}>
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div style={{ padding: "24px 40px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: amber100,
                borderTop: `2px solid ${amber700}`,
                borderBottom: `2px solid ${amber700}`,
              }}
            >
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: amber800,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: amber800,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: amber800,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Rate
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: amber800,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Tax
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: amber800,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Disc%
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: amber800,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item, idx) => {
              const lineTotal = Number(item.quantity) * Number(item.rate);
              const discountAmt = (lineTotal * Number(item.discount)) / 100;
              const taxableAmt = lineTotal - discountAmt;
              const taxAmt = (taxableAmt * Number(item.taxRate)) / 100;
              const total = taxableAmt + taxAmt;
              return (
                <tr
                  key={`${item.itemName}-${idx}`}
                  style={{
                    borderBottom: `1px solid ${brown200}`,
                    background: idx % 2 === 0 ? white : brown100,
                  }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: "13px",
                      color: brown900,
                    }}
                  >
                    {item.itemName}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "13px",
                      color: brown700,
                    }}
                  >
                    {String(item.quantity)}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      color: brown700,
                    }}
                  >
                    {formatCurrency(Number(item.rate))}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: brown500,
                    }}
                  >
                    {item.taxType} {String(item.taxRate)}%
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: brown500,
                    }}
                  >
                    {String(item.discount)}%
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: brown900,
                    }}
                  >
                    {formatCurrency(total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Totals */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              minWidth: "260px",
              border: `1px solid ${amber100}`,
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 16px",
                borderBottom: `1px solid ${amber100}`,
                background: white,
              }}
            >
              <span style={{ fontSize: "13px", color: brown500 }}>
                Subtotal
              </span>
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: brown900 }}
              >
                {formatCurrency(Number(invoice.subtotal))}
              </span>
            </div>
            {Number(invoice.totalDiscount) > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${amber100}`,
                  background: white,
                }}
              >
                <span style={{ fontSize: "13px", color: brown500 }}>
                  Discount
                </span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: red600 }}
                >
                  -{formatCurrency(Number(invoice.totalDiscount))}
                </span>
              </div>
            )}
            {hasCGST && cgstTotal > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${amber100}`,
                  background: white,
                }}
              >
                <span style={{ fontSize: "13px", color: brown500 }}>CGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: brown900 }}
                >
                  {formatCurrency(cgstTotal)}
                </span>
              </div>
            )}
            {hasSGST && sgstTotal > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${amber100}`,
                  background: white,
                }}
              >
                <span style={{ fontSize: "13px", color: brown500 }}>SGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: brown900 }}
                >
                  {formatCurrency(sgstTotal)}
                </span>
              </div>
            )}
            {hasIGST && igstTotal > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${amber100}`,
                  background: white,
                }}
              >
                <span style={{ fontSize: "13px", color: brown500 }}>IGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: brown900 }}
                >
                  {formatCurrency(igstTotal)}
                </span>
              </div>
            )}
            {Number(invoice.totalTax) > 0 &&
              !hasCGST &&
              !hasSGST &&
              !hasIGST && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 16px",
                    borderBottom: `1px solid ${amber100}`,
                    background: white,
                  }}
                >
                  <span style={{ fontSize: "13px", color: brown500 }}>Tax</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: brown900,
                    }}
                  >
                    {formatCurrency(Number(invoice.totalTax))}
                  </span>
                </div>
              )}
            <div
              style={
                {
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: amber700,
                  color: white,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <span style={{ fontSize: "15px", fontWeight: 700 }}>
                Grand Total
              </span>
              <span style={{ fontSize: "15px", fontWeight: 800 }}>
                {formatCurrency(Number(invoice.grandTotal))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details & Terms */}
      {invoice.bankDetails?.[0] || invoice.termsAndConditions?.[0] ? (
        <div
          style={{
            display: "flex",
            gap: "24px",
            padding: "16px 40px",
            background: "#fffbf0",
            borderTop: "1px solid #f59e0b",
            flexWrap: "wrap" as const,
          }}
        >
          {invoice.termsAndConditions?.[0] && (
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#78350f",
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                  marginBottom: "6px",
                }}
              >
                Terms & Conditions
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#92400e",
                  whiteSpace: "pre-wrap" as const,
                  lineHeight: 1.5,
                }}
              >
                {invoice.termsAndConditions?.[0]}
              </div>
            </div>
          )}
          {invoice.bankDetails?.[0] && (
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#78350f",
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                  marginBottom: "6px",
                }}
              >
                Bank Details
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#92400e",
                  whiteSpace: "pre-wrap" as const,
                  lineHeight: 1.5,
                }}
              >
                {invoice.bankDetails?.[0]}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Footer */}
      <div
        style={
          {
            padding: "16px 40px",
            background: amber50,
            borderTop: `2px solid ${amber100}`,
            textAlign: "center",
            fontSize: "13px",
            color: brown500,
            fontStyle: "italic",
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        Thank you for your business. Please make payment by the due date.
      </div>
    </div>
  );
}
