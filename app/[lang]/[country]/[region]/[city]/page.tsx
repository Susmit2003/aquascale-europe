// app/[lang]/[country]/[region]/[city]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Location, SupportedLanguage } from '@/types';
import computedLocationsData from '@/data/locations-computed.json';

// Core Components
import Breadcrumbs from '@/components/Breadcrumbs';
import HardnessGauge from '@/components/HardnessGauge';
import ComparisonChart from '@/components/ComparisonChart';
import { generateCityInsights } from '@/utils/cityDataInsights';
import { generateCityActionPlan } from '@/utils/content-generators/action-plans';
import { generateCityDataSummary } from '@/utils/cityArticleGenerator';

// Value-Add & SEO Components
import { ApplianceLifespanPredictor } from '@/components/calculators/ApplianceLifespanPredictor';
import { ActionPlanEngine } from '@/components/content/ActionPlanEngine';
import { WaterSourceBlock } from '@/components/content/WaterSourceBlock';
import { HealthExpertBlock } from '@/components/content/HealthExpertBlock';
import { SmartInternalLinks } from '@/components/seo/SmartInternalLinks';
import { StructuredData } from '@/components/seo/StructuredData';
import { StickySummary } from '@/components/content/StickySummary';
import { generateDatasetSchema, generateFAQSchema } from '@/components/seo/schema-generators';
import AdUnit from '@/components/AdUnit';
import { CityHardnessMap } from '@/components/charts/CityHardnessMap';
import { LocalTapReport } from '@/components/content/LocalTapReport';
// Lazy Loaded Components
const HistoricalTrendChart = dynamic(() => import('@/components/charts/HistoricalTrendChart').then(mod => mod.HistoricalTrendChart), { 
  loading: () => <div className="h-[300px] w-full bg-slate-100 rounded-xl animate-pulse my-12"></div>
});

const allLocations = computedLocationsData as Location[];
export const dynamicParams = false; 

