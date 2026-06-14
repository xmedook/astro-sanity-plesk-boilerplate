# 06 — Especificaciones por Archivo

> **Propósito:** Source of truth para implementación. Cada cambio está mapeado a un archivo específico con old_string/new_string.
> **Repo:** `/var/www/vhosts/nexosrv.one/cheapweb-web`

---

## 06.1 `lib/i18n/translations.ts`

### Cambio 1: Hero subtitle — Añadir price anchor

**Key:** `hero.subtitleLine1` (ES + EN)

```diff
- "Desde $8,000 MXN. Diseño profesional + WordPress + dominio incluido. Sin sorpresas."
+ "Normalmente $15,000+. Hoy desde $8,000 MXN. Diseño profesional + WordPress + dominio + hosting 1 año incluido."

- "From $8,000 MXN. Professional design + WordPress + domain included. No surprises."
+ "Normally $700+ USD. Today from $400 USD. Professional design + WordPress + domain + 1yr hosting included."
```

### Cambio 2: Hero badge — Slots dinámicos

**Nueva key:** `hero.badge` (ES + EN)

```typescript
// ES
hero: {
  badge: "3 de 4 espacios disponibles este mes",
  // ...
}

// EN
hero: {
  badge: "3 of 4 spots available this month",
  // ...
}
```

### Cambio 3: FinalCTA — Garantía explícita

**Key:** `finalCta.subtitle` (ES + EN)

```diff
- "Apruebas el diseño al 100% antes de que arranque el desarrollo."
+ "Apruebas el diseño al 100% antes de desarrollar. Si no entregamos en el plazo prometido, el siguiente año de renovación va gratis."

- "You approve the design 100% before development starts."
+ "You approve the design 100% before we build. If we miss the deadline, your next renewal year is free."
```

### Cambio 4: Pricing — Nuevas keys para Included/Not Included

```typescript
pricing: {
  smart: {
    name: "Smart",
    price: "8,000",
    // ... existing fields
    included: [
      "1 landing page profesional",
      "Diseño mobile-first personalizado",
      "Dominio .com/.mx 1 año",
      "Hosting 1 año",
      "3 correos corporativos",
      "SSL gratuito",
      "1 ronda de revisiones",
      "Entrega en 12-14 días",
    ],
    notIncluded: [
      "Más de 1 página/sección",
      "Blog, tienda, chat",
      "SEO avanzado",
      "Pixel de Meta o Google Tag",
      "Administración post-entrega*",
    ],
    notIncludedFootnote: "*El mantenimiento mensual es opcional ($799/mes)",
  },
  pro: {
    // ... same structure
    included: [
      "3 páginas/secciones",
      "Todo lo del plan Smart",
      "Blog integrado",
      "Chat (WhatsApp flotante)",
      "SEO on-page",
      "Google Analytics + Search Console",
      "10 correos corporativos",
      "1 ronda de revisiones",
      "Entrega en 16-18 días",
    ],
    notIncluded: [
      "Tienda en línea / WooCommerce",
      "Más de 3 páginas",
      "Pixel de Meta o Google Tag",
      "Campañas de ads",
      "SEO mensual o link building",
    ],
  },
  proStore: {
    // ... same structure
    included: [
      "Todo lo del plan Pro",
      "WooCommerce configurado",
      "Hasta 50 productos cargados",
      "Pasarela de pago",
      "Gestión de envíos",
      "Capacitación (1 hora)",
      "Entrega en 20-28 días",
    ],
    notIncluded: [
      "Más de 50 productos",
      "Fotografía de productos",
      "Manejo de inventario post-entrega",
      "Campañas de ads para tienda",
      "SEO avanzado para e-commerce",
      "Integraciones con ERP",
    ],
  },
}
```

### Cambio 5: FAQ — Rewrite completo

Reemplazar el array `faq.items` completo. Ver `04-cambios-propuestos.md` sección 4.6 para el texto exacto de las 10 preguntas.

