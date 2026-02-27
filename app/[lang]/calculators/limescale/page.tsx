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
    title: 'Annual Limescale Cost Estimator | AquaScale Europe',
    description: 'Calculate the exact financial impact of hard water and limescale damage on your household appliances. Select your European city to start.',
  };
}

export default async function GlobalLimescaleCalculatorPage({
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
    // (Assuming population exists, otherwise just take the first 5)
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
    { label: 'Limescale Cost Estimator', href: `/${lang}/calculators/limescale` }
  ];

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <header className="mb-16 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Annual Limescale Cost Estimator
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Hard water silently destroys boilers, dishwashers, and washing machines. 
          Because water hardness varies street-by-street across Europe, we use 
          exact municipal data to calculate your personalized annual repair and energy costs.
        </p>
      </header>

      {/* Directory Section: Select a Country/City */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
          Select Your Region to Calculate Costs
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
                          // CRITICAL: Notice this links specifically to the calculator sub-route!
                          href={`/${lang}/${city.country_slug}/${city.region_slug}/${citySlug}/annual-limescale-cost-estimator`}
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How the Limescale Estimator Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prose prose-blue text-gray-600">
            <p>
              Limescale (calcium carbonate) build-up acts as an insulator on internal heating elements. 
              Just 1.6mm of scale can cause a 12% loss in heating efficiency, driving up your gas and electricity bills.
            </p>
            <p>
              Our localized calculators utilize a proprietary formula combining:
            </p>
            <ul>
              <li><strong>Local Water Hardness:</strong> Measured in mg/L (PPM) from regional municipal data.</li>
              <li><strong>Average Energy Rates:</strong> Factoring in standard kWh prices for your specific country.</li>
              <li><strong>Appliance Baselines:</strong> Using manufacturer data on standard European appliance lifespans.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Did You Know?</h3>
            <p className="text-gray-600 mb-4">
              In areas with extreme water hardness (over 300 mg/L), households can spend an estimated <strong>€200 to €400 extra per year</strong> on energy inefficiencies and premature appliance replacements.
            </p>
            <p className="text-sm text-gray-400">
              * Figures are based on industry-standard thermodynamic efficiency loss charts. Actual costs vary by usage and appliance age.
            </p>
          </div>
        </div>
      </section>

      {/* Paste this at the bottom of app/[lang]/calculators/limescale/page.tsx */}
<article className="mt-24 prose prose-lg prose-blue max-w-none text-gray-700 border-t border-gray-200 pt-16">
  <h2 className="text-3xl font-extrabold text-gray-900">The Hidden Financial Impact of Limescale on European Households</h2>
  
  <p>
    Hard water is not merely a nuisance that leaves spots on glassware; it is a systemic threat to household energy efficiency and plumbing infrastructure. The formation of limescale—scientifically known as calcium carbonate precipitation—triggers a cascade of financial consequences that quietly inflate energy bills and accelerate appliance depreciation across millions of European homes. Our Annual Limescale Cost Estimator is designed to quantify these exact financial losses based on your specific regional water chemistry.
  </p>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">The Thermodynamics of Scale Formation and Efficiency Loss</h3>
  <p>
    To understand the cost of hard water, one must understand the basic thermodynamics of domestic heating systems. Calcium carbonate acts as an aggressive thermal insulator. When hard water is heated inside a boiler, washing machine, or dishwasher, the dissolved minerals precipitate out of the solution and bond to the heating elements.
  </p>
  <p>
    According to extensive engineering studies, just <strong>1.6 millimeters of limescale buildup on a heating element forces a 12% loss in heating efficiency</strong>. As the scale thickens to 3mm, that efficiency loss approaches 25%. Because the heat cannot effectively transfer through the mineral crust into the water, your boiler must fire for significantly longer periods to achieve the target temperature, burning excess gas or electricity in the process. During periods of high European energy costs, this thermal inefficiency translates directly to hundreds of Euros wasted annually.
  </p>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">Appliance-by-Appliance Risk Breakdown</h3>
  <p>
    Limescale damage does not distribute evenly across a household. It aggressively targets appliances that heat water to high temperatures.
  </p>
  <ul>
    <li><strong>Combi-Boilers & Heat Exchangers:</strong> This is the most expensive vulnerability in a modern home. Scale buildup restricts water flow through narrow heat exchangers, leading to localized "kettling" (overheating), stress fractures, and eventual system failure. Replacing a scaled-up boiler can cost upwards of €2,500.</li>
    <li><strong>Washing Machines:</strong> Scale coats the internal drum and heating elements while simultaneously reacting with laundry detergent to form soap scum. This not only destroys the machine's element but degrades clothing fibers, forcing premature wardrobe replacement.</li>
    <li><strong>Dishwashers:</strong> High-temperature wash cycles cause rapid precipitation of minerals, blocking spray arms and internal pumps, leading to cloudy glassware and poor sanitation.</li>
  </ul>

  <h3 className="text-2xl font-bold text-gray-900 mt-8">Energy Prices vs. Limescale Inefficiency</h3>
  <p>
    The true cost of limescale is intrinsically linked to local utility rates. A household in Germany paying €0.40 per kWh will suffer a much sharper financial penalty from a scaled-up boiler than a household in a region with highly subsidized energy. 
  </p>
  <p>
    This is why generic, national limescale calculators are fundamentally inaccurate. By selecting your specific city in our estimator above, the system cross-references your exact municipal water hardness (mg/L) with real-time average national energy costs to produce a highly accurate projection of your "limescale tax." Understanding this metric is the first critical step toward deciding if a water filtration or softening system is a financially viable investment for your property.
  </p>
</article>
    </main>
  );
}