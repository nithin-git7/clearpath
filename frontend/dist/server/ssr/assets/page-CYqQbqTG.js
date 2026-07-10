import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-2ZhP7GoM.js";
import { i as SiteFooter, t as ApiError } from "./api-CoFO66dD.js";
import { i as getDeadlines, t as formatDate } from "./catalog-DXDdMWQO.js";
import { s as useSavedDeadlines } from "./storage-y8L7VKP1.js";
//#region app/deadlines/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var INTAKES = [
	"all",
	"winter",
	"summer"
];
function daysUntil(dateValue) {
	const target = new Date(dateValue).getTime();
	return Math.ceil((target - Date.now()) / (1e3 * 60 * 60 * 24));
}
function DeadlinesPage() {
	const [intake, setIntake] = (0, import_react.useState)("all");
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const { items: saved, ready, toggle, has } = useSavedDeadlines();
	const [showSavedOnly, setShowSavedOnly] = (0, import_react.useState)(false);
	const [showPassed, setShowPassed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		const run = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getDeadlines(intake === "all" ? void 0 : intake);
				if (active) setEntries(data);
			} catch (caught) {
				if (active) setError(caught instanceof ApiError ? caught.message : "Could not load deadlines.");
			} finally {
				if (active) setLoading(false);
			}
		};
		run();
		return () => {
			active = false;
		};
	}, [intake]);
	const visible = (0, import_react.useMemo)(() => {
		const byCycle = showPassed ? entries : entries.filter((entry) => daysUntil(entry.deadline) >= 0);
		return showSavedOnly ? byCycle.filter((entry) => has(entry.program_id + entry.intake)) : byCycle;
	}, [
		entries,
		showPassed,
		showSavedOnly,
		has
	]);
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
							children: "Deadlines"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Track application deadlines by intake."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl leading-7 text-slate-600",
							children: "Save the deadlines that matter to you. Dates are curated with a verification date and can change, so always confirm on the official page before you rely on one."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex rounded-full border border-forest-900/15 bg-white p-1",
							children: INTAKES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIntake(option),
								className: `min-h-9 rounded-full px-5 text-sm font-semibold capitalize transition ${intake === option ? "bg-forest-900 text-white" : "text-forest-800 hover:text-forest-600"}`,
								children: option === "all" ? "All" : option
							}, option))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm font-medium text-slate-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: showSavedOnly,
									onChange: (e) => setShowSavedOnly(e.target.checked)
								}),
								"Saved only (",
								ready ? saved.length : 0,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm font-medium text-slate-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: showPassed,
								onChange: (e) => setShowPassed(e.target.checked)
							}), "Show passed cycles"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					"aria-live": "polite",
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800",
							children: error
						}),
						loading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3",
							children: [
								0,
								1,
								2,
								3
							].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "surface-card animate-pulse py-6" }, key))
						}),
						!loading && !error && visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-forest-950",
								children: "Nothing to show."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-slate-600",
								children: showSavedOnly ? "You have not saved any deadlines yet." : "No deadlines match this intake."
							})]
						}),
						!loading && !error && visible.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-3",
							children: visible.map((entry) => {
								const key = entry.program_id + entry.intake;
								const remaining = daysUntil(entry.deadline);
								const saveState = ready && has(key);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "surface-card flex flex-wrap items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											href: `/explore/program/${entry.program_id}`,
											className: "font-semibold text-forest-950 hover:text-forest-700",
											children: entry.program_title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-sm text-slate-600",
											children: [
												entry.university_name,
												" — ",
												entry.city
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex flex-wrap items-center gap-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "pill capitalize",
													children: [entry.intake, " intake"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "pill",
													children: ["Apply by ", formatDate(entry.deadline)]
												}),
												remaining >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "pill",
													children: [remaining, " days left"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "pill",
													children: "Passed for this cycle"
												})
											]
										}),
										entry.deadline_note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 max-w-3xl text-xs leading-5 text-slate-600",
											children: entry.deadline_note
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-xs text-slate-500",
											children: ["Verified ", formatDate(entry.last_verified)]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex w-full flex-wrap items-center gap-3 sm:w-auto",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: entry.official_link,
											target: "_blank",
											rel: "noreferrer",
											className: "link-underline text-sm",
											children: "Official page"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => toggle(key),
											disabled: !ready,
											"aria-pressed": saveState,
											className: `inline-flex min-h-9 items-center rounded-full px-4 text-sm font-semibold transition disabled:opacity-50 ${saveState ? "bg-forest-900 text-white hover:bg-forest-700" : "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700"}`,
											children: saveState ? "Saved" : "Save"
										})]
									})]
								}, key);
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { DeadlinesPage as default };
