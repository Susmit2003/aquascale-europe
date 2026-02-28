// // app/[lang]/methodology/page.tsx
// import { ShieldCheck, Database, Beaker, MapPin } from 'lucide-react';
// import { Metadata } from 'next';
// import Link from 'next/link';
// import { SupportedLanguage } from '@/types';

// export const metadata: Metadata = {
//   title: 'Data Methodology & Testing Protocols | AquaScale Europe',
//   description: 'Learn how AquaScale Europe aggregates, tests, and verifies municipal water hardness data across European regions.',
// };

// export default async function MethodologyPage({ params }: { params: Promise<{ lang: SupportedLanguage }> }) {
//   const { lang } = await params;

//   return (
//     <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
//           Data Methodology & Testing
//         </h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Transparency is at the core of our platform. Here is exactly how we source, verify, and calculate the water hardness data for over 10,000 European municipalities.
//         </p>
//       </div>

//       <div className="space-y-12">
//         {/* Section 1 */}
//         <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
//               <Database className="w-6 h-6" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 m-0">1. Primary Data Aggregation</h2>
//           </div>
//           <p className="text-gray-600 leading-relaxed mb-4">
//             Our baseline data is sourced directly from legally mandated municipal water reports. Under the <strong>EU Drinking Water Directive (2020/2184)</strong>, water utility companies are required to publish routine biochemical analyses. 
//           </p>
//           <ul className="list-disc pl-5 text-gray-600 space-y-2">
//             <li>We parse PDF and CSV reports from regional water authorities.</li>
//             <li>Data is captured bi-annually to account for seasonal reservoir shifts.</li>
//             <li>We aggregate historical data dating back to 2015 for trend forecasting.</li>
//           </ul>
//         </section>

//         {/* Section 2 */}
//         <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
//               <Beaker className="w-6 h-6" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 m-0">2. Standardization to mg/L</h2>
//           </div>
//           <p className="text-gray-600 leading-relaxed">
//             Because Europe lacks a single unified metric for water hardness, municipalities publish data in German Degrees (°dH), French Degrees (°fH), English Degrees (°e), or millimoles per liter (mmol/L). 
//             Our proprietary algorithm converts all localized metrics into a standardized <strong>milligrams per liter (mg/L) of Calcium Carbonate (CaCO₃) equivalent</strong> to allow for accurate cross-border comparisons.
//           </p>
//         </section>

//         {/* Section 3 */}
//         <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
//               <MapPin className="w-6 h-6" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 m-0">3. Spatial Interpolation</h2>
//           </div>
//           <p className="text-gray-600 leading-relaxed">
//             For smaller towns lacking published municipal data, we utilize a geospatial estimation model. By analyzing the primary water source (e.g., groundwater aquifer vs. surface river) and mapping it against known data points in neighboring municipalities sharing the same hydro-geological basin, we project an estimated mg/L value with a ±10% margin of error.
//           </p>
//         </section>

//         {/* Section 4 */}
//         <section className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8 text-white">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-12 h-12 bg-slate-800 text-blue-400 rounded-xl flex items-center justify-center">
//               <ShieldCheck className="w-6 h-6" />
//             </div>
//             <h2 className="text-2xl font-bold text-white m-0">Expert Review Process</h2>
//           </div>
//           <p className="text-slate-300 leading-relaxed mb-6">
//             Algorithmic outputs are periodically spot-checked by certified water systems engineers. We cross-reference our digital projections against physical titration tests (EDTA method) submitted by our commercial partners across Europe.
//           </p>
//           <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
//             <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border-2 border-slate-600 shrink-0">
//               ER
//             </div>
//             <div>
//               <p className="font-bold text-white m-0">Dr. Elena Rostova</p>
//               <p className="text-sm text-slate-400 m-0">Senior Technical Reviewer</p>
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="mt-12 text-center">
//         <Link href={`/${lang}`} className="text-blue-600 font-medium hover:underline">
//           ← Return to Regional Directory
//         </Link>
//       </div>
//     </main>
//   );
// }


