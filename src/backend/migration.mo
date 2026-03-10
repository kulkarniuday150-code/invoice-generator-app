import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  type Plan = { #free; #pro_single; #pro_bundle };
  type PaymentStatus = { #unpaid; #partial; #paid };
  type InvoiceStatus = { #draft; #finalized; #paid; #overdue };

  type SavedItem = {
    itemCode : Text;
    itemName : Text;
    description : Text;
    rate : Nat;
    taxType : {
      #none;
      #cgst_sgst;
      #igst;
    };
    taxRate : Nat;
  };

  type BusinessProfile = {
    businessName : Text;
    logo : Blob;
    gstNumber : Text;
    address : Text;
    phone : Text;
    email : Text;
    plan : Plan;
    remainingInvoiceCredits : Nat;
  };

  type Client = {
    clientId : Nat;
    name : Text;
    companyName : Text;
    gstNumber : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  type LineItem = {
    itemName : Text;
    quantity : Nat;
    rate : Nat;
    taxType : Text;
    taxRate : Nat;
    discount : Nat;
  };

  type Invoice = {
    invoiceNumber : Nat;
    invoiceDate : Text;
    dueDate : Text;
    client : Client;
    lineItems : [LineItem];
    subtotal : Nat;
    totalDiscount : Nat;
    totalTax : Nat;
    grandTotal : Nat;
    paymentStatus : PaymentStatus;
    status : InvoiceStatus;
  };

  type PaymentData = {
    stripeSessionId : Text;
    paymentAmount : Nat;
    timestamp : Int;
    paymentStatus : { #pending; #completed };
    plan : Plan;
    invoiceCredits : Nat;
  };

  type OldActor = {
    businessProfiles : Map.Map<Principal, BusinessProfile>;
    clients : Map.Map<Principal, List.List<Client>>;
    invoices : Map.Map<Principal, List.List<Invoice>>;
    invoiceCounters : Map.Map<Principal, Nat>;
    payments : Map.Map<Principal, List.List<PaymentData>>;
  };

  type NewActor = {
    businessProfiles : Map.Map<Principal, BusinessProfile>;
    clients : Map.Map<Principal, List.List<Client>>;
    invoices : Map.Map<Principal, List.List<Invoice>>;
    invoiceCounters : Map.Map<Principal, Nat>;
    payments : Map.Map<Principal, List.List<PaymentData>>;
    savedItems : Map.Map<Principal, List.List<SavedItem>>;
  };

  public func run(old : OldActor) : NewActor {
    { old with savedItems = Map.empty<Principal, List.List<SavedItem>>() };
  };
};
