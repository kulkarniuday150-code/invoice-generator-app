import { d as createLucideIcon, a as useInvoices, u as useBusinessProfile, r as reactExports, b as Plan, D as InvoiceStatus, j as jsxRuntimeExports, B as Button, m as Link, I as Input, F as FileText, C as Card, l as CardContent } from "./index-D5Ia9PfW.js";
import { S as Skeleton } from "./skeleton-QpRwiCJS.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DYaXzjS1.js";
import { P as PaymentStatusBadge } from "./PaymentStatusBadge-CktIAdp6.js";
import { a as formatInvoiceNumber, b as formatDate, f as formatCurrency } from "./formatters-Bkzquddd.js";
import { P as Plus } from "./plus-LNQXxajL.js";
import { C as CircleAlert, T as Ticket } from "./ticket-YyyAv1w6.js";
import { S as Search } from "./search-Bm8W1ykJ.js";
import "./index-BC-PgpLx.js";
import "./index-DLRuTKTx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5", key: "1couwa" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    {
      d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1y4qbx"
    }
  ]
];
const FilePen = createLucideIcon("file-pen", __iconNode);
function InvoiceCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
    ] })
  ] }) }) });
}
function InvoiceCard({ invoice, isDraft }) {
  const href = `/invoices/${invoice.invoiceNumber}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href,
      className: "block no-underline",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card hover:shadow-md transition-shadow cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDraft ? "bg-amber-100 dark:bg-amber-900/30" : "bg-accent"}`,
              children: isDraft ? /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "w-5 h-5 text-amber-600 dark:text-amber-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-accent-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: formatInvoiceNumber(invoice.invoiceNumber) }),
              isDraft && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded font-medium", children: "Draft" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground truncate", children: [
              invoice.client.name,
              invoice.client.companyName && ` · ${invoice.client.companyName}`
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              formatDate(invoice.invoiceDate),
              invoice.dueDate && ` · Due: ${formatDate(invoice.dueDate)}`
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: formatCurrency(invoice.grandTotal) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { paymentStatus: invoice.paymentStatus })
        ] })
      ] }) }) })
    },
    invoice.invoiceNumber.toString()
  );
}
function InvoiceListPage() {
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const { data: profile, isLoading: profileLoading } = useBusinessProfile();
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("saved");
  const isLoading = invoicesLoading || profileLoading;
  const invoiceCount = (invoices == null ? void 0 : invoices.length) ?? 0;
  const isFreePlan = (profile == null ? void 0 : profile.plan) === Plan.free;
  const remainingCredits = Number((profile == null ? void 0 : profile.remainingInvoiceCredits) ?? 0);
  const freeLimitReached = isFreePlan && invoiceCount >= 5 && remainingCredits === 0;
  const canCreateInvoice = !freeLimitReached;
  const allFiltered = reactExports.useMemo(() => {
    const q = search.toLowerCase();
    return (invoices ?? []).filter((inv) => {
      return formatInvoiceNumber(inv.invoiceNumber).toLowerCase().includes(q) || inv.client.name.toLowerCase().includes(q) || inv.client.companyName.toLowerCase().includes(q);
    }).sort((a, b) => Number(b.invoiceNumber) - Number(a.invoiceNumber));
  }, [invoices, search]);
  const draftInvoices = reactExports.useMemo(
    () => allFiltered.filter((inv) => inv.status === InvoiceStatus.draft),
    [allFiltered]
  );
  const savedInvoices = reactExports.useMemo(
    () => allFiltered.filter((inv) => inv.status !== InvoiceStatus.draft),
    [allFiltered]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold text-foreground", children: "Invoices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: canCreateInvoice, disabled: !canCreateInvoice, children: canCreateInvoice ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/invoices/create", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        "New Invoice"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        "New Invoice"
      ] }) })
    ] }),
    isFreePlan && invoiceCount >= 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `border rounded-lg p-4 flex items-center justify-between gap-4 ${freeLimitReached ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleAlert,
              {
                className: `w-5 h-5 shrink-0 ${freeLimitReached ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-sm ${freeLimitReached ? "text-red-800 dark:text-red-200" : "text-amber-800 dark:text-amber-200"}`,
                children: [
                  freeLimitReached ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    "You've reached the ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "5 invoice limit" }),
                    " on the free plan."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                      invoiceCount,
                      " of 5"
                    ] }),
                    " free invoices used."
                  ] }),
                  remainingCredits > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-700 dark:text-green-400 font-medium ml-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-3 h-3 inline mr-0.5" }),
                    remainingCredits,
                    " purchased credit",
                    remainingCredits !== 1 ? "s" : "",
                    " available."
                  ] })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              className: "shrink-0 border-primary text-primary hover:bg-primary/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: freeLimitReached ? "Buy Credits" : "Buy More" })
            }
          )
        ]
      }
    ),
    !isFreePlan && remainingCredits > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-4 h-4 text-green-600 dark:text-green-400 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-green-800 dark:text-green-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: remainingCredits }),
          " invoice credit",
          remainingCredits !== 1 ? "s" : "",
          " remaining"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          size: "sm",
          className: "text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: "Buy More" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search by invoice number or client name...",
          className: "pl-9"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: (v) => setActiveTab(v),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "saved", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
              "Saved Invoices",
              savedInvoices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-primary/10 text-primary text-xs font-bold px-1.5 py-0.5 rounded-full", children: savedInvoices.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "drafts", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "w-4 h-4" }),
              "Drafts",
              draftInvoices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-1.5 py-0.5 rounded-full", children: draftInvoices.length })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "saved", className: "mt-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceCardSkeleton, {})
          ] }) : savedInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No saved invoices yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: search ? "Try a different search term." : "Create your first invoice to get started." }),
            !search && canCreateInvoice && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/invoices/create", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              "Create Invoice"
            ] }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: savedInvoices.map((invoice) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            InvoiceCard,
            {
              invoice
            },
            invoice.invoiceNumber.toString()
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "drafts", className: "mt-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceCardSkeleton, {})
          ] }) : draftInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No drafts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: search ? "Try a different search term." : "Drafts are auto-saved while you work on an invoice." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: draftInvoices.map((invoice) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            InvoiceCard,
            {
              invoice,
              isDraft: true
            },
            invoice.invoiceNumber.toString()
          )) }) })
        ]
      }
    )
  ] });
}
export {
  InvoiceListPage as default
};
