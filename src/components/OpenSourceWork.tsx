import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OpenSourceList } from "@/components/OpenSourceList";
import { contributionTotals, featuredOpenSourceWork } from "@/data/openSourceData";

export function OpenSourceWork() {
  return (
    <>
      <h2 className="border-y border-dashed border-zinc-300 py-2 text-[18px] font-bold tracking-tight text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">Open source &amp; community</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{contributionTotals.merged} merged pull requests across {contributionTotals.repositories} repositories · selected work</p>
      <div className="mt-2">
        <OpenSourceList items={featuredOpenSourceWork} />
      </div>
      <div className="relative flex justify-center border-t border-dashed border-zinc-300 py-4 dark:border-zinc-800">
        <Link href="/open-source" className="relative inline-flex items-center gap-1.5 rounded-[6px] border border-black/5 bg-zinc-50 px-4 py-2 text-[13px] font-medium text-zinc-600 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-white/5 dark:bg-[#09090b] dark:text-zinc-400 dark:hover:bg-[#121214] dark:hover:text-zinc-100">
          View all contributions <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </>
  );
}
