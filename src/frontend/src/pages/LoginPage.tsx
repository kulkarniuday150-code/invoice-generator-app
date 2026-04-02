import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileText,
  IndianRupee,
  Loader2,
  Phone,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import React, { useEffect } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";

const METRICS = [
  { label: "Businesses", value: "500+", icon: Building2 },
  { label: "Invoiced", value: "₹10Cr+", icon: IndianRupee },
  { label: "Rating", value: "4.9★", icon: Star },
];

const FEATURES = [
  {
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    title: "GST-Compliant Invoices",
    desc: "Auto-calculate CGST, SGST & IGST. Stay compliant with every invoice.",
  },
  {
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    title: "Multiple Templates",
    desc: "Modern, Classic, Minimal and premium templates. Pick your style.",
  },
  {
    icon: Shield,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    title: "Blockchain-Secured",
    desc: "Data stored on the Internet Computer — decentralized & tamper-proof.",
  },
  {
    icon: TrendingUp,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    title: "Revenue Insights",
    desc: "Track paid, unpaid, and overdue invoices with live dashboard stats.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    company: "TechVentures Pune",
    text: "InvoiceEase ने माझा वेळ वाचवला! GST invoicing इतकी सोपी कधीच नव्हती.",
    stars: 5,
  },
  {
    name: "Priya Mehta",
    company: "Mehta Traders Mumbai",
    text: "Very professional invoices. Clients are impressed with the quality.",
    stars: 5,
  },
  {
    name: "Amit Kulkarni",
    company: "AK Consultants",
    text: "Best invoice app for Indian businesses. Highly recommended!",
    stars: 5,
  },
];

const FiveStars = ({ size = "h-5 w-5" }: { size?: string }) => (
  <>
    <Star className={`${size} fill-amber-400 text-amber-400`} />
    <Star className={`${size} fill-amber-400 text-amber-400`} />
    <Star className={`${size} fill-amber-400 text-amber-400`} />
    <Star className={`${size} fill-amber-400 text-amber-400`} />
    <Star className={`${size} fill-amber-400 text-amber-400`} />
  </>
);

function InvoiceMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl" />
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 text-gray-800">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-lg">InvoiceEase</div>
            <div className="text-slate-400 text-xs mt-0.5">Tax Invoice</div>
          </div>
          <div className="text-right">
            <div className="text-amber-400 font-bold text-sm">#INV-00042</div>
            <div className="text-slate-400 text-xs">31 Mar 2026</div>
          </div>
        </div>
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Bill To
          </div>
          <div className="font-semibold text-gray-800">
            Sharma Technologies Pvt. Ltd.
          </div>
          <div className="text-xs text-gray-500">GSTIN: 27AABCS1234A1Z5</div>
        </div>
        <div className="px-6 py-3">
          <div className="space-y-2">
            {[
              { name: "Web Development", qty: 1, amt: "₹45,000" },
              { name: "UI/UX Design", qty: 3, amt: "₹18,000" },
              { name: "Consulting (hrs)", qty: 8, amt: "₹12,000" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-400 ml-2 text-xs">
                    ×{item.qty}
                  </span>
                </div>
                <span className="font-semibold text-gray-800">{item.amt}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₹75,000</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>CGST (9%)</span>
              <span>₹6,750</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>SGST (9%)</span>
              <span>₹6,750</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 pt-1 border-t border-gray-200">
              <span>Total</span>
              <span className="text-primary">₹88,500</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-semibold">
            <BadgeCheck className="h-3 w-3" /> GST Compliant
          </span>
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-xs font-semibold">
            Paid ✓
          </span>
        </div>
      </div>
      <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-xs font-bold rounded-full px-3 py-1.5 shadow-lg">
        PDF Ready
      </div>
    </div>
  );
}

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

  const showLoading =
    isInitializing ||
    (isAuthenticated && (actorFetching || profileLoading || !profileFetched));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">
              InvoiceEase
            </span>
            <span className="hidden sm:inline-flex items-center bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              GST Ready
            </span>
          </div>
          <Button
            onClick={() => navigate({ to: "/phone-auth" })}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
          >
            <Phone className="mr-1.5 h-3.5 w-3.5" />
            Sign In Free
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  #1 GST Invoice App for Indian Businesses
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-6">
                  Professional
                  <br />
                  <span className="text-primary">Invoices</span> in
                  <br />
                  <span className="text-accent">Seconds</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  Create GST-compliant invoices, manage clients, and track
                  payments — all in one beautiful dashboard. Built for Indian
                  freelancers and businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <Button
                    size="lg"
                    onClick={() => navigate({ to: "/phone-auth" })}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 shadow-lg shadow-primary/25 text-base"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Sign In with Mobile OTP
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleLogin}
                    disabled={isLoggingIn || showLoading}
                    className="font-semibold px-6 text-base border-2"
                  >
                    {isLoggingIn || showLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      "Internet Identity"
                    )}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {METRICS.map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2 shadow-sm"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-bold text-foreground text-sm">
                        {value}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-sm">
                  <InvoiceMockup />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/30 py-16 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-3">
                Everything you need to invoice professionally
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Designed specifically for Indian GST compliance and business
                needs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-default"
                >
                  <div
                    className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <f.icon className={`h-6 w-6 ${f.color}`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-1 mb-2">
                <FiveStars />
              </div>
              <p className="font-bold text-2xl text-foreground">
                Loved by Indian Businesses
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Rated 4.9/5 by 500+ businesses across India
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-card rounded-2xl p-6 border border-border shadow-card"
                >
                  <div className="flex gap-0.5 mb-3">
                    <FiveStars size="h-4 w-4" />
                  </div>
                  <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-12 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-foreground mb-3">
              Start invoicing in under 2 minutes
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-base">
              Free to start. No credit card required. 5 invoices free every
              month.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: "/phone-auth" })}
              className="bg-white text-primary hover:bg-white/90 font-bold px-8 shadow-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </div>
        </section>

        {/* Company Details */}
        <section className="bg-muted/20 border-t border-border py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                    <FileText className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground">
                    InvoiceEase Technologies
                  </h4>
                </div>
                <p>Pune, Maharashtra, India – 411001</p>
                <p className="mt-1">Phone: +91 20 1234 5678</p>
                <p>Email: support@invoiceease.in</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-3">Legal</h4>
                <p>CIN: U72900MH2024PTC123456</p>
                <p className="mt-1">GSTIN: 27AABCI1234A1Z5</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-3">Policies</h4>
                <div className="space-y-1.5">
                  {[
                    ["Privacy Policy", "/privacy"],
                    ["Terms of Service", "/terms"],
                    ["Refund Policy", "/refund"],
                  ].map(([label, href]) => (
                    <p key={label}>
                      <a
                        href={href}
                        className="hover:text-primary transition-colors"
                      >
                        {label}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
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
