"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Target, EyeOff, Info } from 'lucide-react';

interface RubricItemProps {
  label: string;
  icon: any;
  value: number;
  description: string;
  onChange: (val: number) => void;
}

const RubricItem = ({ label, icon: Icon, value, description, onChange }: RubricItemProps) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-slate-900 group gap-4">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-900 group-hover:bg-emerald-500/10 transition-all border border-slate-800 group-hover:border-emerald-500/30">
        <Icon className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-200">{label}</p>
        <p className="text-[10px] text-slate-600 uppercase mt-1 tracking-tighter">{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`w-10 h-10 font-mono text-xs border transition-all ${
            value >= num 
              ? "bg-emerald-500 border-emerald-500 text-black font-black" 
              : "bg-transparent border-slate-800 text-slate-700 hover:border-slate-500"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  </div>
);

export default function AuditScorecard() {
  const [scores, setScores] = useState({
    structure: 0,
    kigo: 0,
    kireji: 0,
    resonance: 0
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <section className="max-w-3xl mx-auto py-12 px-6 bg-slate-950 border-2 border-slate-900 relative overflow-hidden">
      {/* Background Aesthetic */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <ShieldCheck className="w-32 h-32" />
      </div>

      <header className="mb-10 flex justify-between items-end border-b-2 border-slate-900 pb-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">Audit Protocol 01</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Status: Manual Verification Required</p>
        </div>
        <div className="text-right">
          <span className="text-4xl font-black text-white tabular-nums">{total}</span>
          <span className="text-xs text-slate-600 font-bold uppercase ml-2">/ 20</span>
        </div>
      </header>

      <div className="space-y-2">
        <RubricItem 
          label="Structural Integrity" 
          icon={ShieldCheck} 
          value={scores.structure}
          description="Exact 5-7-5 syllables? Any word padding found?"
          onChange={(val) => setScores({ ...scores, structure: val })}
        />
        <RubricItem 
          label="Kigo Precision" 
          icon={Target} 
          value={scores.kigo}
          description="Is the seasonal anchor authentic to Kenyan ecology?"
          onChange={(val) => setScores({ ...scores, kigo: val })}
        />
        <RubricItem 
          label="Kireji Voltage" 
          icon={Zap} 
          value={scores.kireji}
          description="The 'spark' between images at the cut point."
          onChange={(val) => setScores({ ...scores, kireji: val })}
        />
        <RubricItem 
          label="Objective Resonance" 
          icon={EyeOff} 
          value={scores.resonance}
          description="Lack of 'I/Me'. Does the image linger in the mind?"
          onChange={(val) => setScores({ ...scores, resonance: val })}
        />
      </div>

      <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex gap-2 items-start max-w-xs">
          <Info className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
          <p className="text-[9px] text-slate-500 leading-relaxed uppercase font-medium">
            By finalizing, you affirm that this work adheres to the Code of the Dojo. 
            Audits are subject to Sensei oversight.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto px-12 py-4 bg-emerald-500 text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-colors"
        >
          Publish Audit
        </motion.button>
      </div>
    </section>
  );
}