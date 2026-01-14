import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Target, TrendingUp, Calendar, CheckCircle2, X, Trophy, Flag
} from 'lucide-react';

const Goals = ({ darkMode }: any) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, title: 'Learn React', description: 'Master React and build 5 projects', progress: 75, deadline: '2024-12-31', category: 'Learning', color: 'violet' },
    { id: 2, title: 'Read 12 Books', description: 'Read one book per month', progress: 33, deadline: '2024-12-31', category: 'Personal', color: 'blue' },
    { id: 3, title: 'Run Marathon', description: 'Complete a full marathon', progress: 60, deadline: '2024-11-15', category: 'Fitness', color: 'green' },
    { id: 4, title: 'Launch Side Project', description: 'Build and ship a SaaS product', progress: 45, deadline: '2024-10-30', category: 'Career', color: 'orange' },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: '',
    category: 'Personal',
    color: 'violet'
  });

  const addGoal = () => {
    if (newGoal.title.trim()) {
      setGoals([...goals, { id: Date.now(), ...newGoal, progress: 0 }]);
      setNewGoal({ title: '', description: '', deadline: '', category: 'Personal', color: 'violet' });
      setShowAddModal(false);
    }
  };

  const updateProgress = (id: number, newProgress: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, progress: newProgress } : g));
  };

  const colorClasses: Record<string, string> = {
    violet: 'from-violet-500 to-purple-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-red-500',
    pink: 'from-pink-500 to-rose-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
              My Goals
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Track your long-term objectives and celebrate progress
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Target, label: 'Active Goals', value: goals.length, color: 'bg-violet-500' },
            { icon: Trophy, label: 'Completed', value: goals.filter(g => g.progress === 100).length, color: 'bg-green-500' },
            { icon: TrendingUp, label: 'Avg Progress', value: `${Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)}%`, color: 'bg-blue-500' },
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

        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:scale-105 transition-transform"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[goal.color]} rounded-xl flex items-center justify-center`}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{goal.title}</h3>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{goal.category}</span>
                  </div>
                </div>
                {goal.progress === 100 && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-4">{goal.description}</p>

              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Progress</span>
                  <span className="text-lg font-black text-violet-600 dark:text-violet-400">{goal.progress}%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    className={`h-full bg-gradient-to-r ${colorClasses[goal.color]} rounded-full`}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Create New Goal</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Goal Title
                    </label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="e.g., Learn Spanish"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      placeholder="Describe your goal..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Category
                      </label>
                      <select
                        value={newGoal.category}
                        onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors"
                      >
                        <option>Personal</option>
                        <option>Career</option>
                        <option>Learning</option>
                        <option>Fitness</option>
                        <option>Finance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={addGoal}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  Create Goal
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Goals;
