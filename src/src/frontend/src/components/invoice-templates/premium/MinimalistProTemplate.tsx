import type { BusinessProfile, Client, InvoiceWithExtras } from "@/backend";
import type React from "react";

interface MinimalistProTemplateProps {
  invoice: InvoiceWithExtras;
  businessProfile?: BusinessProfile;
}

const black = "#000000";
const nearBlack = "#111111";
const darkGray = "#333333";
const midGray = "#666666";
const lightGray = "#999999";
const _ultraLight = "#f5f5f5";
const white = "#ffffff";
const hairline = "#e0e0e0";
const red = "#cc0000";

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
      return { bg: "#e8f5e9", color: "#1b5e20" };
    case "partial":
      return { bg: "#fff8e1", color: "#e65100" };
    default:
      return { bg: "#fce4ec", color: "#880e4f" };
  }
}

function calcTaxTotals(invoice: InvoiceWithExtras) {
  const calc = (type: string) =>
    invoice.lineItems
      .filter((i) => i.taxType === type)
      .reduce((s, i) => {
        const lt = Number(i.quantity) * Number(i.rate);
        return (
          s + ((lt - (lt * Number(i.discount)) / 100) * Number(i.taxRate)) / 100
        );
      }, 0);
  return { cgst: calc("CGST"), sgst: calc("SGST"), igst: calc("IGST") };
}

