import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import React, { Suspense } from "react";
import Layout from "./components/Layout";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import LoginPage from "./pages/LoginPage";
import OTPVerifyPage from "./pages/OTPVerifyPage";
import PhoneAuthPage from "./pages/PhoneAuthPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import SignUpPage from "./pages/SignUpPage";

// Lazy-loaded pages
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const InvoiceListPage = React.lazy(() => import("./pages/InvoiceListPage"));
const InvoiceCreatePage = React.lazy(() => import("./pages/InvoiceCreatePage"));
const InvoiceFormPage = React.lazy(() => import("./pages/InvoiceFormPage"));
const InvoiceDetailPage = React.lazy(() => import("./pages/InvoiceDetailPage"));
const InvoicePreviewPage = React.lazy(
  () => import("./pages/InvoicePreviewPage"),
);
const ClientsPage = React.lazy(() => import("./pages/ClientsPage"));
const BusinessProfilePage = React.lazy(
  () => import("./pages/BusinessProfilePage"),
);
const AdminDashboardPage = React.lazy(
  () => import("./pages/AdminDashboardPage"),
);
const PricingPage = React.lazy(() => import("./pages/PricingPage"));
const SavedItemsPage = React.lazy(() => import("./pages/SavedItemsPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      gcTime: 300000,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Sign Up route
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});

// Phone Auth route
const phoneAuthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/phone-auth",
  component: PhoneAuthPage,
});

// OTP Verify route
const otpVerifyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/otp-verify",
  component: OTPVerifyPage,
});

// Profile setup route
const profileSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile-setup",
  component: ProfileSetupPage,
});

// Authenticated layout route
const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: AuthLayout,
});

function AuthLayout() {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    window.location.href = "/login";
    return null;
  }

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexRedirect,
});

function IndexRedirect() {
  const { identity, isInitializing } = useInternetIdentity();

  React.useEffect(() => {
    if (!isInitializing) {
      if (identity) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/login";
      }
    }
  }, [identity, isInitializing]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Dashboard route
const dashboardRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

// Invoices routes
const invoicesRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/invoices",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <InvoiceListPage />
    </Suspense>
  ),
});

const invoiceCreateRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/invoices/create",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <InvoiceCreatePage />
    </Suspense>
  ),
});

const invoiceDetailRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/invoices/$invoiceNumber",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <InvoiceDetailPage />
    </Suspense>
  ),
});

const invoiceEditRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/invoices/$invoiceNumber/edit",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <InvoiceFormPage />
    </Suspense>
  ),
});

const invoicePreviewRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/invoices/$invoiceNumber/preview",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <InvoicePreviewPage />
    </Suspense>
  ),
});

// Clients route
const clientsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/clients",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ClientsPage />
    </Suspense>
  ),
});

// Profile route (legacy path kept for compatibility)
const profileRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BusinessProfilePage />
    </Suspense>
  ),
});

// Business Profile route
const businessProfileRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/business-profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BusinessProfilePage />
    </Suspense>
  ),
});

// Admin route
const adminRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

// Pricing route
const pricingRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/pricing",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PricingPage />
    </Suspense>
  ),
});

// Saved Items route
const savedItemsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/saved-items",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SavedItemsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  phoneAuthRoute,
  otpVerifyRoute,
  profileSetupRoute,
  authLayoutRoute.addChildren([
    dashboardRoute,
    invoicesRoute,
    invoiceCreateRoute,
    invoiceDetailRoute,
    invoiceEditRoute,
    invoicePreviewRoute,
    clientsRoute,
    profileRoute,
    businessProfileRoute,
    adminRoute,
    pricingRoute,
    savedItemsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
