"use client";

import { MediaFrame } from "@/components/MediaFrame";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLocale } from "@/components/LocaleProvider";

export function DesignStudio() {
  const { t } = useLocale();
  const section = t.designStudio;

  return (
    <section
      id="design-studio"
      className="scroll-mt-20 border-b border-[var(--ink)]/8 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 pl-11 sm:px-6 sm:pl-16 md:pl-20">
        <ScrollReveal>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <MediaFrame
              src="/media/design-studio.png"
              alt={section.mediaAlt}
              label="Design Studio before/after"
              gold
              fit="contain"
              portrait
              className="md:order-1"
            />
            <div className="md:order-2">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--thread-gold)]">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-[var(--thread-gold)]"
                  aria-hidden
                />
                {section.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
                {section.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--ink)]/85">
                {section.body}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
