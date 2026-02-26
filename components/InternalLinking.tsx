import Link from 'next/link';
import { Location, SupportedLanguage, Translations } from '@/types';
import { getNearbyCities, convertHardness, getLocalUnit } from '@/utils/calculations';
import locationsData from '@/data/locations.json';
import translationsData from '@/data/translations.json';

const allLocations = locationsData as Location[];
const translations = translationsData as unknown as Translations;

export default function InternalLinking({ currentCity, lang }: { currentCity: Location, lang: SupportedLanguage }) {
  const nearbyCities = getNearbyCities(currentCity, allLocations);
  
  // 1. Fetch Localized Dictionary & Unit
  const t = translations[lang] || translations['en'];
  const localUnit = getLocalUnit(lang);

  return (
    <nav className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="text-xl font-bold mb-4 text-gray-900">{t.nearby_cities}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {nearbyCities.map(city => {
          // Convert the metric for each nearby city link
          const localHardness = convertHardness(city.hardness_mg_l, localUnit);
          const unitString = localUnit === 'mg/L' ? 'mg/L' : `°${localUnit}`;

          return (
            <Link 
              key={city.id} 
              href={`/${lang}/${city.country_slug}/${city.region_slug}/${city.name.toLowerCase()}`}
              className="group flex flex-col p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="font-semibold text-gray-800 group-hover:text-blue-700">
                {city.name}
              </span>
              <span className="text-sm text-gray-500 mt-1">
                {localHardness} {unitString}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}