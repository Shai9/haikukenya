"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, ShieldCheck, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { HaikuEngine } from '@/lib/haiku-logic';

export default function DojoGrid() {
  const [lines, setLines] = useState({ one: "", two: "", three: "" });
  const [kirejiIndex, setKirejiIndex] = useState<1 | 2 | null>(null);

  // Memoize validation to prevent unnecessary recalculations
  const stats = useMemo(() => {
    const structure = HaikuEngine.validateStructure(lines);
    const isObjective = HaikuEngine.hasObjectiveTone(lines);
    
    // Check if the selected line has the mandatory punctuation cut
    const cutLineText = kirejiIndex === 1 ? lines.one : kirejiIndex === 2 ? lines.two : "";
    const hasCut = kirejiIndex ? HaikuEngine.hasValidKireji(cutLineText) : false;

    return { ...structure, isObjective, hasCut };
  }, [lines, kirejiIndex]);

  const canSubmit = stats.isValid && stats.isObjective && stats.hasCut;

  return (
    <section className="max-w-5xl mx-auto py-24 px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
      
      {/* Sidebar: The Laws & Constraints */}
      <div className="lg:col-span-4 space-y-8">
        <div className="border-l-2 border-emerald-500 pl-6 py-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 flex items-center gap-2">
            <Info className="w-3 h-3" /> System Constraints
          </h3>
          <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold text-slate-500">
            <li className={stats.isValid ? "text-emerald-400" : ""}>I. Precision (5-7-5)</li>
            <li className={stats.isObjective ? "text-emerald-400" : "text-rose-400"}>II. Objectivity (No "I/Me")</li>
            <li className={stats.hasCut ? "text-emerald-400" : ""}>III. The Cut (— : ;)</li>
            <li>IV. Kenyan Kigo Anchor</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-900/30 border border-slate-900">
          <p className="text-[10px] text-slate-400 leading-relaxed italic uppercase tracking-tighter">
            "The Dojo is a machine for clarity. If the math is wrong, the truth remains hidden."
          </p>
        </div>
      </div>

      {/* Main Interface: The Grid */}
      <div className="lg:col-span-8 space-y-12">
        <div className="space-y-10">
          {(['one', 'two', 'three'] as const).map((key, idx) => {
            const targets = { one: 5, two: 7, three: 5 };
            const target = targets[key];
            const current = stats[key];
            const isCorrect = current === target;

            return (
              <div key={key} className="relative group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black uppercase text-slate-600 group-focus-within:text-emerald-500 transition-colors">
                    Line {idx + 1}
                  </span>
                  <span className={`text-xs font-mono font-bold transition-colors ${isCorrect ? 'text-emerald-500' : 'text-slate-700'}`}>
                    {current} / {target}
                  </span>
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  className={`w-full bg-transparent border-b-2 py-4 text-2xl md:text-3xl font-medium tracking-tighter outline-none transition-all duration-700 ${
                    isCorrect ? "border-emerald-500 text-white" : "border-slate-800 focus:border-slate-400"
                  }`}
                  placeholder="..."
                  value={lines[key]}
                  onChange={(e) => setLines({ ...lines, [key]: e.target.value })}
                />
              </div>
            );
          })}
        </div>

        {/* Kireji (The Cut) Selection Logic */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Select Kireji Point (Requires — : ;)</p>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setKirejiIndex(idx as 1 | 2)}
                className={`p-5 border-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all group ${
                  kirejiIndex === idx 
                    ? 'border-emerald-500 bg-emerald-500/5 text-emerald-400' 
                    : 'border-slate-900 text-slate-600 hover:border-slate-700'
                }`}
              >
                Line {idx} <Scissors className={`w-3 h-3 ${kirejiIndex === idx ? 'text-emerald-400' : 'group-hover:text-slate-300'}`} />
              </button>
            ))}
          </div>
          <AnimatePresence>
            {kirejiIndex && !stats.hasCut && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[9px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2"
              >
                <AlertCircle className="w-3 h-3" /> Add — : or ; to line {kirejiIndex} to create the spark.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submission Gate */}
        <motion.button
          disabled={!canSubmit}
          whileHover={canSubmit ? { scale: 1.01 } : {}}
          whileTap={canSubmit ? { scale: 0.99 } : {}}
          className={`w-full py-7 font-black uppercase tracking-[0.5em] text-xs transition-all duration-500 border-2 ${
            canSubmit 
              ? "bg-white text-black border-white cursor-pointer shadow-[0_0_40px_rgba(16,185,129,0.15)]" 
              : "bg-transparent border-slate-900 text-slate-800 cursor-not-allowed"
          }`}
        >
          {canSubmit ? "Initialize Audit Protocol" : "Awaiting Mathematical Truth"}
        </motion.button>
      </div>
    </section>
  );
}