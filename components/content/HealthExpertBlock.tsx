// import { BookOpen, Droplets, UserCheck, AlertCircle } from 'lucide-react';

// interface HealthExpertBlockProps {
//   city: string;
//   hardness: number;
// }

// // Deterministic randomizer based on city name to ensure text stays consistent per URL 
// // but varies widely across the site.
// function getVariationIndex(str: string, max: number): number {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   return Math.abs(hash % max);
// }

// export function HealthExpertBlock({ city, hardness }: HealthExpertBlockProps) {
//   const isHard = hardness > 120;
//   const variation = getVariationIndex(city, 3); // 3 completely different text structures

//   const intros = [
//     `The mineral composition of the water in ${city} (measured at ${hardness} mg/L) interacts uniquely with human skin. Highly mineralized water requires different bathing habits compared to softer supplies.`,
//     `At ${hardness} mg/L, ${city}'s water supply carries a specific concentration of dissolved calcium and magnesium. Dermatologists note that this exact mineral weight influences how cleansers and soaps perform.`,
//     `Local water chemistry in ${city} shows a hardness of ${hardness} mg/L. This measurement is crucial not just for plumbing, but for understanding how the local water affects skin hydration and hair texture.`
//   ];

//   const hardSkin = [
//     `Because the local supply is hard, minerals can precipitate onto the epidermis, potentially disrupting the acid mantle and leading to post-shower dryness.`,
//     `The elevated calcium levels here often bind with soap to form an insoluble residue, making it difficult to completely rinse cleansers away from the skin.`,
//     `Residents may notice that the water requires more soap to lather, which can strip natural oils and leave the skin feeling tight or itchy.`
//   ];

//   const softSkin = [
//     `With this softer profile, cleansers wash away efficiently, helping to preserve the skin's natural acidic barrier and retain moisture.`,
//     `The lower mineral content allows soaps to lather quickly and rinse off without leaving behind residue that can irritate sensitive skin.`,
//     `Because the mineral count is relatively low, residents generally experience fewer issues with soap scum build-up on the skin surface.`
//   ];

//   const hardHair = [
//     `Mineral crystallization on the hair shaft is common here, often resulting in hair that feels heavier or looks dull over time.`,
//     `The calcium in the water can bind to hair cuticles, making strands brittle. Clarifying treatments are highly beneficial in this area.`,
//     `If your hair feels weighed down, it is likely due to the ${hardness} mg/L mineral count accumulating. Chelating shampoos can break down this buildup.`
//   ];

//   const softHair = [
//     `This water profile is generally gentle on hair cuticles, allowing for better moisture retention and reducing the need for heavy conditioning.`,
//     `Softer water means shampoo lathers aggressively. You can typically use less product while still maintaining voluminous, manageable hair.`,
//     `The lack of heavy calcium accumulation means hair washed in this water is less likely to become brittle or lose its natural shine.`
//   ];

//   return (
//     <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//       <div className="p-6 md:p-8">
//         <div className="flex items-center gap-3 mb-6">
//           <BookOpen className="w-8 h-8 text-blue-600" />
//           <h2 className="text-2xl font-bold text-gray-900 m-0">
//             Dermatological Data: {city} Water Profile
//           </h2>
//         </div>

//         <div className="prose prose-blue max-w-none text-gray-600 text-sm md:text-base leading-relaxed mb-8">
//           <p>{intros[variation]}</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
//             <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold">
//               <Droplets className="w-5 h-5" />
//               <span>Skin Barrier Interaction</span>
//             </div>
//             <p className="text-sm text-gray-700">
//               {isHard ? hardSkin[variation] : softSkin[variation]}
//             </p>
//           </div>

//           <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
//             <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold">
//               <UserCheck className="w-5 h-5" />
//               <span>Hair Maintenance</span>
//             </div>
//             <p className="text-sm text-gray-700">
//               {isHard ? hardHair[variation] : softHair[variation]}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-gray-100 px-6 py-4 flex gap-3 items-start border-t border-gray-200">
//         <AlertCircle className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
//         <p className="text-xs text-gray-500 leading-relaxed">
//           <strong>Educational Only (YMYL Safe):</strong> The above data relates strictly to general water chemistry. It is not medical advice. Consult a dermatologist for chronic skin conditions like eczema.
//         </p>
//       </div>
//       <p className="text-[10px] text-gray-500 mt-2 border-t pt-2">*This information is aggregated from public water quality reports and is for educational purposes only. It does not constitute medical or dermatological advice.</p>
//     </div>
//   );
// }





import nlp from 'compromise';

// Helper functions for deterministic hashing
function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

function pick(segments: string[], seed: string, offset: number): string {
  return segments[(getHash(seed) + offset) % segments.length];
}

interface HealthExpertBlockProps {
  city: string;
  hardness: number;
}

export function HealthExpertBlock({ city, hardness }: HealthExpertBlockProps) {
  const isHard = hardness > 120;

  // Combinatorial Arrays for Health Impact
  const dermatologicalOpen = [
    `From a dermatological perspective, the water in ${city} has a direct impact on skin health.`,
    `Skin health in ${city} is closely tied to the local mineral concentration.`,
    `Medical data suggests that ${city}'s water profile influences daily skincare routines.`,
    `Residents of ${city} should be aware of how the local tap water interacts with their skin.`
  ];

  const hardWaterMid = [
    ` Because the hardness is ${hardness} mg/L, calcium reacts with soap to form an insoluble residue.`,
    ` At a high concentration of ${hardness} mg/L, the minerals strip natural oils from the epidermis.`,
    ` Measuring at ${hardness} mg/L, the water creates a thin film of soap scum that disrupts the acid mantle.`
  ];

  const softWaterMid = [
    ` With a favorable reading of ${hardness} mg/L, the water allows soaps to rinse away cleanly.`,
    ` Because it sits at a gentle ${hardness} mg/L, the tap water preserves the skin's natural moisture barrier.`,
    ` At just ${hardness} mg/L, residents face a much lower risk of trans-epidermal water loss.`
  ];

  const conclusion = [
    ` Adjusting your moisturizing routine to account for this is highly recommended.`,
    ` Local dermatologists often suggest adapting your bathing habits to match this specific profile.`,
    ` Understanding this mineral interaction is key to avoiding chronic dryness.`
  ];

  const midChoice = isHard ? hardWaterMid : softWaterMid;
  let rawText = `${pick(dermatologicalOpen, city, 1)}${pick(midChoice, city, 2)}${pick(conclusion, city, 3)}`;

  // NLP Synonym swapping for extra entropy
  let doc = nlp(rawText);
  if (getHash(city) % 2 === 0) doc.match('residents').replaceWith('citizens');
  if (getHash(city) % 3 === 0) doc.match('water').replaceWith('municipal supply');

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-3">Dermatological Impact</h3>
      <p className="text-gray-700 leading-relaxed mb-4">{doc.text()}</p>
      
      {/* YMYL Compliance Disclaimer */}
      <p className="text-[10px] text-gray-500 mt-2 border-t pt-2">
        *This information is aggregated from public water quality reports and is for educational purposes only. It does not constitute medical or dermatological advice.
      </p>
    </div>
  );
}