### Cambio 6: Founder section — Nuevas keys

```typescript
founder: {
  badge: "Quién está detrás",
  title: "Trabajas directo con quien construye tu sitio.",
  body: "Soy Alejandro. cheapweb.mx nació porque vi demasiados negocios mexicanos pagando $20,000+ por sitios web genéricos que no convertían — o peor, sin sitio porque 'es muy caro' o 'tarda meses'.\n\nArranqué cheapweb con una regla: precio justo, entrega rápida, cero sorpresas. Sin vendedores, sin 'ejecutivos de cuenta', sin letra chica.\n\nCuando reservas tu proyecto, hablas conmigo. Yo reviso tu brief, yo dirijo el diseño, yo me aseguro de que entreguemos a tiempo. Si algo sale mal, respondo yo. No hay a quién escalarte — el responsable soy yo.",
  metrics: {
    sites: "120+ sitios entregados",
    years: "3+ años en el mercado",
    rating: "4.9★ calificación de clientes",
    delivery: "Entrega promedio: 13 días",
  },
  cta: "¿Hablamos?",
},
```

### Cambio 7: Why This Price — Nuevas keys

```typescript
whyThisPrice: {
  badge: "Transparencia",
  title: "\"¿Por qué tan barato? ¿Es confiable?\"",
  shortAnswer: "Pregunta justa. Respuesta corta: no es barato, es precio justo. Respuesta larga, tres razones:",
  reasons: [
    {
      number: "01",
      title: "Sin oficinas, sin vendedores, sin intermediarios",
      body: "No pagas renta de oficina en Polanco, no pagas comisiones de vendedores, no pagas 'ejecutivos de cuenta' que solo reenvían correos. Pagas directamente al equipo que construye tu sitio.",
    },
    {
      number: "02",
      title: "Solo 4 proyectos al mes",
      body: "No aceptamos 20 sitios simultáneos. 4 al mes, máximo. Esto nos permite mantener calidad sin inflar el equipo — y sin inflar el precio.",
    },
    {
      number: "03",
      title: "Entrada al ecosistema, no producto final",
      body: "Si tu sitio queda increíble y necesitas SEO avanzado, ads, automatizaciones o crecimiento, tenemos nexodigital para eso. Primero entregamos rápido. La relación larga viene después, solo si tiene sentido para ti.",
    },
  ],
  footer: "Un sitio web comparable en agencia tradicional: $15,000–$35,000 MXN. Mismo resultado, mismo WordPress, misma calidad — sin el sobreprecio.",
},
```

### Cambio 8: Tabla comparativa — Nuevas keys

```typescript
comparison: {
  badge: "Sin trucos de marketing",
  title: "Compáralo tú mismo.",
  headers: ["", "cheapweb.mx", "Freelancer típico", "Agencia tradicional", "Wix / Háztelo tú"],
  rows: [
    { label: "Entrega", values: ["12-28 días", "2-8 semanas", "1-4 meses", "Indefinido"] },
    { label: "Diseño personalizado", values: ["✅ Sí", "A veces", "✅ Sí", "❌ Template"] },
    { label: "Dominio + hosting", values: ["✅ Incluido 1a", "Negociable", "Factura aparte", "Factura aparte"] },
    { label: "Optimizado mobile", values: ["✅ Sí", "A veces", "✅ Sí", "Básico"] },
    { label: "SEO configurado", values: ["✅ Sí", "Casi nunca", "✅ Sí", "Tú lo haces"] },
    { label: "WhatsApp + CTA", values: ["✅ Sí", "Si lo pides", "✅ Sí", "Tú lo configuras"] },
    { label: "Soporte post-entrega", values: ["✅ Opcional", "Si hay suerte", "✅ Caro", "No existe"] },
    { label: "Inversión total", values: ["$8K-$24K MXN", "$3K-$15K MXN", "$25K-$80K MXN", "$0 + 40-100h tuyas"] },
  ],
  cta: "La diferencia es clara. ¿Hablamos?",
},
```

