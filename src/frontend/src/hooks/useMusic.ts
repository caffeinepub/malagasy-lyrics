import { createActor } from "@/backend";
import type {
  MusicSearchParams,
  PurchaseRecord,
  TrackInput,
  TrackView,
} from "@/types/music";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ── Checkout session type (Stripe) ───────────────────────────────────────────
export interface CheckoutSession {
  id: string;
  url: string;
}

// ── Query: list all published tracks ────────────────────────────────────────
export function useTracks(params?: MusicSearchParams) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TrackView[]>({
    queryKey: ["tracks", params],
    queryFn: async (): Promise<TrackView[]> => {
      if (!actor) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a = actor as any;
        const results = await a.listTracks(
          params
            ? {
                searchText: params.searchText ?? "",
                artist: params.artist ?? "",
                sortOrder: params.sortOrder ?? "newest",
              }
            : null,
        );
        return results as TrackView[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Query: search tracks ─────────────────────────────────────────────────────
export function useSearchTracks(params: MusicSearchParams) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TrackView[]>({
    queryKey: ["tracks", "search", params],
    queryFn: async (): Promise<TrackView[]> => {
      if (!actor) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a = actor as any;
        const results = await a.searchTracks({
          searchText: params.searchText ?? "",
          artist: params.artist ?? "",
          sortOrder: params.sortOrder ?? "newest",
        });
        return results as TrackView[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Query: single track ──────────────────────────────────────────────────────
// id is a URL string param — convert to bigint before backend call
export function useTrack(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TrackView | null>({
    queryKey: ["track", id],
    queryFn: async (): Promise<TrackView | null> => {
      if (!actor) return null;
      try {
        const trackId = BigInt(id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a = actor as any;
        const result = await a.getTrack(trackId);
        return (result ?? null) as TrackView | null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// ── Query: seller's own tracks ───────────────────────────────────────────────
export function useSellerTracks(sellerId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TrackView[]>({
    queryKey: ["tracks", "seller", sellerId],
    queryFn: async (): Promise<TrackView[]> => {
      if (!actor) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a = actor as any;
        const results = await a.listSellerTracks(sellerId);
        return results as TrackView[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sellerId,
  });
}

// ── Query: buyer's purchases ──────────────────────────────────────────────────
export function usePurchases(buyerId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PurchaseRecord[]>({
    queryKey: ["purchases", buyerId],
    queryFn: async (): Promise<PurchaseRecord[]> => {
      if (!actor) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a = actor as any;
        const results = await a.listPurchases(buyerId);
        return results as PurchaseRecord[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!buyerId,
  });
}

// ── Mutation: publish track ──────────────────────────────────────────────────
export function usePublishTrack() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TrackInput): Promise<bigint> => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const a = actor as any;
      const id = await a.publishTrack(input);
      return id as bigint;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
}

// ── Mutation: republish (re-publish draft) track ─────────────────────────────
export function useRepublishTrack() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (trackId: string): Promise<void> => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const a = actor as any;
      await a.republishTrack(BigInt(trackId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
}

// ── Mutation: unpublish track ────────────────────────────────────────────────
export function useUnpublishTrack() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (trackId: string): Promise<void> => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const a = actor as any;
      await a.unpublishTrack(BigInt(trackId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
}

// ── Mutation: edit track ─────────────────────────────────────────────────────
export function useEditTrack() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: TrackInput;
    }): Promise<void> => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const a = actor as any;
      await a.editTrack(BigInt(id), input);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tracks"] });
      qc.invalidateQueries({ queryKey: ["track", vars.id] });
    },
  });
}

// ── Mutation: create Stripe checkout session ─────────────────────────────────
export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      trackId,
      trackTitle: _trackTitle,
      priceUSD: _priceUSD,
    }: {
      trackId: bigint;
      trackTitle: string;
      priceUSD: number;
    }): Promise<CheckoutSession> => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success?trackId=${trackId.toString()}`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const a = actor as any;
      // Build shopping item via backend helper for correct pricing
      const shoppingItem = await a.buildTrackShoppingItem(trackId);
      const result = await a.createCheckoutSession(
        [shoppingItem],
        successUrl,
        cancelUrl,
      );
      const session = JSON.parse(result as string) as CheckoutSession;
      if (!session?.url) {
        throw new Error("Stripe session missing url");
      }
      return session;
    },
  });
}

// ── Mutation: record purchase after successful payment ───────────────────────
export function useRecordPurchase() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      trackId,
      sessionId,
    }: {
      trackId: string;
      sessionId: string;
    }): Promise<void> => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const a = actor as any;
      await a.recordTrackPurchase(sessionId, BigInt(trackId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
}
