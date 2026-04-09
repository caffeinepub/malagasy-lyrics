import { createActor } from "@/backend";
import type { LyricEntry, LyricInput, SearchParams } from "@/types/lyrics";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Sample / fallback data used when the actor isn't wired yet
// ---------------------------------------------------------------------------
const SAMPLE_LYRICS: LyricEntry[] = [
  {
    id: 1n,
    title: "Izy irery",
    artist: "D'Gary",
    album: "Malagasy Guitar",
    year: 1993,
    genre: "Tsapiky",
    lyrics:
      "Tomany, hitako ny masonao tomany,\nTsy kivy aho, fa mbola mitady fitiavana...\n\nTomany, hitako ny tropha soya hapo,\nTsy kivy aho, fa mbola kitady fitiavana,\nTsy kernani, fa mbola mitmana...",
    contributor: "Tsiry R.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 86400000),
    updatedAt: BigInt(Date.now() - 86400000),
  },
  {
    id: 2n,
    title: "Aho hitaho tmalanai",
    artist: "Jaojoby",
    album: "Salegy",
    year: 1998,
    genre: "Salegy",
    lyrics:
      "Aho hitaho tmalanai,\nNy fo mahafaly,\nMirindra ny hira,\nManambara ny fitiavana...",
    contributor: "Nivo M.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 172800000),
    updatedAt: BigInt(Date.now() - 172800000),
  },
  {
    id: 3n,
    title: "Yanisɔ chiltaana",
    artist: "Erick Manana",
    album: "Hira Gasy",
    year: 2001,
    genre: "Hira Gasy",
    lyrics:
      "Yanisɔ chiltaana, ny tany malala,\nFaritra manankarena, soa izay hita,\nMalagasy ny foko, tsy havela ho very...",
    contributor: "Ranja T.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 259200000),
    updatedAt: BigInt(Date.now() - 259200000),
  },
  {
    id: 4n,
    title: "Karv.am syehato",
    artist: "Rajery",
    album: "Valiha Sessions",
    year: 2005,
    genre: "Valiha",
    lyrics:
      "Karv.am syehato, ny zava-maneno,\nValiha miteny, ny fon'ny Malagasy,\nFihirana mamy, mahafinaritra...",
    contributor: "Haja L.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 345600000),
    updatedAt: BigInt(Date.now() - 345600000),
  },
  {
    id: 5n,
    title: "Tsy kivy",
    artist: "Mahaleo",
    album: "Feon'ny Mahaleo",
    year: 1990,
    genre: "Folk",
    lyrics:
      "Tsy kivy na dia sarotra aza,\nMitohy ny diako eo amin'ny lalana,\nNy fanantenana no mampijoro...",
    contributor: "Soa R.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 432000000),
    updatedAt: BigInt(Date.now() - 432000000),
  },
  {
    id: 6n,
    title: "Manina ny tanindrazana",
    artist: "Tarika Sammy",
    album: "Roots",
    year: 1994,
    genre: "Folk",
    lyrics:
      "Manina ny tanindrazana,\nFaritra malalaka, soa ny tany,\nMiarahaba ny mpiray tanindrazana...",
    contributor: "Kanto M.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 518400000),
    updatedAt: BigInt(Date.now() - 518400000),
  },
];

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = any;

