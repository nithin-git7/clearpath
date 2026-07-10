"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import VerifiedNote from "@/components/VerifiedNote";
import { ApiError } from "@/lib/api";
import { formatEuro, getCostOfLiving, type CostOfLiving } from "@/lib/catalog";

const BLOCKED_ACCOUNT_REFERENCE = {
  amountEur: 11904,
  lastVerified: "2026-07-04",
  officialLink: "https://www.auswaertiges-amt.de/en/visa-service",
};

export default function FinancePage() {
  const [cities, setCities] = useState<CostOfLiving[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCity, setSelectedCity] = useState("");
  const [monthly, setMonthly] = useState(1000);
  const [months, setMonths] = useState(12);
  const [semesterFee, setSemesterFee] = useState(300);
  const [semesters, setSemesters] = useState(2);

  useEffect(() => {
    let active = true;
    getCostOfLiving()
      .then((data) => {
        if (!active) return;
        setCities(data);
        if (data.length > 0) {
          setSelectedCity(data[0].city);
          setMonthly(data[0].monthly_estimate_eur);
        }
      })
      .catch((caught) => {
        if (active) setError(caught instanceof ApiError ? caught.message : "Could not load cost data.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const match = cities.find((entry) => entry.city === city);
    if (match) setMonthly(match.monthly_estimate_eur);
  };

  const total = useMemo(
    () => monthly * months + semesterFee * semesters,
    [monthly, months, semesterFee, semesters],
  );

  const selected = cities.find((entry) => entry.city === selectedCity);

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Finance</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Plan the cost of studying in Germany.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Estimate your living budget and understand the blocked account requirement. All figures are
            curated references, not official quotes. Confirm current amounts before you rely on them.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:px-10">
        <section className="surface-card">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-forest-950">Budget calculator</h2>

          {error && <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">{error}</p>}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="city">City</label>
              <select
                id="city"
                className="field-input"
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                disabled={loading || cities.length === 0}
              >
                {cities.map((entry) => (
                  <option key={entry.city} value={entry.city}>{entry.city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="monthly">Monthly living cost (EUR)</label>
              <input id="monthly" type="number" min={0} className="field-input" value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} />
            </div>
            <div>
              <label className="field-label" htmlFor="months">Months</label>
              <input id="months" type="number" min={1} className="field-input" value={months} onChange={(e) => setMonths(Number(e.target.value) || 0)} />
            </div>
            <div>
              <label className="field-label" htmlFor="fee">Semester fee (EUR)</label>
              <input id="fee" type="number" min={0} className="field-input" value={semesterFee} onChange={(e) => setSemesterFee(Number(e.target.value) || 0)} />
            </div>
            <div>
              <label className="field-label" htmlFor="semesters">Semesters</label>
              <input id="semesters" type="number" min={1} className="field-input" value={semesters} onChange={(e) => setSemesters(Number(e.target.value) || 0)} />
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-forest-950 p-6 text-white">
            <p className="text-sm text-white/70">Estimated total for this period</p>
            <p className="mt-1 text-3xl font-semibold tracking-[-0.03em]">{formatEuro(total)}</p>
            <p className="mt-2 text-sm text-white/60">
              {formatEuro(monthly)} x {months} months + {formatEuro(semesterFee)} x {semesters} semesters
            </p>
          </div>

          {selected && (
            <p className="mt-3 text-xs text-slate-500">
              {selected.notes} Verified reference for {selected.city}.
            </p>
          )}
        </section>

        <aside className="space-y-6">
          <section className="surface-card">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Blocked account reference</h2>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-forest-950">
              {formatEuro(BLOCKED_ACCOUNT_REFERENCE.amountEur)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A common reference amount used to prove living costs for a student visa. The official
              minimum is set by the authorities and changes over time.
            </p>
            <div className="mt-4">
              <VerifiedNote
                lastVerified={BLOCKED_ACCOUNT_REFERENCE.lastVerified}
                officialLink={BLOCKED_ACCOUNT_REFERENCE.officialLink}
                label="Confirm the current amount"
              />
            </div>
          </section>

          <section className="surface-card">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Learn more</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/guides/blocked-account" className="link-underline">Blocked account and finances</Link></li>
              <li><Link href="/guides/health-insurance" className="link-underline">Health insurance basics</Link></li>
              <li><Link href="/guides/working-while-studying" className="link-underline">Working while studying</Link></li>
            </ul>
          </section>
        </aside>
      </div>
      <SiteFooter />
    </main>
  );
}
