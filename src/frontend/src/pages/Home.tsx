import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useArtists, useLyrics, useSearchLyrics } from "@/hooks/useLyrics";
import type { LyricEntry, SortOrder } from "@/types/lyrics";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  BookOpen,
  Bookmark,
  ChevronRight,
  Clock,
  Eye,
  Filter,
  Music2,
  Play,
  Search,
  Share2,
  SortAsc,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GENRES = [
  "All",
  "Salegy",
  "Tsapiky",
  "Hira Gasy",
  "Valiha",
  "Folk",
  "Jazz",
  "Pop",
];

const YEARS = ["All", "2020s", "2010s", "2000s", "1990s", "1980s", "Classic"];

// ── Compact lyric card (grid & recent row) ───────────────────────────────────
function LyricCardCompact({ lyric }: { lyric: LyricEntry }) {
  const preview = (lyric.lyrics ?? "").split("\n").slice(0, 2).join("\n");
  return (
    <Link
      to="/lyrics/$id"
      params={{ id: lyric.id.toString() }}
      className="card-compact group block animate-fade-in flex-shrink-0"
      data-ocid={`lyric-card-${lyric.id}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="text-xs font-medium truncate text-primary">
            {lyric.artist}
          </p>
          <h3 className="font-display font-semibold text-foreground truncate leading-snug">
            {lyric.title}
          </h3>
        </div>
        <Bookmark className="w-4 h-4 shrink-0 mt-0.5 transition-colors group-hover:fill-current text-primary" />
      </div>
      {lyric.album && (
        <p className="text-xs text-muted-foreground mb-1 truncate">
          {lyric.album}
        </p>
      )}
      <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed whitespace-pre-line">
        {preview}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-semibold text-xs bg-primary/20 text-primary">
          {(lyric.contributor ?? "").charAt(0).toUpperCase() || "?"}
        </div>
        <span className="text-muted-foreground text-xs truncate flex-1">
          {lyric.contributor}
        </span>
        {lyric.year && (
          <span className="text-muted-foreground text-[10px] shrink-0">
            {lyric.year}
          </span>
        )}
      </div>
    </Link>
  );
}

// ── Horizontal scroll card (recently shared row) ─────────────────────────────
function RecentCard({ lyric }: { lyric: LyricEntry }) {
  return (
    <Link
      to="/lyrics/$id"
      params={{ id: lyric.id.toString() }}
      className="flex-shrink-0 w-52 bg-card rounded-xl border p-4 hover:border-primary/40 transition-smooth group cursor-pointer"
      style={{ borderColor: "oklch(var(--border) / 0.4)" }}
      data-ocid={`recent-card-${lyric.id}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground truncate">
            {lyric.artist}
          </p>
          <h4 className="font-display font-semibold text-sm text-foreground truncate leading-snug mt-0.5">
            {lyric.title}
          </h4>
        </div>
        <Bookmark
          className="w-3.5 h-3.5 shrink-0 mt-1 transition-colors"
          style={{ color: "oklch(var(--primary) / 0.7)" }}
        />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
          style={{
            background: "oklch(var(--secondary))",
            color: "oklch(var(--foreground))",
          }}
        >
          {(lyric.contributor ?? "").charAt(0).toUpperCase() || "?"}
        </div>
        <span className="text-muted-foreground text-xs truncate">
          {lyric.contributor}
        </span>
      </div>
    </Link>
  );
}

// ── Full song row card (search results list view) ────────────────────────────
function SongRowCard({ lyric, index }: { lyric: LyricEntry; index: number }) {
  const snippet = (lyric.lyrics ?? "").split("\n")[0] ?? "";
  return (
    <Link
      to="/lyrics/$id"
      params={{ id: lyric.id.toString() }}
      className="group flex items-start gap-4 bg-card border rounded-xl p-4 hover:border-primary/40 transition-smooth animate-fade-in"
      style={{
        borderColor: "oklch(var(--border) / 0.4)",
        animationDelay: `${index * 0.05}s`,
      }}
      data-ocid={`song-row-${lyric.id}`}
    >
      {/* Number / rank */}
      <div className="w-8 shrink-0 text-muted-foreground text-sm font-mono text-center pt-0.5">
        {index + 1}
      </div>

      {/* Avatar initial */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-display font-bold text-lg"
        style={{
          background: "oklch(var(--primary) / 0.15)",
          color: "oklch(var(--primary))",
        }}
      >
        {(lyric.artist ?? "").charAt(0).toUpperCase() || "?"}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className="font-display font-semibold text-foreground leading-snug truncate">
            {lyric.title}
          </h3>
          {lyric.genre && (
            <Badge variant="secondary" className="text-[10px] shrink-0">
              {lyric.genre}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{lyric.artist}</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1 italic opacity-70">
          {snippet}
        </p>
      </div>

      {/* Meta */}
      <div className="text-right shrink-0 space-y-1">
        {lyric.year && (
          <p className="text-xs text-muted-foreground">{lyric.year}</p>
        )}
        <div className="flex items-center gap-1 text-muted-foreground justify-end">
          <Eye className="w-3 h-3" />
          <span className="text-xs">{100 + Number(lyric.id % 900n)}</span>
        </div>
        <p className="text-xs text-muted-foreground truncate max-w-[100px]">
          {lyric.contributor}
        </p>
      </div>
    </Link>
  );
}

// ── Artist card (sidebar) ────────────────────────────────────────────────────
function ArtistCard({ name, songCount }: { name: string; songCount: number }) {
  return (
    <Link
      to="/"
      search={{ q: name, genre: "", year: "All" }}
      className="flex flex-col items-center gap-2 group"
      data-ocid={`artist-card-${(name ?? "").toLowerCase().replace(/\s/g, "-")}`}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-2xl transition-transform group-hover:scale-105 border-2"
        style={{
          background: "oklch(var(--primary) / 0.15)",
          color: "oklch(var(--primary))",
          borderColor: "oklch(var(--primary) / 0.25)",
        }}
      >
        {(name ?? "").charAt(0).toUpperCase() || "?"}
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-foreground truncate max-w-[72px]">
          {name}
        </p>
      </div>
      <p className="text-[10px] text-muted-foreground">
        {songCount} {songCount === 1 ? "song" : "songs"}
      </p>
    </Link>
  );
}

// ── Featured Lyric Card (parchment hero) ─────────────────────────────────────
function FeaturedCard({ lyric }: { lyric: LyricEntry }) {
  const verses = (lyric.lyrics ?? "").split("\n\n").slice(0, 2);
  return (
    <Link
      to="/lyrics/$id"
      params={{ id: lyric.id.toString() }}
      className="block group"
      data-ocid="featured-lyric"
    >
      <div
        className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-smooth border"
        style={{ borderColor: "oklch(var(--border) / 0.3)" }}
      >
        {/* Parchment area */}
        <div
          className="relative min-h-[240px] p-7 pb-14"
          style={{
            background:
              "linear-gradient(145deg, oklch(0.88 0.06 65) 0%, oklch(0.83 0.05 55) 55%, oklch(0.79 0.04 45) 100%)",
          }}
        >
          {/* Play button top-right */}
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
            style={{ background: "oklch(var(--primary) / 0.5)" }}
            aria-label="Play"
          >
            <Play className="w-4 h-4" style={{ color: "oklch(0.12 0 0)" }} />
          </button>

          <div className="space-y-4 pr-12">
            {verses.map((verse) => (
              <p
                key={verse.slice(0, 30)}
                className="font-display text-lg md:text-xl leading-relaxed"
                style={{ color: "oklch(0.18 0.04 30)" }}
              >
                {verse.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* Metadata bar */}
        <div
          className="px-7 py-4 flex items-center justify-between"
          style={{ background: "oklch(0.77 0.065 55)" }}
        >
          <div>
            <p
              className="font-mono text-xs"
              style={{ color: "oklch(0.35 0.06 40)" }}
            >
              Mpihira:{" "}
              <strong
                className="font-bold"
                style={{ color: "oklch(0.18 0.04 30)" }}
              >
                {lyric.artist}
              </strong>
            </p>
            <p
              className="font-mono text-xs mt-0.5"
              style={{ color: "oklch(0.35 0.06 40)" }}
            >
              Lirik nampidirin'i:{" "}
              <strong
                className="font-bold"
                style={{ color: "oklch(0.18 0.04 30)" }}
              >
                {lyric.contributor}
              </strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "oklch(0.55 0.06 50 / 0.5)" }}
              aria-label="Favorite"
            >
              <Star
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.18 0.04 30)" }}
              />
            </button>
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "oklch(0.55 0.06 50 / 0.5)" }}
              aria-label="Share"
            >
              <Share2
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.18 0.04 30)" }}
              />
            </button>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
              style={{ background: "oklch(var(--primary))" }}
            >
              <Play className="w-4 h-4" style={{ color: "oklch(0.12 0 0)" }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function HomePage() {
  const {
    q = "",
    genre = "",
    year: yearParam = "All",
  } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [localQ, setLocalQ] = useState(q);
  const [activeGenre, setActiveGenre] = useState(genre === "" ? "All" : genre);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "alpha">(
    "newest",
  );
  const [selectedYear, setSelectedYear] = useState(yearParam);
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  // Debounce URL sync
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      navigate({
        search: {
          q: localQ,
          genre: activeGenre === "All" ? "" : activeGenre,
          year: selectedYear,
        },
      });
    }, 350);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [localQ, activeGenre, selectedYear, navigate]);

  const isSearching =
    localQ.trim().length > 0 || activeGenre !== "All" || selectedYear !== "All";

  const { data: allLyricsRaw, isLoading } = useLyrics();
  const allLyrics = allLyricsRaw as LyricEntry[] | undefined;
  const { data: searchResultsRaw, isLoading: isSearchLoading } =
    useSearchLyrics({
      query: localQ,
      artist: undefined,
      genre: activeGenre !== "All" ? activeGenre : undefined,
      sortOrder:
        sortOrder === "newest"
          ? { __kind__: "Newest" }
          : sortOrder === "oldest"
            ? { __kind__: "Oldest" }
            : { __kind__: "Alphabetical" },
    });
  const searchResults = searchResultsRaw as LyricEntry[] | undefined;
  const { data: artistsRaw } = useArtists();
  const artists = artistsRaw as
    | import("@/types/lyrics").ArtistInfo[]
    | undefined;

  const rawResults = isSearching ? (searchResults ?? []) : (allLyrics ?? []);

  // Client-side year filter
  const displayLyrics =
    selectedYear === "All"
      ? rawResults
      : rawResults.filter((l) => {
          if (!l.year) return false;
          if (selectedYear === "2020s") return l.year >= 2020;
          if (selectedYear === "2010s") return l.year >= 2010 && l.year < 2020;
          if (selectedYear === "2000s") return l.year >= 2000 && l.year < 2010;
          if (selectedYear === "1990s") return l.year >= 1990 && l.year < 2000;
          if (selectedYear === "1980s") return l.year >= 1980 && l.year < 1990;
          if (selectedYear === "Classic") return l.year < 1980;
          return true;
        });

  // Client-side sort for display
  const sortedLyrics = [...displayLyrics].sort((a, b) => {
    if (sortOrder === "alpha")
      return (a.title ?? "").localeCompare(b.title ?? "");
    if (sortOrder === "oldest")
      return Number(a.createdAt) - Number(b.createdAt);
    return Number(b.createdAt) - Number(a.createdAt);
  });

  const featuredLyric = allLyrics?.[0];
  const recentLyrics = allLyrics?.slice(0, 8) ?? [];

  return (
    <div className="min-h-screen">
      {/* ── Search bar (sticky) ─────────────────────────────────────────── */}
      <div
        className="bg-card border-b sticky top-16 z-40"
        style={{ borderColor: "oklch(var(--border) / 0.5)" }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={localQ}
              onChange={(e) => setLocalQ(e.target.value)}
              placeholder="Search songs, artists, contributors…"
              className="pl-10 pr-4 bg-muted/50 border-border/30 h-11 rounded-xl focus-visible:ring-1"
              data-ocid="search-input"
            />
          </div>

          {/* Separator */}
          <div className="hidden md:flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />

            {/* Genre select */}
            <Select value={activeGenre} onValueChange={setActiveGenre}>
              <SelectTrigger
                className="w-32 h-9 text-sm bg-muted/50 border-border/30"
                data-ocid="genre-select"
              >
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year select */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger
                className="w-28 h-9 text-sm bg-muted/50 border-border/30"
                data-ocid="year-select"
              >
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort select */}
            <Select
              value={sortOrder}
              onValueChange={(v) => setSortOrder(v as typeof sortOrder)}
            >
              <SelectTrigger
                className="w-32 h-9 text-sm bg-muted/50 border-border/30"
                data-ocid="sort-select"
              >
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Most recent
                  </span>
                </SelectItem>
                <SelectItem value="oldest">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Oldest
                  </span>
                </SelectItem>
                <SelectItem value="alpha">
                  <span className="flex items-center gap-1.5">
                    <SortAsc className="w-3.5 h-3.5" />
                    Alphabetical
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {!isSearching ? (
          /* ── Default view: featured + recent + sidebar ─────────────── */
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
            {/* ── Left: featured lyric + recently shared ─────────────── */}
            <div className="space-y-8">
              {/* Featured lyric hero */}
              <section className="animate-fade-up">
                {isLoading ? (
                  <Skeleton className="h-72 w-full rounded-xl" />
                ) : featuredLyric ? (
                  <FeaturedCard lyric={featuredLyric} />
                ) : null}
              </section>

              {/* Recently Shared — horizontal scroll row */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Recently Shared Lyrics
                  </h2>
                  <button
                    type="button"
                    onClick={() => setLocalQ(" ")}
                    className="text-sm hover:underline transition-colors"
                    style={{ color: "oklch(var(--primary))" }}
                    data-ocid="see-all-lyrics"
                  >
                    See all
                  </button>
                </div>
                {isLoading ? (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {(["a", "b", "c", "d", "e"] as const).map((k) => (
                      <Skeleton
                        key={k}
                        className="w-52 h-32 shrink-0 rounded-xl"
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="flex gap-3 overflow-x-auto pb-2"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {recentLyrics.map((l) => (
                      <RecentCard key={l.id.toString()} lyric={l} />
                    ))}
                  </div>
                )}
              </section>

              {/* All songs grid */}
              <section>
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  All Songs
                </h2>
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
                      <Skeleton key={k} className="h-40 rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(allLyrics ?? []).map((l) => (
                      <LyricCardCompact key={l.id.toString()} lyric={l} />
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className="space-y-5">
              {/* Stats panel */}
              <div
                className="bg-card border rounded-xl p-5 space-y-4 animate-fade-up"
                style={{
                  borderColor: "oklch(var(--border) / 0.4)",
                  animationDelay: "0.1s",
                }}
              >
                <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Library
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    {
                      icon: BookOpen,
                      label: "Songs",
                      value: allLyrics?.length ?? 0,
                    },
                    {
                      icon: Users,
                      label: "Artists",
                      value: artists?.length ?? 0,
                    },
                    { icon: Music2, label: "Genres", value: GENRES.length - 1 },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-muted/40 rounded-lg p-3">
                      <Icon
                        className="w-4 h-4 mx-auto mb-1"
                        style={{ color: "oklch(var(--primary))" }}
                      />
                      <p className="text-lg font-display font-bold text-foreground">
                        {value}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div
                className="rounded-xl p-5 animate-fade-up"
                style={{
                  background: "oklch(var(--primary) / 0.12)",
                  borderColor: "oklch(var(--primary) / 0.3)",
                  border: "1px solid",
                  animationDelay: "0.15s",
                }}
              >
                <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                  Share Lyrics
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Help preserve Malagasy music culture by contributing song
                  lyrics.
                </p>
                <Link to="/submit">
                  <Button
                    size="sm"
                    className="w-full font-medium"
                    data-ocid="submit-lyrics-cta"
                  >
                    Contribute Lyrics
                  </Button>
                </Link>
              </div>

              {/* Explore Artists */}
              <div
                className="bg-card border rounded-xl p-5 animate-fade-up"
                style={{
                  borderColor: "oklch(var(--border) / 0.4)",
                  animationDelay: "0.2s",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Explore Artists
                  </h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-3 gap-y-5 gap-x-2">
                  {(artists ?? []).slice(0, 6).map((a) => (
                    <ArtistCard
                      key={a.name}
                      name={a.name}
                      songCount={a.songCount}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* ── Search results view ──────────────────────────────────── */
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {isSearchLoading
                    ? "Searching…"
                    : `${sortedLyrics.length} result${sortedLyrics.length !== 1 ? "s" : ""}`}
                </h2>
                {localQ && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    for{" "}
                    <span className="text-foreground font-medium">
                      "{localQ}"
                    </span>
                    {activeGenre !== "All" && (
                      <>
                        {" "}
                        ·{" "}
                        <span style={{ color: "oklch(var(--primary))" }}>
                          {activeGenre}
                        </span>
                      </>
                    )}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setLocalQ("");
                  setActiveGenre("All");
                  setSelectedYear("All");
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg bg-muted/40 hover:bg-muted/70"
                data-ocid="clear-search"
              >
                Clear all filters
              </button>
            </div>

            {isSearchLoading ? (
              <div className="space-y-3">
                {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
                  <Skeleton key={k} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : sortedLyrics.length === 0 ? (
              <div className="text-center py-24" data-ocid="empty-search">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-5">
                  <Search className="w-8 h-8 text-muted-foreground/40" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No lyrics found
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  No songs matched your filters. Try a different search term,
                  artist name, or browse all genres.
                </p>
                <Button
                  variant="outline"
                  className="mt-5"
                  onClick={() => {
                    setLocalQ("");
                    setActiveGenre("All");
                    setSelectedYear("All");
                  }}
                  data-ocid="empty-search-cta"
                >
                  Browse all lyrics
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {sortedLyrics.map((l, i) => (
                  <SongRowCard key={l.id.toString()} lyric={l} index={i} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
