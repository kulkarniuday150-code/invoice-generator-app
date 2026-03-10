import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Principal } from "@dfinity/principal";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Crown,
  FileText,
  Package,
  ShieldCheck,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useAdminStats, useAdminUpgradePlan } from "../hooks/useQueries";

export default function AdminDashboardPage() {
  const { isFetching: actorFetching } = useActor();
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useAdminStats();
  const upgradeUserPlan = useAdminUpgradePlan();

  // Show loading while actor is initializing
  if (actorFetching) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
            <Card key={`skeleton-${i}`}>
              <CardContent className="p-4">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // If stats error, user is not admin
  if (statsError && !statsLoading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Access Denied
        </h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access the admin panel. This area is
          restricted to administrators only.
        </p>
        <Link to="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Compute combined pro count (single + bundle)
  const proCount = stats
    ? Number(stats.proSingleCount) + Number(stats.proBundleCount)
    : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            Platform overview and user management
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
            <Card key={`skeleton-${i}`}>
              <CardContent className="p-4">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Number(stats.userCount)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Number(stats.totalInvoices)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total Invoices
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Number(stats.freePlanCount)}
                  </p>
                  <p className="text-xs text-muted-foreground">Free Plan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {proCount}
                  </p>
                  <p className="text-xs text-muted-foreground">Pro Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Plan Distribution */}
      {stats && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Free Plan */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Free Plan</span>
                  <span className="font-medium">
                    {Number(stats.freePlanCount)} users (
                    {Number(stats.userCount) > 0
                      ? Math.round(
                          (Number(stats.freePlanCount) /
                            Number(stats.userCount)) *
                            100,
                        )
                      : 0}
                    %)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{
                      width:
                        Number(stats.userCount) > 0
                          ? `${(Number(stats.freePlanCount) / Number(stats.userCount)) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>

              {/* Pro Single Plan */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Pro Single (₹5)
                  </span>
                  <span className="font-medium">
                    {Number(stats.proSingleCount)} users (
                    {Number(stats.userCount) > 0
                      ? Math.round(
                          (Number(stats.proSingleCount) /
                            Number(stats.userCount)) *
                            100,
                        )
                      : 0}
                    %)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-400 rounded-full transition-all"
                    style={{
                      width:
                        Number(stats.userCount) > 0
                          ? `${(Number(stats.proSingleCount) / Number(stats.userCount)) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>

              {/* Pro Bundle Plan */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Package className="w-3 h-3" /> Pro Bundle (₹39)
                  </span>
                  <span className="font-medium">
                    {Number(stats.proBundleCount)} users (
                    {Number(stats.userCount) > 0
                      ? Math.round(
                          (Number(stats.proBundleCount) /
                            Number(stats.userCount)) *
                            100,
                        )
                      : 0}
                    %)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-600 rounded-full transition-all"
                    style={{
                      width:
                        Number(stats.userCount) > 0
                          ? `${(Number(stats.proBundleCount) / Number(stats.userCount)) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>

              {/* Total Invoice Credits */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Ticket className="w-3 h-3" /> Total Invoice Credits
                    Remaining
                  </span>
                  <span className="font-semibold text-primary">
                    {Number(stats.totalInvoiceCredits)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upgrade User Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Upgrade User to Pro</CardTitle>
        </CardHeader>
        <CardContent>
          <UpgradeUserForm
            onUpgrade={async (principalText) => {
              try {
                // Validate the principal text first
                Principal.fromText(principalText);
                // Pass as string — useAdminUpgradePlan converts internally
                await upgradeUserPlan.mutateAsync(principalText);
                toast.success(
                  `User ${principalText.slice(0, 12)}... upgraded to Pro`,
                );
              } catch (err: unknown) {
                const msg =
                  err instanceof Error ? err.message : "Failed to upgrade user";
                toast.error(msg);
              }
            }}
            isPending={upgradeUserPlan.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function UpgradeUserForm({
  onUpgrade,
  isPending,
}: {
  onUpgrade: (principal: string) => Promise<void>;
  isPending: boolean;
}) {
  const [principalText, setPrincipalText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!principalText.trim()) {
      toast.error("Please enter a principal ID");
      return;
    }
    await onUpgrade(principalText.trim());
    setPrincipalText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={principalText}
        onChange={(e) => setPrincipalText(e.target.value)}
        placeholder="Enter user principal ID (e.g. aaaaa-aa)"
        className="flex-1 px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <Button type="submit" disabled={isPending} className="gap-2 shrink-0">
        <Crown className="w-4 h-4" />
        {isPending ? "Upgrading..." : "Upgrade to Pro"}
      </Button>
    </form>
  );
}
