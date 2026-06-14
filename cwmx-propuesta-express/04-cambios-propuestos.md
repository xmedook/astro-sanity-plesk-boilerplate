# 04 — Cambios Propuestos (Gobierno Comercial 2.0)

> **Propósito:** Especificar cada cambio concreto, sección por sección, con copy nuevo

---

## 4.1 NUEVO: Sección Founder ("Quién está detrás")

**Ubicación:** Después de Testimonios, antes de FAQ
**Componente nuevo:** `components/home/founder.tsx`

### Copy propuesto (ES):

```text
[BADGE] Quién está detrás

[H2] Trabajas directo con quien construye tu sitio.

[Foto de Alejandro]

Soy Alejandro. cheapweb.mx nació porque vi demasiados negocios mexicanos pagando 
$20,000+ por sitios web genéricos que no convertían — o peor, sin sitio porque 
"es muy caro" o "tarda meses".

Arranqué cheapweb con una regla: precio justo, entrega rápida, cero sorpresas. 
Sin vendedores, sin "ejecutivos de cuenta", sin letra chica.

Cuando reservas tu proyecto, hablas conmigo. Yo reviso tu brief, yo dirijo el 
diseño, yo me aseguro de que entreguemos a tiempo. Si algo sale mal, respondo yo. 
No hay a quién escalarte — el responsable soy yo.

[MÉTRICAS]
• 120+ sitios entregados
• 3+ años en el mercado
• 4.9★ calificación de clientes
• Entrega promedio: 13 días

[CTA] ¿Hablamos? → WhatsApp
```

### Notas de implementación:
- Foto real de Alejandro (no stock, no avatar)
- Las métricas deben ser verificables (ya están en el hero como stats cards)
- Tono: primera persona, directo, sin humildad falsa pero sin arrogancia

---

## 4.2 MODIFICADO: Hero — Añadir price anchor

### Cambio en H1/subtitle:

**ANTES:**
> "Desde $8,000 MXN. Diseño profesional + WordPress + dominio incluido."

**NUEVO:**
> "Normalmente $15,000+. Hoy desde $8,000 MXN. Diseño profesional + WordPress + dominio + hosting 1 año incluido. Sin sorpresas, sin letra chica."

### Cambio en badge:
**ANTES:** "Solo 1 proyecto más este mes — entra hoy →"
**NUEVO:** "3 de 4 espacios disponibles este mes"

### Notas:
- El número "3 de 4" debe ser actualizable (idealmente dinámico, mínimo manual)
- "Normalmente $15,000+" es un ancla verosímil — el mercado MX cobra eso por sitios equivalentes
- "Hoy" añade urgencia sin mentir

---

## 4.3 MODIFICADO: Pricing Cards — Añadir "No incluye"

### Plan Smart 2.0:

```
━━━━━━━━━━━━━━━━━━━━━
SMART — $8,000 MXN
Para negocios que necesitan presencia ya
━━━━━━━━━━━━━━━━━━━━━

✓ INCLUYE:
  • 1 landing page profesional
  • Diseño mobile-first personalizado
  • Dominio .com/.mx 1 año
  • Hosting 1 año
  • 3 correos corporativos
  • SSL gratuito
  • 1 ronda de revisiones
  • Entrega en 12-14 días

✗ NO INCLUYE:
  • Más de 1 página/sección
  • Blog, tienda, chat
  • SEO avanzado
  • Pixel de Meta o Google Tag
  • Administración post-entrega*

*El mantenimiento mensual es opcional ($799/mes)

[CTA] Lo quiero → WhatsApp
```

### Plan Pro 2.0:

