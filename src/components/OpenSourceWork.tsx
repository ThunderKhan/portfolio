import { GitPullRequest, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { openSourceWork } from "@/data/openSourceData";

export function OpenSourceWork() {
  return (
    <>
      <h2 className="border-y border-dashed border-zinc-300 py-2 text-[18px] font-bold tracking-tight text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">Open source &amp; community</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">Changes, regression coverage and engineering decisions you can inspect in public.</p>
      <div className="mt-3 divide-y divide-dashed divide-zinc-200 dark:divide-zinc-800">
        {openSourceWork.map((item) => (
          <article key={item.title} className="flex items-start gap-2 py-3">
            <GitPullRequest aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#B97D10]" />
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {item.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[12px] text-zinc-700 underline decoration-dotted underline-offset-4 dark:text-zinc-300">
                    {link.label}<ArrowUpRight aria-hidden="true" className="size-3" />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <Link href="/highlights" className="mt-2 inline-block text-[12px] text-zinc-600 underline decoration-dotted underline-offset-4 dark:text-zinc-400">Community milestones</Link>
    </>
  );
}
