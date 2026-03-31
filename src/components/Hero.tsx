"use client";
import { motion } from 'motion/react';
import { ShieldCheck, Zap, ArrowRightCircle, Sparkles, Feather, Eye } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center pt-32 lg:pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
        
        {/* LEFT: CONTENT CORE */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.85] tracking-tighter">
              Haiku with
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-1 bg-linear-to-r from-emerald-500/20 to-emerald-500/5 blur-xl"></span>
                <span className="relative bg-linear-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Kenyan Soul.
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="border-l-4 border-emerald-500 pl-8">
              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                A minimalist environment for students to sharpen analytical rigor 
                through 17-syllable discipline.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Link 
                href="/dojo" 
                className="group relative px-8 py-4 bg-emerald-500 text-black font-bold uppercase tracking-wide text-sm overflow-hidden transition-all hover:bg-emerald-400"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Initialize Session
                  <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Community</span>
                </div>
                <div className="w-px h-4 bg-slate-700" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  <span>1,240 Active Poets</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-8 pt-8 border-t border-slate-800/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">5 Laws</p>
                <p className="text-[10px] text-slate-500">of the Dojo</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Feather className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">5-7-5</p>
                <p className="text-[10px] text-slate-500">Syllable Precision</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Eye className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Audit System</p>
                <p className="text-[10px] text-slate-500">Peer Review</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: THE "DATA CARD" - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500/20 to-emerald-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Main Card */}
            <div className="relative bg-linear-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 lg:p-12 overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16,185,129,0.1) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }} />
              </div>
              
              {/* Animated Background Icon */}
              <ShieldCheck className="absolute -bottom-16 -right-16 w-64 h-64 text-emerald-500/5 group-hover:text-emerald-500/10 transition-all duration-700 group-hover:scale-110" />
              
              <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500 relative" />
                    </div>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-emerald-500">
                      LIVE CYCLE
                    </p>
                  </div>
                </div>

                {/* Featured Haiku */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-emerald-500/60 font-mono">
                    <Sparkles className="w-3 h-3" />
                    <span>FEATURED HAIKU</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black uppercase leading-[1.2] tracking-tight text-white">
                    Jacaranda carpet —
                    <br /> 
                    <span className="text-slate-400 group-hover:text-emerald-400 transition-colors duration-300">
                      purple stains on dusty paths,
                    </span>
                    <br /> 
                    the real storm waits.
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    — Wanjiku K. · Sensei
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800">
                  <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Poets</p>
                    <p className="text-xl font-black text-white">1.2k</p>
                  </div>
                  <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Haiku</p>
                    <p className="text-xl font-black text-white">4.8k</p>
                  </div>
                  <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status</p>
                    <p className="text-sm font-black text-emerald-500 uppercase">OPEN</p>
                  </div>
                </div>

                {/* CTA Badge */}
                <div className="pt-4">
                  <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                    <span className="text-[10px] font-mono text-slate-400">Next Sprint:</span>
                    <span className="text-xs font-bold text-white">Saturday · 2PM</span>
                    <Zap className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-mono uppercase tracking-wider text-slate-600">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-emerald-500/50 to-transparent" />
      </motion.div>
    </header>
  );
}