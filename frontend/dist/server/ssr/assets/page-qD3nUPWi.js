import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { a as formatEuro, d as getPrograms, f as getUniversities, i as formatDate, l as getNextDeadline, m as ApiError, r as deadlineStatusLabel, t as SiteFooter } from "./SiteFooter-CKFxsOC_.js";
import { r as useSearchParams } from "./navigation-DG8DKWKJ.js";
import { t as CompareButton } from "./CompareButton-BdlyA8fB.js";
import { t as ShortlistButton } from "./ShortlistButton-Bk2IkQym.js";
//#region app/explore/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DEGREE_OPTIONS = [
	"",
	"bachelor",
	"master"
];
var LANGUAGE_OPTIONS = [
	"",
	"English",
	"German"
];
var INTAKE_OPTIONS = [
	"",
	"winter",
	"summer"
];
function ExploreContent() {
	const searchParams = useSearchParams();
	const [view, setView] = (0, import_react.useState)(searchParams.get("view") === "universities" ? "universities" : "programs");
	const [search, setSearch] = (0, import_react.useState)(searchParams.get("search") ?? "");
	const [degree, setDegree] = (0, import_react.useState)(searchParams.get("degree") ?? "");
	const [language, setLanguage] = (0, import_react.useState)(searchParams.get("language") ?? "");
	const [field, setField] = (0, import_react.useState)(searchParams.get("field") ?? "");
	const [city, setCity] = (0, import_react.useState)(searchParams.get("city") ?? "");
	const [intake, setIntake] = (0, import_react.useState)(searchParams.get("intake") ?? "");
	const [freeOnly, setFreeOnly] = (0, import_react.useState)(searchParams.get("free") === "1");
	const [sort, setSort] = (0, import_react.useState)("relevance");
	const [programs, setPrograms] = (0, import_react.useState)([]);
	const [universities, setUniversities] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams();
		if (view !== "programs") params.set("view", view);
		if (search) params.set("search", search);
		if (degree) params.set("degree", degree);
		if (language) params.set("language", language);
		if (field) params.set("field", field);
		if (city) params.set("city", city);
		if (intake) params.set("intake", intake);
		if (freeOnly) params.set("free", "1");
		const query = params.toString();
		window.history.replaceState(null, "", query ? `/explore?${query}` : "/explore");
	}, [
		view,
		search,
		degree,
		language,
		field,
		city,
		intake,
		freeOnly
	]);
	(0, import_react.useEffect)(() => {
		let active = true;
		const run = async () => {
			setLoading(true);
			setError(null);
			try {
				if (view === "programs") {
					const [data, universityData] = await Promise.all([getPrograms({
						search: search || void 0,
						degree_level: degree || void 0,
						language: language || void 0,
						field: field || void 0,
						city: city || void 0,
						intake: intake || void 0,
						max_tuition_eur: freeOnly ? 0 : void 0
					}), getUniversities()]);
					if (active) {
						setPrograms(data);
						setUniversities(universityData);
					}
				} else {
					const data = await getUniversities({
						search: search || void 0,
						city: city || void 0,
						language: language || void 0
					});
					if (active) setUniversities(data);
				}
			} catch (caught) {
				if (active) setError(caught instanceof ApiError ? caught.message : "Something went wrong while loading results.");
			} finally {
				if (active) setLoading(false);
			}
		};
		const timer = setTimeout(run, 200);
		return () => {
			active = false;
			clearTimeout(timer);
		};
	}, [
		view,
		search,
		degree,
		language,
		field,
		city,
		intake,
		freeOnly
	]);
	const resultCount = view === "programs" ? programs.length : universities.length;
	const universitiesById = (0, import_react.useMemo)(() => new Map(universities.map((university) => [university.id, university])), [universities]);
	const sortedPrograms = (0, import_react.useMemo)(() => {
		if (sort === "tuition") return [...programs].sort((a, b) => a.tuition_eur - b.tuition_eur);
		if (sort === "deadline") return [...programs].sort((a, b) => {
			const aDeadline = getNextDeadline(a.deadlines)?.deadline ?? "9999-12-31";
			const bDeadline = getNextDeadline(b.deadlines)?.deadline ?? "9999-12-31";
			return aDeadline.localeCompare(bDeadline);
		});
		return programs;
	}, [programs, sort]);
	const activeFilters = (0, import_react.useMemo)(() => [
		search,
		degree,
		language,
		field,
		city,
		intake,
		freeOnly ? "free" : ""
	].filter(Boolean).length, [
		search,
		degree,
		language,
		field,
		city,
		intake,
		freeOnly
	]);
	const clearFilters = () => {
		setSearch("");
		setDegree("");
		setLanguage("");
		setField("");
		setCity("");
		setIntake("");
		setFreeOnly(false);
	};
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
							children: "Explore"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Universities and courses in one place."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl leading-7 text-slate-600",
							children: "Search a curated catalog of German universities and study programs. Every entry links to an official page with a verification date."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 inline-flex rounded-full border border-forest-900/15 bg-cream-50 p-1",
							children: ["programs", "universities"].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setView(option),
								className: `min-h-9 rounded-full px-5 text-sm font-semibold capitalize transition ${view === option ? "bg-forest-900 text-white" : "text-forest-800 hover:text-forest-600"}`,
								children: option
							}, option))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[18rem_1fr] lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "surface-card h-fit lg:sticky lg:top-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-forest-950",
							children: "Filters"
						}), activeFilters > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: clearFilters,
							className: "text-xs font-semibold text-forest-700 underline",
							children: [
								"Clear (",
								activeFilters,
								")"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "field-label",
								htmlFor: "search",
								children: "Search"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "search",
								className: "field-input",
								placeholder: view === "programs" ? "Title, field, or university" : "University name",
								value: search,
								onChange: (event) => setSearch(event.target.value)
							})] }),
							view === "programs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "field-label",
									htmlFor: "degree",
									children: "Degree"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "degree",
									className: "field-input",
									value: degree,
									onChange: (e) => setDegree(e.target.value),
									children: DEGREE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: option,
										children: option ? option[0].toUpperCase() + option.slice(1) : "Any"
									}, option))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "field-label",
									htmlFor: "field",
									children: "Field"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "field",
									className: "field-input",
									placeholder: "e.g. Computer Science",
									value: field,
									onChange: (e) => setField(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "field-label",
									htmlFor: "intake",
									children: "Intake"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "intake",
									className: "field-input",
									value: intake,
									onChange: (e) => setIntake(e.target.value),
									children: INTAKE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: option,
										children: option ? option[0].toUpperCase() + option.slice(1) : "Any"
									}, option))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm font-medium text-slate-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: freeOnly,
										onChange: (e) => setFreeOnly(e.target.checked)
									}), "No tuition fee only"]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "field-label",
								htmlFor: "language",
								children: "Language"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "language",
								className: "field-input",
								value: language,
								onChange: (e) => setLanguage(e.target.value),
								children: LANGUAGE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option,
									children: option || "Any"
								}, option))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "field-label",
								htmlFor: "city",
								children: "City"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "city",
								className: "field-input",
								placeholder: "e.g. Munich",
								value: city,
								onChange: (e) => setCity(e.target.value)
							})] })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex flex-wrap items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-slate-600",
								children: loading ? "Loading results..." : `${resultCount} ${view === "programs" ? "programs" : "universities"} found`
							}), view === "programs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-48",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "field-label",
									htmlFor: "program-sort",
									children: "Sort programs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "program-sort",
									className: "field-input",
									value: sort,
									onChange: (event) => setSort(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "relevance",
											children: "Best match"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "deadline",
											children: "Soonest future deadline"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "tuition",
											children: "Lowest tuition first"
										})
									]
								})]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800",
							children: error
						}),
						!error && loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4",
							children: [
								0,
								1,
								2
							].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card animate-pulse",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/2 rounded bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-3 w-1/3 rounded bg-slate-100" })]
							}, key))
						}),
						!error && !loading && resultCount === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-forest-950",
									children: "No matches yet."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-slate-600",
									children: "Try removing a filter or broadening your search."
								}),
								activeFilters > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: clearFilters,
									className: "mt-4 secondary-button",
									children: "Clear filters"
								})
							]
						}),
						!error && !loading && view === "programs" && programs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-4",
							children: sortedPrograms.map((program) => {
								const university = universitiesById.get(program.university_id);
								const nextDeadline = getNextDeadline(program.deadlines);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "surface-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												href: `/explore/program/${program.id}`,
												className: "text-lg font-semibold tracking-[-0.02em] text-forest-950 hover:text-forest-700",
												children: program.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-slate-600",
												children: university ? `${university.name} · ${university.city}` : program.field
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "pill capitalize",
												children: program.degree_level
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex flex-wrap gap-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "pill",
													children: program.language
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "pill",
													children: formatEuro(program.tuition_eur)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "pill",
													children: [program.duration_semesters, " semesters"]
												}),
												program.intakes.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "pill capitalize",
													children: [entry, " intake"]
												}, entry))
											]
										}),
										nextDeadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-4 text-sm text-slate-700",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [deadlineStatusLabel(nextDeadline.deadline), ":"] }),
												" ",
												formatDate(nextDeadline.deadline),
												" · ",
												nextDeadline.intake,
												" intake"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 flex flex-wrap items-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													href: `/explore/program/${program.id}`,
													className: "link-underline text-sm",
													children: "View details"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortlistButton, { programId: program.id }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareButton, { programId: program.id })
											]
										})
									]
								}, program.id);
							})
						}),
						!error && !loading && view === "universities" && universities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-4 sm:grid-cols-2",
							children: universities.map((university) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "surface-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: `/explore/university/${university.id}`,
										className: "text-lg font-semibold tracking-[-0.02em] text-forest-950 hover:text-forest-700",
										children: university.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-slate-600",
										children: [
											university.city,
											", ",
											university.state
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex flex-wrap gap-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "pill capitalize",
												children: university.type
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "pill",
												children: university.application_route
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "pill",
												children: ["Semester fee ", formatEuro(university.semester_fee_eur)]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-4 text-xs text-slate-500",
										children: ["Verified ", formatDate(university.last_verified)]
									})
								]
							}, university.id))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function ExplorePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-5 py-16 text-slate-600",
			children: "Loading explorer..."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExploreContent, {})
	});
}
//#endregion
export { ExplorePage as default };
