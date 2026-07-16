"use client";

import { useLocale } from "@/components/LocaleProvider";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer
      id="footer"
      className="relative border-t border-[var(--ink)]/8 py-12 sm:py-14"
    >
      <div className="mx-auto max-w-5xl px-4 pl-11 sm:px-6 sm:pl-16 md:pl-20">
        {/* Thread tie-off knot */}
        <div className="mb-8 flex items-center gap-3" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 28 28" className="shrink-0">
            <circle
              cx="14"
              cy="14"
              r="10"
              fill="var(--calico)"
              stroke="var(--indigo)"
              strokeWidth="2"
            />
            <path
              d="M8 14 Q14 8 20 14 Q14 20 8 14"
              fill="none"
              stroke="var(--indigo)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="h-px flex-1 bg-[var(--indigo)]/30" />
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-[var(--ink)]">
              {t.footer.tagline}
            </p>
            <p className="mt-1 text-sm text-[var(--thread-grey)]">
              Your exercise book, upgraded.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[var(--ink)]">
            <a
              href={siteConfig.whatsappUrl}
              className="hover:text-[var(--indigo)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)]"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.footer.whatsapp}
            </a>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="hover:text-[var(--indigo)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)]"
            >
              {t.footer.contact}
            </a>
            {siteConfig.socials.instagram && (
              <a
                href={siteConfig.socials.instagram}
                className="hover:text-[var(--indigo)]"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            )}
            {siteConfig.socials.twitter && (
              <a
                href={siteConfig.socials.twitter}
                className="hover:text-[var(--indigo)]"
                rel="noopener noreferrer"
                target="_blank"
              >
                X
              </a>
            )}
            <a
              href="#hero"
              className="hover:text-[var(--indigo)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)]"
            >
              {t.footer.backToTop}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
