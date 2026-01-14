import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Layout, Settings, FileText, Users, ArrowRight, Sparkles, ChevronDown, Cpu, Globe, Target } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ExpandableDescription = ({ text, isRTL }: { text: string; isRTL: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const hasMore = sentences.length > 2;
  const initialText = hasMore ? sentences.slice(0, 2).join(' ') : text;

  return (
    <div className="mb-12">
      <motion.div
        layout
        initial={false}
        className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl italic"
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
          className={`mt-8 inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 hover:text-slate-950 transition-colors group`}
        >
          {isExpanded ? (isRTL ? 'إخفاء' : 'Collapse Module') : (isRTL ? 'توسيع الوحدة' : 'Expand Module')}
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
    <div className="bg-white">
      {/* Editorial Header */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-slate-50">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-6 mb-12">
               <div className="w-16 h-px bg-blue-600" />
               <div className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600">Enterprise Capabilities</div>
            </div>
            <h1 className="text-[60px] md:text-[100px] lg:text-[160px] font-extrabold text-slate-950 leading-[0.8] tracking-[-0.08em] mb-20 uppercase italic">
              Absolute <br />
              <span className="text-slate-200">Engineering.</span>
            </h1>
            <p className="text-2xl md:text-5xl text-slate-400 font-medium leading-[1.1] max-w-4xl tracking-tight italic">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid of Modular Services */}
      <section className="py-40 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-px bg-slate-100 border border-slate-100 shadow-3xl overflow-hidden">
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
                  className="group bg-white py-32 px-10 lg:px-24 overflow-hidden relative"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    <div className={`lg:col-span-7 ${isEven ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-center gap-8 mb-16">
                        <div className="w-24 h-24 bg-slate-950 text-white flex items-center justify-center rounded-sm group-hover:bg-blue-600 transition-all duration-700 shadow-2xl shadow-slate-950/20">
                           <Icon size={40} strokeWidth={1} />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-2">Module Protocol 0{index + 1}</div>
                          <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                             <div className="text-xs font-black text-slate-950 uppercase tracking-widest italic">Node Online</div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-5xl md:text-[85px] font-extrabold text-slate-950 mb-12 tracking-[-0.05em] uppercase italic leading-[0.85] group-hover:translate-x-4 transition-transform duration-1000">
                        {service.title}
                      </h3>
                      
                      <ExpandableDescription text={service.description} isRTL={isRTL} />

                      <Link 
                        to={`/${country}/${lang}/contact`}
                        className="inline-flex items-center gap-10 px-16 py-8 bg-slate-950 text-white font-black text-[11px] uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-3xl italic"
                      >
                        Initiate Strategy
                        <ArrowRight size={18} className="group-hover:translate-x-4 transition-transform duration-500" />
                      </Link>
                    </div>

                    <div className={`lg:col-span-5 ${isEven ? 'order-1' : 'order-2'}`}>
                       <div className="aspect-[4/5] bg-slate-50 rounded-sm overflow-hidden border border-slate-100 relative group/img shadow-2xl">
                          <img 
                            src={images[index % images.length]} 
                            alt={service.title} 
                            className="w-full h-full object-cover grayscale brightness-90 group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-[3s]"
                          />
                          <div className="absolute inset-0 bg-slate-950/20 group-hover/img:opacity-0 transition-opacity duration-1000" />
                          
                          <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                             <div className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-[9px] font-black text-white uppercase tracking-widest">Global Sector {index + 1}</div>
                             <div className="px-4 py-2 bg-blue-600/80 backdrop-blur-xl text-[9px] font-black text-white uppercase tracking-widest">Verified ROI</div>
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
      <section className="py-64 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[250px]" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 text-center">
           <div className="inline-flex items-center gap-6 mb-20">
              <div className="w-12 h-px bg-blue-600" />
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.8em]">System Architecture</div>
              <div className="w-12 h-px bg-blue-600" />
           </div>
           <h2 className="text-6xl md:text-[140px] font-black text-white tracking-[-0.08em] leading-[0.75] uppercase italic mb-20">
              Marketing is <br />
              <span className="text-slate-800">Engineering.</span>
           </h2>
           <p className="text-2xl md:text-4xl text-slate-400 font-medium max-w-4xl mx-auto mb-24 leading-[1.2] italic">
             "Our service framework is designed to function as a neural network of high-fidelity creative and data grounding."
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
              {[
                { label: 'Grounding Latency', value: '<150ms', icon: Cpu },
                { label: 'Market Nodes', value: '8 Cities', icon: Globe },
                { label: 'Growth Vector', value: 'Absolute', icon: Target }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                   <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-8">
                      <stat.icon size={28} />
                   </div>
                   <div className="text-4xl font-black text-white italic tracking-tighter mb-2">{stat.value}</div>
                   <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Services;