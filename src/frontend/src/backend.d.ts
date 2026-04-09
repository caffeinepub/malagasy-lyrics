import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface LyricEntry {
    id: LyricId;
    contributorName: string;
    yearReleased: bigint;
    title: string;
    album: string;
    lyrics: string;
    contributorId: UserId;
    submittedAt: Timestamp;
    viewCount: bigint;
    notes: string;
    artist: string;
}
export interface SearchParams {
    yearFilter?: bigint;
    artistFilter?: string;
    sortOrder: SortOrder__1;
    searchText: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface TrackView {
    id: TrackId;
    title: string;
    album: string;
    published: boolean;
    createdAt: Timestamp;
    audioFile: ExternalBlob;
    coverImage: ExternalBlob;
    sellerName: string;
    viewCount: bigint;
    artist: string;
    sellerId: UserId;
    priceUSD: number;
}
export type UserId = Principal;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface MusicSearchParams {
    sortOrder?: SortOrder;
    searchText?: string;
    artist?: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface TrackInput {
    title: string;
    album: string;
    audioFile: ExternalBlob;
    coverImage: ExternalBlob;
    sellerName: string;
    artist: string;
    priceUSD: number;
}
export type TrackId = bigint;
export interface PurchaseRecord {
    trackId: TrackId;
    buyerId: UserId;
    sessionId: string;
    paidAt: Timestamp;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface LyricInput {
    yearReleased: bigint;
    title: string;
    album: string;
    lyrics: string;
    notes: string;
    artist: string;
}
export type LyricId = bigint;
export enum SortOrder {
    titleDesc = "titleDesc",
    newest = "newest",
    priceDesc = "priceDesc",
    priceAsc = "priceAsc",
    titleAsc = "titleAsc",
    oldest = "oldest"
}
export enum SortOrder__1 {
    mostRecent = "mostRecent",
    alphabetical = "alphabetical",
    mostViewed = "mostViewed"
}
export interface backendInterface {
    buildTrackShoppingItem(trackId: TrackId): Promise<ShoppingItem>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    editTrack(id: TrackId, input: TrackInput): Promise<void>;
    getLyric(id: LyricId): Promise<LyricEntry | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTrack(id: TrackId): Promise<TrackView | null>;
    isStripeConfigured(): Promise<boolean>;
    listArtists(): Promise<Array<string>>;
    listLyrics(): Promise<Array<LyricEntry>>;
    listPurchases(buyerId: UserId): Promise<Array<PurchaseRecord>>;
    listSellerTracks(sellerId: UserId): Promise<Array<TrackView>>;
    listTracks(params: MusicSearchParams | null): Promise<Array<TrackView>>;
    publishTrack(input: TrackInput): Promise<TrackId>;
    recordTrackPurchase(sessionId: string, trackId: TrackId): Promise<void>;
    republishTrack(id: TrackId): Promise<void>;
    searchLyrics(params: SearchParams): Promise<Array<LyricEntry>>;
    searchTracks(params: MusicSearchParams): Promise<Array<TrackView>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitLyric(input: LyricInput): Promise<LyricId>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    unpublishTrack(id: TrackId): Promise<void>;
    updateLyric(id: LyricId, input: LyricInput): Promise<boolean>;
}
