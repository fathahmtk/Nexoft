import React, { useState, useEffect } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useNavigate,
  useParams,
  Navigate
} from 'react-router-dom';
import { ChevronDown, Globe, Menu, X, Clock, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { COUNTRIES, CONTENT } from './constants';
import { CountryCode, LanguageCode } from './types';

// Components
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Legal from './components/Legal';
import StrategyLab from './components/StrategyLab';
import Portfolio from './components/Portfolio';
import LiveConcierge from './components/LiveConcierge';
import StackAdvisor from './components/StackAdvisor';
import CreativeStudio from './components/CreativeStudio';
import VideoLab from './components/VideoLab';
import MarketIntelligence from './components/MarketIntelligence';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 origin-left z-[110]"
      style={{ scaleX }}
    />
  );
};

const LocalClock: React.FC<{ timezone: string, city: string }> = ({ timezone, city }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', { 
    timeZone: timezone, 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="hidden md:flex flex-col items-end mr-6 pr-6 border-r border-slate-200">
      <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
        <Clock size={10} className="text-blue-600" />
        {city}
      </div>
      <div className="text-xs font-black text-slate-950 tracking-[-0.02em] tabular-nums mt-0.5 uppercase italic">
        {timeString}
      </div>
    </div>
  );
};

const NavLink: React.FC<{ to: string, children: React.ReactNode, active: boolean }> = ({ to, children, active }) => (
  <Link 
    to={to}
    className={`text-[10px] font-black transition-all relative py-2 uppercase tracking-[0.3em] whitespace-nowrap ${
      active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-950'
    }`}
  >
    {children}
    {active && (
      <motion.div 
        layoutId="nav-underline"
        className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-blue-600 rounded-full"
      />
    )}
  </Link>
);

