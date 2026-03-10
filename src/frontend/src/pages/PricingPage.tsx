import { Button } from "@/components/ui/button";
import {
  Check,
  Crown,
  Loader2,
  Package,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Plan } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useBusinessProfile,
  usePurchaseInvoiceCredits,
} from "../hooks/useQueries";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayInstance {
  open(): void;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Razorpay key — replace with your actual Razorpay key ID
const RAZORPAY_KEY_ID = "rzp_test_YourKeyHere";

const PLANS = [
  {
    id: "single" as const,
    label: "1 Invoice",
    price: "₹5",
    paise: 500,
    quantity: 1,
    planType: Plan.pro_single,
    description: "Perfect for a one-time invoice",
    features: [
      "1 invoice credit",
      "All 13 templates (standard + premium)",
      "Full GST support (CGST/SGST/IGST)",
      "PDF download & print",
      "Email & WhatsApp share",
    ],
    badge: null,
    highlight: false,
  },
  {
    id: "bundle" as const,
    label: "10 Invoices",
    price: "₹39",
    paise: 3900,
    quantity: 10,
    planType: Plan.pro_bundle,
    description: "Best value — save ₹11",
    features: [
      "10 invoice credits",
      "All 13 templates (standard + premium)",
      "Full GST support (CGST/SGST/IGST)",
      "PDF download & print",
      "Email & WhatsApp share",
      "Priority support",
    ],
    badge: "Best Value",
    highlight: true,
  },
];

const FREE_FEATURES = [
  "Up to 5 invoices",
  "3 standard templates",
  "Basic GST support",
  "PDF download & print",
  "Client management",
  "Email & WhatsApp share",
];

const COMPARISON_ROWS = [
  {
    feature: "Invoices",
    free: "5 total",
    single: "1 credit",
    bundle: "10 credits",
  },
  {
    feature: "Templates",
    free: "3 standard",
    single: "13 templates",
    bundle: "13 templates",
  },
  { feature: "GST Support", free: "Basic", single: "Full", bundle: "Full" },
  { feature: "PDF Export", free: true, single: true, bundle: true },
  { feature: "Client Management", free: true, single: true, bundle: true },
  { feature: "WhatsApp Share", free: true, single: true, bundle: true },
  { feature: "Email Share", free: true, single: true, bundle: true },
  { feature: "Priority Support", free: false, single: false, bundle: true },
];

export default function PricingPage() {
  const { identity } = useInternetIdentity();
  const { data: businessProfile } = useBusinessProfile();
  const purchaseCredits = usePurchaseInvoiceCredits();
  const [processingPlan, setProcessingPlan] = React.useState<
    "single" | "bundle" | null
  >(null);

  const remainingCredits = Number(
    businessProfile?.remainingInvoiceCredits ?? 0,
  );

  const handleBuyNow = async (plan: (typeof PLANS)[number]) => {
    if (!identity) {
      toast.error("Please log in to purchase invoice credits.");
      return;
    }

    setProcessingPlan(plan.id);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load payment gateway. Please try again.");
      setProcessingPlan(null);
      return;
    }

    const options: RazorpayOptions = {
      key: RAZORPAY_KEY_ID,
      amount: plan.paise,
      currency: "INR",
      name: "InvoiceEase",
      description: `InvoiceEase — ${plan.label} (${plan.price})`,
      image: "/assets/generated/invoiceease-logo.dim_256x256.png",
      handler: async (response: RazorpayResponse) => {
        if (response.razorpay_payment_id) {
          try {
            await purchaseCredits.mutateAsync({
              stripeSessionId: response.razorpay_payment_id,
              paymentAmount: BigInt(plan.paise),
              planType: plan.planType,
              quantity: BigInt(plan.quantity),
            });
            toast.success(
              `🎉 Purchase successful! ${plan.quantity} invoice credit${plan.quantity > 1 ? "s" : ""} added to your account.`,
            );
          } catch {
            toast.error(
              `Payment received but credit update failed. Please contact support with your payment ID: ${response.razorpay_payment_id}`,
            );
          }
        } else {
          toast.error("Payment verification failed. Please contact support.");
        }
        setProcessingPlan(null);
      },
      prefill: {
        email: businessProfile?.email || "",
        name: businessProfile?.businessName || "",
        contact: businessProfile?.phone || "",
      },
      theme: {
        color: "#0d9488",
      },
      modal: {
        ondismiss: () => {
          toast.info("Payment cancelled.");
          setProcessingPlan(null);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Crown className="w-4 h-4" />
          Buy Invoice Credits
        </div>
        <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3">
          Simple, Pay-as-You-Go Pricing
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Start free with 5 invoices. Buy more credits whenever you need them —
          no subscriptions.
        </p>
        {remainingCredits > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Check className="w-4 h-4" />
            You have <strong className="mx-1">{remainingCredits}</strong>{" "}
            invoice credit{remainingCredits !== 1 ? "s" : ""} remaining
          </div>
        )}
      </div>

      {/* Plan Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {/* Free Plan */}
        <div className="relative bg-card border border-border rounded-2xl p-7 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-bold text-foreground">Free</h2>
            </div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-extrabold text-foreground">
                ₹0
              </span>
              <span className="text-muted-foreground mb-1">/forever</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Perfect for getting started
            </p>
          </div>

          <ul className="space-y-3 flex-1 mb-8">
            {FREE_FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-sm text-foreground"
              >
                <Check className="w-4 h-4 text-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <Button variant="outline" className="w-full" disabled>
            Current Free Plan
          </Button>
        </div>

        {/* Pro Plans */}
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-card rounded-2xl p-7 flex flex-col ${
              plan.highlight
                ? "border-2 border-primary shadow-lg"
                : "border border-border"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Star className="w-3 h-3 fill-current" />
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                {plan.id === "bundle" ? (
                  <Package className="w-5 h-5 text-primary" />
                ) : (
                  <Crown className="w-5 h-5 text-primary" />
                )}
                <h2 className="text-xl font-bold text-foreground">
                  {plan.label}
                </h2>
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-extrabold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground mb-1">
                  {plan.id === "single" ? "/invoice" : "/10 invoices"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={plan.highlight ? "default" : "outline"}
              onClick={() => handleBuyNow(plan)}
              disabled={processingPlan !== null || purchaseCredits.isPending}
            >
              {processingPlan === plan.id ||
              (purchaseCredits.isPending && processingPlan === plan.id) ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {plan.id === "bundle" ? (
                    <Package className="w-4 h-4 mr-2" />
                  ) : (
                    <Crown className="w-4 h-4 mr-2" />
                  )}
                  Buy Now — {plan.price}
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <h3 className="font-heading font-bold text-foreground text-lg">
            Feature Comparison
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground w-2/5">
                  Feature
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-muted-foreground">
                  Free
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-muted-foreground">
                  1 Invoice
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-primary">
                  10 Invoices
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={`border-b border-border last:border-0 ${idx % 2 === 0 ? "" : "bg-muted/20"}`}
                >
                  <td className="px-6 py-3.5 text-sm text-foreground font-medium">
                    {row.feature}
                  </td>
                  {(["free", "single", "bundle"] as const).map((col) => (
                    <td key={col} className="px-4 py-3.5 text-center">
                      {typeof row[col] === "boolean" ? (
                        row[col] ? (
                          <Check className="w-4 h-4 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground text-lg leading-none">
                            —
                          </span>
                        )
                      ) : (
                        <span
                          className={`text-sm ${col === "bundle" ? "font-semibold text-primary" : "text-muted-foreground"}`}
                        >
                          {row[col] as string}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing note */}
      <div className="bg-muted/30 border border-border rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              How credits work
            </p>
            <p className="text-sm text-muted-foreground">
              Each invoice you create uses 1 credit. Free plan users get 5
              invoices at no cost. After that, purchase credits as needed —{" "}
              <strong>₹5 for 1 invoice</strong> or{" "}
              <strong>₹39 for 10 invoices</strong> (save ₹11). Credits never
              expire.
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Secure payment powered by Razorpay. Your payment information is
        encrypted and secure.
      </p>
    </div>
  );
}
