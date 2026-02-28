"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Check, Trash2, Lock, Loader2 } from 'lucide-react';

export default function AdminPortal() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Simple Password Gate
 // Inside app/admin-portal/page.tsx

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Use the NEXT_PUBLIC_ prefix here
  if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    setIsAuthenticated(true);
    fetchPendingReports();
  } else {
    alert("Incorrect Access Key");
  }
};
  const fetchPendingReports = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('tap_reports')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });
    setReports(data || []);
    setLoading(false);
  };

  const approveReport = async (id: number) => {
    const { error } = await supabase
      .from('tap_reports')
      .update({ is_approved: true })
      .eq('id', id);
    if (!error) fetchPendingReports();
  };

  const deleteReport = async (id: number) => {
    const { error } = await supabase
      .from('tap_reports')
      .delete()
      .eq('id', id);
    if (!error) fetchPendingReports();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md border border-slate-200 w-full max-w-md">
          <div className="flex justify-center mb-4 text-blue-600"><Lock /></div>
          <h1 className="text-xl font-bold text-center mb-6">Moderator Access</h1>
          <input 
            type="password" 
            placeholder="Enter Admin Key" 
            className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black text-slate-900">Pending Moderation ({reports.length})</h1>
        <button onClick={fetchPendingReports} className="text-sm text-blue-600 font-bold hover:underline">Refresh List</button>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-300 w-12 h-12" /></div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-tighter text-slate-400">{report.city_slug}</span>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{report.district}</span>
                </div>
                <p className="text-slate-800 font-medium mb-1">"{report.content}"</p>
                <p className="text-xs text-slate-400">Taste: {report.taste_profile} | Scale: {report.scale_level}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => approveReport(report.id)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg flex items-center gap-2 font-bold text-sm"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button 
                  onClick={() => deleteReport(report.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 p-3 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {reports.length === 0 && <p className="text-center py-20 text-slate-400 font-medium italic">Everything is clean. No pending reports.</p>}
        </div>
      )}
    </div>
  );
}