import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NAV_ITEMS } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";

/**
 * Header. Sticky bar with the extruded-gold wordmark, a network/identity
 * badge, and — on protected routes — a mobile menu button that opens a
 * drawer with the same navigation items as the sidebar, so every protected
 * section stays reachable on small screens.
 */
export function Header() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isLanding = pathname === "/";

  return (
    <header
      data-ocid="header"
      className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
        <Link
          to="/"
          data-ocid="header.wordmark"
          className="group flex items-center gap-3"
          aria-label="Sovereign Legacy home"
        >
          <span className="text-extruded-gold font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Sovereign Legacy
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <span
            data-ocid="header.badge"
            className="hidden items-center gap-2 rounded border border-border bg-surface-raised px-3 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline-flex"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-success"
              aria-hidden="true"
            />
            Network · Identity
          </span>

          {!isLanding && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  data-ocid="header.mobile_menu_button"
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-surface">
                <SheetHeader>
                  <SheetTitle className="font-display text-lg text-foreground">
                    Sovereign Legacy
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-1 px-4"
                  aria-label="Mobile primary"
                >
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      data-ocid={`header.mobile_link.${item.to}`}
                      className={cn(
                        "group relative flex items-center rounded px-3 py-2.5 text-sm font-medium text-muted-foreground transition-smooth hover:bg-surface-raised hover:text-foreground",
                      )}
                      activeProps={{
                        className:
                          "bg-surface-raised text-foreground shadow-subtle hover:bg-surface-raised hover:text-foreground",
                      }}
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-gold transition-opacity",
                              isActive ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {item.label}
                        </>
                      )}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
