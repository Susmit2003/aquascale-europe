// // utils/cityArticleGenerator.ts

// import { Location } from '@/types';

// // Deterministic hash based on city name to ensure stable, but varied, content generation
// function getVariationIndex(str: string, max: number): number {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   return Math.abs(hash % max);
// }

// export function generateCityHubArticle(location: Location, allLocations: Location[]): string[] {
//   const paragraphs: string[] = [];
//   const germanDegrees = (location.hardness_mg_l * 0.056).toFixed(1);
//   const variation = getVariationIndex(location.name, 3);
  
//   // 1. Generate Unique Statistical Context
//   const regionLocations = allLocations
//     .filter(l => l.region_slug === location.region_slug)
//     .sort((a, b) => b.hardness_mg_l - a.hardness_mg_l);
    
//   const countryLocations = allLocations
//     .filter(l => l.country_slug === location.country_slug)
//     .sort((a, b) => b.hardness_mg_l - a.hardness_mg_l);
  
//   const regionRank = regionLocations.findIndex(l => l.id === location.id) + 1;
//   const countryAvg = Math.round(countryLocations.reduce((acc, curr) => acc + curr.hardness_mg_l, 0) / (countryLocations.length || 1));
//   const deltaFromNational = location.hardness_mg_l - countryAvg;
//   const hardnessCategory = getHardnessCategory(location.hardness_mg_l);
  
//   // -- VARIATION 1: Core Factual Reporting --
//   const introVariations = [
//     `Based on recent municipal testing, the water supply in ${location.name} registers a hardness level of ${location.hardness_mg_l} mg/L (equivalent to ${germanDegrees} °dH). Under European water quality guidelines, this specific mineral concentration places the local supply firmly in the "${hardnessCategory}" category.`,
//     `Residents of ${location.name} receive tap water with a base mineral concentration of ${location.hardness_mg_l} mg/L (${germanDegrees} °dH). From a chemical standpoint, this categorizes the municipal supply as "${hardnessCategory}" water.`,
//     `The latest localized data indicates that ${location.name}'s water hardness sits at ${location.hardness_mg_l} mg/L, or roughly ${germanDegrees} °dH. This reading officially classifies the local drinking water as "${hardnessCategory}".`
//   ];
//   paragraphs.push(introVariations[variation]);

//   // -- VARIATION 2: Relational Insight --
//   const relativeVariations = [
//     `Statistically, ${location.name} ranks as the ${regionRank}${getOrdinal(regionRank)} hardest water source out of ${regionLocations.length} monitored districts in the ${location.region_slug.replace(/-/g, ' ')} region. Nationally, it deviates by ${Math.abs(deltaFromNational)} mg/L from the country-wide baseline of ${countryAvg} mg/L.`,
//     `When comparing local geology, ${location.name} is the ${regionRank}${getOrdinal(regionRank)} hardest out of the ${regionLocations.length} areas evaluated in ${location.region_slug.replace(/-/g, ' ')}. It is ${deltaFromNational > 0 ? 'measurably harder' : 'measurably softer'} than the national average of ${countryAvg} mg/L.`,
//     `In terms of regional rankings, out of ${regionLocations.length} municipalities in ${location.region_slug.replace(/-/g, ' ')}, ${location.name} holds the ${regionRank}${getOrdinal(regionRank)} position for water hardness. The local measurement of ${location.hardness_mg_l} mg/L sits ${Math.abs(deltaFromNational)} mg/L ${deltaFromNational > 0 ? 'above' : 'below'} the national norm.`
//   ];
//   paragraphs.push(relativeVariations[variation]);

//   // -- VARIATION 3: Physical Impact --
//   const scaleRisk = calculateScaleRisk(location.hardness_mg_l);
//   const scalingRate = (location.hardness_mg_l * 0.0015).toFixed(3);
  
//   const impactVariations = [
//     `With a concentration of ${location.hardness_mg_l} mg/L, the risk of calcium carbonate precipitation is considered ${scaleRisk}. Unmanaged heating elements operating above 60°C here may experience a baseline scaling rate of approximately ${scalingRate} mm annually.`,
//     `The thermodynamic impact of ${location.hardness_mg_l} mg/L means limescale risk is ${scaleRisk}. Household appliances running high-temperature cycles in this zone accumulate scale at an estimated rate of ${scalingRate} mm per year without intervention.`,
//     `Because the precipitation risk is ${scaleRisk}, property owners should be aware that water heated past 60°C will drop approximately ${scalingRate} mm of solid calcium carbonate scale per year onto internal plumbing elements.`
//   ];
//   paragraphs.push(impactVariations[variation]);

//   return paragraphs;
// }

// // Pure functions for strict categorization
// function getHardnessCategory(mgL: number): string {
//   if (mgL < 60) return "Soft";
//   if (mgL < 120) return "Moderately Hard";
//   if (mgL < 180) return "Hard";
//   return "Very Hard";
// }

// function calculateScaleRisk(mgL: number): string {
//   if (mgL < 60) return "Negligible";
//   if (mgL < 120) return "Low to Moderate";
//   if (mgL < 180) return "High";
//   return "Severe";
// }

// function getOrdinal(n: number) {
//   const s = ["th", "st", "nd", "rd"];
//   const v = n % 100;
//   return s[(v - 20) % 10] || s[v] || s[0];
// }



// utils/cityArticleGenerator.ts
import { Location } from '@/types';
import nlp from 'compromise';

