// // components/content/HealthExpertBlock.tsx

// import { Droplets, ShieldAlert } from 'lucide-react';
// import { Location, SupportedLanguage } from '@/types';

// interface HealthExpertBlockProps {
//   location: Location;
//   lang: SupportedLanguage;
// }

// export function HealthExpertBlock({ location, lang }: HealthExpertBlockProps) {
//   const { name, hardness_mg_l, population, source_utility } = location;

//   // 1. Establish Multi-Variable Triggers
//   const isHard = hardness_mg_l > 120;
//   const isVeryHard = hardness_mg_l > 200;
//   const isUrban = population > 100000;
//   const isRural = population < 20000;
  
//   // 2. Dynamic Opening Context (Based on Population + Utility)
//   let openingContext = "";
//   if (isUrban) {
//     openingContext = `For the ${population.toLocaleString()} residents in the greater ${name} metropolitan area, water is typically sourced and treated by large-scale facilities like ${source_utility || 'local municipal plants'}.`;
//   } else if (isRural) {
//     openingContext = `In smaller municipalities like ${name}, the local water network (managed by ${source_utility || 'regional authorities'}) often relies on more direct geological sources.`;
//   } else {
//     openingContext = `Household water in ${name} is chemically influenced by the specific treatment processes utilized by ${source_utility || 'the local water authority'}.`;
//   }

//   // 3. Dynamic Chemical Interaction Text (Based on exact Hardness Tiers)
//   let chemicalInteraction = "";
//   if (isVeryHard) {
//     chemicalInteraction = `At an exceptionally high measurement of ${hardness_mg_l} mg/L, the calcium and magnesium concentration severely restricts how soaps and detergents dissolve. Residents will typically experience immediate mineral scaling on fixtures and a total lack of lather efficiency.`;
//   } else if (isHard) {
//     chemicalInteraction = `Because the water contains ${hardness_mg_l} mg/L of dissolved minerals, it physically alters soap efficiency. Households will notice reduced lathering and may find a harmless but frustrating mineral film left on bathroom surfaces and fabrics.`;
//   } else if (hardness_mg_l > 60) {
//     chemicalInteraction = `Measuring at ${hardness_mg_l} mg/L, the supply sits in a moderate zone. Soaps will generally lather adequately, though long-term buildup on shower glass and fabrics may still occur without preventative cleaning.`;
//   } else {
//     chemicalInteraction = `With a very low mineral concentration of just ${hardness_mg_l} mg/L, the water interacts highly efficiently with cleaning agents. Soaps produce abundant lather and rinse away easily without leaving hard mineral residue.`;
//   }

//   // 4. Dynamic Actionable Conclusion (Based on Hardness + Population)
//   let conclusion = "";
//   if (isHard && isUrban) {
//     conclusion = `In dense urban grids like ${name}, compounding pipe scaling means you may need significantly more detergent and specialized rinse aids to overcome the base ${hardness_mg_l} mg/L resistance.`;
//   } else if (isHard) {
//     conclusion = `To achieve standard household cleaning results, it is common to require heavier detergent dosing to counteract the mineral-heavy profile of this specific supply.`;
//   } else {
//     conclusion = `Because of this efficient lathering profile, households in ${name} can typically use significantly less detergent to achieve standard cleaning results, reducing long-term chemical costs.`;
//   }

//   return (
//     <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
//       <div className="flex items-center gap-3 mb-4">
//         <Droplets className="w-6 h-6 text-blue-600" />
//         <h3 className="text-xl font-bold text-gray-900 m-0">
//           Household Soap & Detergent Efficiency
//         </h3>
//       </div>
      
//       <div className="prose prose-blue max-w-none text-slate-700 leading-relaxed mb-6">
//         <p>
//           {openingContext} {chemicalInteraction} {conclusion}
//         </p>
//       </div>

//       <div className="bg-slate-50 px-4 py-3 rounded-lg flex gap-3 items-start border border-slate-100">
//         <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
//         <p className="text-xs text-slate-500 leading-relaxed m-0">
//           <strong>Informational Notice:</strong> The above data relates strictly to the physical and chemical interaction between mineralized water and standard household cleaning agents. It is aggregated from public municipal water quality reports and is provided for educational comparison only.
//         </p>
//       </div>
//     </div>
//   );
// }


