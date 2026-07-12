import { t as require_jsx_runtime } from "../index.js";
import Link from "./link-BXsC33E9.js";
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
async function responseErrorMessage(response) {
	const fallback = `Request failed with status ${response.status}.`;
	try {
		const payload = await response.json();
		return typeof payload.detail === "string" ? payload.detail : fallback;
	} catch {
		return fallback;
	}
}
async function apiGet(path, params) {
	let response;
	try {
		response = await fetch(`${path}${buildQuery(params)}`, {
			headers: { "Content-Type": "application/json" },
			cache: "no-store"
		});
	} catch {
		throw new ApiError("The ClearPath service is temporarily unavailable. Please try again in a moment.", 0);
	}
	if (!response.ok) throw new ApiError(await responseErrorMessage(response), response.status);
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
		throw new ApiError("The ClearPath service is temporarily unavailable. Please try again in a moment.", 0);
	}
	if (!response.ok) throw new ApiError(await responseErrorMessage(response), response.status);
	return await response.json();
}
//#endregion
//#region lib/catalog.ts
function getUniversities(params) {
	return apiGet("/api/universities", params);
}
function getUniversity(id) {
	return apiGet(`/api/universities/${id}`);
}
function getPrograms(params) {
	return apiGet("/api/programs", params);
}
function getProgram(id) {
	return apiGet(`/api/programs/${id}`);
}
function getDeadlines(intake) {
	return apiGet("/api/deadlines", intake ? { intake } : void 0);
}
function getCostOfLiving() {
	return apiGet("/api/cost-of-living");
}
function formatEuro(amount) {
	return amount === 0 ? "No tuition fee" : new Intl.NumberFormat("en-DE", {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 0
	}).format(amount);
}
var DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
var DAY_MS = 1440 * 60 * 1e3;
function dateOnlyParts(value) {
	const match = DATE_ONLY_PATTERN.exec(value);
	if (!match) return null;
	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	const parsed = new Date(year, month - 1, day);
	return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day ? [
		year,
		month,
		day
	] : null;
}
function formatDate(value) {
	const parts = dateOnlyParts(value);
	const parsed = parts ? new Date(parts[0], parts[1] - 1, parts[2]) : new Date(value);
	if (Number.isNaN(parsed.getTime())) return value;
	return parsed.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function daysUntilDate(value, today = /* @__PURE__ */ new Date()) {
	const parts = dateOnlyParts(value);
	if (!parts) {
		const parsed = new Date(value);
		return Number.isNaN(parsed.getTime()) ? NaN : Math.ceil((parsed.getTime() - today.getTime()) / DAY_MS);
	}
	const targetDay = Date.UTC(parts[0], parts[1] - 1, parts[2]);
	const currentDay = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
	return Math.round((targetDay - currentDay) / DAY_MS);
}
function getDeadlineStatus(value, today = /* @__PURE__ */ new Date()) {
	const days = daysUntilDate(value, today);
	if (!Number.isFinite(days)) return "unknown";
	if (days < 0) return "passed";
	if (days <= 45) return "near";
	return "upcoming";
}
function deadlineStatusLabel(value, today = /* @__PURE__ */ new Date()) {
	const days = daysUntilDate(value, today);
	const status = getDeadlineStatus(value, today);
	if (status === "unknown") return "Confirm date";
	if (status === "passed") return "Passed for this cycle";
	if (days === 0) return "Due today";
	if (days === 1) return "1 day left";
	return `${days} days left`;
}
function getNextDeadline(deadlines, today = /* @__PURE__ */ new Date()) {
	return deadlines.filter((entry) => getDeadlineStatus(entry.deadline, today) === "near" || getDeadlineStatus(entry.deadline, today) === "upcoming").sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
}
//#endregion
//#region lib/official-info-data.ts
var SITE_INFORMATION_LAST_REVIEWED = "2026-07-11";
var OFFICIAL_FACTS = {
	studentFinance: {
		id: "student-finance-2026",
		title: "Student visa financial proof",
		summary: "For 2026, official student-visa guidance lists at least EUR 11,904 in a blocked account as one way to prove funds. A scholarship or declaration of commitment may also be accepted.",
		appliesTo: "Applicants using the student visa route in 2026",
		sourceLabel: "Make it in Germany: visa for studying",
		sourceUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
		lastVerified: SITE_INFORMATION_LAST_REVIEWED,
		caution: "Confirm the amount and accepted proof with the German mission handling your case before transferring money."
	},
	studentWork: {
		id: "student-work-limits",
		title: "Work while studying",
		summary: "Official guidance states that many students from third countries may work up to 140 full days or 280 half days per year, or up to 20 hours per week. Student-assistant work can follow different treatment.",
		appliesTo: "Many third-country students holding a German study residence title",
		sourceLabel: "Make it in Germany: visa for studying",
		sourceUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
		lastVerified: SITE_INFORMATION_LAST_REVIEWED,
		caution: "Your residence title, type of job, and study status can change what is allowed. Confirm before starting work."
	},
	uniAssistTiming: {
		id: "uni-assist-processing",
		title: "uni-assist and VPD timing",
		summary: "uni-assist recommends applying at least eight weeks before a deadline where possible. A VPD usually takes four to six weeks, but current regional processing times can be longer.",
		appliesTo: "Applicants whose chosen university uses uni-assist or requires a VPD",
		sourceLabel: "uni-assist: deadlines and processing time",
		sourceUrl: "https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/",
		lastVerified: SITE_INFORMATION_LAST_REVIEWED,
		caution: "For a VPD, you normally must still submit the VPD to the university before its own deadline."
	},
	apsIndiaUndergraduate: {
		id: "aps-india-winter-2026",
		title: "APS India criteria from winter 2026/27",
		summary: "APS India states that updated undergraduate criteria apply from winter semester 2026/27, including a minimum 70% overall Class XII score for the described Studienkolleg and one-academic-year pathways.",
		appliesTo: "Indian undergraduate applicants using the pathways described by APS India",
		sourceLabel: "APS India: news and updates",
		sourceUrl: "https://aps-india.de/news/",
		lastVerified: SITE_INFORMATION_LAST_REVIEWED,
		caution: "This is not a universal admission guarantee. Universities make admission decisions and may impose additional requirements."
	},
	apsIndiaDmat: {
		id: "aps-india-dmat-2026",
		title: "dMAT for selected master's applicants",
		summary: "APS India introduced dMAT for selected applicants whose previous degree is in listed engineering, commerce, finance, economics, business, or management fields, for summer 2027 and later intakes, subject to published transitional exemptions.",
		appliesTo: "Selected master's applicants from India whose previous degree appears in the official affected-fields list",
		sourceLabel: "APS India: dMAT",
		sourceUrl: "https://aps-india.de/dmat/",
		lastVerified: SITE_INFORMATION_LAST_REVIEWED,
		caution: "Use the official affected-fields list and transition rules; dMAT does not replace APS verification, anabin, or university admission review."
	},
	visaPortal: {
		id: "consular-services-portal",
		title: "Online national visa applications",
		summary: "Germany's Federal Foreign Office says national visa applications can be prepared and submitted through the Consular Services Portal, with all visa sections connected since January 2025.",
		appliesTo: "Visa categories and locations supported by the portal",
		sourceLabel: "Federal Foreign Office: visas for Germany",
		sourceUrl: "https://www.auswaertiges-amt.de/en/visa-service/215870-215870",
		lastVerified: SITE_INFORMATION_LAST_REVIEWED,
		caution: "Follow the German mission responsible for your place of residence; local appointment and document steps can differ."
	},
	arrivalRegistration: {
		id: "address-registration",
		title: "Registering after moving in",
		summary: "Official guidance says you should register your address with the local registration office within two weeks of moving into a residence in Germany.",
		appliesTo: "People moving into a registrable residence in Germany",
		sourceLabel: "Make it in Germany: housing and registration",
		sourceUrl: "https://www.make-it-in-germany.com/en/living-in-germany/housing-mobility/housing-registration",
		lastVerified: SITE_INFORMATION_LAST_REVIEWED,
		caution: "Appointment availability and requested documents are handled locally; check the website of your city or municipality."
	}
};
var TRUSTED_OFFICIAL_RESOURCES = [
	{
		label: "DAAD",
		href: "https://www.daad.de/en/studying-in-germany/"
	},
	{
		label: "uni-assist",
		href: "https://www.uni-assist.de/en/"
	},
	{
		label: "Make it in Germany",
		href: "https://www.make-it-in-germany.com/en/"
	},
	{
		label: "Federal Foreign Office",
		href: "https://www.auswaertiges-amt.de/en/visa-service"
	}
];
//#endregion
//#region components/SiteFooter.tsx
var import_jsx_runtime = require_jsx_runtime();
var PRODUCT_LINKS = [
	["Control room", "/hub"],
	["Explore programs", "/explore"],
	["Build a roadmap", "/roadmap"],
	["Track deadlines", "/deadlines"],
	["Plan finances", "/finance"],
	["Explain a document", "/explain"]
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-white/10 bg-forest-950 text-white/70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-semibold text-white",
						children: "ClearPath Germany"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm leading-6",
						children: "A private-by-default planning workspace for international students. Know your next step, why it matters, and where to verify it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs text-white/50",
						children: ["Information reviewed ", formatDate(SITE_INFORMATION_LAST_REVIEWED)]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold uppercase tracking-[0.12em] text-lime-300",
					children: "Plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: PRODUCT_LINKS.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "hover:text-white",
						href,
						children: label
					}) }, href))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold uppercase tracking-[0.12em] text-lime-300",
					children: "Verify officially"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: TRUSTED_OFFICIAL_RESOURCES.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "hover:text-white",
						href: resource.href,
						target: "_blank",
						rel: "noreferrer",
						children: [resource.label, " ↗"]
					}) }, resource.href))
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/50 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 ClearPath Germany. Progress stays on this device unless a tool submits text for analysis." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Educational planning only. No admission, visa, or work-authorisation guarantees." })]
			})
		})]
	});
}
//#endregion
export { formatEuro as a, getDeadlines as c, getPrograms as d, getUniversities as f, apiPost as h, formatDate as i, getNextDeadline as l, ApiError as m, OFFICIAL_FACTS as n, getCostOfLiving as o, getUniversity as p, deadlineStatusLabel as r, getDeadlineStatus as s, SiteFooter as t, getProgram as u };
