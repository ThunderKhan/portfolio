"use client";
import { portfolio } from "~/portfolio.config";

import { useEffect, useMemo, useState } from "react";

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


export function GithubGraph() {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [months, setMonths] = useState<ContributionMonth[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snapshotDate, setSnapshotDate] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

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
                            className={`aspect-square w-full rounded-[2px] outline-none motion-safe:transition-transform motion-safe:hover:scale-125 ${color.cell}`}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
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
          <span className="text-[11px] mark-muted">{hoveredDay ? `${hoveredDay.contributionCount} contributions on ${formatDate(hoveredDay.date)}` : "Less active"}</span>
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

        {!loading && graphWeeks.length > 0 && (
          <details className="mt-2 text-[12px] mark-muted">
            <summary className="min-h-8 cursor-pointer rounded py-2 underline underline-offset-4">Daily activity</summary>
            <div className="max-h-64 overflow-auto rounded border mark-panel" role="region" aria-label="Daily GitHub contribution counts" tabIndex={0}>
              <table className="w-full text-left">
                <caption className="sr-only">Daily GitHub contributions</caption>
                <thead><tr><th scope="col" className="px-3 py-2">Date</th><th scope="col" className="px-3 py-2 text-right">Contributions</th></tr></thead>
                <tbody>
                  {graphWeeks.flatMap(week => week.contributionDays).map(day => (
                    <tr key={day.date} className="border-t border-[var(--mark-seam)]">
                      <th scope="row" className="px-3 py-1 font-normal">{formatDate(day.date)}</th>
                      <td className="px-3 py-1 text-right tabular-nums">{day.contributionCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
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