const Navbar = () => {
  const { country = 'us', lang = 'en' } = useParams<{ country: string, lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showCountryMenu, setShowCountryMenu] = React.useState(false);
  const [showLangMenu, setShowLangMenu] = React.useState(false);

  const currentCountryCode = country.toUpperCase() as CountryCode;
  const currentLang = lang as LanguageCode;
  const t = CONTENT[currentLang] || CONTENT.en;
  const selectedCountry = COUNTRIES.find(c => c.code === currentCountryCode) || COUNTRIES[1];
  const isRTL = currentLang === 'ar';

  const switchPath = (newCountry: string, newLang: string, currentPath: string) => {
    const segments = currentPath.split('/').filter(Boolean);
    const page = segments.slice(2).join('/') || '';
    return `/${newCountry.toLowerCase()}/${newLang}/${page}`;
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100 ${isRTL ? 'rtl' : 'ltr'}`}>
      <ScrollProgress />
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-12 xl:gap-16">
            <Link to={`/${country}/${lang}`} className="text-2xl font-black tracking-[-0.08em] text-slate-950 uppercase italic leading-none flex-shrink-0 group">
              NEXOFT<span className="text-blue-600 group-hover:text-slate-300 transition-colors">.</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
              {Object.entries(t.nav).map(([key, value]) => {
                const path = key === 'home' ? `/${country}/${lang}` : `/${country}/${lang}/${key}`;
                const isActive = key === 'home' 
                  ? location.pathname === `/${country}/${lang}` || location.pathname === `/${country}/${lang}/`
                  : location.pathname === path;
                
                return (
                  <NavLink key={key} to={path} active={isActive}>
                    {value as string}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="flex items-center flex-shrink-0">
            <div className="hidden xl:flex items-center gap-4 mr-10 px-4 py-2 bg-slate-50 border border-slate-100 rounded-sm">
              <Activity size={12} className="text-blue-600 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">System Status</span>
                <span className="text-[9px] font-black text-slate-950 uppercase tracking-widest leading-tight">Synced</span>
              </div>
            </div>

            <LocalClock timezone={selectedCountry.timezone} city={selectedCountry.city} />

            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowCountryMenu(!showCountryMenu)}
                  className="flex items-center gap-3 px-4 py-2 text-[10px] font-black text-slate-950 border border-slate-100 hover:border-blue-600 transition-all uppercase tracking-widest bg-white"
                >
                  <span className="text-lg leading-none">{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                  <ChevronDown size={12} className={showCountryMenu ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </button>
                
                <AnimatePresence>
                  {showCountryMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute mt-2 w-64 glass-card-dark py-3 ${isRTL ? 'left-0' : 'right-0 shadow-2xl'}`}
                    >
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            const newLang = c.languages.includes(currentLang) ? currentLang : 'en';
                            navigate(switchPath(c.code, newLang, location.pathname));
                            setShowCountryMenu(false);
                          }}
                          className={`flex items-center w-full px-6 py-3 text-[10px] font-black hover:bg-white/10 transition-colors uppercase tracking-widest ${currentCountryCode === c.code ? 'text-blue-500' : 'text-slate-400'}`}
                        >
                          <span className="mr-4 text-xl leading-none">{c.flag}</span>
                          {c.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {selectedCountry.languages.length > 1 && (
                <div className="relative">
                  <button 
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-3 px-4 py-2 text-[10px] font-black text-slate-950 border border-slate-100 hover:border-blue-600 transition-all uppercase tracking-widest bg-white"
                  >
                    <Globe size={12} className="text-blue-600" />
                    <span>{currentLang === 'en' ? 'EN' : 'AR'}</span>
                  </button>
                  
                  <AnimatePresence>
                    {showLangMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute mt-2 w-32 glass-card-dark py-2 ${isRTL ? 'left-0' : 'right-0 shadow-2xl'}`}
                      >
                        {selectedCountry.languages.map((l) => (
                          <button
                            key={l}
                            onClick={() => {
                              navigate(switchPath(country, l, location.pathname));
                              setShowLangMenu(false);
                            }}
                            className={`flex items-center w-full px-5 py-3 text-[10px] font-black hover:bg-white/10 transition-colors uppercase tracking-widest ${currentLang === l ? 'text-blue-500' : 'text-slate-400'}`}
                          >
                            {l === 'en' ? 'English' : 'العربية'}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              
              <Link to={`/${country}/${lang}/contact`} className="ml-4 px-8 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all italic shadow-lg">
                Inquire
              </Link>
            </div>

            <div className="lg:hidden ml-4">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-950">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 top-20 bg-white z-[90] px-6 py-12 flex flex-col gap-8 overflow-y-auto"
          >
            {Object.entries(t.nav).map(([key, value]) => (
              <Link 
                key={key} 
                to={key === 'home' ? `/${country}/${lang}` : `/${country}/${lang}/${key}`}
                onClick={() => setIsOpen(false)}
                className="text-5xl font-black text-slate-950 uppercase tracking-tighter italic border-b border-slate-100 pb-4"
              >
                {value as string}
              </Link>
            ))}
            <div className="mt-auto pt-12">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Select Region</div>
               <div className="grid grid-cols-2 gap-4">
                  {COUNTRIES.map(c => (
                    <button 
                      key={c.code}
                      onClick={() => {
                        const newLang = c.languages.includes(currentLang) ? currentLang : 'en';
                        navigate(`/${c.code.toLowerCase()}/${newLang}`);
                        setIsOpen(false);
                      }}
                      className="p-4 border border-slate-100 flex items-center gap-4 text-xs font-bold uppercase"
                    >
                      <span>{c.flag}</span> {c.name}
                    </button>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LayoutWrapper = () => {
  const { country, lang } = useParams<{ country: string, lang: string }>();
  const currentLang = (lang as LanguageCode) || 'en';
  const t = CONTENT[currentLang] || CONTENT.en;
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Hero t={t} language={currentLang} />} />
              <Route path="/services" element={<Services t={t} language={currentLang} />} />
              <Route path="/lab" element={<StrategyLab t={t} language={currentLang} />} />
              <Route path="/intelligence" element={<MarketIntelligence t={t} language={currentLang} />} />
              <Route path="/creative" element={<CreativeStudio t={t} language={currentLang} />} />
              <Route path="/video" element={<VideoLab t={t} language={currentLang} />} />
              <Route path="/stack" element={<StackAdvisor t={t} language={currentLang} />} />
              <Route path="/portfolio" element={<Portfolio t={t} language={currentLang} />} />
              <Route path="/pricing" element={<Pricing t={t} country={country?.toUpperCase()} language={currentLang} />} />
              <Route path="/process" element={<Process t={t} language={currentLang} />} />
              <Route path="/about" element={<About t={t} language={currentLang} />} />
              <Route path="/contact" element={<Contact t={t} country={country?.toUpperCase()} language={currentLang} />} />
              <Route path="/privacy" element={<Legal type="privacy" t={t} language={currentLang} />} />
              <Route path="/terms" element={<Legal type="terms" t={t} language={currentLang} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <LiveConcierge t={t} language={currentLang} />
      <Footer t={t} language={currentLang} />
    </div>
  );
};

const Footer = ({ t, language }: any) => {
  const { country = 'us', lang = 'en' } = useParams();
  const isRTL = language === 'ar';
  
  return (
    <footer className={`bg-slate-950 text-slate-500 py-32 border-t border-white/5 relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="absolute inset-0 opacity-5 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
          <div className="md:col-span-5">
            <h3 className="text-5xl font-black text-white mb-10 tracking-tighter italic uppercase">
              NEXOFT<span className="text-blue-600">.</span>
            </h3>
            <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-sm mb-12 italic">
              "We engineer digital dominance for global elite brands."
            </p>
            <div className="flex gap-4">
               {['INTEL', 'CREATIVE', 'SCALE'].map((n) => (
                 <div 
                  key={n} 
                  className="px-4 py-2 border border-white/10 text-[9px] font-black text-slate-500 hover:text-white hover:border-blue-600 transition-all cursor-default uppercase tracking-widest"
                 >
                   {n}
                 </div>
               ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-white text-[10px] font-black mb-10 uppercase tracking-[0.4em]">Grid Nodes</h4>
            <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em]">
              <li><Link to={`/${country}/${lang}/services`} className="hover:text-blue-500">SMM Services</Link></li>
              <li><Link to={`/${country}/${lang}/lab`} className="hover:text-blue-500">Strategy Lab</Link></li>
              <li><Link to={`/${country}/${lang}/intelligence`} className="hover:text-blue-500">Market Intel</Link></li>
              <li><Link to={`/${country}/${lang}/stack`} className="hover:text-blue-500">Stack Advisor</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-white text-[10px] font-black mb-10 uppercase tracking-[0.4em]">Corporate</h4>
            <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em]">
              <li><Link to={`/${country}/${lang}/about`} className="hover:text-blue-500">Our Legacy</Link></li>
              <li><Link to={`/${country}/${lang}/portfolio`} className="hover:text-blue-500">Case Studies</Link></li>
              <li><Link to={`/${country}/${lang}/pricing`} className="hover:text-blue-500">Investment</Link></li>
              <li><Link to={`/${country}/${lang}/contact`} className="hover:text-blue-500">Inquiry</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-white text-[10px] font-black mb-10 uppercase tracking-[0.4em]">Global Intake</h4>
            <ul className="space-y-4">
              <li className="text-white text-lg font-black tracking-[-0.04em] italic uppercase">partnerships@nexoft.agency</li>
              <li className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-relaxed mt-6">
                24/7 Enterprise Level Support for Retainer Partners.
              </li>
              <li className="flex items-center gap-3 mt-8">
                 <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                 <span className="text-blue-600 font-black tracking-[0.4em] text-[10px] uppercase">Node Active</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-20 border-t border-white/5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} NEXOFT GLOBAL ENTERPRISE
            </p>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
              <Link to={`/${country}/${lang}/privacy`} className="text-slate-600 hover:text-white">Privacy</Link>
              <Link to={`/${country}/${lang}/terms`} className="text-slate-600 hover:text-white">Terms</Link>
            </div>
          </div>
          
          <p className="text-[9px] font-black text-slate-800 max-w-2xl xl:text-right leading-loose uppercase tracking-widest italic opacity-50">
            {t.legal.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isSystemBooting, setIsSystemBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSystemBooting(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {isSystemBooting && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-black italic tracking-tighter"
            >
              NEXOFT<span className="text-blue-600">.</span>
            </motion.div>
            <div className="mt-8 w-48 h-px bg-slate-100 relative overflow-hidden">
               <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 bottom-0 w-1/2 bg-blue-600"
               />
            </div>
            <div className="mt-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Initializing Neural Grids</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Navigate to="/us/en" replace />} />
          <Route path="/:country/:lang/*" element={<LayoutWrapper />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;