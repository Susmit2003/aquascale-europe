// components/content/ExpandedLocalIntent.tsx
import { ShieldCheck, Globe2, Droplets } from 'lucide-react';

interface LocalIntentProps {
  city: string;
  country: string;
  hardness: number;
}

export function ExpandedLocalIntent({ city, country, hardness }: LocalIntentProps) {
  const londonHardness = 275;
  const comparisonPercent = Math.round(Math.abs((hardness - londonHardness) / londonHardness) * 100);
  const isSofter = hardness < londonHardness;

  return (
    <div className="mt-12 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">
        Drinking Water Safety & Quality in {city}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drinking Safety FAQ */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-emerald-700">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Is it safe to drink the tap water?</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Yes, public tap water in {city} is generally safe to drink and complies with the EU Drinking Water Directive. The hardness level of {hardness} mg/L is a cosmetic and plumbing issue, not a health risk. In fact, the dissolved calcium and magnesium contribute to your daily dietary mineral intake.
          </p>
        </div>

        {/* Major Market Comparison */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-indigo-700">
            <Globe2 className="w-6 h-6" />
            <h3 className="font-semibold text-lg">EU Market Comparison</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            To put {city}'s water in perspective, compared to major European hubs like London ({londonHardness} mg/L), the water here is <strong>{comparisonPercent}% {isSofter ? 'softer' : 'harder'}</strong>. Residents relocating from the UK or Munich will notice a distinct difference in soap lathering and appliance lifespan.
          </p>
        </div>
      </div>

      {/* Real World Case Study Injection */}
      <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden">
        <Droplets className="absolute -right-4 -top-4 w-24 h-24 text-slate-800 opacity-50" />
        <h3 className="text-lg font-bold text-blue-400 mb-2">Real-World Scale Accumulation</h3>
        <p className="text-sm text-slate-300 relative z-10">
          A typical 80m² apartment in {city} using a standard combi-boiler heating system will accumulate approximately <strong>{(hardness * 0.007).toFixed(1)} kg of solid calcium limescale</strong> per year if the water is left untreated.
        </p>
      </div>
    </div>
  );
}