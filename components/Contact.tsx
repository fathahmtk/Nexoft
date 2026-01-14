import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Added missing ChevronDown import to resolve error on line 186
import { Send, CheckCircle, Loader2, ArrowRight, ShieldCheck, Terminal, Activity, Globe, ChevronDown } from 'lucide-react';
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
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-slate-50">
        <div className="absolute inset-0 pointer-events-none opacity-5">
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
               <div className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600">Phase 01: Intake</div>
            </div>
            <h1 className="text-[60px] md:text-[100px] lg:text-[160px] font-extrabold text-slate-950 leading-[0.8] tracking-[-0.08em] mb-20 uppercase italic">
              Initiate <br />
              <span className="text-slate-200">Partnership.</span>
            </h1>
            <p className="text-2xl md:text-5xl text-slate-400 font-medium leading-[1.1] max-w-4xl tracking-tight italic">
              Connect with our regional strategy nodes to scale your brand across Global grids.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-40">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Info Panel */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-20">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Node Communication</h3>
                    <p className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-[-0.04em] uppercase italic">partnerships@<br />nexoft.agency</p>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-12">
                    <div className="p-10 bg-slate-50 border border-slate-100 rounded-sm group hover:border-blue-600 transition-all duration-700">
                       <div className="flex items-center gap-4 mb-6">
                          <Activity className="text-blue-600" size={20} />
                          <span className="text-[10px] font-black text-slate-950 uppercase tracking-widest">Regional Ops</span>
                       </div>
                       <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                         Nexoft operates as a synchronized global network. Our strategy leads are active across GCC, USA, and IST time zones.
                       </p>
                    </div>
                    
                    <div className="p-10 bg-slate-950 text-white rounded-sm shadow-2xl relative overflow-hidden group">
                       <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                       <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                             <ShieldCheck className="text-blue-500" size={20} />
                             <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Compliance Node</span>
                          </div>
                          <p className="text-sm font-black text-slate-400 leading-relaxed uppercase tracking-wider italic opacity-70">
                            {t.legal.disclaimer}
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-8">
                    <Globe size={24} className="text-slate-200" />
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">8 Hubs Online</div>
                 </div>
              </div>
            </div>

            {/* Terminal Intake Form */}
            <div className="lg:col-span-7">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-50 p-24 text-center rounded-sm border border-slate-100 shadow-3xl flex flex-col items-center justify-center min-h-[700px]"
                >
                  <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mb-12 shadow-2xl shadow-blue-600/30">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-5xl font-black text-slate-950 mb-8 tracking-tighter uppercase italic">Directive Received.</h3>
                  <p className="text-xl text-slate-500 font-medium mb-16 max-w-sm italic">Our regional lead will review your strategic brief and initiate contact within 24 business hours.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-12 py-6 border border-slate-950 text-slate-950 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-950 hover:text-white transition-all italic"
                  >
                    Initiate Secondary Intake
                  </button>
                </motion.div>
              ) : (
                <div className="p-10 md:p-20 bg-white border border-slate-100 shadow-3xl rounded-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8">
                     <Terminal size={18} className="text-slate-100 group-hover:text-blue-600 transition-colors" />
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{t.contact.name}</label>
                        <input 
                          required
                          type="text"
                          value={formState.name}
                          onChange={(e) => setFormState({...formState, name: e.target.value})}
                          className="w-full py-4 bg-transparent border-b-2 border-slate-100 focus:border-blue-600 transition-all outline-none font-black text-slate-950 text-2xl placeholder:text-slate-100 uppercase italic tracking-tighter"
                          placeholder="Node Lead Name"
                        />
                      </div>
                      <div className="space-y-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{t.contact.email}</label>
                        <input 
                          required
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({...formState, email: e.target.value})}
                          className="w-full py-4 bg-transparent border-b-2 border-slate-100 focus:border-blue-600 transition-all outline-none font-black text-slate-950 text-2xl placeholder:text-slate-100 uppercase italic tracking-tighter"
                          placeholder="Corporate Link"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{t.contact.phone}</label>
                        <input 
                          required
                          type="tel"
                          value={formState.phone}
                          onChange={(e) => setFormState({...formState, phone: e.target.value})}
                          className="w-full py-4 bg-transparent border-b-2 border-slate-100 focus:border-blue-600 transition-all outline-none font-black text-slate-950 text-2xl placeholder:text-slate-100 uppercase italic tracking-tighter"
                          placeholder="+000 000 000"
                        />
                      </div>
                      <div className="space-y-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{t.contact.service}</label>
                        <div className="relative">
                          <select 
                            value={formState.service}
                            onChange={(e) => setFormState({...formState, service: e.target.value})}
                            className="w-full py-4 bg-transparent border-b-2 border-slate-100 focus:border-blue-600 transition-all outline-none font-black text-slate-950 text-2xl appearance-none cursor-pointer uppercase italic tracking-tighter"
                          >
                            {t.services.list.map((s: any) => (
                              <option key={s.id} value={s.title}>{s.title}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={24} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{t.contact.message}</label>
                      <textarea 
                        rows={5}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                        className="w-full py-6 bg-slate-50 px-8 border border-slate-100 focus:border-blue-600 transition-all outline-none font-black text-slate-950 text-xl placeholder:text-slate-200 uppercase italic tracking-tighter resize-none"
                        placeholder="Detail the Strategic Growth Directive..."
                      />
                    </div>

                    <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="group w-full py-10 bg-slate-950 text-white font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-blue-600 transition-all disabled:opacity-30 shadow-2xl shadow-slate-950/20 italic"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          {t.contact.submit}
                          <ArrowRight size={24} className="group-hover:translate-x-6 transition-transform duration-500" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;