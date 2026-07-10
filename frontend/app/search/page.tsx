"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import { ApiError } from "@/lib/api";
import { getPrograms, getUniversities, type Program, type University } from "@/lib/catalog";
import { glossary, guides } from "@/lib/content";

interface SearchResults {
  programs: Program[];
  universities: University[];
  guides: typeof guides;
  glossary: typeof glossary;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([getPrograms(), getUniversities()])
      .then(([programData, universityData]) => {
        if (!active) return;
        setPrograms(programData);
        setUniversities(universityData);
      })
      .catch((caught) => {
        if (active) setError(caught instanceof ApiError ? caught.message : "Could not load search data.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    const q = params.toString();
    window.history.replaceState(null, "", q ? `/search?${q}` : "/search");
  }, [query]);

  const results: SearchResults = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return { programs: [], universities: [], guides: [], glossary: [] };
    }
    return {
      programs: programs.filter(
        (p) => p.title.toLowerCase().includes(needle) || p.field.toLowerCase().includes(needle),
      ),
      universities: universities.filter(
        (u) => u.name.toLowerCase().includes(needle) || u.city.toLowerCase().includes(needle),
      ),
      guides: guides.filter(
        (g) => g.title.toLowerCase().includes(needle) || g.summary.toLowerCase().includes(needle),
      ),
      glossary: glossary.filter(
        (g) => g.term.toLowerCase().includes(needle) || g.definition.toLowerCase().includes(needle),
      ),
    };
  }, [query, programs, universities]);

  const totalResults =
    results.programs.length + results.universities.length + results.guides.length + results.glossary.length;
  const hasQuery = query.trim().length > 0;

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Search</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Search everything in one place.
          </h1>
          <input
            autoFocus
            className="field-input mt-6 text-base"
            placeholder="Search programs, universities, guides, and terms"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {hasQuery && !loading && (
            <p className="mt-3 text-sm text-slate-600">{totalResults} results for “{query}”</p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-10">
        {error && <div className="surface-card border-amber-500/40 bg-amber-50 text-sm text-amber-800">{error}</div>}

        {!error && !hasQuery && (
          <p className="text-slate-600">Start typing to search across the whole site.</p>
        )}

        {!error && hasQuery && !loading && totalResults === 0 && (
          <div className="surface-card text-center">
            <p className="font-semibold text-forest-950">No results found.</p>
            <p className="mt-2 text-sm text-slate-600">Try a different keyword, like a field, city, or term.</p>
          </div>
        )}

        {!error && hasQuery && totalResults > 0 && (
          <div className="space-y-8">
            {results.programs.length > 0 && (
              <SearchGroup title="Programs">
                {results.programs.map((program) => (
                  <Link key={program.id} href={`/explore/program/${program.id}`} className="block surface-card hover:border-forest-700/40">
                    <p className="font-semibold text-forest-950">{program.title}</p>
                    <p className="mt-1 text-sm text-slate-600 capitalize">{program.field} · {program.degree_level}</p>
                  </Link>
                ))}
              </SearchGroup>
            )}
            {results.universities.length > 0 && (
              <SearchGroup title="Universities">
                {results.universities.map((university) => (
                  <Link key={university.id} href={`/explore/university/${university.id}`} className="block surface-card hover:border-forest-700/40">
                    <p className="font-semibold text-forest-950">{university.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{university.city}, {university.state}</p>
                  </Link>
                ))}
              </SearchGroup>
            )}
            {results.guides.length > 0 && (
              <SearchGroup title="Guides">
                {results.guides.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block surface-card hover:border-forest-700/40">
                    <p className="font-semibold text-forest-950">{guide.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{guide.summary}</p>
                  </Link>
                ))}
              </SearchGroup>
            )}
            {results.glossary.length > 0 && (
              <SearchGroup title="Glossary">
                {results.glossary.map((entry) => (
                  <div key={entry.term} className="surface-card">
                    <p className="font-semibold text-forest-950">{entry.term}</p>
                    <p className="mt-1 text-sm text-slate-600">{entry.definition}</p>
                  </div>
                ))}
              </SearchGroup>
            )}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}

function SearchGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-5 py-16 text-slate-600">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
