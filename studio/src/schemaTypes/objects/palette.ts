import {defineField, defineType} from 'sanity'

/**
 * Palette object. Reused by niche (default) and demo (override).
 * Rendered as inline CSS vars on the frontend — no Tailwind recompile needed.
 */

export default defineType({
  name: 'palette',
  title: 'Paleta',
  type: 'object',
  fields: [
    defineField({
      name: 'primary',
      title: 'Primario / acento',
      type: 'string',
      description: 'Hex, ej. #8224E3',
    }),
    defineField({
      name: 'bg',
      title: 'Fondo',
      type: 'string',
      description: 'Hex, ej. #0D0118',
    }),
    defineField({
      name: 'accent',
      title: 'Secundario',
      type: 'string',
      description: 'Hex opcional.',
    }),
  ],
  options: {columns: 3},
})
