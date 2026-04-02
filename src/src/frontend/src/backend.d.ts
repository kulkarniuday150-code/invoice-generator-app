import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    gstNumber: string;
    logo: ExternalBlob;
    plan: Plan;
    businessName: string;
    email: string;
    address: string;
    remainingInvoiceCredits: bigint;
    phone: string;
}
export interface PaymentData {
    paymentStatus: Variant_pending_completed;
    plan: Plan;
    timestamp: bigint;
    stripeSessionId: string;
    invoiceCredits: bigint;
    paymentAmount: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface LineItem {
    rate: bigint;
    itemName: string;
    discount: bigint;
    quantity: bigint;
    taxRate: bigint;
    taxType: string;
}
export interface BusinessProfile {
    gstNumber: string;
    logo: ExternalBlob;
    plan: Plan;
    businessName: string;
    email: string;
    address: string;
    remainingInvoiceCredits: bigint;
    phone: string;
}
export interface Invoice {
    status: InvoiceStatus;
    lineItems: Array<LineItem>;
    client: Client;
    paymentStatus: PaymentStatus;
    dueDate: string;
    totalTax: bigint;
    grandTotal: bigint;
    invoiceDate: string;
    invoiceNumber: bigint;
    totalDiscount: bigint;
    subtotal: bigint;
}
export interface InvoiceWithExtras {
    status: InvoiceStatus;
    lineItems: Array<LineItem>;
    client: Client;
    paymentStatus: PaymentStatus;
    dueDate: string;
    totalTax: bigint;
    grandTotal: bigint;
    invoiceDate: string;
    invoiceNumber: bigint;
    totalDiscount: bigint;
    subtotal: bigint;
    bankDetails: [] | [string];
    termsAndConditions: [] | [string];
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface Client {
    clientId: bigint;
    gstNumber: string;
    name: string;
    email: string;
    address: string;
    companyName: string;
    phone: string;
}
export interface SavedItem {
    rate: bigint;
    description: string;
    itemCode: string;
    itemName: string;
    taxRate: bigint;
    taxType: Variant_igst_none_cgst_sgst;
}
export enum InvoiceStatus {
    paid = "paid",
    finalized = "finalized",
    overdue = "overdue",
    draft = "draft"
}
export enum PaymentStatus {
    paid = "paid",
    unpaid = "unpaid",
    partial = "partial"
}
export enum Plan {
    pro_single = "pro_single",
    pro_bundle = "pro_bundle",
    free = "free"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_igst_none_cgst_sgst {
    igst = "igst",
    none = "none",
    cgst_sgst = "cgst_sgst"
}
export enum Variant_pending_completed {
    pending = "pending",
    completed = "completed"
}
export interface backendInterface {
    addClient(client: Client): Promise<void>;
    addSavedItem(item: SavedItem): Promise<void>;
    adminGetStats(): Promise<{
        freePlanCount: bigint;
        totalInvoiceCredits: bigint;
        proBundleCount: bigint;
        proSingleCount: bigint;
        totalInvoices: bigint;
        userCount: bigint;
    }>;
    adminGetUserInvoiceCount(user: Principal): Promise<bigint>;
    adminUpgradeUserPlan(user: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    autoSaveDraft(invoice: InvoiceWithExtras): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createInvoice(invoice: InvoiceWithExtras): Promise<bigint>;
    deleteClient(clientId: bigint): Promise<void>;
    deleteInvoice(invoiceNumber: bigint): Promise<void>;
    deleteSavedItem(itemCode: string): Promise<void>;
    getBusinessProfile(): Promise<BusinessProfile | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInvoice(invoiceNumber: bigint): Promise<InvoiceWithExtras | null>;
    getStripePaymentHistory(): Promise<Array<PaymentData>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listClients(): Promise<Array<Client>>;
    listDraftInvoices(): Promise<Array<InvoiceWithExtras>>;
    listInvoices(): Promise<Array<InvoiceWithExtras>>;
    listSavedItems(): Promise<Array<SavedItem>>;
    purchaseInvoiceCredits(stripeSessionId: string, paymentAmount: bigint, planType: Plan, quantity: bigint): Promise<void>;
    saveBusinessProfile(profile: BusinessProfile): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateClient(updatedClient: Client): Promise<void>;
    updateInvoice(invoice: InvoiceWithExtras): Promise<void>;
    updatePaymentStatus(invoiceNumber: bigint, status: PaymentStatus): Promise<void>;
    updateSavedItem(updatedItem: SavedItem): Promise<void>;
    requestPhoneOtp(phone: string): Promise<string>;
    verifyPhoneOtp(phone: string, otp: string): Promise<{ ok: null } | { wrongOtp: null } | { expired: null } | { notFound: null }>;
    getLinkedPhone(): Promise<string | null>;
    isPhoneRegistered(phone: string): Promise<boolean>;
}
