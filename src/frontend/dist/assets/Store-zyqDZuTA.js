import { c as createLucideIcon, u as useSearch, a as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Search, b as Skeleton, L as Link, B as Button, k as ShoppingBag } from "./index-DTMN0Tcy.js";
import { B as Badge } from "./badge-jGmQiXTI.js";
import { I as Input } from "./input-DSSEY-XD.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-iHuicD9S.js";
import { u as useTracks } from "./useMusic-CTtFTcHZ.js";
import { M as Music, D as Disc3 } from "./music-DRkq-1b8.js";
import { P as Play } from "./play-BdhmWLVA.js";
import "./backend-kJniYQbd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function TrackCard({ track }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/store/$id",
      params: { id: track.id },
      className: "card-music-store group block",
      "data-ocid": `track-card-${track.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square relative overflow-hidden bg-muted/30", children: [
          track.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: track.coverImage,
              alt: track.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center",
              style: { background: "oklch(var(--primary) / 0.15)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Disc3,
                {
                  className: "w-10 h-10",
                  style: { color: "oklch(var(--primary) / 0.6)" }
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "music-card-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-full flex items-center justify-center shadow-xl",
              style: { background: "oklch(var(--primary))" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Play,
                {
                  className: "w-5 h-5 ml-0.5",
                  style: { color: "oklch(0.12 0 0)" }
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-track-title truncate", children: track.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-track-artist mt-0.5 truncate", children: track.artist }),
          track.album && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5 truncate", children: track.album }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-base font-display font-bold",
                style: { color: "oklch(var(--primary))" },
                children: [
                  "$",
                  track.priceUSD.toFixed(2)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] border",
                style: { borderColor: "oklch(var(--border) / 0.3)" },
                children: "Buy"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function StoreHero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative overflow-hidden rounded-2xl mb-8",
      style: {
        background: "linear-gradient(135deg, oklch(0.165 0 0) 0%, oklch(0.22 0.04 65) 60%, oklch(0.165 0 0) 100%)",
        border: "1px solid oklch(var(--primary) / 0.2)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-8 py-10 md:py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ShoppingBag,
              {
                className: "w-5 h-5",
                style: { color: "oklch(var(--primary))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-medium tracking-widest uppercase",
                style: { color: "oklch(var(--primary))" },
                children: "Music Store"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-3", children: [
            "Discover & Support",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Malagasy Artists"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md leading-relaxed", children: "Purchase authentic Malagasy music directly from the artists who create it. Every purchase supports local talent." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -right-12 -top-12 w-64 h-64 rounded-full opacity-10",
            style: { background: "oklch(var(--primary))" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -right-4 -bottom-8 w-40 h-40 rounded-full opacity-5",
            style: { background: "oklch(var(--primary))" }
          }
        )
      ]
    }
  );
}
function StorePage() {
  const {
    q = "",
    artist = "",
    sort = "newest"
  } = useSearch({
    from: "/store"
  });
  const navigate = useNavigate({ from: "/store" });
  const [localQ, setLocalQ] = reactExports.useState(q);
  const sortOrder = sort;
  const { data: tracks, isLoading } = useTracks({
    searchText: localQ,
    artist,
    sortOrder
  });
  function handleSearch(e) {
    e.preventDefault();
    navigate({ search: { q: localQ, artist, sort } });
  }
  function handleSort(newSort) {
    navigate({ search: { q: localQ, artist, sort: newSort } });
  }
  const isEmpty = !isLoading && (!tracks || tracks.length === 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreHero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: localQ,
            onChange: (e) => setLocalQ(e.target.value),
            placeholder: "Search tracks, artists…",
            className: "pl-10 bg-muted/50 border-border/30 h-11 rounded-xl",
            "data-ocid": "store-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: handleSort, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "w-44 h-11 bg-muted/50 border-border/30",
              "data-ocid": "store-sort",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "Newest first" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "oldest", children: "Oldest first" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "titleAsc", children: "Title A→Z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "titleDesc", children: "Title Z→A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "priceAsc", children: "Price low→high" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "priceDesc", children: "Price high→low" })
          ] })
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5", children: Array.from({ length: 10 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
    ] }, i)) }) : isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-24 rounded-2xl",
        style: { background: "oklch(var(--muted) / 0.15)" },
        "data-ocid": "store-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5",
              style: { background: "oklch(var(--primary) / 0.1)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Music,
                {
                  className: "w-7 h-7",
                  style: { color: "oklch(var(--primary) / 0.5)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No tracks yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto mb-6", children: "Be the first to share your Malagasy music. Sign in and list your tracks in the store." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/seller", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "store-empty-sell-cta", children: "Start Selling" }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5", children: (tracks ?? []).map((track) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrackCard, { track }, track.id)) })
  ] });
}
export {
  StorePage
};
