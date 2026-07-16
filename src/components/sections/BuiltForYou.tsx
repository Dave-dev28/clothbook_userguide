"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { useLocale } from "@/components/LocaleProvider";

const ICONS = ["📱", "📶", "🗣", "⚡"];

export function BuiltForYou() {
  const { t } = useLocale();
  const section = t.builtForYou;

  return (
    <section
      id="built-for-you"
      className="scroll-mt-20 border-b border-[var(--ink)]/8 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 pl-11 sm:px-6 sm:pl-16 md:pl-20">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-deep)]">
            {section.eyebrow}
          </p>
          <h2 className="mt-2 max-w-lg font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            {section.title}
          </h2>
        </ScrollReveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {section.points.map((point, i) => (
            <ScrollReveal key={point.title}>
              <li className="h-full rounded-2xl border border-[var(--ink)]/10 bg-[var(--calico-raised)] p-5 sm:p-6">
                <span className="text-2xl" aria-hidden>
                  {ICONS[i] ?? "•"}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[var(--ink)]">
                  {point.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--ink)]/80">
                  {point.body}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
