import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, TrendingUp, Globe, Activity, Shield, ChevronRight, Zap, Target, Cpu, MapPin, Terminal } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const SystemLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logMessages = [
    "INITIATING NEURAL GROUNDING...",
    "FETCHING LIVE MARKET SENTIMENT: DUBAI_NODE_04",
    "RECALIBRATING ROI VECTORS: NY_GRID",
    "ENCRYPTING BRAND ASSETS [AES-256]",
    "SYNCHRONIZING GLOBAL CLOCKS...",
    "PREDICTIVE ANALYSIS COMPLETE: GROWTH = 94.2%",
    "OPTIMIZING AD BIDDING LATENCY...",
    "CULTURAL DNA MAPPING: MUMBAI_SECTOR_7",
    "ENTERING PHASE_01_INTAKE_PROTOCOL"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, logMessages[Math.floor(Math.random() * logMessages.length)]];
        return next.slice(-3);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 font-mono text-[8px] sm:text-[9px] text-blue-400 opacity-60">
      {logs.map((log, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <span className="text-slate-800 font-black">[{new Date().toLocaleTimeString()}]</span>
          <span>{log}</span>
        </motion.div>
      ))}
    </div>
  );
};

const MouseTilt = ({ children }: { children?: React.ReactNode }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -5);
    setRotateY(((x - centerX) / centerX) * 5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

const Hero = ({ t, language }: any) => {
  const isRTL = language === 'ar';
  const { country = 'us', lang = 'en' } = useParams();
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroScaleScroll = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-white overflow-x-hidden" ref={targetRef}>
      {/* --- SECTION 01: NEURAL COMMAND HEADER --- */}
      <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-blue-50/30 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 w-full relative z-10">
          <motion.div initial="hidden" animate="visible" className="flex flex-col items-start">
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 mb-12 sm:mb-16 w-full">
              <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-black tracking-[0.4em] sm:tracking-[0.6em] text-slate-400 uppercase">
                <div className="w-12 sm:w-24 h-px bg-slate-200" />
                {isRTL ? 'إستراتيجية عالمية للمؤسسات' : 'The Architecture of Influence'}
              </div>
              <div className="flex-grow" />
              <div className="hidden sm:block">
                 <SystemLogs />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-9xl lg:text-[150px] font-extrabold text-slate-950 leading-[0.9] sm:leading-[0.8] tracking-[-0.04em] sm:tracking-[-0.08em] mb-12 sm:mb-24 uppercase italic w-full"
            >
              {isRTL ? (
                <>
                  <span className="block">استراتيجية عالمية.</span>
                  <span className="block text-slate-200">تنفيذ مؤسسي.</span>
                </>
              ) : (
                <>
                  <span className="block">Global Strategy.</span>
                  <span className="block text-slate-200">Absolute Scale.</span>
                </>
              )}
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 w-full items-end">
              <motion.div variants={itemVariants} className="lg:col-span-8">
                <p className="text-xl sm:text-3xl md:text-5xl text-slate-400 leading-[1.2] font-medium tracking-tight max-w-4xl italic">
                  {isRTL 
                    ? 'وكالة رائدة في التسويق الاجتماعي تساعد العلامات التجارية النخبوية على التوسع عبر أسواق الهند والولايات المتحدة ودول الخليج.'
                    : 'We architect digital dominance for elite enterprise brands through high-fidelity creative and neural-strategy across global grids.'}
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="lg:col-span-4 flex items-center justify-start lg:justify-end">
                <Link 
                  to={`/${country}/${lang}/contact`} 
                  className="w-full sm:w-auto px-10 sm:px-20 py-6 sm:py-10 bg-slate-950 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-6 sm:gap-8 group shadow-2xl rounded-sm"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 02: CINEMATIC COMMAND HUB --- */}
      <section className="relative w-full h-[60vh] sm:h-screen overflow-hidden group border-y border-slate-50 cursor-crosshair bg-slate-950">
        <motion.div style={{ y: heroImageY, scale: heroScaleScroll }} className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2400" 
            alt="Strategic Hub" 
            className="w-full h-full object-cover grayscale brightness-40 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-1000"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 h-full relative flex items-center justify-center sm:justify-end pointer-events-none z-20">
          <MouseTilt>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 sm:p-16 md:p-20 rounded-sm glass-card-dark border-white/20 shadow-3xl pointer-events-auto cursor-default transition-all duration-700 max-w-sm sm:max-w-md"
            >
              <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-16">
                <div className="p-4 sm:p-6 bg-blue-600/90 text-white rounded-sm shadow-2xl">
                  <TrendingUp size={24} className="sm:w-9 sm:h-9" />
                </div>
                <div>
                   <div className="text-[8px] sm:text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">Live Efficiency</div>
                   <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest">Global Grid Node Active</div>
                </div>
              </div>
              
              <div className="flex items-baseline gap-2 sm:gap-4 mb-6 sm:mb-10">
                <span className="text-7xl sm:text-[100px] md:text-[120px] font-black tracking-tighter text-white italic leading-[0.7] group-hover:text-blue-500 transition-colors">94.8</span>
                <span className="text-3xl sm:text-5xl font-black text-blue-500/80">%</span>
              </div>
              
              <p className="text-[10px] sm:text-[12px] font-bold text-slate-300 uppercase tracking-[0.2em] sm:tracking-[0.3em] leading-relaxed mb-8 sm:mb-12 opacity-80 italic">
                Real-time growth velocity verified across NY, Dubai, and Mumbai sectors.
              </p>
              
              <div className="pt-6 sm:pt-10 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Activity size={14} className="text-blue-500 sm:w-5 sm:h-5" />
                    <span className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] sm:tracking-[0.5em]">Neural Grounding Verified</span>
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-black text-white px-2 sm:px-3 py-1 bg-blue-600 rounded-sm">LIVE</div>
              </div>
            </motion.div>
          </MouseTilt>
        </div>
      </section>

      {/* --- SECTION 03: COMMAND NODE STATUS --- */}
      <section className="py-8 sm:py-12 bg-white relative overflow-hidden border-b border-slate-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="glass-card rounded-full border border-slate-200/50 py-6 sm:py-10 px-8 sm:px-12 overflow-hidden relative shadow-2xl">
            <div className="flex whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-16 sm:gap-32 pr-16 sm:pr-32"
                  >
                    {[
                      { label: "Velocity", value: "Optimal", icon: Zap },
                      { label: "Nodes", value: "8 Active", icon: Globe },
                      { label: "Latency", value: "<150ms", icon: Activity },
                      { label: "Grounding", value: "99.9%", icon: Shield }
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-6 sm:gap-12">
                        <stat.icon size={16} className="text-blue-600 sm:w-5 sm:h-5" />
                        <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] sm:tracking-[0.6em]">{stat.label}</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-950 italic tracking-tighter leading-none">{stat.value}</span>
                      </div>
                    ))}
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 04: ABSOLUTE CAPABILITY --- */}
      <section className="py-24 sm:py-64 bg-slate-50/20 relative border-y border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-32 items-end mb-16 sm:mb-40">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="text-blue-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] mb-6 sm:mb-14">Core Modules</div>
                <h2 className="text-5xl sm:text-7xl md:text-9xl font-extrabold text-slate-950 tracking-[-0.05em] leading-[0.9] uppercase italic">
                  Absolute <br />Capability.
                </h2>
             </motion.div>
             <div className="lg:pb-12">
                <p className="text-lg sm:text-2xl md:text-3xl text-slate-400 font-medium leading-relaxed tracking-tight italic">
                   Nexoft synthesizes intelligence with high-fidelity creative to deliver measurable enterprise dominance.
                </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { title: 'Intelligence', icon: Shield, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200' },
              { title: 'Creative', icon: Activity, image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1200' },
              { title: 'Growth', icon: Target, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200' }
            ].map((pillar, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden p-8 sm:p-16 flex flex-col justify-between rounded-sm transition-all duration-700 bg-white border border-slate-100 shadow-xl"
              >
                <div className="relative z-10">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-950 mb-8 sm:mb-16 rounded-sm">
                      <pillar.icon size={24} />
                   </div>
                   <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mb-4 sm:mb-8 uppercase italic tracking-tighter leading-none">{pillar.title}</h3>
                   <Link to={`/${country}/${lang}/services`} className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 flex items-center gap-3">
                      Explore <ArrowRight size={12} />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;