// components/content/HealthExpertBlock.tsx

import { Droplets, ShieldAlert } from 'lucide-react';
import { Location, SupportedLanguage } from '@/types';

interface HealthExpertBlockProps {
  location: Location;
  lang: SupportedLanguage;
}

export function HealthExpertBlock({ location, lang }: HealthExpertBlockProps) {
  const { name, hardness_mg_l, population, source_utility } = location;

  // 1. Establish Multi-Variable Triggers
  const isHard = hardness_mg_l > 120;
  const isVeryHard = hardness_mg_l > 200;
  const isUrban = population > 100000;
  const isRural = population < 20000;
  
  // 2. Dynamic Opening Context (Based on Population + Utility)
  let openingContext = "";
  if (isUrban) {
    openingContext = `For the ${population.toLocaleString()} residents in the greater ${name} metropolitan area, water is typically sourced and treated by large-scale facilities like ${source_utility || 'local municipal plants'}.`;
  } else if (isRural) {
    openingContext = `In smaller municipalities like ${name}, the local water network (managed by ${source_utility || 'regional authorities'}) often relies on more direct geological sources.`;
  } else {
    openingContext = `Household water in ${name} is chemically influenced by the specific treatment processes utilized by ${source_utility || 'the local water authority'}.`;
  }

  // 3. Dynamic Chemical Interaction Text (Based on exact Hardness Tiers)
  let chemicalInteraction = "";
  if (isVeryHard) {
    chemicalInteraction = `At an exceptionally high measurement of ${hardness_mg_l} mg/L, the calcium and magnesium concentration severely restricts how soaps and detergents dissolve. Residents will typically experience immediate mineral scaling on fixtures and a total lack of lather efficiency.`;
  } else if (isHard) {
    chemicalInteraction = `Because the water contains ${hardness_mg_l} mg/L of dissolved minerals, it physically alters soap efficiency. Households will notice reduced lathering and may find a harmless but frustrating mineral film left on bathroom surfaces and fabrics.`;
  } else if (hardness_mg_l > 60) {
    chemicalInteraction = `Measuring at ${hardness_mg_l} mg/L, the supply sits in a moderate zone. Soaps will generally lather adequately, though long-term buildup on shower glass and fabrics may still occur without preventative cleaning.`;
  } else {
    chemicalInteraction = `With a very low mineral concentration of just ${hardness_mg_l} mg/L, the water interacts highly efficiently with cleaning agents. Soaps produce abundant lather and rinse away easily without leaving hard mineral residue.`;
  }

  // 4. Dynamic Actionable Conclusion (Based on Hardness + Population)
  let conclusion = "";
  if (isHard && isUrban) {
    conclusion = `In dense urban grids like ${name}, compounding pipe scaling means you may need significantly more detergent and specialized rinse aids to overcome the base ${hardness_mg_l} mg/L resistance.`;
  } else if (isHard) {
    conclusion = `To achieve standard household cleaning results, it is common to require heavier detergent dosing to counteract the mineral-heavy profile of this specific supply.`;
  } else {
    conclusion = `Because of this efficient lathering profile, households in ${name} can typically use significantly less detergent to achieve standard cleaning results, reducing long-term chemical costs.`;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Droplets className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900 m-0">
          Household Soap & Detergent Efficiency
        </h3>
      </div>
      
      <div className="prose prose-blue max-w-none text-slate-700 leading-relaxed mb-6">
        <p>
          {openingContext} {chemicalInteraction} {conclusion}
        </p>
      </div>

      <div className="bg-slate-50 px-4 py-3 rounded-lg flex gap-3 items-start border border-slate-100">
        <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 leading-relaxed m-0">
          <strong>Informational Notice:</strong> The above data relates strictly to the physical and chemical interaction between mineralized water and standard household cleaning agents. It is aggregated from public municipal water quality reports and is provided for educational comparison only.
        </p>
      </div>
    </div>
  );
}