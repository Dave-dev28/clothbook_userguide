import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Clothbook (Iwe Aso) — Your exercise book, on your phone",
    description:
      "Clothbook replaces the paper exercise book Nigerian and African tailors use to run their shop. Fast entry, works offline, in your language.",
  },
  nav: {
    howItWorks: "How it works",
    voiceAgent: "Voice agent",
    join: "Join waitlist",
    languageLabel: "Language",
  },
  hero: {
    headline: "Your exercise book, now on your phone.",
    subhead:
      "Add customers fast, track every order, and work offline — in English, Pidgin, or your language.",
    primaryCta: "Join the waitlist",
    primaryCtaApp: "Open Clothbook",
    secondaryCta: "See how it works",
    videoAria: "Tailor using Clothbook in a real shop",
  },
  howItWorks: {
    id: "how-it-works",
    eyebrow: "How it works",
    title: "Same shop. Smoother book.",
    steps: [
      {
        id: "step-customer",
        title: "Add a customer + measurements",
        body: "Speak them in, or type on the keypad. Either way, the numbers stay with the person — not on a loose page.",
        mediaAlt: "Adding a customer and measurements in Clothbook",
      },
      {
        id: "step-order",
        title: "Create an order",
        body: "Snap the fabric, set the due date, take a deposit. Everything for that job lives in one place.",
        mediaAlt: "Creating an order with fabric photo and deposit",
      },
      {
        id: "step-status",
        title: "Track status",
        body: "Cutting, sewing, finishing, ready, delivered — tap through as the work moves. No more “where did we leave this?”",
        mediaAlt: "Order status tracker from cutting to delivered",
      },
      {
        id: "step-whatsapp",
        title: "Update the customer on WhatsApp",
        body: "Send a clean status update from your own phone. They know when to pick up — you stop the back-and-forth.",
        mediaAlt: "Sending a WhatsApp order update from Clothbook",
      },
      {
        id: "step-paid",
        title: "Get paid. Balance tracks itself.",
        body: "Deposits and final payment stay attached to the order. You always know who still owes what.",
        mediaAlt: "Payment and balance tracking on an order",
      },
    ],
    stepper: {
      label: "Try the status stepper",
      hint: "Tap each stage — this is how an order moves in the shop.",
      stages: ["Cutting", "Sewing", "Finishing", "Ready", "Delivered"],
    },
  },
  voiceAgent: {
    id: "voice-agent",
    eyebrow: "New · Voice agent",
    title: "Talk while your hands stay busy.",
    body: [
      "Hands full of fabric and pins? Say the measurement. Clothbook writes it down.",
      "Or ask for your day: what’s due today, who still owes, which jobs are stuck — a short voice summary of the shop.",
    ],
    limitedNote:
      "Currently rolling out gradually — join the waitlist to get early access.",
    mediaAlt: "Voice agent capturing measurements in Clothbook",
  },
  designStudio: {
    id: "design-studio",
    eyebrow: "New · AI Design Studio",
    title: "From sketch to catalog.",
    body: "Describe the look or start from a rough sketch. Get a design you can show the customer and save into your catalog.",
    mediaAlt: "AI Design Studio generating a style from a prompt",
  },
  builtForYou: {
    id: "built-for-you",
    eyebrow: "Built for the real shop",
    title: "Made for your phone and your network.",
    points: [
      {
        title: "Works on everyday Android",
        body: "Built as a light PWA — no fancy phone required. If WhatsApp runs, Clothbook should too.",
      },
      {
        title: "Patchy network is fine",
        body: "Add customers and orders offline. They queue and sync when the signal comes back.",
      },
      {
        title: "In your language",
        body: "English, Pidgin, Yoruba, Hausa, Igbo. Switch anytime — same app, your words.",
      },
      {
        title: "No long forms",
        body: "Fast entry first. Capture what you need for the job, not a stack of empty fields.",
      },
    ],
  },
  more: {
    id: "more",
    eyebrow: "Also in Clothbook",
    title: "Aso-ebi groups & your public catalog",
    cards: [
      {
        title: "Aso-ebi / group orders",
        body: "One style, many people. Keep group orders tidy instead of scattering names across pages.",
      },
      {
        title: "Public catalog",
        body: "Share your styles with a link. Customers browse; you take the order when they’re ready.",
      },
    ],
  },
  waitlist: {
    id: "join",
    eyebrow: "Early access",
    title: "Join the waitlist",
    body: "We’re opening the voice agent (and more) in stages. Leave your number — we’ll reach you on WhatsApp or SMS.",
    fields: {
      name: "Your name",
      namePlaceholder: "e.g. Tunde",
      phone: "Phone number",
      phonePlaceholder: "0803 000 0000",
      phoneHint: "WhatsApp number works best",
      role: "I am a…",
      interests: "What are you most excited to try?",
    },
    roles: [
      { value: "tailor", label: "Tailor" },
      { value: "shop_staff", label: "Shop with staff" },
      { value: "customer", label: "Customer" },
      { value: "curious", label: "Just curious" },
    ],
    interests: [
      { value: "voice_agent", label: "Voice agent" },
      { value: "design_studio", label: "AI Design Studio" },
      { value: "aso_ebi", label: "Aso-ebi groups" },
      { value: "basics", label: "Just the basics" },
    ],
    submit: "Join the waitlist",
    submitting: "Sending…",
    successTitle: "You’re on the list.",
    successBody:
      "We’ll message you on WhatsApp or SMS when your turn comes. No spam — just access.",
    errorGeneric: "Something went wrong. Please try again.",
    errorPhone: "Please enter a valid phone number.",
  },
  appCta: {
    title: "Ready when you are",
    body: "Open Clothbook on your phone and start with one customer.",
    button: "Open Clothbook",
  },
  footer: {
    tagline: "Clothbook · Iwe Aso",
    contact: "Contact",
    whatsapp: "WhatsApp",
    backToTop: "Back to top",
  },
};
