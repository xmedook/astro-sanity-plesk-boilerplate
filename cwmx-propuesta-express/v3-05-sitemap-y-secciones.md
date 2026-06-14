# v3.05 — Sitemap y Especificación de Secciones

> **Propósito:** Source of truth para desarrollo. Copy exacto, orden de secciones, nombres de componentes, CTAs y flujos técnicos para cheapweb.mx y cheapweb.mx/express.
> **Versión:** 1.0 — 2026-06-04
> **Depende de:** v3-04 (copy), v3-02 (producto/pricing), v3-03 (funnel)
> **Regla:** Todo cambio de copy o estructura se actualiza AQUÍ primero, luego en el repo.

---

## 1. Sitemap

```
cheapweb.mx/
├── /                          → Landing principal (home)
├── /express                   → Landing Express $3,900
│   └── /express/brief         → Form post-pago (requiere session_id Stripe)
├── /blog                      → Grid de artículos
│   └── /blog/[slug]           → Artículo individual
├── /gracias                   → Confirmación form (home)
└── /express/gracias           → Confirmación brief enviado
```

**Notas técnicas:**
- `/express` y `/` son rutas de la misma app Next.js — no requieren DNS extra
- `/express/brief` requiere query param `?session_id=xxx` validado contra Stripe
- `new.cheapweb.mx` (staging) espeja la misma estructura con noindex triple

---

## 2. Especificación: `/express`

**Stack:** Next.js · Tailwind · componentes en `components/express/`
**Analytics:** GA4 events `click_cta_express`, `checkout_started`, `payment_completed`, `brief_submitted`
**SEO:** Schema.org `Offer` con precio $3,900 + plazo 7 días

---

### S01 · Hero
```
order: 1
component: HeroExpress
file: components/express/HeroExpress.tsx
sticky_badge: true
```
```
badge_sticky: "🔥 5 cupos esta semana · 2 ya reservados"

h1: "Tu sitio web profesional por $3,900 MXN."
h2: "Listo en 7 días. Con tracking incluido."

subtitle: |
  Normalmente desde $8,000 MXN. Hoy $3,900.
  WordPress + dominio + hosting + GA4 + Pixel. Pago seguro con Stripe.

cta_primary:
  text: "Pagar $3,900 con Stripe →"
  action: [Stripe Payment Link — URL por definir en Sprint 0]
  ga4_event: checkout_started

cta_secondary:
  text: "¿Dudas? Hablar por WhatsApp"
  action: wa.me/528313359341

trust_bullets:
  - "✓ Pago único · sin contratos"
  - "✓ Si no entregamos en 7 días, te devolvemos el 100%"
  - "✓ WordPress editable — tuyo para siempre"
  - "✓ GA4 + Meta Pixel configurados desde el día 1"
```

---

### S02 · Offer Summary
```
order: 2
component: OfferSummary
file: components/express/OfferSummary.tsx
```
```
row_1: "PRECIO PILOTO  ·  $3,900 MXN · pago único"
row_2: "ENTREGA  ·  7 días hábiles · garantizado"
row_3: "PAGO  ·  Stripe seguro · tarjeta · sin tarjeta guardada"

link:
  text: "Ver demos reales →"
  anchor: "#demos"
```

---

### S03 · Pain → Solution
```
order: 3
component: PainSolution
file: components/express/PainSolution.tsx
layout: two_columns
```
```
h2: "Tu página vieja está perdiendo clientes."

column_left_header: "✗ Tu sitio actual"
column_left:
  - "Tarda más de 3 segundos en cargar"
  - "No se ve bien en celular"
  - "No tiene botón claro de WhatsApp"
  - "Se ve 'del 2018'"
  - "No convierte visitas en mensajes"

column_right_header: "✓ Lo que entregamos"
column_right:
  - "Carga rápido en móvil y desktop"
  - "Diseño mobile-first 2026"
  - "CTA principal visible siempre"
  - "Diseño moderno que genera confianza"
  - "Estructura clara hacia contacto"
```

---

