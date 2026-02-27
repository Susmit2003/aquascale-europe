// utils/d2t.ts

import { Location, SupportedLanguage } from '@/types';

function getVariationIndex(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % max);
}

// Deterministic Data-to-Text Generator with High Entropy
export function generateCityIntro(location: Location, lang: SupportedLanguage): string {
  const { name, hardness_mg_l, population, region_slug } = location;
  
  const isHard = hardness_mg_l > 140;
  const isLargeCity = population > 500000;
  const regionName = region_slug.replace(/-/g, ' ');
  const variation = getVariationIndex(name, 3);

  if (lang === 'en') {
    let intro = '';

    // Sentence 1: Base reading
    const baseVariations = [
      `The municipal water supply in ${name} currently registers a base hardness of ${hardness_mg_l} mg/L. `,
      `Water hardness in ${name} is officially measured at ${hardness_mg_l} mg/L. `,
      `Recent data shows that the tap water in ${name} contains ${hardness_mg_l} mg/L of dissolved minerals. `
    ];
    intro += baseVariations[variation];
    
    // Sentence 2: Hardness context
    if (isHard) {
      const hardVariations = [
        `Residents in this part of the ${regionName} region frequently experience rapid limescale buildup in household appliances due to this elevated mineral concentration. `,
        `Because of this high calcium content, households across the ${regionName} area must proactively manage limescale in their heating elements. `,
        `This elevated reading means that water-using appliances in the ${regionName} region are highly susceptible to rapid calcification. `
      ];
      intro += hardVariations[variation];
    } else {
      const softVariations = [
        `Fortunately for households in the ${regionName} region, this relatively low mineral count minimizes severe limescale risks. `,
        `This softer mineral profile is generally highly beneficial for the longevity of household plumbing across the ${regionName} area. `,
        `Because the mineral concentration is kept in check, residents of the ${regionName} region face very low risks of aggressive appliance calcification. `
      ];
      intro += softVariations[variation];
    }

    // Sentence 3: Population context
    if (isLargeCity) {
      const largeCityVariations = [
        `As a major urban center supporting over ${(population / 1000000).toFixed(1)} million people, the local water treatment facilities maintain strict hygiene standards, though the dissolved calcium remains intact.`,
        `Serving a massive population of ${(population / 1000000).toFixed(1)} million, the municipal grid filters for safety, but leaves these natural hardness minerals largely untouched.`,
        `While the city's vast infrastructure safely supplies ${(population / 1000000).toFixed(1)} million residents, the underlying geographical mineral footprint is preserved all the way to your tap.`
      ];
      intro += largeCityVariations[variation];
    } else {
      const smallTownVariations = [
        `Local water facilities ensure safe drinking standards for the community, though the natural calcium composition remains untreated upon reaching your taps.`,
        `The municipal treatment process prioritizes hygiene, meaning these naturally occurring earth minerals are left to flow freely into local homes.`,
        `While local authorities carefully monitor water safety, the geological mineral profile of the area is not chemically softened before distribution.`
      ];
      intro += smallTownVariations[variation];
    }

    return intro;
  }

  // Fallback for other languages
  return `The water hardness in ${name} is ${hardness_mg_l} mg/L.`; 
}