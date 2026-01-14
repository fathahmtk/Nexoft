import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Sparkles, BarChart3, BookOpen, Target, Menu, X,
  Moon, Sun, CheckCircle2, Brain
} from 'lucide-react';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import Goals from './pages/Goals';
import Journal from './pages/Journal';
import Analytics from './pages/Analytics';
import AIInsights from './pages/AIInsights';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-slate-950' : 'bg-white'}`}>
        <AppContent darkMode={darkMode} setDarkMode={setDarkMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </Router>
  );
};

const AppContent = ({ darkMode, setDarkMode, isMenuOpen, setIsMenuOpen }: any) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return (
      <Routes>
        <Route path="/" element={<Landing darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="pt-20 min-h-screen bg-white dark:bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
              <Route path="/habits" element={<Habits darkMode={darkMode} />} />
              <Route path="/goals" element={<Goals darkMode={darkMode} />} />
              <Route path="/journal" element={<Journal darkMode={darkMode} />} />
              <Route path="/analytics" element={<Analytics darkMode={darkMode} />} />
              <Route path="/ai-insights" element={<AIInsights darkMode={darkMode} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};

const Navbar = ({ darkMode, setDarkMode, isMenuOpen, setIsMenuOpen }: any) => {
  const navLinks = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/habits', icon: CheckCircle2, label: 'Habits' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/ai-insights', icon: Brain, label: 'AI Insights' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              AURA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} icon={link.icon} label={link.label} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-slate-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, icon: Icon, label }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isActive
          ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25'
          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
};

export default App;
