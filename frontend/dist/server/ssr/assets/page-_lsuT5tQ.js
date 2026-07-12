import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { c as getDeadlines, i as formatDate, m as ApiError, r as deadlineStatusLabel, s as getDeadlineStatus, t as SiteFooter } from "./SiteFooter-CKFxsOC_.js";
import { c as useShortlist, o as useJourneyProgress } from "./storage-04iwjZ0v.js";
//#region components/UpcomingDeadlines.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function UpcomingDeadlines() {
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getDeadlines().then((all) => setEntries(all.filter((entry) => ["near", "upcoming"].includes(getDeadlineStatus(entry.deadline))).sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 4))).catch((caught) => setError(caught instanceof ApiError ? caught.message : "Could not load deadlines.")).finally(() => setLoading(false));
	}, []);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-card text-sm leading-6 text-amber-800",
		children: "Deadlines are temporarily unavailable. Your other local progress is unaffected."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "surface-card",
		"aria-busy": loading,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
				children: "Upcoming deadlines"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				href: "/deadlines",
				className: "text-xs font-semibold text-forest-700 underline",
				children: "View all"
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-20 animate-pulse rounded-xl bg-slate-100" }) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900",
			children: "No future dated cycles are in the current catalog. Check official program pages for the next published intake."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-slate-100",
			children: entries.map((entry) => {
				const key = entry.program_id + entry.intake;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3 first:pt-0 last:pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: `/explore/program/${entry.program_id}`,
							className: "text-sm font-semibold text-forest-950 hover:text-forest-700",
							children: entry.program_title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-slate-600",
							children: entry.university_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-slate-500",
							children: [
								formatDate(entry.deadline),
								" · ",
								deadlineStatusLabel(entry.deadline),
								" · ",
								entry.intake
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
		label: "Build a profile-based roadmap",
		href: "/roadmap",
		group: "Direction"
	},
	{
		id: "explore",
		label: "Research programs from official pages",
		href: "/explore",
		group: "Research"
	},
	{
		id: "shortlist",
		label: "Save a realistic application portfolio",
		href: "/shortlist",
		group: "Research"
	},
	{
		id: "compare",
		label: "Compare the final three choices",
		href: "/compare",
		group: "Research"
	},
	{
		id: "deadlines",
		label: "Confirm and save applicant-specific deadlines",
		href: "/deadlines",
		group: "Applications"
	},
	{
		id: "finance",
		label: "Calculate total cost and funding gap",
		href: "/finance",
		group: "Finance"
	},
	{
		id: "guides",
		label: "Verify APS, visa, insurance, and arrival rules",
		href: "/guides",
		group: "Requirements"
	},
	{
		id: "explain",
		label: "Resolve any confusing official message",
		href: "/explain",
		group: "Execution"
	}
];
var QUICK_TOOLS = [
	{
		title: "Find programs",
		body: "Search the curated catalog and open the official page.",
		href: "/explore",
		action: "Research"
	},
	{
		title: "Compare choices",
		body: "Put costs, requirements, and deadlines side by side.",
		href: "/compare",
		action: "Decide"
	},
	{
		title: "Work on applications",
		body: "Open each saved program's completion checklist.",
		href: "/shortlist",
		action: "Execute"
	},
	{
		title: "Decode a message",
		body: "Extract requests, dates, amounts, and a reply draft.",
		href: "/explain",
		action: "Understand"
	}
];
function HubPage() {
	const { steps, ready, toggle } = useJourneyProgress();
	const { items } = useShortlist();
	const total = JOURNEY_STEPS.length;
	const completedCount = JOURNEY_STEPS.filter((step) => steps[step.id]).length;
	const percent = ready ? Math.round(completedCount / total * 100) : 0;
	const nextStep = JOURNEY_STEPS.find((step) => !steps[step.id]) ?? JOURNEY_STEPS[4];
	const readinessGroups = [
		{
			label: "Direction",
			done: Boolean(steps.roadmap),
			detail: steps.roadmap ? "Roadmap created" : "Profile not mapped"
		},
		{
			label: "Research",
			done: Boolean(steps.explore && steps.shortlist),
			detail: items.length ? `${items.length} program${items.length === 1 ? "" : "s"} saved` : "No programs saved"
		},
		{
			label: "Requirements",
			done: Boolean(steps.guides),
			detail: steps.guides ? "Core rules reviewed" : "Verification pending"
		},
		{
			label: "Applications",
			done: Boolean(steps.deadlines),
			detail: steps.deadlines ? "Dates reviewed" : "Dates not confirmed"
		},
		{
			label: "Finance",
			done: Boolean(steps.finance),
			detail: steps.finance ? "Budget reviewed" : "Funding gap unknown"
		},
		{
			label: "Execution",
			done: Boolean(steps.explain),
			detail: steps.explain ? "Message workflow ready" : "Official-text tool unused"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		className: "bg-cream-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-forest-900/10 bg-forest-950 text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-kicker text-lime-300",
								children: "Application control room"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl",
								children: "One view of what is done, what is missing, and what to do next."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-2xl leading-7 text-white/70",
								children: "Your checklist, shortlist, and progress stay in this browser on this device. ClearPath does not require an account."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-white/10 bg-white/10 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Journey readiness"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/70",
										children: ready ? `${percent}%` : "…"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-2 overflow-hidden rounded-full bg-white/15",
									role: "progressbar",
									"aria-label": "Journey progress",
									"aria-valuemin": 0,
									"aria-valuemax": 100,
									"aria-valuenow": percent,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-lime-300 transition-all",
										style: { width: `${percent}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm text-white/70",
									children: [
										completedCount,
										"/",
										total,
										" planning milestones · ",
										items.length,
										" shortlisted"
									]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "rounded-2xl border border-forest-900/10 bg-lime-300 p-6 sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.14em] text-forest-800",
								children: ["Next best action · ", nextStep.group]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-semibold tracking-[-0.03em] text-forest-950",
								children: nextStep.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-3xl text-sm leading-6 text-forest-900/75",
								children: "Complete this milestone, verify its critical facts at the official source, then mark it done here."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: nextStep.href,
							className: "inline-flex min-h-11 items-center justify-center rounded-full bg-forest-950 px-5 text-sm font-semibold text-white hover:bg-forest-800",
							children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: "ml-2",
								children: "→"
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-8 lg:grid-cols-[1fr_21rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-kicker",
								children: "Readiness snapshot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-semibold tracking-[-0.03em] text-forest-950",
								children: "The six parts of a complete plan"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500",
								children: "Self-reported milestones, not an eligibility score"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: readinessGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "surface-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-forest-950",
										children: group.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `size-2.5 rounded-full ${group.done ? "bg-lime-500" : "bg-amber-500"}`,
										"aria-label": group.done ? "Reviewed" : "Needs attention"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-slate-600",
									children: group.detail
								})]
							}, group.label))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-kicker",
								children: "Work surfaces"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-semibold tracking-[-0.03em] text-forest-950",
								children: "Move the application forward"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid gap-4 sm:grid-cols-2",
								children: QUICK_TOOLS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									href: card.href,
									className: "group flex min-h-48 flex-col rounded-2xl border border-forest-900/10 bg-white p-6 transition hover:border-forest-700/40 hover:shadow-[0_18px_50px_rgba(11,43,38,0.08)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold uppercase tracking-[0.12em] text-forest-700",
											children: card.action
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3 text-xl font-semibold tracking-[-0.02em] text-forest-950",
											children: card.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 leading-6 text-slate-600",
											children: card.body
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-auto pt-5 text-sm font-semibold text-forest-700",
											children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": "true",
												children: "→"
											})]
										})
									]
								}, card.href))
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "space-y-6 lg:sticky lg:top-24 lg:h-fit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "Milestones"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-slate-500",
										children: [
											completedCount,
											"/",
											total
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-3",
									children: JOURNEY_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: "mt-1 size-4 accent-forest-700",
											checked: Boolean(steps[step.id]),
											onChange: () => toggle(step.id),
											disabled: !ready,
											"aria-label": `Mark “${step.label}” complete`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											href: step.href,
											className: `text-sm leading-5 ${steps[step.id] ? "text-slate-400 line-through" : "text-slate-700 hover:text-forest-700"}`,
											children: step.label
										})]
									}, step.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800",
									children: "Clearing browser data removes this local progress. It is not synced to an account."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingDeadlines, {})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { HubPage as default };
