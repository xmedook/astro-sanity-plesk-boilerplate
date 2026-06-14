# CLAUDE.md — cheapweb.mx redesign (Astro + Sanity)

> Guidance for Claude Code working in this repo. Read before editing.

## Goal

Redesign **https://www.cheapweb.mx/** as an **Astro + Sanity** site, driven by the
content/strategy in [cwmx-propuesta-express/](cwmx-propuesta-express/).

Two landings:
- `/` — home cheapweb.mx (3 planes: Smart $8K / Pro $16K / Pro+Tienda $24K)
- `/express` — Landing Express $3,900 MXN (tier piloto, 7 días, Stripe-driven)

Plus `/blog` (existing post type), `/express/brief` (post-pago form), `/gracias`, `/express/gracias`.

## Source of truth — content & strategy

All copy, section order, component names, CTAs, GA4 events live in the propuesta docs.
**Edit copy/structure THERE first, then implement.** Key files:

| Doc | Use for |
|---|---|
| [v3-05-sitemap-y-secciones.md](cwmx-propuesta-express/v3-05-sitemap-y-secciones.md) | **Primary build spec** — every section S01–S09 (express), H01–H14 (home), exact copy, components, CTAs, GA4 |
| [v3-00-overview.md](cwmx-propuesta-express/v3-00-overview.md) | Rationale, open decisions, handoff rules |
| [v3-02-producto-y-pricing.md](cwmx-propuesta-express/v3-02-producto-y-pricing.md) | SKUs, pricing logic |
| [v3-03-funnel-y-adquisicion.md](cwmx-propuesta-express/v3-03-funnel-y-adquisicion.md) | Funnel, WhatsApp/TidyCal/Stripe flows |
| [v3-04-copy-landing-y-plan.md](cwmx-propuesta-express/v3-04-copy-landing-y-plan.md) | Full copy + ad examples + sprint plan |

`01..07-*.md` and `v3-01-diagnostico.md` are historical/diagnostic context, not build specs.

## Stack

- **Frontend:** [frontend/](frontend/) — Astro 6, Tailwind 4, React 19 islands (`@astrojs/react`), TypeScript
- **CMS:** [studio/](studio/) — Sanity 5 Studio
- **Data layer:** [frontend/src/utils/sanity.ts](frontend/src/utils/sanity.ts) — GROQ queries via `sanity:client`
- Monorepo: npm workspaces (`frontend`, `studio`). Node >=22.12.

## ⚠️ Propuesta is written for Next.js — translate to Astro

The spec names Next.js paths/components. Map them:

| Propuesta (Next.js) | This repo (Astro) |
|---|---|
| `app/express/page.tsx` | `frontend/src/pages/express/index.astro` |
| `app/express/brief/page.tsx` | `frontend/src/pages/express/brief.astro` |
| `app/api/express/brief/route.ts` | `frontend/src/pages/api/express/brief.ts` (needs SSR adapter) |
| `components/express/HeroExpress.tsx` | `frontend/src/components/express/HeroExpress.astro` |
| `components/home/hero.tsx` (MODIFICAR) | `frontend/src/components/home/Hero.astro` (new — home is currently `<Welcome/>` template) |
| `app/sitemap.ts` | `@astrojs/sitemap` integration or `frontend/src/pages/sitemap.xml.ts` |

**Rule:** Astro `.astro` for static sections. React island (`client:*`) ONLY where interactive:
FAQ accordion, contact/brief forms, exit-intent, sticky badge. Don't ship JS for static copy.

**SSR note:** API routes (`/api/...`), Stripe webhook, and `?session_id` validation need an
Astro SSR/hybrid adapter (deploy target is Plesk/Node — see [PLESK_DEPLOY.md](PLESK_DEPLOY.md)).
Static-only sections stay prerendered. Decide adapter before Sprint 0 API work.

## Sanity content model (the "+ Sanity" part)

Drive editable copy from Sanity instead of hardcoding. Existing: `post`, `seo`, `blockContent`
in [studio/src/schemaTypes/](studio/src/schemaTypes/).

Planned additions (singletons + collections — confirm before building schemas):
- `siteSettings` (singleton) — WhatsApp number, TidyCal URL, Stripe link, cupos counters, GA4 id
- `homePage` (singleton) — H01–H14 section content
- `expressPage` (singleton) — S01–S09 section content
- `plan` (collection) — Smart / Pro / Pro+Tienda cards (name, price, included[], excluded[], badge, cta)
- `faq` (collection, `scope: home|express`)
- `demo` (collection) — DemoGrid: industry, image, live URL
- `testimonial`, `portfolioItem` (collections)

