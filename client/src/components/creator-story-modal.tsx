import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CreatorStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatorStoryModal({ isOpen, onClose }: CreatorStoryModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="creator-story-modal-overlay"
    >
      {/* 1. Kontener ZEWNĘTRZNY - odpowiada za styl i zaokrąglenie */}
      <div
        className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] border border-border shadow-xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-testid="creator-story-modal"
      >
        {/* 2. Kontener WEWNĘTRZNY - odpowiada za przewijanie */}
        <div className="w-full h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background z-10">
            <h2 className="text-2xl font-bold font-playfair">
              {t("creator.storyTitle")}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-testid="close-modal-button"
              className="hover:bg-secondary hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {t("creator.storyText")
                .split("\n\n")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4 leading-relaxed text-foreground/90"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-center p-6 border-t border-border sticky bottom-0 bg-background z-10">
            <Button
              onClick={onClose}
              className="bg-accent hover:bg-accent-light text-accent-foreground px-8"
              data-testid="close-story-button"
            >
              {t("creator.closeButton")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
