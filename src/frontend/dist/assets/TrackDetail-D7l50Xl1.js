import { c as createLucideIcon, d as useParams, r as reactExports, j as jsxRuntimeExports, b as Skeleton, L as Link, B as Button, f as ue } from "./index-CuwG8XZl.js";
import { B as Badge } from "./badge-yNz8ofHc.js";
import { a as useTrack, b as useCreateCheckoutSession } from "./useMusic-Fc2f8DSr.js";
import { C as CircleAlert } from "./circle-alert-BU46s4U8.js";
import { A as ArrowLeft } from "./arrow-left-CqV3jeyk.js";
import { C as ChevronRight } from "./chevron-right-C8EbJ44G.js";
import { D as Disc3, M as Music } from "./music-Df9EbjH3.js";
import { P as Play } from "./play-BgP-EySd.js";
import { U as User } from "./user-bzUc2AK2.js";
import "./backend-CB2cqg7Z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
];
const Pause = createLucideIcon("pause", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode);
function TrackDetailPage() {
  const { id } = useParams({ from: "/store/$id" });
  const { data: track, isLoading } = useTrack(id);
  const checkout = useCreateCheckoutSession();
  const [isRedirecting, setIsRedirecting] = reactExports.useState(false);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const audioRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      var _a;
      (_a = audioRef.current) == null ? void 0 : _a.pause();
    };
  }, []);
  function handleTogglePlay() {
    if (!(track == null ? void 0 : track.audioFile)) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(track.audioFile);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        ue.error("Could not play audio preview");
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }
  async function handleBuy() {
    if (!track) return;
    try {
      setIsRedirecting(true);
      const session = await checkout.mutateAsync({
        trackId: track.id,
        trackTitle: track.title,
        priceUSD: track.priceUSD
      });
      if (!(session == null ? void 0 : session.url)) throw new Error("Stripe session missing url");
      window.location.href = session.url;
    } catch (err) {
      setIsRedirecting(false);
      ue.error(
        err instanceof Error ? err.message : "Checkout failed. Please retry."
      );
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[360px_1fr] gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-32 mt-6" })
        ] })
      ] })
    ] });
  }
  if (!track) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-24 text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CircleAlert,
        {
          className: "w-12 h-12 mx-auto mb-4",
          style: { color: "oklch(var(--destructive))" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Track not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This track may have been removed or the link is incorrect." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", search: { q: "", artist: "", sort: "newest" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Back to Store"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1 text-sm text-muted-foreground mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/store",
          search: { q: "", artist: "", sort: "newest" },
          className: "hover:text-foreground transition-colors",
          children: "Music Store"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate", children: track.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[360px_1fr] gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aspect-square rounded-xl overflow-hidden shadow-track-card",
            style: { background: "oklch(var(--muted) / 0.2)" },
            children: track.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: track.coverImage,
                alt: track.title,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Disc3,
              {
                className: "w-24 h-24",
                style: { color: "oklch(var(--primary) / 0.3)" }
              }
            ) })
          }
        ),
        track.audioFile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-4 rounded-lg p-4 flex items-center gap-3",
            style: {
              background: "oklch(var(--muted) / 0.3)",
              border: "1px solid oklch(var(--border) / 0.3)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105",
                  style: { background: "oklch(var(--primary))" },
                  "aria-label": isPlaying ? "Pause preview" : "Preview track",
                  onClick: handleTogglePlay,
                  "data-ocid": "track-preview-play",
                  children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Pause,
                    {
                      className: "w-4 h-4",
                      style: { color: "oklch(0.12 0 0)" }
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Play,
                    {
                      className: "w-4 h-4 ml-0.5",
                      style: { color: "oklch(0.12 0 0)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: track.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isPlaying ? "Playing preview…" : "Preview" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-wrap mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "text-[10px]",
              style: { borderColor: "oklch(var(--primary) / 0.3)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-3 h-3 mr-1" }),
                "Malagasy Music"
              ]
            }
          ),
          track.published && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "text-[10px]",
              style: {
                background: "oklch(var(--success) / 0.15)",
                color: "oklch(var(--success))",
                borderColor: "oklch(var(--success) / 0.3)"
              },
              children: "Available"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight mt-2 mb-1", children: track.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-lg font-medium mb-1",
            style: { color: "oklch(var(--muted-foreground))" },
            children: track.artist
          }
        ),
        track.album && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: track.album }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
              style: {
                background: "oklch(var(--primary) / 0.15)",
                color: "oklch(var(--primary))"
              },
              children: (track.sellerName ?? "").charAt(0).toUpperCase() || "?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sold by" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: track.sellerName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-6 mt-auto",
            style: {
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border) / 0.4)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display text-4xl font-bold",
                    style: { color: "oklch(var(--primary))" },
                    children: [
                      "$",
                      track.priceUSD.toFixed(2)
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm mb-1", children: "USD" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "w-full gap-2 font-medium text-base",
                  onClick: handleBuy,
                  disabled: isRedirecting || checkout.isPending,
                  "data-ocid": "track-buy-cta",
                  children: isRedirecting || checkout.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    "Redirecting to checkout…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                    "Buy Now"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-3", children: "Secure checkout via Stripe · Instant download after purchase" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center gap-4 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
          Number(track.viewCount),
          " plays"
        ] }) })
      ] })
    ] })
  ] });
}
export {
  TrackDetailPage
};
