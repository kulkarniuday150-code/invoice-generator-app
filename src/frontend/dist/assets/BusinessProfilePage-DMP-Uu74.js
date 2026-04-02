import { d as createLucideIcon, j as jsxRuntimeExports, V as Slot, y as cn, W as cva, Y as useNavigate, e as useActor, u as useBusinessProfile, _ as useGetCallerUserProfile, $ as useSaveBusinessProfile, r as reactExports, b as Plan, L as LoaderCircle, n as Crown, C as Card, o as CardHeader, p as CardTitle, l as CardContent, X, B as Button, h as Label, I as Input, a0 as CircleCheckBig, c as ue, a1 as ExternalBlob } from "./index-D5Ia9PfW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function BusinessProfilePage() {
  useNavigate();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: profile, isLoading: profileLoading } = useBusinessProfile();
  useGetCallerUserProfile();
  const saveProfile = useSaveBusinessProfile();
  const [businessName, setBusinessName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [gstNumber, setGstNumber] = reactExports.useState("");
  const [logoFile, setLogoFile] = reactExports.useState(null);
  const [logoPreview, setLogoPreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [saved, setSaved] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a, _b;
    if (profile) {
      setBusinessName(profile.businessName || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setGstNumber(profile.gstNumber || "");
      const logoUrl = (_b = (_a = profile.logo) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
      if (logoUrl && logoUrl !== "") {
        setLogoPreview(logoUrl);
      }
    }
  }, [profile]);
  const handleLogoChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!actor) {
      ue.error("Backend not ready yet. Please wait a moment and try again.");
      return;
    }
    if (!businessName.trim()) {
      ue.error("Business name is required");
      return;
    }
    try {
      let logoBlob;
      if (logoFile) {
        const arrayBuffer = await logoFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        logoBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
          (pct) => {
            setUploadProgress(pct);
          }
        );
      } else if (profile == null ? void 0 : profile.logo) {
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
        plan: (profile == null ? void 0 : profile.plan) ?? Plan.free,
        remainingInvoiceCredits: (profile == null ? void 0 : profile.remainingInvoiceCredits) ?? 0n
      });
      setSaved(true);
      setUploadProgress(0);
      ue.success("Business profile saved!");
      setTimeout(() => setSaved(false), 3e3);
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to save profile");
      setUploadProgress(0);
    }
  };
  const isPro = (profile == null ? void 0 : profile.plan) !== void 0 && profile.plan !== Plan.free;
  const isLoading = actorFetching || profileLoading;
  const isSaving = saveProfile.isPending;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold text-foreground", children: "Business Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage your business information" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: isPro ? "default" : "secondary",
          className: "flex items-center gap-1",
          children: [
            isPro && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" }),
            (profile == null ? void 0 : profile.plan) === Plan.pro_single ? "Pro Single" : (profile == null ? void 0 : profile.plan) === Plan.pro_bundle ? "Pro Bundle" : "Free Plan"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Business Logo" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          logoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: logoPreview,
                alt: "Logo preview",
                className: "w-20 h-20 object-contain rounded-lg border border-border bg-muted"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleRemoveLogo,
                className: "absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
                  logoPreview ? "Change Logo" : "Upload Logo"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "PNG, JPG up to 2MB" }),
            uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary mt-1", children: [
              "Uploading... ",
              uploadProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              onChange: handleLogoChange,
              className: "hidden"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Business Details" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "businessName", children: "Business Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "businessName",
                value: businessName,
                onChange: (e) => setBusinessName(e.target.value),
                placeholder: "Your Business Name",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "business@example.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "+91 98765 43210"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "address",
                value: address,
                onChange: (e) => setAddress(e.target.value),
                placeholder: "Street, City, State, PIN"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gstNumber", children: "GST Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gstNumber",
                value: gstNumber,
                onChange: (e) => setGstNumber(e.target.value),
                placeholder: "22AAAAA0000A1Z5"
              }
            )
          ] })
        ] }) })
      ] }),
      !isPro && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-3 px-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 text-amber-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-amber-800 dark:text-amber-200", children: "Buy invoice credits to unlock premium templates and more" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "border-amber-500 text-amber-700 hover:bg-amber-100 dark:text-amber-300 whitespace-nowrap",
            children: "Buy Credits"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isSaving || actorFetching || !actor,
          className: "w-full",
          "data-ocid": "profile.submit_button",
          children: actorFetching && !actor ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Connecting..."
          ] }) : isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Saving..."
          ] }) : saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-2 h-4 w-4" }),
            "Saved!"
          ] }) : "Save Profile"
        }
      )
    ] })
  ] });
}
export {
  BusinessProfilePage as default
};
