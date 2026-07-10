import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-2ZhP7GoM.js";
import { i as SiteFooter, t as ApiError } from "./api-DMIWxbbD.js";
import { i as getDeadlines, t as formatDate } from "./catalog-BUkyPvtq.js";
import { c as useShortlist, o as useJourneyProgress } from "./storage-y8L7VKP1.js";
//#region components/UpcomingDeadlines.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function daysUntil(dateValue) {
	return Math.ceil((new Date(dateValue).getTime() - Date.now()) / (1e3 * 60 * 60 * 24));
}
function UpcomingDeadlines() {
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getDeadlines().then((all) => {
			setEntries(all.filter((e) => daysUntil(e.deadline) >= 0).sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 5));
		}).catch((caught) => {
			setError(caught instanceof ApiError ? caught.message : "Could not load deadlines.");
		});
	}, []);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card text-sm text-amber-800",
		children: [error, " Start the backend to see live deadlines."]
	});
	if (entries.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "surface-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
				children: "Upcoming deadlines"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				href: "/deadlines",
				className: "text-xs font-semibold text-forest-700 underline",
				children: "View all"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: entries.map((entry) => {
				const key = entry.program_id + entry.intake;
				const days = daysUntil(entry.deadline);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: `/explore/program/${entry.program_id}`,
							className: "font-semibold text-forest-950 hover:text-forest-700",
							children: entry.program_title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-600",
							children: entry.university_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-slate-500",
							children: [
								formatDate(entry.deadline),
								" · ",
								days,
								" days left · ",
								entry.intake,
								" intake"
							]
						})
					]
				}, key);
			})
		})]
	});
}
//#endregion
//#region app/hub/page.tsx
var JOURNEY_STEPS = [
	{
		id: "roadmap",
		label: "Build your personalized roadmap",
		href: "/roadmap"
	},
	{
		id: "explore",
		label: "Explore universities and programs",
		href: "/explore"
	},
	{
		id: "shortlist",
		label: "Shortlist programs you like",
		href: "/shortlist"
	},
	{
		id: "compare",
		label: "Compare your top programs",
		href: "/compare"
	},
	{
		id: "deadlines",
		label: "Note the deadlines that apply to you",
		href: "/deadlines"
	},
	{
		id: "finance",
		label: "Plan your budget and finances",
		href: "/finance"
	},
	{
		id: "guides",
		label: "Read the visa, APS, and insurance guides",
		href: "/guides"
	},
	{
		id: "explain",
		label: "Explain a confusing document",
		href: "/explain"
	}
];
var HUB_CARDS = [
	{
		title: "Roadmap",
		body: "Answer a few questions and get your stage and next 10 actions.",
		href: "/roadmap",
		status: "ready"
	},
	{
		title: "Explore",
		body: "Search curated universities and courses with filters.",
		href: "/explore",
		status: "ready"
	},
	{
		title: "Compare",
		body: "Compare up to 3 programs side by side.",
		href: "/compare",
		status: "ready"
	},
	{
		title: "My shortlist",
		body: "Track saved programs and per-application checklists.",
		href: "/shortlist",
		status: "ready"
	},
	{
		title: "Deadlines",
		body: "See and save application deadlines by intake.",
		href: "/deadlines",
		status: "ready"
	},
	{
		title: "Finance",
		body: "Estimate living costs and the blocked account.",
		href: "/finance",
		status: "ready"
	},
	{
		title: "Document explainer",
		body: "Turn confusing official text into clear actions.",
		href: "/explain",
		status: "ready"
	},
	{
		title: "Guides",
		body: "Visa, APS, uni-assist, insurance, and more.",
		href: "/guides",
		status: "ready"
	},
	{
		title: "Search",
		body: "Search across everything in one place.",
		href: "/search",
		status: "ready"
	}
];
function HubPage() {
	const { steps, ready, toggle, completedCount } = useJourneyProgress();
	const { items } = useShortlist();
	const total = JOURNEY_STEPS.length;
	const percent = ready ? Math.round(completedCount / total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		className: "bg-cream-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-forest-900/10 bg-forest-950 text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-kicker text-lime-300",
							children: "Your hub"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl",
							children: "Everything for your Germany plan, in one place."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl leading-7 text-white/70",
							children: "Move through each step at your own pace. Your progress and shortlist are saved on this device."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 max-w-md rounded-2xl bg-white/10 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Journey progress"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/70",
										children: ready ? `${completedCount}/${total}` : "..."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-2 overflow-hidden rounded-full bg-white/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-lime-400 transition-all",
										style: { width: `${percent}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm text-white/70",
									children: [items.length, " programs shortlisted"]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_20rem] lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold tracking-[-0.02em] text-forest-950",
					children: "Where do you want to go?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: HUB_CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						href: card.href,
						className: "group flex h-full flex-col justify-between rounded-2xl border border-forest-900/10 bg-white p-6 transition hover:border-forest-700/40 hover:shadow-[0_18px_50px_rgba(11,43,38,0.1)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold tracking-[-0.02em] text-forest-950",
								children: card.title
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-6 text-slate-600",
							children: card.body
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-5 text-sm font-semibold text-forest-700 group-hover:text-forest-600",
							children: "Open →"
						})]
					}) }, card.title))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6 lg:sticky lg:top-24 lg:h-fit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
								children: "Step-by-step"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-3",
								children: JOURNEY_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										className: "mt-1",
										checked: Boolean(steps[step.id]),
										onChange: () => toggle(step.id),
										disabled: !ready,
										"aria-label": `Mark "${step.label}" complete`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: step.href,
										className: `text-sm ${steps[step.id] ? "text-slate-400 line-through" : "text-slate-700 hover:text-forest-700"}`,
										children: step.label
									})]
								}, step.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800",
								children: "This is educational planning, not immigration advice. Verify every requirement with the official source."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingDeadlines, {})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { HubPage as default };
