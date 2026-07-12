import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import { formatDate } from "@/lib/catalog";
import { OFFICIAL_FACTS, SITE_INFORMATION_LAST_REVIEWED } from "@/lib/official-info-data";

const START_PATHS = [
  {
    stage: "I am still exploring",
    title: "Find realistic programs",
    body: "Search by degree, subject, language, city, intake, and tuition. Compare the facts that change a decision.",
    href: "/explore",
    action: "Explore programs",
  },
  {
    stage: "I am preparing applications",
    title: "Build my exact sequence",
    body: "Turn education, APS, language, intake, and finance status into a staged action plan.",
    href: "/roadmap",
    action: "Build my roadmap",
  },
  {
    stage: "I have an offer or official email",
    title: "Understand what it asks",
    body: "Extract the meaning, dates, amounts, risk level, next actions, and a safe reply draft.",
    href: "/explain",
    action: "Explain a message",
  },
  {
    stage: "I am preparing to move",
    title: "Plan money and arrival",
    body: "See a complete budget, financial-proof reference, and the steps that follow admission.",
    href: "/finance",
    action: "Plan my finances",
  },
] as const;

const TOOLKIT = [
  ["Program explorer", "Build a source-backed shortlist instead of collecting random browser tabs.", "/explore"],
  ["Decision comparison", "Compare up to three programs across requirements, costs, intake, and deadline.", "/compare"],
  ["Deadline intelligence", "Separate future, near, and passed cycles—and always verify your applicant category.", "/deadlines"],
  ["Application workspace", "Save programs and complete a separate checklist for every application.", "/shortlist"],
  ["Finance readiness", "Calculate monthly costs, setup costs, runway, and the funding gap.", "/finance"],
  ["Official-language decoder", "Turn dense university, APS, visa, or insurance text into concrete actions.", "/explain"],
] as const;

