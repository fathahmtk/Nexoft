
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
    intelligence: {
      title: 'Market Intelligence',
      badge: 'Real-time Grounding',
      subtitle: 'Fetch live market trends and competitor insights using Google Search grounding.',
      placeholder: 'Search for trends (e.g. Luxury real estate trends in 2025)...',
      button: 'Fetch Intelligence',
      loading: 'Scouring Global Grids...',
      sources: 'Verified Sources',
    },
    hero: {
      title: 'Global Social Strategy. Enterprise Execution.',
      subtitle: 'Premium SMM-first agency helping brands scale across India, USA, and the GCC with data-driven creative and strategic advisory.',
      ctaPrimary: 'Get a Quote',
      ctaSecondary: 'Our Services',
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
      keyWarning: 'High-quality video generation requires a paid API key for Veo models.',
      selectKey: 'Connect Billing Project',
    },
    lab: {
      title: 'Strategy Lab',
      badge: 'AI Powered',
      subtitle: 'Generate a high-level social media growth roadmap instantly.',
      inputPlaceholder: 'Enter your business niche...',
      button: 'Generate Strategy',
      loading: 'Engineering Vision...',
      disclaimer: 'Generated insights are for advisory purposes based on current global trends.'
    },
    stack: {
      title: 'Stack Advisor',
      badge: 'Optimization',
      subtitle: 'Discover the perfect software stack for your marketing operations.',
      teamSize: 'Team Size',
      goal: 'Primary Objective',
      budget: 'Monthly Budget',
      button: 'Analyze Stack',
      loading: 'Architecting Stack...',
      disclaimer: 'Recommendations are vendor-neutral and based on operational efficiency.'
    },
    concierge: {
      button: 'Talk to Expert',
      title: 'Live Strategy Assistant',
      status: 'Connecting to Nexoft Intelligence...',
      listening: 'Listening...',
      speaking: 'Assistant is speaking...',
      error: 'Microphone access required for voice interaction.',
      close: 'Close Session'
    },
    portfolio: {
      title: 'Success Stories',
      subtitle: 'Measurable impact delivered across diverse global industries.',
      cta: 'View Case Study',
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
    testimonials: [
      { 
        quote: "Nexoft didn't just manage our socials; they redefined our entire digital persona for the global market.",
        author: "CMO",
        role: "Enterprise Partner"
      },
      { 
        quote: "The efficiency of their remote team is staggering. It feels like having a localized HQ in every target country.",
        author: "Growth Director",
        role: "Global Technology Client"
      }
    ],
    services: {
      title: 'Global Offerings',
      subtitle: 'Specialized digital solutions for ambitious enterprise brands.',
      list: [
        { id: 'smm', title: 'Social Media Marketing', description: 'Comprehensive strategy, content production, and community management focused on ROI. Our teams leverage real-time data to pivot strategies instantly. We ensure your brand remains at the forefront of the global digital conversation.', icon: 'BarChart3' },
        { id: 'design', title: 'Website & Graphic Design', description: 'Conversion-optimized web experiences and premium brand visual identity systems. We blend high-fashion aesthetics with technical excellence. Our designs are engineered to resonate across diverse cultural landscapes.', icon: 'Layout' },
        { id: 'software', title: 'Software & Tools Guidance', description: 'Strategic stack selection for CRM, marketing automation, and business ops. We identify the most efficient tools for your specific market needs. Our approach reduces operational friction while maximizing team throughput.', icon: 'Settings' },
        { id: 'accounts', title: 'Accounts Process Guidance', description: 'Advisory on financial workflows and reporting. Note: We are not a CA firm. We streamline your internal accounting logic to support rapid international scaling.', icon: 'FileText' },
        { id: 'assistance', title: 'Business Assistance', description: 'High-level virtual support to streamline your executive operations. Our assistants are trained in enterprise-level project management. We provide the operational backbone required for global brand dominance.', icon: 'Users' },
      ]
    },
    pricing: {
      title: 'Transparent Scalability',
      subtitle: 'Packages designed for growth across global markets.',
      startingFrom: 'Starting from',
      note: 'Regional prices adjusted for market complexity. All accounts guidance is strictly advisory.',
      plans: {
        starter: 'Starter',
        growth: 'Growth',
        authority: 'Authority',
        features: {
          starter: ['3 Social Channels', '12 Posts Monthly', 'Basic Analytics'],
          growth: ['5 Social Channels', '24 Posts Monthly', 'Ad Management', 'Engagement'],
          authority: ['Unlimited Channels', 'Daily Content', 'Influencer Outreach', 'Dedicated Manager'],
        }
      }
    },
    contact: {
      title: 'Global Partnership',
      subtitle: 'Connect with our regional experts to initiate your brand scaling.',
      name: 'Full Name',
      email: 'Corporate Email',
      phone: 'Phone Number',
      service: 'Service Interest',
      message: 'Project Brief',
      submit: 'Initiate Inquiry',
      success: 'Inquiry received. Our regional lead will contact you within 24 hours.',
    },
    legal: {
      disclaimer: 'Nexoft is a marketing-first consultancy. Accounts-related services are provided solely as process guidance and advisory. We do not provide statutory audits or licensed accounting services.',
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
    intelligence: {
      title: 'ذكاء السوق',
      badge: 'بحث مباشر',
      subtitle: 'احصل على أحدث اتجاهات السوق ورؤى المنافسين باستخدام بحث جوجل المدمج.',
      placeholder: 'ابحث عن الاتجاهات...',
      button: 'جلب المعلومات',
      loading: 'جاري البحث في الشبكات العالمية...',
      sources: 'المصادر الموثوقة',
    },
    hero: {
      title: 'استراتيجية اجتماعية عالمية. تنفيذ مؤسسي.',
      subtitle: 'وكالة رائدة تركز على التسويق عبر وسائل التواصل الاجتماعي، تساعد العلامات التجارية على التوسع من خلال الإبداع المدعوم بالبيانات.',
      ctaPrimary: 'احصل على عرض سعر',
      ctaSecondary: 'خدماتنا',
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
      keyWarning: 'توليد الفيديو عالي الجودة يتطلب مفتاح API مدفوع لنماذج Veo.',
      selectKey: 'ربط مشروع الفوترة',
    },
    lab: {
      title: 'مختبر الاستراتيجية',
      badge: 'مدعوم بالذكاء الاصطناعي',
      subtitle: 'قم بإنشاء خارطة طريق لنمو وسائل التواصل الاجتماعي على الفور.',
      inputPlaceholder: 'أدخل مجال عملك...',
      button: 'توليد الاستراتيجية',
      loading: 'جاري هندسة الرؤية...',
      disclaimer: 'الرؤى التي تم إنشاؤها هي لأغراض استشارية بناءً على الاتجاهات العالمية الحالية.'
    },
    stack: {
      title: 'مستشار البرامج',
      badge: 'تحسين الأداء',
      subtitle: 'اكتشف الحزمة البرمجية المثالية لعملياتك التسويقية.',
      teamSize: 'حجم الفريق',
      goal: 'الهدف الأساسي',
      budget: 'الميزانية الشهرية',
      button: 'تحليل البرامج',
      loading: 'جاري هندسة الحل...',
      disclaimer: 'التوصيات محايدة للموردين وتستند إلى الكفاءة التشغيلية.'
    },
    concierge: {
      button: 'تحدث مع خبير',
      title: 'مساعد الاستراتيجية المباشر',
      status: 'جارٍ الاتصال بذكاء نكسوفت...',
      listening: 'جارٍ الاستماع...',
      speaking: 'المساعد يتحدث الآن...',
      error: 'مطلوب الوصول إلى الميكروفون للتفاعل الصوتي.',
      close: 'إغلاق الجلسة'
    },
    portfolio: {
      title: 'قصص النجاح',
      subtitle: 'تأثير ملموس تم تحقيقه عبر صناعات عالمية متنوعة.',
      cta: 'عرض دراسة الحالة',
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
    services: {
      title: 'خدماتنا العالمية',
      subtitle: 'حلول رقمية متخصصة للعلامات التجارية الطموحة.',
      list: [
        { id: 'smm', title: 'التسويق عبر وسائل التواصل الاجتماعي', description: 'استراتيجية شاملة وإنتاج محتوى وإدارة مجتمع تركز على العائد على الاستثمار. فرقنا تستخدم البيانات المباشرة لتعديل الاستراتيجيات فوراً. نضمن بقاء علامتك التجارية في طليعة الحوار الرقمي العالمي.', icon: 'BarChart3' },
        { id: 'design', title: 'تصميم المواقع والجرافيك', description: 'تجارب ويب محسنة للتحويل وأنظمة هوية بصرية متميزة للعلامة التجارية. نمزج الجماليات الراقية مع التميز التقني. تصاميمنا مصممة لتردد صداها عبر المناظر الثقافية المتنوعة.', icon: 'Layout' },
        { id: 'software', title: 'توجيه البرامج والأدوات', description: 'اختيار استراتيجي للأدوات لإدارة علاقات العملاء وأتمتة التسويق والعمليات. نحدد الأدوات الأكثر كفاءة لاحتياجات السوق الخاصة بك. نهجنا يقلل من الاحتكاك التشغيلي.', icon: 'Settings' },
        { id: 'accounts', title: 'توجيه عمليات الحسابات', description: 'استشارات حول سير العمل المالي والتقارير. ملاحظة: نحن لسنا شركة محاسبة قانونية. نقوم بتبسيط المنطق المحاسبي الداخلي لدعم التوسع الدولي السريع.', icon: 'FileText' },
        { id: 'assistance', title: 'مساعدة الأعمال', description: 'دعم افتراضي رفيع المستوى لتبسيط عملياتك التنفيذية. مساعدونا مدربون على إدارة المشاريع على مستوى المؤسسات. نوفر العمود الفقري التشغيلي المطلوب للهيمنة على السوق.', icon: 'Users' },
      ]
    },
    pricing: {
      title: 'قابلية توسع شفافة',
      subtitle: 'باقات مصممة للنمو عبر الأسواق العالمية.',
      startingFrom: 'تبدأ من',
      note: 'الأسعار الإقليمية معدلة حسب تعقيد السوق.',
      plans: {
        starter: 'البداية',
        growth: 'النمو',
        authority: 'التميز',
        features: {
          starter: ['3 قنوات اجتماعية', '12 منشوراً شهرياً', 'تحليلات أساسية'],
          growth: ['5 قنوات اجتماعية', '24 منشوراً شهرياً', 'إدارة الإعلانات', 'التفاعل'],
          authority: ['قنوات غير محدودة', 'محتوى يومي', 'التواصل مع المؤثرين', 'مدير مخصص'],
        }
      }
    },
    contact: {
      title: 'شراكة عالمية',
      subtitle: 'تواصل مع خبرائنا الإقليميين لبدء توسيع علامتك التجارية.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني للشركة',
      phone: 'رقم الهاتف',
      service: 'الخدمة المطلوبة',
      message: 'ملخص المشروع',
      submit: 'بدء الاستفسار',
      success: 'تم استلام الاستفسار. سيتواصل معك مسؤولنا الإقليمي خلال 24 ساعة.',
    },
    legal: {
      disclaimer: 'نكسوفت هي استشارية تسويق أولاً. تُقدم الخدمات المتعلقة بالحسابات فقط كإرشادات واستشارات للعمليات.',
    }
  }
};