```
━━━━━━━━━━━━━━━━━━━━━
PRO — $16,000 MXN
Para negocios que quieren ser encontrados
━━━━━━━━━━━━━━━━━━━━━

✓ INCLUYE:
  • 3 páginas/secciones
  • Todo lo del plan Smart
  • Blog integrado
  • Chat (WhatsApp flotante)
  • SEO on-page (títulos, meta, H1, estructura)
  • Google Analytics + Search Console
  • 10 correos corporativos
  • 1 ronda de revisiones
  • Entrega en 16-18 días

✗ NO INCLUYE:
  • Tienda en línea / WooCommerce
  • Más de 3 páginas
  • Pixel de Meta o Google Tag
  • Campañas de ads
  • SEO mensual o link building

[CTA] Es para mí → WhatsApp
```

### Plan Pro+Tienda 2.0:

```
━━━━━━━━━━━━━━━━━━━━━
PRO + TIENDA — $24,000 MXN
Para negocios que van a vender en línea
━━━━━━━━━━━━━━━━━━━━━

✓ INCLUYE:
  • Todo lo del plan Pro
  • WooCommerce configurado
  • Hasta 50 productos cargados
  • Pasarela de pago (Stripe/MercadoPago)
  • Gestión de envíos
  • Capacitación (1 hora)
  • Entrega en 20-28 días

✗ NO INCLUYE:
  • Más de 50 productos
  • Fotografía de productos
  • Manejo de inventario post-entrega
  • Campañas de ads para tienda
  • SEO avanzado para e-commerce
  • Integraciones con ERP

[CTA] Quiero vender en línea → WhatsApp
```

---

## 4.4 NUEVO: Sección "Why this price"

**Ubicación:** Entre Pricing y Proceso
**Componente nuevo:** `components/home/why-this-price.tsx`

### Copy propuesto:

```text
[BADGE] Transparencia

[H2] "¿Por qué tan barato? ¿Es confiable?"

Pregunta justa. Respuesta corta: no es barato, es precio justo. 
Respuesta larga, tres razones:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
01 — Sin oficinas, sin vendedores, sin intermediarios
No pagas renta de oficina en Polanco, no pagas comisiones de vendedores, 
no pagas "ejecutivos de cuenta" que solo reenvían correos. 
Pagas directamente al equipo que construye tu sitio.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
02 — Solo 4 proyectos al mes
No aceptamos 20 sitios simultáneos. 4 al mes, máximo. 
Esto nos permite mantener calidad sin inflar el equipo — 
y sin inflar el precio.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
03 — Entrada al ecosistema, no producto final
Si tu sitio queda increíble y necesitas SEO avanzado, ads, 
automatizaciones o crecimiento, tenemos nexodigital para eso. 
Primero entregamos rápido. La relación larga viene después, 
solo si tiene sentido para ti.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Un sitio web comparable en agencia tradicional: $15,000–$35,000 MXN.
Mismo resultado, mismo WordPress, misma calidad — sin el sobreprecio.
```

---

## 4.5 NUEVO: Sección comparativa

**Ubicación:** Después de "Why this price", antes de Proceso
**Componente nuevo:** `components/home/comparison-table.tsx`

### Copy propuesto:

```text
[BADGE] Sin trucos de marketing

[H2] Compáralo tú mismo.

|                    | cheapweb.mx    | Freelancer típico | Agencia tradicional | Wix / Háztelo tú |
|--------------------|---------------|-------------------|--------------------|--------------------|
| Entrega            | 12-28 días    | 2-8 semanas       | 1-4 meses          | Indefinido         |
| Diseño personalizado| ✅ Sí         | A veces           | ✅ Sí              | ❌ Template        |
| Dominio + hosting  | ✅ Incluido 1a| Negociable        | Factura aparte     | Factura aparte     |
| Optimizado mobile  | ✅ Sí         | A veces           | ✅ Sí              | Básico             |
| SEO configurado    | ✅ Sí         | Casi nunca        | ✅ Sí              | Tú lo haces        |
| WhatsApp + CTA     | ✅ Sí         | Si lo pides       | ✅ Sí              | Tú lo configuras   |
| Soporte post-entrega| ✅ Opcional   | Si hay suerte     | ✅ Caro            | No existe          |
| Inversión total    | $8K-$24K MXN  | $3K-$15K MXN      | $25K-$80K MXN      | $0 + 40-100h tuyas |

[CTA] La diferencia es clara. ¿Hablamos? → WhatsApp
```

