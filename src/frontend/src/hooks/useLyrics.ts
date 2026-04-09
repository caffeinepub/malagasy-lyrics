import { createActor } from "@/backend";
import type {
  ArtistInfo,
  LyricEntry,
  LyricInput,
  SearchParams,
} from "@/types/lyrics";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = any;

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

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

/**
 * Submit a new lyric. The backend returns LyricId (bigint), not a LyricEntry.
 * Use the returned id to navigate to /lyrics/$id.
 */
export function useSubmitLyric() {
  const { actor } = useActor(createActor);
  const backend = actor as AnyActor;
  const qc = useQueryClient();
  return useMutation<bigint, Error, LyricInput>({
    mutationFn: async (input: LyricInput): Promise<bigint> => {
      if (!backend?.submitLyric) {
        throw new Error("Backend not available");
      }
      const id = await backend.submitLyric(input);
      return id as bigint;
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
  return useMutation<boolean, Error, { id: bigint; input: LyricInput }>({
    mutationFn: async ({ id, input }): Promise<boolean> => {
      if (!backend?.updateLyric) return false;
      return (await backend.updateLyric(id, input)) as boolean;
    },
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ["lyrics"] });
      qc.invalidateQueries({ queryKey: ["lyric", id.toString()] });
    },
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function buildArtistMap(lyrics: LyricEntry[]): ArtistInfo[] {
  const map: Record<string, number> = {};
  for (const l of lyrics) {
    map[l.artist] = (map[l.artist] ?? 0) + 1;
  }
  return Object.entries(map).map(([name, songCount]) => ({ name, songCount }));
}
