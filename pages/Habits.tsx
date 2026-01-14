import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, CheckCircle2, Circle, Trash2, Edit2, Calendar,
  TrendingUp, Flame, Target, X
} from 'lucide-react';

const Habits = ({ darkMode }: any) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Meditation', icon: '🧘', streak: 7, frequency: 'Daily', completed: false },
    { id: 2, name: 'Read for 30 min', icon: '📚', streak: 5, frequency: 'Daily', completed: false },
    { id: 3, name: 'Workout', icon: '💪', streak: 12, frequency: 'Daily', completed: false },
    { id: 4, name: 'Learn React', icon: '⚛️', streak: 3, frequency: 'Daily', completed: false },
    { id: 5, name: 'Journal', icon: '📝', streak: 8, frequency: 'Daily', completed: false },
  ]);

  const [newHabit, setNewHabit] = useState({ name: '', icon: '🎯', frequency: 'Daily' });

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed, streak: h.completed ? h.streak : h.streak + 1 } : h));
  };

  const addHabit = () => {
    if (newHabit.name.trim()) {
      setHabits([...habits, { id: Date.now(), ...newHabit, streak: 0, completed: false }]);
      setNewHabit({ name: '', icon: '🎯', frequency: 'Daily' });
      setShowAddModal(false);
    }
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const icons = ['🎯', '🧘', '📚', '💪', '🏃', '🎨', '🎵', '🍎', '💻', '✍️', '🧠', '❤️'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
              My Habits
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Build consistency, one day at a time
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Habit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { icon: CheckCircle2, label: 'Completed Today', value: habits.filter(h => h.completed).length, color: 'bg-green-500' },
            { icon: Flame, label: 'Longest Streak', value: Math.max(...habits.map(h => h.streak)), color: 'bg-orange-500' },
            { icon: Target, label: 'Total Habits', value: habits.length, color: 'bg-blue-500' },
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

        <div className="grid gap-4">
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border-2 transition-all ${
                habit.completed
                  ? 'border-green-500'
                  : 'border-slate-200 dark:border-slate-800 hover:border-violet-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    habit.completed
                      ? 'bg-green-500 scale-110'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-900/20'
                  }`}
                >
                  {habit.completed ? (
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  ) : (
                    <Circle className="w-8 h-8 text-slate-400" />
                  )}
                </button>

                <div className="text-4xl">{habit.icon}</div>

                <div className="flex-grow">
                  <h3 className={`text-xl font-bold ${habit.completed ? 'text-green-700 dark:text-green-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                    {habit.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {habit.frequency}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-orange-600 dark:text-orange-400">
                      <Flame className="w-4 h-4" />
                      {habit.streak} day streak
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Add New Habit</h2>
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
                      Habit Name
                    </label>
                    <input
                      type="text"
                      value={newHabit.name}
                      onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                      placeholder="e.g., Morning Run"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Choose Icon
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {icons.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setNewHabit({ ...newHabit, icon })}
                          className={`text-3xl p-3 rounded-xl transition-all ${
                            newHabit.icon === icon
                              ? 'bg-violet-500 scale-110'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Frequency
                    </label>
                    <select
                      value={newHabit.frequency}
                      onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors"
                    >
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={addHabit}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  Create Habit
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Habits;
