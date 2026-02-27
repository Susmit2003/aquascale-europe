// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import dynamic from 'next/dynamic';
// import { Location, SupportedLanguage } from '@/types';
// import computedLocationsData from '@/data/locations-computed.json';

// // Core Components
// import Breadcrumbs from '@/components/Breadcrumbs';
// import HardnessGauge from '@/components/HardnessGauge';
// import ComparisonChart from '@/components/ComparisonChart';
// import { generateCityInsights } from '@/utils/cityDataInsights';
// import { generateCityActionPlan } from '@/utils/content-generators/action-plans';

// // Value-Add Components (No longer shuffled, placed logically)
// import LimescaleCostEstimator from '@/components/calculators/LimescaleCostEstimator';
// import { ApplianceLifespanPredictor } from '@/components/calculators/ApplianceLifespanPredictor';
// import { ActionPlanEngine } from '@/components/content/ActionPlanEngine';
// import { PropertyValueModule } from '@/components/content/PropertyValueModule';
// import { WaterSourceBlock } from '@/components/content/WaterSourceBlock';
// import { HealthExpertBlock } from '@/components/content/HealthExpertBlock';
// import { SmartInternalLinks } from '@/components/seo/SmartInternalLinks';
// import { StructuredData } from '@/components/seo/StructuredData';
// import { StickySummary } from '@/components/content/StickySummary';
// import { generateDatasetSchema } from '@/components/seo/schema-generators';

// // Lazy Loaded Components
// const HistoricalTrendChart = dynamic(() => import('@/components/charts/HistoricalTrendChart').then(mod => mod.HistoricalTrendChart), { 
//   loading: () => <div className="h-[300px] w-full bg-slate-100 rounded-xl animate-pulse my-12"></div>
// });
// const RegionalHeatmap = dynamic(() => import('@/components/charts/RegionalHeatmap').then(mod => mod.RegionalHeatmap), {
//   loading: () => <div className="h-[250px] w-full bg-slate-100 rounded-xl animate-pulse my-12"></div>
// });

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
//   const displayCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
//   const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
//   return {
//     title: `${displayCity} Water Hardness Data (2026) | Real-time Local Report`,
//     description: `Official municipal water hardness data for ${displayCity}. Hardness level is ${location?.hardness_mg_l} mg/L. View local appliance calibration settings and health impacts.`,
//   };
// }

// export default async function CityDashboard({ params }: PageProps) {
//   const { lang, city, country, region } = await params;
//   const decodedCity = decodeURIComponent(city);
//   const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
//   if (!location) return notFound();

//   // 1. Data Preparation
//   const hardness = location.hardness_mg_l;
//   const kwhPrice = ENERGY_RATES[country.toLowerCase()] || ENERGY_RATES.default;
//   const cityInsights = generateCityInsights(location, allLocations);
//   const actionPlanRules = generateCityActionPlan(location.name, hardness);

//   // Region and Country Averages
//   const regionLocations = allLocations.filter(l => l.region_slug === location.region_slug);
//   const regionAvg = Math.round(regionLocations.reduce((sum, l) => sum + l.hardness_mg_l, 0) / (regionLocations.length || 1));
//   const countryLocations = allLocations.filter(l => l.country_slug === location.country_slug);
//   const countryAvg = Math.round(countryLocations.reduce((sum, l) => sum + l.hardness_mg_l, 0) / (countryLocations.length || 1));

//   // Safe Sibling Cities Formatting
//   const siblingCities = (location.nearby_locations || [])
//     .map(id => allLocations.find(l => l.id === id))
//     .filter((l): l is Location => l !== undefined)
//     .map(l => ({ 
//       name: l.name, 
//       slug: encodeURIComponent(l.name.toLowerCase().replace(/\s+/g, '-')),
//       region_slug: l.region_slug,
//       country_slug: l.country_slug
//     }));

