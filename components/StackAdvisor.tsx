
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Loader2, Sparkles, LayoutGrid, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const StackAdvisor = ({ t, language }: any) => {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    teamSize: '1-10',
    goal: 'Lead Generation',
    budget: '$500 - $1,500'
  });

  const isRTL = language === 'ar';

  const generateStack = async () => {
    setLoading(true);
    setRecommendation(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a CTO and Marketing Operations Consultant at Nexoft Agency.
        Context: ${language === 'ar' ? 'GCC / Arabic Region' : 'Global / English'}.
        Team Size: ${formData.teamSize}.
        Objective: ${formData.goal}.
        Budget: ${formData.budget}.

        Recommend a 4-tool software stack (CRM, Social Management, Email, Analytics).
        For each tool, provide:
        - Tool Name
        - Why it fits this team size and budget
        - One key "Nexoft Tip" for using it efficiently.

        Format as clear, premium Markdown with headers. 
        Language: ${language === 'ar' ? 'Arabic' : 'English'}.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setRecommendation(response.text || 'Architectural mismatch. Please retry.');
    } catch (error) {
      console.error('Stack Gen Error:', error);
      setRecommendation('Neural link timeout. Our systems are recalibrating.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 block">Operations Audit</div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-slate-950 mb-12 tracking-tight leading-[0.9]">
                {t.stack.title}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                {t.stack.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            {/* Control Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-12"
            >
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 block">{t.stack.teamSize}</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 border border-slate-100">
                  {['1-10', '11-50', '50+'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFormData({ ...formData, teamSize: size })}
                      className={`py-3 text-[11px] font-bold transition-all uppercase tracking-widest ${
                        formData.teamSize === size 
                        ? 'bg-slate-950 text-white' 
                        : 'bg-white text-slate-400 hover:text-slate-950'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 block">{t.stack.goal}</label>
                <div className="space-y-1 bg-slate-100 border border-slate-100 p-1">
                  {['Lead Generation', 'Brand Awareness', 'Process Automation', 'Community Growth'].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setFormData({ ...formData, goal })}
                      className={`w-full px-6 py-4 text-xs font-bold flex items-center justify-between transition-all uppercase tracking-widest ${
                        formData.goal === goal 
                        ? 'bg-slate-950 text-white' 
                        : 'bg-white text-slate-400 hover:text-slate-950'
                      }`}
                    >
                      {goal}
                      {formData.goal === goal && <CheckCircle2 size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 block">{t.stack.budget}</label>
                <div className="space-y-1 bg-slate-100 border border-slate-100 p-1">
                  {['Free / Minimal', '$500 - $1,500', '$2,000+'].map((budget) => (
                    <button
                      key={budget}
                      onClick={() => setFormData({ ...formData, budget: budget })}
                      className={`w-full px-6 py-4 text-xs font-bold flex items-center justify-between transition-all uppercase tracking-widest ${
                        formData.budget === budget 
                        ? 'bg-slate-950 text-white' 
                        : 'bg-white text-slate-400 hover:text-slate-950'
                      }`}
                    >
                      {budget}
                      {formData.budget === budget && <CheckCircle2 size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={loading}
                onClick={generateStack}
                className="w-full py-6 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-950 transition-all disabled:opacity-30 group"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <LayoutGrid size={16} />}
                {loading ? t.stack.loading : t.stack.button}
              </button>

              <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 text-[11px] text-slate-400 leading-relaxed italic">
                 <Info className="text-blue-600 flex-shrink-0" size={16} />
                 {t.stack.disclaimer}
              </div>
            </motion.div>

            {/* Results Column */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {recommendation ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-12 lg:p-20 bg-slate-50 border border-slate-100 rounded-sm min-h-[600px]"
                  >
                    <div className="flex items-center gap-4 mb-16 pb-8 border-b border-slate-200">
                      <div className="w-10 h-10 bg-slate-950 text-white flex items-center justify-center rounded-full">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Stack Architecture</div>
                        <div className="text-sm font-bold text-slate-950 tracking-tight">Optimal Integration Logic</div>
                      </div>
                    </div>
                    <div className="prose prose-slate max-w-none prose-h1:text-4xl prose-h1:font-extrabold prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-p:font-medium">
                      {recommendation}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="h-[600px] border border-slate-100 border-dashed rounded-sm flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8">
                       <Settings2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-300 tracking-tight uppercase">Audit System Ready</h3>
                    <p className="text-sm text-slate-300 font-medium max-w-xs mt-2">Select your operational parameters to architect a high-performance software stack.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StackAdvisor;
