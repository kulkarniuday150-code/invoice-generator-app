import type { Client } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@/hooks/useActor";
import { useAddClient, useUpdateClient } from "@/hooks/useQueries";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ClientFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingClient?: Client | null;
}

const emptyForm = {
  name: "",
  companyName: "",
  gstNumber: "",
  email: "",
  phone: "",
  address: "",
};

export default function ClientFormModal({
  open,
  onOpenChange,
  editingClient,
}: ClientFormModalProps) {
  const { isFetching: actorFetching } = useActor();
  const addClient = useAddClient();
  const updateClient = useUpdateClient();

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingClient) {
      setForm({
        name: editingClient.name,
        companyName: editingClient.companyName,
        gstNumber: editingClient.gstNumber,
        email: editingClient.email,
        phone: editingClient.phone,
        address: editingClient.address,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingClient]);

  const isPending = addClient.isPending || updateClient.isPending;
  const isActorReady = !actorFetching;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.name.trim()) {
      toast.error("Client name is required");
      return;
    }

    try {
      if (editingClient) {
        await updateClient.mutateAsync({
          ...form,
          clientId: editingClient.clientId,
        });
        toast.success("Client updated successfully");
      } else {
        await addClient.mutateAsync({
          ...form,
          clientId: 0n,
        });
        toast.success("Client added successfully");
      }
      onOpenChange(false);
      setForm(emptyForm);
    } catch (err: any) {
      toast.error(err?.message || "Failed to save client");
    }
  };

  const fields: {
    label: string;
    name: keyof typeof emptyForm;
    placeholder: string;
    required?: boolean;
  }[] = [
    {
      label: "Client Name",
      name: "name",
      placeholder: "e.g. Rahul Sharma",
      required: true,
    },
    {
      label: "Company Name",
      name: "companyName",
      placeholder: "e.g. Sharma Enterprises",
    },
    {
      label: "GST Number",
      name: "gstNumber",
      placeholder: "e.g. 27AAPFU0939F1ZV",
    },
    { label: "Email", name: "email", placeholder: "e.g. rahul@example.com" },
    { label: "Phone", name: "phone", placeholder: "e.g. +91 98765 43210" },
    {
      label: "Address",
      name: "address",
      placeholder: "e.g. 123 MG Road, Mumbai",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] bg-card text-card-foreground border border-border shadow-xl rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-card">
          <DialogTitle className="text-xl font-bold text-foreground">
            {editingClient ? "Edit Client" : "Add New Client"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {editingClient
              ? "Update the client details below."
              : "Fill in the details to add a new client."}
          </p>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} id="client-form">
          <div className="px-6 py-5 space-y-4 bg-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.name === "address" ? "sm:col-span-2" : ""}
                >
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary rounded-lg h-10"
                    required={field.required}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="px-6 py-4 border-t border-border bg-muted/30 flex flex-row gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="rounded-lg border-border text-foreground hover:bg-accent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="client-form"
              disabled={isPending || !isActorReady}
              className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 min-w-[120px]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : editingClient ? (
                "Update Client"
              ) : (
                "Add Client"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
