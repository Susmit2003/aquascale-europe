import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SoftenerROICalculator } from '@/components/calculators/SoftenerROICalculator';
import Breadcrumbs from '@/components/Breadcrumbs';
import computedLocationsData from '@/data/locations-computed.json';
import { Location, SupportedLanguage } from '@/types';

const allLocations = computedLocationsData as Location[];

// Optional: Set to true if you want Next.js to build these on-demand 
// instead of pre-rendering all 50,000 cities at build time.
export const dynamicParams = true; 

export async function generateStaticParams() {
  // To keep build times low, we only pre-build a few top cities here, 
  // and let dynamicParams=true handle the rest on-demand.
  const languages: SupportedLanguage[] = ['en'];
  const params: any[] = [];
  
  // Just pre-rendering the first 10 for speed; the rest generate on first visit
  const topLocations = allLocations.slice(0, 10); 
  
  for (const lang of languages) {
    for (const loc of topLocations) {
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

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const displayCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
  
  return {
    title: `Water Softener ROI Calculator for ${displayCity} | Payback Period`,
    description: `Calculate exactly how long a water softener takes to pay for itself in ${displayCity}. Free local ROI estimator based on municipal water hardness data.`,
  };
}

export default async function LocalROICalculatorPage({ params }: any) {
  const { lang, city, country, region } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
    { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
    { label: location.name, href: `/${lang}/${country}/${region}/${city}` },
    { label: 'Softener ROI', href: '#' }
  ];

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mt-6 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Water Softener ROI in {location.name}
        </h1>
        <p className="text-xl text-gray-600">
          With a local water hardness of <strong>{location.hardness_mg_l} mg/L</strong>, households in {location.name} experience specific financial impacts from limescale. Use our calculator below to see your exact payback period.
        </p>
      </header>

      {/* The Interactive Calculator Component */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-12">
        <SoftenerROICalculator hardness={location.hardness_mg_l} />
      </div>

      {/* SEO Content & Context (Crucial for ranking above the main hub) */}
      <article className="prose prose-blue max-w-none text-gray-600">
        <h2>Why Calculate ROI Specifically for {location.name}?</h2>
        <p>
          Generic water softener calculators use national averages. However, because {location.name} is located in the {region.replace(/-/g, ' ')} region, your municipal water supply has a distinct mineral profile. 
        </p>
        <p>
          At {location.hardness_mg_l} mg/L, the calcium carbonate levels directly dictate how much extra energy your boiler consumes to push heat through scale buildup, and exactly how much extra detergent you need to break surface tension in your washing machine.
        </p>

        <h3>The 3 Variables of Softener Payback</h3>
        <ul>
          <li><strong>Energy Efficiency Restoration:</strong> Hard water causes up to a 12% loss in heating efficiency. Softening the water gradually dissolves existing scale, lowering your monthly gas or electricity bills.</li>
          <li><strong>Chemical & Soap Savings:</strong> Soft water requires 50% less laundry detergent, dishwasher salt, and personal care products to achieve the same lather and cleaning power.</li>
          <li><strong>Appliance Lifespan Extension:</strong> By preventing scale buildup on heating elements, dishwashers and washing machines in {location.name} can see their operational lifespans doubled, delaying expensive replacement costs.</li>
        </ul>

        <div className="bg-blue-50 p-6 rounded-xl mt-8 border border-blue-100 text-sm">
          <strong>Ready to explore the main data?</strong> Head back to the <Link href={`/${lang}/${country}/${region}/${city}`} className="text-blue-600 hover:underline font-semibold">complete {location.name} water hardness report</Link> to view regional maps, historical trends, and exact appliance calibration settings.
        </div>
      </article>
    </main>
  );
}