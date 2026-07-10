"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import CompareButton from "@/components/CompareButton";
import ShortlistButton from "@/components/ShortlistButton";
import SiteFooter from "@/components/SiteFooter";
import VerifiedNote from "@/components/VerifiedNote";
import { ApiError } from "@/lib/api";
import {
  formatDate,
  formatEuro,
  getProgram,
  getPrograms,
  getUniversity,
  type Program,
  type University,
} from "@/lib/catalog";

export default function ProgramDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [program, setProgram] = useState<Program | null>(null);
  const [university, setUniversity] = useState<University | null>(null);
  const [related, setRelated] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const found = await getProgram(id);
        if (!active) return;
        setProgram(found);
        const [uni, sameField] = await Promise.all([
          getUniversity(found.university_id),
          getPrograms({ field: found.field }),
        ]);
        if (!active) return;
        setUniversity(uni);
        setRelated(sameField.filter((entry) => entry.id !== found.id).slice(0, 3));
      } catch (caught) {
        if (!active) return;
        if (caught instanceof ApiError && caught.status === 404) {
          setError("We could not find that program.");
        } else if (caught instanceof ApiError) {
          setError(caught.message);
        } else {
          setError("Something went wrong while loading this program.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <main id="main-content" className="bg-cream-50">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <Link href="/explore" className="link-underline text-sm">Back to explore</Link>

        {loading && (
          <div className="surface-card mt-6 animate-pulse">
            <div className="h-6 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 h-3 w-1/3 rounded bg-slate-100" />
          </div>
        )}

        {error && !loading && (
          <div className="surface-card mt-6 border-amber-500/40 bg-amber-50 text-amber-800">
            <p className="font-semibold">{error}</p>
            <Link href="/explore" className="mt-3 inline-block link-underline text-sm">Return to explore</Link>
          </div>
        )}

        {program && !loading && (
          <>
            <header className="mt-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-semibold tracking-[-0.04em] text-forest-950 sm:text-4xl">{program.title}</h1>
                  {university && (
                    <Link href={`/explore/university/${university.id}`} className="mt-2 inline-block link-underline">
                      {university.name} — {university.city}
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <ShortlistButton programId={program.id} />
                  <CompareButton programId={program.id} />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="pill capitalize">{program.degree_level}</span>
                <span className="pill">{program.field}</span>
                <span className="pill">{program.language}</span>
                <span className="pill">{formatEuro(program.tuition_eur)}</span>
                <span className="pill">{program.duration_semesters} semesters</span>
              </div>
            </header>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <article className="surface-card">
                <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Requirements</h2>
                <p className="mt-3 leading-7 text-slate-700">{program.requirements_summary}</p>
                {program.source_note && (
                  <p className="mt-4 border-l-2 border-lime-500 pl-4 text-sm leading-6 text-slate-600">{program.source_note}</p>
                )}
                <div className="mt-5">
                  <VerifiedNote lastVerified={program.last_verified} officialLink={program.official_link} label="Open the official program page" />
                </div>
              </article>

              <article className="surface-card">
                <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Deadlines</h2>
                <ul className="mt-3 space-y-3">
                  {program.deadlines.map((entry) => (
                    <li key={entry.intake} className="rounded-lg bg-slate-50 px-4 py-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-semibold capitalize text-forest-950">{entry.intake} intake</span>
                        <span className="text-sm text-slate-700">Apply by {formatDate(entry.deadline)}</span>
                      </div>
                      {entry.deadline_note && (
                        <p className="mt-2 text-xs leading-5 text-slate-600">{entry.deadline_note}</p>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">Dates can change. Always confirm on the official page.</p>
              </article>
            </section>

            {related.length > 0 && (
              <section className="mt-10">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-forest-950">Related programs</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                  {related.map((entry) => (
                    <li key={entry.id} className="surface-card">
                      <Link href={`/explore/program/${entry.id}`} className="font-semibold text-forest-950 hover:text-forest-700">{entry.title}</Link>
                      <p className="mt-1 text-xs text-slate-500 capitalize">{entry.degree_level} · {entry.language}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
