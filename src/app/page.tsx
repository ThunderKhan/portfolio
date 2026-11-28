import { homeMetadata } from "@/lib/seo";
import { profileStructuredData } from "@/lib/structured-data";
import { JsonLd } from "@/components/JsonLd";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubGraph } from "@/components/GithubGraph";
import { CurrentTime } from "@/components/CurrentTime";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ExperienceList } from "@/components/ExperienceList";
import { BlogList } from "@/components/BlogList";
import { Hackathons } from "@/components/Hackathons";
import { OpenSourceWork } from "@/components/OpenSourceWork";
import { Education } from "@/components/Education";
import { Certifications } from "@/components/Certifications";
import { EventHighlights } from "@/components/EventHighlights";
import { SpotifyCard } from "@/components/SpotifyCard";
import { PortfolioFooter } from "@/components/PortfolioFooter";
import { FallingSilhouette } from "@/components/FallingSilhouette";
import closingStyles from "@/components/closing.module.css";
import { RightNavbar } from "@/components/RightNavbar";
import { CommandMenu } from "@/components/command-menu";
import Link from "next/link";
import { bookingLink } from "@/data/links";
import { portfolio } from "~/portfolio.config";
import { CleanHash } from "@/components/CleanHash";
import { skillGroups } from "@/data/skillsData";
import { getSocialProfiles } from "@/lib/stats/socials";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import { FlipCoverButton } from "@/components/pixel-perfect/flip-cover-button";
import SocialHoverCard from "@/components/pixel-perfect/social-hover-card";
import { StarryNightBanner } from "@/components/StarryNightBanner";
import { MeshDriftBackground } from "@/components/MeshDriftBackground";
import Image from "next/image";
import { SiLeetcode } from "react-icons/si";


export const metadata = homeMetadata;

