export type Locale = "en" | "pidgin";

export type RoleValue = "tailor" | "shop_staff" | "customer" | "curious";

export type InterestValue =
  | "voice_agent"
  | "design_studio"
  | "aso_ebi"
  | "basics";

export interface Content {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    howItWorks: string;
    voiceAgent: string;
    join: string;
    languageLabel: string;
  };
  hero: {
    headline: string;
    subhead: string;
    primaryCta: string;
    primaryCtaApp: string;
    secondaryCta: string;
    videoAria: string;
  };
  howItWorks: {
    id: string;
    eyebrow: string;
    title: string;
    steps: {
      id: string;
      title: string;
      body: string;
      mediaAlt: string;
    }[];
    stepper: {
      label: string;
      hint: string;
      stages: string[];
    };
  };
  voiceAgent: {
    id: string;
    eyebrow: string;
    title: string;
    body: string[];
    limitedNote: string;
    mediaAlt: string;
  };
  designStudio: {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    mediaAlt: string;
  };
  builtForYou: {
    id: string;
    eyebrow: string;
    title: string;
    points: {
      title: string;
      body: string;
    }[];
  };
  more: {
    id: string;
    eyebrow: string;
    title: string;
    cards: {
      title: string;
      body: string;
    }[];
  };
  waitlist: {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    fields: {
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      phoneHint: string;
      role: string;
      interests: string;
    };
    roles: { value: RoleValue; label: string }[];
    interests: { value: InterestValue; label: string }[];
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorGeneric: string;
    errorPhone: string;
  };
  appCta: {
    title: string;
    body: string;
    button: string;
  };
  footer: {
    tagline: string;
    contact: string;
    whatsapp: string;
    backToTop: string;
  };
}
