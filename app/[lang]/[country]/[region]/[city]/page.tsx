import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Location, SupportedLanguage } from '@/types';
import computedLocationsData from '@/data/locations-computed.json';
import { LOCAL_TOPICS } from '@/config/taxonomy';

// Components
import Breadcrumbs from '@/components/Breadcrumbs';
import HardnessGauge from '@/components/HardnessGauge';
import ComparisonChart from '@/components/ComparisonChart';
import ApplianceCalculator from '@/components/ApplianceCalculator';
import InternalLinking from '@/components/InternalLinking';
import { generateCityHubArticle } from '@/utils/cityArticleGenerator';

const allLocations = computedLocationsData as Location[];
export const dynamicParams = false; 

interface PageProps {
  params: Promise<{ lang: SupportedLanguage; country: string; region: string; city: string }>;
}

export async function generateStaticParams() {
  const languages: SupportedLanguage[] = ['en', 'de', 'fr', 'es'];
  const params: any[] = [];
  for (const lang of languages) {
    for (const loc of allLocations) {
      params.push({
        lang,
        country: loc.country_slug,
        region: loc.region_slug,
        city: loc.name.toLowerCase(),
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, country } = await params;
  const decodedCity = decodeURIComponent(city);
  const displayCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  return {
    title: `${displayCity} Water Hardness (2026) | Exact mg/L & Limescale Guide`,
    description: `Complete water quality report for ${displayCity}. Discover the exact hardness (${location?.hardness_mg_l} mg/L), appliance settings, and solutions.`,
  };
}

export default async function CityDashboard({ params }: PageProps) {
  const { lang, city, country, region } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  // 1. Generate Unique Content
  const articleParagraphs = generateCityHubArticle(location, allLocations);
  const introParagraph = articleParagraphs.shift(); // Take the first paragraph for the top

  // 2. Breadcrumbs
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
    { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
    { label: location.name, href: '#' }
  ];

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8">
      
      {/* 1. Header & Intro */}
      <header className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-6">
          Water Hardness in {location.name}
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-wide">
          {location.region_slug.replace(/-/g, ' ')} Region • Population: {location.population.toLocaleString()}
        </p>
        <p className="text-xl text-gray-700 mt-6 leading-relaxed max-w-3xl border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-3 rounded-r-lg">
          {introParagraph}
        </p>
      </header>

      {/* 2. Primary Data Visualization (Gauge & Chart Side-by-Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="flex justify-center items-start">
          <HardnessGauge hardnessMgL={location.hardness_mg_l} lang={lang} />
        </div>
        <div className="mt-[-2rem]"> 
          <ComparisonChart currentCity={location} allLocations={allLocations} />
        </div>
      </div>

      {/* 3. The Interactive Calculator (Massive SEO UX Signal) */}
      <ApplianceCalculator cityName={location.name} hardnessMgL={location.hardness_mg_l} />

      {/* AdSense Slot */}
      <div className="my-10 w-full bg-gray-50 border border-gray-200 p-4 text-center text-gray-400 text-sm">
        [ AdSense Display Unit - Mid Article ]
      </div>

      {/* 4. Deep Dive Hubs (Internal Reverse Silo Links) */}
      <section className="mt-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Deep Dive Guides for {location.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(LOCAL_TOPICS).map(([key, topic]) => (
            <div key={key} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold capitalize text-blue-900 mb-3">
                {topic.slug.replace(/-/g, ' ')}
              </h3>
              <ul className="space-y-2">
                {topic.subcategories.slice(0, 4).map(sub => (
                  <li key={sub}>
                    <Link 
                      href={`/${lang}/${country}/${region}/${city}/${topic.slug}/${sub}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium capitalize"
                    >
                      → {sub.replace(/-/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Comprehensive Article Conclusion */}
      <article className="prose prose-lg prose-blue max-w-none mb-12 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Water Quality Analysis</h2>
        {articleParagraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-6">
            {paragraph}
          </p>
        ))}
      </article>

      {/* 6. Geographic Silo (Nearby Cities) */}
      <InternalLinking 
        currentCity={location} 
        nearbyIds={location.nearby_locations} 
        allLocations={allLocations} 
        lang={lang} 
      />
    </main>
  );
}