
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Cpu, Users } from 'lucide-react';

const About = ({ t, language }: any) => {
  const isRTL = language === 'ar';

  return (
    <div className="bg-white">
      {/* Editorial Story Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 block">The Nexoft Thesis</div>
              <h2 className="text-6xl md:text-8xl font-extrabold text-slate-950 mb-12 tracking-tight leading-[0.9] uppercase italic">
                Global Vision. <br />Regional Soul.
              </h2>
              <div className="space-y-8 text-lg text-slate-500 leading-relaxed font-medium">
                <p>
                  {isRTL 
                    ? "نكسوفت هي في المقام الأول شركة تسويق عبر وسائل التواصل الاجتماعي. نحن نتفهم الفروق الدقيقة في الأسواق المختلفة، مما يمنح عملاءنا ميزة تنافسية لا تضاهى."
                    : "Nexoft is a Social Media Marketing-first enterprise. We operate at the intersection of cultural intelligence and data-driven performance. We architect digital legacies for ambitious partners."
                  }
                </p>
                <p>
                  {isRTL 
                    ? "يعتمد نموذجنا على العمل عن بعد أولاً، مما يسمح لنا بجمع أفضل المواهب لخدمة عملائنا بأعلى جودة وكفاءة."
                    : "Our architecture is natively remote-first. We recruit elite specialists from every time zone to ensure 24/7 dominance for our global partners."
                  }
                </p>
                
                <div className="flex gap-16 pt-12 border-t border-slate-100">
                  <div>
                    <div className="text-4xl font-extrabold text-slate-950 tracking-tighter italic">8+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Active Markets</div>
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold text-slate-950 tracking-tighter italic">500M+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Aggregated Reach</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="img-reveal aspect-square bg-slate-50 relative border border-slate-100/50 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Nexoft Strategic Operations" 
                  className="w-full h-full object-cover grayscale-[40%]"
                />
                <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-transparent transition-all" />
                
                <div className="absolute bottom-12 right-12 left-12 p-12 bg-white/95 backdrop-blur-md shadow-2xl">
                   <h3 className="text-3xl font-extrabold tracking-tighter text-slate-950 mb-4 uppercase italic">SYNCHRONIZED.</h3>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                      "Operating across multiple time-zones with absolute zero friction."
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Governance & Core Pillars Section */}
      <section className="py-40 bg-slate-950 text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
            {[
              { 
                icon: Shield, 
                title: 'Data Integrity', 
                desc: 'Enterprise-grade protocols for every brand asset we manage.' 
              },
              { 
                icon: Globe, 
                title: 'Market DNA', 
                desc: 'Local specialists embedded in key global cities for cultural resonance.' 
              },
              { 
                icon: Cpu, 
                title: 'AI Driven', 
                desc: 'Proprietary intelligence tools that predict performance before launch.' 
              },
              { 
                icon: Users, 
                title: 'Elite Network', 
                desc: 'We only partner with Tier-1 partners looking for absolute authority.' 
              }
            ].map((pillar, i) => (
              <div key={i} className="group cursor-default">
                <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <pillar.icon size={28} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold mb-4 tracking-tight uppercase italic">{pillar.title}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-950 tracking-tighter leading-none mb-12 italic uppercase">
            We don't do social media. <br />
            <span className="text-blue-600">We do social dominance.</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto italic">
            "Marketing is an engineering problem. We solve it with creative elegance and global scale."
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
