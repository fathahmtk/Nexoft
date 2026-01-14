import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Activity, Target, CheckCircle2, Calendar,
  Award, Flame, BarChart3, PieChart
} from 'lucide-react';

const Analytics = ({ darkMode }: any) => {
  const weeklyData = [
    { day: 'Mon', habits: 8, goals: 3 },
    { day: 'Tue', habits: 7, goals: 4 },
    { day: 'Wed', habits: 9, goals: 3 },
    { day: 'Thu', habits: 6, goals: 2 },
    { day: 'Fri', habits: 10, goals: 5 },
    { day: 'Sat', habits: 8, goals: 4 },
    { day: 'Sun', habits: 9, goals: 3 },
  ];

  const maxHabits = Math.max(...weeklyData.map(d => d.habits));

  const categoryData = [
    { name: 'Health', value: 35, color: 'bg-green-500' },
    { name: 'Learning', value: 25, color: 'bg-blue-500' },
    { name: 'Career', value: 20, color: 'bg-purple-500' },
    { name: 'Personal', value: 20, color: 'bg-orange-500' },
  ];

  const achievements = [
    { icon: '🔥', title: '7 Day Streak', desc: 'Maintained daily habits', color: 'bg-orange-500' },
    { icon: '🎯', title: 'Goal Achiever', desc: 'Completed 5 goals', color: 'bg-blue-500' },
    { icon: '📚', title: 'Knowledge Seeker', desc: 'Read 12 books', color: 'bg-purple-500' },
    { icon: '💪', title: 'Fitness Champion', desc: 'Worked out 30 days', color: 'bg-green-500' },
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
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your progress and insights over time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: CheckCircle2, label: 'Total Completed', value: '248', trend: '+12%', color: 'bg-green-500' },
            { icon: Flame, label: 'Best Streak', value: '21 days', trend: '+3 days', color: 'bg-orange-500' },
            { icon: Target, label: 'Goals Achieved', value: '15', trend: '+5', color: 'bg-blue-500' },
            { icon: Activity, label: 'Consistency Rate', value: '87%', trend: '+5%', color: 'bg-purple-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-green-500">{stat.trend}</span>
                <span className="text-slate-600 dark:text-slate-400">vs last month</span>
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
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Weekly Activity</h2>
              <BarChart3 className="w-6 h-6 text-violet-500" />
            </div>

            <div className="space-y-4">
              {weeklyData.map((day, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{day.day}</span>
                    <span className="text-violet-600 dark:text-violet-400">{day.habits} habits</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-grow h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.habits / maxHabits) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                      />
                    </div>
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
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Category Breakdown</h2>
              <PieChart className="w-6 h-6 text-violet-500" />
            </div>

            <div className="space-y-4 mb-6">
              {categoryData.map((category, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{category.name}</span>
                    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">{category.value}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.value}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      className={`h-full ${category.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Most Active Day</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">Friday</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Achievements</h2>
            <Award className="w-6 h-6 text-yellow-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 text-center border-2 border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform"
              >
                <div className="text-5xl mb-3">{achievement.icon}</div>
                <h3 className="font-black text-slate-900 dark:text-white mb-1">{achievement.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 shadow-xl text-white"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black">You're doing amazing!</h3>
              <p className="text-violet-100">87% better than last month</p>
            </div>
          </div>
          <p className="text-lg leading-relaxed">
            Your consistency has improved significantly. Keep maintaining your daily habits to reach your full potential!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
