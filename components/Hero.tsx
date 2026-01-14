import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, TrendingUp, Activity, Zap, Globe, Shield } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const Hero = ({ t, language }: any) => {
  const isRTL = language === 'ar';
  const { country = 'us', lang = 'en' } = useParams();
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroScaleScroll = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className={`bg-white overflow-x-hidden ${isRTL ? 'rtl' : 'ltr'}`} ref={targetRef}>
      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-16 sm:pt-48 sm:pb-32 overflow-hidden bg-white">
        {/* Refined Professional Background Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Softer Muted Sky Blue */}
          <div className="absolute top-[-15%] left-[-5%] w-[80%] h-[90%] bg-sky-50/40 rounded-full blur-[150px] opacity-60" />
          {/* Subtle Muted Indigo/Purple */}
          <div className="absolute top-[5%] right-[-15%] w-[70%] h-[80%] bg-indigo-50/30 rounded-full blur-[160px] opacity-50" />
          {/* Light Slate Gray Haze */}
          <div className="absolute bottom-[-15%] left-[10%] w-[90%] h-[50%] bg-slate-50/50 rounded-full blur-[120px] opacity-70" />
          {/* Minimal Soft Gray Depth */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gray-50/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 w-full relative z-10">
          <motion.div initial="hidden" animate="visible" className="flex flex-col items-start">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10 sm:mb-16">
              <div className="w-10 sm:w-20 h-px bg-blue-600" />
              <div className="text-[10px] sm:text-[11px] font-black tracking-[0.4em] text-blue-600 uppercase">
                {isRTL ? 'تسويق اجتماعي استراتيجي' : 'Strategic Growth Protocol'}
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-[40px] sm:text-7xl md:text-9xl lg:text-[140px] font-extrabold text-slate-950 leading-[1.0] sm:leading-[0.85] tracking-[-0.05em] mb-12 sm:mb-24 uppercase italic w-full break-words mobile-tight-leading"
            >
              {isRTL ? (
                <>
                  <span className="block">بناء العلامة.</span>
                  <span className="block text-slate-200">بذكاء استراتيجي.</span>
                </>
              ) : (
                <>
                  <span className="block">Grow Your Brand.</span>
                  <span className="block text-slate-200">With Strategy.</span>
                </>
              )}
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-20 w-full items-end">
              <motion.div variants={itemVariants} className="lg:col-span-8">
                <p className="text-lg sm:text-3xl md:text-5xl text-slate-400 leading-[1.3] font-medium tracking-tight max-w-4xl italic">
                  {t.hero.subtitle}
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="lg:col-span-4 w-full">
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                  <Link 
                    to={`/${country}/${lang}/contact`} 
                    className="w-full px-8 py-5 sm:py-8 bg-slate-950 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group shadow-2xl rounded-sm italic"
                  >
                    {t.hero.ctaPrimary}
                    <ArrowRight className={`${isRTL ? 'rotate-180' : ''} w-4 h-4 group-hover:translate-x-2 transition-transform`} />
                  </Link>
                  <Link 
                    to={`/${country}/${lang}/pricing`} 
                    className="w-full px-8 py-5 sm:py-8 border border-slate-200 text-slate-950 font-bold text-[10px] uppercase tracking-[0.3em] hover:border-slate-950 transition-all flex items-center justify-center rounded-sm italic"
                  >
                    {t.nav.pricing}
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CINEMATIC SECTION --- */}
      <section className="relative w-full h-[50vh] sm:h-[80vh] overflow-hidden bg-slate-950 border-y border-slate-900">
        <motion.div style={{ y: heroImageY, scale: heroScaleScroll }} className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2400" 
            alt="Strategic Workspace" 
            className="w-full h-full object-cover grayscale brightness-[0.3]"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 h-full relative flex items-center justify-center sm:justify-end z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-16 rounded-sm glass-card-dark border-white/10 shadow-3xl w-full max-w-[320px] sm:max-w-md"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-blue-600 text-white rounded-sm">
                <TrendingUp size={24} />
              </div>
              <div>
                 <div className="text-[7px] sm:text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">Live Efficiency</div>
                 <div className="text-[9px] sm:text-xs font-bold text-white uppercase tracking-widest">Global Node Active</div>
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-6xl sm:text-[100px] font-black tracking-tighter text-white italic leading-none">94.8</span>
              <span className="text-2xl sm:text-4xl font-black text-blue-500/80">%</span>
            </div>
            
            <p className="text-[9px] sm:text-[12px] font-bold text-slate-300 uppercase tracking-[0.2em] leading-relaxed mb-10 opacity-80 italic">
              Social engagement velocity verified across India, GCC, and USA sectors.
            </p>
            
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity size={12} className="text-blue-500" />
                  <span className="text-[7px] sm:text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Grounding Verified</span>
                </div>
                <div className="text-[8px] sm:text-[10px] font-black text-white px-2 py-1 bg-blue-600 rounded-sm">LIVE</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STATUS BAR --- */}
      <section className="py-6 sm:py-10 bg-white overflow-hidden border-b border-slate-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="glass-card rounded-full border border-slate-100 py-4 sm:py-8 px-8 sm:px-12 overflow-hidden">
            <div className="flex whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-16 sm:gap-32 pr-16 sm:pr-32"
                  >
                    {[
                      { label: "Velocity", value: "Optimal", icon: Zap },
                      { label: "Nodes", value: "8 Online", icon: Globe },
                      { label: "Grounding", value: "99.9%", icon: Shield }
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-6 sm:gap-10">
                        <stat.icon size={16} className="text-blue-600" />
                        <span className="text-[7px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{stat.label}</span>
                        <span className="text-lg sm:text-2xl font-black text-slate-950 italic tracking-tighter leading-none">{stat.value}</span>
                      </div>
                    ))}
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;