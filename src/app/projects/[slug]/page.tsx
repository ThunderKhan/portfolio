import { ThemeToggle } from "@/components/theme-toggle";
import { CommandMenu } from "@/components/command-menu";
import { CurrentTime } from "@/components/CurrentTime";
import { RightNavbar } from "@/components/RightNavbar";
import { FooterBackground } from "@/components/FooterBackground";
import { projectsData, iconMap, techNames, TechItem, TechKey } from "@/data/projectsData";
import Link from "next/link";
import { ProjectPreview } from "@/components/ProjectPreview";
import { CertificateLink } from "@/components/CertificateLink";
import { notFound } from "next/navigation";

import { SiGithub } from "react-icons/si";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  const statusDot =
    project?.status === "research" ? "bg-sky-500"
    : project?.status === "prototype" ? "bg-amber-500"
    : project?.status === "building" ? "bg-red-500"
    : project?.status === "archived" ? "bg-zinc-400 dark:bg-zinc-500"
    : "bg-emerald-500";
  const statusText =
    project?.status === "research" ? "text-sky-700 dark:text-sky-400"
    : project?.status === "prototype" ? "text-amber-700 dark:text-amber-400"
    : project?.status === "building" ? "text-red-700 dark:text-red-400"
    : project?.status === "archived" ? "mark-muted"
    : "text-emerald-700 dark:text-emerald-400";
  const statusLabel =
    project?.status === "research" ? "Research"
    : project?.status === "completed" ? "Completed"
    : project?.status === "prototype" ? "Prototype"
    : project?.status === "building" ? "Building"
    : project?.status === "archived" ? "Archived"
    : "Live";

  if (!project) {
    notFound();
  }

  return (
    <div className="mark-page min-h-screen w-full relative overflow-x-hidden transition-colors duration-300">
      {/* Right Side Blueprint Navigation */}
      <RightNavbar />

      {/* Vertical Lines - Ultra-fine Micro Dots */}
      <div className="mark-workshop-rule absolute top-0 bottom-0 left-[var(--mark-gutter)] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden sm:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />
      <div className="mark-workshop-rule absolute top-0 bottom-0 right-[var(--mark-gutter)] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden sm:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />

      {/* Horizontal Lines - Ultra-fine Micro Dots */}
      <div className="mark-workshop-rule absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
      <div className="mark-workshop-rule absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />

      {/* Ultra-Tiny Solid Nodes */}
      {[
        { top: '22vh', left: 'var(--mark-gutter)' },
        { top: '22vh', right: 'var(--mark-gutter)' },
        { top: 'calc(22vh + 112px)', left: 'var(--mark-gutter)' },
        { top: 'calc(22vh + 112px)', right: 'var(--mark-gutter)' },
      ].map((pos, i) => (
        <div key={i} className="absolute w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] pointer-events-none z-10 hidden sm:block"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            transform: `translate(${pos.right ? '50%' : '-50%'}, -50%)`
          }} />
      ))}

      {/* Cell 1: Dot Matrix Background */}
      <div className="absolute left-[var(--mark-gutter)] right-[var(--mark-gutter)] top-0 h-[22vh] -z-0 pointer-events-auto">
        <FooterBackground />
        <div className="absolute bottom-3 right-2 z-10 pointer-events-auto">
          <CurrentTime />
        </div>
      </div>

      {/* Cell 2: Header with Back Button + Title + Controls */}
      <div className="absolute left-[var(--mark-gutter)] right-[var(--mark-gutter)] top-[22vh] h-[112px] flex items-center px-4 z-50">
        <div className="flex w-full min-w-0 items-center justify-between">
          {/* Left: Back + Title */}
          <div className="flex min-w-0 flex-1 items-center gap-2 pt-7 sm:gap-5 sm:pt-0">
            <Link
              href="/"
              className="group flex items-center justify-center min-w-8 h-8 px-2.5 text-[12px] font-medium shrink-0 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 mark-muted hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              Back
            </Link>
            <div className="flex min-w-0 flex-col justify-center">
              <p className="mark-page-title mb-0.5 text-zinc-900 dark:text-zinc-100">
                {project.title}
              </p>
              <p className="text-[12px] mark-muted font-medium">
                Projects/{project.title}
              </p>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="absolute right-4 top-2 flex shrink-0 items-center justify-end gap-2 sm:static sm:self-start sm:gap-3">
            <CommandMenu />
            <ThemeToggle className="dark:text-zinc-400 hover:dark:text-zinc-300" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main id="main-content" tabIndex={-1} className="ml-[var(--mark-gutter)] mr-[var(--mark-gutter)] pt-[calc(22vh+112px)] pb-16 px-4 flex flex-col z-10 relative">

        {/* Media (Video or Image) right at the top */}
        <div className="w-full aspect-[16/10] relative mt-8 rounded-lg overflow-hidden border border-black/10 dark:border-white/[0.15] shadow-sm bg-zinc-100 dark:bg-[#0a0a0a] z-20">
          {project.video ? (
            // Narrated, so it waits to be played rather than autoplaying muted -
            // a demo reel with the voice-over stripped out is just a slideshow.
            // The still doubles as the poster, so the frame is never empty.
            <video
              src={project.video}
              poster={project.src}
              controls
              preload="metadata"
              playsInline
              aria-label={`${project.title} demo`}
              className="absolute inset-0 h-full w-full object-contain bg-black"
            />
          ) : (
            <ProjectPreview
              projectTitle={project.title}
              src={project.src}
              alt={project.imageTitle}
              fill
              preload
              sizes="(min-width: 848px) 768px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 32px)"
              quality={80}
              className="object-contain"
            />
          )}
        </div>

        {/* Top Dashed Divider (Blueprint system) */}
        <div className="relative mt-8">
          <div className="mark-workshop-rule absolute left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          <div className="absolute left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
          <div className="absolute right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
        </div>

        {/* Action Links Grid */}
        <div className="grid grid-cols-2 items-center justify-between py-4 relative">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <SiGithub aria-hidden="true" className="w-4 h-4" /> Github
            </a>
          ) : <div />}
          
          {/* Vertical Divider 1 */}
          <div className="mark-workshop-rule hidden md:block absolute left-1/2 top-0 bottom-0 w-0 border-l border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />

          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
               Website
            </a>
          ) : <div />}
          
        </div>

        {/* Bottom Dashed Divider */}
        <div className="relative mb-6">
          <div className="mark-workshop-rule absolute left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          <div className="absolute left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
          <div className="absolute right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
        </div>

        {/* Title and Status */}
        <div className="flex items-center justify-between w-full mb-4">
          <h1 className="mark-display text-zinc-900 dark:text-zinc-50">
            {project.title}
          </h1>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {project.status === "live" && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${statusDot}`} />
            </span>
            <span className={`text-[13px] font-medium ${statusText}`}>{statusLabel}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.description}
        </p>

        {project.statusDetail && (
          <p className="mt-3 text-xs mark-muted">{project.statusDetail}</p>
        )}
        {project.problem && (
          <section className="mt-6">
            <h2 className="mb-2 mark-section-title text-zinc-900 dark:text-zinc-50">Problem</h2>
            <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300">{project.problem}</p>
          </section>
        )}
        {project.highlights?.length ? (
          <section className="mt-6">
            <h2 className="mb-2 mark-section-title text-zinc-900 dark:text-zinc-50">Technical highlights</h2>
            <ul className="list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </section>
        ) : null}
        {project.evidence?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">{project.evidence.map((evidence) => <CertificateLink key={evidence.href} {...evidence} />)}</div>
        ) : null}
        {project.caseStudy && (
          <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-200">
            Read the case study 
          </a>
        )}

        {/* Dashed Divider before Stack */}
        <div className="relative mt-8 mb-6">
          <div className="mark-workshop-rule absolute left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          <div className="absolute left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
          <div className="absolute right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="mark-section-title text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">Stack used</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: TechItem, i: number) => {
              const isKey = typeof t === "string";
              const label = isKey ? techNames[t as TechKey] : t.label;
              const Icon = isKey ? iconMap[t as TechKey] : null;

              return (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/5 rounded-md text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                  {Icon && <span aria-hidden="true"><Icon className="w-3.5 h-3.5" /></span>}
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
