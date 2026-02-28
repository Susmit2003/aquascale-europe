// // components/charts/RegionalHeatmap.tsx
// import { Map, Info } from 'lucide-react';

// interface RegionalHeatmapProps {
//   city: string;
//   cityHardness: number;
//   regionName: string;
//   regionAvg: number;
//   countryName: string;
//   countryAvg: number;
// }

// export function RegionalHeatmap({ 
//   city, 
//   cityHardness, 
//   regionName, 
//   regionAvg, 
//   countryName, 
//   countryAvg 
// }: RegionalHeatmapProps) {
//   const euAvg = 120; // Standardized European average baseline

//   const locations = [
//     { label: city, value: cityHardness, isMain: true },
//     { label: `${regionName} (Region)`, value: regionAvg, isMain: false },
//     { label: `${countryName} (National)`, value: countryAvg, isMain: false },
//     { label: 'EU Average', value: euAvg, isMain: false },
//   ].sort((a, b) => b.value - a.value); // Sort highest to lowest

//   // Color mapper based on hardness severity
//   const getHardnessColor = (val: number) => {
//     if (val < 60) return 'bg-blue-400'; // Soft
//     if (val < 120) return 'bg-emerald-400'; // Moderately Hard
//     if (val < 180) return 'bg-orange-400'; // Hard
//     return 'bg-red-500'; // Very Hard
//   };

//   const maxVal = Math.max(...locations.map(l => l.value), 200);

//   return (
//     <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//       <div className="flex items-center gap-3 mb-6">
//         <Map className="w-7 h-7 text-blue-600" />
//         <h2 className="text-2xl font-bold text-gray-900 m-0">
//           Regional Hardness Comparison
//         </h2>
//       </div>
      
//       <p className="text-sm text-gray-600 mb-8">
//         How does {city} compare to the rest of {countryName} and the broader European Union? 
//         Higher values indicate a greater concentration of calcium and magnesium.
//       </p>

//       <div className="space-y-6">
//         {locations.map((loc, idx) => (
//           <div key={idx} className="relative">
//             <div className="flex justify-between text-sm font-medium mb-1.5">
//               <span className={loc.isMain ? "text-gray-900 font-bold" : "text-gray-600"}>
//                 {loc.label}
//               </span>
//               <span className={loc.isMain ? "text-gray-900 font-bold" : "text-gray-500"}>
//                 {loc.value} mg/L
//               </span>
//             </div>
            
//             <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden flex">
//               <div 
//                 className={`h-full rounded-full transition-all duration-1000 ${getHardnessColor(loc.value)} ${loc.isMain ? 'shadow-[0_0_10px_rgba(0,0,0,0.2)]' : 'opacity-80'}`}
//                 style={{ width: `${(loc.value / maxVal) * 100}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 flex items-start gap-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
//         <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
//         <p className="text-xs text-slate-600 leading-relaxed">
//           <strong>Geographical Note:</strong> Water hardness varies drastically across Europe due to diverse geological compositions. Regions drawing from limestone aquifers (like the Balkans and Southern England) generally record higher mg/L than those drawing from granite basins (like Scandinavia or Scotland).
//         </p>
//       </div>
//     </div>
//   );
// }




// components/charts/RegionalHeatmap.tsx
import { Map, Info } from 'lucide-react';

interface RegionalHeatmapProps {
  city: string;
  cityHardness: number;
  regionName: string;
  regionAvg: number;
  countryName: string;
  countryAvg: number;
}

export function RegionalHeatmap({ 
  city, 
  cityHardness, 
  regionName, 
  regionAvg, 
  countryName, 
  countryAvg 
}: RegionalHeatmapProps) {
  const euAvg = 120; // Standardized European average baseline

  const locations = [
    { label: city, value: cityHardness, isMain: true },
    { label: `${regionName} (Region)`, value: regionAvg, isMain: false },
    { label: `${countryName} (National)`, value: countryAvg, isMain: false },
    { label: 'EU Average', value: euAvg, isMain: false },
  ].sort((a, b) => b.value - a.value); // Sort highest to lowest

  // Color mapper based on hardness severity (using the new premium palette)
  const getHardnessColor = (val: number) => {
    if (val < 60) return 'bg-sky-400'; // Soft
    if (val < 120) return 'bg-emerald-400'; // Moderately Hard
    if (val < 180) return 'bg-amber-400'; // Hard
    return 'bg-rose-500'; // Very Hard
  };

  const maxVal = Math.max(...locations.map(l => l.value), 200);

  return (
    <div className="mt-16 bg-white rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300 border border-zinc-200 p-8 md:p-10 font-sans">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center shrink-0 border border-sky-100/50">
          <Map className="w-6 h-6" />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 tracking-tight m-0">
          Regional Hardness Comparison
        </h2>
      </div>
      
      <p className="text-zinc-600 font-light leading-relaxed mb-10 text-lg">
        How does {city} compare to the rest of {countryName} and the broader European Union? 
        Higher values indicate a greater concentration of calcium and magnesium.
      </p>

      <div className="space-y-7">
        {locations.map((loc, idx) => (
          <div key={idx} className="relative group">
            <div className="flex justify-between items-end mb-2">
              <span className={`text-sm tracking-wide ${loc.isMain ? "text-zinc-900 font-semibold" : "text-zinc-500 font-medium"}`}>
                {loc.label}
              </span>
              <span className={`text-sm tabular-nums ${loc.isMain ? "text-zinc-900 font-semibold" : "text-zinc-500 font-light"}`}>
                {loc.value} mg/L
              </span>
            </div>
            
            <div className="w-full bg-zinc-100/80 rounded-full h-3.5 overflow-hidden flex shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getHardnessColor(loc.value)} ${loc.isMain ? 'shadow-[0_0_12px_rgba(0,0,0,0.15)] group-hover:brightness-110' : 'opacity-85 group-hover:opacity-100'}`}
                style={{ width: `${(loc.value / maxVal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-50/80 px-5 py-4 rounded-xl flex gap-4 items-start border border-zinc-200 mt-10">
        <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-500 font-light leading-relaxed m-0">
          <strong className="font-medium text-zinc-700">Geographical Note:</strong> Water hardness varies drastically across Europe due to diverse geological compositions. Regions drawing from limestone aquifers (like the Balkans and Southern England) generally record higher mg/L than those drawing from granite basins (like Scandinavia or Scotland).
          <div className="mt-4 rounded-lg overflow-hidden border border-zinc-200">
            
          </div>
        </div>
      </div>
    </div>
  );
}