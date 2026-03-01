// import { Metadata } from 'next';
// import Link from 'next/link';
// import computedLocationsData from '@/data/locations-computed.json';
// import Breadcrumbs from '@/components/Breadcrumbs';

// // Types (Adjust if you have a specific Location type exported in '@/types')
// interface Location {
//   country_slug: string;
//   region_slug: string;
//   name: string;
//   hardness_mg_l: number;
// }

// const allLocations = computedLocationsData as Location[];

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: 'Water Hardness by City & Country | Water Hardness Scale',
//     description: 'Explore municipal water hardness data, limescale cost estimates, and appliance calibration guides for cities across Europe.',
//   };
// }

// export default async function GlobalCitiesHub({
//   params,
// }: {
//   params: Promise<{ lang: string }>;
// }) {
//   const { lang } = await params;

//   // 1. Process Data: Group cities by country to create a clean directory
//   const uniqueCountries = Array.from(new Set(allLocations.map(loc => loc.country_slug))).sort();
  
//   const countryDirectory = uniqueCountries.map(countrySlug => {
//     const locationsInCountry = allLocations.filter(loc => loc.country_slug === countrySlug);
//     // Get a few sample regions/cities to display under the country card for better internal linking
//     const sampleLocations = locationsInCountry.slice(0, 5); 
    
//     return {
//       slug: countrySlug,
//       name: countrySlug.replace(/-/g, ' '),
//       totalCities: locationsInCountry.length,
//       samples: sampleLocations
//     };
//   });

//   // 2. Breadcrumb Setup
//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: 'Cities & Regions', href: `/${lang}/cities` }
//   ];

//   return (
//     <main className="max-w-7xl mx-auto p-4 md:p-8">
//       {/* Header Section */}
//       <header className="mb-12">
//         <Breadcrumbs items={breadcrumbItems} />
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-6 mb-4 capitalize">
//           European Water Hardness Directory
//         </h1>
//         <p className="text-xl text-gray-600 max-w-3xl">
//           Select your country below to access exact municipal water hardness data, calculate your annual limescale costs, and find the perfect appliance settings for your specific region.
//         </p>
//       </header>

//       {/* Country Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {countryDirectory.map((country) => (
//           <div 
//             key={country.slug} 
//             className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <h2 className="text-2xl font-bold text-blue-900 capitalize">
//                 {country.name}
//               </h2>
//               <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
//                 {country.totalCities} Cities
//               </span>
//             </div>
            
//             <p className="text-sm text-gray-500 mb-4 flex-grow">
//               Explore local water quality reports across {country.name}.
//             </p>

//             {/* Sub-links (Great for flattening site architecture for SEO) */}
//             <div className="mb-6">
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Popular Areas:</p>
//               <ul className="space-y-1">
//                 {country.samples.map((loc, idx) => (
//                   <li key={idx}>
//                     <Link 
//                       href={`/${lang}/${loc.country_slug}/${loc.region_slug}/${encodeURIComponent(loc.name.toLowerCase())}`}
//                       className="text-sm text-gray-700 hover:text-blue-600 hover:underline flex items-center gap-1"
//                     >
//                       <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                       {loc.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Call to Action Button */}
//             <Link 
//               href={`/${lang}/${country.slug}`}
//               className="mt-auto block w-full text-center bg-gray-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold py-2.5 px-4 rounded-lg transition-colors border border-gray-200 hover:border-transparent"
//             >
//               View All in {country.name} →
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Paste this at the bottom of app/[lang]/cities/page.tsx */}
// <article className="mt-24 prose prose-lg prose-blue max-w-none text-gray-700 border-t border-gray-200 pt-16">
//   <h2 className="text-3xl font-extrabold text-gray-900">Navigating Regional Water Hardness Variations Across Europe</h2>
  
//   <p>
//     When comparing water hardness by city, it becomes immediately apparent that Europe possesses a highly fragmented hydrological landscape. From the exceptionally soft glacial run-offs of Scandinavia to the dense, calcium-rich chalk basins of Southern England and Northern France, local water quality is entirely dictated by regional geology. Understanding these regional variations is critical for homeowners aiming to protect their plumbing infrastructure and optimize household energy efficiency.
//   </p>

//   <h3 className="text-2xl font-bold text-gray-900 mt-8">Why Does Water Hardness Vary So Drastically Between Cities?</h3>
//   <p>
//     The primary driver of municipal water hardness is the source of the water itself. Cities that rely on surface water—such as lakes, reservoirs, and fast-moving rivers—typically enjoy softer water. For example, Madrid sources much of its water from the granite-lined Sierra de Guadarrama, resulting in remarkably soft water that rarely causes limescale issues.
//   </p>
//   <p>
//     Conversely, cities that draw from groundwater aquifers, particularly those situated on sedimentary rock formations like limestone or chalk, suffer from high mineral saturation. As rainwater, which is naturally slightly acidic, percolates through these porous rocks, it dissolves calcium and magnesium carbonates. By the time this water reaches the municipal treatment plants of cities like London, Paris, or Munich, it is heavily saturated, often exceeding 300 mg/L of calcium carbonate equivalent.
//   </p>

