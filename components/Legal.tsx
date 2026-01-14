
import React from 'react';
import { motion } from 'framer-motion';

interface LegalProps {
  type: 'privacy' | 'terms';
  t: any;
  language: string;
}

const Legal: React.FC<LegalProps> = ({ type, t, language }) => {
  const isRTL = language === 'ar';

  const content = {
    privacy: {
      title: isRTL ? 'سياسة الخصوصية' : 'Privacy Policy',
      sections: [
        {
          head: isRTL ? 'جمع البيانات' : 'Data Collection',
          body: isRTL 
            ? 'نحن نجمع فقط المعلومات الضرورية لبدء استشارات التسويق.' 
            : 'We only collect information necessary to initiate marketing consultations and provide premium services.'
        },
        {
          head: isRTL ? 'استخدام المعلومات' : 'Information Usage',
          body: isRTL 
            ? 'تُستخدم بياناتك لتحسين خدماتنا والتواصل معك بخصوص مشروعك.' 
            : 'Your data is used to optimize our service delivery and communicate regarding your project scope.'
        },
        {
          head: isRTL ? 'أمن البيانات' : 'Data Security',
          body: isRTL 
            ? 'نحن نستخدم تشفير المؤسسات لحماية بيانات عملائنا.' 
            : 'We utilize enterprise-grade encryption to safeguard all client interactions and stored data.'
        }
      ]
    },
    terms: {
      title: isRTL ? 'شروط الخدمة' : 'Terms of Service',
      sections: [
        {
          head: isRTL ? 'نطاق العمل' : 'Scope of Work',
          body: isRTL 
            ? 'يتم تحديد جميع الخدمات في اتفاقية الخدمة الموقعة بشكل منفصل.' 
            : 'All services are defined in a separately signed Service Level Agreement (SLA).'
        },
        {
          head: isRTL ? 'إخلاء المسؤولية الاستشاري' : 'Advisory Disclaimer',
          body: t.legal.disclaimer
        },
        {
          head: isRTL ? 'الملكية الفكرية' : 'Intellectual Property',
          body: isRTL 
            ? 'تظل جميع الأصول الإبداعية ملكاً لنكسوفت حتى يتم السداد الكامل.' 
            : 'All creative assets remain the property of Nexoft until full payment is settled.'
        }
      ]
    }
  };

  const active = content[type];

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6 block">Legal Standards</span>
            <h1 className="text-6xl font-black text-slate-950 mb-10 tracking-tighter uppercase italic">
              {active.title}<span className="text-blue-600">.</span>
            </h1>
            <p className="text-lg text-slate-600 font-bold opacity-60">Last Updated: October 2024</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {active.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-black text-slate-950 mb-4 tracking-tight uppercase italic">{section.head}</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-24 p-8 bg-blue-50 border-l-4 border-blue-600 rounded-r-3xl">
            <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest mb-2">Notice for GCC Clients</h3>
            <p className="text-sm text-blue-800 font-medium leading-relaxed">
              Nexoft operates in compliance with regional data protection standards across Saudi Arabia, UAE, Qatar, and other GCC nations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legal;
