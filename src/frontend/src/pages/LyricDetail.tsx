import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLyric } from "@/hooks/useLyrics";
import type { LyricEntry } from "@/types/lyrics";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Edit2,
  Eye,
  Music2,
  Share2,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function mockViewCount(id: bigint): number {
  const seed = Number(id % 9999n);
  return 120 + ((seed * 37) % 4880);
}

function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div
      className="max-w-3xl mx-auto px-4 py-10 space-y-8"
      data-ocid="lyric-detail-loading"
    >
      {/* back row */}
      <Skeleton className="h-5 w-32" />
      {/* title */}
      <div className="space-y-3">
        <Skeleton className="h-14 w-4/5" />
        <Skeleton className="h-6 w-52" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      {/* lyrics stanzas */}
      <div className="space-y-2">
        {([90, 75, 100, 65, 80] as const).map((w) => (
          <Skeleton key={w} className="h-7" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="space-y-2 pt-4">
        {([85, 60, 95, 70] as const).map((w) => (
          <Skeleton key={w} className="h-7" style={{ width: `${w}%` }} />
        ))}
      </div>
      {/* attribution */}
      <Skeleton className="h-16 w-full rounded-lg" />
    </div>
  );
}

// ── Not found ─────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div
      className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4"
      data-ocid="lyric-detail-not-found"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
        <BookOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="font-display text-3xl text-foreground">Song not found</h2>
      <p className="text-muted-foreground max-w-sm mx-auto">
        This lyric may have been removed or the link is no longer valid.
      </p>
      <Link to="/" search={{ q: "", genre: "", year: "All" }}>
        <Button variant="outline" className="mt-2 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Browse all lyrics
        </Button>
      </Link>
    </div>
  );
}

// ── Main content ──────────────────────────────────────────────────────────────

interface LyricContentProps {
  lyric: LyricEntry;
  isOwner: boolean;
}

function LyricContent({ lyric, isOwner }: LyricContentProps) {
  const views = mockViewCount(lyric.id);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link");
    }
  };

  // Split into stanzas on double-newline; preserve single-line breaks within stanza
  const stanzas = lyric.lyrics
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen" data-ocid="lyric-detail">
      {/* Sticky top band */}
      <div className="bg-card border-b shadow-subtle">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            search={{ q: "", genre: "", year: "All" }}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Back to catalog"
            data-ocid="lyric-detail-back-btn"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="font-display text-base font-semibold text-foreground truncate">
              {lyric.title}
            </p>
            <p className="text-xs text-muted-foreground">{lyric.artist}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              aria-label="Share lyrics"
              data-ocid="lyric-detail-share-btn"
              className="text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            {isOwner && (
              <Link to="/edit/$id" params={{ id: lyric.id.toString() }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-border text-foreground hover:bg-muted transition-smooth"
                  data-ocid="lyric-detail-edit-btn"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-3xl space-y-10">
        {/* Hero header */}
        <motion.header
          className="space-y-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1
            className="font-display text-4xl sm:text-5xl leading-tight tracking-tight text-foreground"
            data-ocid="lyric-detail-title"
          >
            {lyric.title}
          </h1>

          {/* Artist / album / year row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-body">
            <span
              className="flex items-center gap-1.5 text-lg font-semibold"
              style={{ color: "oklch(var(--primary))" }}
            >
              <User className="h-4 w-4" />
              {lyric.artist}
            </span>
            {lyric.album && (
              <span className="flex items-center gap-1.5 text-base text-muted-foreground">
                <Music2 className="h-3.5 w-3.5 opacity-70" />
                {lyric.album}
              </span>
            )}
            {lyric.year && (
              <span className="flex items-center gap-1.5 text-base text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 opacity-70" />
                {lyric.year}
              </span>
            )}
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2">
            {lyric.genre && (
              <Badge
                variant="secondary"
                className="text-xs tracking-wide uppercase"
                data-ocid="lyric-detail-genre-badge"
              >
                {lyric.genre}
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-xs gap-1.5 border-border text-muted-foreground"
              data-ocid="lyric-detail-views-badge"
            >
              <Eye className="h-3 w-3" />
              {formatViews(views)} views
            </Badge>
          </div>
        </motion.header>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ background: "oklch(var(--border) / 0.5)" }}
          aria-hidden
        />

        {/* Lyrics body — parchment card */}
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          aria-label="Song lyrics"
          data-ocid="lyric-detail-content"
        >
          <div
            className="rounded-xl overflow-hidden shadow-lg"
            style={{ border: "1px solid oklch(var(--border) / 0.4)" }}
          >
            {/* Parchment area */}
            <div
              className="px-8 sm:px-12 py-10 space-y-6"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.88 0.055 68) 0%, oklch(0.83 0.045 55) 60%, oklch(0.78 0.04 48) 100%)",
              }}
            >
              {stanzas.map((stanza) => (
                <p
                  key={stanza.slice(0, 32)}
                  className="font-display text-xl sm:text-2xl leading-relaxed tracking-tight whitespace-pre-line"
                  style={{ color: "oklch(0.18 0.04 30)" }}
                >
                  {stanza}
                </p>
              ))}
            </div>

            {/* Parchment footer strip */}
            <div
              className="px-8 sm:px-12 py-4 flex flex-wrap gap-x-5 gap-y-1"
              style={{ background: "oklch(0.76 0.055 55)" }}
            >
              <p
                className="text-xs font-mono"
                style={{ color: "oklch(0.30 0.06 38)" }}
              >
                Mpihira:{" "}
                <strong style={{ color: "oklch(0.18 0.04 30)" }}>
                  {lyric.artist}
                </strong>
                {lyric.album && (
                  <>
                    {" "}
                    · Album:{" "}
                    <strong style={{ color: "oklch(0.18 0.04 30)" }}>
                      {lyric.album}
                    </strong>
                  </>
                )}
              </p>
              <p
                className="text-xs font-mono"
                style={{ color: "oklch(0.30 0.06 38)" }}
              >
                Lirik nampidirin'i:{" "}
                <strong style={{ color: "oklch(0.18 0.04 30)" }}>
                  {lyric.contributor}
                </strong>
              </p>
            </div>
          </div>
        </motion.article>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ background: "oklch(var(--border) / 0.5)" }}
          aria-hidden
        />

        {/* Contributor attribution card */}
        <motion.section
          className="rounded-lg px-6 py-5 space-y-1"
          style={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border) / 0.45)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          aria-label="Contributor information"
          data-ocid="lyric-detail-attribution"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            Shared by{" "}
            <span className="font-semibold text-foreground">
              {lyric.contributor}
            </span>{" "}
            on{" "}
            <span className="text-foreground">
              {formatDate(lyric.createdAt)}
            </span>
          </p>
          {lyric.updatedAt !== lyric.createdAt && (
            <p className="text-xs text-muted-foreground">
              Last updated {formatDate(lyric.updatedAt)}
            </p>
          )}
        </motion.section>
      </div>
    </div>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────

export function LyricDetailPage() {
  const { id } = useParams({ from: "/lyrics/$id" });
  const lyricId = BigInt(id);
  const { data: lyric, isLoading } = useLyric(lyricId);
  const { identity } = useInternetIdentity();

  // Owner check: compare contributorId (stored principal text) against logged-in principal
  const principalText = identity?.getPrincipal().toText();
  const isOwner = Boolean(
    lyric && principalText && lyric.contributorId === principalText,
  );

  if (isLoading) return <LoadingSkeleton />;
  if (!lyric) return <NotFound />;

  return <LyricContent lyric={lyric} isOwner={isOwner} />;
}
