import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Location, SupportedLanguage } from '@/types';
import locationsData from '@/data/locations.json';
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
    title: `Does ${displayCity} Water Cause Dry Hair & Skin? | Hard Water Guide`,
    description: `Discover how the ${displayCity} water hardness level affects your skin barrier, eczema, and hair health. Get local shower filter recommendations.`,
    alternates: {
      canonical: `${baseUrl}/${lang}/${country}/${region}/${city}/skin-hair`,
    },
  };
}

export default async function SkinAndHairPage({ params }: PageProps) {
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
    { label: 'Skin & Hair', href: `/${lang}/${location.country_slug}/${location.region_slug}/${location.name.toLowerCase()}/skin-hair` }
  ];

  const isHardWater = location.hardness_mg_l > 120;
  const isVeryHardWater = location.hardness_mg_l > 200;

  // FAQ Schema to capture "People Also Ask" boxes on Google
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Does the water in ${location.name} cause hair loss or damage?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isHardWater 
            ? `Yes, the water in ${location.name} is classified as hard (${location.hardness_mg_l} mg/L). High calcium levels can build up on the scalp, blocking moisture and causing hair to become brittle.`
            : `No, the water in ${location.name} is relatively soft (${location.hardness_mg_l} mg/L), which is generally gentle on hair cuticles.`
        }
      },
      {
        '@type': 'Question',
        name: `Is ${location.name} tap water bad for eczema and sensitive skin?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isHardWater
            ? `Because ${location.name} has hard water, soap does not lather well and leaves a scum residue on the skin. This can disrupt the skin barrier and aggravate conditions like eczema.`
            : `The softer water in ${location.name} allows cleansers to wash away cleanly, making it better for sensitive skin and eczema.`
        }
      }
    ]
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="mb-12 border-b pb-8 text-center md:text-left">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 mt-4">
          Skin & Hair Impact in {location.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Learn how the local mineral composition of {location.name}'s tap water interacts with your daily beauty routine.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2 space-y-8">
          
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              💧 The Science of {location.name} Water
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              With a base hardness of <strong className="text-blue-600">{location.hardness_mg_l} mg/L</strong>, the water flowing through the pipes in {location.name} contains {isHardWater ? 'high' : 'low'} levels of dissolved calcium and magnesium.
            </p>
            {isHardWater && (
              <p className="text-gray-600 leading-relaxed">
                When you wash your face or hair here, these minerals react with the fatty acids in your soap to form <strong>"soap scum"</strong> instead of a rich lather. This microscopic film stays on your skin long after you step out of the shower.
              </p>
            )}
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-5 rounded-xl border ${isHardWater ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
              <h3 className="font-bold text-gray-900 mb-2">Impact on Hair</h3>
              <p className="text-sm text-gray-700">
                {isHardWater 
                  ? 'Minerals crystalize on the hair shaft, making it feel rough, heavy, and prone to breakage. Color-treated hair may fade faster.' 
                  : 'Your hair should retain moisture well. Shampoos will lather easily and wash out without leaving heavy mineral deposits.'}
              </p>
            </div>
            
            <div className={`p-5 rounded-xl border ${isHardWater ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
              <h3 className="font-bold text-gray-900 mb-2">Impact on Skin</h3>
              <p className="text-sm text-gray-700">
                {isHardWater 
                  ? 'The leftover soap film can clog pores, leading to breakouts. It also strips natural oils, worsening dry skin and eczema.' 
                  : 'Cleansers rinse off completely, leaving your skin barrier intact and preserving your natural moisture.'}
              </p>
            </div>
          </section>
        </div>

        <aside className="col-span-1">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Protect Your Routine</h3>
            {isHardWater ? (
              <>
                <p className="text-sm text-gray-700 mb-6">
                  {isVeryHardWater 
                    ? `Because ${location.name} water is extraordinarily hard, a shower filter is highly recommended to protect your skin barrier.` 
                    : `A vitamin C shower filter can help neutralize the minerals in ${location.name} water.`}
                </p>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors text-sm">
                  View Recommended Shower Filters
                </button>
                {/* <div className="mt-4"><AffiliateRecommendation type="shower-filter" lang={lang} /></div> */}
              </>
            ) : (
              <p className="text-sm text-gray-700">
                You're lucky! {location.name} has great water for skin and hair. No heavy filtration is necessary.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}