//   // 2. SEO JSON-LD Schemas (Fixed EEAT)
//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
//     { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
//     { label: location.name, href: `/${lang}/${country}/${region}/${city}` }
//   ];

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": breadcrumbItems.map((item, index) => ({
//       "@type": "ListItem",
//       "position": index + 1,
//       "name": item.label,
//       "item": `https://aquascale-europe.com${item.href}`
//     }))
//   };

//   const articleSchema = {
//     "@context": "https://schema.org",
//     "@type": "Dataset", // Changed from Article to Dataset to accurately reflect the page type
//     "name": `Municipal Water Hardness Data: ${location.name}`,
//     "creator": { "@type": "Organization", "name": "AquaScale Europe Data Team" },
//     "publisher": { "@type": "Organization", "name": "AquaScale Europe" },
//     "license": "https://creativecommons.org/licenses/by/4.0/"
//   };

//   const datasetSchema = generateDatasetSchema(location.name, hardness);

//   return (
//     <main className="max-w-7xl mx-auto p-4 md:p-8" itemScope itemType="https://schema.org/Dataset">
//       <StructuredData schema={breadcrumbSchema} />
//       <StructuredData schema={articleSchema} />
//       <StructuredData schema={datasetSchema} />
      
//       <header className="mb-8">
//         <Breadcrumbs items={breadcrumbItems} />
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-6" itemProp="name">
//           Water Hardness Data for {location.name}
//         </h1>
//         <p className="text-gray-500 mt-2 font-medium">Verified by AquaScale Data Team | Last Updated: {new Date().getFullYear()}</p>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//         {/* LEFT/MAIN COLUMN */}
//         <div className="lg:col-span-3 space-y-12">
          
//           {/* Executive Summary purely based on data */}
//           <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
//             <h2 className="text-xl font-bold text-gray-900 mb-3">Executive Summary</h2>
//             <ul className="list-disc pl-5 space-y-2 text-gray-700">
//               <li>The official water hardness for {location.name} is <strong>{location.hardness_mg_l} mg/L</strong> ({cityInsights.germanDegrees} °dH).</li>
//               <li>This is classified as <strong>{cityInsights.hardnessCategory}</strong> according to EU guidelines.</li>
//               <li>Compared to the {location.region_slug.replace(/-/g, ' ')} region average of {regionAvg} mg/L, {location.name} is {cityInsights.deltaFromRegion > 0 ? 'harder' : 'softer'} by {Math.abs(cityInsights.deltaFromRegion)} mg/L.</li>
//             </ul>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <HardnessGauge hardnessMgL={hardness} lang={lang} />
//             <ComparisonChart currentCity={location} allLocations={allLocations} />
//           </div>

//           <RegionalHeatmap 
//             city={location.name} 
//             cityHardness={hardness} 
//             regionName={region.replace(/-/g, ' ')} 
//             regionAvg={regionAvg} 
//             countryName={country.replace(/-/g, ' ')} 
//             countryAvg={countryAvg} 
//           />

//           {/* Calculators and Practical Tools */}
//           <section className="space-y-8">
//              <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Home & Appliance Impact</h2>
//              <ApplianceLifespanPredictor hardnessMgL={hardness} />
             
//              {/* Cost Estimator only renders if data is substantial enough to warrant it */}
//              <LimescaleCostEstimator hardness={hardness} kwhPrice={kwhPrice} />
//           </section>

//           {/* Consolidated Subcategory Data (No longer doorway pages) */}
//           <section className="space-y-8">
//             <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Health & Plumbing Guidelines</h2>
//             <HealthExpertBlock city={location.name} hardness={hardness} />
//             <WaterSourceBlock city={location.name} citySlug={city} lang={lang} />
            
//             {/* Injecting Action Rules strictly from the pure logic file */}
//             <ActionPlanEngine city={location.name} rules={actionPlanRules} />
//           </section>
          
//           <HistoricalTrendChart city={location.name} currentHardness={hardness} />

