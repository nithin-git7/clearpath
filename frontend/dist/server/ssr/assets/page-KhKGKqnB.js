import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { m as ApiError, n as OFFICIAL_FACTS, o as getCostOfLiving, t as SiteFooter } from "./SiteFooter-CKFxsOC_.js";
import { t as VerifiedNote } from "./VerifiedNote-hgpaD9mK.js";
//#region app/finance/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var euro = (amount) => new Intl.NumberFormat("en-DE", {
	style: "currency",
	currency: "EUR",
	maximumFractionDigits: 0
}).format(amount);
function MoneyField({ id, label, value, onChange, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "field-label",
			htmlFor: id,
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500",
				children: "€"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type: "number",
				inputMode: "numeric",
				min: 0,
				className: "field-input pl-8",
				value,
				onChange: (event) => onChange(Math.max(0, Number(event.target.value) || 0))
			})]
		}),
		hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs leading-5 text-slate-500",
			children: hint
		})
	] });
}
function FinancePage() {
	const [cities, setCities] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [selectedCity, setSelectedCity] = (0, import_react.useState)("");
	const [months, setMonths] = (0, import_react.useState)(12);
	const [rent, setRent] = (0, import_react.useState)(650);
	const [food, setFood] = (0, import_react.useState)(260);
	const [insurance, setInsurance] = (0, import_react.useState)(145);
	const [transport, setTransport] = (0, import_react.useState)(49);
	const [communication, setCommunication] = (0, import_react.useState)(35);
	const [studyAndPersonal, setStudyAndPersonal] = (0, import_react.useState)(150);
	const [semesterFee, setSemesterFee] = (0, import_react.useState)(300);
	const [semesters, setSemesters] = (0, import_react.useState)(2);
	const [tuition, setTuition] = (0, import_react.useState)(0);
	const [applicationCosts, setApplicationCosts] = (0, import_react.useState)(350);
	const [travelAndSetup, setTravelAndSetup] = (0, import_react.useState)(1500);
	const [emergencyBuffer, setEmergencyBuffer] = (0, import_react.useState)(1500);
	const [availableFunds, setAvailableFunds] = (0, import_react.useState)(11904);
	(0, import_react.useEffect)(() => {
		let active = true;
		getCostOfLiving().then((data) => {
			if (!active) return;
			setCities(data);
			if (data.length) {
				setSelectedCity(data[0].city);
				const fixed = food + insurance + transport + communication + studyAndPersonal;
				setRent(Math.max(350, data[0].monthly_estimate_eur - fixed));
			}
		}).catch((caught) => {
			if (active) setError(caught instanceof ApiError ? caught.message : "Could not load city references.");
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
		if (match) {
			const fixed = food + insurance + transport + communication + studyAndPersonal;
			setRent(Math.max(350, match.monthly_estimate_eur - fixed));
		}
	};
	const selected = cities.find((entry) => entry.city === selectedCity);
	const totals = (0, import_react.useMemo)(() => {
		const monthly = rent + food + insurance + transport + communication + studyAndPersonal;
		const living = monthly * months;
		const academic = semesterFee * semesters + tuition;
		const setup = applicationCosts + travelAndSetup + emergencyBuffer;
		const total = living + academic + setup;
		return {
			monthly,
			living,
			academic,
			setup,
			total,
			gap: availableFunds - total,
			runway: monthly > 0 ? availableFunds / monthly : 0
		};
	}, [
		applicationCosts,
		availableFunds,
		communication,
		emergencyBuffer,
		food,
		insurance,
		months,
		rent,
		semesterFee,
		semesters,
		studyAndPersonal,
		transport,
		travelAndSetup,
		tuition
	]);
	const financeFact = OFFICIAL_FACTS.studentFinance;
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
							children: "Finance readiness"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Know the full cost—not just the blocked account."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-3xl leading-7 text-slate-600",
							children: "Build an itemized plan for living, study, applications, travel, setup, and emergencies. City figures are planning references, while financial-proof rules must be confirmed with the authority handling your visa."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-amber-500/30 bg-amber-50 p-4 text-sm text-amber-900",
							children: [error, " You can still enter your own amounts below."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-end justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-kicker",
										children: "1 · Monthly living"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-xl font-semibold text-forest-950",
										children: "Build your real monthly baseline"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-52",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "field-label",
											htmlFor: "city",
											children: "Reference city"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											id: "city",
											className: "field-input",
											value: selectedCity,
											onChange: (event) => handleCityChange(event.target.value),
											disabled: loading || !cities.length,
											children: cities.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: entry.city,
												children: entry.city
											}, entry.city))
										})]
									})]
								}),
								selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600",
									children: [
										selected.notes,
										" The reference total is ",
										euro(selected.monthly_estimate_eur),
										"/month; replace every field with your own quotes."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "rent",
											label: "Rent + utilities",
											value: rent,
											onChange: setRent
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "food",
											label: "Food + household",
											value: food,
											onChange: setFood
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "insurance",
											label: "Health insurance",
											value: insurance,
											onChange: setInsurance,
											hint: "Eligibility and contribution vary by age and status."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "transport",
											label: "Local transport",
											value: transport,
											onChange: setTransport,
											hint: "Check what your semester contribution includes."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "communication",
											label: "Phone + internet",
											value: communication,
											onChange: setCommunication
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "personal",
											label: "Study + personal",
											value: studyAndPersonal,
											onChange: setStudyAndPersonal
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "field-label",
											htmlFor: "months",
											children: "Planning period"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "months",
											className: "field-input",
											value: months,
											onChange: (event) => setMonths(Number(event.target.value)),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 6,
													children: "6 months"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 12,
													children: "12 months"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 18,
													children: "18 months"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 24,
													children: "24 months"
												})
											]
										})] })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-kicker",
									children: "2 · Study and setup"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-xl font-semibold text-forest-950",
									children: "Include costs that arrive before the first lecture"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "semester-fee",
											label: "Semester contribution",
											value: semesterFee,
											onChange: setSemesterFee
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "field-label",
											htmlFor: "semesters",
											children: "Semesters in this plan"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "semesters",
											type: "number",
											min: 1,
											max: 8,
											className: "field-input",
											value: semesters,
											onChange: (event) => setSemesters(Math.min(8, Math.max(1, Number(event.target.value) || 1)))
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "tuition",
											label: "Tuition for this period",
											value: tuition,
											onChange: setTuition,
											hint: "Many public programs have no tuition, but exceptions apply."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "applications",
											label: "Applications + visa",
											value: applicationCosts,
											onChange: setApplicationCosts,
											hint: "Include tests, translations, certifications, uni-assist, APS, and visa fees that apply."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "setup",
											label: "Travel + housing setup",
											value: travelAndSetup,
											onChange: setTravelAndSetup,
											hint: "Travel, deposit, temporary stay, bedding, and basic setup."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											id: "emergency",
											label: "Emergency buffer",
											value: emergencyBuffer,
											onChange: setEmergencyBuffer
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "surface-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-[1fr_1fr] sm:items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-kicker",
										children: "3 · Funding position"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-xl font-semibold text-forest-950",
										children: "Compare the plan with money you can actually access"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-6 text-slate-600",
										children: "Do not count uncertain work income, an unconfirmed loan, or a scholarship you have not received."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
									id: "available",
									label: "Confirmed available funds",
									value: availableFunds,
									onChange: setAvailableFunds
								})]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6 lg:sticky lg:top-24 lg:h-fit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "overflow-hidden rounded-2xl bg-forest-950 text-white shadow-[0_20px_60px_rgba(9,44,39,0.16)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-white/10 p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold uppercase tracking-[0.12em] text-lime-300",
											children: "Your planning total"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-4xl font-semibold tracking-[-0.04em]",
											children: euro(totals.total)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-sm text-white/60",
											children: [
												"For ",
												months,
												" months and ",
												semesters,
												" semester",
												semesters === 1 ? "" : "s"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "space-y-3 p-6 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-white/65",
												children: "Monthly baseline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "font-semibold",
												children: euro(totals.monthly)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-white/65",
												children: "Living for period"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: euro(totals.living) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-white/65",
												children: "Study costs"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: euro(totals.academic) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-white/65",
												children: "Setup + buffer"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: euro(totals.setup) })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-6 ${totals.gap >= 0 ? "bg-lime-300 text-forest-950" : "bg-amber-100 text-amber-900"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold uppercase tracking-[0.1em]",
											children: totals.gap >= 0 ? "Planning surplus" : "Funding gap"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-2xl font-semibold",
											children: euro(Math.abs(totals.gap))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-xs leading-5",
											children: [
												"Confirmed funds cover about ",
												totals.runway.toFixed(1),
												" months of your monthly baseline before study and setup costs."
											]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
									children: "2026 financial-proof reference"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-forest-950",
									children: euro(11904)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-6 text-slate-600",
									children: "A blocked account is one accepted route, not the only one. This amount is a visa proof reference—not a guarantee that it covers your real costs."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedNote, {
										lastVerified: financeFact.lastVerified,
										officialLink: financeFact.sourceUrl,
										label: "Verify 2026 student visa funds"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
								children: "Continue planning"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: "/explore",
										className: "link-underline",
										children: "Check tuition and semester costs"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: "/guides/blocked-account",
										className: "link-underline",
										children: "Understand financial proof"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: "/guides/health-insurance",
										className: "link-underline",
										children: "Review health insurance"
									}) })
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { FinancePage as default };
