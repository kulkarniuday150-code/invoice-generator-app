import type { BusinessProfile, Client, InvoiceWithExtras } from "@/backend";
import type React from "react";

interface CorporateTemplateProps {
  invoice: InvoiceWithExtras;
  businessProfile?: BusinessProfile;
}

const navy = "#1e3a5f";
const navyDark = "#152b47";
const navyLight = "#e8eef5";
const charcoal = "#2d3748";
const silver = "#718096";
const lightGray = "#f7f8fa";
const borderGray = "#d1d9e0";
const white = "#ffffff";
const red = "#e53e3e";

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
      return { bg: "#c6f6d5", color: "#276749" };
    case "partial":
      return { bg: "#fefcbf", color: "#744210" };
    default:
      return { bg: "#fed7d7", color: "#9b2c2c" };
  }
}

function calcTaxTotals(invoice: InvoiceWithExtras) {
  const cgst = invoice.lineItems
    .filter((i) => i.taxType === "CGST")
    .reduce((s, i) => {
      const lt = Number(i.quantity) * Number(i.rate);
      return (
        s + ((lt - (lt * Number(i.discount)) / 100) * Number(i.taxRate)) / 100
      );
    }, 0);
  const sgst = invoice.lineItems
    .filter((i) => i.taxType === "SGST")
    .reduce((s, i) => {
      const lt = Number(i.quantity) * Number(i.rate);
      return (
        s + ((lt - (lt * Number(i.discount)) / 100) * Number(i.taxRate)) / 100
      );
    }, 0);
  const igst = invoice.lineItems
    .filter((i) => i.taxType === "IGST")
    .reduce((s, i) => {
      const lt = Number(i.quantity) * Number(i.rate);
      return (
        s + ((lt - (lt * Number(i.discount)) / 100) * Number(i.taxRate)) / 100
      );
    }, 0);
  return { cgst, sgst, igst };
}

