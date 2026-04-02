import { d as createLucideIcon, r as reactExports, a2 as useSavedItems, j as jsxRuntimeExports, B as Button, I as Input, X, a3 as Variant_igst_none_cgst_sgst, a4 as useParams, Y as useNavigate, e as useActor, M as useClients, a5 as useInvoice, a6 as useCreateInvoice, a7 as useUpdateInvoice, P as PaymentStatus, D as InvoiceStatus, c as ue, L as LoaderCircle, F as FileText, C as Card, o as CardHeader, p as CardTitle, l as CardContent, h as Label, O as Building2 } from "./index-D5Ia9PfW.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DOOEGEKs.js";
import { T as Trash2 } from "./trash-2-GZKUN2VB.js";
import { S as Search } from "./search-Bm8W1ykJ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as ChevronDown, e as ChevronUp } from "./select-DAXAE4Hz.js";
import { S as Separator } from "./separator-L1eZsyDE.js";
import { T as Textarea } from "./textarea-U8qFu4eL.js";
import { E as Eye } from "./eye-CuxNNjGE.js";
import { P as Plus } from "./plus-LNQXxajL.js";
import "./index-BwAdBz8E.js";
import "./index-BC-PgpLx.js";
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
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function calcLineTotal(item) {
  const base = item.quantity * item.rate;
  const discountAmt = base * item.discount / 100;
  const taxable = base - discountAmt;
  const taxAmt = taxable * item.taxRate / 100;
  return taxable + taxAmt;
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
  }).format(amount);
}
function taxTypeLabel(t) {
  if (t === Variant_igst_none_cgst_sgst.cgst_sgst || t === "CGST/SGST")
    return "CGST/SGST";
  if (t === Variant_igst_none_cgst_sgst.igst || t === "IGST") return "IGST";
  return "None";
}
function toFormTaxType(t) {
  if (t === Variant_igst_none_cgst_sgst.cgst_sgst) return "CGST/SGST";
  if (t === Variant_igst_none_cgst_sgst.igst) return "IGST";
  return "None";
}
function ItemLibraryDialog({
  open,
  onClose,
  onSelect
}) {
  const { data: items = [], isLoading } = useSavedItems();
  const [search, setSearch] = reactExports.useState("");
  const filtered = items.filter(
    (i) => i.itemName.toLowerCase().includes(search.toLowerCase()) || i.itemCode.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md bg-card", "data-ocid": "library.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-heading flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
      "Item Library"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search items…",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9 pr-9",
          "data-ocid": "library.search_input"
        }
      ),
      search && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSearch(""),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-72 overflow-y-auto space-y-1.5 pr-1", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-muted-foreground text-center py-6",
          "data-ocid": "library.loading_state",
          children: "Loading…"
        }
      ),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-muted-foreground text-center py-6",
          "data-ocid": "library.empty_state",
          children: "No items found."
        }
      ),
      filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-accent/30 transition-colors",
          "data-ocid": `library.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded shrink-0", children: item.itemCode || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.itemName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "₹",
                (Number(item.rate) / 100).toLocaleString("en-IN", {
                  minimumFractionDigits: 2
                }),
                " ",
                "• ",
                taxTypeLabel(item.taxType),
                Number(item.taxRate) > 0 ? ` ${item.taxRate}%` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs shrink-0",
                onClick: () => {
                  onSelect({
                    itemName: item.itemName,
                    rate: Number(item.rate) / 100,
                    taxType: toFormTaxType(item.taxType),
                    taxRate: Number(item.taxRate)
                  });
                  onClose();
                },
                "data-ocid": `library.button.${idx + 1}`,
                children: "Use"
              }
            )
          ]
        },
        item.itemCode
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: onClose,
        "data-ocid": "library.close_button",
        children: "Close"
      }
    ) })
  ] }) });
}
function LineItemRow({
  lineItem,
  index,
  onChange,
  onRemove
}) {
  const [rateInput, setRateInput] = reactExports.useState(String(lineItem.rate));
  const [libraryOpen, setLibraryOpen] = reactExports.useState(false);
  const [suggestionOpen, setSuggestionOpen] = reactExports.useState(false);
  const blurTimerRef = reactExports.useRef(null);
  const { data: savedItems = [] } = useSavedItems();
  const suggestions = lineItem.itemName.trim().length > 0 ? savedItems.filter(
    (i) => i.itemName.toLowerCase().includes(lineItem.itemName.toLowerCase()) || i.itemCode.toLowerCase().includes(lineItem.itemName.toLowerCase())
  ).slice(0, 6) : [];
  reactExports.useEffect(() => {
    setRateInput(String(lineItem.rate));
  }, [lineItem.rate]);
  const update = (field, value) => {
    onChange({ ...lineItem, [field]: value });
  };
  const handleRateChange = (e) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") {
      setRateInput(raw);
      return;
    }
    const parsed = Number.parseFloat(raw);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      setRateInput(raw);
      onChange({ ...lineItem, rate: parsed });
    }
  };
  const handleRateBlur = () => {
    const parsed = Number.parseFloat(rateInput);
    const finalValue = Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
    setRateInput(String(finalValue));
    onChange({ ...lineItem, rate: finalValue });
  };
  const handleRateFocus = (e) => {
    e.target.select();
  };
  const handleLibrarySelect = (item) => {
    setRateInput(String(item.rate));
    onChange({
      ...lineItem,
      itemName: item.itemName,
      rate: item.rate,
      taxType: item.taxType,
      taxRate: item.taxRate
    });
  };
  const handleSuggestionSelect = (item) => {
    const rate = Number(item.rate) / 100;
    const taxRate = Number(item.taxRate);
    const taxType = toFormTaxType(item.taxType);
    setRateInput(String(rate));
    onChange({
      ...lineItem,
      itemName: item.itemName,
      rate,
      taxType,
      taxRate
    });
    setSuggestionOpen(false);
  };
  const handleItemNameFocus = () => {
    if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    setSuggestionOpen(true);
  };
  const handleItemNameBlur = () => {
    blurTimerRef.current = setTimeout(() => setSuggestionOpen(false), 150);
  };
  const lineTotal = calcLineTotal(lineItem);
  const itemNameId = `item-name-${index}`;
  const quantityId = `item-qty-${index}`;
  const rateId = `item-rate-${index}`;
  const discountId = `item-discount-${index}`;
  const taxTypeId = `item-taxtype-${index}`;
  const taxRateId = `item-taxrate-${index}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg p-3 space-y-3 bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
          "Item #",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setLibraryOpen(true),
            className: "flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors px-1.5 py-0.5 rounded-md hover:bg-primary/10",
            title: "Pick from item library",
            "data-ocid": `line-item.open_modal_button.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Library" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          onClick: onRemove,
          className: "h-7 w-7 text-muted-foreground hover:text-destructive",
          "data-ocid": `line-item.delete_button.${index + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: itemNameId,
            className: "text-xs text-muted-foreground mb-1 block",
            children: "Item Name"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: itemNameId,
            value: lineItem.itemName,
            onChange: (e) => update("itemName", e.target.value),
            onFocus: handleItemNameFocus,
            onBlur: handleItemNameBlur,
            placeholder: "Item description",
            className: "h-8 text-sm",
            autoComplete: "off",
            "data-ocid": `line-item.input.${index + 1}`
          }
        ),
        suggestionOpen && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 right-0 top-full mt-1 z-50 rounded-lg border border-border bg-card shadow-lg overflow-hidden",
            "data-ocid": "line-item.suggestion_dropdown",
            children: suggestions.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-primary/10 transition-colors border-b border-border/50 last:border-b-0",
                onMouseDown: (e) => {
                  e.preventDefault();
                },
                onClick: () => handleSuggestionSelect(item),
                "data-ocid": `line-item.suggestion.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded shrink-0 leading-tight", children: item.itemCode || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 min-w-0 text-sm text-foreground truncate", children: item.itemName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary font-medium shrink-0", children: [
                    "₹",
                    (Number(item.rate) / 100).toLocaleString("en-IN", {
                      minimumFractionDigits: 2
                    })
                  ] })
                ]
              },
              item.itemCode
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: quantityId,
            className: "text-xs text-muted-foreground mb-1 block",
            children: "Quantity"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: quantityId,
            type: "number",
            min: 1,
            value: lineItem.quantity,
            onChange: (e) => update("quantity", Math.max(1, Number(e.target.value))),
            className: "h-8 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: rateId,
            className: "text-xs text-muted-foreground mb-1 block",
            children: "Rate (₹)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: rateId,
            type: "number",
            min: 0,
            value: rateInput,
            onChange: handleRateChange,
            onBlur: handleRateBlur,
            onFocus: handleRateFocus,
            placeholder: "0",
            className: "h-8 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: discountId,
            className: "text-xs text-muted-foreground mb-1 block",
            children: "Discount (%)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: discountId,
            type: "number",
            min: 0,
            max: 100,
            value: lineItem.discount,
            onChange: (e) => update(
              "discount",
              Math.min(100, Math.max(0, Number(e.target.value)))
            ),
            className: "h-8 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: taxTypeId,
            className: "text-xs text-muted-foreground mb-1 block",
            children: "Tax Type"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: taxTypeId,
            value: lineItem.taxType,
            onChange: (e) => update("taxType", e.target.value),
            className: "w-full h-8 text-sm rounded-md border border-input bg-background px-2 focus:outline-none focus:ring-1 focus:ring-ring",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "None", children: "None" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CGST/SGST", children: "CGST/SGST" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "IGST", children: "IGST" })
            ]
          }
        )
      ] }),
      lineItem.taxType !== "None" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: taxRateId,
            className: "text-xs text-muted-foreground mb-1 block",
            children: "Tax Rate (%)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: taxRateId,
            type: "number",
            min: 0,
            max: 100,
            value: lineItem.taxRate,
            onChange: (e) => update(
              "taxRate",
              Math.min(100, Math.max(0, Number(e.target.value)))
            ),
            className: "h-8 text-sm"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-primary", children: [
      "Line Total: ",
      formatCurrency(lineTotal)
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ItemLibraryDialog,
      {
        open: libraryOpen,
        onClose: () => setLibraryOpen(false),
        onSelect: handleLibrarySelect
      }
    )
  ] });
}
const defaultLineItem = () => ({
  itemName: "",
  quantity: 1,
  rate: 0,
  taxType: "CGST",
  taxRate: 18,
  discount: 0
});
function InvoiceFormPage() {
  const params = useParams({ strict: false });
  useNavigate();
  const editInvoiceNumber = params.invoiceNumber ? Number.parseInt(params.invoiceNumber, 10) : void 0;
  const isEdit = editInvoiceNumber !== void 0 && !Number.isNaN(editInvoiceNumber);
  const { actor, isFetching: actorFetching } = useActor();
  const { data: clients = [], isLoading: clientsLoading } = useClients();
  const { data: existingInvoice, isLoading: invoiceLoading } = useInvoice(
    isEdit ? BigInt(editInvoiceNumber) : null
  );
  const createInvoiceMutation = useCreateInvoice();
  const updateInvoiceMutation = useUpdateInvoice();
  const [selectedClientId, setSelectedClientId] = reactExports.useState("");
  const [invoiceDate, setInvoiceDate] = reactExports.useState(
    (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = reactExports.useState("");
  const [lineItems, setLineItems] = reactExports.useState([
    defaultLineItem()
  ]);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [savedInvoiceNumber, setSavedInvoiceNumber] = reactExports.useState(
    null
  );
  const [hasAutoSaved, setHasAutoSaved] = reactExports.useState(false);
  const [bankDetails, setBankDetails] = reactExports.useState("");
  const [termsAndConditions, setTermsAndConditions] = reactExports.useState("");
  const [showAdditionalDetails, setShowAdditionalDetails] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (existingInvoice && isEdit) {
      setSelectedClientId(existingInvoice.client.clientId.toString());
      setInvoiceDate(existingInvoice.invoiceDate);
      setDueDate(existingInvoice.dueDate);
      setLineItems(
        existingInvoice.lineItems.map((li) => ({
          itemName: li.itemName,
          quantity: Number(li.quantity),
          rate: Number(li.rate),
          taxType: li.taxType,
          taxRate: Number(li.taxRate),
          discount: Number(li.discount)
        }))
      );
      setSavedInvoiceNumber(existingInvoice.invoiceNumber);
      const bd = existingInvoice.bankDetails;
      const tc = existingInvoice.termsAndConditions;
      const bdVal = Array.isArray(bd) ? bd[0] : bd;
      const tcVal = Array.isArray(tc) ? tc[0] : tc;
      if (bdVal) setBankDetails(bdVal);
      if (tcVal) setTermsAndConditions(tcVal);
      if (bdVal || tcVal) setShowAdditionalDetails(true);
    }
  }, [existingInvoice, isEdit]);
  const selectedClient = clients.find(
    (c) => c.clientId.toString() === selectedClientId
  );
  const subtotal = lineItems.reduce((sum, item) => {
    const base = item.quantity * item.rate;
    const discountAmt = base * item.discount / 100;
    return sum + (base - discountAmt);
  }, 0);
  const totalDiscount = lineItems.reduce((sum, item) => {
    const base = item.quantity * item.rate;
    return sum + base * item.discount / 100;
  }, 0);
  const totalTax = lineItems.reduce((sum, item) => {
    const base = item.quantity * item.rate;
    const discountAmt = base * item.discount / 100;
    const taxable = base - discountAmt;
    return sum + taxable * item.taxRate / 100;
  }, 0);
  const grandTotal = subtotal + totalTax;
  const isFormDirty = reactExports.useCallback(() => {
    const hasClient = !!selectedClientId;
    const hasLineItems = lineItems.some(
      (item) => item.itemName.trim() !== "" || item.rate > 0
    );
    return hasClient || hasLineItems;
  }, [selectedClientId, lineItems]);
  const buildInvoicePayload = reactExports.useCallback(
    (status) => {
      if (!selectedClient) return null;
      const invoiceNum = savedInvoiceNumber ?? BigInt(0);
      return {
        invoiceNumber: invoiceNum,
        invoiceDate,
        dueDate,
        client: selectedClient,
        lineItems: lineItems.map((item) => ({
          itemName: item.itemName,
          quantity: BigInt(item.quantity),
          rate: BigInt(Math.round(item.rate)),
          taxType: item.taxType,
          taxRate: BigInt(item.taxRate),
          discount: BigInt(item.discount)
        })),
        subtotal: BigInt(Math.round(subtotal)),
        totalDiscount: BigInt(Math.round(totalDiscount)),
        totalTax: BigInt(Math.round(totalTax)),
        grandTotal: BigInt(Math.round(grandTotal)),
        paymentStatus: PaymentStatus.unpaid,
        status,
        bankDetails: bankDetails ? [bankDetails] : [],
        termsAndConditions: termsAndConditions ? [termsAndConditions] : []
      };
    },
    [
      selectedClient,
      savedInvoiceNumber,
      invoiceDate,
      dueDate,
      lineItems,
      subtotal,
      totalDiscount,
      totalTax,
      grandTotal,
      bankDetails,
      termsAndConditions
    ]
  );
  const autoSaveRef = reactExports.useRef(void 0);
  const performAutoSave = reactExports.useCallback(async () => {
    if (!actor || !isFormDirty() || hasAutoSaved) return;
    const payload = buildInvoicePayload(InvoiceStatus.draft);
    if (!payload) return;
    try {
      if (savedInvoiceNumber) {
        await actor.updateInvoice({
          ...payload,
          invoiceNumber: savedInvoiceNumber
        });
      } else {
        await actor.autoSaveDraft(payload);
      }
      ue.success("Invoice saved as draft");
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  }, [
    actor,
    isFormDirty,
    hasAutoSaved,
    savedInvoiceNumber,
    buildInvoicePayload
  ]);
  reactExports.useEffect(() => {
    autoSaveRef.current = performAutoSave;
  }, [performAutoSave]);
  reactExports.useEffect(() => {
    return () => {
      if (autoSaveRef.current) {
        autoSaveRef.current();
      }
    };
  }, []);
  const handleSaveDraft = async () => {
    if (!selectedClient) {
      ue.error("Please select a client first");
      return;
    }
    if (actorFetching || !actor) {
      ue.error("Still connecting, please wait...");
      return;
    }
    setIsSaving(true);
    try {
      const payload = buildInvoicePayload(InvoiceStatus.draft);
      if (!payload) return;
      if (savedInvoiceNumber) {
        await updateInvoiceMutation.mutateAsync({
          ...payload,
          invoiceNumber: savedInvoiceNumber
        });
        ue.success("Draft updated!");
      } else {
        const newNum = await createInvoiceMutation.mutateAsync(payload);
        setSavedInvoiceNumber(newNum);
        setHasAutoSaved(true);
        ue.success("Draft saved!");
      }
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  };
  const handleSaveAndPreview = async () => {
    if (!selectedClient) {
      ue.error("Please select a client first");
      return;
    }
    if (lineItems.every((item) => !item.itemName.trim())) {
      ue.error("Please add at least one line item");
      return;
    }
    if (actorFetching || !actor) {
      ue.error("Still connecting, please wait...");
      return;
    }
    setIsSaving(true);
    try {
      const payload = buildInvoicePayload(InvoiceStatus.finalized);
      if (!payload) return;
      let invoiceNum = savedInvoiceNumber;
      if (invoiceNum) {
        await updateInvoiceMutation.mutateAsync({
          ...payload,
          invoiceNumber: invoiceNum,
          status: InvoiceStatus.finalized
        });
      } else {
        invoiceNum = await createInvoiceMutation.mutateAsync(payload);
        setSavedInvoiceNumber(invoiceNum);
      }
      setHasAutoSaved(true);
      window.location.href = `/invoices/${invoiceNum}/preview`;
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to save invoice");
    } finally {
      setIsSaving(false);
    }
  };
  const addLineItem = () => setLineItems((prev) => [...prev, defaultLineItem()]);
  const updateLineItem = (index, updated) => {
    setLineItems(
      (prev) => prev.map((item, i) => i === index ? updated : item)
    );
  };
  const removeLineItem = (index) => {
    if (lineItems.length === 1) return;
    setLineItems((prev) => prev.filter((_, i) => i !== index));
  };
  const isLoading = isEdit && invoiceLoading || clientsLoading;
  const isActorReady = !actorFetching && !!actor;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card px-6 py-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-foreground leading-tight", children: isEdit ? "Edit Invoice" : "New Invoice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: isEdit ? "Update invoice details below" : "Fill in the details to create your invoice" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleSaveDraft,
            disabled: isSaving || !isActorReady,
            className: "gap-1.5",
            children: [
              isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: !isActorReady ? "Connecting..." : "Save Draft" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleSaveAndPreview,
            disabled: isSaving || !isActorReady,
            className: "gap-1.5",
            children: [
              isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: !isActorReady ? "Connecting..." : "Save & Preview" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "1" }),
        "Client Details"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "client",
              className: "text-sm font-medium text-foreground",
              children: "Select Client"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedClientId,
              onValueChange: setSelectedClientId,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "client", className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a client..." }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clients.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SelectItem,
                  {
                    value: client.clientId.toString(),
                    children: [
                      client.name,
                      " ",
                      client.companyName ? `(${client.companyName})` : ""
                    ]
                  },
                  client.clientId.toString()
                )) })
              ]
            }
          )
        ] }),
        selectedClient && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-accent/30 border border-border rounded-lg text-sm", children: [
          selectedClient.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wide font-medium", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mt-0.5", children: selectedClient.email })
          ] }),
          selectedClient.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wide font-medium", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mt-0.5", children: selectedClient.phone })
          ] }),
          selectedClient.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wide font-medium", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mt-0.5", children: selectedClient.address })
          ] }),
          selectedClient.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wide font-medium", children: "GST Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mt-0.5 font-mono text-xs", children: selectedClient.gstNumber })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "2" }),
        "Invoice Details"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "invoiceDate",
              className: "text-sm font-medium text-foreground",
              children: "Invoice Date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "invoiceDate",
              type: "date",
              value: invoiceDate,
              onChange: (e) => setInvoiceDate(e.target.value),
              className: "mt-1.5"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "dueDate",
              className: "text-sm font-medium text-foreground",
              children: "Due Date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "dueDate",
              type: "date",
              value: dueDate,
              onChange: (e) => setDueDate(e.target.value),
              className: "mt-1.5"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "3" }),
        "Line Items"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 pt-4", children: [
        lineItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          LineItemRow,
          {
            index,
            lineItem: item,
            onChange: (updated) => updateLineItem(index, updated),
            onRemove: () => removeLineItem(index)
          },
          `line-${index}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: addLineItem,
            className: "w-full border-dashed border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              "Add Line Item"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "4" }),
        "Additional Details",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs font-normal text-muted-foreground", children: "Optional" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: !showAdditionalDetails ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "invoice.open_modal_button",
          onClick: () => setShowAdditionalDetails(true),
          className: "w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-primary/30 rounded-lg text-sm text-primary/70 hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
            "Add Bank Details & Terms and Conditions",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "bankDetails",
              className: "text-sm font-medium text-foreground",
              children: [
                "Bank Details",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground font-normal", children: "(Optional)" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "bankDetails",
              "data-ocid": "invoice.bank_details.textarea",
              value: bankDetails,
              onChange: (e) => setBankDetails(e.target.value),
              placeholder: "Bank Name: HDFC Bank\nAccount Number: 1234567890\nIFSC Code: HDFC0001234\nBranch: MG Road, Bengaluru",
              className: "min-h-[100px] text-sm resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter your bank details for payment. This will appear on the invoice." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "termsAndConditions",
              className: "text-sm font-medium text-foreground",
              children: [
                "Terms & Conditions",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground font-normal", children: "(Optional)" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "termsAndConditions",
              "data-ocid": "invoice.terms.textarea",
              value: termsAndConditions,
              onChange: (e) => setTermsAndConditions(e.target.value),
              placeholder: "1. Payment due within 30 days of invoice date.\n2. Late payment charges: 1.5% per month.\n3. Goods once sold will not be taken back.",
              className: "min-h-[100px] text-sm resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "These terms will be printed at the bottom of your invoice." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowAdditionalDetails(false),
            className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }),
              "Collapse section"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "5" }),
        "Summary"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
            "₹",
            subtotal.toFixed(2)
          ] })
        ] }),
        totalDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            "-₹",
            totalDiscount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
            "₹",
            totalTax.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-base text-foreground", children: "Grand Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-lg text-primary", children: [
            "₹",
            grandTotal.toFixed(2)
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card px-6 py-4 flex gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 gap-2 h-11",
          onClick: handleSaveDraft,
          disabled: isSaving || !isActorReady,
          children: [
            isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            !isActorReady ? "Connecting..." : "Save Draft"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          className: "flex-1 gap-2 h-11",
          onClick: handleSaveAndPreview,
          disabled: isSaving || !isActorReady,
          children: [
            isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
            !isActorReady ? "Connecting..." : "Save & Preview"
          ]
        }
      )
    ] })
  ] });
}
export {
  InvoiceFormPage as default
};
