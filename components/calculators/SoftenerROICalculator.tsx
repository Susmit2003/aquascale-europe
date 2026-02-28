"use client";

import { useState } from 'react';
import { Calculator, TrendingUp, PiggyBank, Sliders } from 'lucide-react';

interface SoftenerROICalculatorProps {
  hardness?: number;
  householdSize?: number;
  systemCost?: number;
}

export function SoftenerROICalculator({ 
  hardness = 200, 
  householdSize = 3, 
  systemCost = 800 
}: SoftenerROICalculatorProps) {
  
  // 1. ADD STATE: This allows the values to change when the user moves the sliders
  const [currentHardness, setCurrentHardness] = useState(hardness);
  const [currentHouseholdSize, setCurrentHouseholdSize] = useState(householdSize);
  const [currentSystemCost, setCurrentSystemCost] = useState(systemCost);

  // 2. USE STATE FOR MATH: Calculate based on the user's current inputs
  const hardnessFactor = currentHardness > 120 ? (currentHardness - 120) * 0.8 : 0;
  const baseSavings = 50;
  const perPersonSavings = 35; 
  
  const annualSavingsEur = baseSavings + hardnessFactor + (currentHouseholdSize * perPersonSavings); 
  
  const paybackYears = annualSavingsEur > 0 ? (currentSystemCost / annualSavingsEur).toFixed(1) : "∞";
  const tenYearROI = ((annualSavingsEur * 10) - currentSystemCost).toFixed(0);

  return (
    <div className="space-y-8 mt-4">
      {/* 3. INPUT CONTROLS: Let the user change the numbers */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
          <Sliders className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-800">Adjust Your Parameters</h3>
        </div>

        <div className="space-y-6">
          {/* Hardness Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Water Hardness (mg/L)</label>
              <span className="font-bold text-blue-600">{currentHardness} mg/L</span>
            </div>
            <input 
              type="range" 
              min="0" max="500" step="10"
              value={currentHardness}
              onChange={(e) => setCurrentHardness(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Household Size Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Household Size</label>
              <span className="font-bold text-blue-600">{currentHouseholdSize} People</span>
            </div>
            <input 
              type="range" 
              min="1" max="8" step="1"
              value={currentHouseholdSize}
              onChange={(e) => setCurrentHouseholdSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* System Cost Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Estimated System Cost (€)</label>
              <span className="font-bold text-blue-600">€{currentSystemCost}</span>
            </div>
            <input 
              type="range" 
              min="300" max="3000" step="50"
              value={currentSystemCost}
              onChange={(e) => setCurrentSystemCost(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* 4. RESULTS DISPLAY: The original dark UI card */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
          <Calculator className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold m-0 text-white">ROI Projection</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:border-r border-slate-700 md:pr-6">
            <div className="text-sm text-slate-400 mb-2 font-medium">Initial Investment</div>
            <div className="text-3xl font-black text-white">€{currentSystemCost}</div>
          </div>

          <div className="md:border-r border-slate-700 md:pr-6">
            <div className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-2 mb-2 font-medium">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Payback Period
            </div>
            <div className="text-3xl font-bold text-emerald-400">
              {paybackYears} {paybackYears !== "∞" && "Years"}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-2 mb-2 font-medium">
              <PiggyBank className="w-4 h-4 text-blue-400" /> 10-Year Net Savings
            </div>
            <div className="text-3xl font-bold text-blue-400">
              {Number(tenYearROI) > 0 ? `+ €${tenYearROI}` : `€${tenYearROI}`}
            </div>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-4 italic">
          *ROI projections are theoretical estimates based on standard EU household consumption rates. Actual savings will vary based on individual usage and appliance efficiency.
        </p>
      </div>
    </div>
  );
}