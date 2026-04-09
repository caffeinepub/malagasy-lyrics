// SortOrder mirrors SortOrder__1 from backend.d.ts
export type SortOrder =
  | { __kind__: "mostRecent" }
  | { __kind__: "mostViewed" }
  | { __kind__: "alphabetical" };

export interface SearchParams {
  searchText: string;
  artistFilter?: string;
  yearFilter?: bigint;
  sortOrder: SortOrder;
}

// Mirrors backend.d.ts LyricEntry exactly
export interface LyricEntry {
  id: bigint;
  title: string;
  artist: string;
  album: string;
  yearReleased: bigint;
  lyrics: string;
  notes: string;
  contributorName: string;
  contributorId: { toString(): string };
  submittedAt: bigint;
  viewCount: bigint;
}

// Mirrors backend.d.ts LyricInput exactly
export interface LyricInput {
  title: string;
  artist: string;
  album: string;
  yearReleased: bigint;
  lyrics: string;
  notes: string;
}

export interface ArtistInfo {
  name: string;
  songCount: number;
}
