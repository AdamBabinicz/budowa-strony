import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import i18n from "@/lib/i18n";
import { Link } from "wouter";
import { RemoveScroll } from "react-remove-scroll";

export function ControlHub() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePhase, setActivePhase] = useState("phase-0");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isAccessibilityOn, setIsAccessibilityOn] = useState(false);
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(
    "light"
  );

  useEffect(() => {
    const rootElement = document.documentElement;
    if (isAccessibilityOn) {
      rootElement.classList.add("accessibility-mode");
    } else {
      rootElement.classList.remove("accessibility-mode");
    }
  }, [isAccessibilityOn]);

  useEffect(() => {
    const rootElement = document.documentElement;
    const apply = () => {
      const isDark = rootElement.classList.contains("dark");
      setEffectiveTheme(isDark ? "dark" : "light");
    };
    apply();
    const observer = new MutationObserver(() => apply());
    observer.observe(rootElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "phase-0",
        "phase-1",
        "phase-2",
        "phase-3",
        "phase-4",
        "phase-5",
        "contact",
      ];
      const currentSection = sections.find((section) => {
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

      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePhase]);

  const phases = [
    { id: "phase-0", icon: "💡", label: t("nav.iskra") },
    { id: "phase-1", icon: "🏗️", label: t("nav.fundamenty") },
    { id: "phase-2", icon: "🎨", label: t("nav.innowacja") },
    { id: "phase-3", icon: "⚙️", label: t("nav.development") },
    { id: "phase-4", icon: "🌍", label: t("nav.zasieg") },
    { id: "phase-5", icon: "🚀", label: t("nav.deployment") },
    { id: "contact", icon: "📧", label: t("nav.contact") },
  ];

  const legalLinks = [
    { href: "/terms", icon: "📄", label: t("legalNav.terms") },
    { href: "/privacy", icon: "🛡️", label: t("legalNav.privacy") },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActivePhase(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleTheme = () => {
    const rootElement = document.documentElement;
    const isCurrentlyDark = rootElement.classList.contains("dark");
    const nextTheme: "light" | "dark" = isCurrentlyDark ? "light" : "dark";
    setTheme(nextTheme);
  };

  const toggleAccessibility = () => {
    setIsAccessibilityOn(!isAccessibilityOn);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className={`hidden lg:grid grid-rows-[auto_1fr_auto] fixed left-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${
          isExpanded ? "control-hub-expanded" : "control-hub-collapsed"
        } bg-card border border-border rounded-lg shadow-lg hover:shadow-xl max-h-[90vh]`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        data-testid="control-hub"
      >
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

        <RemoveScroll
          enabled={isExpanded}
          className="overflow-y-auto no-scrollbar"
        >
          <nav className="py-3 lg:py-4">
            <div className="space-y-1 lg:space-y-2 px-1 lg:px-2">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  data-testid={`nav-${phase.id}`}
                  onClick={() => scrollToSection(phase.id)}
                  className={cn(
                    "nav-item flex items-center space-x-3 p-2 lg:p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200 group/item relative w-full text-left",
                    "focus-visible:outline-none focus-visible:ring-0",
                    activePhase === phase.id
                      ? cn(
                          "bg-accent",
                          isAccessibilityOn
                            ? "text-black"
                            : "text-accent-foreground"
                        )
                      : ""
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

          <div className="border-t border-border p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center text-xl">
                🌐
              </div>
              <select
                data-testid="language-selector"
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                aria-label={t("nav.languageSelectorLabel")}
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

            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center text-xl">
                {effectiveTheme === "dark" ? "🌙" : "☀️"}
              </div>
              <button
                data-testid="theme-toggle"
                onClick={toggleTheme}
                className={cn(
                  "text-sm transition-opacity duration-300 whitespace-nowrap",
                  isExpanded ? "opacity-100" : "opacity-0"
                )}
              >
                {effectiveTheme === "dark"
                  ? t("theme.lightMode")
                  : t("theme.darkMode")}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center text-xl">
                ♿
              </div>
              <button
                onClick={toggleAccessibility}
                data-testid="accessibility-toggle"
                className={cn(
                  "text-sm transition-opacity duration-300 whitespace-nowrap",
                  isExpanded ? "opacity-100" : "opacity-0"
                )}
              >
                {isAccessibilityOn
                  ? t("accessibility.toggleOn")
                  : t("accessibility.toggleOff")}
              </button>
            </div>
          </div>

          <div className="border-t border-border px-1 lg:px-2 py-3 lg:py-4">
            <div className="space-y-1 lg:space-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-item flex items-center space-x-3 p-2 lg:p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200 group/item relative w-full text-left"
                  title={link.label}
                >
                  <div className="w-6 h-6 flex items-center justify-center text-xl">
                    {link.icon}
                  </div>
                  <span
                    className={cn(
                      "nav-text transition-opacity duration-300 whitespace-nowrap",
                      isExpanded ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {link.label}
                  </span>
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {link.label}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </RemoveScroll>

        <div className="border-t border-border p-4">
          <div
            className={cn(
              "flex space-x-3 transition-all duration-300",
              isExpanded ? "justify-start" : "justify-center"
            )}
          >
            <a
              href="https://github.com/AdamBabinicz"
              className="text-muted-foreground hover:text-accent transition-colors"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-5 h-5 text-lg">📂</div>
            </a>
            <a
              href="https://x.com/AdamBabinicz"
              className="text-muted-foreground hover:text-accent transition-colors"
              title="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-5 h-5 text-lg">🐦</div>
            </a>
            <a
              href="https://www.facebook.com/adam.gierczak.334"
              className="text-muted-foreground hover:text-accent transition-colors"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-5 h-5 text-lg">💼</div>
            </a>
          </div>
        </div>
      </div>

      <button
        data-testid="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {isMobileMenuOpen && (
        <RemoveScroll>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="fixed left-0 top-0 h-full w-72 bg-background/95 backdrop-blur-md border-r border-border shadow-2xl p-4 grid grid-rows-[auto_1fr] animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-gold rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                  <span className="font-playfair font-semibold text-lg">
                    Genesis
                  </span>
                </div>
              </div>
              <div className="overflow-y-auto no-scrollbar">
                <nav className="py-4">
                  <div className="space-y-2 px-2">
                    {phases.map((phase) => (
                      <button
                        key={phase.id}
                        data-testid={`mobile-nav-${phase.id}`}
                        onClick={() => scrollToSection(phase.id)}
                        className={cn(
                          "nav-item flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200 w-full text-left",
                          "focus-visible:outline-none focus-visible:ring-0",
                          activePhase === phase.id
                            ? cn(
                                "bg-accent",
                                isAccessibilityOn
                                  ? "text-black"
                                  : "text-accent-foreground"
                              )
                            : ""
                        )}
                        title={phase.label}
                      >
                        <div className="w-6 h-6 flex items-center justify-center text-xl">
                          {phase.icon}
                        </div>
                        <span className="nav-text">{phase.label}</span>
                      </button>
                    ))}
                  </div>
                </nav>
                <div className="border-t border-border p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center text-xl">
                      🌐
                    </div>
                    <select
                      data-testid="mobile-language-selector"
                      value={i18n.language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      aria-label={t("nav.languageSelectorLabel")}
                      className="bg-background border border-border rounded px-2 py-1 text-sm text-foreground w-full"
                    >
                      <option value="pl">Polski</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center text-xl">
                      {effectiveTheme === "dark" ? "🌙" : "☀️"}
                    </div>
                    <button
                      data-testid="mobile-theme-toggle"
                      onClick={toggleTheme}
                      className="text-sm w-full text-left"
                    >
                      {effectiveTheme === "dark"
                        ? t("theme.lightMode")
                        : t("theme.darkMode")}
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center text-xl">
                      ♿
                    </div>
                    <button
                      onClick={toggleAccessibility}
                      data-testid="mobile-accessibility-toggle"
                      className="text-sm w-full text-left"
                    >
                      {isAccessibilityOn
                        ? t("accessibility.toggleOn")
                        : t("accessibility.toggleOff")}
                    </button>
                  </div>
                </div>
                <div className="border-t border-border py-4">
                  <div className="space-y-2 px-2">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="nav-item flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200 w-full text-left"
                        title={link.label}
                      >
                        <div className="w-6 h-6 flex items-center justify-center text-xl">
                          {link.icon}
                        </div>
                        <span className="nav-text">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <div className="flex space-x-4 justify-center">
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-accent transition-colors"
                      title="GitHub"
                    >
                      <div className="w-6 h-6 text-2xl">📂</div>
                    </a>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-accent transition-colors"
                      title="Twitter"
                    >
                      <div className="w-6 h-6 text-2xl">🐦</div>
                    </a>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-accent transition-colors"
                      title="LinkedIn"
                    >
                      <div className="w-6 h-6 text-2xl">💼</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RemoveScroll>
      )}

      {showScrollToTop && (
        <button
          data-testid="scroll-to-top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent hover:bg-accent-light text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center font-bold text-lg"
          aria-label="Przewiń na górę"
        >
          ↑
        </button>
      )}
    </>
  );
}
