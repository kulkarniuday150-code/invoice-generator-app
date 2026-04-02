import type { BusinessProfile, Client, InvoiceWithExtras } from "@/backend";
import type React from "react";

interface MinimalTemplateProps {
  invoice: InvoiceWithExtras;
  businessProfile?: BusinessProfile;
}

const slate900 = "#0f172a";
const slate700 = "#334155";
const slate500 = "#64748b";
const slate400 = "#94a3b8";
const slate200 = "#e2e8f0";
const slate100 = "#f1f5f9";
const _slate50 = "#f8fafc";
const white = "#ffffff";
const red600 = "#dc2626";
const _black = "#000000";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function getStatusStyle(status: string): { bg: string; color: string } {
  switch (status) {
    case "paid":
      return { bg: "#dcfce7", color: "#166534" };
    case "partial":
      return { bg: "#fef9c3", color: "#854d0e" };
    default:
      return { bg: "#fee2e2", color: "#991b1b" };
  }
}

export default function MinimalTemplate({
  invoice,
  businessProfile,
}: MinimalTemplateProps) {
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
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          background: white,
          color: slate900,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "48px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: "8px",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "40px",
        }}
      >
        <div>
          {businessProfile?.logo && (
            <img
              src={businessProfile.logo.getDirectURL()}
              alt="Logo"
              style={{
                height: "40px",
                marginBottom: "8px",
                objectFit: "contain",
              }}
            />
          )}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: slate900,
              letterSpacing: "-0.5px",
            }}
          >
            {businessProfile?.businessName || "Your Business"}
          </div>
          {businessProfile?.gstNumber && (
            <div
              style={{ fontSize: "12px", color: slate500, marginTop: "2px" }}
            >
              GST: {businessProfile.gstNumber}
            </div>
          )}
          {businessProfile?.address && (
            <div
              style={{
                fontSize: "12px",
                color: slate500,
                marginTop: "2px",
                maxWidth: "200px",
              }}
            >
              {businessProfile.address}
            </div>
          )}
          {businessProfile?.phone && (
            <div
              style={{ fontSize: "12px", color: slate500, marginTop: "2px" }}
            >
              {businessProfile.phone}
            </div>
          )}
          {businessProfile?.email && (
            <div
              style={{ fontSize: "12px", color: slate500, marginTop: "2px" }}
            >
              {businessProfile.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: slate400,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "4px",
            }}
          >
            Invoice
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: slate900,
              letterSpacing: "-1px",
            }}
          >
            #{String(invoice.invoiceNumber).padStart(4, "0")}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: "8px",
              padding: "3px 12px",
              borderRadius: "20px",
              background: statusStyle.bg,
              color: statusStyle.color,
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {String(invoice.paymentStatus)}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ height: "1px", background: slate200, marginBottom: "32px" }}
      />

      {/* Dates + Client */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: slate400,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "6px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "15px", color: slate900 }}>
            {client.name}
          </div>
          {client.companyName && (
            <div
              style={{ fontSize: "13px", color: slate700, marginTop: "2px" }}
            >
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div
              style={{ fontSize: "12px", color: slate500, marginTop: "2px" }}
            >
              GST: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div
              style={{
                fontSize: "12px",
                color: slate500,
                marginTop: "2px",
                maxWidth: "200px",
              }}
            >
              {client.address}
            </div>
          )}
          {client.phone && (
            <div
              style={{ fontSize: "12px", color: slate500, marginTop: "2px" }}
            >
              {client.phone}
            </div>
          )}
          {client.email && (
            <div
              style={{ fontSize: "12px", color: slate500, marginTop: "2px" }}
            >
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: slate400,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Invoice Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: slate700 }}>
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: slate400,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Due Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: slate700 }}>
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "24px",
        }}
      >
        <thead>
          <tr style={{ borderBottom: `2px solid ${slate900}` }}>
            <th
              style={{
                padding: "8px 0",
                textAlign: "left",
                fontSize: "11px",
                fontWeight: 700,
                color: slate500,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Item
            </th>
            <th
              style={{
                padding: "8px 8px",
                textAlign: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: slate500,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Qty
            </th>
            <th
              style={{
                padding: "8px 8px",
                textAlign: "right",
                fontSize: "11px",
                fontWeight: 700,
                color: slate500,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Rate
            </th>
            <th
              style={{
                padding: "8px 8px",
                textAlign: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: slate500,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Tax
            </th>
            <th
              style={{
                padding: "8px 8px",
                textAlign: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: slate500,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Disc%
            </th>
            <th
              style={{
                padding: "8px 0",
                textAlign: "right",
                fontSize: "11px",
                fontWeight: 700,
                color: slate500,
                textTransform: "uppercase",
                letterSpacing: "1px",
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
                style={{ borderBottom: `1px solid ${slate100}` }}
              >
                <td
                  style={{
                    padding: "12px 0",
                    fontSize: "13px",
                    color: slate900,
                  }}
                >
                  {item.itemName}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: slate700,
                  }}
                >
                  {String(item.quantity)}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    textAlign: "right",
                    fontSize: "13px",
                    color: slate700,
                  }}
                >
                  {formatCurrency(Number(item.rate))}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: slate500,
                  }}
                >
                  {item.taxType} {String(item.taxRate)}%
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: slate500,
                  }}
                >
                  {String(item.discount)}%
                </td>
                <td
                  style={{
                    padding: "12px 0",
                    textAlign: "right",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: slate900,
                  }}
                >
                  {formatCurrency(total)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Divider */}
      <div
        style={{ height: "1px", background: slate200, marginBottom: "20px" }}
      />

      {/* Totals */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ minWidth: "240px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 0",
            }}
          >
            <span style={{ fontSize: "13px", color: slate500 }}>Subtotal</span>
            <span style={{ fontSize: "13px", color: slate700 }}>
              {formatCurrency(Number(invoice.subtotal))}
            </span>
          </div>
          {Number(invoice.totalDiscount) > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: slate500 }}>
                Discount
              </span>
              <span style={{ fontSize: "13px", color: red600 }}>
                -{formatCurrency(Number(invoice.totalDiscount))}
              </span>
            </div>
          )}
          {hasCGST && cgstTotal > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: slate500 }}>CGST</span>
              <span style={{ fontSize: "13px", color: slate700 }}>
                {formatCurrency(cgstTotal)}
              </span>
            </div>
          )}
          {hasSGST && sgstTotal > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: slate500 }}>SGST</span>
              <span style={{ fontSize: "13px", color: slate700 }}>
                {formatCurrency(sgstTotal)}
              </span>
            </div>
          )}
          {hasIGST && igstTotal > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: slate500 }}>IGST</span>
              <span style={{ fontSize: "13px", color: slate700 }}>
                {formatCurrency(igstTotal)}
              </span>
            </div>
          )}
          {Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: slate500 }}>Tax</span>
              <span style={{ fontSize: "13px", color: slate700 }}>
                {formatCurrency(Number(invoice.totalTax))}
              </span>
            </div>
          )}
          <div
            style={{ height: "1px", background: slate900, margin: "8px 0" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: slate900 }}
            >
              Total
            </span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: slate900 }}
            >
              {formatCurrency(Number(invoice.grandTotal))}
            </span>
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
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            flexWrap: "wrap" as const,
          }}
        >
          {invoice.termsAndConditions?.[0] && (
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#334155",
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
                  color: "#64748b",
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
                  color: "#334155",
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
                  color: "#64748b",
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
        style={{ height: "1px", background: slate200, margin: "32px 0 16px 0" }}
      />
      <div style={{ textAlign: "center", fontSize: "12px", color: slate400 }}>
        Thank you for your business.
      </div>
    </div>
  );
}
