import type { backendInterface } from "../backend";
import { SortOrder__1 } from "../backend";

const sampleLyrics = [
  {
    id: BigInt(1),
    title: "Ampela Tsara",
    artist: "D'Gary",
    album: "Malagasy Guitar",
    yearReleased: BigInt(1993),
    lyrics:
      "Ampela tsara indrindra\nNy voninkazo eny an-tanety\nTomany, hitako ny masonao tomany\nTsy kivy aho, fa mbola mitady fitiavana...\n\nTomany, hitako ny tropha soya hapo\nTsy kivy aho, fa mbola kitady fitiavana\nTsy kernani, fa mbola mitmana...",
    notes: "Classic D'Gary acoustic guitar piece",
    contributorId: { toText: () => "user-1" } as unknown as import("../backend").UserId,
    contributorName: "Tsiry R.",
    submittedAt: BigInt(Date.now() * 1_000_000),
    viewCount: BigInt(342),
  },
  {
    id: BigInt(2),
    title: "Aho hitaho tmalanai",
    artist: "Jaojoby",
    album: "Salegy",
    yearReleased: BigInt(1998),
    lyrics:
      "Aho hitaho tmalanai\nNy fiainana mifanaraka\nSalegy sy ny hira malagasy\nManambara ny fanahy malagasy...",
    notes: "Traditional salegy rhythm",
    contributorId: { toText: () => "user-2" } as unknown as import("../backend").UserId,
    contributorName: "Ravo M.",
    submittedAt: BigInt(Date.now() * 1_000_000 - 86400000000000),
    viewCount: BigInt(218),
  },
  {
    id: BigInt(3),
    title: "Yaniзw chiltaana",
    artist: "Erick Manana",
    album: "Acoustique",
    yearReleased: BigInt(2005),
    lyrics:
      "Yaniзw chiltaana ny fo\nManiry ny fitiavana marina\nErick Manana ny mpihira\nNy feon-gitara mangina...",
    notes: "",
    contributorId: { toText: () => "user-3" } as unknown as import("../backend").UserId,
    contributorName: "Haja T.",
    submittedAt: BigInt(Date.now() * 1_000_000 - 172800000000000),
    viewCount: BigInt(156),
  },
  {
    id: BigInt(4),
    title: "Karv.am syehato",
    artist: "Rajery",
    album: "Velirano",
    yearReleased: BigInt(2001),
    lyrics:
      "Karv.am syehato ny fanantenana\nValiha sy ny feon'ny ala\nRajery mpihira malaza\nMalagasy tsy mba very...",
    notes: "Valiha-inspired composition",
    contributorId: { toText: () => "user-1" } as unknown as import("../backend").UserId,
    contributorName: "Tsiry R.",
    submittedAt: BigInt(Date.now() * 1_000_000 - 259200000000000),
    viewCount: BigInt(89),
  },
];

export const mockBackend = {
  getLyric: async (id: bigint) => sampleLyrics.find((l) => l.id === id) ?? null,
  listArtists: async () => ["D'Gary", "Jaojoby", "Erick Manana", "Rajery", "Rossy", "Tarika Sammy"],
  listLyrics: async () => sampleLyrics,
  searchLyrics: async (params: import("../backend").SearchParams) => {
    let results = [...sampleLyrics];
    if (params.searchText) {
      const q = params.searchText.toLowerCase();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.artist.toLowerCase().includes(q) ||
          l.lyrics.toLowerCase().includes(q)
      );
    }
    if (params.artistFilter) {
      results = results.filter((l) => l.artist === params.artistFilter);
    }
    if (params.yearFilter) {
      results = results.filter((l) => l.yearReleased === params.yearFilter);
    }
    if (params.sortOrder === SortOrder__1.alphabetical) {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (params.sortOrder === SortOrder__1.mostViewed) {
      results.sort((a, b) => Number(b.viewCount - a.viewCount));
    }
    return results;
  },
  submitLyric: async (_input: import("../backend").LyricInput) => BigInt(sampleLyrics.length + 1),
  updateLyric: async (_id: bigint, _input: import("../backend").LyricInput) => true,
} as unknown as backendInterface;
