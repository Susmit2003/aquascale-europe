// components/seo/SmartInternalLinks.tsx
import Link from 'next/link';
import { Compass, Link as LinkIcon } from 'lucide-react';

export interface SiblingCity {
  name: string;
  slug: string;
  region_slug: string;
  country_slug: string;
}

interface SmartInternalLinksProps {
  lang: string;
  countrySlug: string;
  regionSlug: string;
  regionName: string;
  citySlug: string;
  siblingCities: SiblingCity[];
}

export function SmartInternalLinks({ 
  lang,
  countrySlug, 
  regionSlug, 
  regionName, 
  citySlug, 
  siblingCities 
}: SmartInternalLinksProps) {
  
  const anchorVariations = [
    (name: string) => `Check water hardness in ${name}`,
    (name: string) => `${name} water quality data`,
    (name: string) => `Does ${name} have hard water?`,
    (name: string) => `${name} mg/L levels`
  ];

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="w-6 h-6 text-gray-400" />
        <h3 className="text-xl font-bold text-gray-900 m-0">Explore Nearby Areas</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {siblingCities.slice(0, 9).map((sibling, idx) => {
          if (sibling.slug === citySlug) return null; 
          
          const anchorText = anchorVariations[idx % anchorVariations.length](sibling.name);
          
          return (
            <Link 
              key={`${sibling.region_slug}-${sibling.slug}`}
              // FIX: Now uses the sibling's exact region and country!
              href={`/${lang}/${sibling.country_slug}/${sibling.region_slug}/${sibling.slug}`}
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 text-blue-600 hover:text-blue-800 transition-colors border border-transparent hover:border-gray-200 text-sm font-medium"
            >
              <LinkIcon className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate">{anchorText}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
         <Link href={`/${lang}/${countrySlug}/${regionSlug}`} className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4">
           ← Back to {regionName} Region Overview
         </Link>
         <Link href={`/${lang}/${countrySlug}/${regionSlug}/${citySlug}/appliances`} className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4">
           Deep Dive: Appliances in this city
         </Link>
         <Link href={`/${lang}/${countrySlug}/${regionSlug}/${citySlug}/commercial`} className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4">
           Commercial Data Guide
         </Link>
      </div>
    </div>
  );
}