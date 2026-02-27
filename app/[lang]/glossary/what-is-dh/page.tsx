// app/[lang]/glossary/what-is-dh/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Beaker, Globe2, Calculator, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What is °dH? (German Degrees of Water Hardness)',
  description: 'Learn how to calculate and convert °dH (Deutsche Härte) to mg/L. Understand the German standard for measuring water hardness and limescale.',
};

export default async function GlossaryDhPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link 
        href={`/${lang}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Directory
      </Link>

      <header className="mb-12 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Globe2 className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight m-0">
            What is °dH?
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          The "Deutsche Härte" (German Degree) standard for measuring limescale potential.
        </p>
      </header>

      <article className="prose prose-lg prose-blue max-w-none text-gray-700">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-10 not-prose">
          <h2 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> Quick Definition
          </h2>
          <p className="text-amber-800 m-0">
            <strong>°dH</strong> stands for <strong>Grad Deutsche Härte</strong>. It is the primary unit of measurement for water hardness used in Germany, Austria, and Switzerland. One German degree is defined as 10 milligrams of calcium oxide (CaO) per liter of water.
          </p>
        </div>

        <h3>The Math: Converting °dH to mg/L</h3>
        <p>
          Because most of Europe and the scientific community uses mg/L (milligrams per liter of Calcium Carbonate), you will often need to convert German degrees into mg/L.
        </p>
        
        <div className="bg-slate-900 text-white p-6 rounded-xl font-mono text-center text-lg my-8 not-prose shadow-lg border border-slate-700">
          <Calculator className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
          <p className="m-0"><strong>1 °dH</strong> = <strong>17.848 mg/L</strong> (CaCO₃)</p>
        </div>

        <p>
          If a washing machine manual tells you to set your internal water softener to match a local water hardness of <strong>14 °dH</strong>, that is equivalent to <strong>250 mg/L</strong>—which is classified as very hard water!
        </p>

        <h3>Why do appliance manufacturers use °dH?</h3>
        <p>
          Historically, Germany has been the manufacturing powerhouse of Europe for white goods (brands like Bosch, Miele, and Siemens). Because these machines were designed and engineered in Germany, their internal software, salt dosing dials, and user manuals default to the German scale (°dH), even when sold in the UK or France.
        </p>
      </article>
    </main>
  );
}