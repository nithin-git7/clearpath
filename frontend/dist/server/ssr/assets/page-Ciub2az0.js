import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { h as apiPost, i as formatDate, m as ApiError, t as SiteFooter } from "./SiteFooter-CKFxsOC_.js";
import { l as writeJson, n as ROADMAP_RESULT_STORAGE, r as readJson, t as ROADMAP_DRAFT_STORAGE } from "./storage-04iwjZ0v.js";
import { t as VerifiedNote } from "./VerifiedNote-hgpaD9mK.js";
//#region lib/aps.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var APS_COUNTRIES = [
	{
		name: "India",
		code: "IN",
		portal: "https://www.aps-india.de/",
		last_verified: "2026-07-11"
	},
	{
		name: "China",
		code: "CN",
		portal: "https://www.aps.org.cn/",
		last_verified: "2026-07-11"
	},
	{
		name: "Vietnam",
		code: "VN",
		portal: "https://vietnam.diplo.de/vn-de/willkommen/aktuelles/aps-1236800",
		last_verified: "2026-07-11"
	}
];
function lookupApsCountry(query) {
	const needle = query.trim().toLowerCase();
	if (!needle) return null;
	return APS_COUNTRIES.find((c) => c.name.toLowerCase() === needle || c.code.toLowerCase() === needle || c.name.toLowerCase().includes(needle)) ?? null;
}
//#endregion
//#region components/ApsChecker.tsx
var import_jsx_runtime = require_jsx_runtime();
function ApsChecker({ currentStatus, onStatusChange }) {
	const [country, setCountry] = (0, import_react.useState)("");
	const [match, setMatch] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const check = () => {
		const found = lookupApsCountry(country);
		setMatch(found);
		setChecked(true);
		if (found) onStatusChange("required");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "surface-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold text-forest-950",
				children: "APS country checker"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-6 text-slate-600",
				children: "Applicants with academic credentials from some countries may need APS verification. Check where your relevant qualification was issued; this updates the APS field in your roadmap."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "aps-country",
						children: "Country where your qualification was issued"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "aps-country",
						className: "field-input min-w-[12rem] flex-1",
						placeholder: "e.g. India, China, Vietnam",
						value: country,
						onChange: (e) => {
							setCountry(e.target.value);
							setChecked(false);
						},
						onKeyDown: (e) => e.key === "Enter" && (e.preventDefault(), check())
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: check,
						className: "secondary-button",
						children: "Check APS"
					})
				]
			}),
			match?.name === "India" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "India updates for 2026/27 intakes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "APS has published updated undergraduate eligibility criteria from winter 2026/27 and a dMAT requirement for selected master's applicants in specified fields from summer 2027. These rules are applicant-specific."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-x-4 gap-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://aps-india.de/news/",
							target: "_blank",
							rel: "noreferrer",
							className: "link-underline",
							children: "Undergraduate notice"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://aps-india.de/dmat/",
							target: "_blank",
							rel: "noreferrer",
							className: "link-underline",
							children: "dMAT scope"
						})]
					})
				]
			}),
			match && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [
						"APS likely required for ",
						match.name,
						"."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1",
					children: [
						"Treat APS as an early, potentially long-lead step and check the current procedure. Source checked ",
						formatDate(match.last_verified),
						".",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: match.portal,
							target: "_blank",
							rel: "noreferrer",
							className: "link-underline",
							children: "Open the official APS portal"
						})
					]
				})]
			}),
			checked && !match && country.trim().length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-slate-600",
				children: [
					"No APS match in our curated list for “",
					country.trim(),
					"”. Set APS status manually below (currently: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentStatus.replaceAll("_", " ") }),
					")."
				]
			})
		]
	});
}
//#endregion
//#region lib/roadmap.ts
var DEFAULT_ROADMAP_REQUEST = {
	education_status: "bachelor_done",
	target_degree: "master",
	field: "Computer Science",
	target_intake: "winter",
	aps_status: "unsure",
	study_language: "English",
	language_test_status: "not_started",
	admission_status: "researching",
	finance_status: "not_started",
	visa_status: "not_started"
};
function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function isStringArray(value) {
	return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function isRoadmapRequest(value) {
	if (!isRecord(value)) return false;
	return [
		"highschool",
		"bachelor_in_progress",
		"bachelor_done",
		"master_done"
	].includes(String(value.education_status)) && ["bachelor", "master"].includes(String(value.target_degree)) && typeof value.field === "string" && value.field.length > 0 && value.field.length <= 120 && ["winter", "summer"].includes(String(value.target_intake)) && [
		"required",
		"not_required",
		"unsure"
	].includes(String(value.aps_status)) && ["English", "German"].includes(String(value.study_language)) && [
		"not_started",
		"preparing",
		"passed"
	].includes(String(value.language_test_status)) && [
		"researching",
		"applied",
		"admitted"
	].includes(String(value.admission_status)) && [
		"not_started",
		"in_progress",
		"ready"
	].includes(String(value.finance_status)) && [
		"not_started",
		"appointment_booked",
		"approved"
	].includes(String(value.visa_status));
}
function isRoadmapResponse(value) {
	if (!isRecord(value) || ![
		"plan",
		"prepare",
		"apply",
		"visa",
		"arrival"
	].includes(String(value.stage))) return false;
	if (typeof value.stage_title !== "string" || typeof value.stage_summary !== "string" || typeof value.disclaimer !== "string") return false;
	if (![
		value.next_actions,
		value.documents_now,
		value.documents_later,
		value.common_mistakes
	].every(isStringArray)) return false;
	if (!Array.isArray(value.weekly_plan) || !value.weekly_plan.every((item) => isRecord(item) && typeof item.week === "number" && typeof item.focus === "string")) return false;
	return Array.isArray(value.resources) && value.resources.every((item) => isRecord(item) && typeof item.label === "string" && typeof item.url === "string" && typeof item.last_verified === "string");
}
function generateRoadmap(profile) {
	return apiPost("/api/roadmap/generate", profile);
}
var STAGE_LABELS = {
	plan: "Stage 1 — Plan",
	prepare: "Stage 2 — Prepare",
	apply: "Stage 3 — Apply",
	visa: "Stage 4 — Visa",
	arrival: "Stage 5 — Arrival"
};
//#endregion
//#region app/roadmap/page.tsx
function SelectField({ label, id, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "field-label",
		htmlFor: id,
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		id,
		className: "field-input",
		value,
		onChange: (e) => onChange(e.target.value),
		children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: opt.value,
			children: opt.label
		}, opt.value))
	})] });
}
function RoadmapPage() {
	const [form, setForm] = (0, import_react.useState)(DEFAULT_ROADMAP_REQUEST);
	const [result, setResult] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const draft = readJson(ROADMAP_DRAFT_STORAGE);
		const saved = readJson(ROADMAP_RESULT_STORAGE);
		if (isRoadmapRequest(draft)) setForm(draft);
		if (isRoadmapResponse(saved)) setResult(saved);
	}, []);
	const update = (key, value) => {
		setForm((current) => {
			const next = {
				...current,
				[key]: value
			};
			writeJson(ROADMAP_DRAFT_STORAGE, next);
			return next;
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const response = await generateRoadmap(form);
			setResult(response);
			writeJson(ROADMAP_RESULT_STORAGE, response);
			document.getElementById("roadmap-results")?.scrollIntoView({ behavior: "smooth" });
		} catch (caught) {
			setError(caught instanceof ApiError ? caught.message : "Could not generate your roadmap.");
		} finally {
			setLoading(false);
		}
	};
	const copyRoadmap = async () => {
		if (!result) return;
		const text = `${result.stage_title}\n\n${result.stage_summary}\n\nNext actions\n${result.next_actions.map((action, index) => `${index + 1}. ${action}`).join("\n")}\n\nDocuments needed now\n${result.documents_now.map((item) => `- ${item}`).join("\n")}\n\n${result.disclaimer}`;
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2e3);
		} catch {
			setError("Could not copy automatically. Use the print button or select the roadmap text manually.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		className: "bg-cream-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-forest-900/10 bg-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-kicker",
							children: "Roadmap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Build your Germany study roadmap."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl leading-7 text-slate-600",
							children: "Answer a few questions about where you are now. You get a stage, next actions, document timing, weekly focus, and official links to verify. Your form and latest result stay on this device."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-4xl gap-8 px-5 py-10 sm:px-8 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApsChecker, {
						onStatusChange: (status) => update("aps_status", status),
						currentStatus: form.aps_status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "surface-card space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-forest-950",
								children: "Your profile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Current education",
										id: "education",
										value: form.education_status,
										onChange: (v) => update("education_status", v),
										options: [
											{
												value: "highschool",
												label: "High school / pre-university"
											},
											{
												value: "bachelor_in_progress",
												label: "Bachelor in progress"
											},
											{
												value: "bachelor_done",
												label: "Bachelor completed"
											},
											{
												value: "master_done",
												label: "Master completed"
											}
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Target degree",
										id: "degree",
										value: form.target_degree,
										onChange: (v) => update("target_degree", v),
										options: [{
											value: "bachelor",
											label: "Bachelor"
										}, {
											value: "master",
											label: "Master"
										}]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "field-label",
											htmlFor: "field",
											children: "Field of study"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "field",
											className: "field-input",
											maxLength: 120,
											value: form.field,
											onChange: (e) => update("field", e.target.value),
											placeholder: "e.g. Computer Science, Business, Mechanical Engineering",
											required: true
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Target intake",
										id: "intake",
										value: form.target_intake,
										onChange: (v) => update("target_intake", v),
										options: [{
											value: "winter",
											label: "Winter (Oct start)"
										}, {
											value: "summer",
											label: "Summer (Apr start)"
										}]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Study language",
										id: "language",
										value: form.study_language,
										onChange: (v) => update("study_language", v),
										options: [{
											value: "English",
											label: "English"
										}, {
											value: "German",
											label: "German"
										}]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "APS status",
										id: "aps",
										value: form.aps_status,
										onChange: (v) => update("aps_status", v),
										options: [
											{
												value: "unsure",
												label: "Not sure yet"
											},
											{
												value: "required",
												label: "Required for my country"
											},
											{
												value: "not_required",
												label: "Not required"
											}
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Language test",
										id: "test",
										value: form.language_test_status,
										onChange: (v) => update("language_test_status", v),
										options: [
											{
												value: "not_started",
												label: "Not started"
											},
											{
												value: "preparing",
												label: "Preparing"
											},
											{
												value: "passed",
												label: "Passed"
											}
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Admission status",
										id: "admission",
										value: form.admission_status,
										onChange: (v) => update("admission_status", v),
										options: [
											{
												value: "researching",
												label: "Still researching"
											},
											{
												value: "applied",
												label: "Applied to at least one"
											},
											{
												value: "admitted",
												label: "Admitted"
											}
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Financial proof",
										id: "finance",
										value: form.finance_status,
										onChange: (v) => update("finance_status", v),
										options: [
											{
												value: "not_started",
												label: "Not started"
											},
											{
												value: "in_progress",
												label: "In progress"
											},
											{
												value: "ready",
												label: "Ready"
											}
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Visa status",
										id: "visa",
										value: form.visa_status,
										onChange: (v) => update("visa_status", v),
										options: [
											{
												value: "not_started",
												label: "Not started"
											},
											{
												value: "appointment_booked",
												label: "Appointment booked"
											},
											{
												value: "approved",
												label: "Approved"
											}
										]
									})
								]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: loading,
								className: "primary-button disabled:opacity-50",
								children: loading ? "Building roadmap..." : "Generate my roadmap"
							})
						]
					}),
					result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "roadmap-results",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "surface-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "pill",
											children: STAGE_LABELS[result.stage]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-3 text-2xl font-semibold tracking-[-0.03em] text-forest-950",
											children: result.stage_title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 leading-7 text-slate-600",
											children: result.stage_summary
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2 print:hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												href: "/explore",
												className: "secondary-button",
												children: "Find programs"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: copyRoadmap,
												className: "secondary-button",
												children: copied ? "Copied" : "Copy plan"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => window.print(),
												className: "secondary-button",
												children: "Print / save PDF"
											})
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 lg:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "Next 10 actions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "mt-4 space-y-3",
										children: result.next_actions.map((action, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-3 text-sm leading-6 text-slate-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid size-7 shrink-0 place-items-center rounded-full bg-forest-900 text-xs font-semibold text-white",
												children: index + 1
											}), action]
										}, action))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
											children: "Documents"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500",
											children: "Needed now"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700",
											children: result.documents_now.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: doc }, doc))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500",
											children: "Needed later"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700",
											children: result.documents_later.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: doc }, doc))
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 lg:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "Weekly plan"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "mt-4 space-y-3",
										children: result.weekly_plan.map((week) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "rounded-lg bg-slate-50 px-4 py-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-forest-800",
												children: ["Week ", week.week]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-slate-700",
												children: week.focus
											})]
										}, week.week))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "Common mistakes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700",
										children: result.common_mistakes.map((mistake) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: mistake }, mistake))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "surface-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "Resources to verify"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 space-y-3",
										children: result.resources.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedNote, {
											lastVerified: resource.last_verified,
											officialLink: resource.url,
											label: resource.label
										}) }, resource.url))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-xs leading-5 text-slate-500",
										children: result.disclaimer
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								"aria-label": "Continue your plan",
								className: "surface-card print:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
									children: "Continue from this roadmap"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											href: "/deadlines",
											className: "secondary-button",
											children: "Check deadlines"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											href: "/finance",
											className: "secondary-button",
											children: "Plan finances"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											href: "/shortlist",
											className: "secondary-button",
											children: "Open shortlist"
										})
									]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { RoadmapPage as default };
