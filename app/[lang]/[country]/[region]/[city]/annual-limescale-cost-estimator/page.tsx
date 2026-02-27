import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LimescaleCostEstimator from '@/components/calculators/LimescaleCostEstimator';
import Breadcrumbs from '@/components/Breadcrumbs';
import computedLocationsData from '@/data/locations-computed.json';
import { Location, SupportedLanguage } from '@/types';

const allLocations = computedLocationsData as Location[];

// Allow on-demand generation for the 50,000 cities to prevent massive build times
export const dynamicParams = true; 

export async function generateStaticParams() {
  const languages: SupportedLanguage[] = ['en'];
  const params: any[] = [];
  
  // Pre-build top 10 for build speed, let Next.js ISR handle the rest
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
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  return {
    title: `Annual Limescale Cost Estimator for ${displayCity} | Calculate Losses`,
    description: `Hard water in ${displayCity} (${location?.hardness_mg_l} mg/L) causes expensive limescale damage. Calculate your exact annual energy losses and appliance repair costs.`,
  };
}

export default async function LocalLimescaleCalculatorPage({ params }: any) {
  const { lang, city, country, region } = await params;
  const decodedCity = decodeURIComponent(city);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  if (!location) return notFound();

  // Determine severity for dynamic text output
  const hardness = location.hardness_mg_l;
  let severityLevel = 'soft';
  if (hardness > 180) severityLevel = 'extreme';
  else if (hardness > 120) severityLevel = 'high';
  else if (hardness > 60) severityLevel = 'moderate';

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: country.replace(/-/g, ' '), href: `/${lang}/${country}` },
    { label: region.replace(/-/g, ' '), href: `/${lang}/${country}/${region}` },
    { label: location.name, href: `/${lang}/${country}/${region}/${city}` },
    { label: 'Limescale Costs', href: '#' }
  ];

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mt-6 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Annual Limescale Cost Estimator for {location.name}
        </h1>
        <p className="text-xl text-gray-600">
          The municipal water supply in {location.name} has a mineral concentration of <strong>{hardness} mg/L</strong>, classifying it as a <strong>{severityLevel}</strong> risk for domestic appliances. Calculate your hidden financial losses below.
        </p>
      </header>

      {/* The Interactive Calculator Component */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-blue-100 mb-12">
        <LimescaleCostEstimator hardness={hardness} kwhPrice={0.28} />
      </div>

      {/* Deep SEO Article (700+ Words) Contextualized for the specific city */}
      <article className="prose prose-lg prose-blue max-w-none text-gray-700">
        <h2>The Financial Reality of Hard Water in {location.name}</h2>
        <p>
          For homeowners and property managers residing in {location.name}, water hardness is not just a cleaning nuisance—it is a measurable, recurring financial liability. The specific geological makeup of the {region.replace(/-/g, ' ')} region means that the groundwater supplied to local taps carries a significant payload of dissolved calcium and magnesium carbonates. 
        </p>
        <p>
          At a concentration of {hardness} mg/L, this water rapidly undergoes thermal precipitation when heated inside your home. Whether it's the main central heating boiler, a washing machine, or a kitchen kettle, the heat forces the dissolved minerals to drop out of the water and fuse directly onto the heating elements. This rigid crust is known as limescale, and it acts as an aggressive thermal insulator.
        </p>

        <h3>How Limescale Inflates Your Energy Bills</h3>
        <p>
          The most immediate financial impact {location.name} residents face from limescale is thermodynamic inefficiency. Heating elements are designed to transfer heat directly into water. When a layer of scale—even one as thin as 1.6 millimeters—coats that element, the heat transfer is severely blocked. 
        </p>
        <p>
          Engineering studies consistently show that just 1.6mm of scale causes a 12% loss in boiler efficiency. If the scale in your {location.name} home is allowed to reach 3mm, efficiency drops by nearly 25%. Because the heat cannot penetrate the mineral rock effectively, your combi-boiler or electric water heater is forced to run significantly longer to achieve the same water temperature. In a market with fluctuating European energy prices, paying 12% to 25% extra on your monthly gas or electric bill purely to "heat the scale" costs the average household hundreds of Euros annually.
        </p>

        <h3>Premature Appliance Failure & Capital Depreciation</h3>
        <p>
          Beyond monthly energy waste, the {severityLevel} mineral density of {location.name}'s water aggressively shortens the operational lifespan of expensive appliances. 
        </p>
        <ul>
          <li><strong>Central Heating Boilers:</strong> Scale accumulation constricts the narrow pipes inside heat exchangers. This leads to localized overheating (often heard as a "kettling" or popping sound inside the unit), stress fractures, and eventually, catastrophic failure. Replacing a modern heating system prematurely is a multi-thousand Euro capital loss.</li>
          <li><strong>Washing Machines & Dishwashers:</strong> Because these appliances constantly cycle hot water, they are prime targets for rapid calcification. Scale destroys the internal pump seals, coats the washing drums, and burns out the internal electrical heating rods.</li>
          <li><strong>Plumbing Infrastructure:</strong> Over a period of 5 to 10 years, the internal diameter of standard domestic hot water pipes can be reduced by up to 30%, lowering water pressure across the entire property and requiring expensive repiping.</li>
        </ul>

        <h3>Interpreting Your Calculator Results</h3>
        <p>
          The estimator provided above utilizes thermodynamic degradation formulas cross-referenced with {location.name}'s specific {hardness} mg/L hardness rating. The output represents the estimated <em>invisible</em> financial drain on your household. 
        </p>
        <p>
          If your calculated annual loss is significant, installing a mechanical ion-exchange water softener is often the most financially prudent decision. By completely removing the calcium before it enters your boiler, you stop the efficiency loss immediately and prevent future appliance depreciation.
        </p>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl mt-12">
          <h4 className="text-lg font-bold text-gray-900 mt-0 mb-2">Next Steps for {location.name} Residents</h4>
          <p className="text-sm text-gray-600 mb-4">
            Now that you understand the exact cost of limescale, compare it against the cost of mitigation. Use our dedicated local ROI tool to see how fast a solution pays for itself, or view the full regional water profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={`/${lang}/${country}/${region}/${city}/softener-roi-calculator`}
              className="text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Calculate Softener ROI
            </Link>
            <Link 
              href={`/${lang}/${country}/${region}/${city}`}
              className="text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded transition-colors"
            >
              View Full City Data
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}