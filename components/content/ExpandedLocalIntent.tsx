// // components/content/ExpandedLocalIntent.tsx
// import { ShieldCheck, Globe2, Droplets } from 'lucide-react';

// interface LocalIntentProps {
//   city: string;
//   country: string;
//   hardness: number;
// }

// export function ExpandedLocalIntent({ city, country, hardness }: LocalIntentProps) {
//   const londonHardness = 275;
//   const comparisonPercent = Math.round(Math.abs((hardness - londonHardness) / londonHardness) * 100);
//   const isSofter = hardness < londonHardness;

//   return (
//     <div className="mt-12 space-y-8">
//       <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">
//         Drinking Water Safety & Quality in {city}
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Drinking Safety FAQ */}
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-4 text-emerald-700">
//             <ShieldCheck className="w-6 h-6" />
//             <h3 className="font-semibold text-lg">Is it safe to drink the tap water?</h3>
//           </div>
//           <p className="text-sm text-gray-700 leading-relaxed">
//             Yes, public tap water in {city} is generally safe to drink and complies with the EU Drinking Water Directive. The hardness level of {hardness} mg/L is a cosmetic and plumbing issue, not a health risk. In fact, the dissolved calcium and magnesium contribute to your daily dietary mineral intake.
//           </p>
//         </div>

//         {/* Major Market Comparison */}
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-4 text-indigo-700">
//             <Globe2 className="w-6 h-6" />
//             <h3 className="font-semibold text-lg">EU Market Comparison</h3>
//           </div>
//           <p className="text-sm text-gray-700 leading-relaxed">
//             To put {city}'s water in perspective, compared to major European hubs like London ({londonHardness} mg/L), the water here is <strong>{comparisonPercent}% {isSofter ? 'softer' : 'harder'}</strong>. Residents relocating from the UK or Munich will notice a distinct difference in soap lathering and appliance lifespan.
//           </p>
//         </div>
//       </div>

//       {/* Real World Case Study Injection */}
//       <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden">
//         <Droplets className="absolute -right-4 -top-4 w-24 h-24 text-slate-800 opacity-50" />
//         <h3 className="text-lg font-bold text-blue-400 mb-2">Real-World Scale Accumulation</h3>
//         <p className="text-sm text-slate-300 relative z-10">
//           A typical 80m² apartment in {city} using a standard combi-boiler heating system will accumulate approximately <strong>{(hardness * 0.007).toFixed(1)} kg of solid calcium limescale</strong> per year if the water is left untreated.
//         </p>
//       </div>
//     </div>
//   );
// }


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
    <div className="mt-16 space-y-10 font-sans text-zinc-800">
      <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight border-b border-zinc-100 pb-5">
        Drinking Water Safety & Quality in {city}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Drinking Safety FAQ */}
        <div className="bg-white p-8 rounded-2xl md:rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-zinc-900 tracking-tight text-xl m-0">Is it safe to drink?</h3>
          </div>
          <p className="text-zinc-600 font-light leading-relaxed">
            Yes, public tap water in {city} is generally safe to drink and complies with the <strong className="font-medium text-zinc-800">EU Drinking Water Directive</strong>. The hardness level of <span className="tabular-nums font-medium text-zinc-700">{hardness}</span> mg/L is a cosmetic and plumbing issue, not a health risk. In fact, the dissolved calcium and magnesium contribute to your daily dietary mineral intake.
          </p>
        </div>

        {/* Major Market Comparison */}
        <div className="bg-white p-8 rounded-2xl md:rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center shrink-0 border border-sky-100/50">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-zinc-900 tracking-tight text-xl m-0">EU Market Comparison</h3>
          </div>
          <p className="text-zinc-600 font-light leading-relaxed">
            To put {city}'s water in perspective, compared to major European hubs like London (<span className="tabular-nums font-medium text-zinc-700">{londonHardness}</span> mg/L), the water here is <strong className="font-medium text-zinc-800 tabular-nums">{comparisonPercent}% {isSofter ? 'softer' : 'harder'}</strong>. Residents relocating from the UK or Munich will notice a distinct difference in soap lathering and appliance lifespan.
          </p>
        </div>
      </div>

      {/* Real World Case Study Injection */}
      <div className="bg-zinc-900 text-zinc-100 rounded-2xl md:rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-xl border border-zinc-800 mt-10">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-900/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <Droplets className="absolute -right-6 -bottom-6 w-32 h-32 text-zinc-800 opacity-40 transform -rotate-12 pointer-events-none" />
        
        <h3 className="text-xl font-semibold text-sky-400 tracking-tight mb-4 relative z-10">Real-World Scale Accumulation</h3>
        <p className="text-zinc-400 font-light leading-relaxed relative z-10 text-lg">
          A typical 80m² apartment in {city} using a standard combi-boiler heating system will accumulate approximately <strong className="text-white font-medium tabular-nums tracking-wide">{(hardness * 0.007).toFixed(1)} kg of solid calcium limescale</strong> per year if the water is left untreated.
        </p>
        
      </div>
    </div>
  );
}