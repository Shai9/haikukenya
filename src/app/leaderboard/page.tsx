"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Award, Target, PenTool } from 'lucide-react';

const DATA = {
  auditors: [
    { id: '1', name: "Isabelle P.", rep: 2450, audits: 120, accuracy: 98, tier: "Grandmaster" },
    { id: '2', name: "M. Odinga", rep: 1820, audits: 88, accuracy: 94, tier: "Sensei" },
    { id: '3', name: "S. Everlyn", rep: 940, audits: 45, accuracy: 91, tier: "Arbiter" },
  ],
  poets: [
    { id: '101', name: "Achieng' R.", score: 12, poems: 42, voltage: 8.9, tier: "Master Poet" },
    { id: '102', name: "Wanjiku N.", score: 8, poems: 30, voltage: 7.4, tier: "Student" },
    { id: '103', name: "K. Mutua", score: 5, poems: 15, voltage: 6.2, tier: "Student" },
  ]
};

export default function LeaderboardPage() {
  const [view, setView] = useState<'auditors' | 'poets'>('auditors');
  const activeData = view === 'auditors' ? DATA.auditors : DATA.poets;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* 1. ORIGINAL HEADER DESIGN */}
      <header className="mb-16 border-b-4 border-slate-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter italic leading-none">The Council</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
            <ShieldCheck className={`w-3 h-3 ${view === 'auditors' ? 'text-emerald-500' : 'text-slate-500'}`} /> 
            {view === 'auditors' ? "Protocol: Audit Reputation & Accuracy" : "Protocol: Creative Voltage & Kireji Badges"}
          </p>
        </div>
        <div className="hidden lg:block text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Last Sync</p>
          <p className="font-mono text-xs text-emerald-500">27.03.2026_23:54</p>
        </div>
      </header>

      {/* 2. MINIMALIST TAB SWITCHER */}
      <div className="flex gap-2 mb-12">
        <button 
          onClick={() => setView('auditors')}
          className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${view === 'auditors' ? 'bg-white text-black border-white' : 'border-slate-900 text-slate-600 hover:border-slate-700'}`}
        >
          <ShieldCheck className="w-3 h-3" /> Auditors
        </button>
        <button 
          onClick={() => setView('poets')}
          className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${view === 'poets' ? 'bg-white text-black border-white' : 'border-slate-900 text-slate-600 hover:border-slate-700'}`}
        >
          <PenTool className="w-3 h-3" /> Writers
        </button>
      </div>

      {/* 3. ORIGINAL LIST DESIGN */}
      <div className="grid grid-cols-1 gap-1">
        {activeData.map((user, index) => (
          <motion.div 
            key={user.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col md:flex-row items-center justify-between p-8 border border-slate-900 bg-slate-900/10 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all relative overflow-hidden"
          >
            {/* Rank & Identity */}
            <div className="flex items-center gap-8 w-full md:w-auto">
              <span className="text-5xl font-black italic text-slate-800 group-hover:text-emerald-500/20 transition-colors tabular-nums">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  {user.name}
                </h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-0.5">
                    {user.tier}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/60 border border-emerald-500/10 px-2 py-0.5">
                    Verified Scholar
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="flex gap-12 mt-8 md:mt-0 items-center w-full md:w-auto justify-between md:justify-end">
              <div className="text-center">
                <p className="text-[8px] uppercase font-black text-slate-600 tracking-widest">
                  {view === 'auditors' ? 'Audits' : 'Haiku'}
                </p>
                <p className="text-xl font-black text-white">
                  {view === 'auditors' ? (user as any).audits : (user as any).poems}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[8px] uppercase font-black text-slate-600 tracking-widest">
                  {view === 'auditors' ? 'Accuracy' : 'Avg Voltage'}
                </p>
                <p className="text-xl font-black text-white">
                  {view === 'auditors' ? `${(user as any).accuracy}%` : (user as any).voltage}
                </p>
              </div>
              <div className="text-right border-l-2 border-slate-800 pl-8 min-w-[120px]">
                <p className="text-[10px] uppercase font-black text-emerald-500 tracking-[0.2em]">
                  {view === 'auditors' ? 'Reputation' : 'Kireji Badges'}
                </p>
                <p className="text-4xl font-black text-white tabular-nums leading-none">
                  {view === 'auditors' ? (user as any).rep : (user as any).score}
                </p>
              </div>
            </div>

            {/* Background Graphic */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] rotate-12 pointer-events-none group-hover:opacity-[0.07] transition-opacity">
              <Zap className="w-48 h-48" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}