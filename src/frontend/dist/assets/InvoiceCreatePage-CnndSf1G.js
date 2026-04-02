import { u as useBusinessProfile, a as useInvoices, b as Plan, r as reactExports, c as ue, j as jsxRuntimeExports } from "./index-D5Ia9PfW.js";
import InvoiceFormPage from "./InvoiceFormPage-CqK5SlUk.js";
import "./dialog-DOOEGEKs.js";
import "./index-BwAdBz8E.js";
import "./index-BC-PgpLx.js";
import "./trash-2-GZKUN2VB.js";
import "./search-Bm8W1ykJ.js";
import "./select-DAXAE4Hz.js";
import "./index-DLRuTKTx.js";
import "./index-BpTihNSv.js";
import "./check-wnXPkzLF.js";
import "./separator-L1eZsyDE.js";
import "./textarea-U8qFu4eL.js";
import "./eye-CuxNNjGE.js";
import "./plus-LNQXxajL.js";
function InvoiceCreatePage() {
  const { data: profile, isFetched: profileFetched } = useBusinessProfile();
  const { data: invoices, isFetched: invoicesFetched } = useInvoices();
  const invoiceCount = (invoices == null ? void 0 : invoices.length) ?? 0;
  const isFreePlan = (profile == null ? void 0 : profile.plan) === Plan.free;
  const remainingCredits = Number((profile == null ? void 0 : profile.remainingInvoiceCredits) ?? 0);
  const freeLimitReached = isFreePlan && invoiceCount >= 5 && remainingCredits === 0;
  reactExports.useEffect(() => {
    if (profileFetched && invoicesFetched && freeLimitReached) {
      ue.error(
        "Free plan limit reached. Purchase invoice credits to create more invoices."
      );
      window.location.href = "/pricing";
    }
  }, [profileFetched, invoicesFetched, freeLimitReached]);
  if (!profileFetched || !invoicesFetched) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }) });
  }
  if (freeLimitReached) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceFormPage, {});
}
export {
  InvoiceCreatePage as default
};
