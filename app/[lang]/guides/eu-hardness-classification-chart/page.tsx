// // app/[lang]/guides/eu-hardness-classification-chart/page.tsx
// import { Metadata } from 'next';
// import Link from 'next/link';
// import { ArrowLeft, Table2, ShieldCheck } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'EU Water Hardness Classification Chart | mg/L, °dH, °fH',
//   description: 'The ultimate conversion chart for European water hardness. Convert between mg/L, German Degrees (°dH), French Degrees (°fH), and English Clark Degrees.',
// };

// export default async function EUChartPage({ params }: { params: Promise<{ lang: string }> }) {
//   const { lang } = await params;

//   return (
//     <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//       <Link 
//         href={`/${lang}`}
//         className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 mb-8 transition-colors"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back to Directory
//       </Link>

//       <header className="mb-12 border-b border-gray-200 pb-8">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
//             <Table2 className="w-6 h-6" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight m-0">
//             EU Hardness Classification Chart
//           </h1>
//         </div>
//         <p className="text-xl text-gray-600">
//           Translate your municipality's water report into the exact settings required by your household appliances.
//         </p>
//       </header>

//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
//         <div className="bg-slate-50 border-b border-gray-200 p-6 flex items-start gap-4">
//           <ShieldCheck className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
//           <p className="text-sm text-gray-700 leading-relaxed m-0">
//             <strong>Appliance Setup Notice:</strong> Most European dishwashers and washing machines (Bosch, Miele, Electrolux) require you to input your water hardness to properly dose anti-scaling salt. Use this chart to convert your local <strong>mg/L</strong> reading into the degree system your appliance manufacturer uses.
//           </p>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-900 text-white">
//                 <th className="p-4 font-semibold text-sm">Classification</th>
//                 <th className="p-4 font-semibold text-sm">International (mg/L / ppm)</th>
//                 <th className="p-4 font-semibold text-sm">German (°dH)</th>
//                 <th className="p-4 font-semibold text-sm">French (°fH)</th>
//                 <th className="p-4 font-semibold text-sm">English / Clark (°e)</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               <tr className="hover:bg-slate-50 transition-colors">
//                 <td className="p-4"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">Soft</span></td>
//                 <td className="p-4 font-bold text-gray-900">0 - 60</td>
//                 <td className="p-4 text-gray-600">0 - 3.3</td>
//                 <td className="p-4 text-gray-600">0 - 6.0</td>
//                 <td className="p-4 text-gray-600">0 - 4.2</td>
//               </tr>
//               <tr className="hover:bg-slate-50 transition-colors">
//                 <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full">Moderately Hard</span></td>
//                 <td className="p-4 font-bold text-gray-900">61 - 120</td>
//                 <td className="p-4 text-gray-600">3.4 - 6.7</td>
//                 <td className="p-4 text-gray-600">6.1 - 12.0</td>
//                 <td className="p-4 text-gray-600">4.3 - 8.4</td>
//               </tr>
//               <tr className="hover:bg-slate-50 transition-colors bg-amber-50/30">
//                 <td className="p-4"><span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">Hard</span></td>
//                 <td className="p-4 font-bold text-gray-900">121 - 180</td>
//                 <td className="p-4 text-gray-600">6.8 - 10.0</td>
//                 <td className="p-4 text-gray-600">12.1 - 18.0</td>
//                 <td className="p-4 text-gray-600">8.5 - 12.6</td>
//               </tr>
//               <tr className="hover:bg-slate-50 transition-colors bg-red-50/30">
//                 <td className="p-4"><span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1.5 rounded-full">Very Hard</span></td>
//                 <td className="p-4 font-bold text-gray-900">181+</td>
//                 <td className="p-4 text-gray-600">10.1+</td>
//                 <td className="p-4 text-gray-600">18.1+</td>
//                 <td className="p-4 text-gray-600">12.7+</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </main>
//   );
// }


// app/[lang]/guides/eu-hardness-classification-chart/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Table2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EU Water Hardness Classification Chart | mg/L, °dH, °fH',
  description: 'The ultimate conversion chart for European water hardness. Convert between mg/L, German Degrees (°dH), French Degrees (°fH), and English Clark Degrees.',
};

export default async function EUChartPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link 
        href={`/${lang}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Directory
      </Link>

      <header className="mb-12 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <Table2 className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight m-0">
            EU Hardness Classification Chart
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Translate your municipality's water report into the exact settings required by your household appliances.
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
        <div className="bg-slate-50 border-b border-gray-200 p-6 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
          <p className="text-sm text-gray-700 leading-relaxed m-0">
            <strong>Appliance Setup Notice:</strong> Most European dishwashers and washing machines (Bosch, Miele, Electrolux) require you to input your water hardness to properly dose anti-scaling salt. Use this chart to convert your local <strong>mg/L</strong> reading into the degree system your appliance manufacturer uses.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-4 font-semibold text-sm">Classification</th>
                <th className="p-4 font-semibold text-sm">International (mg/L / ppm)</th>
                <th className="p-4 font-semibold text-sm">German (°dH)</th>
                <th className="p-4 font-semibold text-sm">French (°fH)</th>
                <th className="p-4 font-semibold text-sm">English / Clark (°e)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">Soft</span></td>
                <td className="p-4 font-bold text-gray-900">0 - 60</td>
                <td className="p-4 text-gray-600">0 - 3.3</td>
                <td className="p-4 text-gray-600">0 - 6.0</td>
                <td className="p-4 text-gray-600">0 - 4.2</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full">Moderately Hard</span></td>
                <td className="p-4 font-bold text-gray-900">61 - 120</td>
                <td className="p-4 text-gray-600">3.4 - 6.7</td>
                <td className="p-4 text-gray-600">6.1 - 12.0</td>
                <td className="p-4 text-gray-600">4.3 - 8.4</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors bg-amber-50/30">
                <td className="p-4"><span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">Hard</span></td>
                <td className="p-4 font-bold text-gray-900">121 - 180</td>
                <td className="p-4 text-gray-600">6.8 - 10.0</td>
                <td className="p-4 text-gray-600">12.1 - 18.0</td>
                <td className="p-4 text-gray-600">8.5 - 12.6</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors bg-red-50/30">
                <td className="p-4"><span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1.5 rounded-full">Very Hard</span></td>
                <td className="p-4 font-bold text-gray-900">181+</td>
                <td className="p-4 text-gray-600">10.1+</td>
                <td className="p-4 text-gray-600">18.1+</td>
                <td className="p-4 text-gray-600">12.7+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}