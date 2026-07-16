"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "card" | "bleed";

/**
 * Hero clip: poster + gradient render immediately.
 * Video sources attach only when near viewport so FCP/LCP are never blocked.
 *
 * - "card"  → rounded, bordered media block (legacy side-by-side layout)
 * - "bleed" → fills its parent edge-to-edge as a cinematic background; the
 *             parent owns the fade + overlaid content.
 */
export function HeroVideo({
  ariaLabel,
  variant = "card",
}: {
  ariaLabel: string;
  variant?: Variant;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Idle or near-viewport: start loading real sources
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    io.observe(el);

    // Also allow idle callback as a soft fallback if IntersectionObserver misses
    let idleId: number | undefined;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => setShouldLoad(true), {
        timeout: 4000,
      });
    }

    return () => {
      io.disconnect();
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const v = videoRef.current;
    if (!v) return;
    // Explicit load + play after sources are in the DOM
    v.load();
    const play = v.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {
        // Autoplay may be blocked; poster remains visible
      });
    }
  }, [shouldLoad]);

  const bleed = variant === "bleed";

  return (
    <div
      ref={wrapRef}
      className={
        bleed
          ? "relative w-full bg-[var(--ink)]"
          : "relative overflow-hidden rounded-2xl border border-[var(--ink)]/10 bg-[var(--ink)] shadow-lg"
      }
    >
      <video
        ref={videoRef}
        className={
          bleed
            ? "relative z-[1] block aspect-video w-full object-cover"
            : "relative z-[1] aspect-[4/5] w-full object-cover sm:aspect-video"
        }
        muted
        loop
        playsInline
        preload="none"
        aria-label={ariaLabel}
      >
        {shouldLoad && <source src="/media/hero.mp4" type="video/mp4" />}
      </video>

      {bleed ? (
        // Base tint only — the Hero owns the calico fade + text scrim so the
        // image reads as sinking into the page background.
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[var(--ink)]/10"
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-[2] flex items-end bg-gradient-to-t from-[var(--ink)]/70 via-[var(--indigo)]/20 to-[var(--calico)]/10 p-4"
          aria-hidden
        >
          <span className="rounded-full bg-[var(--calico)]/95 px-3 py-1 text-xs font-medium text-[var(--ink)]">
            Real shop · real phone
          </span>
        </div>
      )}
    </div>
  );
}