### S04 · Live Demos
```
order: 4
component: DemoGrid
file: components/express/DemoGrid.tsx
id: "demos"
```
```
h2: "Diseñado para negocios como el tuyo."
subtitle: |
  No son mockups. Cada tarjeta abre un sitio real. Probá los formularios,
  el WhatsApp, mirá cómo se ve en tu celular.

grid: 5x2 (10 thumbnails)
badge_per_card: "DEMO REAL"
industries:
  - Restaurante
  - Inmobiliaria
  - Clínica
  - Tienda local
  - Spa
  - Hotel
  - Constructora
  - Despacho profesional
  - Coach / consultor
  - Negocio local

assets: /public/demos/express/*.webp  (10 imágenes, mín 400×300)
links: URLs reales de demos — lista a completar en Sprint 0

cta_below_grid:
  text: "Ya vi suficiente → Pagar $3,900 con Stripe"
  action: [Stripe Payment Link]
  ga4_event: checkout_started
```

---

### S05 · Included / Not Included
```
order: 5
component: ScopeClarity
file: components/express/ScopeClarity.tsx
layout: two_columns
```
```
h2: "Alcance claro desde el principio."

column_included_header: "✓ INCLUIDO por $3,900"
included:
  - "Hasta 5 páginas/secciones"
  - "WordPress mobile-first editable"
  - "WhatsApp flotante + form contacto"
  - "Dominio .com/.mx 1 año"
  - "Hosting 1 año"
  - "5 correos corporativos"
  - "GA4 + Meta Pixel configurados"
  - "SEO básico (title/meta/H1)"
  - "2 rondas de revisión"
  - "SSL gratis"

column_excluded_header: "✗ NO INCLUIDO en este sprint"
excluded:
  - "Más de 5 páginas"
  - "Blog integrado"
  - "Tienda en línea / WooCommerce"
  - "Fotografía profesional"
  - "SEO avanzado o link building"
  - "Campañas de ads (gestión mensual)"
  - "Google Workspace / Microsoft 365"
  - "Revisiones ilimitadas (2 incluidas)"
  - "Mantenimiento post-entrega*"

footer_note: "*Mantenimiento disponible desde $799/mes · opcional · después del pago"

addons_note: |
  ¿Necesitás algo más? Después del pago te ofrecemos add-ons sin presión:
  correos adicionales, más secciones, mantenimiento, upgrade a Smart.
```

---

### S06 · Why This Price
```
order: 6
component: WhyThisPrice
file: components/express/WhyThisPrice.tsx
```
```
h2: "¿Por qué $3,900 y no $8,000 como los demás?"

intro: "Pregunta justa. Tres razones:"

reason_01:
  title: "Plantilla premium, no diseño desde cero"
  body: |
    Trabajamos con una base de diseño probada y la personalizamos con tus
    colores, textos, fotos y logo. No es Wix — es WordPress profesional con
    un atajo inteligente que nos permite cobrar menos sin entregar menos.

reason_02:
  title: "Máximo 5 sitios por semana"
  body: |
    No aceptamos 20 simultáneos. 5 a la semana, máximo. Eso nos permite
    cumplir los 7 días y respaldar el reembolso si no lo hacemos.

reason_03:
  title: "Es la puerta de entrada, no el techo"
  body: |
    Primero entregamos. Si tu negocio crece, upgradeás a Smart ($8K),
    Pro ($16K) o Pro+Tienda ($24K). El resto viene después, solo si
    tiene sentido.

competitive_note:
  visible: true
  text: |
    "La alternativa más conocida de este segmento cobra $4,800 MXN —
    sin WordPress editable, sin GA4, sin Pixel, con solo 1 revisión.
    cwmx Express: $3,900 · WordPress · tracking · 2 revisiones."
  style: blockquote_subtle
```

---

