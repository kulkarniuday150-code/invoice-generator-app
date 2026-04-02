import { d as createLucideIcon, a4 as useParams, Y as useNavigate, a5 as useInvoice, u as useBusinessProfile, a8 as useDeleteInvoice, a9 as useUpdatePaymentStatus, r as reactExports, b as Plan, j as jsxRuntimeExports, L as LoaderCircle, B as Button, aa as ArrowLeft, C as Card, o as CardHeader, p as CardTitle, l as CardContent, P as PaymentStatus, n as Crown, c as ue } from "./index-D5Ia9PfW.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-B-ezkG7e.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DAXAE4Hz.js";
import { T as TooltipProvider } from "./tooltip-BKZHWZwM.js";
import { a as formatInvoiceNumber, f as formatCurrency$1 } from "./formatters-Bkzquddd.js";
import { E as Eye } from "./eye-CuxNNjGE.js";
import { M as Mail } from "./mail--QCk6ryh.js";
import { T as Trash2 } from "./trash-2-GZKUN2VB.js";
import "./index-BC-PgpLx.js";
import "./index-BwAdBz8E.js";
import "./index-DLRuTKTx.js";
import "./index-BpTihNSv.js";
import "./check-wnXPkzLF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode);
function generateWhatsAppShareUrl(invoice, businessName) {
  const invoiceNum = formatInvoiceNumber(invoice.invoiceNumber);
  const total = formatCurrency$1(invoice.grandTotal);
  const message = `Invoice ${invoiceNum}
From: ${businessName ?? ""}
To: ${invoice.client.name}
Amount: ${total}
Due: ${invoice.dueDate}
Status: ${invoice.paymentStatus}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
function generateEmailShareUrl(invoice, businessName) {
  const invoiceNum = formatInvoiceNumber(invoice.invoiceNumber);
  const total = formatCurrency$1(invoice.grandTotal);
  const subject = `Invoice ${invoiceNum} from ${businessName ?? ""}`;
  const body = `Dear ${invoice.client.name},

Please find your invoice details below:

Invoice Number: ${invoiceNum}
Amount: ${total}
Due Date: ${invoice.dueDate}
Status: ${invoice.paymentStatus}

Thank you for your business.

${businessName ?? ""}`;
  return `mailto:${invoice.client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}
function getStatusColor(status) {
  switch (status) {
    case PaymentStatus.paid:
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case PaymentStatus.partial:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case PaymentStatus.unpaid:
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}
function InvoiceDetailPage() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const invoiceNumber = Number.parseInt(params.invoiceNumber || "0", 10);
  const { data: invoice, isLoading } = useInvoice(
    invoiceNumber > 0 ? BigInt(invoiceNumber) : null
  );
  const { data: businessProfile } = useBusinessProfile();
  const deleteInvoice = useDeleteInvoice();
  const updatePaymentStatus = useUpdatePaymentStatus();
  const [statusUpdating, setStatusUpdating] = reactExports.useState(false);
  const isPro = (businessProfile == null ? void 0 : businessProfile.plan) !== void 0 && (businessProfile.plan === Plan.pro_single || businessProfile.plan === Plan.pro_bundle || Number(businessProfile.remainingInvoiceCredits) > 0);
  const handleStatusChange = async (value) => {
    if (!invoice) return;
    setStatusUpdating(true);
    try {
      const statusMap = {
        paid: PaymentStatus.paid,
        unpaid: PaymentStatus.unpaid,
        partial: PaymentStatus.partial
      };
      await updatePaymentStatus.mutateAsync({
        invoiceNumber: invoice.invoiceNumber,
        status: statusMap[value]
      });
      ue.success("Payment status updated");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };
  const handleDelete = async () => {
    if (!invoice) return;
    try {
      await deleteInvoice.mutateAsync(invoice.invoiceNumber);
      ue.success("Invoice deleted");
      navigate({ to: "/invoices" });
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to delete invoice");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) });
  }
  if (!invoice) {
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
  const whatsappUrl = generateWhatsAppShareUrl(
    invoice,
    businessProfile == null ? void 0 : businessProfile.businessName
  );
  const emailUrl = generateEmailShareUrl(
    invoice,
    businessProfile == null ? void 0 : businessProfile.businessName
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate({ to: "/invoices" }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground", children: [
          "Invoice #",
          String(invoice.invoiceNumber).padStart(4, "0")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: invoice.invoiceDate })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.paymentStatus)}`,
          children: invoice.paymentStatus
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/invoices/${invoiceNumber}/edit`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4 mr-2" }),
        "Edit"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/invoices/${invoiceNumber}/preview`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 mr-2" }),
        "Preview"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: whatsappUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "text-green-600 border-green-300 hover:bg-green-50 dark:hover:bg-green-950/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 mr-2" }),
            "WhatsApp"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: emailUrl, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "text-blue-600 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 mr-2" }),
            "Email"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "text-destructive border-destructive/30 hover:bg-destructive/10 ml-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
              "Delete"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Invoice?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This action cannot be undone. Invoice #",
              String(invoice.invoiceNumber).padStart(4, "0"),
              " will be permanently deleted."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                children: "Delete"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Client" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: invoice.client.name }),
          invoice.client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: invoice.client.companyName }),
          invoice.client.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: invoice.client.email }),
          invoice.client.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: invoice.client.phone }),
          invoice.client.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: invoice.client.address }),
          invoice.client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "GST: ",
            invoice.client.gstNumber
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Invoice Details" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Invoice Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: invoice.invoiceDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Due Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: invoice.dueDate || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: invoice.status })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Line Items" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-muted-foreground font-medium", children: "Item" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-muted-foreground font-medium", children: "Qty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-muted-foreground font-medium", children: "Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-muted-foreground font-medium", children: "Tax" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-muted-foreground font-medium", children: "Total" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoice.lineItems.map((item, idx) => {
            const base = Number(item.quantity) * Number(item.rate);
            const discAmt = base * Number(item.discount) / 100;
            const taxable = base - discAmt;
            const taxAmt = taxable * Number(item.taxRate) / 100;
            const lineTotal = taxable + taxAmt;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-foreground", children: item.itemName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right text-muted-foreground", children: Number(item.quantity) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right text-muted-foreground", children: formatCurrency(item.rate) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right text-muted-foreground", children: item.taxType !== "None" ? `${item.taxType} ${Number(item.taxRate)}%` : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right font-medium", children: formatCurrency(lineTotal) })
                ]
              },
              `${item.itemName}-${idx}`
            );
          }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1.5 border-t border-border pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(invoice.subtotal) })
          ] }),
          Number(invoice.totalDiscount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "-",
              formatCurrency(invoice.totalDiscount)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(invoice.totalTax) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base border-t border-border pt-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatCurrency(invoice.grandTotal) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Payment Status" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: invoice.paymentStatus,
            onValueChange: handleStatusChange,
            disabled: statusUpdating,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentStatus.unpaid, children: "Unpaid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentStatus.partial, children: "Partial" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentStatus.paid, children: "Paid" })
              ] })
            ]
          }
        ),
        statusUpdating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-primary" })
      ] }) })
    ] }),
    !isPro && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-3 px-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-amber-800 dark:text-amber-200", children: "Buy invoice credits to unlock premium templates and more" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "border-amber-500 text-amber-700 hover:bg-amber-100 dark:text-amber-300 whitespace-nowrap",
          children: "Buy Credits"
        }
      ) })
    ] }) })
  ] }) });
}
export {
  InvoiceDetailPage as default
};
