// // import { Metadata } from 'next';
// // import Link from 'next/link';
// // import { Location } from '@/types';
// // import locationsData from '@/data/locations.json';
// // // import AdUnit from '@/components/AdUnit';

// // const allLocations = locationsData as Location[];

// // export const metadata: Metadata = {
// //   title: 'AquaScale Europe | Find Water Hardness in Your City',
// //   description: 'The ultimate directory for European water hardness data. Find exact mg/L, °dH, and °fH values to protect your home appliances and skin.',
// // };

// // export default function Home() {
// //   // 1. Group locations by country for our SEO directory
// //   const locationsByCountry = allLocations.reduce((acc, loc) => {
// //     if (!acc[loc.country_slug]) {
// //       acc[loc.country_slug] = [];
// //     }
// //     acc[loc.country_slug].push(loc);
// //     return acc;
// //   }, {} as Record<string, Location[]>);

// //   // Sort countries alphabetically
// //   const sortedCountries = Object.keys(locationsByCountry).sort();

// //   return (
// //     <main className="max-w-6xl mx-auto p-4 md:p-8">
// //       {/* Hero Section */}
// //       <section className="text-center py-16 md:py-24 bg-blue-50 rounded-3xl mb-12 border border-blue-100">
// //         <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6">
// //           Is Your Water <span className="text-blue-600">Destroying</span> Your Appliances?
// //         </h1>
// //         <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
// //           Search over 50,000 European cities to find exact water hardness levels, get precise dishwasher settings, and discover local solutions.
// //         </p>
// //       </section>

// //       {/* <AdUnit slot="header" /> */}