### S07 · Process
```
order: 7
component: ProcessSteps
file: components/express/ProcessSteps.tsx
```
```
h2: "Del pago al sitio publicado, sin handoffs raros."

steps:
  - n: "01"
    text: "Pagás $3,900 con Stripe (60 segundos)"
  - n: "02"
    text: "Te llegamos por WhatsApp con el link de tu brief"
  - n: "03"
    text: "Llenás el brief (logo, textos, fotos, accesos) en ~10 minutos"
  - n: "04"
    text: "Construimos tu sitio + configuramos GA4 y Pixel (7 días hábiles)"
  - n: "05"
    text: "Revisás, ajustamos (2 rondas), publicamos en tu dominio"
```

---

### S08 · FAQ Express
```
order: 8
component: FAQExpress
file: components/express/FAQExpress.tsx
schema: FAQPage (JSON-LD)
```
```
h2: "Preguntas directas."

faqs:
  - q: "¿Cuándo empiezan los 7 días?"
    a: |
      Cuando recibimos tu brief completo (logo, textos, fotos, accesos).
      No antes. Si tardás en mandar el brief, el reloj se pausa.

  - q: "¿Y si no tengo logo ni fotos profesionales?"
    a: |
      Te diseñamos un logo básico y usamos imágenes premium/stock.
      Cero estrés.

  - q: "¿Qué pasa si no entregan en 7 días?"
    a: "Te devolvemos el 100% íntegro. Sin preguntas."

  - q: "¿Puedo editar el sitio yo después?"
    a: |
      Sí. Es WordPress — 100% tuyo, 100% editable. Si querés que
      lo mantengamos nosotros: $799/mes, opcional.

  - q: "¿Por qué $3,900 y no $8,000?"
    a: |
      Trabajamos con base de diseño probada + máximo 5/semana.
      Misma calidad, atajo inteligente. Ver "¿Por qué este precio?" arriba.

  - q: "¿Qué tracking incluye exactamente?"
    a: |
      GA4 (Google Analytics 4) + Meta Pixel. Configurados y funcionando
      antes de la entrega. Si tenés cuenta de Ads activa, podés medir
      conversiones desde el primer día.

  - q: "¿Por qué es mejor que otras opciones a precio similar?"
    a: |
      WordPress editable (puedes cambiarlo sin pagar a nadie), GA4+Pixel
      incluidos, 5 correos, 2 revisiones. Otras opciones cobran $4,800+
      sin tracking y con plataforma cerrada.

  - q: "¿Incluye dominio y hosting?"
    a: |
      Sí. Dominio .com o .mx 1 año + hosting 1 año. Renovación posterior
      por tu cuenta — te avisamos cuánto y cómo antes de que venza.

  - q: "¿Hay cargos ocultos o mensualidades?"
    a: |
      No. $3,900 una sola vez. Después nada obligatorio. Add-ons
      (mantenimiento, correos extra) se ofrecen post-pago sin presión.

  - q: "¿Es seguro pagar?"
    a: "Sí. Stripe procesa el pago. No guardamos ningún dato de tarjeta."
```

---

### S09 · Final CTA
```
order: 9
component: FinalCTAExpress
file: components/express/FinalCTAExpress.tsx
```
```
h2: "Landing Express."

price_display:
  anchor_crossed: "~~$8,000+ MXN~~"
  price: "$3,900 MXN"
  savings: "ahorrás $4,100 (51%)"

bullets:
  - "WordPress + dominio + hosting + 5 correos + GA4 + Pixel"
  - "7 días hábiles garantizados o te devolvemos el 100%"
  - "Stripe seguro. Sin tarjeta guardada. Sin contratos."
  - "5 cupos esta semana. 2 ya reservados."

cta_primary:
  text: "Reservar mi cupo · Pagar $3,900 con Stripe →"
  action: [Stripe Payment Link]
  ga4_event: checkout_started

cta_secondary:
  text: "¿Dudas antes? Hablanos por WhatsApp"
  action: wa.me/528313359341
```

---

## 3. Especificación: `/express/brief`

**Condición de acceso:** requiere `?session_id=cs_xxx` válido en Stripe. Si no hay session_id o es inválido → redirect `/express`.

