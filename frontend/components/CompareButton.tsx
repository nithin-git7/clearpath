"use client";

import { useCompareList } from "@/lib/storage";

interface CompareButtonProps {
  programId: string;
  className?: string;
}

export default function CompareButton({ programId, className }: CompareButtonProps) {
  const { ready, has, toggle, full } = useCompareList();
  const selected = has(programId);
  const disabled = !selected && full;

  return (
    <button
      type="button"
      onClick={() => toggle(programId)}
      disabled={!ready || disabled}
      aria-pressed={selected}
      title={disabled ? "You can compare up to 3 programs" : undefined}
      className={
        className ??
        `inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition disabled:opacity-50 ${
          selected
            ? "border border-forest-700 bg-white text-forest-800"
            : "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700"
        }`
      }
    >
      {selected ? "In compare" : "Compare"}
    </button>
  );
}
