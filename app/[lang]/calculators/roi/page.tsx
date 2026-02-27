'use client';

import React, { useState, useMemo } from 'react';
import { Location } from '@/types';
import computedLocationsData from '@/data/locations-computed.json';
import { SoftenerROICalculator } from '@/components/calculators/SoftenerROICalculator';
import { Search, MapPin, Settings2, Users } from 'lucide-react';

const allLocations = computedLocationsData as Location[];

export default function GlobalROICalculator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Base State Variables for the Calculator
  const [manualHardness, setManualHardness] = useState<number>(200); 
  const [householdSize, setHouseholdSize] = useState<number>(3);
  const [softenerCost, setSoftenerCost] = useState<number>(800);

  // Autocomplete filtering for the search bar
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    return allLocations
      .filter(loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => b.population - a.population) 
      .slice(0, 8); 
  }, [searchQuery]);

  const handleSelectCity = (city: Location) => {
    setSelectedLocation(city);
    setSearchQuery(''); 
  };

  const activeHardness = selectedLocation ? selectedLocation.hardness_mg_l : manualHardness;
  const displayTitle = selectedLocation ? `ROI Projection: ${selectedLocation.name}` : 'Water Softener ROI Calculator';

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      {/* SEO & Context Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Water Softener ROI Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find out exactly how long it will take for a water softener to pay for itself through savings on energy bills, detergents, and appliance replacements.
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
        {/* Interactive Controls */}
        <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* City Search Tool */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                Step 1: Find Your Local Hardness
              </label>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your city (e.g., Munich, Paris)..." 
                className="w-full p-3 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              
              {searchResults.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {searchResults.map((city) => (
                    <li 
                      key={city.id}
                      onClick={() => handleSelectCity(city)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 flex justify-between items-center"
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

            {/* Manual Household & Financial Inputs */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-emerald-600" />
                Step 2: Household Details
              </label>
              <div className="space-y-5">
                
                {/* Manual Hardness Fallback */}
                {!selectedLocation && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Water Hardness</span>
                      <span className="font-bold text-gray-900">{activeHardness} mg/L</span>
                    </div>
                    <input 
                      type="range" min="50" max="500" value={activeHardness}
                      onChange={(e) => setManualHardness(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                )}

                {/* Household Size */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3"/> People in Home</span>
                    <span className="font-bold text-gray-900">{householdSize}</span>
                  </div>
                  <input 
                    type="range" min="1" max="8" value={householdSize}
                    onChange={(e) => setHouseholdSize(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                {/* Softener Installation Cost */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Estimated Softener Cost (€)</span>
                    <span className="font-bold text-gray-900">€{softenerCost}</span>
                  </div>
                  <input 
                    type="range" min="300" max="2500" step="50" value={softenerCost}
                    onChange={(e) => setSoftenerCost(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* The Calculator Render */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
            {displayTitle}
          </h2>
          {/* Note: Ensure these prop names match what your SoftenerROICalculator component expects */}
         <SoftenerROICalculator 
            hardness={activeHardness} 
            householdSize={householdSize} 
            systemCost={softenerCost} 
            />
        </div>
      </div>

      {/* SEO & Authority Text */}
      <article className="prose prose-blue max-w-none text-gray-600">
        <h3>Understanding Your Return on Investment</h3>
        <p>
          A water softener is one of the few home appliances that actively pays for itself. Hard water forces you to spend more money across three main categories:
        </p>
        <ul>
          <li><strong>Energy Inefficiency:</strong> Limescale coats heating elements in boilers and washing machines, increasing energy consumption by up to 24%.</li>
          <li><strong>Soap and Detergent Waste:</strong> Calcium and magnesium bind with soap, preventing it from lathering. Soft water allows you to use up to 50% less laundry detergent, dish soap, and shampoo.</li>
          <li><strong>Appliance Lifespan:</strong> Heavy scale buildup can reduce the lifespan of water heaters and dishwashers by several years, forcing premature replacements.</li>
        </ul>
        <p>
          By subtracting the ongoing maintenance costs of a softener (salt blocks and water used for regeneration) from these household savings, this calculator provides a highly accurate timeline of when your system will break even.
        </p>
      </article>
    </main>
  );
}