"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./ExperienceTimeline.module.css";
import { experiences } from "@/data/experienceData";

// An explicit snapshot avoids inventing exact employment durations or relying on
// the viewer's clock. Update with the next verified content refresh.
const snapshotMonth = "2026-11";
const monthNumber = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month - 1;
};

const firstMonth = Math.min(...experiences.map((item) => monthNumber(item.startMonth)));
const lastMonth = monthNumber(snapshotMonth);
const monthCount = lastMonth - firstMonth + 1;

const months = Array.from({ length: monthCount }, (_, index) => {
  const month = firstMonth + index;
  return new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(Math.floor(month / 12), month % 12, 1)),
  );
});

const timelineItems = experiences.map((item, experienceIndex) => ({
  label: item.title,
  dates: item.dates,
  detail: item.role,
  experienceIndex,
  start: ((monthNumber(item.startMonth) - firstMonth) / monthCount) * 100,
  end: 100,
  icon: item.src,
  barClassName: experienceIndex % 2 === 0
    ? "border-[#6A0C0B] bg-[#6A0C0B] text-white hover:bg-[#AA0505]"
    : "border-zinc-700 bg-zinc-700 text-white hover:bg-zinc-600",
}));
const rowStyle = { gridTemplateRows: `repeat(${timelineItems.length}, minmax(0, 1fr))` };

type ExperienceTimelineProps = {
  onSelect: (experienceIndex: number) => void;
};

export function ExperienceTimeline({ onSelect }: ExperienceTimelineProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Mobile opens on the recent work while preserving the full history to the left.
    scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth;
  }, []);

  return (
    <section
      aria-labelledby="experience-timeline-title"
      className="relative z-10 flex h-full flex-col px-4 pb-4 pt-4"
    >
      <div className="flex h-8 shrink-0 items-start justify-between gap-4">
        <div className="flex min-w-0 items-baseline gap-2">
          <h2
            id="experience-timeline-title"
            className="truncate text-[15px] font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-[16px]"
          >
            Career timeline
          </h2>
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600 sm:hidden">
            drag
          </span>
        </div>
        <span className="shrink-0 pt-0.5 font-mono text-[10px] font-medium tracking-[0.12em] text-zinc-500 dark:text-zinc-500 sm:text-[11px]">
          AS OF NOV 2026
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-4 top-[72px] z-0 grid gap-1"
        style={rowStyle}
      >
        {timelineItems.map((item) => (
          <span
            key={`lane-${item.experienceIndex}`}
            className="border-t border-black/[0.08] dark:border-white/[0.065]"
          />
        ))}
        <span className="absolute inset-x-0 bottom-0 border-b border-black/[0.08] dark:border-white/[0.065]" />
      </div>

      <div
        ref={scrollerRef}
        dir="rtl"
        className="relative min-h-0 flex-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div dir="ltr" className="flex h-full w-full flex-col sm:w-[620px] xl:w-full">
          <div className="relative h-6 shrink-0 font-mono text-[9px] tracking-[0.08em] text-zinc-400 dark:text-zinc-600 sm:text-[10px]">
            {months.map((month, index) => (
              <span key={index} className="absolute" style={{ left: `${(index / monthCount) * 100}%` }}>
                {month}
              </span>
            ))}
            <span className="absolute right-0 text-zinc-600 dark:text-zinc-400">NOW</span>
          </div>

          <div
            className="relative grid min-h-0 flex-1 gap-1"
            style={{
              ...rowStyle,
              backgroundImage:
                "linear-gradient(to right, transparent 24.5%, rgba(113,113,122,0.07) 24.5%, rgba(113,113,122,0.07) 25%, transparent 25%, transparent 49.5%, rgba(113,113,122,0.07) 49.5%, rgba(113,113,122,0.07) 50%, transparent 50%, transparent 74.5%, rgba(113,113,122,0.07) 74.5%, rgba(113,113,122,0.07) 75%, transparent 75%)",
            }}
          >
            {months.slice(1).map((_, index) => ((index + 1) / monthCount) * 100).map((position) => (
              <span
                key={position}
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 z-0 w-px border-l border-black/20 dark:border-white/[0.12]"
                style={{
                  left: `${position}%`,
                  maskImage:
                    "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
                  WebkitMaskImage:
                    "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
                }}
              />
            ))}

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-px bg-orange-500/90"
            />

            {timelineItems.map((item) => (
              <div
                key={item.experienceIndex}
                className="relative"
              >
                <div
                  className={`${styles.item} absolute top-1/2 z-10 -translate-y-1/2`}
                  style={{ left: `${item.start}%`, right: `${100 - item.end}%` }}
                >
                  <button
                    type="button"
                    aria-label={`View ${item.label}`}
                    aria-describedby={`experience-timeline-tip-${item.experienceIndex}`}
                    onClick={() => onSelect(item.experienceIndex)}
                    className="relative flex h-8 w-full cursor-pointer items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
                  >
                    {/* The coloured bar is its own layer: the shine sweep needs a
                        clip, and the label below must escape it. */}
                    <span
                      aria-hidden="true"
                      className={`${styles.bar} absolute inset-0 overflow-hidden rounded-md border shadow-[0_3px_10px_rgba(0,0,0,0.18)] ring-1 ring-inset ring-white/15 ${item.barClassName}`}
                    />
                    <span
                      className={`relative z-10 flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-[4px] border border-black/10 bg-white dark:border-black/15 ${
                        item.end >= 95 ? "ml-1" : "ml-auto mr-1"
                      }`}
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        sizes="16px"
                        quality={60}
                        className={`size-full rounded-[3px] object-cover p-px `}
                      />
                    </span>
                    <span className="relative z-10 ml-2 min-w-0 truncate pr-2 text-[10px] font-semibold text-white sm:text-[11px]">
                      {item.label}
                    </span>
                  </button>
                  <div
                    id={`experience-timeline-tip-${item.experienceIndex}`}
                    role="tooltip"
                    className={`${styles.tooltip} pointer-events-none absolute z-50 w-max max-w-56 rounded-md border border-zinc-200 bg-white/95 px-2.5 py-2 text-left shadow-[0_8px_20px_rgba(0,0,0,0.16)] backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/95 dark:shadow-[0_10px_24px_rgba(0,0,0,0.45)] ${
                      item.experienceIndex === 0 ? "top-full mt-2" : "bottom-full mb-2"
                    } right-0`}
                  >
                    <p className="text-[11px] font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[10px] leading-snug text-zinc-600 dark:text-zinc-300">
                      {item.detail}
                    </p>
                    <p className="mt-1.5 border-t border-zinc-100 pt-1.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                      {item.dates}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">
        Timeline covering September through November 2026, at month precision. Select a role to open its full details below.
      </p>
    </section>
  );
}
