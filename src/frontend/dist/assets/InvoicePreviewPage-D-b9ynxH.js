const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/server.browser-C_rY2Jmg.js","assets/index-D5Ia9PfW.js","assets/index-Bru-_IOX.css"])))=>i.map(i=>d[i]);
import { d as createLucideIcon, j as jsxRuntimeExports, n as Crown, a4 as useParams, Y as useNavigate, a5 as useInvoice, u as useBusinessProfile, a7 as useUpdateInvoice, r as reactExports, b as Plan, B as Button, aa as ArrowLeft, L as LoaderCircle, c as ue, F as FileText, ag as __vitePreload, R as React } from "./index-D5Ia9PfW.js";
import { S as Skeleton } from "./skeleton-QpRwiCJS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function TemplatePreviewCard({
  templateId: _templateId,
  name,
  isSelected,
  isPremium,
  isLocked,
  quality,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `relative shrink-0 w-28 rounded-xl border-2 overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isSelected ? "border-primary shadow-md" : "border-border hover:border-primary/50"} ${isLocked ? "opacity-70" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full aspect-[3/4] bg-muted flex items-center justify-center relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium px-2 text-center leading-tight", children: name }),
          isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground" }) }) }),
          quality === "hd" && !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1.5 right-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold bg-primary text-primary-foreground px-1 py-0.5 rounded", children: "HD" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `px-2 py-1.5 flex items-center justify-between gap-1 ${isSelected ? "bg-primary text-primary-foreground" : "bg-card"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-semibold truncate ${isSelected ? "text-primary-foreground" : "text-foreground"}`,
                  children: name
                }
              ),
              isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Crown,
                {
                  className: `w-3 h-3 shrink-0 ${isSelected ? "text-primary-foreground" : "text-amber-500"}`
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const amber700 = "#b45309";
const amber800 = "#92400e";
const amber100 = "#fef3c7";
const amber50 = "#fffbeb";
const cream = "#fefce8";
const brown900 = "#1c1917";
const brown700 = "#44403c";
const brown500 = "#78716c";
const brown200 = "#d6d3d1";
const brown100 = "#f5f5f4";
const white$7 = "#ffffff";
const red600$1 = "#dc2626";
function formatCurrency$8(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusStyle$7(status) {
  switch (status) {
    case "paid":
      return { bg: "#dcfce7", color: "#166534", border: "#86efac" };
    case "partial":
      return { bg: "#fef9c3", color: "#854d0e", border: "#fde047" };
    default:
      return { bg: "#fee2e2", color: "#991b1b", border: "#fca5a5" };
  }
}
function ClassicTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusStyle = getStatusStyle$7(String(invoice.paymentStatus));
  const client = invoice.client;
  const hasCGST = invoice.lineItems.some((item) => item.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((item) => item.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((item) => item.taxType === "IGST");
  const cgstTotal = invoice.lineItems.filter((item) => item.taxType === "CGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  const sgstTotal = invoice.lineItems.filter((item) => item.taxType === "SGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  const igstTotal = invoice.lineItems.filter((item) => item.taxType === "IGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        background: white$7,
        color: brown900,
        maxWidth: "800px",
        margin: "0 auto",
        border: `2px solid ${amber700}`,
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: amber50,
              borderBottom: `3px double ${amber700}`,
              padding: "32px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: businessProfile.logo.getDirectURL(),
                    alt: "Logo",
                    style: {
                      height: "48px",
                      marginBottom: "10px",
                      objectFit: "contain"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "24px",
                      fontWeight: 700,
                      color: amber800,
                      letterSpacing: "-0.5px"
                    },
                    children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { fontSize: "12px", color: brown500, marginTop: "3px" },
                    children: [
                      "GST: ",
                      businessProfile.gstNumber
                    ]
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "12px",
                      color: brown500,
                      marginTop: "2px",
                      maxWidth: "220px"
                    },
                    children: businessProfile.address
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: brown500, marginTop: "2px" },
                    children: businessProfile.phone
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: brown500, marginTop: "2px" },
                    children: businessProfile.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "36px",
                      fontWeight: 700,
                      color: amber700,
                      letterSpacing: "2px",
                      textTransform: "uppercase"
                    },
                    children: "Invoice"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "14px", color: brown700, marginTop: "4px" }, children: [
                  "No. #",
                  String(invoice.invoiceNumber).padStart(4, "0")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "4px 14px",
                      border: `1px solid ${statusStyle.border}`,
                      borderRadius: "3px",
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    },
                    children: String(invoice.paymentStatus)
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "24px 40px",
              background: cream,
              borderBottom: `1px solid ${amber100}`,
              gap: "24px",
              flexWrap: "wrap",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: amber700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bill To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: "16px", color: brown900 }, children: client.name }),
                client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "13px", color: brown700, marginTop: "2px" },
                    children: client.companyName
                  }
                ),
                client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { fontSize: "12px", color: brown500, marginTop: "2px" },
                    children: [
                      "GST: ",
                      client.gstNumber
                    ]
                  }
                ),
                client.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "12px",
                      color: brown500,
                      marginTop: "2px",
                      maxWidth: "200px"
                    },
                    children: client.address
                  }
                ),
                client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: brown500, marginTop: "2px" },
                    children: client.phone
                  }
                ),
                client.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: brown500, marginTop: "2px" },
                    children: client.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "10px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "11px",
                        fontWeight: 700,
                        color: amber700,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Invoice Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", color: brown700 }, children: invoice.invoiceDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "11px",
                        fontWeight: 700,
                        color: amber700,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Due Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", color: brown700 }, children: invoice.dueDate })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "24px 40px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                style: {
                  background: amber100,
                  borderTop: `2px solid ${amber700}`,
                  borderBottom: `2px solid ${amber700}`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: amber800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Description"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: amber800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Qty"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "right",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: amber800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Rate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: amber800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Tax"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: amber800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Disc%"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "right",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: amber800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Amount"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
              const lineTotal = Number(item.quantity) * Number(item.rate);
              const discountAmt = lineTotal * Number(item.discount) / 100;
              const taxableAmt = lineTotal - discountAmt;
              const taxAmt = taxableAmt * Number(item.taxRate) / 100;
              const total = taxableAmt + taxAmt;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  style: {
                    borderBottom: `1px solid ${brown200}`,
                    background: idx % 2 === 0 ? white$7 : brown100
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          fontSize: "13px",
                          color: brown900
                        },
                        children: item.itemName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: brown700
                        },
                        children: String(item.quantity)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "right",
                          fontSize: "13px",
                          color: brown700
                        },
                        children: formatCurrency$8(Number(item.rate))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: brown500
                        },
                        children: [
                          item.taxType,
                          " ",
                          String(item.taxRate),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: brown500
                        },
                        children: [
                          String(item.discount),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "right",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: brown900
                        },
                        children: formatCurrency$8(total)
                      }
                    )
                  ]
                },
                `${item.itemName}-${idx}`
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    minWidth: "260px",
                    border: `1px solid ${amber100}`,
                    borderRadius: "4px",
                    overflow: "hidden"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 16px",
                          borderBottom: `1px solid ${amber100}`,
                          background: white$7
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: brown500 }, children: "Subtotal" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: { fontSize: "13px", fontWeight: 600, color: brown900 },
                              children: formatCurrency$8(Number(invoice.subtotal))
                            }
                          )
                        ]
                      }
                    ),
                    Number(invoice.totalDiscount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 16px",
                          borderBottom: `1px solid ${amber100}`,
                          background: white$7
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: brown500 }, children: "Discount" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              style: { fontSize: "13px", fontWeight: 600, color: red600$1 },
                              children: [
                                "-",
                                formatCurrency$8(Number(invoice.totalDiscount))
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    hasCGST && cgstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 16px",
                          borderBottom: `1px solid ${amber100}`,
                          background: white$7
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: brown500 }, children: "CGST" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: { fontSize: "13px", fontWeight: 600, color: brown900 },
                              children: formatCurrency$8(cgstTotal)
                            }
                          )
                        ]
                      }
                    ),
                    hasSGST && sgstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 16px",
                          borderBottom: `1px solid ${amber100}`,
                          background: white$7
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: brown500 }, children: "SGST" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: { fontSize: "13px", fontWeight: 600, color: brown900 },
                              children: formatCurrency$8(sgstTotal)
                            }
                          )
                        ]
                      }
                    ),
                    hasIGST && igstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 16px",
                          borderBottom: `1px solid ${amber100}`,
                          background: white$7
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: brown500 }, children: "IGST" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: { fontSize: "13px", fontWeight: 600, color: brown900 },
                              children: formatCurrency$8(igstTotal)
                            }
                          )
                        ]
                      }
                    ),
                    Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 16px",
                          borderBottom: `1px solid ${amber100}`,
                          background: white$7
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: brown500 }, children: "Tax" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                fontSize: "13px",
                                fontWeight: 600,
                                color: brown900
                              },
                              children: formatCurrency$8(Number(invoice.totalTax))
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          background: amber700,
                          color: white$7,
                          printColorAdjust: "exact",
                          WebkitPrintColorAdjust: "exact"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 700 }, children: "Grand Total" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 800 }, children: formatCurrency$8(Number(invoice.grandTotal)) })
                        ]
                      }
                    )
                  ]
                }
              )
            }
          )
        ] }),
        ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "24px",
              padding: "16px 40px",
              background: "#fffbf0",
              borderTop: "1px solid #f59e0b",
              flexWrap: "wrap"
            },
            children: [
              ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#78350f",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#92400e",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                  }
                )
              ] }),
              ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#78350f",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bank Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#92400e",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                  }
                )
              ] })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "16px 40px",
              background: amber50,
              borderTop: `2px solid ${amber100}`,
              textAlign: "center",
              fontSize: "13px",
              color: brown500,
              fontStyle: "italic",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: "Thank you for your business. Please make payment by the due date."
          }
        )
      ]
    }
  );
}
const slate900 = "#0f172a";
const slate700 = "#334155";
const slate500 = "#64748b";
const slate400 = "#94a3b8";
const slate200 = "#e2e8f0";
const slate100 = "#f1f5f9";
const white$6 = "#ffffff";
const red600 = "#dc2626";
function formatCurrency$7(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusStyle$6(status) {
  switch (status) {
    case "paid":
      return { bg: "#dcfce7", color: "#166534" };
    case "partial":
      return { bg: "#fef9c3", color: "#854d0e" };
    default:
      return { bg: "#fee2e2", color: "#991b1b" };
  }
}
function MinimalTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusStyle = getStatusStyle$6(String(invoice.paymentStatus));
  const client = invoice.client;
  const hasCGST = invoice.lineItems.some((item) => item.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((item) => item.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((item) => item.taxType === "IGST");
  const cgstTotal = invoice.lineItems.filter((item) => item.taxType === "CGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  const sgstTotal = invoice.lineItems.filter((item) => item.taxType === "SGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  const igstTotal = invoice.lineItems.filter((item) => item.taxType === "IGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        background: white$6,
        color: slate900,
        maxWidth: "800px",
        margin: "0 auto",
        padding: "48px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        borderRadius: "8px",
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "40px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: businessProfile.logo.getDirectURL(),
                    alt: "Logo",
                    style: {
                      height: "40px",
                      marginBottom: "8px",
                      objectFit: "contain"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "20px",
                      fontWeight: 700,
                      color: slate900,
                      letterSpacing: "-0.5px"
                    },
                    children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { fontSize: "12px", color: slate500, marginTop: "2px" },
                    children: [
                      "GST: ",
                      businessProfile.gstNumber
                    ]
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "12px",
                      color: slate500,
                      marginTop: "2px",
                      maxWidth: "200px"
                    },
                    children: businessProfile.address
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: slate500, marginTop: "2px" },
                    children: businessProfile.phone
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: slate500, marginTop: "2px" },
                    children: businessProfile.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "13px",
                      fontWeight: 600,
                      color: slate400,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      marginBottom: "4px"
                    },
                    children: "Invoice"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      fontSize: "28px",
                      fontWeight: 800,
                      color: slate900,
                      letterSpacing: "-1px"
                    },
                    children: [
                      "#",
                      String(invoice.invoiceNumber).padStart(4, "0")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "inline-block",
                      marginTop: "8px",
                      padding: "3px 12px",
                      borderRadius: "20px",
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    },
                    children: String(invoice.paymentStatus)
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: { height: "1px", background: slate200, marginBottom: "32px" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "40px",
              gap: "24px",
              flexWrap: "wrap"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: slate400,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bill To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: "15px", color: slate900 }, children: client.name }),
                client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "13px", color: slate700, marginTop: "2px" },
                    children: client.companyName
                  }
                ),
                client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { fontSize: "12px", color: slate500, marginTop: "2px" },
                    children: [
                      "GST: ",
                      client.gstNumber
                    ]
                  }
                ),
                client.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "12px",
                      color: slate500,
                      marginTop: "2px",
                      maxWidth: "200px"
                    },
                    children: client.address
                  }
                ),
                client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: slate500, marginTop: "2px" },
                    children: client.phone
                  }
                ),
                client.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: slate500, marginTop: "2px" },
                    children: client.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "12px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: slate400,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Invoice Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: slate700 }, children: invoice.invoiceDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: slate400,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Due Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: slate700 }, children: invoice.dueDate })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "24px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { borderBottom: `2px solid ${slate900}` }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    style: {
                      padding: "8px 0",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: slate500,
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    },
                    children: "Item"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    style: {
                      padding: "8px 8px",
                      textAlign: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: slate500,
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    },
                    children: "Qty"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    style: {
                      padding: "8px 8px",
                      textAlign: "right",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: slate500,
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    },
                    children: "Rate"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    style: {
                      padding: "8px 8px",
                      textAlign: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: slate500,
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    },
                    children: "Tax"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    style: {
                      padding: "8px 8px",
                      textAlign: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: slate500,
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    },
                    children: "Disc%"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    style: {
                      padding: "8px 0",
                      textAlign: "right",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: slate500,
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    },
                    children: "Amount"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
                const lineTotal = Number(item.quantity) * Number(item.rate);
                const discountAmt = lineTotal * Number(item.discount) / 100;
                const taxableAmt = lineTotal - discountAmt;
                const taxAmt = taxableAmt * Number(item.taxRate) / 100;
                const total = taxableAmt + taxAmt;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    style: { borderBottom: `1px solid ${slate100}` },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          style: {
                            padding: "12px 0",
                            fontSize: "13px",
                            color: slate900
                          },
                          children: item.itemName
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          style: {
                            padding: "12px 8px",
                            textAlign: "center",
                            fontSize: "13px",
                            color: slate700
                          },
                          children: String(item.quantity)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          style: {
                            padding: "12px 8px",
                            textAlign: "right",
                            fontSize: "13px",
                            color: slate700
                          },
                          children: formatCurrency$7(Number(item.rate))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "td",
                        {
                          style: {
                            padding: "12px 8px",
                            textAlign: "center",
                            fontSize: "12px",
                            color: slate500
                          },
                          children: [
                            item.taxType,
                            " ",
                            String(item.taxRate),
                            "%"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "td",
                        {
                          style: {
                            padding: "12px 8px",
                            textAlign: "center",
                            fontSize: "12px",
                            color: slate500
                          },
                          children: [
                            String(item.discount),
                            "%"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          style: {
                            padding: "12px 0",
                            textAlign: "right",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: slate900
                          },
                          children: formatCurrency$7(total)
                        }
                      )
                    ]
                  },
                  `${item.itemName}-${idx}`
                );
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: { height: "1px", background: slate200, marginBottom: "20px" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: "240px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate500 }, children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate700 }, children: formatCurrency$7(Number(invoice.subtotal)) })
              ]
            }
          ),
          Number(invoice.totalDiscount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate500 }, children: "Discount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "13px", color: red600 }, children: [
                  "-",
                  formatCurrency$7(Number(invoice.totalDiscount))
                ] })
              ]
            }
          ),
          hasCGST && cgstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate500 }, children: "CGST" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate700 }, children: formatCurrency$7(cgstTotal) })
              ]
            }
          ),
          hasSGST && sgstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate500 }, children: "SGST" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate700 }, children: formatCurrency$7(sgstTotal) })
              ]
            }
          ),
          hasIGST && igstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate500 }, children: "IGST" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate700 }, children: formatCurrency$7(igstTotal) })
              ]
            }
          ),
          Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate500 }, children: "Tax" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: slate700 }, children: formatCurrency$7(Number(invoice.totalTax)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: { height: "1px", background: slate900, margin: "8px 0" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: { fontSize: "16px", fontWeight: 800, color: slate900 },
                    children: "Total"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: { fontSize: "16px", fontWeight: 800, color: slate900 },
                    children: formatCurrency$7(Number(invoice.grandTotal))
                  }
                )
              ]
            }
          )
        ] }) }),
        ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "24px",
              padding: "16px 40px",
              background: "#f8fafc",
              borderTop: "1px solid #e2e8f0",
              flexWrap: "wrap"
            },
            children: [
              ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#334155",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#64748b",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                  }
                )
              ] }),
              ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#334155",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bank Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#64748b",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                  }
                )
              ] })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: { height: "1px", background: slate200, margin: "32px 0 16px 0" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", fontSize: "12px", color: slate400 }, children: "Thank you for your business." })
      ]
    }
  );
}
const teal = "#0d9488";
const tealDark = "#0f766e";
const white$5 = "#ffffff";
const gray50 = "#f8fafc";
const gray100 = "#f1f5f9";
const gray200 = "#e2e8f0";
const gray600 = "#475569";
const gray700 = "#334155";
const gray800 = "#1e293b";
const gray900 = "#0f172a";
function formatCurrency$6(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusColor(status) {
  switch (status) {
    case "paid":
      return { bg: "#dcfce7", color: "#166534" };
    case "partial":
      return { bg: "#fef9c3", color: "#854d0e" };
    default:
      return { bg: "#fee2e2", color: "#991b1b" };
  }
}
function ModernTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusColors = getStatusColor(String(invoice.paymentStatus));
  const client = invoice.client;
  const hasCGST = invoice.lineItems.some((item) => item.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((item) => item.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((item) => item.taxType === "IGST");
  const cgstTotal = invoice.lineItems.filter((item) => item.taxType === "CGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  const sgstTotal = invoice.lineItems.filter((item) => item.taxType === "SGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  const igstTotal = invoice.lineItems.filter((item) => item.taxType === "IGST").reduce((sum, item) => {
    const lineTotal = Number(item.quantity) * Number(item.rate);
    const discounted = lineTotal - lineTotal * Number(item.discount) / 100;
    return sum + discounted * Number(item.taxRate) / 100;
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "'Segoe UI', Arial, sans-serif",
        background: white$5,
        color: gray800,
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        borderRadius: "12px",
        overflow: "hidden",
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
              color: white$5,
              padding: "36px 40px 28px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: businessProfile.logo.getDirectURL(),
                    alt: "Logo",
                    style: {
                      height: "48px",
                      marginBottom: "10px",
                      objectFit: "contain"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "22px",
                      fontWeight: 700,
                      letterSpacing: "-0.5px"
                    },
                    children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", opacity: 0.85, marginTop: "2px" }, children: [
                  "GST: ",
                  businessProfile.gstNumber
                ] }),
                (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "12px",
                      opacity: 0.75,
                      marginTop: "2px",
                      maxWidth: "220px"
                    },
                    children: businessProfile.address
                  }
                ),
                (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", opacity: 0.75, marginTop: "2px" }, children: businessProfile.phone }),
                (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", opacity: 0.75, marginTop: "2px" }, children: businessProfile.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "32px",
                      fontWeight: 800,
                      letterSpacing: "-1px",
                      opacity: 0.95
                    },
                    children: "INVOICE"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "14px", opacity: 0.85, marginTop: "4px" }, children: [
                  "#",
                  String(invoice.invoiceNumber).padStart(4, "0")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "4px 14px",
                      borderRadius: "20px",
                      background: statusColors.bg,
                      color: statusColors.color,
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    },
                    children: String(invoice.paymentStatus)
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "24px 40px",
              background: gray50,
              borderBottom: `1px solid ${gray200}`,
              gap: "24px",
              flexWrap: "wrap"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: gray600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "4px"
                    },
                    children: "Bill To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: "15px", color: gray900 }, children: client.name }),
                client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "13px", color: gray600 }, children: client.companyName }),
                client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", color: gray600 }, children: [
                  "GST: ",
                  client.gstNumber
                ] }),
                client.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: gray600, maxWidth: "200px" },
                    children: client.address
                  }
                ),
                client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: gray600 }, children: client.phone }),
                client.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: gray600 }, children: client.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "8px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: gray600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Invoice Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: gray800 }, children: invoice.invoiceDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: gray600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Due Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: gray800 }, children: invoice.dueDate })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "0 40px 24px 40px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              style: {
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "24px"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { background: teal, color: white$5 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Item"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Qty"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "right",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Rate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Tax"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Disc%"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "right",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Amount"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
                  const lineTotal = Number(item.quantity) * Number(item.rate);
                  const discountAmt = lineTotal * Number(item.discount) / 100;
                  const taxableAmt = lineTotal - discountAmt;
                  const taxAmt = taxableAmt * Number(item.taxRate) / 100;
                  const total = taxableAmt + taxAmt;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      style: { background: idx % 2 === 0 ? white$5 : gray50 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "10px 12px",
                              fontSize: "13px",
                              color: gray800,
                              borderBottom: `1px solid ${gray100}`
                            },
                            children: item.itemName
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "10px 12px",
                              textAlign: "center",
                              fontSize: "13px",
                              color: gray700,
                              borderBottom: `1px solid ${gray100}`
                            },
                            children: String(item.quantity)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "10px 12px",
                              textAlign: "right",
                              fontSize: "13px",
                              color: gray700,
                              borderBottom: `1px solid ${gray100}`
                            },
                            children: formatCurrency$6(Number(item.rate))
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "td",
                          {
                            style: {
                              padding: "10px 12px",
                              textAlign: "center",
                              fontSize: "12px",
                              color: gray600,
                              borderBottom: `1px solid ${gray100}`
                            },
                            children: [
                              item.taxType,
                              " ",
                              String(item.taxRate),
                              "%"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "td",
                          {
                            style: {
                              padding: "10px 12px",
                              textAlign: "center",
                              fontSize: "12px",
                              color: gray600,
                              borderBottom: `1px solid ${gray100}`
                            },
                            children: [
                              String(item.discount),
                              "%"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "10px 12px",
                              textAlign: "right",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: gray800,
                              borderBottom: `1px solid ${gray100}`
                            },
                            children: formatCurrency$6(total)
                          }
                        )
                      ]
                    },
                    `${item.itemName}-${idx}`
                  );
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: "260px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: `1px solid ${gray200}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: gray600 }, children: "Subtotal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { fontSize: "13px", fontWeight: 600, color: gray800 },
                          children: formatCurrency$6(Number(invoice.subtotal))
                        }
                      )
                    ]
                  }
                ),
                Number(invoice.totalDiscount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: `1px solid ${gray200}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: gray600 }, children: "Discount" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#dc2626"
                          },
                          children: [
                            "-",
                            formatCurrency$6(Number(invoice.totalDiscount))
                          ]
                        }
                      )
                    ]
                  }
                ),
                hasCGST && cgstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: `1px solid ${gray200}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: gray600 }, children: "CGST" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { fontSize: "13px", fontWeight: 600, color: gray800 },
                          children: formatCurrency$6(cgstTotal)
                        }
                      )
                    ]
                  }
                ),
                hasSGST && sgstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: `1px solid ${gray200}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: gray600 }, children: "SGST" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { fontSize: "13px", fontWeight: 600, color: gray800 },
                          children: formatCurrency$6(sgstTotal)
                        }
                      )
                    ]
                  }
                ),
                hasIGST && igstTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: `1px solid ${gray200}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: gray600 }, children: "IGST" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { fontSize: "13px", fontWeight: 600, color: gray800 },
                          children: formatCurrency$6(igstTotal)
                        }
                      )
                    ]
                  }
                ),
                Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: `1px solid ${gray200}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: gray600 }, children: "Tax" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: gray800
                          },
                          children: formatCurrency$6(Number(invoice.totalTax))
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      marginTop: "8px",
                      background: teal,
                      borderRadius: "8px",
                      color: white$5
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 700 }, children: "Grand Total" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 800 }, children: formatCurrency$6(Number(invoice.grandTotal)) })
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "24px",
              padding: "16px 40px",
              background: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
              flexWrap: "wrap"
            },
            children: [
              ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                  }
                )
              ] }),
              ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bank Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                  }
                )
              ] })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "16px 40px",
              background: gray50,
              borderTop: `1px solid ${gray200}`,
              textAlign: "center",
              fontSize: "12px",
              color: gray600
            },
            children: "Thank you for your business!"
          }
        )
      ]
    }
  );
}
const darkBg = "#0a0a0f";
const darkCard = "#12121a";
const darkBorder = "#1e1e2e";
const neonTeal = "#00e5cc";
const neonTealDim = "#00b8a3";
const neonTealBg = "rgba(0,229,204,0.08)";
const white$4 = "#ffffff";
const offWhite$1 = "#e2e8f0";
const lightGray$1 = "#94a3b8";
const red$5 = "#f87171";
function formatCurrency$5(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusStyle$5(status) {
  switch (status) {
    case "paid":
      return { bg: "rgba(0,229,204,0.15)", color: neonTeal };
    case "partial":
      return { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" };
    default:
      return { bg: "rgba(248,113,113,0.15)", color: "#f87171" };
  }
}
function calcTaxTotals$5(invoice) {
  const calc = (type) => invoice.lineItems.filter((i) => i.taxType === type).reduce((s, i) => {
    const lt = Number(i.quantity) * Number(i.rate);
    return s + (lt - lt * Number(i.discount) / 100) * Number(i.taxRate) / 100;
  }, 0);
  return { cgst: calc("CGST"), sgst: calc("SGST"), igst: calc("IGST") };
}
function AgencyTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusStyle = getStatusStyle$5(String(invoice.paymentStatus));
  const client = invoice.client;
  const { cgst, sgst, igst } = calcTaxTotals$5(invoice);
  const hasCGST = invoice.lineItems.some((i) => i.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((i) => i.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((i) => i.taxType === "IGST");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "'Segoe UI', system-ui, Arial, sans-serif",
        background: darkBg,
        color: offWhite$1,
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 4px 40px rgba(0,229,204,0.15)",
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: "3px",
              background: neonTeal,
              boxShadow: `0 0 12px ${neonTeal}`,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: darkCard,
              padding: "36px 44px",
              borderBottom: `1px solid ${darkBorder}`,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: businessProfile.logo.getDirectURL(),
                        alt: "Logo",
                        style: {
                          height: "44px",
                          marginBottom: "10px",
                          objectFit: "contain"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "22px",
                          fontWeight: 800,
                          color: white$4,
                          letterSpacing: "-0.5px"
                        },
                        children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: { fontSize: "11px", color: lightGray$1, marginTop: "3px" },
                        children: [
                          "GSTIN: ",
                          businessProfile.gstNumber
                        ]
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          color: lightGray$1,
                          marginTop: "2px",
                          maxWidth: "220px"
                        },
                        children: businessProfile.address
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: { fontSize: "11px", color: lightGray$1, marginTop: "2px" },
                        children: businessProfile.phone
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: { fontSize: "11px", color: lightGray$1, marginTop: "2px" },
                        children: businessProfile.email
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          letterSpacing: "4px",
                          textTransform: "uppercase",
                          color: neonTeal,
                          marginBottom: "8px"
                        },
                        children: "Invoice"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "30px", fontWeight: 800, color: white$4 }, children: [
                      "#",
                      String(invoice.invoiceNumber).padStart(4, "0")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          display: "inline-block",
                          marginTop: "10px",
                          padding: "4px 14px",
                          border: `1px solid ${neonTeal}`,
                          borderRadius: "4px",
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase"
                        },
                        children: String(invoice.paymentStatus)
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "24px 44px",
              background: neonTealBg,
              borderBottom: `1px solid ${darkBorder}`,
              gap: "24px",
              flexWrap: "wrap",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: neonTeal,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      marginBottom: "8px"
                    },
                    children: "Bill To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: "15px", color: white$4 }, children: client.name }),
                client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "13px", color: lightGray$1 }, children: client.companyName }),
                client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", color: lightGray$1 }, children: [
                  "GSTIN: ",
                  client.gstNumber
                ] }),
                client.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: lightGray$1, maxWidth: "200px" },
                    children: client.address
                  }
                ),
                client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: lightGray$1 }, children: client.phone }),
                client.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: lightGray$1 }, children: client.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "10px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: neonTeal,
                        textTransform: "uppercase",
                        letterSpacing: "2px"
                      },
                      children: "Invoice Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: offWhite$1 }, children: invoice.invoiceDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: neonTeal,
                        textTransform: "uppercase",
                        letterSpacing: "2px"
                      },
                      children: "Due Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: offWhite$1 }, children: invoice.dueDate })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "24px 44px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                style: {
                  borderBottom: `1px solid ${neonTeal}`,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "left",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: neonTeal,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Item"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: neonTeal,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Qty"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: neonTeal,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Rate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: neonTeal,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Tax"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: neonTeal,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Disc%"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: neonTeal,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Amount"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
              const lt = Number(item.quantity) * Number(item.rate);
              const disc = lt * Number(item.discount) / 100;
              const taxable = lt - disc;
              const tax = taxable * Number(item.taxRate) / 100;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  style: {
                    borderBottom: `1px solid ${darkBorder}`,
                    background: idx % 2 === 0 ? "transparent" : neonTealBg
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          fontSize: "13px",
                          color: offWhite$1
                        },
                        children: item.itemName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: lightGray$1
                        },
                        children: String(item.quantity)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "right",
                          fontSize: "13px",
                          color: lightGray$1
                        },
                        children: formatCurrency$5(Number(item.rate))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: lightGray$1
                        },
                        children: [
                          item.taxType,
                          " ",
                          String(item.taxRate),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: lightGray$1
                        },
                        children: [
                          String(item.discount),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "right",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: neonTeal
                        },
                        children: formatCurrency$5(taxable + tax)
                      }
                    )
                  ]
                },
                `${item.itemName}-${idx}`
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: "260px" }, children: [
                [
                  {
                    label: "Subtotal",
                    value: formatCurrency$5(Number(invoice.subtotal)),
                    show: true,
                    color: offWhite$1
                  },
                  {
                    label: "Discount",
                    value: `-${formatCurrency$5(Number(invoice.totalDiscount))}`,
                    show: Number(invoice.totalDiscount) > 0,
                    color: red$5
                  },
                  {
                    label: "CGST",
                    value: formatCurrency$5(cgst),
                    show: hasCGST && cgst > 0,
                    color: offWhite$1
                  },
                  {
                    label: "SGST",
                    value: formatCurrency$5(sgst),
                    show: hasSGST && sgst > 0,
                    color: offWhite$1
                  },
                  {
                    label: "IGST",
                    value: formatCurrency$5(igst),
                    show: hasIGST && igst > 0,
                    color: offWhite$1
                  },
                  {
                    label: "Tax",
                    value: formatCurrency$5(Number(invoice.totalTax)),
                    show: Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST,
                    color: offWhite$1
                  }
                ].filter((r) => r.show).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 0",
                      borderBottom: `1px solid ${darkBorder}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: lightGray$1 }, children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: row.color
                          },
                          children: row.value
                        }
                      )
                    ]
                  },
                  row.label
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      marginTop: "10px",
                      background: darkCard,
                      border: `1px solid ${neonTeal}`,
                      boxShadow: "0 0 16px rgba(0,229,204,0.2)",
                      printColorAdjust: "exact",
                      WebkitPrintColorAdjust: "exact"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 800, color: white$4 }, children: "Grand Total" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { fontSize: "15px", fontWeight: 900, color: neonTeal },
                          children: formatCurrency$5(Number(invoice.grandTotal))
                        }
                      )
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "24px",
              padding: "16px 44px",
              background: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
              flexWrap: "wrap"
            },
            children: [
              ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                  }
                )
              ] }),
              ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bank Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                  }
                )
              ] })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "16px 44px",
              background: darkCard,
              borderTop: `1px solid ${darkBorder}`,
              textAlign: "center",
              fontSize: "12px",
              color: neonTealDim,
              fontWeight: 600,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: "Thank you for your business. Let's build something great together."
          }
        )
      ]
    }
  );
}
const black = "#000000";
const offBlack = "#111827";
const darkGray$1 = "#374151";
const midGray$2 = "#6b7280";
const lightGray = "#d1d5db";
const ultraLight = "#f9fafb";
const white$3 = "#ffffff";
const accent = "#facc15";
const red$4 = "#ef4444";
function formatCurrency$4(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusStyle$4(status) {
  switch (status) {
    case "paid":
      return { bg: "#d1fae5", color: "#065f46" };
    case "partial":
      return { bg: "#fef3c7", color: "#92400e" };
    default:
      return { bg: "#fee2e2", color: "#991b1b" };
  }
}
function calcTaxTotals$4(invoice) {
  const calc = (type) => invoice.lineItems.filter((i) => i.taxType === type).reduce((s, i) => {
    const lt = Number(i.quantity) * Number(i.rate);
    return s + (lt - lt * Number(i.discount) / 100) * Number(i.taxRate) / 100;
  }, 0);
  return { cgst: calc("CGST"), sgst: calc("SGST"), igst: calc("IGST") };
}
function BoldTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusStyle = getStatusStyle$4(String(invoice.paymentStatus));
  const client = invoice.client;
  const { cgst, sgst, igst } = calcTaxTotals$4(invoice);
  const hasCGST = invoice.lineItems.some((i) => i.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((i) => i.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((i) => i.taxType === "IGST");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "'Arial Black', Arial, sans-serif",
        background: white$3,
        color: offBlack,
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: black,
              color: white$3,
              padding: "40px 44px",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: businessProfile.logo.getDirectURL(),
                        alt: "Logo",
                        style: {
                          height: "44px",
                          marginBottom: "12px",
                          objectFit: "contain",
                          filter: "brightness(0) invert(1)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "26px",
                          fontWeight: 900,
                          letterSpacing: "-1px",
                          textTransform: "uppercase"
                        },
                        children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: { fontSize: "11px", color: "#9ca3af", marginTop: "4px" },
                        children: [
                          "GSTIN: ",
                          businessProfile.gstNumber
                        ]
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          color: "#9ca3af",
                          marginTop: "2px",
                          maxWidth: "220px"
                        },
                        children: businessProfile.address
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: { fontSize: "11px", color: "#9ca3af", marginTop: "2px" },
                        children: businessProfile.phone
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: { fontSize: "11px", color: "#9ca3af", marginTop: "2px" },
                        children: businessProfile.email
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "48px",
                          fontWeight: 900,
                          letterSpacing: "-3px",
                          color: accent,
                          lineHeight: 1,
                          printColorAdjust: "exact",
                          WebkitPrintColorAdjust: "exact"
                        },
                        children: "INV"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          fontSize: "20px",
                          fontWeight: 700,
                          color: white$3,
                          marginTop: "4px"
                        },
                        children: [
                          "#",
                          String(invoice.invoiceNumber).padStart(4, "0")
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          display: "inline-block",
                          marginTop: "10px",
                          padding: "4px 14px",
                          borderRadius: "3px",
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase"
                        },
                        children: String(invoice.paymentStatus)
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: "6px",
              background: accent,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "28px 44px",
              background: ultraLight,
              borderBottom: `1px solid ${lightGray}`,
              gap: "24px",
              flexWrap: "wrap",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "10px",
                      fontWeight: 900,
                      color: black,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      marginBottom: "8px"
                    },
                    children: "Bill To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: "16px", color: offBlack }, children: client.name }),
                client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "13px", color: midGray$2 }, children: client.companyName }),
                client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", color: midGray$2 }, children: [
                  "GSTIN: ",
                  client.gstNumber
                ] }),
                client.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: midGray$2, maxWidth: "200px" },
                    children: client.address
                  }
                ),
                client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: midGray$2 }, children: client.phone }),
                client.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: midGray$2 }, children: client.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "10px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "10px",
                        fontWeight: 900,
                        color: black,
                        textTransform: "uppercase",
                        letterSpacing: "2px"
                      },
                      children: "Invoice Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: darkGray$1 }, children: invoice.invoiceDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "10px",
                        fontWeight: 900,
                        color: black,
                        textTransform: "uppercase",
                        letterSpacing: "2px"
                      },
                      children: "Due Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: darkGray$1 }, children: invoice.dueDate })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "28px 44px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                style: {
                  background: offBlack,
                  color: white$3,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "12px 14px",
                        textAlign: "left",
                        fontSize: "11px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Item"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "12px 14px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Qty"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "12px 14px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Rate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "12px 14px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Tax"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "12px 14px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Disc%"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "12px 14px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      },
                      children: "Amount"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
              const lt = Number(item.quantity) * Number(item.rate);
              const disc = lt * Number(item.discount) / 100;
              const taxable = lt - disc;
              const tax = taxable * Number(item.taxRate) / 100;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  style: {
                    borderBottom: `2px solid ${lightGray}`,
                    background: idx % 2 === 0 ? white$3 : ultraLight
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "12px 14px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: offBlack
                        },
                        children: item.itemName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "12px 14px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: midGray$2
                        },
                        children: String(item.quantity)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "12px 14px",
                          textAlign: "right",
                          fontSize: "13px",
                          color: midGray$2
                        },
                        children: formatCurrency$4(Number(item.rate))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "12px 14px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: midGray$2
                        },
                        children: [
                          item.taxType,
                          " ",
                          String(item.taxRate),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "12px 14px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: midGray$2
                        },
                        children: [
                          String(item.discount),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "12px 14px",
                          textAlign: "right",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: offBlack
                        },
                        children: formatCurrency$4(taxable + tax)
                      }
                    )
                  ]
                },
                `${item.itemName}-${idx}`
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: "260px" }, children: [
                [
                  {
                    label: "Subtotal",
                    value: formatCurrency$4(Number(invoice.subtotal)),
                    show: true,
                    color: offBlack
                  },
                  {
                    label: "Discount",
                    value: `-${formatCurrency$4(Number(invoice.totalDiscount))}`,
                    show: Number(invoice.totalDiscount) > 0,
                    color: red$4
                  },
                  {
                    label: "CGST",
                    value: formatCurrency$4(cgst),
                    show: hasCGST && cgst > 0,
                    color: offBlack
                  },
                  {
                    label: "SGST",
                    value: formatCurrency$4(sgst),
                    show: hasSGST && sgst > 0,
                    color: offBlack
                  },
                  {
                    label: "IGST",
                    value: formatCurrency$4(igst),
                    show: hasIGST && igst > 0,
                    color: offBlack
                  },
                  {
                    label: "Tax",
                    value: formatCurrency$4(Number(invoice.totalTax)),
                    show: Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST,
                    color: offBlack
                  }
                ].filter((r) => r.show).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 0",
                      borderBottom: `2px solid ${lightGray}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: midGray$2 }, children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: 700,
                            color: row.color
                          },
                          children: row.value
                        }
                      )
                    ]
                  },
                  row.label
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      marginTop: "10px",
                      background: black,
                      color: white$3,
                      printColorAdjust: "exact",
                      WebkitPrintColorAdjust: "exact"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "16px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                          },
                          children: "Total"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { fontSize: "16px", fontWeight: 900, color: accent },
                          children: formatCurrency$4(Number(invoice.grandTotal))
                        }
                      )
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "24px",
              padding: "16px 44px",
              background: "#f9fafb",
              borderTop: "1px solid #d1d5db",
              flexWrap: "wrap"
            },
            children: [
              ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                  }
                )
              ] }),
              ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bank Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                  }
                )
              ] })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "16px 44px",
              background: offBlack,
              color: "#9ca3af",
              textAlign: "center",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: "Thank you for your business"
          }
        )
      ]
    }
  );
}
const rose = "#e11d48";
const roseDark = "#be123c";
const roseLight = "#fff1f2";
const blush = "#fce7f3";
const pink = "#ec4899";
const pinkLight = "#fdf2f8";
const white$2 = "#ffffff";
const dark$1 = "#1f1f2e";
const midGray$1 = "#6b7280";
const hairline$1 = "#fce7f3";
const red$3 = "#dc2626";
function formatCurrency$3(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusStyle$3(status) {
  switch (status) {
    case "paid":
      return { bg: "#d1fae5", color: "#065f46" };
    case "partial":
      return { bg: "#fef3c7", color: "#92400e" };
    default:
      return { bg: "#fee2e2", color: "#991b1b" };
  }
}
function calcTaxTotals$3(invoice) {
  const calc = (type) => invoice.lineItems.filter((i) => i.taxType === type).reduce((s, i) => {
    const lt = Number(i.quantity) * Number(i.rate);
    return s + (lt - lt * Number(i.discount) / 100) * Number(i.taxRate) / 100;
  }, 0);
  return { cgst: calc("CGST"), sgst: calc("SGST"), igst: calc("IGST") };
}
function BoutiqueTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusStyle = getStatusStyle$3(String(invoice.paymentStatus));
  const client = invoice.client;
  const { cgst, sgst, igst } = calcTaxTotals$3(invoice);
  const hasCGST = invoice.lineItems.some((i) => i.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((i) => i.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((i) => i.taxType === "IGST");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "'Segoe UI', Arial, sans-serif",
        background: white$2,
        color: dark$1,
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 4px 32px rgba(236,72,153,0.12)",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${hairline$1}`,
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: `linear-gradient(135deg, ${rose} 0%, ${pink} 100%)`,
              color: white$2,
              padding: "36px 44px",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: businessProfile.logo.getDirectURL(),
                        alt: "Logo",
                        style: {
                          height: "44px",
                          marginBottom: "10px",
                          objectFit: "contain"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "22px",
                          fontWeight: 800,
                          letterSpacing: "-0.3px"
                        },
                        children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "11px", opacity: 0.8, marginTop: "3px" }, children: [
                      "GSTIN: ",
                      businessProfile.gstNumber
                    ] }),
                    (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          opacity: 0.75,
                          marginTop: "2px",
                          maxWidth: "220px"
                        },
                        children: businessProfile.address
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: { fontSize: "11px", opacity: 0.75, marginTop: "2px" },
                        children: businessProfile.phone
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: { fontSize: "11px", opacity: 0.75, marginTop: "2px" },
                        children: businessProfile.email
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          letterSpacing: "3px",
                          textTransform: "uppercase",
                          opacity: 0.8,
                          marginBottom: "6px"
                        },
                        children: "Invoice"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "30px", fontWeight: 800 }, children: [
                      "#",
                      String(invoice.invoiceNumber).padStart(4, "0")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          display: "inline-block",
                          marginTop: "10px",
                          padding: "4px 14px",
                          borderRadius: "20px",
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase"
                        },
                        children: String(invoice.paymentStatus)
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "24px 44px",
              background: blush,
              borderBottom: `1px solid ${hairline$1}`,
              gap: "24px",
              flexWrap: "wrap",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: rose,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      marginBottom: "8px"
                    },
                    children: "Bill To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: "15px", color: dark$1 }, children: client.name }),
                client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "13px", color: midGray$1 }, children: client.companyName }),
                client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", color: midGray$1 }, children: [
                  "GSTIN: ",
                  client.gstNumber
                ] }),
                client.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: midGray$1, maxWidth: "200px" },
                    children: client.address
                  }
                ),
                client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: midGray$1 }, children: client.phone }),
                client.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: midGray$1 }, children: client.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "10px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: rose,
                        textTransform: "uppercase",
                        letterSpacing: "2px"
                      },
                      children: "Invoice Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: dark$1 }, children: invoice.invoiceDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: rose,
                        textTransform: "uppercase",
                        letterSpacing: "2px"
                      },
                      children: "Due Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: dark$1 }, children: invoice.dueDate })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "24px 44px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                style: {
                  background: roseLight,
                  borderTop: `2px solid ${rose}`,
                  borderBottom: `2px solid ${rose}`,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "left",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: roseDark,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Item"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: roseDark,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Qty"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: roseDark,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Rate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: roseDark,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Tax"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: roseDark,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Disc%"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: roseDark,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Amount"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
              const lt = Number(item.quantity) * Number(item.rate);
              const disc = lt * Number(item.discount) / 100;
              const taxable = lt - disc;
              const tax = taxable * Number(item.taxRate) / 100;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  style: {
                    borderBottom: `1px solid ${hairline$1}`,
                    background: idx % 2 === 0 ? white$2 : pinkLight
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          fontSize: "13px",
                          color: dark$1
                        },
                        children: item.itemName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: midGray$1
                        },
                        children: String(item.quantity)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "right",
                          fontSize: "13px",
                          color: midGray$1
                        },
                        children: formatCurrency$3(Number(item.rate))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: midGray$1
                        },
                        children: [
                          item.taxType,
                          " ",
                          String(item.taxRate),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: midGray$1
                        },
                        children: [
                          String(item.discount),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "10px 12px",
                          textAlign: "right",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: rose
                        },
                        children: formatCurrency$3(taxable + tax)
                      }
                    )
                  ]
                },
                `${item.itemName}-${idx}`
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: "260px" }, children: [
                [
                  {
                    label: "Subtotal",
                    value: formatCurrency$3(Number(invoice.subtotal)),
                    show: true,
                    color: dark$1
                  },
                  {
                    label: "Discount",
                    value: `-${formatCurrency$3(Number(invoice.totalDiscount))}`,
                    show: Number(invoice.totalDiscount) > 0,
                    color: red$3
                  },
                  {
                    label: "CGST",
                    value: formatCurrency$3(cgst),
                    show: hasCGST && cgst > 0,
                    color: dark$1
                  },
                  {
                    label: "SGST",
                    value: formatCurrency$3(sgst),
                    show: hasSGST && sgst > 0,
                    color: dark$1
                  },
                  {
                    label: "IGST",
                    value: formatCurrency$3(igst),
                    show: hasIGST && igst > 0,
                    color: dark$1
                  },
                  {
                    label: "Tax",
                    value: formatCurrency$3(Number(invoice.totalTax)),
                    show: Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST,
                    color: dark$1
                  }
                ].filter((r) => r.show).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 0",
                      borderBottom: `1px solid ${hairline$1}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: midGray$1 }, children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: row.color
                          },
                          children: row.value
                        }
                      )
                    ]
                  },
                  row.label
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      marginTop: "10px",
                      background: `linear-gradient(135deg, ${rose} 0%, ${pink} 100%)`,
                      borderRadius: "12px",
                      color: white$2,
                      printColorAdjust: "exact",
                      WebkitPrintColorAdjust: "exact"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 800 }, children: "Grand Total" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 900 }, children: formatCurrency$3(Number(invoice.grandTotal)) })
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "24px",
              padding: "16px 40px",
              background: "#fdf2f8",
              borderTop: "1px solid #f9a8d4",
              flexWrap: "wrap"
            },
            children: [
              ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#831843",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#9d174d",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                  }
                )
              ] }),
              ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#831843",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bank Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#9d174d",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                  }
                )
              ] })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "16px 44px",
              background: blush,
              borderTop: `1px solid ${hairline$1}`,
              textAlign: "center",
              fontSize: "12px",
              color: rose,
              fontWeight: 600,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: "Thank you for shopping with us! 🌸"
          }
        )
      ]
    }
  );
}
const white$1 = "#ffffff";
const offWhite = "#fafafa";
const nearBlack = "#111111";
const darkGray = "#333333";
const midGray = "#555555";
const borderDark = "#333333";
const borderLight = "#cccccc";
const borderDouble = "#999999";
const red$2 = "#cc0000";
function formatCurrency$2(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusStyle$2(status) {
  switch (status) {
    case "paid":
      return { bg: "#e8f5e9", color: "#1b5e20" };
    case "partial":
      return { bg: "#fff8e1", color: "#e65100" };
    default:
      return { bg: "#fce4ec", color: "#880e4f" };
  }
}
function calcTaxTotals$2(invoice) {
  const calc = (type) => invoice.lineItems.filter((i) => i.taxType === type).reduce((s, i) => {
    const lt = Number(i.quantity) * Number(i.rate);
    return s + (lt - lt * Number(i.discount) / 100) * Number(i.taxRate) / 100;
  }, 0);
  return { cgst: calc("CGST"), sgst: calc("SGST"), igst: calc("IGST") };
}
function ClassicPremiumTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusStyle = getStatusStyle$2(String(invoice.paymentStatus));
  const client = invoice.client;
  const { cgst, sgst, igst } = calcTaxTotals$2(invoice);
  const hasCGST = invoice.lineItems.some((i) => i.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((i) => i.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((i) => i.taxType === "IGST");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "'Courier New', Courier, monospace",
        background: white$1,
        color: nearBlack,
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
        border: `3px double ${borderDark}`,
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            margin: "6px",
            border: `1px solid ${borderDark}`,
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  background: offWhite,
                  padding: "28px 36px",
                  borderBottom: `3px double ${borderDark}`,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: businessProfile.logo.getDirectURL(),
                            alt: "Logo",
                            style: {
                              height: "40px",
                              marginBottom: "10px",
                              objectFit: "contain"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontSize: "20px",
                              fontWeight: 700,
                              color: nearBlack,
                              letterSpacing: "1px",
                              textTransform: "uppercase"
                            },
                            children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                          }
                        ),
                        (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: { fontSize: "11px", color: midGray, marginTop: "4px" },
                            children: [
                              "GSTIN: ",
                              businessProfile.gstNumber
                            ]
                          }
                        ),
                        (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontSize: "11px",
                              color: midGray,
                              marginTop: "2px",
                              maxWidth: "220px"
                            },
                            children: businessProfile.address
                          }
                        ),
                        (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: { fontSize: "11px", color: midGray, marginTop: "2px" },
                            children: businessProfile.phone
                          }
                        ),
                        (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: { fontSize: "11px", color: midGray, marginTop: "2px" },
                            children: businessProfile.email
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontSize: "28px",
                              fontWeight: 700,
                              color: nearBlack,
                              letterSpacing: "3px",
                              textTransform: "uppercase"
                            },
                            children: "INVOICE"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              fontSize: "14px",
                              color: darkGray,
                              marginTop: "4px",
                              letterSpacing: "1px"
                            },
                            children: [
                              "No. #",
                              String(invoice.invoiceNumber).padStart(4, "0")
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              display: "inline-block",
                              marginTop: "10px",
                              padding: "3px 12px",
                              border: `1px solid ${borderDark}`,
                              background: statusStyle.bg,
                              color: statusStyle.color,
                              fontSize: "11px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "1px"
                            },
                            children: String(invoice.paymentStatus)
                          }
                        )
                      ] })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px 36px",
                  background: white$1,
                  borderBottom: `3px double ${borderDark}`,
                  gap: "24px",
                  flexWrap: "wrap",
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "10px",
                          fontWeight: 700,
                          color: nearBlack,
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                          marginBottom: "8px",
                          borderBottom: `1px solid ${borderDark}`,
                          paddingBottom: "4px"
                        },
                        children: "Bill To"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: { fontWeight: 700, fontSize: "14px", color: nearBlack },
                        children: client.name
                      }
                    ),
                    client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: midGray }, children: client.companyName }),
                    client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "11px", color: midGray }, children: [
                      "GSTIN: ",
                      client.gstNumber
                    ] }),
                    client.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: { fontSize: "11px", color: midGray, maxWidth: "200px" },
                        children: client.address
                      }
                    ),
                    client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: midGray }, children: client.phone }),
                    client.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: midGray }, children: client.email })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "10px" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "10px",
                            fontWeight: 700,
                            color: nearBlack,
                            textTransform: "uppercase",
                            letterSpacing: "2px"
                          },
                          children: "Invoice Date"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "13px",
                            color: darkGray,
                            fontFamily: "'Courier New', monospace"
                          },
                          children: invoice.invoiceDate
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "10px",
                            fontWeight: 700,
                            color: nearBlack,
                            textTransform: "uppercase",
                            letterSpacing: "2px"
                          },
                          children: "Due Date"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "13px",
                            color: darkGray,
                            fontFamily: "'Courier New', monospace"
                          },
                          children: invoice.dueDate
                        }
                      )
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "20px 36px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "table",
                {
                  style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    border: `1px solid ${borderDark}`
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        style: {
                          background: nearBlack,
                          color: white$1,
                          printColorAdjust: "exact",
                          WebkitPrintColorAdjust: "exact"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              style: {
                                padding: "9px 12px",
                                textAlign: "left",
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                borderRight: `1px solid ${borderDouble}`
                              },
                              children: "Description"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              style: {
                                padding: "9px 12px",
                                textAlign: "center",
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                borderRight: `1px solid ${borderDouble}`
                              },
                              children: "Qty"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              style: {
                                padding: "9px 12px",
                                textAlign: "right",
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                borderRight: `1px solid ${borderDouble}`
                              },
                              children: "Rate"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              style: {
                                padding: "9px 12px",
                                textAlign: "center",
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                borderRight: `1px solid ${borderDouble}`
                              },
                              children: "Tax"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              style: {
                                padding: "9px 12px",
                                textAlign: "center",
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                borderRight: `1px solid ${borderDouble}`
                              },
                              children: "Disc%"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              style: {
                                padding: "9px 12px",
                                textAlign: "right",
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px"
                              },
                              children: "Amount"
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
                      const lt = Number(item.quantity) * Number(item.rate);
                      const disc = lt * Number(item.discount) / 100;
                      const taxable = lt - disc;
                      const tax = taxable * Number(item.taxRate) / 100;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          style: {
                            borderBottom: `1px solid ${borderLight}`,
                            background: idx % 2 === 0 ? white$1 : offWhite
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                style: {
                                  padding: "9px 12px",
                                  fontSize: "12px",
                                  color: nearBlack,
                                  borderRight: `1px solid ${borderLight}`
                                },
                                children: item.itemName
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                style: {
                                  padding: "9px 12px",
                                  textAlign: "center",
                                  fontSize: "12px",
                                  color: midGray,
                                  borderRight: `1px solid ${borderLight}`
                                },
                                children: String(item.quantity)
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                style: {
                                  padding: "9px 12px",
                                  textAlign: "right",
                                  fontSize: "12px",
                                  color: midGray,
                                  borderRight: `1px solid ${borderLight}`
                                },
                                children: formatCurrency$2(Number(item.rate))
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "td",
                              {
                                style: {
                                  padding: "9px 12px",
                                  textAlign: "center",
                                  fontSize: "11px",
                                  color: midGray,
                                  borderRight: `1px solid ${borderLight}`
                                },
                                children: [
                                  item.taxType,
                                  " ",
                                  String(item.taxRate),
                                  "%"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "td",
                              {
                                style: {
                                  padding: "9px 12px",
                                  textAlign: "center",
                                  fontSize: "11px",
                                  color: midGray,
                                  borderRight: `1px solid ${borderLight}`
                                },
                                children: [
                                  String(item.discount),
                                  "%"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                style: {
                                  padding: "9px 12px",
                                  textAlign: "right",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  color: nearBlack
                                },
                                children: formatCurrency$2(taxable + tax)
                              }
                            )
                          ]
                        },
                        `${item.itemName}-${idx}`
                      );
                    }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "16px"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { minWidth: "260px", border: `1px solid ${borderDark}` },
                      children: [
                        [
                          {
                            label: "Subtotal",
                            value: formatCurrency$2(Number(invoice.subtotal)),
                            show: true,
                            color: nearBlack
                          },
                          {
                            label: "Discount",
                            value: `-${formatCurrency$2(Number(invoice.totalDiscount))}`,
                            show: Number(invoice.totalDiscount) > 0,
                            color: red$2
                          },
                          {
                            label: "CGST",
                            value: formatCurrency$2(cgst),
                            show: hasCGST && cgst > 0,
                            color: nearBlack
                          },
                          {
                            label: "SGST",
                            value: formatCurrency$2(sgst),
                            show: hasSGST && sgst > 0,
                            color: nearBlack
                          },
                          {
                            label: "IGST",
                            value: formatCurrency$2(igst),
                            show: hasIGST && igst > 0,
                            color: nearBlack
                          },
                          {
                            label: "Tax",
                            value: formatCurrency$2(Number(invoice.totalTax)),
                            show: Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST,
                            color: nearBlack
                          }
                        ].filter((r) => r.show).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "7px 14px",
                              borderBottom: `1px solid ${borderLight}`
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "12px", color: midGray }, children: row.label }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: row.color
                                  },
                                  children: row.value
                                }
                              )
                            ]
                          },
                          row.label
                        )),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "12px 14px",
                              background: nearBlack,
                              color: white$1,
                              borderTop: `3px double ${borderDouble}`,
                              printColorAdjust: "exact",
                              WebkitPrintColorAdjust: "exact"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "1px"
                                  },
                                  children: "Grand Total"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px", fontWeight: 700 }, children: formatCurrency$2(Number(invoice.grandTotal)) })
                            ]
                          }
                        )
                      ]
                    }
                  )
                }
              )
            ] }),
            ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "24px",
                  padding: "16px 36px",
                  background: "#fafafa",
                  borderTop: "1px solid #cccccc",
                  flexWrap: "wrap"
                },
                children: [
                  ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#111111",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "6px"
                        },
                        children: "Terms & Conditions"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          color: "#555555",
                          whiteSpace: "pre-wrap",
                          lineHeight: 1.5
                        },
                        children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                      }
                    )
                  ] }),
                  ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#111111",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "6px"
                        },
                        children: "Bank Details"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          color: "#555555",
                          whiteSpace: "pre-wrap",
                          lineHeight: 1.5
                        },
                        children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                      }
                    )
                  ] })
                ]
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  padding: "14px 36px",
                  background: offWhite,
                  borderTop: `3px double ${borderDark}`,
                  textAlign: "center",
                  fontSize: "11px",
                  color: midGray,
                  letterSpacing: "1px",
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact"
                },
                children: "E. & O.E. — This is a computer-generated invoice. Thank you for your business."
              }
            )
          ]
        }
      )
    }
  );
}
const ivory = "#fdfaf5";
const warmWhite = "#fffef9";
const gold = "#c9a84c";
const goldDark = "#a07830";
const goldLight = "#f7f0e0";
const brown = "#5c4a2a";
const brownLight = "#8b7355";
const brownMid = "#7a6040";
const hairline = "#e8dfc8";
const red$1 = "#c0392b";
function formatCurrency$1(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusStyle$1(status) {
  switch (status) {
    case "paid":
      return { bg: "#d5f5e3", color: "#1e8449" };
    case "partial":
      return { bg: "#fef9e7", color: "#9a7d0a" };
    default:
      return { bg: "#fadbd8", color: "#922b21" };
  }
}
function calcTaxTotals$1(invoice) {
  const calc = (type) => invoice.lineItems.filter((i) => i.taxType === type).reduce((s, i) => {
    const lt = Number(i.quantity) * Number(i.rate);
    return s + (lt - lt * Number(i.discount) / 100) * Number(i.taxRate) / 100;
  }, 0);
  return { cgst: calc("CGST"), sgst: calc("SGST"), igst: calc("IGST") };
}
function ElegantTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusStyle = getStatusStyle$1(String(invoice.paymentStatus));
  const client = invoice.client;
  const { cgst, sgst, igst } = calcTaxTotals$1(invoice);
  const hasCGST = invoice.lineItems.some((i) => i.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((i) => i.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((i) => i.taxType === "IGST");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "'Georgia', 'Palatino Linotype', serif",
        background: ivory,
        color: brown,
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
        border: `1px solid ${hairline}`,
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: "3px",
              background: gold,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: ivory,
              padding: "40px 48px 32px 48px",
              borderBottom: `1px solid ${hairline}`,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: businessProfile.logo.getDirectURL(),
                          alt: "Logo",
                          style: {
                            height: "44px",
                            marginBottom: "12px",
                            objectFit: "contain"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "24px",
                            fontWeight: 700,
                            color: brown,
                            letterSpacing: "0.5px"
                          },
                          children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                        }
                      ),
                      (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            fontSize: "11px",
                            color: brownLight,
                            marginTop: "4px",
                            fontStyle: "italic"
                          },
                          children: [
                            "GSTIN: ",
                            businessProfile.gstNumber
                          ]
                        }
                      ),
                      (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "11px",
                            color: brownLight,
                            marginTop: "2px",
                            maxWidth: "220px"
                          },
                          children: businessProfile.address
                        }
                      ),
                      (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "11px",
                            color: brownLight,
                            marginTop: "2px"
                          },
                          children: businessProfile.phone
                        }
                      ),
                      (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "11px",
                            color: brownLight,
                            marginTop: "2px"
                          },
                          children: businessProfile.email
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontSize: "11px",
                            letterSpacing: "4px",
                            textTransform: "uppercase",
                            color: gold,
                            marginBottom: "8px"
                          },
                          children: "Invoice"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            fontSize: "28px",
                            fontWeight: 300,
                            color: brown,
                            letterSpacing: "-0.5px"
                          },
                          children: [
                            "#",
                            String(invoice.invoiceNumber).padStart(4, "0")
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            display: "inline-block",
                            marginTop: "10px",
                            padding: "4px 14px",
                            border: `1px solid ${gold}`,
                            borderRadius: "2px",
                            background: statusStyle.bg,
                            color: statusStyle.color,
                            fontSize: "10px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "1.5px"
                          },
                          children: String(invoice.paymentStatus)
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    height: "1px",
                    background: gold,
                    marginTop: "28px",
                    opacity: 0.4
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "28px 48px",
              background: goldLight,
              borderBottom: `1px solid ${hairline}`,
              gap: "24px",
              flexWrap: "wrap",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "9px",
                      fontWeight: 700,
                      color: gold,
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      marginBottom: "10px"
                    },
                    children: "Bill To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: "16px", color: brown }, children: client.name }),
                client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "13px",
                      color: brownLight,
                      marginTop: "2px",
                      fontStyle: "italic"
                    },
                    children: client.companyName
                  }
                ),
                client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { fontSize: "12px", color: brownLight, marginTop: "2px" },
                    children: [
                      "GSTIN: ",
                      client.gstNumber
                    ]
                  }
                ),
                client.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "12px",
                      color: brownLight,
                      marginTop: "2px",
                      maxWidth: "200px"
                    },
                    children: client.address
                  }
                ),
                client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: brownLight, marginTop: "2px" },
                    children: client.phone
                  }
                ),
                client.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { fontSize: "12px", color: brownLight, marginTop: "2px" },
                    children: client.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "12px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "9px",
                        fontWeight: 700,
                        color: gold,
                        textTransform: "uppercase",
                        letterSpacing: "3px"
                      },
                      children: "Invoice Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: { fontSize: "14px", color: brownMid, marginTop: "3px" },
                      children: invoice.invoiceDate
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "9px",
                        fontWeight: 700,
                        color: gold,
                        textTransform: "uppercase",
                        letterSpacing: "3px"
                      },
                      children: "Due Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: { fontSize: "14px", color: brownMid, marginTop: "3px" },
                      children: invoice.dueDate
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "28px 48px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                style: {
                  borderTop: `1px solid ${gold}`,
                  borderBottom: `1px solid ${gold}`,
                  background: goldLight,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 10px",
                        textAlign: "left",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: goldDark,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px"
                      },
                      children: "Description"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 10px",
                        textAlign: "center",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: goldDark,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px"
                      },
                      children: "Qty"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: goldDark,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px"
                      },
                      children: "Rate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 10px",
                        textAlign: "center",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: goldDark,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px"
                      },
                      children: "Tax"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 10px",
                        textAlign: "center",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: goldDark,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px"
                      },
                      children: "Disc%"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: goldDark,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px"
                      },
                      children: "Amount"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
              const lt = Number(item.quantity) * Number(item.rate);
              const disc = lt * Number(item.discount) / 100;
              const taxable = lt - disc;
              const tax = taxable * Number(item.taxRate) / 100;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  style: {
                    borderBottom: `1px solid ${hairline}`,
                    background: idx % 2 === 0 ? warmWhite : ivory
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 10px",
                          fontSize: "13px",
                          color: brown
                        },
                        children: item.itemName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 10px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: brownLight
                        },
                        children: String(item.quantity)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 10px",
                          textAlign: "right",
                          fontSize: "13px",
                          color: brownLight
                        },
                        children: formatCurrency$1(Number(item.rate))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "11px 10px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: brownLight
                        },
                        children: [
                          item.taxType,
                          " ",
                          String(item.taxRate),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "11px 10px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: brownLight
                        },
                        children: [
                          String(item.discount),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 10px",
                          textAlign: "right",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: brown
                        },
                        children: formatCurrency$1(taxable + tax)
                      }
                    )
                  ]
                },
                `${item.itemName}-${idx}`
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: "260px" }, children: [
                [
                  {
                    label: "Subtotal",
                    value: formatCurrency$1(Number(invoice.subtotal)),
                    show: true,
                    color: brown
                  },
                  {
                    label: "Discount",
                    value: `-${formatCurrency$1(Number(invoice.totalDiscount))}`,
                    show: Number(invoice.totalDiscount) > 0,
                    color: red$1
                  },
                  {
                    label: "CGST",
                    value: formatCurrency$1(cgst),
                    show: hasCGST && cgst > 0,
                    color: brown
                  },
                  {
                    label: "SGST",
                    value: formatCurrency$1(sgst),
                    show: hasSGST && sgst > 0,
                    color: brown
                  },
                  {
                    label: "IGST",
                    value: formatCurrency$1(igst),
                    show: hasIGST && igst > 0,
                    color: brown
                  },
                  {
                    label: "Tax",
                    value: formatCurrency$1(Number(invoice.totalTax)),
                    show: Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST,
                    color: brown
                  }
                ].filter((r) => r.show).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 0",
                      borderBottom: `1px solid ${hairline}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            color: brownLight,
                            fontStyle: "italic"
                          },
                          children: row.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: row.color
                          },
                          children: row.value
                        }
                      )
                    ]
                  },
                  row.label
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      marginTop: "10px",
                      background: ivory,
                      border: `1px solid ${gold}`,
                      printColorAdjust: "exact",
                      WebkitPrintColorAdjust: "exact"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "15px",
                            fontWeight: 700,
                            color: brown,
                            letterSpacing: "0.5px"
                          },
                          children: "Grand Total"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: { fontSize: "15px", fontWeight: 700, color: goldDark },
                          children: formatCurrency$1(Number(invoice.grandTotal))
                        }
                      )
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "24px",
              padding: "16px 40px",
              background: "#fdfcfb",
              borderTop: "1px solid #d4c5a9",
              flexWrap: "wrap"
            },
            children: [
              ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#3d2b1f",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b5744",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                  }
                )
              ] }),
              ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#3d2b1f",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bank Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b5744",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                  }
                )
              ] })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "20px 48px",
              background: goldLight,
              borderTop: `1px solid ${hairline}`,
              textAlign: "center",
              fontSize: "12px",
              color: brownLight,
              fontStyle: "italic",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: "Thank you for your patronage. We look forward to serving you again."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: "3px",
              background: gold,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            }
          }
        )
      ]
    }
  );
}
const purple = "#7c3aed";
const purpleLight = "#ede9fe";
const indigo = "#4f46e5";
const white = "#ffffff";
const dark = "#1e1b4b";
const gray = "#6b7280";
const lightBg = "#f5f3ff";
const borderColor = "#ddd6fe";
const red = "#ef4444";
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function getStatusStyle(status) {
  switch (status) {
    case "paid":
      return { bg: "#d1fae5", color: "#065f46" };
    case "partial":
      return { bg: "#fef3c7", color: "#92400e" };
    default:
      return { bg: "#fee2e2", color: "#991b1b" };
  }
}
function calcTaxTotals(invoice) {
  const calc = (type) => invoice.lineItems.filter((i) => i.taxType === type).reduce((s, i) => {
    const lt = Number(i.quantity) * Number(i.rate);
    return s + (lt - lt * Number(i.discount) / 100) * Number(i.taxRate) / 100;
  }, 0);
  return { cgst: calc("CGST"), sgst: calc("SGST"), igst: calc("IGST") };
}
function StartupTemplate({
  invoice,
  businessProfile
}) {
  var _a, _b, _c, _d, _e, _f;
  const statusStyle = getStatusStyle(String(invoice.paymentStatus));
  const client = invoice.client;
  const { cgst, sgst, igst } = calcTaxTotals(invoice);
  const hasCGST = invoice.lineItems.some((i) => i.taxType === "CGST");
  const hasSGST = invoice.lineItems.some((i) => i.taxType === "SGST");
  const hasIGST = invoice.lineItems.some((i) => i.taxType === "IGST");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "invoice-preview",
      style: {
        fontFamily: "'Segoe UI', system-ui, Arial, sans-serif",
        background: white,
        color: dark,
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 4px 32px rgba(124,58,237,0.15)",
        borderRadius: "16px",
        overflow: "hidden",
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: "8px",
              background: `linear-gradient(90deg, ${purple} 0%, ${indigo} 50%, #06b6d4 100%)`,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "36px 44px 28px 44px",
              background: white,
              borderBottom: `1px solid ${borderColor}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    (businessProfile == null ? void 0 : businessProfile.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: businessProfile.logo.getDirectURL(),
                        alt: "Logo",
                        style: {
                          height: "40px",
                          marginBottom: "10px",
                          objectFit: "contain"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "22px",
                          fontWeight: 800,
                          color: dark,
                          letterSpacing: "-0.5px"
                        },
                        children: (businessProfile == null ? void 0 : businessProfile.businessName) || "Your Business"
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.gstNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "11px", color: gray, marginTop: "3px" }, children: [
                      "GSTIN: ",
                      businessProfile.gstNumber
                    ] }),
                    (businessProfile == null ? void 0 : businessProfile.address) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          color: gray,
                          marginTop: "2px",
                          maxWidth: "220px"
                        },
                        children: businessProfile.address
                      }
                    ),
                    (businessProfile == null ? void 0 : businessProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: gray, marginTop: "2px" }, children: businessProfile.phone }),
                    (businessProfile == null ? void 0 : businessProfile.email) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: gray, marginTop: "2px" }, children: businessProfile.email })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          display: "inline-block",
                          padding: "6px 16px",
                          background: purpleLight,
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: purple,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "8px"
                        },
                        children: "Invoice"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "28px", fontWeight: 800, color: dark }, children: [
                      "#",
                      String(invoice.invoiceNumber).padStart(4, "0")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          display: "inline-block",
                          marginTop: "8px",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase"
                        },
                        children: String(invoice.paymentStatus)
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "24px 44px",
              background: lightBg,
              borderBottom: `1px solid ${borderColor}`,
              gap: "24px",
              flexWrap: "wrap",
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: purple,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      marginBottom: "8px"
                    },
                    children: "Bill To"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: "15px", color: dark }, children: client.name }),
                client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "13px", color: gray }, children: client.companyName }),
                client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", color: gray }, children: [
                  "GSTIN: ",
                  client.gstNumber
                ] }),
                client.address && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: gray, maxWidth: "200px" }, children: client.address }),
                client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: gray }, children: client.phone }),
                client.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: gray }, children: client.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "10px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: purple,
                        textTransform: "uppercase",
                        letterSpacing: "2px"
                      },
                      children: "Invoice Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: dark }, children: invoice.invoiceDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: purple,
                        textTransform: "uppercase",
                        letterSpacing: "2px"
                      },
                      children: "Due Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: dark }, children: invoice.dueDate })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "24px 44px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                style: {
                  background: `linear-gradient(90deg, ${purple} 0%, ${indigo} 100%)`,
                  color: white,
                  printColorAdjust: "exact",
                  WebkitPrintColorAdjust: "exact"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "11px 12px",
                        textAlign: "left",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Item"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "11px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Qty"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "11px 12px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Rate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "11px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Tax"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "11px 12px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Disc%"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "11px 12px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      },
                      children: "Amount"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
              const lt = Number(item.quantity) * Number(item.rate);
              const disc = lt * Number(item.discount) / 100;
              const taxable = lt - disc;
              const tax = taxable * Number(item.taxRate) / 100;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  style: {
                    borderBottom: `1px solid ${borderColor}`,
                    background: idx % 2 === 0 ? white : lightBg
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          fontSize: "13px",
                          color: dark
                        },
                        children: item.itemName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: gray
                        },
                        children: String(item.quantity)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "right",
                          fontSize: "13px",
                          color: gray
                        },
                        children: formatCurrency(Number(item.rate))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: gray
                        },
                        children: [
                          item.taxType,
                          " ",
                          String(item.taxRate),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: gray
                        },
                        children: [
                          String(item.discount),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "11px 12px",
                          textAlign: "right",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: purple
                        },
                        children: formatCurrency(taxable + tax)
                      }
                    )
                  ]
                },
                `${item.itemName}-${idx}`
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: "260px" }, children: [
                [
                  {
                    label: "Subtotal",
                    value: formatCurrency(Number(invoice.subtotal)),
                    show: true,
                    color: dark
                  },
                  {
                    label: "Discount",
                    value: `-${formatCurrency(Number(invoice.totalDiscount))}`,
                    show: Number(invoice.totalDiscount) > 0,
                    color: red
                  },
                  {
                    label: "CGST",
                    value: formatCurrency(cgst),
                    show: hasCGST && cgst > 0,
                    color: dark
                  },
                  {
                    label: "SGST",
                    value: formatCurrency(sgst),
                    show: hasSGST && sgst > 0,
                    color: dark
                  },
                  {
                    label: "IGST",
                    value: formatCurrency(igst),
                    show: hasIGST && igst > 0,
                    color: dark
                  },
                  {
                    label: "Tax",
                    value: formatCurrency(Number(invoice.totalTax)),
                    show: Number(invoice.totalTax) > 0 && !hasCGST && !hasSGST && !hasIGST,
                    color: dark
                  }
                ].filter((r) => r.show).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 0",
                      borderBottom: `1px solid ${borderColor}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: gray }, children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: 600,
                            color: row.color
                          },
                          children: row.value
                        }
                      )
                    ]
                  },
                  row.label
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      marginTop: "10px",
                      background: `linear-gradient(135deg, ${purple} 0%, ${indigo} 100%)`,
                      borderRadius: "12px",
                      color: white,
                      printColorAdjust: "exact",
                      WebkitPrintColorAdjust: "exact"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 800 }, children: "Grand Total" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "15px", fontWeight: 900 }, children: formatCurrency(Number(invoice.grandTotal)) })
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        ((_a = invoice.bankDetails) == null ? void 0 : _a[0]) || ((_b = invoice.termsAndConditions) == null ? void 0 : _b[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "24px",
              padding: "16px 44px",
              background: "#f9fafb",
              borderTop: "1px solid #d1d5db",
              flexWrap: "wrap"
            },
            children: [
              ((_c = invoice.termsAndConditions) == null ? void 0 : _c[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_d = invoice.termsAndConditions) == null ? void 0 : _d[0]
                  }
                )
              ] }),
              ((_e = invoice.bankDetails) == null ? void 0 : _e[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: "200px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "6px"
                    },
                    children: "Bank Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "11px",
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5
                    },
                    children: (_f = invoice.bankDetails) == null ? void 0 : _f[0]
                  }
                )
              ] })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "16px 44px",
              background: purpleLight,
              borderTop: `1px solid ${borderColor}`,
              textAlign: "center",
              fontSize: "12px",
              color: purple,
              fontWeight: 600,
              printColorAdjust: "exact",
              WebkitPrintColorAdjust: "exact"
            },
            children: "Thank you for your business! 🚀"
          }
        )
      ]
    }
  );
}
const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    isPremium: false,
    quality: "hd",
    component: ModernTemplate
  },
  {
    id: "classic",
    name: "Classic",
    isPremium: false,
    quality: "hd",
    component: ClassicTemplate
  },
  {
    id: "minimal",
    name: "Minimal",
    isPremium: false,
    quality: "hd",
    component: MinimalTemplate
  },
  { id: "bold", name: "Bold", isPremium: true, component: BoldTemplate },
  {
    id: "elegant",
    name: "Elegant",
    isPremium: true,
    component: ElegantTemplate
  },
  {
    id: "startup",
    name: "Startup",
    isPremium: true,
    component: StartupTemplate
  },
  {
    id: "boutique",
    name: "Boutique",
    isPremium: true,
    component: BoutiqueTemplate
  },
  { id: "agency", name: "Agency", isPremium: true, component: AgencyTemplate },
  {
    id: "classic-premium",
    name: "Classic Pro",
    isPremium: true,
    component: ClassicPremiumTemplate
  }
];
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
function InvoicePreviewPage() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const invoiceNumber = Number.parseInt(params.invoiceNumber || "0", 10);
  const { data: invoice, isLoading: invoiceLoading } = useInvoice(
    invoiceNumber > 0 ? BigInt(invoiceNumber) : null
  );
  const { data: businessProfile, isLoading: profileLoading } = useBusinessProfile();
  const updateInvoice = useUpdateInvoice();
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState("modern");
  const [isPrinting, setIsPrinting] = reactExports.useState(false);
  const printRef = reactExports.useRef(null);
  const previewWrapperRef = reactExports.useRef(null);
  const [previewScale, setPreviewScale] = reactExports.useState(1);
  reactExports.useEffect(() => {
    const el = previewWrapperRef.current;
    if (!el) return;
    const update = () => {
      const containerWidth = el.offsetWidth;
      setPreviewScale(Math.min(1, containerWidth / A4_WIDTH));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const isPro = (businessProfile == null ? void 0 : businessProfile.plan) !== void 0 && (businessProfile.plan === Plan.pro_single || businessProfile.plan === Plan.pro_bundle || Number(businessProfile.remainingInvoiceCredits) > 0);
  const isLoading = invoiceLoading || profileLoading;
  const handlePrint = async () => {
    var _a;
    if (!invoice || !businessProfile) return;
    setIsPrinting(true);
    try {
      const TemplateComponent2 = (_a = TEMPLATES.find(
        (t) => t.id === selectedTemplate
      )) == null ? void 0 : _a.component;
      if (!TemplateComponent2) {
        ue.error("Template not available");
        setIsPrinting(false);
        return;
      }
      if (invoice.status === "draft") {
        try {
          await updateInvoice.mutateAsync({
            ...invoice,
            status: "finalized"
          });
        } catch {
        }
      }
      const { renderToStaticMarkup } = await __vitePreload(async () => {
        const { renderToStaticMarkup: renderToStaticMarkup2 } = await import("./server.browser-C_rY2Jmg.js").then((n) => n.s);
        return { renderToStaticMarkup: renderToStaticMarkup2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      const html = renderToStaticMarkup(
        React.createElement(TemplateComponent2, { invoice, businessProfile })
      );
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        ue.error("Please allow popups to download the PDF");
        setIsPrinting(false);
        return;
      }
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Invoice #${String(invoice.invoiceNumber).padStart(4, "0")}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: sans-serif; }
              @media print {
                @page { margin: 0; size: A4; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            </style>
          </head>
          <body>${html}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsPrinting(false);
      }, 500);
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to generate PDF");
      setIsPrinting(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[600px] w-full" })
    ] });
  }
  if (!invoice || !businessProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Invoice not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "mt-4",
          onClick: () => navigate({ to: "/invoices" }),
          children: "Back to Invoices"
        }
      )
    ] });
  }
  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplate);
  const TemplateComponent = currentTemplate == null ? void 0 : currentTemplate.component;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            "data-ocid": "preview.button",
            onClick: () => navigate({ to: `/invoices/${invoiceNumber}` }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground", children: [
            "Preview — Invoice #",
            String(invoice.invoiceNumber).padStart(4, "0")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: invoice.client.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handlePrint,
          disabled: isPrinting,
          "data-ocid": "preview.primary_button",
          children: isPrinting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            "Generating..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
            "Download PDF"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground mb-3", children: "Choose Template" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2", children: TEMPLATES.map((template) => {
        const isLocked = template.isPremium && !isPro;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          TemplatePreviewCard,
          {
            templateId: template.id,
            name: template.name,
            isSelected: selectedTemplate === template.id,
            isPremium: template.isPremium,
            isLocked,
            quality: template.quality,
            onClick: () => {
              if (isLocked) {
                ue.info(
                  "Purchase invoice credits to unlock premium templates"
                );
                return;
              }
              setSelectedTemplate(template.id);
            }
          },
          template.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: previewWrapperRef,
        className: "w-full rounded-xl shadow-lg overflow-hidden",
        children: TemplateComponent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "relative",
              width: "100%",
              height: A4_HEIGHT * previewScale
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: printRef,
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: A4_WIDTH,
                  transformOrigin: "top left",
                  transform: `scale(${previewScale})`
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TemplateComponent,
                  {
                    invoice,
                    businessProfile
                  }
                )
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-96 bg-white text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Template not available" })
        ] }) })
      }
    )
  ] });
}
export {
  InvoicePreviewPage as default
};
