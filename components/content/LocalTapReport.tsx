"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, ThumbsUp, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';

interface Report {
  id: number;
  district: string;
  taste_profile: string;
  scale_level: string;
  content: string;
  created_at: string;
}

export function LocalTapReport({ city }: { city: string }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const formRef = useRef<HTMLFormElement>(null);

  // 1. Fetch Approved Reports
  useEffect(() => {
    async function fetchReports() {
      try {
        const { data, error } = await supabase
          .from('tap_reports')
          .select('*')
          .eq('city_slug', citySlug)
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setReports(data);
      } catch (err) {
        console.error("Supabase Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, [citySlug]);

  // 2. Handle Form Submission with Timeout
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Safety: Abort request after 10 seconds if ISP is blocking Supabase
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const { error: insertError } = await supabase
        .from('tap_reports')
        .insert({
          city_slug: citySlug,
          district: formData.get('district'),
          taste_profile: formData.get('taste'),
          scale_level: formData.get('scale'),
          content: formData.get('comment'),
          is_approved: false // Moderation Queue
        })
        .abortSignal(controller.signal);

      if (insertError) throw insertError;

      setSubmitted(true);
      formRef.current?.reset();
      
      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 4000);

    } catch (err: any) {
      console.error("Submission failed:", err);
      if (err.name === 'AbortError') {
        setError("Connection Timed Out. Please check your internet or use a VPN/WARP.");
      } else {
        setError("Could not submit report. Check your Supabase connection.");
      }
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-12">
      {/* Header */}
      <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Community Tap Reports
          </h2>
          <p className="text-sm text-slate-500 mt-1">Real-time water quality observations from {city} residents.</p>
        </div>
        {!submitted && (
          <button 
            onClick={() => { setShowForm(!showForm); setError(null); }}
            className={`shrink-0 font-bold py-2 px-4 rounded-lg text-sm transition-colors ${
              showForm ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {showForm ? 'Cancel' : '+ Submit Local Report'}
          </button>
        )}
      </div>

      {/* Submission Form */}
      {showForm && (
        <div className="p-6 bg-blue-50/50 border-b border-blue-100">
          {submitted ? (
            <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-green-800">Report Submitted!</h3>
              <p className="text-green-600 text-sm">Thank you. It will appear once moderated.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Neighborhood</label>
                  <input name="district" type="text" required placeholder="e.g. Central" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Taste / Odor</label>
                  <select name="taste" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                    <option>Neutral</option>
                    <option>Chlorine</option>
                    <option>Metallic</option>
                    <option>Earthy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Limescale</label>
                  <select name="scale" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                    <option>Moderate</option>
                    <option>Heavy</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Comment</label>
                <textarea name="comment" required placeholder={`How is the water in ${city} today?`} rows={3} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"></textarea>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-xs font-bold bg-red-50 p-3 rounded border border-red-100">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button 
                  disabled={submitting}
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-8 rounded text-sm transition-colors flex items-center gap-2"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : 'Post Report'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reports Feed */}
      <div className="divide-y divide-slate-100">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-200" /></div>
        ) : reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-900">{report.district}</span>
                <span className="text-slate-400 text-xs">{new Date(report.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">Taste: {report.taste_profile}</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-100">Scale: {report.scale_level}</span>
              </div>
              <p className="text-slate-600 text-sm italic">"{report.content}"</p>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 text-sm italic">
            No community reports for {city} yet.
          </div>
        )}
      </div>
    </div>
  );
}