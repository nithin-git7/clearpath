import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteFooter from "@/components/SiteFooter";
import { formatDate } from "@/lib/catalog";
import { getGuide, guides } from "@/lib/content";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    return { title: "Guide not found | ClearPath Germany" };
  }
  return { title: `${guide.title} | ClearPath Germany`, description: guide.summary };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <main id="main-content" className="bg-cream-50">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:px-10">
        <Link href="/guides" className="link-underline text-sm">Back to guides</Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            {guide.highRisk && <span className="pill">Verify carefully</span>}
            <span className="text-xs text-slate-500">{guide.readingMinutes} min read</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-forest-950 sm:text-4xl">{guide.title}</h1>
          <p className="mt-3 leading-7 text-slate-600">{guide.summary}</p>
        </header>

        <article className="mt-8 space-y-6">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-forest-950">{section.heading}</h2>
              <p className="mt-2 leading-7 text-slate-700">{section.body}</p>
            </section>
          ))}
        </article>

        <section className="mt-10 surface-card">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest-700">Official sources to verify</h2>
          <ul className="mt-3 space-y-2">
            {guide.resources.map((resource) => (
              <li key={resource.url} className="flex flex-wrap items-center gap-x-2 text-sm">
                <a href={resource.url} target="_blank" rel="noreferrer" className="link-underline">{resource.label}</a>
                <span className="text-xs text-slate-500">Verified {formatDate(resource.last_verified)}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8 rounded-lg bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
          This guide is educational and may become outdated. It is not legal or immigration advice.
          Always confirm current requirements with the official authority before acting.
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}