```
component: BriefForm
file: app/express/brief/page.tsx
```
```
h1: "Ya pagaste. Ahora cuéntanos de tu negocio."
subtitle: "Llenalo en ~10 minutos. Cuando recibamos todo, arrancamos."

fields:
  - id: business_name
    label: "Nombre del negocio"
    type: text
    required: true

  - id: business_type
    label: "¿Qué hace tu negocio?"
    type: textarea
    placeholder: "Ej: restaurante de comida italiana en CDMX, 3 sucursales"
    required: true

  - id: logo
    label: "Logo (si tenés)"
    type: file
    accept: ".png,.svg,.ai,.pdf"
    note: "Si no tenés, lo diseñamos básico"

  - id: colors
    label: "Colores preferidos"
    type: text
    placeholder: "Ej: azul marino y blanco, o sin preferencia"

  - id: copy_hero
    label: "Texto principal del hero"
    type: textarea
    placeholder: "¿Qué querés que diga el título grande? Ej: 'Cocina italiana auténtica en tu colonia'"
    note: "Si no tenés, lo escribimos nosotros"

  - id: copy_services
    label: "Tus productos o servicios (con precios si querés)"
    type: textarea
    required: true

  - id: photos
    label: "Fotos de tu negocio (hasta 10)"
    type: file
    accept: ".jpg,.jpeg,.png,.webp"
    multiple: true
    note: "Si no tenés, usamos stock premium gratis"

  - id: domain_preference
    label: "Dominio deseado"
    type: text
    placeholder: "Ej: mirestaurante.com o mirestaurante.mx"
    note: "Si ya tenés uno, ponlo aquí"

  - id: email_primary
    label: "Email principal de contacto"
    type: email
    required: true
    note: "Aquí te enviamos el acceso al sitio al entregar"

  - id: whatsapp
    label: "WhatsApp para coordinar"
    type: tel
    required: true

  - id: deadline_note
    label: "¿Algún deadline o fecha especial?"
    type: text
    placeholder: "Ej: necesito el sitio antes del 15 de julio"

submit:
  text: "Enviar mi brief →"
  ga4_event: brief_submitted
  action: POST /api/express/brief → n8n webhook → equipo

confirmation_page: /express/gracias
confirmation_text: |
  Recibimos tu brief. Arrancamos hoy.
  Te escribimos por WhatsApp en máximo 24h hábiles con las primeras preguntas.
```

---

## 4. Especificación: `/` (home cheapweb.mx)

**Stack:** Next.js · Tailwind · componentes en `components/home/` (ya existen — MODIFICAR, no reemplazar)

---

### H01 · Hero
```
order: 1
component: Hero  (components/home/hero.tsx — MODIFICAR)
```
```
badge: "6 cupos este mes · 4 ya reservados"

h1: "Tu negocio en internet. En 14 días."
h2: "Sin agencia, sin sorpresas, sin contratos eternos."

subtitle: |
  Normalmente $18,000+. Desde $8,000 MXN.
  Diseño profesional + WordPress + dominio + hosting 1 año.

trust_line: "Si algo sale mal, respondemos. Si no entregamos a tiempo, te devolvemos."

cta_primary:
  text: "Agenda 15 min con Alejandro →"
  action: TidyCal embed (modal o redirect)
  ga4_event: click_cta_tidycal

cta_secondary:
  text: "Hablar por WhatsApp"
  action: wa.me/528313359341 + bot precalificador
  ga4_event: click_cta_whatsapp

trust_bullets:
  - "✓ Dominio + hosting 1 año incluido"
  - "✓ WordPress editable"
  - "✓ Sin mensualidades obligatorias"
  - "✓ Aprobás el diseño antes de desarrollar"
```

---

### H02 · SocialProofStrip
```
order: 2
component: SocialProofStrip  (ya existe — mantener)
change: añadir heading "Confían en nosotros"
```

---

### H03 · Services
```
order: 3
component: Services  (ya existe — mantener)
change: asegurar bullets con métricas concretas, no genéricos
```

---

