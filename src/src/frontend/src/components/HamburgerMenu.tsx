import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  Crown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/invoices", label: "Invoices", icon: FileText },
  { path: "/saved-items", label: "Items", icon: Package },
  { path: "/clients", label: "Clients", icon: Users },
  { path: "/business-profile", label: "Business Profile", icon: Building2 },
  { path: "/pricing", label: "Pro Plan", icon: Crown },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => currentPath.startsWith(path);

  const handleLogout = async () => {
    setIsOpen(false);
    await clear();
    queryClient.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Open menu"
        data-ocid="nav.hamburger.toggle"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-elevated z-50 overflow-hidden">
          <nav className="py-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(path)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                data-ocid={`nav.${label.toLowerCase().replace(/ /g, "-")}.link`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {label === "Items" && (
                  <span className="ml-auto text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                    ERP
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border py-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              data-ocid="nav.signout.button"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
