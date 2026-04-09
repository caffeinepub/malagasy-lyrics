import { ExternalBlob } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useEditTrack,
  usePublishTrack,
  useRepublishTrack,
  useSellerTracks,
  useUnpublishTrack,
} from "@/hooks/useMusic";
import type { TrackInput, TrackView } from "@/types/music";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Disc3,
  DollarSign,
  Edit2,
  Eye,
  EyeOff,
  FileAudio,
  ImagePlus,
  Lock,
  Music,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── File Picker State ─────────────────────────────────────────────────────────
interface FilePickerState {
  blob: ExternalBlob | null;
  filename: string;
  previewUrl: string | null;
  uploading: boolean;
  progress: number;
  error: string | null;
}

function emptyPicker(): FilePickerState {
  return {
    blob: null,
    filename: "",
    previewUrl: null,
    uploading: false,
    progress: 0,
    error: null,
  };
}

// ── Audio File Picker ─────────────────────────────────────────────────────────
function AudioFilePicker({
  value,
  onChange,
  id,
}: {
  value: FilePickerState;
  onChange: (state: FilePickerState) => void;
  id: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    onChange({
      ...value,
      uploading: true,
      progress: 0,
      error: null,
      filename: file.name,
    });
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const blob = ExternalBlob.fromBytes(bytes);
      onChange({
        blob,
        filename: file.name,
        previewUrl: null,
        uploading: false,
        progress: 100,
        error: null,
      });
    } catch {
      onChange({
        blob: null,
        filename: "",
        previewUrl: null,
        uploading: false,
        progress: 0,
        error: "Upload failed. Please try again.",
      });
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".mp3,.wav,.ogg,.m4a,.flac,audio/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        data-ocid="track-form-audio-input"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={value.uploading}
        className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors duration-200 border focus-visible:outline-none focus-visible:ring-2"
        style={{
          background: value.blob
            ? "oklch(var(--primary) / 0.08)"
            : "oklch(var(--muted) / 0.2)",
          border: value.blob
            ? "1px solid oklch(var(--primary) / 0.35)"
            : value.error
              ? "1px solid oklch(var(--destructive) / 0.5)"
              : "1px dashed oklch(var(--border) / 0.6)",
          color: "oklch(var(--foreground))",
        }}
        data-ocid="track-form-audio-picker"
        aria-label="Choose audio file"
      >
        {value.uploading ? (
          <>
            <Upload
              className="w-4 h-4 shrink-0 animate-pulse"
              style={{ color: "oklch(var(--primary))" }}
            />
            <span className="flex-1 text-left text-muted-foreground">
              Uploading…{" "}
              {value.progress > 0 ? `${Math.round(value.progress)}%` : ""}
            </span>
          </>
        ) : value.blob ? (
          <>
            <CheckCircle2
              className="w-4 h-4 shrink-0"
              style={{ color: "oklch(var(--success))" }}
            />
            <span
              className="flex-1 text-left truncate"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {value.filename}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">
              Change
            </span>
          </>
        ) : (
          <>
            <FileAudio className="w-4 h-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 text-left text-muted-foreground">
              Choose Audio File
            </span>
            <span
              className="text-xs shrink-0 px-2 py-0.5 rounded"
              style={{
                background: "oklch(var(--primary) / 0.15)",
                color: "oklch(var(--primary))",
              }}
            >
              Browse
            </span>
          </>
        )}
      </button>
      {value.error && (
        <p
          className="text-xs flex items-center gap-1"
          style={{ color: "oklch(var(--destructive))" }}
        >
          <AlertCircle className="w-3 h-3" /> {value.error}
        </p>
      )}
      {!value.error && !value.blob && (
        <p className="text-xs text-muted-foreground">
          Supported: MP3, WAV, OGG, M4A, FLAC
        </p>
      )}
    </div>
  );
}

