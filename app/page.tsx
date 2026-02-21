"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Flame, BookOpen, LogOut, User, 
  Mail, Lock, ChevronRight, CheckCircle2, Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURAÇÃO ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function C3AcademyOS() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (type: 'login' | 'signup') => {
    if (!supabase) return alert("Erro de chaves!");
    if (!email || !password) return alert("Preencha os campos!");
    setLoading(true);
    try {
      const { error } = type === 'login' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else if (type === 'signup') alert("Conta solicitada!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white font-sans">
      <AnimatePresence mode="wait">
        {!session ? (
          /* --- TELA DE LOGIN --- */
          <motion.div 
            key="login"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent"
          >
            <div className="w-full max-w-md bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-xl text-center shadow-2xl">
              <div className="w-20 h-20 bg-[#D4AF37] rounded-3xl mx-auto flex items-center justify-center text-[#0A0F1D] font-black text-4xl mb-6 shadow-lg shadow-[#D4AF37]/20">C3</div>
              <h1 className="text-3xl font-serif font-bold mb-2 tracking-tight">C3 Academy</h1>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mb-10">The Steward's Path</p>
              
              <div className="space-y-4 text-left">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                  <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 text-sm outline-none focus:border-[#D4AF37]/40 transition-all" />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                  <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 text-sm outline-none focus:border-[#D4AF37]/40 transition-all" />
                </div>
                <button onClick={() => handleAuth('login')} className="w-full bg-[#D4AF37] text-[#0A0F1D] font-black py-5 rounded-2xl mt-4 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                  ENTRAR NA CAVERNA <ChevronRight size={18} />
                </button>
                <button onClick={() => handleAuth('signup')} className="w-full text-white/20 text-[10px] uppercase tracking-widest pt-4 hover:text-[#D4AF37] transition-colors">
                  Solicitar acesso de aluno
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- DASHBOARD COMPLETO --- */
          <motion.div 
            key="dash"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex min-h-screen"
          >
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 p-8">
              <div className="flex items-center gap-4 mb-16">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0A0F1D] font-bold">C3</div>
                <span className="font-bold tracking-tighter text-xl leading-none">ACADEMY</span>
              </div>
              <nav className="flex-1 space-y-2">
                {['dashboard', 'cave', 'rituals'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all capitalize ${activeTab === tab ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-white/30 hover:bg-white/5'}`}>
                    {tab === 'dashboard' && <LayoutDashboard size={18} />}
                    {tab === 'cave' && <Flame size={18} />}
                    {tab === 'rituals' && <BookOpen size={18} />}
                    <span className="text-sm font-medium">{tab}</span>
                  </button>
                ))}
              </nav>
              <button onClick={() => supabase?.auth.signOut()} className="flex items-center gap-4 px-6 py-4 text-red-400/40 hover:text-red-400 transition-colors">
                <LogOut size={18} /> <span className="text-sm">Sair</span>
              </button>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 lg:p-12">
              <header className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-serif">Bem-vindo, <span className="text-[#D4AF37] italic">Steward</span></h2>
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/20 bg-white/5 flex items-center justify-center text-[#D4AF37]"><User size={20} /></div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-center group hover:border-[#D4AF37]/30 transition-all">
                  <span className="text-[#D4AF37] font-bold text-[10px] tracking-widest uppercase block mb-6">Timer Caverna</span>
                  <div className="text-6xl font-mono mb-8 tabular-nums">25:00</div>
                  <button className="w-full bg-[#D4AF37] text-[#0A0F1D] py-4 rounded-xl font-black text-xs uppercase tracking-widest">Focar agora</button>
                </div>

                <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                  <span className="text-white/40 font-bold text-[10px] tracking-widest uppercase block mb-6">Stewardship Level</span>
                  <div className="text-7xl font-bold mb-2">42</div>
                  <span className="text-[#D4AF37] text-[10px] uppercase font-black tracking-widest">Mordomo Fiel</span>
                </div>

                <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10">
                  <span className="text-white/40 font-bold text-[10px] tracking-widest uppercase block mb-6">Próximo Ritual</span>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs p-4 bg-white/5 rounded-xl border border-white/5"><CheckCircle2 size={16} className="text-[#D4AF37]"/> Leitura Bíblica</div>
                    <div className="flex items-center gap-3 text-xs p-4 opacity-40"><Circle size={16}/> Revisão de KPI</div>
                  </div>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
