/**
 * Express landing — volatile values isolated for one-line editing.
 *
 * ⚠️ Sprint 0 / open decisions (see cwmx-propuesta-express/v3-00-overview.md
 * §"Decisiones que bloquean"). Do NOT treat these as final until Alejandro
 * confirms. They are surfaced here so copy isn't scattered across components.
 */

export const express = {
  price: "$3,900",
  priceAnchor: "$8,000+", // precio de referencia tachado
  savings: "ahorrás $4,100 (51%)",
  deliveryDays: 7,

  whatsapp: "528313359341", // wa.me/528313359341 — known, from CLAUDE.md
  get whatsappUrl() {
    return `https://wa.me/${this.whatsapp}`;
  },

  // TODO(Sprint 0): Stripe Payment Link. Until set, CTAs point to WhatsApp
  // fallback so no dead button ships. Replace with the real cs_ checkout URL.
  stripePaymentLink: "" as string,

  // TODO(Sprint 0 / open decision #4): capacidad real mensual. Counter copy.
  cupos: {
    total: 5,
    reserved: 2,
    period: "esta semana",
  },

  // TODO(open decision #5): ¿garantía monetaria explícita? Toggle off if not offered.
  guarantee100: true,
} as const;

/** Resolve the primary CTA target: Stripe if configured, else WhatsApp fallback. */
export function checkoutHref(): string {
  return express.stripePaymentLink || express.whatsappUrl;
}

/** True when the real Stripe link is wired (drives a "pago seguro" affordance vs fallback). */
export const stripeReady = express.stripePaymentLink.length > 0;

/**
 * Testimonials. ⚠️ EMPTY ON PURPOSE — do not invent quotes (CLAUDE.md
 * guardrail). Drop real ones here in Sprint 0; the section renders honest
 * "pendiente" placeholders until then.
 */
export type Testimonial = { quote: string; name: string; business: string };
export const testimonials: Testimonial[] = [];

/** 10 demo industries (S04). Real .webp + live URLs land in Sprint 0. */
export const demoIndustries = [
  "Restaurante",
  "Inmobiliaria",
  "Clínica",
  "Tienda local",
  "Spa",
  "Hotel",
  "Constructora",
  "Despacho profesional",
  "Coach / consultor",
  "Negocio local",
] as const;
