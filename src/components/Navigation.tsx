"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-slate-900 bg-slate-950/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-500 fill-emerald-500" />
          <span className="font-black uppercase italic tracking-tighter text-lg">
            haiku <span className="text-slate-500">ke</span>
          </span>
        </Link>
        
        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <Link href="/dojo" className="hover:text-white transition-colors">Dojo</Link>
          <Link href="/dictionary" className="hover:text-white transition-colors">Lexicon</Link>
          <Link href="/leaderboard" className="hover:text-white transition-colors">Council</Link>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-2">
          <Link href="/dojo" className="bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest active:scale-90 transition-transform">
            Enter
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-400">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b-2 border-slate-900 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link href="/dojo" onClick={() => setIsOpen(false)} className="text-4xl font-black italic uppercase tracking-tighter">The Dojo</Link>
          <Link href="/dictionary" onClick={() => setIsOpen(false)} className="text-4xl font-black italic uppercase tracking-tighter">Dictionary</Link>
          <Link href="/leaderboard" onClick={() => setIsOpen(false)} className="text-4xl font-black italic uppercase tracking-tighter">Leaderboard</Link>
          <Link href="/audit" onClick={() => setIsOpen(false)} className="text-emerald-500 text-xs font-black uppercase tracking-[0.4em] flex items-center gap-2 mt-4">
             <ShieldCheck className="w-4 h-4" /> Auditor Login
          </Link>
        </div>
      )}
    </nav>
  );
}