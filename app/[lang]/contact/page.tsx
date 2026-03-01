// app/[lang]/contact/page.tsx
"use client";

import { useState } from 'react';
import { Mail, MapPin, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ContactPage() {
  const params = useParams();
  const lang = params.lang as string || 'en';
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API submission (replace with your actual form handler like Formspree or Next API)
    setTimeout(() => setStatus('success'), 1000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          Data Corrections & Contact
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Help us keep Europe's water data accurate. Submit official municipal reports, suggest corrections, or reach out to our engineering team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Contact Information Sidebar */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Data Integrity
            </h3>
            <p className="text-sm text-blue-800 leading-relaxed mb-0">
              Every user-submitted correction is manually verified by our team against official regional water authority publications before the database is updated.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Direct Inquiries</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                tidyauras@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                Tirana, Albania (HQ)
              </li>
            </ul>
          </div>
        </div>

        {/* The Contact Form */}
        <div className="md:col-span-2">
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center h-full flex flex-col justify-center items-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">Message Received</h3>
              <p className="text-green-700 mb-6">Thank you. Our data team will review your submission shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-green-800 font-medium hover:underline"
              >
                Submit another correction
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" id="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jane Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" id="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="jane@example.com" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">Municipality / City</label>
                <input type="text" id="city" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Skopje, North Macedonia" />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message or Data Correction</label>
                <textarea id="message" required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Please include a link to the official municipal water report if suggesting a data update..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : <><Send className="w-5 h-5" /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href={`/${lang}`} className="text-blue-600 font-medium hover:underline">
          ← Return to Regional Directory
        </Link>
      </div>
    </main>
  );
}