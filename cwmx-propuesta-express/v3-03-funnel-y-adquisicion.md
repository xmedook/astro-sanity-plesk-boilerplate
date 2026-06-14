# v3.03 — Funnel de Cierre y Adquisición

> **Propósito:** Cómo se pasa de visitante a venta cerrada en cada línea, y qué tráfico alimenta cada funnel. Define mecánica de cierre, adquisición pagada y orgánica, y métricas por etapa.
> **Depende de:** `v3-02-producto-y-pricing.md` (arquitectura de productos)
> **Estado:** ✅ Completo

---

## 1. Dos funnels separados

| | Express | cheapweb |
|---|---|---|
| Decisión del lead | Impulsiva 90s | Consultiva 1-7 días |
| Punto de conversión | Pago en landing | Discovery call / mensaje calificado |
| Tooling | Stripe Payment Link + bot post-pago | TidyCal + bot WhatsApp + Form + equipo |
| Touchpoints típicos | 1 (la landing) | 3-5 (landing → discovery → cotización → anticipo → kickoff) |
| Métrica primaria | Visitor → Paid (%) | Visitor → Discovery → Win (%) |
| SLA cierre | Auto-cierre al pagar | Discovery <24h, cotización <72h |

---

## 2. Funnel Express — el path corto

### 2.1 Diagrama de etapas

```
Anuncio o orgánico
        │
        ▼
cheapweb.mx/express  ─── (lee/scroll)
        │
        ▼
CTA "Pagar $3,900" ────────────► Stripe Payment Link (URL hosteada)
        │                              │
        │                              ▼
        │                       Cliente paga
        │                              │
        │                              ▼
        │                       Webhook Stripe ──► Equipo + Bot WhatsApp notificados
        │                              │
        │                              ▼
        │                Redirect a cheapweb.mx/express/brief?session={id}
        │                              │
        │                              ▼
        │                Form brief (3 min): logo, textos, fotos, accesos
        │                              │
        │                              ▼
        │                Webhook brief → ticket interno → reloj 7d arranca
        │                              │
        │                              ▼
        │                Build (5-7 días hábiles)
        │                              │
        │                              ▼
        │                Entrega → 1 revisión → cierre
        │
        └── Si no paga: cookie 7d → re-targeting Ads con descuento $300 (opcional)
```

### 2.2 Componentes técnicos

| Componente | Implementación |
|---|---|
| **CTA → Pago** | `<a href="https://buy.stripe.com/xxxxx">` (Payment Link). Sin checkout custom, sin Stripe Elements |
| **Webhook Stripe** | Endpoint en cheapweb-web `/api/stripe-webhook` que escucha `checkout.session.completed` |
| **Redirect post-pago** | Configurado en el Payment Link → `https://cheapweb.mx/express/brief?session={CHECKOUT_SESSION_ID}` |
| **Form brief** | Página nueva `app/express/brief/page.tsx`. Lee session_id, asocia con orden Stripe |
| **Notificación equipo** | Webhook → n8n workflow → Telegram al bot master + WhatsApp grupo equipo |
| **Bot WhatsApp post-pago** | Mensaje automático al cliente: "Listo, recibimos tu pago. Llena tu brief aquí: [link]" |
| **Tracking de orden** | Tabla nueva `express_orders` (Postgres en supabase o SQLite en mc.nexosrv.one) con campos: stripe_id, email, amount, status, brief_received_at, delivered_at |

### 2.3 Por qué Stripe Payment Link y no Checkout embebido

- **Cero código de pago en cheapweb-web** — Stripe hostea el formulario, nosotros sólo recibimos webhook
- **PCI compliance gratis** — no tocamos datos de tarjeta nunca
- **Setup en 10 minutos** — crear el Payment Link en dashboard Stripe, copiar URL
- **Trade-off aceptado:** el cliente sale de la página al pagar (vs Jego que pago en página). En tickets de $3,900 MXN no es bloqueante; el cliente que llegó al click ya decidió.