### H04 · Inline Contact Form
```
order: 4
component: InlineContactForm  (components/home/inline-contact-form.tsx — MODIFICAR copy)
```
```
h2: "¿Preferís que te contactemos?"
subtitle: "Llenás tu info y te respondemos por email + WhatsApp en menos de 2 horas hábiles."

fields:
  - label: "Nombre y apellido"   type: text
  - label: "WhatsApp (con país)" type: tel
  - label: "¿Qué tipo de negocio?"
    type: radio
    options: ["Negocio nuevo", "Ya operando", "Otro"]

cta:
  text: "Quiero que me contacten"
  action: POST /api/lead → n8n → GHL
  ga4_event: form_submit
```

---

### H05 · Pricing
```
order: 5
component: Pricing  (components/home/pricing.tsx — MODIFICAR)
badge: "Transparencia total"
h2: "Tres planes. Cero letra chica."
```

**Card 1 — Smart**
```
badge: "Para empezar"  (estilo sutil)
name: "Smart"
price: "$8,000 MXN · pago único"
subtitle: "Para negocios que necesitan presencia ya."

included:
  - "1 landing profesional"
  - "Diseño mobile-first custom"
  - "Dominio .com/.mx 1 año"
  - "Hosting 1 año"
  - "3 correos corporativos"
  - "SSL gratuito"
  - "1 ronda de revisiones"
  - "Entrega en 12–14 días"

excluded:
  - "Más de 1 página/sección"
  - "Blog, tienda, chat flotante"
  - "SEO avanzado"
  - "Pixel Meta o Google Tag"
  - "Administración post-entrega*"

footnote: "*Mantenimiento opcional desde $799/mes"

cta:
  text: "Lo quiero"
  action: wa.me/528313359341
  ga4_event: click_cta_whatsapp
```

**Card 2 — Pro (RECOMENDADO)**
```
badge: "⭐ Recomendado · el 80% elige este"  (borde destacado, color sólido)
name: "Pro"
price: "$16,000 MXN · pago único"
subtitle: "Para negocios que quieren ser encontrados y convertir."

included:
  - "3 páginas/secciones"
  - "Todo lo del plan Smart"
  - "Blog integrado"
  - "WhatsApp flotante"
  - "SEO on-page (títulos, meta, H1, estructura)"
  - "Google Analytics + Search Console"
  - "10 correos corporativos"
  - "1 ronda de revisiones"
  - "Entrega en 16–18 días"

excluded:
  - "Tienda en línea / WooCommerce"
  - "Más de 3 páginas"
  - "Pixel/Tag avanzado"
  - "Campañas de ads"
  - "SEO mensual o link building"

cta:
  text: "Es para mí"
  action: wa.me/528313359341
  ga4_event: click_cta_whatsapp
  style: destacado (fondo sólido)
```

**Card 3 — Pro+Tienda**
```
badge: "Si vendes en línea"  (estilo sutil)
name: "Pro+Tienda"
price: "$24,000 MXN · pago único"
subtitle: "Para negocios que van a vender en línea."

included:
  - "Todo lo del plan Pro"
  - "WooCommerce configurado"
  - "Hasta 50 productos cargados"
  - "Pasarela de pago (Stripe o Mercado Pago)"
  - "Gestión de envíos"
  - "Capacitación 1 hora"
  - "Entrega en 20–28 días"

excluded:
  - "Más de 50 productos"
  - "Fotografía de productos"
  - "Manejo de inventario post-entrega"
  - "Campañas de ads para tienda"
  - "SEO avanzado e-commerce"
  - "Integraciones ERP"

cta:
  text: "Quiero vender en línea"
  action: wa.me/528313359341
  ga4_event: click_cta_whatsapp
```

**Footer cross-sell:**
```
text: "¿Solo necesitás una landing rápida con tracking incluido?"
link:
  text: "Landing Express → $3,900 MXN · 7 días"
  href: /express
```

---