// ── Cover Image Picker ────────────────────────────────────────────────────────
function CoverImagePicker({
  value,
  onChange,
  id,
}: {
  value: FilePickerState;
  onChange: (state: FilePickerState) => void;
  id: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    const localPreview = URL.createObjectURL(file);
    onChange({
      ...value,
      uploading: true,
      progress: 0,
      error: null,
      filename: file.name,
      previewUrl: localPreview,
    });
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const blob = ExternalBlob.fromBytes(bytes);
      onChange({
        blob,
        filename: file.name,
        previewUrl: localPreview,
        uploading: false,
        progress: 100,
        error: null,
      });
    } catch {
      onChange({
        blob: null,
        filename: "",
        previewUrl: null,
        uploading: false,
        progress: 0,
        error: "Upload failed. Please try again.",
      });
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.gif,.webp,image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        data-ocid="track-form-cover-input"
      />

      {/* Preview thumbnail + pick button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={value.uploading}
          className="relative w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2"
          style={{
            background: value.blob
              ? "transparent"
              : "oklch(var(--muted) / 0.25)",
            border: value.blob
              ? "none"
              : value.error
                ? "1px solid oklch(var(--destructive) / 0.5)"
                : "1px dashed oklch(var(--border) / 0.6)",
          }}
          aria-label="Choose cover image"
          data-ocid="track-form-cover-thumb"
        >
          {value.previewUrl ? (
            <>
              <img
                src={value.previewUrl}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
              {value.uploading && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "oklch(0 0 0 / 0.5)" }}
                >
                  <Upload className="w-5 h-5 animate-pulse text-white" />
                </div>
              )}
            </>
          ) : (
            <ImagePlus className="w-6 h-6 text-muted-foreground" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={value.uploading}
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 border focus-visible:outline-none focus-visible:ring-2"
            style={{
              background: value.blob
                ? "oklch(var(--primary) / 0.08)"
                : "oklch(var(--muted) / 0.2)",
              border: value.blob
                ? "1px solid oklch(var(--primary) / 0.35)"
                : value.error
                  ? "1px solid oklch(var(--destructive) / 0.5)"
                  : "1px dashed oklch(var(--border) / 0.6)",
              color: "oklch(var(--foreground))",
            }}
            data-ocid="track-form-cover-picker"
          >
            {value.uploading ? (
              <>
                <Upload
                  className="w-3.5 h-3.5 shrink-0 animate-pulse"
                  style={{ color: "oklch(var(--primary))" }}
                />
                <span className="text-muted-foreground truncate">
                  Uploading…{" "}
                  {value.progress > 0 ? `${Math.round(value.progress)}%` : ""}
                </span>
              </>
            ) : value.blob ? (
              <>
                <CheckCircle2
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: "oklch(var(--success))" }}
                />
                <span
                  className="truncate"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {value.filename}
                </span>
              </>
            ) : (
              <>
                <ImagePlus className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Choose Cover Image
                </span>
              </>
            )}
          </button>
          {value.error && (
            <p
              className="text-xs mt-1 flex items-center gap-1"
              style={{ color: "oklch(var(--destructive))" }}
            >
              <AlertCircle className="w-3 h-3" /> {value.error}
            </p>
          )}
          {!value.error && !value.blob && (
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, WEBP, GIF
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── New track form ───────────────────────────────────────────────────────────
function TrackForm({
  initial,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  initial?: Partial<TrackView>;
  onSubmit: (data: TrackInput) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [artist, setArtist] = useState(initial?.artist ?? "");
  const [album, setAlbum] = useState(initial?.album ?? "");
  const [priceUSD, setPriceUSD] = useState(initial?.priceUSD ?? 1.99);
  const [audioPicker, setAudioPicker] = useState<FilePickerState>(() => {
    if (initial?.audioFile) {
      return {
        blob: initial.audioFile,
        filename: "Current audio file",
        previewUrl: null,
        uploading: false,
        progress: 100,
        error: null,
      };
    }
    return emptyPicker();
  });
  const [coverPicker, setCoverPicker] = useState<FilePickerState>(() => {
    if (initial?.coverImage) {
      const coverUrl = initial.coverImage.getDirectURL();
      return {
        blob: initial.coverImage,
        filename: "Current cover image",
        previewUrl: coverUrl,
        uploading: false,
        progress: 100,
        error: null,
      };
    }
    return emptyPicker();
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) {
      toast.error("Title and artist are required");
      return;
    }
    if (priceUSD <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    if (audioPicker.uploading || coverPicker.uploading) {
      toast.error("Please wait for file uploads to complete");
      return;
    }
    if (!audioPicker.blob || !coverPicker.blob) {
      toast.error(
        "Please attach both an audio file and a cover image before saving.",
      );
      return;
    }
    await onSubmit({
      title: title.trim(),
      artist: artist.trim(),
      album: album.trim(),
      priceUSD,
      sellerName: initial?.sellerName ?? "",
      audioFile: audioPicker.blob,
      coverImage: coverPicker.blob,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-6 space-y-5"
      style={{
        background: "oklch(var(--card))",
        border: "1px solid oklch(var(--border) / 0.4)",
      }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="track-title">
            Title <span style={{ color: "oklch(var(--destructive))" }}>*</span>
          </Label>
          <Input
            id="track-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Song title"
            data-ocid="track-form-title"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="track-artist">
            Artist <span style={{ color: "oklch(var(--destructive))" }}>*</span>
          </Label>
          <Input
            id="track-artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist name"
            data-ocid="track-form-artist"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="track-album">Album</Label>
          <Input
            id="track-album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Album name (optional)"
            data-ocid="track-form-album"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="track-price">
            Price (USD){" "}
            <span style={{ color: "oklch(var(--destructive))" }}>*</span>
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              id="track-price"
              type="number"
              min="0.01"
              step="0.01"
              value={priceUSD}
              onChange={(e) => setPriceUSD(Number.parseFloat(e.target.value))}
              className="pl-8"
              data-ocid="track-form-price"
            />
          </div>
        </div>
      </div>

      {/* File pickers — full width */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="track-audio-input">Audio File</Label>
          <AudioFilePicker
            id="track-audio-input"
            value={audioPicker}
            onChange={setAudioPicker}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="track-cover-input">Cover Image</Label>
          <CoverImagePicker
            id="track-cover-input"
            value={coverPicker}
            onChange={setCoverPicker}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            isSubmitting || audioPicker.uploading || coverPicker.uploading
          }
          data-ocid="track-form-submit"
        >
          {isSubmitting ? "Saving…" : initial ? "Save Changes" : "List Track"}
        </Button>
      </div>
    </form>
  );
}

