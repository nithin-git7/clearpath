"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

import CompareButton from "@/components/CompareButton";
import ShortlistButton from "@/components/ShortlistButton";
import SiteFooter from "@/components/SiteFooter";
import { ApiError } from "@/lib/api";
import {
  formatDate,
  formatEuro,
  getPrograms,
  getUniversities,
  type Program,
  type University,
} from "@/lib/catalog";

type View = "programs" | "universities";

const DEGREE_OPTIONS = ["", "bachelor", "master"];
const LANGUAGE_OPTIONS = ["", "English", "German"];
const INTAKE_OPTIONS = ["", "winter", "summer"];

function ExploreContent() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<View>(
    searchParams.get("view") === "universities" ? "universities" : "programs",
  );
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [degree, setDegree] = useState(searchParams.get("degree") ?? "");
  const [language, setLanguage] = useState(searchParams.get("language") ?? "");
  const [field, setField] = useState(searchParams.get("field") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [intake, setIntake] = useState(searchParams.get("intake") ?? "");
  const [freeOnly, setFreeOnly] = useState(searchParams.get("free") === "1");

  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (view !== "programs") params.set("view", view);
    if (search) params.set("search", search);
    if (degree) params.set("degree", degree);
    if (language) params.set("language", language);
    if (field) params.set("field", field);
    if (city) params.set("city", city);
    if (intake) params.set("intake", intake);
    if (freeOnly) params.set("free", "1");
    const query = params.toString();
    window.history.replaceState(null, "", query ? `/explore?${query}` : "/explore");
  }, [view, search, degree, language, field, city, intake, freeOnly]);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        if (view === "programs") {
          const [data, universityData] = await Promise.all([
            getPrograms({
              search: search || undefined,
              degree_level: degree || undefined,
              language: language || undefined,
              field: field || undefined,
              city: city || undefined,
              intake: intake || undefined,
              max_tuition_eur: freeOnly ? 0 : undefined,
            }),
            getUniversities(),
          ]);
          if (active) {
            setPrograms(data);
            setUniversities(universityData);
          }
        } else {
          const data = await getUniversities({
            search: search || undefined,
            city: city || undefined,
            language: language || undefined,
          });
          if (active) setUniversities(data);
        }
      } catch (caught) {
        if (active) {
          setError(
            caught instanceof ApiError
              ? caught.message
              : "Something went wrong while loading results.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    const timer = setTimeout(run, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [view, search, degree, language, field, city, intake, freeOnly]);

  const resultCount = view === "programs" ? programs.length : universities.length;
  const universitiesById = useMemo(
    () => new Map(universities.map((university) => [university.id, university])),
    [universities],
  );

  const activeFilters = useMemo(
    () => [search, degree, language, field, city, intake, freeOnly ? "free" : ""].filter(Boolean).length,
    [search, degree, language, field, city, intake, freeOnly],
  );

  const clearFilters = () => {
    setSearch("");
    setDegree("");
    setLanguage("");
    setField("");
    setCity("");
    setIntake("");
    setFreeOnly(false);
  };

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Explore</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Universities and courses in one place.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Search a curated catalog of German universities and study programs. Every entry links to
            an official page with a verification date.
          </p>

          <div className="mt-6 inline-flex rounded-full border border-forest-900/15 bg-cream-50 p-1">
            {(["programs", "universities"] as View[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setView(option)}
                className={`min-h-9 rounded-full px-5 text-sm font-semibold capitalize transition ${
                  view === option ? "bg-forest-900 text-white" : "text-forest-800 hover:text-forest-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[18rem_1fr] lg:px-10">
        <aside className="surface-card h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-forest-950">Filters</h2>
            {activeFilters > 0 && (
              <button type="button" onClick={clearFilters} className="text-xs font-semibold text-forest-700 underline">
                Clear ({activeFilters})
              </button>
            )}
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="field-label" htmlFor="search">Search</label>
              <input
                id="search"
                className="field-input"
                placeholder={view === "programs" ? "Title, field, or university" : "University name"}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            {view === "programs" && (
              <>
                <div>
                  <label className="field-label" htmlFor="degree">Degree</label>
                  <select id="degree" className="field-input" value={degree} onChange={(e) => setDegree(e.target.value)}>
                    {DEGREE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option ? option[0].toUpperCase() + option.slice(1) : "Any"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="field">Field</label>
                  <input id="field" className="field-input" placeholder="e.g. Computer Science" value={field} onChange={(e) => setField(e.target.value)} />
                </div>
                <div>
                  <label className="field-label" htmlFor="intake">Intake</label>
                  <select id="intake" className="field-input" value={intake} onChange={(e) => setIntake(e.target.value)}>
                    {INTAKE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option ? option[0].toUpperCase() + option.slice(1) : "Any"}</option>
                    ))}
                  </select>
                </div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
                  No tuition fee only
                </label>
              </>
            )}

            <div>
              <label className="field-label" htmlFor="language">Language</label>
              <select id="language" className="field-input" value={language} onChange={(e) => setLanguage(e.target.value)}>
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option || "Any"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="city">City</label>
              <input id="city" className="field-input" placeholder="e.g. Munich" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
        </aside>

        <section aria-live="polite">
          <p className="mb-4 text-sm font-medium text-slate-600">
            {loading ? "Loading results..." : `${resultCount} ${view === "programs" ? "programs" : "universities"} found`}
          </p>

          {error && (
            <div className="surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800">
              {error}
            </div>
          )}

          {!error && loading && (
            <div className="grid gap-4">
              {[0, 1, 2].map((key) => (
                <div key={key} className="surface-card animate-pulse">
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-1/3 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {!error && !loading && resultCount === 0 && (
            <div className="surface-card text-center">
              <p className="font-semibold text-forest-950">No matches yet.</p>
              <p className="mt-2 text-sm text-slate-600">Try removing a filter or broadening your search.</p>
              {activeFilters > 0 && (
                <button type="button" onClick={clearFilters} className="mt-4 secondary-button">Clear filters</button>
              )}
            </div>
          )}

          {!error && !loading && view === "programs" && programs.length > 0 && (
            <ul className="grid gap-4">
              {programs.map((program) => {
                const university = universitiesById.get(program.university_id);
                const nextDeadline = program.deadlines
                  .filter((entry) => new Date(entry.deadline).getTime() >= Date.now())
                  .sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
                return (
                <li key={program.id} className="surface-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link href={`/explore/program/${program.id}`} className="text-lg font-semibold tracking-[-0.02em] text-forest-950 hover:text-forest-700">
                        {program.title}
                      </Link>
                      <p className="mt-1 text-sm text-slate-600">
                        {university ? `${university.name} - ${university.city}` : program.field}
                      </p>
                    </div>
                    <span className="pill capitalize">{program.degree_level}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="pill">{program.language}</span>
                    <span className="pill">{formatEuro(program.tuition_eur)}</span>
                    <span className="pill">{program.duration_semesters} semesters</span>
                    {program.intakes.map((entry) => (
                      <span key={entry} className="pill capitalize">{entry} intake</span>
                    ))}
                  </div>
                  {nextDeadline && (
                    <p className="mt-4 text-sm text-slate-700">
                      Next deadline: <strong>{formatDate(nextDeadline.deadline)}</strong> for the {nextDeadline.intake} intake
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link href={`/explore/program/${program.id}`} className="link-underline text-sm">View details</Link>
                    <ShortlistButton programId={program.id} />
                    <CompareButton programId={program.id} />
                  </div>
                </li>
                );
              })}
            </ul>
          )}

          {!error && !loading && view === "universities" && universities.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2">
              {universities.map((university) => (
                <li key={university.id} className="surface-card">
                  <Link href={`/explore/university/${university.id}`} className="text-lg font-semibold tracking-[-0.02em] text-forest-950 hover:text-forest-700">
                    {university.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">{university.city}, {university.state}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="pill capitalize">{university.type}</span>
                    <span className="pill">{university.application_route}</span>
                    <span className="pill">Semester fee {formatEuro(university.semester_fee_eur)}</span>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">Verified {formatDate(university.last_verified)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-16 text-slate-600">Loading explorer...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
