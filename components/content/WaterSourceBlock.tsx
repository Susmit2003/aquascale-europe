// // components/content/WaterSourceBlock.tsx
// import waterSources from '@/data/water-sources.json';
// import { Droplets, Info, Scale, ShieldCheck } from 'lucide-react';
// import Link from 'next/link';

// interface WaterSourceBlockProps {
//   city: string;
//   citySlug: string;
//   lang: string;
// }

// export function WaterSourceBlock({ city, citySlug, lang }: WaterSourceBlockProps) {
//   const sourceData = (waterSources as Record<string, any>)[citySlug.toLowerCase()] || waterSources.default;

//   return (
//     <div className="mt-12 space-y-8">
//       <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">
//         Where Does {city}'s Water Come From?
//       </h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-4 text-blue-700">
//             <Droplets className="w-6 h-6" />
//             <h3 className="font-semibold text-lg">Source & Treatment</h3>
//           </div>
//           <p className="text-sm text-gray-700 mb-3">
//             <strong>Primary Source:</strong> {sourceData.type}
//           </p>
//           <p className="text-sm text-gray-700">
//             <strong>Treatment Method:</strong> {sourceData.treatment}
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-4 text-green-700">
//             <ShieldCheck className="w-6 h-6" />
//             <h3 className="font-semibold text-lg">EU Regulatory Compliance</h3>
//           </div>
//           <p className="text-sm text-gray-700">
//             {sourceData.eu_compliance}
//           </p>
//           <p className="text-xs text-gray-500 mt-4 border-t pt-2">
//             Reference: European Environment Agency (EEA) & EU Drinking Water Directive.
//           </p>
//         </div>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//         <div className="flex items-center gap-2 text-gray-800 mb-3">
//           <Scale className="w-5 h-5" />
//           <h4 className="font-bold">Data Transparency: How We Calculate Hardness</h4>
//         </div>
//         <p className="text-sm text-gray-600 leading-relaxed mb-4">
//           The hardness data presented for {city} is aggregated from local municipal water reports, user-submitted tests, and regional hydro-geological surveys. Because water hardness fluctuates seasonally based on rainfall and reservoir levels, our displayed mg/L is an annualized average estimate.
//         </p>
//         <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mb-4">
//           <li><strong>Update Frequency:</strong> Bi-annually</li>
//           <li><strong>Measurement Standard:</strong> Milligrams per liter (mg/L) equivalent to ppm.</li>
//         </ul>
//         <div className="bg-white p-3 rounded text-xs text-gray-500 flex items-start gap-2 border border-gray-100">
//           <Info className="w-4 h-4 shrink-0 mt-0.5" />
//           <p>
//             Notice an inaccuracy? Water supply routing can change.{' '}
//             <Link href={`/${lang}/contact`} className="text-blue-600 underline hover:text-blue-800">
//               Submit a local water report correction here
//             </Link>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// components/content/WaterSourceBlock.tsx
import waterSources from '@/data/water-sources.json';
import { Droplets, Info, Scale, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface WaterSourceBlockProps {
  city: string;
  citySlug: string;
  lang: string;
}

export function WaterSourceBlock({ city, citySlug, lang }: WaterSourceBlockProps) {
  const sourceData = (waterSources as Record<string, any>)[citySlug.toLowerCase()] || waterSources.default;

  return (
    <div className="mt-12 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">
        Where Does {city}'s Water Come From?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-blue-700">
            <Droplets className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Source & Treatment</h3>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            <strong>Primary Source:</strong> {sourceData.type}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Treatment Method:</strong> {sourceData.treatment}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-green-700">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="font-semibold text-lg">EU Regulatory Compliance</h3>
          </div>
          <p className="text-sm text-gray-700">
            {sourceData.eu_compliance}
          </p>
          <p className="text-xs text-gray-500 mt-4 border-t pt-2">
            Reference: European Environment Agency (EEA) & EU Drinking Water Directive.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 text-gray-800 mb-3">
          <Scale className="w-5 h-5" />
          <h4 className="font-bold">Data Transparency: How We Calculate Hardness</h4>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          The hardness data presented for {city} is aggregated from local municipal water reports, user-submitted tests, and regional hydro-geological surveys. Because water hardness fluctuates seasonally based on rainfall and reservoir levels, our displayed mg/L is an annualized average estimate.
        </p>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mb-4">
          <li><strong>Update Frequency:</strong> Bi-annually</li>
          <li><strong>Measurement Standard:</strong> Milligrams per liter (mg/L) equivalent to ppm.</li>
        </ul>
        <div className="bg-white p-3 rounded text-xs text-gray-500 flex items-start gap-2 border border-gray-100">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Notice an inaccuracy? Water supply routing can change.{' '}
            <Link href={`/${lang}/contact`} className="text-blue-600 underline hover:text-blue-800">
              Submit a local water report correction here
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}