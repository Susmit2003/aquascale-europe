// // lib/seo/schema-generators.ts

// export const generateFAQSchema = (city: string, hardness: number) => {
//   return {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     "mainEntity": [
//       {
//         "@type": "Question",
//         "name": `Is the water in ${city} hard or soft?`,
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": `The water in ${city} has a hardness level of ${hardness} mg/L, which classifies it as ${hardness > 120 ? 'hard' : 'soft'} water.`
//         }
//       },
//       {
//         "@type": "Question",
//         "name": `Do I need a water softener in ${city}?`,
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": hardness > 120 
//             ? `Yes. Because ${city} has hard water (${hardness} mg/L), a water softener is highly recommended to protect your boiler, dishwasher, and plumbing from limescale.`
//             : `No. ${city} has relatively soft water (${hardness} mg/L), so a dedicated whole-house water softener is generally not necessary.`
//         }
//       }
//     ]
//   };
// };

// export const generateDatasetSchema = (city: string, hardness: number) => {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Dataset",
//     "name": `${city} Municipal Water Hardness Data`,
//     "description": `Bi-annual aggregate water hardness data for ${city} measured in mg/L of Calcium Carbonate equivalent.`,
//     "variableMeasured": "Water Hardness (mg/L CaCO3)",
//     "measurementTechnique": "Aggregated municipal reports and digital interpolation",
//     "spatialCoverage": {
//       "@type": "Place",
//       "name": city
//     }
//   };
// };



// components/seo/schema-generators.ts

// 🚨 SPAM FIX: Replaced static/patterned FAQ questions with mathematically unique Data Insights.
export const generateFAQSchema = (city: string, hardness: number, regionAvg: number) => {
  const delta = Math.abs(hardness - regionAvg);
  const comparison = hardness > regionAvg ? 'harder' : 'softer';
  
  // If the city exactly matches the region average, do not generate the first FAQ to avoid forced text.
  const mainEntity = [];

  if (delta > 0) {
    mainEntity.push({
      "@type": "Question",
      "name": `How does the water hardness in ${city} compare to the regional average?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Based on our current municipal data, ${city}'s water is ${delta} mg/L ${comparison} than the surrounding regional average of ${regionAvg} mg/L.`
      }
    });
  }

  mainEntity.push({
    "@type": "Question",
    "name": `What is the precise calcium carbonate (CaCO3) concentration for ${city}?`,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": `The verified baseline concentration for the ${city} municipal supply is exactly ${hardness} mg/L CaCO3.`
    }
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity
  };
};

// 🛡️ EEAT FIX: Enhanced Dataset schema with explicit creator attribution.
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
    },
    "creator": {
      "@type": "Organization",
      "name": "Water Hardness Scale Data Team",
      "url": "https://waterhardnessscale.com/methodology"
    },
    "license": "https://creativecommons.org/licenses/by/4.0/"
  };
};