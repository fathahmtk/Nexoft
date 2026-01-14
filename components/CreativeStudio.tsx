
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Loader2, Download, Wand2, Sparkles, Layout, Instagram, Linkedin, Share2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const CreativeStudio = ({ t, language }: any) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const isRTL = language === 'ar';

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `High-end commercial social media content: ${prompt}. Professional lighting, 8k resolution, editorial style.` }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error('Image Gen Error:', error);
      alert('Content generation threshold reached or API error. Please try again.');
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
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 block">{t.creative.badge}</div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-slate-950 mb-12 tracking-tight leading-[0.9]">
                {t.creative.title}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                {t.creative.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Input Controls */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-12">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">Creative Direction</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t.creative.placeholder}
                    className="w-full px-8 py-8 bg-slate-50 border border-slate-100 rounded-sm focus:bg-white focus:border-slate-950 transition-all outline-none font-medium text-slate-900 text-lg resize-none min-h-[200px]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">Target Platform Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '1:1', icon: Instagram, label: 'Square' },
                      { id: '16:9', icon: Linkedin, label: 'Post' },
                      { id: '9:16', icon: Share2, label: 'Story' }
                    ].map((format) => (
                      <button
                        key={format.id}
                        onClick={() => setAspectRatio(format.id as any)}
                        className={`flex flex-col items-center gap-3 py-6 border transition-all ${
                          aspectRatio === format.id 
                          ? 'border-slate-950 bg-slate-950 text-white shadow-xl' 
                          : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white'
                        }`}
                      >
                        <format.icon size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{format.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={loading || !prompt.trim()}
                  onClick={generateImage}
                  className="w-full py-6 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-950 transition-all disabled:opacity-30 group"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                  {loading ? t.creative.loading : t.creative.button}
                </button>
              </div>
            </div>

            {/* Display Area */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {generatedImage ? (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <div className={`overflow-hidden rounded-sm border border-slate-100 shadow-2xl bg-slate-50 ${
                      aspectRatio === '9:16' ? 'max-w-md mx-auto aspect-[9/16]' : aspectRatio === '16:9' ? 'aspect-[16/9]' : 'aspect-square'
                    }`}>
                      <img src={generatedImage} alt="Generated Content" className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="absolute bottom-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                       <a 
                         href={generatedImage} 
                         download="nexoft-creative.png"
                         className="p-5 bg-white text-slate-950 shadow-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest"
                       >
                         <Download size={16} /> Save Asset
                       </a>
                    </div>
                    
                    <div className="mt-12 p-8 bg-slate-50 border border-slate-100 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                             <Sparkles size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nexoft AI Engine</p>
                             <p className="text-sm font-bold text-slate-950">Enhanced Brand Identity Applied</p>
                          </div>
                       </div>
                       <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest border-b border-blue-600 pb-1">Refine with Expert</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="h-[700px] border-2 border-slate-100 border-dashed rounded-sm flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8">
                       <Layout size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-300 tracking-tight uppercase">Ready for Production</h3>
                    <p className="text-sm text-slate-300 font-medium max-w-xs mt-4">Provide a creative brief to synthesize high-impact marketing visuals.</p>
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

export default CreativeStudio;
