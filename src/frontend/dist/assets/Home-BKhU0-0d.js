import { c as createLucideIcon, u as useSearch, a as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Search, b as Skeleton, M as Music2, L as Link, B as Button } from "./index-BA6E-qdy.js";
import { I as Input } from "./input-uE5mrZNo.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DLvsa_rp.js";
import { u as useLyrics, a as useSearchLyrics, b as useArtists } from "./useLyrics-oYIyiOnT.js";
import { B as BookOpen, S as Share2 } from "./share-2-BJdKEeAL.js";
import { C as ChevronRight } from "./chevron-right-DYIS8sU3.js";
import { P as Play } from "./play-B534LJB1.js";
import { E as Eye } from "./eye-Dn4afRnX.js";
import "./backend-BA7Afdj8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h10", key: "jvxblo" }]
];
const ArrowUpNarrowWide = createLucideIcon("arrow-up-narrow-wide", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const GENRES = [
  "All",
  "Salegy",
  "Tsapiky",
  "Hira Gasy",
  "Valiha",
  "Folk",
  "Jazz",
  "Pop"
];
const YEARS = ["All", "2020s", "2010s", "2000s", "1990s", "1980s", "Classic"];
function LyricCardCompact({ lyric }) {
  const preview = (lyric.lyrics ?? "").split("\n").slice(0, 2).join("\n");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/lyrics/$id",
      params: { id: lyric.id.toString() },
      className: "card-compact group block animate-fade-in flex-shrink-0",
      "data-ocid": `lyric-card-${lyric.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate text-primary", children: lyric.artist }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate leading-snug", children: lyric.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4 shrink-0 mt-0.5 transition-colors group-hover:fill-current text-primary" })
        ] }),
        lyric.album && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 truncate", children: lyric.album }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground line-clamp-2 text-xs leading-relaxed whitespace-pre-line", children: preview }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-semibold text-xs bg-primary/20 text-primary", children: (lyric.contributorName ?? "").charAt(0).toUpperCase() || "?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs truncate flex-1", children: lyric.contributorName }),
          lyric.yearReleased > 0n && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[10px] shrink-0", children: lyric.yearReleased.toString() })
        ] })
      ]
    }
  );
}
function RecentCard({ lyric }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/lyrics/$id",
      params: { id: lyric.id.toString() },
      className: "flex-shrink-0 w-52 bg-card rounded-xl border p-4 hover:border-primary/40 transition-smooth group cursor-pointer",
      style: { borderColor: "oklch(var(--border) / 0.4)" },
      "data-ocid": `recent-card-${lyric.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lyric.artist }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-sm text-foreground truncate leading-snug mt-0.5", children: lyric.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bookmark,
            {
              className: "w-3.5 h-3.5 shrink-0 mt-1 transition-colors",
              style: { color: "oklch(var(--primary) / 0.7)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
              style: {
                background: "oklch(var(--secondary))",
                color: "oklch(var(--foreground))"
              },
              children: (lyric.contributorName ?? "").charAt(0).toUpperCase() || "?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs truncate", children: lyric.contributorName })
        ] })
      ]
    }
  );
}
function SongRowCard({ lyric, index }) {
  const snippet = (lyric.lyrics ?? "").split("\n")[0] ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/lyrics/$id",
      params: { id: lyric.id.toString() },
      className: "group flex items-start gap-4 bg-card border rounded-xl p-4 hover:border-primary/40 transition-smooth animate-fade-in",
      style: {
        borderColor: "oklch(var(--border) / 0.4)",
        animationDelay: `${index * 0.05}s`
      },
      "data-ocid": `song-row-${lyric.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 shrink-0 text-muted-foreground text-sm font-mono text-center pt-0.5", children: index + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-display font-bold text-lg",
            style: {
              background: "oklch(var(--primary) / 0.15)",
              color: "oklch(var(--primary))"
            },
            children: (lyric.artist ?? "").charAt(0).toUpperCase() || "?"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-snug truncate", children: lyric.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: lyric.artist }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-1 italic opacity-70", children: snippet })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 space-y-1", children: [
          lyric.yearReleased > 0n && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lyric.yearReleased.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: Number(lyric.viewCount) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[100px]", children: lyric.contributorName })
        ] })
      ]
    }
  );
}
function ArtistCard({ name, songCount }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/",
      search: { q: name, genre: "", year: "All" },
      className: "flex flex-col items-center gap-2 group",
      "data-ocid": `artist-card-${(name ?? "").toLowerCase().replace(/\s/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-2xl transition-transform group-hover:scale-105 border-2",
            style: {
              background: "oklch(var(--primary) / 0.15)",
              color: "oklch(var(--primary))",
              borderColor: "oklch(var(--primary) / 0.25)"
            },
            children: (name ?? "").charAt(0).toUpperCase() || "?"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate max-w-[72px]", children: name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
          songCount,
          " ",
          songCount === 1 ? "song" : "songs"
        ] })
      ]
    }
  );
}
function FeaturedCard({ lyric }) {
  const verses = (lyric.lyrics ?? "").split("\n\n").slice(0, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/lyrics/$id",
      params: { id: lyric.id.toString() },
      className: "block group",
      "data-ocid": "featured-lyric",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-smooth border",
          style: { borderColor: "oklch(var(--border) / 0.3)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative min-h-[240px] p-7 pb-14",
                style: {
                  background: "linear-gradient(145deg, oklch(0.88 0.06 65) 0%, oklch(0.83 0.05 55) 55%, oklch(0.79 0.04 45) 100%)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => e.preventDefault(),
                      className: "absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110",
                      style: { background: "oklch(var(--primary) / 0.5)" },
                      "aria-label": "Play",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4", style: { color: "oklch(0.12 0 0)" } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 pr-12", children: verses.map((verse) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display text-lg md:text-xl leading-relaxed",
                      style: { color: "oklch(0.18 0.04 30)" },
                      children: verse.split("\n").map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: line }, line))
                    },
                    verse.slice(0, 30)
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-7 py-4 flex items-center justify-between",
                style: { background: "oklch(0.77 0.065 55)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-mono text-xs",
                        style: { color: "oklch(0.35 0.06 40)" },
                        children: [
                          "Mpihira:",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "strong",
                            {
                              className: "font-bold",
                              style: { color: "oklch(0.18 0.04 30)" },
                              children: lyric.artist
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-mono text-xs mt-0.5",
                        style: { color: "oklch(0.35 0.06 40)" },
                        children: [
                          "Lirik nampidirin'i:",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "strong",
                            {
                              className: "font-bold",
                              style: { color: "oklch(0.18 0.04 30)" },
                              children: lyric.contributorName
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (e) => e.preventDefault(),
                        className: "w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110",
                        style: { background: "oklch(0.55 0.06 50 / 0.5)" },
                        "aria-label": "Favorite",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Star,
                          {
                            className: "w-3.5 h-3.5",
                            style: { color: "oklch(0.18 0.04 30)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (e) => e.preventDefault(),
                        className: "w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110",
                        style: { background: "oklch(0.55 0.06 50 / 0.5)" },
                        "aria-label": "Share",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Share2,
                          {
                            className: "w-3.5 h-3.5",
                            style: { color: "oklch(0.18 0.04 30)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform",
                        style: { background: "oklch(var(--primary))" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4", style: { color: "oklch(0.12 0 0)" } })
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function HomePage() {
  const {
    q = "",
    genre = "",
    year: yearParam = "All"
  } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [localQ, setLocalQ] = reactExports.useState(q);
  const [activeGenre, setActiveGenre] = reactExports.useState(genre === "" ? "All" : genre);
  const [sortOrder, setSortOrder] = reactExports.useState(
    "newest"
  );
  const [selectedYear, setSelectedYear] = reactExports.useState(yearParam);
  const searchTimeout = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      navigate({
        search: {
          q: localQ,
          genre: activeGenre === "All" ? "" : activeGenre,
          year: selectedYear
        }
      });
    }, 350);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [localQ, activeGenre, selectedYear, navigate]);
  const isSearching = localQ.trim().length > 0 || activeGenre !== "All" || selectedYear !== "All";
  const { data: allLyricsRaw, isLoading } = useLyrics();
  const allLyrics = allLyricsRaw;
  const { data: searchResultsRaw, isLoading: isSearchLoading } = useSearchLyrics({
    searchText: localQ,
    artistFilter: void 0,
    sortOrder: sortOrder === "alpha" ? { __kind__: "alphabetical" } : sortOrder === "oldest" ? { __kind__: "mostRecent" } : { __kind__: "mostRecent" }
  });
  const searchResults = searchResultsRaw;
  const { data: artistsRaw } = useArtists();
  const artists = artistsRaw;
  const rawResults = isSearching ? searchResults ?? [] : allLyrics ?? [];
  const displayLyrics = selectedYear === "All" ? rawResults : rawResults.filter((l) => {
    const yr = Number(l.yearReleased);
    if (!yr) return false;
    if (selectedYear === "2020s") return yr >= 2020;
    if (selectedYear === "2010s") return yr >= 2010 && yr < 2020;
    if (selectedYear === "2000s") return yr >= 2e3 && yr < 2010;
    if (selectedYear === "1990s") return yr >= 1990 && yr < 2e3;
    if (selectedYear === "1980s") return yr >= 1980 && yr < 1990;
    if (selectedYear === "Classic") return yr < 1980;
    return true;
  });
  const sortedLyrics = [...displayLyrics].sort((a, b) => {
    if (sortOrder === "alpha")
      return (a.title ?? "").localeCompare(b.title ?? "");
    if (sortOrder === "oldest")
      return Number(a.submittedAt) - Number(b.submittedAt);
    return Number(b.submittedAt) - Number(a.submittedAt);
  });
  const featuredLyric = allLyrics == null ? void 0 : allLyrics[0];
  const recentLyrics = (allLyrics == null ? void 0 : allLyrics.slice(0, 8)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border-b sticky top-16 z-40",
        style: { borderColor: "oklch(var(--border) / 0.5)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: localQ,
                onChange: (e) => setLocalQ(e.target.value),
                placeholder: "Search songs, artists, contributors…",
                className: "pl-10 pr-4 bg-muted/50 border-border/30 h-11 rounded-xl focus-visible:ring-1",
                "data-ocid": "search-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: activeGenre, onValueChange: setActiveGenre, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-32 h-9 text-sm bg-muted/50 border-border/30",
                  "data-ocid": "genre-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Genre" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedYear, onValueChange: setSelectedYear, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-28 h-9 text-sm bg-muted/50 border-border/30",
                  "data-ocid": "year-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Year" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y, children: y }, y)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: sortOrder,
                onValueChange: (v) => setSortOrder(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-32 h-9 text-sm bg-muted/50 border-border/30",
                      "data-ocid": "sort-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                      "Most recent"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "oldest", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                      "Oldest"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "alpha", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpNarrowWide, { className: "w-3.5 h-3.5" }),
                      "Alphabetical"
                    ] }) })
                  ] })
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-6", children: !isSearching ? (
      /* ── Default view: featured + recent + sidebar ─────────────── */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "animate-fade-up", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 w-full rounded-xl" }) : featuredLyric ? /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedCard, { lyric: featuredLyric }) : null }),
          recentLyrics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Recently Shared Lyrics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setLocalQ(" "),
                  className: "text-sm hover:underline transition-colors",
                  style: { color: "oklch(var(--primary))" },
                  "data-ocid": "see-all-lyrics",
                  children: "See all"
                }
              )
            ] }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2 scrollbar-hide", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: "w-52 h-32 shrink-0 rounded-xl"
              },
              k
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-3 overflow-x-auto pb-2",
                style: { scrollbarWidth: "none" },
                children: recentLyrics.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecentCard, { lyric: l }, l.id.toString()))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "All Songs" }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }, k)) }) : (allLyrics ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl border p-12 text-center",
                style: { borderColor: "oklch(var(--border) / 0.4)" },
                "data-ocid": "empty-lyrics-state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5",
                      style: { background: "oklch(var(--primary) / 0.1)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Music2,
                        {
                          className: "w-8 h-8",
                          style: { color: "oklch(var(--primary) / 0.6)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No lyrics yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto mb-5 leading-relaxed", children: "Be the first to add Malagasy song lyrics and help preserve the music culture!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "empty-lyrics-cta", children: "Contribute Lyrics" }) })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: (allLyrics ?? []).map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(LyricCardCompact, { lyric: l }, l.id.toString())) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border rounded-xl p-5 space-y-4 animate-fade-up",
              style: {
                borderColor: "oklch(var(--border) / 0.4)",
                animationDelay: "0.1s"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Library" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
                  {
                    icon: BookOpen,
                    label: "Songs",
                    value: (allLyrics == null ? void 0 : allLyrics.length) ?? 0
                  },
                  {
                    icon: Users,
                    label: "Artists",
                    value: (artists == null ? void 0 : artists.length) ?? 0
                  },
                  { icon: Music2, label: "Genres", value: GENRES.length - 1 }
                ].map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: "w-4 h-4 mx-auto mb-1",
                      style: { color: "oklch(var(--primary))" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground", children: value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: label })
                ] }, label)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-5 animate-fade-up",
              style: {
                background: "oklch(var(--primary) / 0.12)",
                borderColor: "oklch(var(--primary) / 0.3)",
                border: "1px solid",
                animationDelay: "0.15s"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm mb-1", children: "Share Lyrics" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 leading-relaxed", children: "Help preserve Malagasy music culture by contributing song lyrics." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "w-full font-medium",
                    "data-ocid": "submit-lyrics-cta",
                    children: "Contribute Lyrics"
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border rounded-xl p-5 animate-fade-up",
              style: {
                borderColor: "oklch(var(--border) / 0.4)",
                animationDelay: "0.2s"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Explore Artists" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-y-5 gap-x-2", children: (artists ?? []).slice(0, 6).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ArtistCard,
                  {
                    name: a.name,
                    songCount: a.songCount
                  },
                  a.name
                )) })
              ]
            }
          )
        ] })
      ] })
    ) : (
      /* ── Search results view ──────────────────────────────────── */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: isSearchLoading ? "Searching…" : `${sortedLyrics.length} result${sortedLyrics.length !== 1 ? "s" : ""}` }),
            localQ && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              "for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                '"',
                localQ,
                '"'
              ] }),
              activeGenre !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                " ",
                "·",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(var(--primary))" }, children: activeGenre })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setLocalQ("");
                setActiveGenre("All");
                setSelectedYear("All");
              },
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg bg-muted/40 hover:bg-muted/70",
              "data-ocid": "clear-search",
              children: "Clear all filters"
            }
          )
        ] }),
        isSearchLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) }) : sortedLyrics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24", "data-ocid": "empty-search", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No lyrics found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto", children: "No songs matched your filters. Try a different search term, artist name, or browse all genres." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "mt-5",
              onClick: () => {
                setLocalQ("");
                setActiveGenre("All");
                setSelectedYear("All");
              },
              "data-ocid": "empty-search-cta",
              children: "Browse all lyrics"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sortedLyrics.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SongRowCard, { lyric: l, index: i }, l.id.toString())) })
      ] })
    ) })
  ] });
}
export {
  HomePage
};
