"use client";
import { useState } from 'react';
import { KIGO_DICTIONARY, Season } from '@/lib/kigo-data';
import { CloudRain, Sun, Wind, ThermometerSnowflake } from 'lucide-react';

interface Props {
  onSelect: (season: Season, term: string) => void;
}

export default function KigoSelector({ onSelect }: Props) {
  const [selectedSeason, setSelectedSeason] = useState<Season>('Long Rains');

  const icons = {
    'Long Rains': CloudRain,
    'Dry Season': Sun,
    'Short Rains': Wind,
    'Cold Season': ThermometerSnowflake,
  };

  return (
    <div className="space-y-6 border-2 border-slate-900 p-8 bg-slate-900/20">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
          Seasonal Anchor (Kigo)
        </h4>
      </div>

      <div className="flex gap-2 mb-8">
        {(Object.keys(KIGO_DICTIONARY) as Season[]).map((season) => {
          const Icon = icons[season];
          return (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`flex-1 py-3 border flex flex-col items-center gap-2 transition-all ${
                selectedSeason === season 
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" 
                : "border-slate-800 text-slate-600 hover:border-slate-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[8px] font-bold uppercase tracking-tighter">{season}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {KIGO_DICTIONARY[selectedSeason].map((entry) => (
          <button
            key={entry.term}
            onClick={() => onSelect(selectedSeason, entry.term)}
            className="text-left p-3 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
          >
            <p className="text-[10px] font-black uppercase tracking-tight text-slate-300 group-hover:text-emerald-400">
              {entry.term}
            </p>
            <p className="text-[8px] text-slate-600 leading-tight mt-1 uppercase tracking-tighter">
              {entry.category}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}