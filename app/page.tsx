"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Flame, BookOpen, Briefcase, Users, 
  Settings as SettingsIcon, LogOut, Menu, X, Bell, 
  Play, Pause, RefreshCw, CheckCircle2, Circle, Check, 
  DollarSign, TrendingUp, Trophy, User, Key, Volume2, Book, 
  Lock, Mail, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURAÇÃO SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function C3CavernaOS() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // 1. Checar se o usuário está logado ao abrir o site
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Função de Login/Cadastro Blindada
  const handleAuth = async (type: 'login' | 'signup') => {
    // Validação inicial para evitar erro de campos vazios (Anonymous error)
    if (!email || !password) {
      alert("Por favor, preencha o e-mail e a senha.");
      return;
    }

    if (password.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = type === 'login' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ 
            email, 
            password,
            options: {
              emailRedirectTo: window.location.origin
            }
          });
      
      if (error) {
        // Tradução amigável para erros comuns
        if (error.message.includes("Anonymous sign-ins")) {
          alert("Aviso: Ative o provedor de e-mail no painel do Supabase (Auth > Providers).");
        } else {
          alert(error.message);
        }
      } else if (type === 'signup' && data.user) {
        alert("Acesso de aluno criado com sucesso! Agora você pode entrar.");
      }
    } catch (err) {
      alert("Ocorreu um erro inesperado na conexão.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // --- TELA DE LOGIN (Se não houver sessão) ---
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Efeito de Luz de Fundo */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-panel p-10 rounded-3xl border border-white/10 relative z-10 text-center"
        >
          <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl mx-auto flex items-center justify-center text-[#0A0F1D] font-bold text-3xl mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            C3
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2">Business Academy</h1>
          <p className="text-white/40 text-sm mb-8 tracking-widest uppercase">Portal da Mordomia</p>

          <div className="space-y-4 text-left">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37]/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
              <input 
                type="password" 
                placeholder="Sua senha" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37]/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              onClick={() => handleAuth('login')}
              className="w-full bg-[#D4AF37] text-[#0A0F1D] font-bold py-4 rounded-xl hover:bg-[#B8962E] transition-all flex items-center justify-center gap-2"
            >
              ENTRAR NA CAVERNA <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => handleAuth('signup')}
              className="w-full text-white/40 text-xs hover:text-white transition-colors py-2"
            >
              Não tem conta? Criar acesso de aluno
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- TELA DO DASHBOARD (Se estiver logado) ---
  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#0A0F1D] border-b lg:border-r border-white/5 p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded bg-[#D4AF37] flex items-center justify-center text-[#0A0F1D] font-bold">C3</div>
          <span className="font-bold text-xl">ACADEMY</span>
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
          <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full text-left px-4 py-3 rounded-lg text-red-400/60 hover:bg-red-400/10 mt-10 flex items-center gap-2"
          >
            <LogOut size={18} /> Sair
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <header className="mb-10 flex justify-between items-center">
          <h2 className="text-2xl font-serif">Bem-vindo, <span className="text-[#D4AF37]">{session.user.email}</span></h2>
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-white/5 flex items-center justify-center">
            <User className="text-[#D4AF37]" size={20} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
            <h3 className="text-[#D4AF37] font-bold mb-6 flex items-center gap-2"><Flame size={18} /> MODO CAVERNA</h3>
            <div className="text-5xl font-mono text-center mb-8">25:00</div>
            <button className="w-full bg-[#D4AF37] text-[#0A0F1D] py-4 rounded-xl font-bold">INICIAR FOCO</button>
          </div>
        </div>
      </main>
    </div>
  );
}
