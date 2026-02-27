// components/calculators/LimescaleCostEstimator.tsx
"use client";

import { useState, useMemo } from 'react';
import { calculateAnnualImpact, BoilerType, UsageFrequency } from '@/utils/calculations';

interface LimescaleCostEstimatorProps {
  hardness: number;
  kwhPrice: number;
}

export default function LimescaleCostEstimator({ hardness, kwhPrice }: LimescaleCostEstimatorProps) {
  const [size, setSize] = useState<number>(3);
  const [boiler, setBoiler] = useState<BoilerType>('electric');
  const [freq, setFreq] = useState<UsageFrequency>('medium');

  // Memoize calculations so it only runs when inputs change
  const results = useMemo(() => {
    return calculateAnnualImpact({
      size,
      boilerType: boiler,
      kwhPrice,
      hardnessMgL: hardness,
      applianceFrequency: freq,
    });
  }, [size, boiler, freq, kwhPrice, hardness]);

  const maxProjectionValue = Math.max(...results.fiveYearProjection, 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-white">
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Limescale cost calculator">
          {/* Input: Household Size */}
          <div className="flex flex-col">
            <label htmlFor="household-size" className="text-sm font-semibold text-gray-700 mb-2">
              Household Size
            </label>
            <select
              id="household-size"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
              ))}
            </select>
          </div>

          {/* Input: Boiler Type */}
          <div className="flex flex-col">
            <label htmlFor="boiler-type" className="text-sm font-semibold text-gray-700 mb-2">
              Water Heating System
            </label>
            <select
              id="boiler-type"
              value={boiler}
              onChange={(e) => setBoiler(e.target.value as BoilerType)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              <option value="electric">Electric Boiler</option>
              <option value="gas">Gas Boiler</option>
              <option value="combi">Combi Boiler</option>
              <option value="heat_pump">Heat Pump</option>
            </select>
          </div>

          {/* Input: Usage Frequency */}
          <div className="flex flex-col">
            <label htmlFor="usage-freq" className="text-sm font-semibold text-gray-700 mb-2">
              Appliance Usage
            </label>
            <select
              id="usage-freq"
              value={freq}
              onChange={(e) => setFreq(e.target.value as UsageFrequency)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              <option value="low">Low (Occasional)</option>
              <option value="medium">Medium (Daily)</option>
              <option value="high">High (Heavy)</option>
            </select>
          </div>
        </form>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-gray-100">
        {/* Results Metrics */}
        <div className="space-y-6">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="text-sm font-medium text-red-800">Estimated Extra Energy Cost</p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              €{results.extraEnergyCostEur} <span className="text-lg font-normal text-red-400">/ yr</span>
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="text-sm font-medium text-orange-800">Appliance Lifespan Reduction</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">
              {results.lifespanReductionPercent}% <span className="text-lg font-normal text-orange-400">faster wear</span>
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm font-medium text-blue-800">Annual Descaling Products</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              €{results.annualDescalingCostEur} <span className="text-lg font-normal text-blue-400">/ yr</span>
            </p>
          </div>
        </div>

       {/* 5-Year Lightweight SVG Chart */}
        <div className="flex flex-col h-full">
          <h3 className="text-sm font-semibold text-gray-700 mb-6">5-Year Cumulative Cost Projection (€)</h3>
          
          <div className="flex-1 flex items-end justify-between gap-2 h-48 mt-2">
            {results.fiveYearProjection.map((val, idx) => {
              const heightPercentage = (val / maxProjectionValue) * 100;
              return (
                <div key={idx} className="flex flex-col items-center flex-1 group relative h-full">
                  
                  {/* Dedicated Bar Container (Forces explicit height for the % to work) */}
                  <div className="w-full flex-1 flex items-end justify-center relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      €{Math.round(val)}
                    </div>
                    
                    {/* The Bar */}
                    <div 
                      className="w-full max-w-[40px] bg-blue-500 rounded-t-md transition-all duration-500 ease-out"
                      style={{ height: `${Math.max(heightPercentage, 2)}%` }}
                    />
                  </div>

                  {/* X-Axis Label */}
                  <span className="text-xs text-gray-500 mt-2 font-medium shrink-0">Yr {idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEO Compliance Disclaimer */}
      {/* Replace the old disclaimer at the bottom of LimescaleCostEstimator with this: */}
        <div className="bg-yellow-50 px-6 py-5 border-t border-yellow-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-yellow-900 mb-1">Financial Impact Warning</h4>
            <p className="text-xs text-yellow-800 leading-relaxed">
              At {hardness} mg/L, households in this region lose an estimated <strong>€{Math.round(results.extraEnergyCostEur * 5)} every 5 years</strong> purely to mineral scaling inefficiency.
            </p>
          </div>
          <a href="#product-recommendations" className="shrink-0 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-colors">
            View Descaling Solutions
          </a>
        </div>
    </div>
  );
}