//   <h3 className="text-2xl font-bold text-gray-900 mt-8">The Hardest and Softest Water Regions in Europe</h3>
//   <p>
//     Our aggregated database reveals distinct geographic trends across the continent. 
//   </p>
//   <ul>
//     <li><strong>The Soft Water Havens:</strong> The Nordic countries, Scotland, and parts of the Iberian Peninsula consistently report the lowest levels of dissolved minerals. Households in these regions rarely require mechanical water softening systems and benefit from naturally extended appliance lifespans.</li>
//     <li><strong>The Hard Water Belts:</strong> A massive limestone belt stretches from the southern coast of the UK, straight through the Paris basin, into the Alps, and down into Italy. Cities within this corridor experience the highest rates of catastrophic boiler failure and washing machine degradation in Europe.</li>
//   </ul>

//   <h3 className="text-2xl font-bold text-gray-900 mt-8">How to Interpret Local Municipal Water Quality Reports</h3>
//   <p>
//     Navigating local utility websites to find accurate hardness data can be frustrating due to differing regional measurement standards. While the UK might use Clark Degrees (°e), Germany relies on Deutsche Härte (°dH), and France uses standard French Degrees (°fH). 
//   </p>
//   <p>
//     Water Hardness Scale standardizes all municipal data into a universal metric: milligrams per liter (mg/L) of calcium carbonate. This standardization allows for accurate, cross-border comparisons. When reviewing your city's page in our directory, any value below 60 mg/L is considered soft, 61-120 mg/L is moderately hard, 121-180 mg/L is hard, and anything above 180 mg/L is classified as very hard.
//   </p>
//   <p>
//     Select your country and city from the directory above to view your exact, localized water hardness profile, complete with historical trends and appliance calibration guides tailored to your specific municipality.
//   </p>
// </article>
//     </main>
//   );
// }



import { Metadata } from 'next';
import Link from 'next/link';
import computedLocationsData from '@/data/locations-computed.json';
import Breadcrumbs from '@/components/Breadcrumbs';

// Types (Adjust if you have a specific Location type exported in '@/types')
interface Location {
  country_slug: string;
  region_slug: string;
  name: string;
  hardness_mg_l: number;
}

const allLocations = computedLocationsData as Location[];
export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Water Hardness by City & Country | Water Hardness Scale',
    description: 'Explore municipal water hardness data, limescale cost estimates, and appliance calibration guides for cities across Europe.',
  };
}

