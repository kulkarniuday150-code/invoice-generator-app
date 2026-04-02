import { j as jsxRuntimeExports, w as Star, u as useBusinessProfile, a as useInvoices, r as reactExports, P as PaymentStatus, b as Plan, F as FileText, z as IndianRupee, T as TrendingUp, B as Button, m as Link, C as Card, l as CardContent, U as Users, q as Package, o as CardHeader, p as CardTitle, A as ArrowRight } from "./index-D5Ia9PfW.js";
import { S as Separator } from "./separator-L1eZsyDE.js";
import { S as Skeleton } from "./skeleton-QpRwiCJS.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-BKZHWZwM.js";
import { C as ClientFormModal } from "./ClientFormModal-VeVcDwra.js";
import { P as PaymentStatusBadge } from "./PaymentStatusBadge-CktIAdp6.js";
import { f as formatCurrency, a as formatInvoiceNumber, b as formatDate } from "./formatters-Bkzquddd.js";
import { C as CircleAlert, T as Ticket } from "./ticket-YyyAv1w6.js";
import { P as Plus } from "./plus-LNQXxajL.js";
import "./index-BC-PgpLx.js";
import "./index-BwAdBz8E.js";
import "./index-BpTihNSv.js";
import "./dialog-DOOEGEKs.js";
const testimonials = [
  {
    name: "Rajesh Kumar",
    business: "Kumar Electronics",
    location: "Mumbai",
    text: "InvoiceEase has transformed how I manage my business invoices. The GST support is excellent and my clients love the professional look!",
    rating: 5,
    initials: "RK",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    name: "Priya Sharma",
    business: "Sharma Textiles",
    location: "Delhi",
    text: "Finally an invoicing app that understands Indian GST requirements. The CGST/SGST breakdown is perfect for my textile business.",
    rating: 5,
    initials: "PS",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
  },
  {
    name: "Amit Patel",
    business: "Patel Consulting",
    location: "Ahmedabad",
    text: "The WhatsApp sharing feature is a game changer. I can send invoices to clients instantly. Highly recommend for freelancers!",
    rating: 5,
    initials: "AP",
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    name: "Sunita Reddy",
    business: "Reddy Catering",
    location: "Hyderabad",
    text: "Beautiful templates and so easy to use. My catering business looks so much more professional now. Worth every rupee!",
    rating: 5,
    initials: "SR",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    name: "Vikram Singh",
    business: "Singh Transport",
    location: "Jaipur",
    text: "Managing invoices for my transport business was a nightmare before. Now it takes minutes. The PDF export is crystal clear.",
    rating: 5,
    initials: "VS",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
  },
  {
    name: "Meera Nair",
    business: "Nair Boutique",
    location: "Kochi",
    text: "The premium templates are stunning! My boutique invoices look like they were designed by a professional. Clients always compliment them.",
    rating: 5,
    initials: "MN",
    color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
  },
  {
    name: "Sanjay Deshmukh",
    business: "Deshmukh Traders",
    location: "Pune",
    text: "GST invoicing बनाना अब बहुत आसान हो गया है! Professional templates और easy sharing से business बढ़ गया है।",
    rating: 5,
    initials: "SD",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
  }
];
function TestimonialsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-heading font-bold text-foreground mb-2", children: "Trusted by Indian Businesses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Join thousands of businesses using InvoiceEase" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({ length: t.rating }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: "w-3.5 h-3.5 fill-amber-400 text-amber-400"
            },
            `star-${t.name}-${i}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed flex-1", children: [
            '"',
            t.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${t.color}`,
                children: t.initials
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                t.business,
                " · ",
                t.location
              ] })
            ] })
          ] })
        ]
      },
      t.name
    )) })
  ] });
}
function getGreeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function getFormattedDate() {
  return (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function StatCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
  ] }) }) });
}
function InvoiceRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3.5 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" })
    ] })
  ] });
}
function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useBusinessProfile();
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const [clientModalOpen, setClientModalOpen] = reactExports.useState(false);
  const isLoading = profileLoading || invoicesLoading;
  const invoiceCount = (invoices == null ? void 0 : invoices.length) ?? 0;
  const paidInvoices = reactExports.useMemo(
    () => (invoices == null ? void 0 : invoices.filter((inv) => inv.paymentStatus === PaymentStatus.paid)) ?? [],
    [invoices]
  );
  const unpaidInvoices = reactExports.useMemo(
    () => (invoices == null ? void 0 : invoices.filter((inv) => inv.paymentStatus === PaymentStatus.unpaid)) ?? [],
    [invoices]
  );
  const totalRevenue = reactExports.useMemo(
    () => paidInvoices.reduce((sum, inv) => sum + Number(inv.grandTotal), 0),
    [paidInvoices]
  );
  const isFreePlan = (profile == null ? void 0 : profile.plan) === Plan.free;
  const remainingCredits = Number((profile == null ? void 0 : profile.remainingInvoiceCredits) ?? 0);
  const freeLimitReached = isFreePlan && invoiceCount >= 5 && remainingCredits === 0;
  const canCreateInvoice = !freeLimitReached;
  const showFreeBanner = isFreePlan && invoiceCount >= 4;
  const recentInvoices = reactExports.useMemo(
    () => [...invoices ?? []].sort(
      (a, b) => new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime()
    ).slice(0, 5),
    [invoices]
  );
  const stats = [
    {
      title: "Total Invoices",
      value: invoiceCount,
      sub: "all time",
      icon: FileText,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      gradient: "from-primary/5 via-primary/[0.02] to-transparent",
      border: "border-primary/10"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      sub: "from paid invoices",
      icon: IndianRupee,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-emerald-500/5 via-emerald-500/[0.02] to-transparent",
      border: "border-emerald-500/10"
    },
    {
      title: "Unpaid",
      value: unpaidInvoices.length,
      sub: "awaiting payment",
      icon: CircleAlert,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
      gradient: "from-amber-500/5 via-amber-500/[0.02] to-transparent",
      border: "border-amber-500/10"
    },
    {
      title: "Paid",
      value: paidInvoices.length,
      sub: "completed",
      icon: TrendingUp,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      gradient: "from-blue-500/5 via-blue-500/[0.02] to-transparent",
      border: "border-blue-500/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-48 mb-1.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-heading font-bold text-foreground tracking-tight", children: [
          getGreeting(),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: (profile == null ? void 0 : profile.businessName) ?? "Welcome" }),
          " ",
          "👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: getFormattedDate() })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: canCreateInvoice,
            disabled: !canCreateInvoice,
            className: "font-bold shadow-sm shadow-primary/20 bg-primary hover:bg-primary/90",
            "data-ocid": "dashboard.primary_button",
            children: canCreateInvoice ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/invoices/create",
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  "New Invoice"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "New Invoice"
            ] })
          }
        ) }) }),
        !canCreateInvoice && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Free plan limit reached. Buy invoice credits to create more." }) })
      ] }) })
    ] }),
    showFreeBanner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `border rounded-2xl p-4 flex items-center justify-between gap-4 ${freeLimitReached ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"}`,
        "data-ocid": "dashboard.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${freeLimitReached ? "bg-red-100 dark:bg-red-800/40" : "bg-amber-100 dark:bg-amber-800/40"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleAlert,
                  {
                    className: `w-5 h-5 ${freeLimitReached ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-sm font-semibold ${freeLimitReached ? "text-red-800 dark:text-red-200" : "text-amber-800 dark:text-amber-200"}`,
                  children: freeLimitReached ? "Free plan limit reached" : `${invoiceCount} of 5 free invoices used`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-xs mt-0.5 ${freeLimitReached ? "text-red-700 dark:text-red-300" : "text-amber-700 dark:text-amber-300"}`,
                  children: freeLimitReached ? "Purchase credits to create more invoices." : "Buy credits to avoid interruption."
                }
              ),
              remainingCredits > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-700 dark:text-emerald-400 mt-1 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-3 h-3 inline mr-1" }),
                remainingCredits,
                " purchased credit",
                remainingCredits !== 1 ? "s" : "",
                " available"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              className: "shrink-0 border-primary text-primary hover:bg-primary/10 font-semibold",
              "data-ocid": "dashboard.secondary_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: "Buy Credits" })
            }
          )
        ]
      }
    ),
    remainingCredits > 0 && !showFreeBanner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-emerald-100 dark:bg-emerald-800/40 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-5 h-5 text-emerald-600 dark:text-emerald-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-emerald-800 dark:text-emerald-200", children: [
          "You have",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            remainingCredits,
            " invoice credit",
            remainingCredits !== 1 ? "s" : ""
          ] }),
          " ",
          "remaining."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          size: "sm",
          className: "shrink-0 border-emerald-400 text-emerald-700 hover:bg-emerald-100 font-semibold",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: "Buy More" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "dashboard.section",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {})
        ] }) : stats.map(
          ({
            title,
            value,
            sub,
            icon: Icon,
            iconBg,
            iconColor,
            gradient,
            border
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: `shadow-card overflow-hidden border ${border} hover:shadow-card-hover transition-shadow duration-200`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-3 border border-white/20`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${iconColor}` })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wide", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-heading font-bold text-foreground mt-1", children: value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
                ] })
              ] })
            },
            title
          )
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: canCreateInvoice,
              disabled: !canCreateInvoice,
              variant: "outline",
              className: "w-full h-auto py-5 flex flex-col gap-2.5 hover:border-primary/60 hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200 rounded-2xl border-2",
              "data-ocid": "actions.primary_button",
              children: canCreateInvoice ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/invoices/create",
                  className: "flex flex-col items-center gap-2.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: "Create Invoice" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "New GST invoice" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: "Create Invoice" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Limit reached" })
              ] })
            }
          ) }) }),
          !canCreateInvoice && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Free plan limit reached — buy credits" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "h-auto py-5 flex flex-col gap-2.5 hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200 rounded-2xl border-2",
            onClick: () => setClientModalOpen(true),
            "data-ocid": "actions.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-emerald-600 dark:text-emerald-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: "Add Client" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Register a new client" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "h-auto py-5 flex flex-col gap-2.5 hover:border-blue-400/60 hover:bg-blue-500/5 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200 rounded-2xl border-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/saved-items",
                className: "flex flex-col items-center gap-2.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: "Item Master" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Manage saved items" })
                ]
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3 px-6 pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-heading font-bold", children: "Recent Invoices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your latest 5 invoices" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "ghost",
            size: "sm",
            className: "text-xs text-primary font-semibold gap-1",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/invoices", children: [
              "View All ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-6 pb-5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceRowSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceRowSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceRowSkeleton, {})
      ] }) : recentInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", "data-ocid": "invoices.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-7 h-7 text-muted-foreground/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold mb-1", children: "No invoices yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Create your first invoice to get started" }),
        canCreateInvoice && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/invoices/create", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
          "Create Invoice"
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: recentInvoices.map((invoice, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `/invoices/${invoice.invoiceNumber}`,
          className: "flex items-center justify-between py-3.5 border-b border-border/60 last:border-0 hover:bg-muted/40 -mx-2 px-2 rounded-xl transition-colors group",
          "data-ocid": `invoices.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: formatInvoiceNumber(invoice.invoiceNumber) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  invoice.client.name,
                  " ·",
                  " ",
                  formatDate(invoice.invoiceDate)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground", children: formatCurrency(invoice.grandTotal) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { paymentStatus: invoice.paymentStatus })
            ] })
          ]
        },
        String(invoice.invoiceNumber)
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ClientFormModal,
      {
        open: clientModalOpen,
        onOpenChange: setClientModalOpen
      }
    )
  ] });
}
export {
  DashboardPage as default
};
