import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import Migration "migration";

// Specify migration in with-clause
(with migration = Migration.run)
actor {
  // Add Authorization and Storage mixins
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Types
  public type Plan = { #free; #pro_single; #pro_bundle };
  public type PaymentStatus = { #unpaid; #partial; #paid };
  public type InvoiceStatus = { #draft; #finalized; #paid; #overdue };

  public type BusinessProfile = {
    businessName : Text;
    logo : Storage.ExternalBlob;
    gstNumber : Text;
    address : Text;
    phone : Text;
    email : Text;
    plan : Plan;
    remainingInvoiceCredits : Nat;
  };

  public type Client = {
    clientId : Nat;
    name : Text;
    companyName : Text;
    gstNumber : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  public type LineItem = {
    itemName : Text;
    quantity : Nat;
    rate : Nat;
    taxType : Text; // "CGST", "SGST", "IGST"
    taxRate : Nat;
    discount : Nat;
  };

  public type Invoice = {
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

  public type UserProfile = {
    businessName : Text;
    logo : Storage.ExternalBlob;
    gstNumber : Text;
    address : Text;
    phone : Text;
    email : Text;
    plan : Plan;
    remainingInvoiceCredits : Nat;
  };

  public type PaymentData = {
    stripeSessionId : Text;
    paymentAmount : Nat;
    timestamp : Int;
    paymentStatus : { #pending; #completed };
    plan : Plan;
    invoiceCredits : Nat;
  };

  public type SavedItem = {
    itemCode : Text;
    itemName : Text;
    description : Text;
    rate : Nat;
    taxType : { #none; #cgst_sgst; #igst };
    taxRate : Nat;
  };

  // State
  let businessProfiles = Map.empty<Principal, BusinessProfile>();
  let clients = Map.empty<Principal, List.List<Client>>();
  let invoices = Map.empty<Principal, List.List<Invoice>>();
  let invoiceCounters = Map.empty<Principal, Nat>();
  let payments = Map.empty<Principal, List.List<PaymentData>>();
  let savedItems = Map.empty<Principal, List.List<SavedItem>>();

  // Stripe state
  var configuration : ?Stripe.StripeConfiguration = null;

  // ── Profile Functions (Frontend Contract) ─────────────────────────
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    switch (businessProfiles.get(caller)) {
      case (null) { null };
      case (?p) {
        ?{
          businessName = p.businessName;
          logo = p.logo;
          gstNumber = p.gstNumber;
          address = p.address;
          phone = p.phone;
          email = p.email;
          plan = p.plan;
          remainingInvoiceCredits = p.remainingInvoiceCredits;
        };
      };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    let existingPlan : Plan = switch (businessProfiles.get(caller)) {
      case (null) { #free };
      case (?existing) { existing.plan };
    };
    let existingCredits : Nat = switch (businessProfiles.get(caller)) {
      case (null) { 0 };
      case (?existing) { existing.remainingInvoiceCredits };
    };
    let bp : BusinessProfile = {
      businessName = profile.businessName;
      logo = profile.logo;
      gstNumber = profile.gstNumber;
      address = profile.address;
      phone = profile.phone;
      email = profile.email;
      plan = existingPlan;
      remainingInvoiceCredits = existingCredits;
    };
    businessProfiles.add(caller, bp);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (businessProfiles.get(user)) {
      case (null) { null };
      case (?p) {
        ?{
          businessName = p.businessName;
          logo = p.logo;
          gstNumber = p.gstNumber;
          address = p.address;
          phone = p.phone;
          email = p.email;
          plan = p.plan;
          remainingInvoiceCredits = p.remainingInvoiceCredits;
        };
      };
    };
  };

  // ── Business Profile Functions ───────────────────────────────────

  public shared ({ caller }) func saveBusinessProfile(profile : BusinessProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save business profiles");
    };
    let existingPlan : Plan = switch (businessProfiles.get(caller)) {
      case (null) { #free };
      case (?existing) { existing.plan };
    };
    let existingCredits : Nat = switch (businessProfiles.get(caller)) {
      case (null) { 0 };
      case (?existing) { existing.remainingInvoiceCredits };
    };
    let bp : BusinessProfile = {
      businessName = profile.businessName;
      logo = profile.logo;
      gstNumber = profile.gstNumber;
      address = profile.address;
      phone = profile.phone;
      email = profile.email;
      plan = existingPlan;
      remainingInvoiceCredits = existingCredits;
    };
    businessProfiles.add(caller, bp);
  };

  public query ({ caller }) func getBusinessProfile() : async ?BusinessProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their business profile");
    };
    businessProfiles.get(caller);
  };

  // ── Client Management ────────────────────────────────────────────

  public shared ({ caller }) func addClient(client : Client) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add clients");
    };
    let (existingClients, clientId) = switch (clients.get(caller)) {
      case (null) { (List.empty<Client>(), 1) };
      case (?existing) { (existing, existing.size() + 1) };
    };
    let newClient : Client = { client with clientId = clientId };
    existingClients.add(newClient);
    clients.add(caller, existingClients);
  };

  public shared ({ caller }) func updateClient(updatedClient : Client) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update clients");
    };
    let existingClients = switch (clients.get(caller)) {
      case (null) { Runtime.trap("No clients found") };
      case (?c) { c };
    };
    let found = existingClients.find(func(c : Client) : Bool { c.clientId == updatedClient.clientId });
    switch (found) {
      case (null) { Runtime.trap("Client not found") };
      case (_) {};
    };
    let updatedList = existingClients.map<Client, Client>(
      func(c : Client) : Client {
        if (c.clientId == updatedClient.clientId) { updatedClient } else { c };
      }
    );
    clients.add(caller, updatedList);
  };

  public shared ({ caller }) func deleteClient(clientId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete clients");
    };
    let existingClients = switch (clients.get(caller)) {
      case (null) { Runtime.trap("No clients found") };
      case (?c) { c };
    };
    let filteredClients = existingClients.filter(
      func(c : Client) : Bool { c.clientId != clientId }
    );
    clients.add(caller, filteredClients);
  };

  public query ({ caller }) func listClients() : async [Client] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list clients");
    };
    switch (clients.get(caller)) {
      case (null) { [] };
      case (?c) { c.toArray() };
    };
  };

  // ── Invoice Management ──────────────────────────────────────────

  public shared ({ caller }) func createInvoice(invoice : Invoice) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create invoices");
    };
    let profile = switch (businessProfiles.get(caller)) {
      case (null) { Runtime.trap("User business profile not found") };
      case (?p) { p };
    };
    let currentCount = switch (invoiceCounters.get(caller)) {
      case (null) { 0 };
      case (?n) { n };
    };
    switch (profile.plan) {
      case (#free) {
        if (currentCount >= 5) {
          if (profile.remainingInvoiceCredits > 0) {
            let remainingCredits = profile.remainingInvoiceCredits - 1 : Nat;
            let updatedProfile = { profile with remainingInvoiceCredits = remainingCredits };
            businessProfiles.add(caller, updatedProfile);
          } else {
            Runtime.trap("Free plan limit reached: maximum 5 invoices allowed. Please upgrade to the Pro plan or purchase invoice credits for additional invoices.");
          };
        };
      };
      case (#pro_single) {
        if (profile.remainingInvoiceCredits > 0) {
          let remainingCredits = profile.remainingInvoiceCredits - 1 : Nat;
          let updatedProfile = { profile with remainingInvoiceCredits = remainingCredits };
          businessProfiles.add(caller, updatedProfile);
        } else {
          Runtime.trap("No remaining invoice credits found for the Pro Single plan.");
        };
      };
      case (#pro_bundle) {
        if (profile.remainingInvoiceCredits > 0) {
          let remainingCredits = profile.remainingInvoiceCredits - 1 : Nat;
          let updatedProfile = { profile with remainingInvoiceCredits = remainingCredits };
          businessProfiles.add(caller, updatedProfile);
        } else {
          Runtime.trap("No remaining invoice credits found for the Pro Bundle plan.");
        };
      };
    };
    let newInvoiceNumber = currentCount + 1;
    let newInvoice : Invoice = { invoice with invoiceNumber = newInvoiceNumber };
    let existingInvoices = switch (invoices.get(caller)) {
      case (null) { List.empty<Invoice>() };
      case (?i) { i };
    };
    existingInvoices.add(newInvoice);
    invoices.add(caller, existingInvoices);
    invoiceCounters.add(caller, newInvoiceNumber);
    newInvoiceNumber;
  };

  public shared ({ caller }) func updateInvoice(invoice : Invoice) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update invoices");
    };
    let existingInvoices = switch (invoices.get(caller)) {
      case (null) { Runtime.trap("No invoices found") };
      case (?i) { i };
    };
    let found = existingInvoices.find(func(i : Invoice) : Bool { i.invoiceNumber == invoice.invoiceNumber });
    switch (found) {
      case (null) { Runtime.trap("Invoice not found") };
      case (_) {};
    };
    let updatedList = existingInvoices.map<Invoice, Invoice>(
      func(i : Invoice) : Invoice {
        if (i.invoiceNumber == invoice.invoiceNumber) { invoice } else { i };
      }
    );
    invoices.add(caller, updatedList);
  };

  public shared ({ caller }) func autoSaveDraft(invoice : Invoice) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can auto-save drafts");
    };
    let invoiceWithDraftStatus = { invoice with status = #draft };
    switch (invoices.get(caller)) {
      case (?existingInvoices) {
        let found = existingInvoices.find(func(i : Invoice) : Bool { i.invoiceNumber == invoiceWithDraftStatus.invoiceNumber });
        switch (found) {
          case (?_) {
            let updatedList = existingInvoices.map<Invoice, Invoice>(
              func(i : Invoice) : Invoice {
                if (i.invoiceNumber == invoiceWithDraftStatus.invoiceNumber) {
                  invoiceWithDraftStatus;
                } else { i };
              }
            );
            invoices.add(caller, updatedList);
          };
          case (null) {
            let newInvoiceNumber = switch (invoiceCounters.get(caller)) {
              case (null) { 1 };
              case (?count) { count + 1 };
            };
            let newInvoice = {
              invoiceWithDraftStatus with
              invoiceNumber = newInvoiceNumber;
            };
            existingInvoices.add(newInvoice);
            invoices.add(caller, existingInvoices);
            invoiceCounters.add(caller, newInvoiceNumber);
          };
        };
      };
      case (null) {
        let newInvoiceNumber = 1;
        let newInvoice = {
          invoiceWithDraftStatus with
          invoiceNumber = newInvoiceNumber;
        };
        let newInvoices = List.singleton<Invoice>(newInvoice);
        invoices.add(caller, newInvoices);
        invoiceCounters.add(caller, newInvoiceNumber);
      };
    };
  };

  public shared ({ caller }) func deleteInvoice(invoiceNumber : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete invoices");
    };
    let existingInvoices = switch (invoices.get(caller)) {
      case (null) { Runtime.trap("No invoices found") };
      case (?i) { i };
    };
    let filteredInvoices = existingInvoices.filter(
      func(i : Invoice) : Bool { i.invoiceNumber != invoiceNumber }
    );
    invoices.add(caller, filteredInvoices);
  };

  public query ({ caller }) func getInvoice(invoiceNumber : Nat) : async ?Invoice {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get invoices");
    };
    switch (invoices.get(caller)) {
      case (null) { null };
      case (?i) {
        i.find(func(inv : Invoice) : Bool { inv.invoiceNumber == invoiceNumber });
      };
    };
  };

  public query ({ caller }) func listInvoices() : async [Invoice] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list invoices");
    };
    switch (invoices.get(caller)) {
      case (null) { [] };
      case (?i) { i.toArray() };
    };
  };

  public query ({ caller }) func listDraftInvoices() : async [Invoice] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list draft invoices");
    };
    switch (invoices.get(caller)) {
      case (null) { [] };
      case (?i) {
        i.filter(func(inv : Invoice) : Bool { inv.status == #draft }).toArray();
      };
    };
  };

  // ── Payment Status Management ─────────────────────────────────−

  public shared ({ caller }) func updatePaymentStatus(invoiceNumber : Nat, status : PaymentStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update payment status");
    };
    let existingInvoices = switch (invoices.get(caller)) {
      case (null) { Runtime.trap("No invoices found") };
      case (?i) { i };
    };
    let updatedList = existingInvoices.map<Invoice, Invoice>(
      func(i : Invoice) : Invoice {
        if (i.invoiceNumber == invoiceNumber) {
          { i with paymentStatus = status };
        } else { i };
      }
    );
    invoices.add(caller, updatedList);
  };

  // ── Stripe Payment Upgrade ───────────────────────────

  public shared ({ caller }) func purchaseInvoiceCredits(stripeSessionId : Text, paymentAmount : Nat, planType : Plan, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can purchase invoice credits");
    };

    let currentPayments : List.List<PaymentData> = switch (payments.get(caller)) {
      case (null) { List.empty<PaymentData>() };
      case (?existing) { existing };
    };

    let newPayment : PaymentData = {
      stripeSessionId;
      paymentAmount;
      plan = planType;
      timestamp = Time.now();
      paymentStatus = #completed;
      invoiceCredits = quantity;
    };
    currentPayments.add(newPayment);
    payments.add(caller, currentPayments);

    let currentBusinessProfile = switch (businessProfiles.get(caller)) {
      case (null) { Runtime.trap("User business profile not found") };
      case (?existing) {
        {
          existing with
          plan = planType;
          remainingInvoiceCredits = existing.remainingInvoiceCredits + quantity;
        };
      };
    };
    businessProfiles.add(caller, currentBusinessProfile);
  };

  public query ({ caller }) func getStripePaymentHistory() : async [PaymentData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view payment history");
    };
    switch (payments.get(caller)) {
      case (null) { [] };
      case (?p) { p.toArray() };
    };
  };

  // ── Admin Panel Functions ─────────────────────────────────────

  public shared ({ caller }) func adminGetStats() : async {
    userCount : Nat;
    totalInvoices : Nat;
    freePlanCount : Nat;
    proSingleCount : Nat;
    proBundleCount : Nat;
    totalInvoiceCredits : Nat;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access stats");
    };

    let userCount = businessProfiles.size();
    var totalInvoices = 0;
    var freePlanCount = 0;
    var proSingleCount = 0;
    var proBundleCount = 0;
    var totalInvoiceCredits = 0;

    businessProfiles.entries().forEach(
      func(entry) {
        let (user, profile) = entry;
        let userInvoiceCount = switch (invoices.get(user)) {
          case (null) { 0 };
          case (?i) { i.size() };
        };
        totalInvoices += userInvoiceCount;
        switch (profile.plan) {
          case (#free) { freePlanCount += 1 };
          case (#pro_single) { proSingleCount += 1 };
          case (#pro_bundle) { proBundleCount += 1 };
        };
        totalInvoiceCredits += profile.remainingInvoiceCredits;
      }
    );

    {
      userCount;
      totalInvoices;
      freePlanCount;
      proSingleCount;
      proBundleCount;
      totalInvoiceCredits;
    };
  };

  public shared ({ caller }) func adminGetUserInvoiceCount(user : Principal) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access user invoice counts");
    };
    switch (invoiceCounters.get(user)) {
      case (null) { 0 };
      case (?n) { n };
    };
  };

  public shared ({ caller }) func upgradePlan(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upgrade user plans");
    };
    let profile = switch (businessProfiles.get(user)) {
      case (null) { Runtime.trap("User business profile not found") };
      case (?p) { p };
    };
    let updatedProfile : BusinessProfile = { profile with plan = #pro_single };
    businessProfiles.add(user, updatedProfile);
  };

  public shared ({ caller }) func adminUpgradeUserPlan(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upgrade user plans");
    };
    let profile = switch (businessProfiles.get(user)) {
      case (null) { Runtime.trap("User business profile not found") };
      case (?p) { p };
    };
    let updatedProfile : BusinessProfile = { profile with plan = #pro_single };
    businessProfiles.add(user, updatedProfile);
  };

  // ───────────────────────────────────────────────────────────────
  // Stripe implementation
  // ───────────────────────────────────────────────────────────────

  public query func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    configuration := ?config;
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check Stripe session status");
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Invoice Item Management ─────────────────────────

  public shared ({ caller }) func addSavedItem(item : SavedItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add saved items");
    };
    let currentItems = switch (savedItems.get(caller)) {
      case (null) { List.empty<SavedItem>() };
      case (?items) { items };
    };
    let newItemCount = currentItems.size() + 1;
    let itemCode = "ITEM-" # newItemCount.toText();
    let newItem = { item with itemCode };
    currentItems.add(newItem);
    savedItems.add(caller, currentItems);
  };

  public query ({ caller }) func listSavedItems() : async [SavedItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list saved items");
    };
    switch (savedItems.get(caller)) {
      case (null) { [] };
      case (?items) { items.toArray() };
    };
  };

  public shared ({ caller }) func updateSavedItem(updatedItem : SavedItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update saved items");
    };
    let currentItems = switch (savedItems.get(caller)) {
      case (null) { Runtime.trap("No saved items found") };
      case (?items) { items };
    };
    let found = currentItems.find(func(item : SavedItem) : Bool { item.itemCode == updatedItem.itemCode });
    switch (found) {
      case (null) { Runtime.trap("Saved item not found") };
      case (_) {};
    };
    let updatedList = currentItems.map<SavedItem, SavedItem>(
      func(item : SavedItem) : SavedItem {
        if (item.itemCode == updatedItem.itemCode) { updatedItem } else { item };
      }
    );
    savedItems.add(caller, updatedList);
  };

  public shared ({ caller }) func deleteSavedItem(itemCode : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete saved items");
    };
    let currentItems = switch (savedItems.get(caller)) {
      case (null) { Runtime.trap("No saved items found") };
      case (?items) { items };
    };
    let filteredItems = currentItems.filter(
      func(item : SavedItem) : Bool { item.itemCode != itemCode }
    );
    savedItems.add(caller, filteredItems);
  };
};
