# 01 — Estado Actual de cheapweb.mx

> **Fecha del diagnóstico:** 2026-05-28
> **Propósito:** Línea base para medir el impacto del rediseño 2.0

---

## 1.1 Voz comercial actual

### Tono general
- **Agencia** (primera persona plural: "creamos", "entregamos")
- **Correcto pero sin personalidad** — no hay una voz humana detrás
- **Bilingüe ES/EN** con toggle en header
- **Sin founder story** — no se sabe quién está detrás

### Lo que funciona
- Precios visibles desde el hero ("Desde $8,000 MXN")
- Sin "cotización gratis" — reemplazado por "Quiero que me contacten"
- CTAs en primera persona ("Quiero mi sitio", "Es para mí")
- Escasez real ("Solo 4 proyectos al mes")
- Hero potente visualmente (aurora background, gradientes morados)

### Lo que falta
- No hay anclaje de precio ("normalmente $X, hoy $Y")
- No hay sección "quién está detrás"
- No hay comparación competitiva explícita
- No hay columna de "no incluye" en planes
- El portfolio son screenshots estáticos, no demos clickeables
- La urgencia es texto estático, no temporizador
- FAQ usa tono corporativo suave, no directo

---

## 1.2 Estructura actual de la landing

```
1. Hero
   - Badge: "Solo 1 proyecto más este mes"
   - H1: "Tu negocio en internet. En 14 días."
   - Sub: "Desde $8,000 MXN. Diseño profesional + WordPress + dominio incluido."
   - CTA1: "Quiero mi sitio" → WhatsApp
   - CTA2: "Contáctenme" → Quote form modal
   - Trust bullets: Dominio incluido, SSL gratis, WordPress editable, Sin mensualidades
   - Stats cards: 120+ sitios, 3+ años, 4.9★, 12 días

2. SocialProofStrip — marquee de clientes

3. Servicios — ¿Qué incluye tu sitio?

4. InlineContactForm — "Presupuesto" / "¿Cuánto cuesta tu sitio web?"

5. Precios — 3 tarjetas (Smart $8K / Pro $16K / Pro+Tienda $24K)

6. Proceso — 5 pasos

7. Portfolio — screenshots

8. Marquee — banner morado valores

9. Testimonios

10. Blog Preview — 3 artículos

11. FAQ — acordeón

12. FinalCTA — "¿Listo para tener tu sitio web?"
```

---

## 1.3 CTAs actuales

| Ubicación | Copy (ES) | Acción |
|-----------|-----------|--------|
| Header | "Reservar lugar" | WhatsApp |
| Hero primary | "Quiero mi sitio" | WhatsApp |
| Hero secondary | "Contáctenme" | Quote form |
| Pricing Smart | "Lo quiero" | WhatsApp |
| Pricing Pro | "Es para mí" | WhatsApp |
| Pricing Pro+Tienda | "Quiero vender en línea" | WhatsApp |
| Inline form | "Quiero que me contacten" | POST /api/lead |
| Quote modal | "Enviar solicitud" | POST /api/lead |
| Exit intent | "No quiero esperar" | WhatsApp |
| Final primary | "Apartar mi lugar" | WhatsApp |
| Final secondary | "¿No sabes cuál? Hablemos" | WhatsApp call |
| Chat widget | "¡Quiero mi sitio!" | n8n chatbot |

---

## 1.4 Pricing actual

| Plan | Precio | Lo que dice ahora |
|------|--------|-------------------|
| Smart | $8,000 | "1 landing page profesional · Dominio + hosting 1 año · 3 correos · SSL · Entrega 12-14 días" |
| Pro | $16,000 | "3 páginas · SEO on-page · Analytics · Blog · Chat · 10 correos · 16-18 días" |
| Pro+Tienda | $24,000 | "WooCommerce · 50 productos · Capacitación · 20-28 días" |

**Problema:** No hay ancla de precio. El lead no sabe si $8,000 es caro o barato. No hay referencia.

---

## 1.5 FAQ actual

Preguntas actuales (respuestas de 2-4 frases, tono correcto pero genérico):
- ¿Cuánto tiempo tarda mi sitio?
- ¿Qué dominio incluye?
- ¿Puedo modificar mi sitio después?
- ¿Qué pasa si no me gusta el diseño?
- ¿Ofrecen mantenimiento después?
- ¿Qué garantías tienen?

**Problema:** Falta la pregunta más importante: "¿Por qué tan barato? ¿Es confiable?"

---

## 1.6 Datos de audiencia (Clarity)

- Scroll depth google/cpc: 19% (vs 43% orgánico)
- Active time google/cpc: <25s
- Dead clicks: <5%
- Rage clicks: 0%

**Interpretación:** El tráfico pagado rebota rápido. La landing necesita enganchar más arriba — precio anclado, proof inmediata, founder story.

---

## 1.7 Tráfico y conversión (Google Ads)

- 21 keywords activas, $300 MXN/día
- CTR >5% ✓
- Conversiones: intermitentes
- Principal fuga: keywords genéricas con intención ambigua

**Interpretación:** El tráfico existe. El problema es la conversión en landing, no la adquisición.
