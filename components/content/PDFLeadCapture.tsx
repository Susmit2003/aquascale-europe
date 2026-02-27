// components/content/PDFLeadCapture.tsx
"use client";

import { useState } from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PDFLeadCaptureProps {
  city: string;
  hardness: number;
}

export function PDFLeadCapture({ city, hardness }: PDFLeadCaptureProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !email) return;

    setStatus('loading');

    try {
      // Calls our Next.js API Route (Part B)
      const res = await fetch('/api/pdf-export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, city, hardness, consent }),
      });

      if (res.ok) {
        // Handle file download on the client side
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Water-Report-${city}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setStatus('success');
      }
    } catch (error) {
      console.error('Download failed', error);
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">Report Downloaded Successfully!</h3>
        <p className="text-green-700">Check your downloads folder. A copy has also been sent to {email}.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-slate-700 overflow-hidden text-white">
      <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold m-0 text-white">Get the Complete {city} Water PDF Guide</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Download our comprehensive 5-page dossier on {city}'s water chemistry. Includes 10-year forecasts, appliance lifespan charts, and commercial insights. Perfect for saving to your phone or printing.
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Full {hardness} mg/L breakdown</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Appliance protection checklist</li>
          </ul>
        </div>

        <form onSubmit={handleDownload} className="w-full md:w-[400px] bg-white rounded-xl p-6 text-gray-900 shadow-xl">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-6 flex items-start gap-3">
            <input 
              type="checkbox" 
              id="gdpr" 
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="gdpr" className="text-xs text-gray-500 leading-tight">
              I consent to receiving this PDF and occasional water quality updates via email. I understand my data is protected under EU GDPR laws.
            </label>
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {status === 'loading' ? 'Generating PDF...' : (
              <><Download className="w-5 h-5" /> Download Free PDF</>
            )}
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            <ShieldCheck className="w-3 h-3" /> 100% Spam Free
          </div>
        </form>
      </div>
    </div>
  );
}