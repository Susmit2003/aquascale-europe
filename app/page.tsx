import { Metadata } from 'next';
import Link from 'next/link';
import { Location } from '@/types';
import locationsData from '@/data/locations.json';
// import AdUnit from '@/components/AdUnit';

const allLocations = locationsData as Location[];

export const metadata: Metadata = {
  title: 'AquaScale Europe | Find Water Hardness in Your City',
  description: 'The ultimate directory for European water hardness data. Find exact mg/L, °dH, and °fH values to protect your home appliances and skin.',
};

export default function Home() {
  // 1. Group locations by country for our SEO directory
  const locationsByCountry = allLocations.reduce((acc, loc) => {
    if (!acc[loc.country_slug]) {
      acc[loc.country_slug] = [];
    }
    acc[loc.country_slug].push(loc);
    return acc;
  }, {} as Record<string, Location[]>);

  // Sort countries alphabetically
  const sortedCountries = Object.keys(locationsByCountry).sort();

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 bg-blue-50 rounded-3xl mb-12 border border-blue-100">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6">
          Is Your Water <span className="text-blue-600">Destroying</span> Your Appliances?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Search over 50,000 European cities to find exact water hardness levels, get precise dishwasher settings, and discover local solutions.
        </p>
      </section>

      {/* <AdUnit slot="header" /> */}

      {/* The SEO Directory - Passing Link Equity Downward */}
      <section className="my-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Browse by Country</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCountries.map(countrySlug => {
            // Sort cities within the country by population to show the top ones first
            const cities = locationsByCountry[countrySlug]
              .sort((a, b) => b.population - a.population)
              .slice(0, 5); // Show top 5 cities per country as a preview

            // Format country name for display (e.g., 'united-kingdom' -> 'United Kingdom')
            const displayCountry = countrySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            return (
              <div key={countrySlug} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📍 {displayCountry}
                </h3>
                <ul className="space-y-2">
                  {cities.map(city => (
                    <li key={city.id}>
                      {/* Defaulting to English ('/en/') routing from the global homepage */}
                      <Link 
                        href={`/en/${countrySlug}/${city.region_slug}/${city.name.toLowerCase()}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm flex justify-between"
                      >
                        <span>{city.name}</span>
                        <span className="text-gray-400 text-xs">{city.hardness_mg_l} mg/L</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-50">
                  {/* A real pSEO site would have a dedicated country hub page here */}
                  <span className="text-xs text-gray-400 cursor-not-allowed">
                    View all {locationsByCountry[countrySlug].length} cities →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* <AdUnit slot="content" /> */}

      {/* Paste this at the bottom of app/[lang]/page.tsx (or your main index page) */}
<article className="mt-24 prose prose-lg prose-blue max-w-none text-gray-700 border-t border-gray-200 pt-16">
  <h2 className="text-3xl font-extrabold text-gray-900">The State of European Water Quality in 2026</h2>
  
  <p>
    Access to clean, safe municipal water is a hallmark of modern European infrastructure. However, while the safety of the water is universally regulated, the <em>chemical composition</em>—specifically the mineral density—varies drastically street by street. AquaScale Europe was engineered to bridge the gap between complex municipal utility reports and actionable data for everyday homeowners, installers, and property managers.
  </p>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">Beyond the Tap: Why Local Water Hardness Actually Matters</h3>
  <p>
    Most consumers only think about water hardness when dealing with aesthetic issues: stubborn limescale rings around the bathtub, cloudy drinking glasses, or the feeling of dry, irritated skin after a shower. Yet, the invisible impact of hard water is significantly more severe. 
  </p>
  <p>
    High concentrations of dissolved calcium and magnesium act as silent destroyers of modern home infrastructure. As Europe pushes toward greener, highly-efficient home heating solutions, these sensitive thermal systems are increasingly vulnerable to scale-induced failure. Understanding your local water profile is no longer a luxury—it is a mandatory step in responsible home maintenance and energy conservation.
  </p>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">The Problem with Generic "National" Water Data</h3>
  <p>
    Historically, consumers looking to calibrate their dishwashers or evaluate the need for a whole-house water filtration system were forced to rely on generalized national maps. These maps paint entire countries with a broad brush, ignoring the complex, localized nature of water sourcing. 
  </p>
  <p>
    For example, one municipality might draw surface water from a local river (resulting in soft water), while a neighboring district just 10 kilometers away might draw from a deep chalk aquifer (resulting in extremely hard water). Generic data leads to incorrect appliance calibration, wasted detergent, and unoptimized energy consumption.
  </p>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">How AquaScale Europe Aggregates Municipal Intelligence</h3>
  <p>
    AquaScale Europe operates the continent's most comprehensive and granular database of municipal water hardness. By aggregating thousands of localized water quality reports, translating varied measurement units (°dH, °fH, °e) into a universal standard (mg/L), and applying advanced digital interpolation, we provide exact, address-level insights.
  </p>
  <p>
    Whether you are an installer generating an ROI report for a client, a café owner calibrating an espresso machine for optimal taste extraction, or a homeowner trying to extend the lifespan of your combi-boiler, our platform delivers the precise data required to make informed, financially sound decisions. 
  </p>
</article>
      
    </main>
  );
}