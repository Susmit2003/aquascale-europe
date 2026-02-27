import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Building2, 
  Coffee, 
  Hotel, 
  ChefHat, 
  ArrowLeft, 
  Wrench, 
  AlertTriangle,
  Settings
} from 'lucide-react';
import computedLocationsData from '@/data/locations-computed.json';
import { Location } from '@/types';

const allLocations = computedLocationsData as Location[];

interface PageProps {
  params: Promise<{ lang: string; country: string; region: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const displayCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  
  return {
    title: `Commercial Water Hardness in ${displayCity} | B2B Limescale Guide`,
    description: `Complete commercial water quality report for businesses in ${displayCity}. Protect your espresso machines, hotel boilers, and industrial equipment from ${location?.hardness_mg_l || 0} mg/L limescale.`,
  };
}

export default async function CommercialCityPage({ params }: PageProps) {
  // 1. Await params (Next.js 15+ Requirement)
  const { lang, country, region, city } = await params;
  
  // 2. Safely decode the city name
  const decodedCity = decodeURIComponent(city);
  const displayCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);

  // 3. Fetch real data from the JSON database
  const location = allLocations.find(l => l.name.toLowerCase() === decodedCity.toLowerCase());
  if (!location) return notFound();

  const hardness = location.hardness_mg_l;
  const isHard = hardness > 120;

  // Commercial Math Logic
  const espressoDescaleWeeks = Math.max(1, Math.round(500 / hardness)); 
  const boilerEfficiencyLoss = Math.min((hardness * 0.02), 30).toFixed(1);

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 mt-4">
      
      {/* Back Navigation */}
      <Link 
        href={`/${lang}/${country}/${region}/${city}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {displayCity} Residential Overview
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="w-8 h-8 text-slate-700" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight m-0">
            Commercial Data: {displayCity}
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          B2B water quality analysis for the HoReCa sector (Hotels, Restaurants, Cafes) and industrial facilities operating in {displayCity}.
        </p>
      </header>

      {/* Critical Alert Box */}
      <div className={`rounded-xl p-6 border mb-12 flex items-start gap-4 ${isHard ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
        <AlertTriangle className={`w-8 h-8 shrink-0 ${isHard ? 'text-red-500' : 'text-emerald-500'}`} />
        <div>
          <h2 className={`text-xl font-bold mb-2 ${isHard ? 'text-red-900' : 'text-emerald-900'}`}>
            Operational Risk Level: {isHard ? 'HIGH' : 'LOW'}
          </h2>
          <p className={`text-sm leading-relaxed ${isHard ? 'text-red-800' : 'text-emerald-800'}`}>
            The municipal water supply in {displayCity} averages <strong>{hardness} mg/L</strong> of calcium carbonate. 
            {isHard 
              ? ` Without commercial-grade reverse osmosis or cation-exchange softening, businesses will experience rapid equipment scaling, resulting in an estimated ${boilerEfficiencyLoss}% drop in thermal efficiency within the first 12 months.`
              : ' This is considered soft water. Commercial equipment will generally operate at peak efficiency with standard preventative maintenance and minimal scaling issues.'}
          </p>
        </div>
      </div>

      {/* Industry Impact Grid */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sector-Specific Impacts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Cafes */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Specialty Coffee</h3>
          <p className="text-sm text-gray-600 mb-4">
            At {hardness} mg/L, commercial espresso machines lacking inline filtration will require chemical backflushing and descaling approximately every <strong>{espressoDescaleWeeks} weeks</strong> to prevent boiler failure.
          </p>
        </div>

        {/* Hotels */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-4">
            <Hotel className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Hospitality & Laundry</h3>
          <p className="text-sm text-gray-600 mb-4">
            Hotel linens washed in {displayCity}'s water {isHard ? 'will require up to 30% more detergent to achieve standard cleanliness, and fabric lifespan will be significantly reduced due to mineral micro-abrasions.' : 'will wash efficiently with standard detergent dosing.'}
          </p>
        </div>

        {/* Restaurants */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-xl flex items-center justify-center mb-4">
            <ChefHat className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Commercial Kitchens</h3>
          <p className="text-sm text-gray-600 mb-4">
            Industrial dishwashers and combi-ovens {isHard ? 'are at severe risk of spray-nozzle clogging. A dedicated commercial water softener is strictly recommended to maintain health code compliance for glassware.' : 'will perform optimally with standard maintenance protocols.'}
          </p>
        </div>
      </div>

      {/* CTA / Lead Gen */}
      <div className="bg-slate-900 rounded-2xl p-8 text-center text-white border border-slate-800">
        <Wrench className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Need a Commercial Solution in {displayCity}?</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8">
          Get a free consultation for high-capacity RO systems, commercial softeners, and preventative maintenance plans tailored to local water conditions.
        </p>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 mx-auto">
          <Settings className="w-5 h-5" /> Request B2B Quote
        </button>
      </div>

    </main>
  );
}