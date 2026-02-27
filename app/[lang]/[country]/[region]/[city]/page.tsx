import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Location, SupportedLanguage } from '@/types';
import computedLocationsData from '@/data/locations-computed.json';


// Existing Core Components & Utilities
import Breadcrumbs from '@/components/Breadcrumbs';
import HardnessGauge from '@/components/HardnessGauge';
import ComparisonChart from '@/components/ComparisonChart';
import { generateCityHubArticle } from '@/utils/cityArticleGenerator';
import { shuffleComponents } from '@/utils/variationEngine';

// Enterprise SEO Components
import LimescaleCostEstimator from '@/components/calculators/LimescaleCostEstimator';
import { ApplianceLifespanPredictor } from '@/components/calculators/ApplianceLifespanPredictor';
import { SoftenerROICalculator } from '@/components/calculators/SoftenerROICalculator';
import { ActionPlanEngine } from '@/components/content/ActionPlanEngine';
import { PropertyValueModule } from '@/components/content/PropertyValueModule';
import { WaterSourceBlock } from '@/components/content/WaterSourceBlock';
import { HealthExpertBlock } from '@/components/content/HealthExpertBlock';
import { TasteProfileSection } from '@/components/content/TasteProfileSection';
import { PDFLeadCapture } from '@/components/content/PDFLeadCapture';
import { SmartInternalLinks } from '@/components/seo/SmartInternalLinks';
import { StructuredData } from '@/components/seo/StructuredData';
import { AuthorAuthorityBlock } from '@/components/content/AuthorAuthorityBlock';
import { ExpandedLocalIntent } from '@/components/content/ExpandedLocalIntent';
import { StickySummary } from '@/components/content/StickySummary';
import { generateFAQSchema, generateDatasetSchema } from '@/components/seo/schema-generators';

// Lazy Loaded Components (Optimized for Core Web Vitals, `ssr: false` removed)
const HistoricalTrendChart = dynamic(() => import('@/components/charts/HistoricalTrendChart').then(mod => mod.HistoricalTrendChart), { 
  loading: () => <div className="h-[300px] w-full bg-slate-100 rounded-xl animate-pulse my-12"></div>
});
const RegionalHeatmap = dynamic(() => import('@/components/charts/RegionalHeatmap').then(mod => mod.RegionalHeatmap), {
  loading: () => <div className="h-[250px] w-full bg-slate-100 rounded-xl animate-pulse my-12"></div>
});
const ProductMatchEngine = dynamic(() => import('@/components/content/ProductMatchEngine').then(mod => mod.ProductMatchEngine), {
  loading: () => <div className="h-[400px] w-full bg-slate-100 rounded-xl animate-pulse my-12"></div>
});

const allLocations = computedLocationsData as Location[];
export const dynamicParams = false; 

// Base energy costs (EUR per kWh)
const ENERGY_RATES: Record<string, number> = {
  germany: 0.40, italy: 0.35, uk: 0.34, spain: 0.30, france: 0.25, albania: 0.12, 'north-macedonia': 0.10, default: 0.28
};

interface PageProps {
  params: Promise<{ lang: SupportedLanguage; country: string; region: string; city: string }>;
}