---

## 4.6 MODIFICADO: FAQ — Rewrite completo

```text
[H2] Preguntas frecuentes. Respuestas directas.

Q: ¿Por qué tan barato comparado con una agencia?
A: Sin oficinas, sin vendedores, sin intermediarios. 4 proyectos al mes máximo. 
   Pagas directamente al equipo. Misma calidad, sin el sobreprecio.

Q: ¿Es confiable? ¿No es scam?
A: 120+ sitios entregados, 3+ años operando, 4.9★ de calificación. 
   Si no entregamos a tiempo, el siguiente año de hosting va gratis.

Q: ¿Qué pasa si no me gusta el diseño?
A: Lo apruebas al 100% antes de desarrollar. Si no te gusta, iteramos. 
   Si aún así no, reembolso completo del anticipo. Sin preguntas.

Q: ¿Cuánto tiempo tarda?
A: Smart: 12-14 días. Pro: 16-18 días. Pro+Tienda: 20-28 días.
   El reloj arranca cuando recibimos tu brief y materiales.

Q: ¿Puedo modificar el sitio yo mismo después?
A: Sí. Usamos WordPress. Te capacitamos para que edites textos, 
   imágenes y productos sin depender de nosotros.

Q: ¿Qué incluye el hosting?
A: Hosting 1 año. Dominio .com/.mx 1 año. SSL gratis. Correos corporativos.
   La renovación anual posterior es por tu cuenta — te decimos cuánto y cómo.

Q: ¿Ofrecen mantenimiento?
A: Sí, desde $799/mes. Incluye backups, actualizaciones, soporte y 
   hasta 2 cambios de contenido al mes. Totalmente opcional.

Q: ¿Hacen tiendas en línea más grandes?
A: Pro+Tienda cubre hasta 50 productos. Para catálogos más grandes 
   o integraciones avanzadas, derivamos a nexodigital.

Q: ¿Quién hace realmente el sitio?
A: Alejandro (fundador) dirige el diseño y revisa cada entrega.
   El desarrollo lo hace el equipo cheapweb. Sin "juniors" escondidos.

Q: ¿Qué necesito para empezar?
A: Tu logo (si tienes), textos que quieras incluir, fotos de tu negocio,
   y acceso a tu dominio actual si ya tienes uno. Si no tienes nada,
   nosotros armamos todo desde cero.
```

---

## 4.7 MODIFICADO: FinalCTA — Añadir garantía explícita

**ANTES:**
> "¿Listo para tener tu sitio web?"
> "Apruebas el diseño al 100% antes de que arranque el desarrollo."

**NUEVO:**
> "¿Listo para tener tu sitio web?"
> "Apruebas el diseño al 100% antes de desarrollar. Si no entregamos 
> en el plazo prometido, el siguiente año de renovación va gratis."

---

## 4.8 MODIFICADO: Header badge de urgencia

**ANTES:** "Reservar lugar" (botón)
**NUEVO:** Badge + botón:
```
[🟣 3 de 4 espacios este mes] [Reservar lugar →]
```

---

## 4.9 MODIFICADO: Portfolio — De screenshots a links vivos

Cada card del portfolio debe ser un `<a>` con `target="_blank"` que abra el sitio real del cliente. Si el sitio ya no existe, mantener screenshot pero con badge "Entregado 2025".

---

## 4.10 MODIFICADO: Exit Intent — Añadir precio ancla

**ANTES:**
> "Solo 4 proyectos al mes y se llenan rápido. Danos 2 minutos y te decimos exactamente cuánto cuesta el tuyo."

**NUEVO:**
> "Normalmente $15,000+ en una agencia. Aquí desde $8,000. 
> Solo 4 proyectos al mes. Danos 2 minutos y te decimos cuál plan es para ti."
