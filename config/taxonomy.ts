// 📍 Geo-Dependent Topics (Renders at: /en/uk/england/london/[category]/[subcategory])
export const LOCAL_TOPICS = {
  appliances: {
    slug: 'appliances',
    subcategories: [
      'dishwasher-settings',
      'washing-machine-settings',
      'coffee-machine-settings',
      'boiler-and-heating-system', 
    ],
  },
  health: {
    slug: 'health-and-wellness',
    subcategories: [
      'skin-care-hard-water',
      'hair-care-hard-water',
    ],
  },
  plumbing: {
    slug: 'plumbing-and-infrastructure',
    subcategories: [
      'pipe-scaling-risk',
      'appliance-maintenance-schedule',
    ],
  }
};

// 🌍 Geo-Agnostic Topics (Renders at: /en/buying-guides/[subcategory] etc.)
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

export type LocalCategorySlug = keyof typeof LOCAL_TOPICS;
export type GlobalCategorySlug = keyof typeof GLOBAL_TOPICS;