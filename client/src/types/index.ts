export interface Translation {
  [key: string]: string | Translation;
}

export interface TranslationData {
  pl: Translation;
  en: Translation;
  ja: Translation;
}

export interface ContactFormData {
  name: string;
  email: string;
  project: string;
  message: string;
}

export interface LighthouseScore {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface TestResult {
  name: string;
  passed: boolean;
  duration: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
}
