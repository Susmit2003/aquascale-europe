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
  params: Promise<{ lang: SupportedLanguage; country: string }>;
}

// 1. Pre-build the country hubs
export async function generateStaticParams() {
  // Extract unique countries
  const uniqueCountries = Array.from(new Set(allLocations.map(loc => loc.country_slug)));
  
  return uniqueCountries.map((country) => ({
    lang: 'en',
    country: country,
  }));
}

// 2. Generate SEO Metadata for the Hub
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, country } = await params;
  const baseUrl = 'https://aquascale-europe.com';
  
  const displayCountry = country.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `Water Hardness in ${displayCountry} | Complete City Directory`,
    description: `Find exact water hardness levels, appliance settings, and shower filters for every region and city in ${displayCountry}.`,
    alternates: {
      canonical: `${baseUrl}/${lang}/${country}`,
      languages: {
        'en': `${baseUrl}/en/${country}`,
        'de': `${baseUrl}/de/${country}`,
        'fr': `${baseUrl}/fr/${country}`,
        'es': `${baseUrl}/es/${country}`,
      },
    },
  };
}

// 3. Main Server Component
export default async function CountryHubPage({ params }: PageProps) {
  const { lang, country } = await params;
  
  // Filter locations to only those in this country
  const countryLocations = allLocations.filter(l => l.country_slug === country);
  
  if (countryLocations.length === 0) return notFound();

  const displayCountry = country.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const t = translations[lang] || translations['en'];

  // Group the cities by Region for a perfectly structured SEO directory
  const locationsByRegion = countryLocations.reduce((acc, loc) => {
    if (!acc[loc.region_slug]) {
      acc[loc.region_slug] = [];
    }
    acc[loc.region_slug].push(loc);
    return acc;
  }, {} as Record<string, Location[]>);

  const sortedRegions = Object.keys(locationsByRegion).sort();

  // Dynamic Breadcrumb Generation
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: displayCountry, href: `/${lang}/${country}` }
  ];

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8">
      <header className="mb-12 border-b pb-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-4 mb-4">
          {t.water_hardness_in} {displayCountry}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Select a region below to view detailed water quality data, optimal dishwasher settings, and skincare recommendations for your specific city.
        </p>
      </header>

      {/* The SEO Silo Directory */}
      <div className="space-y-12 mb-16">
        {sortedRegions.map(regionSlug => {
          const displayRegion = regionSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          // Sort cities alphabetically within the region
          const cities = locationsByRegion[regionSlug].sort((a, b) => a.name.localeCompare(b.name));

          return (
            <section key={regionSlug} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                {displayRegion}
              </h2>
              
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map(city => (
                  <li key={city.id}>
                    <Link 
                      href={`/${lang}/${country}/${regionSlug}/${city.name.toLowerCase()}`}
                      className="group flex flex-col p-3 rounded-lg border border-transparent hover:border-blue-100 hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                        {city.name}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        {city.hardness_mg_l} mg/L
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}