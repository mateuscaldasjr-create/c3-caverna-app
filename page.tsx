import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { PomodoroTimer } from './components/dashboard/PomodoroTimer';
import { TaskList } from './components/dashboard/TaskList';
import { RitualsTracker } from './components/dashboard/RitualsTracker';
import { StatsChart } from './components/dashboard/StatsChart';
import { CaveMode } from './components/CaveMode';
import { FaithRituals } from './components/FaithRituals';
import { BusinessManager } from './components/BusinessManager';
import { Community } from './components/Community';
import { Settings } from './components/Settings';
import { motion, AnimatePresence } from 'motion/react';

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
