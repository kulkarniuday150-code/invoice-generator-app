import { type Invoice, InvoiceStatus, PaymentStatus } from "@/backend";
import LineItemRow, { type FormLineItem } from "@/components/LineItemRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@/hooks/useActor";
import {
  useClients,
  useCreateInvoice,
  useInvoice,
  useUpdateInvoice,
} from "@/hooks/useQueries";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Eye, FileText, Loader2, Plus, Save } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

const defaultLineItem = (): FormLineItem => ({
  itemName: "",
  quantity: 1,
  rate: 0,
  taxType: "CGST",
  taxRate: 18,
  discount: 0,
});

export default function InvoiceFormPage() {
  const params = useParams({ strict: false }) as { invoiceNumber?: string };
  const _navigate = useNavigate();

  const editInvoiceNumber = params.invoiceNumber
    ? Number.parseInt(params.invoiceNumber, 10)
    : undefined;
  const isEdit =
    editInvoiceNumber !== undefined && !Number.isNaN(editInvoiceNumber);

  const { actor, isFetching: actorFetching } = useActor();
  const { data: clients = [], isLoading: clientsLoading } = useClients();

  // Pass null instead of undefined to satisfy the bigint | null type
  const { data: existingInvoice, isLoading: invoiceLoading } = useInvoice(
    isEdit ? BigInt(editInvoiceNumber!) : null,
  );

  const createInvoiceMutation = useCreateInvoice();
  const updateInvoiceMutation = useUpdateInvoice();

  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState("");
  const [lineItems, setLineItems] = useState<FormLineItem[]>([
    defaultLineItem(),
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [savedInvoiceNumber, setSavedInvoiceNumber] = useState<bigint | null>(
    null,
  );
  const [hasAutoSaved, setHasAutoSaved] = useState(false);

  // Populate form when editing existing invoice
  useEffect(() => {
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
          discount: Number(li.discount),
        })),
      );
      setSavedInvoiceNumber(existingInvoice.invoiceNumber);
    }
  }, [existingInvoice, isEdit]);

  const selectedClient = clients.find(
    (c) => c.clientId.toString() === selectedClientId,
  );

  const subtotal = lineItems.reduce((sum, item) => {
    const base = item.quantity * item.rate;
    const discountAmt = (base * item.discount) / 100;
    return sum + (base - discountAmt);
  }, 0);

  const totalDiscount = lineItems.reduce((sum, item) => {
    const base = item.quantity * item.rate;
    return sum + (base * item.discount) / 100;
  }, 0);

  const totalTax = lineItems.reduce((sum, item) => {
    const base = item.quantity * item.rate;
    const discountAmt = (base * item.discount) / 100;
    const taxable = base - discountAmt;
    return sum + (taxable * item.taxRate) / 100;
  }, 0);

  const grandTotal = subtotal + totalTax;

  const isFormDirty = useCallback(() => {
    const hasClient = !!selectedClientId;
    const hasLineItems = lineItems.some(
      (item) => item.itemName.trim() !== "" || item.rate > 0,
    );
    return hasClient || hasLineItems;
  }, [selectedClientId, lineItems]);

  const buildInvoicePayload = useCallback(
    (status: InvoiceStatus): Invoice | null => {
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
          discount: BigInt(item.discount),
        })),
        subtotal: BigInt(Math.round(subtotal)),
        totalDiscount: BigInt(Math.round(totalDiscount)),
        totalTax: BigInt(Math.round(totalTax)),
        grandTotal: BigInt(Math.round(grandTotal)),
        paymentStatus: PaymentStatus.unpaid,
        status,
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
    ],
  );

  // Ref to hold latest auto-save function for cleanup
  const autoSaveRef = useRef<(() => Promise<void>) | undefined>(undefined);

  const performAutoSave = useCallback(async () => {
    if (!actor || !isFormDirty() || hasAutoSaved) return;

    const payload = buildInvoicePayload(InvoiceStatus.draft);
    if (!payload) return;

    try {
      if (savedInvoiceNumber) {
        await actor.updateInvoice({
          ...payload,
          invoiceNumber: savedInvoiceNumber,
        });
      } else {
        await actor.autoSaveDraft(payload);
      }
      toast.success("Invoice saved as draft");
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  }, [
    actor,
    isFormDirty,
    hasAutoSaved,
    savedInvoiceNumber,
    buildInvoicePayload,
  ]);

  // Keep ref up to date
  useEffect(() => {
    autoSaveRef.current = performAutoSave;
  }, [performAutoSave]);

  // Auto-save on unmount (navigation away)
  useEffect(() => {
    return () => {
      if (autoSaveRef.current) {
        autoSaveRef.current();
      }
    };
  }, []);

  const handleSaveDraft = async () => {
    if (!selectedClient) {
      toast.error("Please select a client first");
      return;
    }
    if (actorFetching || !actor) {
      toast.error("Still connecting, please wait...");
      return;
    }

    setIsSaving(true);
    try {
      const payload = buildInvoicePayload(InvoiceStatus.draft);
      if (!payload) return;

      if (savedInvoiceNumber) {
        await updateInvoiceMutation.mutateAsync({
          ...payload,
          invoiceNumber: savedInvoiceNumber,
        });
        toast.success("Draft updated!");
      } else {
        const newNum = await createInvoiceMutation.mutateAsync(payload);
        setSavedInvoiceNumber(newNum);
        setHasAutoSaved(true);
        toast.success("Draft saved!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndPreview = async () => {
    if (!selectedClient) {
      toast.error("Please select a client first");
      return;
    }
    if (lineItems.every((item) => !item.itemName.trim())) {
      toast.error("Please add at least one line item");
      return;
    }
    if (actorFetching || !actor) {
      toast.error("Still connecting, please wait...");
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
          status: InvoiceStatus.finalized,
        });
      } else {
        invoiceNum = await createInvoiceMutation.mutateAsync(payload);
        setSavedInvoiceNumber(invoiceNum);
      }
      setHasAutoSaved(true);

      window.location.href = `/invoices/${invoiceNum}/preview`;
    } catch (err: any) {
      toast.error(err?.message || "Failed to save invoice");
    } finally {
      setIsSaving(false);
    }
  };

  const addLineItem = () =>
    setLineItems((prev) => [...prev, defaultLineItem()]);

  const updateLineItem = (index: number, updated: FormLineItem) => {
    setLineItems((prev) =>
      prev.map((item, i) => (i === index ? updated : item)),
    );
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length === 1) return;
    setLineItems((prev) => prev.filter((_, i) => i !== index));
  };

  const isLoading = (isEdit && invoiceLoading) || clientsLoading;
  const isActorReady = !actorFetching && !!actor;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Page Header */}
      <div className="bg-card border border-border rounded-xl shadow-card px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground leading-tight">
              {isEdit ? "Edit Invoice" : "New Invoice"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEdit
                ? "Update invoice details below"
                : "Fill in the details to create your invoice"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={isSaving || !isActorReady}
            className="gap-1.5"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {!isActorReady ? "Connecting..." : "Save Draft"}
            </span>
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSaveAndPreview}
            disabled={isSaving || !isActorReady}
            className="gap-1.5"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {!isActorReady ? "Connecting..." : "Save & Preview"}
            </span>
          </Button>
        </div>
      </div>

      {/* Client Selection */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
              1
            </span>
            Client Details
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 pt-4">
          <div>
            <Label
              htmlFor="client"
              className="text-sm font-medium text-foreground"
            >
              Select Client
            </Label>
            <Select
              value={selectedClientId}
              onValueChange={setSelectedClientId}
            >
              <SelectTrigger id="client" className="mt-1.5">
                <SelectValue placeholder="Choose a client..." />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem
                    key={client.clientId.toString()}
                    value={client.clientId.toString()}
                  >
                    {client.name}{" "}
                    {client.companyName ? `(${client.companyName})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedClient && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-accent/30 border border-border rounded-lg text-sm">
              {selectedClient.email && (
                <div>
                  <span className="text-muted-foreground text-xs uppercase tracking-wide font-medium">
                    Email
                  </span>
                  <p className="text-foreground mt-0.5">
                    {selectedClient.email}
                  </p>
                </div>
              )}
              {selectedClient.phone && (
                <div>
                  <span className="text-muted-foreground text-xs uppercase tracking-wide font-medium">
                    Phone
                  </span>
                  <p className="text-foreground mt-0.5">
                    {selectedClient.phone}
                  </p>
                </div>
              )}
              {selectedClient.address && (
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground text-xs uppercase tracking-wide font-medium">
                    Address
                  </span>
                  <p className="text-foreground mt-0.5">
                    {selectedClient.address}
                  </p>
                </div>
              )}
              {selectedClient.gstNumber && (
                <div>
                  <span className="text-muted-foreground text-xs uppercase tracking-wide font-medium">
                    GST Number
                  </span>
                  <p className="text-foreground mt-0.5 font-mono text-xs">
                    {selectedClient.gstNumber}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Dates */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
              2
            </span>
            Invoice Details
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="invoiceDate"
                className="text-sm font-medium text-foreground"
              >
                Invoice Date
              </Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label
                htmlFor="dueDate"
                className="text-sm font-medium text-foreground"
              >
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
              3
            </span>
            Line Items
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3 pt-4">
          {lineItems.map((item, index) => (
            <LineItemRow
              // biome-ignore lint/suspicious/noArrayIndexKey: line items no stable ID
              key={`line-${index}`}
              index={index}
              lineItem={item}
              onChange={(updated: FormLineItem) =>
                updateLineItem(index, updated)
              }
              onRemove={() => removeLineItem(index)}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLineItem}
            className="w-full border-dashed border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Line Item
          </Button>
        </CardContent>
      </Card>

      {/* Totals */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
              4
            </span>
            Summary
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between items-center text-destructive">
                <span>Discount</span>
                <span className="font-medium">
                  -₹{totalDiscount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium text-foreground">
                ₹{totalTax.toFixed(2)}
              </span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between items-center pt-1">
              <span className="font-semibold text-base text-foreground">
                Grand Total
              </span>
              <span className="font-bold text-lg text-primary">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="bg-card border border-border rounded-xl shadow-card px-6 py-4 flex gap-3 mb-6">
        <Button
          type="button"
          variant="outline"
          className="flex-1 gap-2 h-11"
          onClick={handleSaveDraft}
          disabled={isSaving || !isActorReady}
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {!isActorReady ? "Connecting..." : "Save Draft"}
        </Button>
        <Button
          type="button"
          className="flex-1 gap-2 h-11"
          onClick={handleSaveAndPreview}
          disabled={isSaving || !isActorReady}
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          {!isActorReady ? "Connecting..." : "Save & Preview"}
        </Button>
      </div>
    </div>
  );
}
