import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const translationSamples = {
  'hero.title': {
    pl: 'AI Genesis: Interaktywny Meta-Tutorial',
    en: 'AI Genesis: Interactive Meta-Tutorial',
    ja: 'AI ジェネシス: インタラクティブメタチュートリアル'
  },
  'nav.home': {
    pl: 'Strona główna',
    en: 'Home',
    ja: 'ホーム'
  },
  'nav.about': {
    pl: 'O projekcie',
    en: 'About',
    ja: 'について'
  },
  'contact.title': {
    pl: 'Kontakt',
    en: 'Contact',
    ja: 'お問い合わせ'
  }
};

export function TranslationDemo() {
  const [translationKey, setTranslationKey] = useState('hero.title');
  const { t } = useTranslation();

  const currentTranslations = translationSamples[translationKey as keyof typeof translationSamples] || {
    pl: 'Klucz nie znaleziony',
    en: 'Key not found',
    ja: 'キーが見つかりません'
  };

  return (
    <div className="animate-slide-in">
      <h3 className="font-playfair text-2xl font-semibold mb-6">
        🔄 {t('translationDemo.title')}
      </h3>
      
      <div className="bg-card rounded-lg p-6 border border-border">
        <h4 className="font-semibold mb-4">{t('translationDemo.testKeys')}</h4>
        
        <div className="mb-4">
          <Label htmlFor="translation-key" className="block text-sm font-medium mb-2">
            {t('translation.testKey')}
          </Label>
          <Input
            id="translation-key"
            data-testid="translation-key-input"
            type="text"
            placeholder="hero.title"
            value={translationKey}
            onChange={(e) => setTranslationKey(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-5 bg-red-500 rounded"></span>
              <span className="font-medium">{t('translation.languages.pl')}</span>
            </div>
            <span 
              className="text-sm" 
              data-testid="translation-pl"
            >
              {currentTranslations.pl}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-5 bg-blue-500 rounded"></span>
              <span className="font-medium">{t('translation.languages.en')}</span>
            </div>
            <span 
              className="text-sm"
              data-testid="translation-en"
            >
              {currentTranslations.en}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-5 bg-red-600 rounded"></span>
              <span className="font-medium">{t('translation.languages.ja')}</span>
            </div>
            <span 
              className="text-sm"
              data-testid="translation-ja"
            >
              {currentTranslations.ja}
            </span>
          </div>
        </div>
        
        <div className="mt-4 code-block rounded p-3 text-white font-mono text-xs">
          <pre><code>{`// i18n.ts implementation
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: require('./translations/pl.json') },
      en: { translation: require('./translations/en.json') },
      ja: { translation: require('./translations/ja.json') }
    },
    lng: 'pl',
    fallbackLng: 'en'
  });`}</code></pre>
        </div>
      </div>
    </div>
  );
}
