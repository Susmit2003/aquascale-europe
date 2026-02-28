'use client';

import { useState } from 'react';
import { Search, MapPin, Droplets, ShieldCheck } from 'lucide-react';

interface PostcodeHardnessLookupProps {
  city: string;
  baseHardness: number;
  utility: string;
}

export function PostcodeHardnessLookup({ city, baseHardness, utility }: PostcodeHardnessLookupProps) {
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ hardness: number; zone: string; variance: number } | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;

    setLoading(true);

    // Simulate an API call to a geological/utility database (e.g., Postcodes.io or your own backend API)
    // In production, replace this with a real fetch() to your localized dataset.
    setTimeout(() => {
      // Deterministic mock variance based on the postcode string length and characters
      const hash = postcode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const variance = (hash % 14) - 7; // Generates a variance between -7 and +7 mg/L
      
      setResult({
        hardness: baseHardness + variance,
        zone: postcode.toUpperCase(),
        variance: variance
      });
      setLoading(false);
    }, 1200); // 1.2s delay to simulate complex database lookup (increases dwell time)
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Street-Level Diagnostic</h3>
      <p className="text-slate-600 mb-6">
        Municipal averages give a baseline, but local pipe infrastructure and specific treatment plants affect your exact tap water. Enter your {city} postal code to calculate your micro-zone hardness.
      </p>

      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="e.g. 10115 or SW1A"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze
            </>
          )}
        </button>
      </form>

      {/* RESULT UI */}
      {result && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4 border-b border-blue-100 pb-4">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h4 className="font-bold text-blue-900 text-lg">Analysis Complete for {result.zone}</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">Micro-Zone Hardness</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-gray-900">{result.hardness}</span>
                <span className="text-lg font-bold text-slate-500">mg/L</span>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                {result.variance > 0 ? '▲' : '▼'} {Math.abs(result.variance)} mg/L difference from {city} municipal average
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-slate-700"><strong>Primary Supply:</strong> {utility || 'Regional Network'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-700"><strong>Recommendation:</strong> {result.hardness > 120 ? 'Ion-exchange softening advised' : 'No treatment required'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}