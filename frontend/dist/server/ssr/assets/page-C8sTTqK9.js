import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-2ZhP7GoM.js";
import { i as SiteFooter, t as ApiError } from "./api-DMIWxbbD.js";
import { n as formatEuro, o as getPrograms, t as formatDate } from "./catalog-BUkyPvtq.js";
import { c as useShortlist, i as useChecklist } from "./storage-y8L7VKP1.js";
//#region app/shortlist/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var CHECKLIST_ITEMS = [
	{
		id: "documents",
		label: "Gather academic documents"
	},
	{
		id: "language",
		label: "Meet language proficiency requirement"
	},
	{
		id: "requirements",
		label: "Confirm program requirements"
	},
	{
		id: "application",
		label: "Submit application before the deadline"
	},
	{
		id: "finance",
		label: "Prepare proof of finances"
	}
];
function ApplicationCard({ program, onRemove }) {
	const itemIds = CHECKLIST_ITEMS.map((item) => item.id);
	const { state, ready, toggle, completedCount, total } = useChecklist(program.id, itemIds);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "surface-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: `/explore/program/${program.id}`,
					className: "text-lg font-semibold tracking-[-0.02em] text-forest-950 hover:text-forest-700",
					children: program.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-slate-600 capitalize",
					children: [
						program.degree_level,
						" · ",
						program.language,
						" · ",
						formatEuro(program.tuition_eur)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onRemove,
					className: "text-xs font-semibold text-slate-500 underline hover:text-forest-700",
					children: "Remove"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs font-medium text-slate-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Application checklist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ready ? `${completedCount}/${total}` : "..." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-2 overflow-hidden rounded-full bg-slate-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-lime-500 transition-all",
							style: { width: `${total ? completedCount / total * 100 : 0}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: CHECKLIST_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 text-sm text-slate-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: Boolean(state[item.id]),
								onChange: () => toggle(item.id),
								disabled: !ready
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: state[item.id] ? "line-through opacity-60" : "",
								children: item.label
							})]
						}) }, item.id))
					})
				]
			}),
			program.deadlines.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-slate-500",
				children: ["Next deadline: ", formatDate([...program.deadlines].sort((a, b) => a.deadline.localeCompare(b.deadline))[0].deadline)]
			})
		]
	});
}
function ShortlistPage() {
	const { items, ready, toggle, clear } = useShortlist();
	const [programs, setPrograms] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		getPrograms().then((data) => {
			if (active) setPrograms(data);
		}).catch((caught) => {
			if (active) setError(caught instanceof ApiError ? caught.message : "Could not load your shortlist.");
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => {
			active = false;
		};
	}, []);
	const saved = programs.filter((program) => items.includes(program.id));
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
							children: "My shortlist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Your saved programs and application progress."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl leading-7 text-slate-600",
							children: "Everything is stored on this device only. Track each application with its own checklist."
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
					loading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [0, 1].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "surface-card animate-pulse py-16" }, key))
					}),
					!loading && !error && (!ready || saved.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-forest-950",
								children: "Your shortlist is empty."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-slate-600",
								children: "Browse the catalog and add programs to build your application plan."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/explore",
								className: "mt-4 inline-block primary-button",
								children: "Explore programs"
							})
						]
					}),
					!loading && !error && ready && saved.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium text-slate-600",
							children: [saved.length, " saved"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: clear,
							className: "text-xs font-semibold text-slate-500 underline hover:text-forest-700",
							children: "Clear all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-4 sm:grid-cols-2",
						children: saved.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationCard, {
							program,
							onRemove: () => toggle(program.id)
						}, program.id))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ShortlistPage as default };
