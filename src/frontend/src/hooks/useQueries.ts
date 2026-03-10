import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type BusinessProfile,
  type Client,
  type Invoice,
  type PaymentStatus,
  Plan,
  type SavedItem,
  type ShoppingItem,
  type StripeConfiguration,
  type UserProfile,
} from "../backend";
import { useActor } from "./useActor";

// ── Business Profile ─────────────────────────────────────────────

export function useBusinessProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<BusinessProfile | null>({
    queryKey: ["businessProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getBusinessProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveBusinessProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: BusinessProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveBusinessProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// ── User Profile ─────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
    },
  });
}

// ── Clients ──────────────────────────────────────────────────────

export function useClients() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.listClients();
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useAddClient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (client: Client) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addClient(client);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useUpdateClient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (client: Client) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateClient(client);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useDeleteClient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteClient(clientId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

// ── Invoices ─────────────────────────────────────────────────────

export function useInvoices() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.listInvoices();
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useDraftInvoices() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Invoice[]>({
    queryKey: ["draftInvoices"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.listDraftInvoices();
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useInvoice(invoiceNumber: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Invoice | null>({
    queryKey: ["invoice", invoiceNumber?.toString()],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      if (invoiceNumber === null) return null;
      return actor.getInvoice(invoiceNumber);
    },
    enabled: !!actor && !actorFetching && invoiceNumber !== null,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Alias for backward compatibility
export const useGetInvoice = useInvoice;

export function useCreateInvoice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoice: Invoice) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createInvoice(invoice);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["draftInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useUpdateInvoice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoice: Invoice) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateInvoice(invoice);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["draftInvoices"] });
    },
  });
}

export function useAutoSaveDraft() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoice: Invoice) => {
      if (!actor) throw new Error("Actor not available");
      return actor.autoSaveDraft(invoice);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["draftInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useDeleteInvoice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceNumber: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteInvoice(invoiceNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["draftInvoices"] });
    },
  });
}

export function useUpdatePaymentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      invoiceNumber,
      status,
    }: { invoiceNumber: bigint; status: PaymentStatus }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePaymentStatus(invoiceNumber, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

// ── Saved Items ───────────────────────────────────────────────────

export function useSavedItems() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<SavedItem[]>({
    queryKey: ["savedItems"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.listSavedItems();
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useAddSavedItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: SavedItem) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addSavedItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedItems"] });
    },
  });
}

export function useUpdateSavedItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: SavedItem) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateSavedItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedItems"] });
    },
  });
}

export function useDeleteSavedItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemCode: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteSavedItem(itemCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedItems"] });
    },
  });
}

// ── Payment / Plan Upgrade ────────────────────────────────────────

export function usePurchaseInvoiceCredits() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      stripeSessionId,
      paymentAmount,
      planType,
      quantity,
    }: {
      stripeSessionId: string;
      paymentAmount: bigint;
      planType: Plan;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.purchaseInvoiceCredits(
        stripeSessionId,
        paymentAmount,
        planType,
        quantity,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

// Keep backward-compatible alias used by older components
export function useUpgradeToPro() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      stripeSessionId,
      paymentAmount,
    }: {
      stripeSessionId: string;
      paymentAmount: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.purchaseInvoiceCredits(
        stripeSessionId,
        paymentAmount,
        Plan.pro_single,
        1n,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
    },
  });
}

// ── Admin ─────────────────────────────────────────────────────────

export function useAdminStats() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.adminGetStats();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAdminUpgradePlan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (principalStr: string) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      const principal = Principal.fromText(principalStr);
      return actor.adminUpgradeUserPlan(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
    },
  });
}

// ── Stripe / Checkout ─────────────────────────────────────────────

export function useIsStripeConfigured() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stripeConfigured"] });
    },
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl,
      );
      const session = JSON.parse(result) as { id: string; url: string };
      if (!session?.url) throw new Error("Stripe session missing url");
      return session;
    },
  });
}

export function usePaymentHistory() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getStripePaymentHistory();
    },
    enabled: !!actor && !actorFetching,
  });
}
