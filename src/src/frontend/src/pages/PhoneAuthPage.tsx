import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { FileText, Loader2, Phone, Shield, Star, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function PhoneAuthPage() {
  const navigate = useNavigate();
  const { login, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [step, setStep] = useState<"phone" | "waiting">("phone");
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!identity;

  // After II login, request OTP automatically
  useEffect(() => {
    if (step === "waiting" && isAuthenticated && !actorFetching && actor) {
      handleRequestOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, isAuthenticated, actorFetching, actor]);

  const handleSendOtp = async () => {
    const fullPhone = phone.trim();
    if (!fullPhone || fullPhone.length < 7) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    setIsLoading(true);
    try {
      // First, ensure II login
      if (!isAuthenticated) {
        setStep("waiting");
        await login();
      } else {
        await handleRequestOtp();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to initiate login. Please try again.");
      setStep("phone");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    if (!actor) return;
    setIsLoading(true);
    try {
      const fullPhone = countryCode + phone.trim();
      const otp = await actor.requestPhoneOtp(fullPhone);
      // Store OTP info for OTPVerifyPage
      sessionStorage.setItem("otp_phone", fullPhone);
      sessionStorage.setItem("otp_demo", otp); // demo only
      navigate({ to: "/otp-verify" });
    } catch (e) {
      console.error(e);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggingIn = loginStatus === "logging-in" || step === "waiting";
  const showLoading = isInitializing || isLoading || isLoggingIn;

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
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/login" })}
            className="text-muted-foreground"
          >
            Other sign in options
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Sign in with Mobile
              </h1>
              <p className="text-muted-foreground text-sm mt-1 text-center">
                Enter your mobile number to receive a verification code
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <Label
                  htmlFor="phone"
                  className="text-foreground font-medium mb-2 block"
                >
                  Mobile Number
                </Label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="border border-input bg-background rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                    maxLength={10}
                    className="flex-1"
                    disabled={showLoading}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  A 6-digit OTP will be sent to this number
                </p>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={handleSendOtp}
                disabled={showLoading || !phone.trim()}
                size="lg"
              >
                {showLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLoggingIn ? "Authenticating..." : "Sending OTP..."}
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Send OTP
                  </>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate({ to: "/login" })}
              >
                Sign in with Internet Identity
              </Button>
            </div>

            <div className="mt-6 flex items-start gap-2 bg-muted/40 rounded-lg p-3">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your mobile number is securely stored on the Internet Computer
                blockchain.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex items-center justify-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-2 text-sm text-muted-foreground">
              Trusted by 500+ Indian businesses
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} InvoiceEase Technologies Pvt. Ltd.
        </div>
      </footer>
    </div>
  );
}