//           {/* Smart Internal Linking Silo */}
//           {siblingCities.length > 0 && (
//             <SmartInternalLinks 
//               lang={lang}
//               countrySlug={country} 
//               regionSlug={region} 
//               regionName={region.replace(/-/g, ' ')} 
//               citySlug={city} 
//               siblingCities={siblingCities} 
//             />
//           )}
//         </div>

//         {/* RIGHT SIDEBAR COLUMN (Sticky) */}
//         <div className="hidden lg:block lg:col-span-1">
//           <StickySummary city={location.name} hardness={hardness} lang={lang} />
          
//           {/* AdSense Unit - Safely Placed alongside high-value data */}
//           {hardness > 120 && (
//              <div className="sticky top-[100px] mt-8">
//                  <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-center items-center text-slate-400 text-sm h-[600px]">
//                    [ High CPC Vertical Ad Unit ]
//                  </div>
//              </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }


import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Location, SupportedLanguage } from '@/types';
import computedLocationsData from '@/data/locations-computed.json';

// Core Components
import Breadcrumbs from '@/components/Breadcrumbs';
import HardnessGauge from '@/components/HardnessGauge';
import ComparisonChart from '@/components/ComparisonChart';
import { generateCityInsights } from '@/utils/cityDataInsights';
import { generateCityActionPlan } from '@/utils/content-generators/action-plans';

// Value-Add Components
import LimescaleCostEstimator from '@/components/calculators/LimescaleCostEstimator';
import { ApplianceLifespanPredictor } from '@/components/calculators/ApplianceLifespanPredictor';
import { ActionPlanEngine } from '@/components/content/ActionPlanEngine';
import { WaterSourceBlock } from '@/components/content/WaterSourceBlock';
import { HealthExpertBlock } from '@/components/content/HealthExpertBlock';
import { SmartInternalLinks } from '@/components/seo/SmartInternalLinks';
import { StructuredData } from '@/components/seo/StructuredData';
import { StickySummary } from '@/components/content/StickySummary';
import { generateDatasetSchema } from '@/components/seo/schema-generators';
import AdUnit from '@/components/AdUnit';
import { SoftenerROICalculator } from '@/components/calculators/SoftenerROICalculator';
// Lazy Loaded Components
const HistoricalTrendChart = dynamic(() => import('@/components/charts/HistoricalTrendChart').then(mod => mod.HistoricalTrendChart), { 
  loading: () => <div className="h-[300px] w-full bg-slate-100 rounded-xl animate-pulse my-12"></div>
});
const RegionalHeatmap = dynamic(() => import('@/components/charts/RegionalHeatmap').then(mod => mod.RegionalHeatmap), {
  loading: () => <div className="h-[250px] w-full bg-slate-100 rounded-xl animate-pulse my-12"></div>
});

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

  const displayCity = location.name;
  
  // ANTI-SPAM MEASURE: Noindex tiny municipalities to save crawl budget
  const shouldIndex = location.population > 5000;

  return {
    title: `${displayCity} Water Hardness Data (${new Date().getFullYear()})`,
    description: `Official municipal water hardness data for ${displayCity}. Hardness level is ${location.hardness_mg_l} mg/L. View local appliance calibration settings.`,
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
      }
    }
  };
}

