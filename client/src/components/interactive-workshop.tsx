import { useState } from "react";
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

export function InteractiveWorkshop() {
  const [isBugActive, setIsBugActive] = useState(false);
  const [currentCode, setCurrentCode] = useState(workingCode);
  const { t } = useTranslation();
  const { toast } = useToast();

  const simulateBug = () => {
    if (!isBugActive) {
      setIsBugActive(true);
      setCurrentCode(buggyCode);
      
      // Apply visual bug
      const gallery = document.getElementById('gallery-demo');
      if (gallery) {
        const grid = gallery.querySelector('.grid');
        if (grid) {
          grid.classList.remove('grid-cols-2');
          grid.classList.add('grid-cols-1');
        }
        
        gallery.querySelectorAll('img').forEach(img => {
          img.classList.add('w-12', 'h-12', 'object-none');
          img.classList.remove('hover:scale-105');
        });
      }
    } else {
      setIsBugActive(false);
      setCurrentCode(workingCode);
      
      // Fix visual bug
      const gallery = document.getElementById('gallery-demo');
      if (gallery) {
        const grid = gallery.querySelector('.grid');
        if (grid) {
          grid.classList.remove('grid-cols-1');
          grid.classList.add('grid-cols-2');
        }
        
        gallery.querySelectorAll('img').forEach(img => {
          img.classList.remove('w-12', 'h-12', 'object-none');
          img.classList.add('hover:scale-105');
        });
      }
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      toast({
        title: "Kod skopiowany!",
        description: "Kod został skopiowany do schowka.",
      });
    } catch (err) {
      toast({
        title: "Błąd",
        description: "Nie udało się skopiować kodu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-16 animate-slide-in">
      <h3 className="font-playfair text-2xl font-semibold mb-8 text-center">
        🔧 Warsztat Debugowania na Żywo
      </h3>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Live Component Demo */}
        <div>
          <h4 className="font-semibold mb-4">Galeria Zdjęć - Demonstracja</h4>
          <div 
            id="gallery-demo" 
            className="bg-card rounded-lg p-6 border border-border"
            data-testid="gallery-demo"
          >
            {/* Working gallery component */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
                alt="Mountain landscape at sunrise" 
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
                loading="lazy"
              />
              <img 
                src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
                alt="Ocean waves during golden hour" 
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
                {isBugActive ? "✅ Napraw!" : "🐛 Symuluj Błąd!"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Code Display */}
        <div>
          <h4 className="font-semibold mb-4">Kod Komponentu</h4>
          <div className="code-block rounded-lg p-6 text-white font-mono text-sm overflow-x-auto">
            <pre data-testid="code-display">
              <code>{currentCode}</code>
            </pre>
          </div>
          
          <Button
            data-testid="copy-code-button"
            onClick={copyCode}
            variant="outline"
            className="mt-4 bg-accent hover:bg-accent-light text-accent-foreground"
          >
            📋 {t('workshop.copyCode')}
          </Button>
        </div>
      </div>
    </div>
  );
}
