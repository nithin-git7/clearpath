import { b as require_react, t as require_jsx_runtime, w as __toESM } from "../index.js";
import Link from "./link-2ZhP7GoM.js";
import { i as SiteFooter, r as apiPost, t as ApiError } from "./api-DMIWxbbD.js";
//#region lib/explain.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function explainText(text) {
	return apiPost("/api/explain", { text });
}
var RISK_STYLES = {
	low: "bg-green-100 text-green-800",
	medium: "bg-amber-100 text-amber-800",
	high: "bg-red-100 text-red-800"
};
//#endregion
//#region app/explain/page.tsx
var import_jsx_runtime = require_jsx_runtime();
var SAMPLE_TEXT = "We are pleased to inform you that you have been admitted to the M.Sc. Informatics program for the winter semester. Please accept your offer by 15 July 2026 through the online portal and submit proof of health insurance before enrollment.";
function ExplainPage() {
	const [text, setText] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (text.trim().length < 40) {
			setError("Please paste at least 40 characters so the explainer has enough context.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			setResult(await explainText(text.trim()));
			document.getElementById("explain-results")?.scrollIntoView({ behavior: "smooth" });
		} catch (caught) {
			setError(caught instanceof ApiError ? caught.message : "Could not explain this text.");
		} finally {
			setLoading(false);
		}
	};
	const copyEmail = async () => {
		if (!result) return;
		const full = `Subject: ${result.email_draft.subject}\n\n${result.email_draft.body}`;
		try {
			await navigator.clipboard.writeText(full);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			setError("Could not copy automatically. Select the email text and copy it manually.");
		}
	};
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
							children: "Document explainer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl",
							children: "Understand confusing official text."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl leading-7 text-slate-600",
							children: "Paste a letter or email from a university, visa office, APS, or uni-assist. Remove personal details first. You get a plain meaning, actions, risk level, and an email draft."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl space-y-8 px-5 py-10 sm:px-8 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900",
						children: "Privacy: remove your name, passport number, address, and account numbers before pasting. Text is analyzed on the server and not stored."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "surface-card space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "field-label",
								htmlFor: "text",
								children: "Paste the message"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "text",
								className: "field-input min-h-48 resize-y py-3",
								value: text,
								onChange: (e) => setText(e.target.value),
								placeholder: "Paste the full text here..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "secondary-button",
									onClick: () => setText(SAMPLE_TEXT),
									children: "Try sample admission letter"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: loading,
									className: "primary-button disabled:opacity-50",
									children: loading ? "Analyzing..." : "Explain this text"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-amber-800",
								children: error
							})
						]
					}),
					result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "explain-results",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "pill",
											children: result.category_label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `rounded-full px-3 py-1 text-xs font-semibold capitalize ${RISK_STYLES[result.risk_level]}`,
											children: [result.risk_level, " risk"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-4 text-xl font-semibold text-forest-950",
										children: "What it means"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 leading-7 text-slate-700",
										children: result.meaning
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-slate-600",
										children: result.risk_reason
									})
								]
							}),
							(result.extracted_dates.length > 0 || result.extracted_amounts.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [result.extracted_dates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "Dates found"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-3 space-y-1 text-sm text-slate-700",
										children: result.extracted_dates.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: d }, d))
									})]
								}), result.extracted_amounts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "Amounts found"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-3 space-y-1 text-sm text-slate-700",
										children: result.extracted_amounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: a }, a))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 lg:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "What to do"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700",
										children: result.required_actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: action }, action))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
										children: "Questions to ask"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700",
										children: result.questions_to_ask.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: q }, q))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "surface-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold uppercase tracking-[0.08em] text-forest-700",
											children: "Email draft"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: copyEmail,
											className: "secondary-button text-xs",
											children: copied ? "Copied!" : "Copy email"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-sm font-semibold text-forest-950",
										children: ["Subject: ", result.email_draft.subject]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
										className: "mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700",
										children: result.email_draft.body
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-5 text-slate-500",
								children: result.disclaimer
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/guides",
								className: "link-underline text-sm",
								children: "Read related guides →"
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
export { ExplainPage as default };