export default async function CityDashboard({ params }: PageProps) {
  const { lang, city, country, region } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  // 1. Data Preparation
  const hardness = location.hardness_mg_l;
  const kwhPrice = ENERGY_RATES[country.toLowerCase()] || ENERGY_RATES.default;
  const cityInsights = generateCityInsights(location, allLocations);
  const actionPlanRules = generateCityActionPlan(location.name, hardness);

  // Region and Country Averages
  const regionLocations = allLocations.filter(l => l.region_slug === location.region_slug);
  const regionAvg = Math.round(regionLocations.reduce((sum, l) => sum + l.hardness_mg_l, 0) / (regionLocations.length || 1));
  const countryLocations = allLocations.filter(l => l.country_slug === location.country_slug);
  const countryAvg = Math.round(countryLocations.reduce((sum, l) => sum + l.hardness_mg_l, 0) / (countryLocations.length || 1));

  // Safe Sibling Cities Formatting
  const siblingCities = (location.nearby_locations || [])
    .map(id => allLocations.find(l => l.id === id))
    .filter((l): l is Location => l !== undefined)
    .map(l => ({ 
      name: l.name, 
      slug: encodeURIComponent(l.name.toLowerCase().replace(/\s+/g, '-')),
      region_slug: l.region_slug,
      country_slug: l.country_slug
    }));

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
    { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
    { label: location.name, href: `/${lang}/${country}/${region}/${city}` }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://aquascale-europe.com${item.href}`
    }))
  };

  const datasetSchema = generateDatasetSchema(location.name, hardness);

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8" itemScope itemType="https://schema.org/Dataset">
      <StructuredData schema={breadcrumbSchema} />
      <StructuredData schema={datasetSchema} />
      
      <header className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-6" itemProp="name">
          Water Hardness Data: {location.name}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          
          <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Data Summary</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Measured Hardness: <strong>{location.hardness_mg_l} mg/L</strong> ({cityInsights.germanDegrees} °dH).</li>
              <li>Classification: <strong>{cityInsights.hardnessCategory}</strong>.</li>
              <li>Regional Context: {location.name} is {Math.abs(cityInsights.deltaFromRegion)} mg/L {cityInsights.deltaFromRegion > 0 ? 'harder' : 'softer'} than the {location.region_slug.replace(/-/g, ' ')} average.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HardnessGauge hardnessMgL={hardness} lang={lang} />
            <ComparisonChart currentCity={location} allLocations={allLocations} />
          </div>

          <RegionalHeatmap 
            city={location.name} 
            cityHardness={hardness} 
            regionName={region.replace(/-/g, ' ')} 
            regionAvg={regionAvg} 
            countryName={country.replace(/-/g, ' ')} 
            countryAvg={countryAvg} 
          />

          <section className="space-y-8">
             <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Household Impact</h2>
             <ApplianceLifespanPredictor hardnessMgL={hardness} />
             {/* Only render cost estimator if it adds mathematical value (e.g. hardness > 80) */}
             {hardness > 80 && <LimescaleCostEstimator hardness={hardness} kwhPrice={kwhPrice} />}
          </section>

          {/* ... existing code ... */}

 <section className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Household Impact</h2>
    <ApplianceLifespanPredictor hardnessMgL={hardness} />
    
    {/* Only render cost estimator if it adds mathematical value */}
    {hardness > 80 && <LimescaleCostEstimator hardness={hardness} kwhPrice={kwhPrice} />}

    {/* NEW: ROI Calculator Section */}
    <div id="roi-calculator" className="scroll-mt-20">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Water Softener Investment Analysis</h3>
      <SoftenerROICalculator 
        hardness={hardness} 
        householdSize={3} // Default value
        systemCost={800}  // Default value
      />
      <p className="text-sm text-gray-500 mt-4 italic">
        *Calculation based on {location.name}'s specific mineral concentration of {hardness} mg/L.
      </p>
    </div>
</section>

{/* ... rest of the page ... */}


          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Health & Source Data</h2>
            <HealthExpertBlock city={location.name} hardness={hardness} />
            <WaterSourceBlock city={location.name} citySlug={city} lang={lang} />
            <ActionPlanEngine city={location.name} rules={actionPlanRules} />
          </section>
          
          <HistoricalTrendChart city={location.name} currentHardness={hardness} />

          {siblingCities.length > 0 && (
            <SmartInternalLinks 
              lang={lang}
              countrySlug={country} 
              regionSlug={region} 
              regionName={region.replace(/-/g, ' ')} 
              citySlug={city} 
              siblingCities={siblingCities} 
            />
          )}
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <StickySummary city={location.name} hardness={hardness} lang={lang} />
          
          {/* AdSense Unit */}
          <div className="sticky top-[100px] mt-8">
             <AdUnit slot="YOUR_SLOT_ID" format="rectangle" minHeight="600px" />
          </div>
        </div>
      </div>
    </main>
  );
}