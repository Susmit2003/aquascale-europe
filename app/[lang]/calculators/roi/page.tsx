import { Metadata } from 'next';
import Link from 'next/link';
import computedLocationsData from '@/data/locations-computed.json';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Location {
  country_slug: string;
  region_slug: string;
  name: string;
  hardness_mg_l: number;
  population?: number;
}

const allLocations = computedLocationsData as Location[];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Water Softener ROI Calculator | AquaScale Europe',
    description: 'Discover the exact payback period of installing a water softener in your European city based on local water hardness and energy savings.',
  };
}

export default async function GlobalROICalculatorPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // 1. Process Data: Group by Country to create a navigation directory
  const uniqueCountries = Array.from(new Set(allLocations.map(loc => loc.country_slug))).sort();
  
  const directory = uniqueCountries.map(countrySlug => {
    const countryLocations = allLocations.filter(loc => loc.country_slug === countrySlug);
    
    // Get the top 5 largest or most notable cities as quick links
    const topCities = countryLocations
      .sort((a, b) => (b.population || 0) - (a.population || 0))
      .slice(0, 5);

    return {
      name: countrySlug.replace(/-/g, ' '),
      slug: countrySlug,
      topCities,
      totalCount: countryLocations.length
    };
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: `/${lang}/calculators` },
    { label: 'Softener ROI Calculator', href: `/${lang}/calculators/roi` }
  ];

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <header className="mb-16 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Water Softener ROI Calculator
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Is a water softener worth the investment? Find out exactly how many months it will take for a water softening system to pay for itself in your specific city through energy and detergent savings.
        </p>
      </header>

      {/* Directory Section: Select a Country/City */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
          Select Your Region to Calculate ROI
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {directory.map((country) => (
            <div key={country.slug} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-900 capitalize">
                  {country.name}
                </h3>
                <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  {country.totalCount} Locations
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Top Requested Cities:
                </p>
                <ul className="space-y-3">
                  {country.topCities.map((city, idx) => {
                    const citySlug = encodeURIComponent(city.name.toLowerCase());
                    return (
                      <li key={idx}>
                        <Link 
                          // CRITICAL: Notice this links specifically to the ROI sub-route!
                          href={`/${lang}/${city.country_slug}/${city.region_slug}/${citySlug}/softener-roi-calculator`}
                          className="group flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <span className="font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 group-hover:bg-blue-600 transition-colors"></span>
                            {city.name}
                          </span>
                          <span className="text-sm text-gray-400 group-hover:text-blue-500">
                            {city.hardness_mg_l} mg/L
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <Link 
                href={`/${lang}/cities`} 
                className="block w-full text-center text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-3 rounded-lg transition-colors"
              >
                Browse all {country.name} cities →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEO & Educational Content */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Softener Payback Periods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prose prose-blue text-gray-600">
            <p>
              A whole-house water softener is a significant upfront investment, typically ranging from €500 to €2,000 depending on the system's capacity and installation complexity.
            </p>
            <p>
              However, in areas with water hardness exceeding 150 mg/L, the system begins paying for itself immediately by:
            </p>
            <ul>
              <li><strong>Restoring Heating Efficiency:</strong> Preventing limescale scale formation on boiler heat exchangers.</li>
              <li><strong>Reducing Soap Usage:</strong> Allowing you to use up to 50% less laundry detergent and dishwasher salt.</li>
              <li><strong>Eliminating Appliance Replacement:</strong> Doubling the lifespan of dishwashers, washing machines, and kettles.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">The ROI Formula</h3>
            <p className="text-gray-600 mb-4">
              Our calculator divides your estimated total installation cost by your projected annual savings (based on your city's exact municipal water hardness) to determine your <strong>Payback Period in Months</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Paste this at the bottom of app/[lang]/calculators/roi/page.tsx */}
<article className="mt-24 prose prose-lg prose-blue max-w-none text-gray-700 border-t border-gray-200 pt-16">
  <h2 className="text-3xl font-extrabold text-gray-900">Evaluating the True ROI of a Water Softener in Europe</h2>
  
  <p>
    When homeowners living in hard water regions face scaled-up showerheads, dry skin, and rising energy bills, the immediate question is always: <em>Is a whole-house water softener actually worth the investment?</em> Calculating the Return on Investment (ROI) and exact payback period of a water softener requires moving beyond marketing claims and looking strictly at regional water chemistry and localized household spending data.
  </p>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">The Upfront Costs vs. Long-Term Systemic Savings</h3>
  <p>
    Installing a high-quality ion-exchange water softener is a significant capital expenditure. Between the unit itself, the plumbing modifications required for installation, and the ongoing purchase of regeneration salt, the initial outlay can range between €800 and €2,000. However, unlike aesthetic home improvements, a water softener is an active financial asset that generates measurable, month-over-month cash flow by aggressively reducing specific household overheads.
  </p>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">The Three Pillars of Softener Payback</h3>
  <p>
    Our localized ROI calculator utilizes a comprehensive algorithm based on three distinct financial pillars:
  </p>
  <ul>
    <li>
      <strong>1. The Chemical and Detergent Reduction Factor:</strong> Hard water minerals (calcium and magnesium) react antagonistically with soap, forcing it to form insoluble scum rather than a cleaning lather. In areas with water hardness exceeding 200 mg/L, households must use up to 50% more laundry detergent, dishwasher pods, shampoo, and body wash just to achieve a basic clean. Softening the water eliminates this chemical conflict entirely, resulting in immediate, trackable savings at the supermarket.
    </li>
    <li>
      <strong>2. Energy Efficiency Restoration:</strong> As previously detailed in our limescale impact studies, a clean boiler heat element transfers energy to water instantly. By preventing scale formation—and actually dissolving existing micro-scale over time—a water softener ensures your boiler operates at factory-rated efficiency, directly lowering your gas or electricity consumption.
    </li>
    <li>
      <strong>3. Appliance Depreciation and Lifespan Extension:</strong> This is often the largest, albeit least visible, financial benefit. If hard water forces you to replace a €600 washing machine every 5 years instead of every 10 years, that localized depreciation cost is a massive drain on your finances. Soft water effectively doubles the functional lifespan of major water-bearing appliances.
    </li>
  </ul>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">Understanding the "Break-Even" Horizon</h3>
  <p>
    The speed at which a water softener pays for itself depends entirely on your city's municipal water hardness. In a region with mildly hard water (e.g., 130 mg/L), the payback period might extend to 6 or 7 years, making it a longer-term lifestyle investment. However, in regions suffering from extreme water hardness (exceeding 300 mg/L), the compounded savings on energy, detergents, and delayed appliance replacement often result in a break-even horizon of just 24 to 36 months.
  </p>
  <p>
    After this break-even point is reached, the system effectively puts money back into your pocket every year it operates. Select your city above to run your personalized ROI scenario and discover exactly how many months it will take for a softening system to pay for itself in your specific home.
  </p>
</article>
    </main>
  );
}