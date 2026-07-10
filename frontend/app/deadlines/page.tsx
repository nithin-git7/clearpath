"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import { ApiError } from "@/lib/api";
import { formatDate, getDeadlines, type DeadlineEntry, type Intake } from "@/lib/catalog";
import { useSavedDeadlines } from "@/lib/storage";

const INTAKES: (Intake | "all")[] = ["all", "winter", "summer"];

function daysUntil(dateValue: string): number {
  const target = new Date(dateValue).getTime();
  const now = Date.now();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export default function DeadlinesPage() {
  const [intake, setIntake] = useState<Intake | "all">("all");
  const [entries, setEntries] = useState<DeadlineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { items: saved, ready, toggle, has } = useSavedDeadlines();
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showPassed, setShowPassed] = useState(false);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDeadlines(intake === "all" ? undefined : intake);
        if (active) setEntries(data);
      } catch (caught) {
        if (active) {
          setError(caught instanceof ApiError ? caught.message : "Could not load deadlines.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [intake]);

  const visible = useMemo(() => {
    const byCycle = showPassed
      ? entries
      : entries.filter((entry) => daysUntil(entry.deadline) >= 0);
    return showSavedOnly
      ? byCycle.filter((entry) => has(entry.program_id + entry.intake))
      : byCycle;
  }, [entries, showPassed, showSavedOnly, has]);

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Deadlines</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Track application deadlines by intake.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Save the deadlines that matter to you. Dates are curated with a verification date and can
            change, so always confirm on the official page before you rely on one.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-full border border-forest-900/15 bg-white p-1">
            {INTAKES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setIntake(option)}
                className={`min-h-9 rounded-full px-5 text-sm font-semibold capitalize transition ${
                  intake === option ? "bg-forest-900 text-white" : "text-forest-800 hover:text-forest-600"
                }`}
              >
                {option === "all" ? "All" : option}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={showSavedOnly} onChange={(e) => setShowSavedOnly(e.target.checked)} />
            Saved only ({ready ? saved.length : 0})
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={showPassed} onChange={(e) => setShowPassed(e.target.checked)} />
            Show passed cycles
          </label>
        </div>

        <div className="mt-6" aria-live="polite">
          {error && (
            <div className="surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800">{error}</div>
          )}

          {loading && !error && (
            <div className="grid gap-3">
              {[0, 1, 2, 3].map((key) => (
                <div key={key} className="surface-card animate-pulse py-6" />
              ))}
            </div>
          )}

          {!loading && !error && visible.length === 0 && (
            <div className="surface-card text-center">
              <p className="font-semibold text-forest-950">Nothing to show.</p>
              <p className="mt-2 text-sm text-slate-600">
                {showSavedOnly ? "You have not saved any deadlines yet." : "No deadlines match this intake."}
              </p>
            </div>
          )}

          {!loading && !error && visible.length > 0 && (
            <ul className="grid gap-3">
              {visible.map((entry) => {
                const key = entry.program_id + entry.intake;
                const remaining = daysUntil(entry.deadline);
                const saveState = ready && has(key);
                return (
                  <li key={key} className="surface-card flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <Link href={`/explore/program/${entry.program_id}`} className="font-semibold text-forest-950 hover:text-forest-700">
                        {entry.program_title}
                      </Link>
                      <p className="mt-1 text-sm text-slate-600">{entry.university_name} — {entry.city}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="pill capitalize">{entry.intake} intake</span>
                        <span className="pill">Apply by {formatDate(entry.deadline)}</span>
                        {remaining >= 0 ? (
                          <span className="pill">{remaining} days left</span>
                        ) : (
                          <span className="pill">Passed for this cycle</span>
                        )}
                      </div>
                      {entry.deadline_note && (
                        <p className="mt-3 max-w-3xl text-xs leading-5 text-slate-600">{entry.deadline_note}</p>
                      )}
                      <p className="mt-2 text-xs text-slate-500">Verified {formatDate(entry.last_verified)}</p>
                    </div>
                    <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
                      <a href={entry.official_link} target="_blank" rel="noreferrer" className="link-underline text-sm">Official page</a>
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        disabled={!ready}
                        aria-pressed={saveState}
                        className={`inline-flex min-h-9 items-center rounded-full px-4 text-sm font-semibold transition disabled:opacity-50 ${
                          saveState ? "bg-forest-900 text-white hover:bg-forest-700" : "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700"
                        }`}
                      >
                        {saveState ? "Saved" : "Save"}
                      </button>
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
