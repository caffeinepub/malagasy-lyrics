import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LogIn,
  LogOut,
  Menu,
  Music2,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinkClass = (active: boolean) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
    active
      ? "bg-primary/15 text-primary"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
  }`;

const mobileLinkClass = (active: boolean) =>
  `px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
    active
      ? "bg-primary/15 text-primary"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
  }`;

export function Header() {
  const { loginStatus, login, clear } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isSubmit = location.pathname.startsWith("/submit");
  const isStore = location.pathname.startsWith("/store");
  const isSeller = location.pathname.startsWith("/seller");

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border/60 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center gap-4">
        {/* Brand */}
        <Link
          to="/"
          search={{ q: "", genre: "", year: "All" }}
          className="flex items-center gap-2.5 text-foreground hover:text-primary transition-colors duration-200 shrink-0"
          data-ocid="nav-brand"
        >
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <Music2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold leading-none tracking-tight hidden sm:block">
            Malagasy Lyrics
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1 ml-4"
          data-ocid="nav-links"
        >
          <Link
            to="/"
            search={{ q: "", genre: "", year: "All" }}
            className={navLinkClass(isHome)}
          >
            Browse
          </Link>
          <Link
            to="/store"
            search={{ q: "", artist: "", sort: "newest" }}
            className={navLinkClass(isStore)}
            data-ocid="nav-store"
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              Music Store
            </span>
          </Link>
          <Link to="/submit" className={navLinkClass(isSubmit)}>
            Submit Lyrics
          </Link>
          {isLoggedIn && (
            <Link
              to="/seller"
              className={navLinkClass(isSeller)}
              data-ocid="nav-sell"
            >
              Sell Music
            </Link>
          )}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search shortcut */}
        <Link
          to="/"
          search={{ q: "", genre: "", year: "All" }}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/60 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 text-sm min-w-[180px]"
          data-ocid="nav-search-hint"
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Search songs…</span>
        </Link>

        {/* Auth */}
        {isLoggedIn ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clear()}
            className="gap-2 text-muted-foreground hover:text-foreground"
            data-ocid="nav-logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => login()}
            className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
            data-ocid="nav-login"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">Sign in</span>
          </Button>
        )}

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          data-ocid="nav-mobile-toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="md:hidden border-t border-border/50 bg-card px-4 py-3 flex flex-col gap-1"
          data-ocid="nav-mobile"
        >
          <Link
            to="/"
            search={{ q: "", genre: "", year: "All" }}
            onClick={() => setMobileOpen(false)}
            className={mobileLinkClass(isHome)}
          >
            Browse
          </Link>
          <Link
            to="/store"
            search={{ q: "", artist: "", sort: "newest" }}
            onClick={() => setMobileOpen(false)}
            className={mobileLinkClass(isStore)}
            data-ocid="nav-mobile-store"
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              Music Store
            </span>
          </Link>
          <Link
            to="/submit"
            onClick={() => setMobileOpen(false)}
            className={mobileLinkClass(isSubmit)}
          >
            Submit Lyrics
          </Link>
          {isLoggedIn && (
            <Link
              to="/seller"
              onClick={() => setMobileOpen(false)}
              className={mobileLinkClass(isSeller)}
              data-ocid="nav-mobile-sell"
            >
              Sell Music
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
