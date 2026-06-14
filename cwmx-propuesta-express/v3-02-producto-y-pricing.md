# v3.02 — Producto y Pricing

> **Propósito:** Arquitectura de productos, pricing y posicionamiento. Define qué se vende y a qué precio antes de definir cómo se vende (v3-03) o cómo se comunica (v3-04).
> **Decisiones tomadas:** 2026-05-28 (sección 1)
> **Decisiones pendientes:** sección 6

---

## 1. Decisiones tomadas (input de Alejandro)

| Decisión | Resolución |
|---|---|
| ¿Tier piloto sub-$3K? | **Sí, en `cheapweb.mx/express`** (subdirectorio), comprable online con Stripe Payment Link |
| ¿SKUs en cheapweb.mx? | **3 con jerarquía clara** (Pro marcado "recomendado") |
| ¿Medios de cierre en cheapweb.mx? | **3 vías paralelas**: TidyCal (nuevo) + WhatsApp (con bot pre-cualificador) + Form con auto-respuesta |
| ¿Garantía? | cheapweb: **implícita con devolución mencionada** sin términos; Express: **explícita** ("si no entregamos en 7 días, te devolvemos") |
| **Capacidad real** | **12 proyectos/mes** combinados (cheapweb + Express). El "4/mes" público es manipulación de urgencia |
| **Cuenta Stripe MX** | Operativa. Sandbox keys disponibles |
| **Flujo de pago Express** | **Stripe Payment Link** (no checkout embebido). URL hosteada por Stripe, redirige a página de brief tras pago |
| **OXXO** | Por ahora **solo tarjeta vía Stripe**. OXXO se evalúa después según data |
| **Equipo de cierre** | Equipo humano + bot WhatsApp pre-cualificador + TidyCal para discovery calls |
| **Nombre Express** | "Landing Express" (confirmado) |

---

## 2. Arquitectura de productos — dos líneas separadas

```
┌─────────────────────────────────────────────┬─────────────────────────────────────────────┐
│ LÍNEA EXPRESS (sub-marca / nueva)           │ LÍNEA CHEAPWEB.MX (existente, reposicionada)│
│                                             │                                             │
│ • 1 SKU                                     │ • 3 SKUs con jerarquía                      │
│ • Decisión impulsiva ($1.5K-$3K)            │ • Decisión consultiva ($8K-$24K)            │
│ • Stripe checkout embebido                  │ • Calendly + WhatsApp + Form (3 vías)       │
│ • Entrega 5-7 días                          │ • Entrega 12-28 días                        │
│ • Voz: Jego-style (urgencia, countdown)     │ • Voz: founder-led, transparencia, premium  │
│ • Mecánica: pago primero, brief después     │ • Mecánica: lead → discovery → cotización   │
└─────────────────────────────────────────────┴─────────────────────────────────────────────┘
```

**Justificación:** son dos modos de venta distintos. Mezclarlos en una landing crea cognitive dissonance ("¿es premium o barato?"). Separarlos permite:
- Voz propia para cada línea (express puede ser más agresiva)
- Métricas separadas en Ads/Analytics (no contamina baseline de cheapweb.mx)
- Stack técnico distinto si se requiere (la express podría incluso ser Webflow para iterar más rápido sin tocar Next.js)
- SEO de cheapweb.mx no se contamina con "barato barato barato"
- Cross-sell natural: Express → upsell a cheapweb si el cliente crece

---

## 3. Línea Express — el SKU piloto

### 3.1 Identidad
- **URL:** `cheapweb.mx/express` (subdirectorio, no subdominio)
- **Nombre comercial:** Landing Express
- **Implicación SEO:** comparte autoridad con cheapweb.mx (positivo); analytics separados con view filtrado por path (`/express/*`)
- **Implicación técnica:** misma app Next.js o nueva ruta dedicada; no requiere DNS extra

### 3.2 Costos reales del producto (cálculo abierto)

