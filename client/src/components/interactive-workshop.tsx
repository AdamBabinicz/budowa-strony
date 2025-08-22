import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import mountainImg from "@/assets/1.avif";
import oceanImg from "@/assets/2.avif";

const workingCode = `// ImageGallery.tsx
import React, { useState } from 'react';

const ImageGallery: React.FC = () => {
  const [images] = useState([
    { id: 1, src: '/mountain.jpg', alt: 'Mountain' },
    { id: 2, src: '/ocean.jpg', alt: 'Ocean' }
  ]);

  // Zmieniono na responsywną siatkę: 1 kolumna na mobilnych, 2 na większych ekranach
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map(img => (
        <img
          key={img.id}
          src={img.src}
          alt={img.alt}
          className="rounded-lg hover:scale-105 transition-transform"
        />
      ))}
    </div>
  );
};`;

const buggyCode = `// ImageGallery.tsx - WITH BUG! 🐛
import React, { useState } from 'react';

const ImageGallery: React.FC = () => {
  const [images] = useState([
    { id: 1, src: '/mountain.jpg', alt: 'Mountain' },
    { id: 2, src: '/ocean.jpg', alt: 'Ocean' }
  ]);

  return (
    <div className="grid grid-cols-1 gap-4"> {/* BUG: Wrong grid-cols! */}
      {images.map(img => (
        <img
          key={img.id}
          src={img.src}
          alt={img.alt}
          className="rounded-lg w-12 h-12" {/* BUG: Wrong dimensions! */}
        />
      ))}
    </div>
  );
};`;

export function InteractiveWorkshop() {
  const [isBugActive, setIsBugActive] = useState(false);
  const [currentCode, setCurrentCode] = useState(workingCode);
  const { t } = useTranslation();
  const { toast } = useToast();

  const simulateBug = () => {
    const gallery = document.getElementById("gallery-demo");
    if (!gallery) return;
    const grid = gallery.querySelector(".grid");
    if (!grid) return;

    if (!isBugActive) {
      setIsBugActive(true);
      setCurrentCode(buggyCode);

      // Zaktualizowana logika Apply visual bug
      // Usuwamy klasę responsywną, aby błąd (jedna kolumna) był widoczny na wszystkich ekranach
      grid.classList.remove("sm:grid-cols-2");
      grid.classList.add("grid-cols-1"); // Upewniamy się, że jest jedna kolumna

      gallery.querySelectorAll("img").forEach((img) => {
        img.classList.add("w-12", "h-12", "object-none");
        img.classList.remove("hover:scale-105");
      });
    } else {
      setIsBugActive(false);
      setCurrentCode(workingCode);

      // Zaktualizowana logika Fix visual bug
      // Przywracamy responsywną klasę
      grid.classList.add("sm:grid-cols-2");

      gallery.querySelectorAll("img").forEach((img) => {
        img.classList.remove("w-12", "h-12", "object-none");
        img.classList.add("hover:scale-105");
      });
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      toast({
        title: t("workshop.codeCopied"),
        description: t("workshop.codeDescription"),
      });
    } catch (err) {
      toast({
        title: t("workshop.error"),
        description: t("workshop.copyError"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-16 animate-slide-in">
      {/* ZMIANA: Responsywny rozmiar czcionki */}
      <h3 className="font-playfair text-xl sm:text-2xl font-semibold mb-8 text-center">
        🔧 {t("workshop.title")}
      </h3>

      {/* ZMIANA: Responsywne odstępy (gap) */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Live Component Demo */}
        <div>
          <h4 className="font-semibold mb-4">{t("workshop.galleryDemo")}</h4>
          <div
            id="gallery-demo"
            className="bg-card rounded-lg p-6 border border-border"
            data-testid="gallery-demo"
          >
            {/* ZMIANA: Responsywna siatka dla galerii (1 kolumna na mobilnych) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <img
                src={mountainImg}
                alt={t("workshop.mountainAlt")}
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
                loading="lazy"
              />
              <img
                src={oceanImg}
                alt={t("workshop.oceanAlt")}
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
                loading="lazy"
              />
            </div>

            <div className="flex space-x-4">
              <Button
                data-testid="bug-button"
                onClick={simulateBug}
                variant={isBugActive ? "default" : "destructive"}
                className={isBugActive ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {isBugActive ? t("workshop.fixBug") : t("workshop.simulateBug")}
              </Button>
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div>
          <h4 className="font-semibold mb-4">{t("workshop.componentCode")}</h4>
          <div className="code-block rounded-lg p-6 text-white font-mono text-sm overflow-x-auto">
            <pre data-testid="code-display">
              <code className="whitespace-pre-wrap break-words">
                {currentCode}
              </code>
            </pre>
          </div>

          <Button
            data-testid="copy-code-button"
            onClick={copyCode}
            variant="outline"
            className="mt-4 bg-accent hover:bg-accent-light text-accent-foreground"
          >
            📋 {t("workshop.copyCode")}
          </Button>
        </div>
      </div>
    </div>
  );
}
