import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, Crown, FileText, Users } from "lucide-react";
import React from "react";

const navItems = [
  { path: "/invoices", label: "Invoices", icon: FileText },
  { path: "/clients", label: "Clients", icon: Users },
  { path: "/business-profile", label: "Profile", icon: Building2 },
  { path: "/pricing", label: "Pro Plan", icon: Crown },
];

export default function MobileBottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-40 flex items-center">
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors ${
            isActive(path)
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-xs font-medium">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
