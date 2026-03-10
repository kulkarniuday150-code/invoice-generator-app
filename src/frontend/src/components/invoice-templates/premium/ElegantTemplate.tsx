import type { BusinessProfile, Client, Invoice } from "@/backend";
import type React from "react";

interface ElegantTemplateProps {
  invoice: Invoice;
  businessProfile?: BusinessProfile;
}

const ivory = "#fdfaf5";
const _ivoryDark = "#f5f0e8";
const warmWhite = "#fffef9";
const gold = "#c9a84c";
const goldDark = "#a07830";
const goldLight = "#f7f0e0";
const brown = "#5c4a2a";
const brownLight = "#8b7355";
const brownMid = "#7a6040";
const hairline = "#e8dfc8";
const _white = "#ffffff";
const red = "#c0392b";

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
      return { bg: "#d5f5e3", color: "#1e8449" };
    case "partial":
      return { bg: "#fef9e7", color: "#9a7d0a" };
    default:
      return { bg: "#fadbd8", color: "#922b21" };
  }
}

function calcTaxTotals(invoice: Invoice) {
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

export default function ElegantTemplate({
  invoice,
  businessProfile,
}: ElegantTemplateProps) {
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
          fontFamily: "'Georgia', 'Palatino Linotype', serif",
          background: ivory,
          color: brown,
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
          border: `1px solid ${hairline}`,
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Top gold line */}
      <div
        style={
          {
            height: "3px",
            background: gold,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      />

      {/* Header */}
      <div
        style={
          {
            background: ivory,
            padding: "40px 48px 32px 48px",
            borderBottom: `1px solid ${hairline}`,
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
                }}
              />
            )}
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: brown,
                letterSpacing: "0.5px",
              }}
            >
              {businessProfile?.businessName || "Your Business"}
            </div>
            {businessProfile?.gstNumber && (
              <div
                style={{
                  fontSize: "11px",
                  color: brownLight,
                  marginTop: "4px",
                  fontStyle: "italic" as const,
                }}
              >
                GSTIN: {businessProfile.gstNumber}
              </div>
            )}
            {businessProfile?.address && (
              <div
                style={{
                  fontSize: "11px",
                  color: brownLight,
                  marginTop: "2px",
                  maxWidth: "220px",
                }}
              >
                {businessProfile.address}
              </div>
            )}
            {businessProfile?.phone && (
              <div
                style={{
                  fontSize: "11px",
                  color: brownLight,
                  marginTop: "2px",
                }}
              >
                {businessProfile.phone}
              </div>
            )}
            {businessProfile?.email && (
              <div
                style={{
                  fontSize: "11px",
                  color: brownLight,
                  marginTop: "2px",
                }}
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
                color: gold,
                marginBottom: "8px",
              }}
            >
              Invoice
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 300,
                color: brown,
                letterSpacing: "-0.5px",
              }}
            >
              #{String(invoice.invoiceNumber).padStart(4, "0")}
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "4px 14px",
                border: `1px solid ${gold}`,
                borderRadius: "2px",
                background: statusStyle.bg,
                color: statusStyle.color,
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase" as const,
                letterSpacing: "1.5px",
              }}
            >
              {String(invoice.paymentStatus)}
            </div>
          </div>
        </div>
        {/* Thin gold divider */}
        <div
          style={{
            height: "1px",
            background: gold,
            marginTop: "28px",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Info */}
      <div
        style={
          {
            display: "flex",
            justifyContent: "space-between",
            padding: "28px 48px",
            background: goldLight,
            borderBottom: `1px solid ${hairline}`,
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
              fontSize: "9px",
              fontWeight: 700,
              color: gold,
              textTransform: "uppercase" as const,
              letterSpacing: "3px",
              marginBottom: "10px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: brown }}>
            {client.name}
          </div>
          {client.companyName && (
            <div
              style={{
                fontSize: "13px",
                color: brownLight,
                marginTop: "2px",
                fontStyle: "italic" as const,
              }}
            >
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div
              style={{ fontSize: "12px", color: brownLight, marginTop: "2px" }}
            >
              GSTIN: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div
              style={{
                fontSize: "12px",
                color: brownLight,
                marginTop: "2px",
                maxWidth: "200px",
              }}
            >
              {client.address}
            </div>
          )}
          {client.phone && (
            <div
              style={{ fontSize: "12px", color: brownLight, marginTop: "2px" }}
            >
              {client.phone}
            </div>
          )}
          {client.email && (
            <div
              style={{ fontSize: "12px", color: brownLight, marginTop: "2px" }}
            >
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" as const }}>
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                color: gold,
                textTransform: "uppercase" as const,
                letterSpacing: "3px",
              }}
            >
              Invoice Date
            </div>
            <div
              style={{ fontSize: "14px", color: brownMid, marginTop: "3px" }}
            >
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                color: gold,
                textTransform: "uppercase" as const,
                letterSpacing: "3px",
              }}
            >
              Due Date
            </div>
            <div
              style={{ fontSize: "14px", color: brownMid, marginTop: "3px" }}
            >
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: "28px 48px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
          <thead>
            <tr
              style={
                {
                  borderTop: `1px solid ${gold}`,
                  borderBottom: `1px solid ${gold}`,
                  background: goldLight,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <th
                style={{
                  padding: "10px 10px",
                  textAlign: "left" as const,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: goldDark,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1.5px",
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "10px 10px",
                  textAlign: "center" as const,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: goldDark,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1.5px",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: "10px 10px",
                  textAlign: "right" as const,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: goldDark,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1.5px",
                }}
              >
                Rate
              </th>
              <th
                style={{
                  padding: "10px 10px",
                  textAlign: "center" as const,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: goldDark,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1.5px",
                }}
              >
                Tax
              </th>
              <th
                style={{
                  padding: "10px 10px",
                  textAlign: "center" as const,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: goldDark,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1.5px",
                }}
              >
                Disc%
              </th>
              <th
                style={{
                  padding: "10px 10px",
                  textAlign: "right" as const,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: goldDark,
                  textTransform: "uppercase" as const,
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
                  style={{
                    borderBottom: `1px solid ${hairline}`,
                    background: idx % 2 === 0 ? warmWhite : ivory,
                  }}
                >
                  <td
                    style={{
                      padding: "11px 10px",
                      fontSize: "13px",
                      color: brown,
                    }}
                  >
                    {item.itemName}
                  </td>
                  <td
                    style={{
                      padding: "11px 10px",
                      textAlign: "center" as const,
                      fontSize: "13px",
                      color: brownLight,
                    }}
                  >
                    {String(item.quantity)}
                  </td>
                  <td
                    style={{
                      padding: "11px 10px",
                      textAlign: "right" as const,
                      fontSize: "13px",
                      color: brownLight,
                    }}
                  >
                    {formatCurrency(Number(item.rate))}
                  </td>
                  <td
                    style={{
                      padding: "11px 10px",
                      textAlign: "center" as const,
                      fontSize: "12px",
                      color: brownLight,
                    }}
                  >
                    {item.taxType} {String(item.taxRate)}%
                  </td>
                  <td
                    style={{
                      padding: "11px 10px",
                      textAlign: "center" as const,
                      fontSize: "12px",
                      color: brownLight,
                    }}
                  >
                    {String(item.discount)}%
                  </td>
                  <td
                    style={{
                      padding: "11px 10px",
                      textAlign: "right" as const,
                      fontSize: "13px",
                      fontWeight: 600,
                      color: brown,
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
                color: brown,
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
                color: brown,
              },
              {
                label: "SGST",
                value: formatCurrency(sgst),
                show: hasSGST && sgst > 0,
                color: brown,
              },
              {
                label: "IGST",
                value: formatCurrency(igst),
                show: hasIGST && igst > 0,
                color: brown,
              },
              {
                label: "Tax",
                value: formatCurrency(Number(invoice.totalTax)),
                show:
                  Number(invoice.totalTax) > 0 &&
                  !hasCGST &&
                  !hasSGST &&
                  !hasIGST,
                color: brown,
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
                    borderBottom: `1px solid ${hairline}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: brownLight,
                      fontStyle: "italic" as const,
                    }}
                  >
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
                  background: ivory,
                  border: `1px solid ${gold}`,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: brown,
                  letterSpacing: "0.5px",
                }}
              >
                Grand Total
              </span>
              <span
                style={{ fontSize: "15px", fontWeight: 700, color: goldDark }}
              >
                {formatCurrency(Number(invoice.grandTotal))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={
          {
            padding: "20px 48px",
            background: goldLight,
            borderTop: `1px solid ${hairline}`,
            textAlign: "center" as const,
            fontSize: "12px",
            color: brownLight,
            fontStyle: "italic" as const,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        Thank you for your patronage. We look forward to serving you again.
      </div>

      {/* Bottom gold line */}
      <div
        style={
          {
            height: "3px",
            background: gold,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
