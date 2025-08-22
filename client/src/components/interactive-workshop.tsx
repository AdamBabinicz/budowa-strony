import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import mountainImg from "@/assets/1.avif";
import oceanImg from "@/assets/2.avif";

const images = [
  { src: mountainImg, alt: "Mountain landscape at sunrise" },
  { src: oceanImg, alt: "Ocean waves during golden hour" },
];

const codeBefore = `
<div className="grid grid-cols-2 gap-4">
  {images.map((img) => (
    <img
      key={img.src}
      src={img.src}
      alt={img.alt}
      className="rounded-lg"
    />
  ))}
</div>
`;

const codeAfter = `
<div className="grid grid-cols-2 gap-4">
  {images.map((img) => (
    <img
      key={img.src}
      src={img.src}
      alt={t(img.alt)} // Corrected line
      className="rounded-lg object-cover h-48 w-full"
    />
  ))}
</div>
`;

export default function InteractiveWorkshop() {
  const { t } = useTranslation();
  const [isBugged, setIsBugged] = useState(false);
  const [showBuggyCode, setShowBuggyCode] = useState(false);
  const { toast } = useToast();

  const handleCopyCode = () => {
    const codeToCopy = showBuggyCode ? codeBefore : codeAfter;
    navigator.clipboard.writeText(codeToCopy.trim());
    toast({
      title: t("workshop.codeCopied"),
      description: t("workshop.codeDescription"),
    });
  };

  return (
    <div className="mb-16">
      <h3 className="font-playfair text-2xl font-semibold mb-8 text-center">
        {t("workshop.title")}
      </h3>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="animate-slide-in">
          <h4 className="font-semibold mb-4">{t("workshop.galleryDemo")}</h4>
          <div
            className={cn(
              "p-4 border rounded-lg",
              isBugged ? "border-destructive" : "border-border"
            )}
          >
            <div className="grid grid-cols-2 gap-4">
              {images.map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={isBugged ? img.alt : t(img.alt, { ns: "workshop" })}
                  className={cn(
                    "rounded-lg",
                    !isBugged && "object-cover h-48 w-full"
                  )}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button
              onClick={() => {
                setIsBugged(!isBugged);
                setShowBuggyCode(!isBugged);
              }}
              variant={isBugged ? "default" : "destructive"}
              className="w-full"
              data-testid="bug-button"
            >
              {isBugged
                ? `✅ ${t("workshop.fixBug")}`
                : `🐛 ${t("workshop.simulateBug")}`}
            </Button>
          </div>
        </div>
        <div className="animate-fade-in">
          <h4 className="font-semibold mb-4">{t("workshop.componentCode")}</h4>
          <div className="code-block rounded-lg p-4 text-white font-mono text-xs">
            <pre>
              <code>
                {showBuggyCode ? codeBefore.trim() : codeAfter.trim()}
              </code>
            </pre>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleCopyCode}
              variant="secondary"
              className="w-full"
              data-testid="copy-code-button"
            >
              📋 {t("workshop.copyCode")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
