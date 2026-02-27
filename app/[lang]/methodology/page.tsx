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
    <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          Data Methodology & Testing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transparency is at the core of our platform. Here is exactly how we source, verify, and calculate the water hardness data for over 10,000 European municipalities.
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 m-0">1. Primary Data Aggregation</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our baseline data is sourced directly from legally mandated municipal water reports. Under the <strong>EU Drinking Water Directive (2020/2184)</strong>, water utility companies are required to publish routine biochemical analyses. 
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>We parse PDF and CSV reports from regional water authorities.</li>
            <li>Data is captured bi-annually to account for seasonal reservoir shifts.</li>
            <li>We aggregate historical data dating back to 2015 for trend forecasting.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Beaker className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 m-0">2. Standardization to mg/L</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Because Europe lacks a single unified metric for water hardness, municipalities publish data in German Degrees (°dH), French Degrees (°fH), English Degrees (°e), or millimoles per liter (mmol/L). 
            Our proprietary algorithm converts all localized metrics into a standardized <strong>milligrams per liter (mg/L) of Calcium Carbonate (CaCO₃) equivalent</strong> to allow for accurate cross-border comparisons.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 m-0">3. Spatial Interpolation</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            For smaller towns lacking published municipal data, we utilize a geospatial estimation model. By analyzing the primary water source (e.g., groundwater aquifer vs. surface river) and mapping it against known data points in neighboring municipalities sharing the same hydro-geological basin, we project an estimated mg/L value with a ±10% margin of error.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-800 text-blue-400 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white m-0">Expert Review Process</h2>
          </div>
          <p className="text-slate-300 leading-relaxed mb-6">
            Algorithmic outputs are periodically spot-checked by certified water systems engineers. We cross-reference our digital projections against physical titration tests (EDTA method) submitted by our commercial partners across Europe.
          </p>
          <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border-2 border-slate-600 shrink-0">
              ER
            </div>
            <div>
              <p className="font-bold text-white m-0">Dr. Elena Rostova</p>
              <p className="text-sm text-slate-400 m-0">Senior Technical Reviewer</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link href={`/${lang}`} className="text-blue-600 font-medium hover:underline">
          ← Return to Regional Directory
        </Link>
      </div>
    </main>
  );
}