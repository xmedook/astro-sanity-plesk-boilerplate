import {defineField, defineType} from 'sanity'

/**
 * Demo schema. One portfolio demo = one niche landing (preview ligero).
 * Drives the /demos grid card (matches the SITIO REAL mockup design) and the
 * internal /demos/[slug] page. New published demos auto-appear in the grid.
 */

export default defineType({
  name: 'demo',
  title: 'Demo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Nombre del proyecto demo, ej. "Loma Serena".',
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
      name: 'niche',
      title: 'Nicho',
      type: 'reference',
      to: [{type: 'niche'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nicheLabel',
      title: 'Etiqueta de nicho (card)',
      type: 'string',
      description: 'Línea dorada de la card, ej. "INMOBILIARIA · CANCÚN / RIVIERA MAYA". Si vacío usa el nombre del nicho.',
    }),
    defineField({
      name: 'description',
      title: 'Descripción (card)',
      type: 'text',
      rows: 3,
      description: 'Párrafo de la card del portafolio.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / chips',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Chips de la card, ej. ["Stripe", "Calendly", "WhatsApp"].',
    }),
    defineField({
      name: 'deviceMockup',
      title: 'Mockup (card)',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen del mockup de dispositivos mostrada en la card. TODO: screenshot real.',
      fields: [
        defineField({name: 'alt', title: 'Texto alternativo', type: 'string', validation: (Rule) => Rule.required()}),
      ],
    }),
    defineField({
      name: 'liveUrl',
      title: 'URL en vivo',
      type: 'url',
      description: 'CTA "Ver sitio en vivo". Si vacío, la card apunta a la página interna /demos/[slug].',
    }),
    defineField({
      name: 'highlighted',
      title: 'Destacado (border azul)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {list: ['draft', 'published'], layout: 'radio'},
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'palette',
      title: 'Paleta (override del nicho)',
      type: 'palette',
    }),
    defineField({
      name: 'sections',
      title: 'Secciones',
      type: 'array',
      of: [
        {type: 'demoHero'},
        {type: 'demoFeatures'},
        {type: 'demoPricing'},
        {type: 'demoSlider'},
        {type: 'demoStats'},
        {type: 'demoReviews'},
        {type: 'demoGallery'},
        {type: 'demoLocation'},
        {type: 'demoFaq'},
        {type: 'demoCta'},
      ],
    }),
    defineField({
      name: 'hireCta',
      title: 'CTA "Contratar igual"',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Texto', type: 'string', initialValue: 'Contratar uno igual'}),
        defineField({name: 'href', title: 'Destino', type: 'string', initialValue: '/express'}),
      ],
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'nicheLabel', media: 'deviceMockup'},
    prepare({title, subtitle, media}) {
      return {title, subtitle: subtitle || 'Demo', media}
    },
  },
})
