import { ArrowUpRight, FileText } from "lucide-react";

export function CertificateLink({ href, label = "View certificate" }: { href: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-1.5 rounded-[6px] border mark-surface mark-control px-2.5 py-1.5 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2">
      <FileText aria-hidden="true" className="size-3.5 shrink-0" />{label}<ArrowUpRight aria-hidden="true" className="size-3 shrink-0" /><span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