export function useLyrics() {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor as AnyActor;
  return useQuery<LyricEntry[]>({
    queryKey: ["lyrics"],
    queryFn: async (): Promise<LyricEntry[]> => {
      if (!backend?.listLyrics) return SAMPLE_LYRICS;
      try {
        const result = (await backend.listLyrics()) as LyricEntry[];
        return result.length ? result : SAMPLE_LYRICS;
      } catch {
        return SAMPLE_LYRICS;
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useLyric(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor as AnyActor;
  return useQuery<LyricEntry | undefined>({
    queryKey: ["lyric", id.toString()],
    queryFn: async (): Promise<LyricEntry | undefined> => {
      if (!backend?.getLyric) {
        return SAMPLE_LYRICS.find((l) => l.id === id);
      }
      try {
        const result = await backend.getLyric(id);
        return (result as LyricEntry) ?? undefined;
      } catch {
        return SAMPLE_LYRICS.find((l) => l.id === id);
      }
    },
    enabled: !isFetching && id !== undefined,
    staleTime: 30_000,
  });
}

export function useSearchLyrics(params: SearchParams) {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor as AnyActor;
  return useQuery<LyricEntry[]>({
    queryKey: ["lyrics", "search", params],
    queryFn: async (): Promise<LyricEntry[]> => {
      const q = params.query.toLowerCase().trim();
      if (!backend?.searchLyrics) {
        if (!q && !params.artist && !params.genre) return SAMPLE_LYRICS;
        return SAMPLE_LYRICS.filter(
          (l) =>
            (!q ||
              l.title.toLowerCase().includes(q) ||
              l.artist.toLowerCase().includes(q) ||
              l.lyrics.toLowerCase().includes(q)) &&
            (!params.artist ||
              l.artist.toLowerCase().includes(params.artist.toLowerCase())) &&
            (!params.genre ||
              l.genre?.toLowerCase().includes(params.genre.toLowerCase())),
        );
      }
      try {
        return (await backend.searchLyrics(params)) as LyricEntry[];
      } catch {
        return SAMPLE_LYRICS;
      }
    },
    enabled: !isFetching,
    staleTime: 15_000,
  });
}

export function useArtists() {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor as AnyActor;
  return useQuery<ArtistInfo[]>({
    queryKey: ["artists"],
    queryFn: async (): Promise<ArtistInfo[]> => {
      if (!backend?.listArtists) {
        return buildArtistMap(SAMPLE_LYRICS);
      }
      try {
        const raw = await backend.listArtists();
        // Backend returns string[] (artist names); convert to ArtistInfo if needed
        if (
          Array.isArray(raw) &&
          raw.length > 0 &&
          typeof raw[0] === "string"
        ) {
          return (raw as string[]).map((name) => ({ name, songCount: 0 }));
        }
        return raw as ArtistInfo[];
      } catch {
        return buildArtistMap(SAMPLE_LYRICS);
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useSubmitLyric() {
  const { actor } = useActor(createActor);
  const backend = actor as AnyActor;
  const qc = useQueryClient();
  return useMutation<LyricEntry, Error, LyricInput>({
    mutationFn: async (input: LyricInput): Promise<LyricEntry> => {
      if (!backend?.submitLyric) {
        return {
          ...input,
          id: BigInt(Date.now()),
          contributor: "",
          contributorId: "",
          createdAt: BigInt(Date.now()),
          updatedAt: BigInt(Date.now()),
        } as LyricEntry;
      }
      return (await backend.submitLyric(input)) as LyricEntry;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lyrics"] });
      qc.invalidateQueries({ queryKey: ["artists"] });
    },
  });
}

export function useUpdateLyric() {
  const { actor } = useActor(createActor);
  const backend = actor as AnyActor;
  const qc = useQueryClient();
  return useMutation<LyricEntry, Error, { id: bigint; input: LyricInput }>({
    mutationFn: async ({ id, input }): Promise<LyricEntry> => {
      if (!backend?.updateLyric) {
        return {
          ...input,
          id,
          contributor: "",
          contributorId: "",
          createdAt: BigInt(Date.now()),
          updatedAt: BigInt(Date.now()),
        } as LyricEntry;
      }
      return (await backend.updateLyric(id, input)) as LyricEntry;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["lyrics"] });
      qc.invalidateQueries({ queryKey: ["lyric", data.id.toString()] });
    },
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildArtistMap(lyrics: LyricEntry[]): ArtistInfo[] {
  const map: Record<string, number> = {};
  for (const l of lyrics) {
    map[l.artist] = (map[l.artist] ?? 0) + 1;
  }
  return Object.entries(map).map(([name, songCount]) => ({ name, songCount }));
}

export interface ArtistInfo {
  name: string;
  songCount: number;
}
