import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { a as formatEuro, d as getPrograms, i as formatDate, l as getNextDeadline, m as ApiError, t as SiteFooter } from "./SiteFooter-CKFxsOC_.js";
import { a as useCompareList } from "./storage-04iwjZ0v.js";
//#region app/compare/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ComparePage() {
	const { items, ready, toggle, has, clear, replace } = useCompareList();
	const [programs, setPrograms] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getPrograms().then(setPrograms).catch((caught) => setError(caught instanceof ApiError ? caught.message : "Could not load programs.")).finally(() => setLoading(false));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready || loading || error) return;
		const validIds = new Set(programs.map((program) => program.id));
		const validItems = items.filter((id) => validIds.has(id)).slice(0, 3);
		if (validItems.length !== items.length || validItems.some((id, index) => id !== items[index])) replace(validItems);
	}, [
		error,
		items,
		loading,
		programs,
		ready,
		replace
	]);
	const selected = programs.filter((p) => items.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		className: "bg-cream-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-forest-900/10 bg-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-kicker",
							children: "Compare"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Compare up to 3 programs side by side."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl leading-7 text-slate-600",
							children: "Pick programs from the list below to compare degree, language, tuition, deadlines, and requirements in one view."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800",
						children: error
					}),
					selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-10 overflow-x-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-slate-600",
								children: [selected.length, "/3 selected"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clear,
								className: "text-xs font-semibold text-slate-500 underline",
								children: "Clear all"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[640px] border-collapse text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-slate-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-4 font-semibold text-slate-500",
									children: "Field"
								}), selected.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-4 font-semibold text-forest-950",
									children: p.title
								}, p.id))]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "text-slate-700",
								children: [
									["Degree", (p) => p.degree_level],
									["Field", (p) => p.field],
									["Language", (p) => p.language],
									["Tuition", (p) => formatEuro(p.tuition_eur)],
									["Duration", (p) => `${p.duration_semesters} semesters`],
									["Intakes", (p) => p.intakes.join(", ")],
									["Next deadline", (p) => {
										const deadline = getNextDeadline(p.deadlines);
										return deadline ? formatDate(deadline.deadline) : "No upcoming deadline";
									}],
									["Requirements", (p) => p.requirements_summary]
								].map(([label, getter]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-slate-100 align-top",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4 font-medium text-slate-500",
										children: label
									}), selected.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4 capitalize",
										children: getter(p)
									}, p.id))]
								}, label))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold text-forest-950",
						children: "Add programs to compare"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-slate-600",
						children: "Loading programs..."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: programs.map((program) => {
							const selectedState = ready && has(program.id);
							const disabled = ready && !selectedState && items.length >= 3;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "surface-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: `/explore/program/${program.id}`,
										className: "font-semibold text-forest-950 hover:text-forest-700",
										children: program.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-slate-500 capitalize",
										children: [
											program.field,
											" · ",
											program.language
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled,
										onClick: () => toggle(program.id),
										className: `mt-3 inline-flex min-h-9 items-center rounded-full px-4 text-xs font-semibold disabled:opacity-40 ${selectedState ? "bg-forest-900 text-white" : "border border-forest-700/25 text-forest-800"}`,
										children: selectedState ? "Remove" : "Compare"
									})
								]
							}, program.id);
						})
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ComparePage as default };
