import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Building2, CheckCircle, Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, Plan } from "../backend";
import { useSaveBusinessProfile } from "../hooks/useQueries";

interface ProfileForm {
  businessName: string;
  gstNumber: string;
  address: string;
  phone: string;
  email: string;
}

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const saveProfile = useSaveBusinessProfile();

  const [form, setForm] = useState<ProfileForm>({
    businessName: "",
    gstNumber: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange =
    (field: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName.trim()) {
      toast.error("Business name is required");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        businessName: form.businessName,
        gstNumber: form.gstNumber,
        address: form.address,
        phone: form.phone,
        email: form.email,
        logo: ExternalBlob.fromURL(""),
        plan: Plan.free,
        remainingInvoiceCredits: 0n,
      });
      toast.success("Profile set up successfully!");
      navigate({ to: "/invoices" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to save profile");
    }
  };

  const isSaving = saveProfile.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Set Up Your Business
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter your business details to get started with InvoiceEase
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Business Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={form.businessName}
                  onChange={handleChange("businessName")}
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
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="business@example.com"
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="+91 98765 43210"
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={handleChange("address")}
                  placeholder="City, State, PIN"
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange("gstNumber")}
                  placeholder="22AAAAA0000A1Z5"
                  disabled={isSaving}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Setup
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
