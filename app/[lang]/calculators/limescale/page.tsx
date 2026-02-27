'use client';

import React, { useState, useMemo } from 'react';
import { Location } from '@/types';
import computedLocationsData from '@/data/locations-computed.json';
import LimescaleCostEstimator from '@/components/calculators/LimescaleCostEstimator';
import { Search, MapPin, Settings2 } from 'lucide-react';

const allLocations = computedLocationsData as Location[];

export default function GlobalLimescaleCalculator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Fallbacks for when no city is selected
  const [manualHardness, setManualHardness] = useState<number>(150); 
  const [kwhPrice, setKwhPrice] = useState<number>(0.30); 

  // Autocomplete filtering (Limits to 8 to keep the DOM light)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    return allLocations
      .filter(loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => b.population - a.population) // Show larger cities first
      .slice(0, 8); 
  }, [searchQuery]);

  const handleSelectCity = (city: Location) => {
    setSelectedLocation(city);
    setSearchQuery(''); // Clear search box
  };

  const activeHardness = selectedLocation ? selectedLocation.hardness_mg_l : manualHardness;
  const displayTitle = selectedLocation ? `Estimator: ${selectedLocation.name}` : 'Limescale Cost Estimator';

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      {/* SEO Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          European Limescale Cost Estimator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hard water significantly reduces the efficiency of your heating appliances. 
          Search for your municipality below or enter your water hardness manually to calculate your hidden energy losses.
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
        {/* Interactive Controls Section */}
        <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Search Tool */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                Find Your City Data
              </label>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Berlin, London, Madrid..." 
                className="w-full p-3 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              
              {/* Autocomplete Dropdown */}
              {searchResults.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {searchResults.map((city) => (
                    <li 
                      key={city.id}
                      onClick={() => handleSelectCity(city)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 flex justify-between items-center transition-colors"
                    >
                      <span className="font-medium text-gray-900">{city.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {city.country_slug.toUpperCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {selectedLocation && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start justify-between">
                  <div>
                    <p className="text-sm text-blue-800 font-semibold flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {selectedLocation.name} Selected
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Official Hardness: {selectedLocation.hardness_mg_l} mg/L
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedLocation(null)}
                    className="text-xs text-blue-600 underline hover:text-blue-800"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Manual Override Tool */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-emerald-600" />
                Manual Adjustments
              </label>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Water Hardness (mg/L)</span>
                    <span className="font-bold text-gray-900">{activeHardness} mg/L</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="400" 
                    value={activeHardness}
                    onChange={(e) => {
                      setSelectedLocation(null); // Detach city if manually changed
                      setManualHardness(Number(e.target.value));
                    }}
                    className="w-full accent-emerald-600"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Energy Price (€/kWh)</span>
                    <span className="font-bold text-gray-900">€{kwhPrice.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.10" 
                    max="0.80" 
                    step="0.01"
                    value={kwhPrice}
                    onChange={(e) => setKwhPrice(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* The Actual Calculator Component Render */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
            {displayTitle}
          </h2>
          {/* We pass the active variables down to your existing component */}
          <LimescaleCostEstimator hardness={activeHardness} kwhPrice={kwhPrice} />
        </div>
      </div>

      {/* SEO & Contextual Authority Content (Replaces thin doorway text) */}
      <article className="prose prose-blue max-w-none text-gray-600">
        <h3>How This Calculation Works</h3>
        <p>
          Limescale (calcium carbonate) acts as a highly effective thermal insulator. When water exceeding 120 mg/L of hardness is heated in boilers, washing machines, or dishwashers, these minerals precipitate and coat the heating elements.
        </p>
        <p>
          According to thermodynamic studies, just <strong>1.6mm of limescale buildup</strong> on a heating element can decrease its heat transfer efficiency by up to 12%. This forces the appliance to consume more electricity or gas to achieve the target water temperature, directly inflating your utility bills.
        </p>
        <h4>Methodology</h4>
        <p>
          Our calculator uses a proprietary scaling model derived from regional municipal water data. By inputting your city or local mineral concentration (mg/L) alongside current localized energy costs (€/kWh), we project the progressive efficiency loss over a standard 12-month appliance lifecycle. 
        </p>
      </article>
    </main>
  );
}