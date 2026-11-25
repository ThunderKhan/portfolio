import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CommandMenu } from "@/components/command-menu";
import { CurrentTime } from "@/components/CurrentTime";
import { FooterBackground } from "@/components/FooterBackground";
import { OpenSourceList } from "@/components/OpenSourceList";
import { ThemeToggle } from "@/components/theme-toggle";
import { openSourceWork, contributionTotals } from "@/data/openSourceData";
import { portfolio } from "~/portfolio.config";

export const metadata: Metadata = {
  title: `OSS Contributions | ${portfolio.name}`,
  description: `Selected upstream contributions, technical details and pull request links by ${portfolio.name}.`,
};

const horizontalDots = {
  maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
};

const verticalDots = {
  maskImage: "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage: "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
};

export default function OpenSourcePage() {
  return (
    <div className="mark-page relative min-h-screen w-full overflow-x-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute bottom-0 left-[30%] top-0 hidden w-0 border-r border-black/30 dark:border-white/[0.15] md:block" style={verticalDots} />
      <div className="pointer-events-none absolute bottom-0 right-[30%] top-0 hidden w-0 border-r border-black/30 dark:border-white/[0.15] md:block" style={verticalDots} />
      <div className="pointer-events-none absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />
      <div className="pointer-events-none absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />

      {[
        { top: "22vh", left: "30%" },
        { top: "22vh", right: "30%" },
        { top: "calc(22vh + 112px)", left: "30%" },
        { top: "calc(22vh + 112px)", right: "30%" },
      ].map((position, index) => (
        <div
          key={index}
          className="pointer-events-none absolute z-10 hidden h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25] md:block"
          style={{ ...position, transform: `translate(${position.right ? "50%" : "-50%"}, -50%)` }}
        />
      ))}

      <div className="absolute left-0 right-0 top-0 h-[22vh] md:left-[30%] md:right-[30%]">
        <FooterBackground />
        <div className="pointer-events-auto absolute bottom-3 right-2 z-10">
          <CurrentTime />
        </div>
      </div>

      <header className="absolute left-0 right-0 top-[22vh] z-20 flex h-[112px] items-center px-4 md:left-[30%] md:right-[30%]">
        <div className="flex w-full items-center justify-between">
          <div className="flex min-w-0 items-center gap-2 sm:gap-5">
            <Link
              href="/#opensource"
              aria-label="Back to open source and community"
              className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-200/50 bg-zinc-100 text-zinc-400 transition-all hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-800/50 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>
            <div className="flex flex-col justify-center">
              <h1 className="mark-page-title mb-0.5 text-zinc-900 dark:text-zinc-100">
                OSS Contributions
              </h1>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">Open source archive</p>
            </div>
          </div>

          <div className="flex h-20 items-start justify-end gap-2 py-1 sm:h-24 sm:gap-3">
            <CommandMenu />
            <ThemeToggle className="dark:text-zinc-400 hover:dark:text-zinc-300" />
          </div>
        </div>
      </header>

      <main className="relative z-10 ml-0 mr-0 flex flex-col px-4 pb-16 pt-[calc(22vh+112px)] md:ml-[30%] md:mr-[30%]">
        <div className="flex items-center justify-between gap-4 py-5">
          <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Selected upstream contributions · status verified Nov 2026.
          </p>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
            {contributionTotals.repositories} repositories
          </span>
        </div>

        <div className="mb-3 grid grid-cols-3 divide-x divide-zinc-200 border-y border-dashed border-zinc-300 py-3 dark:divide-zinc-800 dark:border-zinc-800">
          {[
            { label: "Pull requests", value: contributionTotals.pullRequests },
            { label: "Merged", value: contributionTotals.merged },
            { label: "Repositories", value: contributionTotals.repositories },
          ].map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <p className="font-mono text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{stat.value}</p>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <section aria-label="All selected open source contributions">
          <OpenSourceList items={openSourceWork} />
        </section>
        <Link href="/highlights" className="mt-4 w-fit text-[12px] text-zinc-600 underline decoration-dotted underline-offset-4 dark:text-zinc-400">Community milestones</Link>


        <div className="relative mt-4">
          <div className="pointer-events-none absolute -left-[100vw] -right-[100vw] bottom-0 h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />
          <div className="pointer-events-none absolute -bottom-px -left-4 z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
          <div className="pointer-events-none absolute -bottom-px -right-4 z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
        </div>
      </main>
    </div>
  );
}
