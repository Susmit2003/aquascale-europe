import { Location } from '@/types';

export function generateCityHubArticle(location: Location, allLocations: Location[]): string[] {
  const paragraphs: string[] = [];
  const germanDegrees = (location.hardness_mg_l * 0.056).toFixed(1);
  
  // Calculate National Averages for unique comparison
  const countryCities = allLocations.filter(l => l.country_slug === location.country_slug);
  const countryAvg = Math.round(countryCities.reduce((acc, curr) => acc + curr.hardness_mg_l, 0) / countryCities.length);
  const isHarderThanNational = location.hardness_mg_l > countryAvg;

  paragraphs.push(
    `The municipal tap water in ${location.name} is characterized by a base hardness of ${location.hardness_mg_l} mg/L (approximately ${germanDegrees} °dH). For the ${location.population.toLocaleString()} residents in the area, understanding this precise mineral composition is the first step toward protecting household infrastructure and optimizing daily water usage.`
  );

  if (Math.abs(location.hardness_mg_l - countryAvg) > 10) {
    paragraphs.push(
      `When compared to the broader national average of ${countryAvg} mg/L, ${location.name}'s water is notably ${isHarderThanNational ? 'harder' : 'softer'}. This geographical variance means that generic, nationwide advice often fails here; appliances and plumbing systems in ${location.name} require localized calibration.`
    );
  } else {
    paragraphs.push(
      `Interestingly, this local reading of ${location.hardness_mg_l} mg/L mirrors the national average of ${countryAvg} mg/L very closely, indicating a consistent regional geology that relies heavily on similar aquifer types.`
    );
  }

  if (location.hardness_mg_l > 140) {
    paragraphs.push(
      `Because the water falls into the 'Hard' category, dissolved calcium and magnesium will aggressively precipitate when heated. This leads to rapid limescale accumulation in boilers, kettles, and showerheads. Proactive scaling management is highly recommended for property owners in ${location.region_slug.replace('-', ' ')}.`
    );
  } else {
    paragraphs.push(
      `Falling into a softer spectrum, the local supply poses a minimal threat of rapid calcification. However, trace minerals are still present, meaning occasional descaling of high-temperature appliances will still maintain peak energy efficiency.`
    );
  }

  return paragraphs;
}