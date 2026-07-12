"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ApiError } from "@/lib/api";
import { deadlineStatusLabel, formatDate, getDeadlineStatus, getDeadlines, type DeadlineEntry } from "@/lib/catalog";

export default function UpcomingDeadlines() {
  const [entries, setEntries] = useState<DeadlineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDeadlines()
      .then((all) => setEntries(all.filter((entry) => ["near", "upcoming"].includes(getDeadlineStatus(entry.deadline))).sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 4)))
      .catch((caught) => setError(caught instanceof ApiError ? caught.message : "Could not load deadlines."))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div className="surface-card text-sm leading-6 text-amber-800">Deadlines are temporarily unavailable. Your other local progress is unaffected.</div>;
  }

  return (
    <section className="surface-card" aria-busy={loading}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Upcoming deadlines</h2>
        <Link href="/deadlines" className="text-xs font-semibold text-forest-700 underline">View all</Link>
      </div>
      {loading ? (
        <div className="mt-4 h-20 animate-pulse rounded-xl bg-slate-100" />
      ) : entries.length === 0 ? (
        <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          No future dated cycles are in the current catalog. Check official program pages for the next published intake.
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {entries.map((entry) => {
            const key = entry.program_id + entry.intake;
            return (
              <li key={key} className="py-3 first:pt-0 last:pb-0">
                <Link href={`/explore/program/${entry.program_id}`} className="text-sm font-semibold text-forest-950 hover:text-forest-700">{entry.program_title}</Link>
                <p className="mt-0.5 text-xs text-slate-600">{entry.university_name}</p>
                <p className="mt-1 text-xs text-slate-500">{formatDate(entry.deadline)} · {deadlineStatusLabel(entry.deadline)} · {entry.intake}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
