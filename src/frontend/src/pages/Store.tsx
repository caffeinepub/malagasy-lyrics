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
import { useTracks } from "@/hooks/useMusic";
import type { SortOrder, TrackView } from "@/types/music";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  Disc3,
  Music,
  Play,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

function TrackCard({ track }: { track: TrackView }) {
  return (
    <Link
      to="/store/$id"
      params={{ id: track.id }}
      className="card-music-store group block"
      data-ocid={`track-card-${track.id}`}
    >
      {/* Cover art */}
      <div className="aspect-square relative overflow-hidden bg-muted/30">
        {track.coverImage ? (
          <img
            src={track.coverImage}
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "oklch(var(--primary) / 0.15)" }}
            >
              <Disc3
                className="w-10 h-10"
                style={{ color: "oklch(var(--primary) / 0.6)" }}
              />
            </div>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="music-card-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: "oklch(var(--primary))" }}
          >
            <Play
              className="w-5 h-5 ml-0.5"
              style={{ color: "oklch(0.12 0 0)" }}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-track-title truncate">{track.title}</h3>
        <p className="text-track-artist mt-0.5 truncate">{track.artist}</p>
        {track.album && (
          <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">
            {track.album}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span
            className="text-base font-display font-bold"
            style={{ color: "oklch(var(--primary))" }}
          >
            ${track.priceUSD.toFixed(2)}
          </span>
          <Badge
            variant="secondary"
            className="text-[10px] border"
            style={{ borderColor: "oklch(var(--border) / 0.3)" }}
          >
            Buy
          </Badge>
        </div>
      </div>
    </Link>
  );
}

function StoreHero() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-8"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.165 0 0) 0%, oklch(0.22 0.04 65) 60%, oklch(0.165 0 0) 100%)",
        border: "1px solid oklch(var(--primary) / 0.2)",
      }}
    >
      <div className="relative z-10 px-8 py-10 md:py-12">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag
            className="w-5 h-5"
            style={{ color: "oklch(var(--primary))" }}
          />
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "oklch(var(--primary))" }}
          >
            Music Store
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-3">
          Discover & Support
          <br />
          Malagasy Artists
        </h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Purchase authentic Malagasy music directly from the artists who create
          it. Every purchase supports local talent.
        </p>
      </div>
      {/* Decorative circles */}
      <div
        className="absolute -right-12 -top-12 w-64 h-64 rounded-full opacity-10"
        style={{ background: "oklch(var(--primary))" }}
      />
      <div
        className="absolute -right-4 -bottom-8 w-40 h-40 rounded-full opacity-5"
        style={{ background: "oklch(var(--primary))" }}
      />
    </div>
  );
}

export function StorePage() {
  const {
    q = "",
    artist = "",
    sort = "newest",
  } = useSearch({
    from: "/store",
  });
  const navigate = useNavigate({ from: "/store" });
  const [localQ, setLocalQ] = useState(q);

  const sortOrder = sort as SortOrder;
  const { data: tracks, isLoading } = useTracks({
    searchText: localQ,
    artist,
    sortOrder,
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({ search: { q: localQ, artist, sort } });
  }

  function handleSort(newSort: string) {
    navigate({ search: { q: localQ, artist, sort: newSort } });
  }

  const isEmpty = !isLoading && (!tracks || tracks.length === 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <StoreHero />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            placeholder="Search tracks, artists…"
            className="pl-10 bg-muted/50 border-border/30 h-11 rounded-xl"
            data-ocid="store-search"
          />
        </form>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
          <Select value={sort} onValueChange={handleSort}>
            <SelectTrigger
              className="w-44 h-11 bg-muted/50 border-border/30"
              data-ocid="store-sort"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="titleAsc">Title A→Z</SelectItem>
              <SelectItem value="titleDesc">Title Z→A</SelectItem>
              <SelectItem value="priceAsc">Price low→high</SelectItem>
              <SelectItem value="priceDesc">Price high→low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : isEmpty ? (
        <div
          className="text-center py-24 rounded-2xl"
          style={{ background: "oklch(var(--muted) / 0.15)" }}
          data-ocid="store-empty"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "oklch(var(--primary) / 0.1)" }}
          >
            <Music
              className="w-7 h-7"
              style={{ color: "oklch(var(--primary) / 0.5)" }}
            />
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            No tracks yet
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
            Be the first to share your Malagasy music. Sign in and list your
            tracks in the store.
          </p>
          <Link to="/seller">
            <Button data-ocid="store-empty-sell-cta">Start Selling</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {(tracks ?? []).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      )}
    </div>
  );
}
