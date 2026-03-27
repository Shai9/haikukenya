"use client";
import Link from 'next/link';
import { motion } from 'motion/react';
import { Menu, Zap, ShieldCheck } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-slate-900 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* LOGO: Linked to Home */}
        <Link href="/" className="flex items-center gap-2 group">
          <Zap className="w-5 h-5 text-emerald-500 fill-emerald-500 group-hover:scale-110 transition-transform" />
          <span className="font-black uppercase italic tracking-tighter text-xl">
            haiku <span className="text-slate-500">kenya</span>
          </span>
        </Link>
        
        {/* CENTER LINKS */}
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <Link href="/dojo" className="hover:text-emerald-400 transition-colors">The Dojo</Link>
          <Link href="/audit" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
             Audit <span className="bg-emerald-500/10 text-emerald-500 px-1 text-[8px]">Live</span>
          </Link>
          <Link href="/dictionary" className="hover:text-emerald-400 transition-colors">Dictionary</Link>
          <Link href="/leaderboard" className="hover:text-emerald-400 transition-colors">Council</Link>
        </div>

        {/* THE FIX: Button is now a functional Link */}
        <div className="flex items-center gap-4">
          <Link 
            href="/dojo" 
            className="hidden sm:block border-2 border-slate-800 px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all active:scale-95"
          >
            Enter Dojo
          </Link>
          <button className="md:hidden p-2 text-slate-400">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}