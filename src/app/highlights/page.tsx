import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CommandMenu } from "@/components/command-menu";
import { CurrentTime } from "@/components/CurrentTime";
import { FooterBackground } from "@/components/FooterBackground";
import { HighlightCard } from "@/components/Highlights";
import { EventHighlights } from "@/components/EventHighlights";
import { ThemeToggle } from "@/components/theme-toggle";
import { highlightsData } from "@/data/highlightsData";
import { portfolio } from "~/portfolio.config";

export const metadata: Metadata = {
  title: `Highlights | ${portfolio.name}`,
  description: `A complete archive of ${portfolio.name}'s highlights and milestones.`,
};

const horizontalDots = {
  maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
};

const verticalDots = {
  maskImage: "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage: "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
};

export default function AllHighlightsPage() {
  return (
    <div className="mark-page relative min-h-screen w-full overflow-x-hidden transition-colors duration-300">
      <div className="mark-workshop-rule pointer-events-none absolute bottom-0 left-[var(--mark-gutter)] top-0 hidden w-0 border-r border-black/30 dark:border-white/[0.15] sm:block" style={verticalDots} />
      <div className="mark-workshop-rule pointer-events-none absolute bottom-0 right-[var(--mark-gutter)] top-0 hidden w-0 border-r border-black/30 dark:border-white/[0.15] sm:block" style={verticalDots} />
      <div className="mark-workshop-rule pointer-events-none absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />
      <div className="mark-workshop-rule pointer-events-none absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />

      {[
        { top: "22vh", left: "var(--mark-gutter)" },
        { top: "22vh", right: "var(--mark-gutter)" },
        { top: "calc(22vh + 112px)", left: "var(--mark-gutter)" },
        { top: "calc(22vh + 112px)", right: "var(--mark-gutter)" },
      ].map((position, index) => (
        <div
          key={index}
          className="pointer-events-none absolute z-10 hidden h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25] md:block"
          style={{ ...position, transform: `translate(${position.right ? "50%" : "-50%"}, -50%)` }}
        />
      ))}

      <div className="absolute top-0 h-[22vh] left-[var(--mark-gutter)] right-[var(--mark-gutter)]">
        <FooterBackground />
        <div className="pointer-events-auto absolute bottom-3 right-2 z-10">
          <CurrentTime />
        </div>
      </div>

      <header className="absolute top-[22vh] z-20 flex h-[112px] items-center px-4 left-[var(--mark-gutter)] right-[var(--mark-gutter)]">
        <div className="flex w-full min-w-0 items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-2 pt-7 sm:gap-5 sm:pt-0">
            <Link
              href="/#highlights"
              aria-label="Back to highlights"
              className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-200/50 bg-zinc-100 text-zinc-400 transition-all hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-800/50 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>
            <div className="flex min-w-0 flex-col justify-center">
              <h1 className="mark-page-title mb-0.5 text-zinc-900 dark:text-zinc-100">
                Highlights
              </h1>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">Achievements & community</p>
            </div>
          </div>

          <div className="absolute right-4 top-2 flex shrink-0 items-center justify-end gap-2 sm:static sm:self-start sm:gap-3">
            <CommandMenu />
            <ThemeToggle className="dark:text-zinc-400 hover:dark:text-zinc-300" />
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col px-4 pb-16 pt-[calc(22vh+112px)] ml-[var(--mark-gutter)] mr-[var(--mark-gutter)]">
        <div className="flex items-center justify-between gap-4 py-5">
          <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Moments, milestones, and recognition along the way.
          </p>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
            {String(highlightsData.length).padStart(2, "0")} items
          </span>
        </div>

        <section aria-labelledby="event-highlights-heading" className="mb-6">
          <h2 id="event-highlights-heading" className="mb-3 mark-section-title text-zinc-900 dark:text-zinc-100">Event highlights</h2>
          <EventHighlights archive />
        </section>
        <h2 className="mb-3 mark-section-title text-zinc-900 dark:text-zinc-100">Milestones</h2>
        <section aria-label="Milestones" className="grid grid-cols-1 items-stretch gap-5 pt-2 sm:grid-cols-2 sm:gap-6">
          {highlightsData.map((item, index) => (
            <HighlightCard key={item.id} item={item} layout="archive" number={index + 1} />
          ))}
        </section>

        <div className="relative mt-4">
          <div className="mark-workshop-rule pointer-events-none absolute -left-[100vw] -right-[100vw] bottom-0 h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />
          <div className="pointer-events-none absolute -bottom-px -left-4 z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
          <div className="pointer-events-none absolute -bottom-px -right-4 z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
        </div>
      </main>
    </div>
  );
}
