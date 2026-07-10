"use client";

import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import UpcomingDeadlines from "@/components/UpcomingDeadlines";
import { useJourneyProgress, useShortlist } from "@/lib/storage";

const JOURNEY_STEPS = [
  { id: "roadmap", label: "Build your personalized roadmap", href: "/roadmap" },
  { id: "explore", label: "Explore universities and programs", href: "/explore" },
  { id: "shortlist", label: "Shortlist programs you like", href: "/shortlist" },
  { id: "compare", label: "Compare your top programs", href: "/compare" },
  { id: "deadlines", label: "Note the deadlines that apply to you", href: "/deadlines" },
  { id: "finance", label: "Plan your budget and finances", href: "/finance" },
  { id: "guides", label: "Read the visa, APS, and insurance guides", href: "/guides" },
  { id: "explain", label: "Explain a confusing document", href: "/explain" },
];

const HUB_CARDS = [
  { title: "Roadmap", body: "Answer a few questions and get your stage and next 10 actions.", href: "/roadmap", status: "ready" as const },
  { title: "Explore", body: "Search curated universities and courses with filters.", href: "/explore", status: "ready" as const },
  { title: "Compare", body: "Compare up to 3 programs side by side.", href: "/compare", status: "ready" as const },
  { title: "My shortlist", body: "Track saved programs and per-application checklists.", href: "/shortlist", status: "ready" as const },
  { title: "Deadlines", body: "See and save application deadlines by intake.", href: "/deadlines", status: "ready" as const },
  { title: "Finance", body: "Estimate living costs and the blocked account.", href: "/finance", status: "ready" as const },
  { title: "Document explainer", body: "Turn confusing official text into clear actions.", href: "/explain", status: "ready" as const },
  { title: "Guides", body: "Visa, APS, uni-assist, insurance, and more.", href: "/guides", status: "ready" as const },
  { title: "Search", body: "Search across everything in one place.", href: "/search", status: "ready" as const },
];

export default function HubPage() {
  const { steps, ready, toggle, completedCount } = useJourneyProgress();
  const { items } = useShortlist();
  const total = JOURNEY_STEPS.length;
  const percent = ready ? Math.round((completedCount / total) * 100) : 0;

  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-forest-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          <p className="section-kicker text-lime-300">Your hub</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Everything for your Germany plan, in one place.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/70">
            Move through each step at your own pace. Your progress and shortlist are saved on this
            device.
          </p>

          <div className="mt-8 max-w-md rounded-2xl bg-white/10 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Journey progress</span>
              <span className="text-white/70">{ready ? `${completedCount}/${total}` : "..."}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-lime-400 transition-all" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-sm text-white/70">{items.length} programs shortlisted</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_20rem] lg:px-10">
        <section>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-forest-950">Where do you want to go?</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {HUB_CARDS.map((card) => (
              <li key={card.title}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-forest-900/10 bg-white p-6 transition hover:border-forest-700/40 hover:shadow-[0_18px_50px_rgba(11,43,38,0.1)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-forest-950">{card.title}</h3>
                    </div>
                    <p className="mt-2 leading-6 text-slate-600">{card.body}</p>
                  </div>
                  <span className="mt-5 text-sm font-semibold text-forest-700 group-hover:text-forest-600">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <div className="surface-card">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Step-by-step</h2>
            <ul className="mt-4 space-y-3">
              {JOURNEY_STEPS.map((step) => (
                <li key={step.id} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={Boolean(steps[step.id])}
                    onChange={() => toggle(step.id)}
                    disabled={!ready}
                    aria-label={`Mark "${step.label}" complete`}
                  />
                  <Link href={step.href} className={`text-sm ${steps[step.id] ? "text-slate-400 line-through" : "text-slate-700 hover:text-forest-700"}`}>
                    {step.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
              This is educational planning, not immigration advice. Verify every requirement with the
              official source.
            </p>
          </div>
          <UpcomingDeadlines />
        </aside>
      </div>
      <SiteFooter />
    </main>
  );
}
