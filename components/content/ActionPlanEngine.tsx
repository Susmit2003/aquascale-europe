// // // components/content/ActionPlanEngine.tsx
// // import { generateCityActionPlan } from '@/utils/content-generators/action-plans';
// // import { Home, Key, Coffee, Building } from 'lucide-react';

// // interface ActionPlanEngineProps {
// //   city: string;
// //   hardness: number;
// // }

// // export function ActionPlanEngine({ city, hardness }: ActionPlanEngineProps) {
// //   const plan = generateCityActionPlan(city, hardness);

// //   return (
// //     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-8">
// //       <div className="bg-blue-600 px-6 py-4">
// //         <h2 className="text-xl font-bold text-white m-0">
// //           Personalized Water Action Plan for {city}
// //         </h2>
// //       </div>
      
// //       <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
// //         {/* Homeowner */}
// //         <div className="space-y-3">
// //           <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg border-b pb-2">
// //             <Home className="w-5 h-5" /> Homeowners
// //           </div>
// //           <p className="text-gray-600 leading-relaxed text-sm">
// //             {plan.homeowner}
// //           </p>
// //         </div>

// //         {/* Renter */}
// //         <div className="space-y-3">
// //           <div className="flex items-center gap-2 text-emerald-700 font-semibold text-lg border-b pb-2">
// //             <Key className="w-5 h-5" /> Apartment Renters
// //           </div>
// //           <p className="text-gray-600 leading-relaxed text-sm">
// //             {plan.renter}
// //           </p>
// //         </div>

// //         {/* Hospitality */}
// //         <div className="space-y-3">
// //           <div className="flex items-center gap-2 text-purple-700 font-semibold text-lg border-b pb-2">
// //             <Building className="w-5 h-5" /> Hotels & Airbnb Hosts
// //           </div>
// //           <p className="text-gray-600 leading-relaxed text-sm">
// //             {plan.hospitality}
// //           </p>
// //         </div>

// //         {/* Commercial */}
// //         <div className="space-y-3">
// //           <div className="flex items-center gap-2 text-orange-700 font-semibold text-lg border-b pb-2">
// //             <Coffee className="w-5 h-5" /> Cafes & Restaurants
// //           </div>
// //           <p className="text-gray-600 leading-relaxed text-sm">
// //             {plan.commercial}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // components/content/ActionPlanEngine.tsx

// import { generateCityActionPlan } from '@/utils/content-generators/action-plans';

// interface ActionPlanProps {
//   city: string;
//   hardness: number;
// }

// export function ActionPlanEngine({ city, hardness }: ActionPlanProps) {
//   const plan = generateCityActionPlan(city, hardness);

//   return (
//     <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden my-8">
//       <div className="bg-slate-800 px-6 py-4">
//         <h2 className="text-xl font-bold text-white">
//           Infrastructure Action Plan for {city}
//         </h2>
//         <p className="text-slate-300 text-sm mt-1">Diagnostic recommendations based on {hardness} mg/L</p>
//       </div>

//       <div className="p-0">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50 border-b border-gray-200 text-sm uppercase tracking-wide text-gray-500">
//               <th className="px-6 py-4 font-medium">Profile</th>
//               <th className="px-6 py-4 font-medium">Priority</th>
//               <th className="px-6 py-4 font-medium">Recommended Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
//             {/* Renter Row */}
//             <tr className="hover:bg-slate-50 transition-colors">
//               <td className="px-6 py-4 font-semibold text-gray-900">Tenant / Renter</td>
//               <td className="px-6 py-4">
//                 <span className={`px-2 py-1 rounded-full text-xs font-bold ${plan.renter.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
//                   {plan.renter.priority}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 <p className="font-medium">{plan.renter.action}</p>
//                 <p className="text-gray-500 text-xs mt-1">{plan.renter.costImpact}</p>
//               </td>
//             </tr>

//             {/* Homeowner Row */}
//             <tr className="hover:bg-slate-50 transition-colors">
//               <td className="px-6 py-4 font-semibold text-gray-900">Property Owner</td>
//               <td className="px-6 py-4">
//                 <span className={`px-2 py-1 rounded-full text-xs font-bold ${plan.homeowner.priority === 'Urgent' ? 'bg-red-100 text-red-700' : plan.homeowner.priority === 'Recommended' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
//                   {plan.homeowner.priority}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 <p className="font-medium">{plan.homeowner.action}</p>
//                 <p className="text-gray-500 text-xs mt-1">System: {plan.homeowner.systemType}</p>
//               </td>
//             </tr>

//             {/* Commercial Row */}
//             <tr className="hover:bg-slate-50 transition-colors">
//               <td className="px-6 py-4 font-semibold text-gray-900">Commercial / Hospitality</td>
//               <td className="px-6 py-4 text-gray-600">{plan.commercial.complianceRisk}</td>
//               <td className="px-6 py-4 font-medium">{plan.commercial.requirement}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }



import { ActionPlanRules } from '@/utils/content-generators/action-plans';

interface ActionPlanProps {
  city: string;
  rules: ActionPlanRules;
}

export function ActionPlanEngine({ city, rules }: ActionPlanProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden my-8">
      <div className="bg-slate-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Infrastructure Action Plan for {city}
        </h2>
        <p className="text-slate-300 text-sm mt-1">Diagnostic recommendations based on local data</p>
      </div>

      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200 text-sm uppercase tracking-wide text-gray-500">
              <th className="px-6 py-4 font-medium">Profile</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {/* Renter Row */}
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-900">Tenant / Renter</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${rules.renter.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {rules.renter.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <p className="font-medium">{rules.renter.action}</p>
                <p className="text-gray-500 text-xs mt-1">{rules.renter.costImpact}</p>
              </td>
            </tr>

            {/* Homeowner Row */}
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-900">Property Owner</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${rules.homeowner.priority === 'Urgent' ? 'bg-red-100 text-red-700' : rules.homeowner.priority === 'Recommended' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                  {rules.homeowner.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <p className="font-medium">{rules.homeowner.action}</p>
                <p className="text-gray-500 text-xs mt-1">System: {rules.homeowner.systemType}</p>
              </td>
            </tr>

            {/* Commercial Row */}
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-900">Commercial / Hospitality</td>
              <td className="px-6 py-4 text-gray-600 font-medium">
                {rules.commercial.complianceRisk}
              </td>
              <td className="px-6 py-4">
                 <p className="font-medium">{rules.commercial.requirement}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}