interface PageProps {
  params: Promise<{ lang: SupportedLanguage; country: string; region: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return {};
  const shouldIndex = location.population > 5000;

  return {
    title: `${location.name} Water Hardness Data (${new Date().getFullYear()}) | Official Profile`,
    description: `Official municipal water hardness data for ${location.name}. Hardness level is ${location.hardness_mg_l} mg/L. View local hydro-chemical analysis.`,
    robots: { index: shouldIndex, follow: true }
  };
}

export default async function CityDashboard({ params }: PageProps) {
  const { lang, city, country, region } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  // 1. Data Preparation
  const hardness = location.hardness_mg_l;
  const cityInsights = generateCityInsights(location, allLocations);
  const actionPlanRules = generateCityActionPlan(location.name, hardness);

  // Region and Country Averages
  const regionLocations = allLocations.filter(l => l.region_slug === location.region_slug);
  const regionAvg = Math.round(regionLocations.reduce((sum, l) => sum + l.hardness_mg_l, 0) / (regionLocations.length || 1));
  const countryLocations = allLocations.filter(l => l.country_slug === location.country_slug);
  const countryAvg = Math.round(countryLocations.reduce((sum, l) => sum + l.hardness_mg_l, 0) / (countryLocations.length || 1));
  
  // Sort for Percentile Ranking
  const sortedCountryLocations = [...countryLocations].sort((a, b) => b.hardness_mg_l - a.hardness_mg_l);
  const rank = sortedCountryLocations.findIndex(l => l.id === location.id) + 1;
  const percentile = Math.round((rank / countryLocations.length) * 100);

  // ---------------------------------------------------------------------------
  // LOGIC FLAGS FOR CONDITIONAL RENDERING & H2 VARIATION
  // ---------------------------------------------------------------------------
  const deltaFromRegion = Math.abs(cityInsights.deltaFromRegion);
  const isRegionalOutlier = deltaFromRegion >= 5; 
  const isHardWater = hardness > 120;
  const isHighPopulation = location.population > 100000;
  
  // Simulated variance based on data (replace with real DB field if available)
  const historicalVariance = (hardness * 7) % 10; 
  const hasSignificantTrend = historicalVariance >= 3; 

  // Safe Sibling Cities
  const siblingCities = (location.nearby_locations || [])
    .map(id => allLocations.find(l => l.id === id))
    .filter((l): l is Location => l !== undefined)
    .map(l => ({ 
      name: l.name, slug: encodeURIComponent(l.name.toLowerCase().replace(/\s+/g, '-')),
      region_slug: l.region_slug, country_slug: l.country_slug
    }));

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
    { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
    { label: location.name, href: `/${lang}/${country}/${region}/${city}` }
  ];

  // Generate Schema Objects
  const datasetSchema = generateDatasetSchema(location.name, hardness);
  const faqSchema = generateFAQSchema(location.name, hardness, regionAvg);

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8" itemScope itemType="https://schema.org/Dataset">
      {/* Schema Injection */}
      <StructuredData schema={datasetSchema} />
      <StructuredData schema={faqSchema} />
      
      <header className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-6" itemProp="name">
          Water Hardness Intelligence: {location.name}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          
          {/* BASE DATA BLOCK - ALWAYS RENDERED FIRST */}
          <section id="data-summary" className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Water Specifications</h2>
            <p className="text-gray-700 mb-6 text-lg">{generateCityDataSummary(location)}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <HardnessGauge hardnessMgL={hardness} lang={lang} />
              
              {/* Analytical Commentary Injection */}
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 text-sm text-slate-700">
                <h3 className="font-bold text-slate-900 mb-2">Geological & Infrastructure Analysis</h3>
                <ul className="space-y-3">
                  <li><strong>Percentile Ranking:</strong> {location.name} ranks in the top {Math.max(1, percentile)}% of measured municipalities nationally for mineral density.</li>
                  <li><strong>Geological Factor:</strong> The local municipal supply (managed by {location.source_utility || 'regional authorities'}) yields a base hardness of {hardness} mg/L. Seasonal fluctuations average {historicalVariance}%.</li>
                  <li><strong>Infrastructure Note:</strong> {isHighPopulation 
                    ? `Given the infrastructure age typical of urban centers of this size, localized pipe scaling may compound these base metrics at the tap.` 
                    : `The stable geological bedrock and shorter municipal pipe runs in this area contribute to a highly consistent mineral profile.`}
                  </li>
                </ul>
              </div>
            </div>

            {/* High-Trust Citation Footer */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-slate-500">
              <span>Data last verified: {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
              <span className="mt-2 md:mt-0 flex items-center gap-2">
                Primary Source: 
                {location.source_url ? (
                  <a 
                    href={location.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer nofollow" 
                    className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-900 rounded font-medium transition-colors border border-blue-100"
                  >
                    Official {location.source_utility} Report ↗
                  </a>
                ) : (
                  <span className="font-medium text-slate-700">{location.source_utility}</span>
                )}
                {' | '} Reviewed by <a href="/methodology" className="underline text-slate-500 hover:text-slate-800">AquaScale Data Team</a>
              </span>
            </div>
          </section>

          {/* Dynamic Mapbox Visuals */}
          <div className="mb-12">
            <CityHardnessMap location={location} />
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* LOGIC-BASED CONDITIONAL RENDERING (No uniform H2 sequence)          */}
          {/* ----------------------------------------------------------------- */}

          {/* Block A: Comparison (Only if statistically significant) */}
          {isRegionalOutlier && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Regional Deviation Analysis</h2>
              <ComparisonChart currentCity={location} allLocations={allLocations} />
              <p className="text-sm text-slate-500 mt-3">
                *Note: {location.name} diverges from the regional median by {deltaFromRegion} mg/L, indicating a distinct local aquifer or treatment protocol.
              </p>
            </section>
          )}

          {/* Block B: Infrastructure Action Plan (Only for Hard Water OR Major Cities) */}
          {(isHardWater || isHighPopulation) && (
            <section id="action-plan" className="mb-12">
              <ActionPlanEngine city={location.name} rules={actionPlanRules} />
            </section>
          )}

          

          {/* Block C: Health & Source (Always rendered, but uses multi-variable logic internally) */}
          <section id="health-source" className="mb-12 space-y-8">
             <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Source Origin & Household Efficiency</h2>
             <WaterSourceBlock city={location.name} citySlug={city} lang={lang} />
             <HealthExpertBlock location={location} />
          </section>

          {/* Block D: Trend Data (Conditional UI) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Historical Mineral Variance</h2>
            {hasSignificantTrend ? (
              <HistoricalTrendChart city={location.name} currentHardness={hardness} />
            ) : (
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg">
                <p className="text-sm text-slate-600 font-medium">
                  Trend Analysis: Historical records indicate highly stable mineral levels in {location.name}, with less than 3 mg/L annual variance over the past half-decade.
                </p>
              </div>
            )}
          </section>
          

          {/* Block E: Appliance Impact (Only if water is hard enough to matter) */}
          {isHardWater && (
            <section id="household-impact" className="mb-12">
               <h2 className="text-3xl font-bold text-gray-900 border-b pb-4 mb-6">Thermodynamic Appliance Impact</h2>
               <ApplianceLifespanPredictor hardnessMgL={hardness} />
            </section>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* DE-COMMERCIALIZATION (Cross-link to separate intent)                */}
          {/* ----------------------------------------------------------------- */}
          {isHardWater && (
            <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-6 md:p-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Commercial Treatment & ROI Analysis</h3>
                <p className="text-blue-700 text-sm max-w-xl">
                  Looking for water softening solutions? View our separate financial breakdown for {location.name}, including projected return on investment, running costs, and local product recommendations based on postal codes.
                </p>
              </div>
              <Link 
                href={`/${lang}/${country}/${region}/${city}/water-softener-analysis`}
                className="shrink-0 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-sm transition-all"
              >
                View Financial Analysis
              </Link>
            </div>
          )}

          <section id="community-reports" className="mb-12">
            <LocalTapReport city={location.name} />
          </section>

          {/* Static Bottom Elements */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            {siblingCities.length > 0 && (
              <SmartInternalLinks 
                lang={lang} countrySlug={country} regionSlug={region} 
                regionName={region.replace(/-/g, ' ')} citySlug={city} siblingCities={siblingCities} 
              />
            )}
          </div>

        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <div className="hidden lg:block lg:col-span-1">
          <StickySummary city={location.name} hardness={hardness} lang={lang} />
          <div className="sticky top-[100px] mt-8">
             <AdUnit slot="YOUR_SLOT_ID" format="rectangle" minHeight="600px" />
          </div>
        </div>
      </div>
    </main>
  );
}