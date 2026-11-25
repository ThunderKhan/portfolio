import { certifications } from "@/data/certificationsData";

export function Certifications() {
  return (
    <div className="relative pb-2 pt-6">
      <ul className="divide-y divide-dashed divide-zinc-200 rounded-[6px] border border-black/10 bg-zinc-50 dark:divide-zinc-800 dark:border-white/10 dark:bg-[#09090b]">
        {certifications.map((certificate) => (
          <li key={certificate.name} className="px-4 py-3.5">
            <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">{certificate.name}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {certificate.date ? `${certificate.date} · ` : ""}{certificate.issuer}
              {certificate.note ? ` · ${certificate.note}` : ""}
              {certificate.link && <> · <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2">Verify</a></>}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
