# Landing Express ($3,900) — `/express`

Landing de conversión de 1 página (Astro estático, sistema plum "El Taller Plum").
Tier piloto: sitio WordPress en 7 días por $3,900 MXN, Stripe-driven. Spec fuente:
[cwmx-propuesta-express/v3-05-sitemap-y-secciones.md](cwmx-propuesta-express/v3-05-sitemap-y-secciones.md)
(secciones S01–S09). Sistema visual: [DESIGN.md](DESIGN.md). Estrategia: [PRODUCT.md](PRODUCT.md).

## Stack y enfoque

- **Astro `.astro` estático, cero JS de UI.** FAQ = `<details>/<summary>` nativo; header
  sticky = CSS `position:sticky`; acordeón animado con `grid-template-rows`. Único script:
  tracking GA4 on-click (no-op hasta que exista `gtag`). "Speed is design".
- **Copy hardcodeado** (static-first, decisión confirmada). Valores volátiles aislados en
  [frontend/src/config/express.ts](frontend/src/config/express.ts). Sanity `expressPage`
  singleton = follow-up, no construido aún.
- **Mobile-first**, contraste WCAG AA verificado (muted #7A6896 = solo large/bold).

## Rutas y archivos

| Ruta | Archivo |
|---|---|
| `/express` | `frontend/src/pages/express/index.astro` — arma S01–S09 + JSON-LD (`Offer` + `FAQPage`) + script GA4 |
| layout | `frontend/src/layouts/LandingLayout.astro` — full-bleed plum, head SEO, slot `head` |

Componentes en `frontend/src/components/express/`:

| Componente | Sección | Notas |
|---|---|---|
| `Header.astro` | header sticky | logo `cheapweb.mx` (izq) · cupos como "menú" (centro) · `Reservar` (der) |
| `HeroExpress.astro` | S01 | precio-forward, glow plum CSS, CTA con pulse |
| `OfferSummary.astro` | S02 | banda de 3 hechos (precio/entrega/pago) + ancla `#demos` |
| `PainSolution.astro` | S03 | 2 columnas asimétricas (apagado vs plum-lit) |
| `DemoGrid.astro` | S04 | **integra Fábrica de Demos** (ver abajo) |
| `ScopeClarity.astro` | S05 | incluido/no incluido. Es 1 landing de hasta 5 secciones (no multipágina) |
| `WhyThisPrice.astro` | S06 | banda surface, 3 razones en cards + numerales plum, blockquote competitivo |
| `GuaranteeBlock.astro` | trust | centro: "7 días o 100% de vuelta" (factual) |
| `TrustStrip.astro` | trust | chips del stack incluido + 4 reaseguros (factual) |
| `ProcessSteps.astro` | S07 | secuencia real 01–05 con riel vertical |
| `Testimonials.astro` | social proof | placeholders honestos (no se inventan quotes) |
| `FaqExpress.astro` + `faqData.ts` | S08 | acordeón `<details>`; `faqData` alimenta también el JSON-LD |
| `FinalCtaExpress.astro` | S09 | precio anclado, panel plum-lit, doble CTA |
| `Cta.astro` | — | botón compartido (primary pill / ghost), `data-ga`, pulse |
| `WhatsAppFab.astro` | — | pill flotante persistente |

Orden en página: Hero → Offer → Pain → **Demos** → Scope → Why → **Guarantee** →
**Trust** → Process → **Testimonials** → FAQ → Final. Fondos alternan bg/surface (ritmo).

## Integración con la Fábrica de Demos (`/demos`)

S04 `DemoGrid` pide los demos reales en vez de mockups:
- `getDemos()` (Sanity, `status == "published"`) → reusa el componente compartido
  `components/demos/DemoCard.astro`. Muestra hasta 6 + enlace "Ver todas → /demos".
- **Fallback honesto:** sin demos publicados (o Sanity caído) → tiles "pendiente". Build
  sobrevive sin project id (`loadQuery` → `[]`).
- **Loop cerrado:** cada `DemoCard.hireCta` regresa a `/express` ("contratar uno igual").
- Demos nuevos (`npm run gen-demo`) aparecen solos en ambos lados al siguiente rebuild.

Detalle de la fábrica: [DEMOS.md](DEMOS.md).

## ⚠️ Pendientes / decisiones abiertas (Sprint 0)

Aislados en `config/express.ts`, marcados con `TODO`. No tratar como finales hasta que
Alejandro confirme (ver [v3-00-overview.md](cwmx-propuesta-express/v3-00-overview.md) §Decisiones):

| Qué | Dónde | Estado |
|---|---|---|
| **Stripe Payment Link** | `express.stripePaymentLink` (vacío) | CTAs caen a WhatsApp como fallback; sin botón muerto |
| **Cupos counter** (5/sem, 2 reservados) | `express.cupos` | decisión #4 capacidad real |
| **Garantía 100%** | `express.guarantee100` (toggle) | decisión #5; copy se adapta si se apaga |
| **Testimonios** | `express.testimonials[]` (vacío) | no inventar; placeholders hasta tener reales |
| **GA4 id** | sin cargar | eventos cableados (`checkout_started`, `click_cta_express`), no-op hasta cargar gtag |

## Comandos

```bash
npm run dev -w frontend      # Astro :4321 → /express
npm run build -w frontend    # astro check + tsc + build (estático)
```
