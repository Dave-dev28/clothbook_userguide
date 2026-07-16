# Clothbook (Iwe Aso) — Waitlist & "How It Works" Landing Page

### Product Requirements Document for Build

---

## 1. What this is

A standalone marketing/education page for **Clothbook**, a mobile-first PWA that replaces the paper exercise book Nigerian/African tailors use to run their shop. This page has two permanent jobs and one temporary job:

1. **Permanent — Explain the product.** A tailor who has never heard of Drape, Iwe Aso, or Clothbook lands here and understands, in under 90 seconds, what the app does and how to use it. This page will later be linked from inside the app itself as the "How to use" destination.
2. **Permanent — Explain new features.** As we ship things (like the voice agent just added), this page is where we demonstrate them with real screenshots/clips and short guided walkthroughs.
3. **Temporary — Capture waitlist signups.** Until the voice agent (and possibly AI Design Studio) graduate from limited rollout to full access, this page collects interest and grants early access to a curated list.

**This is not part of the Clothbook app codebase.** It is a separate repo, separate Vercel project, own domain/subdomain. It only shares a Supabase project (new tables, does not touch existing app tables).

---

## 2. Audience & tone

Two readers will land here, and copy must work for both without splitting into two pages:

- **The tailor** — street-level tailor shop owner, often on a mid/low-end Android, possibly first time hearing of a "PWA." Not interested in jargon. Wants to know: *does this save me time, does it work on my phone, is it hard to learn.*
- **The curious/referrer** — could be a tailor's customer, an aso-ebi group organizer, or someone forwarding this link to a tailor they know ("see this thing, download am").

Tone: plain, warm, respectful — never condescending about the paper exercise book (it's the tool that's worked for them for years; Clothbook is presented as an upgrade, not a correction). Sentence case, active voice, no fake urgency ("Only 3 spots left!"). Where useful, default to English with light Pidgin inflection available as a toggle (see §7 / localization).

---

## 3. Design direction (signature concept)

**Signature element — The Thread Line.** A single stitched thread (SVG path, hand-drawn imperfect quality, not a straight ruler line) runs down the spine of the page from hero to footer. As the user scrolls:

- The thread draws itself in (stroke-dashoffset animation tied to scroll position, not time — this must feel controlled by the user's scroll, not autoplaying).
- At each major section, the thread **knots** — a small looped-stitch icon — before continuing, marking "you've learned this part." This is the assistive/guided mechanic: it's a progress spine, not a decorative squiggle.
- The thread's color deepens or shifts (see palette) as it passes voice agent / AI Design Studio sections, hinting these are the newer, more premium threads in the fabric.
- On mobile, the thread runs along the left edge rather than center, thin enough not to collide with text.

**Palette (hex tokens in code, do not hardcode raw hex through components):**

| Token | Hex | Role |
|-------|-----|------|
| `--ink` | `#211D1A` | Near-black, warm body text |
| `--calico` | `#F5EFE4` | Warm unbleached-fabric background |
| `--indigo` | `#2E4374` | Primary CTAs + thread base |
| `--thread-gold` | `#C9973A` | New-feature highlights + gold knots |
| `--terracotta-clay` | `#B65C3D` | Warning/attention only |
| `--thread-grey` | `#8B837A` | Captions, secondary text |

**Typography:** Fraunces (display) + DM Sans (body). Avoid thin font-weights below 16px.

**Motion:** Earned by content only. Respect `prefers-reduced-motion`. No autoplaying decorative loops independent of scroll.

---

## 4. Page structure

| # | Section | Anchor |
|---|---------|--------|
| 4.1 | Hero | `#hero` |
| 4.2 | How it works | `#how-it-works` |
| 4.3 | Voice agent | `#voice-agent` |
| 4.4 | AI Design Studio | `#design-studio` |
| 4.5 | Built for the real shop | `#built-for-you` |
| 4.6 | Aso-ebi & catalog | `#more` |
| 4.7 | Waitlist form | `#join` |
| 4.8 | Footer | `#footer` |

---

## 5. Technical requirements

- **Stack:** Next.js App Router, TypeScript, Tailwind, own Vercel project
- **Data:** `waitlist_signups` with insert-only RLS (see `supabase/waitlist_signups.sql`)
- **Perf:** Lighthouse mobile 85+, hero video never blocks FCP, page weight &lt;1.5MB excl. hero video
- **A11y:** muted video, captions when audio added, reduced-motion, visible focus
- **i18n:** EN + Pidgin v1; structured for more languages later

---

## 6. Interactive limits

- One truly interactive demo only: status stepper in How it works
- No confetti, bouncing chevrons, fake AI loaders, scroll-fighting carousels

---

## 7. Assets (TODO — David)

See `public/media/README.md`.

---

## 8. Waitlist retirement

Flip `siteConfig.waitlistEnabled` in `src/lib/config.ts` to `false`.

---

## 9. Success metrics (v1)

- Waitlist conversion, scroll depth, hero play-through, Lighthouse mobile

---

## 10. Out of scope (v1)

- Auto WhatsApp/SMS confirmation
- Full 5-language copy
- Payments
- Clothbook app codebase changes

---

## Acceptance criteria

- [x] All 8 sections in §4 present with correct anchor ids
- [x] Thread line animates on scroll, respects `prefers-reduced-motion`, degrades if JS fails
- [x] Hero mp4 lazy-loads, has poster fallback, doesn't block CTA render
- [x] Waitlist form writes via `/api/waitlist` → Supabase `waitlist_signups` (anon insert-only RLS)
- [ ] Lighthouse mobile perf ≥ 85 on throttled profile (verify after real media + deploy)
- [x] Fully responsive at 360px minimum
- [ ] Deployed to its own Vercel project, separate repo from the Clothbook app
