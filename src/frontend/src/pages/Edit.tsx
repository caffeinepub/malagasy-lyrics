import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useLyric, useUpdateLyric } from "@/hooks/useLyrics";
import type { LyricEntry, LyricInput } from "@/types/lyrics";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, LogIn, ShieldX } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const GENRES = [
  "Salegy",
  "Tsapiky",
  "Hira Gasy",
  "Valiha",
  "Folk",
  "Jazz",
  "Pop",
  "Other",
];

interface FormErrors {
  title?: string;
  artist?: string;
  lyrics?: string;
  year?: string;
}

function initFormFromLyric(lyric: LyricEntry) {
  return {
    title: lyric.title,
    artist: lyric.artist,
    album: lyric.album ?? "",
    year: lyric.year?.toString() ?? "",
    genre: lyric.genre ?? "",
    lyrics: lyric.lyrics,
    notes: "",
  };
}

export function EditPage() {
  const { id } = useParams({ from: "/edit/$id" });
  const { loginStatus, login, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const navigate = useNavigate();
  const { data: lyric, isLoading } = useLyric(BigInt(id));
  const { mutateAsync, isPending } = useUpdateLyric();

  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    genre: "",
    lyrics: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (lyric && !hydrated) {
      setForm(initFormFromLyric(lyric));
      setHydrated(true);
    }
  }, [lyric, hydrated]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = "Song title is required.";
    if (!form.artist.trim()) e.artist = "Artist name is required.";
    if (!form.lyrics.trim()) e.lyrics = "Lyrics are required.";
    if (form.year.trim()) {
      const y = Number(form.year);
      if (Number.isNaN(y) || y < 1800 || y > new Date().getFullYear() + 1)
        e.year = "Enter a valid year (e.g. 1993).";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const input: LyricInput = {
      title: form.title.trim(),
      artist: form.artist.trim(),
      album: form.album.trim() || undefined,
      year: form.year ? Number(form.year) : undefined,
      genre: form.genre || undefined,
      lyrics: form.lyrics.trim(),
    };
    try {
      await mutateAsync({ id: BigInt(id), input });
      toast.success("Lyrics updated successfully!");
      navigate({ to: "/lyrics/$id", params: { id } });
    } catch {
      toast.error("Failed to update lyrics. Please try again.");
    }
  };

  // Gate: not logged in
  if (!isLoggedIn) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-4"
        data-ocid="edit-auth-gate"
      >
        <div className="text-center max-w-md animate-fade-up">
          <div
            className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "oklch(var(--primary) / 0.15)" }}
          >
            <LogIn
              className="w-8 h-8"
              style={{ color: "oklch(var(--primary))" }}
            />
          </div>
          <h1 className="font-display text-3xl font-semibold mb-3 text-foreground">
            Sign in to Edit
          </h1>
          <p className="text-muted-foreground mb-8">
            You need to be signed in to edit lyrics.
          </p>
          <Button
            size="lg"
            onClick={() => login()}
            data-ocid="edit-login-btn"
            className="font-display px-8 gap-2"
          >
            <LogIn className="w-4 h-4" />
            Sign in with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading || !hydrated) {
    return (
      <div
        className="container mx-auto px-4 py-8 max-w-2xl space-y-4"
        data-ocid="edit-loading"
      >
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  // Not found
  if (!lyric) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-4"
        data-ocid="edit-not-found"
      >
        <div className="text-center max-w-md animate-fade-up">
          <h1 className="font-display text-3xl font-semibold mb-3 text-foreground">
            Lyrics Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The lyrics you're looking for don't exist or have been removed.
          </p>
          <Link to="/" search={{ q: "", genre: "", year: "All" }}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Authorization check: only the original contributor may edit
  const principalId = identity?.getPrincipal().toText();
  const isAuthorized =
    Boolean(principalId) && lyric.contributorId === principalId;

  if (!isAuthorized) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-4"
        data-ocid="edit-unauthorized"
      >
        <div className="text-center max-w-md animate-fade-up">
          <div
            className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "oklch(var(--destructive) / 0.12)" }}
          >
            <ShieldX
              className="w-8 h-8"
              style={{ color: "oklch(var(--destructive))" }}
            />
          </div>
          <h1 className="font-display text-3xl font-semibold mb-3 text-foreground">
            Not Authorized
          </h1>
          <p className="text-muted-foreground mb-8">
            Only the original contributor can edit these lyrics.
          </p>
          <Link to="/lyrics/$id" params={{ id }}>
            <Button data-ocid="edit-view-lyric">View Lyrics</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-2xl animate-fade-up"
      data-ocid="edit-page"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/lyrics/$id"
          params={{ id }}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Back to lyrics"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-semibold">Edit Lyrics</h1>
          <p className="text-metadata">
            {lyric.title} · {lyric.artist}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
        data-ocid="edit-form"
      >
        {/* Song info card */}
        <div className="bg-card border border-border/40 rounded-xl p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground">
            Song Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">
                Song Title{" "}
                <span style={{ color: "oklch(var(--primary))" }}>*</span>
              </Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                onBlur={() =>
                  !form.title.trim() &&
                  setErrors((ev) => ({
                    ...ev,
                    title: "Song title is required.",
                  }))
                }
                aria-invalid={!!errors.title}
                data-ocid="edit-input-title"
              />
              {errors.title && <FieldError message={errors.title} />}
            </div>

            {/* Artist */}
            <div className="space-y-1.5">
              <Label htmlFor="artist">
                Artist Name{" "}
                <span style={{ color: "oklch(var(--primary))" }}>*</span>
              </Label>
              <Input
                id="artist"
                value={form.artist}
                onChange={(e) => setForm({ ...form, artist: e.target.value })}
                onBlur={() =>
                  !form.artist.trim() &&
                  setErrors((ev) => ({
                    ...ev,
                    artist: "Artist name is required.",
                  }))
                }
                aria-invalid={!!errors.artist}
                data-ocid="edit-input-artist"
              />
              {errors.artist && <FieldError message={errors.artist} />}
            </div>

            {/* Album */}
            <div className="space-y-1.5">
              <Label htmlFor="album">Album</Label>
              <Input
                id="album"
                value={form.album}
                onChange={(e) => setForm({ ...form, album: e.target.value })}
                data-ocid="edit-input-album"
              />
            </div>

            {/* Year */}
            <div className="space-y-1.5">
              <Label htmlFor="year">Year Released</Label>
              <Input
                id="year"
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                onBlur={() => form.year && validate()}
                min={1800}
                max={new Date().getFullYear() + 1}
                aria-invalid={!!errors.year}
                data-ocid="edit-input-year"
              />
              {errors.year && <FieldError message={errors.year} />}
            </div>

            {/* Genre */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="genre">Genre</Label>
              <Select
                value={form.genre}
                onValueChange={(v) => setForm({ ...form, genre: v })}
              >
                <SelectTrigger data-ocid="edit-input-genre">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Lyrics card */}
        <div className="bg-card border border-border/40 rounded-xl p-6 space-y-3">
          <div>
            <h2 className="font-display font-semibold text-foreground">
              Lyrics <span style={{ color: "oklch(var(--primary))" }}>*</span>
            </h2>
            <p className="text-metadata text-xs mt-0.5">
              Separate verses with a blank line
            </p>
          </div>
          <Textarea
            id="lyrics"
            value={form.lyrics}
            onChange={(e) => setForm({ ...form, lyrics: e.target.value })}
            onBlur={() =>
              !form.lyrics.trim() &&
              setErrors((ev) => ({ ...ev, lyrics: "Lyrics are required." }))
            }
            rows={12}
            aria-invalid={!!errors.lyrics}
            className="font-display text-base resize-y"
            data-ocid="edit-input-lyrics"
          />
          {errors.lyrics && <FieldError message={errors.lyrics} />}
        </div>

        {/* Notes card */}
        <div className="bg-card border border-border/40 rounded-xl p-6 space-y-3">
          <div>
            <h2 className="font-display font-semibold text-foreground">
              Notes{" "}
              <span className="text-muted-foreground font-normal text-sm">
                (optional)
              </span>
            </h2>
            <p className="text-metadata text-xs mt-0.5">
              Corrections, translation notes, or additional context
            </p>
          </div>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Add corrections or context about this edit..."
            rows={3}
            className="resize-y"
            data-ocid="edit-input-notes"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <Link to="/lyrics/$id" params={{ id }}>
            <Button variant="ghost" type="button" data-ocid="cancel-edit">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isPending}
            className="min-w-[140px] font-display"
            data-ocid="save-edit-btn"
          >
            {isPending ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p
      className="flex items-center gap-1.5 text-xs mt-1"
      style={{ color: "oklch(var(--destructive))" }}
      role="alert"
    >
      <AlertCircle className="w-3 h-3 shrink-0" />
      {message}
    </p>
  );
}
