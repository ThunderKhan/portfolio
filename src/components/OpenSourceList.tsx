"use client";

import { useId, useState } from "react";
import { ArrowUpRight, ChevronDown, GitPullRequest } from "lucide-react";
import type { OpenSourceEntry } from "@/data/openSourceData";
import { CertificateLink } from "@/components/CertificateLink";

export function OpenSourceList({ items }: { items: OpenSourceEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const prefix = useId();

  return (
    <div className="divide-y divide-dashed divide-zinc-300 dark:divide-zinc-800">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const merged = item.links.filter((link) => link.status === "Merged").length;
        const panelId = `${prefix}-${item.id}`;
        return (
          <article key={item.id} className="relative">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((current) => current === item.id ? null : item.id)}
                className="flex w-full items-center gap-3 rounded-md px-1 py-3.5 text-left transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:hover:bg-zinc-900/30"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <GitPullRequest aria-hidden="true" className="size-4 text-[#B97D10]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-[14px] font-bold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-[16px]">{item.title}</span>
                  <span className="mt-1 block text-[12px] font-normal leading-snug text-zinc-600 dark:text-zinc-400">{item.summary}</span>
                  <span className="mt-1 block text-[11px] font-normal text-zinc-500 dark:text-zinc-400">{item.links.length ? `${item.links.length} PR${item.links.length === 1 ? "" : "s"} · ${merged} merged` : "Community"}</span>
                </span>
                <ChevronDown aria-hidden="true" className={`size-4 shrink-0 text-zinc-500 motion-safe:transition-transform motion-safe:duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div
              id={panelId}
              inert={!isOpen}
              aria-hidden={!isOpen}
              className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-[240ms] motion-safe:ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-4 pl-3 pr-2 sm:pl-[53px]">
                  <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>
                  {item.evidence?.length ? <div className="mt-3 flex flex-wrap gap-2">{item.evidence.map((evidence) => <CertificateLink key={evidence.href} {...evidence} />)}</div> : null}
                  {item.links.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {item.links.map((link) => (
                        <li key={link.href} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-0 items-center gap-1 text-[12px] text-zinc-700 underline decoration-dotted underline-offset-4 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white">
                            <span className="break-words">{link.label}</span>
                            <ArrowUpRight aria-hidden="true" className="size-3 shrink-0" />
                          </a>
                          <span className="shrink-0 text-[11px] text-zinc-500 dark:text-zinc-400">{link.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
