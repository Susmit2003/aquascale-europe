// // components/content/StickySummary.tsx
// import { Droplet, Info, ArrowRight } from 'lucide-react';
// import Link from 'next/link';

// interface StickySummaryProps {
//   city: string;
//   hardness: number;
//   lang: string;
// }

// export function StickySummary({ city, hardness, lang }: StickySummaryProps) {
//   const isHard = hardness > 120;

//   return (
//     <aside className="sticky top-8 space-y-6">
//       {/* Quick Facts Card */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//         <div className={`p-4 ${isHard ? 'bg-red-600' : 'bg-emerald-600'} text-white flex items-center gap-2`}>
//           <Droplet className="w-5 h-5" />
//           <h3 className="font-bold m-0">{city} Quick Summary</h3>
//         </div>
//         <div className="p-5 space-y-4">
//           <div>
//             <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Measured Hardness</span>
//             <span className="text-3xl font-black text-gray-900">{hardness} <span className="text-lg font-medium text-gray-500">mg/L</span></span>
//           </div>
//           <div>
//             <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Classification</span>
//             <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${isHard ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
//               {isHard ? 'Hard Water' : 'Soft Water'}
//             </span>
//           </div>
//           <a href="#product-recommendations" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
//             View Solutions
//           </a>
//         </div>
//       </div>

//       {/* Internal Knowledge Graph Linking */}
//       <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
//         <div className="flex items-center gap-2 mb-3">
//           <Info className="w-4 h-4 text-blue-600" />
//           <h4 className="font-bold text-slate-900">Knowledge Base</h4>
//         </div>
//         <ul className="space-y-3 text-sm">
//           <li>
//             <Link href={`/${lang}/glossary/what-is-mg-l`} className="text-blue-600 hover:underline flex items-center justify-between group">
//               What is mg/L? <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </Link>
//           </li>
//           <li>
//             <Link href={`/${lang}/glossary/what-is-dh`} className="text-blue-600 hover:underline flex items-center justify-between group">
//               What is °dH (German Degrees)? <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </Link>
//           </li>
//           <li>
//             <Link href={`/${lang}/guides/eu-hardness-classification-chart`} className="text-blue-600 hover:underline flex items-center justify-between group">
//               EU Hardness Classification Chart <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// }



"use client";

import { Droplet, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface StickySummaryProps {
  city: string;
  hardness: number;
  lang: string;
}

export function StickySummary({ city, hardness, lang }: StickySummaryProps) {
  const isHard = hardness > 120;
  
  // Grab the current URL path
  const pathname = usePathname(); 
  
  // Check if we are currently on the commercial analysis page
  const isCommercialPage = pathname.endsWith('/water-softener-analysis');

  return (
    <aside className="sticky top-8 space-y-6">
      {/* Quick Facts Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className={`p-4 ${isHard ? 'bg-red-600' : 'bg-emerald-600'} text-white flex items-center gap-2`}>
          <Droplet className="w-5 h-5" />
          <h3 className="font-bold m-0">{city} Quick Summary</h3>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Measured Hardness</span>
            <span className="text-3xl font-black text-gray-900">{hardness} <span className="text-lg font-medium text-gray-500">mg/L</span></span>
          </div>
          <div>
            <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Classification</span>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${isHard ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {isHard ? 'Hard Water' : 'Soft Water'}
            </span>
          </div>
          
          {/* 🟢 CONDITIONAL BUTTON RENDERING */}
          {/* Only shows on the commercial page, and scrolls down to the products */}
          {isCommercialPage && (
            <a 
              href="#product-recommendations" 
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              View Solutions
            </a>
          )}
          
        </div>
      </div>

      {/* Internal Knowledge Graph Linking */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-blue-600" />
          <h4 className="font-bold text-slate-900">Knowledge Base</h4>
        </div>
        <ul className="space-y-3 text-sm">
          <li>
            <Link href={`/${lang}/glossary/what-is-mg-l`} className="text-blue-600 hover:underline flex items-center justify-between group">
              What is mg/L? <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/glossary/what-is-dh`} className="text-blue-600 hover:underline flex items-center justify-between group">
              What is °dH (German Degrees)? <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/guides/eu-hardness-classification-chart`} className="text-blue-600 hover:underline flex items-center justify-between group">
              EU Hardness Classification Chart <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}