import Link from "next/link";

import { formatDate } from "@/lib/catalog";
import { SITE_INFORMATION_LAST_REVIEWED, TRUSTED_OFFICIAL_RESOURCES } from "@/lib/official-info-data";

const PRODUCT_LINKS = [
  ["Control room", "/hub"],
  ["Explore programs", "/explore"],
  ["Build a roadmap", "/roadmap"],
  ["Track deadlines", "/deadlines"],
  ["Plan finances", "/finance"],
  ["Explain a document", "/explain"],
] as const;

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-forest-950 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-10">
        <div>
          <p className="text-base font-semibold text-white">ClearPath Germany</p>
          <p className="mt-3 max-w-sm text-sm leading-6">
            A private-by-default planning workspace for international students. Know your next step,
            why it matters, and where to verify it.
          </p>
          <p className="mt-4 text-xs text-white/50">Information reviewed {formatDate(SITE_INFORMATION_LAST_REVIEWED)}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-lime-300">Plan</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {PRODUCT_LINKS.map(([label, href]) => (
              <li key={href}><Link className="hover:text-white" href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-lime-300">Verify officially</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {TRUSTED_OFFICIAL_RESOURCES.map((resource) => (
              <li key={resource.href}>
                <a className="hover:text-white" href={resource.href} target="_blank" rel="noreferrer">{resource.label} ↗</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/50 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© 2026 ClearPath Germany. Progress stays on this device unless a tool submits text for analysis.</p>
          <p>Educational planning only. No admission, visa, or work-authorisation guarantees.</p>
        </div>
      </div>
    </footer>
  );
}
