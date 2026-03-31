"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, ShieldCheck, AlertCircle, CheckCircle2, Info, 
  XCircle, Sparkles, Eye, Zap, PenTool, Target, Hash
} from 'lucide-react';
import { HaikuEngine } from '@/lib/haiku-logic';

export default function DojoGrid() {
  const [lines, setLines] = useState({ one: "", two: "", three: "" });
  const [kirejiIndex, setKirejiIndex] = useState<1 | 2 | null>(null);
  const [focusedLine, setFocusedLine] = useState<string | null>(null);

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
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (stats.isValid) score += 40;
    if (stats.isObjective) score += 30;
    if (stats.hasCut) score += 30;
    return score;
  }, [stats]);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(16,185,129) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Sidebar: The Laws & Constraints - Enhanced */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-32 space-y-8"
          >
            {/* Progress Ring */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-slate-800"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={2 * Math.PI * 56 * (1 - completionPercentage / 100)}
                  className="text-emerald-500 transition-all duration-700"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-white">{completionPercentage}%</span>
              </div>
            </div>

            <div className="border-l-2 border-emerald-500 pl-6 py-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-6 flex items-center gap-2">
                <Info className="w-3 h-3" /> Code of the Dojo
              </h3>
              <ul className="space-y-6 text-xs uppercase tracking-wider font-bold">
                {[
                  { label: "I. Precision (5-7-5)", condition: stats.isValid, icon: Target },
                  { label: "II. Objectivity (No I/Me)", condition: stats.isObjective, icon: Eye },
                  { label: "III. The Cut (— : ;)", condition: stats.hasCut, icon: Scissors },
                  { label: "IV. Kenyan Kigo Anchor", condition: null, icon: Sparkles }
                ].map((law, idx) => {
                  const Icon = law.icon;
                  const isActive = law.condition === true;
                  const isInvalid = law.condition === false;
                  
                  return (
                    <li key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 flex-shrink-0 transition-all ${
                        isActive ? 'text-emerald-500' : isInvalid ? 'text-rose-500' : 'text-slate-700'
                      }`}>
                        {isActive ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isInvalid ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-700" />
                        )}
                      </div>
                      <span className={`transition-colors ${
                        isActive ? 'text-emerald-400' : isInvalid ? 'text-rose-400' : 'text-slate-500'
                      }`}>
                        {law.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-slate-800 rounded-lg backdrop-blur-sm">
              <p className="text-[10px] text-slate-400 leading-relaxed italic font-mono">
                "The Dojo is a machine for clarity. If the math is wrong, the truth remains hidden."
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-[8px] text-slate-600 uppercase tracking-wider">
                  — Masaoka Shiki
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Interface: The Grid - Enhanced */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-12">
            {(['one', 'two', 'three'] as const).map((key, idx) => {
              const targets = { one: 5, two: 7, three: 5 };
              const target = targets[key];
              const current = stats[key];
              const isCorrect = current === target;
              const isFocused = focusedLine === key;

              return (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${
                        isFocused ? 'text-emerald-500' : 'text-slate-600'
                      }`}>
                        LINE {idx + 1}
                      </span>
                      {isCorrect && current > 0 && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-3 h-3 text-slate-600" />
                      <span className={`text-sm font-mono font-bold transition-all ${
                        isCorrect ? 'text-emerald-500' : current > target ? 'text-rose-500' : 'text-slate-500'
                      }`}>
                        {current} / {target}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      autoComplete="off"
                      onFocus={() => setFocusedLine(key)}
                      onBlur={() => setFocusedLine(null)}
                      className={`w-full bg-transparent border-b-2 py-5 text-2xl md:text-3xl lg:text-4xl font-light tracking-wide outline-none transition-all duration-300 placeholder:text-slate-800 ${
                        isCorrect 
                          ? "border-emerald-500 text-white" 
                          : current > target 
                            ? "border-rose-500/50 focus:border-rose-500 text-rose-400" 
                            : "border-slate-800 focus:border-slate-600 text-white"
                      }`}
                      placeholder={idx === 1 ? "whisper seven beats here..." : "let silence speak..."}
                      value={lines[key]}
                      onChange={(e) => setLines({ ...lines, [key]: e.target.value })}
                    />
                    
                    {/* Live Feedback */}
                    <AnimatePresence>
                      {current > target && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-0 top-1/2 -translate-y-1/2"
                        >
                          <div className="flex items-center gap-1 text-[9px] text-rose-500 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            <span>+{current - target}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Syllable Breakdown (on focus) */}
                  <AnimatePresence>
                    {isFocused && lines[key] && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-6 left-0 text-[8px] font-mono text-slate-600"
                      >
                        {HaikuEngine.getSyllableBreakdown(lines[key])}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Kireji (The Cut) Selection Logic - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 pt-8 border-t border-slate-800/50"
          >
            <div className="flex items-center gap-3">
              <Scissors className="w-4 h-4 text-emerald-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Select Kireji Point — The Cut Creates the Spark
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((idx) => {
                const isSelected = kirejiIndex === idx;
                const cutText = idx === 1 ? lines.one : lines.two;
                const hasValidCut = HaikuEngine.hasValidKireji(cutText);
                
                return (
                  <button
                    key={idx}
                    onClick={() => setKirejiIndex(idx as 1 | 2)}
                    className={`relative p-6 border-2 text-xs font-black uppercase tracking-wider flex items-center justify-between transition-all group overflow-hidden ${
                      isSelected 
                        ? 'border-emerald-500 bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-400' 
                        : 'border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <span className="relative z-10">Cut After Line {idx}</span>
                    <Scissors className={`w-4 h-4 relative z-10 transition-all ${isSelected ? 'text-emerald-400 rotate-90' : 'group-hover:rotate-90'}`} />
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="kirejiSelection"
                        className="absolute inset-0 bg-emerald-500/5"
                        initial={false}
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            
            <AnimatePresence>
              {kirejiIndex && !stats.hasCut && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg"
                >
                  <p className="text-[11px] font-bold text-rose-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> 
                    Add — : or ; to line {kirejiIndex} to create the spark between images.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Objective Tone Warning */}
            <AnimatePresence>
              {!stats.isObjective && lines.one && lines.two && lines.three && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg"
                >
                  <p className="text-[11px] font-bold text-amber-400 flex items-center gap-2">
                    <Eye className="w-4 h-4" /> 
                    Haiku is a mirror, not a diary. Remove "I," "me," "my," or "mine" — show the world instead.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submission Gate - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.01 } : {}}
              whileTap={canSubmit ? { scale: 0.99 } : {}}
              className={`relative w-full py-8 font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 overflow-hidden group ${
                canSubmit 
                  ? "bg-gradient-to-r from-white to-emerald-50 text-black cursor-pointer shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]" 
                  : "bg-slate-900/50 text-slate-600 cursor-not-allowed border border-slate-800"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {canSubmit ? (
                  <>
                    <Zap className="w-4 h-4" />
                    Initialize Audit Protocol
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    Awaiting Mathematical Truth
                    <Hash className="w-4 h-4" />
                  </>
                )}
              </span>
              
              {canSubmit && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
            
            {/* Submission Stats */}
            <div className="mt-6 flex justify-between items-center text-[9px] font-mono text-slate-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  {stats.isValid ? "Structure verified" : "5-7-5 required"}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-emerald-500" />
                  {stats.isObjective ? "Objective tone" : "Remove personal pronouns"}
                </span>
              </div>
              <span>
                {completionPercentage === 100 ? "Ready for audit" : `${completionPercentage}% complete`}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}