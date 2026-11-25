"use client";
import { portfolio } from "~/portfolio.config";

import React, { useEffect, useMemo, useState } from "react";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionMonth {
  name: string;
}

interface ContributionLevel {
  cell: string;
}

interface TooltipState {
  count: number;
  date: string;
  x: number;
  y: number;
}

export function GithubGraph() {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [months, setMonths] = useState<ContributionMonth[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snapshotDate, setSnapshotDate] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchContributions = async () => {
      try {
        // The server owns the fixed query; callers never send GraphQL.
        const response = await fetch("/api/github", { method: "POST", signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        const calendar = data?.calendar;
        if (controller.signal.aborted || !calendar || !Array.isArray(calendar.weeks) || !calendar.weeks.length) return;
        setWeeks(calendar.weeks);
        setMonths(calendar.months || []);
        setTotalContributions(calendar.totalContributions);
        setSnapshotDate(data.stale ? (data.asOf || "unknown date") : null);
      } catch (error) {
        if (!controller.signal.aborted) console.error("Failed to fetch GitHub contributions", error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void fetchContributions();
    return () => controller.abort();
  }, []);

  const contributionLevels = useMemo<ContributionLevel[]>(
    () => [
      {
        cell: "mark-activity-0",
      },
      {
        cell: "mark-activity-1",
      },
      {
        cell: "mark-activity-2",
      },
      {
        cell: "mark-activity-3",
      },
      {
        cell: "mark-activity-4",
      },
    ],
    []
  );

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  };

  const showTooltip = (
    day: ContributionDay,
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.FocusEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      count: day.contributionCount,
      date: formatDate(day.date),
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const defaultMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const displayMonths = months.length > 0 ? months.map(m => m.name.substring(0, 3)) : defaultMonths;
  const graphWeeks = weeks;
  const graphStatus = loading
    ? "Loading GitHub contribution activity"
    : weeks.length === 0
      ? "GitHub activity unavailable"
      : snapshotDate
        ? `${totalContributions} activities · snapshot ending ${snapshotDate}`
        : `${totalContributions} GitHub activities in the last year`;
  const dashedLineMask = {
    maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
    WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  };

  return (
    <section
      id="activity"
      className="relative z-10 mt-6 flex flex-col scroll-mt-24"
      aria-labelledby="github-activity-title"
      aria-describedby="github-activity-summary"
    >
      {/* Top full-width dashed line */}
      <div
        className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 pointer-events-none dark:border-white/[0.15]"
        style={dashedLineMask}
      />
      <div className="absolute top-0 -left-4 z-20 size-[2px] -translate-x-1/2 -translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
      <div className="absolute top-0 -right-4 z-20 size-[2px] translate-x-1/2 -translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />

      {/* Heading */}
      <div className="relative py-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="github-activity-title" className="mark-section-title text-zinc-900 dark:text-zinc-100">
            Engineering activity
          </h2>
          <p className={`text-right text-[11px] ${weeks.length ? "mark-gold-text" : "mark-muted"}`} aria-live="polite">
            {graphStatus}
          </p>
        </div>

        {/* Bottom full-width dashed line under heading */}
        <div
          className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 pointer-events-none dark:border-white/[0.15]"
          style={dashedLineMask}
        />
        <div className="absolute bottom-0 -left-4 z-20 size-[2px] -translate-x-1/2 translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
        <div className="absolute bottom-0 -right-4 z-20 size-[2px] translate-x-1/2 translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
      </div>

      <p id="github-activity-summary" className="sr-only">
        Calendar heatmap for {portfolio.handles.github}. {graphStatus}.
      </p>

      {/* Missing data is not a zero-contribution calendar. */}
      {!loading && weeks.length === 0 ? (
        <div className="py-5 text-[13px] leading-relaxed mark-muted">
          <p>The contribution calendar is temporarily unavailable.</p>
          <a href={`https://github.com/${portfolio.handles.github}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-8 items-center rounded-sm font-medium mark-control underline underline-offset-4">View activity on GitHub<span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      ) : (
      <div className="relative py-4">
        <div className="w-full overflow-x-auto pb-2 focus-visible:outline-2" tabIndex={0} role="region" aria-label="GitHub contribution calendar; scroll horizontally if needed">
          <div className="min-w-[560px]">
            <div className="mb-2 flex w-full justify-between text-[10px] mark-muted">
              {displayMonths.map((month, index) => (
                <span key={`${month}-${index}`}>{month}</span>
              ))}
            </div>

            <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-x-[2px]" role="img" aria-label={graphStatus}>
              {weeks.length === 0
                ? Array.from({ length: 53 }).map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-[2px]">
                      {Array.from({ length: 7 }).map((__, rowIndex) => (
                        <div
                          key={rowIndex}
                          className={`aspect-square w-full rounded-[2px] mark-activity-0 ${loading ? "motion-safe:animate-pulse" : ""}`}
                        />
                      ))}
                    </div>
                  ))
                : graphWeeks.map((week, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-[2px]">
                      {colIndex === 0 &&
                        Array.from({ length: 7 - week.contributionDays.length }).map((_, i) => (
                          <div key={`empty-top-${i}`} className="aspect-square w-full rounded-[2px] bg-transparent" />
                        ))}

                      {week.contributionDays.map((day) => {
                        const level = getLevel(day.contributionCount);
                        const color = contributionLevels[level];

                        return (
                          <div
                            key={day.date}
                            aria-hidden="true"
                            aria-label={`${day.contributionCount} contributions on ${formatDate(day.date)}`}
                            className={`aspect-square w-full rounded-[2px] outline-none motion-safe:transition-transform motion-safe:hover:scale-125 ${color.cell}`}
                            onMouseEnter={(event) => showTooltip(day, event)}
                            onMouseLeave={() => setTooltip(null)}
                          />
                        );
                      })}

                      {colIndex !== 0 &&
                        week.contributionDays.length < 7 &&
                        Array.from({ length: 7 - week.contributionDays.length }).map((_, i) => (
                          <div key={`empty-bottom-${i}`} className="aspect-square w-full rounded-[2px] bg-transparent" />
                        ))}
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Less active</span>
          <div className="flex shrink-0 items-center gap-1.5">
            {contributionLevels.map((level, index) => (
              <div
                key={index}
                aria-hidden="true"
                className={`size-2 rounded-[2px] ${level.cell}`}
              />
            ))}
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">More active</span>
          </div>
        </div>

        {tooltip && (
          <div
            className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-zinc-700 shadow-lg shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:shadow-black/40"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.count} contributions on {tooltip.date}
          </div>
        )}
      </div>

      )}

      {/* Bottom full-width dashed line */}
      <div
        className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 pointer-events-none dark:border-white/[0.15]"
        style={dashedLineMask}
      />
      <div className="absolute bottom-0 -left-4 z-20 size-[2px] -translate-x-1/2 translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
      <div className="absolute bottom-0 -right-4 z-20 size-[2px] translate-x-1/2 translate-y-1/2 bg-black/50 pointer-events-none dark:bg-white/[0.25]" />
    </section>
  );
}
