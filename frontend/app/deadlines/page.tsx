"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import { ApiError } from "@/lib/api";
import {
  deadlineStatusLabel,
  formatDate,
  getDeadlineStatus,
  getDeadlines,
  type DeadlineEntry,
  type Intake,
} from "@/lib/catalog";
import { useSavedDeadlines } from "@/lib/storage";

const INTAKES: (Intake | "all")[] = ["all", "winter", "summer"];
type SortMode = "deadline" | "verified";

export default function DeadlinesPage() {
  const [intake, setIntake] = useState<Intake | "all">("all");
  const [entries, setEntries] = useState<DeadlineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { items: saved, ready, toggle, has } = useSavedDeadlines();
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showPassed, setShowPassed] = useState(false);
  const [nearOnly, setNearOnly] = useState(false);
  const [sort, setSort] = useState<SortMode>("deadline");

  useEffect(() => {
    let active = true;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDeadlines(intake === "all" ? undefined : intake);
        if (active) setEntries(data);
      } catch (caught) {
        if (active) setError(caught instanceof ApiError ? caught.message : "Could not load deadlines.");
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => { active = false; };
  }, [intake]);

  const visible = useMemo(() => {
    const filtered = entries.filter((entry) => {
      const status = getDeadlineStatus(entry.deadline);
      if (!showPassed && status === "passed") return false;
      if (nearOnly && status !== "near") return false;
      if (showSavedOnly && !has(entry.program_id + entry.intake)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => (
      sort === "verified"
        ? b.last_verified.localeCompare(a.last_verified)
        : a.deadline.localeCompare(b.deadline)
    ));
  }, [entries, has, nearOnly, showPassed, showSavedOnly, sort]);

  const futureCount = entries.filter((entry) => getDeadlineStatus(entry.deadline) !== "passed" && getDeadlineStatus(entry.deadline) !== "unknown").length;

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Deadline intelligence</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">Know which dates still matter.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            ClearPath separates future, near, and passed cycles. A date can differ by nationality, qualification,
            program, or application route, so open the official page before planning around it.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="pill"><span className="size-2 rounded-full bg-lime-500" /> Future</span>
            <span className="pill"><span className="size-2 rounded-full bg-amber-500" /> Within 45 days</span>
            <span className="pill"><span className="size-2 rounded-full bg-slate-400" /> Passed cycle</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="surface-card">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="field-label">Intake</span>
              <div className="inline-flex rounded-full border border-forest-900/15 bg-cream-50 p-1">
                {INTAKES.map((option) => (
                  <button key={option} type="button" onClick={() => setIntake(option)} aria-pressed={intake === option} className={`min-h-9 rounded-full px-5 text-sm font-semibold capitalize transition ${intake === option ? "bg-forest-900 text-white" : "text-forest-800 hover:text-forest-600"}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:items-end">
              <label className="flex min-h-11 items-center gap-2 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={nearOnly} onChange={(event) => setNearOnly(event.target.checked)} className="size-4 accent-forest-700" /> Due within 45 days
              </label>
              <label className="flex min-h-11 items-center gap-2 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={showSavedOnly} onChange={(event) => setShowSavedOnly(event.target.checked)} className="size-4 accent-forest-700" /> Saved only ({ready ? saved.length : 0})
              </label>
              <div>
                <label className="field-label" htmlFor="deadline-sort">Sort</label>
                <select id="deadline-sort" className="field-input" value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
                  <option value="deadline">Soonest deadline</option>
                  <option value="verified">Recently verified</option>
                </select>
              </div>
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-600">
            <input type="checkbox" checked={showPassed} onChange={(event) => setShowPassed(event.target.checked)} className="size-4 accent-forest-700" /> Show passed cycles for reference
          </label>
        </div>

        {!loading && !error && futureCount === 0 && !showPassed && (
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            No future dated entries are available for this view. This does not mean the programs are closed;
            the next cycle may not be published yet. Open the official program pages or show passed cycles for reference.
          </div>
        )}

        <div className="mt-6" aria-live="polite" aria-busy={loading}>
          {error && <div className="surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800">{error} Your saved deadlines are still on this device.</div>}
          {loading && !error && <div className="grid gap-3">{[0, 1, 2, 3].map((key) => <div key={key} className="surface-card animate-pulse py-8" />)}</div>}
          {!loading && !error && visible.length === 0 && (
            <div className="surface-card text-center">
              <p className="font-semibold text-forest-950">No dates match these filters.</p>
              <p className="mt-2 text-sm text-slate-600">Show passed cycles, switch intake, or clear the saved/near filters.</p>
              <button type="button" onClick={() => { setShowSavedOnly(false); setNearOnly(false); setShowPassed(false); setIntake("all"); }} className="mt-4 secondary-button">Reset filters</button>
            </div>
          )}
          {!loading && !error && visible.length > 0 && (
            <ul className="grid gap-3">
              {visible.map((entry) => {
                const key = entry.program_id + entry.intake;
                const status = getDeadlineStatus(entry.deadline);
                const saveState = ready && has(key);
                return (
                  <li key={key} className={`surface-card border-l-4 ${status === "near" ? "border-l-amber-500" : status === "passed" ? "border-l-slate-300 opacity-80" : "border-l-lime-500"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${status === "near" ? "bg-amber-100 text-amber-800" : status === "passed" ? "bg-slate-100 text-slate-600" : "bg-lime-200 text-forest-900"}`}>{deadlineStatusLabel(entry.deadline)}</span>
                          <span className="pill capitalize">{entry.intake} intake</span>
                        </div>
                        <Link href={`/explore/program/${entry.program_id}`} className="mt-3 inline-block text-lg font-semibold text-forest-950 hover:text-forest-700">{entry.program_title}</Link>
                        <p className="mt-1 text-sm text-slate-600">{entry.university_name} — {entry.city}</p>
                        <p className="mt-3 text-sm text-slate-700"><strong>{status === "passed" ? "Recorded deadline" : "Apply by"}:</strong> {formatDate(entry.deadline)}</p>
                        {entry.deadline_note && <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-600">{entry.deadline_note}</p>}
                        <p className="mt-2 text-xs text-slate-500">Source checked {formatDate(entry.last_verified)}</p>
                      </div>
                      <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
                        <a href={entry.official_link} target="_blank" rel="noreferrer" className="link-underline text-sm">Verify official date ↗</a>
                        <button type="button" onClick={() => toggle(key)} disabled={!ready} aria-pressed={saveState} className={`inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold transition disabled:opacity-50 ${saveState ? "bg-forest-900 text-white hover:bg-forest-700" : "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700"}`}>{saveState ? "Saved" : "Save date"}</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
