import { c as createLucideIcon, d as useParams, e as useInternetIdentity, a as useNavigate, r as reactExports, j as jsxRuntimeExports, g as LogIn, B as Button, b as Skeleton, L as Link, f as ue } from "./index-BA6E-qdy.js";
import { I as Input } from "./input-uE5mrZNo.js";
import { L as Label } from "./label-DFJN00c0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DLvsa_rp.js";
import { T as Textarea } from "./textarea-tYeE-zj-.js";
import { c as useLyric, e as useUpdateLyric } from "./useLyrics-oYIyiOnT.js";
import { A as ArrowLeft } from "./arrow-left-D8HAsAFs.js";
import { C as CircleAlert } from "./circle-alert-DmaxYnBV.js";
import "./backend-BA7Afdj8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m14.5 9.5-5 5", key: "17q4r4" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
];
const ShieldX = createLucideIcon("shield-x", __iconNode);
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
function initFormFromLyric(lyric) {
  return {
    title: lyric.title,
    artist: lyric.artist,
    album: lyric.album ?? "",
    year: lyric.yearReleased > 0n ? lyric.yearReleased.toString() : "",
    genre: "",
    lyrics: lyric.lyrics,
    notes: lyric.notes ?? ""
  };
}
function EditPage() {
  const { id } = useParams({ from: "/edit/$id" });
  const { loginStatus, login, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const navigate = useNavigate();
  const { data: lyric, isLoading } = useLyric(BigInt(id));
  const { mutateAsync, isPending } = useUpdateLyric();
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
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (lyric && !hydrated) {
      setForm(initFormFromLyric(lyric));
      setHydrated(true);
    }
  }, [lyric, hydrated]);
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
      album: form.album.trim(),
      yearReleased: form.year.trim() ? BigInt(Math.round(Number(form.year))) : BigInt(0),
      lyrics: form.lyrics.trim(),
      notes: form.notes.trim()
    };
    try {
      await mutateAsync({ id: BigInt(id), input });
      ue.success("Lyrics updated successfully!");
      navigate({ to: "/lyrics/$id", params: { id } });
    } catch {
      ue.error("Failed to update lyrics. Please try again.");
    }
  };
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] px-4",
        "data-ocid": "edit-auth-gate",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md animate-fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center",
              style: { background: "oklch(var(--primary) / 0.15)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                LogIn,
                {
                  className: "w-8 h-8",
                  style: { color: "oklch(var(--primary))" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold mb-3 text-foreground", children: "Sign in to Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "You need to be signed in to edit lyrics." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: () => login(),
              "data-ocid": "edit-login-btn",
              className: "font-display px-8 gap-2",
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
  if (isLoading || !hydrated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-8 max-w-2xl space-y-4",
        "data-ocid": "edit-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" })
        ]
      }
    );
  }
  if (!lyric) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] px-4",
        "data-ocid": "edit-not-found",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md animate-fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold mb-3 text-foreground", children: "Lyrics Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "The lyrics you're looking for don't exist or have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", search: { q: "", genre: "", year: "All" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Browse"
          ] }) })
        ] })
      }
    );
  }
  const principalId = identity == null ? void 0 : identity.getPrincipal().toText();
  const isAuthorized = Boolean(principalId) && lyric.contributorId.toString() === principalId;
  if (!isAuthorized) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] px-4",
        "data-ocid": "edit-unauthorized",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md animate-fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center",
              style: { background: "oklch(var(--destructive) / 0.12)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ShieldX,
                {
                  className: "w-8 h-8",
                  style: { color: "oklch(var(--destructive))" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold mb-3 text-foreground", children: "Not Authorized" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Only the original contributor can edit these lyrics." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lyrics/$id", params: { id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "edit-view-lyric", children: "View Lyrics" }) })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl animate-fade-up",
      "data-ocid": "edit-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/lyrics/$id",
              params: { id },
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Back to lyrics",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: "Edit Lyrics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-metadata", children: [
              lyric.title,
              " · ",
              lyric.artist
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            noValidate: true,
            className: "space-y-6",
            "data-ocid": "edit-form",
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
                        "aria-invalid": !!errors.title,
                        "data-ocid": "edit-input-title"
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
                        "aria-invalid": !!errors.artist,
                        "data-ocid": "edit-input-artist"
                      }
                    ),
                    errors.artist && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.artist })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "album", children: "Album" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "album",
                        value: form.album,
                        onChange: (e) => setForm({ ...form, album: e.target.value }),
                        "data-ocid": "edit-input-album"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "year", children: "Year Released" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "year",
                        type: "number",
                        value: form.year,
                        onChange: (e) => setForm({ ...form, year: e.target.value }),
                        onBlur: () => form.year && validate(),
                        min: 1800,
                        max: (/* @__PURE__ */ new Date()).getFullYear() + 1,
                        "aria-invalid": !!errors.year,
                        "data-ocid": "edit-input-year"
                      }
                    ),
                    errors.year && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.year })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "genre", children: "Genre" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: form.genre,
                        onValueChange: (v) => setForm({ ...form, genre: v }),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "edit-input-genre", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a genre" }) }),
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
                    rows: 12,
                    "aria-invalid": !!errors.lyrics,
                    className: "font-display text-base resize-y",
                    "data-ocid": "edit-input-lyrics"
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-metadata text-xs mt-0.5", children: "Corrections, translation notes, or additional context" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "notes",
                    value: form.notes,
                    onChange: (e) => setForm({ ...form, notes: e.target.value }),
                    placeholder: "Add corrections or context about this edit...",
                    rows: 3,
                    className: "resize-y",
                    "data-ocid": "edit-input-notes"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lyrics/$id", params: { id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", type: "button", "data-ocid": "cancel-edit", children: "Cancel" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: isPending,
                    className: "min-w-[140px] font-display",
                    "data-ocid": "save-edit-btn",
                    children: isPending ? "Saving…" : "Save Changes"
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
  EditPage
};
