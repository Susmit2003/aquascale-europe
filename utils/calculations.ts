import { Location, HardnessUnit } from '@/types';

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