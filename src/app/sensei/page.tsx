"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Users, Database, Activity, ChevronRight, Settings } from 'lucide-react';

const STATS = [
  { label: "Total Poets", value: "1,240", growth: "+12%", icon: Users },
  { label: "System Load", value: "14ms", growth: "Stable", icon: Activity },
  { label: "Pending Audits", value: "42", growth: "Critical", icon: ShieldAlert },
];

export default function SenseiDashboard() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* 1. RESPONSIVE STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-12">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border-2 border-slate-900 bg-slate-900/10 group hover:border-emerald-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <Icon className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">{stat.growth}</span>
              </div>
              <p className="text-4xl font-black text-white tabular-nums">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* 2. TWO-COLUMN MANAGEMENT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* RECENT SYSTEM LOGS (Mobile: Hidden or Below) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">System Ledger</h2>
            <button className="text-[10px] font-black uppercase text-emerald-500 hover:underline">Export CSV</button>
          </div>
          
          <div className="space-y-1">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-900/5 border border-slate-900 hover:bg-slate-900/20 transition-all gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-tight text-white italic">Audit Overturn: H-992</p>
                    <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest">Action by Sensei Ochieng'</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-slate-500 uppercase">28.03.2026_00:03</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLS (Always Visible) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 border-2 border-slate-900 bg-black space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-slate-900 pb-4 flex items-center gap-2">
              <Settings className="w-3 h-3" /> Command Protocols
            </h3>
            
            <button className="w-full text-left p-4 border border-slate-800 hover:border-emerald-500 group transition-all">
              <p className="text-[10px] font-black uppercase text-slate-300 group-hover:text-emerald-400">Trigger Seasonal Cycle</p>
              <p className="text-[8px] text-slate-600 uppercase mt-1">Updates Dictionary to 'Dry Season'</p>
            </button>

            <button className="w-full text-left p-4 border border-slate-800 hover:border-rose-500 group transition-all">
              <p className="text-[10px] font-black uppercase text-slate-300 group-hover:text-rose-400">Lock Dojo Entrance</p>
              <p className="text-[8px] text-slate-600 uppercase mt-1">Preventing new audit submissions</p>
            </button>

            <div className="pt-6 border-t border-slate-900">
               <p className="text-[9px] text-slate-600 uppercase leading-relaxed font-bold">
                Logged in as <span className="text-white italic">Nexesa_Admin_01</span>
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}