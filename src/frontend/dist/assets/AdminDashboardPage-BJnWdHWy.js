import { e as useActor, i as useAdminStats, k as useAdminUpgradePlan, j as jsxRuntimeExports, C as Card, l as CardContent, m as Link, B as Button, S as ShieldCheck, U as Users, F as FileText, T as TrendingUp, n as Crown, o as CardHeader, p as CardTitle, q as Package, s as Principal, c as ue, r as reactExports } from "./index-D5Ia9PfW.js";
import { S as Skeleton } from "./skeleton-QpRwiCJS.js";
import { C as CircleAlert, T as Ticket } from "./ticket-YyyAv1w6.js";
function AdminDashboardPage() {
  const { isFetching: actorFetching } = useActor();
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError
  } = useAdminStats();
  const upgradeUserPlan = useAdminUpgradePlan();
  if (actorFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }) }) }, `skeleton-${i}`)
      )) })
    ] });
  }
  if (statsError && !statsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-2", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "You don't have permission to access the admin panel. This area is restricted to administrators only." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Back to Dashboard" }) })
    ] });
  }
  const proCount = stats ? Number(stats.proSingleCount) + Number(stats.proBundleCount) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Platform overview and user management" })
      ] })
    ] }),
    statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }) }) }, `skeleton-${i}`)
    )) }) : stats ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: Number(stats.userCount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Users" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: Number(stats.totalInvoices) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Invoices" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-amber-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: Number(stats.freePlanCount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Free Plan" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-violet-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: proCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pro Users" })
        ] })
      ] }) }) })
    ] }) : null,
    stats && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Plan Distribution" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Free Plan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              Number(stats.freePlanCount),
              " users (",
              Number(stats.userCount) > 0 ? Math.round(
                Number(stats.freePlanCount) / Number(stats.userCount) * 100
              ) : 0,
              "%)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-amber-400 rounded-full transition-all",
              style: {
                width: Number(stats.userCount) > 0 ? `${Number(stats.freePlanCount) / Number(stats.userCount) * 100}%` : "0%"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" }),
              " Pro Single (₹5)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              Number(stats.proSingleCount),
              " users (",
              Number(stats.userCount) > 0 ? Math.round(
                Number(stats.proSingleCount) / Number(stats.userCount) * 100
              ) : 0,
              "%)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-violet-400 rounded-full transition-all",
              style: {
                width: Number(stats.userCount) > 0 ? `${Number(stats.proSingleCount) / Number(stats.userCount) * 100}%` : "0%"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3" }),
              " Pro Bundle (₹39)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              Number(stats.proBundleCount),
              " users (",
              Number(stats.userCount) > 0 ? Math.round(
                Number(stats.proBundleCount) / Number(stats.userCount) * 100
              ) : 0,
              "%)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-violet-600 rounded-full transition-all",
              style: {
                width: Number(stats.userCount) > 0 ? `${Number(stats.proBundleCount) / Number(stats.userCount) * 100}%` : "0%"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-3 h-3" }),
            " Total Invoice Credits Remaining"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: Number(stats.totalInvoiceCredits) })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Upgrade User to Pro" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        UpgradeUserForm,
        {
          onUpgrade: async (principalText) => {
            try {
              Principal.fromText(principalText);
              await upgradeUserPlan.mutateAsync(principalText);
              ue.success(
                `User ${principalText.slice(0, 12)}... upgraded to Pro`
              );
            } catch (err) {
              const msg = err instanceof Error ? err.message : "Failed to upgrade user";
              ue.error(msg);
            }
          },
          isPending: upgradeUserPlan.isPending
        }
      ) })
    ] })
  ] });
}
function UpgradeUserForm({
  onUpgrade,
  isPending
}) {
  const [principalText, setPrincipalText] = reactExports.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!principalText.trim()) {
      ue.error("Please enter a principal ID");
      return;
    }
    await onUpgrade(principalText.trim());
    setPrincipalText("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value: principalText,
        onChange: (e) => setPrincipalText(e.target.value),
        placeholder: "Enter user principal ID (e.g. aaaaa-aa)",
        className: "flex-1 px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: isPending, className: "gap-2 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4" }),
      isPending ? "Upgrading..." : "Upgrade to Pro"
    ] })
  ] });
}
export {
  AdminDashboardPage as default
};
