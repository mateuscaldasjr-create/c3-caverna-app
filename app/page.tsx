"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  BookOpen, 
  Briefcase, 
  Users, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  Play, 
  Pause, 
  RefreshCw, 
  CheckCircle2, 
  Circle, 
  Tag, 
  Check, 
  DollarSign, 
  TrendingUp, 
  Trophy, 
  Medal, 
  Star, 
  User, 
  Key, 
  Shield, 
  SkipForward, 
  Volume2, 
  Book 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- COMPONENTS ---

// 1. Sidebar
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Sidebar({ isOpen, setIsOpen, activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'cave-mode', icon: Flame, label: 'Iniciar Caverna' },
    { id: 'rituals', icon: BookOpen, label: 'Rituais de Fé' },
    { id: 'business', icon: Briefcase, label: 'Gestão de Negócios' },
    { id: 'community', icon: Users, label: 'Comunidade' },
    { id: 'settings', icon: SettingsIcon, label: 'Configurações' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Container */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-[#0A0F1D] border-r border-white/5 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <span className="font-serif text-[#0A0F1D] font-bold text-xl">C3</span>
              </div>
              <div>
                <h1 className="font-serif text-lg font-bold tracking-wider text-white">ACADEMY</h1>
                <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Modo Caverna</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                  activeTab === item.id 
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-colors", activeTab === item.id ? "text-[#D4AF37]" : "text-white/40 group-hover:text-white")} />
                <span className="font-medium text-sm relative z-10">{item.label}</span>
                
                {activeTab === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                )}
                
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5 group">
              <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
              <span className="font-medium text-sm">Sair da Caverna</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// 2. Header
interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-b-white/5 bg-[#0A0F1D]/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div>
            <h2 className="text-xl font-serif text-white">
              Bom dia, <span className="text-[#D4AF37]">Ricardo</span>.
            </h2>
            <p className="text-xs text-white/40 font-light tracking-wide">
              Pronto para a Mordomia de hoje?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Stewardship Score</span>
              <span className="text-sm font-bold text-[#D4AF37] font-mono">LEVEL 42</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center relative">
              <span className="text-xs font-bold text-white">98%</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-white/40 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0A0F1D]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#D4AF37] p-[1px]">
              <div className="w-full h-full rounded-full bg-[#0A0F1D] flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// 3. PomodoroTimer
function PomodoroTimer() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: any;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group h-full flex flex-col justify-between">
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-[#D4AF37] font-serif text-lg font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            O Coração da Caverna
          </h3>
          <p className="text-white/40 text-xs mt-1">Deep Work Session</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => { setMode('focus'); setTimeLeft(25 * 60); setIsActive(false); }} className={cn("text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border", mode === 'focus' ? "border-[#D4AF37] text-[#D4AF37]" : "border-white/10 text-white/40")}>Foco</button>
           <button onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }} className={cn("text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border", mode === 'break' ? "border-[#D4AF37] text-[#D4AF37]" : "border-white/10 text-white/40")}>Pausa</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8 relative z-10">
        <div className="relative">
          <svg className="w-48 h-48 -rotate-90">
            <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/5" />
            <motion.circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="4" className="text-[#D4AF37]" strokeDasharray="553" strokeDashoffset={553 - (553 * progress) / 100} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-mono font-bold text-white">{formatTime(timeLeft)}</span>
            <span className="text-xs text-white/40 uppercase mt-2">{isActive ? 'Em Progresso' : 'Pausado'}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        <button onClick={toggleTimer} className="flex-1 bg-[#D4AF37] text-[#0A0F1D] font-bold py-3 rounded-lg flex items-center justify-center gap-2">
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isActive ? 'Pausar' : 'Entrar em Profundidade'}
        </button>
        <button onClick={resetTimer} className="p-3 rounded-lg border border-white/10 text-white/40 hover:text-white"><RefreshCw className="w-5 h-5" /></button>
      </div>
    </div>
  );
}

// 4. TaskList
const tasks = [
  { id: '1', title: 'Revisão Financeira Q3', tag: 'Business', completed: false, priority: 'High' },
  { id: '2', title: 'Leitura de Provérbios 18', tag: 'Faith', completed: true, priority: 'High' },
  { id: '3', title: 'Briefing Campanha Black Friday', tag: 'Business', completed: false, priority: 'Medium' },
  { id: '4', title: 'Mentoria com Equipe de Vendas', tag: 'Business', completed: false, priority: 'Medium' },
  { id: '5', title: 'Oração pelas Famílias', tag: 'Faith', completed: false, priority: 'Low' },
];

