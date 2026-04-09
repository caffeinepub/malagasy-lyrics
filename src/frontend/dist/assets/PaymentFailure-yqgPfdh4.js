import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, L as Link, k as ShoppingBag } from "./index-BA6E-qdy.js";
import { A as ArrowLeft } from "./arrow-left-D8HAsAFs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function PaymentFailurePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-24 max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
        style: { background: "oklch(var(--destructive) / 0.12)" },
        "data-ocid": "payment-failure-icon",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleX,
          {
            className: "w-10 h-10",
            style: { color: "oklch(var(--destructive))" }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground mb-3", children: "Payment Cancelled" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Your payment was not completed. No charges were made. You can try again anytime." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => window.history.back(),
          className: "gap-2 w-full sm:w-auto",
          "data-ocid": "payment-failure-retry",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Go Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", search: { q: "", artist: "", sort: "newest" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2 w-full sm:w-auto",
          "data-ocid": "payment-failure-browse",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
            "Browse Store"
          ]
        }
      ) })
    ] })
  ] });
}
export {
  PaymentFailurePage
};
