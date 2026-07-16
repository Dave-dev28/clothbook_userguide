"use client";

import { MediaFrame } from "@/components/MediaFrame";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusStepper } from "@/components/StatusStepper";
import { useLocale } from "@/components/LocaleProvider";

const STEP_MEDIA: Record<string, string | undefined> = {
  "step-customer": "/media/step-customer.png",
  "step-order": "/media/step-order.png",
  "step-status": "/media/step-status.png",
  "step-whatsapp": "/media/step-whatsapp.png",
  "step-paid": "/media/step-paid.png",
};

export function HowItWorks() {
  const { t } = useLocale();
  const section = t.howItWorks;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-[var(--ink)]/8 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 pl-11 sm:px-6 sm:pl-16 md:pl-20">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-deep)]">
            {section.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            {section.title}
          </h2>
        </ScrollReveal>

        <ol className="mt-12 space-y-16">
          {section.steps.map((step, index) => {
            const reverse = index % 2 === 1;
            return (
              <li key={step.id} id={step.id} className="scroll-mt-24">
                <ScrollReveal>
                  <div
                    className={`grid items-center gap-8 md:grid-cols-2 ${
                      reverse ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <MediaFrame
                      src={STEP_MEDIA[step.id]}
                      alt={step.mediaAlt}
                      label={`Step ${index + 1}`}
                      fit="contain"
                      portrait
                    />
                    <div>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--indigo)] text-sm font-bold text-[var(--calico)]">
                        {index + 1}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--ink)]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[var(--ink)]/85">
                        {step.body}
                      </p>
                      {step.id === "step-status" && (
                        <div className="mt-6">
                          <StatusStepper />
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
