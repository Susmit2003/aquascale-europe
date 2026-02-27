// components/content/ProductMatchEngine.tsx
"use client";

import { useState, useMemo } from 'react';
import { Check, Info, AlertTriangle, ExternalLink } from 'lucide-react';

interface ProductMatchEngineProps {
  city: string;
  hardness: number;
}

type HomeSize = 'apartment' | 'house_small' | 'house_large';
type Budget = 'low' | 'medium' | 'high';

export function ProductMatchEngine({ city, hardness }: ProductMatchEngineProps) {
  const [homeSize, setHomeSize] = useState<HomeSize>('apartment');
  const [budget, setBudget] = useState<Budget>('medium');

  const isHard = hardness > 150;

  // Dynamic recommendation logic based on hardness, size, and budget
  const recommendations = useMemo(() => {
    if (!isHard) {
      return [
        {
          name: "High-Capacity Carbon Pitcher",
          type: "Taste & Odor",
          price: "€30 - €60",
          desc: `${city} water is relatively soft at ${hardness} mg/L. A simple carbon filter is sufficient to remove chlorine taste.`,
          features: ["Improves taste", "No plumbing required", "Eco-friendly"],
        }
      ];
    }

    const recs = [];
    if (homeSize === 'apartment' || budget === 'low') {
      recs.push({
        name: "Multi-Stage Shower Filter",
        type: "Point-of-Use",
        price: "€40 - €90",
        desc: `Ideal for renters in ${city}. Protects skin and hair from ${hardness} mg/L hard water without altering main plumbing.`,
        features: ["5-minute install", "Reduces scale on tiles", "No salt required"],
      });
      recs.push({
        name: "Electronic Water Descaler",
        type: "Pipe Wrap",
        price: "€150 - €250",
        desc: "Wraps around your main pipe. Doesn't remove calcium, but changes its structure so it doesn't stick to pipes.",
        features: ["Zero maintenance", "Maintains water pressure", "Easy DIY install"],
      });
    } else {
      recs.push({
        name: "Non-Electric Twin Tank Softener",
        type: "Whole House (Ion Exchange)",
        price: "€600 - €1,200",
        desc: `The gold standard for a house in ${city}. Completely removes calcium to protect boilers and plumbing.`,
        features: ["Zero electricity used", "Continuous soft water", "High flow rate"],
      });
      if (budget === 'high') {
        recs.push({
          name: "Smart Wi-Fi Water Softener",
          type: "Whole House (High Efficiency)",
          price: "€1,000+",
          desc: "Monitors your exact water usage to minimize salt and water waste during regeneration cycles.",
          features: ["App tracking", "Salt-level alerts", "EU Eco-compliant"],
        });
      }
    }
    return recs;
  }, [hardness, homeSize, budget, city, isHard]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-12">
      <div className="bg-slate-900 px-6 py-5">
        <h2 className="text-xl font-bold text-white m-0">
          Best Water Solutions for {city} ({hardness} mg/L)
        </h2>
        <p className="text-slate-300 text-sm mt-1">Select your household details for personalized, non-sponsored recommendations.</p>
      </div>

      {/* Interactive Filters */}
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Property Size</label>
          <select 
            value={homeSize} 
            onChange={(e) => setHomeSize(e.target.value as HomeSize)}
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-blue-500"
          >
            <option value="apartment">Apartment / Flat (1-1.5 Baths)</option>
            <option value="house_small">Small House (1-2 Baths)</option>
            <option value="house_large">Large House (3+ Baths)</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Budget Tier</label>
          <select 
            value={budget} 
            onChange={(e) => setBudget(e.target.value as Budget)}
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-blue-500"
          >
            <option value="low">Budget-Friendly (&lt; €100)</option>
            <option value="medium">Standard (€100 - €600)</option>
            <option value="high">Premium / Smart (€600+)</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="p-6 space-y-6">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-6 border border-gray-200 rounded-xl p-5 hover:border-blue-400 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">{rec.type}</span>
                <span className="text-gray-500 text-sm font-medium">{rec.price}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{rec.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{rec.desc}</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {rec.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <Check className="w-4 h-4 text-green-500 shrink-0" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-48 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                Check Prices <ExternalLink className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-gray-400 text-center leading-tight">
                *We may earn a commission from affiliate links.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* EU Eco Warning */}
      {isHard && (homeSize !== 'apartment') && (
        <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-100 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
          <p className="text-xs text-yellow-800 leading-relaxed">
            <strong>EU Compliance Note:</strong> Traditional salt-based ion-exchange softeners discharge brine into the wastewater system. Before installing a whole-house system in {city}, check local municipal regulations regarding brine discharge, as some EU regions are actively restricting them in favor of salt-free conditioners.
          </p>
        </div>
      )}
    </div>
  );
}