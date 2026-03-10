import { useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Receipt } from "lucide-react";
import type React from "react";
import DesktopSidebar from "./DesktopSidebar";
import HamburgerMenu from "./HamburgerMenu";
import MobileBottomNav from "./MobileBottomNav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const router = useRouter();
  const currentPath = routerState.location.pathname;
  const isDashboard = currentPath === "/dashboard";

  const handleBack = () => {
    router.history.back();
  };

  const handleLogoClick = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar - fixed left, 256px wide, only visible on lg+ */}
      <DesktopSidebar />

      {/* Mobile bottom nav - fixed bottom, only visible below lg */}
      <MobileBottomNav />

      {/* Top header bar - visible on all screen sizes */}
      <header className="lg:ml-64 fixed top-0 left-0 right-0 lg:left-64 h-14 bg-card border-b border-border z-30 flex items-center justify-between px-4">
        {/* Left side: back arrow (non-dashboard) or logo placeholder */}
        <div className="flex items-center gap-2">
          {/* App logo - always visible, navigates to dashboard */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Go to dashboard"
          >
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-base text-foreground hidden sm:inline">
              InvoiceEase
            </span>
          </button>

          {/* Back arrow - shown on non-dashboard pages */}
          {!isDashboard && (
            <button
              type="button"
              onClick={handleBack}
              className="ml-1 flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right side: hamburger menu */}
        <HamburgerMenu />
      </header>

      {/* Main content area */}
      <main className="lg:ml-64 pt-14 pb-20 lg:pb-6 min-h-screen">
        <div className="px-4 py-6 max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
