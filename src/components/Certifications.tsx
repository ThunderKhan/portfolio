import Link from "next/link";
import { Award, ArrowUpRight } from "lucide-react";
import { certifications, featuredCertifications } from "@/data/certificationsData";
import { CertificateLink } from "@/components/CertificateLink";

export function Certifications({ archive = false }: { archive?: boolean }) {
  const items = archive ? certifications : featuredCertifications;
  return (
    <div className="relative pb-2 pt-4">
      <ul className="divide-y divide-dashed divide-zinc-200 rounded-[6px] border mark-panel dark:divide-zinc-800">
        {items.map((certificate) => (
          <li key={certificate.id} className="flex items-start gap-3 px-3 py-4 sm:px-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"><Award aria-hidden="true" className="size-4 text-[#B97D10]" /></span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">{certificate.name}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-400">{certificate.issuer} · {certificate.date}</p>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{certificate.kind}{certificate.note ? ` · ${certificate.note}` : ""}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {certificate.file && <CertificateLink href={certificate.file} label="View certificate" />}
                {certificate.link && <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-md px-1 py-1.5 text-[12px] text-zinc-600 underline decoration-dotted underline-offset-4 dark:text-zinc-300">Verify credential <ArrowUpRight aria-hidden="true" className="size-3" /></a>}
                {certificate.pending && <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{certificate.pending}</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {!archive && <div className="flex justify-center pt-4"><Link href="/certifications" className="inline-flex items-center gap-1.5 rounded-[6px] border mark-surface mark-control px-4 py-2 text-[13px] font-medium transition-colors">View all certifications <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link></div>}
    </div>
  );
}
