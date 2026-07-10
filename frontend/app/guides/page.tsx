import type { Metadata } from "next";
import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import { faqs, glossary, guides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guides, FAQ, and glossary | ClearPath Germany",
  description:
    "Plain-language guides on the German student visa, APS, uni-assist, finances, insurance, and more.",
};

export default function GuidesPage() {
  return (
    <main id="main-content" className="bg-cream-50">
      <section className="border-b border-forest-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="section-kicker">Guides</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-forest-950 sm:text-5xl">
            Understand every step, in plain language.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Short, source-conscious guides on the topics students ask about most. High-risk topics
            always link to an official source with a verification date.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}`} className="group flex h-full flex-col rounded-2xl border border-forest-900/10 bg-white p-6 transition hover:border-forest-700/40 hover:shadow-[0_18px_50px_rgba(11,43,38,0.1)]">
                <div className="flex items-center justify-between">
                  {guide.highRisk && <span className="pill">Verify carefully</span>}
                  <span className="ml-auto text-xs text-slate-500">{guide.readingMinutes} min</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-forest-950">{guide.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{guide.summary}</p>
                <span className="mt-4 text-sm font-semibold text-forest-700 group-hover:text-forest-600">Read guide →</span>
              </Link>
            </li>
          ))}
        </ul>

        <section id="faq" className="mt-16">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-forest-950">Frequently asked questions</h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqs.map((item) => (
              <details key={item.question} className="group px-6 py-4">
                <summary className="cursor-pointer list-none font-semibold text-forest-950">
                  {item.question}
                </summary>
                <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="glossary" className="mt-16">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-forest-950">Glossary</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {glossary.map((entry) => (
              <div key={entry.term} className="surface-card">
                <dt className="font-semibold text-forest-950">{entry.term}</dt>
                <dd className="mt-1 text-sm leading-6 text-slate-600">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
