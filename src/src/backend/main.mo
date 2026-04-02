import Int "mo:core/Int";
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


// Specify migration in with-clause

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

  // Internal Invoice type – UNCHANGED to preserve stable variable compatibility
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

  // Extended public type that includes optional bank details and terms
  public type InvoiceWithExtras = {
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
    bankDetails : ?Text;
    termsAndConditions : ?Text;
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

  // ── Stable storage (persists across upgrades) ──────────────────
  stable var stableBusinessProfiles : [(Principal, BusinessProfile)] = [];
  stable var stableClients : [(Principal, [Client])] = [];
  stable var stableInvoices : [(Principal, [Invoice])] = [];
  stable var stableInvoiceCounters : [(Principal, Nat)] = [];
  stable var stablePayments : [(Principal, [PaymentData])] = [];
  stable var stableSavedItems : [(Principal, [SavedItem])] = [];
  stable var stableConfiguration : ?Stripe.StripeConfiguration = null;
  // New stable var for bank details and terms – no type compatibility issue (brand new)
  stable var stableInvoiceExtras : [(Principal, Nat, ?Text, ?Text)] = [];

  // OTP storage: phone -> (otp, expiry_ns, principal_opt)
  stable var stableOtpStore : [(Text, Text, Int, ?Principal)] = [];
  // Phone to principal mapping
  stable var stablePhonePrincipals : [(Text, Principal)] = [];

  // ── In-memory state (rebuilt from stable on upgrade) ───────────
  let businessProfiles = Map.empty<Principal, BusinessProfile>();
  let clients = Map.empty<Principal, List.List<Client>>();
  let invoices = Map.empty<Principal, List.List<Invoice>>();
  let invoiceCounters = Map.empty<Principal, Nat>();
  let payments = Map.empty<Principal, List.List<PaymentData>>();
  let savedItems = Map.empty<Principal, List.List<SavedItem>>();
  var configuration : ?Stripe.StripeConfiguration = null;

  // ── Private helpers for InvoiceWithExtras ──────────────────────

  func toInvoice(inv : InvoiceWithExtras) : Invoice {
    {
      invoiceNumber = inv.invoiceNumber;
      invoiceDate = inv.invoiceDate;
      dueDate = inv.dueDate;
      client = inv.client;
      lineItems = inv.lineItems;
      subtotal = inv.subtotal;
      totalDiscount = inv.totalDiscount;
      totalTax = inv.totalTax;
      grandTotal = inv.grandTotal;
      paymentStatus = inv.paymentStatus;
      status = inv.status;
    }
  };

  func getExtrasHelper(p : Principal, n : Nat) : (?Text, ?Text) {
    for (entry in stableInvoiceExtras.vals()) {
      let (ep, en, bd, tc) = entry;
      if (ep == p and en == n) { return (bd, tc) };
    };
    (null, null)
  };

  func saveExtrasHelper(p : Principal, n : Nat, bd : ?Text, tc : ?Text) {
    var result = List.empty<(Principal, Nat, ?Text, ?Text)>();
    for (entry in stableInvoiceExtras.vals()) {
      let (ep, en, ebd, etc_) = entry;
      if (ep != p or en != n) { result.add((ep, en, ebd, etc_)) };
    };
    result.add((p, n, bd, tc));
    stableInvoiceExtras := result.toArray();
  };

  func toInvoiceWithExtras(inv : Invoice, p : Principal) : InvoiceWithExtras {
    let (bd, tc) = getExtrasHelper(p, inv.invoiceNumber);
    {
      invoiceNumber = inv.invoiceNumber;
      invoiceDate = inv.invoiceDate;
      dueDate = inv.dueDate;
      client = inv.client;
      lineItems = inv.lineItems;
      subtotal = inv.subtotal;
      totalDiscount = inv.totalDiscount;
      totalTax = inv.totalTax;
      grandTotal = inv.grandTotal;
      paymentStatus = inv.paymentStatus;
      status = inv.status;
      bankDetails = bd;
      termsAndConditions = tc;
    }
  };

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

  public shared ({ caller }) func createInvoice(invoice : InvoiceWithExtras) : async Nat {
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
    let invoiceBase = toInvoice(invoice);
    let newInvoice : Invoice = { invoiceBase with invoiceNumber = newInvoiceNumber };
    let existingInvoices = switch (invoices.get(caller)) {
      case (null) { List.empty<Invoice>() };
      case (?i) { i };
    };
    existingInvoices.add(newInvoice);
    invoices.add(caller, existingInvoices);
    invoiceCounters.add(caller, newInvoiceNumber);
    saveExtrasHelper(caller, newInvoiceNumber, invoice.bankDetails, invoice.termsAndConditions);
    newInvoiceNumber;
  };

  public shared ({ caller }) func updateInvoice(invoice : InvoiceWithExtras) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update invoices");
    };
    let existingInvoices = switch (invoices.get(caller)) {
      case (null) { Runtime.trap("No invoices found") };
      case (?i) { i };
    };
    let invoiceBase = toInvoice(invoice);
    let found = existingInvoices.find(func(i : Invoice) : Bool { i.invoiceNumber == invoice.invoiceNumber });
    switch (found) {
      case (null) { Runtime.trap("Invoice not found") };
      case (_) {};
    };
    let updatedList = existingInvoices.map<Invoice, Invoice>(
      func(i : Invoice) : Invoice {
        if (i.invoiceNumber == invoice.invoiceNumber) { invoiceBase } else { i };
      }
    );
    invoices.add(caller, updatedList);
    saveExtrasHelper(caller, invoice.invoiceNumber, invoice.bankDetails, invoice.termsAndConditions);
  };

  public shared ({ caller }) func autoSaveDraft(invoice : InvoiceWithExtras) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can auto-save drafts");
    };
    let invoiceBase = toInvoice(invoice);
    let invoiceWithDraftStatus = { invoiceBase with status = #draft };
    var savedInvoiceNumber : Nat = invoiceWithDraftStatus.invoiceNumber;
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
            savedInvoiceNumber := newInvoiceNumber;
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
        savedInvoiceNumber := newInvoiceNumber;
      };
    };
    saveExtrasHelper(caller, savedInvoiceNumber, invoice.bankDetails, invoice.termsAndConditions);
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
    // Clean up extras for deleted invoice
    var extrasResult = List.empty<(Principal, Nat, ?Text, ?Text)>();
    for (entry in stableInvoiceExtras.vals()) {
      let (ep, en, ebd, etc_) = entry;
      if (ep != caller or en != invoiceNumber) { extrasResult.add((ep, en, ebd, etc_)) };
    };
    stableInvoiceExtras := extrasResult.toArray();
  };

  public query ({ caller }) func getInvoice(invoiceNumber : Nat) : async ?InvoiceWithExtras {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get invoices");
    };
    switch (invoices.get(caller)) {
      case (null) { null };
      case (?i) {
        switch (i.find(func(inv : Invoice) : Bool { inv.invoiceNumber == invoiceNumber })) {
          case (null) { null };
          case (?inv) { ?toInvoiceWithExtras(inv, caller) };
        };
      };
    };
  };

  public query ({ caller }) func listInvoices() : async [InvoiceWithExtras] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list invoices");
    };
    switch (invoices.get(caller)) {
      case (null) { [] };
      case (?i) {
        i.map<Invoice, InvoiceWithExtras>(func(inv : Invoice) : InvoiceWithExtras {
          toInvoiceWithExtras(inv, caller)
        }).toArray();
      };
    };
  };

  public query ({ caller }) func listDraftInvoices() : async [InvoiceWithExtras] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list draft invoices");
    };
    switch (invoices.get(caller)) {
      case (null) { [] };
      case (?i) {
        i.filter(func(inv : Invoice) : Bool { inv.status == #draft })
         .map<Invoice, InvoiceWithExtras>(func(inv : Invoice) : InvoiceWithExtras {
           toInvoiceWithExtras(inv, caller)
         }).toArray();
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
    let itemCode = if (item.itemCode == "") {
      let ts = Int.abs(Time.now()) % 100000;
      "ITEM-" # ts.toText();
    } else {
      item.itemCode;
    };
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
  // ── OTP Authentication ─────────────────────────────────────────

  func padOtp(n : Nat) : Text {
    let s = n.toText();
    let len = s.size();
    if (len >= 6) { s }
    else if (len == 5) { "0" # s }
    else if (len == 4) { "00" # s }
    else if (len == 3) { "000" # s }
    else if (len == 2) { "0000" # s }
    else { "00000" # s }
  };

  func generateOtp(phone : Text, seed : Int) : Text {
    let hash = Int.abs(seed) + phone.size() * 7919;
    let otp = hash % 1000000;
    padOtp(otp)
  };

  func filterOtpStore(phone : Text) : [(Text, Text, Int, ?Principal)] {
    var result = List.empty<(Text, Text, Int, ?Principal)>();
    for (e in stableOtpStore.vals()) {
      if (e.0 != phone) { result.add(e) };
    };
    result.toArray()
  };

  func filterPhoneStore(phone : Text) : [(Text, Principal)] {
    var result = List.empty<(Text, Principal)>();
    for (e in stablePhonePrincipals.vals()) {
      if (e.0 != phone) { result.add(e) };
    };
    result.toArray()
  };

  public shared ({ caller }) func requestPhoneOtp(phone : Text) : async Text {
    let now = Time.now();
    let expiry = now + 600_000_000_000; // 10 minutes in nanoseconds
    let otp = generateOtp(phone, now);
    // Remove old OTP for this phone, then add new entry
    let filtered = filterOtpStore(phone);
    var newStore = List.empty<(Text, Text, Int, ?Principal)>();
    for (e in filtered.vals()) { newStore.add(e) };
    newStore.add((phone, otp, expiry, null));
    stableOtpStore := newStore.toArray();
    otp
  };

  public shared ({ caller }) func verifyPhoneOtp(phone : Text, otp : Text) : async { #ok; #wrongOtp; #expired; #notFound } {
    let now = Time.now();
    var found = false;
    var result : { #ok; #wrongOtp; #expired; #notFound } = #notFound;
    for (entry in stableOtpStore.vals()) {
      if (entry.0 == phone) {
        found := true;
        if (entry.2 < now) {
          result := #expired;
        } else if (entry.1 != otp) {
          result := #wrongOtp;
        } else {
          // Valid OTP – link phone to caller principal
          let existingPhones = filterPhoneStore(phone);
          var newPhones = List.empty<(Text, Principal)>();
          for (e in existingPhones.vals()) { newPhones.add(e) };
          newPhones.add((phone, caller));
          stablePhonePrincipals := newPhones.toArray();
          // Remove used OTP
          stableOtpStore := filterOtpStore(phone);
          result := #ok;
        };
      };
    };
    if (not found) { #notFound } else { result }
  };

  public query ({ caller }) func getLinkedPhone() : async ?Text {
    for (entry in stablePhonePrincipals.vals()) {
      if (entry.1 == caller) { return ?entry.0 };
    };
    null
  };

  public query func isPhoneRegistered(phone : Text) : async Bool {
    for (entry in stablePhonePrincipals.vals()) {
      if (entry.0 == phone) { return true };
    };
    false
  };

};
