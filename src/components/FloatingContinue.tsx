import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import type { Skip } from "../types/skip";

interface FloatingContinueProps {
  selectedSkip: Skip | null;
  onContinue: () => void;
  originalElementId: string;
}

export function FloatingContinue({
  selectedSkip,
  onContinue,
  originalElementId,
}: FloatingContinueProps) {
  const [isFloating, setIsFloating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!selectedSkip) {
      setIsVisible(false);
      setIsFloating(false);
      return;
    }

    setIsVisible(true);

    const handleScroll = () => {
      const originalElement = document.getElementById(originalElementId);
      if (!originalElement) return;

      const rect = originalElement.getBoundingClientRect();
      const isOriginalVisible =
        rect.top < window.innerHeight && rect.bottom > 0;

      // Float when original is not visible and we have a selection
      setIsFloating(!isOriginalVisible && selectedSkip !== null);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedSkip, originalElementId]);

  if (!isVisible || !selectedSkip) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-40 transition-all duration-300 pointer-events-none",
        isFloating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      <div className="max-w-lg mx-auto pointer-events-auto">
        <div className="bg-background/95 backdrop-blur-sm border rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="font-semibold text-sm text-foreground">
                {selectedSkip.size} Yard Skip Selected
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedSkip.hire_period_days} day hire period
              </div>
            </div>
            <Button
              onClick={onContinue}
              size="sm"
              className="cursor-pointer shrink-0"
            >
              <span className="hidden sm:inline">Continue</span>
              <ArrowRight className="h-4 w-4 sm:ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
