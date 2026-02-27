import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/locations.json');
const outPath = path.join(__dirname, '../data/locations-computed.json');

const locations = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Haversine formula to calculate distance between coordinates in km
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

console.log('🚀 Pre-computing nearby cities for SEO silos...');

const computedLocations = locations.map(loc => {
  const distances = locations
    .filter(l => l.id !== loc.id) // Exclude self
    .map(l => ({
      id: l.id,
      distance: getDistance(loc.coords.lat, loc.coords.lng, l.coords.lat, l.coords.lng)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5); // Take top 5 closest

  return {
    ...loc,
    nearby_locations: distances.map(d => d.id)
  };
});

fs.writeFileSync(outPath, JSON.stringify(computedLocations, null, 2));
console.log(`✅ Successfully generated ${computedLocations.length} locations to locations-computed.json`);