### H06 · Why This Price
```
order: 6
component: WhyThisPrice  (components/home/why-this-price.tsx — NUEVO)
badge: "Transparencia"
h2: "¿Por qué tan barato? ¿Es confiable?"
```
```
intro: "Pregunta justa. Respuesta corta: no es barato, es precio justo."

reasons:
  - n: "01"
    title: "Sin oficinas, sin vendedores, sin intermediarios"
    body: |
      No pagás renta de oficina en Polanco, ni comisiones de vendedores,
      ni "ejecutivos de cuenta" que sólo reenvían correos. Pagás directo
      al equipo que construye tu sitio.

  - n: "02"
    title: "Sólo 6 proyectos al mes"
    body: |
      No aceptamos 20 sitios simultáneos. 6 al mes, máximo. Mantenemos
      calidad sin inflar el equipo — ni el precio.

  - n: "03"
    title: "Entrada al ecosistema, no producto final"
    body: |
      Si tu sitio queda increíble y necesitás SEO avanzado, ads, automatizaciones
      o crecimiento, tenemos nexodigital. Primero entregamos rápido. La relación
      larga viene después, sólo si tiene sentido para ti.

footer: |
  Un sitio web comparable en agencia tradicional: $18,000–$45,000 MXN.
  Mismo resultado, mismo WordPress, misma calidad — sin el sobreprecio.
```

---

### H07 · Comparison Table
```
order: 7
component: ComparisonTable  (components/home/comparison-table.tsx — NUEVO)
badge: "Sin trucos de marketing"
h2: "Compáralo tú mismo."
```
```
columns: ["cheapweb.mx", "Freelancer", "Agencia", "Wix / DIY"]
rows:
  - label: "Entrega"
    values: ["12–28 días", "2–8 semanas", "1–4 meses", "Indefinido"]
  - label: "Diseño personalizado"
    values: ["✓ Sí", "A veces", "✓ Sí", "✗ Template"]
  - label: "Dominio + hosting"
    values: ["✓ Incluido 1 año", "Negociable", "Factura aparte", "Factura aparte"]
  - label: "Mobile-first"
    values: ["✓ Sí", "A veces", "✓ Sí", "Básico"]
  - label: "SEO configurado"
    values: ["✓ Sí", "Casi nunca", "✓ Sí", "Tú lo haces"]
  - label: "WhatsApp + CTA"
    values: ["✓ Sí", "Si lo pedís", "✓ Sí", "Tú configurás"]
  - label: "Soporte post-entrega"
    values: ["✓ Opcional", "Si hay suerte", "✓ Caro", "No existe"]
  - label: "Inversión total"
    values: ["$8K–$24K", "$3K–$15K", "$25K–$80K", "$0 + 40–100h"]

highlight_column: 0  (cheapweb.mx — fondo diferenciado)

cta:
  text: "La diferencia es clara. ¿Hablamos?"
  action: TidyCal
  ga4_event: click_cta_tidycal
```

---

### H08 · Process
```
order: 8
component: Process  (ya existe — ajustar tono a directo)
```
```
h2: "Cómo funciona."

steps:
  - n: "01"  text: "Brief — formulario o WhatsApp (15 min)"
  - n: "02"  text: "Diseño — aprobás al 100% antes de desarrollar"
  - n: "03"  text: "Desarrollo — WordPress + tu contenido"
  - n: "04"  text: "Revisión y ajustes"
  - n: "05"  text: "Lanzamiento — deploy + capacitación"
```

---

### H09 · Portfolio
```
order: 9
component: Portfolio  (ya existe — MODIFICAR: links vivos obligatorios)
h2: "Sitios que entregamos."

rule: cada card DEBE tener href a URL real del cliente
      si URL no existe: badge "Entregado [año]" sobre screenshot (no link)
```

---

### H10 · Testimonials
```
order: 10
component: Testimonials  (ya existe — mantener)
change: añadir fecha a cada testimonio + "Verificado" si hay Google Review
```

---

