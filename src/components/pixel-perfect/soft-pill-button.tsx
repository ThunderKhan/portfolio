"use client";
import React from "react";
import { cn } from "@/lib/utils";

export type SoftPillVariant = "secondary" | "primary";

interface SoftPillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SoftPillVariant;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

const SoftPillButton = React.forwardRef<HTMLButtonElement, SoftPillButtonProps>(
  ({ className, children, variant = "secondary", as: Comp = "button", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(
          "group relative block rounded-[6px] px-5 py-2.5 text-center text-[13px] font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors motion-safe:duration-150",
          variant === "primary" ? "mark-primary-action" : "border mark-surface mark-control",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

SoftPillButton.displayName = "SoftPillButton";

export default SoftPillButton;
