# v3.01 — Diagnóstico Vivo

> **Propósito:** Datos crudos + análisis de competencia + hipótesis causal priorizada. Este doc es el insumo de toda decisión del v3.0.
> **Última actualización:** 2026-05-28

---

## 1. Hechos crudos

### 1.1 Estado del negocio
- **0 cierres en los últimos 21 días.**
- 21 keywords activas en Google Ads, **$300 MXN/día** de gasto (≈$6,300 MXN en el período sin venta).
- **CTR >5%** (saludable — los anuncios atraen).
- Conversiones intermitentes históricamente; el período actual rompe la baseline.

### 1.2 Comportamiento del tráfico (Microsoft Clarity)
| Métrica | google/cpc | orgánico |
|---|---|---|
| Scroll depth | **19%** | 43% |
| Active time | **<25s** | (no especificado, presumiblemente >25s) |
| Dead clicks | <5% | — |
| Rage clicks | 0% | — |

**Interpretación:** El tráfico pagado entra y se va antes de leer el hero completo. No llega al pricing, no llega a CTAs secundarios, no llega a portfolio. La landing pierde al 81% en los primeros 600px y 25 segundos.

### 1.3 Estructura actual de la oferta
- 3 SKUs visibles: **Smart $8K · Pro $16K · Pro+Tienda $24K**.
- Sin tier de entrada bajo (mínimo $8K MXN).
- Funnel único: **WhatsApp → conversación humana → cierre asíncrono**.
- Sin Stripe, sin Calendly, sin pago instantáneo.
- Urgencia: "4 al mes" estático (sin contador vivo).
- Garantía: implícita ("apruebas el diseño antes de desarrollar"), no monetaria.

---

## 2. Análisis competitivo: JegoDigital (análisis fresco 2026-05-28)

URL fuente: `jegodigital.com/premium-website-offer`

### 2.1 Asimetría estructural — el dato más importante

