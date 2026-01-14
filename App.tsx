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
import { ChevronDown, Globe, Menu, X, Clock, Activity } from 'lucide-react';
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
      className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 origin-left z-[110]"
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
    <div className="hidden md:flex flex-col items-end mr-6 pr-6 border-r border-slate-100">
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <Clock size={10} className="text-blue-600" />
        {city}
      </div>
      <div className="text-xs font-black text-slate-900 tracking-tighter tabular-nums">
        {timeString}
      </div>
    </div>
  );
};

const NavLink: React.FC<{ to: string, children: React.ReactNode, active: boolean }> = ({ to, children, active }) => (
  <Link 
    to={to}
    className={`text-sm font-bold transition-all relative py-2 uppercase tracking-widest text-[11px] whitespace-nowrap ${
      active ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
    }`}
  >
    {children}
    {active && (
      <motion.div 
        layoutId="nav-underline"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
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
    <nav className={`fixed top-0 w-full z-[100] glass-card border-b border-slate-100/30 ${isRTL ? 'rtl' : 'ltr'}`}>
      <ScrollProgress />
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-12 xl:gap-16 overflow-x-auto no-scrollbar">
            <Link to={`/${country}/${lang}`} className="text-2xl font-black tracking-[-0.05em] text-slate-950 uppercase italic leading-none flex-shrink-0 group">
              NEXOFT<span className="text-blue-600 group-hover:text-slate-400 transition-colors">.</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 overflow-x-auto no-scrollbar">
              {Object.entries(t.nav).map(([key, value]) => {
                const path = key === 'home' ? `/${country}/${lang}` : `/${country}/${lang}/${key}`;
                const isActive = key === 'home' 
                  ? location.pathname === `/${country}/${lang}` || location.pathname === `/${country}/${lang}/`
                  : location.pathname === path;
                
                return (
                  <NavLink key={key} to={isActive ? '#' : path} active={isActive}>
                    {value as string}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="flex items-center flex-shrink-0">
            {/* Intelligence Status - High End Indicator */}
            <div className="hidden xl:flex items-center gap-3 mr-10 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-sm group">
              <Activity size={12} className="text-blue-600 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Intelligence Hub</span>
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-tight">Live Active</span>
              </div>
            </div>

            <LocalClock timezone={selectedCountry.timezone} city={selectedCountry.city} />

            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowCountryMenu(!showCountryMenu)}
                  onBlur={() => setTimeout(() => setShowCountryMenu(false), 200)}
                  className="flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-900 border border-slate-200 rounded-sm hover:border-slate-950 transition-all uppercase tracking-widest"
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
                      className={`absolute mt-2 w-64 glass-card rounded-sm py-3 ${isRTL ? 'left-0' : 'right-0'}`}
                    >
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.code}
                          onMouseDown={() => {
                            const newLang = c.languages.includes(currentLang) ? currentLang : 'en';
                            navigate(switchPath(c.code, newLang, location.pathname));
                            setShowCountryMenu(false);
                          }}
                          className={`flex items-center w-full px-6 py-3 text-[11px] font-bold hover:bg-white/50 transition-colors uppercase tracking-widest ${currentCountryCode === c.code ? 'text-blue-600 bg-white/50' : 'text-slate-600'}`}
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
                    onBlur={() => setTimeout(() => setShowLangMenu(false), 200)}
                    className="flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-900 border border-slate-200 rounded-sm hover:border-slate-950 transition-all uppercase tracking-widest"
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
                        className={`absolute mt-2 w-32 glass-card rounded-sm py-2 ${isRTL ? 'left-0' : 'right-0'}`}
                      >
                        {selectedCountry.languages.map((l) => (
                          <button
                            key={l}
                            onMouseDown={() => {
                              navigate(switchPath(country, l, location.pathname));
                              setShowLangMenu(false);
                            }}
                            className={`flex items-center w-full px-5 py-3 text-[11px] font-bold hover:bg-white/50 transition-colors uppercase tracking-widest ${currentLang === l ? 'text-blue-600' : 'text-slate-600'}`}
                          >
                            {l === 'en' ? 'English' : 'العربية'}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              
              <Link to={`/${country}/${lang}/contact`} className="ml-4 px-8 py-3 bg-slate-950 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">
                Inquire
              </Link>
            </div>

            <div className="lg:hidden ml-4">
              <button onClick={() => setIsOpen(!isOpen)} className="p-3 text-slate-950 bg-slate-50 rounded-sm">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-card border-t border-slate-100/50 px-6 py-10 space-y-6 overflow-hidden"
          >
            {Object.entries(t.nav).map(([key, value]) => (
              <Link 
                key={key} 
                to={key === 'home' ? `/${country}/${lang}` : `/${country}/${lang}/${key}`}
                onClick={() => setIsOpen(false)}
                className="block text-2xl font-black text-slate-950 uppercase tracking-tighter"
              >
                {value as string}
              </Link>
            ))}
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
    <>
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
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
        </AnimatePresence>
      </main>
      <LiveConcierge t={t} language={currentLang} />
      <Footer t={t} language={currentLang} />
    </>
  );
};

const Footer = ({ t, language }: any) => {
  const { country = 'us', lang = 'en' } = useParams();
  const isRTL = language === 'ar';
  
  const privacyText = isRTL ? 'سياسة الخصوصية' : 'Privacy Policy';
  const termsText = isRTL ? 'شروط الخدمة' : 'Service Terms';

  return (
    <footer className={`bg-slate-950 text-slate-500 py-32 border-t border-slate-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
          <div className="md:col-span-5">
            <h3 className="text-4xl font-black text-white mb-10 tracking-tighter italic uppercase flex items-center gap-1">
              NEXOFT<span className="text-blue-600">.</span>
            </h3>
            <p className="text-xl text-slate-400 leading-relaxed font-medium max-sm mb-12">
              Architecting global social presence for elite enterprise brands.
            </p>
            {/* Generic Socials */}
            <div className="flex gap-4">
               {['01', '02', '03'].map((n) => (
                 <div 
                  key={n} 
                  className="w-10 h-10 border border-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 hover:text-white hover:border-white transition-all cursor-default"
                 >
                   {n}
                 </div>
               ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-[10px]">Solutions</h4>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest">
              <li><Link to={`/${country}/${lang}/services`} className="hover:text-blue-500 transition-colors">Social Growth</Link></li>
              <li><Link to={`/${country}/${lang}/lab`} className="hover:text-blue-500 transition-colors">Strategy Labs</Link></li>
              <li><Link to={`/${country}/${lang}/services`} className="hover:text-blue-500 transition-colors">Web Systems</Link></li>
              <li><Link to={`/${country}/${lang}/stack`} className="hover:text-blue-500 transition-colors">Ops Advisor</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-[10px]">Agency</h4>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest">
              <li><Link to={`/${country}/${lang}/about`} className="hover:text-blue-500 transition-colors">Our Legacy</Link></li>
              <li><Link to={`/${country}/${lang}/process`} className="hover:text-blue-500 transition-colors">Methodology</Link></li>
              <li><Link to={`/${country}/${lang}/portfolio`} className="hover:text-blue-500 transition-colors">Case Studies</Link></li>
              <li><Link to={`/${country}/${lang}/contact`} className="hover:text-blue-500 transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-[10px]">Global Desk</h4>
            <ul className="space-y-4">
              <li className="text-white text-lg font-black tracking-tighter">partnerships@nexoft.agency</li>
              <li className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                24/7 Enterprise Support for Tier-1 Retainer Partners.
              </li>
              <li className="text-blue-600 font-bold tracking-widest text-[11px] uppercase">GLOBAL HUB</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-20 border-t border-slate-900 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
            <p className="text-[11px] font-black text-slate-700 uppercase tracking-[0.3em] whitespace-nowrap">
              © {new Date().getFullYear()} NEXOFT AGENCY GLOBAL
            </p>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 text-[11px] font-black uppercase tracking-[0.25em]">
              <Link 
                to={`/${country}/${lang}/privacy`} 
                className="text-slate-500 hover:text-white transition-all duration-500 relative group py-2 px-1"
              >
                {privacyText}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-blue-600 transition-all duration-500 ease-in-out group-hover:w-full group-hover:bg-blue-600"></span>
              </Link>
              <Link 
                to={`/${country}/${lang}/terms`} 
                className="text-slate-500 hover:text-white transition-all duration-500 relative group py-2 px-1"
              >
                {termsText}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-blue-600 transition-all duration-500 ease-in-out group-hover:w-full group-hover:bg-blue-600"></span>
              </Link>
            </div>
          </div>
          
          <p className="text-[10px] font-bold text-slate-700 max-w-3xl xl:text-right leading-loose uppercase tracking-widest italic opacity-50">
            {t.legal.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-slate-950 selection:text-white">
        <Routes>
          <Route path="/" element={<Navigate to="/us/en" replace />} />
          <Route path="/:country/:lang/*" element={<LayoutWrapper />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;