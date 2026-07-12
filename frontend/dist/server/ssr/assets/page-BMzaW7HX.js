import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { c as getDeadlines, i as formatDate, m as ApiError, r as deadlineStatusLabel, s as getDeadlineStatus, t as SiteFooter } from "./SiteFooter-CKFxsOC_.js";
import { s as useSavedDeadlines } from "./storage-04iwjZ0v.js";
//#region app/deadlines/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var INTAKES = [
	"all",
	"winter",
	"summer"
];
function DeadlinesPage() {
	const [intake, setIntake] = (0, import_react.useState)("all");
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const { items: saved, ready, toggle, has } = useSavedDeadlines();
	const [showSavedOnly, setShowSavedOnly] = (0, import_react.useState)(false);
	const [showPassed, setShowPassed] = (0, import_react.useState)(false);
	const [nearOnly, setNearOnly] = (0, import_react.useState)(false);
	const [sort, setSort] = (0, import_react.useState)("deadline");
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
		return [...entries.filter((entry) => {
			const status = getDeadlineStatus(entry.deadline);
			if (!showPassed && status === "passed") return false;
			if (nearOnly && status !== "near") return false;
			if (showSavedOnly && !has(entry.program_id + entry.intake)) return false;
			return true;
		})].sort((a, b) => sort === "verified" ? b.last_verified.localeCompare(a.last_verified) : a.deadline.localeCompare(b.deadline));
	}, [
		entries,
		has,
		nearOnly,
		showPassed,
		showSavedOnly,
		sort
	]);
	const futureCount = entries.filter((entry) => getDeadlineStatus(entry.deadline) !== "passed" && getDeadlineStatus(entry.deadline) !== "unknown").length;
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
							children: "Deadline intelligence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Know which dates still matter."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-3xl leading-7 text-slate-600",
							children: "ClearPath separates future, near, and passed cycles. A date can differ by nationality, qualification, program, or application route, so open the official page before planning around it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pill",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-lime-500" }), " Future"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pill",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-amber-500" }), " Within 45 days"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pill",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-slate-400" }), " Passed cycle"]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "field-label",
								children: "Intake"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-flex rounded-full border border-forest-900/15 bg-cream-50 p-1",
								children: INTAKES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIntake(option),
									"aria-pressed": intake === option,
									className: `min-h-9 rounded-full px-5 text-sm font-semibold capitalize transition ${intake === option ? "bg-forest-900 text-white" : "text-forest-800 hover:text-forest-600"}`,
									children: option
								}, option))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3 lg:items-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex min-h-11 items-center gap-2 text-sm font-medium text-slate-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: nearOnly,
											onChange: (event) => setNearOnly(event.target.checked),
											className: "size-4 accent-forest-700"
										}), " Due within 45 days"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex min-h-11 items-center gap-2 text-sm font-medium text-slate-700",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: showSavedOnly,
												onChange: (event) => setShowSavedOnly(event.target.checked),
												className: "size-4 accent-forest-700"
											}),
											" Saved only (",
											ready ? saved.length : 0,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "field-label",
										htmlFor: "deadline-sort",
										children: "Sort"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "deadline-sort",
										className: "field-input",
										value: sort,
										onChange: (event) => setSort(event.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "deadline",
											children: "Soonest deadline"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "verified",
											children: "Recently verified"
										})]
									})] })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 flex items-center gap-2 text-sm font-medium text-slate-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: showPassed,
								onChange: (event) => setShowPassed(event.target.checked),
								className: "size-4 accent-forest-700"
							}), " Show passed cycles for reference"]
						})]
					}),
					!loading && !error && futureCount === 0 && !showPassed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 rounded-2xl border border-amber-500/30 bg-amber-50 p-5 text-sm leading-6 text-amber-900",
						children: "No future dated entries are available for this view. This does not mean the programs are closed; the next cycle may not be published yet. Open the official program pages or show passed cycles for reference."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						"aria-live": "polite",
						"aria-busy": loading,
						children: [
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800",
								children: [error, " Your saved deadlines are still on this device."]
							}),
							loading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3",
								children: [
									0,
									1,
									2,
									3
								].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "surface-card animate-pulse py-8" }, key))
							}),
							!loading && !error && visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-forest-950",
										children: "No dates match these filters."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-slate-600",
										children: "Show passed cycles, switch intake, or clear the saved/near filters."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setShowSavedOnly(false);
											setNearOnly(false);
											setShowPassed(false);
											setIntake("all");
										},
										className: "mt-4 secondary-button",
										children: "Reset filters"
									})
								]
							}),
							!loading && !error && visible.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid gap-3",
								children: visible.map((entry) => {
									const key = entry.program_id + entry.intake;
									const status = getDeadlineStatus(entry.deadline);
									const saveState = ready && has(key);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: `surface-card border-l-4 ${status === "near" ? "border-l-amber-500" : status === "passed" ? "border-l-slate-300 opacity-80" : "border-l-lime-500"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-start justify-between gap-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${status === "near" ? "bg-amber-100 text-amber-800" : status === "passed" ? "bg-slate-100 text-slate-600" : "bg-lime-200 text-forest-900"}`,
															children: deadlineStatusLabel(entry.deadline)
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "pill capitalize",
															children: [entry.intake, " intake"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														href: `/explore/program/${entry.program_id}`,
														className: "mt-3 inline-block text-lg font-semibold text-forest-950 hover:text-forest-700",
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
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-3 text-sm text-slate-700",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [status === "passed" ? "Recorded deadline" : "Apply by", ":"] }),
															" ",
															formatDate(entry.deadline)
														]
													}),
													entry.deadline_note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 max-w-3xl text-xs leading-5 text-slate-600",
														children: entry.deadline_note
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-2 text-xs text-slate-500",
														children: ["Source checked ", formatDate(entry.last_verified)]
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex w-full flex-wrap items-center gap-3 sm:w-auto",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: entry.official_link,
													target: "_blank",
													rel: "noreferrer",
													className: "link-underline text-sm",
													children: "Verify official date ↗"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => toggle(key),
													disabled: !ready,
													"aria-pressed": saveState,
													className: `inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold transition disabled:opacity-50 ${saveState ? "bg-forest-900 text-white hover:bg-forest-700" : "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700"}`,
													children: saveState ? "Saved" : "Save date"
												})]
											})]
										})
									}, key);
								})
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
export { DeadlinesPage as default };
