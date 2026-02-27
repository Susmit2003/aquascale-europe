// config/taxonomy.ts

// 🚨 DOORWAY PAGE FIX: Removed LOCAL_TOPICS routing arrays.
// All local data must be consolidated onto the main City Hub page to prevent 
// keyword cannibalization and Scaled Content Abuse penalties.

// 🌍 Geo-Agnostic Topics (Renders at: /en/buying-guides/[subcategory] etc.)
// These are safe because they are global, highly-researched, human-written editorial pages, 
// not mass-generated programmatic pages.
export const GLOBAL_TOPICS = {
  'home-solutions': {
    slug: 'home-water-solutions',
    subcategories: [
      'water-softeners-guide',
      'reverse-osmosis-systems',
      'whole-house-filtration',
    ],
  },
  commercial: {
    slug: 'commercial-and-industrial',
    subcategories: [
      'hotel-water-systems',
      'restaurant-equipment',
    ],
  },
  'buying-guides': {
    slug: 'buying-guides',
    subcategories: [
      'best-system-for-hard-water-europe',
      'budget-vs-premium-systems',
      'brand-comparison',
    ],
  },
  regulations: {
    slug: 'eu-water-regulations',
    subcategories: [
      'eu-drinking-water-directive',
      'gdpr-and-water-data',
    ],
  }
};

export type GlobalCategorySlug = keyof typeof GLOBAL_TOPICS;