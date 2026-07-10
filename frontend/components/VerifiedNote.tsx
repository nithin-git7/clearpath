import { formatDate } from "@/lib/catalog";

interface VerifiedNoteProps {
  lastVerified: string;
  officialLink: string;
  label?: string;
}

export default function VerifiedNote({
  lastVerified,
  officialLink,
  label = "Confirm on the official page",
}: VerifiedNoteProps) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-500" />
      Verified on {formatDate(lastVerified)}.
      <a
        href={officialLink}
        target="_blank"
        rel="noreferrer"
        className="font-semibold underline decoration-amber-500 underline-offset-2 hover:text-amber-900"
      >
        {label}
      </a>
    </p>
  );
}
