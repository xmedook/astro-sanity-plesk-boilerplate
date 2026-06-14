#!/usr/bin/env node
/**
 * Demo factory generator.
 *
 *   node scripts/gen-demo.mjs --niche "Restaurante" [--location "CDMX"] [--publish] [--dry]
 *
 * Pipeline: niche -> `claude -p` (structured copy + SEO) -> Sanity demo + niche docs.
 * Copy lands in seconds; it appears live on the next static rebuild (see webhook).
 *
 * Uses the local `claude` CLI (already authenticated) — no ANTHROPIC_API_KEY needed.
 *
 * Env (.env at repo root):
 *   SANITY_PROJECT_ID   — default xgccta5n
 *   SANITY_DATASET      — default production
 *   SANITY_WRITE_TOKEN  — Sanity token with write access
 */
import "dotenv/config";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createClient } from "@sanity/client";

const execFileAsync = promisify(execFile);

// ── args ─────────────────────────────────────────────────────────────────────
function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = process.argv[i + 1];
  return next && !next.startsWith("--") ? next : true;
}
const niche = arg("niche");
const location = arg("location", "");
const publish = Boolean(arg("publish", false));
const dry = Boolean(arg("dry", false));

if (!niche) {
  console.error('Falta --niche. Ej: node scripts/gen-demo.mjs --niche "Restaurante" --location "CDMX"');
  process.exit(1);
}

