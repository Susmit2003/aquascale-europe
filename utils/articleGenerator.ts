import { Location } from '@/types';

export function generateUniqueArticle(location: Location, allLocations: Location[], subcategory: string): string[] {
  const regionalCities = allLocations.filter(l => l.region_slug === location.region_slug);
  const regionAvg = Math.round(regionalCities.reduce((acc, curr) => acc + curr.hardness_mg_l, 0) / regionalCities.length);
  
  const diffFromRegion = location.hardness_mg_l - regionAvg;
  const isHarderThanRegion = diffFromRegion > 0;
  const percentageDiff = Math.abs(Math.round((diffFromRegion / regionAvg) * 100));

  const paragraphs: string[] = [];

  // --- PARAGRAPH 1: The Data-Driven Introduction ---
  let intro = `When evaluating water quality in ${location.name}, the most critical metric is the concentration of dissolved calcium and magnesium. `;
  intro += `Recent municipal readings place ${location.name}'s water hardness at exactly ${location.hardness_mg_l} mg/L. `;
  
  // The mathematical branch that makes the text unique
  if (percentageDiff > 5) {
    intro += `Interestingly, this means the water flowing through ${location.name} is approximately ${percentageDiff}% ${isHarderThanRegion ? 'harder' : 'softer'} than the broader ${location.region_slug.replace('-', ' ')} regional average of ${regionAvg} mg/L. `;
  } else {
    intro += `This aligns very closely with the broader ${location.region_slug.replace('-', ' ')} regional average of ${regionAvg} mg/L, indicating a highly consistent geological water source for the area. `;
  }
  paragraphs.push(intro);

  // --- PARAGRAPH 2: Subcategory Specific Insights ---
  if (subcategory === 'dishwasher-settings') {
    let applianceText = `For the ${location.population.toLocaleString()} residents living in ${location.name}, this specific mineral profile directly impacts daily appliance usage. `;
    if (location.hardness_mg_l > 150) {
      applianceText += `Because the water heavily exceeds the 150 mg/L threshold, dishwashers are at a severe risk of calcification. Without intervention, heating elements will degrade faster, and energy consumption will spike as the machine works harder to push heat through layers of limescale. `;
    } else {
      applianceText += `Because the hardness remains relatively manageable under 150 mg/L, rapid calcification is less of an immediate threat, though long-term buildup remains a factor for high-temperature wash cycles. `;
    }
    paragraphs.push(applianceText);
  }

  if (subcategory === 'skin-care-hard-water') {
    let healthText = `Dermatologically, ${location.name}'s specific mineral count of ${location.hardness_mg_l} mg/L plays a hidden role in daily skincare routines. `;
    if (location.hardness_mg_l > 120) {
      healthText += `The high calcium levels react with the fatty acids in standard soaps, creating an insoluble residue often referred to as 'soap scum'. This residue can disrupt the skin's natural acid mantle, meaning residents in ${location.name} may require more intensive moisturizers to combat trans-epidermal water loss. `;
    } else {
      healthText += `Fortunately, this softer mineral profile allows soaps and shampoos to lather efficiently without leaving heavy, pore-clogging residues on the epidermis, preserving the skin's natural moisture barrier. `;
    }
    paragraphs.push(healthText);
  }

  // --- PARAGRAPH 3: The Economic/Actionable Conclusion ---
  let conclusion = `Ultimately, understanding local data is the first step in home optimization. `;
  if (location.population > 200000) {
    conclusion += `In a major urban environment like ${location.name}, scaling issues in plumbing infrastructure are a known factor for property managers. `;
  }
  conclusion += `Adapting your household routines to match the precise ${location.hardness_mg_l} mg/L metric will significantly extend the lifespan of your plumbing and improve daily water utility.`;
  paragraphs.push(conclusion);

  return paragraphs;
}