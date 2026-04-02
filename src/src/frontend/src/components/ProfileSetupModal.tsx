import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, Plan } from "../backend";
import { useActor } from "../hooks/useActor";
import { useSaveCallerUserProfile } from "../hooks/useQueries";

interface ProfileSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export default function ProfileSetupModal({
  open,
  onOpenChange,
  onComplete,
}: ProfileSetupModalProps) {
  const { isFetching: actorFetching } = useActor();
  const saveProfile = useSaveCallerUserProfile();

  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const isSubmitting = saveProfile.isPending;
  const isDisabled = actorFetching || isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      toast.error("Business name is required");
      return;
    }
    if (actorFetching) {
      toast.error("Please wait while the app is initializing...");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        businessName: businessName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        gstNumber: gstNumber.trim(),
        logo: ExternalBlob.fromURL(""),
        plan: Plan.free,
        remainingInvoiceCredits: 0n,
      });
      toast.success("Profile saved successfully!");
      onComplete?.();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to save profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Set Up Your Business Profile</DialogTitle>
          <DialogDescription>
            {actorFetching
              ? "Connecting to the network, please wait..."
              : "Enter your business details to get started."}
          </DialogDescription>
        </DialogHeader>

        {actorFetching ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Connecting...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your Business Name"
                disabled={isDisabled}
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
                disabled={isDisabled}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                disabled={isDisabled}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="City, State"
                disabled={isDisabled}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                placeholder="22AAAAA0000A1Z5"
                disabled={isDisabled}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isDisabled}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isDisabled}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : actorFetching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Save Profile"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
