// types/index.ts

// 1. Core Measurement Types
export type HardnessUnit = 'mg/L' | 'dH' | 'fH' | 'e' | 'mmol/L';

// 2. Core Data Models
export interface Location {
  id: string;
  name: string;
  native_name: string;
  country_slug: string;
  region_slug: string;
  hardness_mg_l: number;
  coords: {
    lat: number;
    lng: number;
  };
  population: number;
  // Added for pre-computed internal linking silo
  nearby_locations?: string[]; 
  source_utility: string;
  source_url?: string;
}

// 3. i18n Types
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

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}