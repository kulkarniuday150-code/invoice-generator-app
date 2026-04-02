import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { FileText, Loader2, Phone, Shield, Star, Zap } from "lucide-react";
import React, { useEffect } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { isFetching: actorFetching } = useActor();
  const isAuthenticated = !!identity;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const isLoggingIn = loginStatus === "logging-in";

  // Redirect logic: wait for actor to be ready and profile to be fetched
  useEffect(() => {
    if (!isAuthenticated) return;
    if (actorFetching || profileLoading || !profileFetched) return;

    if (userProfile) {
      navigate({ to: "/dashboard" });
    } else {
      navigate({ to: "/signup" });
    }
  }, [
    isAuthenticated,
    actorFetching,
    profileLoading,
    profileFetched,
    userProfile,
    navigate,
  ]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  // Show loading while initializing or after login while actor/profile loads
  const showLoading =
    isInitializing ||
    (isAuthenticated && (actorFetching || profileLoading || !profileFetched));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/invoiceease-logo.dim_256x256.png"
              alt="InvoiceEase"
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-bold text-lg text-foreground">
              InvoiceEase
            </span>
          </div>
          <Button
            onClick={() => navigate({ to: "/phone-auth" })}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Phone className="mr-2 h-4 w-4" />
            Sign in with Mobile
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" />
            GST-compliant invoicing for Indian businesses
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Professional Invoices,
            <br />
            <span className="text-primary">Zero Hassle</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Create GST-compliant invoices in minutes. Manage clients, track
            payments, and grow your business with InvoiceEase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: "/phone-auth" })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              <Phone className="mr-2 h-5 w-5" />
              Sign in with Mobile OTP
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleLogin}
              disabled={isLoggingIn || showLoading}
              className="px-8"
            >
              {isLoggingIn || showLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Sign in with Internet Identity"
              )}
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/30 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
              Everything you need to invoice professionally
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FileText className="h-6 w-6 text-primary" />,
                  title: "GST-Compliant Invoices",
                  desc: "Generate invoices with CGST, SGST, and IGST breakdowns automatically.",
                },
                {
                  icon: <Zap className="h-6 w-6 text-primary" />,
                  title: "Multiple Templates",
                  desc: "Choose from Modern, Classic, Minimal, and premium templates.",
                },
                {
                  icon: <Shield className="h-6 w-6 text-primary" />,
                  title: "Secure & Private",
                  desc: "Your data is stored on the Internet Computer blockchain — fully decentralized.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  // biome-ignore lint/suspicious/noArrayIndexKey: static stars
                  key={`star-${i}`}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Trusted by 500+ Indian businesses
            </p>
          </div>
        </section>

        {/* Company details */}
        <section className="bg-muted/20 border-t border-border py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  InvoiceEase Technologies Pvt. Ltd.
                </h4>
                <p>Pune, Maharashtra, India – 411001</p>
                <p>Phone: +91 20 1234 5678</p>
                <p>Email: support@invoiceease.in</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Legal</h4>
                <p>CIN: U72900MH2024PTC123456</p>
                <p>GSTIN: 27AABCI1234A1Z5</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Policies</h4>
                <p>
                  <a
                    href="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
                <p>
                  <a
                    href="/terms"
                    className="hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </a>
                </p>
                <p>
                  <a
                    href="/refund"
                    className="hover:text-primary transition-colors"
                  >
                    Refund Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} InvoiceEase Technologies Pvt. Ltd. Built
          with <span className="text-red-500">♥</span> using{" "}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "invoiceease")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
