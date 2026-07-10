import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <main id="main-content" className="bg-cream-50">
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <p className="section-kicker">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-forest-950">Page not found</h1>
        <p className="mt-4 leading-7 text-slate-600">
          That link does not exist yet, or the address was mistyped. Try one of these instead:
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          <li><Link href="/hub" className="primary-button">Open my hub</Link></li>
          <li><Link href="/explore" className="secondary-button">Explore programs</Link></li>
          <li><Link href="/roadmap" className="secondary-button">Build roadmap</Link></li>
          <li><Link href="/search" className="secondary-button">Search</Link></li>
        </ul>
      </div>
      <SiteFooter />
    </main>
  );
}
