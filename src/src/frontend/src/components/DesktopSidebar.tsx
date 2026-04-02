import { Link, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  Crown,
  FileText,
  Package,
  Receipt,
  Users,
} from "lucide-react";
import React from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useBusinessProfile } from "../hooks/useQueries";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { path: "/invoices", label: "Invoices", icon: FileText },
  { path: "/saved-items", label: "Items", icon: Package },
  { path: "/clients", label: "Clients", icon: Users },
  { path: "/business-profile", label: "Business Profile", icon: Building2 },
  { path: "/pricing", label: "Pro Plan", icon: Crown },
];

export default function DesktopSidebar() {
  const { identity } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: businessProfile } = useBusinessProfile();

  const businessName = businessProfile?.businessName ?? "";
  const principalStr = identity?.getPrincipal().toString() ?? "";

  const isActive = (path: string) => currentPath.startsWith(path);

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-sidebar-background border-r border-sidebar-border z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm">
          <Receipt className="w-4 h-4 text-accent-foreground" />
        </div>
        <span className="font-heading font-bold text-lg text-sidebar-foreground tracking-tight">
          InvoiceEase
        </span>
      </div>

      {/* Business name */}
      {businessName && (
        <div className="px-6 py-3 border-b border-sidebar-border">
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-semibold">
            Business
          </p>
          <p className="text-sm font-semibold text-sidebar-foreground truncate mt-0.5">
            {businessName}
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              data-ocid={`nav.${label.toLowerCase().replace(/ /g, "-")}.link`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-accent-foreground/50" />
              )}
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {label === "Items" && (
                <span className="ml-auto text-[10px] font-bold bg-accent-foreground/15 text-accent-foreground px-1.5 py-0.5 rounded-full">
                  ERP
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-2">
        {principalStr && (
          <div className="px-3 py-2 rounded-lg bg-sidebar-accent/50">
            <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-semibold mb-0.5">
              Logged in as
            </p>
            <p className="text-xs text-sidebar-foreground font-mono truncate">
              {principalStr}
            </p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