Keep the existing `loadQuery` try/catch fallback pattern — build must survive missing project id.

## Reuse map — current cheapweb.mx source

Current production site (Next.js 14) cloned to `/tmp/cheapweb-mx`
([github.com/xmedook/cheapweb-mx](https://github.com/xmedook/cheapweb-mx)). **Reference, do not commit.**
It's the MODIFICAR base the propuesta refers to. Mine it:

| From `/tmp/cheapweb-mx` | Action | Target |
|---|---|---|
| `lib/blog.ts` (28 posts, full ES markdown: slug/title/description/date/readTime/category/content) | **Migrate → Sanity** `post` docs (write import script) | studio |
| `public/blog/*` (28 webp/png) | Copy or upload to Sanity assets | `frontend/public/blog/` |
| `public/portfolio/*.jpg` (27 client screenshots) | Copy → Portfolio section / Sanity `portfolioItem` | `frontend/public/portfolio/` |
| `public/llms.txt`, `favicon.svg`, `apple-touch-icon.png` | Copy + update (add Express) | `frontend/public/` |
| `tailwind.config.ts` colors+fonts (bg `#0D0118`, purple `#8224E3`, Inter+Sora) | Port tokens → Tailwind 4 `@theme` in `global.css` | frontend |
| `components/home/*` (hero, pricing, services, faq, testimonials, portfolio, process, exit-intent, inline-contact-form, quote-form, blog-preview, social-proof-strip, final-cta, marquee) | Port logic Next→Astro, apply propuesta copy | `frontend/src/components/home/` |
| `components/ui/*` (Aurora=ogl, DecryptedText, CountUp, SpotlightCard, ChatWidget) | Port as React islands only if kept; some are heavy (framer-motion/ogl) | `frontend/src/components/ui/` |
| `lib/i18n/translations.ts` + `LanguageContext.tsx` | Port ES+EN keys (defer EN unless asked) | frontend |
| `lib/gtag.ts` | Port GA4 helper; keep "fire on success" rule | frontend |
| `app/api/lead/route.ts` + `lib/lead-context.tsx` | Port → Astro API route (needs SSR adapter) | `frontend/src/pages/api/` |
| `app/sitemap.ts`, `app/robots.ts` | Port → `@astrojs/sitemap` / `robots.txt` | frontend |

**Stack deltas to handle:** Tailwind 3→4 (config → CSS `@theme`); Next `app/` router → Astro pages;
React 18→19; framer-motion/ogl animations → island or drop; `next/image` → Astro `<Image>` / Sanity image-url.

`inspiration-board/` and `scripts/gen-blog.mjs` are tooling — ignore for the port.

## Conventions

- Copy is **Spanish (MX)**, voseo/tuteo per docs ("pagás", "tenés"). EN i18n keys exist in propuesta — defer unless asked.
- GA4 events: fire on success only (e.g. `form_submit` after 200 OK, never on click). See sitemap §6.
- Sanity images: use shared `imageProjection` (width/height/lqip) from `sanity.ts`; alt required.
- WhatsApp: `wa.me/528313359341`. Don't hardcode in many places — pull from `siteSettings`.
- Match existing file style (see `Layout.astro`, `Card.astro`) for new `.astro` components.

## Commands

```bash
npm run dev          # root: Astro :4321 + Studio :3333 (concurrently)
npm install          # workspaces
npm run build -w frontend   # astro check + tsc + build
```

`.env` (gitignored) in both workspaces. Sanity project id `xgccta5n`, dataset `production`.
Local Studio login needs a CORS origin for `http://localhost:3333` + member access — see [PLESK_DEPLOY.md](PLESK_DEPLOY.md).

## Guardrails (from propuesta handoff rules)

- This is a redesign with money flows (Stripe) and live business copy. **Confirm before**
  hardcoding prices, payment links, or capacity counters — several are open decisions in
  [v3-00-overview.md](cwmx-propuesta-express/v3-00-overview.md) §"Decisiones que bloquean".
- Don't invent demo URLs, testimonials, metrics, or the Stripe Payment Link — those are
  "completar en Sprint 0" placeholders. Leave clearly marked TODOs.
- Work on branch `astrosanity-cheapweb-mx`.
</content>
</invoke>