export default function MinimalistProTemplate({
  invoice,
  businessProfile,
}: MinimalistProTemplateProps) {
  const statusStyle = getStatusStyle(String(invoice.paymentStatus));
  const client: Client = invoice.client;
  const { cgst, sgst, igst } = calcTaxTotals(invoice);
  const hasCGST = invoice.lineItems.some((i) => i.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((i) => i.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((i) => i.taxType === "IGST");

  return (
    <div
      id="invoice-preview"
      style={
        {
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          background: white,
          color: nearBlack,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "56px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
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
          marginBottom: "48px",
          paddingBottom: "32px",
          borderBottom: `1px solid ${hairline}`,
        }}
      >
        <div>
          {businessProfile?.logo && (
            <img
              src={businessProfile.logo.getDirectURL()}
              alt="Logo"
              style={{
                height: "36px",
                marginBottom: "12px",
                objectFit: "contain",
              }}
            />
          )}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: black,
              letterSpacing: "-0.5px",
            }}
          >
            {businessProfile?.businessName || "Your Business"}
          </div>
          {businessProfile?.gstNumber && (
            <div
              style={{ fontSize: "11px", color: lightGray, marginTop: "4px" }}
            >
              GSTIN: {businessProfile.gstNumber}
            </div>
          )}
          {businessProfile?.address && (
            <div
              style={{
                fontSize: "11px",
                color: lightGray,
                marginTop: "2px",
                maxWidth: "200px",
              }}
            >
              {businessProfile.address}
            </div>
          )}
          {businessProfile?.phone && (
            <div
              style={{ fontSize: "11px", color: lightGray, marginTop: "2px" }}
            >
              {businessProfile.phone}
            </div>
          )}
          {businessProfile?.email && (
            <div
              style={{ fontSize: "11px", color: lightGray, marginTop: "2px" }}
            >
              {businessProfile.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: lightGray,
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "8px",
            }}
          >
            Invoice
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 300,
              color: black,
              letterSpacing: "-1px",
            }}
          >
            #{String(invoice.invoiceNumber).padStart(4, "0")}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "3px 12px",
              border: `1px solid ${hairline}`,
              borderRadius: "2px",
              background: statusStyle.bg,
              color: statusStyle.color,
              fontSize: "10px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            {String(invoice.paymentStatus)}
          </div>
        </div>
      </div>

      {/* Info */}
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
              fontSize: "9px",
              fontWeight: 700,
              color: lightGray,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 600, fontSize: "15px", color: black }}>
            {client.name}
          </div>
          {client.companyName && (
            <div style={{ fontSize: "13px", color: midGray, marginTop: "2px" }}>
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div style={{ fontSize: "12px", color: midGray, marginTop: "2px" }}>
              GSTIN: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div
              style={{
                fontSize: "12px",
                color: midGray,
                marginTop: "2px",
                maxWidth: "200px",
              }}
            >
              {client.address}
            </div>
          )}
          {client.phone && (
            <div style={{ fontSize: "12px", color: midGray, marginTop: "2px" }}>
              {client.phone}
            </div>
          )}
          {client.email && (
            <div style={{ fontSize: "12px", color: midGray, marginTop: "2px" }}>
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                color: lightGray,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Invoice Date
            </div>
            <div
              style={{ fontSize: "14px", color: darkGray, marginTop: "2px" }}
            >
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                color: lightGray,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Due Date
            </div>
            <div
              style={{ fontSize: "14px", color: darkGray, marginTop: "2px" }}
            >
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "24px",
        }}
      >
        <thead>
          <tr
            style={{
              borderTop: `1px solid ${hairline}`,
              borderBottom: `1px solid ${hairline}`,
            }}
          >
            <th
              style={{
                padding: "10px 0",
                textAlign: "left",
                fontSize: "10px",
                fontWeight: 600,
                color: lightGray,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Item
            </th>
            <th
              style={{
                padding: "10px 8px",
                textAlign: "center",
                fontSize: "10px",
                fontWeight: 600,
                color: lightGray,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Qty
            </th>
            <th
              style={{
                padding: "10px 8px",
                textAlign: "right",
                fontSize: "10px",
                fontWeight: 600,
                color: lightGray,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Rate
            </th>
            <th
              style={{
                padding: "10px 8px",
                textAlign: "center",
                fontSize: "10px",
                fontWeight: 600,
                color: lightGray,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Tax
            </th>
            <th
              style={{
                padding: "10px 8px",
                textAlign: "center",
                fontSize: "10px",
                fontWeight: 600,
                color: lightGray,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Disc%
            </th>
            <th
              style={{
                padding: "10px 0",
                textAlign: "right",
                fontSize: "10px",
                fontWeight: 600,
                color: lightGray,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item, idx) => {
            const lt = Number(item.quantity) * Number(item.rate);
            const disc = (lt * Number(item.discount)) / 100;
            const taxable = lt - disc;
            const tax = (taxable * Number(item.taxRate)) / 100;
            return (
              <tr
                key={`${item.itemName}-${idx}`}
                style={{ borderBottom: `1px solid ${hairline}` }}
              >
                <td
                  style={{
                    padding: "12px 0",
                    fontSize: "13px",
                    color: nearBlack,
                  }}
                >
                  {item.itemName}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: midGray,
                  }}
                >
                  {String(item.quantity)}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    textAlign: "right",
                    fontSize: "13px",
                    color: midGray,
                  }}
                >
                  {formatCurrency(Number(item.rate))}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: midGray,
                  }}
                >
                  {item.taxType} {String(item.taxRate)}%
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: midGray,
                  }}
                >
                  {String(item.discount)}%
                </td>
                <td
                  style={{
                    padding: "12px 0",
                    textAlign: "right",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: nearBlack,
                  }}
                >
                  {formatCurrency(taxable + tax)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ minWidth: "240px" }}>
          {[
            {
              label: "Subtotal",
              value: formatCurrency(Number(invoice.subtotal)),
              show: true,
              color: darkGray,
            },
            {
              label: "Discount",
              value: `-${formatCurrency(Number(invoice.totalDiscount))}`,
              show: Number(invoice.totalDiscount) > 0,
              color: red,
            },
            {
              label: "CGST",
              value: formatCurrency(cgst),
              show: hasCGST && cgst > 0,
              color: darkGray,
            },
            {
              label: "SGST",
              value: formatCurrency(sgst),
              show: hasSGST && sgst > 0,
              color: darkGray,
            },
            {
              label: "IGST",
              value: formatCurrency(igst),
              show: hasIGST && igst > 0,
              color: darkGray,
            },
            {
              label: "Tax",
              value: formatCurrency(Number(invoice.totalTax)),
              show:
                Number(invoice.totalTax) > 0 &&
                !hasCGST &&
                !hasSGST &&
                !hasIGST,
              color: darkGray,
            },
          ]
            .filter((r) => r.show)
            .map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: `1px solid ${hairline}`,
                }}
              >
                <span style={{ fontSize: "12px", color: lightGray }}>
                  {row.label}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: row.color,
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 0",
              marginTop: "4px",
              borderTop: `2px solid ${black}`,
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: black,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Total
            </span>
            <span style={{ fontSize: "16px", fontWeight: 700, color: black }}>
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
                  color: "#0f172a",
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
                  color: "#0f172a",
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
        style={{
          marginTop: "48px",
          paddingTop: "20px",
          borderTop: `1px solid ${hairline}`,
          textAlign: "center",
          fontSize: "11px",
          color: lightGray,
        }}
      >
        Thank you for your business.
      </div>
    </div>
  );
}
