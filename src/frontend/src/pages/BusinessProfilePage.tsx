import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Crown, Loader2, Upload, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, Plan } from "../backend";
import { useActor } from "../hooks/useActor";
import {
  useBusinessProfile,
  useGetCallerUserProfile,
  useSaveBusinessProfile,
} from "../hooks/useQueries";

export default function BusinessProfilePage() {
  const _navigate = useNavigate();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: profile, isLoading: profileLoading } = useBusinessProfile();
  const { data: _userProfile } = useGetCallerUserProfile();
  const saveProfile = useSaveBusinessProfile();

  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setBusinessName(profile.businessName || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setGstNumber(profile.gstNumber || "");

      const logoUrl = profile.logo?.getDirectURL?.();
      if (logoUrl && logoUrl !== "") {
        setLogoPreview(logoUrl);
      }
    }
  }, [profile]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Backend not ready yet. Please wait a moment and try again.");
      return;
    }
    if (!businessName.trim()) {
      toast.error("Business name is required");
      return;
    }

    try {
      let logoBlob: ExternalBlob;

      if (logoFile) {
        const arrayBuffer = await logoFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        logoBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
          (pct) => {
            setUploadProgress(pct);
          },
        );
      } else if (profile?.logo) {
        logoBlob = profile.logo;
      } else {
        logoBlob = ExternalBlob.fromURL("");
      }

      await saveProfile.mutateAsync({
        businessName: businessName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        gstNumber: gstNumber.trim(),
        logo: logoBlob,
        plan: profile?.plan ?? Plan.free,
        remainingInvoiceCredits: profile?.remainingInvoiceCredits ?? 0n,
      });

      setSaved(true);
      setUploadProgress(0);
      toast.success("Business profile saved!");
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      toast.error(err?.message || "Failed to save profile");
      setUploadProgress(0);
    }
  };

  const isPro = profile?.plan !== undefined && profile.plan !== Plan.free;
  const isLoading = actorFetching || profileLoading;
  const isSaving = saveProfile.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Business Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your business information
          </p>
        </div>
        <Badge
          variant={isPro ? "default" : "secondary"}
          className="flex items-center gap-1"
        >
          {isPro && <Crown className="w-3 h-3" />}
          {profile?.plan === Plan.pro_single
            ? "Pro Single"
            : profile?.plan === Plan.pro_bundle
              ? "Pro Bundle"
              : "Free Plan"}
        </Badge>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Logo Upload */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Business Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <div className="relative">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-20 h-20 object-contain rounded-lg border border-border bg-muted"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {logoPreview ? "Change Logo" : "Upload Logo"}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 2MB
                </p>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <p className="text-xs text-primary mt-1">
                    Uploading... {uploadProgress}%
                  </p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your Business Name"
                  required
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
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, State, PIN"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Info */}
        {!isPro && (
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
            <CardContent className="py-3 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-800 dark:text-amber-200">
                  Buy invoice credits to unlock premium templates and more
                </span>
              </div>
              <a href="/pricing">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:text-amber-300 whitespace-nowrap"
                >
                  Buy Credits
                </Button>
              </a>
            </CardContent>
          </Card>
        )}

        <Button
          type="submit"
          disabled={isSaving || actorFetching || !actor}
          className="w-full"
          data-ocid="profile.submit_button"
        >
          {actorFetching && !actor ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            "Save Profile"
          )}
        </Button>
      </form>
    </div>
  );
}
