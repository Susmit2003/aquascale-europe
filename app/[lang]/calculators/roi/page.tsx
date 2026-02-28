// app/[lang]/calculators/roi/page.tsx

import { Metadata } from 'next';
import { SoftenerROICalculator } from '@/components/calculators/SoftenerROICalculator';
import { Droplets, Zap, Banknote, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Water Softener ROI Calculator | AquaScale Europe',
  description: 'Calculate your return on investment and long-term financial savings for a whole-house water softening system.',
  robots: {
    index: false, // Prevents this generic page from outranking your high-value city pages
    follow: true
  }
};

export default function ROICalculatorPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8 mt-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Water Softener ROI Calculator
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate your long-term savings and return on investment for installing a whole-house water softening system. Adjust the parameters below to match your household.
        </p>
      </header>

      {/* Interactive Calculator Component */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-16">
        <SoftenerROICalculator 
          hardness={200}     
          householdSize={3}  
          systemCost={800}   
        />
      </div>

      {/* Educational Article Section */}
      <article className="prose prose-lg prose-blue max-w-none text-slate-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
          Understanding Your Water Softener ROI
        </h2>
        
        <p className="lead text-xl text-slate-600 mb-8">
          A water softener is often viewed as a luxury appliance, but financially, it functions as a preventative maintenance tool. By intercepting calcium and magnesium before they enter your home's plumbing, you eliminate several hidden "hard water taxes" that slowly drain your household budget.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 not-prose">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="font-bold text-gray-900 text-lg">Energy Efficiency</h3>
            </div>
            <p className="text-sm text-slate-600">
              Limescale is an excellent insulator. Just 1.6mm of scale buildup on a boiler's heating element reduces its heat transfer efficiency by up to 12%. Soft water ensures your boiler uses its energy to heat water, not rock.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-6 h-6 text-blue-500" />
              <h3 className="font-bold text-gray-900 text-lg">Soap & Detergent Savings</h3>
            </div>
            <p className="text-sm text-slate-600">
              Hard water minerals bind to soap molecules, creating insoluble "soap scum" instead of lather. With soft water, households typically reduce their consumption of laundry detergent, shampoo, and body wash by 50% to 70%.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <h3 className="font-bold text-gray-900 text-lg">Appliance Lifespan</h3>
            </div>
            <p className="text-sm text-slate-600">
              Dishwashers, washing machines, and espresso makers are highly susceptible to scale-induced mechanical failure. Eliminating mineral load can extend the operational life of water-bearing appliances by 30% or more.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <Banknote className="w-6 h-6 text-purple-500" />
              <h3 className="font-bold text-gray-900 text-lg">Plumbing Integrity</h3>
            </div>
            <p className="text-sm text-slate-600">
              Over decades, scale buildup constricts the internal diameter of pipes, reducing water pressure and ultimately requiring expensive re-piping. Soft water effectively halts this degradation process entirely.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
          How Our Calculator Works
        </h3>
        <p>
          The Return on Investment (ROI) model above utilizes standard European consumption metrics. It weighs three primary variables:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li><strong>Baseline Mineral Load:</strong> The higher your incoming water hardness (mg/L), the faster scale accumulates, meaning the financial intervention of a softener yields greater proportional savings.</li>
          <li><strong>Household Volume:</strong> More residents equate to more showers, more laundry cycles, and higher hot water turnover. The financial payback period accelerates rapidly as household size increases.</li>
          <li><strong>Capital Expenditure:</strong> The initial cost of the unit and its installation. Generally, mid-range ion-exchange systems offer the most efficient break-even point for residential properties.</li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-8 text-sm text-blue-900">
          <p className="m-0">
            <strong>Methodology Note:</strong> This calculator provides a deterministic estimate based on aggregated utility savings. It does not account for the subjective value of reduced cleaning time, softer skin, or the preservation of clothing fabrics. For an exact assessment, consult with a local water treatment specialist regarding your specific appliance ratings and local utility tariffs.
          </p>
        </div>
      </article>
    </main>
  );
}