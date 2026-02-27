// app/[lang]/page.tsx
import Link from 'next/link';
import { SupportedLanguage, Location } from '@/types';
import computedLocationsData from '@/data/locations-computed.json';
import { Map, Star } from 'lucide-react';

const allLocations = computedLocationsData as Location[];

// Map languages to their primary native countries
const primaryCountriesMap: Record<string, string[]> = {
  en: ['united-kingdom', 'ireland'],
  de: ['germany', 'austria', 'switzerland'],
  fr: ['france', 'belgium', 'luxembourg', 'switzerland'],
  es: ['spain']
};

export default async function LocalizedHomepage({ params }: { params: Promise<{ lang: SupportedLanguage }> }) {
  const { lang } = await params;
  
  // Extract all unique countries
  const uniqueCountries = Array.from(new Set(allLocations.map(loc => loc.country_slug))).sort();
  
  // Split into "Primary" (matching the language) and "Other"
  const targetLocales = primaryCountriesMap[lang] || [];
  const highlightedCountries = uniqueCountries.filter(c => targetLocales.includes(c));
  const otherCountries = uniqueCountries.filter(c => !targetLocales.includes(c));

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8 mt-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          European Water Quality Directory
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select a country below to explore localized water hardness data, limescale impact reports, and appliance optimization guides.
        </p>
      </div>
      
      {/* 1. Highlighted / Native Countries */}
      {highlightedCountries.length > 0 && (
        <div className="mb-12 border-b border-gray-200 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> 
            Popular in this Language
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {highlightedCountries.map(country => (
              <Link 
                key={country}
                href={`/${lang}/${country}`}
                className="group bg-blue-50 p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="capitalize font-bold text-blue-900 text-lg m-0">
                    {country.replace(/-/g, ' ')}
                  </h2>
                  <span className="text-sm text-blue-700 mt-1 block font-medium">View regions →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. Rest of Europe (Crucial for SEO) */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore All of Europe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherCountries.map(country => (
            <Link 
              key={country}
              href={`/${lang}/${country}`}
              className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all flex items-center justify-between"
            >
              <span className="capitalize font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {country.replace(/-/g, ' ')}
              </span>
              <span className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}