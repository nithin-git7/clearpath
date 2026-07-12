"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import VerifiedNote from "@/components/VerifiedNote";
import { ApiError } from "@/lib/api";
import { getCostOfLiving, type CostOfLiving } from "@/lib/catalog";
import { OFFICIAL_FACTS } from "@/lib/official-info-data";

const euro = (amount: number) => new Intl.NumberFormat("en-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

function MoneyField({ id, label, value, onChange, hint }: { id: string; label: string; value: number; onChange: (value: number) => void; hint?: string }) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">€</span>
        <input id={id} type="number" inputMode="numeric" min={0} className="field-input pl-8" value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))} />
      </div>
      {hint && <p className="mt-1 text-xs leading-5 text-slate-500">{hint}</p>}
    </div>
  );
}

export default function FinancePage() {
  const [cities, setCities] = useState<CostOfLiving[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [months, setMonths] = useState(12);
  const [rent, setRent] = useState(650);
  const [food, setFood] = useState(260);
  const [insurance, setInsurance] = useState(145);
  const [transport, setTransport] = useState(49);
  const [communication, setCommunication] = useState(35);
  const [studyAndPersonal, setStudyAndPersonal] = useState(150);
  const [semesterFee, setSemesterFee] = useState(300);
  const [semesters, setSemesters] = useState(2);
  const [tuition, setTuition] = useState(0);
  const [applicationCosts, setApplicationCosts] = useState(350);
  const [travelAndSetup, setTravelAndSetup] = useState(1500);
  const [emergencyBuffer, setEmergencyBuffer] = useState(1500);
  const [availableFunds, setAvailableFunds] = useState(11904);

  useEffect(() => {
    let active = true;
    getCostOfLiving()
      .then((data) => {
        if (!active) return;
        setCities(data);
        if (data.length) {
          setSelectedCity(data[0].city);
          const fixed = food + insurance + transport + communication + studyAndPersonal;
          setRent(Math.max(350, data[0].monthly_estimate_eur - fixed));
        }
      })
      .catch((caught) => { if (active) setError(caught instanceof ApiError ? caught.message : "Could not load city references."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
    // Defaults are intentionally applied once after the catalog loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const match = cities.find((entry) => entry.city === city);
    if (match) {
      const fixed = food + insurance + transport + communication + studyAndPersonal;
      setRent(Math.max(350, match.monthly_estimate_eur - fixed));
    }
  };

  const selected = cities.find((entry) => entry.city === selectedCity);
  const totals = useMemo(() => {
    const monthly = rent + food + insurance + transport + communication + studyAndPersonal;
    const living = monthly * months;
    const academic = semesterFee * semesters + tuition;
    const setup = applicationCosts + travelAndSetup + emergencyBuffer;
    const total = living + academic + setup;
    const gap = availableFunds - total;
    const runway = monthly > 0 ? availableFunds / monthly : 0;
    return { monthly, living, academic, setup, total, gap, runway };
  }, [applicationCosts, availableFunds, communication, emergencyBuffer, food, insurance, months, rent, semesterFee, semesters, studyAndPersonal, transport, travelAndSetup, tuition]);

  const financeFact = OFFICIAL_FACTS.studentFinance;

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Finance readiness</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">Know the full cost—not just the blocked account.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Build an itemized plan for living, study, applications, travel, setup, and emergencies. City figures are planning references,
            while financial-proof rules must be confirmed with the authority handling your visa.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:px-10">
        <div className="space-y-6">
          {error && <div className="rounded-xl border border-amber-500/30 bg-amber-50 p-4 text-sm text-amber-900">{error} You can still enter your own amounts below.</div>}

          <section className="surface-card">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="section-kicker">1 · Monthly living</p><h2 className="mt-2 text-xl font-semibold text-forest-950">Build your real monthly baseline</h2></div>
              <div className="min-w-52">
                <label className="field-label" htmlFor="city">Reference city</label>
                <select id="city" className="field-input" value={selectedCity} onChange={(event) => handleCityChange(event.target.value)} disabled={loading || !cities.length}>
                  {cities.map((entry) => <option key={entry.city} value={entry.city}>{entry.city}</option>)}
                </select>
              </div>
            </div>
            {selected && <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">{selected.notes} The reference total is {euro(selected.monthly_estimate_eur)}/month; replace every field with your own quotes.</p>}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MoneyField id="rent" label="Rent + utilities" value={rent} onChange={setRent} />
              <MoneyField id="food" label="Food + household" value={food} onChange={setFood} />
              <MoneyField id="insurance" label="Health insurance" value={insurance} onChange={setInsurance} hint="Eligibility and contribution vary by age and status." />
              <MoneyField id="transport" label="Local transport" value={transport} onChange={setTransport} hint="Check what your semester contribution includes." />
              <MoneyField id="communication" label="Phone + internet" value={communication} onChange={setCommunication} />
              <MoneyField id="personal" label="Study + personal" value={studyAndPersonal} onChange={setStudyAndPersonal} />
              <div>
                <label className="field-label" htmlFor="months">Planning period</label>
                <select id="months" className="field-input" value={months} onChange={(event) => setMonths(Number(event.target.value))}>
                  <option value={6}>6 months</option><option value={12}>12 months</option><option value={18}>18 months</option><option value={24}>24 months</option>
                </select>
              </div>
            </div>
          </section>

          <section className="surface-card">
            <p className="section-kicker">2 · Study and setup</p>
            <h2 className="mt-2 text-xl font-semibold text-forest-950">Include costs that arrive before the first lecture</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MoneyField id="semester-fee" label="Semester contribution" value={semesterFee} onChange={setSemesterFee} />
              <div>
                <label className="field-label" htmlFor="semesters">Semesters in this plan</label>
                <input id="semesters" type="number" min={1} max={8} className="field-input" value={semesters} onChange={(event) => setSemesters(Math.min(8, Math.max(1, Number(event.target.value) || 1)))} />
              </div>
              <MoneyField id="tuition" label="Tuition for this period" value={tuition} onChange={setTuition} hint="Many public programs have no tuition, but exceptions apply." />
              <MoneyField id="applications" label="Applications + visa" value={applicationCosts} onChange={setApplicationCosts} hint="Include tests, translations, certifications, uni-assist, APS, and visa fees that apply." />
              <MoneyField id="setup" label="Travel + housing setup" value={travelAndSetup} onChange={setTravelAndSetup} hint="Travel, deposit, temporary stay, bedding, and basic setup." />
              <MoneyField id="emergency" label="Emergency buffer" value={emergencyBuffer} onChange={setEmergencyBuffer} />
            </div>
          </section>

          <section className="surface-card">
            <div className="grid gap-6 sm:grid-cols-[1fr_1fr] sm:items-end">
              <div>
                <p className="section-kicker">3 · Funding position</p>
                <h2 className="mt-2 text-xl font-semibold text-forest-950">Compare the plan with money you can actually access</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Do not count uncertain work income, an unconfirmed loan, or a scholarship you have not received.</p>
              </div>
              <MoneyField id="available" label="Confirmed available funds" value={availableFunds} onChange={setAvailableFunds} />
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <section className="overflow-hidden rounded-2xl bg-forest-950 text-white shadow-[0_20px_60px_rgba(9,44,39,0.16)]">
            <div className="border-b border-white/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-lime-300">Your planning total</p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{euro(totals.total)}</p>
              <p className="mt-2 text-sm text-white/60">For {months} months and {semesters} semester{semesters === 1 ? "" : "s"}</p>
            </div>
            <dl className="space-y-3 p-6 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-white/65">Monthly baseline</dt><dd className="font-semibold">{euro(totals.monthly)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/65">Living for period</dt><dd>{euro(totals.living)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/65">Study costs</dt><dd>{euro(totals.academic)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/65">Setup + buffer</dt><dd>{euro(totals.setup)}</dd></div>
            </dl>
            <div className={`p-6 ${totals.gap >= 0 ? "bg-lime-300 text-forest-950" : "bg-amber-100 text-amber-900"}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em]">{totals.gap >= 0 ? "Planning surplus" : "Funding gap"}</p>
              <p className="mt-1 text-2xl font-semibold">{euro(Math.abs(totals.gap))}</p>
              <p className="mt-2 text-xs leading-5">Confirmed funds cover about {totals.runway.toFixed(1)} months of your monthly baseline before study and setup costs.</p>
            </div>
          </section>

          <section className="surface-card">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">2026 financial-proof reference</h2>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-forest-950">{euro(11904)}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">A blocked account is one accepted route, not the only one. This amount is a visa proof reference—not a guarantee that it covers your real costs.</p>
            <div className="mt-4"><VerifiedNote lastVerified={financeFact.lastVerified} officialLink={financeFact.sourceUrl} label="Verify 2026 student visa funds" /></div>
          </section>

          <section className="surface-card">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Continue planning</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/explore" className="link-underline">Check tuition and semester costs</Link></li>
              <li><Link href="/guides/blocked-account" className="link-underline">Understand financial proof</Link></li>
              <li><Link href="/guides/health-insurance" className="link-underline">Review health insurance</Link></li>
            </ul>
          </section>
        </aside>
      </div>
      <SiteFooter />
    </main>
  );
}
