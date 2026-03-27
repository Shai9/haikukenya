"use client";
import { motion } from 'motion/react';
import { ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <header className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: The Hook */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[2px] w-12 bg-emerald-500"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">Protocol 01: Seasonal Discipline</p>
          </div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] italic mb-10"
          >
            Haiku with <br/> 
            <span className="text-emerald-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">Kenyan Soul.</span>
          </motion.h1>

          <div className="max-w-xl grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-900 pt-10">
             <div>
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">The Mission</p>
               <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                 Sharpen analytical thinking through 17-syllable rigor. A space where logic meets landscape.
               </p>
             </div>
             <div className="flex flex-col justify-end">
               <Link href="/dojo" className="group flex items-center gap-4 text-white hover:text-emerald-400 transition-all">
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Begin Verification</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </Link>
             </div>
          </div>
        </div>
        
        {/* Right Column: Live Data Feed aesthetic */}
        <div className="lg:col-span-4 border-2 border-slate-900 bg-slate-900/10 p-10 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <ShieldCheck className="w-64 h-64" />
          </div>

          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Cycle: Short Rains
            </p>
            
            <div className="space-y-6 mb-10">
              <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none">
                "Jacaranda <br/> purple falls — <br/> the real storm waits."
              </h3>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Master Audit ID: #SR-992</p>
            </div>

            <Link href="/audit" className="block w-full bg-white text-black py-5 text-center font-black uppercase text-[10px] tracking-[0.3em] hover:bg-emerald-500 transition-colors">
              Enter Audit Feed
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}