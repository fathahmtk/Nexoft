import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Layout, Settings, FileText, Users, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ExpandableDescription = ({ text, isRTL }: { text: string; isRTL: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Naive but effective sentence splitter for this UI scale
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const hasMore = sentences.length > 2;
  const initialText = hasMore ? sentences.slice(0, 2).join(' ') : text;

  return (
    <div className="mb-16">
      <motion.div
        layout
        initial={false}
        className="text-2xl text-slate-500 leading-relaxed font-medium max-w-2xl relative"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isExpanded ? text : initialText}
          </motion.p>
        </AnimatePresence>
      </motion.div>
      
      {hasMore && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-slate-950 transition-colors group`}
        >
          {isExpanded ? (isRTL ? 'عرض أقل' : 'Read Less') : (isRTL ? 'اقرأ المزيد' : 'Read More')}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </button>
      )}
    </div>
  );
};

const Services = ({ t, language }: any) => {
  const isRTL = language === 'ar';
  const { country = 'us', lang = 'en' } = useParams();

  const iconMap: Record<string, any> = {
    BarChart3: BarChart3,
    Layout: Layout,
    Settings: Settings,
    FileText: FileText,
    Users: Users
  };

  const images = [
    "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <div className="bg-white">
      {/* Editorial Header */}
      <section className="relative pt-48 pb-32 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
           <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
           <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-slate-50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-4">
                <Sparkles size={14} />
                Agency Capabilities
              </div>
              <h1 className="text-7xl md:text-9xl font-extrabold text-slate-950 mb-16 tracking-[-0.04em] leading-[0.85] uppercase italic">
                Strategic <br />Architectures.
              </h1>
              <p className="text-2xl md:text-4xl text-slate-400 font-medium leading-relaxed max-w-3xl tracking-tight">
                {t.services.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Grid - Sophisticated Staggered Layout */}
      <section className="py-40">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-px bg-slate-100 border-y border-slate-100">
            {t.services.list.map((service: any, index: number) => {
              const Icon = iconMap[service.icon] || BarChart3;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1 
                  }}
                  className="group relative bg-white overflow-hidden py-32 px-6 sm:px-20"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Details Column */}
                    <div className={`lg:col-span-7 ${isEven ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-center gap-6 mb-12">
                        <div className="w-20 h-20 bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 rounded-sm">
                           <Icon size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Module 0{index + 1}</div>
                          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Verified Capability</div>
                        </div>
                      </div>
                      
                      <h3 className="text-5xl md:text-7xl font-extrabold text-slate-950 mb-10 tracking-tighter uppercase italic leading-none group-hover:translate-x-2 transition-transform duration-700">
                        {service.title}
                      </h3>
                      
                      <ExpandableDescription text={service.description} isRTL={isRTL} />

                      <Link 
                        to={`/${country}/${lang}/contact`}
                        className="inline-flex items-center gap-6 px-12 py-6 bg-slate-950 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/5"
                      >
                        Initiate Phase 01
                        <ArrowRight size={16} />
                      </Link>
                    </div>

                    {/* Image Column */}
                    <div className={`lg:col-span-5 ${isEven ? 'order-1' : 'order-2'}`}>
                       <div className="img-reveal aspect-[4/5] bg-slate-50 rounded-sm overflow-hidden border border-slate-100/50 shadow-2xl">
                          <img 
                            src={images[index % images.length]} 
                            alt={service.title} 
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]"
                          />
                          <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors duration-700" />
                          <div className="absolute bottom-10 left-10 p-8 bg-white/95 backdrop-blur-md shadow-2xl max-w-[240px]">
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Market Target</div>
                             <div className="text-sm font-bold text-slate-950 uppercase tracking-tighter">GCC / USA / INDIA GRID</div>
                          </div>
                       </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Intel Teaser */}
      <section className="py-40 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
           <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-[10px] font-black text-blue-600 uppercase tracking-widest mb-12">
              <Sparkles size={12} />
              Proprietary Technology
           </div>
           <h2 className="text-5xl md:text-8xl font-extrabold text-slate-950 tracking-[-0.04em] leading-[0.9] uppercase italic mb-16">
              AI-Driven <br />Intelligence.
           </h2>
           <p className="text-2xl text-slate-500 font-medium max-w-3xl mx-auto mb-20 leading-relaxed italic">
             "Our services are augmented by custom-trained neural networks that predict social performance across 8 distinct global markets."
           </p>
           <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              <div className="flex flex-col items-center px-12 py-8 border-l border-slate-200">
                 <div className="text-4xl font-black text-slate-950 tracking-tighter mb-2">310%</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Growth Accelerated</div>
              </div>
              <div className="flex flex-col items-center px-12 py-8 border-l border-slate-200">
                 <div className="text-4xl font-black text-slate-950 tracking-tighter mb-2">24/7</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synchronized Ops</div>
              </div>
              <div className="flex flex-col items-center px-12 py-8 border-l border-slate-200">
                 <div className="text-4xl font-black text-slate-950 tracking-tighter mb-2">99.9%</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy Grounding</div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Services;