# Home `/` — cheapweb.mx

Landing principal (Astro estático, sistema plum "El Taller Plum"). 3 planes
(Smart $8K / Pro $16K / Pro+Tienda $24K), founder-led, consultivo (TidyCal +
WhatsApp). Spec fuente: [v3-05-sitemap-y-secciones.md](cwmx-propuesta-express/v3-05-sitemap-y-secciones.md)
§4 (secciones H01–H14). Sistema visual: [DESIGN.md](DESIGN.md). Estrategia: [PRODUCT.md](PRODUCT.md).

> `/` ahora es el landing (antes era el template blog Astro+Sanity).
> [Card.astro](frontend/src/components/Card.astro) y [Welcome.astro](frontend/src/components/Welcome.astro)
> quedaron huérfanos (sin ruta de listado de blog por ahora).

## Stack y enfoque

- **Astro `.astro` estático.** Cero JS de UI salvo: el form de contacto (compone
  WhatsApp prefill) y el tracking GA4 on-click. FAQ = `<details>` nativo.
- **Copy hardcodeado** (static-first). Valores volátiles + pricing aislados en
  [frontend/src/config/home.ts](frontend/src/config/home.ts). Sanity `homePage`
  singleton = follow-up no construido.
- **Reusa de express:** `Cta`, `WhatsAppFab`, `Testimonials`; y de demos: `DemoCard`.
- Mobile verificado a 390px real (CDP: `scrollWidth==390`, sin overflow).

## Rutas y archivos

| Ruta | Archivo |
|---|---|
| `/` | `frontend/src/pages/index.astro` — arma H01–H14 + JSON-LD (`Organization` + `FAQPage`) + script GA4 |
| layout | `frontend/src/layouts/LandingLayout.astro` — full-bleed plum (compartido con /express) |

Componentes en `frontend/src/components/home/`:

| Componente | Sección | Notas |
|---|---|---|
| `HomeHeader.astro` | header | logo · cupos "menú" (6 cupos este mes) · "Agenda 15 min" |
| `HomeHero.astro` | H01 | "Tu negocio en internet. En 14 días.", CTA book + WhatsApp |
| `SocialProofStrip.astro` | H02 | "Confían en nosotros" — chips de industrias (de `getNiches`, fallback estático) |
| `Services.astro` | H03 | 4 áreas con entregables concretos (sin métricas falsas) |
| `InlineContactForm.astro` | H04 | form → **WhatsApp prefill** (sin backend; `/api/lead` flagged) |
| `Pricing.astro` | H05 | 3 planes, Pro recomendado (anillo plum), cross-sell → /express |
| `WhyThisPriceHome.astro` | H06 | banda surface, 3 razones en cards + comparativa agencia |
| `ComparisonTable.astro` | H07 | tabla 4-col, columna cheapweb resaltada, scroll horizontal + fade-hint en móvil |
| `ProcessHome.astro` | H08 | secuencia real 01–05 con riel |
| `Portfolio.astro` | H09 | **reusa `getDemos` + DemoCard** (demos reales) + fallback honesto |
| (express) `Testimonials.astro` | H10 | placeholder honesto (componente compartido) |
| `Founder.astro` | H11 | bio Alejandro, avatar placeholder (foto pendiente), métricas de config |
| `BlogPreview.astro` | H12 | 3 posts recientes reales (`getPosts`) |
| `FaqHome.astro` + `homeFaqData.ts` | H13 | acordeón `<details>`; `homeFaqs` alimenta el JSON-LD |
| `FinalCtaHome.astro` | H14 | urgencia honesta (cupos + "abre en julio"), doble CTA |

Fondos alternan bg/surface para ritmo.

**Capa UX (mejoras):**
| Componente | Rol |
|---|---|
| `HomeEnhancements.astro` | scroll-reveal (Services/Pricing stagger + Founder) + count-up en métricas. Reduced-motion safe; failsafe 2.6s para que nada quede en blanco sin scroll. |
| `MobileCtaBar.astro` | barra CTA sticky móvil (precio + WhatsApp + "Agenda 15 min"), aparece tras `#hero-end`. `WhatsAppFab mobileHidden` evita choque. |

## Blog

18 posts de producción importados a Sanity (`scripts/import-blog.mjs`, ver commit/CLAUDE.md reuse map).
Índice `/blog` (grid + filtro por categoría, JS mínimo) reusa `components/blog/PostCard.astro`
(también usado por home H12). Posts en `/post/[slug]`. Orden por `publishedAt`. Schema `post`
extendido: `publishedAt` / `category` / `readTime`.

## Integración con la Fábrica de Demos

H09 Portfolio reusa el mismo patrón que /express: `getDemos()` → `DemoCard`
(hasta 6 + link "Ver todos → /demos"). Loop cerrado: `DemoCard.hireCta` regresa a
un plan / express. Detalle: [DEMOS.md](DEMOS.md), [EXPRESS.md](EXPRESS.md).

## ⚠️ Pendientes / decisiones abiertas (Sprint 0)

Aislados en `config/home.ts`, marcados `TODO`. No tratar como finales hasta que
Alejandro confirme (ver [v3-00-overview.md](cwmx-propuesta-express/v3-00-overview.md) §Decisiones):

| Qué | Dónde | Estado |
|---|---|---|
| **Precios** $8K/$16K/$24K | `plans[]` | decisión #2 (SKUs); render como 3 con Pro recomendado |
| **TidyCal URL** | `home.tidyCalUrl` (vacío) | CTAs "Agenda" caen a WhatsApp fallback |
| **Cupos** (6/mes, 4 reservados) | `home.cupos` | decisión #4 capacidad real |
| **Garantía / devolución** | `home.guarantee` | decisión #5 |
| **Métricas founder** (120+/3+/4.9★/13d) | `founderMetrics` | placeholder — no inventar, confirmar |
| **Foto Alejandro** | `Founder.astro` `photo.available=false` | avatar placeholder hasta `/public/alejandro.jpg` |
| **`/api/lead`** (n8n→GHL) | `InlineContactForm.astro` | TODO hasta adapter SSR; form usa WA prefill |
| **GA4 id** | sin cargar | eventos cableados (`click_cta_tidycal/whatsapp`, `form_submit`), no-op hasta gtag |

## Comandos

```bash
npm run dev -w frontend      # Astro :4321 → /
npm run build -w frontend    # astro check + tsc + build (estático)
```
