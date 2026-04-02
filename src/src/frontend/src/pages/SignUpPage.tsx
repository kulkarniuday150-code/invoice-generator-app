import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, Plan, type UserProfile } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveCallerUserProfile } from "../hooks/useQueries";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { login, loginStatus, identity } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();

  const [step, setStep] = useState<1 | 2>(1);
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const isLoggingIn = loginStatus === "logging-in";
  const isSaving = saveProfile.isPending;

  const handleLogin = async () => {
    try {
      await login();
      setStep(2);
    } catch (err: any) {
      toast.error(err?.message || "Login failed. Please try again.");
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      toast.error("Business name is required");
      return;
    }
    try {
      const profile: UserProfile = {
        businessName: businessName.trim(),
        gstNumber: gstNumber.trim(),
        address: address.trim(),
        phone: phone.trim(),
        email: email.trim(),
        logo: ExternalBlob.fromURL(""),
        plan: Plan.free,
        remainingInvoiceCredits: 0n,
      };
      await saveProfile.mutateAsync(profile);
      toast.success("Account created! Welcome to InvoiceEase.");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <img
            src="/assets/generated/invoiceease-logo.dim_256x256.png"
            alt="InvoiceEase"
            className="w-16 h-16 object-contain mx-auto mb-3"
          />
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Create Your Account
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Join InvoiceEase and start creating professional invoices
          </p>
        </div>

        {/* Step 1: Internet Identity */}
        {step === 1 && (
          <Card>
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Secure Login
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    We use Internet Identity for secure, password-free
                    authentication. Your data stays private.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  No password required
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Your data is encrypted and private
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Works with biometrics or security keys
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleLogin}
                disabled={isLoggingIn || !!identity}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : identity ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Continue with Internet Identity
                  </>
                )}
              </Button>

              {identity && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(2)}
                >
                  Next: Set Up Business
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Business Profile */}
        {step === 2 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-5">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">
                  Business Details
                </h2>
              </div>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your Business Name"
                    required
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="business@example.com"
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="City, State, PIN"
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    placeholder="22AAAAA0000A1Z5"
                    disabled={isSaving}
                  />
                </div>
                <div className="flex gap-3 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" disabled={isSaving} className="flex-1">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
