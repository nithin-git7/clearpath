import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
//#region app/error.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GlobalError({ error, reset }) {
	(0, import_react.useEffect)(() => {
		console.error(error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		id: "main-content",
		className: "grid min-h-[70vh] place-items-center bg-cream-50 px-5 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card max-w-xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-kicker",
					children: "Temporary problem"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl font-semibold tracking-[-0.04em] text-forest-950",
					children: "This page could not finish loading."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 leading-7 text-slate-600",
					children: "Your device-saved shortlist and progress have not been deleted. Try the page again or return to your control room."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col justify-center gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: reset,
						className: "primary-button",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/hub",
						className: "secondary-button",
						children: "Open control room"
					})]
				})
			]
		})
	});
}
//#endregion
export { GlobalError as default };
