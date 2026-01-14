import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, ArrowRight, ShieldCheck, Globe, Activity } from 'lucide-react';
import { COUNTRIES } from '../constants';
import { Link, useParams } from 'react-router-dom';

const Pricing = ({ t, country, language }: any) => {
  const isRTL = language === 'ar';
  const { lang = 'en' } = useParams();
  const selectedCountry = COUNTRIES.find(c => c.code === country) || COUNTRIES[1];
  const symbol = selectedCountry.symbol;
  const isIndia = country === 'IN';

  const prices = isIndia ? {
    smm: { starter: '6,000', growth: '12,000', authority: '20,000' },
    web: '15,000',
    guidance: { hour: '1,500', monthly: '5,000' }
  } : {
    smm: { starter: '149', growth: '299', authority: '599' },
    web: '799',
    guidance: { hour: '49', monthly: '199' }
  };

  const plans = [
    {
      id: 'starter',
      name: t.pricing.plans.starter,
      price: prices.smm.starter,
      description: isRTL ? 'إعداد الحساب والتواجد الأساسي.' : 'Core setup and consistent professional baseline.',
      features: t.pricing.plans.features.starter
    },
    {
      id: 'growth',
      name: t.pricing.plans.growth,
      price: prices.smm.growth,
      description: isRTL ? 'توسع استراتيجي وزيادة في المحتوى.' : 'Strategic expansion with high-frequency content production.',
      features: t.pricing.plans.features.growth,
      popular: true
    },
    {
      id: 'authority',
      name: t.pricing.plans.authority,
      price: prices.smm.authority,
      description: isRTL ? 'سيطرة كاملة على السوق وحضور متميز.' : 'Absolute market dominance and high-authority branding.',
      features: t.pricing.plans.features.authority
    }
  ];

  return (
    <div className={`bg-white min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <section className="relative pt-40 pb-20 border-b border-slate-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600 mb-8 flex items-center gap-4">
              <ShieldCheck size={14} />
              Transparent Investment
            </div>
            <h1 className="text-6xl md:text-9xl font-extrabold text-slate-950 mb-12 tracking-[-0.05em] leading-[0.85] uppercase italic">
              {t.pricing.title}
            </h1>
            <p className="text-xl md:text-4xl text-slate-400 font-medium leading-relaxed max-w-4xl tracking-tight italic">
              {t.pricing.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 mb-24 overflow-hidden shadow-2xl">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white p-10 sm:p-20 flex flex-col h-full transition-all duration-700 ${
                  plan.popular ? 'ring-2 ring-blue-600 ring-inset z-10 bg-slate-50/30' : ''
                }`}
              >
                <div className="mb-12">
                  <div className="text-[10px] font-black text-slate-300 mb-6 tracking-[0.4em] uppercase border-b border-slate-100 pb-3 inline-block">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black text-slate-400">{symbol}</span>
                    <span className="text-6xl sm:text-8xl font-black tracking-tighter text-slate-950 italic">{plan.price}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">/ mo</span>
                  </div>
                  <p className="text-lg text-slate-500 font-medium italic">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-grow space-y-6 mb-12">
                   {plan.features.map((feature: string, i: number) => (
                     <div key={i} className="flex items-center gap-4 text-xs font-bold text-slate-950 uppercase tracking-widest">
                       <Check size={14} className="text-blue-600 flex-shrink-0" />
                       {feature}
                     </div>
                   ))}
                </div>

                <Link 
                  to={`/${country?.toLowerCase()}/${lang}/contact`}
                  className={`w-full py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 italic rounded-sm ${
                    plan.popular ? 'bg-blue-600 text-white hover:bg-slate-950 shadow-xl shadow-blue-500/20' : 'bg-slate-950 text-white hover:bg-blue-600 shadow-xl'
                  }`}
                >
                  Initiate Inquiry <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
                </Link>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="p-10 sm:p-16 bg-slate-50 border border-slate-100 rounded-sm">
               <div className="text-[10px] font-black text-blue-600 mb-8 tracking-[0.4em] uppercase">Web & Design</div>
               <h3 className="text-3xl sm:text-4xl font-black text-slate-950 mb-6 tracking-tighter uppercase italic leading-none">Design & <br />Development.</h3>
               <p className="text-lg text-slate-500 font-medium mb-10 max-w-sm italic">Clean, business-focused websites and brand-aligned creatives.</p>
               <div className="flex items-baseline gap-3 mb-10">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.pricing.startingFrom}</span>
                 <span className="text-4xl font-black text-slate-950 tracking-tighter italic">{symbol}{prices.web}</span>
               </div>
               <Link to={`/${country?.toLowerCase()}/${lang}/contact`} className="text-[11px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-3 italic">
                 Get Design Quote <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
               </Link>
            </div>

            <div className="p-10 sm:p-16 bg-white border border-slate-100 rounded-sm shadow-xl">
               <div className="text-[10px] font-black text-blue-600 mb-8 tracking-[0.4em] uppercase">Business Advisory</div>
               <h3 className="text-3xl sm:text-4xl font-black text-slate-950 mb-6 tracking-tighter uppercase italic leading-none">Guidance & <br />Assistance.</h3>
               <p className="text-lg text-slate-500 font-medium mb-10 max-w-sm italic">Operational support and practical process guidance for growing teams.</p>
               <div className="flex items-baseline gap-3 mb-10">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.pricing.startingFrom}</span>
                 <span className="text-4xl font-black text-slate-950 tracking-tighter italic">{symbol}{prices.guidance.hour}</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ hr</span>
               </div>
               <Link to={`/${country?.toLowerCase()}/${lang}/contact`} className="text-[11px] font-black uppercase tracking-widest text-slate-950 flex items-center gap-3 italic">
                 Book Consultation <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
            <Globe className="text-blue-600 flex-shrink-0" size={32} />
            <div className="max-w-4xl">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Compliance & Advisory Context</p>
               <p className="text-sm sm:text-lg text-slate-500 font-medium leading-relaxed italic uppercase tracking-wider opacity-80">
                 {t.legal.disclaimer}
               </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;