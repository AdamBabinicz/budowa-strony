import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface AnnotatedPromptProps {
  title: string;
  promptText: string;
  annotations: Record<string, string>;
  showMoreLabel: string;
  showLessLabel: string;
}

export function AnnotatedPrompt({
  title,
  promptText,
  annotations,
  showMoreLabel,
  showLessLabel,
}: AnnotatedPromptProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const renderAnnotatedText = (text: string) => {
    const annotationKeys = Object.keys(annotations);
    if (annotationKeys.length === 0) {
      return text;
    }

    const regex = new RegExp(`(${annotationKeys.join("|")})`, "g");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (annotations[part]) {
        return (
          <TooltipProvider key={index} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="bg-accent/20 text-accent-light font-bold cursor-pointer rounded px-1 py-0.5 transition-colors hover:bg-accent/30">
                  {part}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-sm shadow-lg">
                <p>{annotations[part]}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const collapsedText = promptText.split("\n").slice(0, 5).join("\n") + "...";

  return (
    <div className="animate-slide-in my-12" data-testid="annotated-prompt">
      <h3 className="font-playfair text-2xl font-semibold mb-6 text-center">
        {title}
      </h3>
      <div
        className={`code-block rounded-lg text-white font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap transition-[max-height] duration-700 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[2000px]" : "max-h-48"
        }`}
      >
        <div className="p-4 sm:p-6">
          {renderAnnotatedText(isExpanded ? promptText : collapsedText)}
        </div>
      </div>
      <div className="text-center mt-4">
        <Button
          onClick={toggleExpansion}
          variant="outline"
          className="bg-transparent hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105"
        >
          {isExpanded ? showLessLabel : showMoreLabel}
        </Button>
      </div>
    </div>
  );
}
