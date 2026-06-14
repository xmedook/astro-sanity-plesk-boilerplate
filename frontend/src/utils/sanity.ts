import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";
import groq from "groq";

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const token = import.meta.env.SANITY_API_READ_TOKEN;

// visualEditingEnabled=true: fetch draft content with stega encoding (local/staging with Presentation tool)
// visualEditingEnabled=false: fetch published content from CDN (production)
async function loadQuery<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  try {
    return await sanityClient.fetch<T>(
      query,
      params,
      {
        perspective: visualEditingEnabled ? 'drafts' : 'published',
        useCdn: !visualEditingEnabled,
        ...(visualEditingEnabled && token ? { token, stega: true } : {}),
      }
    );
  } catch (err) {
    // SSG-friendly fallback: if Sanity is unreachable (missing/placeholder project ID,
    // network error, etc.) return an empty result so the static build still succeeds.
    console.warn("[sanity] query failed, returning empty result:", err instanceof Error ? err.message : err);
    return ([] as unknown) as T;
  }
}

// Shared image projection — dereferences asset to include dimensions and LQIP
const imageProjection = `{
  ...,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
}`;

export async function getPosts(): Promise<Post[]> {
  return loadQuery<Post[]>(
    groq`*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
      ...,
      mainImage ${imageProjection}
    }`,
  );
}

export async function getPost(slug: string): Promise<Post> {
  return loadQuery<Post>(
    groq`*[_type == "post" && slug.current == $slug][0] {
      ...,
      mainImage ${imageProjection},
      seo {
        ...,
        ogImage ${imageProjection}
      }
    }`,
    { slug },
  );
}

// ─── Demo factory ──────────────────────────────────────────────────────────
// Only published demos surface on the site; drafts stay hidden until ready.

const demoCardProjection = `{
  _id,
  title,
  "slug": slug.current,
  nicheLabel,
  "nicheTitle": niche->title,
  "nicheSlug": niche->slug.current,
  description,
  tags,
  liveUrl,
  highlighted,
  deviceMockup ${imageProjection},
  hireCta,
  palette,
  "paletteFallback": niche->paletteDefault
}`;

export async function getDemos(): Promise<DemoCard[]> {
  return loadQuery<DemoCard[]>(
    groq`*[_type == "demo" && status == "published" && defined(slug.current)]
      | order(highlighted desc, _createdAt desc) ${demoCardProjection}`,
  );
}

export async function getDemosByNiche(nicheSlug: string): Promise<DemoCard[]> {
  return loadQuery<DemoCard[]>(
    groq`*[_type == "demo" && status == "published" && niche->slug.current == $nicheSlug && defined(slug.current)]
      | order(highlighted desc, _createdAt desc) ${demoCardProjection}`,
    { nicheSlug },
  );
}

export async function getDemo(slug: string): Promise<Demo> {
  return loadQuery<Demo>(
    groq`*[_type == "demo" && slug.current == $slug][0] {
      ...,
      "slug": slug.current,
      "nicheTitle": niche->title,
      "nicheSlug": niche->slug.current,
      "nicheKeywords": niche->keywords,
      "paletteFallback": niche->paletteDefault,
      deviceMockup ${imageProjection},
      sections[] {
        ...,
        image ${imageProjection},
        images[] ${imageProjection}
      },
      seo {
        ...,
        ogImage ${imageProjection}
      }
    }`,
    { slug },
  );
}

export async function getNiches(): Promise<Niche[]> {
  return loadQuery<Niche[]>(
    groq`*[_type == "niche" && defined(slug.current)] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      keywords,
      paletteDefault,
      "count": count(*[_type == "demo" && status == "published" && references(^._id)])
    }`,
  );
}

export interface Palette {
  primary?: string;
  bg?: string;
  accent?: string;
}

export interface Niche {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  keywords?: string[];
  paletteDefault?: Palette;
  /** Published demo count — populated by getNiches */
  count?: number;
}

/** Lightweight projection used by the /demos portfolio grid */
export interface DemoCard {
  _id: string;
  title: string;
  slug: string;
  nicheLabel?: string;
  nicheTitle?: string;
  nicheSlug?: string;
  description?: string;
  tags?: string[];
  liveUrl?: string;
  highlighted?: boolean;
  deviceMockup?: SanityImage;
  hireCta?: { label?: string; href?: string };
  palette?: Palette;
  paletteFallback?: Palette;
}

export interface DemoSection {
  _type:
    | "demoHero"
    | "demoFeatures"
    | "demoPricing"
    | "demoSlider"
    | "demoStats"
    | "demoReviews"
    | "demoGallery"
    | "demoLocation"
    | "demoFaq"
    | "demoCta";
  _key: string;
  enabled?: boolean;
  variant?: string;
  // hero
  headline?: string;
  subheadline?: string;
  image?: SanityImage;
  imageUrl?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  // features / faq / gallery / stats / reviews / pricing / slider
  heading?: string;
  subheading?: string;
  plans?: Array<{
    name?: string;
    price?: string;
    period?: string;
    description?: string;
    features?: string[];
    highlighted?: boolean;
    cta?: string;
  }>;
  slides?: Array<{ title?: string; text?: string; imageUrl?: string }>;
  items?: Array<{
    title?: string;
    description?: string;
    icon?: string;
    question?: string;
    answer?: string;
    value?: string;
    label?: string;
    author?: string;
    rating?: number;
    text?: string;
    time?: string;
  }>;
  images?: SanityImage[];
  imageUrls?: string[];
  // reviews
  rating?: number;
  totalReviews?: number;
  // location
  address?: string;
  mapQuery?: string;
  phone?: string;
  email?: string;
}

export interface Demo {
  _id: string;
  _type: "demo";
  _createdAt: string;
  title: string;
  slug: string;
  nicheLabel?: string;
  nicheTitle?: string;
  nicheSlug?: string;
  nicheKeywords?: string[];
  description?: string;
  tags?: string[];
  liveUrl?: string;
  highlighted?: boolean;
  status?: "draft" | "published";
  deviceMockup?: SanityImage;
  palette?: Palette;
  paletteFallback?: Palette;
  sections?: DemoSection[];
  hireCta?: { label?: string; href?: string };
  seo?: Seo;
}

export interface SanityImage {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  /** Original image width in pixels, from asset metadata */
  width: number;
  /** Original image height in pixels, from asset metadata */
  height: number;
  /** Low-quality image placeholder (base64 data URL) */
  lqip?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface Post {
  _id: string;
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  publishedAt?: string;
  category?: string;
  readTime?: string;
  mainImage?: SanityImage;
  body: PortableTextBlock[];
  seo?: Seo;
}
