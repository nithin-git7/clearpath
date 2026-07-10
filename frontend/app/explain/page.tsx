"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import { ApiError } from "@/lib/api";
import { explainText, RISK_STYLES, type ExplainResponse } from "@/lib/explain";

const SAMPLE_TEXT =
  "We are pleased to inform you that you have been admitted to the M.Sc. Informatics program for the winter semester. Please accept your offer by 15 July 2026 through the online portal and submit proof of health insurance before enrollment.";

export default function ExplainPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ExplainResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (text.trim().length < 40) {
      setError("Please paste at least 40 characters so the explainer has enough context.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await explainText(text.trim());
      setResult(response);
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
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy automatically. Select the email text and copy it manually.");
    }
  };

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Document explainer</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Understand confusing official text.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Paste a letter or email from a university, visa office, APS, or uni-assist. Remove
            personal details first. You get a plain meaning, actions, risk level, and an email draft.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-8 px-5 py-10 sm:px-8 lg:px-10">
        <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          Privacy: remove your name, passport number, address, and account numbers before pasting.
          Text is analyzed on the server and not stored.
        </div>

        <form onSubmit={handleSubmit} className="surface-card space-y-4">
          <label className="field-label" htmlFor="text">Paste the message</label>
          <textarea
            id="text"
            className="field-input min-h-48 resize-y py-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the full text here..."
          />
          <div className="flex flex-wrap gap-3">
            <button type="button" className="secondary-button" onClick={() => setText(SAMPLE_TEXT)}>
              Try sample admission letter
            </button>
            <button type="submit" disabled={loading} className="primary-button disabled:opacity-50">
              {loading ? "Analyzing..." : "Explain this text"}
            </button>
          </div>
          {error && <p className="text-sm text-amber-800">{error}</p>}
        </form>

        {result && (
          <section id="explain-results" className="space-y-6">
            <div className="surface-card">
              <div className="flex flex-wrap items-center gap-3">
                <span className="pill">{result.category_label}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${RISK_STYLES[result.risk_level]}`}>
                  {result.risk_level} risk
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-forest-950">What it means</h2>
              <p className="mt-2 leading-7 text-slate-700">{result.meaning}</p>
              <p className="mt-3 text-sm text-slate-600">{result.risk_reason}</p>
            </div>

            {(result.extracted_dates.length > 0 || result.extracted_amounts.length > 0) && (
              <div className="grid gap-4 sm:grid-cols-2">
                {result.extracted_dates.length > 0 && (
                  <article className="surface-card">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Dates found</h3>
                    <ul className="mt-3 space-y-1 text-sm text-slate-700">
                      {result.extracted_dates.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </article>
                )}
                {result.extracted_amounts.length > 0 && (
                  <article className="surface-card">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Amounts found</h3>
                    <ul className="mt-3 space-y-1 text-sm text-slate-700">
                      {result.extracted_amounts.map((a) => <li key={a}>{a}</li>)}
                    </ul>
                  </article>
                )}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="surface-card">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">What to do</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  {result.required_actions.map((action) => <li key={action}>{action}</li>)}
                </ol>
              </article>
              <article className="surface-card">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Questions to ask</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  {result.questions_to_ask.map((q) => <li key={q}>{q}</li>)}
                </ul>
              </article>
            </div>

            <article className="surface-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Email draft</h3>
                <button type="button" onClick={copyEmail} className="secondary-button text-xs">
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
              <p className="mt-3 text-sm font-semibold text-forest-950">Subject: {result.email_draft.subject}</p>
              <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">{result.email_draft.body}</pre>
            </article>

            <p className="text-xs leading-5 text-slate-500">{result.disclaimer}</p>
            <Link href="/guides" className="link-underline text-sm">Read related guides →</Link>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
