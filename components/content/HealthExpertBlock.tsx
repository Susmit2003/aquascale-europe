// components/content/HealthExpertBlock.tsx
import { BookOpen, Droplets, UserCheck, AlertCircle } from 'lucide-react';

interface HealthExpertBlockProps {
  city: string;
  hardness: number;
}

export function HealthExpertBlock({ city, hardness }: HealthExpertBlockProps) {
  const isHard = hardness > 120;

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 m-0">
            What Research Says About {city} Water and Your Skin
          </h2>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 text-sm md:text-base leading-relaxed mb-8">
          <p>
            The water in {city} contains <strong>{hardness} mg/L</strong> of dissolved minerals, primarily calcium and magnesium. While dietary calcium is healthy, bathing in highly mineralized water affects the skin barrier differently.
          </p>
          <p>
            Dermatological studies indicate that hard water requires more soap to create a lather. This often leads to users applying excess surfactant (soap), which binds with calcium to form an insoluble residue—commonly referred to as "soap scum."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold">
              <Droplets className="w-5 h-5" />
              <span>The Barrier Effect</span>
            </div>
            <p className="text-sm text-gray-700">
              {isHard 
                ? `Because ${city}'s water is hard, the mineral residue left on the skin can disrupt the acid mantle. This makes it harder for the skin to retain natural moisture, often exacerbating dryness after showering.`
                : `At ${hardness} mg/L, ${city}'s water is relatively soft. This makes it easier to rinse away cleansers completely, helping to maintain the skin's natural acidic barrier.`}
            </p>
          </div>

          <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold">
              <UserCheck className="w-5 h-5" />
              <span>Hair Care Implications</span>
            </div>
            <p className="text-sm text-gray-700">
              {isHard
                ? `Minerals in the ${hardness} mg/L water can crystallize on the hair shaft. This often causes hair to feel brittle, heavy, or look dull. Using a chelating shampoo once a week can help remove this mineral buildup.`
                : `Softer water allows shampoo to lather effectively with less product. Your hair is less likely to suffer from mineral buildup, leaving it feeling lighter and more manageable.`}
            </p>
          </div>
        </div>
      </div>

      {/* Strict YMYL Disclaimer */}
      <div className="bg-gray-100 px-6 py-4 flex gap-3 items-start border-t border-gray-200">
        <AlertCircle className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Educational Purposes Only:</strong> The information provided in this section is for general educational purposes regarding water chemistry and dermatological studies. It is not intended as medical advice. If you suffer from eczema, psoriasis, or persistent skin irritation, consult a board-certified dermatologist.
        </p>
      </div>
    </div>
  );
}