"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Flame, LogOut, User, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// --- CONFIGURAÇÃO BLINDADA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Criamos o cliente apenas se as chaves existirem, evitando o erro de build da Vercel
const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export default function C3CavernaOS() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    if (!supabase) {
      alert("❌ Erro: As chaves do Supabase não foram configuradas na Vercel!");
      return;
    }

    if (!email || !password) {
      alert("⚠️ Digite o e-mail e a senha primeiro!");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = type === 'login' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
      
      if (error) alert(`❌ ${error.message}`);
      else if (type === 'signup' && data.user) alert("✅ Acesso criado! Agora clique em ENTRAR.");
    } catch (err) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center p-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/5 p-10 rounded-3xl border border-white/10 text-center z-10">
          <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl mx-auto flex items-center justify-center text-[#0A0F1D] font-bold text-3xl mb-6 shadow-lg shadow-[#D4AF37]/20">C3</div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2">Business Academy</h1>
          <p className="text-white/40 text-[10px] mb-8 uppercase tracking-widest">Portal da Mordomia</p>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
              <input type="email" placeholder="Seu e-mail" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 text-white outline-none" 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
              <input type="password" placeholder="Sua senha" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 text-white outline-none"
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={() => handleAuth('login')} className="w-full bg-[#D4AF37] text-[#0A0F1D] font-bold py-4 rounded-xl flex items-center justify-center gap-2">
              ENTRAR NA CAVERNA <ArrowRight size={18} />
            </button>
            <button onClick={() => handleAuth('signup')} className="w-full text-white/40 text-xs py-2">
              Não tem conta? Criar acesso de aluno
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white p-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-serif mb-4 text-[#D4AF37]">Bem-vindo à Caverna!</h1>
      <p className="mb-8 opacity-50">{session.user.email}</p>
      <button onClick={() => supabase?.auth.signOut()} className="flex items-center gap-2 text-red-400/60">
        <LogOut size={20} /> Sair
      </button>
    </div>
  );
}
