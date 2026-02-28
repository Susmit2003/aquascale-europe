// // components/content/PropertyValueModule.tsx
// import { AlertTriangle, TrendingDown, ShieldCheck } from 'lucide-react';

// interface PropertyValueModuleProps {
//   city: string;
//   hardness: number;
// }

// export function PropertyValueModule({ city, hardness }: PropertyValueModuleProps) {
//   const isHard = hardness > 150;
  
//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">
//         Does Hard Water Reduce Property Value in {city}?
//       </h2>
      
//       <div className="prose prose-blue max-w-none text-gray-600">
//         <p>
//           When evaluating real estate in the European market, hidden infrastructure issues can significantly impact property valuations. In {city}, the water hardness level of <strong>{hardness} mg/L</strong> plays a direct role in the lifespan of a home's internal plumbing and heating systems.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//           <TrendingDown className="w-8 h-8 text-red-500 mb-3" />
//           <h3 className="font-semibold text-gray-900 mb-2">Boiler & Heating Depreciation</h3>
//           <p className="text-sm text-gray-600">
//             Limescale buildup acts as an insulator. {isHard ? `Because ${city}'s water is hard, unmitigated scale can reduce boiler efficiency by up to 25%, often requiring premature replacement before a home sale.` : `Fortunately, ${city}'s softer water means central heating systems usually reach their full expected EU operational lifespan.`}
//           </p>
//         </div>

//         <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//           <AlertTriangle className="w-8 h-8 text-orange-500 mb-3" />
//           <h3 className="font-semibold text-gray-900 mb-2">Plumbing & Flow Rate</h3>
//           <p className="text-sm text-gray-600">
//             Older properties utilizing copper or galvanized steel piping are susceptible to internal scaling. This restricts flow rate, which home inspectors regularly test during property surveys.
//           </p>
//         </div>

//         <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//           <ShieldCheck className="w-8 h-8 text-green-500 mb-3" />
//           <h3 className="font-semibold text-gray-900 mb-2">Insurance Considerations</h3>
//           <p className="text-sm text-gray-600">
//             Some EU home insurance policies contain clauses regarding maintenance. Water damage resulting from ignored, heavily scaled, and ultimately ruptured valves may complicate damage claims.
//           </p>
//         </div>
//       </div>

//       <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
//         <h4 className="text-sm font-bold text-blue-900 mb-1">Recommendation for {city} Homeowners</h4>
//         <p className="text-sm text-blue-800">
//           {isHard 
//             ? "Installing a whole-house water softener is considered a value-add renovation in this region. Keep all installation and maintenance receipts to present to prospective buyers as proof of proactive infrastructure protection."
//             : "Major water filtration investments are unlikely to yield a high ROI upon resale here, as the natural water quality is already favorable."}
//         </p>
//       </div>

//       {/* Strict Disclaimer for Phase 3 Compliance */}
//       <p className="mt-6 text-xs text-gray-400 italic">
//         Disclaimer: The property value impact assessment is for informational purposes only and is based on general EU plumbing standards and appliance wear modeling. It does not constitute certified real estate appraisal, legal, or financial advice.
//       </p>
//     </div>
//   );
// }





// components/content/PropertyValueModule.tsx
import { AlertTriangle, TrendingDown, ShieldCheck } from 'lucide-react';

interface PropertyValueModuleProps {
  city: string;
  hardness: number;
}

export function PropertyValueModule({ city, hardness }: PropertyValueModuleProps) {
  const isHard = hardness > 150;
  
  return (
    <div className="mt-16 font-sans text-zinc-800">
      <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight border-b border-zinc-100 pb-5 mb-8">
        Does Hard Water Reduce Property Value in {city}?
      </h2>
      
      <div className="text-lg text-zinc-600 font-light leading-relaxed mb-10 max-w-4xl">
        <p>
          When evaluating real estate in the European market, hidden infrastructure issues can significantly impact property valuations. In {city}, the water hardness level of <strong className="font-medium text-zinc-800 tabular-nums">{hardness} mg/L</strong> plays a direct role in the lifespan of a home's internal plumbing and heating systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white p-8 rounded-2xl md:rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 border border-rose-100/50 mb-6">
            <TrendingDown className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-zinc-900 tracking-tight text-xl mb-3">Boiler & Heating Depreciation</h3>
          <p className="text-zinc-600 font-light leading-relaxed">
            Limescale buildup acts as an insulator. {isHard ? `Because ${city}'s water is hard, unmitigated scale can reduce boiler efficiency by up to 25%, often requiring premature replacement before a home sale.` : `Fortunately, ${city}'s softer water means central heating systems usually reach their full expected EU operational lifespan.`}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl md:rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 border border-amber-100/50 mb-6">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-zinc-900 tracking-tight text-xl mb-3">Plumbing & Flow Rate</h3>
          <p className="text-zinc-600 font-light leading-relaxed">
            Older properties utilizing copper or galvanized steel piping are susceptible to internal scaling. This restricts flow rate, which home inspectors regularly test during property surveys.
          </p>
          
        </div>

        <div className="bg-white p-8 rounded-2xl md:rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100/50 mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-zinc-900 tracking-tight text-xl mb-3">Insurance Considerations</h3>
          <p className="text-zinc-600 font-light leading-relaxed">
            Some EU home insurance policies contain clauses regarding maintenance. Water damage resulting from ignored, heavily scaled, and ultimately ruptured valves may complicate damage claims.
          </p>
        </div>
      </div>

      <div className="bg-sky-50/50 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-sky-100/50 flex flex-col gap-3">
        <h4 className="font-semibold text-sky-950 tracking-tight text-xl">Recommendation for {city} Homeowners</h4>
        <p className="text-sky-800/90 font-light leading-relaxed text-lg">
          {isHard 
            ? "Installing a whole-house water softener is considered a value-add renovation in this region. Keep all installation and maintenance receipts to present to prospective buyers as proof of proactive infrastructure protection."
            : "Major water filtration investments are unlikely to yield a high ROI upon resale here, as the natural water quality is already favorable."}
        </p>
      </div>

      {/* Strict Disclaimer for Phase 3 Compliance */}
      <p className="mt-8 text-xs text-zinc-400 font-light leading-relaxed max-w-3xl">
        <strong className="font-medium text-zinc-500">Disclaimer:</strong> The property value impact assessment is for informational purposes only and is based on general EU plumbing standards and appliance wear modeling. It does not constitute certified real estate appraisal, legal, or financial advice.
      </p>
    </div>
  );
}