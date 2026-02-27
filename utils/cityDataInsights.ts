// utils/cityDataInsights.ts

import { Location } from '@/types';

export interface CityInsights {
  germanDegrees: string;
  hardnessCategory: string;
  scaleRisk: string;
  deltaFromRegion: number;
  regionRank: number;
  totalRegionMonitored: number;
}

export function generateCityInsights(location: Location, allLocations: Location[]): CityInsights {
  // Convert mg/L to German Degrees (°dH)
  const germanDegrees = (location.hardness_mg_l * 0.056).toFixed(1);
  
  // Calculate regional context
  const regionLocations = allLocations
    .filter(l => l.region_slug === location.region_slug)
    .sort((a, b) => b.hardness_mg_l - a.hardness_mg_l);
    
  const regionRank = regionLocations.findIndex(l => l.id === location.id) + 1;
  const regionAvg = Math.round(
    regionLocations.reduce((acc, curr) => acc + curr.hardness_mg_l, 0) / (regionLocations.length || 1)
  );
  
  const deltaFromRegion = location.hardness_mg_l - regionAvg;
  
  return {
    germanDegrees,
    hardnessCategory: getHardnessCategory(location.hardness_mg_l),
    scaleRisk: calculateScaleRisk(location.hardness_mg_l),
    deltaFromRegion,
    regionRank,
    totalRegionMonitored: regionLocations.length
  };
}

// Pure functions for strict categorization
function getHardnessCategory(mgL: number): string {
  if (mgL < 60) return "Soft";
  if (mgL < 120) return "Moderately Hard";
  if (mgL < 180) return "Hard";
  return "Very Hard";
}

function calculateScaleRisk(mgL: number): string {
  if (mgL < 60) return "Negligible";
  if (mgL < 120) return "Low to Moderate";
  if (mgL < 180) return "High";
  return "Severe";
}