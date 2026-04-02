import { u as useBusinessProfile, a as useInvoices, b as Plan, r as reactExports, c as ue, j as jsxRuntimeExports } from "./index-CQurMIuK.js";
import InvoiceFormPage from "./InvoiceFormPage-bq2itwex.js";
import "./dialog-BrlW6YE_.js";
import "./index-VvkpZohl.js";
import "./index-B4Tzu2hK.js";
import "./trash-2-Yl--ebfh.js";
import "./search-DyJzD3nH.js";
import "./select-Bi6XeXRR.js";
import "./index-TBwM_trI.js";
import "./index-B3aaHW2j.js";
import "./check-Bdvrsx2E.js";
import "./separator-cswUYNsc.js";
import "./textarea-8WUWs8jP.js";
import "./eye-4P3zOJNN.js";
import "./plus-DYkP-OMc.js";
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
