"use client";

import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import { useLocale } from "@/components/LocaleProvider";

type Variant = "solid" | "outline" | "ghost";

interface PrimaryCtaProps {
  className?: string;
  variant?: Variant;
  /** Override scroll target when waitlist is on (default #join) */
  waitlistHref?: string;
  /** Override the button text (e.g. a short "Join" for the compact header) */
  label?: ReactNode;
}

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] min-h-12";

const variants: Record<Variant, string> = {
  solid:
    "bg-[var(--brand)] text-[var(--calico)] shadow-sm shadow-[var(--brand)]/30 hover:bg-[var(--brand-deep)]",
  outline:
    "border-2 border-[var(--brand)] text-[var(--brand-deep)] hover:bg-[var(--brand)]/10",
  ghost: "text-[var(--brand-deep)] underline-offset-4 hover:underline",
};

/**
 * Single swappable CTA: waitlist vs open app.
 * Flip siteConfig.waitlistEnabled when limited rollout ends.
 */
export function PrimaryCta({
  className = "",
  variant = "solid",
  waitlistHref = "#join",
  label,
}: PrimaryCtaProps) {
  const { t } = useLocale();

  if (siteConfig.waitlistEnabled) {
    return (
      <a
        href={waitlistHref}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {label ?? t.hero.primaryCta}
      </a>
    );
  }

  return (
    <a
      href={siteConfig.appUrl}
      className={`${base} ${variants[variant]} ${className}`}
      rel="noopener noreferrer"
    >
      {label ?? t.hero.primaryCtaApp}
    </a>
  );
}
