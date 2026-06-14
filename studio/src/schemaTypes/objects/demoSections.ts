import {defineField, defineType} from 'sanity'

/**
 * Toggleable demo section objects. A demo's `sections[]` array holds any mix of
 * these in any order. Each has an `enabled` flag so a section can be authored
 * but hidden without deleting it. Frontend renderer skips enabled === false.
 *
 * Scope = "preview ligero": hero + features + gallery + faq + cta.
 */

const enabledField = defineField({
  name: 'enabled',
  title: 'Visible',
  type: 'boolean',
  initialValue: true,
})

const imageWithAlt = {
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
}

const variantField = (options: string[]) =>
  defineField({
    name: 'variant',
    title: 'Variante de diseño',
    type: 'string',
    options: {list: options, layout: 'radio'},
    initialValue: options[0],
  })

export const demoHero = defineType({
  name: 'demoHero',
  title: 'Hero',
  type: 'object',
  fields: [
    enabledField,
    variantField(['fullbleed', 'split', 'minimal']),
    defineField({name: 'headline', title: 'Titular', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'subheadline', title: 'Subtítulo', type: 'text', rows: 2}),
    defineField({name: 'image', title: 'Imagen (Sanity)', ...imageWithAlt}),
    defineField({name: 'imageUrl', title: 'Imagen (URL externa, ej. Unsplash)', type: 'url'}),
    defineField({name: 'ctaPrimary', title: 'CTA primario', type: 'string'}),
    defineField({name: 'ctaSecondary', title: 'CTA secundario', type: 'string'}),
  ],
  preview: {select: {title: 'headline'}, prepare: ({title}) => ({title: title || 'Hero', subtitle: 'Sección: Hero'})},
})

export const demoFeatures = defineType({
  name: 'demoFeatures',
  title: 'Características',
  type: 'object',
  fields: [
    enabledField,
    variantField(['grid', 'rows', 'list']),
    defineField({name: 'heading', title: 'Encabezado', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Ítems',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'string'}),
            defineField({name: 'description', title: 'Descripción', type: 'text', rows: 2}),
            defineField({name: 'icon', title: 'Icono (emoji o nombre)', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    }),
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Características', subtitle: 'Sección: Características'})},
})

export const demoPricing = defineType({
  name: 'demoPricing',
  title: 'Precios / Planes',
  type: 'object',
  fields: [
    enabledField,
    defineField({name: 'heading', title: 'Encabezado', type: 'string'}),
    defineField({name: 'subheading', title: 'Subtítulo', type: 'text', rows: 2}),
    defineField({
      name: 'plans',
      title: 'Planes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Nombre', type: 'string'}),
            defineField({name: 'price', title: 'Precio', type: 'string', description: 'ej. "$249", "$1,500/mes"'}),
            defineField({name: 'period', title: 'Periodo', type: 'string', description: 'ej. "/mes", "por persona"'}),
            defineField({name: 'description', title: 'Descripción corta', type: 'string'}),
            defineField({name: 'features', title: 'Incluye', type: 'array', of: [{type: 'string'}]}),
            defineField({name: 'highlighted', title: 'Destacado', type: 'boolean', initialValue: false}),
            defineField({name: 'cta', title: 'Texto CTA', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'price'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Precios / Planes', subtitle: 'Sección: Pricing'})},
})

export const demoSlider = defineType({
  name: 'demoSlider',
  title: 'Slider / Carrusel',
  type: 'object',
  fields: [
    enabledField,
    defineField({name: 'heading', title: 'Encabezado', type: 'string'}),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'string'}),
            defineField({name: 'text', title: 'Texto', type: 'text', rows: 3}),
            defineField({name: 'imageUrl', title: 'Imagen (URL externa)', type: 'url'}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Slider', subtitle: 'Sección: Carrusel'})},
})

export const demoGallery = defineType({
  name: 'demoGallery',
  title: 'Galería',
  type: 'object',
  fields: [
    enabledField,
    defineField({name: 'heading', title: 'Encabezado', type: 'string'}),
    defineField({name: 'images', title: 'Imágenes (Sanity)', type: 'array', of: [imageWithAlt as any]}),
    defineField({
      name: 'imageUrls',
      title: 'Imágenes (URLs externas, ej. Unsplash)',
      type: 'array',
      of: [{type: 'url'}],
    }),
  ],
  preview: {prepare: () => ({title: 'Galería', subtitle: 'Sección: Galería'})},
})

export const demoStats = defineType({
  name: 'demoStats',
  title: 'Métricas / confianza',
  type: 'object',
  fields: [
    enabledField,
    defineField({name: 'heading', title: 'Encabezado', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Métricas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Valor', type: 'string', description: 'ej. "4.9★", "+500", "12 años"'}),
            defineField({name: 'label', title: 'Etiqueta', type: 'string'}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Métricas', subtitle: 'Sección: Confianza'})},
})

export const demoReviews = defineType({
  name: 'demoReviews',
  title: 'Reseñas (Google My Business)',
  type: 'object',
  fields: [
    enabledField,
    defineField({name: 'heading', title: 'Encabezado', type: 'string'}),
    defineField({name: 'rating', title: 'Rating global', type: 'number', validation: (Rule) => Rule.min(0).max(5)}),
    defineField({name: 'totalReviews', title: 'Total de reseñas', type: 'number'}),
    defineField({
      name: 'items',
      title: 'Reseñas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'author', title: 'Autor', type: 'string'}),
            defineField({name: 'rating', title: 'Estrellas', type: 'number', validation: (Rule) => Rule.min(1).max(5)}),
            defineField({name: 'text', title: 'Texto', type: 'text', rows: 3}),
            defineField({name: 'time', title: 'Cuándo', type: 'string', description: 'ej. "hace 2 semanas"'}),
          ],
          preview: {select: {title: 'author', subtitle: 'text'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Reseñas Google', subtitle: 'Sección: GMB'})},
})

export const demoLocation = defineType({
  name: 'demoLocation',
  title: 'Ubicación + Contacto',
  type: 'object',
  fields: [
    enabledField,
    defineField({name: 'heading', title: 'Encabezado', type: 'string'}),
    defineField({name: 'address', title: 'Dirección', type: 'string'}),
    defineField({name: 'mapQuery', title: 'Búsqueda de mapa', type: 'string', description: 'Texto para el embed de Google Maps, ej. "Roma Norte, CDMX".'}),
    defineField({name: 'phone', title: 'Teléfono', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Ubicación + Contacto', subtitle: 'Sección: Mapa/Form'})},
})

export const demoFaq = defineType({
  name: 'demoFaq',
  title: 'FAQ',
  type: 'object',
  fields: [
    enabledField,
    defineField({name: 'heading', title: 'Encabezado', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Preguntas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Pregunta', type: 'string'}),
            defineField({name: 'answer', title: 'Respuesta', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'question'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'FAQ', subtitle: 'Sección: FAQ'})},
})

export const demoCta = defineType({
  name: 'demoCta',
  title: 'CTA final',
  type: 'object',
  fields: [
    enabledField,
    defineField({name: 'headline', title: 'Titular', type: 'string'}),
    defineField({name: 'subheadline', title: 'Subtítulo', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'headline'}, prepare: ({title}) => ({title: title || 'CTA final', subtitle: 'Sección: CTA'})},
})
