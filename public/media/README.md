# Media assets (TODO for David)

Drop real files here. The page degrades gracefully with placeholders until these exist.

## Required for launch

| File | Spec | Used in |
|------|------|---------|
| `hero.mp4` | h.264, muted, loopable, **&lt;2.5MB**, **&lt;15s**, real Android shop footage | Hero |
| `hero.webm` | WebM fallback of same clip | Hero |
| `hero-poster.jpg` | Static first frame, ~80–120KB, 16:9 or 4:5 | Hero (loads before video) |
| `step-customer.jpg` | Add customer + measurements screenshot | How it works |
| `step-order.jpg` | Create order (fabric, due date, deposit) | How it works |
| `step-status.jpg` | Status stepper UI | How it works |
| `step-whatsapp.jpg` | WhatsApp update send | How it works |
| `step-paid.jpg` | Balance / payment tracking | How it works |
| `voice-agent.mp4` | Short screen recording + captions if audio | Voice agent |
| `voice-agent-poster.jpg` | Poster frame | Voice agent |
| `design-studio.jpg` or `.mp4` | Sketch/prompt → design | AI Design Studio |
| `language-toggle.jpg` | Optional EN/Pidgin/… UI screenshot | Built for you |

After adding files, wire `src` paths in:

- `src/components/sections/Hero.tsx` (already points at hero.*)
- `src/components/sections/HowItWorks.tsx` (`STEP_MEDIA` map)
- `src/components/sections/VoiceAgent.tsx`
- `src/components/sections/DesignStudio.tsx`
