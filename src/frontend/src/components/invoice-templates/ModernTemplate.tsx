import type { BusinessProfile, Client, Invoice } from "@/backend";
import type React from "react";

interface ModernTemplateProps {
  invoice: Invoice;
  businessProfile?: BusinessProfile;
}

const teal = "#0d9488";
const tealDark = "#0f766e";
const _tealLight = "#ccfbf1";
const white = "#ffffff";
const gray50 = "#f8fafc";
const gray100 = "#f1f5f9";
const gray200 = "#e2e8f0";
const gray600 = "#475569";
const gray700 = "#334155";
const gray800 = "#1e293b";
const gray900 = "#0f172a";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function getStatusColor(status: string): { bg: string; color: string } {
  switch (status) {
    case "paid":
      return { bg: "#dcfce7", color: "#166534" };
    case "partial":
      return { bg: "#fef9c3", color: "#854d0e" };
    default:
      return { bg: "#fee2e2", color: "#991b1b" };
  }
}

export default function ModernTemplate({
  invoice,
  businessProfile,
}: ModernTemplateProps) {
  const statusColors = getStatusColor(String(invoice.paymentStatus));
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
          fontFamily: "'Segoe UI', Arial, sans-serif",
          background: white,
          color: gray800,
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          borderRadius: "12px",
          overflow: "hidden",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div
        style={
          {
            background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
            color: white,
            padding: "36px 40px 28px 40px",
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
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            {businessProfile?.businessName || "Your Business"}
          </div>
          {businessProfile?.gstNumber && (
            <div style={{ fontSize: "12px", opacity: 0.85, marginTop: "2px" }}>
              GST: {businessProfile.gstNumber}
            </div>
          )}
          {businessProfile?.address && (
            <div
              style={{
                fontSize: "12px",
                opacity: 0.75,
                marginTop: "2px",
                maxWidth: "220px",
              }}
            >
              {businessProfile.address}
            </div>
          )}
          {businessProfile?.phone && (
            <div style={{ fontSize: "12px", opacity: 0.75, marginTop: "2px" }}>
              {businessProfile.phone}
            </div>
          )}
          {businessProfile?.email && (
            <div style={{ fontSize: "12px", opacity: 0.75, marginTop: "2px" }}>
              {businessProfile.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-1px",
              opacity: 0.95,
            }}
          >
            INVOICE
          </div>
          <div style={{ fontSize: "14px", opacity: 0.85, marginTop: "4px" }}>
            #{String(invoice.invoiceNumber).padStart(4, "0")}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "4px 14px",
              borderRadius: "20px",
              background: statusColors.bg,
              color: statusColors.color,
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {String(invoice.paymentStatus)}
          </div>
        </div>
      </div>

      {/* Dates + Client */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px 40px",
          background: gray50,
          borderBottom: `1px solid ${gray200}`,
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: gray600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "4px",
            }}
          >
            Bill To
          </div>
          <div style={{ fontWeight: 700, fontSize: "15px", color: gray900 }}>
            {client.name}
          </div>
          {client.companyName && (
            <div style={{ fontSize: "13px", color: gray600 }}>
              {client.companyName}
            </div>
          )}
          {client.gstNumber && (
            <div style={{ fontSize: "12px", color: gray600 }}>
              GST: {client.gstNumber}
            </div>
          )}
          {client.address && (
            <div
              style={{ fontSize: "12px", color: gray600, maxWidth: "200px" }}
            >
              {client.address}
            </div>
          )}
          {client.phone && (
            <div style={{ fontSize: "12px", color: gray600 }}>
              {client.phone}
            </div>
          )}
          {client.email && (
            <div style={{ fontSize: "12px", color: gray600 }}>
              {client.email}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "8px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: gray600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Invoice Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: gray800 }}>
              {invoice.invoiceDate}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: gray600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Due Date
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: gray800 }}>
              {invoice.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div style={{ padding: "0 40px 24px 40px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "24px",
          }}
        >
          <thead>
            <tr style={{ background: teal, color: white }}>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Item
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  fontSize: "12px",
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
                  fontSize: "12px",
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
                  fontSize: "12px",
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
                  fontSize: "12px",
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
                  fontSize: "12px",
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
              const lineTotal = Number(item.quantity) * Number(item.rate);
              const discountAmt = (lineTotal * Number(item.discount)) / 100;
              const taxableAmt = lineTotal - discountAmt;
              const taxAmt = (taxableAmt * Number(item.taxRate)) / 100;
              const total = taxableAmt + taxAmt;
              return (
                <tr
                  key={`${item.itemName}-${idx}`}
                  style={{ background: idx % 2 === 0 ? white : gray50 }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: "13px",
                      color: gray800,
                      borderBottom: `1px solid ${gray100}`,
                    }}
                  >
                    {item.itemName}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "13px",
                      color: gray700,
                      borderBottom: `1px solid ${gray100}`,
                    }}
                  >
                    {String(item.quantity)}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      color: gray700,
                      borderBottom: `1px solid ${gray100}`,
                    }}
                  >
                    {formatCurrency(Number(item.rate))}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: gray600,
                      borderBottom: `1px solid ${gray100}`,
                    }}
                  >
                    {item.taxType} {String(item.taxRate)}%
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: gray600,
                      borderBottom: `1px solid ${gray100}`,
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
                      color: gray800,
                      borderBottom: `1px solid ${gray100}`,
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
            marginTop: "16px",
          }}
        >
          <div style={{ minWidth: "260px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: `1px solid ${gray200}`,
              }}
            >
              <span style={{ fontSize: "13px", color: gray600 }}>Subtotal</span>
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: gray800 }}
              >
                {formatCurrency(Number(invoice.subtotal))}
              </span>
            </div>
            {Number(invoice.totalDiscount) > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: `1px solid ${gray200}`,
                }}
              >
                <span style={{ fontSize: "13px", color: gray600 }}>
                  Discount
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#dc2626",
                  }}
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
                  padding: "6px 0",
                  borderBottom: `1px solid ${gray200}`,
                }}
              >
                <span style={{ fontSize: "13px", color: gray600 }}>CGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: gray800 }}
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
                  padding: "6px 0",
                  borderBottom: `1px solid ${gray200}`,
                }}
              >
                <span style={{ fontSize: "13px", color: gray600 }}>SGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: gray800 }}
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
                  padding: "6px 0",
                  borderBottom: `1px solid ${gray200}`,
                }}
              >
                <span style={{ fontSize: "13px", color: gray600 }}>IGST</span>
                <span
                  style={{ fontSize: "13px", fontWeight: 600, color: gray800 }}
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
                    padding: "6px 0",
                    borderBottom: `1px solid ${gray200}`,
                  }}
                >
                  <span style={{ fontSize: "13px", color: gray600 }}>Tax</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: gray800,
                    }}
                  >
                    {formatCurrency(Number(invoice.totalTax))}
                  </span>
                </div>
              )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                marginTop: "8px",
                background: teal,
                borderRadius: "8px",
                color: white,
              }}
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

      {/* Footer */}
      <div
        style={{
          padding: "16px 40px",
          background: gray50,
          borderTop: `1px solid ${gray200}`,
          textAlign: "center",
          fontSize: "12px",
          color: gray600,
        }}
      >
        Thank you for your business!
      </div>
    </div>
  );
}
