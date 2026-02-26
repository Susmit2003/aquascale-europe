import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Location, SupportedLanguage, Translations } from '@/types';
import locationsData from '@/data/locations.json';
import translationsData from '@/data/translations.json';
import InternalLinking from '@/components/InternalLinking';
import HardnessGauge from '@/components/HardnessGauge';
import Breadcrumbs from '@/components/Breadcrumbs';

// 🚨 NEW: Import your Spintax utility to defeat the AI/Spam filters
import { spinText, introVariations } from '@/utils/spintax';

const allLocations = locationsData as Location[];
const translations = translationsData as unknown as Translations;

export const dynamicParams = true;
export const revalidate = 604800; // ISR cache for 7 days

interface PageProps {
  params: Promise<{ lang: SupportedLanguage; country: string; region: string; city: string }>;
}

export async function generateStaticParams() {
  const topCities = allLocations.sort((a, b) => b.population - a.population).slice(0, 100);
  return topCities.map((loc) => ({
    lang: 'en',
    country: loc.country_slug,
    region: loc.region_slug,
    city: loc.name.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, country, region, city } = await params;
  const baseUrl = 'https://aquascale-europe.com';
  
  const decodedCity = decodeURIComponent(city);
  const displayCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
  
  return {
    title: `${displayCity} Water Hardness | AquaScale Europe`,
    description: `Check the exact water hardness level, appliance settings, and solutions for ${displayCity}, ${country}.`,
    alternates: {
      canonical: `${baseUrl}/${lang}/${country}/${region}/${city}`,
      languages: {
        'en': `${baseUrl}/en/${country}/${region}/${city}`,
        'de': `${baseUrl}/de/${country}/${region}/${city}`,
        'fr': `${baseUrl}/fr/${country}/${region}/${city}`,
        'es': `${baseUrl}/es/${country}/${region}/${city}`,
      },
    },
  };
}

export default async function CityDashboard({ params }: PageProps) {
  const { lang, city, country, region } = await params;
  
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  const t = translations[lang] || translations['en'];
  const isHardWater = location.hardness_mg_l > 120;

  // Breadcrumb Path
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: location.country_slug.replace('-', ' '), href: `/${lang}/${location.country_slug}` },
    { label: location.region_slug.replace('-', ' '), href: `/${lang}/${location.country_slug}/${location.region_slug}` },
    { label: location.name, href: `/${lang}/${location.country_slug}/${location.region_slug}/${location.name.toLowerCase()}` }
  ];

  // 🚨 NEW: Generate the programmatic spun text for AdSense compliance
  // This ensures Berlin's HTML footprint looks structurally different from Paris's
  const introParagraph = spinText(location.name, introVariations)
    .replace('{city}', location.name)
    .replace('{mg}', location.hardness_mg_l.toString());

  // JSON-LD Schema (Dataset & FAQ)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question',
      name: `What is the water hardness in ${location.name}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `The base water hardness in ${location.name} is ${location.hardness_mg_l} mg/L CaCO3.`
      }
    }]
  };

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <header className="mb-10 text-center md:text-left">
        <Breadcrumbs items={breadcrumbItems} />
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-4">
          {t.water_hardness_in} {location.name}
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-wide">
          {location.region_slug.replace('-', ' ')} • {location.native_name}
        </p>

        {/* 🚨 NEW: Inject the spun text right at the top for maximum SEO value */}
        <p className="text-xl text-gray-700 mt-6 leading-relaxed max-w-3xl border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-3 rounded-r-lg">
          {introParagraph}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <section className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
          <HardnessGauge hardnessMgL={location.hardness_mg_l} lang={lang} />
        </section>

        <aside className="col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{t.recommended_solutions}</h2>
          
          {isHardWater ? (
            <div className="bg-red-50 p-5 rounded-xl border border-red-100 shadow-sm">
              <p className="text-red-800 font-medium mb-4">⚠️ {t.hard_water_warning}</p>
            </div>
          ) : (
            <div className="bg-green-50 p-5 rounded-xl border border-green-100 shadow-sm">
              <p className="text-green-800 font-medium mb-4">✅ {t.soft_water_ok}</p>
            </div>
          )}
        </aside>
      </div>

      <InternalLinking currentCity={location} lang={lang} />
    </main>
  );
}