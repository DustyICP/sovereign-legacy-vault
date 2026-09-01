import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate, Outlet, useRouterState } from "@tanstack/react-router";

/**
 * App shell. The landing route renders header + content + footer; every
 * protected route renders header + sidebar + content + footer. Authentication
 * gates the dashboard and all protected sections: unauthenticated visitors
 * are sent to the landing page, authenticated ones are sent to the dashboard.
 */
export function Layout() {
  const { isAuthenticated, isInitializing } = useInternetIdentity();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isLanding = pathname === "/";

  if (isInitializing) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-background">
          <div
            data-ocid="loading_state"
            className="flex flex-col items-center gap-4 rounded border border-border bg-surface px-8 py-10 shadow-subtle"
          >
            <span
              className="h-2 w-24 rounded-full bg-gradient-gold"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Opening vault…
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLanding) {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 bg-background">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
