"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ApiError } from "@/lib/api";
import { formatDate, getDeadlines, type DeadlineEntry } from "@/lib/catalog";

function daysUntil(dateValue: string): number {
  return Math.ceil((new Date(dateValue).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export default function UpcomingDeadlines() {
  const [entries, setEntries] = useState<DeadlineEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDeadlines()
      .then((all) => {
        const upcoming = all
          .filter((e) => daysUntil(e.deadline) >= 0)
          .sort((a, b) => a.deadline.localeCompare(b.deadline))
          .slice(0, 5);
        setEntries(upcoming);
      })
      .catch((caught) => {
        setError(caught instanceof ApiError ? caught.message : "Could not load deadlines.");
      });
  }, []);

  if (error) {
    return (
      <div className="surface-card text-sm text-amber-800">
        {error} Start the backend to see live deadlines.
      </div>
    );
  }

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="surface-card">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Upcoming deadlines</h2>
        <Link href="/deadlines" className="text-xs font-semibold text-forest-700 underline">View all</Link>
      </div>
      <ul className="mt-4 space-y-3">
        {entries.map((entry) => {
          const key = entry.program_id + entry.intake;
          const days = daysUntil(entry.deadline);
          return (
            <li key={key} className="text-sm">
              <Link href={`/explore/program/${entry.program_id}`} className="font-semibold text-forest-950 hover:text-forest-700">
                {entry.program_title}
              </Link>
              <p className="text-slate-600">{entry.university_name}</p>
              <p className="mt-1 text-xs text-slate-500">
                {formatDate(entry.deadline)} · {days} days left · {entry.intake} intake
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