export default function CorporateTemplate({
  invoice,
  businessProfile,
}: CorporateTemplateProps) {
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
          fontFamily: "'Segoe UI', Arial, sans-serif",
          background: white,
          color: charcoal,
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Top accent bar */}
      <div
        style={
          {
            height: "6px",
            background: `linear-gradient(90deg, ${navy} 0%, #2b6cb0 100%)`,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      />

      {/* Header */}
      <div
        style={
          {
            background: navyDark,
            color: white,
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
                height: "44px",
                marginBottom: "10px",
                objectFit: "contain",
              }}
            />
          )}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.3px",
            }}
          >
            {businessProfile?.businessName || "Your Business"}
          </div>
          {businessProfile?.gstNumber && (
            <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "3px" }}>
              GSTIN: {businessProfile.gstNumber}
            </div>
          )}
          {businessProfile?.address && (
            <div
              style={{
                fontSize: "11px",
                opacity: 0.65,
                marginTop: "2px",
                maxWidth: "220px",
              }}
            >
              {businessProfile.address}
            </div>
          )}
          {businessProfile?.phone && (
            <div style={{ fontSize: "11px", opacity: 0.65, marginTop: "2px" }}>
              {businessProfile.phone}
            </div>
          )}
          {businessProfile?.email && (
            <div style={{ fontSize: "11px", opacity: 0.65, marginTop: "2px" }}>
              {businessProfile.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: "6px",
            }}
          >
            Tax Invoice
          </div>
          <div
            style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-1px" }}
          >
            #{String(invoice.invoiceNumber).padStart(4, "0")}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "4px 12px",
              borderRadius: "4px",
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

      {/* Info row */}
      <div
        style={
          {
            display: "flex",
            justifyContent: "space-between",
            padding: "24px 40px",
            background: navyLight,
            borderBottom: `1px solid ${borderGray}`,
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
              color: navy,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "6px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "15px", color: charcoal }}>
            {client.name}
          </div>
          {client.companyName && (
            <div style={{ fontSize: "13px", color: silver }}>
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div style={{ fontSize: "12px", color: silver }}>
              GSTIN: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div style={{ fontSize: "12px", color: silver, maxWidth: "200px" }}>
              {client.address}
            </div>
          )}
          {client.phone && (
            <div style={{ fontSize: "12px", color: silver }}>
              {client.phone}
            </div>
          )}
          {client.email && (
            <div style={{ fontSize: "12px", color: silver }}>
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "8px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: navy,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Invoice Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: charcoal }}>
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: navy,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Due Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: charcoal }}>
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: "24px 40px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={
                {
                  background: navy,
                  color: white,
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
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Item / Description
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  fontSize: "11px",
                  fontWeight: 600,
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
                  fontSize: "11px",
                  fontWeight: 600,
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
                  fontSize: "11px",
                  fontWeight: 600,
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
                  fontSize: "11px",
                  fontWeight: 600,
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
                  fontSize: "11px",
                  fontWeight: 600,
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
              const lt = Number(item.quantity) * Number(item.rate);
              const disc = (lt * Number(item.discount)) / 100;
              const taxable = lt - disc;
              const tax = (taxable * Number(item.taxRate)) / 100;
              return (
                <tr
                  key={`${item.itemName}-${idx}`}
                  style={{
                    background: idx % 2 === 0 ? white : lightGray,
                    borderBottom: `1px solid ${borderGray}`,
                  }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: "13px",
                      color: charcoal,
                    }}
                  >
                    {item.itemName}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "13px",
                      color: silver,
                    }}
                  >
                    {String(item.quantity)}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      color: silver,
                    }}
                  >
                    {formatCurrency(Number(item.rate))}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: silver,
                    }}
                  >
                    {item.taxType} {String(item.taxRate)}%
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: silver,
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
                      color: charcoal,
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
            style={{
              minWidth: "260px",
              border: `1px solid ${borderGray}`,
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 16px",
                borderBottom: `1px solid ${borderGray}`,
              }}
            >
              <span style={{ fontSize: "13px", color: silver }}>Subtotal</span>
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: charcoal }}
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
                  borderBottom: `1px solid ${borderGray}`,
                }}
              >
                <span style={{ fontSize: "13px", color: silver }}>
                  Discount
                </span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: red }}>
                  -{formatCurrency(Number(invoice.totalDiscount))}
                </span>
              </div>
            )}
            {hasCGST && cgst > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${borderGray}`,
                }}
              >
                <span style={{ fontSize: "13px", color: silver }}>CGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: charcoal }}
                >
                  {formatCurrency(cgst)}
                </span>
              </div>
            )}
            {hasSGST && sgst > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${borderGray}`,
                }}
              >
                <span style={{ fontSize: "13px", color: silver }}>SGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: charcoal }}
                >
                  {formatCurrency(sgst)}
                </span>
              </div>
            )}
            {hasIGST && igst > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${borderGray}`,
                }}
              >
                <span style={{ fontSize: "13px", color: silver }}>IGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: charcoal }}
                >
                  {formatCurrency(igst)}
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
                    borderBottom: `1px solid ${borderGray}`,
                  }}
                >
                  <span style={{ fontSize: "13px", color: silver }}>Tax</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: charcoal,
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
                  background: navy,
                  color: white,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact",
                } as React.CSSProperties
              }
            >
              <span style={{ fontSize: "14px", fontWeight: 700 }}>
                Grand Total
              </span>
              <span style={{ fontSize: "14px", fontWeight: 800 }}>
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
                  color: "#1e3a5f",
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
                  color: "#475569",
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
                  color: "#1e3a5f",
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
                  color: "#475569",
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
            padding: "14px 40px",
            background: navyLight,
            borderTop: `1px solid ${borderGray}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          } as React.CSSProperties
        }
      >
        <span style={{ fontSize: "12px", color: silver }}>
          Thank you for your business.
        </span>
        <span style={{ fontSize: "11px", color: silver, fontStyle: "italic" }}>
          This is a computer-generated invoice.
        </span>
      </div>
    </div>
  );
}
