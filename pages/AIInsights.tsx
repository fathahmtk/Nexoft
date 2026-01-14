import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Sparkles, TrendingUp, Target, Calendar, Lightbulb,
  Award, Zap, MessageSquare, Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIInsights = ({ darkMode }: any) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([
    "Your morning meditation habit has a 95% completion rate. This is your strongest habit!",
    "You're most productive on Friday mornings. Consider scheduling important tasks then.",
    "Your goal completion rate improves by 40% when you break tasks into smaller steps.",
    "You tend to skip workouts on rainy days. Try indoor alternatives to maintain consistency."
  ]);

  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a personal growth and productivity coach. Based on this user question about their habits and goals, provide helpful, actionable advice in 2-3 paragraphs.

User Question: ${question}

Provide supportive, motivating advice that helps them improve their habits and reach their goals.`
      });

      setAiResponse(response.text || 'Unable to generate response. Please try again.');
    } catch (error) {
      console.error('AI Error:', error);
      setAiResponse('I encountered an error. Please make sure your API key is configured correctly.');
    } finally {
      setLoading(false);
    }
  };

  const suggestionCategories = [
    {
      icon: Zap,
      title: 'Quick Wins',
      color: 'bg-yellow-500',
      suggestions: [
        'Set a 5-minute morning routine',
        'Track one new habit this week',
        'Review your goals tonight'
      ]
    },
    {
      icon: Target,
      title: 'Focus Areas',
      color: 'bg-blue-500',
      suggestions: [
        'Increase workout consistency',
        'Establish reading routine',
        'Improve sleep schedule'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      color: 'bg-green-500',
      suggestions: [
        'Learn a new skill',
        'Network with mentors',
        'Start a side project'
      ]
    }
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
            AI Insights
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Personalized recommendations powered by your data
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 shadow-xl text-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-1">Your Growth Score</h2>
              <p className="text-violet-100">Based on your activity patterns</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Consistency', value: 87 },
              { label: 'Goal Focus', value: 92 },
              { label: 'Momentum', value: 78 },
              { label: 'Balance', value: 85 }
            ].map((metric, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-violet-100 mb-2">{metric.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{metric.value}</span>
                  <span className="text-lg">/100</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-lg leading-relaxed">
            You're in the top 15% of AURA users! Your dedication to personal growth is impressive. Keep up the momentum!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Smart Insights</h2>
            </div>

            <div className="space-y-4">
              {insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-3 p-4 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800"
                >
                  <Lightbulb className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{insight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Ask AI Coach</h2>
            </div>

            <div className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me anything about your habits, goals, or productivity..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 outline-none transition-colors resize-none"
              />

              <button
                onClick={askAI}
                disabled={loading || !question.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get AI Advice
                  </>
                )}
              </button>

              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800"
                >
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {aiResponse}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {suggestionCategories.map((category, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{category.title}</h3>
              </div>

              <ul className="space-y-3">
                {category.suggestions.map((suggestion, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AIInsights;