export default async function Home() {
  const socialProfiles = await getSocialProfiles();

  return (
    <div className="mark-home min-h-screen w-full relative overflow-x-hidden transition-colors duration-300">
      <JsonLd data={profileStructuredData()} />
      <MeshDriftBackground />
      <CleanHash />

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

      {/* Cell 1: Banner */}
      <div className="absolute left-[var(--mark-gutter)] right-[var(--mark-gutter)] top-0 h-[22vh] -z-0 pointer-events-auto overflow-hidden bg-white dark:bg-black shadow-[0_4px_12px_rgba(2,6,23,0.04)] dark:shadow-[0_4px_12px_rgba(2,6,23,0.10)]">
        <StarryNightBanner />
        <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none z-[5] bg-gradient-to-t from-white/90 to-transparent dark:from-black/50 dark:to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-20 bg-gradient-to-r from-white/90 to-transparent dark:from-black/40 dark:to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-20 bg-gradient-to-l from-white/90 to-transparent dark:from-black/40 dark:to-transparent" />
        <div className="absolute bottom-3 right-2 z-30 pointer-events-auto rounded-md bg-black/85 px-2 py-1">
          <CurrentTime />
        </div>
      </div>

      {/* Cell 2: Profile Section - 112px height with preserved avatar spacing */}
      <div className="absolute left-[var(--mark-gutter)] right-[var(--mark-gutter)] top-[22vh] h-[112px] flex items-center px-4 z-50">
        <div className="flex w-full items-center justify-between">

          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <div className="relative shrink-0">
              {/* The inner image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[3px] sm:rounded-[5px] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={portfolio.heroAvatar}
                  alt=""
                  width={240}
                  height={240}
                  quality={90}
                  sizes="(min-width: 640px) 80px, 64px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center pt-8">
              <h1 className="mark-display mb-0.5 text-zinc-900 dark:text-zinc-100">
                {portfolio.name}
              </h1>
              <p className="text-[13px] sm:text-[14px] mark-muted">{portfolio.location}</p>
            </div>
          </div>

          <div className="absolute right-4 top-2 flex items-start justify-end gap-2 sm:gap-3">
            <CommandMenu />
            <ThemeToggle className="dark:text-zinc-400 hover:dark:text-zinc-300" />
          </div>

        </div>
      </div>

      {/* Flowing Content Section */}
      <main id="main-content" tabIndex={-1} className="ml-[var(--mark-gutter)] mr-[var(--mark-gutter)] pt-[calc(22vh+112px)] pb-0 px-4 flex flex-col z-10 relative min-h-screen">
        <p className="text-base leading-[1.55] text-zinc-600 dark:text-zinc-300 mt-4">
          {portfolio.intro}
        </p>

        <ul className="list-disc space-y-1 text-base leading-[1.55] text-zinc-600 dark:text-zinc-300 mt-4 pl-5">
          {portfolio.about.map((line) => <li key={line}>{line}</li>)}
        </ul>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {bookingLink && <FlipCoverButton href={bookingLink} label="Book an intro call" />}
          <Link href="/contact">
            <SoftPillButton
              as="span"
              variant="primary"
              className="px-3 py-1.5 !text-[12px]"
            >
              <div className="flex items-center gap-1.5">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Send an email
              </div>
            </SoftPillButton>
          </Link>
        </div>

        {/* Socials */}
        <div id="contact" className="mt-6 scroll-mt-24">
          <h2 className="text-[14px] mark-muted mb-2">Here are my <span className="font-medium text-zinc-800 dark:text-zinc-200">socials</span></h2>
          <div className="flex flex-wrap gap-1.5">
            {[
              { name: 'GitHub', href: `https://github.com/${portfolio.handles.github}`, icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" fill="none"></path> },
              { name: 'Twitter', configured: Boolean(portfolio.handles.x), href: `https://x.com/${portfolio.handles.x}`, icon: <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M20 4l-6.768 6.768" stroke="currentColor" strokeWidth="2" fill="none" /> },
              { name: 'LinkedIn', href: `https://www.linkedin.com/in/${portfolio.handles.linkedin}/`, icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" fill="none"></path> },
              { name: 'LeetCode', href: `https://leetcode.com/u/${portfolio.handles.leetcode}` },
            ].filter(social => social.configured !== false).map((social, i) => (
              <SocialHoverCard key={i} socialName={social.name} profile={socialProfiles[social.name]}>
                <SoftPillButton
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="px-3 py-1.5 !text-[12px]"
                >
                  <div className="flex items-center gap-1.5 ">
                    {social.name === 'LeetCode' ? (
                      <SiLeetcode className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                        {social.icon}
                      </svg>
                    )}
                    {social.name}
                  </div>
                </SoftPillButton>
              </SocialHoverCard>
            ))}

            <SoftPillButton
              as="a"
              href={portfolio.resume}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="px-3 py-1.5 !text-[12px]"
            >
              <div className="flex items-center gap-1.5 ">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Résumé
              </div>
            </SoftPillButton>
          </div>
        </div>


        {/* Projects */}
        <div id="projects" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          <div className="py-2 relative mt-1">
            <h2 className="mark-section-title text-zinc-900 dark:text-zinc-100">Selected projects</h2>

            {/* Horizontal line below Projects heading */}
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 left-1/2 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          {/* Grid Container */}
          <div className="relative pt-6 pb-12 px-4">
            {/* Center Vertical Line */}
            <div className="mark-workshop-rule absolute top-0 bottom-6 left-1/2 w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none -translate-x-1/2 hidden md:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />

            <ProjectsGrid />

            {/* Bottom Horizontal Line */}
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            {/* Center dot removed to prevent crossing the outline gap of the View All button */}
          </div>

          {/* View All Button */}
          <div className="flex justify-center -mt-[19px] pb-0 relative z-20">
            <Link href="/projects" className="relative group block">
              <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
              <div className="relative flex items-center gap-1.5 px-4 py-2 mark-surface text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                View All
                
              </div>
            </Link>
          </div>
        </div>


        {/* Experiences */}
        <div id="experience" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative">
            <h2 className="mark-section-title text-zinc-900 dark:text-zinc-100">Experience</h2>
            {/* Bottom full-width line */}
            <div
              className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none"
              style={{
                maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
                WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
              }}
            />
            {/* Bottom Line Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <div className="block mt-0">
            <ExperienceList />

            {/* View All Button */}
            <div className="py-4 px-4 -mx-4 flex justify-center relative hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer rounded-b-lg mt-0">
              <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              {/* Bottom Line Intersections */}
              <div className="absolute bottom-0 left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <Link href="/experience" className="relative group block mt-0">
                <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
                <div className="relative flex items-center gap-1.5 px-4 py-2 mark-surface text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                  View All
                  
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Open source and community */}
        <section id="opensource" className="mt-6 scroll-mt-24"><OpenSourceWork /></section>

        {/* Hackathons */}
        <div id="hackathons" className="mt-6 flex flex-col relative z-10 scroll-mt-24">

          {/* Top full-width line */}
          <div
            className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="mark-section-title text-zinc-900 dark:text-zinc-100">Hackathons</h2>

            {/* Horizontal line below heading */}
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <Hackathons />
        </div>

        {/* Blogs */}
        {portfolio.sections.blog && (
          <div id="blogs" className="mt-6 flex flex-col relative scroll-mt-24">
            {/* Top full-width line */}
            <div
              className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
              style={{
                maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
                WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
              }}
            />
            {/* Top Line Intersections */}
            <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

            <div className="py-2 relative mt-1">
              <h2 className="mark-section-title text-zinc-900 dark:text-zinc-100">Technical writing</h2>

              {/* Horizontal line below Blogs heading */}
              <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              {/* Intersections */}
              <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            </div>

            <BlogList limit={3} />

            {/* View all articles Button */}
            <div className="py-4 px-4 -mx-4 flex justify-center relative hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer rounded-b-lg mt-0">
              <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              {/* Bottom Line Intersections */}
              <div className="absolute bottom-0 left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />

              <Link href="/blogs" className="relative group block mt-0">
                <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
                <div className="relative flex items-center gap-1.5 px-4 py-2 mark-surface text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                  Read More
                  
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Skills */}
        <div id="skills" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="mark-section-title text-zinc-900 dark:text-zinc-100">Skills & Technologies</h2>

            {/* Horizontal line below Skills heading */}
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <div className="relative flex flex-col gap-5 pt-6 pb-2">
            {skillGroups.map((group) => (
              <div key={group.group}>
                <p className="font-mono text-[10px] font-medium uppercase tracking-wider mark-muted">
                  {group.group}
                </p>
                {/* No `grow` here: it stretched the last row's chips across the
                    full width, so Git and Github read as giant odd buttons. */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const SkillIcon = skill.icon;

                    return (
                      <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 mark-surface mark-skill border rounded-[6px] transition-colors duration-200 cursor-default">
                        <SkillIcon aria-hidden="true" className="mark-skill-icon h-3.5 w-3.5 shrink-0 text-zinc-500 opacity-80" />
                        <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Education */}
        <div id="education" className="mt-6 flex flex-col relative z-10 scroll-mt-24">

          {/* Top full-width line */}
          <div
            className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="mark-section-title text-zinc-900 dark:text-zinc-100">Education</h2>

            {/* Horizontal line below heading */}
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <Education />
        </div>

        {/* Certifications */}
        <div id="certifications" className="mt-6 flex flex-col relative z-10 scroll-mt-24">

          {/* Top full-width line */}
          <div
            className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="mark-section-title text-zinc-900 dark:text-zinc-100">Certifications</h2>

            {/* Horizontal line below heading */}
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <Certifications />
        </div>

        {/* Github Graph */}
        <GithubGraph />


        {/* DSA & Competitive Programming */}
        <div id="dsa" className="mt-6 flex flex-col relative z-10 scroll-mt-24">

          {/* Top full-width line */}
          <div
            className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="mark-section-title text-zinc-900 dark:text-zinc-100">Problem solving</h2>

            {/* Horizontal line below heading */}
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <div className="py-4 text-sm text-zinc-600 dark:text-zinc-300">
            <p><span className="font-mono font-semibold mark-gold-text">{socialProfiles.LeetCode?.stats[0]?.value ?? portfolio.publishedLeetCodeSolved}</span> LeetCode problems solved <span className="text-xs mark-muted">({socialProfiles.LeetCode?.stats[0]?.label === "Solved" ? "live account data" : "last published or cached count"}).</span></p>
            <a href="https://github.com/ThunderKhan/LeetCode-Solutions" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs underline decoration-dotted underline-offset-4">Solution archive</a>
          </div>
        </div>


        <section id="highlights" aria-labelledby="highlights-heading" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          <div className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          <div className="py-2 relative mt-1">
            <h2 id="highlights-heading" className="mark-section-title text-zinc-900 dark:text-zinc-100">Highlights</h2>
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          </div>
          <div className="pt-4 pb-2">
            <EventHighlights />
          </div>
        </section>

        <section id="music" aria-labelledby="music-heading" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          <div className="mark-workshop-rule absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          <div className="py-2 relative mt-1">
            <h2 id="music-heading" className="mark-section-title text-zinc-900 dark:text-zinc-100">Music</h2>
            <div className="mark-workshop-rule absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          </div>
          <div className="pt-4 pb-2">
            <SpotifyCard />
          </div>
        </section>

        {/* Closing motto */}
        <div className={closingStyles.motto}>
          <p className="relative z-10 max-w-[560px] text-[20px] sm:text-[26px] font-medium text-center leading-[1.3] mark-gold-text italic">
            {portfolio.motto[0]}<br />
            {portfolio.motto[1]}
          </p>
          <FallingSilhouette />
        </div>
      </main>

      <PortfolioFooter />
    </div>
  );
}
