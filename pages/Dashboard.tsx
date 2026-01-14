import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Target, CheckCircle2, Calendar, Zap,
  Award, Activity, Plus, Clock, Flame
} from 'lucide-react';
import { mcp__supabase__execute_sql } from '../utils/supabase';

const Dashboard = ({ darkMode }: any) => {
  const [stats, setStats] = useState({
    habitsCompleted: 0,
    currentStreak: 0,
    totalGoals: 0,
    journalEntries: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setStats({
      habitsCompleted: 24,
      currentStreak: 7,
      totalGoals: 5,
      journalEntries: 12
    });
  };

  const todayHabits = [
    { id: 1, name: 'Morning Meditation', completed: true, time: '7:00 AM', icon: '🧘' },
    { id: 2, name: 'Read for 30 min', completed: true, time: '8:00 AM', icon: '📚' },
    { id: 3, name: 'Workout', completed: false, time: '6:00 PM', icon: '💪' },
    { id: 4, name: 'Journal', completed: false, time: '9:00 PM', icon: '📝' },
  ];

  const recentGoals = [
    { id: 1, title: 'Learn React', progress: 75, color: 'violet' },
    { id: 2, title: 'Read 12 Books', progress: 33, color: 'blue' },
    { id: 3, title: 'Run Marathon', progress: 60, color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here's your progress for today
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: CheckCircle2, label: 'Habits Completed', value: stats.habitsCompleted, color: 'bg-green-500' },
            { icon: Flame, label: 'Current Streak', value: `${stats.currentStreak} days`, color: 'bg-orange-500' },
            { icon: Target, label: 'Active Goals', value: stats.totalGoals, color: 'bg-blue-500' },
            { icon: Activity, label: 'Journal Entries', value: stats.journalEntries, color: 'bg-purple-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Today's Habits</h2>
              <button className="p-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {todayHabits.map((habit) => (
                <div
                  key={habit.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    habit.completed
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-violet-500'
                  }`}
                >
                  <div className="text-2xl">{habit.icon}</div>
                  <div className="flex-grow">
                    <p className={`font-semibold ${habit.completed ? 'text-green-700 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
                      {habit.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {habit.time}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    habit.completed ? 'bg-green-500 border-green-500' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {habit.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Active Goals</h2>
              <button className="p-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {recentGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 dark:text-white">{goal.title}</p>
                    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">{goal.progress}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-500 hover:text-violet-500 transition-all font-semibold">
              View All Goals
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 shadow-xl text-white"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black">AI Insight of the Day</h3>
              <p className="text-violet-100">Powered by your activity patterns</p>
            </div>
          </div>
          <p className="text-lg leading-relaxed">
            You're on a 7-day streak with morning meditation. Research shows that maintaining this for 21 days will make it an automatic habit. Keep going!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
