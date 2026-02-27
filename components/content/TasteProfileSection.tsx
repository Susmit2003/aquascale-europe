// components/content/TasteProfileSection.tsx
import { Coffee, Droplet, TestTube } from 'lucide-react';

interface TasteProfileSectionProps {
  city: string;
  hardness: number;
}

export function TasteProfileSection({ city, hardness }: TasteProfileSectionProps) {
  const isHard = hardness > 120;
  const isVeryHard = hardness > 250;
  const isSoft = hardness < 60;

  // Determine flavor profile based on chemical makeup
  let flavorProfile = "neutral and balanced";
  if (isVeryHard) flavorProfile = "heavy, slightly chalky, or metallic";
  else if (isHard) flavorProfile = "crisp with a distinct mineral weight";
  else if (isSoft) flavorProfile = "smooth but potentially flat";

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          The Taste Profile of {city} Water
        </h2>
        <p className="text-gray-600 mb-8">
          The dissolved minerals that dictate water hardness also act as the primary flavor compounds in your glass. At {hardness} mg/L, here is how the local water profile affects taste and culinary applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Direct Drinking Profile */}
          <div className="flex flex-col">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Drinking Profile</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Straight from the tap, {city}'s water often tastes <strong>{flavorProfile}</strong>. 
              {isHard 
                ? " The high presence of calcium and magnesium acts as a natural flavor enhancer, which many people prefer over the 'flat' taste of distilled or heavily softened water." 
                : " Because of the low mineral content, it provides a very clean, unobtrusive taste that refreshes without leaving a heavy mouthfeel."}
            </p>
          </div>

          {/* Coffee & Tea Impact */}
          <div className="flex flex-col">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Impact on Coffee & Tea</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Water makes up 98% of your coffee. The {hardness} mg/L levels in {city} will 
              {isVeryHard 
                ? " severely over-extract the coffee beans, leading to bitter, muted flavors and destroying delicate floral notes in light roasts." 
                : isHard 
                ? " generally extract coffee well, providing good body, though it may mute some of the brighter acidic notes found in specialty African coffees." 
                : " produce bright, highly acidic coffee, but may struggle to extract enough body and sweetness, making the brew feel thin."}
            </p>
          </div>

          {/* Culinary Science */}
          <div className="flex flex-col">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <TestTube className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Culinary Science</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              When cooking in {city}, the {isHard ? 'calcium-rich' : 'soft'} water affects food texture. 
              {isHard 
                ? " Boiling vegetables in hard water keeps them firmer and more vibrant, as the calcium reinforces the plant's cell walls (pectin)." 
                : " Soft water breaks down plant cell walls (pectin) faster, making it excellent for creating smooth purees and boiling beans rapidly."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}