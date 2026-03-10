import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { type BusinessProfile, type Invoice, Plan } from "../backend";
import TemplatePreviewCard from "../components/TemplatePreviewCard";
import ClassicTemplate from "../components/invoice-templates/ClassicTemplate";
import MinimalTemplate from "../components/invoice-templates/MinimalTemplate";
import ModernTemplate from "../components/invoice-templates/ModernTemplate";
import AgencyTemplate from "../components/invoice-templates/premium/AgencyTemplate";
import BoldTemplate from "../components/invoice-templates/premium/BoldTemplate";
import BoutiqueTemplate from "../components/invoice-templates/premium/BoutiqueTemplate";
import ClassicPremiumTemplate from "../components/invoice-templates/premium/ClassicPremiumTemplate";
import ElegantTemplate from "../components/invoice-templates/premium/ElegantTemplate";
import StartupTemplate from "../components/invoice-templates/premium/StartupTemplate";
import {
  useBusinessProfile,
  useInvoice,
  useUpdateInvoice,
} from "../hooks/useQueries";

interface TemplateConfig {
  id: string;
  name: string;
  isPremium: boolean;
  quality?: "hd";
  component: React.ComponentType<{
    invoice: Invoice;
    businessProfile: BusinessProfile;
  }> | null;
}

const TEMPLATES: TemplateConfig[] = [
  {
    id: "modern",
    name: "Modern",
    isPremium: false,
    quality: "hd",
    component: ModernTemplate,
  },
  {
    id: "classic",
    name: "Classic",
    isPremium: false,
    quality: "hd",
    component: ClassicTemplate,
  },
  {
    id: "minimal",
    name: "Minimal",
    isPremium: false,
    quality: "hd",
    component: MinimalTemplate,
  },
  { id: "bold", name: "Bold", isPremium: true, component: BoldTemplate },
  {
    id: "elegant",
    name: "Elegant",
    isPremium: true,
    component: ElegantTemplate,
  },
  {
    id: "startup",
    name: "Startup",
    isPremium: true,
    component: StartupTemplate,
  },
  {
    id: "boutique",
    name: "Boutique",
    isPremium: true,
    component: BoutiqueTemplate,
  },
  { id: "agency", name: "Agency", isPremium: true, component: AgencyTemplate },
  {
    id: "classic-premium",
    name: "Classic Pro",
    isPremium: true,
    component: ClassicPremiumTemplate,
  },
];

export default function InvoicePreviewPage() {
  const params = useParams({ strict: false }) as { invoiceNumber?: string };
  const navigate = useNavigate();
  const invoiceNumber = Number.parseInt(params.invoiceNumber || "0", 10);

  const { data: invoice, isLoading: invoiceLoading } = useInvoice(
    invoiceNumber > 0 ? BigInt(invoiceNumber) : null,
  );
  const { data: businessProfile, isLoading: profileLoading } =
    useBusinessProfile();
  const updateInvoice = useUpdateInvoice();

  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // User has "pro" features if they are on any non-free plan or have purchased credits
  const isPro =
    businessProfile?.plan !== undefined &&
    (businessProfile.plan === Plan.pro_single ||
      businessProfile.plan === Plan.pro_bundle ||
      Number(businessProfile.remainingInvoiceCredits) > 0);

  const isLoading = invoiceLoading || profileLoading;

  const handlePrint = async () => {
    if (!invoice || !businessProfile) return;
    setIsPrinting(true);

    try {
      const TemplateComponent = TEMPLATES.find(
        (t) => t.id === selectedTemplate,
      )?.component;
      if (!TemplateComponent) {
        toast.error("Template not available");
        setIsPrinting(false);
        return;
      }

      // Finalize invoice if it's a draft
      if (invoice.status === ("draft" as any)) {
        try {
          await updateInvoice.mutateAsync({
            ...invoice,
            status: "finalized" as any,
          });
        } catch {
          // Non-critical — continue with print
        }
      }

      // Render template to HTML string
      const { renderToStaticMarkup } = await import("react-dom/server");
      const html = renderToStaticMarkup(
        React.createElement(TemplateComponent, { invoice, businessProfile }),
      );

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        toast.error("Please allow popups to download the PDF");
        setIsPrinting(false);
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Invoice #${String(invoice.invoiceNumber).padStart(4, "0")}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: sans-serif; }
              @media print {
                @page { margin: 0; size: A4; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            </style>
          </head>
          <body>${html}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsPrinting(false);
      }, 500);
    } catch (err: any) {
      toast.error(err?.message || "Failed to generate PDF");
      setIsPrinting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (!invoice || !businessProfile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Invoice not found.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate({ to: "/invoices" })}
        >
          Back to Invoices
        </Button>
      </div>
    );
  }

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplate);
  const TemplateComponent = currentTemplate?.component;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              navigate({ to: `/invoices/${invoiceNumber}` as any })
            }
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Preview — Invoice #
              {String(invoice.invoiceNumber).padStart(4, "0")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {invoice.client.name}
            </p>
          </div>
        </div>
        <Button onClick={handlePrint} disabled={isPrinting}>
          {isPrinting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* Template Selector */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">
          Choose Template
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {TEMPLATES.map((template) => {
            const isLocked = template.isPremium && !isPro;
            return (
              <TemplatePreviewCard
                key={template.id}
                templateId={template.id}
                name={template.name}
                isSelected={selectedTemplate === template.id}
                isPremium={template.isPremium}
                isLocked={isLocked}
                quality={template.quality}
                onClick={() => {
                  if (isLocked) {
                    toast.info(
                      "Purchase invoice credits to unlock premium templates",
                    );
                    return;
                  }
                  setSelectedTemplate(template.id);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Invoice Preview */}
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        ref={printRef}
      >
        {TemplateComponent ? (
          <TemplateComponent
            invoice={invoice}
            businessProfile={businessProfile}
          />
        ) : (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Template not available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
