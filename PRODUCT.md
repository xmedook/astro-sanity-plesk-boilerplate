# Product

## Register

brand

## Users

SMB owners and solo founders in Mexico (voseo/tuteo MX Spanish) shopping for a website.
Mostly non-technical buyers arriving from paid ads (≈81% of traffic is paid) or referral,
on mobile, comparing price and trust under time pressure. Two intents:

- **Express buyer** (`/express`): wants a live site fast and cheap ($3,900 MXN, 7 días),
  decides impulsively, pays via Stripe. Job: "get online this week without thinking hard."
- **Considered buyer** (`/`): evaluating 3 plans (Smart $8K / Pro $16K / Pro+Tienda $24K),
  needs to trust the person behind it before committing. Job: "pick the right plan and feel safe."

## Product Purpose

Two conversion landing pages for **cheapweb.mx**, built Astro + Sanity, that turn paid
and referral traffic into sales. The current site has gone 21 days without closing — the
root problem is product/funnel structure, not just copy. Success = qualified leads and
closed sales, measured by GA4 events fired on success (form_submit, checkout, booking).
This is a redesign with real money flows (Stripe) and live business copy; the design's job
is to lower friction and raise trust, not to win design awards.

## Brand Personality

Voice: **Jego-style** — urgent, transparent, founder-led, zero agency-speak. A real person
stands behind the work, not a faceless studio. Four traits hold in tension and must coexist:

- **Transparent / founder-led** — direct, honest, prices and process in plain sight.
- **Urgent / decisive** — cupos, plazos, fast yes; the page moves the buyer to act now.
- **Premium / crafted** — high polish that signals quality, so "cheap" reads as *smart value*, never low-trust.
- **Approachable / clear** — plain language for non-technical SMB buyers, low friction.

Emotional goal: confident relief — "this is the obvious, safe choice and I can decide today."

## Anti-references

Avoid all four; if an element drifts toward one, rewrite it:

- **Generic SaaS template** — hero-metric template, identical card grids, gradient text, tiny tracked uppercase eyebrows above every section.
- **Cheap / spammy** — despite the brand name: no clip-art, no loud-discount energy, nothing that reads low-trust. "Cheap" is positioned as smart value, carried by craft.
- **Corporate agency** — no stock-photo teams, no vague jargon, no faceless "we deliver solutions."
- **Overdesigned / heavy** — no animation maximalism (framer/ogl) that hurts load or conversion. Motion is purposeful and fast; performance is a conversion feature.

## Design Principles

1. **Conversion is the brief.** Every section earns its place by moving the buyer toward a yes. If it doesn't build trust or reduce friction, cut it.
2. **Founder in the room.** A real person, real voice, real transparency — front and visible, not buried below the fold. Trust is the product.
3. **Cheap means smart, not low-rent.** Craft and polish do the heavy lifting so price reads as value. Premium execution is what makes "cheap" safe to buy.
4. **Speed is design.** Fast load and a clear, single next action beat richness. Ship JS only where interaction demands it; static copy stays static.
5. **Decide today.** Reduce the path to action to one obvious CTA per intent (Stripe / WhatsApp / booking), with urgency that's honest (real cupos/plazos), never manufactured.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Dark-purple identity (#0D0118 bg) demands verified contrast: body
text ≥4.5:1, large text ≥3:1 — purple-on-dark and any muted text checked, not assumed.
Mobile-first (paid traffic is mostly mobile). All motion ships a `prefers-reduced-motion`
alternative. Spanish (MX) is the primary locale; EN i18n keys exist in the propuesta, deferred.