### H11 · Founder
```
order: 11
component: Founder  (components/home/founder.tsx — NUEVO)
badge: "Quién está detrás"
h2: "Trabajás directo con quien construye tu sitio."
```
```
photo:
  src: /public/alejandro.jpg
  alt: "Alejandro — fundador cheapweb.mx"
  size: 400×400 mín, WebP

body: |
  Soy Alejandro. cheapweb.mx nació porque vi demasiados negocios mexicanos
  pagando $20,000+ por sitios web genéricos que no convertían — o peor,
  sin sitio porque "es muy caro" o "tarda meses".

  Arranqué cheapweb con una regla: precio justo, entrega rápida, cero
  sorpresas. Sin vendedores, sin "ejecutivos de cuenta", sin letra chica.

  Cuando reservás tu proyecto, hablás conmigo. Yo reviso tu brief, yo
  dirijo el diseño, yo me aseguro de que entreguemos a tiempo. Si algo
  sale mal, respondo yo.

metrics:
  - label: "Sitios entregados"    value: "120+"
  - label: "Años en el mercado"   value: "3+"
  - label: "Calificación clientes" value: "4.9★"
  - label: "Entrega promedio"     value: "13 días"

cta:
  text: "Agenda 15 min conmigo →"
  action: TidyCal
  ga4_event: click_cta_tidycal
```

---

### H12 · Blog Preview
```
order: 12
component: BlogPreview  (ya existe — mantener)
change: CTA de cada tarjeta → "Reservar mi lugar →" → WhatsApp
articles: 3 más recientes del blog
```

---

### H13 · FAQ Home
```
order: 13
component: FAQ  (ya existe — MODIFICAR copy)
schema: FAQPage (JSON-LD)
h2: "Preguntas frecuentes. Respuestas directas."
```
```
faqs:
  - q: "¿Por qué tan barato comparado con una agencia?"
    a: |
      Sin oficinas, sin vendedores, sin intermediarios. 6 proyectos al mes máximo.
      Pagás directo al equipo. Misma calidad, sin el sobreprecio.

  - q: "¿Es confiable? ¿No es scam?"
    a: |
      120+ sitios entregados, 3+ años operando, 4.9★.
      Si no entregamos lo prometido, te devolvemos.

  - q: "¿Qué pasa si no me gusta el diseño?"
    a: |
      Lo aprobás al 100% antes de desarrollar. Si no te gusta, iteramos.
      Si aún así no funciona, te devolvemos.

  - q: "¿Cuánto tiempo tarda?"
    a: |
      Smart: 12–14 días. Pro: 16–18 días. Pro+Tienda: 20–28 días.
      El reloj arranca cuando recibimos tu brief y materiales.

  - q: "¿Puedo modificar el sitio yo mismo después?"
    a: |
      Sí. Usamos WordPress. Te capacitamos para que edites textos,
      imágenes y productos sin depender de nosotros.

  - q: "¿Qué incluye el hosting?"
    a: |
      Hosting 1 año. Dominio .com/.mx 1 año. SSL gratis. Correos corporativos.
      La renovación anual posterior es por tu cuenta — te decimos cuánto y cómo.

  - q: "¿Ofrecen mantenimiento?"
    a: |
      Sí, desde $799/mes. Backups, actualizaciones, soporte y hasta
      2 cambios de contenido al mes. Totalmente opcional.

  - q: "¿Hacen tiendas en línea más grandes?"
    a: |
      Pro+Tienda cubre hasta 50 productos. Para catálogos más grandes
      o integraciones avanzadas, derivamos a nexodigital.

  - q: "¿Quién hace realmente el sitio?"
    a: |
      Alejandro (fundador) dirige el diseño y revisa cada entrega.
      El desarrollo lo hace el equipo cheapweb. Sin "juniors" escondidos.

  - q: "¿Qué necesito para empezar?"
    a: |
      Tu logo (si tenés), textos, fotos de tu negocio, y acceso a tu
      dominio actual si ya tenés uno. Si no tenés nada, lo armamos desde cero.

  - q: "¿Y si sólo necesito una landing rápida sin tanto?"
    a: |
      Mirá Landing Express ($3,900 MXN, 7 días, WordPress + GA4 + Pixel incluido).
      → cheapweb.mx/express
```

---

