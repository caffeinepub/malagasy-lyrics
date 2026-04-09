// ── Music Store Types ────────────────────────────────────────────────────────
import type { ExternalBlob } from "@/backend";

export interface TrackView {
  id: string;
  title: string;
  artist: string;
  album: string;
  priceUSD: number;
  audioFile: string;
  coverImage: string;
  published: boolean;
  sellerId: string;
  sellerName: string;
  createdAt: bigint;
  viewCount: bigint;
}

export interface TrackInput {
  title: string;
  artist: string;
  album: string;
  priceUSD: number;
  audioFile: ExternalBlob;
  coverImage: ExternalBlob;
  sellerName: string;
}

export type SortOrder =
  | "newest"
  | "oldest"
  | "titleAsc"
  | "titleDesc"
  | "priceAsc"
  | "priceDesc";

export interface MusicSearchParams {
  searchText?: string;
  artist?: string;
  sortOrder?: SortOrder;
}

export interface PurchaseRecord {
  id: string;
  trackId: string;
  buyerId: string;
  sellerName: string;
  trackTitle: string;
  priceUSD: number;
  purchasedAt: bigint;
}
