import { notFound } from 'next/navigation';
import Link from 'next/link';
import computedLocationsData from '@/data/locations-computed.json';
import { Location, SupportedLanguage } from '@/types';

const allLocations = computedLocationsData as Location[];
// export const dynamicParams = false;

interface Props {
  params: Promise<{ lang: SupportedLanguage; country: string }>;
}
// export const runtime = 'edge';
export async function generateStaticParams() {
  const languages: SupportedLanguage[] = ['en', 'de', 'fr', 'es'];
  const params: any[] = [];
  
  // Extract unique countries
  const uniqueCountries = Array.from(new Set(allLocations.map(l => l.country_slug)));

  for (const lang of languages) {
    for (const country of uniqueCountries) {
      params.push({ lang, country });
    }
  }
  return params;
}

export default async function CountryHub({ params }: Props) {
  const { lang, country } = await params;
  
  // Get all cities for this country
  const countryCities = allLocations.filter(l => l.country_slug === country);
  if (countryCities.length === 0) return notFound();

  // Extract unique regions for this country
  const uniqueRegions = Array.from(new Set(countryCities.map(l => l.region_slug)));

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold capitalize mb-8">Water Hardness in {country.replace('-', ' ')}</h1>
      
      <h2 className="text-2xl font-semibold mb-4">Regions</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {uniqueRegions.map(region => (
          <li key={region}>
            <Link 
              href={`/${lang}/${country}/${region}`}
              className="block p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300"
            >
              <span className="capitalize text-blue-700 font-medium">{region.replace('-', ' ')}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}