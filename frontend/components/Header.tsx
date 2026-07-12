import Link from "next/link";

import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";

function BrandMark() {
  return (
    <span aria-hidden="true" className="relative grid size-9 place-items-center rounded-full bg-forest-900 text-white">
      <span className="absolute h-4 w-1 rotate-45 rounded-full bg-lime-300" />
      <span className="absolute size-2.5 -translate-x-1.5 translate-y-1.5 rounded-full border-2 border-white" />
    </span>
  );
}

export default function Header() {
  return (
    <header className="relative sticky top-0 z-50 border-b border-forest-900/10 bg-cream-50/92 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-700"
          aria-label="ClearPath Germany home"
        >
          <BrandMark />
          <span className="text-[0.94rem] font-semibold tracking-[-0.02em] text-forest-950 sm:text-base">
            ClearPath <span className="text-forest-700">Germany</span>
          </span>
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <MobileNav />
          <Link
            href="/hub"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-forest-900 px-4 text-sm font-semibold text-white transition hover:bg-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700 sm:px-5"
          >
            <span className="sm:hidden">My plan</span>
            <span className="hidden sm:inline">My control room</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
