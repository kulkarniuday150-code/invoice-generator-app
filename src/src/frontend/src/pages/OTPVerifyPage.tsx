import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Loader2,
  MessageSquare,
  RefreshCw,
  Shield,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useGetCallerUserProfile } from "../hooks/useQueries";

const RESEND_SECONDS = 30;

export default function OTPVerifyPage() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phone = sessionStorage.getItem("otp_phone") || "";
  const demoOtp = sessionStorage.getItem("otp_demo") || "";

  const { data: userProfile, isLoading: profileLoading } =
    useGetCallerUserProfile();

  // Start resend countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Auto-verify when OTP is 6 digits
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify(otp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleVerify = async (otpValue: string) => {
    if (!actor || !phone) {
      toast.error("Session expired. Please start again.");
      navigate({ to: "/phone-auth" });
      return;
    }
    setIsVerifying(true);
    try {
      const result = await actor.verifyPhoneOtp(phone, otpValue);
      if ("ok" in result) {
        sessionStorage.removeItem("otp_demo");
        sessionStorage.removeItem("otp_phone");
        toast.success("Mobile number verified!");
        // Check if profile exists
        if (!profileLoading) {
          if (userProfile) {
            navigate({ to: "/dashboard" });
          } else {
            navigate({ to: "/signup" });
          }
        } else {
          // Wait for profile check
          setTimeout(() => navigate({ to: "/dashboard" }), 500);
        }
      } else if ("wrongOtp" in result) {
        toast.error("Incorrect OTP. Please try again.");
        setOtp("");
      } else if ("expired" in result) {
        toast.error("OTP has expired. Please request a new one.");
        setOtp("");
      } else {
        toast.error("OTP not found. Please request a new one.");
        setOtp("");
      }
    } catch (e) {
      console.error(e);
      toast.error("Verification failed. Please try again.");
      setOtp("");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!actor || !phone) return;
    setIsResending(true);
    try {
      const newOtp = await actor.requestPhoneOtp(phone);
      sessionStorage.setItem("otp_demo", newOtp);
      toast.success("New OTP sent!");
      setOtp("");
      setResendTimer(RESEND_SECONDS);
      timerRef.current = setInterval(() => {
        setResendTimer((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } catch (_e) {
      toast.error("Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  const maskedPhone = phone
    ? phone.slice(0, phone.length - 4).replace(/\d/g, "*") + phone.slice(-4)
    : "your number";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/phone-auth" })}
            className="mr-3 p-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
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
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Verify Mobile Number
              </h1>
              <p className="text-muted-foreground text-sm mt-1 text-center">
                Enter the 6-digit OTP sent to
              </p>
              <p className="text-foreground font-semibold text-sm mt-0.5">
                {maskedPhone}
              </p>
            </div>

            {/* Demo OTP hint */}
            {demoOtp && (
              <div className="mb-5 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                  Demo Mode — Your OTP is:
                </p>
                <p className="text-2xl font-bold tracking-widest text-amber-600 dark:text-amber-300 mt-1">
                  {demoOtp}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  In production, this would be sent via SMS
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={isVerifying}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}
                      className="w-12 h-14 text-xl font-bold border-2 rounded-lg"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-12 h-14 text-xl font-bold border-2 rounded-lg"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-12 h-14 text-xl font-bold border-2 rounded-lg"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-12 h-14 text-xl font-bold border-2 rounded-lg"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-12 h-14 text-xl font-bold border-2 rounded-lg"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-12 h-14 text-xl font-bold border-2 rounded-lg"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={() => handleVerify(otp)}
                disabled={isVerifying || otp.length !== 6}
                size="lg"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Resend OTP in{" "}
                    <span className="text-primary font-semibold">
                      {resendTimer}s
                    </span>
                  </p>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-primary hover:text-primary/80"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />{" "}
                        Resending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-1 h-3 w-3" /> Resend OTP
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-start gap-2 bg-muted/40 rounded-lg p-3">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                This OTP expires in 10 minutes. Never share your OTP with
                anyone.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} InvoiceEase Technologies Pvt. Ltd.
        </div>
      </footer>
    </div>
  );
}
