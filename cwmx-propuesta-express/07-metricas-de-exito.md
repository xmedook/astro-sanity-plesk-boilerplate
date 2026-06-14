# 07 — Métricas de Éxito

> **Propósito:** Cómo medir si el rediseño 2.0 funcionó. Línea base + targets + método de medición.

---

## 7.1 Métricas primarias (conversión)

| Métrica | Línea base (hoy) | Target (30 días post-deploy) | Target (90 días) | Fuente |
|---------|------------------|------------------------------|-------------------|--------|
| **Scroll depth google/cpc** | 19% | >30% | >40% (acercarse a orgánico) | Clarity |
| **Active time google/cpc** | <25s | >35s | >50s | Clarity |
| **CTR → formulario** | No medido | Medir baseline → +20% | +40% | GA4 events |
| **Formularios enviados/sem** | No medido | Medir baseline | 2× baseline | GHL |
| **Discovery Calls agendados** | Actual | +30% | +50% | GHL |
| **Tasa de cierre (call → cliente)** | Actual | Mantener o mejorar | Mantener | GHL pipeline |

---

## 7.2 Métricas secundarias (engagement)

| Métrica | Línea base | Target | Fuente |
|---------|-----------|--------|--------|
| **Tiempo en página** | Actual | +25% | GA4 |
| **Tasa de rebote** | Actual | -15% | GA4 |
| **Clicks en portfolio links** | 0 (no existían) | >5% de sesiones | GA4 events |
| **Scroll hasta founder section** | N/A | >25% de sesiones | Clarity heatmaps |
| **Scroll hasta comparison table** | N/A | >20% de sesiones | Clarity heatmaps |
| **Dead clicks** | <5% | Mantener <5% | Clarity |
| **Rage clicks** | 0% | Mantener 0% | Clarity |

---

## 7.3 Métricas cualitativas

| Señal | Cómo medir |
|-------|-----------|
| **Leads mencionan la founder section** | Preguntar en Discovery Call: "¿Leíste la sección de quién está detrás?" |
| **Leads mencionan el precio ancla** | "¿Viste que normalmente cuesta $15,000+?" → ¿lo mencionaron ellos? |
| **Objeción de precio disminuye** | Menos "¿por qué tan barato?" en WhatsApp — debería estar resuelto en la landing |
| **Leads más calificados** | Menos "solo quería saber el precio" y más "quiero el plan Pro" |
| **Feedback directo** | Preguntar a clientes nuevos: "¿Qué te convenció de la página?" |

---

## 7.4 Plan de medición

### Semana 1 post-deploy (F1):
- [ ] Clarity: scroll depth google/cpc diario
- [ ] GA4: eventos de formulario
- [ ] GHL: nuevos leads (baseline)

### Semana 2 post-deploy (F1+F2):
- [ ] Comparar scroll depth vs baseline
- [ ] Verificar que founder + why-this-price + comparison reciben tráfico
- [ ] Revisar heatmaps de nuevas secciones

### Semana 4 post-deploy (todo completo):
- [ ] Reporte completo: métricas primarias vs baseline
- [ ] Ajustar copy si alguna sección tiene bajo engagement
- [ ] A/B test de CTA si es necesario

---

## 7.5 Qué hacer si las métricas no mejoran

| Escenario | Diagnóstico probable | Acción |
|-----------|---------------------|--------|
| Scroll depth no mejora | El contenido nuevo no engancha | Revisar heatmaps — ¿dónde se van? |
| Formularios no aumentan | El funnel sigue teniendo fricción | Simplificar quote form o probar CTA directo a WA |
| Leads menos calificados | La landing atrae curiosos, no compradores | Reforzar "no incluye" y precio ancla más arriba |
| Tasa de cierre baja | Founder section genera expectativas incorrectas | Ajustar tono — más realista, menos "vendedor" |

---

## 7.6 Notas para el agente que implementa

1. **Instrumentar antes de deploy**: Asegurar que GA4 events están configurados para medir las métricas nuevas (scroll depth por sección, clicks en portfolio).
2. **No optimizar antes de medir**: Dejar F1 corriendo al menos 1 semana antes de juzgar.
3. **Una variable a la vez**: Si se cambia copy Y diseño Y orden al mismo tiempo, no se sabrá qué funcionó.
4. **El éxito no es solo métricas**: Si Alejandro siente que la página "habla como él", ya es win. Las métricas son validación secundaria.
