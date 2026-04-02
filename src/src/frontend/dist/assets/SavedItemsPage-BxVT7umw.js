import { d as createLucideIcon, j as jsxRuntimeExports, y as cn, a0 as useSavedItems, a9 as useAddSavedItem, aa as useUpdateSavedItem, ab as useDeleteSavedItem, r as reactExports, a1 as Variant_igst_none_cgst_sgst, q as Package, B as Button, I as Input, h as Label, c as ue } from "./index-CQurMIuK.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DQHIuToh.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BrlW6YE_.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bi6XeXRR.js";
import { S as Skeleton } from "./skeleton-dUA9kVRY.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-COiYpas9.js";
import { T as Textarea } from "./textarea-8WUWs8jP.js";
import { P as Plus } from "./plus-DYkP-OMc.js";
import { S as Search } from "./search-DyJzD3nH.js";
import { T as Trash2 } from "./trash-2-Yl--ebfh.js";
import "./index-B4Tzu2hK.js";
import "./index-VvkpZohl.js";
import "./index-TBwM_trI.js";
import "./index-B3aaHW2j.js";
import "./check-Bdvrsx2E.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const defaultForm = {
  itemCode: "",
  itemName: "",
  description: "",
  rate: "",
  taxType: Variant_igst_none_cgst_sgst.none,
  taxRate: "0"
};
function taxTypeLabel(t) {
  if (t === Variant_igst_none_cgst_sgst.cgst_sgst) return "CGST/SGST";
  if (t === Variant_igst_none_cgst_sgst.igst) return "IGST";
  return "None";
}
function taxBadgeColor(t) {
  if (t === Variant_igst_none_cgst_sgst.cgst_sgst)
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  if (t === Variant_igst_none_cgst_sgst.igst)
    return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
  return "bg-muted text-muted-foreground";
}
function isService(name) {
  const svcKeywords = [
    "service",
    "consult",
    "design",
    "develop",
    "support",
    "manage",
    "advise",
    "audit",
    "training",
    "coaching"
  ];
  return svcKeywords.some((k) => name.toLowerCase().includes(k));
}
function SavedItemsPage() {
  const { data: items = [], isLoading } = useSavedItems();
  const addItem = useAddSavedItem();
  const updateItem = useUpdateSavedItem();
  const deleteItem = useDeleteSavedItem();
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("all");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingItem, setEditingItem] = reactExports.useState(null);
  const [deleteCode, setDeleteCode] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(defaultForm);
  const filtered = items.filter((i) => {
    const matchSearch = i.itemName.toLowerCase().includes(search.toLowerCase()) || i.itemCode.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || category === "services" && isService(i.itemName) || category === "products" && !isService(i.itemName);
    return matchSearch && matchCategory;
  });
  const openAdd = () => {
    setEditingItem(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };
  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      itemCode: item.itemCode,
      itemName: item.itemName,
      description: item.description,
      rate: String(Number(item.rate) / 100),
      taxType: item.taxType,
      taxRate: String(Number(item.taxRate))
    });
    setDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.itemName.trim()) {
      ue.error("Item name is required");
      return;
    }
    const rateNum = Number.parseFloat(form.rate);
    if (!form.rate || Number.isNaN(rateNum) || rateNum < 0) {
      ue.error("Please enter a valid rate");
      return;
    }
    try {
      const rate = BigInt(Math.round(rateNum * 100));
      const taxRateNum = Number.parseFloat(form.taxRate || "0");
      const taxRate = BigInt(
        Number.isNaN(taxRateNum) ? 0 : Math.round(taxRateNum)
      );
      if (editingItem) {
        await updateItem.mutateAsync({
          ...editingItem,
          itemCode: form.itemCode || editingItem.itemCode,
          itemName: form.itemName.trim(),
          description: form.description.trim(),
          rate,
          taxType: form.taxType,
          taxRate
        });
        ue.success("Item updated");
      } else {
        await addItem.mutateAsync({
          itemCode: form.itemCode.trim(),
          itemName: form.itemName.trim(),
          description: form.description.trim(),
          rate,
          taxType: form.taxType,
          taxRate
        });
        ue.success("Item saved");
      }
      setDialogOpen(false);
    } catch (err) {
      console.error("Save item error:", err);
      const msg = err instanceof Error ? err.message : "Unknown error occurred";
      if (msg.includes("Actor not available")) {
        ue.error("Not logged in. Please refresh and try again.");
      } else if (msg.includes("Unauthorized")) {
        ue.error("Session expired. Please log out and log back in.");
      } else {
        ue.error("Failed to save item. Please try again.");
      }
    }
  };
  const handleDelete = async () => {
    if (!deleteCode) return;
    try {
      await deleteItem.mutateAsync(deleteCode);
      ue.success("Item deleted");
      setDeleteCode(null);
    } catch {
      ue.error("Failed to delete item");
    }
  };
  const isPending = addItem.isPending || updateItem.isPending;
  const productCount = items.filter((i) => !isService(i.itemName)).length;
  const serviceCount = items.filter((i) => isService(i.itemName)).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold text-foreground tracking-tight", children: "Item Master" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your product & service catalog" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3" }),
          items.length,
          " Items"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: openAdd,
            className: "gap-1.5 shadow-sm font-semibold",
            "data-ocid": "saved-items.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Item"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name, code, or description…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "saved-items.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          value: category,
          onValueChange: (v) => setCategory(v),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "all",
                className: "text-xs px-3",
                "data-ocid": "saved-items.tab",
                children: [
                  "All (",
                  items.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "products",
                className: "text-xs px-3",
                "data-ocid": "saved-items.tab",
                children: [
                  "Products (",
                  productCount,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "services",
                className: "text-xs px-3",
                "data-ocid": "saved-items.tab",
                children: [
                  "Services (",
                  serviceCount,
                  ")"
                ]
              }
            )
          ] })
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "saved-items.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl bg-muted/20",
        "data-ocid": "saved-items.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground mb-1", children: "No items in your catalog" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-xs", children: "Save frequently used products & services with ERP-style codes for instant invoice insertion." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: openAdd,
              variant: "outline",
              className: "gap-1.5",
              "data-ocid": "saved-items.secondary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add your first item"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "hidden md:block rounded-xl border border-border overflow-hidden shadow-card",
          "data-ocid": "saved-items.table",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50 hover:bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[140px]", children: "Item Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground", children: "Item Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right w-[120px]", children: "Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[120px]", children: "Tax" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[80px] text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TableRow,
              {
                className: "hover:bg-muted/30 transition-colors group",
                "data-ocid": `saved-items.row.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center font-mono text-xs font-bold bg-accent/15 text-accent-foreground border border-accent/25 px-2.5 py-1 rounded-md tracking-wider", children: item.itemCode || "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: item.itemName }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground line-clamp-1", children: item.description || "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm text-foreground", children: [
                    "₹",
                    (Number(item.rate) / 100).toLocaleString("en-IN", {
                      minimumFractionDigits: 2
                    })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${taxBadgeColor(item.taxType)}`,
                      children: [
                        taxTypeLabel(item.taxType),
                        Number(item.taxRate) > 0 ? ` ${item.taxRate}%` : ""
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10",
                        onClick: () => openEdit(item),
                        "data-ocid": `saved-items.edit_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                        onClick: () => setDeleteCode(item.itemCode),
                        "data-ocid": `saved-items.delete_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              item.itemCode
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden space-y-3", children: filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-card-hover transition-shadow",
          "data-ocid": `saved-items.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground", children: item.itemName }),
                item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: item.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] font-bold bg-accent/15 text-accent-foreground border border-accent/25 px-2 py-0.5 rounded-md tracking-wider shrink-0", children: item.itemCode || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-extrabold text-foreground", children: [
                  "₹",
                  (Number(item.rate) / 100).toLocaleString("en-IN", {
                    minimumFractionDigits: 2
                  })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${taxBadgeColor(item.taxType)}`,
                    children: [
                      taxTypeLabel(item.taxType),
                      Number(item.taxRate) > 0 ? ` ${item.taxRate}%` : ""
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10",
                    onClick: () => openEdit(item),
                    "data-ocid": `saved-items.edit_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                    onClick: () => setDeleteCode(item.itemCode),
                    "data-ocid": `saved-items.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          ]
        },
        item.itemCode
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "saved-items.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-heading text-lg flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
        editingItem ? "Edit Item" : "Add New Item"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "itemCode", className: "font-semibold", children: [
            "Item Code",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-muted-foreground font-normal", children: "(ERP)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "itemCode",
              value: form.itemCode,
              onChange: (e) => setForm((f) => ({
                ...f,
                itemCode: e.target.value.toUpperCase()
              })),
              placeholder: "e.g. PROD-001, SVC-002",
              className: "font-mono tracking-wider uppercase",
              disabled: !!editingItem,
              "data-ocid": "saved-items.input"
            }
          ),
          !editingItem && !form.itemCode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Will auto-generate as ITEM-XXXXX if left blank" }),
          editingItem && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Item code cannot be changed after creation." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "itemName", className: "font-semibold", children: "Item Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "itemName",
              value: form.itemName,
              onChange: (e) => setForm((f) => ({ ...f, itemName: e.target.value })),
              placeholder: "e.g. Web Design Services",
              required: true,
              "data-ocid": "saved-items.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", className: "font-semibold", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              placeholder: "Optional description",
              rows: 2,
              className: "resize-none",
              "data-ocid": "saved-items.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rate", className: "font-semibold", children: "Rate (₹) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "rate",
                type: "number",
                min: 0,
                step: 0.01,
                value: form.rate,
                onChange: (e) => setForm((f) => ({ ...f, rate: e.target.value })),
                placeholder: "0.00",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "taxRate", className: "font-semibold", children: "Tax Rate (%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "taxRate",
                type: "number",
                min: 0,
                max: 100,
                value: form.taxRate,
                onChange: (e) => setForm((f) => ({ ...f, taxRate: e.target.value })),
                placeholder: "0"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "Tax Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.taxType,
              onValueChange: (v) => setForm((f) => ({
                ...f,
                taxType: v
              })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "saved-items.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Variant_igst_none_cgst_sgst.none, children: "None" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Variant_igst_none_cgst_sgst.cgst_sgst, children: "CGST/SGST" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Variant_igst_none_cgst_sgst.igst, children: "IGST" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              "data-ocid": "saved-items.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isPending,
              className: "font-semibold",
              "data-ocid": "saved-items.submit_button",
              children: isPending ? "Saving…" : editingItem ? "Save Changes" : "Add Item"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteCode,
        onOpenChange: (o) => !o && setDeleteCode(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "saved-items.modal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Item?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently remove the saved item. This action cannot be undone." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "saved-items.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "saved-items.confirm_button",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  SavedItemsPage as default
};
