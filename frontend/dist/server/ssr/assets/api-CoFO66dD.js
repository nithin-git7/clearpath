import { t as require_jsx_runtime } from "../index.js";
//#region components/SiteFooter.tsx
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-white/10 bg-forest-950 py-8 text-white/55",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 ClearPath Germany" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Educational planning only. Always verify with official sources." })]
		})
	});
}
var ApiError = class extends Error {
	constructor(message, status) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
};
function buildQuery(params) {
	if (!params) return "";
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) if (value !== void 0 && value !== "") search.set(key, String(value));
	const query = search.toString();
	return query ? `?${query}` : "";
}
async function apiGet(path, params) {
	let response;
	try {
		response = await fetch(`${path}${buildQuery(params)}`, {
			headers: { "Content-Type": "application/json" },
			cache: "no-store"
		});
	} catch {
		throw new ApiError("Could not reach the ClearPath service. Check that the backend is running.", 0);
	}
	if (!response.ok) throw new ApiError(`Request failed with status ${response.status}.`, response.status);
	return await response.json();
}
async function apiPost(path, body) {
	let response;
	try {
		response = await fetch(`${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			cache: "no-store"
		});
	} catch {
		throw new ApiError("Could not reach the ClearPath service. Check that the backend is running.", 0);
	}
	if (!response.ok) {
		let detail = `Request failed with status ${response.status}.`;
		try {
			const payload = await response.json();
			if (typeof payload.detail === "string") detail = payload.detail;
		} catch {}
		throw new ApiError(detail, response.status);
	}
	return await response.json();
}
//#endregion
export { SiteFooter as i, apiGet as n, apiPost as r, ApiError as t };
