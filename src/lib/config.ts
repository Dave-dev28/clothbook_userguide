/**
 * Site-wide feature flags.
 * Flip waitlistEnabled to false once voice agent / Design Studio
 * exit limited rollout — all CTAs switch via PrimaryCta.
 */
export const siteConfig = {
  /** When true: waitlist form + "Join the waitlist" CTAs. When false: app CTA. */
  waitlistEnabled: true,

  /** App open URL used when waitlist is retired. */
  appUrl: "https://app.clothbook.app",

  /** Contact */
  whatsappUrl: "https://wa.me/2340000000000", // TODO(David): real WhatsApp business number
  contactEmail: "hello@clothbook.app",

  /** Socials — leave empty to hide */
  socials: {
    twitter: "",
    instagram: "",
  },

  source: "landing_page" as const,
} as const;
