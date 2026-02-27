// components/seo/SmartInternalLinks.tsx
import Link from 'next/link';
import { Compass, Link as LinkIcon, Globe } from 'lucide-react';

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
  
  // Rotating anchor text to prevent exact-match over-optimization footprint
  const anchorVariations = [
    (name: string) => `Check water hardness in ${name}`,
    (name: string) => `${name} water quality data`,
    (name: string) => `Does ${name} have hard water?`,
    (name: string) => `${name} mg/L levels`
  ];

  // MAJOR HUBS FOR CRAWL BRIDGES (Prevents Regional Silos)
  const majorHubs = [
    { name: 'London', url: `/${lang}/united-kingdom/greater-london/london` },
    { name: 'Berlin', url: `/${lang}/germany/berlin/berlin` },
    { name: 'Paris', url: `/${lang}/france/ile-de-france/paris` },
    { name: 'Madrid', url: `/${lang}/spain/madrid/madrid` },
    { name: 'Rome', url: `/${lang}/italy/lazio/rome` },
    { name: 'Vienna', url: `/${lang}/austria/vienna/vienna` }
  ];

  // Deterministically pick a hub based on the current city string length
  const hubIndex = citySlug.length % majorHubs.length;
  let randomHub = majorHubs[hubIndex];
  
  // Fallback: If the current city IS the selected hub, pick the next one
  if (randomHub.url.includes(citySlug)) {
    randomHub = majorHubs[(hubIndex + 1) % majorHubs.length];
  }

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="w-6 h-6 text-gray-400" />
        <h3 className="text-xl font-bold text-gray-900 m-0">Explore Nearby Areas</h3>
      </div>
      
      {/* Sibling Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {siblingCities.slice(0, 9).map((sibling, idx) => {
          if (sibling.slug === citySlug) return null; 
          
          const anchorText = anchorVariations[idx % anchorVariations.length](sibling.name);
          
          return (
            <Link 
              key={`${sibling.region_slug}-${sibling.slug}`}
              href={`/${lang}/${sibling.country_slug}/${sibling.region_slug}/${sibling.slug}`}
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 text-blue-600 hover:text-blue-800 transition-colors border border-transparent hover:border-gray-200 text-sm font-medium"
            >
              <LinkIcon className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate">{anchorText}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Links & Crawl Bridge */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-4">
           <Link href={`/${lang}/${countrySlug}/${regionSlug}`} className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4">
             ← Back to {regionName} Region Overview
           </Link>
           {/* If you phased out these deep dives to fix doorway risks, you can remove them. Otherwise, keep them. */}
           <Link href={`/${lang}/${countrySlug}/${regionSlug}/${citySlug}/appliances`} className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4">
             Deep Dive: Appliances
           </Link>
        </div>

        {/* THE CRAWL BRIDGE: Connect to a major hub outside the region */}
        <Link 
          href={randomHub.url} 
          className="text-sm text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full transition-colors"
        >
           <Globe className="w-4 h-4" /> Compare with {randomHub.name}
        </Link>
      </div>
    </div>
  );
}