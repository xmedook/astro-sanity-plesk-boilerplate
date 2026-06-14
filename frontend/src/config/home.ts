/**
 * Home (/) — cheapweb.mx. Volatile values + pricing isolated for one-line edits.
 *
 * ⚠️ Sprint 0 / open decisions (cwmx-propuesta-express/v3-00-overview.md). Prices,
 * cupos, TidyCal URL and founder metrics are NOT final until Alejandro confirms.
 */
import { express } from "./express";

export const home = {
  whatsapp: express.whatsapp,
  get whatsappUrl() {
    return `https://wa.me/${this.whatsapp}`;
  },

  // TODO(Sprint 0): TidyCal booking URL. Until set, "Agenda 15 min" CTAs fall
  // back to WhatsApp so no dead button ships.
  tidyCalUrl: "" as string,

  // TODO(open decision #4): capacidad real mensual.
  cupos: { total: 6, reserved: 4, period: "este mes", nextOpens: "julio" },

  // TODO(open decision #5): garantía / devolución.
  guarantee: true,
} as const;

/** "Agenda 15 min" target: TidyCal if configured, else WhatsApp fallback. */
export function bookingHref(): string {
  return home.tidyCalUrl || home.whatsappUrl;
}
export const bookingReady = home.tidyCalUrl.length > 0;

/**
 * Founder metrics (H11). ⚠️ PLACEHOLDER — confirm real numbers in Sprint 0
 * (CLAUDE.md: don't invent metrics).
 */
export const founderMetrics = [
  { label: "Sitios entregados", value: "120+" },
  { label: "Años en el mercado", value: "3+" },
  { label: "Calificación clientes", value: "4.9★" },
  { label: "Entrega promedio", value: "13 días" },
] as const;

export type Plan = {
  name: string;
  price: string;
  badge: string;
  recommended?: boolean;
  subtitle: string;
  included: string[];
  excluded: string[];
  footnote?: string;
  cta: string;
};

/** H05 pricing — 3 SKUs, Pro recomendado (v3-00 decision #2 option C). */
export const plans: Plan[] = [
  {
    name: "Smart",
    price: "$8,000",
    badge: "Para empezar",
    subtitle: "Para negocios que necesitan presencia ya.",
    included: [
      "1 landing profesional",
      "Diseño mobile-first custom",
      "Dominio .com/.mx 1 año",
      "Hosting 1 año",
      "3 correos corporativos",
      "SSL gratuito",
      "1 ronda de revisiones",
      "Entrega en 12–14 días",
    ],
    excluded: [
      "Más de 1 página/sección",
      "Blog, tienda, chat flotante",
      "SEO avanzado",
      "Pixel Meta o Google Tag",
      "Administración post-entrega*",
    ],
    footnote: "*Mantenimiento opcional desde $799/mes",
    cta: "Lo quiero",
  },
  {
    name: "Pro",
    price: "$16,000",
    badge: "⭐ Recomendado · el 80% elige este",
    recommended: true,
    subtitle: "Para negocios que quieren ser encontrados y convertir.",
    included: [
      "3 páginas/secciones",
      "Todo lo del plan Smart",
      "Blog integrado",
      "WhatsApp flotante",
      "SEO on-page (títulos, meta, H1, estructura)",
      "Google Analytics + Search Console",
      "10 correos corporativos",
      "1 ronda de revisiones",
      "Entrega en 16–18 días",
    ],
    excluded: [
      "Tienda en línea / WooCommerce",
      "Más de 3 páginas",
      "Pixel/Tag avanzado",
      "Campañas de ads",
      "SEO mensual o link building",
    ],
    cta: "Es para mí",
  },
  {
    name: "Pro+Tienda",
    price: "$24,000",
    badge: "Si vendes en línea",
    subtitle: "Para negocios que van a vender en línea.",
    included: [
      "Todo lo del plan Pro",
      "WooCommerce configurado",
      "Hasta 50 productos cargados",
      "Pasarela de pago (Stripe o Mercado Pago)",
      "Gestión de envíos",
      "Capacitación 1 hora",
      "Entrega en 20–28 días",
    ],
    excluded: [
      "Más de 50 productos",
      "Fotografía de productos",
      "Manejo de inventario post-entrega",
      "Campañas de ads para tienda",
      "SEO avanzado e-commerce",
      "Integraciones ERP",
    ],
    cta: "Quiero vender en línea",
  },
];
