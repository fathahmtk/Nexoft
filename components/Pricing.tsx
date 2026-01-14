import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, ArrowRight, ShieldCheck, Globe, Activity, Zap } from 'lucide-react';
import { COUNTRIES } from '../constants';
import { Link, useParams } from 'react-router-dom';

const Pricing = ({ t, country, language }: any) => {
  const isRTL = language === 'ar';
  const { lang = 'en' } = useParams();
  const selectedCountry = COUNTRIES.find(c => c.code === country) || COUNTRIES[1];
  const symbol = selectedCountry.symbol;
  const isIndia = country === 'IN';

  // Premium Tiered Pricing
  const prices = isIndia ? {
    smm: { starter: '45,000', growth: '85,000', authority: '1,50,000' },
    web: '1,20,000',
    guidance: { hour: '4,500', monthly: '35,000' }
  } : {
    smm: { starter: '1,450', growth: '2,800', authority: '5,500' },
    web: '4,200',
    guidance: { hour: '150', monthly: '1,200' }
  };

  const plans = [
    {
      id: 'starter',
      name: t.pricing.plans.starter,
      price: prices.smm.starter,
      description: isRTL ? 'مثالي للعلامات التجارية الناشئة التي تسعى لبناء تواجد قوي.' : 'Precision entry for emerging brands establishing a baseline of market authority.',
      features: t.pricing.plans.features.starter
    },
    {
      id: 'growth',
      name: t.pricing.plans.growth,
      price: prices.smm.growth,
      description: isRTL ? 'باقة النمو المتميزة للشركات التي تهدف إلى السيطرة على السوق.' : 'Aggressive market capture designed for established entities scaling with velocity.',
      features: t.pricing.plans.features.growth,
      popular: true
    },
    {
      id: 'authority',
      name: t.pricing.plans.authority,
      price: prices.smm.authority,
      description: isRTL ? 'الحل الشامل للمؤسسات العالمية التي تتطلب تغطية كاملة.' : 'Full-spectrum dominance for global enterprises requiring absolute industry mindshare.',
      features: t.pricing.plans.features.authority
    }
  ];

  return (
    <div className={`bg-white min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Editorial Header */}
      <section className="relative pt-48 pb-32 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="absolute top-[10%] left-[30%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-4">
                <ShieldCheck size={14} />
                Verified Tiered Investment
              </div>
              <h1 className="text-7xl md:text-9xl font-extrabold text-slate-950 mb-16 tracking-[-0.04em] leading-[0.85] uppercase italic">
                {t.pricing.title}
              </h1>
              <p className="text-2xl md:text-4xl text-slate-400 font-medium leading-relaxed max-w-3xl tracking-tight">
                {t.pricing.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Pricing Matrix */}
      <section className="py-40">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 mb-40 overflow-hidden shadow-2xl">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`relative bg-white p-16 lg:p-24 flex flex-col h-full group hover:bg-slate-50 transition-colors duration-700 ${
                  plan.popular ? 'ring-4 ring-blue-600 ring-inset z-10' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-12 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-4 shadow-xl">
                    Agency Selection
                  </div>
                )}
                
                <div className="mb-16">
                  <div className="text-[10px] font-black text-slate-300 mb-8 tracking-[0.4em] uppercase border-b border-slate-100 pb-4 inline-block">
                    {plan.name} Package
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-2xl font-black text-slate-400">{symbol}</span>
                    <span className="text-6xl md:text-8xl font-black tracking-tighter text-slate-950 italic">{plan.price}</span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">/ mo</span>
                  </div>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-6">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-grow space-y-6 mb-16">
                   {plan.features.map((feature: string, i: number) => (
                     <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-950 uppercase tracking-widest">
                       <Check size={16} className="text-blue-600" />
                       {feature}
                     </div>
                   ))}
                </div>

                <Link 
                  to={`/${country?.toLowerCase()}/${lang}/contact`}
                  className={`w-full py-8 text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${
                    plan.popular ? 'bg-blue-600 text-white hover:bg-slate-950' : 'bg-slate-950 text-white hover:bg-blue-600'
                  }`}
                >
                  Initiate Retainer <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Add-on Menu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="p-16 border border-slate-100 bg-slate-50 relative overflow-hidden group">
               <Zap className="absolute -top-10 -right-10 text-slate-200 opacity-20 w-48 h-48" />
               <div className="relative z-10">
                 <div className="text-[10px] font-black text-blue-600 mb-8 tracking-[0.4em] uppercase">Web Production</div>
                 <h3 className="text-4xl font-black text-slate-950 mb-6 tracking-tighter uppercase italic leading-none">Global Web <br />Architectures.</h3>
                 <p className="text-lg text-slate-500 font-medium mb-12 max-w-sm">High-performance digital flagships optimized for multi-currency conversion.</p>
                 <div className="flex items-baseline gap-2 mb-12">
                   <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{t.pricing.startingFrom}</span>
                   <span className="text-4xl font-black text-slate-950 tracking-tighter italic">{symbol}{prices.web}</span>
                 </div>
                 <Link to={`/${country?.toLowerCase()}/${lang}/contact`} className="text-[11px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-3 hover:text-slate-950 transition-colors">
                   Request Build Specs <ArrowRight size={14} />
                 </Link>
               </div>
            </div>

            <div className="p-16 border border-slate-100 bg-white relative overflow-hidden group">
               <Activity className="absolute -top-10 -right-10 text-slate-200 opacity-20 w-48 h-48" />
               <div className="relative z-10">
                 <div className="text-[10px] font-black text-blue-600 mb-8 tracking-[0.4em] uppercase">Advisory Support</div>
                 <h3 className="text-4xl font-black text-slate-950 mb-6 tracking-tighter uppercase italic leading-none">Process & Ops <br />Guidance.</h3>
                 <p className="text-lg text-slate-500 font-medium mb-12 max-w-sm">Specialized guidance for scaling internal marketing operations and finance workflows.</p>
                 <div className="flex items-baseline gap-2 mb-12">
                   <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{t.pricing.startingFrom}</span>
                   <span className="text-4xl font-black text-slate-950 tracking-tighter italic">{symbol}{prices.guidance.hour}</span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ hr</span>
                 </div>
                 <Link to={`/${country?.toLowerCase()}/${lang}/contact`} className="text-[11px] font-black uppercase tracking-widest text-slate-950 flex items-center gap-3 hover:text-blue-600 transition-all">
                   Book Consulting Block <ArrowRight size={14} />
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Disclosure Section */}
      <section className="py-40 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
               <div className="flex items-center gap-4 mb-10">
                  <Globe className="text-blue-600" size={32} />
                  <div className="h-px flex-grow bg-slate-200" />
               </div>
               <h3 className="text-xl font-black text-slate-950 tracking-widest uppercase mb-6">Regional Context</h3>
               <p className="text-slate-500 font-medium leading-relaxed italic">
                 {t.pricing.note}
               </p>
            </div>
            <div className="lg:col-span-8">
               <div className="p-12 border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center gap-4 mb-8">
                    <Info className="text-blue-600" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Governance & Compliance</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed uppercase tracking-wider italic opacity-70">
                    {t.legal.disclaimer}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;