import Link from "next/link";

const helpAreas = [
  ["01", "A roadmap built around you", "Turn your education, target intake, language status, budget, and goal into a clear sequence of stages."],
  ["02", "Documents and deadlines", "Separate what you need now from what comes later, then keep important dates and missing items visible."],
  ["03", "Application path clarity", "Understand whether a university mentions direct application, uni-assist, or a VPD before you act."],
  ["04", "Plain-language explanations", "Turn confusing official text into a simple meaning, questions, and concrete next actions."],
] as const;

const roadmapStages = [
  ["Plan", "Set your goal, target intake, field, and realistic preparation window."],
  ["Prepare", "Organize tests, academic documents, APS context, and application requirements."],
  ["Apply", "Track application paths, deadlines, submissions, and questions that need confirmation."],
  ["Move forward", "Prepare for visa, arrival, and the transition from study planning to a Germany job path."],
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 16 16" fill="none">
      <path d="m3.5 8.2 2.8 2.8 6.2-6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-forest-900/10 bg-cream-50">
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-55" />
        <div aria-hidden="true" className="absolute -right-48 -top-52 size-[34rem] rounded-full bg-lime-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-18 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20 lg:px-10 lg:py-28">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest-700/20 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.17em] text-forest-700">
              <span className="size-1.5 rounded-full bg-lime-500" />
              Independent planning. Official verification.
            </p>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-forest-950 sm:text-6xl lg:text-[4.6rem]">
              Apply to Germany without feeling lost.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-650 sm:text-xl">
              ClearPath Germany helps students build a step-by-step Germany study and career roadmap, understand documents, track next actions, and avoid confusion.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="primary-button" href="/roadmap">Build My Germany Roadmap <ArrowIcon /></Link>
              <Link className="secondary-button" href="/explain">Explain A Confusing Document</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-650" aria-label="Product principles">
              {["No consultancy required", "Clear next actions", "Source-conscious guidance"].map((item) => (
                <li key={item} className="flex items-center gap-2"><span className="text-forest-700"><CheckIcon /></span>{item}</li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0" aria-label="Example roadmap preview">
            <div aria-hidden="true" className="absolute -inset-5 rotate-2 rounded-[2rem] border border-forest-700/10 bg-white/35" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-forest-900/15 bg-white shadow-[0_30px_80px_rgba(11,43,38,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-700">Your roadmap</p><p className="mt-1 font-semibold text-forest-950">Pre-application planning</p></div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Stage 1</span>
              </div>
              <div className="p-6">
                <div className="flex items-end justify-between">
                  <div><p className="text-sm text-slate-500">This week</p><p className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-forest-950">3 priority actions</p></div>
                  <p className="text-sm font-semibold text-forest-700">Week 01</p>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-1/3 rounded-full bg-lime-500" /></div>
                <ol className="mt-6 space-y-3">
                  {["Confirm target intake and course direction", "List academic documents already available", "Verify application paths on university pages"].map((action, index) => (
                    <li key={action} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest-900 text-xs font-semibold text-white">{index + 1}</span>
                      <span className="text-sm font-medium leading-5 text-slate-700">{action}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex items-start gap-3 rounded-xl bg-cream-100 p-4 text-sm leading-6 text-slate-650">
                  <span aria-hidden="true" className="mt-1 size-2 shrink-0 rounded-full bg-amber-500" />
                  Requirements can change. Verify every submission detail with the relevant official source.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="clarity" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-kicker">What ClearPath helps with</p>
            <h2 className="section-title">One place to understand what comes next.</h2>
            <p className="section-copy">Built for students who need a process they can follow, not another feed of disconnected advice.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-2">
            {helpAreas.map(([number, title, body]) => (
              <article key={number} className="group bg-white p-7 transition hover:bg-cream-50 sm:p-9">
                <div className="flex items-start justify-between gap-6"><span className="font-mono text-xs font-semibold tracking-[0.14em] text-forest-700">{number}</span><span aria-hidden="true" className="mt-1 h-px w-10 bg-slate-300 transition-all group-hover:w-16 group-hover:bg-forest-700" /></div>
                <h3 className="mt-12 text-xl font-semibold tracking-[-0.025em] text-forest-950">{title}</h3>
                <p className="mt-3 max-w-lg leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-forest-900/10 bg-forest-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="section-kicker text-lime-300">Germany roadmap</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">A complete process, broken into manageable stages.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">Your profile determines where the roadmap starts. Every stage is organized around the question: what should I do next?</p>
            </div>
            <ol className="divide-y divide-white/12 border-y border-white/12">
              {roadmapStages.map(([stage, detail], index) => (
                <li key={stage} className="grid gap-4 py-7 sm:grid-cols-[4rem_10rem_1fr] sm:items-start sm:gap-5">
                  <span className="font-mono text-xs font-semibold tracking-[0.14em] text-lime-300">0{index + 1}</span><h3 className="text-lg font-semibold">{stage}</h3><p className="leading-7 text-white/65">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <article className="rounded-2xl border border-forest-900/10 bg-white p-7 sm:p-10">
            <p className="section-kicker">Documents and deadlines</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-forest-950">Know what you need now—and what can wait.</h2>
            <p className="mt-5 leading-7 text-slate-600">Separate immediate preparation from later-stage documents, highlight dates, and identify questions to confirm before submitting.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Documents needed now", "Documents needed later", "Deadline visibility", "Questions to ask"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="text-forest-700"><CheckIcon /></span>{item}</div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-forest-900/10 bg-cream-100 p-7 sm:p-10">
            <p className="section-kicker">Confusing document explainer</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-forest-950">Turn dense messages into a clear response.</h2>
            <p className="mt-5 leading-7 text-slate-600">Paste text from a university, APS, uni-assist, or another official process. Get a simple explanation, actions, risk level, and an email draft.</p>
            <Link href="/explain" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest-800 underline decoration-lime-500 decoration-2 underline-offset-6 hover:text-forest-600">Explain a document <ArrowIcon /></Link>
          </article>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="rounded-[1.75rem] border border-forest-900/10 bg-forest-50 px-7 py-12 sm:px-12 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div><p className="section-kicker">APS, uni-assist, VPD, visa clarity</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-forest-950">Understand the role of each step before you act.</h2></div>
              <div>
                <p className="text-lg leading-8 text-slate-600">ClearPath explains how these terms appear in your process while marking changing requirements that must be checked on official pages.</p>
                <div className="mt-7 flex flex-wrap gap-2.5">{["APS", "uni-assist", "VPD", "University applications", "Visa preparation"].map((topic) => <span key={topic} className="rounded-full border border-forest-700/20 bg-white px-4 py-2 text-sm font-semibold text-forest-800">{topic}</span>)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-10">
          <div><p className="section-kicker">Arrival and job path</p><h2 className="section-title">The plan does not stop at university applications.</h2><p className="section-copy">Keep later stages visible without mixing them into today’s priorities. Prepare for arrival and the transition toward a Germany career path when the time is right.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[["Arrival preparation", "Keep accommodation, insurance, travel, and local registration questions organized."], ["Germany job path", "Map language, skills, applications, and career preparation alongside the study plan."]].map(([title, body], index) => (
              <article key={title} className="min-h-64 rounded-2xl border border-slate-200 bg-cream-50 p-7"><span className="font-mono text-xs font-semibold text-forest-700">0{index + 1}</span><h3 className="mt-16 text-xl font-semibold tracking-[-0.025em] text-forest-950">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="safety" className="bg-amber-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:px-8 lg:grid-cols-[0.35fr_1.65fr] lg:items-start lg:px-10">
          <p className="section-kicker text-amber-800">Important disclaimer</p>
          <div><h2 className="text-2xl font-semibold tracking-[-0.03em] text-forest-950">Clear guidance, without false guarantees.</h2><p className="mt-4 max-w-4xl leading-7 text-slate-700">ClearPath Germany is an educational planning tool, not legal or immigration advice. It does not guarantee eligibility, admission, visa approval, or work authorization. Requirements and deadlines may change; verify critical information with the official university, German mission, APS office, or relevant authority before acting.</p></div>
        </div>
      </section>

      <section className="bg-forest-950 py-18 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-300">Start with your situation</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Your next step should not be a guess.</h2></div>
          <Link className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-lime-300 px-6 text-sm font-semibold text-forest-950 transition hover:bg-lime-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300 lg:self-auto" href="/roadmap">Build My Germany Roadmap <ArrowIcon /></Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-forest-950 py-8 text-white/55">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10"><p>© 2026 ClearPath Germany</p><p>Built for informed, independent planning.</p></div>
      </footer>
    </main>
  );
}

