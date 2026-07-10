"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import { ApiError } from "@/lib/api";
import { formatDate, formatEuro, getPrograms, type Program } from "@/lib/catalog";
import { useCompareList } from "@/lib/storage";

export default function ComparePage() {
  const { items, ready, toggle, has, clear } = useCompareList();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPrograms()
      .then(setPrograms)
      .catch((caught) => setError(caught instanceof ApiError ? caught.message : "Could not load programs."))
      .finally(() => setLoading(false));
  }, []);

  const selected = programs.filter((p) => items.includes(p.id));

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Compare</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Compare up to 3 programs side by side.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Pick programs from the list below to compare degree, language, tuition, deadlines, and
            requirements in one view.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {error && <div className="surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800">{error}</div>}

        {selected.length > 0 && (
          <section className="mb-10 overflow-x-auto">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">{selected.length}/3 selected</p>
              <button type="button" onClick={clear} className="text-xs font-semibold text-slate-500 underline">Clear all</button>
            </div>
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pr-4 font-semibold text-slate-500">Field</th>
                  {selected.map((p) => (
                    <th key={p.id} className="py-3 pr-4 font-semibold text-forest-950">{p.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ["Degree", (p: Program) => p.degree_level],
                  ["Field", (p: Program) => p.field],
                  ["Language", (p: Program) => p.language],
                  ["Tuition", (p: Program) => formatEuro(p.tuition_eur)],
                  ["Duration", (p: Program) => `${p.duration_semesters} semesters`],
                  ["Intakes", (p: Program) => p.intakes.join(", ")],
                  ["Next deadline", (p: Program) => formatDate([...p.deadlines].sort((a, b) => a.deadline.localeCompare(b.deadline))[0]?.deadline ?? "—")],
                  ["Requirements", (p: Program) => p.requirements_summary],
                ].map(([label, getter]) => (
                  <tr key={label as string} className="border-b border-slate-100 align-top">
                    <td className="py-3 pr-4 font-medium text-slate-500">{label as string}</td>
                    {selected.map((p) => (
                      <td key={p.id} className="py-3 pr-4 capitalize">{(getter as (p: Program) => string)(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold text-forest-950">Add programs to compare</h2>
          {loading ? (
            <p className="mt-4 text-slate-600">Loading programs...</p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => {
                const selectedState = ready && has(program.id);
                const disabled = ready && !selectedState && items.length >= 3;
                return (
                  <li key={program.id} className="surface-card">
                    <Link href={`/explore/program/${program.id}`} className="font-semibold text-forest-950 hover:text-forest-700">{program.title}</Link>
                    <p className="mt-1 text-xs text-slate-500 capitalize">{program.field} · {program.language}</p>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => toggle(program.id)}
                      className={`mt-3 inline-flex min-h-9 items-center rounded-full px-4 text-xs font-semibold disabled:opacity-40 ${
                        selectedState ? "bg-forest-900 text-white" : "border border-forest-700/25 text-forest-800"
                      }`}
                    >
                      {selectedState ? "Remove" : "Compare"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
