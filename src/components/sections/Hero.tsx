"use client";

import { HeroVideo } from "@/components/HeroVideo";
import { PrimaryCta } from "@/components/PrimaryCta";
import { useLocale } from "@/components/LocaleProvider";

export function Hero() {
  const { t } = useLocale();

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden border-b border-[var(--ink)]/8"
    >
      {/*
        Clip sits at the very top, shown at its natural 16:9 so the whole
        scene (tailor, sewing machine, fabrics) is visible — no zoom-crop.
        Real asset: /public/media/hero.mp4  (<2.5MB, h.264, <15s)
      */}
      <div className="relative w-full">
        <HeroVideo variant="bleed" ariaLabel={t.hero.videoAria} />

        {/* Top scrim keeps the translucent header legible over bright footage */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-[var(--ink)]/35 to-transparent"
        />
        {/* Bottom edge dissolves into the calico page background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-28 bg-gradient-to-b from-transparent to-[var(--calico)]"
        />
      </div>

      {/* Text + CTAs sit just below the clip, tucked slightly under its fade */}
      <div className="relative z-20 mx-auto -mt-6 w-full max-w-5xl px-4 pb-12 pl-11 sm:-mt-8 sm:px-6 sm:pb-16 sm:pl-16 md:pb-20 md:pl-20">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--brand-deep)]">
            Clothbook · Iwe Aso
          </p>
          <h1 className="font-display text-[2rem] font-semibold leading-[1.15] tracking-tight text-[var(--ink)] min-[360px]:text-[2.5rem] sm:text-5xl md:text-6xl">
            {t.hero.headline}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--ink)]/85 sm:mt-5 sm:text-lg">
            {t.hero.subhead}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <PrimaryCta />
            <a
              href="#how-it-works"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[var(--brand)] px-6 py-3 text-base font-semibold text-[var(--brand-deep)] transition-colors hover:bg-[var(--brand)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
