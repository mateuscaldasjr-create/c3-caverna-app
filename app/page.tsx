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

export default function C3FullDashboard() {
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
    if (!supabase) return alert("Erro de config.");
    if (!email || !password) return alert("Preencha os campos.");
    setLoading(true);
    try {
      const { data, error } = type === 'login' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
      
      if (error) alert(error.message);
      else if (type === 'signup' && data.user) alert("Conta criada! Tente entrar.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // --- VIEW: LOGIN ---
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center p-6 relative overflow-hidden text-white">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white/5 p-10 rounded-[2rem] border border-white/10 backdrop-blur-xl z-10 text-center">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-3xl mx-auto flex items-center justify-center text-[#0A0F1D] font-bold text-4xl mb-8 shadow-2xl shadow-[#D4AF37]/20">C3</div>
          <h1 className="text-3xl font-serif font-bold mb-2">C3 Academy</h1>
          <p className="text-white/30 text-xs mb-10 tracking-[0.2em] uppercase">The Steward's Path</p>
          <div className="space-y-4 text-left">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 text-white outline-none focus:border-[#D4AF37]/30" placeholder="E-mail" />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 text-white outline-none focus:border-[#D4AF37]/30" placeholder="Senha" />
            </div>
            <button
