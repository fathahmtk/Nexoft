
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Award, X, ExternalLink, Globe, Target, Shield, Zap } from 'lucide-react';

const Portfolio = ({ t, language }: any) => {
  const isRTL = language === 'ar';
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const caseDetails: Record<string, any> = {
    'lux-real-estate': {
      challenge: 'The Dubai luxury real estate sector faced extreme market saturation. A high-authority, legacy-driven narrative was required to capture the attention of high-net-worth individuals (HNWIs).',
      strategy: 'We architected a bilingual content ecosystem (Arabic/English) focused on architectural legacy, lifestyle ROI, and neighborhood intelligence.',
      metrics: ['+340% Qualified Lead Gen', '4.2M Global Monthly Impressions', '$45M Tracked Property Closures'],
      techStack: ['Nexoft Intelligence Lab', 'Gemini 3 Visual Engine', 'Localized Ad Ops']
    },
    'fintech-us': {
      challenge: 'Nova Pay needed to disrupt the US Gen-Z market, which was already crowded with legacy banking apps and established neobanks.',
      strategy: 'Implemented a high-velocity "Social-First" growth engine leveraging TikTok and Instagram Reels with high-conversion financial freedom narratives.',
      metrics: ['+120k Monthly Active Users', '15M Impressions Per Quarter', '14% On-Platform Conversion'],
      techStack: ['Predictive Scaling Models', 'Real-time Sentiment Analysis', 'Creator Network Sync']
    },
    'hospitality-in': {
      challenge: 'The Heritage Club sought to reposition its luxury portfolio in India to attract the modern global business elite.',
      strategy: 'LinkedIn-centric executive storytelling combined with "Behind-the-Scenes" premium production on Instagram for lifestyle resonance.',
      metrics: ['92% Quarterly Room Occupancy', '1.8M Targeted C-Suite Reach', '35% Repeat Booking Velocity'],
      techStack: ['B2B Intent Grounding', 'Custom Video Lab Synthesis', 'Regional Multi-City Ops']
    }
  };

  return (
    <div className={`bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header Section */}
      <section className="relative pt-48 pb-32 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
           <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-4">
                <Globe size={14} />
                Global Success Matrix
              </div>
              <h1 className="text-7xl md:text-9xl font-extrabold text-slate-950 mb-16 tracking-[-0.05em] leading-[0.85] uppercase italic">
                {t.portfolio.title}
              </h1>
              <p className="text-2xl md:text-4xl text-slate-400 font-medium leading-relaxed max-w-3xl tracking-tight">
                {t.portfolio.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Masonry-Style Grid */}
      <section className="py-40">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            {t.portfolio.cases.map((project: any, i: number) => {
              const isLarge = i === 0;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  onClick={() => setSelectedCase(project)}
                  className={`${isLarge ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4'} group cursor-pointer`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border border-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
                    />
                    
                    {/* Hover Stats Overlay */}
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/80 transition-all duration-500 flex flex-col justify-end p-12 opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-4 mb-6">
                        <TrendingUp className="text-blue-500" size={24} />
                        <span className="text-3xl font-black text-white tracking-tighter uppercase">{project.impact}</span>
                      </div>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-xs leading-relaxed">
                        Verified growth acceleration via Nexoft Global Intelligent Operations.
                      </p>
                      <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">Case Audit 0{i + 1}</span>
                         <ArrowUpRight className="text-white" size={20} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 px-4">
                    <div className="flex items-center gap-6 mb-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">{project.category}</span>
                       <div className="h-px flex-grow bg-slate-100" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{project.reach}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight group-hover:translate-x-2 transition-transform duration-700 uppercase italic">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 lg:p-20"
          >
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setSelectedCase(null)} />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full max-w-7xl h-[90vh] overflow-hidden relative z-10 rounded-sm shadow-2xl flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-10 right-10 p-5 bg-slate-50 hover:bg-slate-950 hover:text-white transition-all rounded-full z-[210] shadow-xl"
              >
                <X size={24} />
              </button>

              <div className="lg:w-2/5 h-[300px] lg:h-full relative overflow-hidden bg-slate-950 flex-shrink-0">
                <img 
                  src={selectedCase.image} 
                  alt={selectedCase.title} 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent lg:bg-gradient-to-r" />
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Project Snapshot</div>
                   <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none uppercase italic">
                    {selectedCase.title}
                   </h2>
                   <div className="flex gap-4">
                      {['Tier-1', 'Global', 'Enterprise'].map(tag => (
                        <span key={tag} className="px-3 py-1 border border-white/20 text-[9px] font-black text-white/50 uppercase tracking-widest">{tag}</span>
                      ))}
                   </div>
                </div>
              </div>
              
              <div className="flex-grow overflow-y-auto p-12 lg:p-24 bg-white custom-scrollbar">
                <div className="max-w-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                     <div>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-3">
                           <Shield size={14} className="text-blue-600" /> Operational Context
                        </div>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
                          "{caseDetails[selectedCase.id]?.challenge}"
                        </p>
                     </div>
                     <div>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-3">
                           <Zap size={14} className="text-blue-600" /> Strategic Architecture
                        </div>
                        <p className="text-lg text-slate-950 font-black tracking-tight leading-relaxed">
                          {caseDetails[selectedCase.id]?.strategy}
                        </p>
                     </div>
                  </div>

                  <div className="mb-24 pt-16 border-t border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-12">Performance Benchmarks (Verified)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                      {caseDetails[selectedCase.id]?.metrics.map((metric: string, idx: number) => (
                        <div key={idx} className="flex flex-col group">
                          <div className="text-5xl font-black text-slate-950 tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">
                            {metric.split(' ')[0]}
                          </div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            {metric.split(' ').slice(1).join(' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-24 pt-16 border-t border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-10">Nexoft Stack Integration</h4>
                    <div className="flex flex-wrap gap-4">
                       {caseDetails[selectedCase.id]?.techStack.map((tech: string) => (
                         <div key={tech} className="px-6 py-4 bg-slate-50 border border-slate-100 text-[11px] font-black text-slate-900 uppercase tracking-widest hover:border-blue-600 transition-all">
                            {tech}
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <button className="flex-grow py-8 bg-slate-950 text-white font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4">
                      Download Full Technical Audit <ExternalLink size={16} />
                    </button>
                    <button className="px-12 py-8 bg-white border border-slate-200 text-slate-950 font-bold text-[11px] uppercase tracking-[0.3em] hover:border-slate-950 transition-all">
                      Inquire Scale-up
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
