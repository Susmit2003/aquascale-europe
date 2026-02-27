// components/calculators/SoftenerROICalculator.tsx
import { Calculator, TrendingUp, PiggyBank } from 'lucide-react';

interface SoftenerROICalculatorProps {
  hardness: number;
  householdSize?: number;
  systemCost?: number;
}

export function SoftenerROICalculator({ 
  hardness, 
  householdSize = 3, 
  systemCost = 800 
}: SoftenerROICalculatorProps) {
  
  // Algorithmic savings estimate
  // Savings scale with hardness AND household size (more people = more soap/water/energy used)
  const hardnessFactor = hardness > 120 ? (hardness - 120) * 0.8 : 0;
  const baseSavings = 50;
  const perPersonSavings = 35; // Estimated annual savings per person on soaps, detergents, and lotions
  
  const annualSavingsEur = baseSavings + hardnessFactor + (householdSize * perPersonSavings); 
  
  // Avoid Infinity if savings are 0 (e.g., extremely soft water)
  const paybackYears = annualSavingsEur > 0 ? (systemCost / annualSavingsEur).toFixed(1) : "∞";
  const tenYearROI = ((annualSavingsEur * 10) - systemCost).toFixed(0);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg mt-8">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <Calculator className="w-6 h-6 text-emerald-400" />
        <h2 className="text-2xl font-bold m-0 text-white">ROI Projection</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Cost Display */}
        <div className="md:border-r border-slate-700 md:pr-6">
          <div className="text-sm text-slate-400 mb-2 font-medium">Initial Investment</div>
          <div className="text-3xl font-black text-white">€{systemCost}</div>
        </div>

        {/* Payback Period Display */}
        <div className="md:border-r border-slate-700 md:pr-6">
          <div className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-2 mb-2 font-medium">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Payback Period
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {paybackYears} {paybackYears !== "∞" && "Years"}
          </div>
        </div>

        {/* 10-Year ROI Display */}
        <div>
          <div className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-2 mb-2 font-medium">
            <PiggyBank className="w-4 h-4 text-blue-400" /> 10-Year Net Savings
          </div>
          <div className="text-3xl font-bold text-blue-400">
            {Number(tenYearROI) > 0 ? `+ €${tenYearROI}` : `€${tenYearROI}`}
          </div>
        </div>

      </div>
    </div>
  );
}