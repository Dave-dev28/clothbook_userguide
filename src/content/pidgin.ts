import type { Content } from "./types";

export const pidgin: Content = {
  meta: {
    title: "Clothbook (Iwe Aso) — Your exercise book, for your phone",
    description:
      "Clothbook na digital exercise book for Nigerian and African tailors. Fast to enter, work offline, speak your language.",
  },
  nav: {
    howItWorks: "How e dey work",
    voiceAgent: "Voice agent",
    join: "Join waitlist",
    languageLabel: "Language",
  },
  hero: {
    headline: "Your exercise book, now for your phone.",
    subhead:
      "Add customer sharp-sharp, track every order, work offline — for English, Pidgin, or your language.",
    primaryCta: "Join the waitlist",
    primaryCtaApp: "Open Clothbook",
    secondaryCta: "See how e dey work",
    videoAria: "Tailor wey dey use Clothbook for real shop",
  },
  howItWorks: {
    id: "how-it-works",
    eyebrow: "How e dey work",
    title: "Same shop. Better book.",
    steps: [
      {
        id: "step-customer",
        title: "Add customer + measurements",
        body: "Talk am or type am. The numbers go stay with the person — no loose page again.",
        mediaAlt: "How to add customer and measurements for Clothbook",
      },
      {
        id: "step-order",
        title: "Create order",
        body: "Snap the fabric, set due date, collect deposit. Everything for that work dey one place.",
        mediaAlt: "How to create order with fabric photo and deposit",
      },
      {
        id: "step-status",
        title: "Track status",
        body: "Cutting, sewing, finishing, ready, delivered — just tap as the work dey move.",
        mediaAlt: "Order status from cutting to delivered",
      },
      {
        id: "step-whatsapp",
        title: "Update customer for WhatsApp",
        body: "Send clean status from your own phone. Dem go know when to come pick — less back-and-forth.",
        mediaAlt: "Sending WhatsApp update from Clothbook",
      },
      {
        id: "step-paid",
        title: "Collect money. Balance dey track itself.",
        body: "Deposit and balance stay for the order. You go always know who still dey owe.",
        mediaAlt: "Payment and balance tracking",
      },
    ],
    stepper: {
      label: "Try the status stepper",
      hint: "Tap each stage — na so order dey move for shop.",
      stages: ["Cutting", "Sewing", "Finishing", "Ready", "Delivered"],
    },
  },
  voiceAgent: {
    id: "voice-agent",
    eyebrow: "New · Voice agent",
    title: "Talk — your hand fit still dey busy.",
    body: [
      "Hand full of fabric and pin? Just talk the measurement. Clothbook go write am.",
      "Or ask about your day: wetin due today, who still dey owe, which work dey stuck — short voice summary of the shop.",
    ],
    limitedNote:
      "E still dey roll out small-small — join the waitlist make you get early access.",
    mediaAlt: "Voice agent wey dey capture measurements",
  },
  designStudio: {
    id: "design-studio",
    eyebrow: "New · AI Design Studio",
    title: "From sketch to catalog.",
    body: "Describe the look or start from rough sketch. Get design wey you fit show customer and save for your catalog.",
    mediaAlt: "AI Design Studio wey dey generate style",
  },
  builtForYou: {
    id: "built-for-you",
    eyebrow: "Built for real shop",
    title: "For your phone and your network.",
    points: [
      {
        title: "E go work for normal Android",
        body: "Light PWA — no need expensive phone. If WhatsApp fit run, Clothbook suppose run.",
      },
      {
        title: "Network no too strong? No wahala",
        body: "Add customer and order offline. Dem go queue, then sync when network come back.",
      },
      {
        title: "Your language",
        body: "English, Pidgin, Yoruba, Hausa, Igbo. Switch anytime — same app, your words.",
      },
      {
        title: "No long form",
        body: "Fast entry first. Capture wetin you need for the work, no empty fields plenty.",
      },
    ],
  },
  more: {
    id: "more",
    eyebrow: "Also for Clothbook",
    title: "Aso-ebi groups & your public catalog",
    cards: [
      {
        title: "Aso-ebi / group order",
        body: "One style, many people. Keep group order neat instead of names wey scatter for page.",
      },
      {
        title: "Public catalog",
        body: "Share your styles with link. Customer fit browse; you take order when dem ready.",
      },
    ],
  },
  waitlist: {
    id: "join",
    eyebrow: "Early access",
    title: "Join the waitlist",
    body: "We dey open voice agent (and more) for stages. Drop your number — we go reach you for WhatsApp or SMS.",
    fields: {
      name: "Your name",
      namePlaceholder: "e.g. Tunde",
      phone: "Phone number",
      phonePlaceholder: "0803 000 0000",
      phoneHint: "WhatsApp number na best",
      role: "I be…",
      interests: "Wetin you wan try most?",
    },
    roles: [
      { value: "tailor", label: "Tailor" },
      { value: "shop_staff", label: "Shop with staff" },
      { value: "customer", label: "Customer" },
      { value: "curious", label: "Just dey curious" },
    ],
    interests: [
      { value: "voice_agent", label: "Voice agent" },
      { value: "design_studio", label: "AI Design Studio" },
      { value: "aso_ebi", label: "Aso-ebi groups" },
      { value: "basics", label: "Just the basics" },
    ],
    submit: "Join the waitlist",
    submitting: "E dey send…",
    successTitle: "You don enter the list.",
    successBody:
      "We go message you for WhatsApp or SMS when your turn reach. No spam — just access.",
    errorGeneric: "Something no work. Abeg try again.",
    errorPhone: "Abeg enter correct phone number.",
  },
  appCta: {
    title: "Ready when you ready",
    body: "Open Clothbook for your phone, start with one customer.",
    button: "Open Clothbook",
  },
  footer: {
    tagline: "Clothbook · Iwe Aso",
    contact: "Contact",
    whatsapp: "WhatsApp",
    backToTop: "Back to top",
  },
};