export default async function GlobalCitiesHub({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // 1. Process Data: Group cities by country to create a clean directory
  const uniqueCountries = Array.from(new Set(allLocations.map(loc => loc.country_slug))).sort();
  
  const countryDirectory = uniqueCountries.map(countrySlug => {
    const locationsInCountry = allLocations.filter(loc => loc.country_slug === countrySlug);
    // Get a few sample regions/cities to display under the country card for better internal linking
    const sampleLocations = locationsInCountry.slice(0, 5); 
    
    return {
      slug: countrySlug,
      name: countrySlug.replace(/-/g, ' '),
      totalCities: locationsInCountry.length,
      samples: sampleLocations
    };
  });

  // 2. Breadcrumb Setup
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cities & Regions', href: `/${lang}/cities` }
  ];

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12 font-sans text-zinc-800">
      {/* Header Section */}
      <header className="mb-16 md:mb-20">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tighter mt-8 mb-6 capitalize">
          European Water Hardness Directory
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 max-w-3xl font-light leading-relaxed">
          Select your country below to access exact municipal water hardness data, calculate your annual limescale costs, and find the perfect appliance settings for your specific region.
        </p>
      </header>

      {/* Country Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {countryDirectory.map((country) => (
          <div 
            key={country.slug} 
            className="bg-white border border-zinc-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-zinc-100/50 hover:border-zinc-300 transition-all duration-300 flex flex-col h-full group"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight capitalize group-hover:text-sky-800 transition-colors">
                {country.name}
              </h2>
              <span className="bg-zinc-100/80 text-zinc-500 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-zinc-200">
                {country.totalCities} Cities
              </span>
            </div>
            
            <p className="text-sm text-zinc-500 font-light leading-relaxed mb-8 flex-grow">
              Explore local water quality reports across {country.name}.
            </p>

            {/* Sub-links (Great for flattening site architecture for SEO) */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Popular Areas</p>
              <ul className="space-y-2.5">
                {country.samples.map((loc, idx) => (
                  <li key={idx}>
                    <Link 
                      href={`/${lang}/${loc.country_slug}/${loc.region_slug}/${encodeURIComponent(loc.name.toLowerCase())}`}
                      className="text-sm font-medium text-zinc-600 hover:text-sky-600 flex items-center gap-3 transition-colors group/link"
                    >
                      <span className="w-1.5 h-1.5 bg-zinc-200 group-hover/link:bg-sky-400 rounded-full transition-colors"></span>
                      {loc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action Button */}
            <Link 
              href={`/${lang}/${country.slug}`}
              className="mt-auto block w-full text-center bg-zinc-50 hover:bg-zinc-900 text-zinc-700 hover:text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 border border-zinc-200 hover:border-transparent shadow-sm hover:shadow-lg hover:shadow-zinc-300/50"
            >
              View All in {country.name} &rarr;
            </Link>
          </div>
        ))}
      </div>

      {/* Paste this at the bottom of app/[lang]/cities/page.tsx */}
      <article className="mt-32 prose prose-lg prose-zinc max-w-4xl mx-auto text-zinc-600 border-t border-zinc-200 pt-20">
        <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-8">
          Navigating Regional Water Hardness Variations Across Europe
        </h2>
        
        <p className="font-light leading-relaxed">
          When comparing water hardness by city, it becomes immediately apparent that Europe possesses a highly fragmented hydrological landscape. From the exceptionally soft glacial run-offs of Scandinavia to the dense, calcium-rich chalk basins of Southern England and Northern France, local water quality is entirely dictated by regional geology. Understanding these regional variations is critical for homeowners aiming to protect their plumbing infrastructure and optimize household energy efficiency.
        </p>

        <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight mt-12 mb-6">
          Why Does Water Hardness Vary So Drastically Between Cities?
        </h3>
        
        
        
        <p className="font-light leading-relaxed mt-8">
          The primary driver of municipal water hardness is the source of the water itself. Cities that rely on surface water—such as lakes, reservoirs, and fast-moving rivers—typically enjoy softer water. For example, Madrid sources much of its water from the granite-lined Sierra de Guadarrama, resulting in remarkably soft water that rarely causes limescale issues.
        </p>
        <p className="font-light leading-relaxed">
          Conversely, cities that draw from groundwater aquifers, particularly those situated on sedimentary rock formations like limestone or chalk, suffer from high mineral saturation. As rainwater, which is naturally slightly acidic, percolates through these porous rocks, it dissolves calcium and magnesium carbonates. By the time this water reaches the municipal treatment plants of cities like London, Paris, or Munich, it is heavily saturated, often exceeding <strong className="font-medium text-zinc-800 tabular-nums">300 mg/L</strong> of calcium carbonate equivalent.
        </p>

        <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight mt-12 mb-6">
          The Hardest and Softest Water Regions in Europe
        </h3>
        <p className="font-light leading-relaxed">
          Our aggregated database reveals distinct geographic trends across the continent. 
        </p>
        <ul className="list-disc pl-6 font-light space-y-4 marker:text-zinc-400">
          <li><strong className="font-medium text-zinc-800">The Soft Water Havens:</strong> The Nordic countries, Scotland, and parts of the Iberian Peninsula consistently report the lowest levels of dissolved minerals. Households in these regions rarely require mechanical water softening systems and benefit from naturally extended appliance lifespans.</li>
          <li><strong className="font-medium text-zinc-800">The Hard Water Belts:</strong> A massive limestone belt stretches from the southern coast of the UK, straight through the Paris basin, into the Alps, and down into Italy. Cities within this corridor experience the highest rates of catastrophic boiler failure and washing machine degradation in Europe.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight mt-12 mb-6">
          How to Interpret Local Municipal Water Quality Reports
        </h3>
        <p className="font-light leading-relaxed">
          Navigating local utility websites to find accurate hardness data can be frustrating due to differing regional measurement standards. While the UK might use Clark Degrees (°e), Germany relies on Deutsche Härte (°dH), and France uses standard French Degrees (°fH). 
        </p>
        <p className="font-light leading-relaxed">
          Water Hardness Scale standardizes all municipal data into a universal metric: milligrams per liter (mg/L) of calcium carbonate. This standardization allows for accurate, cross-border comparisons. When reviewing your city's page in our directory, any value below <strong className="font-medium text-zinc-800 tabular-nums">60 mg/L</strong> is considered soft, <strong className="font-medium text-zinc-800 tabular-nums">61-120 mg/L</strong> is moderately hard, <strong className="font-medium text-zinc-800 tabular-nums">121-180 mg/L</strong> is hard, and anything above <strong className="font-medium text-zinc-800 tabular-nums">180 mg/L</strong> is classified as very hard.
        </p>
        <p className="font-light leading-relaxed">
          Select your country and city from the directory above to view your exact, localized water hardness profile, complete with historical trends and appliance calibration guides tailored to your specific municipality.
        </p>
      </article>
    </main>
  );
}