"use client";

import React, { useRef, useState } from "react";
import { AlertCircle, Check, LoaderCircle } from "lucide-react";
import { contactSubmissionAccepted } from "@/lib/contact-submission";
import { portfolio } from "~/portfolio.config";
import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrentTime } from "@/components/CurrentTime";
import { RightNavbar } from "@/components/RightNavbar";
import DisplacementText from "@/components/DisplacementText";

import Link from "next/link";
import SocialHoverCard from "@/components/pixel-perfect/social-hover-card";
import { StarryNightBanner } from "@/components/StarryNightBanner";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [submitOutcome, setSubmitOutcome] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submitting = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current || !portfolio.contactFormEnabled) return;
    submitting.current = true;
    setIsSubmitting(true);
    setSubmitOutcome("sending");
    setSubmitStatus("Sending message…");

    const form = e.currentTarget;
    const data = new FormData(form);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${portfolio.email}`,
        {
          method: "POST",
          body: data,
          signal: controller.signal,
          headers: { Accept: "application/json" },
        }
      );

      const payload: unknown = await response.json().catch(() => null);
      if (contactSubmissionAccepted(response.ok, payload)) {
        form.reset();
        setFormData({ name: "", email: "", message: "" });
        setSubmitOutcome("success");
        setSubmitStatus("Message sent.");
      } else {
        setSubmitOutcome("error");
        setSubmitStatus("Message could not be sent. Please try again or contact me by email.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitOutcome("error");
        setSubmitStatus("Message could not be sent. Please try again or contact me by email.");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mark-page min-h-screen w-full relative overflow-x-hidden transition-colors duration-300">
      <style dangerouslySetInnerHTML={{
        __html: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-text-fill-color: var(--autofill-text) !important;
          -webkit-box-shadow: 0 0 0px 1000px var(--autofill-bg) inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        :root {
          --autofill-bg: white;
          --autofill-text: #171717;
        }
        .dark {
          --autofill-bg: black;
          --autofill-text: #fafafa;
        }
      `}} />
      <RightNavbar />

      {/* Blueprint Vertical Lines */}
      <div className="mark-workshop-rule absolute top-0 bottom-0 left-[var(--mark-gutter)] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden sm:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />
      <div className="mark-workshop-rule absolute top-0 bottom-0 right-[var(--mark-gutter)] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden sm:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />

      {/* Blueprint Horizontal Lines */}
      <div className="mark-workshop-rule absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
      <div className="mark-workshop-rule absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />

      {/* Grid Intersection Nodes */}
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
      {/* Cell 2: Header with Back Button + Title + Controls */}
      <div className="absolute left-[var(--mark-gutter)] right-[var(--mark-gutter)] top-[22vh] h-[112px] flex items-center px-4 z-50">
        <div className="flex w-full min-w-0 items-center justify-between">
          {/* Left: Back + Title */}
          <div className="flex min-w-0 flex-1 items-center gap-2 pt-7 sm:gap-5 sm:pt-0">
            <Link
              href="/"
              className="group flex items-center justify-center min-w-8 h-8 px-2.5 text-[12px] font-medium shrink-0 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 mark-muted hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              Back
            </Link>
            <div className="flex min-w-0 flex-col justify-center">
              <h1 className="mark-page-title mb-0.5 text-zinc-900 dark:text-zinc-100">
                Contact
              </h1>
              <p className="text-[12px] mark-muted">
                Open for meaningful work.
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
      <main id="main-content" tabIndex={-1} className="ml-[var(--mark-gutter)] mr-[var(--mark-gutter)] pt-[calc(22vh+112px)] pb-0 px-4 flex flex-col z-10 relative">
        {/* Form */}
        {portfolio.contactFormEnabled ? <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="mt-12 -mx-4 space-y-10">
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_subject" value="New Submission from Portfolio" />
          <input type="text" name="_honey" style={{ display: "none" }} />

          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-[11px] font-bold tracking-[0.15em] mark-muted uppercase ml-4">
              Full Name
            </label>
            <input
              required
              readOnly={isSubmitting}
              id="contact-name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Tyler Durden"
              className="w-full bg-transparent border-b border-zinc-500 dark:border-zinc-500 py-3 px-4 text-[14px] text-zinc-900 dark:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus:border-[var(--mark-interaction)] transition-colors placeholder:text-zinc-600 dark:placeholder:text-zinc-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-[11px] font-bold tracking-[0.15em] mark-muted uppercase ml-4">
              Email Address
            </label>
            <input
              required
              readOnly={isSubmitting}
              type="email"
              id="contact-email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="tyler@projectmayhem.com"
              className="w-full bg-transparent border-b border-zinc-500 dark:border-zinc-500 py-3 px-4 text-[14px] text-zinc-900 dark:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus:border-[var(--mark-interaction)] transition-colors placeholder:text-zinc-600 dark:placeholder:text-zinc-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-[11px] font-bold tracking-[0.15em] mark-muted uppercase ml-4">
              Message
            </label>
            <textarea
              required
              readOnly={isSubmitting}
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="You're crazy good, never change."
              className="w-full bg-transparent border-b border-zinc-500 dark:border-zinc-500 py-3 px-4 text-[14px] text-zinc-900 dark:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus:border-[var(--mark-interaction)] transition-colors placeholder:text-zinc-600 dark:placeholder:text-zinc-400 resize-none"
            />
          </div>

          {/* FlightButton with airplane animation - wrapped in premium border */}
          <div className="flex justify-center w-full pt-4">
            <div className="relative group">
              <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
              <button type="submit" disabled={isSubmitting} className="mark-press mark-surface mark-control inline-flex min-h-10 min-w-[132px] items-center justify-center gap-2 rounded-[6px] border px-4 py-2 text-[13px] font-medium disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting && <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />}{isSubmitting ? "Sending…" : "Send Message"}</button>
            </div>
          </div>
          <p role="status" aria-atomic="true" data-submit-outcome={submitOutcome} className="mark-submit-feedback px-4 text-[13px] mark-muted">
            {submitOutcome === "success" && <Check aria-hidden="true" className="size-4 shrink-0 mark-reactor-text" />}
            {submitOutcome === "error" && <AlertCircle aria-hidden="true" className="size-4 shrink-0 mark-error-text" />}
            {submitStatus}
          </p>
        </form> : (
          <div className="py-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>For now, please contact me directly by email.</p>
            <a className="mt-3 inline-block break-all font-medium underline underline-offset-4" href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
          </div>
        )}

        {/* Separator */}
        <div className="relative mt-16 mb-0">
          <div className="mark-workshop-rule absolute left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          {/* Intersection nodes */}
          <div className="absolute -left-8 md:-left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
          <div className="absolute -right-8 md:-right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
        </div>

        {/* Footer - Socials + Displacement Text */}
        <div className="pt-2 -mt-4 pb-5 px-4 flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden">
          <div className="flex-shrink-0">
            <p className="text-[14px] mark-muted mb-2">Find me on my <span className="font-medium text-zinc-800 dark:text-zinc-200">socials</span></p>
            <div className="flex flex-wrap gap-1.5">
              <SocialHoverCard socialName="GitHub">
                <a href={`https://github.com/${portfolio.handles.github}`} target="_blank" className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/40 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md text-[12px] font-medium text-zinc-600 dark:text-zinc-300 transition-colors border border-zinc-200/50 dark:border-zinc-700/50">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  GitHub
                </a>
              </SocialHoverCard>
              {portfolio.handles.x && <SocialHoverCard socialName="Twitter">
                <a href={`https://x.com/${portfolio.handles.x}`} target="_blank" className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/40 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md text-[12px] font-medium text-zinc-600 dark:text-zinc-300 transition-colors border border-zinc-200/50 dark:border-zinc-700/50">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                    <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4l-6.768 6.768" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  Twitter
                </a>
              </SocialHoverCard>}
              <SocialHoverCard socialName="LinkedIn">
                <a href={`https://www.linkedin.com/in/${portfolio.handles.linkedin}/`} target="_blank" className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/40 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md text-[12px] font-medium text-zinc-600 dark:text-zinc-300 transition-colors border border-zinc-200/50 dark:border-zinc-700/50">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  LinkedIn
                </a>
              </SocialHoverCard>
            </div>
          </div>

          <div className="flex-grow h-[160px] relative flex items-center justify-end -mr-56 mt-2">
            <DisplacementText
              text={portfolio.name.toUpperCase()}
              fontSize={300}
              className="h-full w-full"
              lightColor="#171717"
              darkColor="#e5e5e5"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