| | JegoDigital | cheapweb |
|---|---|---|
| Ticket | $800 MXN ($46 USD) | $8,000 MXN mínimo |
| Decisión | Impulsiva (precio de cena) | Meditada (requiere ROI) |
| Pago | Stripe embebido (Visa/Mastercard/AmEx/**OXXO**), 3 campos, ~30s | WhatsApp → conversación → contrato |
| Promesa de entrega | **48 horas** | 12–28 días |
| SKUs visibles | **1** (5 páginas, fijo) | 3 (parálisis) |
| Funnel | Pagar primero, brief después | Lead → cotizar → cerrar (3+ touchpoints) |
| Urgencia | Countdown vivo HH:MM:SS + 5/5 cupos/día con reset 00:00 CDMX | "4 al mes" estático |
| Garantía | **100% reembolso** + "no guardamos tarjeta" + "sin contratos" | Implícita, no monetaria |
| Social proof | 15 Google Reviews verificadas con foto + 10 demos clickeables a sitios vivos | Marquee logos + testimonios + 120+ sitios (sin links vivos) |
| FAQ | Ataca objeción de frente: "¿Por qué $800? ¿No es muy barato?" | Tono corporativo suave |

### 2.2 Lectura central

**Jego no vende por su copy. Vende porque el producto está diseñado para una decisión emocional de 90 segundos.** Todas sus mecánicas (countdown, founder, transparencia radical, Stripe embebido) funcionan *porque* el ticket no requiere consideración. A $800 MXN nadie pide cotización, compara o lo consulta con su socio.

A $8,000 MXN, copiar la voz Jego sin tocar funnel/producto sólo cambia la estética. La conversión depende de un proceso de venta más largo que la landing no controla.

### 2.3 14 CTAs de Jego (todos al mismo destino)
Todos los CTAs llevan a `#quick-checkout-form` con Stripe. Variantes textuales: "Reservar", "Pagar $800 MXN con Stripe →", "Ya vi suficiente, reservar mi sitio →", "Asegurar mi cupo", "Pagar $800 y aparta tu sprint". **Una sola acción, repetida 14 veces.**

### 2.4 Detalles concretos que sí podemos portar
- **Specificity weapons**: "4.9 / 15 reseñas reales", "48h entrega", "6+ clientes activos" (números exactos, no "muchos clientes")
- **Concesión sobre precio**: "¿Por qué $800? Construimos máximo 5 al día — no por presión, por calidad" (reframe del bajo precio como protección de calidad)
- **Demos vivos clickeables** (no screenshots) — 10 enlaces reales
- **Founder con foto + métricas personales** — humaniza, elimina "¿con quién hablo?"
- **OXXO como medio de pago** — crítico para el mercado MX informal
- **Tabla comparativa factual** sin atacar competidores ("Este sprint vs Freelancer vs Agencia vs DIY")

### 2.5 Detalles que NO conviene copiar
- **Countdown vivo con reset diario**: sin Stripe embebido, sólo subraya que no podés cerrar igual de rápido. La urgencia debe ser proporcional a la capacidad de cierre instantáneo.
- **"5 cupos hoy"**: aplica para batches diarios; cheapweb es mensual. Mantener mensual.
- **"$46 USD" como ancla**: el mercado MX no compra servicios locales en USD. Anclar en MXN puro.
- **Refund 100% sobre ticket alto**: viable sobre $800; sobre $8K-$24K representa riesgo de cash flow. La alternativa del v2.0 ("renovación gratis si nos pasamos") es mejor.

---

## 3. Hipótesis causal priorizada

Las 4 hipótesis abajo explican el "0 cierres en 21 días". Están ordenadas por impacto estimado × evidencia disponible. No son mutuamente excluyentes — probablemente las 4 contribuyen.

### H1 — El hero no convierte y el 81% se va antes de ver el pricing
**Evidencia:** scroll depth 19% en cpc, active time <25s. El lead nunca llega a pricing, founder ni FAQ.
**Validación:** A/B test del hero con price anchor visible sin scroll + CTA dual (WhatsApp + Calendly). Medir scroll depth post-cambio.
**Acción:** Hero rewrite de 48h, no esperar plan completo.

### H2 — El ticket mínimo $8K excluye al lead que vino esperando precio bajo
**Evidencia:** Jego convierte a $800; los Ads de cheapweb probablemente pescan tráfico de "página web barata" con expectativa <$5K.
**Validación:**
1. Revisar las 5 keywords con más gasto y el copy de sus anuncios — ¿prometen rango de precio?
2. Llamar a 30 leads de los últimos 60 días que no cerraron — preguntar qué los detuvo (precio / tiempo / confianza / otra cosa).
**Acción:** considerar tier piloto sub-$3K como SKU de entrada. Decisión va en `v3-02`.

### H3 — El funnel WhatsApp introduce fricción incompatible con tráfico cold
**Evidencia:** WhatsApp requiere salir de la página, decidir qué escribir, esperar respuesta. Cold traffic no tiene paciencia.
**Validación:** medir tasa de conversación-iniciada-en-WhatsApp vs leads que llenaron form, vs si existiera un Calendly de 15 min directo en el hero.
**Acción:** añadir CTA Calendly como dual del WhatsApp. Decisión técnica va en `v3-03`.

### H4 — Los anuncios de Ads están desalineados con la landing
**Evidencia:** CTR >5% (anuncios funcionan) + scroll 19% (landing decepciona) = promesa del anuncio no se cumple en hero.
**Validación:** auditar 5 anuncios con más gasto, comparar copy del ad con H1 + subtitle del hero.
**Acción:** ajustar copy del hero al copy del anuncio (o pausar anuncios desalineados). Detalle en `v3-03`.

---

## 4. Lo que necesitamos averiguar (no asumamos)

| Pregunta | Cómo se responde | Quién |
|---|---|---|
| ¿Qué les frenó a los leads de los últimos 60 días? | 30 llamadas/mensajes de 5 min | Alejandro |
| ¿Qué prometen los anuncios actuales? | Revisar Google Ads dashboard | Alejandro o Claude con acceso |
| ¿Qué capacidad real de entrega hay si triplica demanda? | Cálculo interno equipo | Alejandro |
| ¿Stripe MX requiere RFC/persona moral o se puede operar con tarjeta de la empresa actual? | Investigación Stripe Mexico | Tarea para v3-03 |
| ¿OXXO Pay vs Mercado Pago para tickets sub-$3K? | Comparativa de fees + UX | Tarea para v3-03 |

---

## 5. Próximo doc

`v3-02-producto-y-pricing.md` — requiere las **5 decisiones bloqueantes** listadas en `v3-00-overview.md` §"Decisiones que bloquean el avance".

---

## 6. Actualización competitiva — 2026-06-04

**Fuente:** WebFetch directo a `jegodigital.com/premium-website-offer`

### 6.1 Jego subió el precio — 6x en ~7 días

| | Versión analizada (2026-05-28) | Versión actual (2026-06-04) |
|---|---|---|
| **Precio público** | $800 MXN / $46 USD | **$4,800 MXN** |
| **Precio con código ad** | N/A | **$3,359 MXN** |
| **Ahorro anunciado** | Menor énfasis | 93% ($11,200 vs $12,000+) |
| **Dominio + hosting** | No incluido | **Sí incluido** |
| **Correos** | No incluido | Hasta 3 |
| **Revisiones** | 1 | 1 |
| **GA4 / Pixel** | Excluido explícito | Excluido explícito |
| **Stack** | Templated (no editable) | Templated (no editable) |

### 6.2 Lectura estratégica

- Jego abandonó el segmento sub-$1,000. Con $4,800 está en territorio de **producto consultivo mediano**, no impulso.
- Sigue usando countdown + urgencia como si fuera $800 — esa disonancia lo va a penalizar.
- Su exclusión explícita de GA4/Pixel a $4,800 es un hueco enorme: cualquier negocio que quiera medir sus Ads necesita eso desde el día 1.
- "Con código" a $3,359 sugiere que el precio real está probando elasticidad — no saben dónde quedarse.

### 6.3 Impacto en cwmx Express

Decisión tomada (Alejandro, 2026-06-04): **Express a $3,900 MXN**.

**Por qué $3,900 gana sobre Jego $4,800:**
- $900 MXN más barato en precio público
- WordPress editable (Jego: templated cerrado)
- GA4 + Meta Pixel incluidos (Jego: excluido explícito)
- 5 correos (Jego: 3)
- 2 rondas de revisión (Jego: 1)
- Entrega honesta 7 días (Jego: "48h" — aspiracional para sitio con custom content)

**Repricing en v3-02:** ver §3.3 actualizado (precio $1,990 → $3,900, inclusions ampliadas).
