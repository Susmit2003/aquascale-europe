'use client';

import { useState } from 'react';

interface CalculatorProps {
  cityName: string;
  hardnessMgL: number;
}

export default function ApplianceCalculator({ cityName, hardnessMgL }: CalculatorProps) {
  const [appliance, setAppliance] = useState('dishwasher');
  const germanDegrees = (hardnessMgL * 0.056).toFixed(1);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        🛠️ {cityName} Appliance Calibration Tool
      </h3>
      <p className="text-gray-600 mb-6">
        Select your appliance to get the exact settings required for {hardnessMgL} mg/L water.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select 
          className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 outline-none flex-grow"
          value={appliance}
          onChange={(e) => setAppliance(e.target.value)}
        >
          <option value="dishwasher">Dishwasher</option>
          <option value="washing_machine">Washing Machine</option>
          <option value="espresso">Espresso / Coffee Maker</option>
        </select>
      </div>

      <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
        <h4 className="font-bold text-blue-900 mb-2 text-lg">Recommended Setting:</h4>
        
        {appliance === 'dishwasher' && (
          <p className="text-blue-800 leading-relaxed">
            Set your dishwasher's internal water softener dial to <strong>{germanDegrees} °dH</strong>. 
            {hardnessMgL > 120 ? ' You MUST use regenerating salt to prevent permanent limescale damage to the heating elements.' : ' Using all-in-one tabs is usually sufficient, but salt is recommended for perfect glass protection.'}
          </p>
        )}

        {appliance === 'washing_machine' && (
          <p className="text-blue-800 leading-relaxed">
            Dose your laundry detergent according to the <strong>{hardnessMgL > 150 ? 'HARD' : hardnessMgL > 80 ? 'MEDIUM' : 'SOFT'}</strong> water guidelines on the packaging. 
            {hardnessMgL > 150 && ' Consider adding an anti-limescale gel to every wash to protect the drum.'}
          </p>
        )}

        {appliance === 'espresso' && (
          <p className="text-blue-800 leading-relaxed">
            Program your machine's water hardness profile to <strong>{germanDegrees} °dH</strong>. 
            {hardnessMgL > 100 ? ` Based on ${cityName}'s mineral profile, you should descale every 200 cups or use an in-tank resin filter.` : ` Because the water is soft, you only need to descale every 400 cups.`}
          </p>
        )}
      </div>
    </div>
  );
}