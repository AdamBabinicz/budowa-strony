import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const phases = [
  { id: "phase-0", icon: "💡", key: "iskra" },
  { id: "phase-1", icon: "🏗️", key: "fundamenty" },
  { id: "phase-2", icon: "🎨", key: "innowacja" },
  { id: "phase-3", icon: "⚙️", key: "development" },
  { id: "phase-4", icon: "🌍", key: "zasieg" },
  { id: "phase-5", icon: "🚀", key: "final" },
];

export function ControlHub() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToPhase = (phaseId: string) => {
    const element = document.getElementById(phaseId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      data-testid="control-hub"
      className={cn(
        "fixed left-0 top-0 h-full bg-background border-r border-border z-50 transition-all duration-300 shadow-lg group",
        isExpanded ? "control-hub-expanded" : "control-hub-collapsed"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="p-4 border-b border-border">
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
        <nav className="flex-1 py-4">
          <div className="space-y-2 px-2">
            {phases.map((phase) => (
              <button
                key={phase.id}
                data-testid={`nav-${phase.key}`}
                onClick={() => scrollToPhase(phase.id)}
                className="nav-item flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200 group/item relative w-full text-left"
                title={t(`nav.${phase.key}`)}
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
                  {t(`nav.${phase.key}`)}
                </span>
                {!isExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {t(`nav.${phase.key}`)}
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
  );
}
