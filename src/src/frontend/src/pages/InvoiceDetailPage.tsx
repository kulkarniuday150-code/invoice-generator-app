import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Crown,
  Edit,
  Eye,
  Loader2,
  Mail,
  MessageCircle,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { PaymentStatus, Plan } from "../backend";
import {
  useBusinessProfile,
  useDeleteInvoice,
  useInvoice,
  useUpdatePaymentStatus,
} from "../hooks/useQueries";
import {
  generateEmailShareUrl,
  generateWhatsAppShareUrl,
} from "../utils/shareInvoice";

function formatCurrency(amount: bigint | number) {
  return `₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

function getStatusColor(status: PaymentStatus) {
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

export default function InvoiceDetailPage() {
  const params = useParams({ strict: false }) as { invoiceNumber?: string };
  const navigate = useNavigate();
  const invoiceNumber = Number.parseInt(params.invoiceNumber || "0", 10);

  // Pass null instead of undefined to satisfy the bigint | null type
  const { data: invoice, isLoading } = useInvoice(
    invoiceNumber > 0 ? BigInt(invoiceNumber) : null,
  );
  const { data: businessProfile } = useBusinessProfile();
  const deleteInvoice = useDeleteInvoice();
  const updatePaymentStatus = useUpdatePaymentStatus();

  const [statusUpdating, setStatusUpdating] = useState(false);

  // User has "pro" features if they are on any non-free plan or have purchased credits
  const isPro =
    businessProfile?.plan !== undefined &&
    (businessProfile.plan === Plan.pro_single ||
      businessProfile.plan === Plan.pro_bundle ||
      Number(businessProfile.remainingInvoiceCredits) > 0);

  const handleStatusChange = async (value: string) => {
    if (!invoice) return;
    setStatusUpdating(true);
    try {
      const statusMap: Record<string, PaymentStatus> = {
        paid: PaymentStatus.paid,
        unpaid: PaymentStatus.unpaid,
        partial: PaymentStatus.partial,
      };
      await updatePaymentStatus.mutateAsync({
        invoiceNumber: invoice.invoiceNumber,
        status: statusMap[value],
      });
      toast.success("Payment status updated");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!invoice) return;
    try {
      await deleteInvoice.mutateAsync(invoice.invoiceNumber);
      toast.success("Invoice deleted");
      navigate({ to: "/invoices" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete invoice");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Invoice not found.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate({ to: "/invoices" })}
        >
          Back to Invoices
        </Button>
      </div>
    );
  }

  const whatsappUrl = generateWhatsAppShareUrl(
    invoice,
    businessProfile?.businessName,
  );
  const emailUrl = generateEmailShareUrl(
    invoice,
    businessProfile?.businessName,
  );

  return (
    <TooltipProvider>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: "/invoices" })}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">
              Invoice #{String(invoice.invoiceNumber).padStart(4, "0")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {invoice.invoiceDate}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.paymentStatus)}`}
          >
            {invoice.paymentStatus}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <a href={`/invoices/${invoiceNumber}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </a>
          <a href={`/invoices/${invoiceNumber}/preview`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </a>

          {/* WhatsApp Share */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-300 hover:bg-green-50 dark:hover:bg-green-950/20"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </a>

          {/* Email Share */}
          <a href={emailUrl}>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </a>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/30 hover:bg-destructive/10 ml-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Invoice?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Invoice #
                  {String(invoice.invoiceNumber).padStart(4, "0")} will be
                  permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Invoice Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="font-semibold text-foreground">
                {invoice.client.name}
              </p>
              {invoice.client.companyName && (
                <p className="text-sm text-muted-foreground">
                  {invoice.client.companyName}
                </p>
              )}
              {invoice.client.email && (
                <p className="text-sm text-muted-foreground">
                  {invoice.client.email}
                </p>
              )}
              {invoice.client.phone && (
                <p className="text-sm text-muted-foreground">
                  {invoice.client.phone}
                </p>
              )}
              {invoice.client.address && (
                <p className="text-sm text-muted-foreground">
                  {invoice.client.address}
                </p>
              )}
              {invoice.client.gstNumber && (
                <p className="text-xs text-muted-foreground">
                  GST: {invoice.client.gstNumber}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Invoice Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Invoice Date</span>
                <span className="font-medium">{invoice.invoiceDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Due Date</span>
                <span className="font-medium">{invoice.dueDate || "—"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">{invoice.status}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Items */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Line Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">
                      Item
                    </th>
                    <th className="text-right py-2 text-muted-foreground font-medium">
                      Qty
                    </th>
                    <th className="text-right py-2 text-muted-foreground font-medium">
                      Rate
                    </th>
                    <th className="text-right py-2 text-muted-foreground font-medium">
                      Tax
                    </th>
                    <th className="text-right py-2 text-muted-foreground font-medium">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.lineItems.map((item, idx) => {
                    const base = Number(item.quantity) * Number(item.rate);
                    const discAmt = (base * Number(item.discount)) / 100;
                    const taxable = base - discAmt;
                    const taxAmt = (taxable * Number(item.taxRate)) / 100;
                    const lineTotal = taxable + taxAmt;
                    return (
                      <tr
                        key={`${item.itemName}-${idx}`}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="py-2.5 text-foreground">
                          {item.itemName}
                        </td>
                        <td className="py-2.5 text-right text-muted-foreground">
                          {Number(item.quantity)}
                        </td>
                        <td className="py-2.5 text-right text-muted-foreground">
                          {formatCurrency(item.rate)}
                        </td>
                        <td className="py-2.5 text-right text-muted-foreground">
                          {item.taxType !== "None"
                            ? `${item.taxType} ${Number(item.taxRate)}%`
                            : "—"}
                        </td>
                        <td className="py-2.5 text-right font-medium">
                          {formatCurrency(lineTotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-1.5 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(invoice.subtotal)}</span>
              </div>
              {Number(invoice.totalDiscount) > 0 && (
                <div className="flex justify-between text-sm text-destructive">
                  <span>Discount</span>
                  <span>-{formatCurrency(invoice.totalDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(invoice.totalTax)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
                <span>Grand Total</span>
                <span className="text-primary">
                  {formatCurrency(invoice.grandTotal)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Select
                value={invoice.paymentStatus}
                onValueChange={handleStatusChange}
                disabled={statusUpdating}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentStatus.unpaid}>Unpaid</SelectItem>
                  <SelectItem value={PaymentStatus.partial}>Partial</SelectItem>
                  <SelectItem value={PaymentStatus.paid}>Paid</SelectItem>
                </SelectContent>
              </Select>
              {statusUpdating && (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Credits / Upgrade Banner */}
        {!isPro && (
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
            <CardContent className="py-3 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-800 dark:text-amber-200">
                  Buy invoice credits to unlock premium templates and more
                </span>
              </div>
              <a href="/pricing">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:text-amber-300 whitespace-nowrap"
                >
                  Buy Credits
                </Button>
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
