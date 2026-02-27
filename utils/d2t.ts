import { Location, SupportedLanguage } from '@/types';

// Deterministic Data-to-Text Generator
export function generateCityIntro(location: Location, lang: SupportedLanguage): string {
  const { name, hardness_mg_l, population, region_slug } = location;
  
  const isHard = hardness_mg_l > 140;
  const isLargeCity = population > 500000;
  const regionName = region_slug.replace('-', ' ');

  // English Generation Logic
  if (lang === 'en') {
    let intro = `The municipal water supply in ${name} currently registers a base hardness of ${hardness_mg_l} mg/L. `;
    
    if (isHard) {
      intro += `Residents in this part of the ${regionName} region frequently experience rapid limescale buildup in household appliances due to this elevated mineral concentration. `;
    } else {
      intro += `Fortunately for households in the ${regionName} region, this relatively low mineral count minimizes severe limescale risks. `;
    }

    if (isLargeCity) {
      intro += `As a major urban center supporting over ${(population / 1000000).toFixed(1)} million people, the local water treatment facilities maintain strict hygiene standards, though the dissolved calcium remains intact.`;
    } else {
      intro += `Local water facilities ensure safe drinking standards for the community, though the natural calcium composition remains untreated upon reaching your taps.`;
    }

    return intro;
  }

  // Fallback or add other languages (de, fr, es) here later...
  return `The water hardness in ${name} is ${hardness_mg_l} mg/L.`; 
}