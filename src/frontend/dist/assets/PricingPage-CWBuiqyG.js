import { t as useInternetIdentity, u as useBusinessProfile, v as usePurchaseInvoiceCredits, R as React, j as jsxRuntimeExports, n as Crown, b as Plan, Z as Zap, B as Button, w as Star, q as Package, L as LoaderCircle, x as Shield, c as ue } from "./index-D5Ia9PfW.js";
import { C as Check } from "./check-wnXPkzLF.js";
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
const RAZORPAY_KEY_ID = "rzp_test_YourKeyHere";
const PLANS = [
  {
    id: "single",
    label: "1 Invoice",
    price: "₹5",
    paise: 500,
    quantity: 1,
    planType: Plan.pro_single,
    description: "Perfect for a one-time invoice",
    features: [
      "1 invoice credit",
      "All 13 templates (standard + premium)",
      "Full GST support (CGST/SGST/IGST)",
      "PDF download & print",
      "Email & WhatsApp share"
    ],
    badge: null,
    highlight: false
  },
  {
    id: "bundle",
    label: "10 Invoices",
    price: "₹39",
    paise: 3900,
    quantity: 10,
    planType: Plan.pro_bundle,
    description: "Best value — save ₹11",
    features: [
      "10 invoice credits",
      "All 13 templates (standard + premium)",
      "Full GST support (CGST/SGST/IGST)",
      "PDF download & print",
      "Email & WhatsApp share",
      "Priority support"
    ],
    badge: "Best Value",
    highlight: true
  }
];
const FREE_FEATURES = [
  "Up to 5 invoices",
  "3 standard templates",
  "Basic GST support",
  "PDF download & print",
  "Client management",
  "Email & WhatsApp share"
];
const COMPARISON_ROWS = [
  {
    feature: "Invoices",
    free: "5 total",
    single: "1 credit",
    bundle: "10 credits"
  },
  {
    feature: "Templates",
    free: "3 standard",
    single: "13 templates",
    bundle: "13 templates"
  },
  { feature: "GST Support", free: "Basic", single: "Full", bundle: "Full" },
  { feature: "PDF Export", free: true, single: true, bundle: true },
  { feature: "Client Management", free: true, single: true, bundle: true },
  { feature: "WhatsApp Share", free: true, single: true, bundle: true },
  { feature: "Email Share", free: true, single: true, bundle: true },
  { feature: "Priority Support", free: false, single: false, bundle: true }
];
function PricingPage() {
  const { identity } = useInternetIdentity();
  const { data: businessProfile } = useBusinessProfile();
  const purchaseCredits = usePurchaseInvoiceCredits();
  const [processingPlan, setProcessingPlan] = React.useState(null);
  const remainingCredits = Number(
    (businessProfile == null ? void 0 : businessProfile.remainingInvoiceCredits) ?? 0
  );
  const handleBuyNow = async (plan) => {
    if (!identity) {
      ue.error("Please log in to purchase invoice credits.");
      return;
    }
    setProcessingPlan(plan.id);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      ue.error("Failed to load payment gateway. Please try again.");
      setProcessingPlan(null);
      return;
    }
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: plan.paise,
      currency: "INR",
      name: "InvoiceEase",
      description: `InvoiceEase — ${plan.label} (${plan.price})`,
      image: "/assets/generated/invoiceease-logo.dim_256x256.png",
      handler: async (response) => {
        if (response.razorpay_payment_id) {
          try {
            await purchaseCredits.mutateAsync({
              stripeSessionId: response.razorpay_payment_id,
              paymentAmount: BigInt(plan.paise),
              planType: plan.planType,
              quantity: BigInt(plan.quantity)
            });
            ue.success(
              `🎉 Purchase successful! ${plan.quantity} invoice credit${plan.quantity > 1 ? "s" : ""} added to your account.`
            );
          } catch {
            ue.error(
              `Payment received but credit update failed. Please contact support with your payment ID: ${response.razorpay_payment_id}`
            );
          }
        } else {
          ue.error("Payment verification failed. Please contact support.");
        }
        setProcessingPlan(null);
      },
      prefill: {
        email: (businessProfile == null ? void 0 : businessProfile.email) || "",
        name: (businessProfile == null ? void 0 : businessProfile.businessName) || "",
        contact: (businessProfile == null ? void 0 : businessProfile.phone) || ""
      },
      theme: {
        color: "#0d9488"
      },
      modal: {
        ondismiss: () => {
          ue.info("Payment cancelled.");
          setProcessingPlan(null);
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto py-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4" }),
        "Buy Invoice Credits"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3", children: "Simple, Pay-as-You-Go Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Start free with 5 invoices. Buy more credits whenever you need them — no subscriptions." }),
      remainingCredits > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-4 py-2 rounded-full text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
        "You have ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "mx-1", children: remainingCredits }),
        " ",
        "invoice credit",
        remainingCredits !== 1 ? "s" : "",
        " remaining"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border border-border rounded-2xl p-7 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: "Free" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-extrabold text-foreground", children: "₹0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mb-1", children: "/forever" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Perfect for getting started" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 flex-1 mb-8", children: FREE_FEATURES.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center gap-3 text-sm text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary shrink-0" }),
              feature
            ]
          },
          feature
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", disabled: true, children: "Current Free Plan" })
      ] }),
      PLANS.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `relative bg-card rounded-2xl p-7 flex flex-col ${plan.highlight ? "border-2 border-primary shadow-lg" : "border border-border"}`,
          children: [
            plan.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
              plan.badge
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                plan.id === "bundle" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: plan.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-extrabold text-foreground", children: plan.price }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mb-1", children: plan.id === "single" ? "/invoice" : "/10 invoices" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: plan.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 flex-1 mb-8", children: plan.features.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-3 text-sm text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary shrink-0" }),
                  feature
                ]
              },
              feature
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full",
                variant: plan.highlight ? "default" : "outline",
                onClick: () => handleBuyNow(plan),
                disabled: processingPlan !== null || purchaseCredits.isPending,
                children: processingPlan === plan.id || purchaseCredits.isPending && processingPlan === plan.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Processing..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  plan.id === "bundle" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 mr-2" }),
                  "Buy Now — ",
                  plan.price
                ] })
              }
            )
          ]
        },
        plan.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-bold text-foreground text-lg", children: "Feature Comparison" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 text-sm font-semibold text-muted-foreground w-2/5", children: "Feature" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 text-sm font-semibold text-muted-foreground", children: "Free" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 text-sm font-semibold text-muted-foreground", children: "1 Invoice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 text-sm font-semibold text-primary", children: "10 Invoices" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: COMPARISON_ROWS.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-border last:border-0 ${idx % 2 === 0 ? "" : "bg-muted/20"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5 text-sm text-foreground font-medium", children: row.feature }),
              ["free", "single", "bundle"].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-center", children: typeof row[col] === "boolean" ? row[col] ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-lg leading-none", children: "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm ${col === "bundle" ? "font-semibold text-primary" : "text-muted-foreground"}`,
                  children: row[col]
                }
              ) }, col))
            ]
          },
          row.feature
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border border-border rounded-xl p-5 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "How credits work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Each invoice you create uses 1 credit. Free plan users get 5 invoices at no cost. After that, purchase credits as needed —",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "₹5 for 1 invoice" }),
          " or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "₹39 for 10 invoices" }),
          " (save ₹11). Credits never expire."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Secure payment powered by Razorpay. Your payment information is encrypted and secure." })
  ] });
}
export {
  PricingPage as default
};
