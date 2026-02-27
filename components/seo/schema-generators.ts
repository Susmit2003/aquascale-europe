// lib/seo/schema-generators.ts

export const generateFAQSchema = (city: string, hardness: number) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is the water in ${city} hard or soft?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The water in ${city} has a hardness level of ${hardness} mg/L, which classifies it as ${hardness > 120 ? 'hard' : 'soft'} water.`
        }
      },
      {
        "@type": "Question",
        "name": `Do I need a water softener in ${city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": hardness > 120 
            ? `Yes. Because ${city} has hard water (${hardness} mg/L), a water softener is highly recommended to protect your boiler, dishwasher, and plumbing from limescale.`
            : `No. ${city} has relatively soft water (${hardness} mg/L), so a dedicated whole-house water softener is generally not necessary.`
        }
      }
    ]
  };
};

export const generateDatasetSchema = (city: string, hardness: number) => {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${city} Municipal Water Hardness Data`,
    "description": `Bi-annual aggregate water hardness data for ${city} measured in mg/L of Calcium Carbonate equivalent.`,
    "variableMeasured": "Water Hardness (mg/L CaCO3)",
    "measurementTechnique": "Aggregated municipal reports and digital interpolation",
    "spatialCoverage": {
      "@type": "Place",
      "name": city
    }
  };
};