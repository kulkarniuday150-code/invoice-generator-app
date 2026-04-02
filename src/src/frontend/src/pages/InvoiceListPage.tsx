import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  FileEdit,
  FileText,
  Plus,
  Search,
  Ticket,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { InvoiceStatus, Plan } from "../backend";
import PaymentStatusBadge from "../components/PaymentStatusBadge";
import { useBusinessProfile, useInvoices } from "../hooks/useQueries";
import {
  formatCurrency,
  formatDate,
  formatInvoiceNumber,
} from "../utils/formatters";

function InvoiceCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface InvoiceCardProps {
  invoice: {
    invoiceNumber: bigint;
    client: { name: string; companyName: string };
    invoiceDate: string;
    dueDate: string;
    grandTotal: bigint;
    paymentStatus: any;
    status: any;
  };
  isDraft?: boolean;
}

function InvoiceCard({ invoice, isDraft }: InvoiceCardProps) {
  const href = `/invoices/${invoice.invoiceNumber}`;
  return (
    <a
      key={invoice.invoiceNumber.toString()}
      href={href}
      className="block no-underline"
    >
      <Card className="shadow-card hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDraft ? "bg-amber-100 dark:bg-amber-900/30" : "bg-accent"}`}
              >
                {isDraft ? (
                  <FileEdit className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <FileText className="w-5 h-5 text-accent-foreground" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">
                    {formatInvoiceNumber(invoice.invoiceNumber)}
                  </p>
                  {isDraft && (
                    <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded font-medium">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {invoice.client.name}
                  {invoice.client.companyName &&
                    ` · ${invoice.client.companyName}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(invoice.invoiceDate)}
                  {invoice.dueDate && ` · Due: ${formatDate(invoice.dueDate)}`}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-foreground">
                {formatCurrency(invoice.grandTotal)}
              </p>
              <PaymentStatusBadge paymentStatus={invoice.paymentStatus} />
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export default function InvoiceListPage() {
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const { data: profile, isLoading: profileLoading } = useBusinessProfile();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"drafts" | "saved">("saved");

  const isLoading = invoicesLoading || profileLoading;
  const invoiceCount = invoices?.length ?? 0;
  const isFreePlan = profile?.plan === Plan.free;
  const remainingCredits = Number(profile?.remainingInvoiceCredits ?? 0);
  const freeLimitReached =
    isFreePlan && invoiceCount >= 5 && remainingCredits === 0;
  const canCreateInvoice = !freeLimitReached;

  const allFiltered = useMemo(() => {
    const q = search.toLowerCase();
    return (invoices ?? [])
      .filter((inv) => {
        return (
          formatInvoiceNumber(inv.invoiceNumber).toLowerCase().includes(q) ||
          inv.client.name.toLowerCase().includes(q) ||
          inv.client.companyName.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => Number(b.invoiceNumber) - Number(a.invoiceNumber));
  }, [invoices, search]);

  const draftInvoices = useMemo(
    () => allFiltered.filter((inv) => inv.status === InvoiceStatus.draft),
    [allFiltered],
  );

  const savedInvoices = useMemo(
    () => allFiltered.filter((inv) => inv.status !== InvoiceStatus.draft),
    [allFiltered],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Invoices
        </h1>
        <Button asChild={canCreateInvoice} disabled={!canCreateInvoice}>
          {canCreateInvoice ? (
            <Link to="/invoices/create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Invoice
            </Link>
          ) : (
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Invoice
            </span>
          )}
        </Button>
      </div>

      {/* Free plan / credits banner */}
      {isFreePlan && invoiceCount >= 4 && (
        <div
          className={`border rounded-lg p-4 flex items-center justify-between gap-4 ${
            freeLimitReached
              ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <AlertCircle
              className={`w-5 h-5 shrink-0 ${freeLimitReached ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}
            />
            <div className="min-w-0">
              <p
                className={`text-sm ${freeLimitReached ? "text-red-800 dark:text-red-200" : "text-amber-800 dark:text-amber-200"}`}
              >
                {freeLimitReached ? (
                  <>
                    You've reached the <strong>5 invoice limit</strong> on the
                    free plan.
                  </>
                ) : (
                  <>
                    <strong>{invoiceCount} of 5</strong> free invoices used.
                  </>
                )}
                {remainingCredits > 0 && (
                  <span className="text-green-700 dark:text-green-400 font-medium ml-1">
                    <Ticket className="w-3 h-3 inline mr-0.5" />
                    {remainingCredits} purchased credit
                    {remainingCredits !== 1 ? "s" : ""} available.
                  </span>
                )}
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="shrink-0 border-primary text-primary hover:bg-primary/10"
          >
            <Link to="/pricing">
              {freeLimitReached ? "Buy Credits" : "Buy More"}
            </Link>
          </Button>
        </div>
      )}

      {/* Credits info (non-free plan users with credits) */}
      {!isFreePlan && remainingCredits > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>{remainingCredits}</strong> invoice credit
              {remainingCredits !== 1 ? "s" : ""} remaining
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <Link to="/pricing">Buy More</Link>
          </Button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by invoice number or client name..."
          className="pl-9"
        />
      </div>

      {/* Tabs: Drafts | Saved Invoices */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "drafts" | "saved")}
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Saved Invoices
            {savedInvoices.length > 0 && (
              <span className="ml-1 bg-primary/10 text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">
                {savedInvoices.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-2">
            <FileEdit className="w-4 h-4" />
            Drafts
            {draftInvoices.length > 0 && (
              <span className="ml-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {draftInvoices.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Saved Invoices Tab */}
        <TabsContent value="saved" className="mt-4">
          {isLoading ? (
            <div className="space-y-3">
              <InvoiceCardSkeleton />
              <InvoiceCardSkeleton />
              <InvoiceCardSkeleton />
            </div>
          ) : savedInvoices.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                No saved invoices yet
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {search
                  ? "Try a different search term."
                  : "Create your first invoice to get started."}
              </p>
              {!search && canCreateInvoice && (
                <Button asChild size="sm" className="mt-4">
                  <Link to="/invoices/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Invoice
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {savedInvoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.invoiceNumber.toString()}
                  invoice={invoice}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Drafts Tab */}
        <TabsContent value="drafts" className="mt-4">
          {isLoading ? (
            <div className="space-y-3">
              <InvoiceCardSkeleton />
              <InvoiceCardSkeleton />
            </div>
          ) : draftInvoices.length === 0 ? (
            <div className="text-center py-16">
              <FileEdit className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No drafts</p>
              <p className="text-sm text-muted-foreground mt-1">
                {search
                  ? "Try a different search term."
                  : "Drafts are auto-saved while you work on an invoice."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {draftInvoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.invoiceNumber.toString()}
                  invoice={invoice}
                  isDraft
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
