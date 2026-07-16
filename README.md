# Clothbook (Iwe Aso) — Waitlist & How It Works

Standalone marketing/education landing page for **Clothbook**.  
Separate repo and Vercel project from the main app (`Dave-dev28/Clothbook`). Shares Supabase only via new tables.

**Full product requirements:** [PRD.md](./PRD.md)

## Jobs of this page

1. **Explain the product** — tailor understands Clothbook in under ~90 seconds (also future in-app “How to use”).
2. **Explain new features** — voice agent, AI Design Studio, with clips + guided walkthroughs.
3. **Capture waitlist** — temporary until limited rollout ends.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Framer Motion available (scroll reveals use lightweight IntersectionObserver)
- Supabase (`waitlist_signups` insert-only)
- Fonts: **Fraunces** (display) + **DM Sans** (body)

## Quick start

```bash
npm install
cp .env.example .env.local
# fill NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase env vars, waitlist submits **dry-run succeed in development** so you can test the form UI.

## Supabase setup

1. In the shared Clothbook Supabase project, run:

   `supabase/waitlist_signups.sql`

2. Confirm RLS: anon can **insert**, cannot select/update/delete.
3. Review signups in the Supabase dashboard (service role / logged-in admin).

## Waitlist retirement (one flag)

When voice agent / Design Studio leave limited rollout:

```ts
// src/lib/config.ts
waitlistEnabled: false,
appUrl: "https://app.clothbook.app",
```

All primary CTAs and the `#join` section swap to “Open Clothbook” via `PrimaryCta` / `WaitlistForm`. How-it-works and feature sections stay as the permanent reference.

## Deep links

| Section | Anchor |
|---------|--------|
| Hero | `#hero` |
| How it works | `#how-it-works` |
| Steps | `#step-customer`, `#step-order`, `#step-status`, `#step-whatsapp`, `#step-paid` |
| Voice agent | `#voice-agent` |
| Design studio | `#design-studio` |
| Built for you | `#built-for-you` |
| More | `#more` |
| Waitlist / app CTA | `#join` |

## Localization

- v1: **English** + **Pidgin** (`src/content/en.ts`, `src/content/pidgin.ts`)
- Toggle in header; architecture ready for Yoruba / Hausa / Igbo later

## Assets (David)

See `public/media/README.md`. Page ships with placeholders; drop real MP4s/screenshots and wire paths as noted there.

## Design tokens

Defined in `src/app/globals.css`:

| Token | Hex | Role |
|-------|-----|------|
| `--ink` | `#211D1A` | Body text |
| `--calico` | `#F5EFE4` | Background |
| `--indigo` | `#2E4374` | Primary CTA + thread base |
| `--thread-gold` | `#C9973A` | New feature + thread accent |
| `--terracotta-clay` | `#B65C3D` | Attention only |
| `--thread-grey` | `#8B837A` | Secondary text |

## Deploy (Vercel)

1. New Vercel project pointing at this repo (not the Clothbook app).
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Domain/subdomain of your choice (e.g. `how.clothbook.app`).

## Out of scope (v1)

- Automated WhatsApp/SMS confirmation
- Full 5-language copy
- Payments
- Any changes to the Clothbook app codebase
