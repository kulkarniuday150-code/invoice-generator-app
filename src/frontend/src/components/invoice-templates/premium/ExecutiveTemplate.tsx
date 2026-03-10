import type { BusinessProfile, Client, Invoice } from "@/backend";
import type React from "react";

interface ExecutiveTemplateProps {
  invoice: Invoice;
  businessProfile?: BusinessProfile;
}

const slate900 = "#0f172a";
const slate800 = "#1e293b";
const slate700 = "#334155";
const slate600 = "#475569";
const slate200 = "#e2e8f0";
const slate100 = "#f1f5f9";
const gold = "#b7860b";
const goldLight = "#fef9e7";
const goldBorder = "#d4a017";
const white = "#ffffff";
const red = "#dc2626";

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

export default function ExecutiveTemplate({
  invoice,
  businessProfile,
}: ExecutiveTemplateProps) {
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
          fontFamily: "'Georgia', 'Times New Roman', serif",
          background: white,
          color: slate800,
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 32px rgba(0,0,0,0.14)",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Gold top border */}
      <div
        style={
          {
            height: "4px",
            background: goldBorder,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      />

      {/* Header */}
      <div
        style={
          {
            background: slate900,
            color: white,
            padding: "36px 44px",
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
                height: "44px",
                marginBottom: "12px",
                objectFit: "contain",
              }}
            />
          )}
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              color: goldBorder,
            }}
          >
            {businessProfile?.businessName || "Your Business"}
          </div>
          {businessProfile?.gstNumber && (
            <div
              style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}
            >
              GSTIN: {businessProfile.gstNumber}
            </div>
          )}
          {businessProfile?.address && (
            <div
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                marginTop: "2px",
                maxWidth: "220px",
              }}
            >
              {businessProfile.address}
            </div>
          )}
          {businessProfile?.phone && (
            <div
              style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}
            >
              {businessProfile.phone}
            </div>
          )}
          {businessProfile?.email && (
            <div
              style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}
            >
              {businessProfile.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: goldBorder,
              marginBottom: "8px",
            }}
          >
            Invoice
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, color: white }}>
            #{String(invoice.invoiceNumber).padStart(4, "0")}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "4px 14px",
              border: `1px solid ${goldBorder}`,
              borderRadius: "2px",
              background: statusStyle.bg,
              color: statusStyle.color,
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {String(invoice.paymentStatus)}
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div
        style={
          {
            height: "2px",
            background: `linear-gradient(90deg, ${goldBorder} 0%, transparent 100%)`,
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
            background: goldLight,
            borderBottom: `1px solid ${goldBorder}`,
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
              fontSize: "10px",
              fontWeight: 700,
              color: gold,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: slate900 }}>
            {client.name}
          </div>
          {client.companyName && (
            <div style={{ fontSize: "13px", color: slate600 }}>
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div style={{ fontSize: "12px", color: slate600 }}>
              GSTIN: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div
              style={{ fontSize: "12px", color: slate600, maxWidth: "200px" }}
            >
              {client.address}
            </div>
          )}
          {client.phone && (
            <div style={{ fontSize: "12px", color: slate600 }}>
              {client.phone}
            </div>
          )}
          {client.email && (
            <div style={{ fontSize: "12px", color: slate600 }}>
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: gold,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Invoice Date
            </div>
            <div style={{ fontSize: "14px", color: slate700 }}>
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: gold,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Due Date
            </div>
            <div style={{ fontSize: "14px", color: slate700 }}>
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: "28px 44px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={
                {
                  borderTop: `2px solid ${goldBorder}`,
                  borderBottom: `2px solid ${goldBorder}`,
                  background: goldLight,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: gold,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: gold,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: gold,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Rate
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: gold,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Tax
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: gold,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Disc%
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: gold,
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
              const lt = Number(item.quantity) * Number(item.rate);
              const disc = (lt * Number(item.discount)) / 100;
              const taxable = lt - disc;
              const tax = (taxable * Number(item.taxRate)) / 100;
              return (
                <tr
                  key={`${item.itemName}-${idx}`}
                  style={{
                    borderBottom: `1px solid ${slate200}`,
                    background: idx % 2 === 0 ? white : slate100,
                  }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: "13px",
                      color: slate800,
                    }}
                  >
                    {item.itemName}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "13px",
                      color: slate600,
                    }}
                  >
                    {String(item.quantity)}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      color: slate600,
                    }}
                  >
                    {formatCurrency(Number(item.rate))}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: slate600,
                    }}
                  >
                    {item.taxType} {String(item.taxRate)}%
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: slate600,
                    }}
                  >
                    {String(item.discount)}%
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: slate800,
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
                color: slate800,
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
                color: slate800,
              },
              {
                label: "SGST",
                value: formatCurrency(sgst),
                show: hasSGST && sgst > 0,
                color: slate800,
              },
              {
                label: "IGST",
                value: formatCurrency(igst),
                show: hasIGST && igst > 0,
                color: slate800,
              },
              {
                label: "Tax",
                value: formatCurrency(Number(invoice.totalTax)),
                show:
                  Number(invoice.totalTax) > 0 &&
                  !hasCGST &&
                  !hasSGST &&
                  !hasIGST,
                color: slate800,
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
                    borderBottom: `1px solid ${slate200}`,
                  }}
                >
                  <span style={{ fontSize: "13px", color: slate600 }}>
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
                  padding: "12px 16px",
                  marginTop: "8px",
                  background: slate900,
                  color: white,
                  borderLeft: `4px solid ${goldBorder}`,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                }}
              >
                Grand Total
              </span>
              <span
                style={{ fontSize: "15px", fontWeight: 800, color: goldBorder }}
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
            padding: "16px 44px",
            background: slate900,
            color: "#94a3b8",
            textAlign: "center",
            fontSize: "12px",
            borderTop: `2px solid ${goldBorder}`,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        Thank you for your business. We appreciate your trust.
      </div>
    </div>
  );
}
