import { Country } from './types';

export interface ExtendedCountry extends Country {
  timezone: string;
  city: string;
}

export const COUNTRIES: ExtendedCountry[] = [
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', languages: ['en'], timezone: 'Asia/Kolkata', city: 'Mumbai' },
  { code: 'US', name: 'USA', flag: '🇺🇸', currency: 'USD', symbol: '$', languages: ['en'], timezone: 'America/New_York', city: 'New York' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'USD', symbol: '$', languages: ['en', 'ar'], timezone: 'Asia/Dubai', city: 'Dubai' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', currency: 'USD', symbol: '$', languages: ['en', 'ar'], timezone: 'Asia/Qatar', city: 'Doha' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', currency: 'USD', symbol: '$', languages: ['en', 'ar'], timezone: 'Asia/Bahrain', city: 'Manama' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'USD', symbol: '$', languages: ['en', 'ar'], timezone: 'Asia/Riyadh', city: 'Riyadh' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', currency: 'USD', symbol: '$', languages: ['en', 'ar'], timezone: 'Asia/Muscat', city: 'Muscat' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', currency: 'USD', symbol: '$', languages: ['en', 'ar'], timezone: 'Asia/Kuwait', city: 'Kuwait City' },
];

export const CONTENT = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      lab: 'Strategy Lab',
      intelligence: 'Market Intel',
      creative: 'Creative',
      video: 'Video Production',
      stack: 'Stack Advisor',
      portfolio: 'Portfolio',
      pricing: 'Pricing',
      contact: 'Contact',
    },
    hero: {
      title: 'Strategic Social Media Marketing.',
      subtitle: 'Nexoft helps businesses build a consistent, professional, and results-focused presence. Social-media-first strategy backed by clean design and business support.',
      ctaPrimary: 'Get a Quote',
      ctaSecondary: 'Book a Consultation',
    },
    services: {
      title: 'What We Do',
      subtitle: 'Structured and practical digital services focused on visibility, engagement, and long-term professional growth.',
      list: [
        { id: 'smm', title: 'Social Media Marketing', icon: 'BarChart3', description: 'Account setup, content calendar planning, post & reel creatives, caption strategy, and performance insights. We focus on visibility and engagement.' },
        { id: 'design', title: 'Website & Graphic Design', icon: 'Layout', description: 'Business websites, landing pages, and brand-aligned creatives. Design that supports marketing consistency and brand credibility.' },
        { id: 'software', title: 'Software & Tools Guidance', icon: 'Settings', description: 'Practical guidance for choosing CRM, marketing tools, and accounting software. Workflow recommendations and setup training.' },
        { id: 'accounts', title: 'Accounts Process Advisory', icon: 'FileText', description: 'Guidance on structuring basic invoicing, expense workflows, and reporting formats. Note: Advisory only, no statutory audit.' },
        { id: 'assistance', title: 'Business Assistance', icon: 'Users', description: 'Operational support including admin, documentation, client coordination, and follow-ups. Scalable support for growing teams.' },
      ]
    },
    pricing: {
      title: 'Transparent Scalability',
      subtitle: 'Pricing designed for growth. Packages depend on scope, region, and specific business requirements.',
      startingFrom: 'From',
      note: 'Final pricing depends on scope and country. Accounts guidance is strictly advisory.',
      plans: {
        starter: 'Starter',
        growth: 'Growth',
        authority: 'Authority',
        features: {
          starter: ['Account Setup & Optimization', 'Content Calendar Planning', 'Basic Monthly Insights'],
          growth: ['Expanded Channel Management', 'Higher Frequency Reels/Posts', 'Engagement Strategy'],
          authority: ['Full Authority Branding', 'Daily Content Cadence', 'Advanced Performance Data'],
        }
      }
    },
    intelligence: {
      title: 'Market Intelligence',
      badge: 'Live Grounding',
      subtitle: 'Synthesize live market trends and competitor insights across India, US, and GCC sectors.',
      placeholder: 'Search for trends (e.g. Retail trends in Dubai 2025)...',
      button: 'Fetch Intelligence',
      loading: 'Scouring Grids...',
      sources: 'Sources',
    },
    creative: {
      title: 'Creative Studio',
      badge: 'Gen-AI Graphics',
      subtitle: 'Generate high-fidelity social media campaign imagery instantly.',
      placeholder: 'Describe your vision...',
      button: 'Generate Content',
      loading: 'Rendering Vision...',
    },
    video: {
      title: 'Video Lab',
      badge: 'Veo Engine',
      subtitle: 'Architect cinematic brand stories using next-gen video generation.',
      placeholder: 'Describe the scene movement and mood...',
      button: 'Generate Video',
      loading: 'Synthesizing Frames...',
    },
    lab: {
      title: 'Strategy Lab',
      badge: 'Engineering',
      subtitle: 'Generate a high-level social media growth roadmap based on your specific business niche.',
      inputPlaceholder: 'Enter your business niche (e.g. Luxury Real Estate)...',
      button: 'Generate Strategy',
      loading: 'Architecting Solution...',
      disclaimer: 'Advisory results based on global trends.'
    },
    stack: {
      title: 'Stack Advisor',
      badge: 'Optimization',
      subtitle: 'Identify the ideal software stack for your team size and operational goals.',
      teamSize: 'Team Size',
      goal: 'Objective',
      budget: 'Budget Range',
      button: 'Analyze Stack',
      loading: 'Mapping Architecture...',
      disclaimer: 'Vendor-neutral recommendations.'
    },
    portfolio: {
      title: 'Success Stories',
      subtitle: 'Measurable impact delivered across diverse global industries.',
      cases: [
        { 
          id: 'lux-real-estate', 
          title: 'Prime Estate Portfolio', 
          category: 'Global Real Estate', 
          impact: '+340% Lead Gen', 
          reach: '4.2M Monthly',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
        },
        { 
          id: 'fintech-us', 
          title: 'Venture Capital Systems', 
          category: 'Financial Strategy', 
          impact: '+120k Users', 
          reach: '15M Impressions',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
        },
        { 
          id: 'hospitality-in', 
          title: 'Legacy Hospitality Group', 
          category: 'Premium Hospitality', 
          impact: '92% Occupancy', 
          reach: '1.8M Reach',
          image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200'
        }
      ]
    },
    concierge: {
      button: 'Talk to Expert',
      title: 'Live Strategy Assistant',
      status: 'Connecting...',
      listening: 'Listening...',
      speaking: 'Assistant is speaking...',
      error: 'Error occurred.',
      close: 'Close Session'
    },
    legal: {
      disclaimer: 'Nexoft is a social media marketing consultancy. Accounts-related services are advisory only. No statutory audit or certification services provided.',
    },
    contact: {
      title: 'Let’s Talk.',
      subtitle: 'Have a requirement? Connect with our team serving global clients from our regional hubs.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      service: 'Requirement',
      message: 'Brief',
      submit: 'Contact Nexoft',
      success: 'Inquiry received. We will respond within 24 hours.',
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      lab: 'مختبر الاستراتيجية',
      intelligence: 'ذكاء السوق',
      creative: 'الإبداع',
      video: 'إنتاج الفيديو',
      stack: 'مستشار البرامج',
      portfolio: 'أعمالنا',
      pricing: 'الأسعار',
      contact: 'اتصل بنا',
    },
    hero: {
      title: 'تسويق استراتيجي متكامل.',
      subtitle: 'تساعد نكسوفت الشركات على بناء حضور مهني ونتائج ملموسة. استراتيجية التواصل الاجتماعي مدعومة بتصميم مميز ودعم للأعمال.',
      ctaPrimary: 'احصل على عرض سعر',
      ctaSecondary: 'احجز استشارة',
    },
    services: {
      title: 'ماذا نقدم',
      subtitle: 'خدمات رقمية منظمة وعملية تركز على الانتشار والتفاعل والنمو المهني طويل الأمد.',
      list: [
        { id: 'smm', title: 'التسويق عبر وسائل التواصل', icon: 'BarChart3', description: 'إعداد الحسابات، تخطيط المحتوى، منشورات وفيديوهات قصيرة، تقارير الأداء. نركز على الظهور والتفاعل.' },
        { id: 'design', title: 'تصميم المواقع والجرافيك', icon: 'Layout', description: 'مواقع الشركات وصفحات الهبوط. تصميم يدعم تناسق العلامة التجارية ومصداقيتها.' },
        { id: 'software', title: 'توجيه البرامج والأدوات', icon: 'Settings', description: 'توجيه عملي لاختيار أنظمة العملاء وأدوات التسويق والبرامج المحاسبية مع تدريب على الإعداد.' },
        { id: 'accounts', title: 'استشارات الحسابات', icon: 'FileText', description: 'إرشادات حول هيكلة فواتيرك وسير عمل النفقات. ملاحظة: استشارية فقط، لا نقدم تدقيقاً قانونياً.' },
        { id: 'assistance', title: 'دعم الأعمال', icon: 'Users', description: 'دعم تشغيلي يشمل الإدارة، التوثيق، وتنسيق العملاء. دعم قابل للتوسع للفرق المتنامية.' },
      ]
    },
    pricing: {
      title: 'شفافية النمو',
      subtitle: 'باقات مصممة للنمو. تعتمد التكلفة على النطاق والمنطقة والمتطلبات المحددة.',
      startingFrom: 'تبدأ من',
      note: 'الأسعار النهائية تعتمد على النطاق والدولة.',
      plans: {
        starter: 'البداية',
        growth: 'النمو',
        authority: 'التميز',
        features: {
          starter: ['تحسين الحساب', 'تخطيط المحتوى', 'تقارير أساسية'],
          growth: ['إدارة قنوات موسعة', 'تكرار أعلى للمنشورات', 'استراتيجية تفاعل'],
          authority: ['بناء هوية متميزة', 'محتوى يومي', 'بيانات أداء متقدمة'],
        }
      }
    },
    intelligence: {
      title: 'ذكاء السوق',
      badge: 'بحث مباشر',
      subtitle: 'احصل على أحدث اتجاهات السوق في الهند والولايات المتحدة والخليج.',
      placeholder: 'ابحث عن الاتجاهات...',
      button: 'جلب المعلومات',
      loading: 'جاري البحث...',
      sources: 'المصادر',
    },
    creative: {
      title: 'استوديو الإبداع',
      badge: 'تصاميم الذكاء الاصطناعي',
      subtitle: 'قم بتوليد صور حملات التواصل الاجتماعي عالية الدقة على الفور.',
      placeholder: 'صف رؤيتك...',
      button: 'توليد المحتوى',
      loading: 'جاري عرض الرؤية...',
    },
    video: {
      title: 'مختبر الفيديو',
      badge: 'محرك Veo',
      subtitle: 'صمم قصصاً سينمائية لعلامتك التجارية باستخدام تقنيات الجيل القادم.',
      placeholder: 'صف حركة المشهد والمزاج العام...',
      button: 'توليد الفيديو',
      loading: 'جاري تأليف الإطارات...',
    },
    lab: {
      title: 'مختبر الاستراتيجية',
      badge: 'هندسة',
      subtitle: 'أنشئ خارطة طريق لنمو علامتك التجارية بناءً على مجالك الخاص.',
      inputPlaceholder: 'أدخل مجال عملك (مثل العقارات)...',
      button: 'توليد الاستراتيجية',
      loading: 'جاري التصميم...',
      disclaimer: 'نتائج استشارية مبنية على التوجهات العالمية.'
    },
    stack: {
      title: 'مستشار البرامج',
      badge: 'تحسين',
      subtitle: 'حدد الحزمة البرمجية المثالية لفريقك وأهدافك التشغيلية.',
      teamSize: 'حجم الفريق',
      goal: 'الهدف',
      budget: 'الميزانية',
      button: 'تحليل البرامج',
      loading: 'جاري التخطيط...',
      disclaimer: 'توصيات محايدة تماماً.'
    },
    portfolio: {
      title: 'قصص النجاح',
      subtitle: 'تأثير ملموس تم تحقيقه عبر صناعات عالمية متنوعة.',
      cases: [
        { 
          id: 'lux-real-estate', 
          title: 'محفظة العقارات النخبوية', 
          category: 'عقارات عالمية', 
          impact: '+340% جذب عملاء', 
          reach: '4.2 مليون شهرياً',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
        },
        { 
          id: 'fintech-us', 
          title: 'أنظمة رأس المال الاستثماري', 
          category: 'إستراتيجية مالية', 
          impact: '+120 ألف مستخدم', 
          reach: '15 مليون مشاهدة',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
        },
        { 
          id: 'hospitality-in', 
          title: 'مجموعة الضيافة العريقة', 
          category: 'ضيافة فاخرة', 
          impact: '92% إشغال', 
          reach: '1.8 مليون وصول',
          image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200'
        }
      ]
    },
    concierge: {
      button: 'تحدث مع خبير',
      title: 'مساعد الاستراتيجية المباشر',
      status: 'جارٍ الاتصال...',
      listening: 'جارٍ الاستماع...',
      speaking: 'المساعد يتحدث الآن...',
      error: 'حدث خطأ.',
      close: 'إغلاق الجلسة'
    },
    legal: {
      disclaimer: 'نكسوفت هي استشارية تسويق. الخدمات المحاسبية استشارية فقط ولا نقدم تدقيقاً حسابياً قانونياً.',
    },
    contact: {
      title: 'تحدث معنا.',
      subtitle: 'لديك متطلبات؟ تواصل مع فريقنا الذي يخدم العملاء العالميين من مراكزنا الإقليمية.',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف / واتساب',
      service: 'المتطلب',
      message: 'نبذة',
      submit: 'اتصل بنكسوفت',
      success: 'تم استلام الاستفسار. سنرد عليك خلال 24 ساعة.',
    }
  }
};