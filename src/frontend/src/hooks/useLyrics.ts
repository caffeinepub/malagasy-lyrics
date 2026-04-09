import { createActor } from "@/backend";
import type { LyricEntry, LyricInput, SearchParams } from "@/types/lyrics";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      if (!backend?.listLyrics) return [];
      try {
        const result = (await backend.listLyrics()) as LyricEntry[];
        return result ?? [];
      } catch {
        return [];
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
      if (!backend?.getLyric) return undefined;
      try {
        const result = await backend.getLyric(id);
        return (result as LyricEntry) ?? undefined;
      } catch {
        return undefined;
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
      if (!backend?.searchLyrics) return [];
      try {
        return (await backend.searchLyrics(params)) as LyricEntry[];
      } catch {
        return [];
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
      if (!backend?.listArtists) return [];
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
        return [];
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

// Keep export for any external usage
export { buildArtistMap };

export interface ArtistInfo {
  name: string;
  songCount: number;
}
