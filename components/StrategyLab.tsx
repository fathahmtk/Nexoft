
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Send, Wand2, Info, ArrowRight, Copy, Download, Check } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const StrategyLab = ({ t, language }: any) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const isRTL = language === 'ar';

  const generateStrategy = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setStrategy(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a world-class Social Media Marketing Strategist at Nexoft Agency.
        Target Country/Language Context: ${language === 'ar' ? 'Middle East / Arabic' : 'Global / English'}.
        Industry/Niche: ${input}.
        
        Provide a 3-step growth strategy for a brand in this niche. 
        Focus on:
        1. Attention Capture (Platforms & Hook)
        2. Content Architecture (Value Pillars)
        3. Conversion Funnel (Call to Action)
        
        Keep it concise, high-impact, and professional. 
        Format in clear Markdown. 
        Respond in ${language === 'ar' ? 'Arabic' : 'English'}.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setStrategy(response.text || 'Engineering fault. Please try again.');
    } catch (error) {
      console.error('AI Generation Error:', error);
      setStrategy('Service momentarily unavailable. Our neural engineers are on it.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!strategy) return;
    navigator.clipboard.writeText(strategy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 block">Research & Development</div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-slate-950 mb-12 tracking-tight leading-[0.9]">
                {t.lab.title}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                {t.lab.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Input Column */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="mb-12">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">Market Parameters</label>
                  <div className="relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t.lab.inputPlaceholder}
                      className="w-full px-8 py-8 bg-slate-50 border border-slate-100 rounded-sm focus:bg-white focus:border-slate-950 transition-all outline-none font-medium text-slate-900 text-lg resize-none min-h-[250px]"
                    />
                  </div>
                </div>

                <button
                  disabled={loading || !input.trim()}
                  onClick={generateStrategy}
                  className="w-full py-6 bg-slate-950 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      {t.lab.button}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="mt-8 flex items-start gap-3 p-6 bg-slate-50 border border-slate-100 text-[11px] text-slate-400 leading-relaxed italic">
                  <Info size={16} className="text-blue-600 flex-shrink-0" />
                  {t.lab.disclaimer}
                </div>
              </div>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {strategy ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-12 lg:p-20 bg-slate-50 border border-slate-100 rounded-sm"
                  >
                    <div className="flex items-center justify-between mb-16 pb-8 border-b border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-950 text-white flex items-center justify-center rounded-full">
                           <Sparkles size={18} />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Nexoft Analysis</div>
                          <div className="text-sm font-bold text-slate-950 tracking-tight">Expansion Roadmap Generated</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                         <button 
                           onClick={copyToClipboard}
                           className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-slate-950 transition-all"
                           title="Copy Text"
                         >
                           {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                         </button>
                         <button 
                           className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-slate-950 transition-all"
                           title="Export as PDF (Mock)"
                         >
                           <Download size={16} />
                         </button>
                      </div>
                    </div>
                    
                    <div className="prose prose-slate max-w-none prose-h1:text-4xl prose-h1:font-extrabold prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-p:font-medium">
                      {strategy}
                    </div>

                    <div className="mt-20 pt-12 border-t border-slate-200 text-center">
                       <p className="text-sm text-slate-400 font-medium mb-6 italic">Want a customized audit of these results by a human strategist?</p>
                       <button className="px-8 py-4 bg-slate-950 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">
                          Schedule Deep Dive Consultation
                       </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="h-[600px] border border-slate-100 border-dashed rounded-sm flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8">
                       <Wand2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-300 tracking-tight uppercase">Intelligence Engine Standby</h3>
                    <p className="text-sm text-slate-300 font-medium max-w-xs mt-2">Enter your industry niche to generate a strategic growth framework.</p>
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

export default StrategyLab;
