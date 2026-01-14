
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Loader2, Sparkles, AlertCircle, Key, Play, Download, ArrowRight, Film } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const REASSURING_MESSAGES = [
  "Architecting Cinematic Sequence...",
  "Orchestrating Brand-Aligned Lighting...",
  "Synthesizing High-Fidelity Motion...",
  "Calibrating Editorial Visual Flow...",
  "Refining Neural Frame Synthesis...",
  "Polishing Final Master Export..."
];

const VideoLab = ({ t, language }: any) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const isRTL = language === 'ar';

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % REASSURING_MESSAGES.length);
      }, 5000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const generateVideo = async () => {
    if (!prompt.trim()) return;
    
    // Check for API key selection as per mandatory requirements for Veo
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Instruction: "MUST assume the key selection was successful after triggering openSelectKey() and proceed"
      }
    }

    setLoading(true);
    setVideoUrl(null);

    try {
      // Always create a new instance right before calling as per instructions
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic high-end commercial master: ${prompt}. Editorial grading, 1080p.`,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (error: any) {
      console.error('Video Gen Error:', error);
      if (error.message?.includes("Requested entity was not found")) {
        // Reset and prompt for key selection again if it fails
        if (window.aistudio) await window.aistudio.openSelectKey();
      } else {
        alert("Neural synthesis encountered an error. Ensure billing is active on your selected project.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-48 pb-32 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
           <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-4">
                <Film size={14} />
                Cinematic Synthesis Lab
              </div>
              <h1 className="text-7xl md:text-9xl font-extrabold text-slate-950 mb-16 tracking-[-0.05em] leading-[0.85] uppercase italic">
                {t.video.title}
              </h1>
              <p className="text-2xl md:text-4xl text-slate-400 font-medium leading-relaxed max-w-3xl tracking-tight">
                {t.video.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-12">
              <div className="p-12 bg-slate-50 border border-slate-100 relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                   <Film size={48} className="text-slate-950" />
                </div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-8">Production Directive</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t.video.placeholder}
                  className="w-full px-0 bg-transparent border-none focus:ring-0 outline-none font-bold text-slate-950 text-2xl placeholder:text-slate-200 resize-none min-h-[300px]"
                />
              </div>

              <div className="flex flex-col gap-6">
                <button
                  disabled={loading || !prompt.trim()}
                  onClick={generateVideo}
                  className="w-full py-10 bg-slate-950 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-blue-600 transition-all disabled:opacity-30 group shadow-2xl"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Film size={20} />}
                  {loading ? t.video.loading : t.video.button}
                </button>
                
                <div className="flex items-center justify-between px-8 py-4 bg-slate-50 border border-slate-100">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Project Required</span>
                   <button 
                    onClick={() => window.aistudio?.openSelectKey()}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-slate-950 transition-colors flex items-center gap-2"
                   >
                     <Key size={12} /> Sync Project
                   </button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-8 bg-blue-50/50 border border-blue-100 text-[11px] font-bold text-blue-600 leading-relaxed italic uppercase tracking-wider">
                 <AlertCircle className="flex-shrink-0" size={16} />
                 Synthesis utilizes Veo 3.1 architecture. Expected latency: 180-300 seconds per cinematic block.
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[800px] bg-slate-950 rounded-sm flex flex-col items-center justify-center p-12 text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center animate-pulse" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative mb-16">
                         <div className="w-32 h-32 border border-blue-600/20 rounded-full animate-ping absolute" />
                         <div className="w-32 h-32 border border-blue-600 rounded-full flex items-center justify-center bg-slate-950 shadow-[0_0_50px_rgba(37,99,235,0.3)]">
                            <Sparkles className="text-blue-600 animate-pulse" size={40} />
                         </div>
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-[0.2em] uppercase mb-8 italic">
                        {REASSURING_MESSAGES[loadingStep]}
                      </h3>
                      <div className="flex gap-4">
                         {[0,1,2,3,4,5].map(i => (
                           <motion.div 
                            key={i} 
                            animate={{ scale: i === loadingStep ? [1, 1.5, 1] : 1, opacity: i === loadingStep ? 1 : 0.3 }}
                            className={`w-3 h-3 rounded-full bg-blue-600`} 
                           />
                         ))}
                      </div>
                    </div>
                  </motion.div>
                ) : videoUrl ? (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                  >
                    <div className="aspect-video bg-slate-950 rounded-sm overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-100">
                      <video 
                        src={videoUrl} 
                        controls 
                        autoPlay 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center p-12 bg-slate-50 border border-slate-100 gap-8">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                             <Sparkles size={24} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Production Output</p>
                             <p className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Nexoft Cinematic Master v1.0</p>
                          </div>
                       </div>
                       <a 
                         href={videoUrl} 
                         download="nexoft-master-export.mp4"
                         className="px-12 py-6 bg-slate-950 text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center gap-3 shadow-xl"
                       >
                         <Download size={18} /> Master Download
                       </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="h-[800px] border border-slate-100 border-dashed rounded-sm flex flex-col items-center justify-center p-24 text-center group"
                  >
                    <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-12 group-hover:bg-slate-950 group-hover:text-white transition-all duration-700">
                       <Film size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-300 tracking-[0.1em] uppercase italic">Awaiting Directive.</h3>
                    <p className="text-lg text-slate-300 font-medium max-w-sm mt-6 leading-relaxed">
                      Supply a high-level creative brief to initiate the Veo synthesis engine and architect your cinematic master.
                    </p>
                    <div className="mt-12 flex gap-4">
                       {['4K Native', '60 FPS', 'Master Grade'].map(tag => (
                         <span key={tag} className="px-4 py-2 border border-slate-100 text-[9px] font-black text-slate-200 uppercase tracking-widest">{tag}</span>
                       ))}
                    </div>
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

export default VideoLab;
