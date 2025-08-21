import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function GeminiShowcase() {
  const { t } = useTranslation();
  const [isDemoContrastOn, setIsDemoContrastOn] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<"before" | "after" | null>(
    null
  );

  const getCodeForDemo2 = () => {
    if (hoveredButton === "before") {
      return t("geminiPhase.showcase.demo2.code.before");
    }
    if (hoveredButton === "after") {
      return t("geminiPhase.showcase.demo2.code.after");
    }
    return t("geminiPhase.showcase.demo2.code.default");
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-xl p-6 sm:p-8 max-w-4xl mx-auto mt-16">
      <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-4 text-center">
        {t("geminiPhase.showcase.title")}
      </h3>
      <p className="text-center text-foreground/80 mb-12">
        {t("geminiPhase.showcase.intro")}
      </p>

      <div className="space-y-12">
        <div className="border-t border-border pt-8">
          <h4 className="font-semibold text-lg mb-4 text-center">
            {t("geminiPhase.showcase.demo1.title")}
          </h4>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-full max-w-xs h-32 rounded-lg border border-border p-4 transition-colors duration-300 flex flex-col justify-center items-center text-center",
                  isDemoContrastOn ? "demo-contrast-on" : "bg-background"
                )}
              >
                <p
                  className={cn(
                    "font-bold text-lg",
                    isDemoContrastOn && "text-white"
                  )}
                >
                  {t("geminiPhase.showcase.demo1.previewTitle")}
                </p>
                <p className={cn("text-sm", isDemoContrastOn && "text-white")}>
                  {t("geminiPhase.showcase.demo1.previewText")}
                </p>
              </div>
              <button
                onClick={() => setIsDemoContrastOn(!isDemoContrastOn)}
                className="mt-4 bg-accent hover:bg-accent-light text-accent-foreground px-4 py-2 rounded-md text-sm font-semibold"
              >
                {t("geminiPhase.showcase.demo1.button")}
              </button>
            </div>
            <div className="code-block rounded-md p-4 text-xs font-mono text-white overflow-x-auto h-full">
              <pre>
                <code>
                  {t(
                    isDemoContrastOn
                      ? "geminiPhase.showcase.demo1.code.on"
                      : "geminiPhase.showcase.demo1.code.off"
                  )}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <h4 className="font-semibold text-lg mb-4 text-center">
            {t("geminiPhase.showcase.demo2.title")}
          </h4>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
              <p className="text-sm text-foreground/70 mb-4">
                {t("geminiPhase.showcase.demo2.instruction")}
              </p>
              <div className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <button
                    className="demo-buggy-button"
                    onMouseEnter={() => setHoveredButton("before")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="mt-2 text-sm font-semibold">
                    {t("geminiPhase.showcase.demo2.before")}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    className="demo-fixed-button"
                    onMouseEnter={() => setHoveredButton("after")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="mt-2 text-sm font-semibold">
                    {t("geminiPhase.showcase.demo2.after")}
                  </span>
                </div>
              </div>
            </div>
            <div className="code-block rounded-md p-4 text-xs font-mono text-white overflow-x-auto h-full">
              <pre>
                <code>{getCodeForDemo2()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
