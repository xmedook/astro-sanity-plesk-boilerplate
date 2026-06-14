# v3.04 — Copy, Plan de Ejecución y Checklist

> **Propósito:** Material final accionable — copy de las dos landings, copy del bot, plantillas de anuncios, plan de sprints, checklist técnico y métricas dashboard.
> **Depende de:** v3-02 (producto/pricing), v3-03 (funnel)
> **Estado:** ✅ Completo

---

## ÍNDICE

1. [Copy: Landing cheapweb.mx (rediseñada)](#1-copy-landing-cheapwebmx)
2. [Copy: Landing cheapweb.mx/express (nueva)](#2-copy-landing-cheapwebmxexpress)
3. [Copy: Bot WhatsApp precalificador](#3-copy-bot-whatsapp)
4. [Copy: Anuncios (plantillas + ejemplos)](#4-copy-anuncios)
5. [Plan de ejecución por sprints](#5-plan-de-ejecucion)
6. [Checklist técnico](#6-checklist-tecnico)
7. [Métricas y dashboard semanal](#7-metricas-dashboard)

---

## 1. Copy: Landing cheapweb.mx

### 1.1 Hero (above the fold)

```
[Badge]
6 cupos este mes · 4 ya reservados

[H1]
Tu negocio en internet. En 14 días.
Sin agencia, sin sorpresas, sin contratos eternos.

[Subtitle / price anchor]
Normalmente $18,000+. Desde $8,000 MXN.
Diseño profesional + WordPress + dominio + hosting 1 año.

[Trust line]
Si algo sale mal, respondemos. Si no entregamos a tiempo, te devolvemos.

[CTAs duales]
[CTA primario] Agenda 15 min con Alejandro  →  TidyCal embed
[CTA secundario] Hablar por WhatsApp  →  WA con bot

[Trust bullets — íconos pequeños]
✓ Dominio + hosting 1 año incluido
✓ WordPress editable
✓ Sin mensualidades obligatorias
✓ Aprobás el diseño antes de desarrollar
```

**Cambios vs landing actual:**
- Badge: "6 cupos · 4 reservados" (no "1 proyecto más") — urgencia creíble con margen
- Subtitle: añade price anchor + "+hosting" explícito
- Trust line nueva — garantía implícita-pero-mencionada
- CTAs cambian: TidyCal primario, WhatsApp secundario (antes WhatsApp primero)

### 1.2 SocialProofStrip (sin cambios estructurales)
Mantener marquee de logos. **Sí cambiar:** añadir "Visto en" o "Confían en nosotros" como heading sutil.

### 1.3 Services (qué incluye tu sitio)
Mantener. Sólo asegurar que cada bullet menciona algo medible o visible (no genérico).

### 1.4 Inline Contact Form (la tercera vía)

```
[H2]
¿Prefieres que te contactemos?

[Subtitle]
Llena tu info y te respondemos por email + WhatsApp en menos de 2 horas hábiles.

[Form 3 campos]
- Nombre + apellido
- WhatsApp (con país)
- ¿Qué tipo de negocio? (radio: nuevo / ya operando / otro)

[CTA]
Quiero que me contacten  →  POST /api/lead → n8n auto-respuesta
```

### 1.5 Pricing — 3 cards con jerarquía

```
[Badge]
Transparencia total

[H2]
Tres planes. Cero letra chica.
```

**Card 1: Smart $8,000 MXN**
```
[Etiqueta superior, sutil]
Para empezar

[H3] Smart
[Precio] $8,000 MXN · pago único

[Subtitle]
Para negocios que necesitan presencia ya.

✓ INCLUYE
• 1 landing profesional
• Diseño mobile-first custom
• Dominio .com/.mx 1 año
• Hosting 1 año
• 3 correos corporativos
• SSL gratuito
• 1 ronda de revisiones
• Entrega en 12–14 días

✗ NO INCLUYE
• Más de 1 página/sección
• Blog, tienda, chat flotante
• SEO avanzado
• Pixel Meta o Google Tag
• Administración post-entrega*

*Mantenimiento opcional desde $799/mes

[CTA] Lo quiero → WhatsApp
```

**Card 2: Pro $16,000 MXN (RECOMENDADO)**
```
[Etiqueta superior destacada, color sólido]
⭐ Recomendado · el 80% elige este

[H3] Pro
[Precio] $16,000 MXN · pago único

[Subtitle]
Para negocios que quieren ser encontrados y convertir.

✓ INCLUYE
• 3 páginas/secciones
• Todo lo del plan Smart
• Blog integrado
• WhatsApp flotante
• SEO on-page (títulos, meta, H1, estructura)
• Google Analytics + Search Console
• 10 correos corporativos
• 1 ronda de revisiones
• Entrega en 16–18 días

✗ NO INCLUYE
• Tienda en línea / WooCommerce
• Más de 3 páginas
• Pixel/Tag avanzado
• Campañas de ads
• SEO mensual o link building

[CTA destacado] Es para mí → WhatsApp
```

**Card 3: Pro+Tienda $24,000 MXN**
```
[Etiqueta superior, sutil]
Si vendes en línea

[H3] Pro+Tienda
[Precio] $24,000 MXN · pago único

[Subtitle]
Para negocios que van a vender en línea.

✓ INCLUYE
• Todo lo del plan Pro
• WooCommerce configurado
• Hasta 50 productos cargados
• Pasarela de pago (Stripe o Mercado Pago)
• Gestión de envíos
• Capacitación 1 hora
• Entrega en 20–28 días

✗ NO INCLUYE
• Más de 50 productos
• Fotografía de productos
• Manejo de inventario post-entrega
• Campañas de ads para tienda
• SEO avanzado e-commerce
• Integraciones ERP

[CTA] Quiero vender en línea → WhatsApp
```

**Footer del pricing (cross-sell discreto a Express):**
```
¿Solo necesitas una landing rápida con tracking incluido? Landing Express → $3,900 MXN · 7 días
```

### 1.6 Why This Price (nueva sección)

```
[Badge] Transparencia

[H2] "¿Por qué tan barato? ¿Es confiable?"

Pregunta justa. Respuesta corta: no es barato, es precio justo.
Respuesta larga, tres razones:

01 — Sin oficinas, sin vendedores, sin intermediarios
No pagás renta de oficina en Polanco, ni comisiones de vendedores,
ni "ejecutivos de cuenta" que sólo reenvían correos. Pagás directo
al equipo que construye tu sitio.

02 — Sólo 6 proyectos al mes
No aceptamos 20 sitios simultáneos. 6 al mes, máximo. Mantenemos
calidad sin inflar el equipo — ni el precio.

03 — Entrada al ecosistema, no producto final
Si tu sitio queda increíble y necesitás SEO avanzado, ads, automatizaciones
o crecimiento, tenemos nexodigital. Primero entregamos rápido. La relación
larga viene después, sólo si tiene sentido para ti.

[Footer]
Un sitio web comparable en agencia tradicional: $18,000–$45,000 MXN.
Mismo resultado, mismo WordPress, misma calidad — sin el sobreprecio.
```

### 1.7 Comparison Table (nueva sección)

```
[Badge] Sin trucos de marketing

[H2] Compáralo tú mismo.

|                       | cheapweb.mx   | Freelancer    | Agencia       | Wix / DIY     |
|-----------------------|---------------|---------------|---------------|---------------|
| Entrega               | 12–28 días    | 2–8 semanas   | 1–4 meses     | Indefinido    |
| Diseño personalizado  | ✓ Sí          | A veces       | ✓ Sí          | ✗ Template    |
| Dominio + hosting     | ✓ Incluido 1a | Negociable    | Factura aparte| Factura aparte|
| Mobile-first          | ✓ Sí          | A veces       | ✓ Sí          | Básico        |
| SEO configurado       | ✓ Sí          | Casi nunca    | ✓ Sí          | Tú lo haces   |
| WhatsApp + CTA        | ✓ Sí          | Si lo pides   | ✓ Sí          | Tú configuras |
| Soporte post-entrega  | ✓ Opcional    | Si hay suerte | ✓ Caro        | No existe     |
| Inversión total       | $8K–$24K      | $3K–$15K      | $25K–$80K     | $0 + 40–100h  |

[CTA] La diferencia es clara. ¿Hablamos? → TidyCal
```

### 1.8 Process (mantener, ajustar tono)
5 pasos. Tono directo, sin corporate-speak.

### 1.9 Portfolio — links vivos (CRÍTICO)
Cada card debe ser `<a href={cliente.url} target="_blank">`. Si la URL no existe, badge "Entregado 2025" sobre screenshot.

### 1.10 Testimonials (mantener)
Si hay Google Reviews verificables, mostrar con foto + nombre + "Verified". Si no, mantener como están pero añadir fecha.

### 1.11 Founder Section (NUEVA — ubicación: después de Testimonials)

```
[Badge] Quién está detrás

[H2] Trabajas directo con quien construye tu sitio.

[Foto real de Alejandro — no stock]

Soy Alejandro. cheapweb.mx nació porque vi demasiados negocios mexicanos
pagando $20,000+ por sitios web genéricos que no convertían — o peor,
sin sitio porque "es muy caro" o "tarda meses".

Arranqué cheapweb con una regla: precio justo, entrega rápida, cero
sorpresas. Sin vendedores, sin "ejecutivos de cuenta", sin letra chica.

Cuando reservás tu proyecto, hablás conmigo. Yo reviso tu brief, yo
dirijo el diseño, yo me aseguro de que entreguemos a tiempo. Si algo
sale mal, respondo yo.

[Métricas en grid 2×2]
• 120+ sitios entregados
• 3+ años en el mercado
• 4.9★ calificación de clientes
• Entrega promedio: 13 días

[CTA] Agenda 15 min conmigo → TidyCal
```

### 1.12 Blog Preview (mantener)
3 artículos. Idealmente apuntar a las piezas nuevas de SEO (`v3-03` §4.2).

### 1.13 FAQ — rewrite completo

```
[H2] Preguntas frecuentes. Respuestas directas.

Q: ¿Por qué tan barato comparado con una agencia?
A: Sin oficinas, sin vendedores, sin intermediarios. 6 proyectos al mes máximo.
   Pagás directo al equipo. Misma calidad, sin el sobreprecio.

Q: ¿Es confiable? ¿No es scam?
A: 120+ sitios entregados, 3+ años operando, 4.9★. Si no entregamos lo
   prometido, te devolvemos.

Q: ¿Qué pasa si no me gusta el diseño?
A: Lo aprobás al 100% antes de desarrollar. Si no te gusta, iteramos.
   Si aún así no funciona, te devolvemos.

Q: ¿Cuánto tiempo tarda?
A: Smart: 12–14 días. Pro: 16–18 días. Pro+Tienda: 20–28 días.
   El reloj arranca cuando recibimos tu brief y materiales.

Q: ¿Puedo modificar el sitio yo mismo después?
A: Sí. Usamos WordPress. Te capacitamos para que edites textos,
   imágenes y productos sin depender de nosotros.

Q: ¿Qué incluye el hosting?
A: Hosting 1 año. Dominio .com/.mx 1 año. SSL gratis. Correos
   corporativos. La renovación anual posterior es por tu cuenta —
   te decimos cuánto y cómo.

Q: ¿Ofrecen mantenimiento?
A: Sí, desde $799/mes. Backups, actualizaciones, soporte y hasta
   2 cambios de contenido al mes. Totalmente opcional.

Q: ¿Hacen tiendas en línea más grandes?
A: Pro+Tienda cubre hasta 50 productos. Para catálogos más grandes
   o integraciones avanzadas, derivamos a nexodigital.

Q: ¿Quién hace realmente el sitio?
A: Alejandro (fundador) dirige el diseño y revisa cada entrega.
   El desarrollo lo hace el equipo cheapweb. Sin "juniors" escondidos.

Q: ¿Qué necesito para empezar?
A: Tu logo (si tenés), textos, fotos de tu negocio, y acceso a tu
   dominio actual si ya tenés uno. Si no tenés nada, lo armamos
   desde cero.

Q: ¿Y si sólo necesito una landing rápida sin tanto?
A: Mirá Landing Express ($3,900 MXN, 7 días, WordPress + GA4 + Pixel incluidos).
   → cheapweb.mx/express
```

### 1.14 FinalCTA

```
[H2] ¿Listo para tener tu sitio web?

[Subtitle]
Aprobás el diseño al 100% antes de desarrollar. Y si no estás conforme
con lo entregado, te devolvemos. Sin contratos eternos, sin letra chica.

[Trust line]
6 cupos este mes · 4 ya reservados · El siguiente cupo abre en julio

[CTAs duales]
[CTA primario] Agenda 15 min con Alejandro → TidyCal
[CTA secundario] Hablar por WhatsApp → WA
```

---

## 2. Copy: Landing cheapweb.mx/express

Voz: Jego-style adaptada — urgente, transparente, founder-led, sin agencia-speak.

### 2.1 Hero

```
[Badge sticky superior]
🔥 5 cupos esta semana · 2 ya reservados

[H1]
Tu sitio web profesional por $3,900 MXN.
Listo en 7 días. Con tracking incluido.

[Subtitle]
Normalmente desde $8,000 MXN. Hoy $3,900.
WordPress + dominio + hosting + GA4 + Pixel. Pago seguro con Stripe.

[CTA primario, grande]
Pagar $3,900 con Stripe →

[CTA secundario, link]
¿Dudas? Hablar por WhatsApp

[Trust micro-bullets]
✓ Pago único · sin contratos
✓ Si no entregamos en 7 días, te devolvemos el 100%
✓ WordPress editable — tuyo para siempre
✓ GA4 + Meta Pixel configurados desde el día 1
```

### 2.2 Offer Summary (3 bullets ultra-condensados)

```
PRECIO PILOTO  ·  $3,900 MXN · pago único
ENTREGA  ·  7 días hábiles · garantizado
PAGO  ·  Stripe seguro · tarjeta · sin tarjeta guardada

[Link]
Ver demos reales →
```

### 2.3 Pain → Solution (2 columnas espejo)

```
[H2] Tu página vieja está perdiendo clientes.

✗ Tu sitio actual                       ✓ Lo que entregamos
─────────────────                       ──────────────────
Tarda más de 3 segundos en cargar       Carga rápido en móvil y desktop
No se ve bien en celular                Diseño mobile-first 2026
No tiene botón claro de WhatsApp        CTA principal visible siempre
Se ve "del 2018"                        Diseño moderno que genera confianza
No convierte visitas en mensajes        Estructura clara hacia contacto
```

### 2.4 Live Demos (10 cards clickeables)

```
[H2] Diseñado para negocios como el tuyo.

[Subtítulo]
No son mockups. Cada tarjeta abre un sitio real. Probá los formularios,
el WhatsApp, mirá cómo se ve en tu celular.

[Grid 5×2 — 10 thumbnails con badge "DEMO REAL"]
Restaurante · Inmobiliaria · Clínica · Tienda · Spa
Hotel · Constructora · Despacho · Coach · Local

[CTA bajo grid]
Ya vi suficiente → Pagar $3,900 con Stripe
```

### 2.5 Included / Not Included

```
[H2] Alcance claro desde el principio.

✓ INCLUIDO por $3,900                   ✗ NO INCLUIDO en este sprint
─────────────────                       ──────────────────
Hasta 5 páginas/secciones               Más de 5 páginas
WordPress mobile-first editable         Blog integrado
WhatsApp flotante + form contacto       Tienda en línea / WooCommerce
Dominio .com/.mx 1 año                  Fotografía profesional
Hosting 1 año                           SEO avanzado o link building
5 correos corporativos                  Campañas de ads (gestión mensual)
GA4 + Meta Pixel configurados           Google Workspace / Microsoft 365
SEO básico (title/meta/H1)              Revisiones ilimitadas (2 incluidas)
2 rondas de revisión                    Mantenimiento post-entrega*
SSL gratis

*Mantenimiento disponible desde $799/mes · opcional · después del pago

[Footer / add-ons]
¿Necesitás algo más? Después del pago te ofrecemos add-ons sin presión:
correos adicionales, más secciones, mantenimiento, upgrade a Smart.
```

### 2.6 Why This Price (objeción anticipada)

```
[H2] "¿Por qué $3,900 y no $8,000 como los demás?"

Pregunta justa. Tres razones:

01 — Plantilla premium, no diseño desde cero
Trabajamos con una base de diseño probada y la personalizamos con tus
colores, textos, fotos y logo. No es Wix — es WordPress profesional con
un atajo inteligente que nos permite cobrar menos sin entregar menos.

02 — Máximo 5 sitios por semana
No aceptamos 20 simultáneos. 5 a la semana, máximo. Eso nos permite
cumplir los 7 días y respaldar el reembolso si no lo hacemos.

03 — Es la puerta de entrada, no el techo
Primero entregamos. Si tu negocio crece, upgradeás a Smart ($8K),
Pro ($16K) o Pro+Tienda ($24K). El resto viene después, solo si
tiene sentido.

[Bloque comparativo — pequeño, debajo de las 3 razones]
"La alternativa más conocida de este segmento cobra $4,800 MXN —
sin WordPress editable, sin GA4, sin Pixel, con solo 1 revisión.
cwmx Express: $3,900 · WordPress · tracking · 2 revisiones."
```

### 2.7 Process

```
[H2] Del pago al sitio publicado, sin handoffs raros.

01  Pagás $3,900 con Stripe (60 segundos)
02  Te llegamos por WhatsApp con el link de tu brief
03  Llenás el brief (logo, textos, fotos, accesos) en ~10 minutos
04  Construimos tu sitio + configuramos GA4 y Pixel (7 días hábiles)
05  Revisás, ajustamos (2 rondas), publicamos en tu dominio
```

### 2.8 FAQ Express

```
[H2] Preguntas directas.

Q: ¿Cuándo empiezan los 7 días?
A: Cuando recibimos tu brief completo (logo, textos, fotos, accesos).
   No antes. Si tardás en mandar el brief, el reloj se pausa.

Q: ¿Y si no tengo logo ni fotos profesionales?
A: Te diseñamos un logo básico y usamos imágenes premium/stock.
   Cero estrés.

Q: ¿Qué pasa si no entregan en 7 días?
A: Te devolvemos el 100% íntegro. Sin preguntas.

Q: ¿Puedo editar el sitio yo después?
A: Sí. Es WordPress — 100% tuyo, 100% editable. Si querés que
   lo mantengamos nosotros: $799/mes, opcional.

Q: ¿Por qué $3,900 y no $8,000?
A: Trabajamos con base de diseño probada + máximo 5/semana.
   Misma calidad, atajo inteligente. Ver "¿Por qué este precio?" arriba.

Q: ¿Qué tracking incluye exactamente?
A: GA4 (Google Analytics 4) + Meta Pixel. Configurados y funcionando
   antes de la entrega. Si tenés cuenta de Ads activa, podés medir
   conversiones desde el primer día.

Q: ¿Por qué es mejor que otras opciones a precio similar?
A: WordPress editable (puedes cambiarlo sin pagar a nadie), GA4+Pixel
   incluidos, 5 correos, 2 revisiones. Otras opciones cobran $4,800+
   sin tracking y con plataforma cerrada.

Q: ¿Incluye dominio y hosting?
A: Sí. Dominio .com o .mx 1 año + hosting 1 año. Renovación posterior
   por tu cuenta — te avisamos cuánto y cómo antes de que venza.

Q: ¿Hay cargos ocultos o mensualidades?
A: No. $3,900 una sola vez. Después nada obligatorio. Add-ons
   (mantenimiento, correos extra) se ofrecen post-pago sin presión.

Q: ¿Es seguro pagar?
A: Sí. Stripe procesa el pago. No guardamos ningún dato de tarjeta.
```

### 2.9 Final CTA con anchor

```
[H2] Landing Express.

[Pricing display grande]
Antes ~~$8,000+ MXN~~
Hoy $3,900 MXN  ·  ahorrás $4,100 (51%)

[Bullets de cierre]
• WordPress + dominio + hosting + 5 correos + GA4 + Pixel
• 7 días hábiles garantizados o te devolvemos el 100%
• Stripe seguro. Sin tarjeta guardada. Sin contratos.
• 5 cupos esta semana. 2 ya reservados.

[CTA grande]
Reservar mi cupo · Pagar $3,900 con Stripe →

[Link secundario]
¿Dudas antes? Hablanos por WhatsApp
```

---

## 3. Copy: Bot WhatsApp precalificador

### 3.1 Flujo conversacional

```
[Cliente envía cualquier mensaje]

Bot:
"¡Hola! Soy Lupe, asistente de cheapweb 👋

Para conectarte con la persona correcta, 2 preguntas rápidas:

1) ¿Es un negocio que ya está operando o uno que vas a arrancar?

2) ¿Tenés idea de presupuesto?
   a) Hasta $5,000 MXN — te recomiendo Landing Express ($3,900 con WordPress y tracking)
   b) Entre $8,000 y $24,000 MXN — te paso con el equipo cheapweb
   c) No estoy seguro — te agendo 15 min con Alejandro sin compromiso

Respondé con 1) tu opción del negocio y 2) la letra (a/b/c)."

[Respuesta cliente: ej. "ya operando, b"]

Bot:
"Perfecto. Te paso con el equipo cheapweb ahora mismo.
[NOMBRE DEL EQUIPO] te responde en máximo 2 horas hábiles.
Mientras tanto, si querés ir avanzando, contame:
- ¿Cuál es el nombre de tu negocio?
- ¿Tenés sitio actual?
- ¿Tu deadline aproximado para tenerlo listo?

(o si preferís, agendá directo: tidycal.com/cheapweb)"

[Respuesta cliente: "ya operando, a"]

Bot:
"¡Genial! Para presupuesto en ese rango, nuestro Landing Express es ideal.
$3,900 MXN, te lo entregamos en 7 días, con dominio + hosting + WordPress + GA4 + Pixel incluidos.

Mirá los detalles y reservá tu cupo aquí: cheapweb.mx/express

Si después de leer tenés dudas, escribime acá mismo. Si querés algo más
grande, escribí 'plan pro' y te paso info de nuestros planes regulares."

[Respuesta cliente: "nuevo, c"]

Bot:
"Te entiendo, mejor hablalo con alguien.

Agendá 15 min con Alejandro (el fundador) acá: tidycal.com/cheapweb

Sin compromiso, sin venta forzada. Te ayuda a decidir qué te conviene
realmente."

[Si el cliente no responde con formato esperado o pregunta algo distinto]

Bot:
"Te entiendo. Mejor que te conteste un humano del equipo. En menos
de 2 horas hábiles te responden.

Mientras tanto, si querés ver opciones:
- Landing Express ($3,900, 7 días, WordPress + tracking): cheapweb.mx/express
- Planes regulares ($8K–$24K, 12–28 días): cheapweb.mx#pricing"

[Handoff: bot notifica a equipo en Telegram + marca conversación como pending-human]
```

### 3.2 Reglas duras del bot
- **Nunca improvisar** fuera del script. Si no entiende, deriva a humano.
- **Cero ventas duras** — el bot cualifica, no cierra.
- **No menciona precios fuera de los 3 rangos** del menú.
- **No promete plazos.** Sólo refleja lo que dice la landing.
- **Idioma:** español MX informal pero respetuoso ("vos" no, "tú/tu" sí).

---

## 4. Copy: Anuncios (plantillas + 3 ejemplos por campaña)

### 4.1 Campaña `cheapweb-pro` (Google Search, target: $8K+)

**Estructura headline (3 líneas, 30 chars c/u):**
```
H1 · Propuesta de valor
H2 · Anclaje/diferenciación
H3 · CTA con urgencia
```

**Estructura descripción (2 líneas, 90 chars c/u):**
```
D1 · Beneficio concreto + plazo
D2 · Trust signal + CTA secundario
```

**Ejemplo Ad 1 — keyword "diseño web profesional méxico":**
```
H1: Tu Sitio Web Profesional
H2: Desde $8,000 MXN · 14 días
H3: 6 Cupos Mayo · Agendá Hoy

D1: Diseño custom mobile-first, dominio y hosting 1 año incluidos. 14 días.
D2: 120+ sitios entregados. 4.9★. Sin agencia, sin sorpresas. Agendá 15 min.
```

**Ejemplo Ad 2 — keyword "agencia web pyme méxico":**
```
H1: Tu Negocio en Internet
H2: Sin Agencia, Sin Sorpresas
H3: Desde $8K · 14 Días · 6 Cupos

D1: Hablás directo con el fundador. Aprobás diseño antes de desarrollar.
D2: 120+ negocios mexicanos confiaron. Si algo sale mal, respondemos.
```

**Ejemplo Ad 3 — keyword "sitio web wordpress méxico":**
```
H1: WordPress Pro · 14 Días
H2: $8K MXN · Dominio Incluido
H3: Editable Sin Depender de Nadie

D1: WordPress que vos podés editar. Te capacitamos. SEO on-page incluido.
D2: 6 cupos al mes — entregamos cuando prometemos. Agendá 15 min hoy.
```

### 4.2 Campaña `cheapweb-express` (Google Search + Meta + TikTok, target: $3,900)

**Estructura:** precio en H1, diferenciador en H2, urgencia en H3.
**Ángulo clave:** WordPress + tracking incluido vs competidores que no lo dan.

**Ejemplo Ad 1 — keyword "página web profesional barata":**
```
H1: Sitio Web Pro · $3,900 MXN
H2: WordPress + GA4 + Pixel Incluidos
H3: 5 Cupos · 7 Días · Reservá Hoy

D1: Dominio + hosting + 5 correos + tracking. WordPress 100% editable.
D2: Si no entregamos en 7 días, te devolvemos. Sin contratos. Stripe seguro.
```

**Ejemplo Ad 2 — keyword "landing page profesional méxico":**
```
H1: Tu Landing · $3,900 MXN
H2: Tracking Incluido · WordPress
H3: Entrega 7 Días · Garantizado

D1: GA4 + Meta Pixel configurados. Mide tus Ads desde el día 1. 5 correos.
D2: $900 menos que la competencia y con más incluido. Reservá online ya.
```

**Ejemplo Ad 3 — keyword "crear sitio web rápido":**
```
H1: Sitio en 7 Días · $3,900
H2: Con Google Analytics + Pixel
H3: 5 Cupos Esta Semana

D1: WordPress editable, dominio, hosting, correos, SEO y tracking completo.
D2: 100% reembolso si no entregamos. Stripe. Sin tarjeta guardada.
```

### 4.3 Meta Ads (Facebook/Instagram) — Express

**Formato carrusel + texto principal:**

```
[Texto principal — 125 chars]
¿Necesitás un sitio web con tracking para tus anuncios?
En 7 días por $3,900 MXN. WordPress + GA4 + Pixel incluidos.

[Headline carrusel — primer slide]
Sitio Web Express · $3,900 MXN · 7 días · WordPress + Tracking

[Subheadline]
5 cupos esta semana · $900 menos que la competencia

[CTA button]
Reservar ahora

[Carrusel slides 2–6: thumbnails de demos reales con texto]
"Restaurante · Listo en 7 días"
"Inmobiliaria · Listo en 7 días"
"Clínica · Listo en 7 días"
"Negocio local · Listo en 7 días"
"Spa · Listo en 7 días"
```

### 4.4 Reglas de copy para Ads (qué NO hacer)
- **No mentir** con números (si decís "5 cupos", deben ser 5 reales)
- **No "GRATIS"** — somos pago, no atraemos buscadores de gratis
- **No emojis abuso** — uno máximo, estratégico (🔥 reservado para urgencia)
- **No mayúsculas en frases enteras** (Google las castiga)
- **No comparativos directos** ("mejor que Wix") — usá comparativos factuales en la landing, no en el ad

---

## 5. Plan de ejecución por sprints

### Sprint 0 — Setup técnico (1 semana, 21 mayo–28 mayo)

**Objetivo:** dejar la infraestructura lista para Sprint 1 sin tocar la landing pública todavía.

| # | Tarea | Owner | DoD (Definition of Done) |
|---|---|---|---|
| 0.1 | Crear Stripe Payment Link para Express $3,900 | Alejandro | URL disponible, test pago en sandbox OK |
| 0.2 | Webhook endpoint `/api/stripe-webhook` en cheapweb-web | Dev | Recibe `checkout.session.completed`, logea, retorna 200 |
| 0.3 | Página `/express/brief` con form post-pago | Dev | Lee `session_id`, guarda en DB, dispara webhook a n8n |
| 0.4 | n8n workflow: webhook → Telegram master + WhatsApp equipo | DevOps/Alejandro | Mensaje llega cuando llega pago real (test sandbox) |
| 0.5 | TidyCal embed listo en hero (oculto detrás de feature flag) | Dev | Cargado pero no visible aún |
| 0.6 | Bot WhatsApp precalificador (Evolution + n8n) | DevOps | Script de §3.1 implementado, test con 5 conversaciones manuales |
| 0.7 | Tabla `express_orders` en DB | Dev | Migration aplicada, smoke test insert/read |
| 0.8 | GA4 events nuevos: `click_cta_express`, `checkout_started`, `payment_completed`, `brief_submitted` | Dev | Eventos disparan en sandbox |

**Smoke test fin de Sprint 0:** flujo end-to-end Express en sandbox — desde click CTA hasta brief submitido — sin tráfico real.

### Sprint 1 — Lanzar Express + arreglar hero cheapweb (2 semanas, 28 mayo–11 junio)

**Objetivo:** **cerrar la primera venta en 14 días.** Express en vivo + hero cheapweb reescrito.

| # | Tarea | Owner | Riesgo |
|---|---|---|---|
| 1.1 | Publicar `cheapweb.mx/express` con copy §2 | Dev + Alejandro (revisión copy) | Bajo |
| 1.2 | Activar Stripe Payment Link en producción | Alejandro | Bajo |
| 1.3 | Hero rewrite cheapweb.mx con copy §1.1 (TidyCal + WhatsApp duales) | Dev | Bajo |
| 1.4 | Activar TidyCal embed en hero (quitar feature flag) | Dev | Bajo |
| 1.5 | FinalCTA cheapweb con copy §1.14 | Dev | Bajo |
| 1.6 | Crear campañas Google Ads: `cheapweb-express` y `cheapweb-pro` (separar de la existente) | Alejandro / Ads | Medio — segmentación incorrecta puede gastar mal |
| 1.7 | Lanzar Meta Ads para Express (presupuesto $4,500/mes) | Alejandro / Ads | Medio |
| 1.8 | Re-targeting manual de últimos 30 leads perdidos (mensaje §v3-03/4.3) | Alejandro | Bajo (sólo tiempo) |
| 1.9 | Schema markup en pricing de cheapweb.mx | Dev | Bajo |
| 1.10 | Search Console: dar de alta `cheapweb.mx/express` como propiedad | Dev | Bajo |

**Smoke test fin de Sprint 1:** **≥1 venta cerrada (Express o cheapweb).** Si llega Sprint 1 sin cierre, hipótesis de v3-01 deben revisarse en revisión semanal.

### Sprint 2 — Rediseño completo cheapweb + optimización (3 semanas, 11 junio–2 julio)

**Objetivo:** terminar el rediseño completo de cheapweb.mx según copy §1.2–§1.13, iterar sobre data de Sprint 1.

| # | Tarea | Owner | Riesgo |
|---|---|---|---|
| 2.1 | Pricing cards rediseñados con jerarquía (Pro recomendado) | Dev | Medio (UX) |
| 2.2 | Sección Why This Price | Dev | Bajo |
| 2.3 | Sección Comparison Table | Dev | Medio (responsive) |
| 2.4 | Sección Founder con foto real de Alejandro | Dev + Alejandro (foto) | Bajo |
| 2.5 | Portfolio cards convertidos a links vivos | Dev | Bajo |
| 2.6 | FAQ rewrite completo según §1.13 | Dev | Bajo |
| 2.7 | Cross-sell Express en footer pricing | Dev | Bajo |
| 2.8 | Form con auto-respuesta n8n (3ra vía) | DevOps | Medio |
| 2.9 | Iteración de Ads basada en data Sprint 1 | Alejandro / Ads | Medio |
| 2.10 | OXXO en Express (si Sprint 1 mostró fricción tarjeta-only) | Dev | Medio |

**Smoke test fin de Sprint 2:** ≥3 ventas mensuales acumuladas, scroll depth cpc cheapweb >35%.

### Sprint 3 — Optimización data-driven (4 semanas, 2 julio–30 julio)

**Objetivo:** ajustar pricing, capacidad y mix según data 60 días.

| # | Tarea | Owner |
|---|---|---|
| 3.1 | Análisis de margen real Express (¿$465/venta se cumple?) | Alejandro / finanzas |
| 3.2 | Análisis de mix Express vs cheapweb (¿canibalización?) | Alejandro |
| 3.3 | Decidir pricing iteración: subir/bajar/mantener Express | Alejandro |
| 3.4 | Decidir si Express crece a marca propia (`unsitio.mx` u otra) | Alejandro |
| 3.5 | Blog SEO: 3 artículos publicados según §v3-03/4.2 | Marketing |
| 3.6 | Auditoría de Ads completa con 60 días de data | Alejandro / Ads |

**Smoke test fin de Sprint 3:** ≥6 ventas/mes sostenidas. CAC <$1,500 MXN cheapweb, <$500 Express.

### Reglas de rollout (vigentes en todos los sprints)

- **Staging primero, siempre.** Build → deploy `cheapweb-staging` (port 3015, `new.cheapweb.mx`) → verificación visual → deploy prod (port 3006, `cheapweb.mx`).
- **Nunca deploy un viernes después de las 4pm.**
- **Cada cambio de copy ES debe actualizar EN en el mismo commit.**
- **Después de cada sprint:** actualizar `llms.txt` y `gobierno-comercial.md` del repo destino.
- **Rollback en cualquier sprint:** `git checkout <commit-anterior> && npm run build && pm2 restart cheapweb-web`.

---

## 6. Checklist técnico (todo lo que hay que tener antes de prod)

### Stripe
- [ ] Cuenta Stripe MX activa en modo live
- [ ] Payment Link creado para Express $3,900 con redirect URL configurado
- [ ] Webhook endpoint `/api/stripe-webhook` recibe y verifica firma
- [ ] Test de pago real con tarjeta personal de Alejandro (refundeable)
- [ ] OXXO disponible (post Sprint 1)

### Brief Express
- [ ] Página `cheapweb.mx/express/brief` con form
- [ ] Validación `session_id` query param contra orden Stripe
- [ ] Campos del form: nombre comercial, logo (upload), textos (3 textarea), 3 fotos (upload), color preferido, dominio deseado (.com o .mx), email principal
- [ ] Submit dispara webhook a n8n con session_id + payload del form
- [ ] Página de confirmación: "Recibimos tu brief. Arrancamos hoy. Te escribimos por WhatsApp en máximo 24h hábiles."

### n8n workflows
- [ ] Workflow 1: Stripe webhook → guardar en DB → notificar Telegram master + WhatsApp grupo equipo
- [ ] Workflow 2: Brief submit → guardar en DB → asignar a dev disponible → mensaje al cliente vía WA
- [ ] Workflow 3: Form lead (cheapweb) → auto-respuesta email + WhatsApp con link TidyCal
- [ ] Workflow 4: Bot WhatsApp precalificador (Evolution API + script §3.1)
- [ ] Workflow 5: Recordatorio bot — si lead no responde en 24h, mensaje de follow-up

### TidyCal
- [ ] Cuenta TidyCal con Alejandro (y equipo backup) habilitada
- [ ] Slot de 15 min con buffer de 5 min entre calls
- [ ] Embed en hero cheapweb.mx + FinalCTA + footer Founder
- [ ] Confirmation email customizado: "Te recordamos: la call es de 15 min. Llegá con 1 idea clara de lo que querés."

### Analytics
- [ ] GA4 events: `click_cta_express`, `checkout_started`, `payment_completed`, `brief_submitted`, `click_cta_tidycal`, `click_cta_whatsapp`, `form_submit`
- [ ] GA4 conversions configuradas
- [ ] Clarity sigue corriendo (no romper)
- [ ] Search Console: `cheapweb.mx/express` dado de alta como propiedad

### SEO/Schema
- [ ] Schema.org `Product` en pricing cards
- [ ] Schema.org `Service` en cheapweb.mx
- [ ] Schema.org `Offer` en Express con precio + plazo
- [ ] OpenGraph + Twitter cards en `/express`
- [ ] `sitemap.xml` actualizado con `/express`
- [ ] `robots.txt` permite `/express`

### Ads
- [ ] Campaña Google Ads `cheapweb-pro` segmentada con 3 ad groups iniciales
- [ ] Campaña Google Ads `cheapweb-express` segmentada con 3 ad groups iniciales
- [ ] Pausar campaña existente "broad" después de validar nuevas
- [ ] Campañas Meta Ads creadas (Express) con audiencias PyME MX
- [ ] Pixel Meta + GA4 disparando eventos compartidos

### Contenido
- [ ] Foto real de Alejandro (400×400 mín, optimizada WebP) en `/public/alejandro.jpg`
- [ ] 10 thumbnails de demos para Express (`/public/demos/express/*.webp`)
- [ ] URLs reales de los demos validadas (no 404)
- [ ] Texto bilingüe ES/EN sincronizado en `lib/i18n/translations.ts`

### Operaciones
- [ ] Documento de respuestas estándar para bot/equipo (handoffs)
- [ ] SLA escrito y firmado internamente (§v3-03/3.4)
- [ ] Plantilla de cotización cheapweb (para post-discovery)
- [ ] Proceso de reembolso Express documentado (1 click en Stripe + DM al cliente)

---

## 7. Métricas y dashboard semanal

### 7.1 Métricas por revisar cada lunes

**Negocio (las que importan):**
- Ventas semana (Express + cheapweb separadas)
- Margen bruto semana
- CAC por línea
- Tiempo lead → venta (Express y cheapweb)

**Funnel Express:**
- Sessions `/express` semana
- Click rate CTA → checkout
- Checkout → payment rate
- Payment → brief recibido <24h rate
- Reembolsos

**Funnel cheapweb:**
- Sessions home semana
- Scroll depth promedio cpc y orgánico
- Active time cpc y orgánico
- TidyCal bookings
- WhatsApp conversaciones iniciadas
- Form submissions
- Bot precalificación: % cualificados
- Discoveries → cotización enviada
- Cotización → anticipo

**Adquisición:**
- Gasto Ads por campaña
- CTR por keyword (top 10)
- Search Terms Report — terms a descartar
- Sessions orgánicos vs cpc

### 7.2 Dashboard mínimo viable
Crear vista en mc.nexosrv.one (Mission Control) o Google Looker Studio que muestre lo de §7.1 actualizado diario. **No esperar a tener el dashboard ideal para empezar a vender** — Sprint 1 arranca con Google Sheets si hace falta.

### 7.3 Cierre semanal — formato del recap

Cada lunes en formato Telegram al bot master:

```
📊 Semana #N — cheapweb gobierno comercial
─────────────────────────────────────
Ventas: X express ($XX,XXX) + Y cheapweb ($XX,XXX) = $XXX,XXX
Margen: $XX,XXX
CAC promedio: $XXX

Funnel Express:
- Sessions: XXX (Δ%)
- Click → pay: XX.X%
- Pay → brief: XX.X%
- Reembolsos: X

Funnel cheapweb:
- Sessions: XXX (Δ%)
- Scroll depth cpc: XX% (vs baseline 19%)
- TidyCal bookings: X
- WhatsApp cualificados: X
- Discoveries → cotización: X
- Cotización → cierre: X

Top 3 keywords semana: [...]
Top 3 keywords a pausar: [...]

Acción para próxima semana: [decisión clave]
```

---

## Cierre del v3.0

Con este doc terminado, el PRD v3.0 está **listo para ejecución** sujeto a:

1. **Validación de Alejandro** sobre los 3 ajustes asumidos (capacidad, repricing condicional Express, add-ons)
2. **Resolución de las 5 decisiones abiertas** en `v3-02` §6 (no bloqueantes pero deben resolverse en Sprint 0)
3. **Autorización explícita** para tocar el repo `cheapweb-web` (regla del skill: "no ejecutar sin que Alejandro diga 'ejecutar'")

Una vez autorizado, Sprint 0 puede empezar de inmediato. La meta operativa: **primera venta cerrada en 14 días desde el inicio de Sprint 1.**
