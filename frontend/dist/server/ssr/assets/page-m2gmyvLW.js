import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-BXsC33E9.js";
import { d as getPrograms, f as getUniversities, m as ApiError, t as SiteFooter } from "./SiteFooter-CKFxsOC_.js";
import { r as useSearchParams } from "./navigation-DG8DKWKJ.js";
//#region lib/content.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var guides = [
	{
		slug: "india-application-path",
		title: "India-first application path",
		summary: "A practical sequence for Indian students, from APS and university shortlisting to documents, applications, and visa preparation.",
		highRisk: true,
		readingMinutes: 8,
		sections: [
			{
				heading: "1. Start APS and research in parallel",
				body: "Indian academic documents commonly need APS verification for the Germany study and visa process. Check the current APS India procedure early and begin it while you shortlist programs; processing time can otherwise become your critical path."
			},
			{
				heading: "2. Check the 2026 APS eligibility updates",
				body: "For admissions from winter 2026/27, APS India has published updated undergraduate criteria, including a 70% Class XII threshold for the subject-restricted Studienkolleg route described in its notice. For summer 2027 and later, APS says dMAT applies to selected master's applicants whose previous degree is in specified Engineering, Commerce, Accounting, Finance, Economics, Business, or Management fields. Read the official scope because neither update applies universally."
			},
			{
				heading: "3. Build a source-backed shortlist",
				body: "Use DAAD to discover programs, then confirm every requirement on the university's own program and application pages. Record the exact degree, intake, applicant category, application route, deadline, language level, tuition, and semester fee. A university may use direct application, uni-assist, or a VPD route depending on the program."
			},
			{
				heading: "4. Prepare the core document set",
				body: "A typical academic application may ask for your passport, APS certificate, school-leaving records, bachelor's degree or provisional certificate, semester-wise transcripts, grading scale, language certificate, CV, and program-specific motivation letter or references. These are common documents, not a universal mandatory list; the official program checklist decides what is required."
			},
			{
				heading: "5. Check format rules before uploading",
				body: "Confirm whether the university wants certified copies, translations, a specific transcript format, module descriptions, or documents sent separately to uni-assist. Match names and dates across your passport, APS record, test scores, and academic documents, and do not upload unrelated sensitive records."
			},
			{
				heading: "6. Work backward from four deadlines",
				body: "Track the university deadline, uni-assist or VPD processing time, APS progress, and the visa appointment separately. Submit well before the last day because payment, document review, or portal issues can leave an application incomplete even when you started before the deadline."
			},
			{
				heading: "7. Move to visa preparation after admission",
				body: "Use the checklist for the German mission responsible for your place of residence in India. Financial proof, insurance, forms, and appointment rules can change, so verify them again on the official mission or Federal Foreign Office pages before paying or booking."
			}
		],
		resources: [
			{
				label: "DAAD India: studying in Germany",
				url: "https://www.daad.in/en/study-research-in-germany/studying-in-germany/",
				last_verified: "2026-07-09"
			},
			{
				label: "APS India",
				url: "https://www.aps-india.de/",
				last_verified: "2026-07-09"
			},
			{
				label: "APS India: 2026 eligibility updates",
				url: "https://aps-india.de/news/",
				last_verified: "2026-07-10"
			},
			{
				label: "APS India: dMAT scope",
				url: "https://aps-india.de/dmat/",
				last_verified: "2026-07-10"
			},
			{
				label: "DAAD: application process",
				url: "https://www.daad.de/en/studying-in-germany/requirements/application-process/",
				last_verified: "2026-07-09"
			},
			{
				label: "DAAD International Programmes",
				url: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/",
				last_verified: "2026-07-09"
			}
		]
	},
	{
		slug: "visa-steps",
		title: "German student visa steps",
		summary: "Understand the typical sequence for a national visa for study, from admission to the embassy appointment.",
		highRisk: true,
		readingMinutes: 6,
		sections: [
			{
				heading: "Use the responsible mission and online portal",
				body: "After admission, follow the German mission responsible for your place of residence. The Federal Foreign Office says national visa applications can be prepared and submitted through the Consular Services Portal, but local document and appointment steps can still differ."
			},
			{
				heading: "Common building blocks",
				body: "A study-visa application normally requires admission, proof of financial resources, health-insurance evidence, a valid passport, and the forms or digital steps specified by the responsible mission. A blocked account is one possible form of financial proof, not the only one."
			},
			{
				heading: "Verify before you act",
				body: "Requirements, fees, and financial-proof amounts change. Always confirm the current checklist on your responsible German mission's website before booking or paying for anything."
			}
		],
		resources: [{
			label: "Federal Foreign Office: visas for Germany",
			url: "https://www.auswaertiges-amt.de/en/visa-service/215870-215870",
			last_verified: "2026-07-11"
		}, {
			label: "Make it in Germany: student visa",
			url: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
			last_verified: "2026-07-11"
		}]
	},
	{
		slug: "aps-certificate",
		title: "APS certificate explained",
		summary: "What the APS is, who needs it, and how it fits into applications for students from certain countries.",
		highRisk: true,
		readingMinutes: 5,
		sections: [{
			heading: "What it is",
			body: "The APS (Akademische Prüfstelle) verifies academic documents for applicants from certain countries. The office, procedure, and whether a certificate is required depend on where your qualifications were earned and the route you are using."
		}, {
			heading: "Why it matters",
			body: "Where required, an APS certificate is often needed before you can apply to universities or for a visa. Missing it can block your application, so check early whether your country has an APS requirement."
		}],
		resources: [{
			label: "APS India",
			url: "https://www.aps-india.de/",
			last_verified: "2026-07-04"
		}, {
			label: "APS China",
			url: "https://www.aps.org.cn/",
			last_verified: "2026-07-04"
		}]
	},
	{
		slug: "uni-assist-vpd",
		title: "uni-assist and VPD",
		summary: "How centralized application processing and the preliminary documentation check (VPD) work.",
		highRisk: false,
		readingMinutes: 4,
		sections: [{
			heading: "uni-assist",
			body: "Many universities process international applications through uni-assist, which checks documents and forwards eligible applications. Some universities accept direct applications instead. Always confirm the route on the program page."
		}, {
			heading: "VPD",
			body: "A VPD (Vorprüfungsdokumentation) is issued by uni-assist for a specific university. It documents the certificates reviewed and the German-grade evaluation. You normally submit it yourself to the university before that university's deadline."
		}],
		resources: [{
			label: "uni-assist official site",
			url: "https://www.uni-assist.de/en/how-to-apply/plan-your-application/vpd/",
			last_verified: "2026-07-11"
		}]
	},
	{
		slug: "blocked-account",
		title: "Blocked account and finances",
		summary: "How the blocked account demonstrates financial resources for your student visa.",
		highRisk: true,
		readingMinutes: 5,
		sections: [{
			heading: "Purpose",
			body: "A blocked account is a common way to prove you can cover living costs during your studies. You deposit a set amount and can withdraw a limited sum each month after arrival."
		}, {
			heading: "The amount changes",
			body: "For 2026, official study-visa guidance lists at least EUR 11,904 in a blocked account as one way to prove funds. The amount is updated over time, and a scholarship or declaration of commitment may also be accepted. Confirm the amount and method with the German mission handling your case before transferring money."
		}],
		resources: [{
			label: "Make it in Germany: student visa finances",
			url: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
			last_verified: "2026-07-11"
		}]
	},
	{
		slug: "health-insurance",
		title: "Health insurance basics",
		summary: "Why health insurance is mandatory and how public and private options differ for students.",
		highRisk: true,
		readingMinutes: 4,
		sections: [{
			heading: "Mandatory coverage",
			body: "Health insurance is mandatory in Germany and proof is commonly needed for enrolment and visa steps. Students are generally in statutory insurance, but exceptions—including some students over 30—mean eligibility must be checked for the individual case."
		}, {
			heading: "Confirm eligibility",
			body: "Whether you can use public insurance depends on your age, program, and status. Confirm your options with an insurer and your university before you enroll."
		}],
		resources: [{
			label: "Make it in Germany: insurance",
			url: "https://www.make-it-in-germany.com/en/living-in-germany/money-insurance/health-insurance",
			last_verified: "2026-07-11"
		}]
	},
	{
		slug: "accommodation",
		title: "Finding accommodation",
		summary: "Where students look for housing and how to avoid common rental scams.",
		highRisk: false,
		readingMinutes: 4,
		sections: [{
			heading: "Where to look",
			body: "Student unions (Studierendenwerk) offer dormitories, though waiting lists are common. Shared flats (WGs) and private rentals are alternatives. Apply to dormitories as early as possible."
		}, {
			heading: "Avoid scams",
			body: "Never pay a deposit before viewing a place or verifying the landlord, and be cautious of listings that ask for money before any contract. If an offer feels too good, treat it as a warning sign."
		}],
		resources: [{
			label: "Deutsches Studierendenwerk",
			url: "https://www.studierendenwerke.de/en/",
			last_verified: "2026-07-04"
		}]
	},
	{
		slug: "working-while-studying",
		title: "Working while studying",
		summary: "The general framework for part-time work on a student visa and why limits matter.",
		highRisk: true,
		readingMinutes: 4,
		sections: [{
			heading: "Work allowance",
			body: "Official guidance states that many students from third countries may work up to 140 full days or 280 half days per year, or up to 20 hours per week. Student-assistant work and individual residence conditions can be treated differently."
		}, {
			heading: "Check current rules",
			body: "Your residence title, study status, and the type of job affect what is allowed. Confirm the conditions on your residence title or with the local foreigners authority before starting work."
		}],
		resources: [{
			label: "Make it in Germany: working as a student",
			url: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
			last_verified: "2026-07-11"
		}]
	},
	{
		slug: "arrival-checklist",
		title: "After you arrive",
		summary: "The first administrative steps most students complete soon after arriving in Germany.",
		highRisk: false,
		readingMinutes: 4,
		sections: [{
			heading: "Register your address",
			body: "Official guidance says you should register your address at the local registration office within two weeks of moving into a residence. Check the local city website for appointments and required documents such as the landlord confirmation."
		}, {
			heading: "Residence permit and enrollment",
			body: "Complete enrolment by the deadline in your admission letter. If you need a student residence permit, follow the local foreigners authority's process early because appointments and required documents are managed locally."
		}],
		resources: [{
			label: "Make it in Germany: after arrival",
			url: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/planning",
			last_verified: "2026-07-11"
		}]
	}
];
var glossary = [
	{
		term: "APS",
		definition: "Akademische Pruefstelle. An academic verification step required for applicants from certain countries."
	},
	{
		term: "uni-assist",
		definition: "A central service that checks and forwards international applications for many German universities."
	},
	{
		term: "VPD",
		definition: "Vorpruefungsdokumentation. A preliminary documentation of your qualifications, sometimes required for direct applications."
	},
	{
		term: "Blocked account",
		definition: "A bank account holding a set sum to prove you can fund your living costs, with limited monthly withdrawals."
	},
	{
		term: "Anmeldung",
		definition: "Registration of your residential address at the local registration office after you move in."
	},
	{
		term: "Auslaenderbehoerde",
		definition: "The local immigration office that handles residence permits and related matters."
	},
	{
		term: "Studierendenwerk",
		definition: "The student services organization that runs dormitories, canteens, and support services."
	},
	{
		term: "Semester fee",
		definition: "A recurring administrative fee most public universities charge each semester, often including a transport pass."
	},
	{
		term: "Winter intake",
		definition: "The main start of the academic year, typically beginning around October, with earlier application deadlines."
	},
	{
		term: "Summer intake",
		definition: "A secondary start, typically beginning around April, offered for a smaller set of programs."
	}
];
//#endregion
//#region app/search/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function SearchContent() {
	const [query, setQuery] = (0, import_react.useState)(useSearchParams().get("q") ?? "");
	const [programs, setPrograms] = (0, import_react.useState)([]);
	const [universities, setUniversities] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		Promise.all([getPrograms(), getUniversities()]).then(([programData, universityData]) => {
			if (!active) return;
			setPrograms(programData);
			setUniversities(universityData);
		}).catch((caught) => {
			if (active) setError(caught instanceof ApiError ? caught.message : "Could not load search data.");
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => {
			active = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams();
		if (query) params.set("q", query);
		const q = params.toString();
		window.history.replaceState(null, "", q ? `/search?${q}` : "/search");
	}, [query]);
	const results = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return {
			programs: [],
			universities: [],
			guides: [],
			glossary: []
		};
		return {
			programs: programs.filter((p) => p.title.toLowerCase().includes(needle) || p.field.toLowerCase().includes(needle)),
			universities: universities.filter((u) => u.name.toLowerCase().includes(needle) || u.city.toLowerCase().includes(needle)),
			guides: guides.filter((g) => g.title.toLowerCase().includes(needle) || g.summary.toLowerCase().includes(needle)),
			glossary: glossary.filter((g) => g.term.toLowerCase().includes(needle) || g.definition.toLowerCase().includes(needle))
		};
	}, [
		query,
		programs,
		universities
	]);
	const totalResults = results.programs.length + results.universities.length + results.guides.length + results.glossary.length;
	const hasQuery = query.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		className: "bg-cream-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-forest-900/10 bg-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-kicker",
							children: "Search"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Search everything in one place."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							className: "field-input mt-6 text-base",
							placeholder: "Search programs, universities, guides, and terms",
							value: query,
							onChange: (event) => setQuery(event.target.value)
						}),
						hasQuery && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-slate-600",
							children: [
								totalResults,
								" results for “",
								query,
								"”"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-10",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800",
						children: error
					}),
					!error && !hasQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-600",
						children: "Start typing to search across the whole site."
					}),
					!error && hasQuery && !loading && totalResults === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-forest-950",
							children: "No results found."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate-600",
							children: "Try a different keyword, like a field, city, or term."
						})]
					}),
					!error && hasQuery && totalResults > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [
							results.programs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "Programs",
								children: results.programs.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									href: `/explore/program/${program.id}`,
									className: "block surface-card hover:border-forest-700/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-forest-950",
										children: program.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-slate-600 capitalize",
										children: [
											program.field,
											" · ",
											program.degree_level
										]
									})]
								}, program.id))
							}),
							results.universities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "Universities",
								children: results.universities.map((university) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									href: `/explore/university/${university.id}`,
									className: "block surface-card hover:border-forest-700/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-forest-950",
										children: university.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-slate-600",
										children: [
											university.city,
											", ",
											university.state
										]
									})]
								}, university.id))
							}),
							results.guides.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "Guides",
								children: results.guides.map((guide) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									href: `/guides/${guide.slug}`,
									className: "block surface-card hover:border-forest-700/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-forest-950",
										children: guide.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-slate-600",
										children: guide.summary
									})]
								}, guide.slug))
							}),
							results.glossary.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "Glossary",
								children: results.glossary.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-forest-950",
										children: entry.term
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-slate-600",
										children: entry.definition
									})]
								}, entry.term))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function SearchGroup({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children
	})] });
}
function SearchPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-4xl px-5 py-16 text-slate-600",
			children: "Loading search..."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchContent, {})
	});
}
//#endregion
export { SearchPage as default };
