"use client";

import { useState } from 'react';
import Navigation from "@/components/Navigation";
import { KIGO_DICTIONARY, Season } from '@/lib/kigo-data';
import { motion } from 'framer-motion';
import { Search, BookOpen, Wind, Sun, CloudRain, ThermometerSnowflake } from 'lucide-react';

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSeason, setActiveSeason] = useState<Season | 'All'>('All');

  const seasons: Season[] = ['Long Rains', 'Dry Season', 'Short Rains', 'Cold Season'];
  
  const icons = {
    'Long Rains': CloudRain,
    'Dry Season': Sun,
    'Short Rains': Wind,
    'Cold Season': ThermometerSnowflake,
  };

  // Flatten dictionary for searching
  const allTerms = Object.entries(KIGO_DICTIONARY).flatMap(([season, terms]) => 
    terms.map(t => ({ ...t, season: season as Season }))
  );

  const filteredTerms = allTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = activeSeason === 'All' || item.season === activeSeason;
    return matchesSearch && matchesSeason;
  });

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Navigation />

      <header className="pt-32 pb-12 px-6 max-w-7xl mx-auto border-b border-slate-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black uppercase tracking-tighter italic">Kigo Lexicon</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
              <BookOpen className="w-3 h-3 text-emerald-500" /> Authorized Kenyan Seasonal Anchors
            </p>
          </div>

          {/* Search Input */}
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search terms..."
              className="w-full bg-slate-900/50 border-2 border-slate-900 py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-emerald-500 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 mt-12">
        {/* Season Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button 
            onClick={() => setActiveSeason('All')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border-2 transition-all ${activeSeason === 'All' ? 'bg-white text-black border-white' : 'border-slate-900 text-slate-500 hover:border-slate-700'}`}
          >
            All Seasons
          </button>
          {seasons.map(s => (
            <button 
              key={s}
              onClick={() => setActiveSeason(s)}
              className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border-2 flex items-center gap-2 transition-all ${activeSeason === s ? 'bg-emerald-500 text-black border-emerald-500' : 'border-slate-900 text-slate-500 hover:border-slate-700'}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((item, idx) => (
            <motion.div 
              key={item.term}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-8 border-2 border-slate-900 bg-slate-900/10 group hover:border-emerald-500/30 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                {/* Dynamic Icon Placement */}
                {(() => {
                  const Icon = icons[item.season];
                  return <Icon className="w-16 h-16" />;
                })()}
              </div>

              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 mb-2 block italic">
                {item.season} • {item.category}
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 italic group-hover:text-emerald-400 transition-colors">
                {item.term}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-slate-900">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-700 italic">No terms found in this seasonal cycle.</p>
          </div>
        )}
      </section>
    </main>
  );
}