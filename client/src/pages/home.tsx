import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { InteractiveWorkshop } from "@/components/interactive-workshop";
import { TranslationDemo } from "@/components/translation-demo";
import { ContactForm } from "@/components/contact-form";
import { CreatorStoryModal } from "@/components/creator-story-modal";
import { GeminiShowcase } from "@/components/gemini-showcase";
import { AnnotatedPrompt } from "@/components/AnnotatedPrompt";
import devPhotoUrl from "@/assets/3.avif";

export default function Home() {
  const { t } = useTranslation();
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const geminiCards =
    (t("geminiPhase.cards", { returnObjects: true }) as Array<{
      title: string;
      userQuote: string;
      geminiSolution: string;
    }>) || [];

  const promptTitle = t("phases.phase0.promptTitle");
  const promptText = t("phases.phase0.promptText");
  const promptShowMore = t("phases.phase0.promptShowMore");
  const promptShowLess = t("phases.phase0.promptShowLess");
  const promptAnnotations =
    (t("phases.phase0.promptAnnotations", {
      returnObjects: true,
    }) as Record<string, string>) || {};

  return (
    <>
      <SEO
        title={t("seo.homeTitle")}
        description={t("seo.description")}
        path="/"
        isHomePage={true}
        schema={{
          type: "website",
        }}
      />

      <main className="w-full overflow-x-hidden">
        <section className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 flex items-center justify-center relative overflow-hidden px-4 lg:px-8 w-full">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-accent/10 rounded-full animate-bounce-subtle"></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/20 rounded-full animate-bounce-subtle delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-accent/15 rounded-full animate-bounce-subtle delay-2000"></div>
          </div>

          <div className="text-center z-10 animate-fade-in w-full max-w-4xl mx-auto">
            <h1 className="font-playfair text-3xl sm:text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-gold bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
            </h1>
            <h2 className="font-playfair text-lg sm:text-2xl lg:text-3xl mb-8 text-foreground/80">
              {t("hero.subtitle")}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-foreground/70 px-4">
              {t("hero.description")}
            </p>

            <div className="mb-12">
              <div className="flex justify-center space-x-4 mb-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-accent rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
              <p className="text-sm text-foreground/60">
                {t("phases.phaseCount")}
              </p>
            </div>

            <a
              href="#phase-0"
              className="inline-flex items-center space-x-3 bg-accent hover:bg-accent-light text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 animate-glow"
              data-testid="hero-cta"
            >
              <span>{t("hero.cta")}</span>
              <span>🚀</span>
            </a>
          </div>
        </section>

        <section
          id="phase-0"
          className="min-h-screen py-12 sm:py-20 px-4 sm:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                💡
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {t("phases.phase0.title")}
              </h2>
              <p className="text-xl text-foreground/70 mb-12">
                {t("phases.phase0.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in">
                <h3 className="font-playfair text-2xl font-semibold mb-6">
                  {t("phases.phase0.rawIdeaTitle")}
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 mb-8 transform rotate-1">
                  <div className="font-mono text-sm mb-4 text-yellow-700 dark:text-yellow-300">
                    {t("phases.phase0.noteComment")}
                  </div>
                  <p className="text-foreground leading-relaxed">
                    "{t("phases.phase0.userNote")}"
                  </p>
                </div>

                <div className="bg-accent/10 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <span className="mr-2">🤖</span>
                    {t("phases.phase0.aiInterpretation")}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {t("phases.phase0.aiDescription")}
                  </p>
                </div>
              </div>

              <div className="animate-fade-in">
                <div className="bg-primary text-primary-foreground rounded-lg p-6 border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm ml-4">
                      {t("phases.phase0.terminalTitle")}
                    </span>
                  </div>
                  <div className="font-mono text-lime-400 text-sm space-y-2">
                    <div>
                      <span className="animate-pulse">&gt; </span>
                      {t("phases.phase0.analyzing")}
                    </div>
                    <div>
                      <span
                        className="animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      >
                        &gt;{" "}
                      </span>
                      {t("phases.phase0.generating")}
                    </div>
                    <div>
                      <span
                        className="animate-pulse"
                        style={{ animationDelay: "1s" }}
                      >
                        &gt;{" "}
                      </span>
                      {t("phases.phase0.planning")}
                    </div>
                    <div>
                      <span
                        className="animate-pulse"
                        style={{ animationDelay: "1.5s" }}
                      >
                        &gt;{" "}
                      </span>
                      {t("phases.phase0.designing")}
                    </div>
                    <div>
                      <span
                        className="animate-pulse"
                        style={{ animationDelay: "2s" }}
                      >
                        &gt;{" "}
                      </span>
                      {t("phases.phase0.complete")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AnnotatedPrompt
              title={promptTitle}
              promptText={promptText}
              annotations={promptAnnotations}
              showMoreLabel={promptShowMore}
              showLessLabel={promptShowLess}
            />
          </div>
        </section>

        <section
          id="phase-1"
          className="min-h-screen py-12 sm:py-20 px-4 sm:px-8 bg-secondary/5"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🏗️
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {t("phases.phase1.title")}
              </h2>
              <p className="text-xl text-foreground/70 mb-12">
                {t("phases.phase1.subtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="animate-slide-in">
                <h3 className="font-playfair text-xl sm:text-2xl font-semibold mb-6">
                  {t("phases.phase1.projectStructure")}
                </h3>

                <div className="code-block rounded-lg p-4 sm:p-6 text-white font-mono text-xs sm:text-sm overflow-x-auto">
                  <div className="text-accent mb-4">ai-genesis-project/</div>
                  <div className="ml-4 space-y-1">
                    <div>
                      ├── <span className="text-yellow-400">functions/</span>
                    </div>
                    <div className="ml-4">└── submit-form.ts</div>
                    <div>
                      ├── <span className="text-yellow-400">src/</span>
                    </div>
                    <div className="ml-4">
                      ├── <span className="text-blue-400">components/</span>
                    </div>
                    <div className="ml-8">├── __tests__/</div>
                    <div className="ml-8">├── ControlHub.tsx</div>
                    <div className="ml-8">└── InteractiveWorkshop.tsx</div>
                    <div className="ml-4">
                      ├── <span className="text-green-400">pages/</span>
                    </div>
                    <div className="ml-4">
                      ├── <span className="text-purple-400">translations/</span>
                    </div>
                    <div className="ml-8">├── pl.json</div>
                    <div className="ml-8">├── en.json</div>
                    <div className="ml-8">└── ja.json</div>
                    <div className="ml-4">├── App.tsx</div>
                    <div className="ml-4">├── main.tsx</div>
                    <div className="ml-4">└── i18n.ts</div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in">
                <h3 className="font-playfair text-xl sm:text-2xl font-semibold mb-6">
                  {t("phases.phase1.techStack")}
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white text-sm font-bold mr-3">
                        TS
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base">
                        TypeScript + React + Vite
                      </h4>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {t("phases.phase1.typeScriptDesc")}
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-8 h-8 bg-cyan-700 rounded flex items-center justify-center text-white text-sm font-bold mr-3">
                        TW
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base">
                        TailwindCSS + Framer Motion
                      </h4>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {t("phases.phase1.tailwindDesc")}
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-sm font-bold mr-3">
                        ⚡
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base">
                        Netlify Functions + Testing
                      </h4>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {t("phases.phase1.netlifyDesc")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 bg-accent/10 rounded-lg p-4 sm:p-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <span className="mr-2">🤖</span>
                    {t("phases.phase1.aiJustification")}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    "{t("phases.phase1.stackReasoning")}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="phase-2"
          className="min-h-screen py-12 sm:py-20 px-4 sm:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🎨
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {t("phases.phase2.title")}
              </h2>
              <p className="text-xl text-foreground/70 mb-12">
                {t("phases.phase2.subtitle")}
              </p>
            </div>

            <div className="mb-12 animate-slide-in">
              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
                <h3 className="font-playfair text-xl font-semibold mb-4">
                  {t("phases.phase2.designDecision")}
                </h3>
                <p className="leading-relaxed">
                  {t("phases.phase2.designReasoning")}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="animate-fade-in">
                <h3 className="font-playfair text-xl sm:text-2xl font-semibold mb-6">
                  {t("phases.phase2.hubFeatures")}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-card rounded-lg border border-border">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      🧭
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t("phases.phase2.navFeature")}
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {t("phases.phase2.navDesc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-card rounded-lg border border-border">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      🌐
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t("phases.phase2.langFeature")}
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {t("phases.phase2.langDesc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-card rounded-lg border border-border">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                      🌙
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t("phases.phase2.themeFeature")}
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {t("phases.phase2.themeDesc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-card rounded-lg border border-border">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
                      ♿
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t("phases.phase2.a11yFeature")}
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {t("phases.phase2.a11yDesc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-slide-in">
                <h3 className="font-playfair text-xl sm:text-2xl font-semibold mb-6">
                  {t("phases.phase2.demoTitle")}
                </h3>

                <div className="relative bg-muted rounded-lg p-6 h-96 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-12 bg-card border-r border-border hover:w-32 transition-all duration-300 group">
                    <div className="p-2 space-y-2">
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-accent-foreground text-xs font-bold">
                        AI
                      </div>
                      <div className="space-y-1">
                        <div className="w-8 h-8 flex items-center justify-center text-xl">
                          💡
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center text-xl">
                          🏗️
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center text-xl">
                          🎨
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center text-xl">
                          ⚙️
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-16 p-4">
                    <h4 className="font-semibold mb-2">
                      {t("phases.phase2.mainContent")}
                    </h4>
                    <p className="text-sm text-foreground/70 mb-4">
                      {t("phases.phase2.hubDescription")}
                    </p>
                    <div className="space-y-2">
                      <div className="h-2 bg-secondary rounded"></div>
                      <div className="h-2 bg-secondary rounded w-3/4"></div>
                      <div className="h-2 bg-secondary rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="phase-3"
          className="min-h-screen py-12 sm:py-20 px-4 sm:px-8 bg-secondary/5"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                ⚙️
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {t("phases.phase3.title")}
              </h2>
              <p className="text-xl text-foreground/70 mb-12">
                {t("phases.phase3.subtitle")}
              </p>
            </div>

            <InteractiveWorkshop />

            <div className="animate-fade-in">
              <h3 className="font-playfair text-2xl font-semibold mb-8 text-center">
                {t("phases.phase3.aiDialogue")}
              </h3>

              <div className="bg-card rounded-lg py-4 px-0 md:p-6 border border-border space-y-12">
                <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-4">
                  <div className="mb-4 md:mb-0 w-10 h-10 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-base">
                    👤
                  </div>
                  <div className="w-full flex-1">
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                      <p className="font-mono text-sm">
                        "{t("phases.phase3.userRequest")}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-4">
                  <div className="mb-4 md:mb-0 w-10 h-10 bg-accent rounded-full flex-shrink-0 flex items-center justify-center text-accent-foreground text-base">
                    🤖
                  </div>
                  <div className="w-full flex-1">
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="text-sm">
                        <strong>{t("phases.phase3.aiResponse")}</strong>{" "}
                        <code className="bg-muted px-2 py-1 rounded">
                          components/ImageModal.tsx
                        </code>
                        .
                      </p>
                      <div className="mt-4 code-block rounded p-4 text-white font-mono text-xs">
                        <pre>
                          <code className="whitespace-pre-wrap break-words">{`${t(
                            "phases.phase3.generatedComment"
                          )}
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
         onClick={onClose}>
      <img src={src} alt={alt} className="max-w-full max-h-full"
           onClick={(e) => e.stopPropagation()} />
    </div>,
    document.body
  );
};`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="phase-4"
          className="min-h-screen py-12 sm:py-20 px-4 sm:px-8 mobile-safe-width"
        >
          <div className="max-w-6xl mx-auto mobile-padding">
            <div className="text-center mb-16 animate-fade-in min-w-0">
              <div className="mobile-code-container w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🌍
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {t("phases.phase4.title")}
              </h2>
              <p className="text-xl text-foreground/70 mb-12">
                {t("phases.phase4.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="min-w-0">
                <TranslationDemo />
              </div>

              <div className="animate-fade-in min-w-0">
                <h3 className="font-playfair text-2xl font-semibold mb-6">
                  {t("phases.phase4.seoImplementation")}
                </h3>

                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <span className="mr-2">📋</span>
                      {t("phases.phase4.metaTags")}
                    </h4>
                    <div className="code-block rounded p-4 text-white font-mono text-xs overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all">
                        <code>{`${t("phases.phase4.metaComment")}
<Helmet>
  <title>{t('seo.title')}</title>
  <meta name="description" content={t('seo.description')} />
  <meta property="og:title" content={t('seo.title')} />
  <meta property="og:description" content={t('seo.description')} />
  <link rel="canonical" href={canonicalUrl} />
</Helmet>`}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <span className="mr-2">🏷️</span>
                      {t("phases.phase4.jsonLD")}
                    </h4>
                    <div className="code-block rounded p-4 text-white font-mono text-xs overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all">
                        <code>{`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "AI Genesis: Interactive Meta-Tutorial",
  "description": "Comprehensive guide to AI-assisted development",
  "author": {
    "@type": "Person",
    "name": "AI Genesis"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AI Genesis"
  }
}`}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-6">
                    <h4 className="font-semibold mb-4">
                      📊 {t("performance.title")}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">
                          {t("performance.lazyLoading")}
                        </div>
                        <div className="text-foreground/70">
                          {t("performance.lazyLoadingDesc")}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {t("performance.imageOptimization")}
                        </div>
                        <div className="text-foreground/70">
                          {t("performance.imageOptDesc")}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {t("performance.codeSplitting")}
                        </div>
                        <div className="text-foreground/70">
                          {t("performance.codeSplittingDesc")}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {t("performance.bundleAnalysis")}
                        </div>
                        <div className="text-foreground/70">
                          {t("performance.bundleAnalysisDesc")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 px-4 sm:px-8 bg-secondary/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🧪
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {t("testing.phaseTitle")}
              </h2>
              <p className="text-xl text-foreground/70 mb-12">
                {t("testing.phaseSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="animate-slide-in">
                <h3 className="font-playfair text-2xl font-semibold mb-6">
                  🔬 {t("testing.unitTestExample")}
                </h3>

                <div className="code-block rounded-lg p-6 text-white font-mono text-sm">
                  <pre>
                    <code className="whitespace-pre-wrap break-words">{`// ControlHub.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlHub } from '../ControlHub';

describe('ControlHub', () => {
  it('should expand on hover', async () => {
    render(<ControlHub />);

    const hub = screen.getByTestId('control-hub');
    expect(hub).toHaveClass('control-hub-collapsed');

    fireEvent.mouseEnter(hub);

    await waitFor(() => {
      expect(hub).toHaveClass('control-hub-expanded');
    });
  });

  it('should navigate to correct section', () => {
    render(<ControlHub />);

    const iskraLink = screen.getByText('Iskra');
    fireEvent.click(iskraLink);

    expect(window.location.hash).toBe('#phase-0');
  });
});`}</code>
                  </pre>
                </div>
              </div>

              <div className="animate-fade-in">
                <h3 className="font-playfair text-2xl font-semibold mb-6">
                  ✅ {t("testing.testResults")}
                </h3>

                <div className="bg-primary text-primary-foreground rounded-lg p-6 border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm ml-4">
                      {t("testing.testResultsVitest")}
                    </span>
                  </div>
                  <div className="font-mono text-green-400 text-sm space-y-1">
                    <div>✓ ControlHub.test.tsx (2)</div>
                    <div className="ml-4">✓ should expand on hover</div>
                    <div className="ml-4">
                      ✓ should navigate to correct section
                    </div>
                    <div>✓ TranslationModule.test.tsx (3)</div>
                    <div className="ml-4">
                      ✓ should switch languages correctly
                    </div>
                    <div className="ml-4">✓ should fallback to English</div>
                    <div className="ml-4">
                      ✓ should update translations dynamically
                    </div>
                    <div>✓ InteractiveWorkshop.test.tsx (2)</div>
                    <div className="ml-4">✓ should simulate bug correctly</div>
                    <div className="ml-4">✓ should fix bug on demand</div>
                    <div className="text-accent mt-4">
                      <strong>Tests: 7 passed, 7 total</strong>
                      <br />
                      <strong>Time: 2.14s</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">
                    🛠️ {t("testing.testingStack")}
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>{t("testing.testRunner")}</span>
                      <span className="font-mono">Vitest</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("testing.testingLibrary")}</span>
                      <span className="font-mono">@testing-library/react</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("testing.coverage")}</span>
                      <span className="text-green-700 font-mono">96.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("testing.e2eTests")}</span>
                      <span className="font-mono">
                        {t("testing.e2eTestsValue")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="phase-5"
          className="min-h-screen py-12 sm:py-20 px-4 sm:px-8 w-full max-w-full overflow-x-hidden"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🚀
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {t("phases.phase5.title")}
              </h2>
              <p className="text-xl text-foreground/70 mb-12">
                {t("phases.phase5.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in">
                <h3 className="font-playfair text-2xl font-semibold mb-6">
                  🌐 {t("phases.phase5.deploymentProcess")}
                </h3>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Git Push</div>
                        <div className="text-sm text-foreground/70">
                          {t("phases.phase5.gitPush")}
                        </div>
                      </div>
                      <div className="text-green-500">✓</div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Netlify Build</div>
                        <div className="text-sm text-foreground/70">
                          {t("phases.phase5.netlifyBuild")}
                        </div>
                      </div>
                      <div className="text-green-500">✓</div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                        3
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Functions Deploy</div>
                        <div className="text-sm text-foreground/70">
                          {t("phases.phase5.functionsDeploy")}
                        </div>
                      </div>
                      <div className="text-green-500">✓</div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
                        4
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">CDN Distribution</div>
                        <div className="text-sm text-foreground/70">
                          {t("phases.phase5.cdnDistribution")}
                        </div>
                      </div>
                      <div className="text-green-500">✓</div>
                    </div>
                  </div>

                  <div className="mt-6 bg-accent/10 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        {t("phases.phase5.liveAt")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in">
                <h3 className="font-playfair text-2xl font-semibold mb-6">
                  📊 {t("phases.phase5.lighthouseReport")}
                </h3>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <div className="text-center mb-6">
                    <h4 className="font-semibold text-lg mb-2">
                      {t("phases.phase5.auditResults")}
                    </h4>
                    <p className="text-sm text-foreground/70">
                      {t("phases.phase5.auditSubtitle")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { name: "Performance", score: 100 },
                      { name: "Accessibility", score: 100 },
                      { name: "Best Practices", score: 100 },
                      { name: "SEO", score: 100 },
                    ].map((metric) => (
                      <div key={metric.name} className="text-center">
                        <div className="relative w-20 h-20 mx-auto mb-2">
                          <div className="absolute inset-0 bg-green-100 dark:bg-green-900/20 rounded-full"></div>
                          <div className="absolute inset-2 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
                            {metric.score}
                          </div>
                        </div>
                        <div className="text-sm font-semibold">
                          {metric.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {t("phases.phase5.perfectScore")}
                    </div>
                    <p className="text-sm text-foreground/70">
                      {t("phases.phase5.perfectDesc")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-accent/10 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">
                    {t("phases.phase5.keyMetrics")}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">
                        {t("testing.firstContentfulPaint")}
                      </div>
                      <div className="text-green-700 font-mono">1.2s</div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {t("testing.largestContentfulPaint")}
                      </div>
                      <div className="text-green-700 font-mono">2.1s</div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {t("testing.cumulativeLayoutShift")}
                      </div>
                      <div className="text-green-700 font-mono">0.01</div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {t("testing.timeToInteractive")}
                      </div>
                      <div className="text-green-700 font-mono">2.8s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 px-4 sm:px-8 bg-accent/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-fade-in">
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                {t("creator.sectionTitle")}
              </h2>
              <p className="text-lg sm:text-xl text-foreground/70">
                {t("creator.sectionSubtitle")}
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-xl overflow-hidden max-w-3xl mx-auto">
              <div className="relative h-64 sm:h-96 lg:h-[500px] w-full">
                <img
                  src={devPhotoUrl}
                  alt={t("creator.name")}
                  className="w-full h-full object-contain object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                  <h3 className="font-playfair text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    {t("creator.name")}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto text-center">
                  {t("creator.description")}
                </p>

                <div className="text-center">
                  <Button
                    onClick={() => setIsStoryModalOpen(true)}
                    className="bg-accent hover:bg-accent-light text-accent-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    data-testid="creator-story-button"
                  >
                    🎓 {t("creator.selfTaughtButton")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="phase-6"
          className="py-12 sm:py-20 px-4 sm:px-8 bg-secondary/5"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-fade-in">
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                {t("geminiPhase.sectionTitle")}
              </h2>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto">
                {t("geminiPhase.sectionSubtitle")}
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-xl p-6 sm:p-8 max-w-4xl mx-auto mb-16">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  💎
                </div>
                <div>
                  <p className="text-foreground/80 leading-relaxed">
                    {t("geminiPhase.intro")}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-12 text-center">
              {t("geminiPhase.changelogTitle")}
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {Array.isArray(geminiCards) &&
                geminiCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-lg border border-border p-6"
                  >
                    <h4 className="font-playfair text-xl font-semibold mb-4">
                      {card.title}
                    </h4>
                    <div className="mb-4 bg-secondary/30 border-l-4 border-accent p-4 rounded-r-md">
                      <p className="font-mono text-sm italic text-foreground/70">
                        "{card.userQuote}"
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center text-sm">
                        <span className="mr-2 text-lg">💎</span> Gemini's
                        Solution
                      </h5>
                      <p className="text-sm text-foreground/80">
                        {card.geminiSolution}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <GeminiShowcase />
          </div>
        </section>

        <section
          id="contact"
          className="py-12 sm:py-20 px-4 sm:px-8 bg-primary text-primary-foreground"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {t("contact.title")}
              </h2>
              <p className="text-xl text-primary-foreground/90">
                {t("contact.subtitle")}
              </p>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <CreatorStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      {showScrollTop && (
        <button
          data-testid="scroll-to-top-home"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent hover:bg-accent-light text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center font-bold text-lg sm:w-14 sm:h-14"
          aria-label="Przewiń na górę"
        >
          ↑
        </button>
      )}
    </>
  );
}
