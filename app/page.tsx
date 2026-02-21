"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Flame, BookOpen, LogOut, User, 
  Mail, Lock, ChevronRight, CheckCircle2, Circle
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- CONFIGURAÇÃO ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export default function Page() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
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
    if (!supabase) return alert("Chaves do Supabase não configuradas.");
    if (!email || !password) return alert("Preencha e-mail e senha.");
    
    setLoading(true);
    try {
      const { data, error } = type === 'login' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
      
      if (error) alert(error.message);
      else if (type === 'signup' && data.user) alert("Conta criada! Tente entrar.");
    } catch (e) {
      alert("Erro na conexão.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md bg-white/5 p-10 rounded-[2rem] border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37]/5 blur-3xl -z-10" />
          <div className="w-20 h-20 bg-[#D4AF37] rounded-3xl mx-auto flex items-center justify-center text-[#0A0F1D] font-bold text-4xl mb-8">C3</div>
          <h1 className="text-3xl font-serif font-bold mb-10">C3 Academy</h1>
          
          <div className="space-y-4 text-left">
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#D4AF37]/50" 
            />
            <input 
              type="password" 
              placeholder="Senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#D4AF37]/50" 
            />
            <button 
              onClick={() => handleAuth('login')}
              className="w-full bg-[#D4AF37] text-[#0A0F1D] font-black py-5 rounded-2xl mt-4 flex items-center justify-center gap-2"
            >
              ENTRAR NA CAVERNA <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => handleAuth('signup')}
              className="w-full text-white/30 text-[10px] uppercase tracking-widest pt-4"
            >
              Criar acesso de aluno
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0A0F1D] border-r border-white/5 p-8">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0A0F1D] font-bold">C3</div>
          <span className="font-bold text-lg">ACADEMY</span>
        </div>
        <nav className="flex-1 space-y-2">
          {['dashboard', 'cave', 'rituals'].map((id) => (
            <button 
              key={id} 
              onClick={() => setActiveTab(id)}
              className={`w-full text-left px-6 py-4 rounded-xl capitalize ${activeTab === id ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-white/30'}`}
            >
              {id}
            </button>
          ))}
        </nav>
        <button onClick={() => supabase?.auth.signOut()} className="mt-auto flex items-center gap-4 text-red-400/50 hover:text-red-400">
          <LogOut size={20} /> Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-serif">Bem-vindo, <span className="text-[#D4AF37]">{session.user.email}</span></h2>
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-black/40 flex items-center justify-center text-[#D4AF37]">
            <User size={22} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-white/5 rounded-[2rem] border border-white/10 text-center">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest block mb-6">Timer Caverna</span>
            <div className="text-6xl font-mono mb-8">25:00</div>
            <button className="w-full bg-[#D4AF37] text-[#0A0F1D] py-4 rounded-xl font-black">FOCO</button>
          </div>
          
          <div className="p-10 bg-white/5 rounded-[2rem] border border-white/10 text-center">
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-6">Nível</span>
            <div className="text-7xl font-bold mb-2">42</div>
            <span className="text-[#D4AF37] text-[10px] uppercase font-black tracking-widest">Mordomo Fiel</span>
          </div>

          <div className="p-10 bg-white/5 rounded-[2rem] border border-white/10">
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-6">Rituais</span>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs opacity-40"><Circle size={16}/> Leitura Bíblica</div>
              <div className="flex items-center gap-3 text-xs"><CheckCircle2 size={16} className="text-[#D4AF37]"/> Reunião C3</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