### 2.4 SLA y manejo de excepciones

| Escenario | Acción |
|---|---|
| Pago OK, brief llega completo en <24h | Reloj arranca. Entrega 5-7 días |
| Pago OK, brief incompleto | Bot pide lo que falta. Reloj pausado |
| Pago OK, sin brief en 14 días | Equipo contacta personalmente. Si abandono total, ofrecemos reembolso del 50% (resto cubre el cost sunk) |
| Pago OK, no entregamos en 7 días | Reembolso 100% automático vía Stripe + disculpa pública (esto sostiene la garantía) |
| Pago fallido en Stripe | Página de fallo redirige a WhatsApp del equipo: "ayuda con tu pago" |
| Cliente pide reembolso post-entrega | Caso por caso. Default: si el reclamo es legítimo y reparable, iteramos. Si no, reembolso parcial pactado |

---

## 3. Funnel cheapweb — el path consultivo

### 3.1 Diagrama de etapas

```
Anuncio (cpc) u orgánico
        │
        ▼
cheapweb.mx (landing rediseñada)
        │
        ├── CTA A: "Agenda 15 min con Alejandro" ─► TidyCal embed (mismo dominio)
        │                                                  │
        │                                                  ▼
        │                                          Discovery call
        │
        ├── CTA B: "Hablar por WhatsApp" ─► WhatsApp con bot pre-cualificador
        │                                          │
        │                                          ▼
        │                              Bot: presupuesto + plazo + tipo proyecto
        │                                          │
        │                                          ├── Califica → handoff humano
        │                                          └── No fit → "te recomendamos Express ($3,900)"
        │
        └── CTA C: Form "Quiero que me contacten" ─► n8n auto-respuesta inmediata
                                                          │
                                                          ▼
                                                Email + WhatsApp con calendario TidyCal
                                                          │
                                                          ▼
                                                 (converge en Discovery call)

Discovery call (TidyCal o WhatsApp escalado)
        │
        ▼
Equipo envía cotización + propuesta (TXT WhatsApp o PDF) en <72h
        │
        ▼
Cliente acepta → Anticipo (50% por transferencia o Stripe Payment Link grande)
        │
        ▼
Kickoff: brief + assets
        │
        ▼
Build 12-28 días según SKU
        │
        ▼
Aprobación diseño → desarrollo → revisión → entrega
        │
        ▼
Cierre 100% (pago final)
```

### 3.2 Las 3 vías paralelas — por qué las 3

| Vía | Para qué tipo de lead | Fricción | Velocidad |
|---|---|---|---|
| TidyCal | Lead frío que quiere "ver primero", profesional, agenda con 1-3 días de anticipación | Baja (sin escribir) | Lenta (1-3 días para call) |
| WhatsApp + bot | Lead caliente que quiere respuesta YA. Estilo mexicano informal | Muy baja | Inmediata si bot responde |
| Form | Lead que prefiere asincrónico, deja info para que le hablen | Media (llenar campos) | Variable según equipo |

**No es redundancia.** Cada vía sirve a un tipo de comprador. La landing presenta las tres con jerarquía visual: TidyCal primero (compromiso de horario), WhatsApp como secundario (informal), Form como tercer carril (asincrónico).

### 3.3 Bot WhatsApp pre-cualificador (n8n + Evolution API)

Stack ya disponible (ver CLAUDE.md global: Evolution API en aws2:8082, n8n en :5678).

**Flujo del bot al recibir primer mensaje:**

```
Cliente: "hola, quiero info de su sitio web"
   ↓
Bot: "Hola! Soy Lupe, asistente de cheapweb. Para conectarte con
     la persona correcta, dos preguntas rápidas:
     
     1) ¿Es para un negocio que ya está operando o uno nuevo?
     2) ¿Tienes idea de presupuesto?
        a) Bajo (~$2K) — te paso a Landing Express
        b) Medio ($8K–$24K) — te paso con el equipo cheapweb
        c) No sé todavía — te agendo una llamada"
   ↓
Según respuesta:
   a) → Link directo a cheapweb.mx/express + mensaje "puedes comprar online"
   b) → Handoff a humano: "[Nombre del equipo] te contesta en breve"
   c) → Link TidyCal "agenda 15 min sin compromiso"
```

