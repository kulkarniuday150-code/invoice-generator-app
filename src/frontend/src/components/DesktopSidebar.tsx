import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  Crown,
  FileText,
  Receipt,
  Users,
} from "lucide-react";
import React from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useBusinessProfile } from "../hooks/useQueries";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { path: "/invoices", label: "Invoices", icon: FileText },
  { path: "/clients", label: "Clients", icon: Users },
  { path: "/saved-items", label: "Saved Items", icon: BookOpen },
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

  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-card border-r border-border z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Receipt className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-heading font-bold text-lg text-foreground">
          InvoiceEase
        </span>
      </div>

      {/* Business name */}
      {businessName && (
        <div className="px-6 py-3 border-b border-border">
          <p className="text-xs text-muted-foreground font-medium">Business</p>
          <p className="text-sm font-semibold text-foreground truncate">
            {businessName}
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(path)
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            data-ocid={`nav.${label.toLowerCase().replace(/ /g, "-")}.link`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-2">
        {principalStr && (
          <div className="px-3 py-2 rounded-lg bg-muted">
            <p className="text-xs text-muted-foreground font-medium mb-0.5">
              Logged in as
            </p>
            <p className="text-xs text-foreground font-mono truncate">
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
