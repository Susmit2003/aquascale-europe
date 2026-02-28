// app/[lang]/[country]/[region]/[city]/water-softener-analysis/page.tsx

// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import { Location, SupportedLanguage } from '@/types';
// import computedLocationsData from '@/data/locations-computed.json';

// // Components
// import Breadcrumbs from '@/components/Breadcrumbs';
// import { PostcodeHardnessLookup } from '@/components/calculators/PostcodeHardnessLookup';
// import { SoftenerROICalculator } from '@/components/calculators/SoftenerROICalculator';
// import LimescaleCostEstimator from '@/components/calculators/LimescaleCostEstimator';
// import { ProductMatchEngine } from '@/components/content/ProductMatchEngine';
// import { StickySummary } from '@/components/content/StickySummary';
// import { ShieldAlert, TrendingDown } from 'lucide-react';

// const allLocations = computedLocationsData as Location[];
// export const dynamicParams = false; 

// const ENERGY_RATES: Record<string, number> = {
//   germany: 0.40, italy: 0.35, uk: 0.34, spain: 0.30, france: 0.25, default: 0.28
// };

// interface PageProps {
//   params: Promise<{ lang: SupportedLanguage; country: string; region: string; city: string }>;
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { city } = await params;
//   const decodedCity = decodeURIComponent(city);
//   const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
//   if (!location) return {};

//   return {
//     title: `Water Softener ROI & Cost Analysis for ${location.name} (${new Date().getFullYear()})`,
//     description: `Calculate the financial impact of ${location.hardness_mg_l} mg/L hard water in ${location.name}. View localized water softener ROI projections and postal code diagnostics.`,
//     robots: {
//       index: true,
//       follow: true,
//     }
//   };
// }

// export default async function CommercialAnalysisPage({ params }: PageProps) {
//   const { lang, city, country, region } = await params;
//   const decodedCity = decodeURIComponent(city);
//   const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
//   if (!location) return notFound();

//   const hardness = location.hardness_mg_l;
//   const kwhPrice = ENERGY_RATES[country.toLowerCase()] || ENERGY_RATES.default;

//   // Breadcrumbs including the commercial subpage
//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
//     { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
//     { label: location.name, href: `/${lang}/${country}/${region}/${city}` },
//     { label: 'Financial Analysis', href: `/${lang}/${country}/${region}/${city}/water-softener-analysis` }
//   ];

//   return (
//     <main className="max-w-7xl mx-auto p-4 md:p-8">
//       <header className="mb-8 border-b border-slate-200 pb-8">
//         <Breadcrumbs items={breadcrumbItems} />
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-6">
//           Water Treatment Financial Analysis: {location.name}
//         </h1>
//         <p className="text-xl text-slate-600 mt-4 max-w-3xl">
//           Based on the municipal baseline of <strong>{hardness} mg/L</strong>, this tool set calculates your household's hidden limescale costs and projects the ROI of installing a dedicated softening system.
//         </p>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//         {/* MAIN INTERACTIVE COLUMN */}
//         <div className="lg:col-span-3 space-y-12">
          
//           {/* STEP 1: Micro-Intent (Postcode Tool) */}
//           <section id="street-diagnostic">
//             <PostcodeHardnessLookup 
//               city={location.name} 
//               baseHardness={hardness} 
//               utility={location.source_utility} 
//             />
//           </section>

//           {/* STEP 2: The Problem (Cost Estimator) */}
//           <section id="limescale-cost" className="scroll-mt-20">
//             <div className="flex items-center gap-3 mb-6">
//               <TrendingDown className="w-8 h-8 text-red-500" />
//               <h2 className="text-3xl font-bold text-gray-900 m-0">
//                 The Hidden Cost of {hardness} mg/L Water
//               </h2>
//             </div>
//             <p className="text-slate-600 mb-6 text-lg">
//               Hard water physically damages heating elements by insulating them with calcium carbonate. Here is what that mathematical inefficiency costs an average household in {location.name} at current energy rates (€{kwhPrice}/kWh).
//             </p>
//             <LimescaleCostEstimator hardness={hardness} kwhPrice={kwhPrice} />
//           </section>

