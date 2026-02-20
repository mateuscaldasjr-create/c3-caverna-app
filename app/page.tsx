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

// Estilo auxiliar para Tailwind
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mounted, setMounted] = useState(false);

  // Evita erros de hidratação no Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#0A0F1D] min-h-screen" />;

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white flex">
      {/* Sidebar Simples */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0F1D] border-r border-white/5 transition-transform lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded bg-[#D4AF37] flex items-center justify-center text-[#0A0F1D] font-bold">C3</div>
            <span className="font-serif font-bold text-xl">ACADEMY</span>
          </div>
          <nav className="flex-1 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'cave', label: 'Modo Caverna', icon: Flame },
              { id: 'rituals', label: 'Rituais', icon: BookOpen },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  activeTab === item.id ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-white/40 hover:bg-white/5"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <header className="p-6 border-b border-white/5 flex justify-between items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden"><Menu /></button>
          <h2 className="text-xl font-serif">Bem-vindo, <span className="text-[#D4AF37]">Ricardo</span></h2>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-[#D4AF37]/30 overflow-hidden">
            <img src="https://picsum.photos/seed/c3/100" alt="User" />
          </div>
        </header>

        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeTab === 'dashboard' ? (
                <>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h3 className="text-[#D4AF37] mb-4 flex items-center gap-2"><Flame size={16}/> Caverna Ativa</h3>
                    <div className="text-4xl font-mono text-center py-10">25:00</div>
                    <button className="w-full bg-[#D4AF37] text-[#0A0F1D] py-3 rounded-lg font-bold">INICIAR FOCO</button>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h3 className="text-white mb-4">Ordens do Dia</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm opacity-50"><CheckCircle2 size={16}/> Leitura Matinal</div>
                      <div className="flex items-center gap-3 text-sm"><Circle size={16}/> Revisão de Vendas</div>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h3 className="text-white mb-4">Stewardship Score</h3>
                    <div className="text-center">
                      <span className="text-5xl font-bold text-[#D4AF37]">98%</span>
                      <p className="text-[10px] text-white/40 mt-2 uppercase">Nível 42 - Mordomo Fiel</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-span-full py-20 text-center text-white/20">
                  Seção {activeTab} em desenvolvimento...
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
