import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-2ZhP7GoM.js";
import { i as SiteFooter, t as ApiError } from "./api-DMIWxbbD.js";
import { n as formatEuro, r as getCostOfLiving } from "./catalog-BUkyPvtq.js";
import { t as VerifiedNote } from "./VerifiedNote-BQSotI0m.js";
//#region app/finance/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var BLOCKED_ACCOUNT_REFERENCE = {
	amountEur: 11904,
	lastVerified: "2026-07-04",
	officialLink: "https://www.auswaertiges-amt.de/en/visa-service"
};
function FinancePage() {
	const [cities, setCities] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [selectedCity, setSelectedCity] = (0, import_react.useState)("");
	const [monthly, setMonthly] = (0, import_react.useState)(1e3);
	const [months, setMonths] = (0, import_react.useState)(12);
	const [semesterFee, setSemesterFee] = (0, import_react.useState)(300);
	const [semesters, setSemesters] = (0, import_react.useState)(2);
	(0, import_react.useEffect)(() => {
		let active = true;
		getCostOfLiving().then((data) => {
			if (!active) return;
			setCities(data);
			if (data.length > 0) {
				setSelectedCity(data[0].city);
				setMonthly(data[0].monthly_estimate_eur);
			}
		}).catch((caught) => {
			if (active) setError(caught instanceof ApiError ? caught.message : "Could not load cost data.");
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => {
			active = false;
		};
	}, []);
	const handleCityChange = (city) => {
		setSelectedCity(city);
		const match = cities.find((entry) => entry.city === city);
		if (match) setMonthly(match.monthly_estimate_eur);
	};
	const total = (0, import_react.useMemo)(() => monthly * months + semesterFee * semesters, [
		monthly,
		months,
		semesterFee,
		semesters
	]);
	const selected = cities.find((entry) => entry.city === selectedCity);
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
							children: "Finance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Plan the cost of studying in Germany."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl leading-7 text-slate-600",
							children: "Estimate your living budget and understand the blocked account requirement. All figures are curated references, not official quotes. Confirm current amounts before you rely on them."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold tracking-[-0.02em] text-forest-950",
							children: "Budget calculator"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "field-label",
										htmlFor: "city",
										children: "City"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "city",
										className: "field-input",
										value: selectedCity,
										onChange: (e) => handleCityChange(e.target.value),
										disabled: loading || cities.length === 0,
										children: cities.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: entry.city,
											children: entry.city
										}, entry.city))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "field-label",
									htmlFor: "monthly",
									children: "Monthly living cost (EUR)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "monthly",
									type: "number",
									min: 0,
									className: "field-input",
									value: monthly,
									onChange: (e) => setMonthly(Number(e.target.value) || 0)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "field-label",
									htmlFor: "months",
									children: "Months"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "months",
									type: "number",
									min: 1,
									className: "field-input",
									value: months,
									onChange: (e) => setMonths(Number(e.target.value) || 0)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "field-label",
									htmlFor: "fee",
									children: "Semester fee (EUR)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "fee",
									type: "number",
									min: 0,
									className: "field-input",
									value: semesterFee,
									onChange: (e) => setSemesterFee(Number(e.target.value) || 0)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "field-label",
									htmlFor: "semesters",
									children: "Semesters"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "semesters",
									type: "number",
									min: 1,
									className: "field-input",
									value: semesters,
									onChange: (e) => setSemesters(Number(e.target.value) || 0)
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl bg-forest-950 p-6 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-white/70",
									children: "Estimated total for this period"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-3xl font-semibold tracking-[-0.03em]",
									children: formatEuro(total)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-white/60",
									children: [
										formatEuro(monthly),
										" x ",
										months,
										" months + ",
										formatEuro(semesterFee),
										" x ",
										semesters,
										" semesters"
									]
								})
							]
						}),
						selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-slate-500",
							children: [
								selected.notes,
								" Verified reference for ",
								selected.city,
								"."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
								children: "Blocked account reference"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-forest-950",
								children: formatEuro(BLOCKED_ACCOUNT_REFERENCE.amountEur)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 text-slate-600",
								children: "A common reference amount used to prove living costs for a student visa. The official minimum is set by the authorities and changes over time."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedNote, {
									lastVerified: BLOCKED_ACCOUNT_REFERENCE.lastVerified,
									officialLink: BLOCKED_ACCOUNT_REFERENCE.officialLink,
									label: "Confirm the current amount"
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
							children: "Learn more"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									href: "/guides/blocked-account",
									className: "link-underline",
									children: "Blocked account and finances"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									href: "/guides/health-insurance",
									className: "link-underline",
									children: "Health insurance basics"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									href: "/guides/working-while-studying",
									className: "link-underline",
									children: "Working while studying"
								}) })
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { FinancePage as default };
