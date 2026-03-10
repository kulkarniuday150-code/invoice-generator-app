import type { BusinessProfile, Client, Invoice } from "@/backend";
import type React from "react";

interface StartupTemplateProps {
  invoice: Invoice;
  businessProfile?: BusinessProfile;
}

const purple = "#7c3aed";
const _purpleDark = "#5b21b6";
const purpleLight = "#ede9fe";
const indigo = "#4f46e5";
const white = "#ffffff";
const dark = "#1e1b4b";
const gray = "#6b7280";
const lightBg = "#f5f3ff";
const borderColor = "#ddd6fe";
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

export default function StartupTemplate({
  invoice,
  businessProfile,
}: StartupTemplateProps) {
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
          background: white,
          color: dark,
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 32px rgba(124,58,237,0.15)",
          borderRadius: "16px",
          overflow: "hidden",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Gradient accent bar */}
      <div
        style={
          {
            height: "8px",
            background: `linear-gradient(90deg, ${purple} 0%, ${indigo} 50%, #06b6d4 100%)`,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      />

      {/* Header */}
      <div
        style={{
          padding: "36px 44px 28px 44px",
          background: white,
          borderBottom: `1px solid ${borderColor}`,
        }}
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
                fontSize: "22px",
                fontWeight: 800,
                color: dark,
                letterSpacing: "-0.5px",
              }}
            >
              {businessProfile?.businessName || "Your Business"}
            </div>
            {businessProfile?.gstNumber && (
              <div style={{ fontSize: "11px", color: gray, marginTop: "3px" }}>
                GSTIN: {businessProfile.gstNumber}
              </div>
            )}
            {businessProfile?.address && (
              <div
                style={{
                  fontSize: "11px",
                  color: gray,
                  marginTop: "2px",
                  maxWidth: "220px",
                }}
              >
                {businessProfile.address}
              </div>
            )}
            {businessProfile?.phone && (
              <div style={{ fontSize: "11px", color: gray, marginTop: "2px" }}>
                {businessProfile.phone}
              </div>
            )}
            {businessProfile?.email && (
              <div style={{ fontSize: "11px", color: gray, marginTop: "2px" }}>
                {businessProfile.email}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" as const }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                background: purpleLight,
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 700,
                color: purple,
                textTransform: "uppercase" as const,
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              Invoice
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: dark }}>
              #{String(invoice.invoiceNumber).padStart(4, "0")}
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: "8px",
                padding: "4px 12px",
                borderRadius: "20px",
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
            background: lightBg,
            borderBottom: `1px solid ${borderColor}`,
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
              color: purple,
              textTransform: "uppercase" as const,
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "15px", color: dark }}>
            {client.name}
          </div>
          {client.companyName && (
            <div style={{ fontSize: "13px", color: gray }}>
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div style={{ fontSize: "12px", color: gray }}>
              GSTIN: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div style={{ fontSize: "12px", color: gray, maxWidth: "200px" }}>
              {client.address}
            </div>
          )}
          {client.phone && (
            <div style={{ fontSize: "12px", color: gray }}>{client.phone}</div>
          )}
          {client.email && (
            <div style={{ fontSize: "12px", color: gray }}>{client.email}</div>
          )}
        </div>
        <div style={{ textAlign: "right" as const }}>
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: purple,
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
              }}
            >
              Invoice Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: dark }}>
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: purple,
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
              }}
            >
              Due Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: dark }}>
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
                  background: `linear-gradient(90deg, ${purple} 0%, ${indigo} 100%)`,
                  color: white,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <th
                style={{
                  padding: "11px 12px",
                  textAlign: "left" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
                }}
              >
                Item
              </th>
              <th
                style={{
                  padding: "11px 12px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: "11px 12px",
                  textAlign: "right" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
                }}
              >
                Rate
              </th>
              <th
                style={{
                  padding: "11px 12px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
                }}
              >
                Tax
              </th>
              <th
                style={{
                  padding: "11px 12px",
                  textAlign: "center" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
                }}
              >
                Disc%
              </th>
              <th
                style={{
                  padding: "11px 12px",
                  textAlign: "right" as const,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
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
                    borderBottom: `1px solid ${borderColor}`,
                    background: idx % 2 === 0 ? white : lightBg,
                  }}
                >
                  <td
                    style={{
                      padding: "11px 12px",
                      fontSize: "13px",
                      color: dark,
                    }}
                  >
                    {item.itemName}
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "center" as const,
                      fontSize: "13px",
                      color: gray,
                    }}
                  >
                    {String(item.quantity)}
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "right" as const,
                      fontSize: "13px",
                      color: gray,
                    }}
                  >
                    {formatCurrency(Number(item.rate))}
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "center" as const,
                      fontSize: "12px",
                      color: gray,
                    }}
                  >
                    {item.taxType} {String(item.taxRate)}%
                  </td>
                  <td
                    style={{
                      padding: "11px 12px",
                      textAlign: "center" as const,
                      fontSize: "12px",
                      color: gray,
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
                      color: purple,
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
                color: dark,
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
                color: dark,
              },
              {
                label: "SGST",
                value: formatCurrency(sgst),
                show: hasSGST && sgst > 0,
                color: dark,
              },
              {
                label: "IGST",
                value: formatCurrency(igst),
                show: hasIGST && igst > 0,
                color: dark,
              },
              {
                label: "Tax",
                value: formatCurrency(Number(invoice.totalTax)),
                show:
                  Number(invoice.totalTax) > 0 &&
                  !hasCGST &&
                  !hasSGST &&
                  !hasIGST,
                color: dark,
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
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  <span style={{ fontSize: "13px", color: gray }}>
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
                  background: `linear-gradient(135deg, ${purple} 0%, ${indigo} 100%)`,
                  borderRadius: "12px",
                  color: white,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <span style={{ fontSize: "15px", fontWeight: 800 }}>
                Grand Total
              </span>
              <span style={{ fontSize: "15px", fontWeight: 900 }}>
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
            padding: "16px 44px",
            background: purpleLight,
            borderTop: `1px solid ${borderColor}`,
            textAlign: "center" as const,
            fontSize: "12px",
            color: purple,
            fontWeight: 600,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        Thank you for your business! 🚀
      </div>
    </div>
  );
}
