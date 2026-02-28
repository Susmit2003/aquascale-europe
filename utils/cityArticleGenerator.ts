// utils/cityArticleGenerator.ts
import { Location, SupportedLanguage } from '@/types';
import { t } from '@/utils/d2t';

function getHardnessCategory(mgL: number, lang: SupportedLanguage): string {
  if (mgL < 60) return t('soft', lang);
  if (mgL < 120) return t('medium', lang); 
  if (mgL < 180) return t('hard', lang);
  return t('very_hard', lang);
}

export function generateCityDataSummary(location: Location, lang: SupportedLanguage): string {
  const { name, hardness_mg_l, source_utility } = location;
  const germanDegrees = (hardness_mg_l * 0.056).toFixed(1);
  const category = getHardnessCategory(hardness_mg_l, lang);
  const provider = source_utility || 'local municipal authorities';
  
  // Basic hardcoded translations for the summary sentence
  if (lang === 'de') {
    return `Nach aktuellen Wasserqualitätsdaten von ${provider} beträgt die gemessene Wasserhärte in ${name} ${hardness_mg_l} mg/L (ca. ${germanDegrees} °dH), was nach europäischen hydrochemischen Richtlinien offiziell als ${category} eingestuft wird.`;
  }
  
  if (lang === 'fr') {
    return `Selon les données actuelles sur la qualité de l'eau fournies par ${provider}, la dureté de l'eau mesurée à ${name} est de ${hardness_mg_l} mg/L (environ ${germanDegrees} °dH), ce qui est officiellement classé comme ${category} selon les directives hydrochimiques européennes.`;
  }
  
  if (lang === 'es') {
    return `Según los datos actuales de calidad del agua proporcionados por ${provider}, la dureza del agua medida en ${name} es de ${hardness_mg_l} mg/L (aproximadamente ${germanDegrees} °dH), lo que se clasifica oficialmente como ${category} bajo las directrices hidroquímicas europeas.`;
  }

  // English Fallback
  return `According to current water quality data provided by ${provider}, the measured water hardness in ${name} is ${hardness_mg_l} mg/L (approximately ${germanDegrees} °dH), which is officially classified as ${category} under European hydro-chemical guidelines.`;
}