> **Actualizado 2026-06-04** — repricing a $3,900 MXN (ver §3.4)

| Concepto | Costo unitario | Comentario |
|---|---|---|
| Dominio .com/.mx 1 año | $250 MXN | Costo registrar via proveedor |
| Hosting 1 año | $100 MXN | Costo marginal infraestructura propia (aws2/koodehosting) |
| SSL | $0 | Let's Encrypt |
| Mano de obra (dev + QA) | $1,700 MXN | ~6-8h template base + config GA4/Pixel |
| Stripe fee tarjeta MX | ~3.6% + $3 MXN | Sobre $3,900 = ~$143 MXN |
| **Total costo** | **~$2,193 MXN** | Hosting propio; sube ~$700 si hosting externo |
| **Margen** | **~$1,707 MXN (~44%)** | Saludable; permite reembolsos sin quiebra |

### 3.3 SKU Express — propuesta final (v2 — 2026-06-04)

> **Decisión Alejandro 2026-06-04:** precio $3,900 MXN. Posicionamiento directo vs Jego $4,800.

| Campo | Valor |
|---|---|
| **Nombre interno** | `express` |
| **Nombre comercial** | **Landing Express** |
| **Precio** | **$3,900 MXN** |
| **Ancla de precio** | "Normalmente desde $8,000 MXN" (referencia: cwmx Smart + agencias) |
| **Ancla competitiva** | "Competidores cobran $4,800 por menos. cwmx Express: $3,900 con WordPress y tracking." |
| **Margen estimado** | ~$1,707 MXN/venta (~44%) |
| **Qué incluye** | Hasta 5 páginas/secciones, WordPress mobile-first editable, WhatsApp flotante, formulario contacto, SSL, dominio .com o .mx 1 año, hosting 1 año, **5 correos corporativos**, **GA4 + Meta Pixel configurados**, SEO básico (title/meta/H1), **2 rondas de revisión** |
| **Qué NO incluye** | Blog integrado, tienda en línea, SEO avanzado, fotografía profesional, campañas de ads, más de 5 páginas, mantenimiento post-entrega (add-on) |
| **Diferenciadores vs Jego $4,800** | WordPress editable (Jego: templated cerrado) · GA4+Pixel incluido (Jego: excluido explícito) · 5 correos vs 3 · 2 revisiones vs 1 · $900 más barato |
| **Plazo** | **7 días hábiles** desde recepción de brief completo (honesto; Jego promete "48h" que en la práctica no se cumple con content personalizado) |
| **Pago** | **Stripe Payment Link** — tarjeta (Visa/Mastercard/AmEx). OXXO se evalúa mes 2 |
| **Flujo** | Click CTA → Stripe Payment Link → Pago → Redirect `cheapweb.mx/express/brief` → Form brief → Webhook equipo + bot → 7 días → Entrega |
| **Capacidad** | 5-8/mes |
| **Garantía** | "Si no entregamos en 7 días hábiles después de recibir tu brief completo, te devolvemos el 100%." |

### 3.4 Repricing — de $1,990 a $3,900 (rationale)

**Contexto:** Jego subió de $800 MXN a $4,800 MXN (2026-06-04). El segmento Express cambió: ya no es "ultra-barato vs agencias $8K+" sino "alternativa premium asequible vs Jego $4,800".

**Tres razones para $3,900 específicamente:**

1. **$900 por debajo de Jego en precio público** — win inmediato para leads que comparan. Si Jego usa código de descuento ($3,359), cwmx sigue siendo la opción con más value por precio similar.
2. **Margen 44% vs 23% anterior** — permite absorber reembolsos, brief incompletos y tiempo extra sin quemar caja. El margen delgado del $1,990 era riesgo operativo.
3. **Precio justifica inclusions superiores** — a $3,900 podemos incluir GA4+Pixel, 5 correos y 2 revisiones. A $1,990 esas inclusions eran inviables.

**Si en mes 2 el mix no convierte:** evaluar $3,490 con anchor $7,000+ (mantiene la ventaja vs Jego y amplía el net).

