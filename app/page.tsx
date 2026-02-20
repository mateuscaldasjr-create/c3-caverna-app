"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Flame, BookOpen, Briefcase, Users, 
  Settings as SettingsIcon, LogOut, Menu, X, Bell, 
  Play, Pause, RefreshCw, CheckCircle2, Circle, Check, 
  DollarSign, TrendingUp, Trophy, User, Key, Volume2, Book 
} from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#0A0F1D] min-h-screen" />;

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#0A0F1D] border-b lg:border-r border-white/5 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded bg-[#D4AF37] flex items-center justify-center text-[#0A0F1D] font-bold">C3</div>
          <span className="font-bold text-xl tracking-tighter">ACADEMY</span>
        </div>
        <nav className="space-y-2">
          {['dashboard', 'cave', 'rituals'].map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-4 py-3 rounded-lg capitalize transition-colors ${activeTab === item ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-white/40'}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-10">
        <header className="mb-10 flex justify-between items-center">
          <h2 className="text-2xl font-serif">Bem-vindo, <span className="text-[#D4AF37]">Ricardo</span></h2>
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-white/5 overflow-hidden">
            <img src="https://picsum.photos/seed/c3/100" alt="Avatar" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
            <h3 className="text-[#D4AF37] font-bold mb-6 flex items-center gap-2">
              <Flame size={18} /> MODO CAVERNA
            </h3>
            <div className="text-5xl font-mono text-center mb-8">25:00</div>
            <button className="w-full bg-[#D4AF37] text-[#0A0F1D] py-4 rounded-xl font-bold shadow-lg shadow-[#D4AF37]/10">
              INICIAR FOCO
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
            <h3 className="text-white font-bold mb-6">ORDENS DO DIA</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/50"><CheckCircle2 size={18} /> Devocional</div>
              <div className="flex items-center gap-3"><Circle size={18} /> Estratégia de Vendas</div>
              <div className="flex items-center gap-3"><Circle size={18} /> Reunião de Equipe</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
            <h3 className="text-white font-bold mb-6">STEWARDSHIP</h3>
            <div className="text-center">
              <span className="text-6xl font-bold text-[#D4AF37]">98%</span>
              <p className="text-[10px] text-white/40 mt-4 uppercase tracking-widest">Nível 42 - Mordomo Fiel</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
