"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Signature scroll spine: a real running-stitch that sews itself down the page
 * as you scroll. Individual stitches (not a continuous stroke) are revealed
 * top-to-bottom by a clip mask, a needle rides the leading point, and French
 * knots land at each section anchor. Gold thread through the premium sections.
 *
 * Pure SVG — no WebGL — so it stays smooth on low-end Android.
 */
const SECTION_IDS = [
  "hero",
  "how-it-works",
  "voice-agent",
  "design-studio",
  "built-for-you",
  "more",
  "join",
  "footer",
] as const;

const GOLD_SECTIONS = new Set(["voice-agent", "design-studio"]);

export function ThreadLine() {
  const reduced = usePrefersReducedMotion();
  const clipId = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lead, setLead] = useState<{ x: number; y: number; angle: number } | null>(
    null,
  );
  const [knots, setKnots] = useState<
    { y: number; gold: boolean; id: string; x: number }[]
  >([]);
  const [pathD, setPathD] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [goldRange, setGoldRange] = useState({ start: 0, end: 0 });

  const lastDims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const measure = () => {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      const vw = window.innerWidth;

      // Ignore the small height wobble from the mobile URL bar collapsing —
      // re-measuring on every scroll pixel is what made the page feel loose.
      const prev = lastDims.current;
      if (prev.w === vw && Math.abs(prev.h - docHeight) < 120) return;
      lastDims.current = { w: vw, h: docHeight };

      setHeight(docHeight);
      setWidth(vw);

      const isMobile = vw < 768;
      const x = isMobile ? 18 : Math.min(48, window.innerWidth * 0.06);
      const wobble = isMobile ? 4 : 10;

      const segments: string[] = [`M ${x} 0`];
      const steps = Math.max(12, Math.floor(docHeight / 180));
      for (let i = 1; i <= steps; i++) {
        const y = (docHeight * i) / steps;
        const dx =
          Math.sin(i * 1.7) * wobble + Math.cos(i * 0.9) * (wobble * 0.4);
        const cx = x + dx;
        const midY = y - docHeight / steps / 2;
        const midX =
          x +
          Math.sin(i * 2.1) * wobble * 0.8 +
          Math.cos(i * 1.3) * (wobble * 0.3);
        segments.push(`Q ${midX} ${midY} ${cx} ${y}`);
      }
      setPathD(segments.join(" "));

      const nextKnots: { y: number; gold: boolean; id: string; x: number }[] =
        [];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const y = rect.top + window.scrollY + 24;
        nextKnots.push({ y, gold: GOLD_SECTIONS.has(id), id, x });
      }
      setKnots(nextKnots);

      const voice = document.getElementById("voice-agent");
      const studio = document.getElementById("design-studio");
      if (voice && studio) {
        setGoldRange({
          start: voice.getBoundingClientRect().top + window.scrollY,
          end: studio.getBoundingClientRect().bottom + window.scrollY,
        });
      }
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    const t = window.setTimeout(measure, 400);
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.clearTimeout(t);
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!pathRef.current) return;
    setPathLength(pathRef.current.getTotalLength());
  }, [pathD]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      setProgress(p);

      // Needle position = point on the path at the leading edge of the stitching
      const path = pathRef.current;
      if (path && pathLength > 0) {
        const len = pathLength * p;
        const pt = path.getPointAtLength(len);
        const ahead = path.getPointAtLength(Math.min(pathLength, len + 6));
        const angle =
          (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
        setLead({ x: pt.x, y: pt.y, angle });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathLength]);

  if (!pathD || height === 0) return null;

  const drawnY = progress * height;
  const revealH = reduced ? height : drawnY;
  const inGoldZone =
    drawnY >= goldRange.start &&
    drawnY <= goldRange.end &&
    goldRange.end > goldRange.start;

  const strokeColor = inGoldZone ? "var(--thread-gold)" : "var(--indigo)";
  const showNeedle = !reduced && progress > 0.004 && progress < 0.996 && lead;

  return (
    <div
      className="thread-live pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden"
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height={height}
        className="absolute left-0 top-0"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={`reveal-${clipId}`}>
            <rect x={0} y={0} width={width || 4000} height={revealH} />
          </clipPath>
        </defs>

        {/* Faint continuous guide — the fabric crease the stitches follow */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--thread-grey)"
          strokeOpacity={0.22}
          strokeWidth={1.25}
          strokeLinecap="round"
        />

        {/* Running stitches, revealed top-to-bottom by the clip rect */}
        <g clipPath={`url(#reveal-${clipId})`}>
          {/* soft shadow gives the thread a little roundness */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--ink)"
            strokeOpacity={0.14}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="9 6"
            transform="translate(0.6 1)"
          />
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="9 6"
            style={{ transition: reduced ? "none" : "stroke 0.3s ease" }}
          />
        </g>

        {/* French-knot markers at each section anchor */}
        {knots.map((knot) => {
          const revealed =
            reduced || drawnY >= knot.y - 40 || progress > 0.98;
          return (
            <g
              key={knot.id}
              opacity={revealed ? 1 : 0}
              style={{ transition: reduced ? "none" : "opacity 0.35s ease" }}
            >
              <KnotMark cx={knot.x} cy={knot.y} gold={knot.gold} />
            </g>
          );
        })}

        {/* Needle riding the leading edge of the stitch line */}
        {showNeedle && lead && (
          <Needle x={lead.x} y={lead.y} angle={lead.angle} color={strokeColor} />
        )}
      </svg>
    </div>
  );
}

function Needle({
  x,
  y,
  angle,
  color,
}: {
  x: number;
  y: number;
  angle: number;
  color: string;
}) {
  // Slim sewing needle: eye at the trailing end (where thread feeds in),
  // sharp point leading forward along the path.
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      {/* thread tail feeding into the eye */}
      <line
        x1={-13}
        y1={0}
        x2={-4}
        y2={0}
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        opacity={0.85}
      />
      {/* needle body */}
      <line
        x1={-13}
        y1={0}
        x2={9}
        y2={0}
        stroke="#c9ccd6"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <line
        x1={-13}
        y1={-0.4}
        x2={9}
        y2={-0.4}
        stroke="#ffffff"
        strokeWidth={0.7}
        strokeLinecap="round"
        opacity={0.8}
      />
      {/* eye */}
      <ellipse
        cx={-10}
        cy={0}
        rx={1.7}
        ry={3}
        fill="none"
        stroke="#7d8290"
        strokeWidth={0.9}
      />
      {/* sharp tip */}
      <path d="M 9 -1.2 L 13 0 L 9 1.2 Z" fill="#aeb2bd" />
    </g>
  );
}

function KnotMark({
  cx,
  cy,
  gold,
}: {
  cx: number;
  cy: number;
  gold: boolean;
}) {
  const color = gold ? "var(--thread-gold)" : "var(--indigo)";
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* knot body with a raised highlight so it reads as coiled thread */}
      <circle r={5.5} fill="var(--calico)" stroke={color} strokeWidth={1.75} />
      <path
        d="M -3.2 0.4 Q 0 -4 3.2 0.4 Q 0 4.4 -3.2 0.4"
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      <circle r={1.1} cx={-1.4} cy={-1.6} fill="var(--calico)" opacity={0.9} />
    </g>
  );
}
