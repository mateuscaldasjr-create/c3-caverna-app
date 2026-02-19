import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  BookOpen, 
  Briefcase, 
  Users, 
  Settings, 
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
import { motion, AnimatePresence } from 'motion/react';
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
    { id: 'settings', icon: Settings, label: 'Configurações' },
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
              <div className="w-10 h-10 rounded-lg bg-c3-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
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
                    ? "bg-c3-gold/10 text-c3-gold border border-c3-gold/20" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-colors", activeTab === item.id ? "text-c3-gold" : "text-white/40 group-hover:text-white")} />
                <span className="font-medium text-sm relative z-10">{item.label}</span>
                
                {/* Active Indicator */}
                {activeTab === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-c3-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                )}
                
                {/* Hover Effect */}
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
    <header className="sticky top-0 z-30 w-full glass-panel border-b-0 border-x-0 border-t-0 border-b-white/5 bg-[#0A0F1D]/80 backdrop-blur-md">
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
              Bom dia, <span className="text-c3-gold">Ricardo</span>.
            </h2>
            <p className="text-xs text-white/40 font-light tracking-wide">
              Pronto para a Mordomia de hoje?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Stewardship Score */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Stewardship Score</span>
              <span className="text-sm font-bold text-c3-gold font-mono">LEVEL 42</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-c3-gold/30 flex items-center justify-center relative">
              <span className="text-xs font-bold text-white">98%</span>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                  cx="18" cy="18" r="17" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="text-c3-gold"
                  strokeDasharray="106"
                  strokeDashoffset="10" // 98% filled roughly
                />
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-white/40 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0A0F1D]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-c3-gold to-c3-gold-dim p-[1px]">
              <div className="w-full h-full rounded-full bg-[#0A0F1D] flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
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
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Handle timer complete
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
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group h-full flex flex-col justify-between">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-c3-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-c3-gold font-serif text-lg font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-c3-gold animate-pulse" />
            O Coração da Caverna
          </h3>
          <p className="text-white/40 text-xs mt-1">Deep Work Session</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => {
              setMode('focus');
              setTimeLeft(25 * 60);
              setIsActive(false);
            }}
            className={cn(
              "text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border transition-all",
              mode === 'focus' 
                ? "border-c3-gold text-c3-gold bg-c3-gold/10" 
                : "border-white/10 text-white/40 hover:text-white"
            )}
          >
            Foco
          </button>
          <button 
            onClick={() => {
              setMode('break');
              setTimeLeft(5 * 60);
              setIsActive(false);
            }}
            className={cn(
              "text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border transition-all",
              mode === 'break' 
                ? "border-c3-gold text-c3-gold bg-c3-gold/10" 
                : "border-white/10 text-white/40 hover:text-white"
            )}
          >
            Pausa
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8 relative z-10">
        <div className="relative">
          {/* Outer Ring */}
          <svg className="w-48 h-48 -rotate-90">
            <circle 
              cx="96" cy="96" r="88" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="text-white/5"
            />
            <motion.circle 
              cx="96" cy="96" r="88" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              className="text-c3-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              strokeDasharray="553"
              strokeDashoffset={553 - (553 * progress) / 100}
              initial={{ strokeDashoffset: 553 }}
              animate={{ strokeDashoffset: 553 - (553 * progress) / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-mono font-bold text-white tracking-tighter">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs text-white/40 uppercase tracking-widest mt-2">
              {isActive ? 'Em Progresso' : 'Pausado'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        <button 
          onClick={toggleTimer}
          className="flex-1 bg-c3-gold hover:bg-c3-gold-dim text-[#0A0F1D] font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isActive ? 'Pausar' : 'Entrar em Profundidade'}
        </button>
        <button 
          onClick={resetTimer}
          className="p-3 rounded-lg border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// 4. TaskList
interface Task {
  id: string;
  title: string;
  tag: 'Business' | 'Faith';
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const tasks: Task[] = [
  { id: '1', title: 'Revisão Financeira Q3', tag: 'Business', completed: false, priority: 'High' },
  { id: '2', title: 'Leitura de Provérbios 18', tag: 'Faith', completed: true, priority: 'High' },
  { id: '3', title: 'Briefing Campanha Black Friday', tag: 'Business', completed: false, priority: 'Medium' },
  { id: '4', title: 'Mentoria com Equipe de Vendas', tag: 'Business', completed: false, priority: 'Medium' },
  { id: '5', title: 'Oração pelas Famílias', tag: 'Faith', completed: false, priority: 'Low' },
];

function TaskList() {
  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-serif text-lg font-semibold">Ordens do Dia</h3>
          <p className="text-white/40 text-xs mt-1">Priorizado por IA</p>
        </div>
        <button className="text-xs text-c3-gold hover:underline">Ver todas</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={cn(
              "group flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer",
              task.completed 
                ? "bg-white/[0.02] border-white/5 opacity-50" 
                : "bg-white/5 border-white/10 hover:border-c3-gold/30 hover:bg-white/[0.07]"
            )}
          >
            <button className={cn(
              "mt-0.5 transition-colors",
              task.completed ? "text-c3-gold" : "text-white/20 group-hover:text-c3-gold/50"
            )}>
              {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
            </button>
            
            <div className="flex-1">
              <p className={cn(
                "text-sm font-medium transition-all",
                task.completed ? "text-white/40 line-through" : "text-white/90"
              )}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full border",
                  task.tag === 'Business' 
                    ? "border-blue-500/30 text-blue-400 bg-blue-500/10" 
                    : "border-purple-500/30 text-purple-400 bg-purple-500/10"
                )}>
                  {task.tag}
                </span>
                {task.priority === 'High' && (
                  <span className="text-[10px] text-red-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Alta Prioridade
                  </span>
                )}
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
    <div className="glass-panel rounded-2xl p-6 h-full">
      <div className="mb-6">
        <h3 className="text-white font-serif text-lg font-semibold">Rituais de Consagração</h3>
        <p className="text-white/40 text-xs mt-1">Checklist Diário</p>
      </div>

      <div className="space-y-4">
        {rituals.map((ritual) => (
          <div key={ritual.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-6 h-6 rounded border flex items-center justify-center transition-all cursor-pointer",
                ritual.completed 
                  ? "bg-c3-gold border-c3-gold text-[#0A0F1D]" 
                  : "border-white/20 bg-transparent group-hover:border-c3-gold/50"
              )}>
                {ritual.completed && <Check className="w-4 h-4" />}
              </div>
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  ritual.completed ? "text-white/40" : "text-white/90"
                )}>{ritual.label}</p>
                <p className="text-[10px] text-white/30 font-mono">{ritual.time}</p>
              </div>
            </div>
            <div className={cn(
              "h-px flex-1 mx-4 transition-colors",
              ritual.completed ? "bg-c3-gold/20" : "bg-white/5"
            )} />
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center text-xs text-white/40">
          <span>Progresso Diário</span>
          <span>50%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-c3-gold w-1/2 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        </div>
      </div>
    </div>
  );
}

// 6. StatsChart
const chartData = [
  { name: 'Seg', hours: 4.5 },
  { name: 'Ter', hours: 6.2 },
  { name: 'Qua', hours: 5.8 },
  { name: 'Qui', hours: 7.5 },
  { name: 'Sex', hours: 3.5 },
  { name: 'Sáb', hours: 2.0 },
  { name: 'Dom', hours: 1.0 },
];

function StatsChart() {
  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-white font-serif text-lg font-semibold">Foco Semanal</h3>
          <p className="text-white/40 text-xs mt-1">Horas de Deep Work</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-mono font-bold text-c3-gold">30.5h</p>
          <p className="text-[10px] text-green-400">+12% vs semana anterior</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="name" 
              stroke="#ffffff40" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ 
                backgroundColor: '#0A0F1D', 
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.hours > 6 ? '#D4AF37' : 'rgba(255, 255, 255, 0.2)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 7. CaveMode
function CaveMode() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden rounded-3xl glass-panel p-8">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1D] to-[#05080F] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-c3-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-12">
        
        {/* Timer Section */}
        <div className="scale-125">
          <PomodoroTimer />
        </div>

        {/* Biblical Encouragement */}
        <div className="text-center space-y-4 max-w-lg">
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-2xl text-white/90 leading-relaxed"
          >
            "Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens."
          </motion.blockquote>
          <motion.cite 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="block text-c3-gold font-mono text-sm tracking-widest uppercase"
          >
            Colossenses 3:23
          </motion.cite>
        </div>

        {/* Lo-fi Player */}
        <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-6">
          <div className="w-12 h-12 rounded-lg bg-c3-gold/20 flex items-center justify-center">
            <div className="flex gap-1 items-end h-6">
              {[1,2,3,4].map(i => (
                <motion.div 
                  key={i}
                  className="w-1 bg-c3-gold rounded-full"
                  animate={{ height: [10, 24, 10] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm">Deep Focus Instrumental</h4>
            <p className="text-white/40 text-xs">Worship & Flow State</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
              <Play className="w-5 h-5 fill-current" />
            </button>
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// 8. FaithRituals
const habits = [
  { id: 1, name: 'Oração (30min)', streak: 12, history: [true, true, true, true, true, false, true] },
  { id: 2, name: 'Leitura Bíblica', streak: 45, history: [true, true, true, true, true, true, true] },
  { id: 3, name: 'Jejum Intermitente', streak: 5, history: [false, true, true, true, true, true, false] },
  { id: 4, name: 'Exercício Físico', streak: 8, history: [true, false, true, true, true, true, true] },
];

const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function FaithRituals() {
  return (
    <div className="space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-white">Rituais de Fé</h2>
          <p className="text-white/40 text-sm">Consistência gera autoridade espiritual.</p>
        </div>
        <button className="px-4 py-2 bg-c3-gold text-[#0A0F1D] rounded-lg font-medium hover:bg-c3-gold-dim transition-colors">
          Novo Registro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map((habit) => (
          <div key={habit.id} className="glass-panel p-6 rounded-2xl hover:border-c3-gold/30 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-c3-gold group-hover:bg-c3-gold/10 transition-colors">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{habit.name}</h3>
                  <p className="text-xs text-white/40 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {habit.streak} dias seguidos
                  </p>
                </div>
              </div>
              <button className="text-white/20 hover:text-white transition-colors">
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-between items-end gap-2">
              {habit.history.map((completed, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className={cn(
                    "w-full aspect-square rounded-md transition-all",
                    completed 
                      ? "bg-c3-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
                      : "bg-white/5 border border-white/5"
                  )} />
                  <span className="text-[10px] text-white/20 font-mono">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Devotional */}
      <div className="glass-panel p-8 rounded-2xl mt-6">
        <div className="flex items-center gap-4 mb-6">
          <Book className="w-6 h-6 text-c3-gold" />
          <h3 className="text-lg font-serif text-white">Leitura da Semana: Neemias</h3>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-white/60 leading-relaxed">
            "A reconstrução dos muros de Jerusalém nos ensina sobre foco, liderança e resistência à oposição. 
            Assim como Neemias, devemos estar com uma mão na obra e outra na espada (oração e trabalho)."
          </p>
        </div>
      </div>
    </div>
  );
}

// 9. BusinessManager
const pipeline = [
  { stage: 'Prospecção', count: 12, value: 'R$ 120k' },
  { stage: 'Qualificação', count: 5, value: 'R$ 50k' },
  { stage: 'Proposta', count: 3, value: 'R$ 30k' },
  { stage: 'Fechamento', count: 2, value: 'R$ 20k' },
];

function BusinessManager() {
  return (
    <div className="space-y-8 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-white">Gestão de Negócios</h2>
          <p className="text-white/40 text-sm">Mordomia dos recursos e talentos.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
            <span className="text-xs text-white/40 uppercase">Meta Mensal</span>
            <span className="font-mono font-bold text-c3-gold">R$ 250.000</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Faturamento', value: 'R$ 185.4k', icon: DollarSign, trend: '+12%' },
          { label: 'Novos Leads', value: '42', icon: Users, trend: '+5%' },
          { label: 'Taxa de Conversão', value: '18%', icon: TrendingUp, trend: '-2%' },
          { label: 'Projetos Ativos', value: '8', icon: Briefcase, trend: '0%' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-c3-gold/10 text-c3-gold">
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={kpi.trend.startsWith('+') ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}>
                {kpi.trend}
              </span>
            </div>
            <h3 className="text-2xl font-mono font-bold text-white mb-1">{kpi.value}</h3>
            <p className="text-xs text-white/40 uppercase tracking-wider">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Sales Pipeline */}
      <div className="glass-panel p-8 rounded-2xl">
        <h3 className="text-lg font-serif text-white mb-6">Pipeline de Vendas</h3>
        <div className="grid grid-cols-4 gap-4">
          {pipeline.map((stage, i) => (
            <div key={i} className="relative">
              <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-c3-gold/30 transition-colors h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-white/60 uppercase">{stage.stage}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/40">{stage.count}</span>
                </div>
                <p className="text-xl font-mono text-c3-gold">{stage.value}</p>
                
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-c3-gold opacity-50" 
                    style={{ width: `${(4 - i) * 25}%` }} 
                  />
                </div>
              </div>
              {i < 3 && (
                <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-white/10 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 10. Community
const leaderboard = [
  { rank: 1, name: 'Ricardo S.', score: 9850, role: 'CEO', avatar: 'https://picsum.photos/seed/1/100' },
  { rank: 2, name: 'Amanda L.', score: 9200, role: 'CMO', avatar: 'https://picsum.photos/seed/2/100' },
  { rank: 3, name: 'Carlos M.', score: 8900, role: 'CTO', avatar: 'https://picsum.photos/seed/3/100' },
  { rank: 4, name: 'Beatriz F.', score: 8500, role: 'Sales', avatar: 'https://picsum.photos/seed/4/100' },
  { rank: 5, name: 'João P.', score: 8100, role: 'Dev', avatar: 'https://picsum.photos/seed/5/100' },
];

function Community() {
  return (
    <div className="h-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-white mb-2">Hall da Mordomia</h2>
        <p className="text-white/40">Reconhecimento àqueles que multiplicam seus talentos.</p>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        {/* Top 3 Podium */}
        <div className="bg-gradient-to-b from-c3-gold/10 to-transparent p-8 border-b border-white/5">
          <div className="flex justify-center items-end gap-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-white/20 p-1">
                  <img src={leaderboard[1].avatar} className="w-full h-full rounded-full object-cover grayscale" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0A0F1D] border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white/60">
                  #2
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">{leaderboard[1].name}</p>
                <p className="text-xs text-white/40">{leaderboard[1].score} XP</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center gap-4 -mt-8">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-c3-gold animate-bounce">
                  <Trophy className="w-8 h-8 fill-current" />
                </div>
                <div className="w-28 h-28 rounded-full border-4 border-c3-gold p-1 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  <img src={leaderboard[0].avatar} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-c3-gold px-4 py-1 rounded-full text-xs font-bold text-[#0A0F1D]">
                  #1
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-c3-gold">{leaderboard[0].name}</p>
                <p className="text-sm text-white/60">{leaderboard[0].score} XP</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-white/20 p-1">
                  <img src={leaderboard[2].avatar} className="w-full h-full rounded-full object-cover grayscale" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0A0F1D] border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white/60">
                  #3
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">{leaderboard[2].name}</p>
                <p className="text-xs text-white/40">{leaderboard[2].score} XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-white/5">
          {leaderboard.slice(3).map((user) => (
            <div key={user.rank} className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <span className="font-mono text-white/40 w-8 text-center">#{user.rank}</span>
                <img src={user.avatar} className="w-10 h-10 rounded-full grayscale opacity-60" />
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/40">{user.role}</p>
                </div>
              </div>
              <div className="font-mono text-c3-gold/60">{user.score} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 11. Settings
function Settings() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-white">Configurações</h2>
        <p className="text-white/40 text-sm">Gerencie seu perfil e integrações.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <User className="w-8 h-8 text-white/40" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Perfil de Usuário</h3>
              <p className="text-white/40 text-sm">Atualize sua foto e dados pessoais.</p>
            </div>
            <button className="ml-auto px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors">
              Editar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase">Nome Completo</label>
              <input 
                type="text" 
                value="Ricardo Silva" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-c3-gold/50 outline-none transition-colors"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase">Email</label>
              <input 
                type="email" 
                value="ricardo@c3academy.com" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-c3-gold/50 outline-none transition-colors"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center gap-4 mb-6">
            <Key className="w-5 h-5 text-c3-gold" />
            <h3 className="text-lg font-medium text-white">Integrações & Chaves de API</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-sm font-mono text-white/80">GEMINI_API_KEY</span>
              </div>
              <span className="text-xs text-white/40 font-mono">••••••••••••••••aB3d</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-sm font-mono text-white/80">STRIPE_SECRET_KEY</span>
              </div>
              <button className="text-xs text-c3-gold hover:underline">Conectar</button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center gap-4 mb-6">
            <Bell className="w-5 h-5 text-white/60" />
            <h3 className="text-lg font-medium text-white">Notificações</h3>
          </div>
          
          <div className="space-y-4">
            {['Lembretes de Rituais', 'Alertas de Negócios', 'Novidades da Comunidade'].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-white/80">{item}</span>
                <div className="w-10 h-6 rounded-full bg-c3-gold/20 relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-c3-gold shadow-sm" />
                </div>
              </div>
            ))}
          </div>
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
            {/* Left Column: Pomodoro (The Heart) */}
            <div className="lg:h-full min-h-[450px]">
              <PomodoroTimer />
            </div>

            {/* Center Column: Stats & Tasks */}
            <div className="flex flex-col gap-6 h-full">
              <div className="h-[220px]">
                <StatsChart />
              </div>
              <div className="flex-1 min-h-[300px]">
                <TaskList />
              </div>
            </div>

            {/* Right Column: Rituals */}
            <div className="lg:h-full min-h-[450px]">
              <RitualsTracker />
            </div>
          </div>
        );
      case 'cave-mode':
        return <CaveMode />;
      case 'rituals':
        return <FaithRituals />;
      case 'business':
        return <BusinessManager />;
      case 'community':
        return <Community />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white font-sans selection:bg-c3-gold selection:text-[#0A0F1D]">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="lg:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
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
