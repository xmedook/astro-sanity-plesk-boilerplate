---
name: cheapweb.mx
description: Founder-led plum-dark landing system for fast, trustworthy SMB websites (MX)
colors:
  bg: "#0D0118"
  surface: "#150225"
  surface-2: "#1C0335"
  elevated: "#240440"
  purple: "#8224E3"
  purple-light: "#9B51E0"
  purple-dark: "#6010B5"
  ink: "#F0E8FF"
  ink-dim: "#C4B8E0"
  muted: "#7A6896"
  border-solid: "#2D0F50"
typography:
  display:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.93
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  card: "1rem"
  pill: "9999px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  section-y: "5rem"
  section-y-lg: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.purple-dark}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "2rem"
  input:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0.875rem 1rem"
---

# Design System: cheapweb.mx

## 1. Overview

**Creative North Star: "El Taller Plum" (The Plum Workshop)**

A workshop, not a factory. The interface is a deep-plum dark room where a single craftsperson
works in the open — prices, process, and the person behind the work all visible at once. The
darkness is not "tech-cool dark"; it's the calm, focused light of a late-night studio where the
buyer feels they've found the one shop that will actually ship their site this week. Electric
violet is the tool in the maker's hand: it appears exactly where action happens (the CTA, the
recommended plan, the live status dot) and nowhere else. The system sells *cheap as smart value*
by out-crafting the category, never by looking cheap.

It rejects the generic SaaS landing (hero-metric template, identical card grids, tracked uppercase
eyebrows), the spammy discount aesthetic (clip-art, loud strikethrough pricing), the faceless
corporate agency (stock teams, "we deliver solutions"), and the over-designed maximalist build
(framer/ogl animation that tanks mobile load). Where the legacy site reached for decorative
gradient text and glassmorphism on every surface, this system **sharpens**: same plum identity,
but those tricks are retired. Trust and speed are the aesthetic.