// Pure functions for strict categorization
function getHardnessCategory(mgL: number): string {
  if (mgL < 60) return "Soft";
  if (mgL < 120) return "Moderately Hard";
  if (mgL < 180) return "Hard";
  return "Very Hard";
}

function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Helper to pick a segment based on hash and position
function pick(segments: string[], seed: string, offset: number): string {
  const index = (getHash(seed) + offset) % segments.length;
  return segments[index];
}

export function generateCityHubArticle(location: Location, allLocations: Location[]): string[] {
  const { name, hardness_mg_l, source_utility } = location;
  const germanDegrees = (hardness_mg_l * 0.056).toFixed(1);
  const category = getHardnessCategory(hardness_mg_l);

  // --- PARAGRAPH 1: CORE FACTUAL REPORTING ---
  // Combinations: 15 (Opening) * 15 (Middle) * 15 (Closing) = 3,375 variations
  const p1_open = [
    `According to figures provided by ${source_utility}, the water in ${name} has a hardness of ${hardness_mg_l} mg/L.`,
    `Official reports from ${source_utility} indicate that ${name}'s municipal supply registers ${hardness_mg_l} mg/L.`,
    `Data verified by ${source_utility} shows that local tap water contains ${hardness_mg_l} mg/L of dissolved minerals.`,
    `The latest readings from ${source_utility} place the mineral concentration in ${name} at ${hardness_mg_l} mg/L.`,
    `Technical analysis from ${source_utility} confirms a baseline hardness of ${hardness_mg_l} mg/L for ${name}.`,
    `Per the documentation from ${source_utility}, ${name} residents receive water with ${hardness_mg_l} mg/L of hardness minerals.`,
    `Water quality metrics from ${source_utility} establish ${name}'s hardness at ${hardness_mg_l} mg/L.`,
    `${source_utility} publishes data showing the ${name} water supply contains ${hardness_mg_l} mg/L of calcium and magnesium.`,
    `Testing conducted by ${source_utility} identifies a hardness level of ${hardness_mg_l} mg/L within ${name}.`,
    `The water profile for ${name}, maintained by ${source_utility}, reports ${hardness_mg_l} mg/L of total hardness.`,
    `Environmental reports from ${source_utility} list ${name}'s tap water hardness at ${hardness_mg_l} mg/L.`,
    `Based on laboratory results from ${source_utility}, ${name} registers a hardness of ${hardness_mg_l} mg/L.`,
    `Statistics from ${source_utility} regarding ${name}'s water supply show ${hardness_mg_l} mg/L of mineral content.`,
    `The municipal grid in ${name}, overseen by ${source_utility}, delivers water with ${hardness_mg_l} mg/L of hardness.`,
    `Quality control data from ${source_utility} indicates that the hardness in ${name} is ${hardness_mg_l} mg/L.`
  ];

  const p1_mid = [
    ` This measurement translates to approximately ${germanDegrees} °dH.`,
    ` In terms of German degrees, this is calculated as ${germanDegrees} °dH.`,
    ` On the standard °dH scale, this corresponds to a value of ${germanDegrees}.`,
    ` When converted to German degrees, the reading is ${germanDegrees} °dH.`,
    ` This mineral weight is equivalent to ${germanDegrees} °dH.`,
    ` Local households can interpret this as ${germanDegrees} on the German hardness scale.`,
    ` For appliance calibration, this represents ${germanDegrees} °dH.`,
    ` This equates to a concentration of ${germanDegrees} °dH.`,
    ` Using the German degree system, the water measures ${germanDegrees} °dH.`,
    ` The converted value for local plumbing standards is ${germanDegrees} °dH.`,
    ` This reading represents ${germanDegrees} °dH on the common dH scale.`,
    ` For practical use, this is roughly ${germanDegrees} German degrees.`,
    ` Calculated for appliance settings, this comes to ${germanDegrees} °dH.`,
    ` The official conversion result is ${germanDegrees} °dH.`,
    ` This data point is mirrored by a reading of ${germanDegrees} °dH.`
  ];

  const p1_close = [
    ` Consequently, the supply is officially categorized as "${category}".`,
    ` This profile classifies the local water as "${category}" under EU standards.`,
    ` Residents are receiving water that is technically defined as "${category}".`,
    ` Under current European guidelines, this is considered "${category}" water.`,
    ` This specific mineral profile falls into the "${category}" range.`,
    ` Officially, this places the ${name} water supply in the "${category}" bracket.`,
    ` Local authorities define this level of hardness as "${category}".`,
    ` From a chemical perspective, this is a "${category}" water type.`,
    ` This level of mineralization is officially labeled as "${category}".`,
    ` Accordingly, the tap water here is ranked as "${category}".`,
    ` This officially designates the supply as "${category}" for consumer use.`,
    ` Technical standards categorize this particular concentration as "${category}".`,
    ` This measurement formally classifies the supply as "${category}".`,
    ` As a result, the water is characterized as "${category}" in official documentation.`,
    ` This reading puts the water firmly in the "${category}" category.`
  ];

  const intro = `${pick(p1_open, name, 1)}${pick(p1_mid, name, 2)}${pick(p1_close, name, 3)}`;

  // --- NLP SYNONYM SWAPPING WITH COMPROMISE ---
  let doc = nlp(intro);
  const hash = getHash(name);
  
  // Randomly swap synonyms to further increase entropy
  if (hash % 2 === 0) {
    doc.match('residents').replaceWith('households');
  } else if (hash % 3 === 0) {
    doc.match('residents').replaceWith('citizens');
  }

  if (hash % 4 === 0) {
    doc.match('official').replaceWith('verified');
  }

  return [doc.text()];
}