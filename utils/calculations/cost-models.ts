// utils/calculations/cost-models.ts
export type BoilerType = 'electric' | 'gas' | 'combi' | 'heat_pump';

export interface HouseholdContext {
  size: number;
  boilerType: BoilerType;
  kwhPrice: number;
  hardnessMgL: number;
  applianceFrequency: 'low' | 'medium' | 'high';
}

export interface CostProjection {
  extraEnergyCostEur: number;
  lifespanReductionPercent: number;
  annualDescalingCostEur: number;
  fiveYearProjection: number[];
}

const SCALE_ACCUMULATION_RATE = 0.0015; // mm per mg/L per year
const EFFICIENCY_DROP_PER_MM = 0.05; // 5% efficiency loss per mm of scale

export function calculateAnnualImpact(ctx: HouseholdContext): CostProjection {
  // Base energy consumption baseline (kWh/year for water heating)
  const baseEnergy = ctx.size * 800; 
  
  // Calculate scale buildup
  const scaleThickness = ctx.hardnessMgL * SCALE_ACCUMULATION_RATE;
  const efficiencyLoss = Math.min(scaleThickness * EFFICIENCY_DROP_PER_MM, 0.25); // Cap at 25%
  
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
    return Number(((extraEnergyCostEur * year * 1.05) + (annualDescalingCostEur * year)).toFixed(2));
  });

  return {
    extraEnergyCostEur: Number(extraEnergyCostEur.toFixed(2)),
    lifespanReductionPercent: Number(lifespanReductionPercent.toFixed(1)),
    annualDescalingCostEur: Number(annualDescalingCostEur.toFixed(2)),
    fiveYearProjection
  };
}