// //       {/* The SEO Directory - Passing Link Equity Downward */}
// //       <section className="my-16">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Browse by Country</h2>
        
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {sortedCountries.map(countrySlug => {
// //             // Sort cities within the country by population to show the top ones first
// //             const cities = locationsByCountry[countrySlug]
// //               .sort((a, b) => b.population - a.population)
// //               .slice(0, 5); // Show top 5 cities per country as a preview

// //             // Format country name for display (e.g., 'united-kingdom' -> 'United Kingdom')
// //             const displayCountry = countrySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// //             return (
// //               <div key={countrySlug} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
// //                 <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// //                   📍 {displayCountry}
// //                 </h3>
// //                 <ul className="space-y-2">
// //                   {cities.map(city => (
// //                     <li key={city.id}>
// //                       {/* Defaulting to English ('/en/') routing from the global homepage */}
// //                       <Link 
// //                         href={`/en/${countrySlug}/${city.region_slug}/${city.name.toLowerCase()}`}
// //                         className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm flex justify-between"
// //                       >
// //                         <span>{city.name}</span>
// //                         <span className="text-gray-400 text-xs">{city.hardness_mg_l} mg/L</span>
// //                       </Link>
// //                     </li>
// //                   ))}
// //                 </ul>
// //                 <div className="mt-4 pt-4 border-t border-gray-50">
// //                   {/* A real pSEO site would have a dedicated country hub page here */}
// //                   <span className="text-xs text-gray-400 cursor-not-allowed">
// //                     View all {locationsByCountry[countrySlug].length} cities →
// //                   </span>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* <AdUnit slot="content" /> */}

// //       {/* Paste this at the bottom of app/[lang]/page.tsx (or your main index page) */}
// // <article className="mt-24 prose prose-lg prose-blue max-w-none text-gray-700 border-t border-gray-200 pt-16">
// //   <h2 className="text-3xl font-extrabold text-gray-900">The State of European Water Quality in 2026</h2>
  
// //   <p>
// //     Access to clean, safe municipal water is a hallmark of modern European infrastructure. However, while the safety of the water is universally regulated, the <em>chemical composition</em>—specifically the mineral density—varies drastically street by street. AquaScale Europe was engineered to bridge the gap between complex municipal utility reports and actionable data for everyday homeowners, installers, and property managers.
// //   </p>

// //   <h3 className="text-2xl font-bold text-gray-900 mt-8">Beyond the Tap: Why Local Water Hardness Actually Matters</h3>
// //   <p>
// //     Most consumers only think about water hardness when dealing with aesthetic issues: stubborn limescale rings around the bathtub, cloudy drinking glasses, or the feeling of dry, irritated skin after a shower. Yet, the invisible impact of hard water is significantly more severe. 
// //   </p>
// //   <p>
// //     High concentrations of dissolved calcium and magnesium act as silent destroyers of modern home infrastructure. As Europe pushes toward greener, highly-efficient home heating solutions, these sensitive thermal systems are increasingly vulnerable to scale-induced failure. Understanding your local water profile is no longer a luxury—it is a mandatory step in responsible home maintenance and energy conservation.
// //   </p>

// //   <h3 className="text-2xl font-bold text-gray-900 mt-8">The Problem with Generic "National" Water Data</h3>
// //   <p>
// //     Historically, consumers looking to calibrate their dishwashers or evaluate the need for a whole-house water filtration system were forced to rely on generalized national maps. These maps paint entire countries with a broad brush, ignoring the complex, localized nature of water sourcing. 
// //   </p>
// //   <p>
// //     For example, one municipality might draw surface water from a local river (resulting in soft water), while a neighboring district just 10 kilometers away might draw from a deep chalk aquifer (resulting in extremely hard water). Generic data leads to incorrect appliance calibration, wasted detergent, and unoptimized energy consumption.
// //   </p>

// //   <h3 className="text-2xl font-bold text-gray-900 mt-8">How AquaScale Europe Aggregates Municipal Intelligence</h3>
// //   <p>
// //     AquaScale Europe operates the continent's most comprehensive and granular database of municipal water hardness. By aggregating thousands of localized water quality reports, translating varied measurement units (°dH, °fH, °e) into a universal standard (mg/L), and applying advanced digital interpolation, we provide exact, address-level insights.
// //   </p>
// //   <p>
// //     Whether you are an installer generating an ROI report for a client, a café owner calibrating an espresso machine for optimal taste extraction, or a homeowner trying to extend the lifespan of your combi-boiler, our platform delivers the precise data required to make informed, financially sound decisions. 
// //   </p>
// // </article>
      
// //     </main>
// //   );
// // }



// // app/page.tsx
// import { Metadata } from 'next';
// import Link from 'next/link';
// import { Location } from '@/types';
// import locationsData from '@/data/locations.json';
// // import AdUnit from '@/components/AdUnit';

// const allLocations = locationsData as Location[];

// export const metadata: Metadata = {
//   title: 'AquaScale Europe | Find Water Hardness in Your City',
//   description: 'The ultimate directory for European water hardness data. Find exact mg/L, °dH, and °fH values to protect your home appliances and skin.',
// };

// // 1. Create a map of countries to their native language routes
// const countryToLangMap: Record<string, string> = {
//   'united-kingdom': 'en',
//   'ireland': 'en',
//   'germany': 'de',
//   'austria': 'de',
//   'france': 'fr',
//   'belgium': 'fr',
//   'luxembourg': 'fr',
//   'spain': 'es',
//   // Note: Switzerland has multiple, defaulting to German here, but you can adjust
//   'switzerland': 'de' 
// };

// // Helper function to get the language (defaults to 'en' if country isn't in the list)
// function getNativeLang(countrySlug: string): string {
//   return countryToLangMap[countrySlug] || 'en';
// }

// export default function Home() {
//   // Group locations by country for our SEO directory
//   const locationsByCountry = allLocations.reduce((acc, loc) => {
//     if (!acc[loc.country_slug]) {
//       acc[loc.country_slug] = [];
//     }
//     acc[loc.country_slug].push(loc);
//     return acc;
//   }, {} as Record<string, Location[]>);

//   // Sort countries alphabetically
//   const sortedCountries = Object.keys(locationsByCountry).sort();

//   return (
//     <main className="max-w-6xl mx-auto p-4 md:p-8">
//       {/* Hero Section */}
//       <section className="text-center py-16 md:py-24 bg-blue-50 rounded-3xl mb-12 border border-blue-100">
//         <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6">
//           Is Your Water <span className="text-blue-600">Destroying</span> Your Appliances?
//         </h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
//           Search over 50,000 European cities to find exact water hardness levels, get precise dishwasher settings, and discover local solutions.
//         </p>
//       </section>

//       {/* <AdUnit slot="header" /> */}

//       {/* The SEO Directory - Passing Link Equity Downward */}
//       <section className="my-16">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Browse by Country</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {sortedCountries.map(countrySlug => {
//             // Sort cities within the country by population to show the top ones first
//             const cities = locationsByCountry[countrySlug]
//               .sort((a, b) => b.population - a.population)
//               .slice(0, 5); 

//             // Format country name for display
//             const displayCountry = countrySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
//             // 2. Determine the correct language for this specific country block
//             const targetLang = getNativeLang(countrySlug);

//             return (
//               <div key={countrySlug} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   📍 {displayCountry}
//                 </h3>
//                 <ul className="space-y-2">
//                   {cities.map(city => (
//                     <li key={city.id}>
//                       {/* 3. Inject the targetLang dynamically into the URL */}
//                       <Link 
//                         href={`/${targetLang}/${countrySlug}/${city.region_slug}/${city.name.toLowerCase()}`}
//                         className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm flex justify-between"
//                       >
//                         <span>{city.name}</span>
//                         <span className="text-gray-400 text-xs">{city.hardness_mg_l} mg/L</span>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-4 pt-4 border-t border-gray-50">
//                   <span className="text-xs text-gray-400 cursor-not-allowed">
//                     View all {locationsByCountry[countrySlug].length} cities →
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* <AdUnit slot="content" /> */}

//      <article className="mt-24 prose prose-lg prose-blue max-w-none text-gray-700 border-t border-gray-200 pt-16">
//   <h2 className="text-3xl font-extrabold text-gray-900">
//     The State of European Water Quality in 2026: What Homeowners Actually Need to Know
//   </h2>

//   <p>
//     In 2026, access to safe drinking water across Europe is not the issue — mineral content is. 
//     European municipal water systems meet strict public health standards, but water hardness levels 
//     vary dramatically from city to city, and sometimes even between neighborhoods.
//   </p>

//   <p>
//     If you have ever searched for <strong>“water hardness in my city”</strong> or wondered why your kettle 
//     builds limescale faster than someone else's in another region, the answer lies in local geology. 
//     Across Europe, water hardness ranges from soft granite-fed sources in Scandinavia to very hard 
//     limestone aquifers in Southern England and parts of Central Europe.
//   </p>

//   <h3 className="text-2xl font-bold text-gray-900 mt-8">
//     Why Local Water Hardness Matters More in 2026
//   </h3>

//   <p>
//     For years, hard water was considered a minor inconvenience — a bit of scale on taps, cloudy 
//     glassware, or dry skin after showering. Today, the impact is far more significant because 
//     modern homes rely on high-efficiency systems that are sensitive to mineral buildup.
//   </p>

//   <p>
//     High concentrations of dissolved calcium and magnesium can reduce the efficiency of combi 
//     boilers, dishwashers, washing machines, and instant hot water systems. Even a thin layer of 
//     limescale inside a heating element can increase energy consumption and reduce appliance lifespan.
//   </p>

//   <ul className="list-disc pl-6">
//     <li>Higher energy bills due to reduced thermal efficiency</li>
//     <li>Shorter appliance lifespan</li>
//     <li>Increased detergent and cleaning product usage</li>
//     <li>More frequent descaling maintenance</li>
//   </ul>

//   <h3 className="text-2xl font-bold text-gray-900 mt-8">
//     How Geology Shapes Municipal Water Hardness
//   </h3>

//   <p>
//     Water hardness is primarily determined by the type of rock water travels through before 
//     reaching treatment facilities. Regions supplied by limestone or chalk aquifers tend to 
//     report higher mineral density, while granite-based regions typically have softer water.
//   </p>

//   <p>
//     Seasonal supply changes can also affect mineral levels. During dry months, municipalities 
//     may rely more heavily on groundwater sources, which often contain higher calcium carbonate 
//     concentrations. This means your local water hardness can fluctuate throughout the year.
//   </p>

//   <h3 className="text-2xl font-bold text-gray-900 mt-8">
//     The Long-Term Cost of Ignoring Hard Water
//   </h3>

//   <p>
//     Limescale buildup is not just cosmetic. Over time, it can restrict internal pipe diameter, 
//     insulate heating elements, and place additional stress on valves and pumps. For property 
//     owners and landlords, this translates into higher maintenance cycles and premature equipment 
//     replacement.
//   </p>

//   <p>
//     Understanding your <strong>local municipal water mineral content</strong> allows you to make 
//     informed decisions — whether that means adjusting detergent dosage, installing point-of-use 
//     filtration, or evaluating a whole-house softening system.
//   </p>

//   <h3 className="text-2xl font-bold text-gray-900 mt-8">
//     Smart Water Management Is Part of Energy Efficiency
//   </h3>

//   <p>
//     As Europe continues transitioning toward greener and more energy-efficient homes, awareness 
//     of local water hardness levels is becoming part of responsible home management. Knowing your 
//     water profile helps extend appliance lifespan, improve heating efficiency, and reduce 
//     long-term household costs.
//   </p>

//   <p>
//     In 2026, checking your local water hardness by city is no longer just a technical curiosity — 
//     it is a practical step toward smarter, more efficient living.
//   </p>
// </article>
      
//     </main>
//   );
// }





// app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Location } from '@/types';
import locationsData from '@/data/locations.json';
// import AdUnit from '@/components/AdUnit';

const allLocations = locationsData as Location[];

export const metadata: Metadata = {
  title: 'AquaScale Europe | Find Water Hardness in Your City',
  description: 'The ultimate directory for European water hardness data. Find exact mg/L, °dH, and °fH values to protect your home appliances and skin.',
};

// 1. Create a map of countries to their native language routes
const countryToLangMap: Record<string, string> = {
  'united-kingdom': 'en',
  'ireland': 'en',
  'germany': 'de',
  'austria': 'de',
  'france': 'fr',
  'belgium': 'fr',
  'luxembourg': 'fr',
  'spain': 'es',
  // Note: Switzerland has multiple, defaulting to German here, but you can adjust
  'switzerland': 'de' 
};

// Helper function to get the language (defaults to 'en' if country isn't in the list)
function getNativeLang(countrySlug: string): string {
  return countryToLangMap[countrySlug] || 'en';
}

export default function Home() {
  // Group locations by country for our SEO directory
  const locationsByCountry = allLocations.reduce((acc, loc) => {
    if (!acc[loc.country_slug]) {
      acc[loc.country_slug] = [];
    }
    acc[loc.country_slug].push(loc);
    return acc;
  }, {} as Record<string, Location[]>);

  // Sort countries alphabetically
  const sortedCountries = Object.keys(locationsByCountry).sort();

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12 text-zinc-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 md:py-32 bg-zinc-50 rounded-[2rem] mb-16 border border-zinc-100">
        <h1 className="text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tighter mb-6">
          Is Your Water <span className="text-sky-700 italic font-medium">Destroying</span> Your Appliances?
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Search over 50,000 European cities to find exact water hardness levels, get precise dishwasher settings, and discover local solutions.
        </p>
      </section>

      {/* <AdUnit slot="header" /> */}

      {/* The SEO Directory - Passing Link Equity Downward */}
      <section className="my-20">
        <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-10 border-b border-zinc-200 pb-6">
          Browse by Country
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {sortedCountries.map(countrySlug => {
            // Sort cities within the country by population to show the top ones first
            const cities = locationsByCountry[countrySlug]
              .sort((a, b) => b.population - a.population)
              .slice(0, 5); 

            // Format country name for display
            const displayCountry = countrySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
            // 2. Determine the correct language for this specific country block
            const targetLang = getNativeLang(countrySlug);

            return (
              <div key={countrySlug} className="bg-white p-8 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-100/50 transition-all duration-300 group">
                <h3 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="opacity-80">📍</span> {displayCountry}
                </h3>
                <ul className="space-y-3">
                  {cities.map(city => (
                    <li key={city.id} className="group/item">
                      {/* 3. Inject the targetLang dynamically into the URL */}
                      <Link 
                        href={`/${targetLang}/${countrySlug}/${city.region_slug}/${city.name.toLowerCase()}`}
                        className="text-zinc-600 hover:text-sky-700 font-medium text-sm flex justify-between items-center transition-colors"
                      >
                        <span className="group-hover/item:translate-x-1 transition-transform duration-200">{city.name}</span>
                        <span className="text-zinc-400 text-xs tabular-nums tracking-wide">{city.hardness_mg_l} mg/L</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-zinc-100">
                  <span className="text-xs text-zinc-400 font-medium tracking-wide uppercase cursor-not-allowed group-hover:text-zinc-500 transition-colors">
                    View all {locationsByCountry[countrySlug].length} cities &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* <AdUnit slot="content" /> */}

      <article className="mt-32 prose prose-lg prose-zinc max-w-3xl mx-auto text-zinc-600 border-t border-zinc-200 pt-20 pb-16">
        <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight">
          The State of European Water Quality in 2026: What Homeowners Actually Need to Know
        </h2>

        <p className="font-light leading-relaxed">
          In 2026, access to safe drinking water across Europe is not the issue — mineral content is. 
          European municipal water systems meet strict public health standards, but water hardness levels 
          vary dramatically from city to city, and sometimes even between neighborhoods.
        </p>

        <p className="font-light leading-relaxed">
          If you have ever searched for <strong>“water hardness in my city”</strong> or wondered why your kettle 
          builds limescale faster than someone else's in another region, the answer lies in local geology. 
          Across Europe, water hardness ranges from soft granite-fed sources in Scandinavia to very hard 
          limestone aquifers in Southern England and parts of Central Europe.
        </p>

        <h3 className="text-2xl font-medium text-zinc-900 mt-12 tracking-tight">
          Why Local Water Hardness Matters More in 2026
        </h3>

        <p className="font-light leading-relaxed">
          For years, hard water was considered a minor inconvenience — a bit of scale on taps, cloudy 
          glassware, or dry skin after showering. Today, the impact is far more significant because 
          modern homes rely on high-efficiency systems that are sensitive to mineral buildup.
        </p>

        <p className="font-light leading-relaxed">
          High concentrations of dissolved calcium and magnesium can reduce the efficiency of combi 
          boilers, dishwashers, washing machines, and instant hot water systems. Even a thin layer of 
          limescale inside a heating element can increase energy consumption and reduce appliance lifespan.
        </p>

        <ul className="list-disc pl-6 font-light space-y-2 marker:text-zinc-400">
          <li>Higher energy bills due to reduced thermal efficiency</li>
          <li>Shorter appliance lifespan</li>
          <li>Increased detergent and cleaning product usage</li>
          <li>More frequent descaling maintenance</li>
        </ul>

        <h3 className="text-2xl font-medium text-zinc-900 mt-12 tracking-tight">
          How Geology Shapes Municipal Water Hardness
        </h3>

        <p className="font-light leading-relaxed">
          Water hardness is primarily determined by the type of rock water travels through before 
          reaching treatment facilities. Regions supplied by limestone or chalk aquifers tend to 
          report higher mineral density, while granite-based regions typically have softer water.
        </p>

        <p className="font-light leading-relaxed">
          Seasonal supply changes can also affect mineral levels. During dry months, municipalities 
          may rely more heavily on groundwater sources, which often contain higher calcium carbonate 
          concentrations. This means your local water hardness can fluctuate throughout the year.
        </p>

        <h3 className="text-2xl font-medium text-zinc-900 mt-12 tracking-tight">
          The Long-Term Cost of Ignoring Hard Water
        </h3>

        <p className="font-light leading-relaxed">
          Limescale buildup is not just cosmetic. Over time, it can restrict internal pipe diameter, 
          insulate heating elements, and place additional stress on valves and pumps. For property 
          owners and landlords, this translates into higher maintenance cycles and premature equipment 
          replacement.
        </p>

        <p className="font-light leading-relaxed">
          Understanding your <strong>local municipal water mineral content</strong> allows you to make 
          informed decisions — whether that means adjusting detergent dosage, installing point-of-use 
          filtration, or evaluating a whole-house softening system.
        </p>

        <h3 className="text-2xl font-medium text-zinc-900 mt-12 tracking-tight">
          Smart Water Management Is Part of Energy Efficiency
        </h3>

        <p className="font-light leading-relaxed">
          As Europe continues transitioning toward greener and more energy-efficient homes, awareness 
          of local water hardness levels is becoming part of responsible home management. Knowing your 
          water profile helps extend appliance lifespan, improve heating efficiency, and reduce 
          long-term household costs.
        </p>

        <p className="font-light leading-relaxed">
          In 2026, checking your local water hardness by city is no longer just a technical curiosity — 
          it is a practical step toward smarter, more efficient living.
        </p>
      </article>
      
    </main>
  );
}