"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Zap, Trophy, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { HaikuEngine } from '@/lib/haiku-logic';

export default function LiveSprint() {
  const [timeLeft, setTimeLeft] = useState(180); // 3-Minute Sprint
  const [isActive, setIsActive] = useState(false);
  const [lines, setLines] = useState({ one: "", two: "", three: "" });
  const [submitted, setSubmitted] = useState(false);

  // The Constraint assigned by the Council
  const challenge = { kigo: "Jacaranda", season: "Short Rains" };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const stats = useMemo(() => HaikuEngine.validateStructure(lines), [lines]);
  
  // Validation: Correct syllables + Presence of Kigo
  const isKigoPresent = Object.values(lines).some(l => 
    l.toLowerCase().includes(challenge.kigo.toLowerCase())
  );
  const isComplete = stats.isValid && isKigoPresent;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <div className="border-4 border-slate-900 bg-black overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)]">
        
        {/* SPRINT STATUS BAR */}
        <div className="bg-slate-900 p-4 flex justify-between items-center border-b-4 border-slate-800">
          <div className="flex items-center gap-3">
            <Zap className={`w-5 h-5 ${isActive ? 'text-yellow-400 fill-yellow-400 animate-pulse' : 'text-slate-600'}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Sprint Protocol: Active</span>
          </div>
          <div className={`px-4 py-1 font-mono text-xl font-black tabular-nums border-2 ${timeLeft < 30 ? 'border-rose-500 text-rose-500 animate-bounce' : 'border-slate-700 text-slate-300'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {!isActive && !submitted ? (
          <div className="p-20 text-center space-y-8 bg-slate-950/50">
            <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">The <span className="text-emerald-500">180s</span> Sprint</h2>
            <div className="space-y-2">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Target Season: {challenge.season}</p>
              <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest italic underline decoration-2 underline-offset-4">Must Include: {challenge.kigo}</p>
            </div>
            <button 
              onClick={() => setIsActive(true)}
              className="px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-emerald-500 transition-all active:scale-95"
            >
              Start Timer
            </button>
          </div>
        ) : (
          <div className="p-12 space-y-12">
            {/* REAL-TIME DRAFTING GRID */}
            <div className="space-y-8 max-w-2xl mx-auto">
              {(['one', 'two', 'three'] as const).map((key, idx) => (
                <div key={key} className="relative">
                  <input
                    className="w-full bg-transparent border-b-2 border-slate-800 p-4 text-2xl md:text-4xl font-black tracking-tighter outline-none focus:border-emerald-500 transition-colors uppercase italic placeholder:text-slate-900"
                    placeholder={`Line ${idx + 1}...`}
                    disabled={timeLeft === 0 || submitted}
                    onChange={(e) => setLines({ ...lines, [key]: e.target.value })}
                  />
                  <span className={`absolute right-0 bottom-4 font-mono text-xs ${stats[key] === (idx === 1 ? 7 : 5) ? 'text-emerald-500' : 'text-slate-700'}`}>
                    {stats[key]} / {idx === 1 ? 7 : 5}
                  </span>
                </div>
              ))}
            </div>

            {/* LIVE FEEDBACK */}
            <div className="flex justify-center gap-8">
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${stats.isValid ? 'text-emerald-500' : 'text-slate-800'}`}>
                <CheckCircle2 className="w-4 h-4" /> 5-7-5 Grid
              </div>
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isKigoPresent ? 'text-emerald-500' : 'text-slate-800'}`}>
                <Zap className="w-4 h-4" /> {challenge.kigo}
              </div>
            </div>

            <button
              disabled={!isComplete || submitted}
              onClick={() => { setSubmitted(true); setIsActive(false); }}
              className={`w-full py-6 font-black uppercase tracking-[0.5em] text-xs border-2 transition-all ${
                isComplete && !submitted ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-transparent border-slate-800 text-slate-800 cursor-not-allowed'
              }`}
            >
              {submitted ? "Protocol Locked" : "Submit for High Audit"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}