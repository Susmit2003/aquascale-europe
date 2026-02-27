// components/calculators/SoftenerROICalculator.tsx
"use client";

import { useState } from 'react';
import { Calculator, TrendingUp, PiggyBank } from 'lucide-react';

interface SoftenerROICalculatorProps {
  hardness: number;
}

export function SoftenerROICalculator({ hardness }: SoftenerROICalculatorProps) {
  const [systemCost, setSystemCost] = useState<number>(600);
  
  // Algorithmic savings estimate based on avoided energy loss and detergent reduction
  const annualSavingsEur = (hardness > 120 ? ((hardness - 120) * 0.8) + 150 : 50); 
  const paybackYears = (systemCost / annualSavingsEur).toFixed(1);
  const tenYearROI = ((annualSavingsEur * 10) - systemCost).toFixed(0);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-emerald-400" />
        <h2 className="text-2xl font-bold m-0 text-white">Softener ROI Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Estimated Softener Cost (€)
          </label>
          <input 
            type="range" 
            min="300" max="2500" step="50"
            value={systemCost}
            onChange={(e) => setSystemCost(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-4"
          />
          <div className="text-3xl font-black text-white">€{systemCost}</div>
          <p className="text-xs text-slate-400 mt-2">
            Includes average DIY installation or basic plumber fee.
          </p>
        </div>

        <div className="flex flex-col justify-center space-y-4 border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-8">
          <div>
            <div className="text-sm text-slate-400 flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Payback Period
            </div>
            <div className="text-3xl font-bold text-emerald-400">{paybackYears} Years</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 flex items-center gap-2 mb-1">
              <PiggyBank className="w-4 h-4 text-blue-400" /> 10-Year Net Savings
            </div>
            <div className="text-2xl font-bold text-blue-400">+ €{tenYearROI}</div>
          </div>
        </div>
      </div>
    </div>
  );
}