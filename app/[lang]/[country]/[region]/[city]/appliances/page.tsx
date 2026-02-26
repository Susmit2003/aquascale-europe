import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Location, SupportedLanguage } from '@/types';
import locationsData from '@/data/locations.json';
import { convertHardness } from '@/utils/calculations';
import Breadcrumbs from '@/components/Breadcrumbs';
// import AffiliateRecommendation from '@/components/AffiliateRecommendation';

const allLocations = locationsData as Location[];

export const dynamicParams = true;
export const revalidate = 604800; // ISR cache for 7 days

// Next.js 15 requires params to be a Promise
interface PageProps {
  params: Promise<{ lang: SupportedLanguage; country: string; region: string; city: string }>;
}

export async function generateStaticParams() {
  const topCities = allLocations.sort((a, b) => b.population - a.population).slice(0, 100);
  return topCities.map((loc) => ({
    lang: 'en',
    country: loc.country_slug,
    region: loc.region_slug,
    city: loc.name.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, country, region, city } = await params;
  const baseUrl = 'https://aquascale-europe.com';
  
  // Decode the URL-encoded city name for the visual title tag
  const decodedCity = decodeURIComponent(city);
  const displayCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
  
  return {
    title: `Dishwasher Salt Settings for ${displayCity} | Bosch, Miele, AEG`,
    description: `Don't ruin your appliances. Get the exact water hardness settings for dishwashers and washing machines in ${displayCity}, ${country}.`,
    alternates: {
      canonical: `${baseUrl}/${lang}/${country}/${region}/${city}/appliances`,
    },
  };
}

export default async function AppliancesPage({ params }: PageProps) {
  const { city, lang, country, region } = await params;
  
  // Decode the URL string
  const decodedCity = decodeURIComponent(city);
  
  // Find location using the decoded city name
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  // Dynamic Breadcrumb Generation
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: location.country_slug.replace('-', ' '), href: `/${lang}/${location.country_slug}` },
    { label: location.region_slug.replace('-', ' '), href: `/${lang}/${location.country_slug}/${location.region_slug}` },
    { label: location.name, href: `/${lang}/${location.country_slug}/${location.region_slug}/${location.name.toLowerCase()}` },
    { label: 'Appliances', href: `/${lang}/${location.country_slug}/${location.region_slug}/${location.name.toLowerCase()}/appliances` }
  ];

  // Most European appliances use German Degrees (°dH) or Millimoles (mmol/L) for calibration
  const hardnessDH = convertHardness(location.hardness_mg_l, 'dH');
  const hardnessMmol = convertHardness(location.hardness_mg_l, 'mmol/L');

  // Appliance Logic Algorithm
  let boschSetting = "H00 (No salt required)";
  let requiresSalt = false;

  if (hardnessDH > 8 && hardnessDH <= 15) {
    boschSetting = "H02 or H03";
    requiresSalt = true;
  } else if (hardnessDH > 15 && hardnessDH <= 21) {
    boschSetting = "H04 or H05";
    requiresSalt = true;
  } else if (hardnessDH > 21) {
    boschSetting = "H06 or H07 (Maximum)";
    requiresSalt = true;
  }

  // HowTo JSON-LD Schema for Featured Snippets
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to set your dishwasher water hardness in ${location.name}`,
    step: [
      {
        '@type': 'HowToStep',
        text: `Check the exact water hardness for ${location.name}, which is ${hardnessDH} °dH.`
      },
      {
        '@type': 'HowToStep',
        text: `Turn on your dishwasher and access the setup menu (usually holding the setup button for 3 seconds).`
      },
      {
        '@type': 'HowToStep',
        text: `Change the internal water softener setting to ${boschSetting}.`
      }
    ]
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <header className="mb-10 border-b pb-6">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 mt-4">
          Dishwasher Settings for {location.name}
        </h1>
        <p className="text-lg text-gray-600">
          Calibrate your appliances perfectly to prevent limescale buildup and extend their lifespan.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Local Calibration Data</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-blue-200 pb-2">
              <span className="text-gray-600">German Degrees (°dH)</span>
              <span className="font-bold text-xl">{hardnessDH} °dH</span>
            </li>
            <li className="flex justify-between items-center border-b border-blue-200 pb-2">
              <span className="text-gray-600">Millimoles (mmol/L)</span>
              <span className="font-bold text-xl">{hardnessMmol} mmol/L</span>
            </li>
            <li className="flex justify-between items-center pb-2">
              <span className="text-gray-600">Base Metric</span>
              <span className="font-bold text-xl">{location.hardness_mg_l} mg/L</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Brand Specific Settings</h2>
          <div className="mb-6">
            <h3 className="font-bold text-gray-800">Bosch / Siemens / Neff</h3>
            <p className="text-gray-600 mt-1">Recommended Setting: <strong className="text-blue-700">{boschSetting}</strong></p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            {requiresSalt ? (
              <div className="text-orange-700 bg-orange-50 p-4 rounded-lg">
                <p className="font-bold mb-2">⚠️ Dishwasher Salt Required</p>
                <p className="text-sm">Your water is hard enough that you must use dedicated dishwasher salt to prevent white film on your glasses.</p>
                {/* <div className="mt-4"><AffiliateRecommendation type="hard-water-hero" lang={lang} /></div> */}
              </div>
            ) : (
              <div className="text-green-700 bg-green-50 p-4 rounded-lg">
                <p className="font-bold">✅ No Salt Required</p>
                <p className="text-sm">Your water is soft enough that standard detergent pods are sufficient.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}