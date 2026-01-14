
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Globe, ExternalLink, Info, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const MarketIntelligence = ({ t, language }: any) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string, links: any[] } | null>(null);
  const isRTL = language === 'ar';

  const fetchIntelligence = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Research the following marketing intelligence query for the ${language === 'ar' ? 'GCC/Arabic' : 'Global'} market: ${query}. 
        Focus on current trends, competitor movements, and localized growth opportunities.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri);

      setResult({
        text: response.text || '',
        links: Array.from(new Set(links.map((l: any) => l.uri))).map(uri => links.find((l: any) => l.uri === uri))
      });
    } catch (error) {
      console.error('Intelligence Fetch Error:', error);
      alert('Neural sync failed. Please refine your query.');
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
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 block">{t.intelligence.badge}</div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-slate-950 mb-12 tracking-tight leading-[0.9]">
                {t.intelligence.title}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                {t.intelligence.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Input Panel */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-12">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">Research Parameter</label>
                  <div className="relative">
                    <Search className="absolute top-8 left-8 text-slate-300" size={20} />
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={t.intelligence.placeholder}
                      className="w-full pl-20 pr-8 py-8 bg-slate-50 border border-slate-100 rounded-sm focus:bg-white focus:border-slate-950 transition-all outline-none font-medium text-slate-900 text-lg resize-none min-h-[200px]"
                    />
                  </div>
                </div>

                <button
                  disabled={loading || !query.trim()}
                  onClick={fetchIntelligence}
                  className="w-full py-6 bg-slate-950 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all disabled:opacity-30 group"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Globe size={16} />}
                  {loading ? t.intelligence.loading : t.intelligence.button}
                </button>

                <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 text-[11px] text-slate-400 leading-relaxed italic">
                   <Info className="text-blue-600 flex-shrink-0" size={16} />
                   Grounding enabled. Results are synthesized from live global search indices to ensure temporal accuracy.
                </div>
              </div>
            </div>

            {/* Analysis Area */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-12"
                  >
                    <div className="p-12 lg:p-16 bg-slate-50 border border-slate-100 rounded-sm shadow-sm">
                       <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-200">
                          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                             <Sparkles size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grounding Analysis</p>
                             <p className="text-sm font-bold text-slate-950">Synthesized Market Intelligence</p>
                          </div>
                       </div>
                       
                       <div className="prose prose-slate max-w-none prose-p:text-lg prose-p:leading-relaxed prose-p:font-medium prose-p:text-slate-600">
                          {result.text}
                       </div>
                    </div>

                    {result.links.length > 0 && (
                      <div className="space-y-6">
                         <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <TrendingUp size={14} />
                            {t.intelligence.sources}
                         </div>
                         <div className="grid grid-cols-1 gap-3">
                            {result.links.map((link, i) => (
                               <a 
                                 key={i}
                                 href={link.uri}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center justify-between p-6 bg-white border border-slate-100 hover:border-slate-950 transition-all group"
                               >
                                  <div className="flex items-center gap-4">
                                     <div className="text-[10px] font-black text-slate-300">0{i+1}</div>
                                     <span className="text-sm font-bold text-slate-950 truncate max-w-md">{link.title || link.uri}</span>
                                  </div>
                                  <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                               </a>
                            ))}
                         </div>
                      </div>
                    )}

                    <div className="pt-12 border-t border-slate-100 flex flex-col items-center">
                       <p className="text-sm text-slate-400 font-medium italic mb-8">Request a localized deep-dive audit from our regional analysts.</p>
                       <button className="px-10 py-5 bg-slate-950 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-3">
                          Access Full Report Suite <ArrowRight size={14} />
                       </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="h-[650px] border-2 border-slate-100 border-dashed rounded-sm flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8">
                       <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-300 tracking-tight uppercase">Intelligence Grids Offline</h3>
                    <p className="text-sm text-slate-300 font-medium max-w-xs mt-4">Initiate a query to verify current market dynamics via real-time search grounding.</p>
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

export default MarketIntelligence;
