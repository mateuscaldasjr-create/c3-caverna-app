"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Flame, BookOpen, LogOut, User, 
  Mail, Lock, ChevronRight, CheckCircle2, Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURAÇÃO SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function C3AcademyPremium() {
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
    if (!supabase) return alert("Erro: Chaves do Supabase não configuradas na Vercel.");
    if (!email || !password) return alert("Preencha e-mail e senha!");
    setLoading(true);
    try {
      const { error } = type === 'login' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else if (type === 'signup') alert("Conta solicitada com sucesso!");
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
    <div className="min-h-screen bg-[#0A0F1D] text-white selection:bg-[#D4AF37]/30">
      <AnimatePresence mode="wait">
        {!session ? (
          /* --- TELA DE LOGIN PREMIUM --- */
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="min-h-screen flex items-center justify-center p-6 relative"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            <div className="w-full max-w-md bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8962E] rounded-3xl mx-auto flex items-center justify-center text-[#0A0F1D] font-black text-4xl mb-8 shadow-xl shadow-[#D4AF37]/20">C3</div>
              <h1 className="text-3xl font-serif font-bold mb-2 tracking-tight">C3 Academy</h1>
              <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] mb-12 font-medium">The Steward's Path</p>
              
              <div className="space-y-4 text-left">
                <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all" />
                <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all" />
                <button onClick={() => handleAuth('login')} className="w-full bg-[#D4AF37] text-[#0A0F1D] font-black py-5 rounded-2xl mt-4 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#D4AF37]/10">
                  ENTRAR NA CAVERNA <ChevronRight size={18} />
                </button>
                <button onClick={() => handleAuth('signup')} className="w-full text-white/20 text-[10px] uppercase tracking-widest pt-6 hover:text-[#D4AF37] transition-colors">
                  Solicitar acesso de aluno
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- DASHBOARD PREMIUM --- */
          <div className="flex min-h-screen">
            <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 p-8 bg-black/20">
              <div className="flex items-center gap-4 mb-16">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0A0F1D] font-bold">C3</div>
                <span className="font-bold tracking-tighter text-xl">ACADEMY</span>
              </div>
              <nav className="flex-1 space-y-2">
                {['dashboard', 'cave', 'rituals'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all capitalize ${activeTab === tab ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' : 'text-white/30 hover:bg-white/5'}`}>
                    {tab === 'dashboard' && <LayoutDashboard size={18} />}
                    {tab === 'cave' && <Flame size={18} />}
                    {tab === 'rituals' && <BookOpen size={18} />}
                    <span className="text-sm font-medium">{tab}</span>
                  </button>
                ))}
              </nav>
              <button onClick={() => supabase?.auth.signOut()} className="flex items-center gap-4 px-6 py-4 text-red-400/40 hover:text-red-400 transition-colors text-sm font-medium">
                <LogOut size={18} /> Sair
              </button>
            </aside>

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
              <header className="flex justify-between items-center mb-16">
                <div>
                  <h2 className="text-3xl font-serif mb-1">Bem-vindo, <span className="text-[#D4AF37] italic font-normal">Steward</span></h2>
                  <p className="text-white/20 text-xs tracking-widest uppercase">{session.user.email}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl border border-[#D4AF37]/20 bg-white/5 flex items-center justify-center text-[#D4AF37] shadow-lg shadow-[#D4AF37]/5"><User size={24} /></div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-10 bg-white/[0.03] rounded-[2.5rem] border border-white/10 text-center group hover:border-[#D4AF37]/40 transition-all">
                  <span className="text-[#D4AF37] font-bold text-[10px] tracking-[0.3em] uppercase block mb-8">Timer Caverna</span>
                  <div className="text-7xl font-mono mb-10 tabular-nums font-light tracking-tighter">25:00</div>
                  <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#0A0F1D] transition-all">Focar agora</button>
                </div>

                <div className="p-10 bg-white/[0.03] rounded-[2.5rem] border border-white/10 text-center">
                  <span className="text-white/30 font-bold text-[10px] tracking-[0.3em] uppercase block mb-8">Nível Atual</span>
                  <div className="text-8xl font-bold mb-4 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">42</div>
                  <span className="text-[#D4AF37] text-[10px] uppercase font-black tracking-[0.3em]">Mordomo Fiel</span>
                </div>

                <div className="p-10 bg-white/[0.03] rounded-[2.5rem] border border-white/10">
                  <span className="text-white/30 font-bold text-[10px] tracking-[0.3em] uppercase block mb-8">Rituais do Reino</span>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/10"><CheckCircle2 size={18} className="text-[#D4AF37]"/> <span className="text-xs font-bold uppercase tracking-wider">Leitura Bíblica</span></div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 opacity-40"><Circle size={18}/> <span className="text-xs font-bold uppercase tracking-wider text-white">Revisão de KPI</span></div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