function TaskList() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-serif text-lg font-semibold">Ordens do Dia</h3>
        <button className="text-xs text-[#D4AF37]">Ver todas</button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className={cn("flex items-start gap-3 p-3 rounded-lg border", task.completed ? "bg-white/5 opacity-50 border-transparent" : "bg-white/5 border-white/10")}>
            <div className={task.completed ? "text-[#D4AF37]" : "text-white/20"}>{task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}</div>
            <div className="flex-1">
              <p className={cn("text-sm font-medium", task.completed ? "text-white/40 line-through" : "text-white/90")}>{task.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">{task.tag}</span>
                {task.priority === 'High' && <span className="text-[10px] text-red-400">Alta Prioridade</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. RitualsTracker
const rituals = [
  { id: '1', label: 'Oração Matinal', time: '06:00', completed: true },
  { id: '2', label: 'Leitura Bíblica', time: '06:30', completed: true },
  { id: '3', label: 'Exercício Físico', time: '07:00', completed: false },
  { id: '4', label: 'Jejum (Até 12h)', time: '12:00', completed: false },
];

function RitualsTracker() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
      <h3 className="text-white font-serif text-lg font-semibold mb-6">Rituais de Consagração</h3>
      <div className="space-y-4">
        {rituals.map((r) => (
          <div key={r.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-6 h-6 rounded border flex items-center justify-center", r.completed ? "bg-[#D4AF37] border-[#D4AF37]" : "border-white/20")}>{r.completed && <Check className="w-4 h-4 text-[#0A0F1D]" />}</div>
              <div><p className={cn("text-sm", r.completed ? "text-white/40" : "text-white/90")}>{r.label}</p><p className="text-[10px] text-white/30">{r.time}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. StatsChart
const chartData = [ { name: 'Seg', hours: 4.5 }, { name: 'Ter', hours: 6.2 }, { name: 'Qua', hours: 5.8 }, { name: 'Qui', hours: 7.5 }, { name: 'Sex', hours: 3.5 }, { name: 'Sáb', hours: 2.0 }, { name: 'Dom', hours: 1.0 } ];

function StatsChart() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col">
      <div className="mb-6"><h3 className="text-white font-serif text-lg font-semibold">Foco Semanal</h3></div>
      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} axisLine={false} tickLine={false} />
            <Bar dataKey="hours">
              {chartData.map((e, i) => (<Cell key={i} fill={e.hours > 6 ? '#D4AF37' : 'rgba(255,255,255,0.1)'} />))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Outros Sub-componentes (CaveMode, FaithRituals, etc.)
function CaveMode() { return (<div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-3xl"><h2 className="text-3xl font-serif text-white mb-8">Modo Profundidade</h2><PomodoroTimer /><p className="mt-8 text-white/40 italic">"Tudo o que fizerem, façam de todo o coração..." - Col 3:23</p></div>); }
function FaithRituals() { return (<div className="p-4"><h2 className="text-2xl font-serif text-white mb-4">Rituais de Fé</h2><RitualsTracker /></div>); }
function BusinessManager() { return (<div className="p-4"><h2 className="text-2xl font-serif text-white mb-4">Gestão de Negócios</h2><p className="text-white/40">Módulo de Pipeline em breve.</p></div>); }
function Community() { return (<div className="p-4"><h2 className="text-2xl font-serif text-white mb-4">Comunidade C3</h2><p className="text-white/40">Leaderboard de Mordomia em breve.</p></div>); }

function SettingsTab() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-serif text-white">Configurações</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <User className="w-8 h-8 text-[#D4AF37]" />
          <div><h3 className="text-white font-medium">Perfil de Ricardo Silva</h3><p className="text-white/40 text-sm">ricardo@c3academy.com</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-4 bg-white/5 rounded-lg border border-white/5"><p className="text-[10px] text-white/40 uppercase">API GEMINI</p><p className="text-xs text-white/80 mt-1">Ativa</p></div>
           <div className="p-4 bg-white/5 rounded-lg border border-white/5"><p className="text-[10px] text-white/40 uppercase">Assinatura</p><p className="text-xs text-c3-gold mt-1">Plano High-Ticket</p></div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:h-full min-h-[400px]"><PomodoroTimer /></div>
            <div className="flex flex-col gap-6"><div className="h-[220px]"><StatsChart /></div><div className="flex-1"><TaskList /></div></div>
            <div className="lg:h-full min-h-[400px]"><RitualsTracker /></div>
          </div>
        );
      case 'cave-mode': return <CaveMode />;
      case 'rituals': return <FaithRituals />;
      case 'business': return <BusinessManager />;
      case 'community': return <Community />;
      case 'settings': return <SettingsTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