---

## 06.2 `components/home/hero.tsx`

### Cambio: Badge dinámico + price anchor

1. El badge actual hardcodeado `"Solo 1 proyecto más este mes — entra hoy →"` debe usar `t.hero.badge`
2. El subtitle debe usar `t.hero.subtitleLine1` (que ya se actualizó en translations)
3. Añadir el texto tachado del precio normal:

```tsx
// Añadir antes del subtitle actual:
<p className="text-white/50 line-through text-sm mb-1">
  Normalmente $15,000+ MXN
</p>
```

**Nota:** El precio tachado puede ser un elemento visual aparte, no necesariamente en translations (es constante).

---

## 06.3 `components/home/pricing.tsx`

### Cambio: Estructura de tarjetas con Included/Not Included

Refactorizar cada tarjeta para que renderice dos listas:

```tsx
// Estructura de cada plan card:
<div className="pricing-card">
  <h3>{plan.name} — ${plan.price} MXN</h3>
  <p className="subtitle">{plan.subtitle}</p>
  
  <div className="included-section">
    <h4>✓ INCLUYE:</h4>
    <ul>
      {plan.included.map(item => <li key={item}>{item}</li>)}
    </ul>
  </div>
  
  <div className="not-included-section">
    <h4>✗ NO INCLUYE:</h4>
    <ul>
      {plan.notIncluded.map(item => <li key={item}>{item}</li>)}
    </ul>
    {plan.notIncludedFootnote && <p className="footnote">{plan.notIncludedFootnote}</p>}
  </div>
  
  <CTAButton>{plan.cta}</CTAButton>
</div>
```

---

## 06.4 `app/page.tsx`

### Cambio: Añadir nuevas secciones al orden

```tsx
// Orden actual:
<Hero />
<SocialProofStrip />
<Services />
<InlineContactForm />
<Pricing />
<Process />
<Portfolio />
<Marquee />
<Testimonials />
<BlogPreview />
<FAQ />
<FinalCTA />

// Nuevo orden 2.0:
<Hero />
<SocialProofStrip />
<Services />
<InlineContactForm />
<Pricing />
<WhyThisPrice />        // ← NUEVO
<ComparisonTable />      // ← NUEVO
<Process />
<Portfolio />
<Marquee />
<Testimonials />
<Founder />              // ← NUEVO
<BlogPreview />
<FAQ />
<FinalCTA />
```

### Implementación:

```tsx
// Añadir imports:
import WhyThisPrice from "@/components/home/why-this-price";
import ComparisonTable from "@/components/home/comparison-table";
import Founder from "@/components/home/founder";

// Insertar en el JSX en las posiciones indicadas arriba
```

---

## 06.5 `components/home/exit-intent.tsx`

### Cambio: Añadir price anchor al copy

```diff
- "Solo 4 proyectos al mes y se llenan rápido. Danos 2 minutos y te decimos exactamente cuánto cuesta el tuyo."
+ "Normalmente $15,000+ en una agencia. Aquí desde $8,000. Solo 4 proyectos al mes. Danos 2 minutos y te decimos cuál plan es para ti."
```

---

## 06.6 `components/layout/header.tsx`

### Cambio: Badge de slots en header

Añadir un badge antes del botón "Reservar lugar":

```tsx
// En el header, antes del CTA button:
<span className="hidden md:inline-flex items-center gap-2 
  border border-[var(--purple)] rounded-full px-3 py-1.5 mr-3
  bg-[rgba(130,36,227,0.12)]">
  <span className="w-1.5 h-1.5 bg-[var(--purple)] rounded-full"></span>
  <span className="text-xs font-semibold text-[var(--ink)]">
    3 de 4 espacios
  </span>
</span>
```

---

## 06.7 `components/home/portfolio.tsx`

### Cambio: Cards como links externos

```diff
- <div className="portfolio-card">
+ <a href={item.url} target="_blank" rel="noopener noreferrer" className="portfolio-card">
    <Image src={item.image} alt={item.name} />
    <h3>{item.name}</h3>
- </div>
+ </a>
```

