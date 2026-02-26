import { convertHardness, getLocalUnit } from '@/utils/calculations';
import translationsData from '@/data/translations.json';
import { SupportedLanguage, Translations } from '@/types';

const translations = translationsData as Translations;

interface HardnessGaugeProps {
  hardnessMgL: number;
  lang: SupportedLanguage;
}

export default function HardnessGauge({ hardnessMgL, lang }: HardnessGaugeProps) {
  // 1. Fetch Localized Dictionary
  const t = translations[lang] || translations['en'];

  // 2. Unit Conversion
  const localUnit = getLocalUnit(lang);
  const localValue = convertHardness(hardnessMgL, localUnit);

  // 3. Determine Category & Color Mapping
  let categoryText = t.soft;
  let barColor = 'bg-green-500';
  
  if (hardnessMgL > 60 && hardnessMgL <= 120) {
    categoryText = t.medium;
    barColor = 'bg-yellow-400';
  } else if (hardnessMgL > 120 && hardnessMgL <= 180) {
    categoryText = t.hard;
    barColor = 'bg-orange-500';
  } else if (hardnessMgL > 180) {
    categoryText = t.very_hard;
    barColor = 'bg-red-600';
  }

  // 4. Calculate Bar Width (Capped at 100%, assuming 300 mg/L as visual maximum)
  const fillPercentage = Math.min((hardnessMgL / 300) * 100, 100);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-3xl font-extrabold text-gray-900">{localValue}</span>
          <span className="text-sm font-medium text-gray-500 ml-1">{localUnit === 'mg/L' ? '' : `°${localUnit}`}</span>
        </div>
        <div className="text-right">
          <span className={`text-sm font-bold px-2 py-1 rounded uppercase tracking-wider ${barColor} text-white`}>
            {categoryText}
          </span>
        </div>
      </div>

      {/* Visual Bar */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4">
        <div 
          className={`h-full ${barColor} transition-all duration-500 ease-out`} 
          style={{ width: `${fillPercentage}%` }}
          role="progressbar"
          aria-valuenow={hardnessMgL}
          aria-valuemin={0}
          aria-valuemax={300}
        />
      </div>

      {/* Secondary Unit Display (SEO / Context) */}
      <div className="mt-4 text-xs text-gray-400 flex justify-between">
        <span>{t.base_unit}: {hardnessMgL} mg/L</span>
        <span>{t.local_unit}</span>
      </div>
    </div>
  );
}