import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const workingCode = `// ImageGallery.tsx
import React, { useState } from 'react';

const ImageGallery: React.FC = () => {
  const [images] = useState([
    { id: 1, src: '/mountain.jpg', alt: 'Mountain' },
    { id: 2, src: '/ocean.jpg', alt: 'Ocean' }
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
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

export default function InteractiveWorkshop() {
  const [isBugActive, setIsBugActive] = useState(false);
  const [currentCode, setCurrentCode] = useState(workingCode);
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    const gallery = document.getElementById("gallery-demo");
    if (!gallery) return;

    const grid = gallery.querySelector<HTMLDivElement>(".grid");
    const images = gallery.querySelectorAll<HTMLImageElement>("img");

    if (isBugActive) {
      grid?.classList.remove("grid-cols-2");
      grid?.classList.add("grid-cols-1");
      images.forEach((img) => {
        img.style.width = "3rem";
        img.style.height = "3rem";
        img.style.objectFit = "none";
        img.classList.remove("hover:scale-105");
      });
    } else {
      grid?.classList.remove("grid-cols-1");
      grid?.classList.add("grid-cols-2");
      images.forEach((img) => {
        img.style.width = "";
        img.style.height = "";
        img.style.objectFit = "";
        img.classList.add("hover:scale-105");
      });
    }
  }, [isBugActive]);

  const toggleBug = () => {
    setIsBugActive((prev) => !prev);
    setCurrentCode((prevCode) =>
      prevCode === workingCode ? buggyCode : workingCode
    );
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
      <h3 className="font-playfair text-2xl font-semibold mb-8 text-center">
        🔧 {t("workshop.title")}
      </h3>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">
        <div>
          <h4 className="font-semibold mb-4">{t("workshop.galleryDemo")}</h4>
          <div
            id="gallery-demo"
            className="bg-card rounded-lg p-6 border border-border"
            data-testid="gallery-demo"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
                alt={t("workshop.mountainAlt")}
                className="rounded-lg shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
                alt={t("workshop.oceanAlt")}
                className="rounded-lg shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                loading="lazy"
              />
            </div>

            <div className="flex space-x-4">
              <Button
                data-testid="bug-button"
                onClick={toggleBug}
                variant={isBugActive ? "default" : "destructive"}
                className={isBugActive ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {isBugActive ? t("workshop.fixBug") : t("workshop.simulateBug")}
              </Button>
            </div>
          </div>
        </div>

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
