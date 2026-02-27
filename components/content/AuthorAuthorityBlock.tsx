// components/content/AuthorAuthorityBlock.tsx
import { ShieldCheck, Beaker } from 'lucide-react';
import Link from 'next/link';

interface AuthorAuthorityBlockProps {
  city: string;
  lang: string;
}

export function AuthorAuthorityBlock({ city, lang }: AuthorAuthorityBlockProps) {
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-slate-50 border-y border-slate-200 py-4 px-6 my-8 text-sm text-slate-600">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        {/* Fallback avatar if you don't have an image yet */}
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg border-2 border-white shadow-sm shrink-0">
          ER
        </div>
        <div>
          <p className="font-bold text-slate-900 m-0">Reviewed by Dr. Elena Rostova</p>
          <p className="m-0 text-xs sm:text-sm">Senior Water Systems Engineer, M.Sc. Hydrology</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 md:justify-end">
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200 rounded-md shadow-sm">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span className="font-medium text-slate-800 text-xs sm:text-sm">Updated: {monthYear}</span>
        </div>
        <Link 
          href={`/${lang}/methodology`} 
          className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200 rounded-md shadow-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors text-xs sm:text-sm"
        >
          <Beaker className="w-4 h-4 text-blue-600" />
          View Testing Methodology
        </Link>
      </div>
    </div>
  );
}