/**
 * Generates a deterministic integer based on a string (like a city name).
 * This ensures "Berlin" always gets the same variation, but "Munich" gets a different one.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

/**
 * Deterministically selects a phrase from an array based on the seed string.
 */
export function spinText(seed: string, options: string[]): string {
  const index = hashString(seed) % options.length;
  return options[index];
}

// Example usage arrays for your City Pages:
export const introVariations = [
  "The municipal water supply in {city} is currently measured at a base hardness of {mg} mg/L.",
  "If you live in {city}, you should know that the local tap water contains {mg} mg/L of dissolved minerals.",
  "Recent data indicates that the calcium and magnesium concentration for {city} tap water is {mg} mg/L.",
  "Water flowing through the residential pipes of {city} has been classified with a hardness level of {mg} mg/L."
];