### 3.5 Add-ons opcionales post-checkout

Después del pago, en el form de brief, ofrecer add-ons sin presión:
- **Correos adicionales (hasta 10)** — +$490 MXN/año
- **Sección adicional** — +$890 MXN por sección (más allá de las 5 base)
- **Mantenimiento mensual** — $799/mes (mismo que cheapweb)
- **Upgrade a Smart $8K** — diferencia $4,100 si quieren full custom
- **Google Workspace (5 cuentas)** — +$1,200 MXN/año (si prefieren G Suite vs correos básicos)

Estos add-ons NO aparecen en la landing pública. Solo post-pago, para no contaminar la decisión simple del $3,900.

---

## 4. Línea cheapweb.mx — reposicionamiento

### 4.1 Cambios estructurales

1. **Mantener 3 SKUs**: Smart / Pro / Pro+Tienda
2. **Marcar Pro como "Recomendado"** con badge visual destacado (border más grueso, color sólido)
3. **Añadir columna "✗ NO INCLUYE"** en cada tarjeta (del v2.0, sigue válido)
4. **Footer cross-sell discreto**: "¿Sólo necesitas una landing rápida? → Conoce Express" (link a `express.cheapweb.mx`)

### 4.2 SKU Smart 2.0

| Campo | Valor |
|---|---|
| **Precio** | $8,000 MXN |
| **Posicionamiento** | "Para negocios que necesitan presencia ya, con margen de crecimiento" |
| **Badge** | "Para empezar" (sutil, no destacado) |
| **Plazo** | 12-14 días |
| **Incluye** | 1 landing pro, mobile-first custom, dominio .com/.mx 1 año, hosting 1 año, 3 correos, SSL, 1 revisión |
| **NO incluye** | Más de 1 página, blog, tienda, chat, SEO avanzado, Pixel Meta/GA, administración |
| **Diferencia clave vs Express** | Diseño 100% custom (Express usa template-base), revisión incluida, dominio .mx disponible, soporte directo (no auto-servicio) |

### 4.3 SKU Pro 2.0 (RECOMENDADO)

| Campo | Valor |
|---|---|
| **Precio** | $16,000 MXN |
| **Posicionamiento** | "Para negocios que quieren ser encontrados y convertir" |
| **Badge** | **"Recomendado"** (destacado visual fuerte) |
| **Plazo** | 16-18 días |
| **Incluye** | 3 páginas/secciones, todo lo de Smart, blog integrado, WhatsApp flotante, SEO on-page (títulos, meta, H1, estructura), Analytics + Search Console, 10 correos, 1 revisión |
| **NO incluye** | Tienda en línea, más de 3 páginas, Pixel/Tag avanzado, campañas ads, SEO mensual/link building |
| **Por qué es el recomendado** | Anchor central: el 80% de negocios necesita exactamente esto. Smart se siente corto, Pro+Tienda sólo si vendes online. |

### 4.4 SKU Pro+Tienda 2.0

| Campo | Valor |
|---|---|
| **Precio** | $24,000 MXN |
| **Posicionamiento** | "Para negocios que van a vender en línea" |
| **Badge** | "Si vendes" (cualificador, no destacado) |
| **Plazo** | 20-28 días |
| **Incluye** | Todo lo de Pro, WooCommerce configurado, hasta 50 productos cargados, pasarela (Stripe/Mercado Pago), gestión envíos, capacitación 1h |
| **NO incluye** | Más de 50 productos, fotografía, manejo inventario post-entrega, ads para tienda, SEO avanzado e-commerce, integraciones ERP |

### 4.5 Garantía en cheapweb.mx (copy vago a propósito)

Tres lugares donde aparecerá la garantía implícita-pero-mencionada:

