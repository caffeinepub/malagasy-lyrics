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
import { Textarea } from "@/components/ui/textarea";
import { useSubmitLyric } from "@/hooks/useLyrics";
import type { LyricInput } from "@/types/lyrics";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, LogIn, Music2 } from "lucide-react";
import { useState } from "react";
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

export function SubmitPage() {
  const { loginStatus, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSubmitLyric();

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
      const lyric = await mutateAsync(input);
      toast.success("Lyrics shared successfully!");
      navigate({ to: "/lyrics/$id", params: { id: lyric.id.toString() } });
    } catch {
      toast.error("Failed to submit lyrics. Please try again.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-4"
        data-ocid="submit-auth-gate"
      >
        <div className="text-center max-w-md animate-fade-up">
          <div
            className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "oklch(var(--primary) / 0.15)" }}
          >
            <Music2
              className="w-8 h-8"
              style={{ color: "oklch(var(--primary))" }}
            />
          </div>
          <h1 className="font-display text-3xl font-semibold mb-3 text-foreground">
            Sign in to Share Lyrics
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Join the Malagasy Lyrics community and contribute songs to the
            growing archive of Malagasy music.
          </p>
          <Button
            size="lg"
            onClick={() => login()}
            data-ocid="submit-login-btn"
            className="font-display text-base px-8 gap-2"
          >
            <LogIn className="w-4 h-4" />
            Sign in with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-2xl animate-fade-up"
      data-ocid="submit-page"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/"
          search={{ q: "", genre: "", year: "All" }}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-semibold">Submit Lyrics</h1>
          <p className="text-metadata">
            Share a song with the Malagasy music community
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
        data-ocid="submit-form"
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
                placeholder="Izy irery"
                aria-invalid={!!errors.title}
                data-ocid="input-title"
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
                placeholder="D'Gary"
                aria-invalid={!!errors.artist}
                data-ocid="input-artist"
              />
              {errors.artist && <FieldError message={errors.artist} />}
            </div>

            {/* Album */}
            <div className="space-y-1.5">
              <Label htmlFor="album">
                Album{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="album"
                value={form.album}
                onChange={(e) => setForm({ ...form, album: e.target.value })}
                placeholder="Malagasy Guitar"
                data-ocid="input-album"
              />
            </div>

            {/* Year */}
            <div className="space-y-1.5">
              <Label htmlFor="year">
                Year Released{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="year"
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                onBlur={() => form.year && validate()}
                placeholder="1993"
                min={1800}
                max={new Date().getFullYear() + 1}
                aria-invalid={!!errors.year}
                data-ocid="input-year"
              />
              {errors.year && <FieldError message={errors.year} />}
            </div>

            {/* Genre */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="genre">
                Genre{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (optional)
                </span>
              </Label>
              <Select
                value={form.genre}
                onValueChange={(v) => setForm({ ...form, genre: v })}
              >
                <SelectTrigger data-ocid="input-genre">
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
            placeholder={
              "Tomany, hitako ny masonao tomany,\nTsy kivy aho, fa mbola mitady fitiavana...\n\nTomany, hitako ny tropha soya hapo,\nTsy kivy aho, fa mbola kitady fitiavana..."
            }
            rows={12}
            aria-invalid={!!errors.lyrics}
            className="font-display text-base resize-y"
            data-ocid="input-lyrics"
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
              Translation notes, song context, or any other info
            </p>
          </div>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Add context, translation notes, or background story..."
            rows={3}
            className="resize-y"
            data-ocid="input-notes"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <Link to="/" search={{ q: "", genre: "", year: "All" }}>
            <Button variant="ghost" type="button" data-ocid="cancel-submit">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isPending}
            className="min-w-[140px] font-display"
            data-ocid="submit-lyrics-btn"
          >
            {isPending ? "Sharing…" : "Share Lyrics"}
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
