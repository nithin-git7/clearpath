import { t as require_jsx_runtime } from "../index.js";
import { t as formatDate } from "./catalog-BUkyPvtq.js";
//#region components/VerifiedNote.tsx
var import_jsx_runtime = require_jsx_runtime();
function VerifiedNote({ lastVerified, officialLink, label = "Confirm on the official page" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "size-1.5 rounded-full bg-amber-500"
			}),
			"Verified on ",
			formatDate(lastVerified),
			".",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: officialLink,
				target: "_blank",
				rel: "noreferrer",
				className: "font-semibold underline decoration-amber-500 underline-offset-2 hover:text-amber-900",
				children: label
			})
		]
	});
}
//#endregion
export { VerifiedNote as t };
