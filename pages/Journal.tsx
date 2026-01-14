import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, BookOpen, Calendar, Search, Sparkles, Mic, X, Save
} from 'lucide-react';

const Journal = ({ darkMode }: any) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      title: 'Great Progress Today',
      content: 'Made significant progress on my React learning journey. Built a complete todo app with database integration!',
      mood: '😊',
      tags: ['learning', 'achievement']
    },
    {
      id: 2,
      date: '2024-01-14',
      title: 'Morning Meditation',
      content: 'Started my day with a 20-minute meditation session. Feeling centered and ready to tackle the day.',
      mood: '🧘',
      tags: ['wellness', 'mindfulness']
    },
    {
      id: 3,
      date: '2024-01-13',
      title: 'Workout Milestone',
      content: 'Hit a new personal record at the gym today! Feeling stronger every day.',
      mood: '💪',
      tags: ['fitness', 'achievement']
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '😊',
    tags: []
  });

  const moods = ['😊', '😔', '😍', '🤔', '😴', '🔥', '💪', '🧘', '🎉', '😌'];

  const addEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      setEntries([{
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...newEntry
      }, ...entries]);
      setNewEntry({ title: '', content: '', mood: '😊', tags: [] });
      setShowAddModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
              My Journal
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Document your thoughts and reflect on your journey
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Entry
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: BookOpen, label: 'Total Entries', value: entries.length, color: 'bg-violet-500' },
            { icon: Calendar, label: 'Current Streak', value: '5 days', color: 'bg-blue-500' },
            { icon: Sparkles, label: 'This Month', value: 12, color: 'bg-pink-500' },
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

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search your journal..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-6">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:scale-105 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{entry.mood}</div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{entry.title}</h3>
                    <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{entry.content}</p>
                  <div className="flex gap-2">
                    {entry.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
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
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">New Journal Entry</h2>
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
                      How are you feeling?
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {moods.map((mood) => (
                        <button
                          key={mood}
                          onClick={() => setNewEntry({ ...newEntry, mood })}
                          className={`text-4xl p-3 rounded-xl transition-all ${
                            newEntry.mood === mood
                              ? 'bg-violet-500 scale-110'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                      placeholder="Give your entry a title..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Your Thoughts
                    </label>
                    <textarea
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                      placeholder="Write your thoughts here..."
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <Mic className="w-4 h-4" />
                      Voice Input
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <Sparkles className="w-4 h-4" />
                      AI Suggestions
                    </button>
                  </div>
                </div>

                <button
                  onClick={addEntry}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Entry
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Journal;
