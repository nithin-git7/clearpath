import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { a as formatEuro, d as getPrograms, m as ApiError, p as getUniversity, t as SiteFooter } from "./SiteFooter-CKFxsOC_.js";
import { t as useParams } from "./navigation-DG8DKWKJ.js";
import { t as ShortlistButton } from "./ShortlistButton-Bk2IkQym.js";
import { t as VerifiedNote } from "./VerifiedNote-hgpaD9mK.js";
//#region app/explore/university/[id]/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function UniversityDetailPage() {
	const id = useParams().id;
	const [university, setUniversity] = (0, import_react.useState)(null);
	const [programs, setPrograms] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const run = async () => {
			setLoading(true);
			setError(null);
			try {
				const found = await getUniversity(id);
				if (!active) return;
				setUniversity(found);
				const universityPrograms = await getPrograms({ university_id: found.id });
				if (!active) return;
				setPrograms(universityPrograms);
			} catch (caught) {
				if (!active) return;
				if (caught instanceof ApiError && caught.status === 404) setError("We could not find that university.");
				else if (caught instanceof ApiError) setError(caught.message);
				else setError("Something went wrong while loading this university.");
			} finally {
				if (active) setLoading(false);
			}
		};
		run();
		return () => {
			active = false;
		};
	}, [id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		className: "bg-cream-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: "/explore?view=universities",
					className: "link-underline text-sm",
					children: "Back to explore"
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card mt-6 animate-pulse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-2/3 rounded bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-3 w-1/3 rounded bg-slate-100" })]
				}),
				error && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card mt-6 border-amber-500/40 bg-amber-50 text-amber-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: error
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/explore",
						className: "mt-3 inline-block link-underline text-sm",
						children: "Return to explore"
					})]
				}),
				university && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-semibold tracking-[-0.04em] text-forest-950 sm:text-4xl",
							children: university.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-slate-600",
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pill",
									children: ["Application: ", university.application_route]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pill",
									children: ["VPD ", university.vpd_required ? "required" : "not required"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pill",
									children: ["Semester fee ", formatEuro(university.semester_fee_eur)]
								}),
								university.languages.map((language) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pill",
									children: language
								}, language))
							]
						}),
						university.source_note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-3xl border-l-2 border-lime-500 pl-4 text-sm leading-6 text-slate-600",
							children: university.source_note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedNote, {
								lastVerified: university.last_verified,
								officialLink: university.official_link,
								label: "Open the official application page"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-semibold tracking-[-0.02em] text-forest-950",
						children: [
							"Programs (",
							programs.length,
							")"
						]
					}), programs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-slate-600",
						children: "No curated programs listed yet for this university."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: programs.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "surface-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: `/explore/program/${program.id}`,
										className: "font-semibold text-forest-950 hover:text-forest-700",
										children: program.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pill capitalize",
										children: program.degree_level
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-slate-500",
									children: [
										program.field,
										" · ",
										program.language,
										" · ",
										formatEuro(program.tuition_eur)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortlistButton, { programId: program.id })
								})
							]
						}, program.id))
					})]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})]
	});
}
//#endregion
export { UniversityDetailPage as default };
