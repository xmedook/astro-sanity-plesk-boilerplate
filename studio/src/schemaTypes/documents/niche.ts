import {defineField, defineType} from 'sanity'

/**
 * Niche schema. Taxonomy that groups demos and drives SEO keywords.
 * One niche (e.g. "Inmobiliaria", "Restaurante") -> many demos.
 */

export default defineType({
  name: 'niche',
  title: 'Nicho',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del nicho',
      type: 'string',
      description: 'Ej. Inmobiliaria, Restaurante, Dentista, Gym.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Para la página de listado del nicho y meta description.',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords SEO',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'paletteDefault',
      title: 'Paleta por defecto',
      type: 'palette',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
