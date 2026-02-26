import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Location, SupportedLanguage, Translations } from '@/types';
import locationsData from '@/data/locations.json';
import translationsData from '@/data/translations.json';
import Breadcrumbs from '@/components/Breadcrumbs';

const allLocations = locationsData as Location[];
const translations = translationsData as unknown as Translations;

export const dynamicParams = true;
export const revalidate = 604800; // ISR cache for 7 days

// Next.js 15 requires params to be a Promise
interface PageProps {
  params: Promise<{ lang: SupportedLanguage; country: string; region: string }>;
}

// 1. Pre-build the highest traffic region hubs
export async function generateStaticParams() {
  // Extract unique country + region combinations
  const uniqueRegions = Array.from(
    new Set(allLocations.map(loc => `${loc.country_slug}|${loc.region_slug}`))
  );
  
  // Pre-build the first 100 regions to save build time
  return uniqueRegions.slice(0, 100).map((combo) => {
    const [country, region] = combo.split('|');
    return {
      lang: 'en',
      country,
      region,
    };
  });
}

// 2. Generate SEO Metadata for the Region Hub
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, country, region } = await params;
  const baseUrl = 'https://aquascale-europe.com';
  
  // Format for display
  const displayCountry = country.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const displayRegion = region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `Water Hardness in ${displayRegion}, ${displayCountry} | Local Data`,
    description: `Check the exact water quality, calcium levels, and optimal appliance settings for all cities in the ${displayRegion} region.`,
    alternates: {
      canonical: `${baseUrl}/${lang}/${country}/${region}`,
      languages: {
        'en': `${baseUrl}/en/${country}/${region}`,
        'de': `${baseUrl}/de/${country}/${region}`,
        'fr': `${baseUrl}/fr/${country}/${region}`,
        'es': `${baseUrl}/es/${country}/${region}`,
      },
    },
  };
}

// 3. Main Server Component
export default async function RegionHubPage({ params }: PageProps) {
  const { lang, country, region } = await params;
  
  // Decode URL parameters just in case they contain special characters
  const decodedCountry = decodeURIComponent(country);
  const decodedRegion = decodeURIComponent(region);
  
  // Filter locations to only those in this specific region
  const regionLocations = allLocations.filter(
    l => l.country_slug === decodedCountry && l.region_slug === decodedRegion
  );
  
  if (regionLocations.length === 0) return notFound();

  // Formatting for UI
  const displayCountry = decodedCountry.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const displayRegion = decodedRegion.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const t = translations[lang] || translations['en'];

  // Sort cities alphabetically for a clean directory UX
  const sortedCities = regionLocations.sort((a, b) => a.name.localeCompare(b.name));

  // Dynamic Breadcrumb Generation
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: displayCountry, href: `/${lang}/${decodedCountry}` },
    { label: displayRegion, href: `/${lang}/${decodedCountry}/${decodedRegion}` }
  ];

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8">
      <header className="mb-12 border-b pb-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-4 mb-4">
          {t.water_hardness_in} {displayRegion}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Browse the cities within {displayRegion}, {displayCountry} below to find exact local water hardness levels and recommended solutions.
        </p>
      </header>

      {/* The Region Directory Grid */}
      <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm mb-16">
        <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Cities in {displayRegion}
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            {sortedCities.length} Locations
          </span>
        </div>
        
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedCities.map(city => (
            <li key={city.id}>
              <Link 
                href={`/${lang}/${decodedCountry}/${decodedRegion}/${city.name.toLowerCase()}`}
                className="group flex flex-col p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all"
              >
                <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {city.name}
                </span>
                <span className="text-sm text-gray-500 mt-1 flex justify-between items-center">
                  <span>{city.hardness_mg_l} mg/L</span>
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}