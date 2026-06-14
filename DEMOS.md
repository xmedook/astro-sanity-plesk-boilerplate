# Fábrica de Demos (Astro + Sanity)

Portafolio de sitios demo por nicho. Cada demo es una landing ligera, estructurada en
Sanity, indexable por SEO, con CTA "contratar uno igual" de vuelta a la home/express.

Referencia de diseño: [loma.buybaja.com](https://loma.buybaja.com/en). La card del grid
replica el mockup "SITIO REAL" (chrome + dispositivos + label de nicho + chips + CTA).

## Cómo funciona

```
nicho ──► scripts/gen-demo.mjs ──► Claude (copy + SEO) ──► Sanity (demo + niche) ──► rebuild ──► /demos
```

- **Generación = segundos.** El script produce copy/SEO y escribe el doc a Sanity.
- **Aparece en vivo = al siguiente rebuild.** El sitio es estático (`output: "static"`),
  así que un demo nuevo se publica cuando corre el build (manual o vía webhook → ver abajo).
  Esto NO es publish instantáneo en vivo; para eso haría falta un adapter SSR (descartado).
- **Se agregan solos.** El grid hace query de todos los `demo` con `status == "published"`.
  No hay que tocar código al sumar un demo — solo publicarlo y rebuildeear.

## Generar un demo

```bash
# Borrador (default). Revisa en Studio antes de publicar.
npm run gen-demo -- --niche "Restaurante" --location "CDMX"

# Publicado directo
npm run gen-demo -- --niche "Dentista" --location "Monterrey" --publish

# Sin escribir a Sanity (imprime el JSON)
npm run gen-demo -- --niche "Gym" --dry
```

Usa el CLI `claude` ya autenticado (`claude -p --output-format json`) — **no** necesita
`ANTHROPIC_API_KEY`. Modelo: `claude-sonnet-4-6`.

Env requerido (`.env` en root, gitignored):

| Var | Para |
|---|---|
| `SANITY_WRITE_TOKEN` | Token de escritura Sanity (rol Editor) |
| `SANITY_PROJECT_ID` | default `xgccta5n` |
| `SANITY_DATASET` | default `production` |

**Slug determinista** = `slugify(nicho-location)` (ej. `restaurante-cdmx`). Re-correr el
script **reemplaza** el mismo doc (`createOrReplace`), no crea duplicados aunque la IA
invente otro nombre de marca.

**Imágenes verificadas:** el generador NO deja que la IA adivine URLs (riesgo 404). Inyecta
un set curado de Unsplash por nicho (`NICHE_IMAGES` en el script, IDs verificados 200) → 1
hero + 3 galería. Para un nicho sin entrada en el mapa, esas secciones se omiten (sin imágenes
rotas). Para agregar un nicho: añade su entrada a `NICHE_IMAGES` con IDs verificados.

La IA genera el copy de todas las secciones (hero, features, stats, reviews, location, faq,
cta); las imágenes se inyectan aparte.

## Mockups de las cards (screenshots auto)

La card del grid muestra un screenshot real del demo (`deviceMockup`). Se captura solo:

```bash
# Necesita el sitio corriendo (npm run dev) en --base (default localhost:4321)
npm run shoot-mockup -- --all                 # todos los publicados
npm run shoot-mockup -- --slug restaurante-cdmx
```

`scripts/shoot-mockup.mjs` (Playwright): abre cada `/demos/[slug]`, oculta el ribbon meta,
captura 1280×800 @2x (16:10, aspecto de la card), sube el PNG a Sanity y parchea
`demo.deviceMockup`. Sin screenshot, la card cae al placeholder "Mockup TODO".

`gen-demo` **preserva** un `deviceMockup` existente al regenerar copy (no lo borra). Tras
cambiar el diseño de las secciones, re-corre `shoot-mockup` para refrescar las imágenes.

## Modelo de contenido (Sanity)

| Tipo | Rol |
|---|---|
| `niche` (doc) | Taxonomía + keywords SEO + paleta default |
| `demo` (doc) | La landing: card + secciones + SEO + `hireCta` + `status` |
| `palette` (obj) | Colores hex (`primary`/`bg`/`accent`) del nicho o demo |
| 8 objetos de sección toggleables (`enabled`) en `demo.sections[]` | ver tabla abajo |

### Secciones (orden por defecto del generador)

| `_type` | Sección | Notas |
|---|---|---|
| `demoHero` | Hero | `variant`: `fullbleed` / `split` / `minimal`. Imagen Sanity o `imageUrl` |
| `demoFeatures` | Servicios | `variant`: `grid` / `rows` (numeradas) / `list` · `#servicios` |
| `demoPricing` | Precios / planes | 3 planes, uno `highlighted` (ring + badge) · `#precios` |
| `demoSlider` | Carrusel | scroll-snap + flechas + autoplay (vanilla JS, reduced-motion) · `#destacados` |
| `demoStats` | Métricas/confianza | banda de 4 stats |
| `demoReviews` | Reseñas GMB | mockup Google (card blanca, rating, avatares de iniciales) · `#resenas` |
| `demoGallery` | Galería | `images` Sanity o `imageUrls` externas · `#galeria` |
| `demoLocation` | Ubicación + contacto | iframe Google Maps (sin API key) + form · `#ubicacion` |
| `demoFaq` | FAQ | acordeón `<details>` · `#faq` |
| `demoCta` | CTA final | `#contacto` |

### Recipes — por qué no se ven clonadas

El generador NO usa un orden fijo. Define **recipes** (orden de secciones + variantes de
hero/features) y asigna una por nicho con un hash determinista del slug, así dos nichos no
comparten esqueleto:

| Recipe | Hero | Forma |
|---|---|---|
| **A** image-forward | `fullbleed` | hero → slider → pricing → features(list) → reviews → gallery → location → faq → cta |
| **B** trust-first | `split` | hero → stats → features(rows) → pricing → reviews → location → faq → cta |
| **C** bold/typographic | `minimal` | hero → stats → pricing → features(grid) → slider → gallery → location → cta |

Cada `demo.sections[]` queda con orden + variantes propios. En el **grid**, cada card adopta
el color primario de su demo (label, dot, CTA, borde del chrome) → variedad visible sin abrir.

## Look & feel del demo (sitio propio, no genérico)

Cada `/demos/[slug]` se renderiza con `Layout bare` → **sin** header/footer global de
cheapweb. El demo monta su propio chrome:

- **Ribbon** delgado arriba: única ruptura de la cuarta pared (`← Demo · Portafolio` /
  `Contratar uno igual →`).
- **`DemoHeader`**: wordmark de texto (nombre del negocio), nav con anclas a las secciones
  presentes, CTA "Contáctanos" (scroll a contacto). Sticky + backdrop-blur.
- **Footer** del demo con wordmark + meta-CTA cheapweb.

**CTAs separados:** los CTAs *dentro* del demo (hero, header, CTA final) hacen scroll a la
sección de contacto, como sitio real. La meta-CTA cheapweb ("Contratar uno igual" → `/express`)
vive **solo** en ribbon + footer.

### Paleta propia — sin fugas de plum

`[slug].astro` deriva el **set completo** de tokens desde la paleta del demo con `color-mix`,
no solo `bg/purple`. Así ninguna card/borde/input queda en el morado de cheapweb:

| Token | Deriva |
|---|---|
| `--color-purple` / `-light` | `primary` / `accent` |
| `--color-purple-dark` | `primary` 70% + negro (hover botones) |
| `--color-surface` / `-2` / `elevated` | `bg` + `primary` (12/20/28%) — cards, form, stats |
| `--color-border-solid` | `primary` 26% + `bg` — bordes, dividers |

Fondo en capas: 2 radiales `color-mix` de la paleta sobre `bg` (profundidad, no plano).
`DemoReviews` queda blanco a propósito (mockup Google creíble).

## Rutas (frontend)

| Ruta | Archivo |
|---|---|
| `/demos` | `pages/demos/index.astro` — grid + filtro por nicho (`Layout wide`) |
| `/demos/nicho/[niche]` | listado filtrado por nicho |
| `/demos/[slug]` | landing del demo (`Layout bare`, chrome propio, JSON-LD) |
| `/robots.txt`, `/sitemap-index.xml` | `@astrojs/sitemap` enumera `/demos/*` automático |

`Layout.astro` props: `wide` (container ancho para portafolio/landing) · `bare` (sin chrome
cheapweb, el demo monta el suyo).

SEO por demo: `seo.metaTitle/metaDescription`, og image = `seo.ogImage ?? deviceMockup`,
JSON-LD `CreativeWork` con keywords del nicho. Canonical/sitemap usan `site` en
`astro.config.mjs` (`PUBLIC_SITE_URL`, default `https://www.cheapweb.mx`).

## Rebuild automático (webhook)

El sitio es estático → un demo nuevo necesita rebuild para salir en vivo. Opciones:

1. **Manual** — corre el bloque de rebuild de [PLESK_DEPLOY.md](PLESK_DEPLOY.md#rebuild).
2. **Webhook Sanity → endpoint de rebuild** (recomendado):
   - Sanity → API → Webhooks → nuevo webhook.
   - Filtro GROQ: `_type == "demo" && status == "published"`.
   - Dispara un endpoint en el server que corre el bloque de rebuild de PLESK_DEPLOY.md
     (git deploy action / script que hace `npm run build` de ambos workspaces).
   - Plesk ya menciona este patrón: PLESK_DEPLOY.md §"Rebuild" nota que las re-corridas
     pueden venir "via a Sanity webhook calling a rebuild endpoint you wire up".

   Latencia típica: minutos (lo que tarda el build), no segundos.

## CTA "contratar uno igual"

Cada demo enlaza a `/express?demo=<slug>` (`demo.hireCta.href`, default editable en Studio).
GA4: marcar `demo_hire_click`. WhatsApp/Stripe deben venir de `siteSettings` cuando exista
ese singleton — **TODO**, el schema `siteSettings` aún no está creado (ver CLAUDE.md).

## TODOs marcados

- **Formulario de contacto** (`demoLocation`): es demo, sin backend. Wire a API/`siteSettings`
  o WhatsApp en producción (`data-demo-contact` en el form).
- `siteSettings`: fuente de WhatsApp/Stripe/GA4 para el `hireCta`/GA4 `demo_hire_click`.
- Webhook de rebuild: wire-up del endpoint en el server.
- `NICHE_IMAGES`: solo cubre restaurante/dentista/gimnasio. Añadir IDs verificados por nicho nuevo.
