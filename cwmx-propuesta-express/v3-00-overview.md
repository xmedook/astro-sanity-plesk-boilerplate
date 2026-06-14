# v3.0 — Gobierno Comercial cheapweb.mx (Plan Integral)

> **Estado:** ✅ v3.0 completo. Listo para ejecución pendiente de autorización explícita ("ejecutar gobierno comercial").
> **Fecha de inicio:** 2026-05-28
> **Propietario:** Alejandro (DG cheapweb.mx)
> **Reemplaza:** los 7 docs del v2.0 (`01..07-*.md`), que pasan a ser insumo histórico

---

## Por qué v3.0 y no seguir con v2.0

El v2.0 es un PRD de rediseño de landing — trata **voz y copy**. El diagnóstico actualizado (ver `v3-01-diagnostico.md`) concluye que el problema raíz de "21 días sin cerrar venta" no es voz; es **estructura de producto + funnel + alineación de adquisición**. Reescribir copy sin tocar lo demás cambia la estética, no la conversión.

El v3.0 cubre los 4 vectores que el v2.0 deja fuera de scope o aborda parcialmente:

| Vector | v2.0 | v3.0 |
|---|---|---|
| Producto / pricing / SKUs | No toca | Rediseña (tier piloto + reposicionamiento) |
| Funnel de cierre | Asume WhatsApp | Capas por ticket (instant / asíncrono / consultivo) |
| Copy y voz | Reescribe landing entera | Reusa técnicas v2.0 pero subordinadas al producto |
| Adquisición (Ads) | No toca | Auditoría keywords + alineación landing-ad |

---

## Qué del v2.0 sobrevive

- **Catálogo de técnicas JegoDigital** (`02-analisis-competitivo.md` §2.3) — sigue siendo la mejor referencia de voz disponible
- **Founder-led, transparencia radical, FAQ directo** — los patrones aplican
- **Diagnóstico del estado actual** (`01-estado-actual.md`) — datos siguen vigentes
- **Tabla comparativa** (concepto, no copy textual)

## Qué del v2.0 muere

- **Plan de implementación en 4 fases** (`05-plan-de-implementacion.md`) — el orden está mal: Founder en fase 2 cuando el 81% del tráfico pagado nunca llega ahí
- **Asunción "Stripe embebido NO aplica"** (tabla §2.5) — se reabre la pregunta con base en ticket nuevo
- **Asunción "3 planes son diferenciador real"** (tabla §2.5) — se reabre con base en data de conversión
- **Especificaciones por archivo** (`06-*.md`) — se rehace al final, cuando el producto/funnel estén definidos

---

## Estructura del v3.0

| # | Archivo | Estado | Contenido |
|---|---------|--------|-----------|
| 00 | `v3-00-overview.md` | ✅ Listo | Este doc — mapa y rationale |
| 01 | `v3-01-diagnostico.md` | ✅ Listo | Datos vivos + análisis Jego + hipótesis causal priorizada |
| 02 | `v3-02-producto-y-pricing.md` | ✅ Listo | Express ($3,900 vs Jego $4,800 — WordPress+GA4+Pixel+5correos+2rev) + cheapweb.mx (3 SKUs con jerarquía) |
| 03 | `v3-03-funnel-y-adquisicion.md` | ✅ Listo | Funnels separados (Stripe-driven vs consultivo), 3 vías cheapweb (TidyCal+WhatsApp+Form), bot precalificador, auditoría Ads, segmentación campañas |
| 04 | `v3-04-copy-landing-y-plan.md` | ✅ Listo | Copy completo de las 2 landings + bot + 6 ejemplos de anuncios + 4 sprints + checklist técnico + dashboard |

---

## Decisiones que bloquean el avance

Para escribir v3-02 (producto/pricing) necesito que Alejandro decida o al menos opine sobre:

1. **¿Tier piloto sub-$3K MXN sí o no?**
   - Pro: cabe en decisión impulsiva, permite copiar mecánica Jego, entrada al ecosistema
   - Contra: canibaliza Smart $8K, baja ticket promedio, riesgo de comoditizar
2. **¿Cuántos SKUs visibles en landing?**
   - Hoy: 3 (Smart / Pro / Pro+Tienda)
   - Alternativa A: 1 SKU principal + add-ons (modelo Jego)
   - Alternativa B: 2 SKUs (consolidar Smart+Pro, dejar Pro+Tienda)
   - Alternativa C: mantener 3 pero con jerarquía visual clara (un "recomendado")
3. **¿Aceptar OXXO/Stripe como medio de pago o seguir WhatsApp-only?**
   - Implica integración técnica + cambio de funnel
4. **Capacidad real mensual** — la página dice "4 al mes". ¿Es real o copy? Si subimos demanda con un piloto, ¿cuánto se puede entregar sin romper calidad?
5. **¿Garantía monetaria explícita?** El v2.0 propone "renovación gratis si nos pasamos del plazo". ¿Va o no? ¿Hay cobertura para ofrecerla?

Sin estas 5 decisiones, el v3-02 sería ficción.

---

## Reglas de handoff (vigentes)

- Sigue siendo handoff. **No implementar nada en `cheapweb-web` sin que Alejandro diga "ejecutar"**.
- El v3.0 también respeta esta regla: documentamos primero, ejecutamos después.
- Excepción explícita posible: acciones de impacto en 48h del análisis (hero rewrite, Calendly, audit Ads) pueden adelantarse si Alejandro lo autoriza por separado — no requieren esperar a v3 completo.
