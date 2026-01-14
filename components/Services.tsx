import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Layout, Settings, FileText, Users, ArrowRight, ChevronDown, Cpu, Globe, Target } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ExpandableDescription = ({ text, isRTL }: { text: string; isRTL: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const hasMore = sentences.length > 2;
  const initialText = hasMore ? sentences.slice(0, 2).join(' ') : text;

  return (
    <div className="mb-8 sm:mb-12">
      <motion.div
        layout
        initial={false}
        className="text-lg sm:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl italic"
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
          className={`mt-4 sm:mt-8 inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 hover:text-slate-950 transition-colors group`}
        >
          {isExpanded ? (isRTL ? 'إخفاء' : 'Collapse') : (isRTL ? 'توسيع' : 'Expand')}
          <ChevronDown size={14} className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
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
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200"
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Editorial Header */}
      <section className="relative pt-24 pb-12 sm:pt-48 sm:pb-32 overflow-hidden border-b border-slate-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
               <div className="w-10 sm:w-16 h-px bg-blue-600" />
               <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-blue-600">Capabilities</div>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[100px] lg:text-[160px] font-extrabold text-slate-950 leading-[0.95] sm:leading-[0.8] tracking-[-0.08em] mb-12 sm:mb-20 uppercase italic">
              Absolute <br />
              <span className="text-slate-200">Engineering.</span>
            </h1>
            <p className="text-xl sm:text-3xl md:text-5xl text-slate-400 font-medium leading-[1.2] max-w-4xl tracking-tight italic">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid of Modular Services */}
      <section className="py-20 sm:py-40 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-px bg-slate-100 border border-slate-100 shadow-2xl overflow-hidden">
            {t.services.list.map((service: any, index: number) => {
              const Icon = iconMap[service.icon] || BarChart3;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="group bg-white py-20 sm:py-32 px-6 sm:px-10 lg:px-24 overflow-hidden relative"
                >
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 sm:gap-24 items-center`}>
                    
                    <div className="w-full lg:w-7/12">
                      <div className="flex items-center gap-6 sm:gap-8 mb-10 sm:mb-16">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-950 text-white flex items-center justify-center rounded-sm transition-all duration-700 shadow-xl group-hover:bg-blue-600">
                           <Icon size={32} className="sm:w-[40px] sm:h-[40px]" strokeWidth={1} />
                        </div>
                        <div>
                          <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-1 sm:mb-2">Module 0{index + 1}</div>
                          <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                             <div className="text-[9px] sm:text-xs font-black text-slate-950 uppercase tracking-widest italic">Node Online</div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-4xl sm:text-6xl md:text-[85px] font-extrabold text-slate-950 mb-8 sm:mb-12 tracking-[-0.05em] uppercase italic leading-[1] sm:leading-[0.85]">
                        {service.title}
                      </h3>
                      
                      <ExpandableDescription text={service.description} isRTL={isRTL} />

                      <Link 
                        to={`/${country}/${lang}/contact`}
                        className="inline-flex items-center gap-6 sm:gap-10 px-8 sm:px-16 py-5 sm:py-8 bg-slate-950 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:bg-blue-600 transition-all shadow-xl italic w-full sm:w-auto justify-center"
                      >
                        Initiate Strategy
                        <ArrowRight size={16} className="group-hover:translate-x-4 transition-transform duration-500" />
                      </Link>
                    </div>

                    <div className="w-full lg:w-5/12">
                       <div className="aspect-[4/3] sm:aspect-[4/5] bg-slate-50 rounded-sm overflow-hidden border border-slate-100 relative shadow-xl">
                          <img 
                            src={images[index % images.length]} 
                            alt={service.title} 
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000"
                          />
                          <div className="absolute top-4 right-4 sm:top-10 sm:right-10 flex flex-col items-end gap-1 sm:gap-2">
                             <div className="px-3 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-[7px] sm:text-[9px] font-black text-white uppercase tracking-widest">Global Sector {index + 1}</div>
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

      {/* Methodology Banner */}
      <section className="py-24 sm:py-64 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 text-center">
           <h2 className="text-5xl sm:text-7xl md:text-[140px] font-black text-white tracking-[-0.08em] leading-[0.8] uppercase italic mb-12 sm:mb-20">
              Marketing is <br />
              <span className="text-slate-800">Engineering.</span>
           </h2>
           <p className="text-lg sm:text-2xl md:text-4xl text-slate-400 font-medium max-w-4xl mx-auto mb-16 sm:mb-24 leading-[1.3] italic">
             "Our service framework functions as a neural network of creative and data grounding."
           </p>
           
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16 max-w-5xl mx-auto">
              {[
                { label: 'Grounding', value: '<150ms', icon: Cpu },
                { label: 'Market Nodes', value: '8 Cities', icon: Globe },
                { label: 'Growth Vector', value: 'Absolute', icon: Target }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-4 sm:mb-8">
                      <stat.icon size={24} />
                   </div>
                   <div className="text-2xl sm:text-4xl font-black text-white italic tracking-tighter mb-1">{stat.value}</div>
                   <div className="text-[8px] sm:text-[10px] font-black text-slate-600 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Services;