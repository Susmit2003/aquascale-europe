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

  // Color mapper based on hardness severity
  const getHardnessColor = (val: number) => {
    if (val < 60) return 'bg-blue-400'; // Soft
    if (val < 120) return 'bg-emerald-400'; // Moderately Hard
    if (val < 180) return 'bg-orange-400'; // Hard
    return 'bg-red-500'; // Very Hard
  };

  const maxVal = Math.max(...locations.map(l => l.value), 200);

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Map className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 m-0">
          Regional Hardness Comparison
        </h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-8">
        How does {city} compare to the rest of {countryName} and the broader European Union? 
        Higher values indicate a greater concentration of calcium and magnesium.
      </p>

      <div className="space-y-6">
        {locations.map((loc, idx) => (
          <div key={idx} className="relative">
            <div className="flex justify-between text-sm font-medium mb-1.5">
              <span className={loc.isMain ? "text-gray-900 font-bold" : "text-gray-600"}>
                {loc.label}
              </span>
              <span className={loc.isMain ? "text-gray-900 font-bold" : "text-gray-500"}>
                {loc.value} mg/L
              </span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden flex">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${getHardnessColor(loc.value)} ${loc.isMain ? 'shadow-[0_0_10px_rgba(0,0,0,0.2)]' : 'opacity-80'}`}
                style={{ width: `${(loc.value / maxVal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Geographical Note:</strong> Water hardness varies drastically across Europe due to diverse geological compositions. Regions drawing from limestone aquifers (like the Balkans and Southern England) generally record higher mg/L than those drawing from granite basins (like Scandinavia or Scotland).
        </p>
      </div>
    </div>
  );
}