//           {/* STEP 3: The Justification (ROI Calculator) */}
//           <section id="roi-calculator" className="scroll-mt-20">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
//               Water Softener Investment Return
//             </h2>
//             <SoftenerROICalculator 
//               hardness={hardness} 
//               householdSize={3} 
//               systemCost={800} 
//             />
//           </section>

//           {/* STEP 4: The Conversion (Product Engine) */}
//           <section id="product-recommendations" className="scroll-mt-20 pt-8 border-t border-slate-200">
//             <div className="mb-6">
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 Recommended Systems for {location.name}
//               </h2>
//               <p className="text-slate-600">
//                 Based strictly on local mineral chemistry and average residential pipe diameters, these systems are engineered to handle {hardness} mg/L loads.
//               </p>
//             </div>
//             <ProductMatchEngine 
//               city={location.name} 
//               hardness={hardness} 
//               lang={lang} 
//             />
//           </section>

//           {/* Strict Affiliate & Financial Disclaimer (Required for AdSense/FTC/YMYL Compliance) */}
//           <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mt-12 flex gap-4 items-start">
//             <ShieldAlert className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
//             <div className="text-xs text-slate-500 space-y-2 leading-relaxed">
//               <p>
//                 <strong>Financial Disclaimer:</strong> Return on Investment (ROI) projections and limescale cost estimates are theoretical mathematical models based on standard European household consumption averages and localized energy rates. Actual savings will vary depending on your specific appliance age, usage habits, and exact utility billing structure.
//               </p>
//               <p>
//                 <strong>Affiliate Disclosure:</strong> AquaScale Europe partners with selected water treatment manufacturers. If you purchase a system through our recommended links, we may earn a commission at no additional cost to you. This funds our independent data collection and municipal API tracking.
//               </p>
//             </div>
//           </div>

//         </div>

//         {/* RIGHT SIDEBAR (Keeps the user anchored to the local data) */}
//         <div className="hidden lg:block lg:col-span-1">
//           <div className="sticky top-[100px]">
//             <StickySummary city={location.name} hardness={hardness} lang={lang} />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Location, SupportedLanguage } from '@/types';
import computedLocationsData from '@/data/locations-computed.json';

// Components
import Breadcrumbs from '@/components/Breadcrumbs';
import { PostcodeHardnessLookup } from '@/components/calculators/PostcodeHardnessLookup';
import { SoftenerROICalculator } from '@/components/calculators/SoftenerROICalculator';
import LimescaleCostEstimator from '@/components/calculators/LimescaleCostEstimator';
import { ProductMatchEngine } from '@/components/content/ProductMatchEngine';
import { StickySummary } from '@/components/content/StickySummary';
import { ShieldAlert, TrendingDown } from 'lucide-react';

const allLocations = computedLocationsData as Location[];
export const dynamicParams = false; 

const ENERGY_RATES: Record<string, number> = {
  germany: 0.40, italy: 0.35, uk: 0.34, spain: 0.30, france: 0.25, default: 0.28
};

