import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "@tanstack/react-router";

export function Layout() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const footerUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border/50 py-8 mt-12">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-metadata">
          <div className="flex items-center gap-2">
            <span className="text-primary font-display font-semibold text-sm">
              Malagasy Lyrics
            </span>
            <span className="text-border">·</span>
            <span>Preserving Malagasy musical heritage</span>
          </div>
          <p>
            © {year}.{" "}
            <a
              href={footerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/80 hover:text-primary transition-colors duration-200"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </footer>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}
