"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { homeSections } from "@/data/homeSections";

export function RightNavbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const links = useMemo(() => homeSections.map((section) => ({ name: section.label, href: `#${section.id}` })), []);

  useEffect(() => {
    // Derived from `links`, so a new section can never be missed the way
    // Navigation follows the ordered homepage section data.
    const ids = links.map((l) => l.href.slice(1));

    // Plain geometry rather than an observer band: a short section can sit
    // entirely inside an IntersectionObserver's dead zone and never register.
    // The active one is simply the last whose top has scrolled past the header.
    const sync = () => {
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current ?? ids[0] ?? null);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [links]);

  // Only render on the homepage where the #hash sections exist
  if (pathname !== "/") return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none hidden xl:block"
      style={{ width: 'calc(100vw - var(--removed-body-scroll-bar-size, 0px))' }}
    >
      <nav aria-label="Portfolio sections" className="absolute top-[22vh] left-[calc(100%-var(--mark-gutter)+24px)] right-4 max-h-[calc(78dvh-24px)] overflow-y-auto pointer-events-auto flex flex-col gap-3 mt-2 py-1">
        <h3 className="text-[10px] font-bold tracking-[0.2em] mark-muted uppercase mb-1">Index</h3>
        {links.map((link) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <Link
              key={link.name}
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className="mark-nav-link flex items-center gap-3 rounded-sm text-[12px] font-medium tracking-[0.05em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden="true" className="mark-nav-indicator h-[2px] w-3 shrink-0 bg-transparent transition-colors duration-150" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
