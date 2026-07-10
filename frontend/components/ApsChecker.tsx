"use client";

import { useState } from "react";

import { lookupApsCountry, type ApsCountry } from "@/lib/aps";
import type { ApsStatus } from "@/lib/roadmap";

interface ApsCheckerProps {
  currentStatus: ApsStatus;
  onStatusChange: (status: ApsStatus) => void;
}

export default function ApsChecker({ currentStatus, onStatusChange }: ApsCheckerProps) {
  const [country, setCountry] = useState("");
  const [match, setMatch] = useState<ApsCountry | null>(null);
  const [checked, setChecked] = useState(false);

  const check = () => {
    const found = lookupApsCountry(country);
    setMatch(found);
    setChecked(true);
    if (found) {
      onStatusChange("required");
    }
  };

  return (
    <section className="surface-card">
      <h2 className="text-lg font-semibold text-forest-950">APS country checker</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Applicants with academic credentials from some countries may need APS verification. Check
        where your relevant qualification was issued; this updates the APS field in your roadmap.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="aps-country">Country where your qualification was issued</label>
        <input
          id="aps-country"
          className="field-input min-w-[12rem] flex-1"
          placeholder="e.g. India, China, Vietnam"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setChecked(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), check())}
        />
        <button type="button" onClick={check} className="secondary-button">Check APS</button>
      </div>

      {match?.name === "India" && (
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          <p className="font-semibold">India updates for 2026/27 intakes</p>
          <p className="mt-1">
            APS has published updated undergraduate eligibility criteria from winter 2026/27 and a
            dMAT requirement for selected master&apos;s applicants in specified fields from summer 2027.
            These rules are applicant-specific.
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <a href="https://aps-india.de/news/" target="_blank" rel="noreferrer" className="link-underline">
              Undergraduate notice
            </a>
            <a href="https://aps-india.de/dmat/" target="_blank" rel="noreferrer" className="link-underline">
              dMAT scope
            </a>
          </div>
        </div>
      )}

      {match && (
        <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">APS likely required for {match.name}.</p>
          <p className="mt-1">
            Start early — it can take months.{" "}
            <a href={match.portal} target="_blank" rel="noreferrer" className="link-underline">
              Open the official APS portal
            </a>
          </p>
        </div>
      )}

      {checked && !match && country.trim().length > 1 && (
        <p className="mt-3 text-sm text-slate-600">
          No APS match in our curated list for “{country.trim()}”. Set APS status manually below
          (currently: <strong>{currentStatus.replaceAll("_", " ")}</strong>).
        </p>
      )}
    </section>
  );
}
