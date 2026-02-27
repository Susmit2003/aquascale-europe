// components/content/ActionPlanEngine.tsx
import { generateCityActionPlan } from '@/utils/content-generators/action-plans';
import { Home, Key, Coffee, Building } from 'lucide-react';

interface ActionPlanEngineProps {
  city: string;
  hardness: number;
}

export function ActionPlanEngine({ city, hardness }: ActionPlanEngineProps) {
  const plan = generateCityActionPlan(city, hardness);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-8">
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white m-0">
          Personalized Water Action Plan for {city}
        </h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Homeowner */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg border-b pb-2">
            <Home className="w-5 h-5" /> Homeowners
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            {plan.homeowner}
          </p>
        </div>

        {/* Renter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-lg border-b pb-2">
            <Key className="w-5 h-5" /> Apartment Renters
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            {plan.renter}
          </p>
        </div>

        {/* Hospitality */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-700 font-semibold text-lg border-b pb-2">
            <Building className="w-5 h-5" /> Hotels & Airbnb Hosts
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            {plan.hospitality}
          </p>
        </div>

        {/* Commercial */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-orange-700 font-semibold text-lg border-b pb-2">
            <Coffee className="w-5 h-5" /> Cafes & Restaurants
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            {plan.commercial}
          </p>
        </div>
      </div>
    </div>
  );
}