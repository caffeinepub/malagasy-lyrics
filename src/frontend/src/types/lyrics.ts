export type SortOrder =
  | { __kind__: "Newest" }
  | { __kind__: "Oldest" }
  | { __kind__: "Alphabetical" };

export interface SearchParams {
  query: string;
  artist?: string;
  genre?: string;
  sortOrder?: SortOrder;
}

export interface LyricEntry {
  id: bigint;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre?: string;
  lyrics: string;
  contributor: string;
  contributorId: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface LyricInput {
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre?: string;
  lyrics: string;
}

export interface ArtistInfo {
  name: string;
  songCount: number;
}
