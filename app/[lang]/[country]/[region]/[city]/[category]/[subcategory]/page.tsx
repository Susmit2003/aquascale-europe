import { notFound } from 'next/navigation';
import computedLocationsData from '@/data/locations-computed.json';
import { Location, SupportedLanguage } from '@/types';
import { LOCAL_TOPICS } from '@/config/taxonomy';
import Breadcrumbs from '@/components/Breadcrumbs';
import ComparisonChart from '@/components/ComparisonChart';
import { generateUniqueArticle } from '@/utils/articleGenerator';

const allLocations = computedLocationsData as Location[];

export const dynamicParams = false;

interface Props {
  params: Promise<{ 
    lang: SupportedLanguage; 
    country: string; 
    region: string; 
    city: string;
    category: string;
    subcategory: string;
  }>;
}

export async function generateStaticParams() {
  const languages: SupportedLanguage[] = ['en', 'de', 'fr', 'es'];
  const params: any[] = [];

  const localTopicsEntries = Object.entries(LOCAL_TOPICS) as [
    string,
    { slug: string; subcategories: string[] }
  ][];

  for (const lang of languages) {
    for (const loc of allLocations) {
      for (const [catKey, catData] of localTopicsEntries) {
        for (const sub of catData.subcategories) {
          params.push({
            lang,
            country: loc.country_slug,
            region: loc.region_slug,
            city: loc.name.toLowerCase(),
            category: catData.slug, // Uses 'health-and-wellness'
            subcategory: sub,
          });
        }
      }
    }
  }
  return params;
}

export default async function SubcategoryPage({ params }: Props) {
  const { lang, country, region, city, category, subcategory } = await params;
  
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  // 🚨 FIXED VALIDATION: Find the topic by its slug ('health-and-wellness') instead of its object key ('health')
  const validTopic = Object.values(LOCAL_TOPICS).find(t => t.slug === category);
  
  if (!location || !validTopic || !validTopic.subcategories.includes(subcategory)) {
    return notFound();
  }

  const articleParagraphs = generateUniqueArticle(location, allLocations, subcategory);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
    { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
    { label: location.name, href: `/${lang}/${country}/${region}/${city}` },
    { label: category.replace(/-/g, ' '), href: `/${lang}/${country}/${region}/${city}/${category}` },
    { label: subcategory.replace(/-/g, ' '), href: '#' }
  ];

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <Breadcrumbs items={breadcrumbs} />
      
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold capitalize mb-4 text-gray-900 leading-tight">
          {subcategory.replace(/-/g, ' ')} in {location.name}
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          A Data-Driven Guide based on {location.hardness_mg_l} mg/L Municipal Water Quality.
        </p>
      </header>

      <ComparisonChart currentCity={location} allLocations={allLocations} />

      <article className="prose prose-lg prose-blue max-w-none mt-10">
        {articleParagraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-6">
            {paragraph}
          </p>
        ))}
      </article>

      <div className="my-12 p-4 bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center min-h-[100px]">
        <span className="text-gray-400 text-sm font-mono">[AdSense Responsive Display Unit]</span>
      </div>

      {subcategory === 'dishwasher-settings' && (
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl mt-8">
          <h2 className="text-2xl font-bold mb-2">Machine Calibration</h2>
          <p className="text-gray-800">
            Set your internal dial to <strong>{(location.hardness_mg_l * 0.056).toFixed(1)} °dH</strong> (German Degrees) 
            to perfectly match the local {location.name} supply and prevent heating element burnout.
          </p>
        </div>
      )}

      {/* Adding a default call to action for health/plumbing pages */}
      {(subcategory === 'skin-care-hard-water' || subcategory === 'hair-care-hard-water') && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl mt-8">
          <h2 className="text-2xl font-bold mb-2 text-green-900">Recommended Solution</h2>
          <p className="text-green-800">
            With a hardness level of {location.hardness_mg_l} mg/L, installing a localized shower filter can drastically reduce mineral buildup on your skin and hair.
          </p>
        </div>
      )}
    </main>
  );
}