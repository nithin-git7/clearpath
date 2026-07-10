"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import ApsChecker from "@/components/ApsChecker";
import SiteFooter from "@/components/SiteFooter";
import VerifiedNote from "@/components/VerifiedNote";
import { ApiError } from "@/lib/api";
import {
  DEFAULT_ROADMAP_REQUEST,
  generateRoadmap,
  STAGE_LABELS,
  type RoadmapRequest,
  type RoadmapResponse,
} from "@/lib/roadmap";
import {
  readJson,
  ROADMAP_DRAFT_STORAGE,
  ROADMAP_RESULT_STORAGE,
  writeJson,
} from "@/lib/storage";

function SelectField<T extends string>({
  label,
  id,
  value,
  options,
  onChange,
}: {
  label: string;
  id: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label}</label>
      <select
        id={id}
        className="field-input"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function RoadmapPage() {
  const [form, setForm] = useState<RoadmapRequest>(DEFAULT_ROADMAP_REQUEST);
  const [result, setResult] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const draft = readJson<RoadmapRequest>(ROADMAP_DRAFT_STORAGE);
    const saved = readJson<RoadmapResponse>(ROADMAP_RESULT_STORAGE);
    // Hydrate saved form and last result from localStorage after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (draft) setForm(draft);
    if (saved) setResult(saved);
  }, []);

  const update = <K extends keyof RoadmapRequest>(key: K, value: RoadmapRequest[K]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      writeJson(ROADMAP_DRAFT_STORAGE, next);
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await generateRoadmap(form);
      setResult(response);
      writeJson(ROADMAP_RESULT_STORAGE, response);
      document.getElementById("roadmap-results")?.scrollIntoView({ behavior: "smooth" });
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not generate your roadmap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Roadmap</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Build your Germany study roadmap.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Answer a few questions about where you are now. You get a stage, next actions, document
            timing, weekly focus, and official links to verify.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-4xl gap-8 px-5 py-10 sm:px-8 lg:px-10">
        <ApsChecker
          onStatusChange={(status) => update("aps_status", status)}
          currentStatus={form.aps_status}
        />

        <form onSubmit={handleSubmit} className="surface-card space-y-5">
          <h2 className="text-lg font-semibold text-forest-950">Your profile</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Current education"
              id="education"
              value={form.education_status}
              onChange={(v) => update("education_status", v)}
              options={[
                { value: "highschool", label: "High school / pre-university" },
                { value: "bachelor_in_progress", label: "Bachelor in progress" },
                { value: "bachelor_done", label: "Bachelor completed" },
                { value: "master_done", label: "Master completed" },
              ]}
            />
            <SelectField
              label="Target degree"
              id="degree"
              value={form.target_degree}
              onChange={(v) => update("target_degree", v)}
              options={[
                { value: "bachelor", label: "Bachelor" },
                { value: "master", label: "Master" },
              ]}
            />
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="field">Field of study</label>
              <input
                id="field"
                className="field-input"
                value={form.field}
                onChange={(e) => update("field", e.target.value)}
                placeholder="e.g. Computer Science, Business, Mechanical Engineering"
                required
              />
            </div>
            <SelectField
              label="Target intake"
              id="intake"
              value={form.target_intake}
              onChange={(v) => update("target_intake", v)}
              options={[
                { value: "winter", label: "Winter (Oct start)" },
                { value: "summer", label: "Summer (Apr start)" },
              ]}
            />
            <SelectField
              label="Study language"
              id="language"
              value={form.study_language}
              onChange={(v) => update("study_language", v)}
              options={[
                { value: "English", label: "English" },
                { value: "German", label: "German" },
              ]}
            />
            <SelectField
              label="APS status"
              id="aps"
              value={form.aps_status}
              onChange={(v) => update("aps_status", v)}
              options={[
                { value: "unsure", label: "Not sure yet" },
                { value: "required", label: "Required for my country" },
                { value: "not_required", label: "Not required" },
              ]}
            />
            <SelectField
              label="Language test"
              id="test"
              value={form.language_test_status}
              onChange={(v) => update("language_test_status", v)}
              options={[
                { value: "not_started", label: "Not started" },
                { value: "preparing", label: "Preparing" },
                { value: "passed", label: "Passed" },
              ]}
            />
            <SelectField
              label="Admission status"
              id="admission"
              value={form.admission_status}
              onChange={(v) => update("admission_status", v)}
              options={[
                { value: "researching", label: "Still researching" },
                { value: "applied", label: "Applied to at least one" },
                { value: "admitted", label: "Admitted" },
              ]}
            />
            <SelectField
              label="Financial proof"
              id="finance"
              value={form.finance_status}
              onChange={(v) => update("finance_status", v)}
              options={[
                { value: "not_started", label: "Not started" },
                { value: "in_progress", label: "In progress" },
                { value: "ready", label: "Ready" },
              ]}
            />
            <SelectField
              label="Visa status"
              id="visa"
              value={form.visa_status}
              onChange={(v) => update("visa_status", v)}
              options={[
                { value: "not_started", label: "Not started" },
                { value: "appointment_booked", label: "Appointment booked" },
                { value: "approved", label: "Approved" },
              ]}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">{error}</p>
          )}

          <button type="submit" disabled={loading} className="primary-button disabled:opacity-50">
            {loading ? "Building roadmap..." : "Generate my roadmap"}
          </button>
        </form>

        {result && (
          <section id="roadmap-results" className="space-y-6">
            <div className="surface-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="pill">{STAGE_LABELS[result.stage]}</span>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-forest-950">{result.stage_title}</h2>
                  <p className="mt-2 leading-7 text-slate-600">{result.stage_summary}</p>
                </div>
                <Link href="/explore" className="secondary-button">Find programs</Link>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="surface-card">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Next 10 actions</h3>
                <ol className="mt-4 space-y-3">
                  {result.next_actions.map((action, index) => (
                    <li key={action} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-forest-900 text-xs font-semibold text-white">{index + 1}</span>
                      {action}
                    </li>
                  ))}
                </ol>
              </article>

              <article className="surface-card">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Documents</h3>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Needed now</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {result.documents_now.map((doc) => <li key={doc}>{doc}</li>)}
                </ul>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Needed later</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {result.documents_later.map((doc) => <li key={doc}>{doc}</li>)}
                </ul>
              </article>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="surface-card">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Weekly plan</h3>
                <ol className="mt-4 space-y-3">
                  {result.weekly_plan.map((week) => (
                    <li key={week.week} className="rounded-lg bg-slate-50 px-4 py-3 text-sm">
                      <span className="font-semibold text-forest-800">Week {week.week}</span>
                      <p className="mt-1 text-slate-700">{week.focus}</p>
                    </li>
                  ))}
                </ol>
              </article>

              <article className="surface-card">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Common mistakes</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  {result.common_mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
                </ul>
              </article>
            </div>

            <article className="surface-card">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Resources to verify</h3>
              <ul className="mt-4 space-y-3">
                {result.resources.map((resource) => (
                  <li key={resource.url}>
                    <VerifiedNote
                      lastVerified={resource.last_verified}
                      officialLink={resource.url}
                      label={resource.label}
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-slate-500">{result.disclaimer}</p>
            </article>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
