import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
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
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phone = sessionStorage.getItem("otp_phone") || "";

  const { data: userProfile, isLoading: profileLoading } =
    useGetCallerUserProfile();

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
        sessionStorage.removeItem("otp_phone");
        setIsSuccess(true);
        toast.success("Mobile number verified!");
        if (!profileLoading) {
          if (userProfile) {
            navigate({ to: "/dashboard" });
          } else {
            navigate({ to: "/signup" });
          }
        } else {
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
      await actor.requestPhoneOtp(phone);
      toast.success("New OTP sent to your mobile!");
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

  const progress = Math.round((otp.length / 6) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/phone-auth" })}
            className="p-1.5 rounded-lg mr-1"
            data-ocid="nav.link"
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
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="relative bg-card rounded-2xl shadow-elevated overflow-hidden border border-border">
            {/* Accent stripe */}
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="p-8">
              {/* Steps indicator */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-primary text-primary text-xs font-bold flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground line-through">
                    Enter Number
                  </span>
                </div>
                <div className="flex-1 h-0.5 bg-primary rounded-full" />
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                    2
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    Verify OTP
                  </span>
                </div>
              </div>

              {/* Icon + heading */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center">
                    {isSuccess ? (
                      <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                    ) : (
                      <MessageSquare className="h-7 w-7 text-primary" />
                    )}
                  </div>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  {isSuccess ? "Verified!" : "Enter Verification Code"}
                </h1>
                {!isSuccess && (
                  <>
                    <p className="text-muted-foreground text-sm mt-1.5 text-center">
                      6-digit code sent via SMS to
                    </p>
                    <p className="text-foreground font-bold text-sm mt-0.5">
                      {maskedPhone}
                    </p>
                  </>
                )}
              </div>

              {/* OTP progress bar */}
              {!isSuccess && (
                <div className="mb-5">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {otp.length}/6 digits entered
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {!isSuccess && (
                  <div className="flex flex-col items-center gap-4">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      disabled={isVerifying}
                    >
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="w-12 h-14 text-xl font-bold border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                )}

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20"
                  onClick={() => handleVerify(otp)}
                  disabled={isVerifying || otp.length !== 6 || isSuccess}
                  size="lg"
                  data-ocid="otp.submit_button"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Verified! Redirecting...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend OTP in{" "}
                      <span className="text-primary font-bold">
                        {resendTimer}s
                      </span>
                    </p>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResend}
                      disabled={isResending}
                      className="text-primary hover:text-primary/80 font-semibold"
                      data-ocid="otp.secondary_button"
                    >
                      {isResending ? (
                        <>
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Resend OTP
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2 bg-muted/40 rounded-xl p-3 border border-border">
                <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  This OTP expires in <strong>10 minutes</strong>. Never share
                  your OTP with anyone.
                </p>
              </div>
            </div>
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
