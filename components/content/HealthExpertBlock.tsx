import { BookOpen, Droplets, UserCheck, AlertCircle } from 'lucide-react';

interface HealthExpertBlockProps {
  city: string;
  hardness: number;
}

// Deterministic randomizer based on city name to ensure text stays consistent per URL 
// but varies widely across the site.
function getVariationIndex(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % max);
}

export function HealthExpertBlock({ city, hardness }: HealthExpertBlockProps) {
  const isHard = hardness > 120;
  const variation = getVariationIndex(city, 3); // 3 completely different text structures

  const intros = [
    `The mineral composition of the water in ${city} (measured at ${hardness} mg/L) interacts uniquely with human skin. Highly mineralized water requires different bathing habits compared to softer supplies.`,
    `At ${hardness} mg/L, ${city}'s water supply carries a specific concentration of dissolved calcium and magnesium. Dermatologists note that this exact mineral weight influences how cleansers and soaps perform.`,
    `Local water chemistry in ${city} shows a hardness of ${hardness} mg/L. This measurement is crucial not just for plumbing, but for understanding how the local water affects skin hydration and hair texture.`
  ];

  const hardSkin = [
    `Because the local supply is hard, minerals can precipitate onto the epidermis, potentially disrupting the acid mantle and leading to post-shower dryness.`,
    `The elevated calcium levels here often bind with soap to form an insoluble residue, making it difficult to completely rinse cleansers away from the skin.`,
    `Residents may notice that the water requires more soap to lather, which can strip natural oils and leave the skin feeling tight or itchy.`
  ];

  const softSkin = [
    `With this softer profile, cleansers wash away efficiently, helping to preserve the skin's natural acidic barrier and retain moisture.`,
    `The lower mineral content allows soaps to lather quickly and rinse off without leaving behind residue that can irritate sensitive skin.`,
    `Because the mineral count is relatively low, residents generally experience fewer issues with soap scum build-up on the skin surface.`
  ];

  const hardHair = [
    `Mineral crystallization on the hair shaft is common here, often resulting in hair that feels heavier or looks dull over time.`,
    `The calcium in the water can bind to hair cuticles, making strands brittle. Clarifying treatments are highly beneficial in this area.`,
    `If your hair feels weighed down, it is likely due to the ${hardness} mg/L mineral count accumulating. Chelating shampoos can break down this buildup.`
  ];

  const softHair = [
    `This water profile is generally gentle on hair cuticles, allowing for better moisture retention and reducing the need for heavy conditioning.`,
    `Softer water means shampoo lathers aggressively. You can typically use less product while still maintaining voluminous, manageable hair.`,
    `The lack of heavy calcium accumulation means hair washed in this water is less likely to become brittle or lose its natural shine.`
  ];

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 m-0">
            Dermatological Data: {city} Water Profile
          </h2>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 text-sm md:text-base leading-relaxed mb-8">
          <p>{intros[variation]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold">
              <Droplets className="w-5 h-5" />
              <span>Skin Barrier Interaction</span>
            </div>
            <p className="text-sm text-gray-700">
              {isHard ? hardSkin[variation] : softSkin[variation]}
            </p>
          </div>

          <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold">
              <UserCheck className="w-5 h-5" />
              <span>Hair Maintenance</span>
            </div>
            <p className="text-sm text-gray-700">
              {isHard ? hardHair[variation] : softHair[variation]}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 px-6 py-4 flex gap-3 items-start border-t border-gray-200">
        <AlertCircle className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Educational Only (YMYL Safe):</strong> The above data relates strictly to general water chemistry. It is not medical advice. Consult a dermatologist for chronic skin conditions like eczema.
        </p>
      </div>
    </div>
  );
}