/**
 * Placeholder / real media frame for screenshots and clips.
 * Replace placeholder paths under /public/media when David delivers assets.
 */
interface MediaFrameProps {
  src?: string;
  alt: string;
  kind?: "image" | "video";
  poster?: string;
  className?: string;
  label?: string;
  gold?: boolean;
  /** "contain" shows the whole phone screenshot (no crop); "cover" fills. */
  fit?: "cover" | "contain";
  /** Keep a tall phone aspect on desktop instead of switching to 16:9. */
  portrait?: boolean;
}

export function MediaFrame({
  src,
  alt,
  kind = "image",
  poster,
  className = "",
  label,
  gold = false,
  fit = "cover",
  portrait = false,
}: MediaFrameProps) {
  const border = gold
    ? "border-[var(--thread-gold)]/50"
    : "border-[var(--ink)]/10";

  // Phone screenshots sit on their own light background — a white frame makes
  // the contain-letterbox invisible so they read as clean floating screens.
  const frameBg = fit === "contain" ? "bg-white" : "bg-[var(--ink)]/5";
  const fitCls = fit === "contain" ? "object-contain" : "object-cover";
  const aspect = portrait
    ? "aspect-[7/10] max-h-[560px]"
    : "aspect-[9/16] max-h-[420px] sm:aspect-video sm:max-h-none";

  return (
    <figure
      className={`overflow-hidden rounded-2xl border ${border} ${frameBg} shadow-sm ${className}`}
    >
      {kind === "video" && src ? (
        <video
          className={`w-full ${aspect} ${fitCls}`}
          src={src}
          poster={poster}
          muted
          playsInline
          controls
          preload="none"
        >
          <track kind="captions" srcLang="en" label="English" />
        </video>
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full ${aspect} ${fitCls}`}
        />
      ) : (
        <div
          className="flex aspect-[9/16] max-h-[420px] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--indigo)]/10 via-[var(--calico)] to-[var(--thread-gold)]/15 px-6 text-center sm:aspect-video sm:max-h-none"
          role="img"
          aria-label={alt}
        >
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[var(--indigo)]/40 text-[var(--indigo)]"
            aria-hidden
          >
            ◻
          </span>
          <span className="max-w-xs text-sm font-medium text-[var(--ink)]">
            {label ?? "Screenshot placeholder"}
          </span>
          <span className="max-w-xs text-xs text-[var(--thread-grey)]">
            TODO: drop real asset in /public/media
          </span>
        </div>
      )}
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