const CURRENT_UPDATES = [
  OFFICIAL_FACTS.studentFinance,
  OFFICIAL_FACTS.uniAssistTiming,
  OFFICIAL_FACTS.apsIndiaDmat,
] as const;

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-forest-900/10 bg-cream-50">
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-55" />
        <div aria-hidden="true" className="absolute -right-48 -top-52 size-[34rem] rounded-full bg-lime-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-18 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20 lg:px-10 lg:py-28">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest-700/20 bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.17em] text-forest-700">
              <span className="size-1.5 rounded-full bg-lime-500" />
              Independent planning · official verification
            </p>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-forest-950 sm:text-6xl lg:text-[4.6rem]">
              Germany applications are messy. Your plan should not be.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-650 sm:text-xl">
              ClearPath turns programs, APS, uni-assist, documents, deadlines, finances, visa preparation,
              and arrival into one personal control room—with the official source beside every critical fact.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="primary-button" href="/roadmap">Build my Germany roadmap <span aria-hidden="true">→</span></Link>
              <Link className="secondary-button" href="/hub">Open my control room</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-650" aria-label="Product principles">
              {[
                "Free and consultancy-independent",
                "Progress stays on this device",
                `Information reviewed ${formatDate(SITE_INFORMATION_LAST_REVIEWED)}`,
              ].map((item) => (
                <li key={item} className="flex items-center gap-2"><span className="text-forest-700" aria-hidden="true">✓</span>{item}</li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0" aria-label="Application control room preview">
            <div aria-hidden="true" className="absolute -inset-5 rotate-2 rounded-[2rem] border border-forest-700/10 bg-white/35" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-forest-900/15 bg-white shadow-[0_30px_80px_rgba(11,43,38,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-700">Application control room</p>
                  <p className="mt-1 font-semibold text-forest-950">Your next best action</p>
                </div>
                <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-semibold text-forest-900">Private</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500">Priority for this week</p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-forest-950">Confirm application routes</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">Check whether each shortlisted program is direct, uni-assist, or VPD—and record the deadline that applies to your profile.</p>
                <div className="mt-6 grid gap-3">
                  {[
                    ["Research", "3 programs saved", "Complete"],
                    ["Requirements", "APS and language", "In progress"],
                    ["Applications", "0 submitted", "Next"],
                    ["Finance", "Funding gap not set", "Needs input"],
                  ].map(([label, detail, status], index) => (
                    <div key={label} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                      <span className={`grid size-8 place-items-center rounded-full text-xs font-semibold ${index === 0 ? "bg-forest-900 text-white" : "bg-white text-forest-800"}`}>{index + 1}</span>
                      <div><p className="text-sm font-semibold text-slate-700">{label}</p><p className="text-xs text-slate-500">{detail}</p></div>
                      <span className="text-[0.68rem] font-semibold uppercase tracking-wide text-forest-700">{status}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                  ClearPath organizes the work. The university or authority remains the final source.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="section-kicker">Start from where you are</p>
            <h2 className="section-title">Do not learn the whole system before taking the next step.</h2>
            <p className="section-copy">Choose your current situation. ClearPath opens the part of the process that can help now.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-2">
            {START_PATHS.map((path, index) => (
              <article key={path.stage} className="group flex min-h-72 flex-col bg-white p-7 transition hover:bg-cream-50 sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-semibold tracking-[0.14em] text-forest-700">0{index + 1}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{path.stage}</span>
                </div>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em] text-forest-950">{path.title}</h3>
                <p className="mt-3 max-w-lg leading-7 text-slate-600">{path.body}</p>
                <Link href={path.href} className="mt-auto pt-7 text-sm font-semibold text-forest-800 underline decoration-lime-500 decoration-2 underline-offset-4">
                  {path.action} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-forest-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="section-kicker text-lime-300">One operating system</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">From “Where do I apply?” to “What do I do today?”</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">The product follows decisions and actions, not consultancy sales funnels.</p>
            </div>
            <ol className="divide-y divide-white/12 border-y border-white/12">
              {[
                ["Discover", "Find programs and record only decision-relevant facts."],
                ["Qualify", "Understand documents, language, APS, application route, and financial readiness."],
                ["Execute", "Follow a staged roadmap, save deadlines, and complete each application checklist."],
                ["Verify", "Open the exact official source before relying on any changing requirement."],
              ].map(([stage, detail], index) => (
                <li key={stage} className="grid gap-4 py-7 sm:grid-cols-[4rem_10rem_1fr] sm:items-start sm:gap-5">
                  <span className="font-mono text-xs font-semibold tracking-[0.14em] text-lime-300">0{index + 1}</span>
                  <h3 className="text-lg font-semibold">{stage}</h3>
                  <p className="leading-7 text-white/65">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="section-kicker">Your working toolkit</p>
            <h2 className="section-title">Every tool hands work to the next one.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TOOLKIT.map(([title, body, href], index) => (
              <Link key={href} href={href} className="group flex min-h-64 flex-col rounded-2xl border border-forest-900/10 bg-white p-7 transition hover:-translate-y-1 hover:border-forest-700/35 hover:shadow-[0_18px_50px_rgba(11,43,38,0.1)]">
                <span className="font-mono text-xs font-semibold text-forest-700">0{index + 1}</span>
                <h3 className="mt-10 text-xl font-semibold tracking-[-0.025em] text-forest-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
                <span className="mt-auto pt-6 text-sm font-semibold text-forest-700">Open tool <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <p className="section-kicker">Current information, scoped carefully</p>
              <h2 className="section-title">Changing facts are dated, sourced, and never treated as universal.</h2>
              <p className="section-copy">These are orientation facts. Your applicant category and responsible authority decide what applies.</p>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {CURRENT_UPDATES.map((fact) => (
                <article key={fact.id} className="py-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-forest-950">{fact.title}</h3>
                    <span className="pill">Checked {formatDate(fact.lastVerified)}</span>
                  </div>
                  <p className="mt-3 leading-7 text-slate-600">{fact.summary}</p>
                  <p className="mt-3 text-sm leading-6 text-amber-800">{fact.caution}</p>
                  <a href={fact.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block link-underline text-sm">{fact.sourceLabel} ↗</a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:px-8 lg:grid-cols-[0.35fr_1.65fr] lg:items-start lg:px-10">
          <p className="section-kicker text-amber-800">The trust contract</p>
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-forest-950">Useful guidance without false certainty.</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-700">ClearPath Germany is an educational planning tool, not a law firm, immigration adviser, university, or German authority. It does not guarantee eligibility, admission, a visa, or work authorisation. Device-saved progress remains local; remove personal identifiers before using the document explainer.</p>
          </div>
        </div>
      </section>

      <section className="bg-lime-300 py-16 text-forest-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em]">Start with your real situation</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Your next step should not be a guess.</h2>
          </div>
          <Link className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-forest-950 px-6 text-sm font-semibold text-white transition hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-950 lg:self-auto" href="/roadmap">
            Build my roadmap <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
