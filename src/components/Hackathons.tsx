"use client";

import { useState } from "react";
import { DisclosureChevron } from "@/components/DisclosureChevron";
import { hackathonsData } from "@/data/hackathonsData";

const dashedX = {
  maskImage:
    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage:
    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
} as const;

/**
 * The summary - event, placement, dates, organiser and the metric row - stays
 * open; the write-up, stack, team and links fold away. The cards carry a lot of
 * prose, and two of them fully expanded pushed everything below the fold.
 *
 * Same open/close mechanics as ExperienceList (a 0fr -> 1fr grid row, so the
 * height animates without measuring anything), but driven by a real <button>
 * with aria-expanded so it works from the keyboard.
 */
export function Hackathons() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="relative pt-6 pb-2 flex flex-col gap-5">
      {hackathonsData.map((h) => {
        const isOpen = openId === h.id;
        return (
          <div key={h.id} className="relative group">
            <div className="absolute -inset-[5px] rounded-[11px] border border-black/5 dark:border-white/5 pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
            <article className="relative flex flex-col rounded-[6px] overflow-hidden border mark-panel mark-achievement">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`hackathon-panel-${h.id}`}
                onClick={() => setOpenId(isOpen ? null : h.id)}
                className="w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:-outline-offset-2 transition-colors hover:bg-zinc-100/60 dark:hover:bg-zinc-900/30"
              >
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 px-4 pt-3 pb-2.5">
                  <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight sm:text-[15px]">
                    {h.event}
                  </span>
                  <span className="px-1.5 py-[1px] rounded-[4px] text-[11px] font-medium mark-gold-text border mark-achievement whitespace-nowrap">
                    {h.placement}
                  </span>
                  <span className="ml-auto flex items-center gap-2 text-[12px] font-medium mark-muted whitespace-nowrap">
                    {h.dates}
                    <DisclosureChevron open={isOpen} />
                  </span>
                </span>

                <span className="block px-4 pb-3 text-left text-[12px] mark-muted">
                  {h.organizer}
                </span>
              </button>

              <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

              {/* the numbers stay out: they are the reason to open the card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 py-1">
                {h.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="relative min-w-0 px-3 py-2 after:absolute after:bottom-0 after:right-0 after:top-0 after:w-0 after:border-r after:border-black/30 after:[mask-image:repeating-linear-gradient(to_bottom,black_0,black_1px,transparent_1px,transparent_6px)] dark:after:border-white/[0.15] [&:nth-child(2n)]:after:hidden sm:[&:not(:last-child)]:after:block sm:[&:last-child]:after:hidden"
                  >
                    <p className="break-words font-mono text-[16px] font-semibold leading-tight mark-gold-text">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[10px] font-medium uppercase mark-muted">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <div
                id={`hackathon-panel-${h.id}`}
                inert={!isOpen}
                aria-hidden={!isOpen}
                className="mark-disclosure-panel"
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    className="min-w-0"
                  >
                    <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

                    <div className="px-4 py-3.5 flex flex-col gap-3">
                      <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {h.problem}
                      </p>

                      <div>
                        <p className="text-[10px] font-medium uppercase mark-muted">
                          {h.project}
                        </p>
                        <ul className="mt-2 flex flex-col gap-1.5">
                          {h.built.map((b) => (
                            <li
                              key={b}
                              className="flex gap-1.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400"
                            >
                              <span aria-hidden="true">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {h.principle && (
                        <blockquote className="border-l-2 border-black/20 dark:border-white/20 pl-3 text-[13px] leading-relaxed italic mark-muted">
                          {h.principle}
                        </blockquote>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {h.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-zinc-100 dark:bg-[#0a0a0a] border border-black/30 dark:border-white/[0.15] rounded-[6px] text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {(h.team?.length || h.links?.length) && (
                      <>
                        <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />
                        <footer className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
                          {h.team?.length ? (
                            <p className="text-[12px] mark-muted">
                              Built with {h.team.join(", ")}
                            </p>
                          ) : null}
                          <div className="ml-auto flex flex-wrap gap-4">
                            {h.links?.map((l) => (
                              <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                // the panel is inert while closed, so a collapsed
                                // card cannot hand focus to an invisible link
                                tabIndex={isOpen ? undefined : -1}
                                className="flex items-center gap-1 text-[12px] font-medium mark-muted hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                              >
                                {l.label}
                                
                              </a>
                            ))}
                          </div>
                        </footer>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