Añadir `url` al tipo de datos del portfolio si no existe.

---

## 06.8 NUEVO: `components/home/founder.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getTranslations } from "@/lib/i18n/translations";
import Image from "next/image";

export default function Founder() {
  const { lang } = useLanguage();
  const t = getTranslations(lang).founder;

  return (
    <section className="bg-[var(--bg)] section-padding">
      <div className="max-w-container">
        <p className="badge">{t.badge}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl 
          text-[var(--ink)] mb-8">{t.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            {t.body.split('\n\n').map((p: string, i: number) => (
              <p key={i} className="text-[var(--muted)] text-lg leading-relaxed">{p}</p>
            ))}
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="metric">{t.metrics.sites}</div>
              <div className="metric">{t.metrics.years}</div>
              <div className="metric">{t.metrics.rating}</div>
              <div className="metric">{t.metrics.delivery}</div>
            </div>
          </div>
          
          <div className="relative">
            <Image 
              src="/alejandro.jpg" 
              alt="Alejandro — Fundador de cheapweb.mx"
              width={400} height={400}
              className="rounded-2xl"
            />
          </div>
        </div>
        
        <a href={WA_URL} className="cta-button mt-8">{t.cta}</a>
      </div>
    </section>
  );
}
```

**Nota:** La foto `/public/alejandro.jpg` debe existir en el repo o ser añadida.

---

## 06.9 NUEVO: `components/home/why-this-price.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getTranslations } from "@/lib/i18n/translations";

export default function WhyThisPrice() {
  const { lang } = useLanguage();
  const t = getTranslations(lang).whyThisPrice;

  return (
    <section className="bg-[var(--bg)] section-padding">
      <div className="max-w-container">
        <p className="badge">{t.badge}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl 
          text-[var(--ink)] mb-4">{t.title}</h2>
        <p className="text-[var(--muted)] text-lg mb-10">{t.shortAnswer}</p>
        
        <div className="space-y-6">
          {t.reasons.map((reason: any, i: number) => (
            <div key={i} className="reason-card">
              <span className="reason-number">{reason.number}</span>
              <div>
                <h3 className="font-bold text-xl text-[var(--ink)]">
                  {reason.title}
                </h3>
                <p className="text-[var(--muted)]">{reason.body}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-[var(--muted)]/60 mt-8">{t.footer}</p>
      </div>
    </section>
  );
}
```

---

## 06.10 NUEVO: `components/home/comparison-table.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getTranslations } from "@/lib/i18n/translations";

export default function ComparisonTable() {
  const { lang } = useLanguage();
  const t = getTranslations(lang).comparison;

  return (
    <section className="bg-[var(--bg)] section-padding">
      <div className="max-w-container">
        <p className="badge">{t.badge}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl 
          text-[var(--ink)] mb-8">{t.title}</h2>
        
        <div className="overflow-x-auto">
          <table className="comparison-table">
            <thead>
              <tr>
                {t.headers.map((h: string, i: number) => (
                  <th key={i} className={i === 1 ? "highlight" : ""}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="label">{row.label}</td>
                  {row.values.map((v: string, j: number) => (
                    <td key={j} className={j === 0 ? "highlight" : ""}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <a href={WA_URL} className="cta-button mt-8">{t.cta}</a>
      </div>
    </section>
  );
}
```

---

## 06.11 `public/llms.txt`

Actualizar después de todos los cambios para reflejar:
- Nuevas secciones (Founder, Why This Price, Comparison Table)
- Nuevo enfoque: founder-led, price anchoring, transparencia radical
- Pricing con Included/Not Included

---

## 06.12 `public/alejandro.jpg`

Añadir foto de Alejandro al repo. Formato: JPG, ~400x400px, optimizada WebP como fallback.
Ubicación: `/var/www/vhosts/nexosrv.one/cheapweb-web/public/alejandro.jpg`
