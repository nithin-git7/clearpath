import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-2ZhP7GoM.js";
import { i as SiteFooter, t as ApiError } from "./api-CoFO66dD.js";
import { a as getProgram, c as getUniversity, n as formatEuro, o as getPrograms, t as formatDate } from "./catalog-DXDdMWQO.js";
import { t as useParams } from "./navigation-DG8DKWKJ.js";
import { t as CompareButton } from "./CompareButton-DiNpgVRQ.js";
import { t as ShortlistButton } from "./ShortlistButton-DYhVXEO7.js";
import { t as VerifiedNote } from "./VerifiedNote-Dz5Mnppc.js";
//#region app/explore/program/[id]/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ProgramDetailPage() {
	const id = useParams().id;
	const [program, setProgram] = (0, import_react.useState)(null);
	const [university, setUniversity] = (0, import_react.useState)(null);
	const [related, setRelated] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const run = async () => {
			setLoading(true);
			setError(null);
			try {
				const found = await getProgram(id);
				if (!active) return;
				setProgram(found);
				const [uni, sameField] = await Promise.all([getUniversity(found.university_id), getPrograms({ field: found.field })]);
				if (!active) return;
				setUniversity(uni);
				setRelated(sameField.filter((entry) => entry.id !== found.id).slice(0, 3));
			} catch (caught) {
				if (!active) return;
				if (caught instanceof ApiError && caught.status === 404) setError("We could not find that program.");
				else if (caught instanceof ApiError) setError(caught.message);
				else setError("Something went wrong while loading this program.");
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
					href: "/explore",
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
				program && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-semibold tracking-[-0.04em] text-forest-950 sm:text-4xl",
								children: program.title
							}), university && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: `/explore/university/${university.id}`,
								className: "mt-2 inline-block link-underline",
								children: [
									university.name,
									" — ",
									university.city
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortlistButton, { programId: program.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareButton, { programId: program.id })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pill capitalize",
									children: program.degree_level
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pill",
									children: program.field
								}),
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
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "surface-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
									children: "Requirements"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 leading-7 text-slate-700",
									children: program.requirements_summary
								}),
								program.source_note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 border-l-2 border-lime-500 pl-4 text-sm leading-6 text-slate-600",
									children: program.source_note
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedNote, {
										lastVerified: program.last_verified,
										officialLink: program.official_link,
										label: "Open the official program page"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "surface-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
									children: "Deadlines"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-3",
									children: program.deadlines.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "rounded-lg bg-slate-50 px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-semibold capitalize text-forest-950",
												children: [entry.intake, " intake"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm text-slate-700",
												children: ["Apply by ", formatDate(entry.deadline)]
											})]
										}), entry.deadline_note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs leading-5 text-slate-600",
											children: entry.deadline_note
										})]
									}, entry.intake))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-slate-500",
									children: "Dates can change. Always confirm on the official page."
								})
							]
						})]
					}),
					related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold tracking-[-0.02em] text-forest-950",
							children: "Related programs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-4 sm:grid-cols-3",
							children: related.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "surface-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									href: `/explore/program/${entry.id}`,
									className: "font-semibold text-forest-950 hover:text-forest-700",
									children: entry.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-slate-500 capitalize",
									children: [
										entry.degree_level,
										" · ",
										entry.language
									]
								})]
							}, entry.id))
						})]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})]
	});
}
//#endregion
export { ProgramDetailPage as default };
