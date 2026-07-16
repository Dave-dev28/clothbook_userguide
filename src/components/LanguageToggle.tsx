"use client";

import { locales } from "@/content";
import { useLocale } from "@/components/LocaleProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-[var(--thread-grey)]/40 bg-[var(--calico)]/90 p-1 text-sm ${className}`}
      role="group"
      aria-label={t.nav.languageLabel}
    >
      {locales.map((item) => {
        const active = item.code === locale;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1.5 font-medium min-h-9 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)] sm:px-3 ${
              active
                ? "bg-[var(--indigo)] text-[var(--calico)]"
                : "text-[var(--ink)] hover:bg-[var(--ink)]/5"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
