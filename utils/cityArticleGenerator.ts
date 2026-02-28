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

function getHardnessCategory(mgL: number): string {
  if (mgL < 60) return "Soft";
  if (mgL < 120) return "Moderately Hard";
  if (mgL < 180) return "Hard";
  return "Very Hard";
}

export function generateCityDataSummary(location: Location): string {
  const { name, hardness_mg_l, source_utility } = location;
  const germanDegrees = (hardness_mg_l * 0.056).toFixed(1);
  const category = getHardnessCategory(hardness_mg_l);
  
  // One clean, factual, snippet-bait sentence. No fluff. No spinning.
  return `According to current water quality data provided by ${source_utility || 'local municipal authorities'}, the measured water hardness in ${name} is ${hardness_mg_l} mg/L (approximately ${germanDegrees} °dH), which is officially classified as ${category} under European hydro-chemical guidelines.`;
}