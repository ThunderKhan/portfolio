"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { ProjectPreview } from "@/components/ProjectPreview";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import {
  type TechIcon,
  type TechKey,
  type TechItem,
  type Project,
  iconMap,
  techNames,
  projectsData,
} from "@/data/projectsData";

export {
  type TechIcon,
  type TechKey,
  type TechItem,
  type Project,
  iconMap,
  techNames,
  projectsData,
};

export const ProjectCard = ({
  project,
  isPriority = false,
}: {
  project: Project;
  isPriority?: boolean;
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const externalUrl = project.live || project.github;

  const imageSrc = resolvedTheme === "light" && project.lightModeSrc ? project.lightModeSrc : project.src;

  const statusColor =
    project.status === "research" ? "bg-sky-500"
    : project.status === "prototype" ? "bg-amber-500"
    : project.status === "building" ? "bg-red-500"
    : project.status === "archived" ? "bg-zinc-400 dark:bg-zinc-500"
    : "bg-emerald-500";
  const statusLabel =
    project.status === "research" ? "Research"
    : project.status === "completed" ? "Completed"
    : project.status === "prototype" ? "Prototype"
    : project.status === "building" ? "Building"
    : project.status === "archived" ? "Archived"
    : "Live";

  return (
    <motion.article className="relative flex min-w-0 flex-col group rounded-lg" initial="rest" animate="rest" whileHover={reduceMotion ? "rest" : "hover"}>
      {/* Outer Wrapper exactly like screenshot */}
      <motion.div
        className="relative w-full aspect-[1.25] rounded-xl border mark-surface mark-project-frame shadow-sm p-3.5 pb-0 flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-200 hover:shadow-md sm:aspect-[1.4] sm:p-4 sm:pb-0"
      >
        <div className="flex items-center justify-end z-10 min-h-[24px]">
          {project.hasPin && (
            <div className="w-6 h-6 rounded-[6px] bg-transparent border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 17v5" /><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
              </svg>
            </div>
          )}
        </div>

        {/* Ambient Hover Background - a plain CSS background so this purely
            decorative layer never depends on lazy loading or srcset sizing. */}
        {project.backgroundImage && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 scale-100 bg-cover bg-center opacity-0 transition-[opacity,transform] duration-200 ease-out motion-safe:group-hover:scale-[1.03] group-hover:opacity-100"
            style={{ backgroundImage: `url(${project.backgroundImage})` }}
          />
        )}



        {/* Floating screenshot sitting directly at the bottom of the outer wrapper */}
        <motion.div
          className="absolute bottom-0 left-1/2 z-20 h-[66%] w-[85%] origin-bottom sm:h-[74%] rounded-t-[10px] border border-b-0 border-black/5 bg-white p-0 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:border-white/[0.15] dark:bg-[#0a0a0a] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
          variants={{
            rest: { y: 0, x: "-50%", scale: 1 },
            hover: { y: 4, x: "-50%", scale: 0.94 },
          }}
          transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
        >
          {/* The panel is sized to 1.6 to match the screenshots, so cover fills
              it exactly - at 1.53 it clipped the left edge of every 16:10 shot. */}
          <div className="size-full overflow-hidden rounded-t-[9px]">
            <ProjectPreview
              projectTitle={project.title}
              src={imageSrc}
              alt={`${project.title} preview`}
              width={600}
              height={400}
              preload={isPriority}
              sizes="(min-width: 848px) 320px, (min-width: 768px) calc((100vw - 120px) / 2), (min-width: 640px) calc(100vw - 80px), calc(100vw - 32px)"
              quality={70}
              className="size-full object-cover object-top"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Content Area directly below the wrapper */}
      <div className="mt-4 flex flex-col px-0.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="min-w-0 break-words text-[15px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            <Link href={`/projects/${project.slug}`} className="rounded-sm after:absolute after:inset-0 after:z-30 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[var(--mark-interaction)]">
              {project.title}
            </Link>
          </h3>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 w-fit shrink-0">
            <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{statusLabel}</span>
          </div>
        </div>

        <p className="mt-2 sm:mt-1.5 text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed pr-2">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="relative z-40 flex gap-2 flex-wrap">
            {project.tech.map((item) => {
              const key = typeof item === "string" ? item : item.label;
              const isIconItem = typeof item === "string";
              const tooltipText = isIconItem ? techNames[item] : item.tooltip || item.label;
              const uniqueId = `${project.title}-${key}`;

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setHoveredTech(uniqueId)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {isIconItem ? (
                    (() => {
                      const TechIcon = iconMap[item];
                      return <><span className="sr-only">{tooltipText}</span><span aria-hidden="true"><TechIcon className="w-4 h-4 md:w-3.5 md:h-3.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors" /></span></>;
                    })()
                  ) : (
                    <span className="px-1.5 py-0.5 rounded border border-black/30 dark:border-white/[0.15] text-[9px] text-zinc-500 dark:text-zinc-400 leading-none">
                      {item.label}
                    </span>
                  )}
                  <AnimatePresence>
                    {hoveredTech === uniqueId && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
                        aria-hidden="true"
                        className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                      >
                        <div className="bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                          {tooltipText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {externalUrl && (
            <a href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} ${project.live ? "live project" : "repository"} in a new tab`} className="relative z-40 inline-flex min-h-8 shrink-0 items-center gap-1 rounded-sm text-[12px] font-medium mark-reactor-text">
              {project.live ? "Live project" : "Repository"}
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export function ProjectsGrid() {
  return (
      <div className="flex flex-col relative z-10 w-full">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-0 pb-10 md:pb-6">
          {projectsData.slice(0, 2).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Middle Horizontal Line Container */}
        <div className="relative w-full h-0 hidden md:block">
          <div className="absolute left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          {/* Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 left-1/2 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-0 pt-0 md:pt-6">
          {projectsData.slice(2, 4).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

  );
}
