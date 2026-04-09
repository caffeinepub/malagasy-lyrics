import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy pages
const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const LyricDetailPage = lazy(() =>
  import("@/pages/LyricDetail").then((m) => ({ default: m.LyricDetailPage })),
);
const SubmitPage = lazy(() =>
  import("@/pages/Submit").then((m) => ({ default: m.SubmitPage })),
);
const EditPage = lazy(() =>
  import("@/pages/Edit").then((m) => ({ default: m.EditPage })),
);
const StorePage = lazy(() =>
  import("@/pages/Store").then((m) => ({ default: m.StorePage })),
);
const TrackDetailPage = lazy(() =>
  import("@/pages/TrackDetail").then((m) => ({ default: m.TrackDetailPage })),
);
const SellerDashboardPage = lazy(() =>
  import("@/pages/SellerDashboard").then((m) => ({
    default: m.SellerDashboardPage,
  })),
);
const PaymentSuccessPage = lazy(() =>
  import("@/pages/PaymentSuccess").then((m) => ({
    default: m.PaymentSuccessPage,
  })),
);
const PaymentFailurePage = lazy(() =>
  import("@/pages/PaymentFailure").then((m) => ({
    default: m.PaymentFailurePage,
  })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 30_000 },
  },
});

// ── Routes ──────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    genre: typeof search.genre === "string" ? search.genre : "",
    year: typeof search.year === "string" ? search.year : "All",
  }),
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <HomePage />
    </Suspense>
  ),
});

const lyricDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lyrics/$id",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <LyricDetailPage />
    </Suspense>
  ),
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submit",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <SubmitPage />
    </Suspense>
  ),
});

const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit/$id",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <EditPage />
    </Suspense>
  ),
});

const storeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/store",
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    artist: typeof search.artist === "string" ? search.artist : "",
    sort: typeof search.sort === "string" ? search.sort : "newest",
  }),
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <StorePage />
    </Suspense>
  ),
});

const trackDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/store/$id",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <TrackDetailPage />
    </Suspense>
  ),
});

const sellerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <SellerDashboardPage />
    </Suspense>
  ),
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  validateSearch: (search: Record<string, unknown>) => ({
    trackId: typeof search.trackId === "string" ? search.trackId : "",
    session_id: typeof search.session_id === "string" ? search.session_id : "",
  }),
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <PaymentSuccessPage />
    </Suspense>
  ),
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <PaymentFailurePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  lyricDetailRoute,
  submitRoute,
  editRoute,
  storeRoute,
  trackDetailRoute,
  sellerRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-48 w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
          <Skeleton key={k} className="h-40" />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <RouterProvider router={router} />
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