**Key Characteristics:**
- Plum-black canvas (#0D0118), violet-tinted white ink — never pure white on black.
- One accent, the electric purple, reserved for action and hierarchy.
- Sora extrabold display set tight; Inter body set generous and readable.
- Pill CTAs, soft 1rem cards, glow used as feedback not decoration.
- Mobile-first, fast: motion is purposeful, performance is a conversion feature.

## 2. Colors

A monochrome plum field carrying a single saturated violet accent — committed, identity-driven, dark.

### Primary
- **Electric Plum** (#8224E3): The one voice. CTAs, the recommended-plan ring, links, the live
  "cupos" status dot, focus glow. Carries action and hierarchy. **Hover** drops to Plum Dark
  (#6010B5); a lighter **Plum Light** (#9B51E0) is for accents on already-dark surfaces only.

### Neutral
- **Plum Black** (#0D0118): The body background. The studio's dark room. The whole site sits on this.
- **Surface** (#150225) / **Surface 2** (#1C0335) / **Elevated** (#240440): Tonal layering for
  cards, nested fields, and raised elements. Depth comes from these steps, not from heavy shadow.
- **Violet White / Ink** (#F0E8FF): Primary text and headings. Violet-tinted, never #FFFFFF on
  black — pure white on plum-black vibrates; the tint sits calm. ~17:1 on bg.
- **Ink Dim** (#C4B8E0): Secondary body text, descriptions, supporting copy. ~10.9:1 on bg — the
  default for any paragraph that isn't a heading.
- **Muted Plum** (#7A6896): Labels, captions, disabled, meta. **4.11:1 on bg — large/bold text only.**
- **Border Solid** (#2D0F50): Hairline dividers and card edges. Soft, low-contrast, structural.

### Named Rules
**The One Voice Rule.** Electric Plum (#8224E3) appears on ≤10% of any screen — the primary CTA,
the recommended plan, an active state. If two purple things compete for "click me," one is wrong.
Its rarity is what makes the buyer's eye land on the next action.

**The No-Pure-White Rule.** Text on plum-black is always Ink (#F0E8FF) or Ink Dim (#C4B8E0), never
#FFFFFF. The only #FFFFFF in the system is the label *inside* a filled purple button.

## 3. Typography

**Display Font:** Sora (with system-ui, sans-serif)
**Body Font:** Inter (with system-ui, sans-serif)

**Character:** A geometric-grotesque display (Sora) paired with a neutral humanist workhorse
(Inter) — a real contrast axis, not two near-identical sans. Sora set heavy and tight does the
shouting (confident, modern, decisive); Inter set open and tall does the reading (clear,
approachable, trustworthy). The pairing is the brand's "premium + plain-spoken" tension made visible.

### Hierarchy
- **Display** (Sora 800, clamp(2.5rem, 6vw, 5rem), lh 0.93, -0.03em): Hero headlines, plan prices.
  One per view. Tight leading stacks lines into a confident block.
- **Headline** (Sora 700, clamp(1.75rem, 4vw, 2.75rem), lh 1.05): Section titles (H-/S- sections).
- **Title** (Sora 700, 1.5rem, lh 1.2): Card headings, plan names, FAQ questions.
- **Body** (Inter 400, 1.0625rem, lh 1.6): All paragraph copy in Ink Dim. **Cap measure at 65–75ch.**
- **Label** (Inter 700, 0.75rem, +0.08em, UPPERCASE): Badges, pills, the live-status chip. Used
  *deliberately and sparingly* — a named badge, not an eyebrow over every section.

### Named Rules
**The Sora-Heading / Inter-Body Rule.** Sora is for headings, prices, and numbers only — never
body copy. Inter is for everything readable. Never set a paragraph in Sora; never set a hero in Inter.

**The No-Eyebrow Rule.** No tiny tracked uppercase kicker stacked above section headings. The Label
style exists for badges and status, not as section scaffolding. One named badge is voice; an eyebrow
on every section is AI grammar — forbidden.

## 4. Elevation

Depth is **tonal first, shadow second.** Surfaces lift by stepping up the plum ramp
(bg → surface → surface-2 → elevated), not by stacking dark drop-shadows. Shadow is reserved for
two jobs: a soft ambient glow that signals interactivity on hover, and a focus ring. There is no
ambient grey drop-shadow anywhere — grey shadow on plum-black reads muddy and cheap.

### Shadow Vocabulary
- **Hover Lift** (`box-shadow: 0 24px 48px rgba(130, 36, 227, 0.22)` + `translateY(-4px)`): The
  signature interaction. Cards and CTAs rise into a violet glow on hover — the plum light catching
  the raised edge. 0.2s ease-out.
- **CTA Pulse** (`0 0 0 0 → 14px rgba(130,36,227,0.45→0)`, 2s loop): Reserved for the single
  highest-intent button (Stripe checkout, primary express CTA). One per page, maximum.
- **Focus Glow** (`0 0 0 3px rgba(130,36,227,0.45)`): Keyboard focus on interactive elements.

### Named Rules
**The Tonal-Depth Rule.** To raise an element, step up the plum ramp before reaching for a shadow.
Shadow on this system is violet and earned by interaction (hover, focus, the one pulse) — never a
static decorative grey.

## 5. Components

### Buttons
- **Shape:** Full pill (`border-radius: 9999px`). The brand's button silhouette — never square, never a sharp-cornered SaaS rectangle.
- **Primary:** Filled Electric Plum (#8224E3), #FFFFFF label, Sora/Inter bold, padding 1rem 2rem.
  Hover → Plum Dark (#6010B5), 0.2s color transition; pairs with Hover Lift on hero CTAs.
- **Ghost / Secondary:** Transparent fill, Ink (#F0E8FF) label, 1px Border Solid; hover brings a
  Plum border. Same pill shape and padding. For the lower-priority choice next to a primary.
- **Hover / Focus:** Color transition 0.2s ease-out; keyboard focus shows the Focus Glow ring.
- **The Pulse exception:** only the single top-intent CTA per page wears `btn-pulse`.

### Cards / Containers
- **Corner Style:** Soft 1rem radius (`rounded.card`).
- **Background:** Surface (#150225); nested/raised content steps to Surface 2 or Elevated.
- **Shadow Strategy:** Flat at rest (tonal layering). Hover Lift only on interactive cards (plan
  cards, demo tiles). Static content cards do not lift.
- **Border:** Optional 1px Border Solid (#2D0F50) hairline. The *recommended* plan card carries a
  1px Electric Plum border instead — that ring is how the eye finds the default choice.
- **Internal Padding:** 2rem (md 2.5rem on larger plan cards).

### Inputs / Fields
- **Style:** Surface 2 (#1C0335) fill, 1px Border Solid, 1rem radius, Ink text. Placeholders in
  Muted Plum at **bold/large only** — otherwise placeholder fails 4.5:1, so use Ink Dim for any
  small placeholder.
- **Focus:** Border shifts to Electric Plum + Focus Glow ring. No layout shift.
- **Error:** Border and helper text in a warm red (outside the plum ramp so it reads as alarm); never silent.

### Navigation
- **Style:** Transparent over Plum Black, becoming a Surface bar with hairline border on scroll.
  Inter, Ink Dim links → Ink on hover. The primary nav CTA is a Primary pill button.
- **Mobile:** Full-screen plum-black overlay sheet; the WhatsApp CTA persists as a sticky pill.

### Plan Card (signature)
The home page's three-plan comparison (Smart / Pro / Pro+Tienda). Equal-width on desktop, stacked
on mobile. Exactly one card wears the Electric Plum border + a "Recomendado" Label badge; the other
two stay Border Solid. Price set in Sora Display. Included/excluded rows use a check / dash glyph in
Ink Dim and Muted respectively — not red ✕, which would read as failure on a plan you might still buy.

## 6. Do's and Don'ts

### Do:
- **Do** keep the canvas Plum Black (#0D0118) and reserve Electric Plum (#8224E3) for action — the One Voice Rule.
- **Do** set body copy in Ink Dim (#C4B8E0); it clears 4.5:1. Use Ink (#F0E8FF) for headings.
- **Do** pair Sora (headings/prices) with Inter (body) on the contrast axis. Never two near-identical sans.
- **Do** lift surfaces by stepping the plum tonal ramp first; use the violet Hover Lift glow only for interactivity.
- **Do** keep one pulsing CTA per page and one bordered "recomendado" plan — singular emphasis converts.
- **Do** ship `prefers-reduced-motion` fallbacks for the marquee, aurora, pulse, and hover lift (crossfade or static).
- **Do** test every heading at 360px / 768px / 1280px — Sora extrabold + long MX words overflow narrow grids.

### Don't:
- **Don't** use gradient text (`background-clip: text` on a gradient). The legacy `.text-gradient-purple` is retired. Emphasis comes from weight, size, and the solid Electric Plum — not chrome lettering.
- **Don't** default to glassmorphism. The legacy `.glass-card` blur-on-everything is retired; use solid Surface tones. Glass is rare and purposeful, or absent.
- **Don't** set Muted Plum (#7A6896) as small body text — it's 4.11:1, large/bold only. Never set #FFFFFF text on plum-black.
- **Don't** build the generic SaaS landing: no hero-metric template, no identical card grids, no tiny tracked uppercase eyebrow above every section.
- **Don't** look cheap or spammy: no clip-art, no loud strikethrough-discount energy, no clutter. "Cheap" is carried by craft.
- **Don't** look like a corporate agency: no stock-photo teams, no "we deliver solutions." The founder is visible and named.
- **Don't** over-design: no framer/ogl animation maximalism that hurts mobile load. Static copy ships zero JS; motion is purposeful and fast.
- **Don't** use a colored `border-left`/`border-right` stripe as a card accent — use a full 1px border or the plum tonal step.
