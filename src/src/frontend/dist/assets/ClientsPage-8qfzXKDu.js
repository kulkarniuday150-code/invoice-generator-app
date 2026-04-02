import { d as createLucideIcon, e as useActor, K as useClients, M as useDeleteClient, r as reactExports, j as jsxRuntimeExports, B as Button, I as Input, N as Building2, O as Phone, c as ue } from "./index-CQurMIuK.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DQHIuToh.js";
import { S as Skeleton } from "./skeleton-dUA9kVRY.js";
import { C as ClientFormModal } from "./ClientFormModal-DB6yX327.js";
import { P as Plus } from "./plus-DYkP-OMc.js";
import { S as Search } from "./search-DyJzD3nH.js";
import { M as Mail } from "./mail-DFy8iZVT.js";
import { T as Trash2 } from "./trash-2-Yl--ebfh.js";
import "./index-B4Tzu2hK.js";
import "./index-VvkpZohl.js";
import "./dialog-BrlW6YE_.js";
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function ClientsPage() {
  const { isFetching: actorFetching } = useActor();
  const { data: clients = [], isLoading } = useClients();
  const deleteClient = useDeleteClient();
  const [search, setSearch] = reactExports.useState("");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingClient, setEditingClient] = reactExports.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = reactExports.useState(false);
  const [clientToDelete, setClientToDelete] = reactExports.useState(null);
  const loading = actorFetching || isLoading;
  const filtered = clients.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.companyName.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );
  const handleEdit = (client) => {
    setEditingClient(client);
    setModalOpen(true);
  };
  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (!clientToDelete) return;
    try {
      await deleteClient.mutateAsync(clientToDelete.clientId);
      ue.success("Client deleted successfully");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to delete client");
    } finally {
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    }
  };
  const handleModalClose = (open) => {
    setModalOpen(open);
    if (!open) setEditingClient(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: loading ? "Loading..." : `${clients.length} client${clients.length !== 1 ? "s" : ""}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => {
            setEditingClient(null);
            setModalOpen(true);
          },
          disabled: loading,
          className: "bg-primary hover:bg-primary/90 text-primary-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Client"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search clients...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9",
          disabled: loading
        }
      )
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-56" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded" })
          ] })
        ] })
      },
      `skeleton-${i}`
    )) }),
    !loading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: search ? "No clients found" : "No clients yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: search ? "Try a different search term." : "Add your first client to get started." }),
      !search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => {
            setEditingClient(null);
            setModalOpen(true);
          },
          disabled: actorFetching,
          className: "bg-primary hover:bg-primary/90 text-primary-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Client"
          ]
        }
      )
    ] }),
    !loading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground truncate", children: client.name })
            ] }),
            client.companyName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: client.companyName })
            ] }),
            client.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: client.email })
            ] }),
            client.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: client.phone })
            ] }),
            client.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded font-mono", children: [
              "GST: ",
              client.gstNumber
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-muted-foreground hover:text-foreground",
                onClick: () => handleEdit(client),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-muted-foreground hover:text-destructive",
                onClick: () => handleDeleteClick(client),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      },
      client.clientId.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ClientFormModal,
      {
        open: modalOpen,
        onOpenChange: handleModalClose,
        editingClient
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Client?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to delete",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: clientToDelete == null ? void 0 : clientToDelete.name }),
          "? This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteConfirm,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ClientsPage as default
};
