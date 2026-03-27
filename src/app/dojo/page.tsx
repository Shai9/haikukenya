import Navigation from "@/components/Navigation";
import DojoGrid from "@/components/DojoGrid";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function DojoPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Focus Mode Header */}
      <header className="pt-32 px-6 max-w-5xl mx-auto border-b border-slate-900 pb-10 flex justify-between items-end">
        <div>
          <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-500 transition-colors flex items-center gap-2 mb-4 group">
            <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Vision
          </Link>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">The Dojo</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Protocol: Kenyan 5-7-5 Validation</p>
        </div>
        
        <div className="hidden md:block text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 block">Status: Active</span>
          <span className="text-[10px] font-medium text-slate-600 uppercase">Rank: Novice Scholar</span>
        </div>
      </header>

      {/* The Workspace */}
      <DojoGrid />
    </main>
  );
}