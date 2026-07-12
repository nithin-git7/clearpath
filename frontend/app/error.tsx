"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="grid min-h-[70vh] place-items-center bg-cream-50 px-5 py-16">
      <div className="surface-card max-w-xl text-center">
        <p className="section-kicker">Temporary problem</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-forest-950">This page could not finish loading.</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Your device-saved shortlist and progress have not been deleted. Try the page again or return to your control room.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="primary-button">Try again</button>
          <Link href="/hub" className="secondary-button">Open control room</Link>
        </div>
      </div>
    </main>
  );
}
