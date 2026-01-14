import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Zap, Brain, Target, TrendingUp,
  CheckCircle2, Star, Moon, Sun, BarChart3, Award
} from 'lucide-react';

const Landing = ({ darkMode, setDarkMode }: any) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiIHN0cm9rZT0iIzhhNWNmNiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                AURA
              </span>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-slate-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">AI-Powered Growth Platform</span>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Daily Habits
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your personal AI companion for building better habits, achieving goals, and unlocking your full potential
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/dashboard"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transition-all hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg border-2 border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500 transition-all">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: CheckCircle2, label: 'Habit Tracking', color: 'text-green-500' },
                { icon: Target, label: 'Goal Setting', color: 'text-blue-500' },
                { icon: Brain, label: 'AI Insights', color: 'text-purple-500' },
                { icon: BarChart3, label: 'Analytics', color: 'text-orange-500' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20"></div>
            <div className="relative p-8 sm:p-16 backdrop-blur-sm">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Zap, title: 'Lightning Fast', desc: 'Instant tracking and real-time insights' },
                  { icon: Brain, title: 'AI-Powered', desc: 'Smart recommendations based on your patterns' },
                  { icon: TrendingUp, title: 'Growth Focused', desc: 'Track progress and celebrate wins' },
                ].map((feature, i) => (
                  <div key={i} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                    <feature.icon className="w-8 h-8 text-violet-600 dark:text-violet-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900 dark:text-white">
              Loved by <span className="text-violet-600">Thousands</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
              Join the community of achievers transforming their lives
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-16">
              {[
                { number: '50K+', label: 'Active Users' },
                { number: '1M+', label: 'Habits Tracked' },
                { number: '4.9/5', label: 'User Rating' },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transition-all hover:scale-105"
            >
              Start Your Journey
              <Sparkles className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              AURA
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            © 2024 AURA. Transform your life, one habit at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
