import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, Globe, Sparkles, Activity, Shield, ChevronRight, Zap, Target, Layers, Cpu, Database, MapPin, Terminal } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const SystemLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logMessages = [
    "INITIATING NEURAL GROUNDING...",
    "FETCHING LIVE MARKET SENTIMENT: DUBAI_NODE_04",
    "RECALIBRATING ROI VECTORS: NY_GRID",
    "ENCRYPTING BRAND ASSETS [AES-256]",
    "SYNCHRONIZING GLOBAL CLOCKS...",
    "PREDICTIVE ANALYSIS COMPLETE: GROWTH_PROBABILITY = 94.2%",
    "OPTIMIZING AD BIDDING LATENCY...",
    "CULTURAL DNA MAPPING: MUMBAI_SECTOR_7",
    "ENTERING PHASE_01_INTAKE_PROTOCOL"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, logMessages[Math.floor(Math.random() * logMessages.length)]];
        return next.slice(-4);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 font-mono text-[9px] text-blue-400 opacity-60">
      {logs.map((log, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-slate-800 font-black">[{new Date().toLocaleTimeString()}]</span>
          <span>{log}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Fix: Making children optional to satisfy TypeScript prop checking when component is used with JSX children
const MouseTilt = ({ children }: { children?: React.ReactNode }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const multiplier = 8;
    setRotateX(((y - centerY) / centerY) * -multiplier);
    setRotateY(((x - centerX) / centerX) * multiplier);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
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

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScaleScroll = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="bg-white" ref={targetRef}>
      {/* --- SECTION 01: NEURAL COMMAND HEADER --- */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-white">
        {/* Soft Professional Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 40, repeat: Infinity }}
            className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-blue-50/50 rounded-full blur-[250px]" 
          />
          <motion.div 
            animate={{ 
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-violet-50/30 rounded-full blur-[200px]" 
          />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 w-full relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
            style={{ y: textY }}
          >
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-12 mb-16 w-full">
              <div className="flex items-center gap-6 text-[11px] font-black tracking-[0.6em] text-slate-400 uppercase">
                <div className="w-24 h-px bg-slate-200" />
                {isRTL ? 'إستراتيجية عالمية للمؤسسات' : 'The Architecture of Influence'}
              </div>
              <div className="flex-grow" />
              <div className="hidden lg:block">
                 <SystemLogs />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-[50px] md:text-[100px] lg:text-[180px] font-extrabold text-slate-950 leading-[0.8] tracking-[-0.08em] mb-24 uppercase italic w-full"
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full items-end">
              <motion.div variants={itemVariants} className="lg:col-span-8">
                <p className="text-2xl md:text-5xl text-slate-400 leading-[1.1] font-medium tracking-tight max-w-4xl italic">
                  {isRTL 
                    ? 'وكالة رائدة في التسويق الاجتماعي تساعد العلامات التجارية النخبوية على التوسع عبر أسواق الهند والولايات المتحدة ودول الخليج.'
                    : 'We architect the digital dominance of elite enterprise brands through high-fidelity creative and neural-strategy across global grids.'}
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="lg:col-span-4 flex items-center justify-end">
                <Link 
                  to={`/${country}/${lang}/contact`} 
                  className="w-full sm:w-auto px-20 py-10 bg-slate-950 text-white font-bold text-[11px] uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-8 group shadow-2xl rounded-sm"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 02: CINEMATIC COMMAND HUB (NEW VISUAL) --- */}
      <section className="relative w-full h-[100vh] overflow-hidden group border-y border-slate-50 cursor-crosshair bg-slate-950">
        <motion.div 
          style={{ y: heroImageY, scale: heroScaleScroll }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2400" 
              alt="Strategic Hub" 
              className="w-full h-full object-cover grayscale brightness-40 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-[4s] cubic-bezier(0.16, 1, 0.3, 1)"
            />
            {/* Split Grid Overlay */}
            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-20">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="border-r border-white/20" />
               ))}
            </div>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 h-full relative flex items-center justify-end pointer-events-none z-20">
          <MouseTilt>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-16 md:p-20 rounded-sm glass-card-dark border-white/20 shadow-3xl pointer-events-auto cursor-default hover:border-blue-500/50 transition-all duration-700 overflow-hidden relative"
              style={{ transform: 'translateZ(100px)' }}
            >
              <div className="absolute top-0 right-0 p-8">
                 <Terminal size={14} className="text-blue-500 animate-pulse" />
              </div>

              <div className="flex items-center gap-6 mb-16">
                <div className="p-6 bg-blue-600/90 text-white rounded-sm shadow-2xl backdrop-blur-md">
                  <TrendingUp size={36} />
                </div>
                <div>
                   <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">Live Efficiency</div>
                   <div className="text-xs font-bold text-white uppercase tracking-widest">Global Grid Node Active</div>
                </div>
              </div>
              
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-[120px] font-black tracking-tighter text-white italic leading-[0.7] group-hover:text-blue-500 transition-colors duration-700">94.8</span>
                <span className="text-5xl font-black text-blue-500/80">%</span>
              </div>
              
              <p className="text-[12px] font-bold text-slate-300 uppercase tracking-[0.3em] leading-relaxed mb-12 opacity-80 italic max-w-sm">
                Real-time growth velocity verified across NY, Dubai, and Mumbai sectors.
              </p>
              
              <div className="pt-10 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Activity size={18} className="text-blue-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em]">Neural Grounding Verified</span>
                  </div>
                  <div className="text-[10px] font-black text-white px-3 py-1 bg-blue-600 rounded-sm">LIVE</div>
              </div>
            </motion.div>
          </MouseTilt>
        </div>
      </section>

      {/* --- SECTION 03: COMMAND NODE STATUS --- */}
      <section className="py-12 bg-white relative overflow-hidden border-b border-slate-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="glass-card rounded-full border border-slate-200/50 py-10 px-12 overflow-hidden relative shadow-2xl">
            <div className="flex whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-32 pr-32"
                  >
                    {[
                      { label: "Network Velocity", value: "Optimal", icon: Zap },
                      { label: "Command Hubs", value: "8 Active", icon: Globe },
                      { label: "System Latency", value: "<150ms", icon: Activity },
                      { label: "Grounding Core", value: "99.9%", icon: Shield },
                      { label: "Market Alpha", value: "Absolute", icon: Target },
                      { label: "Scale Engine", value: "Ready", icon: Cpu }
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-12">
                        <stat.icon size={20} className="text-blue-600" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">{stat.label}</span>
                        <span className="text-2xl font-black text-slate-950 italic tracking-tighter leading-none">{stat.value}</span>
                      </div>
                    ))}
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 04: GLOBAL COMMAND NODES (IMAGE GRID) --- */}
      <section className="py-64 bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="mb-32">
             <div className="text-blue-500 text-[11px] font-black uppercase tracking-[0.6em] mb-14">Global Grid Infrastructure</div>
             <h2 className="text-6xl md:text-9xl font-extrabold text-white tracking-[-0.07em] leading-[0.8] uppercase italic">
               Regional <br />Command.
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/5 border border-white/10 overflow-hidden shadow-3xl">
            {[
              { city: 'Dubai', latency: '42ms', status: 'Optimal', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200' },
              { city: 'New York', latency: '12ms', status: 'Active', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1200' },
              { city: 'Mumbai', latency: '88ms', status: 'Synced', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=1200' }
            ].map((node, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="relative group aspect-[4/5] overflow-hidden"
              >
                <img src={node.img} className="w-full h-full object-cover grayscale brightness-40 group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100 transition-all duration-[2s]" alt={node.city} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />
                
                <div className="absolute inset-x-0 bottom-0 p-12 translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-blue-400">
                         <MapPin size={20} />
                      </div>
                      <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">{node.city}</h3>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm">
                         <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Grid Lag</div>
                         <div className="text-lg font-black text-white italic tracking-tighter">{node.latency}</div>
                      </div>
                      <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm">
                         <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</div>
                         <div className="text-lg font-black text-blue-400 italic tracking-tighter">{node.status}</div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 05: ABSOLUTE CAPABILITY (REFINED) --- */}
      <section className="py-64 bg-slate-50/20 relative border-y border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-end mb-40">
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
                <div className="text-blue-600 text-[11px] font-black uppercase tracking-[0.6em] mb-14">Core Modules</div>
                <h2 className="text-6xl md:text-9xl font-extrabold text-slate-950 tracking-[-0.07em] leading-[0.8] uppercase italic">
                  Absolute <br />Capability.
                </h2>
             </motion.div>
             <div className="lg:pb-12">
                <p className="text-2xl md:text-3xl text-slate-400 font-medium leading-relaxed mb-16 tracking-tight italic">
                   Nexoft synthesizes data intelligence with high-fidelity creative to deliver measurable enterprise dominance.
                </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Intelligence Lab', 
                desc: 'Proprietary grounding engines fetch live market trends and competitor movements with absolute temporal accuracy.', 
                icon: Shield,
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'
              },
              { 
                title: 'Creative Studio', 
                desc: 'Cinematic brand storytelling and high-fidelity visual assets engineered for multi-region resonance.', 
                icon: Sparkles,
                image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1200'
              },
              { 
                title: 'Strategic Growth', 
                desc: 'End-to-end execution of high-conversion funnels focused on long-term brand equity and absolute ROI.', 
                icon: Target,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden min-h-[580px] p-12 lg:p-16 flex flex-col justify-between rounded-sm transition-all duration-700 hover:translate-y-[-8px] bg-white/40 backdrop-blur-[30px] border border-white/30 shadow-[0_8px_32px_rgba(15,23,42,0.05)] hover:shadow-[0_40px_80px_rgba(15,23,42,0.12)] hover:bg-white/60 hover:border-white/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative z-10 h-full flex flex-col">
                   <div className="w-20 h-20 bg-white/40 backdrop-blur-xl border border-white/40 flex items-center justify-center text-slate-950 mb-16 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-2xl transition-all duration-700 shadow-sm rounded-sm">
                      <pillar.icon size={36} strokeWidth={1} />
                   </div>
                   <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-950 mb-8 uppercase italic tracking-tighter leading-none">0{i+1} — {pillar.title}</h3>
                   <p className="text-xl text-slate-600 font-medium leading-relaxed italic mb-12 flex-grow">{pillar.desc}</p>
                   <Link to={`/${country}/${lang}/services`} className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600 group-hover:text-slate-950 transition-colors flex items-center gap-4">
                      Explore Module <ArrowRight size={14} />
                   </Link>
                </div>
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-1000 z-0 pointer-events-none">
                   <img src={pillar.image} className="w-full h-full object-cover scale-150 group-hover:scale-110 transition-transform duration-[3s]" alt={pillar.title} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 06: ARCHITECTURAL VISION (NEW GALLERY) --- */}
      <section className="py-48 bg-white border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
           <div className="mb-24 flex items-end justify-between">
              <div>
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-6">Aesthetic Engineering</div>
                 <h2 className="text-5xl md:text-7xl font-extrabold text-slate-950 uppercase italic tracking-tighter leading-none">Architectural <br />Vision.</h2>
              </div>
              <p className="text-lg text-slate-400 font-medium max-w-sm italic hidden md:block">
                 Synthesizing the future of brand imagery through neural-informed creative direction.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800'
              ].map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -20 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-[4/5] overflow-hidden rounded-sm bg-slate-100 group shadow-lg"
                >
                   <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Vision" />
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* --- SECTION 07: FINAL CTA MONOLITH --- */}
      <section className="py-64 bg-white relative">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="relative overflow-hidden rounded-sm group min-h-[700px] flex flex-col items-center justify-center text-center shadow-[0_120px_240px_-60px_rgba(0,0,0,0.6)]">
             <div className="absolute inset-0 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[8s]">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400" className="w-full h-full object-cover" alt="Scale" />
             </div>
             
             <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[12px] group-hover:bg-slate-950/70 transition-colors duration-1000" />

             <div className="relative z-10 max-w-7xl px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-6 px-12 py-6 bg-white/5 backdrop-blur-3xl border border-white/20 text-[10px] font-black text-white uppercase tracking-[0.6em] mb-24 shadow-3xl rounded-full"
                >
                   <Globe size={20} className="text-blue-400" /> System Online / Intake Phase 01 Open
                </motion.div>
                <h2 className="text-6xl md:text-[150px] font-black text-white tracking-[-0.08em] leading-[0.75] uppercase italic mb-32">
                  Engineer Your <br />Absolute Scale.
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-16">
                   <Link to={`/${country}/${lang}/contact`} className="px-28 py-14 bg-white text-slate-950 font-bold text-[11px] uppercase tracking-[0.6em] hover:bg-blue-600 hover:text-white transition-all shadow-3xl flex items-center justify-center gap-10 group rounded-sm">
                      Initiate Strategic Intake <ChevronRight size={24} className="group-hover:translate-x-6 transition-transform" />
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;