// ── Track row in seller dashboard ────────────────────────────────────────────
function SellerTrackRow({
  track,
  onEdit,
}: {
  track: TrackView;
  onEdit: (t: TrackView) => void;
}) {
  const unpublish = useUnpublishTrack();
  const republish = useRepublishTrack();

  async function handleUnpublish() {
    try {
      await unpublish.mutateAsync(track.id.toString());
      toast.success("Track unpublished");
    } catch {
      toast.error("Failed to unpublish");
    }
  }

  async function handleRepublish() {
    try {
      await republish.mutateAsync(track.id.toString());
      toast.success("Track published");
    } catch {
      toast.error("Failed to publish");
    }
  }

  return (
    <div
      className="flex items-center gap-4 rounded-xl p-4"
      style={{
        background: "oklch(var(--card))",
        border: "1px solid oklch(var(--border) / 0.3)",
      }}
      data-ocid={`seller-track-${track.id.toString()}`}
    >
      {/* Cover thumb */}
      <div
        className="w-14 h-14 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
        style={{ background: "oklch(var(--muted) / 0.3)" }}
      >
        {track.coverImage ? (
          <img
            src={track.coverImage.getDirectURL()}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Disc3
            className="w-6 h-6"
            style={{ color: "oklch(var(--primary) / 0.4)" }}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-foreground truncate">
            {track.title}
          </span>
          <Badge
            variant={track.published ? "default" : "secondary"}
            className="text-[10px] shrink-0"
            style={
              track.published
                ? {
                    background: "oklch(var(--success) / 0.15)",
                    color: "oklch(var(--success))",
                    borderColor: "oklch(var(--success) / 0.3)",
                  }
                : {}
            }
          >
            {track.published ? "Published" : "Draft"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {track.artist}
          {track.album ? ` · ${track.album}` : ""}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span
            className="text-sm font-semibold"
            style={{ color: "oklch(var(--primary))" }}
          >
            ${track.priceUSD.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">
            {Number(track.viewCount)} plays
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Link to="/store/$id" params={{ id: track.id.toString() }}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="View in store"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(track)}
          aria-label="Edit track"
          data-ocid={`seller-track-edit-${track.id.toString()}`}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        {track.published ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleUnpublish}
            disabled={unpublish.isPending}
            aria-label="Unpublish track"
            data-ocid={`seller-track-unpublish-${track.id.toString()}`}
          >
            <EyeOff className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleRepublish}
            disabled={republish.isPending}
            aria-label="Publish track"
            data-ocid={`seller-track-publish-${track.id.toString()}`}
          >
            <Eye className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function SellerDashboardPage() {
  const { loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const sellerId = identity?.getPrincipal().toString() ?? "";

  const { data: tracks, isLoading } = useSellerTracks(sellerId);
  const publish = usePublishTrack();
  const editTrack = useEditTrack();

  const [showForm, setShowForm] = useState(false);
  const [editingTrack, setEditingTrack] = useState<TrackView | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "oklch(var(--muted) / 0.3)" }}
        >
          <Lock
            className="w-7 h-7"
            style={{ color: "oklch(var(--muted-foreground))" }}
          />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Sign in to sell music
        </h2>
        <p className="text-muted-foreground mb-6">
          Create an account or sign in with Internet Identity to list your
          Malagasy music in the store.
        </p>
        <Link to="/store" search={{ q: "", artist: "", sort: "newest" }}>
          <Button variant="outline">
            <Music className="w-4 h-4 mr-2" />
            Browse the Store
          </Button>
        </Link>
      </div>
    );
  }

  async function handlePublish(data: TrackInput) {
    try {
      await publish.mutateAsync(data);
      toast.success("Track listed successfully!");
      setShowForm(false);
    } catch {
      toast.error("Failed to list track. Please try again.");
    }
  }

  async function handleEdit(data: TrackInput) {
    if (!editingTrack) return;
    try {
      await editTrack.mutateAsync({
        id: editingTrack.id.toString(),
        input: data,
      });
      toast.success("Track updated!");
      setEditingTrack(null);
    } catch {
      toast.error("Failed to update track.");
    }
  }

  const myTracks = tracks ?? [];

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Seller Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your music listings and track sales.
          </p>
        </div>
        {!showForm && !editingTrack && (
          <Button
            onClick={() => setShowForm(true)}
            className="gap-2 shrink-0"
            data-ocid="seller-add-track"
          >
            <Plus className="w-4 h-4" />
            Add Track
          </Button>
        )}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              New Track Listing
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowForm(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <TrackForm
            onSubmit={handlePublish}
            onCancel={() => setShowForm(false)}
            isSubmitting={publish.isPending}
          />
        </div>
      )}

      {/* Edit form */}
      {editingTrack && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Edit "{editingTrack.title}"
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingTrack(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <TrackForm
            initial={editingTrack}
            onSubmit={handleEdit}
            onCancel={() => setEditingTrack(null)}
            isSubmitting={editTrack.isPending}
          />
        </div>
      )}

      {/* Tracks list */}
      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Your Tracks{" "}
          {myTracks.length > 0 && (
            <span className="text-muted-foreground text-sm font-normal">
              ({myTracks.length})
            </span>
          )}
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : myTracks.length === 0 ? (
          <div
            className="text-center py-16 rounded-xl"
            style={{ background: "oklch(var(--muted) / 0.1)" }}
            data-ocid="seller-empty"
          >
            <AlertCircle
              className="w-10 h-10 mx-auto mb-3"
              style={{ color: "oklch(var(--muted-foreground))" }}
            />
            <p className="text-muted-foreground text-sm">
              You haven't listed any tracks yet.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setShowForm(true)}
              data-ocid="seller-empty-add-cta"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add your first track
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {myTracks.map((t) => (
              <SellerTrackRow
                key={t.id.toString()}
                track={t}
                onEdit={setEditingTrack}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