// app/[lang]/methodology/page.tsx
import { ShieldCheck, Database, Beaker, MapPin } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SupportedLanguage } from '@/types';

export const metadata: Metadata = {
  title: 'Data Methodology & Testing Protocols | AquaScale Europe',
  description: 'Learn how AquaScale Europe aggregates, tests, and verifies municipal water hardness data across European regions.',
};

export default async function MethodologyPage({ params }: { params: Promise<{ lang: SupportedLanguage }> }) {
  const { lang } = await params;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 sm:px-8 lg:px-12 font-sans text-zinc-800">
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-4xl font-semibold text-zinc-900 tracking-tighter sm:text-5xl mb-6">
          Data Methodology & Testing
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
          Transparency is at the core of our platform. Here is exactly how we source, verify, and calculate the water hardness data for over 10,000 European municipalities.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1 */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 p-8 md:p-10 hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center shrink-0 border border-sky-100/50">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight m-0">1. Primary Data Aggregation</h2>
          </div>
          <p className="text-zinc-600 font-light leading-relaxed mb-6">
            Our baseline data is sourced directly from legally mandated municipal water reports. Under the <strong className="font-medium text-zinc-800">EU Drinking Water Directive (2020/2184)</strong>, water utility companies are required to publish routine biochemical analyses. 
          </p>
          <ul className="list-disc pl-6 text-zinc-600 font-light space-y-3 marker:text-zinc-400">
            <li>We parse PDF and CSV reports from regional water authorities.</li>
            <li>Data is captured bi-annually to account for seasonal reservoir shifts.</li>
            <li>We aggregate historical data dating back to 2015 for trend forecasting.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 p-8 md:p-10 hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100/50">
              <Beaker className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight m-0">2. Standardization to mg/L</h2>
          </div>
          <p className="text-zinc-600 font-light leading-relaxed">
            Because Europe lacks a single unified metric for water hardness, municipalities publish data in German Degrees (°dH), French Degrees (°fH), English Degrees (°e), or millimoles per liter (mmol/L). 
            Our proprietary algorithm converts all localized metrics into a standardized <strong className="font-medium text-zinc-800">milligrams per liter (mg/L) of Calcium Carbonate (CaCO₃) equivalent</strong> to allow for accurate cross-border comparisons.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 p-8 md:p-10 hover:shadow-lg hover:shadow-zinc-100/50 transition-shadow duration-300">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100/50">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight m-0">3. Spatial Interpolation</h2>
          </div>
          <p className="text-zinc-600 font-light leading-relaxed">
            For smaller towns lacking published municipal data, we utilize a geospatial estimation model. By analyzing the primary water source (e.g., groundwater aquifer vs. surface river) and mapping it against known data points in neighboring municipalities sharing the same hydro-geological basin, we project an estimated mg/L value with a ±10% margin of error.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-zinc-900 rounded-[2rem] shadow-xl border border-zinc-800 p-8 md:p-10 text-zinc-100 mt-16 relative overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-900/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex items-center gap-5 mb-6 relative z-10">
            <div className="w-14 h-14 bg-zinc-800 text-sky-400 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Expert Review Process</h2>
          </div>
          <p className="text-zinc-400 font-light leading-relaxed mb-8 relative z-10">
            Algorithmic outputs are periodically spot-checked by certified water systems engineers. We cross-reference our digital projections against physical titration tests (EDTA method) submitted by our commercial partners across Europe.
          </p>
          <div className="flex items-center gap-5 border-t border-zinc-800 pt-8 relative z-10">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-semibold text-xl border border-zinc-700 shrink-0 shadow-inner">
              ER
            </div>
            <div>
              <p className="font-medium text-white tracking-tight text-lg m-0 mb-1">Dr. Elena Rostova</p>
              <p className="text-sm text-zinc-500 font-light m-0">Senior Technical Reviewer</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link 
          href={`/${lang}`} 
          className="inline-flex items-center gap-2 text-zinc-500 font-medium hover:text-zinc-900 transition-colors duration-200"
        >
          &larr; Return to Regional Directory
        </Link>
      </div>
    </main>
  );
}