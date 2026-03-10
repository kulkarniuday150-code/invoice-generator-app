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

function StatCardSkeleton() {
  return (
    <Card className="shadow-card">
      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

function InvoiceRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="text-right space-y-1">
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
      icon: FileText,
      color: "text-primary",
      bg: "bg-accent",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: IndianRupee,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Unpaid Invoices",
      value: unpaidInvoices.length,
      icon: AlertCircle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Paid Invoices",
      value: paidInvoices.length,
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Dashboard
          </h1>
          {profile && (
            <p className="text-muted-foreground text-sm mt-1">
              {profile.businessName}
            </p>
          )}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button asChild={canCreateInvoice} disabled={!canCreateInvoice}>
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

      {/* Free plan / credits banner */}
      {showFreeBanner && (
        <div
          className={`border rounded-lg p-4 flex items-center justify-between gap-4 ${
            freeLimitReached
              ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <AlertCircle
              className={`w-5 h-5 shrink-0 ${freeLimitReached ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}
            />
            <div>
              <p
                className={`text-sm ${freeLimitReached ? "text-red-800 dark:text-red-200" : "text-amber-800 dark:text-amber-200"}`}
              >
                You have used <strong>{invoiceCount} of 5</strong> free
                invoices.
                {freeLimitReached
                  ? " Purchase credits to create more invoices."
                  : " Buy credits to avoid interruption."}
              </p>
              {remainingCredits > 0 && (
                <p className="text-xs text-green-700 dark:text-green-400 mt-0.5 font-medium">
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
            className="shrink-0 border-primary text-primary hover:bg-primary/10"
          >
            <Link to="/pricing">Buy Credits</Link>
          </Button>
        </div>
      )}

      {/* Credits info card (when user has purchased credits) */}
      {remainingCredits > 0 && !showFreeBanner && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Ticket className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
            <p className="text-sm text-green-800 dark:text-green-200">
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
            className="shrink-0 border-green-400 text-green-700 hover:bg-green-100"
          >
            <Link to="/pricing">Buy More</Link>
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          stats.map(({ title, value, icon: Icon, color, bg }) => (
            <Card key={title} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      {title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {value}
                    </p>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="block">
                <Button
                  asChild={canCreateInvoice}
                  disabled={!canCreateInvoice}
                  variant="outline"
                  className="w-full h-auto py-4 flex flex-col gap-2"
                >
                  {canCreateInvoice ? (
                    <Link
                      to="/invoices/create"
                      className="flex flex-col items-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Create Invoice
                      </span>
                    </Link>
                  ) : (
                    <span>
                      <FileText className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Create Invoice
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
          className="h-auto py-4 flex flex-col gap-2"
          onClick={() => setClientModalOpen(true)}
        >
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">Add Client</span>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-auto py-4 flex flex-col gap-2"
        >
          <Link to="/clients" className="flex flex-col items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            <span className="text-sm font-medium">View Clients</span>
          </Link>
        </Button>
      </div>

      {/* Recent Invoices */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Recent Invoices</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/invoices">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-1">
              <InvoiceRowSkeleton />
              <InvoiceRowSkeleton />
              <InvoiceRowSkeleton />
            </div>
          ) : recentInvoices.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No invoices yet</p>
              {canCreateInvoice && (
                <Button asChild size="sm" className="mt-3">
                  <Link to="/invoices/create">Create your first invoice</Link>
                </Button>
              )}
            </div>
          ) : (
            <div>
              {recentInvoices.map((invoice) => (
                <a
                  key={String(invoice.invoiceNumber)}
                  href={`/invoices/${invoice.invoiceNumber}`}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/50 -mx-2 px-2 rounded transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {formatInvoiceNumber(invoice.invoiceNumber)} ·{" "}
                      {invoice.client.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(invoice.invoiceDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
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

      {/* Divider */}
      <Separator />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Client Modal */}
      <ClientFormModal
        open={clientModalOpen}
        onOpenChange={setClientModalOpen}
      />
    </div>
  );
}
