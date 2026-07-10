"use client";

import { useShortlist } from "@/lib/storage";

interface ShortlistButtonProps {
  programId: string;
  className?: string;
}

export default function ShortlistButton({ programId, className }: ShortlistButtonProps) {
  const { ready, has, toggle } = useShortlist();
  const saved = has(programId);

  return (
    <button
      type="button"
      onClick={() => toggle(programId)}
      disabled={!ready}
      aria-pressed={saved}
      className={
        className ??
        `inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition disabled:opacity-50 ${
          saved
            ? "bg-forest-900 text-white hover:bg-forest-700"
            : "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700"
        }`
      }
    >
      {saved ? "Saved to shortlist" : "Add to shortlist"}
    </button>
  );
}