1. **Hero (microcopy bajo el CTA):** "Sin sorpresas. Sin contratos. Si algo sale mal, respondemos."
2. **FinalCTA:** "Apruebas el diseño antes de desarrollar. Y si no estás conforme con lo entregado, te devolvemos."
3. **FAQ:** Pregunta directa "¿Qué pasa si no me gusta el resultado?" → respuesta "Lo apruebas al 100% antes de desarrollar. Si no te gusta, iteramos. Si aún así no funciona, te devolvemos."

**Nota intencional:** ningún copy especifica % de reembolso, plazo, ni condiciones exactas. Esto preserva flexibilidad caso-por-caso para Alejandro, sin renunciar al signal de "no hay riesgo".

---

## 5. Capacidad y proyección

### 5.1 Capacidad real combinada
- **Real (confirmado por Alejandro):** **12 proyectos/mes** total (cheapweb + Express)
- **Comunicada hoy en cheapweb landing:** "Solo 4 al mes" — esto es manipulación de urgencia, no la capacidad real

### 5.2 Reparto de capacidad propuesto

| Línea | Cupos/mes | Copy público | Justificación |
|---|---|---|---|
| cheapweb.mx | 6 | "Solo 6 proyectos al mes" | Sigue siendo urgencia creíble. 4 era demasiado tenso para el upside real |
| Express | 6 | "5 cupos esta semana" | Rotación semanal sostenible; deja 1 cupo de buffer/mes |
| **Total** | **12** | | Igual a capacidad real, sin sobreventa |

**Implicación clave:** subir copy de cheapweb de "4" a "6" no rompe urgencia y nos da espacio si el rediseño aumenta conversión.

### 5.3 Riesgos operativos

- **Desborde Express:** si convierte 10+/mes, plazos se rompen → garantía explícita se activa. Mitigación: cap duro a 6 cupos/mes con countdown agotándose en landing.
- **Cambio de mix:** si Express canibaliza a Smart $8K, ticket promedio cae. Mitigación: footer cross-sell de Express **sólo aparece después de la sección de pricing cheapweb**, no antes.
- **Bot/equipo overload:** 12 proyectos simultáneos vs sólo 4 hoy = 3x carga de comunicación. Mitigación: bot WhatsApp pre-cualifica y filtra leads no-fit antes de tocar al equipo.

### 5.4 Roll-out por sprints

1. **Sprint 1 (mes 1):** Express con cap "5 cupos/semana" + copy cheapweb a 6/mes. Validar conversión sin desbordar.
2. **Sprint 2 (mes 2):** ajustar cap según conversión real. Considerar OXXO si la fricción de tarjeta-only filtra mucho.
3. **Sprint 3 (mes 3):** decidir pricing iteración (subir, bajar, mantener) y si Express crece a marca propia.

---

## 6. Decisiones que quedan abiertas (no bloquean v3-03)

| # | Pregunta | Cuándo se decide |
|---|---|---|
| 1 | **Hosting Express: ¿propio o externo?** | Antes de Sprint 1. Si externo, repricing a $2,490-$2,990 |
| 2 | **Add-ons activos en mes 1**: ¿lanzamos los 4 o sólo correos+mantenimiento? | Antes de Sprint 1. Más add-ons = más complejidad post-pago |
| 3 | **Copy de cheapweb: ¿"6 al mes" o mantener "4"?** | Decisión comercial — el "4" era ficción de urgencia |
| 4 | **Marca propia para Express en mes 3** | Sólo si Sprint 1+2 validan, no urgente |
| 5 | **OXXO activación** | Después de medir conversión-tarjeta de mes 1 |

---

## 7. Implicaciones para v3-03 y v3-04

- **v3-03 (funnel)** tendrá dos secciones paralelas: funnel Express (Stripe-driven) y funnel cheapweb (3 vías). Cada uno con su propia mecánica de cierre, métricas y SLAs.
- **v3-04 (copy y plan)** tendrá dos landings distintas que copyear: la principal cheapweb.mx (evolución del v2.0) y la nueva Express (Jego-inspired pero adaptada). El plan de ejecución necesita 2 tracks paralelos.
