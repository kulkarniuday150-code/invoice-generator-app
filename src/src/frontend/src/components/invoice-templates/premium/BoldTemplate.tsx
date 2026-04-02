import type { BusinessProfile, Client, InvoiceWithExtras } from "@/backend";
import type React from "react";

interface BoldTemplateProps {
  invoice: InvoiceWithExtras;
  businessProfile?: BusinessProfile;
}

const black = "#000000";
const offBlack = "#111827";
const darkGray = "#374151";
const midGray = "#6b7280";
const lightGray = "#d1d5db";
const ultraLight = "#f9fafb";
const white = "#ffffff";
const accent = "#facc15";
const red = "#ef4444";

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
      return { bg: "#d1fae5", color: "#065f46" };
    case "partial":
      return { bg: "#fef3c7", color: "#92400e" };
    default:
      return { bg: "#fee2e2", color: "#991b1b" };
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

export default function BoldTemplate({
  invoice,
  businessProfile,
}: BoldTemplateProps) {
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
          fontFamily: "'Arial Black', Arial, sans-serif",
          background: white,
          color: offBlack,
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Bold black header */}
      <div
        style={
          {
            background: black,
            color: white,
            padding: "40px 44px",
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
                  marginBottom: "12px",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            )}
            <div
              style={{
                fontSize: "26px",
                fontWeight: 900,
                letterSpacing: "-1px",
                textTransform: "uppercase" as const,
              }}
            >
              {businessProfile?.businessName || "Your Business"}
            </div>
            {businessProfile?.gstNumber && (
              <div
                style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}
              >
                GSTIN: {businessProfile.gstNumber}
              </div>
            )}
            {businessProfile?.address && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                  marginTop: "2px",
                  maxWidth: "220px",
                }}
              >
                {businessProfile.address}
              </div>
            )}
            {businessProfile?.phone && (
              <div
                style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}
              >
                {businessProfile.phone}
              </div>
            )}
            {businessProfile?.email && (
              <div
                style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}
              >
                {businessProfile.email}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" as const }}>
            <div
              style={
                {
                  fontSize: "48px",
                  fontWeight: 900,
                  letterSpacing: "-3px",
                  color: accent,
                  lineHeight: 1,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              INV
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: white,
                marginTop: "4px",
              }}
            >
              #{String(invoice.invoiceNumber).padStart(4, "0")}
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "4px 14px",
                borderRadius: "3px",
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

      {/* Yellow accent bar */}
      <div
        style={
          {
            height: "6px",
            background: accent,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      />

      {/* Info */}
      <div
        style={
          {
            display: "flex",
            justifyContent: "space-between",
            padding: "28px 44px",
            background: ultraLight,
            borderBottom: `1px solid ${lightGray}`,
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
              fontWeight: 900,
              color: black,
              textTransform: "uppercase" as const,
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: offBlack }}>
            {client.name}
          </div>
          {client.companyName && (
            <div style={{ fontSize: "13px", color: midGray }}>
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div style={{ fontSize: "12px", color: midGray }}>
              GSTIN: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div
              style={{ fontSize: "12px", color: midGray, maxWidth: "200px" }}
            >
              {client.address}
            </div>
          )}
          {client.phone && (
            <div style={{ fontSize: "12px", color: midGray }}>
              {client.phone}
            </div>
          )}
          {client.email && (
            <div style={{ fontSize: "12px", color: midGray }}>
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" as const }}>
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 900,
                color: black,
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
              }}
            >
              Invoice Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: darkGray }}>
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 900,
                color: black,
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
              }}
            >
              Due Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: darkGray }}>
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: "28px 44px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
          <thead>
            <tr
              style={
                {
                  background: offBlack,
                  color: white,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <th
                style={{
                  padding: "12px 14px",
                  textAlign: "left" as const,
                  fontSize: "11px",
                  fontWeight: 900,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Item
              </th>
              <th
                style={{
                  padding: "12px 14px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 900,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: "12px 14px",
                  textAlign: "right" as const,
                  fontSize: "11px",
                  fontWeight: 900,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Rate
              </th>
              <th
                style={{
                  padding: "12px 14px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 900,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Tax
              </th>
              <th
                style={{
                  padding: "12px 14px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 900,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Disc%
              </th>
              <th
                style={{
                  padding: "12px 14px",
                  textAlign: "right" as const,
                  fontSize: "11px",
                  fontWeight: 900,
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
                    borderBottom: `2px solid ${lightGray}`,
                    background: idx % 2 === 0 ? white : ultraLight,
                  }}
                >
                  <td
                    style={{
                      padding: "12px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: offBlack,
                    }}
                  >
                    {item.itemName}
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      textAlign: "center" as const,
                      fontSize: "13px",
                      color: midGray,
                    }}
                  >
                    {String(item.quantity)}
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      textAlign: "right" as const,
                      fontSize: "13px",
                      color: midGray,
                    }}
                  >
                    {formatCurrency(Number(item.rate))}
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      textAlign: "center" as const,
                      fontSize: "12px",
                      color: midGray,
                    }}
                  >
                    {item.taxType} {String(item.taxRate)}%
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      textAlign: "center" as const,
                      fontSize: "12px",
                      color: midGray,
                    }}
                  >
                    {String(item.discount)}%
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      textAlign: "right" as const,
                      fontSize: "13px",
                      fontWeight: 700,
                      color: offBlack,
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
                color: offBlack,
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
                color: offBlack,
              },
              {
                label: "SGST",
                value: formatCurrency(sgst),
                show: hasSGST && sgst > 0,
                color: offBlack,
              },
              {
                label: "IGST",
                value: formatCurrency(igst),
                show: hasIGST && igst > 0,
                color: offBlack,
              },
              {
                label: "Tax",
                value: formatCurrency(Number(invoice.totalTax)),
                show:
                  Number(invoice.totalTax) > 0 &&
                  !hasCGST &&
                  !hasSGST &&
                  !hasIGST,
                color: offBlack,
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
                    borderBottom: `2px solid ${lightGray}`,
                  }}
                >
                  <span style={{ fontSize: "13px", color: midGray }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
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
                  background: black,
                  color: white,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Total
              </span>
              <span
                style={{ fontSize: "16px", fontWeight: 900, color: accent }}
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
            borderTop: "1px solid #d1d5db",
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
            background: offBlack,
            color: "#9ca3af",
            textAlign: "center" as const,
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "2px",
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        Thank you for your business
      </div>
    </div>
  );
}
