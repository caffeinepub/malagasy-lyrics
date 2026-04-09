import { c as createLucideIcon, u as useSearch, r as reactExports, f as ue, j as jsxRuntimeExports, L as Link, B as Button, k as ShoppingBag } from "./index-CuwG8XZl.js";
import { h as useRecordPurchase } from "./useMusic-Fc2f8DSr.js";
import { C as CircleCheck } from "./circle-check-xN76B_Xk.js";
import "./backend-CB2cqg7Z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
function PaymentSuccessPage() {
  const { trackId = "", session_id = "" } = useSearch({
    from: "/payment-success"
  });
  const recordPurchase = useRecordPurchase();
  const recorded = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!recorded.current && trackId && session_id) {
      recorded.current = true;
      recordPurchase.mutateAsync({ trackId, sessionId: session_id }).catch(() => {
        ue.error(
          "Could not record your purchase. Please contact support."
        );
      });
    }
  }, [trackId, session_id, recordPurchase]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-24 max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
        style: { background: "oklch(var(--success) / 0.15)" },
        "data-ocid": "payment-success-icon",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleCheck,
          {
            className: "w-10 h-10",
            style: { color: "oklch(var(--success))" }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground mb-3", children: "Purchase Complete!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2 leading-relaxed", children: "Thank you for supporting Malagasy music. Your track is ready." }),
    trackId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-8", children: [
      "Track ID: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: trackId })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
      trackId && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store/$id", params: { id: trackId }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "gap-2 w-full sm:w-auto",
          "data-ocid": "payment-success-download",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            "Access Track"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", search: { q: "", artist: "", sort: "newest" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2 w-full sm:w-auto",
          "data-ocid": "payment-success-browse",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
            "Browse More Music"
          ]
        }
      ) })
    ] })
  ] });
}
export {
  PaymentSuccessPage
};
