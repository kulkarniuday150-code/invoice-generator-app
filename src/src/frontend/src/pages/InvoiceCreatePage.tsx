import React, { useEffect } from "react";
import { toast } from "sonner";
import { Plan } from "../backend";
import { useBusinessProfile, useInvoices } from "../hooks/useQueries";
import InvoiceFormPage from "./InvoiceFormPage";

export default function InvoiceCreatePage() {
  const { data: profile, isFetched: profileFetched } = useBusinessProfile();
  const { data: invoices, isFetched: invoicesFetched } = useInvoices();

  const invoiceCount = invoices?.length ?? 0;
  const isFreePlan = profile?.plan === Plan.free;
  const remainingCredits = Number(profile?.remainingInvoiceCredits ?? 0);
  // Block only when free plan limit is hit AND no purchased credits remain
  const freeLimitReached =
    isFreePlan && invoiceCount >= 5 && remainingCredits === 0;

  useEffect(() => {
    if (profileFetched && invoicesFetched && freeLimitReached) {
      toast.error(
        "Free plan limit reached. Purchase invoice credits to create more invoices.",
      );
      window.location.href = "/pricing";
    }
  }, [profileFetched, invoicesFetched, freeLimitReached]);

  if (!profileFetched || !invoicesFetched) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (freeLimitReached) return null;

  return <InvoiceFormPage />;
}
