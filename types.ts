
export type CountryCode = 'IN' | 'US' | 'AE' | 'QA' | 'BH' | 'SA' | 'OM' | 'KW';
export type LanguageCode = 'en' | 'ar';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  languages: LanguageCode[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  country: CountryCode;
  language: LanguageCode;
  service: string;
  message: string;
  timestamp: string;
}