**Métricas del bot:**
- % conversaciones cualificadas (b o c) vs descalificadas (a)
- Tiempo de handoff a humano cuando aplica
- Tasa de no-show post-bot (cliente desaparece tras la cualificación)

### 3.4 SLA por etapa

| Etapa | SLA | Owner |
|---|---|---|
| Bot primera respuesta WhatsApp | <30 segundos | Bot |
| Handoff humano post-bot | <2 horas hábiles | Equipo |
| Discovery call (post-agenda) | Slot más cercano disponible en TidyCal | Alejandro o equipo |
| Cotización post-discovery | <72 horas hábiles | Equipo |
| Confirmación anticipo recibido | <12 horas | Finanzas/Alejandro |
| Kickoff post-anticipo | <48 horas | Equipo |
| Entrega final | Según SKU (12-28 días) | Equipo dev |

---

## 4. Adquisición

### 4.1 Auditoría de Ads existentes (acción inmediata)

**Estado actual** (de `v3-01`):
- 21 keywords activas
- $300 MXN/día gasto (~$9,000 MXN/mes)
- CTR >5% (sano)
- Conversiones intermitentes

**Auditoría requerida en mes 1:**

1. **Listar top 5 keywords por gasto** + ver el copy del anuncio para cada una
2. **Verificar landing-ad alignment**: ¿el H1 del hero matchea la promesa del anuncio?
3. **Match type review**: ¿hay keywords en broad match comiéndose presupuesto con búsquedas vagas (ej. "página web gratis")?
4. **Search Terms Report**: 30 últimos términos por gasto — descartar los que claramente no eran fit (ej. "wix", "hacer mi propia página")

**Recomendación operativa:** segmentar Ads en dos campañas distintas:

| Campaña | Destino | Keywords core | Bid strategy |
|---|---|---|---|
| **cheapweb-pro** | cheapweb.mx | "diseño web profesional", "sitio web negocio", "agencia web méxico" | Maximize conversions |
| **cheapweb-express** | cheapweb.mx/express | "landing rápida", "página web barata", "sitio web express", "página en 7 días" | Target CPA $400 MXN |

Esto **resuelve el desalineamiento landing-ad** que es una de las hipótesis del v3-01: el tráfico que viene buscando "barato" aterriza en Express ($3,900) y no en cheapweb ($8K+).

### 4.2 Orgánico (vela larga, pero la mejor conversión)

De `v3-01`: scroll depth orgánico **43%** vs cpc 19%. El tráfico orgánico convierte 2x mejor pero no se ha priorizado.

**Acciones de mes 1:**
- 3 artículos de blog nuevos enfocados a búsquedas de fondo de embudo: "cuánto cuesta una página web en méxico 2026", "diferencia entre landing y sitio web", "wix vs wordpress para negocios mexicanos"
- Schema markup en pricing (Google muestra precios en SERP)
- Search Console alta de cheapweb.mx/express como property nueva

### 4.3 Re-targeting de leads perdidos (acción de 1 semana)

Hipótesis del análisis: los últimos 30-60 leads que no cerraron no fueron post-mortem analizados. Es data gratis.

**Plan:**
1. Listar todos los leads de Ads/WhatsApp de los últimos 60 días que NO cerraron
2. Mensaje WhatsApp manual (no automatizado, eso quema): "Hola [nombre], soy Alejandro. Hace [X] semanas nos escribiste sobre tu sitio. ¿Qué te frenó? Me sirve la respuesta aunque digas 'lo dejé para después'. Sin venta, te lo prometo."
3. Categorizar respuestas: precio / tiempo / cambio de prioridad / no confianza / otro
4. **Si patrón claro**: ajustar Ads y landing en consecuencia
5. **Leads "lo dejé para después"**: ofrecer Landing Express como entry point ($3,900) o agendar llamada de 15 min sin compromiso

