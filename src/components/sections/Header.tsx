"use client";

import { LanguageToggle } from "@/components/LanguageToggle";
import { PrimaryCta } from "@/components/PrimaryCta";
import { useLocale } from "@/components/LocaleProvider";
import { siteConfig } from "@/lib/config";

export function Header() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--ink)]/8 bg-[var(--calico)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-2.5 pl-6 sm:gap-3 sm:px-6 sm:py-3 sm:pl-16 md:pl-20">
        <a
          href="#hero"
          className="shrink-0 font-display text-lg font-semibold tracking-tight text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)]"
        >
          Clothbook
          <span className="ml-1.5 hidden text-sm font-normal text-[var(--thread-grey)] min-[400px]:inline">
            Iwe Aso
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-medium text-[var(--ink)] md:flex">
          <a
            href="#how-it-works"
            className="hover:text-[var(--indigo)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)]"
          >
            {t.nav.howItWorks}
          </a>
          <a
            href="#voice-agent"
            className="hover:text-[var(--indigo)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)]"
          >
            {t.nav.voiceAgent}
          </a>
          {siteConfig.waitlistEnabled && (
            <a
              href="#join"
              className="hover:text-[var(--indigo)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)]"
            >
              {t.nav.join}
            </a>
          )}
        </nav>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <LanguageToggle />
          {/* One CTA only; label shortens on mobile so the bar can never
              overflow and push the page sideways. */}
          <PrimaryCta
            label={
              <>
                <span className="sm:hidden">Join</span>
                <span className="hidden sm:inline">Join the waitlist</span>
              </>
            }
            className="!min-h-9 !px-3.5 !py-1.5 !text-sm sm:!min-h-10 sm:!px-4 sm:!py-2"
          />
        </div>
      </div>
    </header>
  );
}
