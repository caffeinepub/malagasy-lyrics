import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./backend-CB2cqg7Z.js";
import { i as useQueryClient } from "./index-CuwG8XZl.js";
function useLyrics() {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor;
  return useQuery({
    queryKey: ["lyrics"],
    queryFn: async () => {
      if (!(backend == null ? void 0 : backend.listLyrics)) return [];
      try {
        const result = await backend.listLyrics();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 3e4
  });
}
function useLyric(id) {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor;
  return useQuery({
    queryKey: ["lyric", id.toString()],
    queryFn: async () => {
      if (!(backend == null ? void 0 : backend.getLyric)) return void 0;
      try {
        const result = await backend.getLyric(id);
        return result ?? void 0;
      } catch {
        return void 0;
      }
    },
    enabled: !isFetching && id !== void 0,
    staleTime: 3e4
  });
}
function useSearchLyrics(params) {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor;
  return useQuery({
    queryKey: ["lyrics", "search", params],
    queryFn: async () => {
      if (!(backend == null ? void 0 : backend.searchLyrics)) return [];
      try {
        return await backend.searchLyrics(params);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 15e3
  });
}
function useArtists() {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor;
  return useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      if (!(backend == null ? void 0 : backend.listArtists)) return [];
      try {
        const raw = await backend.listArtists();
        if (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === "string") {
          return raw.map((name) => ({ name, songCount: 0 }));
        }
        return raw;
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function useSubmitLyric() {
  const { actor } = useActor(createActor);
  const backend = actor;
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!(backend == null ? void 0 : backend.submitLyric)) {
        return {
          ...input,
          id: BigInt(Date.now()),
          contributor: "",
          contributorId: "",
          createdAt: BigInt(Date.now()),
          updatedAt: BigInt(Date.now())
        };
      }
      return await backend.submitLyric(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lyrics"] });
      qc.invalidateQueries({ queryKey: ["artists"] });
    }
  });
}
function useUpdateLyric() {
  const { actor } = useActor(createActor);
  const backend = actor;
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!(backend == null ? void 0 : backend.updateLyric)) {
        return {
          ...input,
          id,
          contributor: "",
          contributorId: "",
          createdAt: BigInt(Date.now()),
          updatedAt: BigInt(Date.now())
        };
      }
      return await backend.updateLyric(id, input);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["lyrics"] });
      qc.invalidateQueries({ queryKey: ["lyric", data.id.toString()] });
    }
  });
}
export {
  useSearchLyrics as a,
  useArtists as b,
  useLyric as c,
  useSubmitLyric as d,
  useUpdateLyric as e,
  useLyrics as u
};
