import { e as useActor, f as useAddClient, g as useUpdateClient, r as reactExports, j as jsxRuntimeExports, L as LoaderCircle, h as Label, I as Input, B as Button, c as ue } from "./index-CQurMIuK.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BrlW6YE_.js";
const emptyForm = {
  name: "",
  companyName: "",
  gstNumber: "",
  email: "",
  phone: "",
  address: ""
};
function ClientFormModal({
  open,
  onOpenChange,
  editingClient
}) {
  const { actor, isFetching: actorFetching } = useActor();
  const addClient = useAddClient();
  const updateClient = useUpdateClient();
  const [form, setForm] = reactExports.useState(emptyForm);
  const [isRetrying, setIsRetrying] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (editingClient) {
      setForm({
        name: editingClient.name,
        companyName: editingClient.companyName,
        gstNumber: editingClient.gstNumber,
        email: editingClient.email,
        phone: editingClient.phone,
        address: editingClient.address
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingClient]);
  const isPending = addClient.isPending || updateClient.isPending;
  const isActorReady = !!actor && !actorFetching;
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!form.name.trim()) {
      ue.error("Client name is required");
      return;
    }
    if (!actor) {
      ue.error(
        "Still connecting to the backend — please try again in a moment."
      );
      return;
    }
    try {
      if (editingClient) {
        await updateClient.mutateAsync({
          ...form,
          clientId: editingClient.clientId
        });
        ue.success("Client updated successfully");
      } else {
        await addClient.mutateAsync({
          ...form,
          clientId: 0n
        });
        ue.success("Client added successfully");
      }
      onOpenChange(false);
      setForm(emptyForm);
    } catch (err) {
      const msg = (err == null ? void 0 : err.message) || "Failed to save client";
      if (msg.toLowerCase().includes("actor not available")) {
        ue.error("Still connecting — please wait a moment and try again.");
      } else {
        ue.error(msg);
      }
    }
  };
  const fields = [
    {
      label: "Client Name",
      name: "name",
      placeholder: "e.g. Rahul Sharma",
      required: true
    },
    {
      label: "Company Name",
      name: "companyName",
      placeholder: "e.g. Sharma Enterprises"
    },
    {
      label: "GST Number",
      name: "gstNumber",
      placeholder: "e.g. 27AAPFU0939F1ZV"
    },
    { label: "Email", name: "email", placeholder: "e.g. rahul@example.com" },
    { label: "Phone", name: "phone", placeholder: "e.g. +91 98765 43210" },
    {
      label: "Address",
      name: "address",
      placeholder: "e.g. 123 MG Road, Mumbai"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[520px] bg-card text-card-foreground border border-border shadow-xl rounded-2xl p-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "px-6 pt-6 pb-4 border-b border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-bold text-foreground", children: editingClient ? "Edit Client" : "Add New Client" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: editingClient ? "Update the client details below." : "Fill in the details to add a new client." })
    ] }),
    !isActorReady && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-4 flex items-center justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Connecting to backend..."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, id: "client-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 space-y-4 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: fields.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: field.name === "address" ? "sm:col-span-2" : "",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: field.name,
                className: "text-sm font-medium text-foreground mb-1.5 block",
                children: [
                  field.label,
                  field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: field.name,
                name: field.name,
                value: form[field.name],
                onChange: handleChange,
                placeholder: field.placeholder,
                className: "bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary rounded-lg h-10",
                required: field.required,
                "data-ocid": `client.${field.name}.input`
              }
            )
          ]
        },
        field.name
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 py-4 border-t border-border bg-muted/30 flex flex-row gap-3 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: isPending,
            className: "rounded-lg border-border text-foreground hover:bg-accent",
            "data-ocid": "client.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "client-form",
            disabled: isPending || !isActorReady,
            className: "rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 min-w-[120px]",
            "data-ocid": "client.submit_button",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              "Saving..."
            ] }) : !isActorReady ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              "Connecting..."
            ] }) : editingClient ? "Update Client" : "Add Client"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  ClientFormModal as C
};
