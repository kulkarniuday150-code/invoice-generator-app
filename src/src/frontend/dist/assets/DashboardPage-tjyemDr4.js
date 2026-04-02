import { d as createLucideIcon, j as jsxRuntimeExports, w as Star, u as useBusinessProfile, a as useInvoices, r as reactExports, P as PaymentStatus, b as Plan, F as FileText, B as Button, m as Link, C as Card, l as CardContent, U as Users, J as ArrowRight, o as CardHeader, p as CardTitle } from "./index-CQurMIuK.js";
import { S as Separator } from "./separator-cswUYNsc.js";
import { S as Skeleton } from "./skeleton-dUA9kVRY.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-Cero1jFX.js";
import { C as ClientFormModal } from "./ClientFormModal-DB6yX327.js";
import { P as PaymentStatusBadge } from "./PaymentStatusBadge-DfA9369l.js";
import { b as formatCurrency, f as formatInvoiceNumber, a as formatDate } from "./formatters-C07fhK-s.js";
import { C as CircleAlert, T as Ticket } from "./ticket-B9HkkvEL.js";
import { T as TrendingUp } from "./trending-up-COmz_BBf.js";
import { P as Plus } from "./plus-DYkP-OMc.js";
import "./index-B4Tzu2hK.js";
import "./index-VvkpZohl.js";
import "./index-B3aaHW2j.js";
import "./dialog-BrlW6YE_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode);
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
function StatCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" })
  ] }) }) });
}
function InvoiceRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-1", children: [
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
      icon: FileText,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      gradient: "from-primary/5 to-transparent"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: IndianRupee,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-emerald-500/5 to-transparent"
    },
    {
      title: "Unpaid Invoices",
      value: unpaidInvoices.length,
      icon: CircleAlert,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
      gradient: "from-amber-500/5 to-transparent"
    },
    {
      title: "Paid Invoices",
      value: paidInvoices.length,
      icon: TrendingUp,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      gradient: "from-blue-500/5 to-transparent"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold text-foreground tracking-tight", children: "Dashboard" }),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: profile.businessName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: canCreateInvoice,
            disabled: !canCreateInvoice,
            className: "font-semibold shadow-sm",
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
        className: `border rounded-xl p-4 flex items-center justify-between gap-4 ${freeLimitReached ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleAlert,
              {
                className: `w-5 h-5 shrink-0 ${freeLimitReached ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: `text-sm ${freeLimitReached ? "text-red-800 dark:text-red-200" : "text-amber-800 dark:text-amber-200"}`,
                  children: [
                    "You have used ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                      invoiceCount,
                      " of 5"
                    ] }),
                    " free invoices.",
                    freeLimitReached ? " Purchase credits to create more invoices." : " Buy credits to avoid interruption."
                  ]
                }
              ),
              remainingCredits > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-700 dark:text-green-400 mt-0.5 font-medium", children: [
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
              className: "shrink-0 border-primary text-primary hover:bg-primary/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: "Buy Credits" })
            }
          )
        ]
      }
    ),
    remainingCredits > 0 && !showFreeBanner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-5 h-5 text-green-600 dark:text-green-400 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-green-800 dark:text-green-200", children: [
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
          className: "shrink-0 border-green-400 text-green-700 hover:bg-green-100",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: "Buy More" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {})
    ] }) : stats.map(
      ({ title, value, icon: Icon, iconBg, iconColor, gradient }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-1 font-heading", children: value })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center border border-white/20`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${iconColor}` })
            }
          )
        ] })
      ] }) }, title)
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: canCreateInvoice,
            disabled: !canCreateInvoice,
            variant: "outline",
            className: "w-full h-auto py-4 flex flex-col gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all",
            children: canCreateInvoice ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/invoices/create",
                className: "flex flex-col items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Create Invoice" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Create Invoice" })
            ] })
          }
        ) }) }),
        !canCreateInvoice && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Free plan limit reached — buy credits" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "h-auto py-4 flex flex-col gap-2 hover:border-emerald-400/50 hover:bg-emerald-500/5 transition-all",
          onClick: () => setClientModalOpen(true),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-emerald-600 dark:text-emerald-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Add Client" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          className: "h-auto py-4 flex flex-col gap-2 hover:border-blue-400/50 hover:bg-blue-500/5 transition-all",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/clients", className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "View Clients" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-heading", children: "Recent Invoices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/invoices", children: "View All" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceRowSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceRowSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceRowSkeleton, {})
      ] }) : recentInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted mx-auto mb-3 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-muted-foreground/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "No invoices yet" }),
        canCreateInvoice && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/invoices/create", children: "Create your first invoice" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: recentInvoices.map((invoice) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `/invoices/${invoice.invoiceNumber}`,
          className: "flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm", children: [
                formatInvoiceNumber(invoice.invoiceNumber),
                " ·",
                " ",
                invoice.client.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(invoice.invoiceDate) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: formatCurrency(invoice.grandTotal) }),
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
