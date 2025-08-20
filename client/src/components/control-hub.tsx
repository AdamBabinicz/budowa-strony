import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ControlHub() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePhase, setActivePhase] = useState('phase-0');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['phase-0', 'phase-1', 'phase-2', 'phase-3', 'phase-4', 'phase-5', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection && currentSection !== activePhase) {
        setActivePhase(currentSection);
      }

      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePhase]);

  const phases = [
    { id: 'phase-0', icon: '💡', label: t('nav.iskra') },
    { id: 'phase-1', icon: '🏗️', label: t('nav.fundamenty') },
    { id: 'phase-2', icon: '🎨', label: t('nav.innowacja') },
    { id: 'phase-3', icon: '⚙️', label: t('nav.development') },
    { id: 'phase-4', icon: '🌍', label: t('nav.zasieg') },
    { id: 'phase-5', icon: '🚀', label: t('nav.deployment') },
    { id: 'contact', icon: '📧', label: t('nav.contact') }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActivePhase(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div 
        className={`hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${
          isExpanded ? 'control-hub-expanded' : 'control-hub-collapsed'
        } bg-card border border-border rounded-lg shadow-lg hover:shadow-xl`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        data-testid="control-hub"
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-3 lg:p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-gold rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span 
                className={cn(
                  "font-playfair font-semibold text-lg transition-opacity duration-300 whitespace-nowrap",
                  isExpanded ? "opacity-100" : "opacity-0"
                )}
              >
                Genesis
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-3 lg:py-4">
            <div className="space-y-1 lg:space-y-2 px-1 lg:px-2">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  data-testid={`nav-${phase.id}`}
                  onClick={() => scrollToSection(phase.id)}
                  className={cn(
                    "nav-item flex items-center space-x-3 p-2 lg:p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200 group/item relative w-full text-left",
                    activePhase === phase.id ? "bg-accent text-accent-foreground" : ""
                  )}
                  title={phase.label}
                >
                  <div className="w-6 h-6 flex items-center justify-center text-xl">
                    {phase.icon}
                  </div>
                  <span 
                    className={cn(
                      "nav-text transition-opacity duration-300 whitespace-nowrap",
                      isExpanded ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {phase.label}
                  </span>
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {phase.label}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Controls */}
          <div className="border-t border-border p-4 space-y-3">
            {/* Language Switcher */}
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center text-xl">🌐</div>
              <select
                data-testid="language-selector"
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className={cn(
                  "bg-background border border-border rounded px-2 py-1 text-sm transition-opacity duration-300 text-foreground",
                  isExpanded ? "opacity-100" : "opacity-0"
                )}
              >
                <option value="pl">Polski</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center text-xl">
                {theme === "dark" ? "🌙" : "☀️"}
              </div>
              <button
                data-testid="theme-toggle"
                onClick={toggleTheme}
                className={cn(
                  "text-sm transition-opacity duration-300 whitespace-nowrap",
                  isExpanded ? "opacity-100" : "opacity-0"
                )}
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>

            {/* Accessibility */}
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center text-xl">♿</div>
              <button
                data-testid="accessibility-toggle"
                className={cn(
                  "text-sm transition-opacity duration-300 whitespace-nowrap",
                  isExpanded ? "opacity-100" : "opacity-0"
                )}
              >
                Accessibility
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-border p-4">
            <div className={cn(
              "flex space-x-3 transition-all duration-300",
              isExpanded ? "justify-start" : "justify-center"
            )}>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" title="GitHub">
                <div className="w-5 h-5 text-lg">📂</div>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" title="Twitter">
                <div className="w-5 h-5 text-lg">🐦</div>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" title="LinkedIn">
                <div className="w-5 h-5 text-lg">💼</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        data-testid="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border shadow-lg p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Logo/Brand */}
            <div className="p-3 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-gold rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  AI
                </div>
                <span className="font-playfair font-semibold text-lg">Genesis</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4">
              <div className="space-y-2 px-2">
                {phases.map((phase) => (
                  <button
                    key={phase.id}
                    data-testid={`mobile-nav-${phase.id}`}
                    onClick={() => scrollToSection(phase.id)}
                    className={cn(
                      "nav-item flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200 w-full text-left",
                      activePhase === phase.id ? "bg-accent text-accent-foreground" : ""
                    )}
                    title={phase.label}
                  >
                    <div className="w-6 h-6 flex items-center justify-center text-xl">
                      {phase.icon}
                    </div>
                    <span className="nav-text">
                      {phase.label}
                    </span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Controls */}
            <div className="border-t border-border p-4 space-y-3">
              {/* Language Switcher */}
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center text-xl">🌐</div>
                <select
                  data-testid="mobile-language-selector"
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-background border border-border rounded px-2 py-1 text-sm text-foreground w-full"
                >
                  <option value="pl">Polski</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center text-xl">
                  {theme === "dark" ? "🌙" : "☀️"}
                </div>
                <button
                  data-testid="mobile-theme-toggle"
                  onClick={toggleTheme}
                  className="text-sm w-full text-left"
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </div>

              {/* Accessibility */}
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center text-xl">♿</div>
                <button
                  data-testid="mobile-accessibility-toggle"
                  className="text-sm w-full text-left"
                >
                  Accessibility
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          data-testid="scroll-to-top"
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ⬆️
        </button>
      )}
    </>
  );
}