### H14 · Final CTA Home
```
order: 14
component: FinalCTA  (ya existe — MODIFICAR copy)
```
```
h2: "¿Listo para tener tu sitio web?"

subtitle: |
  Aprobás el diseño al 100% antes de desarrollar. Y si no estás conforme
  con lo entregado, te devolvemos. Sin contratos eternos, sin letra chica.

urgency_line: "6 cupos este mes · 4 ya reservados · El siguiente cupo abre en julio"

cta_primary:
  text: "Agenda 15 min con Alejandro →"
  action: TidyCal
  ga4_event: click_cta_tidycal

cta_secondary:
  text: "Hablar por WhatsApp"
  action: wa.me/528313359341
  ga4_event: click_cta_whatsapp
```

---

## 5. Archivos a crear / modificar

| Archivo | Acción | Sprint |
|---|---|---|
| `app/express/page.tsx` | CREAR — ruta `/express` | S1 |
| `app/express/brief/page.tsx` | CREAR — form post-pago | S0 |
| `app/express/gracias/page.tsx` | CREAR — confirmación brief | S0 |
| `app/api/express/brief/route.ts` | CREAR — endpoint brief → n8n | S0 |
| `app/api/stripe-webhook/route.ts` | CREAR — webhook Stripe | S0 |
| `components/express/HeroExpress.tsx` | CREAR | S1 |
| `components/express/OfferSummary.tsx` | CREAR | S1 |
| `components/express/PainSolution.tsx` | CREAR | S1 |
| `components/express/DemoGrid.tsx` | CREAR | S1 |
| `components/express/ScopeClarity.tsx` | CREAR | S1 |
| `components/express/WhyThisPrice.tsx` | CREAR | S1 |
| `components/express/ProcessSteps.tsx` | CREAR | S1 |
| `components/express/FAQExpress.tsx` | CREAR | S1 |
| `components/express/FinalCTAExpress.tsx` | CREAR | S1 |
| `components/home/hero.tsx` | MODIFICAR — badge, subtitle, CTAs duales | S1 |
| `components/home/pricing.tsx` | MODIFICAR — jerarquía, ✓/✗, cross-sell | S2 |
| `components/home/why-this-price.tsx` | CREAR | S2 |
| `components/home/comparison-table.tsx` | CREAR | S2 |
| `components/home/founder.tsx` | CREAR | S2 |
| `components/home/inline-contact-form.tsx` | MODIFICAR — copy | S2 |
| `components/home/exit-intent.tsx` | MODIFICAR — price ref a $3,900 Express | S2 |
| `lib/i18n/translations.ts` | MODIFICAR — todas las keys nuevas ES+EN | en cada sprint |
| `public/alejandro.jpg` | AÑADIR — foto real, WebP, 400×400 mín | S2 |
| `public/demos/express/*.webp` | AÑADIR — 10 thumbnails demos | S1 |
| `public/llms.txt` | ACTUALIZAR — añadir Express $3,900 | después de cada sprint |
| `app/sitemap.ts` | MODIFICAR — añadir `/express` y `/express/brief` | S1 |

---

## 6. GA4 Events — mapa completo

| Evento | Cuándo dispara | Parámetros |
|---|---|---|
| `checkout_started` | Click CTA Stripe en /express | `{ price: 3900, source: 'hero|demos|faq|final' }` |
| `payment_completed` | Stripe webhook `checkout.session.completed` | `{ session_id, amount }` |
| `brief_submitted` | POST /api/express/brief exitoso | `{ session_id }` |
| `click_cta_tidycal` | Click TidyCal en / | `{ section: 'hero|founder|finalcta' }` |
| `click_cta_whatsapp` | Click WhatsApp en / o /express | `{ section }` |
| `form_submit` | POST /api/lead exitoso | `{ source: 'inline|quote_modal' }` |

**Regla:** `trackConversion("form")` SOLO después de 200 OK en `/api/lead`. Nunca en click.

---

*Este documento es la fuente de verdad para desarrollo. Cualquier cambio de copy o estructura se edita aquí primero, luego se implementa en cheapweb-web.*
