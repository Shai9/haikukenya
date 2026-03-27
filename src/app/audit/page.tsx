"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Zap, AlertCircle, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { HaikuEngine } from '@/lib/haiku-logic';

const PENDING_HAIKUS = [
  {
    id: "h-992",
    lines: { one: "Dust devils dancing", two: "Red mud stains the rubber sole", three: "Clouds heavy with hope" },
    poet: "K. Mutua",
    season: "Long Rains",
    syllables: { one: 5, two: 7, three: 5 }
  },
  {
    id: "h-993",
    lines: { one: "Cold wind from the hills", two: "Jacaranda purple falls", three: "Nairobi sleeps deep" },
    poet: "S. Hassan",
    season: "Cold Season",
    syllables: { one: 5, two: 7, three: 5 }
  }
];

export default function AuditFeedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = PENDING_HAIKUS[currentIndex];

  const handleAudit = (status: 'Approved' | 'Rejected') => {
    // In production, this triggers a Server Action to update the DB
    console.log(`Audit ${current.id}: ${status}`);
    if (currentIndex < PENDING_HAIKUS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (!current) return <div className="pt-40 text-center font-black uppercase">Queue Exhausted</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <header className="mb-12 border-b-4 border-slate-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Audit Queue</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
            <Zap className="w-3 h-3 text-yellow-500" /> Pending Verification: {PENDING_HAIKUS.length - currentIndex}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Queue ID</p>
          <p className="font-mono text-xs text-white">#SR-2026-ALPHA</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* THE POEM VIEW */}
        <div className="lg:col-span-7 space-y-12">
          <div className="p-12 border-2 border-slate-900 bg-slate-900/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
              <ShieldCheck className="w-48 h-48" />
            </div>
            
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-black px-3 py-1 mb-10 inline-block">
              {current.season}
            </span>

            <div className="space-y-6 relative z-10">
              <p className="text-3xl font-black uppercase italic tracking-tighter">{current.lines.one}</p>
              <p className="text-3xl font-black uppercase italic tracking-tighter text-emerald-400">{current.lines.two}</p>
              <p className="text-3xl font-black uppercase italic tracking-tighter">{current.lines.three}</p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-black uppercase text-slate-600">Poet Identity</p>
                <p className="text-sm font-black uppercase text-white italic">{current.poet}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase text-slate-600">Syllables</p>
                <p className="text-sm font-mono font-bold text-slate-400">5 - 7 - 5</p>
              </div>
            </div>
          </div>
        </div>

        {/* AUDIT CONTROLS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 border-2 border-slate-900 bg-black space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Scholar Decision</h3>
            
            <div className="space-y-4">
              <button 
                onClick={() => handleAudit('Approved')}
                className="w-full flex items-center justify-between p-6 border-2 border-slate-800 hover:border-emerald-500 hover:bg-emerald-500/5 group transition-all"
              >
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-400">Finalize Approval</span>
                <CheckCircle2 className="w-5 h-5 text-slate-800 group-hover:text-emerald-500" />
              </button>

              <button 
                onClick={() => handleAudit('Rejected')}
                className="w-full flex items-center justify-between p-6 border-2 border-slate-800 hover:border-rose-500 hover:bg-rose-500/5 group transition-all"
              >
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-rose-400">Reject Entry</span>
                <XCircle className="w-5 h-5 text-slate-800 group-hover:text-rose-500" />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-900">
              <p className="text-[9px] text-slate-600 uppercase leading-relaxed font-bold">
                Note: Approving an incorrect syllable count will result in a reputation penalty for the auditor.
              </p>
            </div>
          </div>

          <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 flex gap-4 items-start">
            <AlertCircle className="w-4 h-4 text-emerald-500 mt-1" />
            <p className="text-[9px] text-emerald-500/80 uppercase font-black leading-tight tracking-widest">
              Audit Tip: Check for the "Cut" (— : ;) at the end of the first or second line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}