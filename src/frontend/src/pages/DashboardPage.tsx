import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  FileText,
  IndianRupee,
  Package,
  Plus,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useMemo } from "react";
import { useState } from "react";
import { PaymentStatus, Plan } from "../backend";
import ClientFormModal from "../components/ClientFormModal";
import PaymentStatusBadge from "../components/PaymentStatusBadge";
import TestimonialsSection from "../components/TestimonialsSection";
import { useBusinessProfile, useInvoices } from "../hooks/useQueries";
import {
  formatCurrency,
  formatDate,
  formatInvoiceNumber,
} from "../utils/formatters";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getFormattedDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StatCardSkeleton() {
  return (
    <Card className="shadow-card">
      <CardContent className="p-5">
        <div className="space-y-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

function InvoiceRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="text-right space-y-1.5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useBusinessProfile();
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const [clientModalOpen, setClientModalOpen] = useState(false);

  const isLoading = profileLoading || invoicesLoading;

  const invoiceCount = invoices?.length ?? 0;
  const paidInvoices = useMemo(
    () =>
      invoices?.filter((inv) => inv.paymentStatus === PaymentStatus.paid) ?? [],
    [invoices],
  );
  const unpaidInvoices = useMemo(
    () =>
      invoices?.filter((inv) => inv.paymentStatus === PaymentStatus.unpaid) ??
      [],
    [invoices],
  );
  const totalRevenue = useMemo(
    () => paidInvoices.reduce((sum, inv) => sum + Number(inv.grandTotal), 0),
    [paidInvoices],
  );

  const isFreePlan = profile?.plan === Plan.free;
  const remainingCredits = Number(profile?.remainingInvoiceCredits ?? 0);
  const freeLimitReached =
    isFreePlan && invoiceCount >= 5 && remainingCredits === 0;
  const canCreateInvoice = !freeLimitReached;
  const showFreeBanner = isFreePlan && invoiceCount >= 4;

  const recentInvoices = useMemo(
    () =>
      [...(invoices ?? [])]
        .sort(
          (a, b) =>
            new Date(b.invoiceDate).getTime() -
            new Date(a.invoiceDate).getTime(),
        )
        .slice(0, 5),
    [invoices],
  );

  const stats = [
    {
      title: "Total Invoices",
      value: invoiceCount,
      sub: "all time",
      icon: FileText,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      gradient: "from-primary/5 via-primary/[0.02] to-transparent",
      border: "border-primary/10",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      sub: "from paid invoices",
      icon: IndianRupee,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-emerald-500/5 via-emerald-500/[0.02] to-transparent",
      border: "border-emerald-500/10",
    },
    {
      title: "Unpaid",
      value: unpaidInvoices.length,
      sub: "awaiting payment",
      icon: AlertCircle,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
      gradient: "from-amber-500/5 via-amber-500/[0.02] to-transparent",
      border: "border-amber-500/10",
    },
    {
      title: "Paid",
      value: paidInvoices.length,
      sub: "completed",
      icon: TrendingUp,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      gradient: "from-blue-500/5 via-blue-500/[0.02] to-transparent",
      border: "border-blue-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Greeting Header ─────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {isLoading ? (
            <>
              <Skeleton className="h-7 w-48 mb-1.5" />
              <Skeleton className="h-4 w-32" />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-heading font-bold text-foreground tracking-tight">
                {getGreeting()},{" "}
                <span className="text-primary">
                  {profile?.businessName ?? "Welcome"}
                </span>{" "}
                👋
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {getFormattedDate()}
              </p>
            </>
          )}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  asChild={canCreateInvoice}
                  disabled={!canCreateInvoice}
                  className="font-bold shadow-sm shadow-primary/20 bg-primary hover:bg-primary/90"
                  data-ocid="dashboard.primary_button"
                >
                  {canCreateInvoice ? (
                    <Link
                      to="/invoices/create"
                      className="flex items-center gap-2"
                    >
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
              </span>
            </TooltipTrigger>
            {!canCreateInvoice && (
              <TooltipContent>
                <p>
                  Free plan limit reached. Buy invoice credits to create more.
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* ── Free plan banner ─────────────────────── */}
      {showFreeBanner && (
        <div
          className={`border rounded-2xl p-4 flex items-center justify-between gap-4 ${
            freeLimitReached
              ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
          }`}
          data-ocid="dashboard.panel"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                freeLimitReached
                  ? "bg-red-100 dark:bg-red-800/40"
                  : "bg-amber-100 dark:bg-amber-800/40"
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 ${freeLimitReached ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}
              />
            </div>
            <div>
              <p
                className={`text-sm font-semibold ${
                  freeLimitReached
                    ? "text-red-800 dark:text-red-200"
                    : "text-amber-800 dark:text-amber-200"
                }`}
              >
                {freeLimitReached
                  ? "Free plan limit reached"
                  : `${invoiceCount} of 5 free invoices used`}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  freeLimitReached
                    ? "text-red-700 dark:text-red-300"
                    : "text-amber-700 dark:text-amber-300"
                }`}
              >
                {freeLimitReached
                  ? "Purchase credits to create more invoices."
                  : "Buy credits to avoid interruption."}
              </p>
              {remainingCredits > 0 && (
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 font-medium">
                  <Ticket className="w-3 h-3 inline mr-1" />
                  {remainingCredits} purchased credit
                  {remainingCredits !== 1 ? "s" : ""} available
                </p>
              )}
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="shrink-0 border-primary text-primary hover:bg-primary/10 font-semibold"
            data-ocid="dashboard.secondary_button"
          >
            <Link to="/pricing">Buy Credits</Link>
          </Button>
        </div>
      )}

      {/* ── Credits info ─────────────────────────── */}
      {remainingCredits > 0 && !showFreeBanner && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-800/40 rounded-xl flex items-center justify-center">
              <Ticket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              You have{" "}
              <strong>
                {remainingCredits} invoice credit
                {remainingCredits !== 1 ? "s" : ""}
              </strong>{" "}
              remaining.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="shrink-0 border-emerald-400 text-emerald-700 hover:bg-emerald-100 font-semibold"
          >
            <Link to="/pricing">Buy More</Link>
          </Button>
        </div>
      )}

      {/* ── Stats ────────────────────────────────── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.section"
      >
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          stats.map(
            ({
              title,
              value,
              sub,
              icon: Icon,
              iconBg,
              iconColor,
              gradient,
              border,
            }) => (
              <Card
                key={title}
                className={`shadow-card overflow-hidden border ${border} hover:shadow-card-hover transition-shadow duration-200`}
              >
                <CardContent className="p-5">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`}
                  />
                  <div className="relative">
                    <div
                      className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-3 border border-white/20`}
                    >
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                      {title}
                    </p>
                    <p className="text-3xl font-heading font-bold text-foreground mt-1">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                  </div>
                </CardContent>
              </Card>
            ),
          )
        )}
      </div>

      {/* ── Quick Actions ─────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="block">
                  <Button
                    asChild={canCreateInvoice}
                    disabled={!canCreateInvoice}
                    variant="outline"
                    className="w-full h-auto py-5 flex flex-col gap-2.5 hover:border-primary/60 hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200 rounded-2xl border-2"
                    data-ocid="actions.primary_button"
                  >
                    {canCreateInvoice ? (
                      <Link
                        to="/invoices/create"
                        className="flex flex-col items-center gap-2.5"
                      >
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm font-bold">
                          Create Invoice
                        </span>
                        <span className="text-xs text-muted-foreground">
                          New GST invoice
                        </span>
                      </Link>
                    ) : (
                      <span className="flex flex-col items-center gap-2.5">
                        <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-bold">
                          Create Invoice
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Limit reached
                        </span>
                      </span>
                    )}
                  </Button>
                </span>
              </TooltipTrigger>
              {!canCreateInvoice && (
                <TooltipContent>
                  Free plan limit reached — buy credits
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="outline"
            className="h-auto py-5 flex flex-col gap-2.5 hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200 rounded-2xl border-2"
            onClick={() => setClientModalOpen(true)}
            data-ocid="actions.secondary_button"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-bold">Add Client</span>
            <span className="text-xs text-muted-foreground">
              Register a new client
            </span>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-auto py-5 flex flex-col gap-2.5 hover:border-blue-400/60 hover:bg-blue-500/5 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200 rounded-2xl border-2"
          >
            <Link
              to="/saved-items"
              className="flex flex-col items-center gap-2.5"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-bold">Item Master</span>
              <span className="text-xs text-muted-foreground">
                Manage saved items
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Recent Invoices ──────────────────────── */}
      <Card className="shadow-card border border-border rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3 px-6 pt-5">
          <div>
            <CardTitle className="text-base font-heading font-bold">
              Recent Invoices
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your latest 5 invoices
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs text-primary font-semibold gap-1"
          >
            <Link to="/invoices">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="px-6 pb-5">
          {isLoading ? (
            <div className="space-y-0">
              <InvoiceRowSkeleton />
              <InvoiceRowSkeleton />
              <InvoiceRowSkeleton />
            </div>
          ) : recentInvoices.length === 0 ? (
            <div className="text-center py-12" data-ocid="invoices.empty_state">
              <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-7 h-7 text-muted-foreground/40" />
              </div>
              <p className="text-foreground font-semibold mb-1">
                No invoices yet
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Create your first invoice to get started
              </p>
              {canCreateInvoice && (
                <Button asChild size="sm" className="font-semibold">
                  <Link to="/invoices/create">
                    <Plus className="w-4 h-4 mr-1" />
                    Create Invoice
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div>
              {recentInvoices.map((invoice, idx) => (
                <a
                  key={String(invoice.invoiceNumber)}
                  href={`/invoices/${invoice.invoiceNumber}`}
                  className="flex items-center justify-between py-3.5 border-b border-border/60 last:border-0 hover:bg-muted/40 -mx-2 px-2 rounded-xl transition-colors group"
                  data-ocid={`invoices.item.${idx + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {formatInvoiceNumber(invoice.invoiceNumber)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.client.name} ·{" "}
                        {formatDate(invoice.invoiceDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-foreground">
                      {formatCurrency(invoice.grandTotal)}
                    </p>
                    <PaymentStatusBadge paymentStatus={invoice.paymentStatus} />
                  </div>
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      <TestimonialsSection />

      <ClientFormModal
        open={clientModalOpen}
        onOpenChange={setClientModalOpen}
      />
    </div>
  );
}
