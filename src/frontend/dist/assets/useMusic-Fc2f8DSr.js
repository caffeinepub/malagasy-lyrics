import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./backend-CB2cqg7Z.js";
import { i as useQueryClient } from "./index-CuwG8XZl.js";
function useTracks(params) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tracks", params],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const a = actor;
        if ((params == null ? void 0 : params.searchText) || (params == null ? void 0 : params.artist) || (params == null ? void 0 : params.sortOrder)) {
          const results2 = await a.searchTracks({
            searchText: params.searchText ?? "",
            artist: params.artist ?? "",
            sortOrder: params.sortOrder ?? "newest"
          });
          return results2;
        }
        const results = await a.listTracks();
        return results;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useTrack(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["track", id],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const a = actor;
        const result = await a.getTrack(id);
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useSellerTracks(sellerId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tracks", "seller", sellerId],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const a = actor;
        const results = await a.listSellerTracks(sellerId);
        return results;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sellerId
  });
}
function usePublishTrack() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      const id = await a.publishTrack(input);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tracks"] });
    }
  });
}
function useRepublishTrack() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (trackId) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      const result = await a.republishTrack(trackId);
      return result;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tracks"] });
    }
  });
}
function useUnpublishTrack() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (trackId) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      const result = await a.unpublishTrack(trackId);
      return result;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tracks"] });
    }
  });
}
function useEditTrack() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      await a.editTrack(id, input);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tracks"] });
      qc.invalidateQueries({ queryKey: ["track", vars.id] });
    }
  });
}
function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      trackId,
      trackTitle,
      priceUSD
    }) => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success?trackId=${trackId}`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      const a = actor;
      const result = await a.createCheckoutSession(
        [
          {
            currency: "usd",
            productName: trackTitle,
            productDescription: `Malagasy Lyrics – ${trackTitle}`,
            priceInCents: Math.round(priceUSD * 100),
            quantity: 1
          }
        ],
        successUrl,
        cancelUrl
      );
      const session = JSON.parse(result);
      if (!(session == null ? void 0 : session.url)) {
        throw new Error("Stripe session missing url");
      }
      return session;
    }
  });
}
function useRecordPurchase() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      trackId,
      sessionId
    }) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      const result = await a.recordTrackPurchase(sessionId, trackId);
      return result;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["purchases"] });
    }
  });
}
export {
  useTrack as a,
  useCreateCheckoutSession as b,
  useSellerTracks as c,
  usePublishTrack as d,
  useEditTrack as e,
  useUnpublishTrack as f,
  useRepublishTrack as g,
  useRecordPurchase as h,
  useTracks as u
};
