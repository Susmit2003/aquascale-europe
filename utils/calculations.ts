import { Location, HardnessUnit } from '@/types';

// ==========================================
// ORIGINAL AQUASCALE FUNCTIONS
// ==========================================

// A. Universal Hardness Converter
export function convertHardness(mg_l: number, target_unit: HardnessUnit): number {
  switch (target_unit) {
    case 'dH': return Number((mg_l * 0.056).toFixed(2));
    case 'fH': return Number((mg_l * 0.1).toFixed(2));
    case 'e': return Number((mg_l * 0.07).toFixed(2));
    case 'mmol/L': return Number((mg_l * 0.01).toFixed(2));
    case 'mg/L': default: return mg_l;
  }
}

// C. Language to Local Unit Mapper
export function getLocalUnit(lang: string): HardnessUnit {
  switch (lang) {
    case 'de': return 'dH';
    case 'fr': return 'fH';
    case 'en': return 'e'; // English degrees (Clark degrees)
    default: return 'mg/L';
  }
}

// B. Haversine Formula for Proximity Routing
export function getNearbyCities(currentLocation: Location, allLocations: Location[], limit: number = 10): Location[] {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const distances = allLocations
    .filter(loc => loc.id !== currentLocation.id) // Exclude self
    .map(loc => {
      const dLat = toRad(loc.coords.lat - currentLocation.coords.lat);
      const dLon = toRad(loc.coords.lng - currentLocation.coords.lng);
      
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(currentLocation.coords.lat)) * Math.cos(toRad(loc.coords.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return { ...loc, distance };
    });

  return distances.sort((a, b) => a.distance - b.distance).slice(0, limit);
}

// ==========================================
// NEW ENTERPRISE FEATURES (PHASE 1 & 10)
// ==========================================

export type BoilerType = 'electric' | 'gas' | 'combi' | 'heat_pump';
export type UsageFrequency = 'low' | 'medium' | 'high';

export interface HouseholdContext {
  size: number;
  boilerType: BoilerType;
  kwhPrice: number;
  hardnessMgL: number;
  applianceFrequency: UsageFrequency;
}

export interface CostProjection {
  extraEnergyCostEur: number;
  lifespanReductionPercent: number;
  annualDescalingCostEur: number;
  fiveYearProjection: number[];
}

export function calculateAnnualImpact(ctx: HouseholdContext): CostProjection {
  // Base energy consumption baseline (kWh/year for water heating per person)
  const baseMultiplier = ctx.boilerType === 'electric' ? 800 :
                         ctx.boilerType === 'combi' ? 700 :
                         ctx.boilerType === 'gas' ? 600 : 400; // heat_pump
  
  const baseEnergy = ctx.size * baseMultiplier; 
  
  // Scale buildup: ~0.0015mm per mg/L per year
  const scaleThickness = ctx.hardnessMgL * 0.0015;
  
  // 5% efficiency loss per mm of scale, capped at 25% max realistic drop
  const efficiencyLoss = Math.min(scaleThickness * 0.05, 0.25); 
  
  // Extra energy cost
  const extraEnergyCostEur = (baseEnergy * efficiencyLoss) * ctx.kwhPrice;

  // Lifespan reduction (Heuristic: 1% reduction per 10mg/L over 100mg/L)
  const lifespanReductionPercent = ctx.hardnessMgL > 100 
    ? Math.min(((ctx.hardnessMgL - 100) / 10) * 1, 40) 
    : 0;

  // Maintenance & Descaling products
  const frequencyMultiplier = ctx.applianceFrequency === 'high' ? 1.5 : ctx.applianceFrequency === 'low' ? 0.7 : 1;
  const annualDescalingCostEur = (ctx.hardnessMgL / 50) * 12 * frequencyMultiplier;

  // 5-year compounding projection
  const fiveYearProjection = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    // Assume 5% annual increase in energy prices + linear maintenance costs
    return Number(((extraEnergyCostEur * year * Math.pow(1.05, year)) + (annualDescalingCostEur * year)).toFixed(2));
  });

  return {
    extraEnergyCostEur: Number(extraEnergyCostEur.toFixed(2)),
    lifespanReductionPercent: Number(lifespanReductionPercent.toFixed(1)),
    annualDescalingCostEur: Number(annualDescalingCostEur.toFixed(2)),
    fiveYearProjection
  };
}