// components/content/PropertyValueModule.tsx
import { AlertTriangle, TrendingDown, ShieldCheck } from 'lucide-react';

interface PropertyValueModuleProps {
  city: string;
  hardness: number;
}

export function PropertyValueModule({ city, hardness }: PropertyValueModuleProps) {
  const isHard = hardness > 150;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Does Hard Water Reduce Property Value in {city}?
      </h2>
      
      <div className="prose prose-blue max-w-none text-gray-600">
        <p>
          When evaluating real estate in the European market, hidden infrastructure issues can significantly impact property valuations. In {city}, the water hardness level of <strong>{hardness} mg/L</strong> plays a direct role in the lifespan of a home's internal plumbing and heating systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <TrendingDown className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Boiler & Heating Depreciation</h3>
          <p className="text-sm text-gray-600">
            Limescale buildup acts as an insulator. {isHard ? `Because ${city}'s water is hard, unmitigated scale can reduce boiler efficiency by up to 25%, often requiring premature replacement before a home sale.` : `Fortunately, ${city}'s softer water means central heating systems usually reach their full expected EU operational lifespan.`}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <AlertTriangle className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Plumbing & Flow Rate</h3>
          <p className="text-sm text-gray-600">
            Older properties utilizing copper or galvanized steel piping are susceptible to internal scaling. This restricts flow rate, which home inspectors regularly test during property surveys.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <ShieldCheck className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Insurance Considerations</h3>
          <p className="text-sm text-gray-600">
            Some EU home insurance policies contain clauses regarding maintenance. Water damage resulting from ignored, heavily scaled, and ultimately ruptured valves may complicate damage claims.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h4 className="text-sm font-bold text-blue-900 mb-1">Recommendation for {city} Homeowners</h4>
        <p className="text-sm text-blue-800">
          {isHard 
            ? "Installing a whole-house water softener is considered a value-add renovation in this region. Keep all installation and maintenance receipts to present to prospective buyers as proof of proactive infrastructure protection."
            : "Major water filtration investments are unlikely to yield a high ROI upon resale here, as the natural water quality is already favorable."}
        </p>
      </div>

      {/* Strict Disclaimer for Phase 3 Compliance */}
      <p className="mt-6 text-xs text-gray-400 italic">
        Disclaimer: The property value impact assessment is for informational purposes only and is based on general EU plumbing standards and appliance wear modeling. It does not constitute certified real estate appraisal, legal, or financial advice.
      </p>
    </div>
  );
}