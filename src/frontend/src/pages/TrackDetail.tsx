import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateCheckoutSession, useTrack } from "@/hooks/useMusic";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Disc3,
  Loader2,
  Music,
  Pause,
  Play,
  ShoppingCart,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function TrackDetailPage() {
  const { id } = useParams({ from: "/store/$id" });
  const { data: track, isLoading } = useTrack(id);
  const checkout = useCreateCheckoutSession();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function handleTogglePlay() {
    if (!track?.audioFile) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(track.audioFile);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        toast.error("Could not play audio preview");
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }

  async function handleBuy() {
    if (!track) return;
    try {
      setIsRedirecting(true);
      const session = await checkout.mutateAsync({
        trackId: track.id,
        trackTitle: track.title,
        priceUSD: track.priceUSD,
      });
      if (!session?.url) throw new Error("Stripe session missing url");
      window.location.href = session.url;
    } catch (err) {
      setIsRedirecting(false);
      toast.error(
        err instanceof Error ? err.message : "Checkout failed. Please retry.",
      );
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Skeleton className="h-5 w-28 mb-8" />
        <div className="grid md:grid-cols-[360px_1fr] gap-10">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-12 w-32 mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md">
        <AlertCircle
          className="w-12 h-12 mx-auto mb-4"
          style={{ color: "oklch(var(--destructive))" }}
        />
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          Track not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This track may have been removed or the link is incorrect.
        </p>
        <Link to="/store" search={{ q: "", artist: "", sort: "newest" }}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link
          to="/store"
          search={{ q: "", artist: "", sort: "newest" }}
          className="hover:text-foreground transition-colors"
        >
          Music Store
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground truncate">{track.title}</span>
      </nav>

      <div className="grid md:grid-cols-[360px_1fr] gap-10">
        {/* Cover art */}
        <div>
          <div
            className="aspect-square rounded-xl overflow-hidden shadow-track-card"
            style={{ background: "oklch(var(--muted) / 0.2)" }}
          >
            {track.coverImage ? (
              <img
                src={track.coverImage}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Disc3
                  className="w-24 h-24"
                  style={{ color: "oklch(var(--primary) / 0.3)" }}
                />
              </div>
            )}
          </div>

          {/* Audio preview */}
          {track.audioFile && (
            <div
              className="mt-4 rounded-lg p-4 flex items-center gap-3"
              style={{
                background: "oklch(var(--muted) / 0.3)",
                border: "1px solid oklch(var(--border) / 0.3)",
              }}
            >
              <button
                type="button"
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
                style={{ background: "oklch(var(--primary))" }}
                aria-label={isPlaying ? "Pause preview" : "Preview track"}
                onClick={handleTogglePlay}
                data-ocid="track-preview-play"
              >
                {isPlaying ? (
                  <Pause
                    className="w-4 h-4"
                    style={{ color: "oklch(0.12 0 0)" }}
                  />
                ) : (
                  <Play
                    className="w-4 h-4 ml-0.5"
                    style={{ color: "oklch(0.12 0 0)" }}
                  />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {track.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isPlaying ? "Playing preview…" : "Preview"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Track info + purchase */}
        <div className="flex flex-col">
          <div className="flex items-start gap-2 flex-wrap mb-1">
            <Badge
              variant="secondary"
              className="text-[10px]"
              style={{ borderColor: "oklch(var(--primary) / 0.3)" }}
            >
              <Music className="w-3 h-3 mr-1" />
              Malagasy Music
            </Badge>
            {track.published && (
              <Badge
                className="text-[10px]"
                style={{
                  background: "oklch(var(--success) / 0.15)",
                  color: "oklch(var(--success))",
                  borderColor: "oklch(var(--success) / 0.3)",
                }}
              >
                Available
              </Badge>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight mt-2 mb-1">
            {track.title}
          </h1>
          <p
            className="text-lg font-medium mb-1"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            {track.artist}
          </p>
          {track.album && (
            <p className="text-sm text-muted-foreground">{track.album}</p>
          )}

          {/* Seller */}
          <div className="flex items-center gap-2 mt-4 mb-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: "oklch(var(--primary) / 0.15)",
                color: "oklch(var(--primary))",
              }}
            >
              {(track.sellerName ?? "").charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sold by</p>
              <p className="text-sm font-medium text-foreground">
                {track.sellerName}
              </p>
            </div>
          </div>

          <div
            className="rounded-xl p-6 mt-auto"
            style={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border) / 0.4)",
            }}
          >
            <div className="flex items-end gap-2 mb-5">
              <span
                className="font-display text-4xl font-bold"
                style={{ color: "oklch(var(--primary))" }}
              >
                ${track.priceUSD.toFixed(2)}
              </span>
              <span className="text-muted-foreground text-sm mb-1">USD</span>
            </div>

            <Button
              size="lg"
              className="w-full gap-2 font-medium text-base"
              onClick={handleBuy}
              disabled={isRedirecting || checkout.isPending}
              data-ocid="track-buy-cta"
            >
              {isRedirecting || checkout.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirecting to checkout…
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Secure checkout via Stripe · Instant download after purchase
            </p>
          </div>

          {/* View count */}
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {Number(track.viewCount)} plays
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
