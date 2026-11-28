"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { homeSections } from "@/data/homeSections";

export function RightNavbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  const links = useMemo(() => homeSections.map((section) => ({ name: section.label, href: `#${section.id}` })), []);

  useEffect(() => {
    // Derived from `links`, so a new section can never be missed the way
    // Navigation follows the ordered homepage section data.
    if (pathname !== "/") return;
    const ids = links.map((l) => l.href.slice(1));
    let frame = 0;

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

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; sync(); });
    };
    const resize = new ResizeObserver(schedule);
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) resize.observe(section);
    }
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [links, pathname]);

  useEffect(() => {
    const nav = navRef.current;
    const marker = markerRef.current;
    if (!nav || !marker) return;
    const update = () => {
      const current = nav.querySelector<HTMLElement>('[aria-current="location"]');
      if (!current || !nav.clientWidth) {
        marker.removeAttribute("data-ready");
        return;
      }
      const bounds = current.getBoundingClientRect();
      const y = bounds.top - nav.getBoundingClientRect().top + nav.scrollTop + bounds.height / 2 - 1;
      marker.style.transform = "translateY(" + y + "px)";
      marker.dataset.ready = "true";
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(nav);
    nav.querySelectorAll("a, h3").forEach(el => resize.observe(el));
    return () => resize.disconnect();
  }, [activeSection, pathname]);

  // Only render on the homepage where the #hash sections exist
  if (pathname !== "/") return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none hidden xl:block"
      style={{ width: 'calc(100vw - var(--removed-body-scroll-bar-size, 0px))' }}
    >
      <nav ref={navRef} aria-label="Portfolio sections" className="absolute top-[22vh] left-[calc(100%-var(--mark-gutter)+24px)] right-4 max-h-[calc(78dvh-24px)] overflow-y-auto pointer-events-auto flex flex-col gap-3 mt-2 py-1">
        <h3 className="text-[10px] font-bold tracking-[0.2em] mark-muted uppercase mb-1">Index</h3>
        <span ref={markerRef} aria-hidden="true" className="mark-nav-glider" />
        {links.map((link) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <Link
              key={link.name}
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className="mark-nav-link flex items-center gap-3 rounded-sm text-[12px] font-medium tracking-[0.05em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden="true" className="h-[2px] w-3 shrink-0" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
