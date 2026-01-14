
import React from 'react';
import { motion } from 'framer-motion';
// Added missing Link and useParams imports from react-router-dom to resolve "Cannot find name 'Link'"
import { Link, useParams } from 'react-router-dom';
import { MessageSquare, FileSearch, Rocket, BarChart2, ArrowRight } from 'lucide-react';

const Process = ({ t, language }: any) => {
  const isRTL = language === 'ar';
  // Retrieve country from URL parameters to construct valid multi-region links
  const { country = 'us' } = useParams();
  
  const steps = [
    { 
      id: '01', 
      icon: MessageSquare,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      title: isRTL ? 'مناقشة المتطلبات' : 'Strategic Intake', 
      desc: isRTL ? 'نفهم رؤية علامتك التجارية وأهدافك بدقة من خلال استشارة مكثفة.' : 'We perform a deep dive into your brand vision and specific objectives through intensive consultation and interviews.',
      details: isRTL ? 'تحديد الجمهور المستهدف والمنصات الرئيسية.' : 'Deliverable: Brand Alignment Document'
    },
    { 
      id: '02', 
      icon: FileSearch,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      title: isRTL ? 'النطاق والتسعير' : 'SOW & Architecture', 
      desc: isRTL ? 'نحدد استراتيجية واضحة ونطاق عمل مخصص يناسب ميزانيتك وأهدافك.' : 'We define a clear strategic roadmap and a customized Scope of Work (SOW) engineered for your specific growth targets.',
      details: isRTL ? 'شفافية كاملة في التكاليف والجدول الزمني.' : 'Deliverable: Implementation Roadmap'
    },
    { 
      id: '03', 
      icon: Rocket,
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200',
      title: isRTL ? 'التنفيذ والمراجعة' : 'Phased Execution', 
      desc: isRTL ? 'نطلق حملاتك ونراقب النتائج باستمرار لضمان الجودة العالية.' : 'We launch your integrated campaigns across global grids, maintaining strict quality control and brand monitoring.',
      details: isRTL ? 'إنتاج محتوى متميز وجدولة ذكية.' : 'Deliverable: Live Content Management'
    },
    { 
      id: '04', 
      icon: BarChart2,
      image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200',
      title: isRTL ? 'الدعم والتحسين' : 'Performance Audit', 
      desc: isRTL ? 'نحسن الاستراتيجيات لضمان أقصى درجات النمو المستدام طويل الأمد.' : 'We proactively refine strategies through iterative performance audits to ensure long-term, sustainable market dominance.',
      details: isRTL ? 'تقارير أداء دورية ورؤى قائمة على البيانات.' : 'Deliverable: ROI Intelligence Report'
    },
  ];

  return (
    <div className="bg-white">
      <section className="py-32 border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 block">Our Methodology</div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-slate-950 mb-12 tracking-tight leading-[0.9] uppercase italic">
                Execution <br />Framework.
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                A rigorous, transparent, and results-oriented process designed to transition partners from noise to absolute market authority.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="space-y-px bg-slate-100 border-y border-slate-100 overflow-hidden shadow-2xl">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white py-32 px-10 md:px-24 grid grid-cols-1 lg:grid-cols-12 gap-24 hover:bg-slate-50 transition-all duration-700 group"
              >
                {/* Text Side */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="flex items-center gap-6 mb-12">
                     <span className="text-6xl font-extrabold text-slate-950/5 italic tracking-tighter">{step.id}</span>
                     <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-blue-600 border border-slate-100">
                        <step.icon size={24} strokeWidth={1.5} />
                     </div>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-extrabold text-slate-950 mb-8 tracking-tight uppercase italic">
                    {step.title}
                  </h3>
                  <p className="text-lg text-slate-500 leading-relaxed font-medium mb-12">
                    {step.desc}
                  </p>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 border-l-2 border-blue-600 pl-4 py-1">
                    {step.details}
                  </div>
                </div>

                {/* Image Side */}
                <div className="lg:col-span-6">
                   <div className="img-reveal aspect-video bg-slate-50 rounded-sm overflow-hidden border border-slate-100">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Minimal Background" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-12 tracking-tighter italic uppercase">Ready for Phase 01?</h2>
          <p className="text-slate-400 text-xl mb-16 font-medium leading-relaxed max-w-2xl mx-auto">Schedule your requirement discussion with our global leads and initiate your brand scaling.</p>
          {/* Corrected Link to use the full route structure /:country/:lang/contact */}
          <Link to={`/${country}/${language}/contact`} className="inline-block px-12 py-6 bg-white text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            Initiate Consultation &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Process;
