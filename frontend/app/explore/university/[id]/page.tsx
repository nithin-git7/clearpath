"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ShortlistButton from "@/components/ShortlistButton";
import SiteFooter from "@/components/SiteFooter";
import VerifiedNote from "@/components/VerifiedNote";
import { ApiError } from "@/lib/api";
import {
  formatEuro,
  getPrograms,
  getUniversity,
  type Program,
  type University,
} from "@/lib/catalog";

export default function UniversityDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [university, setUniversity] = useState<University | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const found = await getUniversity(id);
        if (!active) return;
        setUniversity(found);
        const universityPrograms = await getPrograms({ university_id: found.id });
        if (!active) return;
        setPrograms(universityPrograms);
      } catch (caught) {
        if (!active) return;
        if (caught instanceof ApiError && caught.status === 404) {
          setError("We could not find that university.");
        } else if (caught instanceof ApiError) {
          setError(caught.message);
        } else {
          setError("Something went wrong while loading this university.");
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
        <Link href="/explore?view=universities" className="link-underline text-sm">Back to explore</Link>

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

        {university && !loading && (
          <>
            <header className="mt-6">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-forest-950 sm:text-4xl">{university.name}</h1>
              <p className="mt-2 text-slate-600">{university.city}, {university.state}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="pill capitalize">{university.type}</span>
                <span className="pill">Application: {university.application_route}</span>
                <span className="pill">VPD {university.vpd_required ? "required" : "not required"}</span>
                <span className="pill">Semester fee {formatEuro(university.semester_fee_eur)}</span>
                {university.languages.map((language) => (
                  <span key={language} className="pill">{language}</span>
                ))}
              </div>
              {university.source_note && (
                <p className="mt-5 max-w-3xl border-l-2 border-lime-500 pl-4 text-sm leading-6 text-slate-600">{university.source_note}</p>
              )}
              <div className="mt-5">
                <VerifiedNote lastVerified={university.last_verified} officialLink={university.official_link} label="Open the official application page" />
              </div>
            </header>

            <section className="mt-10">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-forest-950">
                Programs ({programs.length})
              </h2>
              {programs.length === 0 ? (
                <p className="mt-3 text-sm text-slate-600">No curated programs listed yet for this university.</p>
              ) : (
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {programs.map((program) => (
                    <li key={program.id} className="surface-card">
                      <div className="flex items-start justify-between gap-3">
                        <Link href={`/explore/program/${program.id}`} className="font-semibold text-forest-950 hover:text-forest-700">{program.title}</Link>
                        <span className="pill capitalize">{program.degree_level}</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">{program.field} · {program.language} · {formatEuro(program.tuition_eur)}</p>
                      <div className="mt-4">
                        <ShortlistButton programId={program.id} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
