// app/[lang]/glossary/what-is-mg-l/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Beaker, Droplet, Info, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What is mg/L in Water Hardness? | Definition & Conversion',
  description: 'Understand what milligrams per liter (mg/L) means in water quality testing, how it measures calcium carbonate (CaCO3), and how to convert it to other units.',
};

export default async function GlossaryMgLPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Navigation */}
      <Link 
        href={`/${lang}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Directory
      </Link>

      {/* Header */}
      <header className="mb-12 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Beaker className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight m-0">
            What is mg/L?
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          The universal standard for measuring water hardness and mineral concentration.
        </p>
      </header>

      {/* Main Content */}
      <article className="prose prose-lg prose-blue max-w-none text-gray-700">
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-10 not-prose">
          <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5" /> Quick Definition
          </h2>
          <p className="text-blue-800 m-0">
            <strong>mg/L</strong> stands for <strong>milligrams per liter</strong>. In the context of water hardness, it measures the exact weight of dissolved minerals—specifically Calcium Carbonate (CaCO₃)—present in one liter of water. It is exactly equivalent to <strong>ppm (parts per million)</strong>.
          </p>
        </div>

        <h3>The Science Behind the Measurement</h3>
        <p>
          When rainwater falls, it is naturally soft. As it percolates through the earth, it absorbs minerals like calcium and magnesium from limestone and chalk deposits. Laboratory titration tests measure the concentration of these dissolved minerals.
        </p>
        <p>
          If a municipal water report states a hardness of <strong>150 mg/L</strong>, it means that if you were to completely boil away one liter of that tap water, you would be left with 150 milligrams of solid, white mineral residue (limescale).
        </p>

        <h3>Why mg/L is the Universal Standard</h3>
        <p>
          Historically, different European countries developed their own testing metrics (like German Degrees or French Degrees). However, modern hydrology and the <strong>EU Drinking Water Directive</strong> heavily favor mg/L because it is an absolute, weight-based metric that leaves no room for regional ambiguity.
        </p>

        <div className="my-12 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden not-prose">
          <div className="bg-slate-900 px-6 py-4 flex items-center gap-3 text-white">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold m-0 text-lg">Quick Conversion Chart</h3>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-900">mg/L (ppm)</th>
                  <th className="p-4 font-semibold text-gray-900">German (°dH)</th>
                  <th className="p-4 font-semibold text-gray-900">French (°fH)</th>
                  <th className="p-4 font-semibold text-gray-900">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-4 font-medium text-gray-900">0 - 60 mg/L</td>
                  <td className="p-4 text-gray-600">0 - 3.3 °dH</td>
                  <td className="p-4 text-gray-600">0 - 6.0 °fH</td>
                  <td className="p-4"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Soft</span></td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900">61 - 120 mg/L</td>
                  <td className="p-4 text-gray-600">3.4 - 6.7 °dH</td>
                  <td className="p-4 text-gray-600">6.1 - 12.0 °fH</td>
                  <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Moderately Hard</span></td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900">121 - 180 mg/L</td>
                  <td className="p-4 text-gray-600">6.8 - 10.0 °dH</td>
                  <td className="p-4 text-gray-600">12.1 - 18.0 °fH</td>
                  <td className="p-4"><span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">Hard</span></td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900">181+ mg/L</td>
                  <td className="p-4 text-gray-600">10.1+ °dH</td>
                  <td className="p-4 text-gray-600">18.1+ °fH</td>
                  <td className="p-4"><span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">Very Hard</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </article>

      {/* CTA Bottom */}
      <div className="mt-16 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-8 text-center text-white shadow-lg">
        <Droplet className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Check Your City's mg/L Level</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8">
          Find out exactly how much dissolved calcium is running through your home's pipes and appliances.
        </p>
        <Link 
          href={`/${lang}`}
          className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Search the Directory
        </Link>
      </div>

    </main>
  );
}