import type { BusinessProfile, Client, InvoiceWithExtras } from "@/backend";
import type React from "react";

interface AgencyTemplateProps {
  invoice: InvoiceWithExtras;
  businessProfile?: BusinessProfile;
}

const darkBg = "#0a0a0f";
const darkCard = "#12121a";
const darkBorder = "#1e1e2e";
const neonTeal = "#00e5cc";
const neonTealDim = "#00b8a3";
const neonTealBg = "rgba(0,229,204,0.08)";
const white = "#ffffff";
const offWhite = "#e2e8f0";
const _gray = "#64748b";
const lightGray = "#94a3b8";
const red = "#f87171";

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
      return { bg: "rgba(0,229,204,0.15)", color: neonTeal };
    case "partial":
      return { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" };
    default:
      return { bg: "rgba(248,113,113,0.15)", color: "#f87171" };
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

export default function AgencyTemplate({
  invoice,
  businessProfile,
}: AgencyTemplateProps) {
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
          fontFamily: "'Segoe UI', system-ui, Arial, sans-serif",
          background: darkBg,
          color: offWhite,
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 40px rgba(0,229,204,0.15)",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Neon top bar */}
      <div
        style={
          {
            height: "3px",
            background: neonTeal,
            boxShadow: `0 0 12px ${neonTeal}`,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      />

      {/* Header */}
      <div
        style={
          {
            background: darkCard,
            padding: "36px 44px",
            borderBottom: `1px solid ${darkBorder}`,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            {businessProfile?.logo && (
              <img
                src={businessProfile.logo.getDirectURL()}
                alt="Logo"
                style={{
                  height: "44px",
                  marginBottom: "10px",
                  objectFit: "contain",
                }}
              />
            )}
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: white,
                letterSpacing: "-0.5px",
              }}
            >
              {businessProfile?.businessName || "Your Business"}
            </div>
            {businessProfile?.gstNumber && (
              <div
                style={{ fontSize: "11px", color: lightGray, marginTop: "3px" }}
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
                  maxWidth: "220px",
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
          <div style={{ textAlign: "right" as const }}>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "4px",
                textTransform: "uppercase" as const,
                color: neonTeal,
                marginBottom: "8px",
              }}
            >
              Invoice
            </div>
            <div style={{ fontSize: "30px", fontWeight: 800, color: white }}>
              #{String(invoice.invoiceNumber).padStart(4, "0")}
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "4px 14px",
                border: `1px solid ${neonTeal}`,
                borderRadius: "4px",
                background: statusStyle.bg,
                color: statusStyle.color,
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase" as const,
              }}
            >
              {String(invoice.paymentStatus)}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div
        style={
          {
            display: "flex",
            justifyContent: "space-between",
            padding: "24px 44px",
            background: neonTealBg,
            borderBottom: `1px solid ${darkBorder}`,
            gap: "24px",
            flexWrap: "wrap" as const,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        <div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: neonTeal,
              textTransform: "uppercase" as const,
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "15px", color: white }}>
            {client.name}
          </div>
          {client.companyName && (
            <div style={{ fontSize: "13px", color: lightGray }}>
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div style={{ fontSize: "12px", color: lightGray }}>
              GSTIN: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div
              style={{ fontSize: "12px", color: lightGray, maxWidth: "200px" }}
            >
              {client.address}
            </div>
          )}
          {client.phone && (
            <div style={{ fontSize: "12px", color: lightGray }}>
              {client.phone}
            </div>
          )}
          {client.email && (
            <div style={{ fontSize: "12px", color: lightGray }}>
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" as const }}>
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: neonTeal,
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
              }}
            >
              Invoice Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: offWhite }}>
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: neonTeal,
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
              }}
            >
              Due Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: offWhite }}>
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: "24px 44px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
          <thead>
            <tr
              style={
                {
                  borderBottom: `1px solid ${neonTeal}`,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "left" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  color: neonTeal,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Item
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  color: neonTeal,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  color: neonTeal,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Rate
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  color: neonTeal,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Tax
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  color: neonTeal,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Disc%
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  color: neonTeal,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
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
                  style={{
                    borderBottom: `1px solid ${darkBorder}`,
                    background: idx % 2 === 0 ? "transparent" : neonTealBg,
                  }}
                >
                  <td
                    style={{
                      padding: "11px 12px",
                      fontSize: "13px",
                      color: offWhite,
                    }}
                  >
                    {item.itemName}
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "center" as const,
                      fontSize: "13px",
                      color: lightGray,
                    }}
                  >
                    {String(item.quantity)}
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "right" as const,
                      fontSize: "13px",
                      color: lightGray,
                    }}
                  >
                    {formatCurrency(Number(item.rate))}
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "center" as const,
                      fontSize: "12px",
                      color: lightGray,
                    }}
                  >
                    {item.taxType} {String(item.taxRate)}%
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "center" as const,
                      fontSize: "12px",
                      color: lightGray,
                    }}
                  >
                    {String(item.discount)}%
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "right" as const,
                      fontSize: "13px",
                      fontWeight: 700,
                      color: neonTeal,
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <div style={{ minWidth: "260px" }}>
            {[
              {
                label: "Subtotal",
                value: formatCurrency(Number(invoice.subtotal)),
                show: true,
                color: offWhite,
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
                color: offWhite,
              },
              {
                label: "SGST",
                value: formatCurrency(sgst),
                show: hasSGST && sgst > 0,
                color: offWhite,
              },
              {
                label: "IGST",
                value: formatCurrency(igst),
                show: hasIGST && igst > 0,
                color: offWhite,
              },
              {
                label: "Tax",
                value: formatCurrency(Number(invoice.totalTax)),
                show:
                  Number(invoice.totalTax) > 0 &&
                  !hasCGST &&
                  !hasSGST &&
                  !hasIGST,
                color: offWhite,
              },
            ]
              .filter((r) => r.show)
              .map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "7px 0",
                    borderBottom: `1px solid ${darkBorder}`,
                  }}
                >
                  <span style={{ fontSize: "13px", color: lightGray }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: row.color,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            <div
              style={
                {
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  marginTop: "10px",
                  background: darkCard,
                  border: `1px solid ${neonTeal}`,
                  boxShadow: "0 0 16px rgba(0,229,204,0.2)",
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <span style={{ fontSize: "15px", fontWeight: 800, color: white }}>
                Grand Total
              </span>
              <span
                style={{ fontSize: "15px", fontWeight: 900, color: neonTeal }}
              >
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
            padding: "16px 44px",
            background: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
            flexWrap: "wrap" as const,
          }}
        >
          {invoice.termsAndConditions?.[0] && (
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#111827",
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
                  color: "#6b7280",
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
                  color: "#111827",
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
                  color: "#6b7280",
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
            padding: "16px 44px",
            background: darkCard,
            borderTop: `1px solid ${darkBorder}`,
            textAlign: "center" as const,
            fontSize: "12px",
            color: neonTealDim,
            fontWeight: 600,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        Thank you for your business. Let's build something great together.
      </div>
    </div>
  );
}
