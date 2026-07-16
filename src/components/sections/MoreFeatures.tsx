"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { useLocale } from "@/components/LocaleProvider";

export function MoreFeatures() {
  const { t } = useLocale();
  const section = t.more;

  return (
    <section
      id="more"
      className="scroll-mt-20 border-b border-[var(--ink)]/8 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-5xl px-4 pl-11 sm:px-6 sm:pl-16 md:pl-20">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--thread-grey)]">
            {section.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
            {section.title}
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {section.cards.map((card) => (
            <ScrollReveal key={card.title}>
              <article className="rounded-2xl border border-dashed border-[var(--ink)]/15 bg-transparent p-5">
                <h3 className="text-base font-semibold text-[var(--ink)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--thread-grey)]">
                  {card.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