Esto puede recuperar 2-5 ventas directas en mes 1 sin gastar 1 peso de Ads adicional.

### 4.4 Campañas paid para Express (nuevas)

Express tiene canales distintos que Pro:
- **Meta Ads (Facebook/Instagram)** — formato carrusel con demos clickeables. Audiencia: PyMEs LATAM, dueños 25-55, intereses Wix/Wordpress/marketing digital
- **TikTok Ads** — formato video corto "tu sitio web por $3,900 en 5 días", retargeting de tráfico previo
- **Google Search** — keywords transaccionales sub-$2K (ver §4.1)

Presupuesto inicial sugerido Sprint 1: $4,500 MXN/mes ($150/día) — la mitad del que ya gasta cheapweb. Si convierte, escalar.

---

## 5. Métricas por funnel (qué medir)

### 5.1 Express — métricas KPI

| Métrica | Cómo se calcula | Target Sprint 1 |
|---|---|---|
| **Visitor → Click CTA** | Eventos GA `click_cta_express` / sessions | >12% |
| **Click → Checkout iniciado** | Stripe Checkout sessions creadas / clicks | >40% |
| **Checkout → Pago completado** | Stripe `checkout.session.completed` / sessions | >55% |
| **Pago → Brief recibido <24h** | Brief forms submitted / orders paid | >80% |
| **Pago → Entrega <7d** | Orders delivered on time / orders paid | >95% |
| **Reembolsos** | Refunds / orders paid | <5% |
| **CAC** (costo adquisición) | Gasto Ads / órdenes pagadas | <$500 MXN |

### 5.2 cheapweb — métricas KPI

| Métrica | Cómo se calcula | Target Sprint 1 |
|---|---|---|
| **Scroll depth cpc** | Clarity, scroll a 50% | >35% (subir desde 19%) |
| **Active time cpc** | Clarity | >45s (subir desde <25s) |
| **Visitor → Discovery agendada** | TidyCal bookings / sessions | >2% |
| **Discovery → Cotización aceptada** | Quotes accepted / discoveries done | >35% |
| **Cotización → Anticipo** | Down payments received / quotes accepted | >70% |
| **Anticipo → Entrega final** | Projects delivered / down payments | >90% |
| **CAC cheapweb** | Gasto Ads cheapweb / ventas cerradas | <$1,500 MXN |
| **Bot precalificación rate** | Conversaciones cualificadas / total WhatsApp | >60% |

### 5.3 Cross-funnel — métricas de salud comercial

| Métrica | Por qué importa |
|---|---|
| **Ventas/mes totales** | Sale de 0 actual; target Sprint 1 = ≥4 (1 cheapweb + 3 Express mínimo) |
| **Ticket promedio combinado** | Si Express canibaliza demasiado a cheapweb, ticket cae. Vigilar |
| **Margen total mensual** | $3,900 × 3 + $16,000 × 1 = $21,970 MXN bruto. Restar costos = ~$10K margen Sprint 1 |
| **Tiempo de lead → primer pago** | Express: <90s ideal. cheapweb: <14 días ideal |

---

## 6. Implicaciones para v3-04 (último doc)

El v3-04 (copy + plan de ejecución) tendrá que cubrir:

1. **Copy de landing cheapweb.mx** (revisar y subordinar el v2.0 a las decisiones de v3-02)
2. **Copy de landing cheapweb.mx/express** (nueva, voz Jego-style adaptada)
3. **Copy de bot WhatsApp** (script de cualificación)
4. **Copy de anuncios** (Google Ads, Meta Ads para Express)
5. **Plan de ejecución por sprints** (reemplazando la fase 1-4 obsoleta del v2.0)
6. **Métricas y dashboard** (cómo se va a leer la data semanalmente)
7. **Checklist técnico**: Stripe Payment Link, webhook, brief form, n8n bot, TidyCal embed, GA events, Schema markup, Search Console
