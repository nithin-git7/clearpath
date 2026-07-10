import { t as require_jsx_runtime } from "../index.js";
import { a as useCompareList } from "./storage-y8L7VKP1.js";
//#region components/CompareButton.tsx
var import_jsx_runtime = require_jsx_runtime();
function CompareButton({ programId, className }) {
	const { ready, has, toggle, full } = useCompareList();
	const selected = has(programId);
	const disabled = !selected && full;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => toggle(programId),
		disabled: !ready || disabled,
		"aria-pressed": selected,
		title: disabled ? "You can compare up to 3 programs" : void 0,
		className: className ?? `inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition disabled:opacity-50 ${selected ? "border border-forest-700 bg-white text-forest-800" : "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700"}`,
		children: selected ? "In compare" : "Compare"
	});
}
//#endregion
export { CompareButton as t };
