"use client";

import React, { useState } from "react";
import Image from "next/image";

import { experiences } from "@/data/experienceData";
import { ExperienceLogo } from "@/components/ExperienceLogo";
import { ExperienceDescription } from "@/components/ExperienceDescription";

export function ExperienceList() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="block">
      {experiences.map((item, idx) => {
        const isOpen = openIdx === idx;
        const isLast = idx === experiences.length - 1;

        return (
          <div key={idx} className="group relative">
            {/* Dashed bottom border for all items except the last one */}
            {!isLast && (
              <div
                className="absolute bottom-0 left-[-16px] right-[-16px] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none z-10"
                style={{
                  maskImage:
                    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  WebkitMaskImage:
                    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                }}
              />
            )}

            {/* Special full-width dashed line and intersection dots for the last item */}
            {isLast && (
              <>
                <div
                  className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none z-10"
                  style={{
                    maskImage:
                      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                    WebkitMaskImage:
                      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  }}
                />
                <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
                <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              </>
            )}

            <button
              type="button"
              id={`home-experience-trigger-${idx}`}
              aria-expanded={isOpen}
              aria-controls={`home-experience-panel-${idx}`}
              className="flex w-[calc(100%+2rem)] text-left flex-col items-start gap-2.5 py-3.5 px-4 -mx-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 motion-safe:transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 relative z-20 rounded-lg sm:gap-3 sm:py-4 2xl:flex-row 2xl:items-center 2xl:justify-between"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <span className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <span className="size-10 shrink-0 rounded-[10px] border border-black/10 bg-zinc-50 p-[2px] shadow-sm shadow-black/15 dark:border-zinc-800 dark:bg-[#111111] dark:shadow-md dark:shadow-black/50">
                  <span className="w-full h-full rounded-[7px] border border-black/5 dark:border-black/20 bg-white flex items-center justify-center overflow-hidden relative">
                    <ExperienceLogo
                      src={item.src}
                      fallbackSrc={item.fallbackSrc}
                      alt=""
                      width={40}
                      height={40}
                      sizes="40px"
                      quality={60}
                      style={item.imageZoom ? { transform: `scale(${item.imageZoom})` } : undefined}
                      className={`${item.imageFit === "contain" ? "object-contain" : "object-cover"} w-full h-full ${item.imageBleed ? "" : "p-0.5"}`}
                    />
                  </span>
                </span>
                <span className="flex flex-col gap-0.5 min-w-0 pr-2 sm:pr-4">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-[14px] font-bold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-[17px]">
                      {item.title}
                    </span>
                    {item.type && (
                      <span className="self-center px-1.5 py-[1px] rounded-[4px] text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50 whitespace-nowrap">
                        {item.type}
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 break-words`}
                  >
                    {item.role}
                  </span>
                </span>
              </span>
              <span className="flex flex-col items-start gap-0.5 text-left pr-5 pl-[52px] shrink-0 sm:pl-[56px] 2xl:mt-0 2xl:items-end 2xl:pl-0 2xl:text-right">
                <span className="flex items-center text-[13px] sm:text-[14px] font-medium text-zinc-900 dark:text-zinc-100 relative">
                  <span>{item.dates}</span>
                  <span aria-hidden="true" className="ml-2 inline-block w-3 shrink-0 text-center font-mono mark-muted">{isOpen ? "−" : "+"}</span>
                </span>
                {item.location && <span className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400">{item.location}</span>}
              </span>
            </button>

            {/* Expandable Details Section */}
            <div
              id={`home-experience-panel-${idx}`}
              inert={!isOpen}
              aria-hidden={!isOpen}
              className={`-mx-4 grid motion-safe:transition-[grid-template-rows] motion-safe:duration-[240ms] motion-safe:ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={`${isOpen ? "pb-4 pt-0 opacity-100" : "pb-0 pt-0 opacity-0"
                    } motion-safe:transition-opacity motion-safe:duration-[180ms] pl-6 pr-8 text-[14px] text-zinc-600 dark:text-zinc-400`}
                >
                  {item.metrics && (
                    <div className="relative -ml-6 -mr-8 mb-4">
                      <div className="grid max-w-full grid-cols-2 pl-6 pr-8 2xl:grid-cols-4">
                        {item.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="relative min-w-0 px-3 py-2 after:absolute after:bottom-0 after:right-0 after:top-0 after:w-0 after:border-r after:border-black/30 after:[mask-image:repeating-linear-gradient(to_bottom,black_0,black_1px,transparent_1px,transparent_6px)] dark:after:border-white/[0.15] [&:nth-child(2n)]:after:hidden 2xl:[&:not(:last-child)]:after:block 2xl:[&:last-child]:after:hidden"
                          >
                            <p
                              className={`${metric.value.includes(" - ") ? "text-[13px]" : "text-[16px]"} whitespace-nowrap font-bold leading-none text-zinc-900 dark:text-zinc-100`}
                            >
                              {metric.value}
                            </p>
                            <p className="mt-1 text-[10px] font-medium uppercase mark-muted">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-0 border-t border-black/30 dark:border-white/[0.15]"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span
                        className="pointer-events-none absolute inset-x-0 top-1/2 h-0 border-t border-black/30 dark:border-white/[0.15] 2xl:hidden"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-0 border-b border-black/30 dark:border-white/[0.15]"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
                      <span className="pointer-events-none absolute right-0 top-0 h-[2px] w-[2px] translate-x-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
                      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-[2px] -translate-x-1/2 translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
                      <span className="pointer-events-none absolute bottom-0 right-0 h-[2px] w-[2px] translate-x-1/2 translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
                    </div>
                  )}

                  {isOpen && item.screenshot && (
                    <div className="relative mb-4 overflow-hidden bg-black">
                      <Image
                        src={item.screenshot}
                        alt={`${item.title} analytics screenshot`}
                        width={1400}
                        height={1050}
                        sizes="(min-width: 768px) 40vw, calc(100vw - 3rem)"
                        quality={70}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}

                  <ExperienceDescription item={item} />

                  {item.tech && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-[4px] border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-[#111111] text-[11px] font-medium text-zinc-500 dark:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links get their own row: inside the tech list they read as
                      inert tags, and gating them on `tech` hid them entirely
                      for any role without one. */}
                  {item.links && item.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="group/link inline-flex items-center gap-1.5 rounded-[6px] border border-zinc-300 bg-white px-2.5 py-1 text-[11.5px] font-semibold text-zinc-700 shadow-sm transition-all hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-700 dark:bg-[#18181b] dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white"
                        >
                          {link.label}
                          
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
