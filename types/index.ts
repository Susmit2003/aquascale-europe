export interface Coords {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  native_name: string;
  country_slug: string;
  region_slug: string;
  hardness_mg_l: number;
  coords: Coords;
  population: number;
}

export type HardnessUnit = 'mg/L' | 'dH' | 'fH' | 'e' | 'mmol/L';

// --- NEW i18n TYPES ---

export type SupportedLanguage = 'en' | 'de' | 'fr' | 'es';

export interface TranslationDictionary {
  water_hardness_in: string;
  nearby_cities: string;
  base_unit: string;
  local_unit: string;
  soft: string;
  medium: string;
  hard: string;
  very_hard: string;
  recommended_solutions: string;
  hard_water_warning: string;
  soft_water_ok: string;
}

export type Translations = Record<SupportedLanguage, TranslationDictionary>;