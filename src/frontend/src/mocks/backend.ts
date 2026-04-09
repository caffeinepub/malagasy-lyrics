import type { backendInterface } from "../backend";

// No sample data — the app starts with an empty state.
// All entries must be created by the owner through the real interface.

export const mockBackend = {
  getLyric: async (_id: bigint) => null,
  listArtists: async () => [],
  listLyrics: async () => [],
  searchLyrics: async (_params: import("../backend").SearchParams) => [],
  submitLyric: async (_input: import("../backend").LyricInput) => BigInt(1),
  updateLyric: async (_id: bigint, _input: import("../backend").LyricInput) => true,
} as unknown as backendInterface;
