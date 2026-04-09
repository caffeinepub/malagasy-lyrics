import { e as useInternetIdentity, a as useNavigate, r as reactExports, j as jsxRuntimeExports, M as Music2, B as Button, g as LogIn, L as Link, f as ue } from "./index-DTMN0Tcy.js";
import { I as Input } from "./input-DSSEY-XD.js";
import { L as Label } from "./label-DRraFo3z.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-iHuicD9S.js";
import { T as Textarea } from "./textarea-0WuZYtQp.js";
import { d as useSubmitLyric } from "./useLyrics-DeVrJPE2.js";
import { A as ArrowLeft } from "./arrow-left-Cn1TfJGa.js";
import { C as CircleAlert } from "./circle-alert-R6q8RrWE.js";
import "./backend-kJniYQbd.js";
const GENRES = [
  "Salegy",
  "Tsapiky",
  "Hira Gasy",
  "Valiha",
  "Folk",
  "Jazz",
  "Pop",
  "Other"
];
function SubmitPage() {
  const { loginStatus, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSubmitLyric();
  const [form, setForm] = reactExports.useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    genre: "",
    lyrics: "",
    notes: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Song title is required.";
    if (!form.artist.trim()) e.artist = "Artist name is required.";
    if (!form.lyrics.trim()) e.lyrics = "Lyrics are required.";
    if (form.year.trim()) {
      const y = Number(form.year);
      if (Number.isNaN(y) || y < 1800 || y > (/* @__PURE__ */ new Date()).getFullYear() + 1)
        e.year = "Enter a valid year (e.g. 1993).";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const input = {
      title: form.title.trim(),
      artist: form.artist.trim(),
      album: form.album.trim() || void 0,
      year: form.year ? Number(form.year) : void 0,
      genre: form.genre || void 0,
      lyrics: form.lyrics.trim()
    };
    try {
      const lyric = await mutateAsync(input);
      ue.success("Lyrics shared successfully!");
      navigate({ to: "/lyrics/$id", params: { id: lyric.id.toString() } });
    } catch {
      ue.error("Failed to submit lyrics. Please try again.");
    }
  };
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] px-4",
        "data-ocid": "submit-auth-gate",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md animate-fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center",
              style: { background: "oklch(var(--primary) / 0.15)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Music2,
                {
                  className: "w-8 h-8",
                  style: { color: "oklch(var(--primary))" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold mb-3 text-foreground", children: "Sign in to Share Lyrics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Join the Malagasy Lyrics community and contribute songs to the growing archive of Malagasy music." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: () => login(),
              "data-ocid": "submit-login-btn",
              className: "font-display text-base px-8 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                "Sign in with Internet Identity"
              ]
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl animate-fade-up",
      "data-ocid": "submit-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              search: { q: "", genre: "", year: "All" },
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Back to home",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: "Submit Lyrics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-metadata", children: "Share a song with the Malagasy music community" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            noValidate: true,
            className: "space-y-6",
            "data-ocid": "submit-form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/40 rounded-xl p-6 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Song Information" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", children: [
                      "Song Title",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(var(--primary))" }, children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "title",
                        value: form.title,
                        onChange: (e) => setForm({ ...form, title: e.target.value }),
                        onBlur: () => !form.title.trim() && setErrors((ev) => ({
                          ...ev,
                          title: "Song title is required."
                        })),
                        placeholder: "Izy irery",
                        "aria-invalid": !!errors.title,
                        "data-ocid": "input-title"
                      }
                    ),
                    errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "artist", children: [
                      "Artist Name",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(var(--primary))" }, children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "artist",
                        value: form.artist,
                        onChange: (e) => setForm({ ...form, artist: e.target.value }),
                        onBlur: () => !form.artist.trim() && setErrors((ev) => ({
                          ...ev,
                          artist: "Artist name is required."
                        })),
                        placeholder: "D'Gary",
                        "aria-invalid": !!errors.artist,
                        "data-ocid": "input-artist"
                      }
                    ),
                    errors.artist && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.artist })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "album", children: [
                      "Album",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "album",
                        value: form.album,
                        onChange: (e) => setForm({ ...form, album: e.target.value }),
                        placeholder: "Malagasy Guitar",
                        "data-ocid": "input-album"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "year", children: [
                      "Year Released",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "year",
                        type: "number",
                        value: form.year,
                        onChange: (e) => setForm({ ...form, year: e.target.value }),
                        onBlur: () => form.year && validate(),
                        placeholder: "1993",
                        min: 1800,
                        max: (/* @__PURE__ */ new Date()).getFullYear() + 1,
                        "aria-invalid": !!errors.year,
                        "data-ocid": "input-year"
                      }
                    ),
                    errors.year && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.year })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "genre", children: [
                      "Genre",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: form.genre,
                        onValueChange: (v) => setForm({ ...form, genre: v }),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "input-genre", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a genre" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/40 rounded-xl p-6 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground", children: [
                    "Lyrics ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(var(--primary))" }, children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-metadata text-xs mt-0.5", children: "Separate verses with a blank line" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "lyrics",
                    value: form.lyrics,
                    onChange: (e) => setForm({ ...form, lyrics: e.target.value }),
                    onBlur: () => !form.lyrics.trim() && setErrors((ev) => ({ ...ev, lyrics: "Lyrics are required." })),
                    placeholder: "Tomany, hitako ny masonao tomany,\nTsy kivy aho, fa mbola mitady fitiavana...\n\nTomany, hitako ny tropha soya hapo,\nTsy kivy aho, fa mbola kitady fitiavana...",
                    rows: 12,
                    "aria-invalid": !!errors.lyrics,
                    className: "font-display text-base resize-y",
                    "data-ocid": "input-lyrics"
                  }
                ),
                errors.lyrics && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.lyrics })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/40 rounded-xl p-6 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground", children: [
                    "Notes",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-sm", children: "(optional)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-metadata text-xs mt-0.5", children: "Translation notes, song context, or any other info" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "notes",
                    value: form.notes,
                    onChange: (e) => setForm({ ...form, notes: e.target.value }),
                    placeholder: "Add context, translation notes, or background story...",
                    rows: 3,
                    className: "resize-y",
                    "data-ocid": "input-notes"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", search: { q: "", genre: "", year: "All" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", type: "button", "data-ocid": "cancel-submit", children: "Cancel" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: isPending,
                    className: "min-w-[140px] font-display",
                    "data-ocid": "submit-lyrics-btn",
                    children: isPending ? "Sharing…" : "Share Lyrics"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function FieldError({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "p",
    {
      className: "flex items-center gap-1.5 text-xs mt-1",
      style: { color: "oklch(var(--destructive))" },
      role: "alert",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3 shrink-0" }),
        message
      ]
    }
  );
}
export {
  SubmitPage
};