export async function generateStaticParams() {
  const languages: SupportedLanguage[] = ['en', 'de', 'fr', 'es'];
  const params: any[] = [];
  for (const lang of languages) {
    for (const loc of allLocations) {
      params.push({
        lang,
        country: loc.country_slug,
        region: loc.region_slug,
        city: loc.name.toLowerCase(),
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const displayCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  return {
    title: `${displayCity} Water Hardness (2026) | Exact mg/L & Limescale Guide`,
    description: `Complete water quality report for ${displayCity}. Discover the exact hardness (${location?.hardness_mg_l} mg/L), appliance settings, and solutions.`,
  };
}

export default async function CityDashboard({ params }: PageProps) {
  const { lang, city, country, region } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  // 1. Data Preparation & Calculations
  const articleParagraphs = generateCityHubArticle(location, allLocations);
  const introParagraph = articleParagraphs.shift(); 
  const hardness = location.hardness_mg_l;
  const kwhPrice = ENERGY_RATES[country.toLowerCase()] || ENERGY_RATES.default;

  // Region and Country Averages
  const regionLocations = allLocations.filter(l => l.region_slug === location.region_slug);
  const regionAvg = Math.round(regionLocations.reduce((sum, l) => sum + l.hardness_mg_l, 0) / (regionLocations.length || 1));
  const countryLocations = allLocations.filter(l => l.country_slug === location.country_slug);
  const countryAvg = Math.round(countryLocations.reduce((sum, l) => sum + l.hardness_mg_l, 0) / (countryLocations.length || 1));

  // Safe Sibling Cities Formatting (Fixes cross-region 404s)
  const siblingCities = (location.nearby_locations || [])
    .map(id => allLocations.find(l => l.id === id))
    .filter((l): l is Location => l !== undefined)
    .map(l => ({ 
      name: l.name, 
      slug: encodeURIComponent(l.name.toLowerCase().replace(/\s+/g, '-')),
      region_slug: l.region_slug,
      country_slug: l.country_slug
    }));

  // 2. SEO JSON-LD Schemas
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Water Hardness in ${location.name}: 2026 Data & Impact`,
    "author": { "@type": "Person", "name": "Dr. Elena Rostova" },
    "publisher": { "@type": "Organization", "name": "AquaScale Europe" }
  };

  
  const datasetSchema = generateDatasetSchema(location.name, hardness);

  // 3. Modular Variation Blocks (Anti-Template Detection)
  const modularBlocks = [
    <ActionPlanEngine key="action-plan" city={location.name} hardness={hardness} />,
    <PropertyValueModule key="property-value" city={location.name} hardness={hardness} />,
    <WaterSourceBlock key="water-source" city={location.name} citySlug={city} lang={lang} />,
    <HealthExpertBlock key="health-expert" city={location.name} hardness={hardness} />,
    <TasteProfileSection key="taste-profile" city={location.name} hardness={hardness} />,
    <ExpandedLocalIntent key="intent" city={location.name} country={country.replace(/-/g, ' ')} hardness={hardness} />
  ];

  const shuffledBlocks = shuffleComponents(modularBlocks, location.name);

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8" itemScope itemType="https://schema.org/Article">
      {/* Structural Data Injection */}
      <StructuredData schema={breadcrumbSchema} />
      <StructuredData schema={articleSchema} />
      <StructuredData schema={datasetSchema} />
      
      {/* Header & E-E-A-T */}
      <header className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-6" itemProp="headline">
          Water Hardness in {location.name}
        </h1>
        
        <AuthorAuthorityBlock city={location.name} lang={lang} />
      </header>

      {/* Grid Layout: 3 Columns for Content, 1 Column for Sticky Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* LEFT/MAIN COLUMN */}
        <div className="lg:col-span-3 space-y-12">
          
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {location.region_slug.replace(/-/g, ' ')} Region • Population: {location.population.toLocaleString()}
            </p>
          </div>

          <p className="text-xl text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-3 rounded-r-lg">
            {introParagraph}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HardnessGauge hardnessMgL={hardness} lang={lang} />
            <ComparisonChart currentCity={location} allLocations={allLocations} />
          </div>

          {/* Predictors & Calculators */}
          <ApplianceLifespanPredictor hardnessMgL={hardness} />
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💶 Annual Limescale Cost Estimator</h2>
            <LimescaleCostEstimator hardness={hardness} kwhPrice={kwhPrice} />
            
            {/* Behavioral ROI Calculator */}
            <SoftenerROICalculator hardness={hardness} />
          </div>

          {/* DYNAMIC VARIATION ZONE (Shuffled content) */}
          <div className="space-y-12">
            {shuffledBlocks.map((block) => block)}
          </div>

          {/* Lazy-Loaded Visuals & Affiliate Embeds */}
          <HistoricalTrendChart city={location.name} currentHardness={hardness} />
          
          <div id="product-recommendations" className="scroll-mt-8">
            <ProductMatchEngine city={location.name} hardness={hardness} />
          </div>
          
          <RegionalHeatmap 
            city={location.name} 
            cityHardness={hardness} 
            regionName={region.replace(/-/g, ' ')} 
            regionAvg={regionAvg} 
            countryName={country.replace(/-/g, ' ')} 
            countryAvg={countryAvg} 
          />

          
         

          {/* PDF Lead Capture */}
          <PDFLeadCapture city={location.name} hardness={hardness} />

          {/* Smart Internal Linking Silo */}
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

        {/* RIGHT SIDEBAR COLUMN (Sticky) */}
        <div className="hidden lg:block lg:col-span-1">
          <StickySummary city={location.name} hardness={hardness} lang={lang} />
          
          {/* AdSense Placement in Sidebar */}
          <div className="sticky top-[450px] w-full bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-center items-center text-slate-400 text-sm h-[600px] mt-8">
            [ High CPC Vertical Ad Unit ]
          </div>
        </div>
        
      </div>
    </main>
  );
}