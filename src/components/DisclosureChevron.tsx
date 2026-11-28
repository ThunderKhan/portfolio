/** Disclosure only: a down-facing chevron flips up when its content is open.
 * Native details uses its existing group-open state; buttons pass their state. */
export function DisclosureChevron({ open }: { open?: boolean }) {
  return (
    <svg
      data-disclosure-chevron
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ml-2 size-4 shrink-0 mark-muted motion-safe:transition-transform motion-safe:duration-150 ${open === undefined ? "group-open:rotate-180" : open ? "rotate-180" : "rotate-0"}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
