"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/deadlines", label: "Deadlines" },
  { href: "/finance", label: "Finance" },
  { href: "/guides", label: "Guides" },
  { href: "/search", label: "Search" },
] as const;

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm font-medium text-slate-700 lg:flex">
      {LINKS.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            className={`nav-link ${active ? "text-forest-700" : ""}`}
            href={link.href}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
