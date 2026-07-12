import { t as require_jsx_runtime } from "../index.js";
import { c as useShortlist } from "./storage-04iwjZ0v.js";
//#region components/ShortlistButton.tsx
var import_jsx_runtime = require_jsx_runtime();
function ShortlistButton({ programId, className }) {
	const { ready, has, toggle } = useShortlist();
	const saved = has(programId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => toggle(programId),
		disabled: !ready,
		"aria-pressed": saved,
		className: className ?? `inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition disabled:opacity-50 ${saved ? "bg-forest-900 text-white hover:bg-forest-700" : "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700"}`,
		children: saved ? "Saved to shortlist" : "Add to shortlist"
	});
}
//#endregion
export { ShortlistButton as t };
