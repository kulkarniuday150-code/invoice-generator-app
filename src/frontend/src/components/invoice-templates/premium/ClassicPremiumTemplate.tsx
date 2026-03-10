import type { BusinessProfile, Client, Invoice } from "@/backend";
import type React from "react";

interface ClassicPremiumTemplateProps {
  invoice: Invoice;
  businessProfile?: BusinessProfile;
}

const white = "#ffffff";
const offWhite = "#fafafa";
const _black = "#000000";
const nearBlack = "#111111";
const darkGray = "#333333";
const midGray = "#555555";
const _lightGray = "#888888";
const borderDark = "#333333";
const borderLight = "#cccccc";
const borderDouble = "#999999";
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

export default function ClassicPremiumTemplate({
  invoice,
  businessProfile,
}: ClassicPremiumTemplateProps) {
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
          fontFamily: "'Courier New', Courier, monospace",
          background: white,
          color: nearBlack,
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          border: `3px double ${borderDark}`,
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Inner border */}
      <div
        style={
          {
            margin: "6px",
            border: `1px solid ${borderDark}`,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        {/* Header */}
        <div
          style={
            {
              background: offWhite,
              padding: "28px 36px",
              borderBottom: `3px double ${borderDark}`,
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
                    height: "40px",
                    marginBottom: "10px",
                    objectFit: "contain",
                  }}
                />
              )}
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: nearBlack,
                  letterSpacing: "1px",
                  textTransform: "uppercase" as const,
                }}
              >
                {businessProfile?.businessName || "Your Business"}
              </div>
              {businessProfile?.gstNumber && (
                <div
                  style={{ fontSize: "11px", color: midGray, marginTop: "4px" }}
                >
                  GSTIN: {businessProfile.gstNumber}
                </div>
              )}
              {businessProfile?.address && (
                <div
                  style={{
                    fontSize: "11px",
                    color: midGray,
                    marginTop: "2px",
                    maxWidth: "220px",
                  }}
                >
                  {businessProfile.address}
                </div>
              )}
              {businessProfile?.phone && (
                <div
                  style={{ fontSize: "11px", color: midGray, marginTop: "2px" }}
                >
                  {businessProfile.phone}
                </div>
              )}
              {businessProfile?.email && (
                <div
                  style={{ fontSize: "11px", color: midGray, marginTop: "2px" }}
                >
                  {businessProfile.email}
                </div>
              )}
            </div>
            <div style={{ textAlign: "right" as const }}>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: nearBlack,
                  letterSpacing: "3px",
                  textTransform: "uppercase" as const,
                }}
              >
                INVOICE
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: darkGray,
                  marginTop: "4px",
                  letterSpacing: "1px",
                }}
              >
                No. #{String(invoice.invoiceNumber).padStart(4, "0")}
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "3px 12px",
                  border: `1px solid ${borderDark}`,
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
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
              padding: "20px 36px",
              background: white,
              borderBottom: `3px double ${borderDark}`,
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
                color: nearBlack,
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
                marginBottom: "8px",
                borderBottom: `1px solid ${borderDark}`,
                paddingBottom: "4px",
              }}
            >
              Bill To
            </div>
            <div
              style={{ fontWeight: 700, fontSize: "14px", color: nearBlack }}
            >
              {client.name}
            </div>
            {client.companyName && (
              <div style={{ fontSize: "12px", color: midGray }}>
                {client.companyName}
              </div>
            )}
            {client.gstNumber && (
              <div style={{ fontSize: "11px", color: midGray }}>
                GSTIN: {client.gstNumber}
              </div>
            )}
            {client.address && (
              <div
                style={{ fontSize: "11px", color: midGray, maxWidth: "200px" }}
              >
                {client.address}
              </div>
            )}
            {client.phone && (
              <div style={{ fontSize: "11px", color: midGray }}>
                {client.phone}
              </div>
            )}
            {client.email && (
              <div style={{ fontSize: "11px", color: midGray }}>
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
                  color: nearBlack,
                  textTransform: "uppercase" as const,
                  letterSpacing: "2px",
                }}
              >
                Invoice Date
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: darkGray,
                  fontFamily: "'Courier New', monospace",
                }}
              >
                {invoice.invoiceDate}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: nearBlack,
                  textTransform: "uppercase" as const,
                  letterSpacing: "2px",
                }}
              >
                Due Date
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: darkGray,
                  fontFamily: "'Courier New', monospace",
                }}
              >
                {invoice.dueDate}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ padding: "20px 36px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse" as const,
              border: `1px solid ${borderDark}`,
            }}
          >
            <thead>
              <tr
                style={
                  {
                    background: nearBlack,
                    color: white,
                    printColorAdjust: "exact",
                    WebkitPrintColorAdjust: "exact",
                  } as React.CSSProperties
                }
              >
                <th
                  style={{
                    padding: "9px 12px",
                    textAlign: "left" as const,
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "1px",
                    borderRight: `1px solid ${borderDouble}`,
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: "9px 12px",
                    textAlign: "center" as const,
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "1px",
                    borderRight: `1px solid ${borderDouble}`,
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    padding: "9px 12px",
                    textAlign: "right" as const,
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "1px",
                    borderRight: `1px solid ${borderDouble}`,
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    padding: "9px 12px",
                    textAlign: "center" as const,
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "1px",
                    borderRight: `1px solid ${borderDouble}`,
                  }}
                >
                  Tax
                </th>
                <th
                  style={{
                    padding: "9px 12px",
                    textAlign: "center" as const,
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "1px",
                    borderRight: `1px solid ${borderDouble}`,
                  }}
                >
                  Disc%
                </th>
                <th
                  style={{
                    padding: "9px 12px",
                    textAlign: "right" as const,
                    fontSize: "11px",
                    fontWeight: 700,
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
                      borderBottom: `1px solid ${borderLight}`,
                      background: idx % 2 === 0 ? white : offWhite,
                    }}
                  >
                    <td
                      style={{
                        padding: "9px 12px",
                        fontSize: "12px",
                        color: nearBlack,
                        borderRight: `1px solid ${borderLight}`,
                      }}
                    >
                      {item.itemName}
                    </td>
                    <td
                      style={{
                        padding: "9px 12px",
                        textAlign: "center" as const,
                        fontSize: "12px",
                        color: midGray,
                        borderRight: `1px solid ${borderLight}`,
                      }}
                    >
                      {String(item.quantity)}
                    </td>
                    <td
                      style={{
                        padding: "9px 12px",
                        textAlign: "right" as const,
                        fontSize: "12px",
                        color: midGray,
                        borderRight: `1px solid ${borderLight}`,
                      }}
                    >
                      {formatCurrency(Number(item.rate))}
                    </td>
                    <td
                      style={{
                        padding: "9px 12px",
                        textAlign: "center" as const,
                        fontSize: "11px",
                        color: midGray,
                        borderRight: `1px solid ${borderLight}`,
                      }}
                    >
                      {item.taxType} {String(item.taxRate)}%
                    </td>
                    <td
                      style={{
                        padding: "9px 12px",
                        textAlign: "center" as const,
                        fontSize: "11px",
                        color: midGray,
                        borderRight: `1px solid ${borderLight}`,
                      }}
                    >
                      {String(item.discount)}%
                    </td>
                    <td
                      style={{
                        padding: "9px 12px",
                        textAlign: "right" as const,
                        fontSize: "12px",
                        fontWeight: 700,
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <div
              style={{ minWidth: "260px", border: `1px solid ${borderDark}` }}
            >
              {[
                {
                  label: "Subtotal",
                  value: formatCurrency(Number(invoice.subtotal)),
                  show: true,
                  color: nearBlack,
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
                  color: nearBlack,
                },
                {
                  label: "SGST",
                  value: formatCurrency(sgst),
                  show: hasSGST && sgst > 0,
                  color: nearBlack,
                },
                {
                  label: "IGST",
                  value: formatCurrency(igst),
                  show: hasIGST && igst > 0,
                  color: nearBlack,
                },
                {
                  label: "Tax",
                  value: formatCurrency(Number(invoice.totalTax)),
                  show:
                    Number(invoice.totalTax) > 0 &&
                    !hasCGST &&
                    !hasSGST &&
                    !hasIGST,
                  color: nearBlack,
                },
              ]
                .filter((r) => r.show)
                .map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 14px",
                      borderBottom: `1px solid ${borderLight}`,
                    }}
                  >
                    <span style={{ fontSize: "12px", color: midGray }}>
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
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
                    padding: "12px 14px",
                    background: nearBlack,
                    color: white,
                    borderTop: `3px double ${borderDouble}`,
                    printColorAdjust: "exact",
                    WebkitPrintColorAdjust: "exact",
                  } as React.CSSProperties
                }
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "1px",
                  }}
                >
                  Grand Total
                </span>
                <span style={{ fontSize: "14px", fontWeight: 700 }}>
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
              padding: "14px 36px",
              background: offWhite,
              borderTop: `3px double ${borderDark}`,
              textAlign: "center" as const,
              fontSize: "11px",
              color: midGray,
              letterSpacing: "1px",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact",
            } as React.CSSProperties
          }
        >
          E. &amp; O.E. — This is a computer-generated invoice. Thank you for
          your business.
        </div>
      </div>
    </div>
  );
}
