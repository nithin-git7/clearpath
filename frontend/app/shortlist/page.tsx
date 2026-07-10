"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import { ApiError } from "@/lib/api";
import { formatDate, formatEuro, getPrograms, type Program } from "@/lib/catalog";
import { useChecklist, useShortlist } from "@/lib/storage";

const CHECKLIST_ITEMS = [
  { id: "documents", label: "Gather academic documents" },
  { id: "language", label: "Meet language proficiency requirement" },
  { id: "requirements", label: "Confirm program requirements" },
  { id: "application", label: "Submit application before the deadline" },
  { id: "finance", label: "Prepare proof of finances" },
] as const;

function ApplicationCard({ program, onRemove }: { program: Program; onRemove: () => void }) {
  const itemIds = CHECKLIST_ITEMS.map((item) => item.id);
  const { state, ready, toggle, completedCount, total } = useChecklist(program.id, itemIds);

  return (
    <li className="surface-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href={`/explore/program/${program.id}`} className="text-lg font-semibold tracking-[-0.02em] text-forest-950 hover:text-forest-700">
            {program.title}
          </Link>
          <p className="mt-1 text-sm text-slate-600 capitalize">{program.degree_level} · {program.language} · {formatEuro(program.tuition_eur)}</p>
        </div>
        <button type="button" onClick={onRemove} className="text-xs font-semibold text-slate-500 underline hover:text-forest-700">Remove</button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600">
          <span>Application checklist</span>
          <span>{ready ? `${completedCount}/${total}` : "..."}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-lime-500 transition-all"
            style={{ width: `${total ? (completedCount / total) * 100 : 0}%` }}
          />
        </div>
        <ul className="mt-4 space-y-2">
          {CHECKLIST_ITEMS.map((item) => (
            <li key={item.id}>
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={Boolean(state[item.id])} onChange={() => toggle(item.id)} disabled={!ready} />
                <span className={state[item.id] ? "line-through opacity-60" : ""}>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {program.deadlines.length > 0 && (
        <p className="mt-4 text-xs text-slate-500">
          Next deadline: {formatDate([...program.deadlines].sort((a, b) => a.deadline.localeCompare(b.deadline))[0].deadline)}
        </p>
      )}
    </li>
  );
}

export default function ShortlistPage() {
  const { items, ready, toggle, clear } = useShortlist();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getPrograms()
      .then((data) => {
        if (active) setPrograms(data);
      })
      .catch((caught) => {
        if (active) setError(caught instanceof ApiError ? caught.message : "Could not load your shortlist.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const saved = programs.filter((program) => items.includes(program.id));

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">My shortlist</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Your saved programs and application progress.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Everything is stored on this device only. Track each application with its own checklist.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {error && <div className="surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800">{error}</div>}

        {loading && !error && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1].map((key) => <div key={key} className="surface-card animate-pulse py-16" />)}
          </div>
        )}

        {!loading && !error && (!ready || saved.length === 0) && (
          <div className="surface-card text-center">
            <p className="font-semibold text-forest-950">Your shortlist is empty.</p>
            <p className="mt-2 text-sm text-slate-600">Browse the catalog and add programs to build your application plan.</p>
            <Link href="/explore" className="mt-4 inline-block primary-button">Explore programs</Link>
          </div>
        )}

        {!loading && !error && ready && saved.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">{saved.length} saved</p>
              <button type="button" onClick={clear} className="text-xs font-semibold text-slate-500 underline hover:text-forest-700">Clear all</button>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {saved.map((program) => (
                <ApplicationCard key={program.id} program={program} onRemove={() => toggle(program.id)} />
              ))}
            </ul>
          </>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
