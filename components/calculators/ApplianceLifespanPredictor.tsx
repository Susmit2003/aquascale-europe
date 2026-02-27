// components/calculators/ApplianceLifespanPredictor.tsx
import { Flame, Droplet, Coffee, AlertTriangle } from 'lucide-react';

interface ApplianceLifespanPredictorProps {
  hardnessMgL: number;
}

export function ApplianceLifespanPredictor({ hardnessMgL }: ApplianceLifespanPredictorProps) {
  // EU Conversions
  const germanDegree = (hardnessMgL * 0.056).toFixed(1); // °dH
  const frenchDegree = (hardnessMgL * 0.1).toFixed(1);   // °fH
  
  // Predictive Logic
  const isHard = hardnessMgL > 120;
  
  // Boiler wear logic
  const boilerLifespanBase = 15; // years
  const boilerLoss = isHard ? Math.min((hardnessMgL - 120) * 0.05, 5) : 0;
  const predictedBoilerLife = Math.max(boilerLifespanBase - boilerLoss, 7).toFixed(1);

  // Descaling frequency
  const kettleDescalingWeeks = isHard ? Math.max(Math.round(400 / hardnessMgL), 1) : 12;

  // Dishwasher element wear
  const dishwasherRisk = hardnessMgL > 200 ? "Critical" : hardnessMgL > 120 ? "High" : "Low";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-12">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white m-0">Appliance Wear Predictor</h2>
          <p className="text-slate-300 text-sm mt-1">Estimated impact of {hardnessMgL} mg/L on household tech.</p>
        </div>
        
        {/* EU Unit Conversion Badges */}
        <div className="flex gap-2">
          <div className="bg-slate-700/50 border border-slate-600 px-3 py-1.5 rounded-lg text-center">
            <span className="block text-xs text-slate-400 font-bold uppercase">German</span>
            <span className="block text-sm text-white font-mono">{germanDegree} °dH</span>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 px-3 py-1.5 rounded-lg text-center">
            <span className="block text-xs text-slate-400 font-bold uppercase">French</span>
            <span className="block text-sm text-white font-mono">{frenchDegree} °fH</span>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Boiler Impact */}
        <div className={`p-5 rounded-xl border ${isHard ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isHard ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Combi Boiler</h3>
          <p className="text-sm text-gray-600 mb-3">Estimated operational lifespan before critical heat exchanger failure.</p>
          <div className="flex items-end gap-1">
            <span className={`text-2xl font-black ${isHard ? 'text-red-700' : 'text-green-700'}`}>
              {predictedBoilerLife}
            </span>
            <span className="text-sm font-medium text-gray-500 mb-1">Years</span>
          </div>
        </div>

        {/* Dishwasher Impact */}
        <div className={`p-5 rounded-xl border ${isHard ? 'bg-orange-50 border-orange-100' : 'bg-green-50 border-green-100'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isHard ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
            <Droplet className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Dishwasher Element</h3>
          <p className="text-sm text-gray-600 mb-3">Risk of limescale burning out the internal water heating element.</p>
          <div className="flex items-center gap-2">
            <span className={`text-xl font-bold ${hardnessMgL > 200 ? 'text-red-600' : hardnessMgL > 120 ? 'text-orange-600' : 'text-green-600'}`}>
              {dishwasherRisk} Risk
            </span>
            {isHard && <AlertTriangle className="w-4 h-4 text-orange-500" />}
          </div>
        </div>

        {/* Kettle / Coffee Maker */}
        <div className="p-5 rounded-xl border bg-blue-50 border-blue-100">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-blue-100 text-blue-600">
            <Coffee className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Kettle & Coffee Maker</h3>
          <p className="text-sm text-gray-600 mb-3">Required frequency of citric acid descaling to maintain water flow.</p>
          <div className="flex items-end gap-1">
            <span className="text-sm font-medium text-gray-500 mb-1">Every</span>
            <span className="text-2xl font-black text-blue-700">
              {kettleDescalingWeeks}
            </span>
            <span className="text-sm font-medium text-gray-500 mb-1">{kettleDescalingWeeks === 1 ? 'Week' : 'Weeks'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}