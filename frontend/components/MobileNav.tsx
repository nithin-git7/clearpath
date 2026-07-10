"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/hub", label: "Hub" },
  { href: "/explore", label: "Explore" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/explain", label: "Explain" },
  { href: "/deadlines", label: "Deadlines" },
  { href: "/finance", label: "Finance" },
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/search", label: "Search" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-10 items-center rounded-full border border-forest-700/25 px-3 text-sm font-semibold text-forest-800"
      >
        Menu
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full border-b border-forest-900/10 bg-cream-50 px-5 py-4 shadow-lg"
        >
          <ul className="grid gap-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === link.href || pathname.startsWith(`${link.href}/`)
                      ? "bg-forest-900 text-white"
                      : "text-slate-700 hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
