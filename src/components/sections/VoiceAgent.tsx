"use client";

import { MediaFrame } from "@/components/MediaFrame";
import { PrimaryCta } from "@/components/PrimaryCta";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLocale } from "@/components/LocaleProvider";
import { siteConfig } from "@/lib/config";

export function VoiceAgent() {
  const { t } = useLocale();
  const section = t.voiceAgent;

  return (
    <section
      id="voice-agent"
      className="scroll-mt-20 border-b border-[var(--ink)]/8 bg-[var(--ink)]/[0.03] py-14 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 pl-11 sm:px-6 sm:pl-16 md:pl-20">
        <ScrollReveal>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
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
              <div className="mt-5 space-y-3 text-base leading-relaxed text-[var(--ink)]/85">
                {section.body.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              {siteConfig.waitlistEnabled && (
                <p className="mt-5 rounded-xl border border-[var(--thread-gold)]/40 bg-[var(--thread-gold)]/10 px-4 py-3 text-sm text-[var(--ink)]">
                  {section.limitedNote}
                </p>
              )}
              <div className="mt-6">
                <PrimaryCta />
              </div>
            </div>
            {/* Two voice screens — capture measurements by voice + hear the
                day's summary — layered like a stack of app screens. */}
            <div className="relative mx-auto w-full max-w-sm pb-10 md:max-w-none md:pb-14">
              <MediaFrame
                src="/media/voice-measure.png"
                alt={section.mediaAlt}
                gold
                fit="contain"
                portrait
                className="relative z-10 w-[82%]"
              />
              <MediaFrame
                src="/media/voice-summary.png"
                alt="Clothbook reading the day’s voice summary"
                gold
                fit="contain"
                portrait
                className="absolute bottom-0 right-0 z-20 w-1/2 shadow-xl"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
