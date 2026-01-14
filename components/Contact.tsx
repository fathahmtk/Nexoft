
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { submitContactForm } from '../lib/firebase';

const Contact = ({ t, country, language }: any) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Social Media Marketing',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactForm({ 
        ...formState, 
        country, 
        language 
      });
      setIsSuccess(true);
      setFormState({ name: '', email: '', phone: '', service: 'Social Media Marketing', message: '' });
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission error. Please verify your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 block">Global Intake</div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-slate-950 mb-12 tracking-tight leading-[0.9]">
                {t.contact.title}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                Connect with our regional strategy leads to initiate your brand scaling across Global grids.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            {/* Info Side */}
            <div className="lg:col-span-5">
              <div className="space-y-16">
                 <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Partnerships</h3>
                    <p className="text-3xl font-extrabold text-slate-950 tracking-tight">partnerships@nexoft.agency</p>
                 </div>
                 <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Operations</h3>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                      Nexoft operates as a synchronized global network. Our strategy leads are available for consultations across GCC (GST), USA (EST), and IST time zones.
                    </p>
                 </div>
                 <div className="p-8 border border-slate-100 italic text-sm text-slate-400 font-medium leading-relaxed">
                    "{t.legal.disclaimer}"
                 </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-50 p-20 text-center rounded-sm"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-950 mb-6 tracking-tight">Inquiry Received.</h3>
                  <p className="text-slate-500 font-medium mb-12 max-w-sm mx-auto">Our regional lead will review your brief and contact you within 24 business hours.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 hover:text-slate-950 transition-colors"
                  >
                    Initiate Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.contact.name}</label>
                      <input 
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-950 transition-all outline-none font-bold text-slate-950 text-lg placeholder:text-slate-200 placeholder:font-normal"
                        placeholder="Alexander J."
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.contact.email}</label>
                      <input 
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-950 transition-all outline-none font-bold text-slate-950 text-lg placeholder:text-slate-200 placeholder:font-normal"
                        placeholder="corp@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.contact.phone}</label>
                      <input 
                        required
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-950 transition-all outline-none font-bold text-slate-950 text-lg placeholder:text-slate-200 placeholder:font-normal"
                        placeholder="+00 000 000 0000"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.contact.service}</label>
                      <select 
                        value={formState.service}
                        onChange={(e) => setFormState({...formState, service: e.target.value})}
                        className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-950 transition-all outline-none font-bold text-slate-950 text-lg appearance-none cursor-pointer"
                      >
                        {t.services.list.map((s: any) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.contact.message}</label>
                    <textarea 
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-950 transition-all outline-none font-bold text-slate-950 text-lg placeholder:text-slate-200 placeholder:font-normal resize-none"
                      placeholder="Provide a high-level project brief..."
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="group px-12 py-6 bg-slate-950 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-blue-600 transition-all disabled:opacity-30"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <>
                        {t.contact.submit}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