interface PageProps {
  params: Promise<{ lang: SupportedLanguage; country: string; region: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return {};

  return {
    title: `Water Softener ROI & Cost Analysis for ${location.name} (${new Date().getFullYear()})`,
    description: `Calculate the financial impact of ${location.hardness_mg_l} mg/L hard water in ${location.name}. View localized water softener ROI projections and postal code diagnostics.`,
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function CommercialAnalysisPage({ params }: PageProps) {
  const { lang, city, country, region } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  const hardness = location.hardness_mg_l;
  const kwhPrice = ENERGY_RATES[country.toLowerCase()] || ENERGY_RATES.default;

  // Breadcrumbs including the commercial subpage
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
    { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
    { label: location.name, href: `/${lang}/${country}/${region}/${city}` },
    { label: 'Financial Analysis', href: `/${lang}/${country}/${region}/${city}/water-softener-analysis` }
  ];

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12 text-zinc-800 font-sans">
      <header className="mb-12 border-b border-zinc-200 pb-10">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tighter mt-8">
          Water Treatment Financial Analysis: {location.name}
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 mt-5 max-w-3xl font-light leading-relaxed">
          Based on the municipal baseline of <strong className="font-medium text-zinc-700 tabular-nums">{hardness} mg/L</strong>, this tool set calculates your household's hidden limescale costs and projects the ROI of installing a dedicated softening system.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
        {/* MAIN INTERACTIVE COLUMN */}
        <div className="lg:col-span-3 space-y-16">
          
          {/* STEP 1: Micro-Intent (Postcode Tool) */}
          <section id="street-diagnostic">
            <PostcodeHardnessLookup 
              city={location.name} 
              baseHardness={hardness} 
              utility={location.source_utility} 
            />
          </section>

          {/* STEP 2: The Problem (Cost Estimator) */}
          <section id="limescale-cost" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-100/50">
                <TrendingDown className="w-7 h-7 text-rose-500" />
              </div>
              <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight m-0">
                The Hidden Cost of <span className="tabular-nums">{hardness}</span> mg/L Water
              </h2>
            </div>
            <p className="text-zinc-600 mb-8 text-lg font-light leading-relaxed">
              Hard water physically damages heating elements by insulating them with calcium carbonate. Here is what that mathematical inefficiency costs an average household in {location.name} at current energy rates (<span className="tabular-nums">€{kwhPrice}/kWh</span>).
            </p>
            <LimescaleCostEstimator hardness={hardness} kwhPrice={kwhPrice} />
          </section>

          {/* STEP 3: The Justification (ROI Calculator) */}
          <section id="roi-calculator" className="scroll-mt-24">
            <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-8 border-b border-zinc-100 pb-5">
              Water Softener Investment Return
            </h2>
            <SoftenerROICalculator 
              hardness={hardness} 
              householdSize={3} 
              systemCost={800} 
            />
          </section>

          {/* STEP 4: The Conversion (Product Engine) */}
          <section id="product-recommendations" className="scroll-mt-24 pt-10 border-t border-zinc-200">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-3">
                Recommended Systems for {location.name}
              </h2>
              <p className="text-zinc-500 font-light leading-relaxed">
                Based strictly on local mineral chemistry and average residential pipe diameters, these systems are engineered to handle <span className="tabular-nums font-medium">{hardness}</span> mg/L loads.
              </p>
            </div>
            <ProductMatchEngine 
              city={location.name} 
              hardness={hardness} 
              lang={lang} 
            />
          </section>

          {/* Strict Affiliate & Financial Disclaimer (Required for AdSense/FTC/YMYL Compliance) */}
          <div className="bg-zinc-50/50 border border-zinc-200 rounded-2xl p-6 md:p-8 mt-16 flex flex-col md:flex-row gap-5 items-start">
            <ShieldAlert className="w-6 h-6 text-zinc-400 shrink-0 mt-1" />
            <div className="text-sm text-zinc-500 space-y-4 font-light leading-relaxed">
              <p>
                <strong className="font-medium text-zinc-700">Financial Disclaimer:</strong> Return on Investment (ROI) projections and limescale cost estimates are theoretical mathematical models based on standard European household consumption averages and localized energy rates. Actual savings will vary depending on your specific appliance age, usage habits, and exact utility billing structure.
              </p>
              <p>
                <strong className="font-medium text-zinc-700">Affiliate Disclosure:</strong> AquaScale Europe partners with selected water treatment manufacturers. If you purchase a system through our recommended links, we may earn a commission at no additional cost to you. This funds our independent data collection and municipal API tracking.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR (Keeps the user anchored to the local data) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-[100px]">
            <StickySummary city={location.name} hardness={hardness} lang={lang} />
          </div>
        </div>
      </div>
    </main>
  );
}