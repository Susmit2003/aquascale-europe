import { Location } from '@/types';

interface ChartProps {
  currentCity: Location;
  allLocations: Location[];
}

export default function ComparisonChart({ currentCity, allLocations }: ChartProps) {
  // 1. Calculate Regional Average
  const regionalCities = allLocations.filter(l => l.region_slug === currentCity.region_slug);
  const regionAvg = Math.round(regionalCities.reduce((acc, curr) => acc + curr.hardness_mg_l, 0) / regionalCities.length);

  // 2. Calculate Country Average
  const countryCities = allLocations.filter(l => l.country_slug === currentCity.country_slug);
  const countryAvg = Math.round(countryCities.reduce((acc, curr) => acc + curr.hardness_mg_l, 0) / countryCities.length);

  // Find the max value to scale the graph (cap at 300 for visual consistency)
  const maxScale = Math.max(currentCity.hardness_mg_l, regionAvg, countryAvg, 250);

  const dataPoints = [
    { label: currentCity.name, value: currentCity.hardness_mg_l, color: 'bg-blue-600' },
    { label: `${currentCity.region_slug.replace('-', ' ')} (Region Avg)`, value: regionAvg, color: 'bg-gray-400' },
    { label: `${currentCity.country_slug.replace('-', ' ')} (National Avg)`, value: countryAvg, color: 'bg-gray-300' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Hardness Comparison: Local vs. National</h3>
      
      <div className="space-y-5">
        {dataPoints.map((point, idx) => (
          <div key={idx} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 capitalize">{point.label}</span>
              <span className="text-sm font-bold text-gray-900">{point.value} mg/L</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className={`${point.color} h-3 rounded-full transition-all duration-1000`} 
                style={{ width: `${(point.value / maxScale) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">
        *Data aggregated from {regionalCities.length} municipalities in the region and {countryCities.length} nationwide.
      </p>
    </div>
  );
}