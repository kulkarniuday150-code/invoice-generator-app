import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Phone,
  Shield,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const FiveStars = () => (
  <>
    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
  </>
);

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
      await actor.requestPhoneOtp(fullPhone);
      sessionStorage.setItem("otp_phone", fullPhone);
      toast.success("OTP sent to your mobile number!");
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
      <header className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/login" })}
              className="mr-1 p-1.5 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">
              InvoiceEase
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/login" })}
            className="text-muted-foreground text-sm"
          >
            Other sign-in options
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="relative bg-card rounded-2xl shadow-elevated overflow-hidden border border-border">
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div
                    className="absolute inset-0 bg-primary/20 rounded-full animate-ping"
                    style={{ animationDuration: "2s" }}
                  />
                  <div className="relative w-16 h-16 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center">
                    <Phone className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Sign In with Mobile
                </h1>
                <p className="text-muted-foreground text-sm mt-1.5 text-center leading-relaxed">
                  Enter your mobile number to receive a<br />
                  6-digit verification code via SMS
                </p>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                    1
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    Enter Number
                  </span>
                </div>
                <div className="flex-1 h-px bg-border" />
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span className="text-xs font-medium text-muted-foreground">
                    Verify OTP
                  </span>
                  <div className="w-7 h-7 rounded-full border-2 border-border text-muted-foreground text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-foreground font-semibold mb-2 block text-sm"
                  >
                    Mobile Number
                  </Label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="border border-input bg-background rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                      className="flex-1 h-10 text-base font-medium"
                      disabled={showLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    OTP sent via Twilio SMS — expires in 10 minutes
                  </p>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20"
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
                  <span className="text-xs text-muted-foreground font-medium">
                    or
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <Button
                  variant="outline"
                  className="w-full border-2 hover:border-primary/40 font-semibold transition-colors"
                  onClick={() => navigate({ to: "/login" })}
                >
                  Sign in with Internet Identity
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              256-bit encrypted
            </span>
            <span className="w-1 h-1 bg-border rounded-full" />
            <span className="flex items-center gap-1">
              <FiveStars />
              4.9 / 5
            </span>
            <span className="w-1 h-1 bg-border rounded-full" />
            <span>500+ businesses</span>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} InvoiceEase Technologies Pvt. Ltd.
        </div>
      </footer>
    </div>
  );
}