function slugify(s) {
  return s
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

// ── claude -p structured output ──────────────────────────────────────────────
// JSON shape Claude must return. Kept as a literal so the prompt is explicit.
const SHAPE = `{
  "title": "string — nombre de marca ficticio creíble del negocio demo",
  "nicheLabel": "string — MAYÚSCULAS con separador '·'${location ? `, incluye '${location}'` : ""}, ej. 'RESTAURANTE · ${location || "MÉXICO"}'",
  "description": "string — párrafo de la card, 1-2 frases, español MX",
  "tags": ["string", "...3-5 chips de features"],
  "palette": { "primary": "#hex acento", "bg": "#hex fondo oscuro", "accent": "#hex secundario" },
  "seo": { "metaTitle": "string <=60 chars", "metaDescription": "string 120-160 chars" },
  "sections": {
    "hero": { "headline": "string", "subheadline": "string", "ctaPrimary": "string", "ctaSecondary": "string" },
    "features": { "heading": "string", "items": [ { "title": "string", "description": "string", "icon": "un emoji" } ] },
    "pricing": { "heading": "string", "subheading": "string", "plans": [ { "name": "string", "price": "string ej. '$249'", "period": "string ej. '/mes' 'por persona'", "description": "string corta", "features": ["string","..."], "highlighted": false, "cta": "string ej. 'Reservar'" } ] },
    "slider": { "heading": "string", "slides": [ { "title": "string", "text": "string corta" } ] },
    "stats": { "heading": "string", "items": [ { "value": "string ej. '4.9★' '+500' '12 años'", "label": "string" } ] },
    "reviews": { "heading": "string", "rating": 4.9, "totalReviews": 213, "items": [ { "author": "nombre realista MX", "rating": 5, "text": "string reseña creíble", "time": "ej. 'hace 2 semanas'" } ] },
    "gallery": { "heading": "string" },
    "location": { "heading": "string", "address": "dirección ficticia creíble${location ? ` en ${location}` : ""}", "mapQuery": "texto de búsqueda Google Maps${location ? `, incluye '${location}'` : ""}", "phone": "+52 ...", "email": "contacto@..." },
    "faq": { "heading": "string", "items": [ { "question": "string", "answer": "string" } ] },
    "cta": { "headline": "string", "subheadline": "string" }
  }
}`;

function stripFences(text) {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

async function generate() {
  const prompt = `Eres copywriter de conversión para landings en español de México (voseo/tuteo natural MX).
Genera el contenido de un sitio demo de portafolio para el nicho: "${niche}"${location ? ` en ${location}` : ""}.
Es un demo ficticio pero realista de cómo se vería el sitio de un negocio de ese nicho.
- Inventa un nombre de marca creíble. Copy nítido, orientado a beneficio, sin relleno.
- features.items: 3 a 5. stats.items: exactamente 4. reviews.items: exactamente 3 (nombres MX realistas). faq.items: 3 a 5.
- pricing.plans: exactamente 3, UNO con highlighted:true; precios y features realistas del nicho (membresías/paquetes/menú). slider.slides: exactamente 3.
- palette: hex coherentes con el nicho, fondo oscuro elegante.
Responde ÚNICAMENTE con JSON válido que cumpla EXACTAMENTE esta forma (sin comentarios, sin texto extra):
${SHAPE}`;

  const { stdout } = await execFileAsync(
    "claude",
    ["-p", prompt, "--output-format", "json"],
    { maxBuffer: 10 * 1024 * 1024 },
  );

  const envelope = JSON.parse(stdout);
  if (envelope.is_error) throw new Error(`claude -p falló: ${envelope.result || envelope.subtype}`);

  let data;
  try {
    data = JSON.parse(stripFences(envelope.result));
  } catch (e) {
    throw new Error(`No se pudo parsear el JSON de claude:\n${envelope.result}`);
  }

  // Validación mínima
  for (const k of ["title", "nicheLabel", "description", "tags", "palette", "seo", "sections"]) {
    if (!data[k]) throw new Error(`Falta campo "${k}" en la respuesta de claude.`);
  }
  return data;
}

// ── verified Unsplash images per niche ───────────────────────────────────────
// IDs checked to return 200. hero = 1 background; gallery = 3 tiles.
const U = (id) => `https://images.unsplash.com/photo-${id}`;
const NICHE_IMAGES = {
  restaurante: {
    hero: U("1517248135467-4c7edcad34c4"),
    gallery: [U("1414235077428-338989a2e8c0"), U("1555396273-367ea4eb4db5"), U("1559339352-11d035aa65de")],
  },
  dentista: {
    hero: U("1606811841689-23dfddce3e95"),
    gallery: [U("1588776814546-1ffcf47267a5"), U("1629909613654-28e377c37b09"), U("1609840114035-3c981b782dfe")],
  },
  gimnasio: {
    hero: U("1534438327276-14e5300c3a48"),
    gallery: [U("1571019613454-1cb2f99b2d8b"), U("1534258936925-c58bed479fcb"), U("1605296867304-46d5465a13f1")],
  },
};

// ── map AI output -> Sanity docs ─────────────────────────────────────────────
const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

// Section builders — each maps AI data (+ images) to a Sanity section object.
// `variant` is injected by the recipe, not the AI, so layouts vary per niche.
const BUILDERS = {
  hero: (s, imgs, variant) =>
    s.hero && {
      _type: "demoHero",
      enabled: true,
      variant: variant || "fullbleed",
      headline: s.hero.headline,
      subheadline: s.hero.subheadline,
      ...(imgs?.hero ? { imageUrl: imgs.hero } : {}),
      ctaPrimary: s.hero.ctaPrimary,
      ctaSecondary: s.hero.ctaSecondary,
    },
  features: (s, imgs, variant) =>
    s.features?.items?.length && {
      _type: "demoFeatures",
      enabled: true,
      variant: variant || "grid",
      heading: s.features.heading,
      items: s.features.items.map((it) => ({ _key: key(), ...it })),
    },
  pricing: (s) =>
    s.pricing?.plans?.length && {
      _type: "demoPricing",
      enabled: true,
      heading: s.pricing.heading,
      subheading: s.pricing.subheading,
      plans: s.pricing.plans.map((p) => ({ _key: key(), ...p })),
    },
  slider: (s, imgs) =>
    s.slider?.slides?.length && {
      _type: "demoSlider",
      enabled: true,
      heading: s.slider.heading,
      slides: s.slider.slides.map((sl, i) => ({
        _key: key(),
        ...sl,
        ...(imgs?.gallery?.[i % imgs.gallery.length] ? { imageUrl: imgs.gallery[i % imgs.gallery.length] } : {}),
      })),
    },
  stats: (s) =>
    s.stats?.items?.length && {
      _type: "demoStats",
      enabled: true,
      heading: s.stats.heading,
      items: s.stats.items.map((it) => ({ _key: key(), ...it })),
    },
  reviews: (s) =>
    s.reviews?.items?.length && {
      _type: "demoReviews",
      enabled: true,
      heading: s.reviews.heading,
      rating: s.reviews.rating,
      totalReviews: s.reviews.totalReviews,
      items: s.reviews.items.map((it) => ({ _key: key(), ...it })),
    },
  gallery: (s, imgs) =>
    imgs?.gallery?.length && {
      _type: "demoGallery",
      enabled: true,
      heading: s.gallery?.heading || "Galería",
      imageUrls: imgs.gallery,
    },
  location: (s) =>
    s.location && {
      _type: "demoLocation",
      enabled: true,
      heading: s.location.heading,
      address: s.location.address,
      mapQuery: s.location.mapQuery,
      phone: s.location.phone,
      email: s.location.email,
    },
  faq: (s) =>
    s.faq?.items?.length && {
      _type: "demoFaq",
      enabled: true,
      heading: s.faq.heading,
      items: s.faq.items.map((it) => ({ _key: key(), ...it })),
    },
  cta: (s) =>
    s.cta && {
      _type: "demoCta",
      enabled: true,
      headline: s.cta.headline,
      subheadline: s.cta.subheadline,
    },
};

// Recipes = different section order + hero/features variants. One is picked per
// niche (deterministic hash) so no two niches share a skeleton — kills the
// "cloned template" feel. Each entry: [builderKey, variant?].
const RECIPES = [
  // A — image-forward (food, hospitality)
  [
    ["hero", "fullbleed"],
    ["slider"],
    ["pricing"],
    ["features", "list"],
    ["reviews"],
    ["gallery"],
    ["location"],
    ["faq"],
    ["cta"],
  ],
  // B — trust-first (health, services)
  [
    ["hero", "split"],
    ["stats"],
    ["features", "rows"],
    ["pricing"],
    ["reviews"],
    ["location"],
    ["faq"],
    ["cta"],
  ],
  // C — bold/typographic (fitness, lifestyle)
  [
    ["hero", "minimal"],
    ["stats"],
    ["pricing"],
    ["features", "grid"],
    ["slider"],
    ["gallery"],
    ["location"],
    ["cta"],
  ],
];

function pickRecipe(nicheSlug) {
  const sum = [...nicheSlug].reduce((a, c) => a + c.charCodeAt(0), 0);
  return RECIPES[sum % RECIPES.length];
}

// Assemble the ordered sections from a recipe, skipping any with no data.
function buildSections(s, imgs, recipe) {
  return recipe
    .map(([k, variant]) => BUILDERS[k]?.(s, imgs, variant))
    .filter(Boolean)
    .map((sec) => ({ _key: key(), ...sec }));
}

function toSanityDocs(data, nicheSlug, demoSlug) {
  const s = data.sections;
  const imgs = NICHE_IMAGES[nicheSlug] || null;
  const recipe = pickRecipe(nicheSlug);
  const nicheDoc = {
    _id: `niche-${nicheSlug}`,
    _type: "niche",
    title: niche,
    slug: { _type: "slug", current: nicheSlug },
    keywords: data.tags,
    paletteDefault: data.palette,
  };

  const demoDoc = {
    _id: `demo-${demoSlug}`,
    _type: "demo",
    title: data.title,
    slug: { _type: "slug", current: demoSlug },
    niche: { _type: "reference", _ref: nicheDoc._id },
    nicheLabel: data.nicheLabel,
    description: data.description,
    tags: data.tags,
    highlighted: false,
    status: publish ? "published" : "draft",
    palette: data.palette,
    // deviceMockup intentionally omitted — TODO: attach real screenshot asset.
    sections: buildSections(s, imgs, recipe),
    hireCta: { label: "Contratar uno igual", href: `/express?demo=${demoSlug}` },
    seo: { _type: "seo", metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription },
  };

  return { nicheDoc, demoDoc };
}

// ── main ─────────────────────────────────────────────────────────────────────
(async () => {
  console.log(`▶ Generando demo para nicho "${niche}"${location ? ` (${location})` : ""} con claude -p…`);
  const data = await generate();

  const nicheSlug = slugify(niche);
  // Deterministic slug (niche + location) so re-runs replace the same doc
  // instead of spawning a duplicate when the AI invents a new brand name.
  const demoSlug = slugify(`${niche}-${location}`) || nicheSlug;
  const { nicheDoc, demoDoc } = toSanityDocs(data, nicheSlug, demoSlug);

  if (dry) {
    console.log(JSON.stringify({ nicheDoc, demoDoc }, null, 2));
    console.log("\n(--dry: nada escrito a Sanity)");
    return;
  }

  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error("Falta SANITY_WRITE_TOKEN en el entorno.");

  const sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID || "xgccta5n",
    dataset: process.env.SANITY_DATASET || "production",
    apiVersion: "2026-03-26",
    token,
    useCdn: false,
  });

  // Preserve an existing screenshot — createOrReplace would otherwise wipe it.
  const existing = await sanity.getDocument(demoDoc._id).catch(() => null);
  if (existing?.deviceMockup) demoDoc.deviceMockup = existing.deviceMockup;

  // createOrReplace -> idempotente por slug. Re-correr el script actualiza el demo.
  await sanity.createOrReplace(nicheDoc);
  await sanity.createOrReplace(demoDoc);

  console.log(`✓ Demo "${data.title}" escrito (status: ${demoDoc.status}).`);
  console.log(`  /demos/${demoSlug}`);
  if (!publish) console.log("  En borrador — publícalo en Studio o re-corre con --publish.");
  console.log(
    existing?.deviceMockup
      ? "  deviceMockup preservado."
      : "  Pendiente: corre `npm run shoot-mockup -- --slug " + demoSlug + "` para la card.",
  );
})().catch((err) => {
  console.error("✗ Error:", err.message);
  process.exit(1);
});
