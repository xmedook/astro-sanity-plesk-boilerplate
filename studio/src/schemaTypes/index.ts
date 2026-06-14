import blockContent from './objects/blockContent'
import seo from './objects/seo'
import palette from './objects/palette'
import {
  demoHero,
  demoFeatures,
  demoGallery,
  demoFaq,
  demoCta,
  demoStats,
  demoReviews,
  demoLocation,
  demoPricing,
  demoSlider,
} from './objects/demoSections'
import post from './documents/post'
import niche from './documents/niche'
import demo from './documents/demo'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // documents
  post,
  niche,
  demo,
  // objects
  blockContent,
  seo,
  palette,
  demoHero,
  demoFeatures,
  demoGallery,
  demoFaq,
  demoCta,
  demoStats,
  demoReviews,
  demoLocation,
  demoPricing,
  demoSlider,
]
